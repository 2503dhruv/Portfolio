// Auth middleware
function checkAdminKey(req, res, next) {
  if (req.body.key !== ADMIN_KEY) {
    return res.status(403).json({ error: "Unauthorized" });
  }
  next();
}

// Protected upload route
app.post('/upload', checkAdminKey, upload.single('resume'), (req, res) => {
  res.json({ message: 'Resume uploaded successfully!' });
});
