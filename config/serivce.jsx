const { default: axios } = require("axios")

const YOUTUBE_BASE_URL = "https://www.googleapis.com/youtube/v3/search"

const getVideos = async(query) => {
    const params = {
        part: 'snippet',
        q:query,
        maxResults:1,
        type: 'video',
        key: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY
    }

    const res = await  axios.get(YOUTUBE_BASE_URL,{params});
    return res.data.items;
}

export default {getVideos};