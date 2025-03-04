import React, { useState, useEffect, useRef } from "react";
import { storage } from "../firebase/firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const TargetVideoUpload = ({ onUploadComplete }) => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [downloadURL, setDownloadURL] = useState(null);
  const videoRef = useRef(null);

  // Handle file selection
  const handleFileChange = (e) => {
    setError(null);
    setProgress(0);
    setDownloadURL(null);
    
    const selectedFile = e.target.files[0];
    
    // Validate file type
    if (selectedFile && !selectedFile.type.startsWith('video/')) {
      setError("Please select a video file (MP4, MOV, etc.)");
      return;
    }
    
    setFile(selectedFile);
    
    // Create preview URL
    if (selectedFile) {
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreview(objectUrl);
      
      // Clean up previous preview URL when component unmounts or file changes
      return () => URL.revokeObjectURL(objectUrl);
    }
  };

  // Handle video upload
  const handleUpload = () => {
    if (!file) {
      setError("Please select a video first");
      return;
    }

    setUploading(true);
    setProgress(0);
    setError(null);

    // Create a unique filename: timestamp-originalname
    const fileName = `${Date.now()}-${file.name}`;
    const storageRef = ref(storage, `target_videos/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Monitor upload progress
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Track upload progress
        const uploadProgress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(uploadProgress);
      },
      (error) => {
        // Handle errors
        console.error("Upload error:", error);
        setError("Error uploading video: " + error.message);
        setUploading(false);
      },
      () => {
        // Upload completed successfully
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setDownloadURL(url);
          setUploading(false);
          
          // Notify parent component with the download URL
          if (onUploadComplete) {
            onUploadComplete(url);
          }
        });
      }
    );
  };

  return (
    <div style={{
      width: "100%",
      padding: "20px",
      borderRadius: "8px",
      backgroundColor: "#fff",
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
      marginBottom: "20px"
    }}>
      <h3 style={{ 
        marginTop: 0,
        marginBottom: "16px",
        color: "#4a4a4a",
        fontSize: "18px"
      }}>
        Upload Target Video
      </h3>
      
      <div style={{ marginBottom: "16px" }}>
        <input
          type="file"
          accept="video/*"
          onChange={handleFileChange}
          id="target-video-upload"
          style={{ display: "none" }}
        />
        <label
          htmlFor="target-video-upload"
          style={{
            display: "inline-block",
            padding: "8px 16px",
            backgroundColor: "#f1f1f1",
            color: "#4a4a4a",
            border: "1px solid #ddd",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "14px"
          }}
        >
          Select Video
        </label>
        
        {file && (
          <span style={{ marginLeft: "10px", fontSize: "14px" }}>
            {file.name}
          </span>
        )}
      </div>
      
      {preview && (
        <div style={{ marginBottom: "16px", textAlign: "center" }}>
          <video
            ref={videoRef}
            src={preview}
            controls
            style={{
              maxWidth: "100%",
              maxHeight: "300px",
              borderRadius: "4px"
            }}
          />
        </div>
      )}
      
      {file && !uploading && !downloadURL && (
        <button
          onClick={handleUpload}
          style={{
            padding: "8px 16px",
            backgroundColor: "#4285f4",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "14px",
            marginBottom: "16px"
          }}
        >
          Upload Video
        </button>
      )}
      
      {uploading && (
        <div style={{ marginBottom: "16px" }}>
          <div style={{
            width: "100%",
            height: "8px",
            backgroundColor: "#f1f1f1",
            borderRadius: "4px",
            overflow: "hidden"
          }}>
            <div style={{
              width: `${progress}%`,
              height: "100%",
              backgroundColor: "#4285f4",
              transition: "width 0.3s ease"
            }} />
          </div>
          <p style={{ margin: "8px 0 0", fontSize: "14px" }}>
            Uploading: {progress}%
          </p>
        </div>
      )}
      
      {downloadURL && (
        <div style={{
          padding: "12px",
          backgroundColor: "rgba(0, 200, 0, 0.1)",
          color: "green",
          borderRadius: "4px",
          marginBottom: "16px",
          fontSize: "14px"
        }}>
          Upload complete! Video is ready for processing.
        </div>
      )}
      
      {error && (
        <div style={{
          padding: "12px",
          backgroundColor: "rgba(217, 48, 37, 0.1)",
          color: "#d93025",
          borderRadius: "4px",
          marginBottom: "16px",
          fontSize: "14px"
        }}>
          {error}
        </div>
      )}
    </div>
  );
};

export default TargetVideoUpload; 