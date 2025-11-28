import axios from "axios";

export default async function handler(req, res) {
  try {
    const response = await axios.get(
      "https://raw.githubusercontent.com/BochilTeam/database/master/games/tebakbendera2.json"
    );
    const data = response.data;
    const random = data[Math.floor(Math.random() * data.length)];

    res.status(200).json({
      image: random.img,
      question: "Bendera negara apa ini?",
      options: random.options || [random.name]
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
