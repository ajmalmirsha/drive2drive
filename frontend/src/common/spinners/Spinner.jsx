
import './spinner.css'
import ReactLoading from "https://cdn.skypack.dev/react-loading@2.0.3";

export default function Spinner() {

  return (
    <div className="spinner">
        <ReactLoading
          type={"bars"}
          color={"#03fc4e"}
          height={100}
          width={100}
        />
    </div>
  );
}

