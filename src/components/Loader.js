import { FadeLoader } from "react-spinners";

const Loader = () => {
  return(
    <div className="loader">
      <FadeLoader size={75} color="red" />
    </div>
  );
}

export default Loader;
