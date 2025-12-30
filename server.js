import express from "express";
import cors from "cors";
import { messages } from "./mockDb.js";
import { getEmbedding } from "./hf.js";
import { semanticSearch } from "./search.js";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;

async function init() {
  for (let m of messages) {
    m.embedding = await getEmbedding(m.text);
  }
}

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.post("/search", async (req, res) => {
  const { query, filters } = req.body;
  const queryEmbedding = await getEmbedding(query);
  const results = semanticSearch(queryEmbedding, messages, filters);
  res.json(results);
});

init();

app.listen(4000, () => {
  console.log("Backend running on http://localhost:4000");
});
