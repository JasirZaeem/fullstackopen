import { useSelector } from "react-redux";

const Toast = () => {
  const { message, type } = useSelector(({ notification }) => notification);
  return (
    <div className={`toast ${type}`}>
      <p>{message}</p>
    </div>
  );
};

export default Toast;
