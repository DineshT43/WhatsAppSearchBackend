import fetch from "node-fetch";

const HF_API = "https://api-inference.huggingface.co/pipeline/feature-extraction/sentence-transformers/all-MiniLM-L6-v2";
const HF_KEY = process.env.HF_API_KEY;

export async function getEmbedding(text) {
  const res = await fetch(HF_API, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${HF_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(text)
  });

  const data = await res.json();
  return data[0];
}
