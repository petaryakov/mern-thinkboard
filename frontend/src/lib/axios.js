import axios from "axios";
//makes the url dynamic for dev and prod env -> if in dev, we use the localhost
const BASE_URL = import.meta.env.MODE === "development"? "http://localhost:5001/api" : "/api"

const api = axios.create({
    baseURL: BASE_URL,
});

export default api;