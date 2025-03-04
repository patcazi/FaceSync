import React, { useState, useEffect } from "react";
import { storage } from "../firebase/firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const SourceImageUpload = ({ onUploadComplete }) => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [downloadURL, setDownloadURL] = useState(null);

  // Create a preview when file is selected
  useEffect(() => {
    if (!file) {
      setPreview(null);
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    // Clean up the object URL when component unmounts or file changes
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  const handleFileChange = (e) => {
    setError(null);
    setProgress(0);
    setDownloadURL(null);
    
    const selectedFile = e.target.files[0];
    
    // Validate file type
    if (selectedFile && !selectedFile.type.startsWith('image/')) {
      setError("Please select an image file (JPEG, PNG, etc.)");
      return;
    }
    
    setFile(selectedFile);
  };

  const handleUpload = () => {
    if (!file) {
      setError("Please select an image first");
      return;
    }

    setUploading(true);
    setProgress(0);
    setError(null);

    // Create a unique filename: timestamp-originalname
    const fileName = `${Date.now()}-${file.name}`;
    const storageRef = ref(storage, `source_images/${fileName}`);
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
        setError("Error uploading image: " + error.message);
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
        Upload Source Image
      </h3>
      
      <div style={{ marginBottom: "16px" }}>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          id="source-image-upload"
          style={{ display: "none" }}
        />
        <label
          htmlFor="source-image-upload"
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
          Select Image
        </label>
        
        {file && (
          <span style={{ marginLeft: "10px", fontSize: "14px" }}>
            {file.name}
          </span>
        )}
      </div>
      
      {preview && (
        <div style={{ marginBottom: "16px", textAlign: "center" }}>
          <img
            src={preview}
            alt="Preview"
            style={{
              maxWidth: "100%",
              maxHeight: "200px",
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
          Upload Image
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
          Upload complete! Image is ready for processing.
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

export default SourceImageUpload; 