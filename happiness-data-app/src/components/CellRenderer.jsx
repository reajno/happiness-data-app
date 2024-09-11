import { useNavigate } from "react-router-dom";
import "../index.css";

export default function CellRenderer(props) {
  const navigate = useNavigate();

  const handleClick = () => {
    let url = "";
    if (props.column.colId === "country") {
      const query = props.value.toLowerCase().replace(/\s+/g, "-");
      url = `/rankings/country/${query}`;
    } else if (props.column.colId === "year") {
      url = `/rankings/year/${props.value}`;
    }
    navigate(url);

    // YEAR
    // console.log(props.data.year);
    // DATA
    // console.log(props.value);
  };

  return (
    <a
      onClick={handleClick}
      className="link-underline link-underline-opacity-0 link-underline-opacity-75-hover"
    >
      {props.value}
    </a>
    // <button
    //   onClick={handleClick}
    //   className="btn btn-outline-primary w-100 h-100"
    // >
    //   {props.value}
    // </button>
  );
}
