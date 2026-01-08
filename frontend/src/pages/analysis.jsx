import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatedGradientBackground } from '@/components/section/AnimatedGradientBackground';
import { analysisService } from '@/services/analysisService';
import { useUser } from '@/contexts/UserContext';

const Analysis = () => {
  const { user } = useUser();
  const [resumeFile, setResumeFile] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [analysis, setAnalysis] = useState('');
  const [analysisId, setAnalysisId] = useState('');
  const [structuredData, setStructuredData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setResumeFile(file);
      setError('');
      setAnalysis('');
      setAnalysisId('');
      setStructuredData(null);
    } else {
      setError('Please select a PDF file');
      setResumeFile(null);
    }
  };

  const handleAnalyze = async () => {
    if (!user) {
      navigate('/user/signin');
      return;
    }
    
    if (!resumeFile) {
      setError('Please upload a resume first');
      return;
    }
    
    const formData = new FormData();
    formData.append('resume', resumeFile);
    formData.append('jobDescription', jobDescription);
    setLoading(true);
    setError('');
    setAnalysis('');
    try {
      const response = await analysisService.analyzeResume(formData);
      if (response.success) {
        setAnalysis(response.analysis);
        setAnalysisId(response.analysisId);
        setStructuredData(response.structuredData);
        console.log('Analysis stored with ID:', response.analysisId);
      } else {
        setError('Analysis completed but there was an issue saving the data.');
      }
    } catch (err) {
      console.error('Analysis error:', err);
      setError(err.response?.data?.error || 'Analysis failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const resetAll = () => {
    setResumeFile(null);
    setJobDescription('');
    setAnalysis('');
    setAnalysisId('');
    setStructuredData(null);
    setError('');
  };

  const goToQuiz = () => {
    if (analysisId) {
      navigate('/quiz', { state: { analysisId } });
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-white to-gray-50">
      <AnimatedGradientBackground />
      <div className="w-full max-w-2xl px-4 py-16 mx-auto mt-32 bg-white/80 rounded-3xl shadow-xl border border-white/30 backdrop-blur-md">
        <header className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-[#f8a4a8] to-[#a78bfa] text-transparent bg-clip-text">AI Resume Analyzer</h1>
          <p className="text-lg text-gray-700">Analyze your resume and match it with job descriptions using Google Gemini AI.</p>
        </header>
        <div className="mb-8">
          <div className="input-section space-y-8">
            <div className="upload-section">
              <h3 className="text-2xl font-semibold mb-4">Upload Resume</h3>
              <div className="file-upload flex items-center gap-4">
                <input
                  type="file"
                  id="resume-upload"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <label htmlFor="resume-upload" className="file-label cursor-pointer bg-gradient-to-r from-[#f8a4a8] to-[#a78bfa] text-white font-semibold py-2 px-6 rounded-full shadow-md hover:opacity-90 transition-all">
                  {resumeFile ? resumeFile.name : 'Choose PDF file'}
                </label>
              </div>
              {resumeFile && (
                <div className="success-message bg-green-100 border border-green-200 text-green-800 px-4 py-3 rounded relative mt-4" role="alert">
                  <strong className="font-bold">Success!</strong>
                  <span className="block sm:inline"> Resume uploaded successfully!</span>
                </div>
              )}
            </div>
            <div className="job-description-section">
              <h3 className="text-2xl font-semibold mb-4">Job Description (Optional)</h3>
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the job description here..."
                className="job-description-input w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#a78bfa] text-base shadow-sm bg-white/80"
                rows={6}
              />
            </div>
            <div className="button-group flex flex-col sm:flex-row gap-4 mt-4">
              <button
                onClick={handleAnalyze}
                disabled={!resumeFile || loading}
                className="analyze-button bg-gradient-to-r from-[#f8a4a8] to-[#a78bfa] hover:opacity-90 text-white font-bold py-2 px-6 rounded-full focus:outline-none focus:shadow-outline transition duration-300 shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? 'Analyzing...' : 'Analyze Resume'}
              </button>
              {(analysis || analysisId) && (
                <button
                  onClick={resetAll}
                  className="reset-button bg-gradient-to-r from-red-400 to-red-600 hover:opacity-90 text-white font-bold py-2 px-6 rounded-full focus:outline-none focus:shadow-outline transition duration-300 shadow-lg"
                >
                  Start New Analysis
                </button>
              )}
            </div>
            {error && <div className="error-message bg-red-100 border border-red-200 text-red-800 px-4 py-3 rounded relative mt-4" role="alert">
              <strong className="font-bold">Error!</strong>
              <span className="block sm:inline">{error}</span>
            </div>}
          </div>
          {analysis && (
            <div className="analysis-section mt-10 bg-white/90 rounded-2xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-[#f8a4a8] to-[#a78bfa] text-transparent bg-clip-text">Analysis Results</h3>
              {structuredData ? (
                <div className="analysis-structured space-y-6">
                  {structuredData.strengths && structuredData.strengths.length > 0 && (
                    <div>
                      <h4 className="text-lg font-bold mb-2 text-gray-800">Strengths</h4>
                      <ul className="list-disc list-inside text-gray-700">
                        {structuredData.strengths.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {structuredData.weaknesses && structuredData.weaknesses.length > 0 && (
                    <div>
                      <h4 className="text-lg font-bold mb-2 text-gray-800">Weaknesses</h4>
                      <ul className="list-disc list-inside text-gray-700">
                        {structuredData.weaknesses.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {structuredData.skillsToImprove && structuredData.skillsToImprove.length > 0 && (
                    <div>
                      <h4 className="text-lg font-bold mb-2 text-gray-800">Skills to Improve</h4>
                      <ul className="list-disc list-inside text-gray-700">
                        {structuredData.skillsToImprove.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {structuredData.courseRecommendations && structuredData.courseRecommendations.length > 0 && (
                    <div>
                      <h4 className="text-lg font-bold mb-2 text-gray-800">Course Recommendations</h4>
                      <ul className="list-disc list-inside text-gray-700">
                        {structuredData.courseRecommendations.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {structuredData.overallEvaluation && (
                    <div>
                      <h4 className="text-lg font-bold mb-2 text-gray-800">Overall Evaluation</h4>
                      <p className="text-gray-700">{structuredData.overallEvaluation}</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="analysis-content mb-6">
                  {analysis.split('\n').map((line, index) => (
                    <p key={index} className="text-lg mb-2 text-gray-800">{line}</p>
                  ))}
                </div>
              )}
              <div className="quiz-button-section flex flex-col items-center mt-6">
                <button
                  onClick={goToQuiz}
                  disabled={!analysisId}
                  className="quiz-button bg-gradient-to-r from-purple-500 to-[#a78bfa] hover:opacity-90 text-white font-bold py-2 px-6 rounded-full focus:outline-none focus:shadow-outline transition duration-300 shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  Start Quiz
                </button>
                {analysisId && (
                  <div className="analysis-id-info text-lg text-gray-700 mt-4">
                    Analysis ID: {analysisId}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        <footer className="text-center text-gray-500 text-sm mt-8">
          <p>
            Powered by <strong className="text-gray-800">React</strong> and <strong className="text-gray-800">Google Gemini AI</strong> | 
            Developed by{' '}
            <a
              href="https://www.linkedin.com/in/dutta-sujoy/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              <strong>Sujoy Dutta</strong>
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Analysis;