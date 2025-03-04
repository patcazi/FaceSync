import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import TargetVideoUpload from "../TargetVideoUpload";

const TargetVideoPage = () => {
  const [videoUrl, setVideoUrl] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const sourceImageUrl = location.state?.sourceImageUrl;

  const handleVideoUploadComplete = (url) => {
    setVideoUrl(url);
  };

  const handleSync = () => {
    navigate("/results", {
      state: {
        sourceImageUrl,
        targetVideoUrl: videoUrl
      }
    });
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
          marginBottom: "10px",
          color: "#4a4a4a"
        }}>FaceSync</h1>
        
        <h2 style={{
          textAlign: "center",
          fontSize: "20px",
          marginBottom: "30px",
          color: "#666"
        }}>
          Step 2: Upload Target Video
        </h2>
        
        {!sourceImageUrl && (
          <div style={{
            padding: "15px",
            backgroundColor: "rgba(217, 48, 37, 0.1)",
            color: "#d93025",
            borderRadius: "4px",
            marginBottom: "20px",
            textAlign: "center"
          }}>
            Please upload a source image first.
            <div style={{ marginTop: "10px" }}>
              <button
                onClick={() => navigate("/upload-image")}
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
                Go to Source Image Upload
              </button>
            </div>
          </div>
        )}
        
        {sourceImageUrl && (
          <>
            <TargetVideoUpload onUploadComplete={handleVideoUploadComplete} />
            
            <div style={{ textAlign: "center", marginTop: "20px" }}>
              <button
                onClick={() => navigate("/upload-image")}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#f1f1f1",
                  color: "#4a4a4a",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "14px",
                  marginRight: "10px"
                }}
              >
                Back
              </button>
              
              <button
                onClick={handleSync}
                disabled={!videoUrl}
                style={{
                  padding: "10px 20px",
                  backgroundColor: videoUrl ? "#4285f4" : "#9cb0d8",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: videoUrl ? "pointer" : "not-allowed",
                  fontSize: "14px"
                }}
              >
                Start Face Sync
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TargetVideoPage; 