import { useNavigate } from "react-router-dom";
import queryUtils from "../Utilities/utils";
import "../index.css";

const errorRestrictedAccess = () => {
  return {
    error: true,
    message: 
      <span>
        You must <a href="/login">Log In</a> or <a href="/register">Register</a>{" "}
        to view this content.
      </span>

  };
};

export default function YearCellRenderFactors({
  value,
  country,
  isLoggedIn,
  onError,
}) {
  const navigate = useNavigate();

  const handleClick = () => {
    try {
      if (!isLoggedIn) {
        throw errorRestrictedAccess();
      } else {
        const countryQuery = queryUtils.toHyphen(country);
        const url = `/factors/${value}/${countryQuery}`;
        navigate(url);
      }
    } catch (error) {
      if (onError) onError(error);
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
