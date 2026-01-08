import axios from 'axios';

const API_URL = 'http://localhost:5000/api/jobs';

const getAuthToken = () => {
    return localStorage.getItem('token');
};

export const getRecommendedJobs = async () => {
    try {
        const token = getAuthToken();
        const response = await axios.get(`${API_URL}/recommended`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Job recommendation error:', error.response?.data || error);
        throw error.response?.data || error.message;
    }
};

export const getAllJobs = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};
