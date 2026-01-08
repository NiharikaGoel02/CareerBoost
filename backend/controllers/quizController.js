const { GoogleGenerativeAI } = require('@google/generative-ai');
const Analysis = require('../models/Analysis');
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

// Generate quiz based on a single weakness
async function generateQuizForWeakness(weakness) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const quizPrompt = `
    Based on the following weakness, create a quiz with 5 multiple choice questions to help the candidate improve in this area:
    Weakness: ${weakness}
    Format your response as a JSON object with this structure:
    {
      "questions": [
        {
          "question": "Question text here",
          "options": ["Option A", "Option B", "Option C", "Option D"],
          "correctAnswer": 0,
          "explanation": "Explanation for the correct answer",
          "category": "Skill category this question addresses"
        }
      ]
    }
    For the category field, use one of these specific categories:
    - "Technical Skills" (for programming, software, technical knowledge)
    - "Experience" (for work experience, professional background)
    - "Education" (for academic background, training, certifications)
    - "Presentation" (for communication, soft skills, presentation skills)
    - "Leadership" (for management, team leadership, project management)
    - "Problem Solving" (for analytical thinking, critical thinking)
    
    Make sure the questions are practical and relevant to improving the identified weakness.
    Ensure you provide exactly 5 questions and that the JSON is valid.
    `;
    const result = await model.generateContent(quizPrompt);
    const response = await result.response;
    const responseText = response.text();
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      console.log('[quizController.js][if] ✅ Quiz JSON found');
      const parsedQuiz = JSON.parse(jsonMatch[0]);
      if (parsedQuiz.questions && parsedQuiz.questions.length > 0) {
        console.log('[quizController.js][if] ✅ Quiz questions found');
        parsedQuiz.questions = parsedQuiz.questions.slice(0, 5);
        return parsedQuiz;
      } else {
        console.log('[quizController.js][else] ❌ No questions generated');
        throw new Error('No questions generated');
      }
    } else {
      console.log('[quizController.js][else] ❌ Failed to parse quiz JSON');
      throw new Error('Failed to parse quiz JSON');
    }
  } catch (error) {
    console.error('Error generating quiz:', error);
    throw new Error('Failed to generate quiz');
  }
}

// Controller: Generate Quizzes for Each Weakness
async function generateQuizHandler(req, res) {
  try {
    const { analysisId } = req.params;
    if (!require('mongoose').Types.ObjectId.isValid(analysisId)) {
      console.log('[quizController.js][if] ❌ Invalid analysis ID format');
      return res.status(400).json({ error: 'Invalid analysis ID format' });
    }
    const analysis = await Analysis.findById(analysisId);
    if (!analysis) {
      console.log('[quizController.js][if] ❌ Analysis not found');
      return res.status(404).json({ error: 'Analysis not found. Please analyze a resume first.' });
    }
    const weaknesses = analysis.analysisStructured?.weaknesses || [];
    if (weaknesses.length === 0) {
      console.log('[quizController.js][if] ❌ No weaknesses found in the analysis');
      return res.status(400).json({ error: 'No weaknesses found in the analysis.' });
    }
    // Generate a quiz for each weakness
    const quizzes = [];
    for (const weakness of weaknesses) {
      const quiz = await generateQuizForWeakness(weakness);
      quizzes.push({ weakness, quiz });
    }
    res.json({
      quizzes: quizzes,
      basedOn: {
        weaknesses: weaknesses
      },
      success: true
    });
    console.log('[quizController.js][success] ✅ Quizzes generated for weaknesses');
  } catch (error) {
    console.error('Error generating quizzes:', error);
    res.status(500).json({ error: error.message || 'Failed to generate quizzes' });
  }
}

module.exports = {
  generateQuizHandler
}; 