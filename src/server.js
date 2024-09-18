import generateFlashcards from './ChatCompletion';

// server.js
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5001;
const cors = require('cors');

const corsOptions = {
  origin : 'http://localhost:3000',
};

app.use(cors(corsOptions));
app.use(express.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

// Example API endpoint
app.get('/api', (req, res) => {
  res.json({ message: "Hello from the Express server!" });
});

app.post('/api/openai', async (req, res) => {
  const prompt = req.body.prompt;

  try {
    return res.status(200).json({
      message: prompt,
    })
  }
  catch (error) {
    console.log("bello!")
    console.log(error.message);
  }
});

app.post('/api/generateFlashcards', async (req, res) => {
  const prompt = req.body.prompt;
  const completion = await generateFlashcards(prompt);

  try {
    return res.status(200).json({
      message: completion,
    })
  }
  catch (error) {
    console.log("bello!")
    console.log(error.message);
  }
});

// Catch-all for any other requests, returning the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

