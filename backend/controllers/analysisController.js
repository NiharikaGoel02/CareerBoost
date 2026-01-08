const fs = require('fs');
const axios = require('axios');
const pdfParse = require('pdf-parse');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const Analysis = require('../models/Analysis');
require('dotenv').config();



const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

// Extract text from PDF
// async function extractTextFromPDF(fileUrl) {
//   try {
//     const response = await axios.get(fileUrl, { responseType: 'arraybuffer' });
//     const dataBuffer = response.data;

//     const data = await pdfParse(dataBuffer);
//     return data.text;
//   } catch (error) {
//     console.error('Error extracting text from PDF:', error);
//     throw new Error('Failed to extract text from PDF');
//   }
// }
const cloudinary = require('../config/cloudinary');

async function extractTextFromPDF(fileInput) {
  try {
    let dataBuffer;

    // If it looks like a Cloudinary URL or public ID
    if (typeof fileInput === 'string' && fileInput.startsWith('https://')) {
      console.log('[extractTextFromPDF] ✅ Fetching PDF from URL');
      const response = await axios.get(fileInput, { responseType: 'arraybuffer' });
      dataBuffer = Buffer.from(response.data);
    } else if (typeof fileInput === 'string' && fs.existsSync(fileInput)) {
      console.log('[extractTextFromPDF] ✅ Reading PDF from local path');
      dataBuffer = fs.readFileSync(fileInput);
    } else if (typeof fileInput === 'string') {
      // Assume Cloudinary public ID
      console.log('[extractTextFromPDF] ✅ Fetching PDF from Cloudinary public ID');
      const signedUrl = cloudinary.url(fileInput, { resource_type: 'raw', sign_url: true });
      const response = await axios.get(signedUrl, { responseType: 'arraybuffer' });
      dataBuffer = Buffer.from(response.data);
    } else {
      throw new Error('Invalid file input');
    }

    const pdfData = await pdfParse(dataBuffer);
    return pdfData.text;
  } catch (error) {
    console.error('Error extracting text from PDF:', error.message);
    throw new Error('Failed to extract text from PDF');
  }
}




// Analyze resume using Gemini AI and get JSON
async function analyzeResume(resumeText, jobDescription = null) {
  if (!resumeText) {
    console.log('[analysisController.js][if] ❌ No resumeText provided');
    throw new Error('Resume text is required for analysis');
  }
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    let basePrompt = `
    You are an experienced HR with Technical Experience in the field of any one job role from Data Science, Data Analyst, DevOPS, Machine Learning Engineer, Prompt Engineer, AI Engineer, Full Stack Web Development, Big Data Engineering, Marketing Analyst, Human Resource Manager, Software Developer. Your task is to review the provided resume.
    Please provide your analysis in the following JSON format:
    {
      "strengths": ["..."],
      "weaknesses": ["..."],
      "skillsToImprove": ["..."],
      "courseRecommendations": ["..."],
      "overallEvaluation": "..."
    }
    Resume:
    ${resumeText}
    `;
    if (jobDescription && jobDescription.trim()) {
      console.log('[analysisController.js][if] ✅ jobDescription provided');
      basePrompt += `
      Additionally, compare this resume to the following job description:
      Job Description:
      ${jobDescription}
      Highlight the strengths and weaknesses of the applicant in relation to the specified job requirements.
      `;
    }
    const result = await model.generateContent(basePrompt);
    const response = await result.response;
    const text = response.text();
    // Try to extract JSON from the response
    let json = null;
    // try {
    //   const match = text.match(/\{[\s\S]*\}/);
    //   if (match) {
    //     console.log('[analysisController.js][if] ✅ JSON found in Gemini response');
    //     json = JSON.parse(match[0]);
    //   } else {
    //     console.log('[analysisController.js][else] ❌ No JSON found in Gemini response');
    //     throw new Error('No JSON found in Gemini response');
    //   }
    // } catch (err) {
    //   console.error('Failed to parse JSON from Gemini response:', err);
    //   throw new Error('Gemini did not return valid JSON.');
    // }
    try {
  const match = text.match(/\{[\s\S]*\}/);
  if (match) {
    json = JSON.parse(match[0].replace(/\n/g, ' ')); // remove newlines
  } else {
    console.error('[analysisController.js] ❌ Gemini response did not contain JSON');
    json = { strengths: [], weaknesses: [], skillsToImprove: [], courseRecommendations: [], overallEvaluation: '' };
  }
} catch (err) {
  console.error('Failed to parse JSON from Gemini response:', err.message);
  json = { strengths: [], weaknesses: [], skillsToImprove: [], courseRecommendations: [], overallEvaluation: '' };
}

    return { raw: text, json };
  } catch (error) {
    console.error('Error analyzing resume:', error);
    throw new Error('Failed to analyze resume using AI');
  }
}

