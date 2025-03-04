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

  const handleProfile = () => {
    // This is a placeholder for the future profile page
    alert("Profile page coming soon!");
  };

  const handleSyncFace = () => {
    navigate("/upload-image");
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
              marginBottom: "40px",
              color: "#4a4a4a"
            }}>
              Welcome to FaceSync, {userName}
            </h2>
            
            <div style={{
              display: "flex",
              justifyContent: "center",
              gap: "20px",
              flexWrap: "wrap",
              marginBottom: "40px"
            }}>
              <button
                onClick={handleProfile}
                style={{
                  width: "180px",
                  padding: "15px 20px",
                  backgroundColor: "#f1f1f1",
                  color: "#4a4a4a",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontSize: "16px",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "10px"
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.1)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)";
                }}
              >
                <span style={{ fontSize: "24px" }}>👤</span>
                <span>Profile</span>
              </button>
              
              <button
                onClick={handleSyncFace}
                style={{
                  width: "180px",
                  padding: "15px 20px",
                  backgroundColor: "#4285f4",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontSize: "16px",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "10px"
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.1)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)";
                }}
              >
                <span style={{ fontSize: "24px" }}>🔄</span>
                <span>Sync Face</span>
              </button>
            </div>
            
            <div style={{
              textAlign: "center",
              marginTop: "20px"
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