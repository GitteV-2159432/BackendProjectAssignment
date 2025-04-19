import { fetchFromWger } from "../utils/wgerFetcher.js";

const getExercises = async (req, res) => {
  try {
    const { language = 2, category } = req.query; // 2 = English

    const params = { language };
    if (category) params.category = category;

    const data = await fetchFromWger("exercise", params);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch exercises from Wger" });
  }
};

export { getExercises };
