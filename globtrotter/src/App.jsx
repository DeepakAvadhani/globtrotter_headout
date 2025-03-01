import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Game from './pages/Game';
import Challenge from './pages/Challenge';
import { UserProvider } from './context/UserContext';

function App() {
  return (
    <UserProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-b from-blue-500 to-purple-600 text-white">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/play" element={<Game />} />
            <Route path="/challenge/:inviteCode" element={<Challenge />} />
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;