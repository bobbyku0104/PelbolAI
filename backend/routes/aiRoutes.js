const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post('/chat', async (req, res) => {
  try {
    const { message, context } = req.body;
    
    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY.includes('YOUR_GEMINI')) {
      return res.status(400).json({ message: 'Missing API Key in .env' });
    }

    // Using gemini-1.5-flash which is more compatible with new API keys
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
      You are Peblo AI, a state-of-the-art neural writing assistant.
      
      USER CONTEXT:
      """
      ${context || 'No content yet.'}
      """
      
      USER MESSAGE:
      "${message}"
      
      RESPONSE RULES:
      1. Provide intelligent, sophisticated responses.
      2. Use Markdown for formatting.
      3. Maintain a "Quiet Luxury" tone.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.json({ reply: text });
  } catch (error) {
    console.error('AI Error:', error);
    
    // If it's a key error, give a clear instruction
    if (error.message.includes('API_KEY_INVALID')) {
      return res.status(400).json({ 
        error: 'Invalid API Key', 
        message: 'Google rejected this key. Please generate a NEW key at aistudio.google.com and make sure to copy the ENTIRE string.' 
      });
    }

    res.status(500).json({ 
      message: 'Neural Link Interrupted.', 
      error: error.message 
    });
  }
});

module.exports = router;
