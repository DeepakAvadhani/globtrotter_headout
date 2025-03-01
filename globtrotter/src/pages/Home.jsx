import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { UserContext } from "../context/UserContext";
import GlobeIcon from "../components/GlobeIcon.jsx";

const Home = () => {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const { user, createUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username.trim()) {
      setError("Please enter a username");
      return;
    }

    try {
      await createUser(username);
      navigate("/play");
    } catch (error) {
      console.error("Error:", error);
      setError("Something went wrong. Please try again.");
    }
  };

  if (user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <GlobeIcon size={120} />
        </motion.div>

        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-4xl font-bold mb-4"
        >
          Welcome back, {user.username}!
        </motion.h1>

        <div className="mb-8">
          <p className="text-xl">Your current score:</p>
          <div className="flex justify-center gap-4 mt-2">
            <div className="bg-green-500 rounded-lg p-3">
              <p className="text-lg">Correct</p>
              <p className="text-2xl font-bold">{user.score.correct}</p>
            </div>
            <div className="bg-red-500 rounded-lg p-3">
              <p className="text-lg">Incorrect</p>
              <p className="text-2xl font-bold">{user.score.incorrect}</p>
            </div>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-white text-purple-600 font-bold py-3 px-8 rounded-full text-lg shadow-lg hover:bg-purple-100 transition"
          onClick={() => navigate("/play")}
        >
          Start Playing
        </motion.button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <GlobeIcon size={120} />
      </motion.div>

      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-4xl font-bold mb-2"
      >
        🧩 Globetrotter Challenge
      </motion.h1>

      <motion.p
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="text-xl mb-8"
      >
        The Ultimate Travel Guessing Game!
      </motion.p>

      <motion.form
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        onSubmit={handleSubmit}
        className="w-full max-w-md"
      >
        <div className="mb-4">
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full py-3 px-4 rounded-full text-purple-900 bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-purple-300 text-lg"
          />
          {error && <p className="text-red-300 mt-2">{error}</p>}
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="w-full bg-white text-purple-600 font-bold py-3 px-8 rounded-full text-lg shadow-lg hover:bg-purple-100 transition"
        >
          Start Your Adventure
        </motion.button>
      </motion.form>
    </div>
  );
};

export default Home;
