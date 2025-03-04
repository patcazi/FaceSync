import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const ResultsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { sourceImageUrl, targetVideoUrl } = location.state || {};

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
          marginBottom: "10px",
          color: "#4a4a4a"
        }}>FaceSync</h1>
        
        <div style={{
          textAlign: "center",
          marginBottom: "30px"
        }}>
          <div style={{
            display: "inline-block",
            padding: "12px 30px",
            backgroundColor: "rgba(0, 200, 0, 0.1)",
            color: "green",
            borderRadius: "30px",
            fontSize: "24px",
            fontWeight: "bold"
          }}>
            FaceSwap Complete!
          </div>
        </div>
        
        {(!sourceImageUrl || !targetVideoUrl) ? (
          <div style={{
            padding: "15px",
            backgroundColor: "rgba(217, 48, 37, 0.1)",
            color: "#d93025",
            borderRadius: "4px",
            marginBottom: "20px",
            textAlign: "center"
          }}>
            Missing source image or target video. Please complete the previous steps.
            <div style={{ marginTop: "10px" }}>
              <button
                onClick={() => navigate("/")}
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#4285f4",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "14px"
                }}
              >
                Start Over
              </button>
            </div>
          </div>
        ) : (
          <div style={{ textAlign: "center" }}>
            <p style={{ marginBottom: "20px" }}>
              Your face-swapped video is ready! In the future, the processed video will appear here.
            </p>
            
            <div style={{
              padding: "20px",
              backgroundColor: "#f8f9fa",
              borderRadius: "8px",
              marginBottom: "30px"
            }}>
              <h3 style={{ marginTop: 0 }}>Processing Details</h3>
              <p><strong>Source Image:</strong> {sourceImageUrl.split('/').pop()}</p>
              <p><strong>Target Video:</strong> {targetVideoUrl.split('/').pop()}</p>
              <p><strong>Processing Status:</strong> Complete</p>
            </div>
            
            <div style={{ 
              width: "100%", 
              height: "300px", 
              backgroundColor: "#eee", 
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "30px",
              borderRadius: "8px"
            }}>
              <p style={{ color: "#666" }}>
                [Processed Video Placeholder]
              </p>
            </div>
          </div>
        )}
        
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <button
            onClick={() => navigate("/")}
            style={{
              padding: "10px 20px",
              backgroundColor: "#4285f4",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "14px",
              marginRight: "10px"
            }}
          >
            Home
          </button>
          
          <button
            onClick={() => navigate("/upload-image")}
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
            Create New
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage; 