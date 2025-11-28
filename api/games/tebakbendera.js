import axios from "axios";

async function getRandomFlag() {
  try {
    // Ambil database dari BochilTeam
    const response = await axios.get(
      "https://raw.githubusercontent.com/BochilTeam/database/master/games/tebakbendera2.json",
      {
        timeout: 30000,
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        },
      }
    );

    const data = response.data;
    const random = data[Math.floor(Math.random() * data.length)];

    // Pastikan format sesuai kebutuhan bot
    return {
      image: random.img,        // link gambar bendera
      question: "Bendera negara apa ini?", // pertanyaan default
      options: random.options || [random.name], // opsi jawaban
    };
  } catch (error) {
    console.error("API Error:", error.message);
    throw new Error("Failed to fetch flag quiz data");
  }
}

export default async function handler(req, res) {
  try {
    const quiz = await getRandomFlag();
    res.status(200).json(quiz);
  } catch (error) {
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
}
