import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import NationalConsciousnessFlow from './pages/NationalConsciousnessFlow';
import Quiz from './pages/Quiz';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<NationalConsciousnessFlow/>} />
          <Route path="/quiz" element={<Quiz/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
