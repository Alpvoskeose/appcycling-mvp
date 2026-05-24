import type { VercelRequest, VercelResponse } from "@vercel/node";

const PROMPT =
  "Create a highly detailed, photorealistic editorial fashion image of an upcycled garment made from old clothes. The design should be modern, stylish, and sustainable, displayed on a mannequin or model with studio lighting. Color palette: olive green and neutral tones.";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    res.status(500).json({ error: "OPENAI_API_KEY is not set" });
    return;
  }

  try {
    const { imageBase64 } = req.body || {};

    if (!imageBase64 || typeof imageBase64 !== "string") {
      res.status(400).json({ error: "Missing imageBase64" });
      return;
    }

    const response = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "dall-e-3",
        prompt: PROMPT,
        n: 1,
        size: "1024x1024",
        quality: "standard",
      }),
    });

    if (!response.ok) {
      const payload = await response.text();
      res.status(500).json({ error: `OpenAI error: ${payload}` });
      return;
    }

    const data = (await response.json()) as { data?: Array<{ url?: string }> };
    const imageUrl = data?.data?.[0]?.url;

    if (!imageUrl) {
      res.status(500).json({ error: "No image URL returned from OpenAI" });
      return;
    }

    res.status(200).json({ imageUrl });
  } catch (error) {
    res.status(500).json({ error: "Unexpected server error" });
  }
}
