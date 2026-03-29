import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(".")); // віддає твій index.html, styles.css, js, videos

app.post("/send-telegram", async (req, res) => {
  const { name, phone, message } = req.body;

  if (!name || !phone) {
    return res.status(400).json({ error: "Ім'я і телефон обов'язкові" });
  }

  const text = [
    "Нова заявка з сайту 29 Minutes Gym",
    "",
    `Ім'я: ${name}`,
    `Телефон: ${phone}`,
    `Коментар: ${message || "—"}`
  ].join("\n");

  try {
    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          chat_id: process.env.CHAT_ID,
          text
        })
      }
    );

    const telegramData = await telegramResponse.json();

    if (!telegramResponse.ok || !telegramData.ok) {
      return res.status(500).json({
        error: "Telegram API error",
        details: telegramData
      });
    }

    return res.json({ ok: true });
  } catch (error) {
    return res.status(500).json({
      error: "Server error",
      details: error.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});