import { motion } from 'framer-motion';

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <motion.div
        animate={{
          rotate: 360
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear"
        }}
        className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full mb-4"
      />
      <p className="text-xl">Loading your next adventure...</p>
    </div>
  );
};

export default Loading;