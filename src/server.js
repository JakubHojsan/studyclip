// server.js
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5001;

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

// Example API endpoint
app.get('/api', (req, res) => {
  res.json({ message: "Hello from the Express server!" });
});

// Catch-all for any other requests, returning the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
