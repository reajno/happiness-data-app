import { useNavigate } from "react-router-dom";
import queryUtils from "../../Utilities/utils";

export default function CountryCellRenderYears({ country }) {
  const navigate = useNavigate();

  const handleClick = () => {
    const countryQuery = queryUtils.toHyphen(country);
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
