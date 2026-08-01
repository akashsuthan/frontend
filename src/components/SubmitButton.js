import { useStore } from '../store';
import { shallow } from 'zustand/shallow';
import { parsePipeline } from '../services/api';

const selector = (state) => ({
    nodes: state.nodes,
    edges: state.edges,
});

export const SubmitButton = () => {
    const { nodes, edges } = useStore(selector, shallow);

    const handleSubmit = async () => {
        try {
            const data = await parsePipeline(nodes, edges);
            
            // Format the alert message nicely
            alert(
                `Pipeline Status:\n` +
                `----------------\n` +
                `Number of Nodes: ${data.num_nodes}\n` +
                `Number of Edges: ${data.num_edges}\n` +
                `Is DAG: ${data.is_dag ? 'Yes ✅' : 'No ❌'}`
            );

        } catch (error) {
            alert('Failed to submit pipeline. Please ensure the backend is running.');
        }
    };

    return (
        <div className="submit-container">
            <button type="submit" onClick={handleSubmit} className="submit-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
                Submit Pipeline
            </button>
        </div>
    );
}
