import axios from "axios"

async function scrape() {
  try {
    const response = await axios.get("https://flagcdn.com/en/codes.json", {
      timeout: 30000,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      },
    })
    const data = response.data
    const randomKey =
      Object.keys(data)[Math.floor(Math.random() * Object.keys(data).length)]
    return {
      name: data[randomKey],
      img: `https://flagpedia.net/data/flags/ultra/${randomKey}.png`,
    }
  } catch (error: any) {
    try {
      const srcResponse = await axios.get(
        "https://raw.githubusercontent.com/BochilTeam/database/master/games/tebakbendera2.json",
        {
          timeout: 30000,
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
          },
        },
      )
      const src = srcResponse.data
      return src[Math.floor(Math.random() * src.length)]
    } catch (innerError: any) {
      console.error("API Error:", innerError.message)
      throw new Error("Failed to get response from API")
    }
  }
}

export default [
  {
    metode: "GET",
    endpoint: "/api/games/tebakbendera",
    name: "tebak bendera",
    category: "Games",
    description:
      "This API endpoint provides a random country flag quiz. Each request delivers a new challenge featuring a country's flag and its name.",
    tags: ["Games", "Flag Quiz", "Geography", "Education", "World"],
    parameters: [],
    isPremium: false,
    isMaintenance: false,
    isPublic: true,
    async run() {
      try {
        const data = await scrape()
        if (!data) {
          return {
            status: false,
            error: "No result returned from API",
            code: 500,
          }
        }
        return {
          status: true,
          data,
          timestamp: new Date().toISOString(),
        }
      } catch (error: any) {
        return {
          status: false,
          error: error.message || "Internal Server Error",
          code: 500,
        }
      }
    },
  },
  {
    metode: "POST",
    endpoint: "/api/games/tebakbendera",
    name: "tebak bendera",
    category: "Games",
    description:
      "This API endpoint provides a random country flag quiz. Each request delivers a new challenge featuring a country's flag and its name.",
    tags: ["Games", "Flag Quiz", "Geography", "Education", "World"],
    requestBody: {},
    isPremium: false,
    isMaintenance: false,
    isPublic: true,
    async run() {
      try {
        const data = await scrape()
        if (!data) {
          return {
            status: false,
            error: "No result returned from API",
            code: 500,
          }
        }
        return {
          status: true,
          data,
          timestamp: new Date().toISOString(),
        }
      } catch (error: any) {
        return {
          status: false,
          error: error.message || "Internal Server Error",
          code: 500,
        }
      }
    },
  },
]
