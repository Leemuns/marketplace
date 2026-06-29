import { useState, type SyntheticEvent } from "react";

import type { UserCredentials } from "../types";
import loginService from "../services/login";
import userService from "../services/user";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameNew, setUsernameNew] = useState("");
  const [passwordNew, setPasswordNew] = useState("");

  const loginUser = async (userCredentials: UserCredentials) => {
    try {
      const user = await loginService.login(userCredentials);
      console.log(user);
      // window.localStorage.setItem("loggedUser", JSON.stringify(user));
      // blogService.setToken(user.token)
      // setUser(user)
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogin = (e: SyntheticEvent) => {
    e.preventDefault();

    loginUser({ username, password });
    setUsername("");
    setPassword("");
  };

  const signupUser = async (userCredentials: UserCredentials) => {
    try {
      const user = await userService.signup(userCredentials);
      console.log(user);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSignup = (e: SyntheticEvent) => {
    e.preventDefault();

    signupUser({ username: usernameNew, password: passwordNew });
    setUsernameNew("");
    setPasswordNew("");
  };

  return (
    <div style={{ paddingTop: "48px" }}>
      <form onSubmit={handleLogin}>
        <h2 style={{ marginBottom: "6px" }}>Log in to application</h2>

        <div>
          <label>
            username{" "}
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
        </div>

        <div>
          <label>
            password{" "}
            <input
              type={password}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </div>

        <button type="submit">login</button>
      </form>

      <form onSubmit={handleSignup}>
        <h2 style={{ marginBottom: "6px" }}>Sign up as new user</h2>

        <div>
          <label>
            new username{" "}
            <input
              value={usernameNew}
              onChange={(e) => setUsernameNew(e.target.value)}
            />
          </label>
        </div>

        <div>
          <label>
            new password{" "}
            <input
              type={password}
              value={passwordNew}
              onChange={(e) => setPasswordNew(e.target.value)}
            />
          </label>
        </div>

        <button type="submit">sign up</button>
      </form>
    </div>
  );
}
