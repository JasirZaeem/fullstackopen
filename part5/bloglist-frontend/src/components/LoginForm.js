const LoginForm = ({
  username,
  setUsername,
  password,
  setPassword,
  loginHandler,
}) => {
  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={loginHandler}>
        username
        <input
          type={"text"}
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        <br />
        password
        <input
          type={"password"}
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <br />
        <button type={"submit"}>login</button>
      </form>
    </div>
  );
};

export default LoginForm;
