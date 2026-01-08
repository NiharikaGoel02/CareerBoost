import React, { useEffect, useState } from 'react';
import { getRecommendedJobs } from '@/services/jobService';
import { Card } from '@/components/ui/card';
import { Button } from "@/components/ui/button";

const JobRecommendations = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await getRecommendedJobs();
            
            if (!data) {
                setError('No job data received');
                return;
            }

            if (Array.isArray(data)) {
                setJobs(data);
            } else if (data.message) {
                // Handle specific error messages from the backend
                setError(data.message);
            } else {
                console.error('Invalid jobs data:', data);
                setError('Received invalid job data format');
            }
        } catch (err) {
            console.error('Job fetch error:', err);
            if (err.message === 'No resume analysis found') {
                setError('Please upload and analyze your resume first to get job recommendations');
            } else {
                setError(err.message || 'Failed to fetch job recommendations. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="p-4 border rounded-lg shadow-sm">
                <h2 className="text-2xl font-bold mb-4">Recommended Jobs</h2>
                <div className="flex justify-center items-center h-32">
                    <div className="animate-pulse text-gray-600">Loading job recommendations...</div>
                </div>
            </div>
        );
    }
    
    if (error) {
        return (
            <div className="p-4 border rounded-lg shadow-sm">
                <h2 className="text-2xl font-bold mb-4">Recommended Jobs</h2>
                <div className="p-4 bg-red-50 rounded-lg">
                    <div className="flex flex-col items-center text-center">
                        <p className="text-gray-800 mb-4">{error}</p>
                        {error.includes('analyze your resume first') ? (
                            <Button 
                                onClick={() => window.location.href = '#upload-section'}
                                className="bg-blue-500 hover:bg-blue-600 text-white"
                            >
                                Upload Resume
                            </Button>
                        ) : (
                            <Button 
                                onClick={fetchJobs}
                                className="bg-blue-500 hover:bg-blue-600 text-white"
                            >
                                Try Again
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-4">Recommended Jobs</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {jobs.map((job) => (
                    <Card key={job._id} className="p-6 hover:shadow-lg transition-shadow">
                        <div className="flex flex-col space-y-3">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
                                    <p className="text-sm text-gray-600">{job.role}</p>
                                </div>
                                <div className="flex flex-col items-end gap-2">
                                    <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                                        Match: {job.matchingScore}%
                                    </span>
                                    <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                                        {job.jobType}
                                    </span>
                                </div>
                            </div>
                            
                            <div className="flex items-center space-x-2 text-gray-600">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                                <p className="font-medium">{job.company}</p>
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                                <div className="flex items-center space-x-2 text-gray-600">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <p>{job.location}</p>
                                </div>

                                <div className="flex items-center space-x-2 text-gray-600">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    <p>{job.workType}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                                <div className="flex items-center space-x-2 text-gray-600">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <p>{job.salary}</p>
                                </div>

                                <div className="flex items-center space-x-2 text-gray-600">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <p>{job.compensationType}</p>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2 mt-2">
                                {job.requiredSkills.map((skill, index) => (
                                    <span
                                        key={index}
                                        className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>

                            <div className="border-t pt-3 mt-3">
                                <h4 className="font-semibold text-gray-900 mb-2">Recommendations</h4>
                                <p className="text-gray-700 text-sm">{job.recommendations}</p>
                            </div>

                            <div className="border-t pt-3">
                                <h4 className="font-semibold text-gray-900 mb-2">Next Steps</h4>
                                <ul className="list-disc list-inside text-sm text-gray-700">
                                    {job.nextSteps.map((step, index) => (
                                        <li key={index}>{step}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className="pt-4">
                                <Button
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition-colors"
                                    onClick={() => window.open(`https://www.google.com/search?q=${job.company}+careers+${job.title}`, '_blank')}
                                >
                                    Learn More
                                </Button>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default JobRecommendations;
