import { useState, useEffect } from 'react';
import { useStore } from '../store';
import { shallow } from 'zustand/shallow';
import { parsePipeline } from '../services/api';

const selector = (state) => ({ nodes: state.nodes, edges: state.edges });

export const SubmitButton = () => {
  const { nodes, edges } = useStore(selector, shallow);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [isReviewed, setIsReviewed] = useState(false);

  const [isSubmitted, setIsSubmitted] = useState(false);

  // Reset review status when nodes/edges change
  useEffect(() => {
    setIsReviewed(false);
    setIsSubmitted(false);
  }, [nodes, edges]);

  const handleReview = async () => {
    setLoading(true);
    setResult(null);
    setError(null);
    setIsReviewed(false);
    setIsSubmitted(false);
    try {
      const data = await parsePipeline(nodes, edges);
      setResult(data);
      if (data && data.is_dag) {
        setIsReviewed(true);
      }
    } catch {
      setError('Backend unreachable. Is the server running?');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    setResult(null); // Hide the review toast if we want, or keep it.
    setIsSubmitted(true);
    // Auto-hide the success toast after 3 seconds
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <div className="submit-wrap" style={{ position: 'relative' }}>
        {error && (
          <div className="pipeline-toast" style={{ borderColor: 'rgba(239,68,68,0.3)', position: 'absolute', top: 50, right: 0 }}>
            <button className="toast-close" onClick={() => setError(null)}>×</button>
            <div className="pipeline-toast-title">
              <span style={{ width:6, height:6, borderRadius:'50%', background:'#ef4444', display:'inline-block', boxShadow:'0 0 8px #ef4444' }} />
              Error
            </div>
            <p style={{ fontSize: 12.5, color: '#f87171', margin: 0 }}>{error}</p>
          </div>
        )}

        {result && (
          <div className="pipeline-toast" style={{ position: 'absolute', top: 50, right: 0 }}>
            <button className="toast-close" onClick={() => setResult(null)}>×</button>
            <div className="pipeline-toast-title">
              <span className="pipeline-toast-title-dot" />
              Pipeline Analysis
            </div>
            <div className="pipeline-toast-row">
              <span className="pipeline-toast-key">Nodes</span>
              <span className="pipeline-toast-val">{result.num_nodes}</span>
            </div>
            <div className="pipeline-toast-row">
              <span className="pipeline-toast-key">Edges</span>
              <span className="pipeline-toast-val">{result.num_edges}</span>
            </div>
            <div className="pipeline-toast-row">
              <span className="pipeline-toast-key">Valid DAG</span>
              <span className={`pipeline-toast-val ${result.is_dag ? 'is-dag-yes' : 'is-dag-no'}`}>
                {result.is_dag ? '✓ Yes' : '✗ No'}
              </span>
            </div>
          </div>
        )}

        {isSubmitted && (
          <div className="pipeline-toast" style={{ borderColor: 'rgba(34,197,94,0.3)', position: 'absolute', top: 50, right: 0 }}>
            <button className="toast-close" onClick={() => setIsSubmitted(false)}>×</button>
            <div className="pipeline-toast-title">
              Success
            </div>
            <p style={{ fontSize: 13, color: '#16a34a', margin: 0 }}>Pipeline submitted successfully!</p>
          </div>
        )}

        <div style={{ display: 'flex', gap: '12px' }}>
          <button className="review-btn" onClick={handleReview} disabled={loading}>
            {loading ? 'Reviewing…' : 'Review'}
          </button>
          
          <button className="submit-btn" onClick={handleSubmit} disabled={loading || !isReviewed}>
            Submit
          </button>
        </div>
      </div>
    </>
  );
};
