// API service for quiz submission and scoreboard
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://nuzzhkfqmcvvhsfqvjhk.supabase.co/functions/v1';
const API_TOKEN = import.meta.env.VITE_API_TOKEN;

// Helper function to make API requests
const apiRequest = async (endpoint, options = {}) => {
    const url = `${API_BASE_URL}${endpoint}`;

    const defaultOptions = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_TOKEN}`,
        },
    };

    const config = {
        ...defaultOptions,
        ...options,
        headers: {
            ...defaultOptions.headers,
            ...options.headers,
        },
    };

    try {
        const response = await fetch(url, config);

        if (!response.ok) {
            throw new Error(`API request failed: ${response.status} ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('API request error:', error);
        throw error;
    }
};

// Submit quiz score
export const submitQuizScore = async (userName, score, correct) => {
    const payload = {
        user_name: userName,
        score: score,
        correct: correct
    };

    return await apiRequest('/submit-quiz', {
        method: 'POST',
        body: JSON.stringify(payload),
    });
};

// Get scoreboard data
export const getScoreboard = async () => {
    const response = await apiRequest('/scoreboard', {
        method: 'GET',
    });

    console.log('Raw API response:', response);

    // Transform the API response to match component expectations
    if (response.success && response.data) {
        const transformedData = response.data.map(item => {
            const totalQuestions = Number(item.total) || 15;
            const correctAnswers = Number(item.correct) || 0;
            const computedPercentage = Math.round((correctAnswers / totalQuestions) * 100);
            return ({
                id: item.id,
                name: item.user_name,
                score: correctAnswers,
                total: totalQuestions,
                time: new Date(item.created_at).toLocaleTimeString('vi-VN', {
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit'
                }),
                rank: item.rank,
                percentage: computedPercentage
            });
        });

        console.log('Transformed scoreboard data:', transformedData);
        return transformedData;
    }

    console.log('No data in response or success is false');
    return [];
};
