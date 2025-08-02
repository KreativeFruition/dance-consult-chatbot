
const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

module.exports = async (req, res) => {
  const userMessage = req.body.message;
  const chatCompletion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: "You are the official AI assistant for 1:1 Dance Consult — a mentorship brand created by Kevin Frey. Help users understand the brand, its offerings, and guide them toward either a full 1:1 consult or a free intro chat. Be bold, supportive, and clear. Always guided by the principle: 'Creative Careers Start Here.'"
      },
      { role: "user", content: userMessage }
    ],
    model: "gpt-4"
  });

  const reply = chatCompletion.choices[0].message.content;
  res.status(200).json({ reply });
};
