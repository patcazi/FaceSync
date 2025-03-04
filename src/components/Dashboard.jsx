import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { auth, db } from "../firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

const Dashboard = () => {
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkAuthAndGetUserData = async () => {
      try {
        // Check if user is authenticated
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
          if (user) {
            // User is signed in
            console.log("User is signed in:", user);
            
            // Get user info from Firestore using the user's UID
            try {
              // First check if we have a name from redirect state
              if (location.state && location.state.userName) {
                setUserName(location.state.userName.split(" ")[0]); // Get first name
              } else {
                // If not, fetch from Firestore
                const userDoc = await getDoc(doc(db, "users", user.uid));
                
                if (userDoc.exists()) {
                  const userData = userDoc.data();
                  const firstName = userData.name.split(" ")[0];
                  setUserName(firstName);
                }
              }
            } catch (err) {
              console.error("Error fetching user data:", err);
            }
            
            setLoading(false);
          } else {
            // No user is signed in, redirect to login
            console.log("No user is signed in, redirecting to login");
            navigate("/login");
          }
        });
        
        // Cleanup subscription
        return () => unsubscribe();
      } catch (error) {
        console.error("Error checking auth status:", error);
        setLoading(false);
      }
    };
    
    checkAuthAndGetUserData();
  }, [navigate, location]);

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
        maxWidth: "800px",
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
        
        {loading ? (
          <p style={{ textAlign: "center" }}>Loading...</p>
        ) : (
          <div>
            <h2 style={{
              textAlign: "center",
              fontSize: "24px",
              marginBottom: "20px",
              color: "#4a4a4a"
            }}>
              Welcome to FaceSync, {userName}
            </h2>
            
            <div style={{
              textAlign: "center",
              marginTop: "40px"
            }}>
              <button 
                onClick={() => {
                  auth.signOut();
                  navigate("/login");
                }}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#f1f1f1",
                  color: "#4a4a4a",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "14px"
                }}
              >
                Sign Out
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard; 