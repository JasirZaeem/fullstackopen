import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../queries";

export const Login = ({ updateToken }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loginMutation, result] = useMutation(LOGIN, {
    onError: alert,
    fetchPolicy: "no-cache",
  });

  const login = async (e) => {
    e.preventDefault();
    await loginMutation({
      variables: { username, password },
    });
  };

  useEffect(() => {
    if (result.data) {
      const token = result.data?.login.value;
      if (token) {
        setUsername("");
        setPassword("");
        updateToken(token);
      }
    }
  }, [result.data, updateToken]);

  return (
    <div>
      <form onSubmit={login}>
        <label>
          Username:{" "}
          <input
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
        </label>
        <br />
        <label>
          Password:{" "}
          <input
            type={"password"}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </label>
        <button>Login</button>
      </form>
    </div>
  );
};
