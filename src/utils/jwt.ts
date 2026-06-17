import { jwtDecode } from "jwt-decode";
import axios from "./axios";

const isTokenValid = (authToken: string): boolean => {
  try {
    const decoded: { exp?: number } = jwtDecode(authToken);
    if (!decoded.exp) {
      console.error("Token does not contain an expiration time.");
      return false;
    }

    const currentTime = Date.now() / 1000; // Current time in seconds since epoch
    return decoded.exp > currentTime;
  } catch (err) {
    console.error("Failed to decode token:", err);
    return false;
  }
};

const setSession = (authToken?: string | null): void => {
  if (typeof authToken === "string" && authToken.trim() !== "") {
    // Store token in local storage and set authorization header for axios
    localStorage.setItem("authToken", authToken);
    axios.defaults.headers.common.Authorization = `Bearer ${authToken}`;

    // Keep Next.js middleware in sync (it can only read cookies, not localStorage)
    if (typeof document !== "undefined") {
      document.cookie = `auth-token=${encodeURIComponent(authToken)}; Path=/; SameSite=Lax`;
    }
  } else {
    // Remove token from local storage and delete authorization header from axios
    localStorage.removeItem("authToken");
    delete axios.defaults.headers.common.Authorization;

    if (typeof document !== "undefined") {
      document.cookie = "auth-token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax";
    }
  }
};

export { isTokenValid, setSession };
