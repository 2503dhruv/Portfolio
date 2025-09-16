import { useState } from "react";
import axios from "axios";

export default function AdminPage() {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    if (!file) return alert("Choose a file first!");
    const formData = new FormData();
    formData.append("resume", file);

    await axios.post("http://localhost:7000/api/upload/resume", formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });

    alert("Resume uploaded!");
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Upload Resume (Admin Only)</h2>
      <input type="file" accept="application/pdf" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}
