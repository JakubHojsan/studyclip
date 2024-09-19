// server.js
const express = require('express');
var bodyParser = require("body-parser");
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5001;
const cors = require('cors');

app.use(bodyParser.json({limit: '2mb'}));

const { AzureOpenAI } = require("openai");

// require dotenv
require('dotenv').config();

if (!process.env["REACT_APP_AZURE_OPENAI_ENDPOINT"] || !process.env["REACT_APP_AZURE_OPENAI_API_KEY"]) {
  console.error("Please set the REACT_APP_AZURE_OPENAI_ENDPOINT and REACT_APP_AZURE_OPENAI_API_KEY environment variables.");
  process.exit(1);
}

// You will need to set these environment variables or edit the following values
const endpoint = process.env["REACT_APP_AZURE_OPENAI_ENDPOINT"];
const apiKey = process.env["REACT_APP_AZURE_OPENAI_API_KEY"];
const apiVersion = "2023-03-15-preview";
const deployment = "gpt-4o"; //This must match your deployment name.

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

app.post('/api/generateFlashcards', async (req, res) => {
  const prompt = req.body.prompt;
  const studyGoal = req.body.studyGoal;
  const numFlashCards = req.body.numCards;
  // check if prompt is null or empty string
  if (!prompt || prompt.trim() === "") {
    return res.status(400).json({
      error: "Prompt is required",
    });
  }

  const client = new AzureOpenAI({ endpoint, apiKey, apiVersion, deployment});
  const result = await client.chat.completions.create({
  
  messages: [
    { role: "system", content: `You are a helpful study assistant. You extract the distinct facts within the notes and create flashcards that ask a question on the front and answer that question on the back. Flashcards are formatted as JSON objects with 'frontText' and 'backText' fields. Present all flashcards as a JSON array in raw format, not a codeblock, ensuring that no terms are added beyond those found in the original notes. Adjust the flashcards for the purpose of ${studyGoal}. Create ${numFlashCards} flashcards.` },
    { role: "user", content: prompt },
   ],
    model: "",
  });

  for (const choice of result.choices) {  
    try {
      const content = choice.message.content;
      const flashcards = JSON.parse(content);
      return res.status(200).json({
        flashcards: flashcards,
      });
    }
    catch (error) {
      console.log(error.message);
    }
  }

  return res.status(500).json({
    error: "Failed to generate flashcards",
  });
});

// Catch-all for any other requests, returning the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

