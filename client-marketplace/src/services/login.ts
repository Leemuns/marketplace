import type { User, UserCredentials } from "../types";

const baseUrl = "api/login";

const login = async (credentials: UserCredentials): Promise<User> => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  };
  const res = await fetch(baseUrl, options);
  if (!res.ok) throw new Error("Failed to login");
  return await res.json();
};

export default {
  login,
};
