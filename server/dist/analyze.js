"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyzeCode = void 0;
const key_1 = require("./key");
const prompt_1 = require("./prompt");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const analyzeCode = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { code, lang } = req.body;
    if (!code || !lang) {
        res.status(400).json({ error: "No code provided" });
        return;
    }
    try {
        const genAI = new GoogleGenerativeAI(key_1.apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const prompt = (0, prompt_1.prompt_data)(code, lang);
        const result = yield model.generateContent(prompt);
        const responseText = result.response.text();
        const jsonResponse = responseText.substring(responseText.indexOf("{"), responseText.lastIndexOf("}") + 1);
        res.status(200).json({ result: jsonResponse });
    }
    catch (error) {
        if (error.code === "insufficient_quota") {
            res.status(429).json({
                error: "You have exceeded your quota. Please check your plan and billing details.",
            });
        }
        else {
            res.status(500).json({ error: error.message });
        }
    }
});
exports.analyzeCode = analyzeCode;
