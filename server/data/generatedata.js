const { OpenAI } = require("openai");
const fs = require("fs");
require("dotenv").config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const starterDestinations = [
  { name: "Paris", country: "France", continent: "Europe" },
  { name: "Tokyo", country: "Japan", continent: "Asia" },
];

async function generateDestinationData(destination) {
  try {
    const prompt = `
      Create data for a travel guessing game about ${destination.name}, ${destination.country}.
      
      Please provide:
      1. Three cryptic clues about this destination (challenging but solvable)
      2. Five interesting fun facts about this destination
      3. Three pieces of trivia about this destination
      
      Format as JSON with keys: clues (array), funFacts (array), and trivia (array)
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
    });

    const content = response.choices[0].message.content;
    const parsedContent = JSON.parse(content);

    return {
      id: `${destination.name.toLowerCase().replace(/\s+/g, '-')}-${Math.random().toString(36).substring(2, 9)}`,
      name: destination.name,
      country: destination.country,
      continent: destination.continent,
      clues: parsedContent.clues,
      funFacts: parsedContent.funFacts,
      trivia: parsedContent.trivia,
      difficulty: calculateDifficulty(destination),
    };
  } catch (error) {
    console.error(`Error generating data for ${destination.name}:`, error);
    throw error;
  }
}

function calculateDifficulty(destination) {
  const popularDestinations = ["Paris", "London", "New York", "Tokyo", "Rome"];
  return popularDestinations.includes(destination.name) ? "easy" : "medium";
}

async function generateFullDataset() {
  const fullDataset = [];

  for (const destination of starterDestinations) {
    const destinationData = await generateDestinationData(destination);
    fullDataset.push(destinationData);
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  fs.writeFileSync("./data/destinations.json", JSON.stringify(fullDataset, null, 2));
  console.log(`Generated data for ${fullDataset.length} destinations`);
}

generateFullDataset().catch(console.error);
