import axios from "axios";

const api = axios.create({
  baseURL: "https://shopverse-bxp8.onrender.com"
});

export default api;
