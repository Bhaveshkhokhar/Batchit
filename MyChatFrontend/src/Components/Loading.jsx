import { motion } from "framer-motion";

function Loading() {
  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center min-vh-100 text-white"
      style={{
        background: "linear-gradient(135deg, #667eea, #764ba2)",
      }}
    >
      {/* App Name */}
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="fw-bold mb-3"
      >
        💬 MyChat
      </motion.h1>

      {/* Spinner */}
      <motion.div
        className="spinner-border text-light mb-3"
        role="status"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
      />

      {/* Loading text */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-white-50"
      >
        Checking authentication…
      </motion.p>
    </div>
  );
}

export default Loading;
