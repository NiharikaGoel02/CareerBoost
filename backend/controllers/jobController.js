const Job = require('../models/Job');
const Analysis = require('../models/Analysis');
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

exports.getRecommendedJobs = async (req, res) => {
    try {
        // Get the user's latest analysis
        const latestAnalysis = await Analysis.findOne({ 
            user: req.user._id 
        }).sort({ createdAt: -1 });

        if (!latestAnalysis) {
            return res.status(404).json({ message: 'No resume analysis found' });
        }

        // Extract information from analysis
        const skills = latestAnalysis.analysisJson?.skillsToImprove || [];
        const strengths = latestAnalysis.analysisJson?.strengths || [];
        const weaknesses = latestAnalysis.analysisJson?.weaknesses || [];

        // Create prompt for Gemini
        const prompt = `As a career advisor, analyze the following information about a candidate and suggest suitable job recommendations:

Skills to Improve: ${skills.join(', ')}
Strengths: ${strengths.join(', ')}
Weaknesses: ${weaknesses.join(', ')}

Provide 5 detailed job recommendations in the following JSON format:
{
  "jobs": [
    {
      "title": "job title",
      "company": "suggested company name",
      "role": "detailed role description",
      "location": "suggested location",
      "workType": "Remote/Hybrid/On-site",
      "jobType": "Full-time/Part-time/Internship/Contract",
      "experienceLevel": "Entry Level/Mid Level/Senior Level",
      "compensationType": "Paid/Unpaid/Performance-based",
      "salary": "estimated salary range",
      "requiredSkills": ["skill1", "skill2", ...],
      "matchingScore": "number between 0-100 based on current skills match",
      "recommendations": "specific advice for this role",
      "nextSteps": ["step1", "step2", ...]
    }
  ]
}

Ensure recommendations are realistic and aligned with the candidate's current skill level and areas for improvement.`;

        // Get response from Gemini
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const jobRecommendations = JSON.parse(response.text());

        // Save jobs to database
        const jobsToSave = jobRecommendations.jobs.map(job => ({
            ...job,
            userId: req.user._id
        }));

        // Remove previous job recommendations for this user
        await Job.deleteMany({ userId: req.user._id });

        // Save new recommendations
        await Job.insertMany(jobsToSave);

        res.json(jobsToSave);
    } catch (error) {
        console.error('Error generating job recommendations:', error);
        res.status(500).json({
            message: 'Error generating job recommendations',
            details: error.message
        });
    }
};

exports.getAllJobs = async (req, res) => {
    try {
        const jobs = await Job.find({ userId: req.user._id })
            .sort({ matchingScore: -1 });
        res.json(jobs);
    } catch (error) {
        res.status(500).json({ 
            message: 'Error fetching jobs',
            details: error.message 
        });
    }
};
