import { useNavigate } from "react-router-dom";
import queryUtils from "../../Utilities/utils";

export default function CountryCellRenderYears({ value }) {
  const navigate = useNavigate();

  const handleClick = () => {
    const countryQuery = queryUtils.toHyphen(value);
    const url = `/rankings/country/${countryQuery}`;
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
