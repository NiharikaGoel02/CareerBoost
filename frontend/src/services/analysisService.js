import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export const analysisService = {
  // Get all analyses for the current user
  async getUserAnalyses() {
    try {
      const response = await axios.get(`${API_BASE_URL}/analyses`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user analyses:', error);
      throw error;
    }
  },

  // Get a specific analysis by ID
  async getAnalysisById(analysisId) {
    try {
      const response = await axios.get(`${API_BASE_URL}/analysis/${analysisId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching analysis:', error);
      throw error;
    }
  },

  // Analyze a resume
  async analyzeResume(formData) {
    try {
      const response = await axios.post(`${API_BASE_URL}/analyze-resume`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error analyzing resume:', error);
      throw error;
    }
  },

  // Generate quiz for an analysis
  async generateQuiz(analysisId) {
    try {
      const response = await axios.post(`${API_BASE_URL}/generate-quiz/${analysisId}`);
      return response.data;
    } catch (error) {
      console.error('Error generating quiz:', error);
      throw error;
    }
  }
}; 