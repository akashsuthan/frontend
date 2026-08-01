// services/api.js
const API_BASE_URL = 'http://localhost:8000';

export const parsePipeline = async (nodes, edges) => {
    try {
        const response = await fetch(`${API_BASE_URL}/pipelines/parse`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nodes, edges })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return await response.json();
    } catch (error) {
        console.error('Error submitting pipeline:', error);
        throw error;
    }
};
