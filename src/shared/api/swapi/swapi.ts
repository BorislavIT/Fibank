import axios from "axios";

const swapiClient = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_SWAPI_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default swapiClient;
