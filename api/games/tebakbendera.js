import axios from "axios";

async function scrape() {
  try {
    const response = await axios.get("https://flagcdn.com/en/codes.json", {
      timeout: 30000,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      },
    });
    const data = response.data;
    const randomKey =
      Object.keys(data)[Math.floor(Math.random() * Object.keys(data).length)];
    return {
      name: data[randomKey],
      img: `https://flagpedia.net/data/flags/ultra/${randomKey}.png`,
    };
  } catch (error) {
    try {
      const srcResponse = await axios.get(
        "https://raw.githubusercontent.com/BochilTeam/database/master/games/tebakbendera2.json",
        {
          timeout: 30000,
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
          },
        }
      );
      const src = srcResponse.data;
      return src[Math.floor(Math.random() * src.length)];
    } catch (innerError) {
      console.error("API Error:", innerError.message);
      throw new Error("Failed to get response from API");
    }
  }
}

export default async function handler(req, res) {
  try {
    const data = await scrape();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
}
