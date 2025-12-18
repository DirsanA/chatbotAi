import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.post("/chat", async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }



  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "deepseek/deepseek-r1-0528:free",
       messages: [
  {
    role: "system",
    content: "You are a helpful assistant. Always respond in English only."
  },
  {
    role: "user",
    content: message
  }
]

      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:5173",
          "X-Title": "DeepSeek React AI App"
        }
      }
    );

    res.json({
      reply: response.data.choices[0].message.content
    });

  } catch (error) {
    console.error(
      "OpenRouter Error:",
      error.response?.data || error.message
    );
    res.status(500).json({ error: "AI request failed" });
  }
});

app.listen(5000, () => {
  console.log("✅ Backend running at http://localhost:5000");
  console.log("API KEY:", process.env.OPENROUTER_API_KEY);

});
