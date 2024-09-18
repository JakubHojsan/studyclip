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

  console.log('Body: ', req.body.files);

  const client = new AzureOpenAI({ endpoint, apiKey, apiVersion, deployment});
  const result = await client.chat.completions.create({
  
  messages: [
    { role: "system", content: "You are a helpful study assistant. You extract the distinct facts within the notes received to create flashcards. Flashcards are formatted as JSON objects with 'frontText' and 'backText' fields. Present all flashcards as a JSON array in raw format, not a codeblock, ensuring that no terms are added beyond those found in the original notes." },
    { role: "user", content: prompt },
   ],
    model: "",
  });

  console.log("prompt??? ", prompt);

  for (const choice of result.choices) {  
    try {
      console.log("content??? ", choice.message.content);
      const content = choice.message.content;
      // const stripped_content = content.match(/\[.*\]/);
     // console.log("stripped_content??? ", stripped_content);
      //const flashcards = JSON.parse(stripped_content);
      const flashcards = JSON.parse(content);
      console.log("flashcards??? ", flashcards);
      return res.status(200).json({
        flashcards: flashcards,
      });
    }
    catch (error) {
      console.log("bello! you have an error in api/generateFlashcards")
      console.log(error.message);
    }
  }
});

// Catch-all for any other requests, returning the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

