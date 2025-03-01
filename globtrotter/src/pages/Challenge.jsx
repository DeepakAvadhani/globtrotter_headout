import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../services/api";
import { UserContext } from "../context/UserContext";
import Loading from "../components/Loading";

const Challenge = () => {
  const [challenge, setChallenge] = useState(null);
  const [loading, setLoading] = useState(true);
  const { inviteCode } = useParams();
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const loadChallenge = async () => {
      try {
        const response = await api.get(`/challenges/${inviteCode}`);
        setChallenge(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error loading challenge:", error);
        setLoading(false);
      }
    };

    loadChallenge();
  }, [inviteCode]);

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-3xl font-bold mb-6"
        >
          You've Been Challenged!
        </motion.h1>

        <motion.p
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-xl mb-8"
        >
          Create a username to accept this challenge
        </motion.p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/")}
          className="bg-white text-purple-600 font-bold py-3 px-8 rounded-full text-lg shadow-lg"
        >
          Join the Challenge
        </motion.button>
      </div>
    );
  }

  if (loading) {
    return <Loading />;
  }

  if (!challenge) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
        <h1 className="text-3xl font-bold mb-4">Challenge Not Found</h1>
        <p className="text-xl mb-8">This challenge might have expired</p>
        <button
          onClick={() => navigate("/")}
          className="bg-white text-purple-600 font-bold py-3 px-8 rounded-full text-lg shadow-lg"
        >
          Go to Home
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white/10 rounded-xl p-6 backdrop-blur-sm max-w-lg w-full"
      >
        <h1 className="text-3xl font-bold mb-2">🧩 Globetrotter Challenge</h1>

        <div className="mb-6">
          <p className="text-xl">
            <span className="font-bold">{challenge.creator.username}</span> has
            challenged you!
          </p>

          <div className="mt-4 p-4 bg-white/10 rounded-lg">
            <p className="mb-2">Their current score:</p>
            <div className="flex justify-center gap-4">
              <div className="bg-green-500/80 rounded-lg p-2">
                <p>Correct</p>
                <p className="text-xl font-bold">
                  {challenge.creator.score.correct}
                </p>
              </div>
              <div className="bg-red-500/80 rounded-lg p-2">
                <p>Incorrect</p>
                <p className="text-xl font-bold">
                  {challenge.creator.score.incorrect}
                </p>
              </div>
            </div>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/play")}
          className="bg-white text-purple-600 font-bold py-3 px-8 rounded-full text-lg shadow-lg w-full"
        >
          Accept the Challenge
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Challenge;
