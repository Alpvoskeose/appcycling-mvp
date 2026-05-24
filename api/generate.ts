import type { VercelRequest, VercelResponse } from "@vercel/node";

const BASE_PROMPT =
  "High fashion editorial photo of a sustainable upcycled garment made from old clothes, modern streetwear design, olive green and neutral tones, studio lighting, photorealistic, 8k";

const HF_MODEL_URL =
  "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const hfToken = process.env.HF_API_TOKEN;
  if (!hfToken) {
    res.status(500).json({ error: "HF_API_TOKEN is not set" });
    return;
  }

  try {
    const { imageBase64, promptText } = req.body || {};

    if (!imageBase64 || typeof imageBase64 !== "string") {
      res.status(400).json({ error: "Missing imageBase64" });
      return;
    }

    const promptSuffix = typeof promptText === "string" && promptText.trim().length > 0
      ? ` ${promptText.trim()}`
      : "";

    const response = await fetch(HF_MODEL_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${hfToken}`,
        "Content-Type": "application/json",
        Accept: "image/*",
      },
      body: JSON.stringify({
        inputs: `${BASE_PROMPT}${promptSuffix}`,
      }),
    });

    if (!response.ok) {
      const payload = await response.text();
      res.status(500).json({ error: `Hugging Face error: ${payload}` });
      return;
    }

    const contentType = response.headers.get("content-type") || "image/jpeg";
    const arrayBuffer = await response.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString("base64");
    const imageUrl = `data:${contentType};base64,${base64}`;

    res.status(200).json({ imageUrl });
  } catch (error) {
    res.status(500).json({ error: "Unexpected server error" });
  }
}
