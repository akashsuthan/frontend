import { useState, useEffect } from "react";
import { useStore } from "../store";
import { shallow } from "zustand/shallow";
import { parsePipeline } from "../services/api";
import { X, Check } from "lucide-react";

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
      setError("Backend unreachable. Is the server running?");
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
      <div className="submit-wrap">
        {error && (
          <div className="pipeline-toast error">
            <button className="toast-close" onClick={() => setError(null)}>
              <X size={18} />
            </button>
            <div className="pipeline-toast-title">
              <span className="pipeline-toast-title-dot error" />
              Error
            </div>
            <p className="toast-text-error">{error}</p>
          </div>
        )}

        {result && (
          <div className="pipeline-toast">
            <button className="toast-close" onClick={() => setResult(null)}>
              <X size={18} />
            </button>
            <div className="pipeline-toast-title">Pipeline Analysis</div>
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
              <span
                className={`pipeline-toast-val ${result.is_dag ? "is-dag-yes" : "is-dag-no"}`}
                style={{ display: "flex", alignItems: "center", gap: "4px" }}
              >
                {result.is_dag ? (
                  <>
                    <Check size={16} /> Yes
                  </>
                ) : (
                  <>
                    <X size={16} /> No
                  </>
                )}
              </span>
            </div>
            {result.error && (
              <div className="pipeline-toast-row col">
                <span className="pipeline-toast-key error">Error Details</span>
                <span className="pipeline-toast-val error-desc">
                  {result.error}
                </span>
              </div>
            )}
          </div>
        )}

        {isSubmitted && (
          <div className="pipeline-toast success">
            <button
              className="toast-close"
              onClick={() => setIsSubmitted(false)}
            >
              <X size={18} />
            </button>
            <div className="pipeline-toast-title">Success</div>
            <p className="toast-text-success">
              Pipeline submitted successfully!
            </p>
          </div>
        )}

        <div className="submit-actions">
          <button
            className="review-btn"
            onClick={handleReview}
            disabled={loading}
          >
            {loading ? "Reviewing…" : "Review"}
          </button>

          <button
            className="submit-btn"
            onClick={handleSubmit}
            disabled={loading || !isReviewed}
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
};
