import axios from "axios";

export const baseAxios = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://192.168.100.161:8082",
  headers: {
    "Content-Type": "application/json",
  },
});