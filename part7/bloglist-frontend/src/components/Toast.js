import { useSelector } from "react-redux";

const Toast = () => {
  const { message, type } = useSelector(({ notification }) => notification);
  return message ? (
    <div className={`toast ${type}`}>
      <p>{message}</p>
    </div>
  ) : null;
};

export default Toast;
