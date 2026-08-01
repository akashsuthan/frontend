// services/api.js
import { API_ENDPOINTS } from '../config';

export const parsePipeline = async (nodes, edges) => {
    try {
        const response = await fetch(API_ENDPOINTS.PARSE_PIPELINE, {
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
