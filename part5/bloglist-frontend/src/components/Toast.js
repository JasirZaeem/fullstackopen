import PropTypes from "prop-types";

const Toast = ({ message, type }) => {
  return (
    <div className={`toast ${type}`}>
      <p>{message}</p>
    </div>
  );
};

Toast.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["success", "error"]).isRequired,
};

export default Toast;
