import { useNavigate } from "react-router-dom";
import queryUtils from "../../Utilities/utils";
import "../index.css";

export default function CountryCellRenderYears({ value }) {
  const navigate = useNavigate();

  const handleClick = () => {
    const query = queryUtils.toHyphen(value);
    const url = `/rankings/country/${query}`;

    navigate(url);
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
