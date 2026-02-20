import React, { useContext, useState, useEffect, useRef, use } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AuthContext } from "../Context/Auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LandingPage = () => {
  const { isAuthenticated ,loading,handleUserAuth} = useContext(AuthContext);
  const navigator = useNavigate();

  const [activeTab, setActiveTab] = useState("login");
  const [otpSent, setOtpSent] = useState(false);
  const [LoadingOtpState, setLoadingOtpState] = useState(false);
  const [error, setError] = useState("");
  const [showNameModal, setShowNameModal] = useState(false);


  const name=useRef();
  const phoneNumber = useRef();
  const otp = useRef();

  useEffect(() => {
    if (loading) return;
    if (isAuthenticated) {
      navigator("/", { replace: true });
    }
  }, [isAuthenticated, navigator]);

  /* ---------------- SEND OTP ---------------- */
  const register = async (e) => {
    e.preventDefault();
    setError("");

    const phone = phoneNumber.current.value;

    if (!phone || phone.length !== 10) {
      toast.error("Please enter a valid mobile number");
      return;
    }

    setLoadingOtpState(true);

    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/register`, {
        credentials:"include",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber: phone }),
      });

      const data = await res.json();

      if (!res.ok) {
        const error=new Error(data?.response?.message || "Failed to send OTP");
        error.status=res.status;
        throw error;
      }

      toast.success("OTP sent successfully", "success");
      setOtpSent(true);
    } catch (err) {
      console.error("Error sending OTP:", err);
      toast.error(err.message || "Server error. Try again later.");
    } finally {
      setLoadingOtpState(false);
    }
  };

   /* ---------------- Login ---------------- */
  const login= async (e) => {
    e.preventDefault();
    setError("");

    const phone = phoneNumber.current.value;

    if (!phone || phone.length !== 10) {
      toast.error("Please enter a valid mobile number");
      return;
    }

    setLoadingOtpState(true);
    try {

      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/login`, {
        credentials:"include",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber: phone }),
      });

      const data = await res.json();

      if (!res.ok) {
        const error=new Error(data?.response?.message || "Failed to send OTP");
        error.status=res.status;
        throw error;
      }

      toast.success("OTP sent successfully", "success");

      setOtpSent(true);
    } catch (err) {
      console.error("Error sending OTP:", err);
      toast.error(err.message || "Server error. Try again later.");
    } finally {
      setLoadingOtpState(false);
    }
  }

  /* ---------------- VERIFY OTP ---------------- */
  const verifyOtp = async (e) => {
    e.preventDefault();
    setError("");

    const enteredOtp = otp.current.value;

    if (!enteredOtp || enteredOtp.length !== 6) {
      setError("Enter valid OTP");
      return;
    }

    setLoadingOtpState(true);

    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/verify-otp`, {
        method: "POST",
        credentials :"include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phoneNumber: phoneNumber.current.value,
          otp: enteredOtp,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        const error=new Error(data?.response?.message || "OTP verification failed");
        error.status=res.status;
        throw error;
      }
      if(activeTab==='register'){
        setShowNameModal(true);
        return;
      }
      handleUserAuth(true);
      navigator("/");
    
    } catch (err) {
      console.error("Error verifying OTP:", err);
      toast.error(err.message || "Server error. Try again later.");
    } finally {
      setLoadingOtpState(false);
    }
  };

  return (
    <div
      className="d-flex min-vh-100 text-white"
      style={{
        background: "linear-gradient(135deg, #667eea, #764ba2)",
        overflow: "hidden",
      }}
    >
      {/* LEFT SIDE – 60% */}
      <div
        className="d-none d-md-flex align-items-center justify-content-center position-relative"
        style={{ width: "60%" }}
      >
        <motion.div
          className="position-absolute rounded-circle bg-light bg-opacity-10"
          style={{ width: 220, height: 220, top: "15%", left: "20%" }}
          animate={{ y: [0, 30, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
        />

        <motion.div
          className="position-absolute rounded-circle bg-light bg-opacity-10"
          style={{ width: 320, height: 320, bottom: "15%", right: "25%" }}
          animate={{ y: [0, -40, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />

        <motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center px-5"
        >
          <h1 className="display-4 fw-bold mb-3">💬 MyChat</h1>
          <p className="fs-4 text-white-50">
            Real-time conversations.
            <br />
            Secure. Fast. Modern.
          </p>
        </motion.div>
      </div>

      {/* GRADIENT DIVIDER LINE */}
      <div
        className="d-none d-md-block"
        style={{
          width: "1px",
          background:
            "linear-gradient(to bottom, transparent, rgba(255,255,255,0.3), transparent)",
          height: "70vh",
          alignSelf: "center",
        }}
      ></div>

      {/* RIGHT SIDE – 40% */}
      <div
        className="d-flex align-items-center justify-content-center"
        style={{ width: "40%", minWidth: "400px" }}
      >
        <motion.div
          className="card bg-dark bg-opacity-25 shadow-lg p-4 rounded-4 w-100 mx-4 border-0"
          style={{
            maxWidth: "420px",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          {/* HEADER SECTION */}
          <div className="text-center mb-4">
            <h3 className="fw-bold mb-1 text-white">Welcome 👋</h3>
          </div>

          {/* TOGGLE BUTTONS */}
          <div className="d-flex bg-white bg-opacity-10 p-1 rounded-3 mb-4">
            <button
              onClick={() => setActiveTab("login")}
              className={`flex-fill btn py-2 fw-bold transition-all border-0 ${activeTab === "login" ? "btn-light text-dark" : "text-white"}`}
              style={{ borderRadius: "8px" }}
            >
              Login
            </button>
            <button
              onClick={() => setActiveTab("register")}
              className={`flex-fill btn py-2 fw-bold transition-all border-0 ${activeTab === "register" ? "btn-light text-dark" : "text-white"}`}
              style={{ borderRadius: "8px" }}
            >
              Register
            </button>
          </div>

          {/* DYNAMIC FORM AREA (Mobile & OTP Only) */}
          <AnimatePresence mode="wait">
            <motion.form
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {/* Mobile Number Field */}
              <div className="mb-3">
                <label className="form-label small text-white-50">
                  Mobile Number
                </label>
                <div className="input-group">
                  <span className="input-group-text bg-white bg-opacity-10 border-0 text-white-50">
                    +91
                  </span>
                  <input
                    type="tel"
                    className="form-control bg-white bg-opacity-10 border-0 text-white py-2 shadow-none"
                    ref={phoneNumber}
                    placeholder="9876543210"
                    style={{
                      borderTopRightRadius: "8px",
                      borderBottomRightRadius: "8px",
                    }}
                  />
                </div>
              </div>

              {/* OTP Field */}
              <div className="mb-4 position-relative">
                <label className="form-label small text-white-50">OTP</label>
                <input
                  type="text"
                  className="form-control bg-white bg-opacity-10 border-0 text-white py-2 shadow-none"
                  placeholder="Enter 6-digit OTP"
                  maxLength="6"
                  ref={otp}
                  style={{ borderRadius: "8px" }}
                />

                <button
                  type="button"
                  className="btn btn-link position-absolute end-0 top-50 translate-middle-y text-info text-decoration-none small pt-4"
                  style={{ fontSize: "0.75rem" }}
                  onClick={activeTab==='login'?login:register}
                >
                  Send OTP
                </button>
              </div>

              <button
                className={`btn w-100 py-2 fw-bold ${activeTab === "login" ? "btn-primary" : "btn-success"}`}
                style={{
                  border: "none",
                  backgroundColor:
                    activeTab === "login" ? "#667eea" : "#28a745",
                }}
                onClick={verifyOtp}
              >
                {activeTab === "login" ? "Login" : "Register"}
              </button>
            </motion.form>
          </AnimatePresence>

          <p className="text-center text-white-50 mt-4 small">
            {activeTab === "login"
              ? "Your daily dose of connection, just a tap away."
              : "By registering, you agree to our Privacy Policy."}
          </p>
        </motion.div>
      </div>
      <AnimatePresence>
  {showNameModal && (
    <motion.div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
      style={{ background: "rgba(0,0,0,0.6)", zIndex: 9999 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-dark p-4 rounded-4 shadow-lg text-white"
        style={{ width: "350px" }}
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
      >
        <h5 className="mb-3 text-center">Tell us your name 👋</h5>

        <input
          type="text"
          className="form-control mb-3"
          placeholder="Your name"
          ref={name}
        />

        <button
          className="btn btn-success w-100"
          onClick={async () => {
            if (!name.current.value.trim()) {
              toast.error("Name is required");
              return;
            }

            try {
              await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/userName`, {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: name.current.value.trim() }),
              });

              handleUserAuth(true);
              setShowNameModal(false);
              navigator("/");
            } catch (err) {
              toast.error("Failed to save name");
            }
          }}
        >
          Continue
        </button>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>

    </div>
  );
};

export default LandingPage;
