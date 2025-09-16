import express from "express";
import cors from "cors";
import multer from "multer";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 7000;
const __dirname = path.resolve();

app.use(cors());
app.use(express.json());

// ✅ Secure Admin Key from .env
const ADMIN_KEY = process.env.ADMIN_KEY || "mysecretkey";

// ✅ Ensure uploads folder exists
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// ✅ Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, "resume.pdf"); // overwrite existing resume
  },
});
const upload = multer({ storage });


// ✅ Public route to serve resume
app.get("/resume", (req, res) => {
  const filePath = path.join(uploadDir, "resume.pdf");

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ message: "❌ Resume not found" });
  }

  res.download(filePath, "resume.pdf");
});

import fs from "fs";

app.post("/upload", upload.single("resume"), (req, res) => {
  const key = req.body.key;

  if (key !== ADMIN_KEY) {
    return res.status(403).json({ message: "❌ Forbidden: Invalid key" });
  }

  return res.json({ message: "✅ Resume uploaded successfully" });
});

// ✅ Delete resume
app.delete("/resume", (req, res) => {
  const key = req.body.key || req.headers["x-admin-key"];

  if (key !== ADMIN_KEY) {
    return res.status(403).json({ message: "❌ Forbidden: Invalid key" });
  }

  const filePath = path.join(__dirname, "uploads", "resume.pdf");

  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    return res.json({ message: "🗑 Resume deleted successfully" });
  } else {
    return res.status(404).json({ message: "⚠ No resume found to delete" });
  }
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
