import axios from "axios";

export const BASE_URL = "https://youtube-v31.p.rapidapi.com";

const options = {
  params: {
    maxResults: 500,
  },
  headers: {
    "X-RapidAPI-Key": "509bcf632dmsh901f87bde13847dp144df6jsncdcc5d571ac5",
    "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
  },
};

export const fetchFromAPI = async (url:any) => {
  const { data } = await axios.get(`${BASE_URL}/${url}`, options);

  return data;
};
