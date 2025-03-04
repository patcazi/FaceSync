// src/components/Login.jsx

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    try {
      // Sign in with Firebase Auth
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("Logged in:", user);
      
      // Get user data from Firestore to retrieve the name
      try {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          // Navigate to dashboard with the user's name
          navigate('/dashboard', { state: { userName: userData.name } });
        } else {
          // If we don't have user data in Firestore for some reason, still redirect to dashboard
          // The dashboard will handle getting user details
          navigate('/dashboard');
        }
      } catch (docErr) {
        console.error("Error getting user document:", docErr);
        // Still redirect to dashboard even if we couldn't fetch Firestore data
        navigate('/dashboard');
      }
    } catch (err) {
      console.error("Error logging in:", err);
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#f9f9f9"
    }}>
      <div style={{
        width: "90%",
        maxWidth: "400px",
        padding: "30px",
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#fff"
      }}>
        <h1 style={{
          textAlign: "center",
          fontSize: "36px",
          marginBottom: "30px",
          color: "#4a4a4a"
        }}>FaceSync</h1>
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: "16px" }}>
            <label style={{ display: "block", marginBottom: "6px", fontWeight: "500" }}>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "4px",
                border: "1px solid #ddd",
                fontSize: "16px"
              }}
            />
          </div>
          <div style={{ marginBottom: "16px" }}>
            <label style={{ display: "block", marginBottom: "6px", fontWeight: "500" }}>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "4px",
                border: "1px solid #ddd",
                fontSize: "16px"
              }}
            />
          </div>
          {error && <p style={{ 
            color: "#d93025", 
            backgroundColor: "rgba(217, 48, 37, 0.1)", 
            padding: "10px", 
            borderRadius: "4px",
            fontSize: "14px" 
          }}>
            {error}
          </p>}
          <button 
            type="submit" 
            disabled={loading}
            style={{
              width: "100%",
              padding: "12px",
              backgroundColor: loading ? "#9cb0d8" : "#4285f4",
              color: "white",
              border: "none",
              borderRadius: "4px",
              fontSize: "16px",
              fontWeight: "500",
              cursor: loading ? "not-allowed" : "pointer",
              marginTop: "20px",
              transition: "background-color 0.3s"
            }}
          >
            {loading ? "Signing In..." : "Login"}
          </button>
        </form>
        
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <p>
            Don't have an account?{" "}
            <Link 
              to="/register" 
              style={{ 
                color: "#4285f4", 
                textDecoration: "none", 
                fontWeight: "500" 
              }}
            >
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;