const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api";
export const customFetch = async (endpoint, options = {}) => {
  const url = `${BASE_URL}${endpoint}`;
  return fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });
};
