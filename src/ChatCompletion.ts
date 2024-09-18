const { AzureOpenAI } = require("openai");

// You will need to set these environment variables or edit the following values
const endpoint = process.env["REACT_APP_AZURE_OPENAI_ENDPOINT"] || "<endpoint>";
const apiKey = process.env["REACT_APP_AZURE_OPENAI_API_KEY"] || "<api key>";
const apiVersion = "2023-03-15-preview";
const deployment = "gpt-4o"; //This must match your deployment name.

async function generateFlashcards(prompt: string): Promise<string> {
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

  return result.choices[0].message;
}

export default generateFlashcards;