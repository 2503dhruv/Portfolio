import React, { useState } from "react";
import axios from "axios";

export default function ResumeUpload() {
  const [file, setFile] = useState(null);
  const [key, setKey] = useState("");
  const [message, setMessage] = useState("");

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file || !key) {
      return setMessage("⚠ Please select a file and enter admin key.");
    }

    try {
      const formData = new FormData();
      formData.append("resume", file);
      formData.append("key", key);

      const res = await axios.post("http://localhost:7000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage(res.data.message);
    } catch (err) {
      console.error(err);
      setMessage("❌ Upload failed. Check your key or server.");
    }
  };

  return (
    <div className="upload-container">
      <h1>Admin Resume Upload</h1>
      <form onSubmit={handleUpload} className="upload-form">
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <input
          type="password"
          placeholder="Enter Admin Key"
          value={key}
          onChange={(e) => setKey(e.target.value)}
        />
        <button type="submit">Upload Resume</button>
      </form>
      {message && <p className="upload-message">{message}</p>}

      <style jsx>{`
        .upload-container {
          max-width: 500px;
          margin: 5rem auto;
          padding: 2rem;
          background: #111;
          border-radius: 12px;
          color: #fff;
        }
        h1 {
          text-align: center;
          margin-bottom: 1.5rem;
          color: #22c55e;
        }
        .upload-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        input,
        button {
          padding: 0.8rem;
          border-radius: 8px;
          border: none;
        }
        input {
          background: #222;
          color: #fff;
        }
        button {
          background: #22c55e;
          color: #fff;
          cursor: pointer;
          transition: 0.2s;
        }
        button:hover {
          background: #16a34a;
        }
        .upload-message {
          margin-top: 1rem;
          text-align: center;
        }
      `}</style>
    </div>
  );
}
