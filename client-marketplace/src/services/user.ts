import type { User, UserCredentials } from "../types";

const baseUrl = "api/users";

const signup = async (credentials: UserCredentials): Promise<User> => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  };
  const res = await fetch(baseUrl, options);
  if (!res.ok) throw new Error("Failed to sign up");
  return await res.json();
};

export default {
  signup,
};
