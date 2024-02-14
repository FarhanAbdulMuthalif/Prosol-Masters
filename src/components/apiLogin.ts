import axios from "axios";
import { URL_FIX_BASE_PATH } from "./api";

export default axios.create({ baseURL: URL_FIX_BASE_PATH });
