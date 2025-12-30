import fetch from "node-fetch";

const HF_API = process.env.HF_ENV_API;
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
