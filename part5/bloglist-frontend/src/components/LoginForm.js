import PropTypes from "prop-types";

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
          id={"username"}
          type={"text"}
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        <br />
        password
        <input
          id={"password"}
          type={"password"}
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <br />
        <button id={"login-button"} type={"submit"}>
          login
        </button>
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  username: PropTypes.string.isRequired,
  setUsername: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  setPassword: PropTypes.func.isRequired,
  loginHandler: PropTypes.func.isRequired,
};

export default LoginForm;