// Controller: Analyze Resume
async function analyzeResumeHandler(req, res) {
  let filePath = null;
  try {
    if (!req.file) {
      console.log('[analysisController.js][if] ❌ No resume file uploaded');
      return res.status(400).json({ error: 'No resume file uploaded' });
    }
    const fileUrl = req.fileUrl; // from upload middleware
    const jobDescription = req.body.jobDescription || '';
    const resumeText = await extractTextFromPDF(fileUrl);
    if (!resumeText.trim()) {
      console.log('[analysisController.js][if] ❌ Could not extract text from PDF');
      return res.status(400).json({ error: 'Could not extract text from the PDF. Please ensure the PDF contains readable text.' });
    }
    const analysisResult = await analyzeResume(resumeText, jobDescription);
    const analysisRecord = new Analysis({
      user: req.user.id,
      resumeText,
      jobDescription,
      analysisRaw: analysisResult.raw,
      analysisJson: analysisResult.json,
      analysisStructured: analysisResult.json // for backward compatibility
    });
    const savedAnalysis = await analysisRecord.save();
    
    // Clean up uploaded file
    if (filePath && fs.existsSync(filePath)) {
      fs.unlink(filePath, (err) => {
        if (err) console.error('Error deleting file:', err);
        else console.log('[analysisController.js] ✅ File cleaned up successfully');
      });
    }
    
    res.json({ 
      analysis: analysisResult.raw,
      analysisId: savedAnalysis._id,
      structuredData: analysisResult.json,
      success: true
    });
    console.log('[analysisController.js][success] ✅ Resume analyzed and saved');
  } catch (error) {
    console.error('Error in analyze-resume route:', error);
    // Always cleanup uploaded file on error
    if (filePath && fs.existsSync(filePath)) {
      console.log('[analysisController.js][error] ❌ Cleaning up uploaded file after error');
      fs.unlink(filePath, (err) => {
        if (err) console.error('Error deleting file during cleanup:', err);
        else console.log('[analysisController.js] ✅ File cleaned up after error');
      });
    }
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
}

// Controller: Get analysis by ID
async function getAnalysisById(req, res) {
  try {
    const { analysisId } = req.params;
    if (!require('mongoose').Types.ObjectId.isValid(analysisId)) {
      console.log('[analysisController.js][if] ❌ Invalid analysis ID format');
      return res.status(400).json({ error: 'Invalid analysis ID format' });
    }
    const analysis = await Analysis.findById(analysisId);
    if (!analysis) {
      console.log('[analysisController.js][if] ❌ Analysis not found');
      return res.status(404).json({ error: 'Analysis not found' });
    }
    res.json({
      analysis: analysis,
      success: true
    });
    console.log('[analysisController.js][success] ✅ Analysis fetched by ID');
  } catch (error) {
    console.error('Error fetching analysis:', error);
    res.status(500).json({ error: error.message || 'Failed to fetch analysis' });
  }
}

// Controller: Get all analyses
// async function getAllAnalyses(req, res) {
//   try {
//     const analyses = await Analysis.find({ user: req.user.id }).sort({ createdAt: -1 }).limit(10);
//     res.json({
//       analyses: analyses,
//       success: true
//     });
//     console.log('[analysisController.js][success] ✅ All analyses fetched for user:', req.user.id);
//   } catch (error) {
//     console.error('Error fetching analyses:', error);
//     res.status(500).json({ error: error.message || 'Failed to fetch analyses' });
//   }
// }
async function getAllAnalyses(req, res) {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: 'Unauthorized: user not logged in' });
    }
    const analyses = await Analysis.find({ user: req.user.id }).sort({ createdAt: -1 }).limit(10);
    res.json({ analyses, success: true });
    console.log('[analysisController.js][success] ✅ All analyses fetched for user:', req.user.id);
  } catch (error) {
    console.error('Error fetching analyses:', error.message);
    res.status(500).json({ error: error.message || 'Failed to fetch analyses' });
  }
}


module.exports = {
  extractTextFromPDF,
  analyzeResume,
  analyzeResumeHandler,
  getAnalysisById,
  getAllAnalyses
};