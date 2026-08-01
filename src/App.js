import { PipelineToolbar } from './components/PipelineToolbar';
import { PipelineUI } from './components/PipelineUI';
import { SubmitButton } from './components/SubmitButton';

function App() {
  return (
    <div>
      <PipelineToolbar />
      <PipelineUI />
      <SubmitButton />
    </div>
  );
}

export default App;
