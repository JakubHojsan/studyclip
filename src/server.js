// server.js
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5001;
const cors = require('cors');

const { AzureOpenAI } = require("openai");

// require dotenv
require('dotenv').config();

if (!process.env["REACT_APP_AZURE_OPENAI_ENDPOINT"] || !process.env["REACT_APP_AZURE_OPENAI_API_KEY"]) {
  console.error("Please set the REACT_APP_AZURE_OPENAI_ENDPOINT and REACT_APP_AZURE_OPENAI_API_KEY environment variables.");
  process.exit(1);
}

// You will need to set these environment variables or edit the following values
const endpoint = process.env["REACT_APP_AZURE_OPENAI_ENDPOINT"] || "<endpoint>";
const apiKey = process.env["REACT_APP_AZURE_OPENAI_API_KEY"] || "<api key>";
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

  const client = new AzureOpenAI({ endpoint, apiKey, apiVersion, deployment});
  const result = await client.chat.completions.create({
  
  messages: [
    { role: "system", content: "You are a helpful assistant." },
    { role: "user", content: "Generate a random number." },
   ],
    model: "",
  });

  for (const choice of result.choices) {
    console.log("random numbers???")
    console.log(choice.message);
  }

  try {
    return res.status(200).json({
      message: result.choices[0].message,
    })
  }
  catch (error) {
    console.log("bello! you have an error in api/generateFlashcards")
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

