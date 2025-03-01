import { motion } from "framer-motion";
const GlobeIcon = ({ size = 48 }) => {
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <div
        className="absolute inset-0 rounded-full bg-blue-500"
        style={{
          background: "linear-gradient(135deg, #4299e1, #667eea, #9f7aea)",
          boxShadow: "0 0 20px rgba(102, 126, 234, 0.6)",
        }}
      ></div>

      <div
        className="absolute bg-white/30"
        style={{
          height: "2px",
          width: "100%",
          top: "50%",
          transform: "translateY(-50%)",
        }}
      ></div>

      <div
        className="absolute bg-white/30"
        style={{
          width: "2px",
          height: "100%",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      ></div>

      <div
        className="absolute bg-white/30"
        style={{
          height: "2px",
          width: "100%",
          top: "25%",
          transform: "translateY(-50%) rotate(15deg)",
        }}
      ></div>

      <div
        className="absolute bg-white/30"
        style={{
          height: "2px",
          width: "100%",
          top: "75%",
          transform: "translateY(-50%) rotate(-15deg)",
        }}
      ></div>
    </div>
  );
};

export default GlobeIcon;
