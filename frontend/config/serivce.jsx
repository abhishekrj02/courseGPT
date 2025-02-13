const axios = require("axios");

const YOUTUBE_BASE_URL = "https://www.googleapis.com/youtube/v3/search";

const getVideos = async (query) => {
  const params = {
    part: "snippet",
    q: query,
    maxResults: 1,
    type: "video",
    key: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY,
  };
  try {
    // console.log("Request Params:", params);
    const res = await axios.get(YOUTUBE_BASE_URL, { params });
    // console.log("Response Data:", res.data);
    return res.data.items;
  } catch (error) {
    console.error("YouTube API Error:", error.response?.data || error.message);
    throw error;
  }
  // const res = await  axios.get(YOUTUBE_BASE_URL,{params});
  // return res.data.items;
};

export default { getVideos };
