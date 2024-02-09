import axios from "axios";
export const URL_FIX_LOGIN_PATH = "http://localhost:9191";
export default axios.create({ baseURL: URL_FIX_LOGIN_PATH });
