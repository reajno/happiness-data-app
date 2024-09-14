import { useNavigate } from "react-router-dom";
import queryUtils from "../Utilities/utils";
import "../index.css";

const authenticateMessage = () => {
  return (
    <span>
      You must <a href="/login">Log In</a> or <a href="/register">Register</a>{" "}
      to view this content.
    </span>
  );
};

export default function YearCellRenderFactors({
  value,
  country,
  isLoggedIn,
  setAlertMessage,
}) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (!isLoggedIn) {
      setAlertMessage(authenticateMessage());
    } else {
      const countryQuery = queryUtils.toHyphen(country);
      const url = `/factors/${value}/${countryQuery}`;
      navigate(url);
    }
  };

  return (
    <a
      onClick={handleClick}
      className="link-underline link-underline-opacity-0 link-underline-opacity-75-hover"
    >
      {value}
    </a>
  );
}
