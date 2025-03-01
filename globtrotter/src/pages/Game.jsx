import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import api from "../services/api";
import { UserContext } from "../context/UserContext";
import Confetti from "react-confetti";
import Loading from "../components/Loading";
import ShareModal from "../components/ShareModal";

const Game = () => {
  const [destination, setDestination] = useState(null);
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showShareModal, setShowShareModal] = useState(false);
  const { user, updateScore } = useContext(UserContext);
  const navigate = useNavigate();

  const loadDestination = async () => {
    setLoading(true);
    setDestination(null);
    setOptions([]);
    setSelectedOption(null);
    setResult(null);

    try {
      const destResponse = await api.get("/destinations/random");
      setDestination(destResponse.data);

      const optionsResponse = await api.get(
        `/destinations/options/${destResponse.data.id}`
      );
      setOptions(optionsResponse.data);

      setLoading(false);
    } catch (error) {
      console.error("Error loading game:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }

    loadDestination();
  }, [user, navigate]);

  const verifyAnswer = async (selectedName) => {
    if (!destination || result) return;

    setSelectedOption(selectedName);

    try {
      const response = await api.post(
        `/destinations/verify/${destination.id}`,
        {
          answer: selectedName,
        }
      );

      setResult(response.data);

      updateScore(response.data.isCorrect);
    } catch (error) {
      console.error("Error verifying answer:", error);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl min-h-screen flex flex-col">
      <div className="bg-white/10 rounded-xl p-4 mb-6 backdrop-blur-sm">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">🧩 Globetrotter</h1>

          {user && (
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <p className="text-sm opacity-80">Player</p>
                <p className="font-bold">{user.username}</p>
              </div>
              <div className="flex space-x-2">
                <div className="bg-green-500/80 rounded-lg py-1 px-3">
                  <span role="img" aria-label="Correct">
                    ✓
                  </span>{" "}
                  {user.score.correct}
                </div>
                <div className="bg-red-500/80 rounded-lg py-1 px-3">
                  <span role="img" aria-label="Incorrect">
                    ✗
                  </span>{" "}
                  {user.score.incorrect}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex-grow">
        {destination && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/10 rounded-xl p-6 backdrop-blur-sm mb-6"
          >
            <div className="text-center mb-6">
              <h2 className="text-xl font-medium opacity-80">
                Guess the Destination
              </h2>
              <div className="mt-1 inline-block bg-purple-700 rounded-full px-3 py-1 text-sm">
                Difficulty: {destination.difficulty}
              </div>
            </div>

            <div className="space-y-4 mb-8">
              {destination.clues.map((clue, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.3 }}
                  className="bg-white/5 p-4 rounded-lg border border-white/20"
                >
                  <div className="flex items-start">
                    <span className="bg-purple-600 h-6 w-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      {index + 1}
                    </span>
                    <p className="text-lg">{clue}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {!result && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {options.map((option, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="bg-white/20 hover:bg-white/30 rounded-lg p-4 text-left transition"
                    onClick={() => verifyAnswer(option.name)}
                  >
                    {option.name}
                  </motion.button>
                ))}
              </div>
            )}

            <AnimatePresence>
              {result && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className={`mt-8 p-6 rounded-xl text-center ${
                    result.isCorrect ? "bg-green-600/30" : "bg-red-600/30"
                  }`}
                >
                  {result.isCorrect && (
                    <div className="absolute inset-0 pointer-events-none">
                      <Confetti
                        recycle={false}
                        numberOfPieces={200}
                        gravity={0.2}
                      />
                    </div>
                  )}
                  <h3 className="text-2xl font-bold mb-2">
                    {result.isCorrect ? "🎉 Correct!" : "😢 Not quite right!"}
                  </h3>
                  <p className="text-xl mb-4">
                    The answer is{" "}
                    <span className="font-bold">
                      {result.destination.name}, {result.destination.country}
                    </span>
                  </p>
                  <div className="bg-white/10 p-4 rounded-lg mb-6">
                    <h4 className="font-medium mb-2">Fun Fact:</h4>
                    <p>{result.destination.funFact}</p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-white text-purple-600 font-bold py-3 px-6 rounded-full"
                      onClick={loadDestination}
                    >
                      Next Destination
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-purple-600 text-white font-bold py-3 px-6 rounded-full"
                      onClick={() => setShowShareModal(true)}
                    >
                      Challenge a Friend
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {showShareModal && (
        <ShareModal
          onClose={() => setShowShareModal(false)}
          userId={user._id}
          username={user.username}
          score={user.score}
        />
      )}
    </div>
  );
};

export default Game;
