import axios from "axios";

const baseURL = "http://127.0.0.1:3333/api";

export const resource = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});
