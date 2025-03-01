import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import api from "../services/api";
import html2canvas from "html2canvas";

const ShareModal = ({ onClose, userId, username, score }) => {
  const [inviteLink, setInviteLink] = useState("");
  const [loading, setLoading] = useState(true);
  const [shareImage, setShareImage] = useState(null);

  useEffect(() => {
    const createChallenge = async () => {
      try {
        const response = await api.post("/challenges", {
          userId,
        });

        setInviteLink(response.data.shareUrl);
        setLoading(false);

        // Generate the share image after a short delay
        setTimeout(() => {
          generateShareImage();
        }, 500);
      } catch (error) {
        console.error("Error creating challenge:", error);
        setLoading(false);
      }
    };

    createChallenge();
  }, [userId]);

  const generateShareImage = async () => {
    try {
      const element = document.getElementById("share-card");
      if (element) {
        const canvas = await html2canvas(element, {
          backgroundColor: null,
          scale: 2,
        });

        setShareImage(canvas.toDataURL("image/png"));
      }
    } catch (error) {
      console.error("Error generating share image:", error);
    }
  };

  const shareOnWhatsApp = () => {
    const text = `I'm playing Globetrotter Challenge! Can you beat my score? ${inviteLink}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl p-6 max-w-md w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold mb-4 text-center">
          Challenge a Friend
        </h2>

        {/* Share Card (for screenshot) */}
        <div
          id="share-card"
          className="p-4 bg-white/10 backdrop-blur-sm rounded-lg mb-6"
        >
          <div className="text-center">
            <h3 className="text-xl font-bold">🧩 Globetrotter Challenge</h3>
            <p className="mt-2">{username} has challenged you!</p>

            <div className="mt-4 flex justify-center gap-4">
              <div className="bg-green-500/80 rounded-lg p-2">
                <p className="text-sm">Correct</p>
                <p className="text-xl font-bold">{score.correct}</p>
              </div>
              <div className="bg-red-500/80 rounded-lg p-2">
                <p className="text-sm">Incorrect</p>
                <p className="text-xl font-bold">{score.incorrect}</p>
              </div>
            </div>

            <p className="mt-4 text-sm opacity-80">
              Scan QR or click the link to play!
            </p>
          </div>
        </div>

        {shareImage && (
          <div className="flex justify-center mb-4">
            <img
              src={shareImage}
              alt="Challenge card"
              className="w-2/3 rounded-lg shadow-lg"
            />
          </div>
        )}

        <div className="space-y-3">
          {loading ? (
            <p className="text-center">Generating your challenge link...</p>
          ) : (
            <>
              <div className="bg-white/10 rounded-lg p-3 text-sm break-all">
                {inviteLink}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(inviteLink);
                    alert("Link copied to clipboard!");
                  }}
                  className="bg-white/30 hover:bg-white/40 py-2 rounded-lg font-medium"
                >
                  Copy Link
                </button>

                <button
                  onClick={shareOnWhatsApp}
                  className="bg-green-500 hover:bg-green-600 py-2 rounded-lg font-medium"
                >
                  Share on WhatsApp
                </button>
              </div>

              <button
                onClick={onClose}
                className="w-full bg-white text-purple-600 font-bold py-2 rounded-lg mt-2"
              >
                Close
              </button>
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ShareModal;
