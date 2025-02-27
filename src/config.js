export const API_URL = window.location.hostname === "localhost"
  ? "http://localhost:8181" // Correct port for local backend
  : "https://med-backend.onrender.com"; // Cloud backend URL

console.log("API_URL:", API_URL);
