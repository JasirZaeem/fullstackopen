import { useSelector } from "react-redux";

const Toast = () => {
  const { message, type } = useSelector(({ notification }) => notification);
  return message ? (
    <div
      className={`card d-flex align-items-center text-white bg-${type} m-2`}
    >
      <div className="card-body">{message}</div>
    </div>
  ) : null;
};

export default Toast;
