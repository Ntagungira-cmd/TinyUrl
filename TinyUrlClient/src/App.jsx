import LandingPage from './pages/LandingPage'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" exact element={<LandingPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App
