const { AzureOpenAI } = require("openai");

// Load the .env file if it exists
const dotenv = require("dotenv");
dotenv.config();

// You will need to set these environment variables or edit the following values
const endpoint = process.env["AZURE_OPENAI_ENDPOINT"] || "<endpoint>";
const apiKey = process.env["AZURE_OPENAI_API_KEY"] || "<api key>";
const apiVersion = "2023-03-15-preview";
const deployment = "gpt-4o"; //This must match your deployment name.
require("dotenv/config");

async function main() {
  
  const client = new AzureOpenAI({ endpoint, apiKey, apiVersion, deployment });
  const result = await client.chat.completions.create({
    /*
    messages: [
    { role: "system", content: "You are a helpful assistant." },
    { role: "user", content: "Does Azure OpenAI support customer managed keys?" },
    { role: "assistant", content: "Yes, customer managed keys are supported by Azure OpenAI?" },
    { role: "user", content: "Do other Azure AI services support this too?" },
    ],
    */
   messages: [
    { role: "system", content: "You are a helpful assistant." },
    { role: "user", content: "How many r's are in the word strawberry?" },
   ],
    model: "",
  });

  for (const choice of result.choices) {
    console.log(choice.message);
  }
    
  /*
  const prompt = ["How many r's are in the word strawberry?"];

  const client = new AzureOpenAI({ endpoint, apiKey, apiVersion, deployment });  

  const result = await client.completions.create({ prompt, model: deployment, max_tokens: 128 });

  for (const choice of result.choices) {
    console.log(choice.text);
  }
*/
}

console.log("Endpoint:", endpoint);
console.log("API Key:", apiKey);
console.log("Deployment:", deployment);


main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

module.exports = { main };

export default main;