import axios from "axios";
export const URL_FIX_BASE_PATH = "http://192.168.1.86:8001";
export default axios.create({ baseURL: URL_FIX_BASE_PATH });
