import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SourceImageUpload from "../SourceImageUpload";

const SourceImagePage = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const navigate = useNavigate();

  const handleImageUploadComplete = (url) => {
    setImageUrl(url);
  };

  const handleNext = () => {
    navigate("/upload-video", { state: { sourceImageUrl: imageUrl } });
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
          Step 1: Upload Source Image
        </h2>
        
        <SourceImageUpload onUploadComplete={handleImageUploadComplete} />
        
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <button
            onClick={() => navigate("/")}
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
            onClick={handleNext}
            disabled={!imageUrl}
            style={{
              padding: "10px 20px",
              backgroundColor: imageUrl ? "#4285f4" : "#9cb0d8",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: imageUrl ? "pointer" : "not-allowed",
              fontSize: "14px"
            }}
          >
            Next: Upload Video
          </button>
        </div>
      </div>
    </div>
  );
};

export default SourceImagePage; 