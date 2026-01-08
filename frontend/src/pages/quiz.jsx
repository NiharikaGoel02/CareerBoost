import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { analysisService } from '@/services/analysisService';

// Helper to calculate category scores
function calculateCategoryScores(quizzes, selectedAnswers) {
  const categoryTotals = {};
  const categoryCorrect = {};
  
  console.log('Calculating category scores for quizzes:', quizzes.length);
  console.log('Selected answers:', selectedAnswers);
  
  quizzes.forEach((qz, quizIdx) => {
    console.log(`Processing quiz ${quizIdx} for weakness: ${qz.weakness}`);
    (qz.quiz.questions || []).forEach((question, qIdx) => {
      const cat = question.category || 'General';
      console.log(`Question ${qIdx + 1} category: ${cat}`);
      
      categoryTotals[cat] = (categoryTotals[cat] || 0) + 1;
      if (selectedAnswers[quizIdx]?.[qIdx] === question.correctAnswer) {
        categoryCorrect[cat] = (categoryCorrect[cat] || 0) + 1;
        console.log(`Correct answer for category ${cat}`);
      } else {
        console.log(`Incorrect answer for category ${cat}`);
      }
    });
  });
  
  const categories = Object.keys(categoryTotals);
  const scores = {};
  categories.forEach(cat => {
    const correct = categoryCorrect[cat] || 0;
    const total = categoryTotals[cat] || 0;
    scores[cat] = total > 0 ? Math.round((correct / total) * 100) : 0;
    console.log(`Category ${cat}: ${correct}/${total} = ${scores[cat]}%`);
  });
  
  console.log('Final category scores:', scores);
  return scores;
}

// Helper to map AI-generated categories to display names
function mapCategoryToDisplay(category) {
  const categoryMap = {
    'Technical Skills': 'Technical Skills',
    'Technical': 'Technical Skills',
    'Programming': 'Technical Skills',
    'Coding': 'Technical Skills',
    'Development': 'Technical Skills',
    'Software': 'Technical Skills',
    'Experience': 'Experience',
    'Work Experience': 'Experience',
    'Professional Experience': 'Experience',
    'Employment': 'Experience',
    'Education': 'Education',
    'Academic': 'Education',
    'Training': 'Education',
    'Presentation': 'Presentation',
    'Communication': 'Presentation',
    'Soft Skills': 'Presentation',
    'Leadership': 'Leadership',
    'Management': 'Leadership',
    'Project Management': 'Leadership',
    'Problem Solving': 'Problem Solving',
    'Analytical': 'Problem Solving',
    'Critical Thinking': 'Problem Solving',
    'General': 'General Skills'
  };
  
  // Try exact match first
  if (categoryMap[category]) {
    return categoryMap[category];
  }
  
  // Try partial matching
  for (const [key, value] of Object.entries(categoryMap)) {
    if (category.toLowerCase().includes(key.toLowerCase()) || key.toLowerCase().includes(category.toLowerCase())) {
      return value;
    }
  }
  
  // If no match found, return the original category
  return category;
}

