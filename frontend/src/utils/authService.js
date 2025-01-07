import { jwtDecode } from "jwt-decode";

const TOKEN_KEY = "jwt_token";

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const getDecodedToken = () => {
  try {
    const token = getToken();
    if (!token) {
      return null;
    }
    return jwtDecode(token);
  } catch (error) {
    return null;
  }
};

export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};
