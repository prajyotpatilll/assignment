import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Leaderboard from './pages/Leaderboard';
import Dashboard from './pages/DashBoard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
