import LandingPage from './pages/LandingPage'
import Login from './pages/Login';
import Signin from './pages/SignUp';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" exact element={<LandingPage />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/register" exact element={<Signin />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App
