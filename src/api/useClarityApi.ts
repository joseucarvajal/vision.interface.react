import axios from "axios";
import {
  CLARITY_ENDPOINT
} from "./constants";

export default function useApiAuth() {
  const clarityApi = axios.create({
    baseURL: CLARITY_ENDPOINT,        
  });

  return clarityApi;
}