const Quiz = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { analysisId } = location.state || {};

  const [quizzes, setQuizzes] = useState([]); // Array of { weakness, quiz }
  const [quizLoading, setQuizLoading] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({}); // { quizIndex: { questionIndex: answerIndex } }
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [scores, setScores] = useState([]); // Array of scores per quiz
  const [showResults, setShowResults] = useState(false);
  const [error, setError] = useState('');
  const [analysisData, setAnalysisData] = useState(null);
  const [resumeName, setResumeName] = useState('Resume');

  useEffect(() => {
    if (analysisId) {
      handleQuizDown();
    }
    // eslint-disable-next-line
  }, [analysisId]);

  const handleQuizDown = async () => {
    setQuizLoading(true);
    setError('');
    setShowResults(false);
    try {
      const response = await analysisService.generateQuiz(analysisId);
      if (response.success && response.quizzes) {
        setQuizzes(response.quizzes);
        setShowQuiz(true);
        setCurrentQuizIndex(0);
        setCurrentQuestion(0);
        setSelectedAnswers({});
        setQuizCompleted(false);
        setScores([]);
      } else {
        setError('Quizzes generated but there was an issue with the data format.');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to generate quizzes. Please try again.');
    } finally {
      setQuizLoading(false);
    }
  };

  const handleAnswerSelect = (quizIdx, questionIdx, answerIdx) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [quizIdx]: {
        ...(prev[quizIdx] || {}),
        [questionIdx]: answerIdx
      }
    }));
  };

  const handleNextQuestion = () => {
    const quiz = quizzes[currentQuizIndex]?.quiz;
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateScoreForQuiz(currentQuizIndex);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateScoreForQuiz = (quizIdx) => {
    const quiz = quizzes[quizIdx]?.quiz;
    let correctAnswers = 0;
    (quiz.questions || []).forEach((question, qIdx) => {
      if (selectedAnswers[quizIdx]?.[qIdx] === question.correctAnswer) {
        correctAnswers++;
      }
    });
    setScores((prev) => {
      const newScores = [...prev];
      newScores[quizIdx] = correctAnswers;
      return newScores;
    });
    // If not last quiz, go to next quiz
    if (quizIdx < quizzes.length - 1) {
      setCurrentQuizIndex(quizIdx + 1);
      setCurrentQuestion(0);
    } else {
      setQuizCompleted(true);
      setShowResults(true);
    }
  };

  const resetQuiz = () => {
    setShowQuiz(false);
    setQuizzes([]);
    setCurrentQuizIndex(0);
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setQuizCompleted(false);
    setScores([]);
    setShowResults(false);
    if (analysisId) handleQuizDown();
  };

  const goHome = () => {
    navigate('/');
  };

  // Fetch analysis data after quiz completion
  useEffect(() => {
    if (quizCompleted && analysisId) {
      analysisService.getAnalysisById(analysisId)
        .then(res => {
          if (res.success && res.analysis) {
            setAnalysisData(res.analysis);
            // Try to get resume name from analysis if available
            if (res.analysis.resumeFileName) {
              setResumeName(res.analysis.resumeFileName);
            }
          }
        })
        .catch(() => {});
    }
  }, [quizCompleted, analysisId]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex flex-col items-center pt-28 pb-8">
      <div className="w-full max-w-4xl px-6 py-8 bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20">
        <header className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Quiz</h1>
          </div>
          <button 
            onClick={goHome} 
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 hover:from-purple-600 hover:to-pink-600"
          >
            ← Back to Home
          </button>
        </header>

        {quizLoading && (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mb-4"></div>
            <div className="text-xl font-semibold text-gray-700">Loading quiz...</div>
            <div className="text-gray-500 mt-2">Preparing your personalized questions</div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 text-red-800 px-6 py-4 rounded-lg mb-6 shadow-md">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              {error}
            </div>
          </div>
        )}

        {showQuiz && quizzes.length > 0 && !quizCompleted && (
          <div className="quiz-section animate-fade-in">
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 mb-6 border border-purple-100">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Quiz for Weakness: 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 ml-2">
                  {quizzes[currentQuizIndex].weakness}
                </span>
              </h3>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="text-gray-600 font-medium">
                  Question {currentQuestion + 1} of {quizzes[currentQuizIndex].quiz.questions.length}
                </div>
                <div className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">
                  {quizzes[currentQuizIndex].quiz.questions[currentQuestion].category || 'General'}
                </div>
              </div>
            </div>

            <div className="quiz-question mb-8">
              <h4 className="text-xl font-semibold mb-6 text-gray-800 leading-relaxed">
                {quizzes[currentQuizIndex].quiz.questions[currentQuestion].question}
              </h4>
              
              <div className="space-y-4 mb-8">
                {quizzes[currentQuizIndex].quiz.questions[currentQuestion].options.map((option, idx) => (
                  <label 
                    key={idx} 
                    className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 hover:shadow-md ${
                      selectedAnswers[currentQuizIndex]?.[currentQuestion] === idx
                        ? 'border-purple-500 bg-purple-50 shadow-md'
                        : 'border-gray-200 hover:border-purple-300 bg-white'
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      selectedAnswers[currentQuizIndex]?.[currentQuestion] === idx
                        ? 'border-purple-500 bg-purple-500'
                        : 'border-gray-300'
                    }`}>
                      {selectedAnswers[currentQuizIndex]?.[currentQuestion] === idx && (
                        <div className="w-3 h-3 bg-white rounded-full"></div>
                      )}
                    </div>
                    <input
                      type="radio"
                      name={`question-${currentQuizIndex}-${currentQuestion}`}
                      value={idx}
                      checked={selectedAnswers[currentQuizIndex]?.[currentQuestion] === idx}
                      onChange={() => handleAnswerSelect(currentQuizIndex, currentQuestion, idx)}
                      className="sr-only"
                    />
                    <span className="text-gray-800 font-medium">{option}</span>
                  </label>
                ))}
              </div>

              <div className="flex justify-between gap-4">
                <button
                  onClick={handlePreviousQuestion}
                  disabled={currentQuestion === 0}
                  className="px-6 py-3 rounded-xl bg-gray-100 text-gray-700 font-semibold shadow-md hover:bg-gray-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Previous
                </button>
                <button
                  onClick={handleNextQuestion}
                  disabled={selectedAnswers[currentQuizIndex]?.[currentQuestion] === undefined}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {currentQuestion === quizzes[currentQuizIndex].quiz.questions.length - 1 ?
                    (currentQuizIndex === quizzes.length - 1 ? 'Finish All Quizzes' : 'Next Quiz') : 'Next'}
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}

        {showResults && quizCompleted && quizzes.length > 0 && (
          <>
            {/* Summary Card */}
            <div className="mb-8 flex justify-center">
              <div className="w-full max-w-2xl bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 rounded-3xl shadow-2xl p-8 border border-white/30 backdrop-blur-sm">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">Quiz Complete!</h2>
                  <div className="text-lg font-semibold text-gray-600">{resumeName}</div>
                </div>

                <div className="bg-white/60 rounded-2xl p-6 mb-6 backdrop-blur-sm">
                  <div className="mb-4 text-gray-700">
                    <span className="font-semibold">Resume Analysis:</span>
                    <span className="ml-2">{analysisData?.analysisStructured?.overallEvaluation || analysisData?.analysisJson?.overallEvaluation || 'No summary available.'}</span>
                  </div>
                </div>

                <div className="flex flex-col items-center mb-6">
                  <div className="relative">
                    <div className="w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-2xl">
                      <div className="text-4xl font-extrabold text-white">
                        {Math.round((scores.reduce((a, b) => a + (b || 0), 0) / quizzes.reduce((a, q) => a + (q.quiz.questions.length || 0), 0)) * 100)}
                      </div>
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-gray-800 mt-4">Overall Score</div>
                  <div className="text-gray-500">out of 100 points</div>
                </div>

                {/* Category Scores */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {(() => {
                    const catScores = calculateCategoryScores(quizzes, selectedAnswers);
                    const categories = Object.keys(catScores);
                    
                    if (categories.length === 0) {
                      return (
                        <div className="col-span-full text-center text-gray-500 py-4">
                          No category scores available
                        </div>
                      );
                    }
                    
                    const groupedScores = {};
                    categories.forEach(cat => {
                      const displayName = mapCategoryToDisplay(cat);
                      if (!groupedScores[displayName]) {
                        groupedScores[displayName] = { total: 0, count: 0 };
                      }
                      groupedScores[displayName].total += catScores[cat];
                      groupedScores[displayName].count += 1;
                    });
                    
                    const finalScores = {};
                    Object.keys(groupedScores).forEach(displayName => {
                      finalScores[displayName] = Math.round(groupedScores[displayName].total / groupedScores[displayName].count);
                    });
                    
                    const displayCategories = Object.keys(finalScores);
                    
                    return displayCategories.map((cat, idx) => (
                      <div key={cat} className="bg-white/60 rounded-xl p-4 text-center backdrop-blur-sm">
                        <div className="text-sm font-semibold text-gray-600 mb-2">{cat}</div>
                        <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                          {finalScores[cat]}%
                        </div>
                      </div>
                    ));
                  })()}
                </div>
              </div>
            </div>

            <div className="quiz-results">
              <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-6 text-center">
                Detailed Results
              </h3>
              
              <div className="bg-white/60 rounded-2xl p-6 mb-8 backdrop-blur-sm">
                <h4 className="text-xl font-semibold text-gray-800 mb-2">
                  Total Score: {scores.reduce((a, b) => a + (b || 0), 0)}/
                  {quizzes.reduce((a, q) => a + (q.quiz.questions.length || 0), 0)}
                </h4>
                <p className="text-gray-600">
                  Percentage: {Math.round((scores.reduce((a, b) => a + (b || 0), 0) / quizzes.reduce((a, q) => a + (q.quiz.questions.length || 0), 0)) * 100)}%
                </p>
              </div>

              {quizzes.map((qz, quizIdx) => (
                <div key={quizIdx} className="quiz-review mb-8 bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-lg border border-gray-100">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                      <span className="text-white font-bold">{quizIdx + 1}</span>
                    </div>
                    <h4 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                      Quiz for Weakness: {qz.weakness}
                    </h4>
                  </div>
                  
                  {qz.quiz.questions.map((question, qIndex) => (
                    <div key={qIndex} className="question-review mb-6 p-4 bg-white rounded-xl border border-gray-100">
                      <p className="font-semibold text-gray-800 mb-2">
                        <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-sm mr-2">Q{qIndex + 1}</span>
                        {question.question}
                      </p>
                      <p className="text-gray-500 text-sm mb-3 px-2 py-1 bg-gray-50 rounded-lg inline-block">
                        Category: {question.category || 'General'}
                      </p>
                      
                      <div className={`answer p-3 rounded-lg mb-2 ${
                        selectedAnswers[quizIdx]?.[qIndex] === question.correctAnswer 
                          ? 'bg-green-50 border border-green-200' 
                          : 'bg-red-50 border border-red-200'
                      }`}>
                        <p className={`font-semibold ${
                          selectedAnswers[quizIdx]?.[qIndex] === question.correctAnswer 
                            ? 'text-green-700' 
                            : 'text-red-700'
                        }`}>
                          Your answer: {question.options[selectedAnswers[quizIdx]?.[qIndex]] || 'No answer selected'}
                          {selectedAnswers[quizIdx]?.[qIndex] === question.correctAnswer ? ' ✅' : ' ❌'}
                        </p>
                      </div>
                      
                      {selectedAnswers[quizIdx]?.[qIndex] !== question.correctAnswer && (
                        <div className="correct-answer p-3 bg-green-50 border border-green-200 rounded-lg mb-3">
                          <p className="text-green-700 font-semibold">
                            Correct answer: {question.options[question.correctAnswer]} ✅
                          </p>
                        </div>
                      )}
                      
                      <div className="explanation p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <p className="text-gray-700">
                          <span className="font-semibold text-blue-700">Explanation:</span> {question.explanation}
                        </p>
                      </div>
                    </div>
                  ))}
                  
                  <div className="score-display mt-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
                    <h4 className="text-lg font-semibold text-gray-800">
                      Score: {scores[quizIdx] || 0}/{qz.quiz.questions.length}
                    </h4>
                  </div>
                </div>
              ))}
              
              <div className="quiz-actions flex flex-col md:flex-row gap-4 justify-center mt-8">
                <button 
                  onClick={resetQuiz} 
                  className="px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Take All Quizzes Again
                </button>
                <button 
                  onClick={goHome} 
                  className="px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Analyze New Resume
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Quiz; 