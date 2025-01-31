import { apiKey } from "./key";
import { Request, Response } from "express";
import { prompt_data } from "./prompt";
const { GoogleGenerativeAI } = require("@google/generative-ai");

export const analyzeCode = async (req: Request, res: Response) => {
  const { code, lang } = req.body as { code: string; lang: string };
  if (!code || !lang) {
    res.status(400).json({ error: "No code provided" });
    return;
  }
  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = prompt_data(code, lang);
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    const jsonResponse = responseText.substring(
      responseText.indexOf("{"),
      responseText.lastIndexOf("}") + 1
    );
    res.status(200).json({ result: jsonResponse });
  } catch (error: any) {
    if (error.code === "insufficient_quota") {
      res.status(429).json({
        error:
          "You have exceeded your quota. Please check your plan and billing details.",
      });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};
