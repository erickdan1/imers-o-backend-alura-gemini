import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export default async function generateDescriptionWithGemini(imageBuffer) {
  const prompt =
    "Generate a description in Brazilian Portuguese for the following image, return only the description text";

  try {
    const image = {
      inlineData: {
        data: imageBuffer.toString("base64"),
        mimeType: "image/png",
      },
    };
    const res = await model.generateContent([prompt, image]);
    return res.response.text() || "Description not available.";
  } catch (erro) {
    console.error("Error getting description:", erro.message, erro);
    throw new Error("Error getting Gemini description.");
  }
}