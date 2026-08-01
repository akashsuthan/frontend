import './styles/index.css';
import { PipelineToolbar } from './components/PipelineToolbar';
import { PipelineUI } from './components/PipelineUI';

function App() {
  return (
    <div className="app-shell">
      <PipelineToolbar />
      <div style={{ position: 'relative', flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <PipelineUI />
      </div>
    </div>
  );
}

export default App;
