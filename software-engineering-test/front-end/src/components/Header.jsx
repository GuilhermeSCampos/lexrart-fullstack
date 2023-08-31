import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-blue-400 h-16 flex justify-between">
      <div className="bg-yellow-300 rounded-full w-16 h-14 flex justify-center self-center ml-5">
        <h2 className="self-center text-xl">Optus</h2>
      </div>
      <div className="flex justify-around self-center w-1/12 mr-12">
        <button onClick={() => navigate("/")} className=" text-white">
          Home
        </button>
        <button onClick={() => navigate("/historic")} className=" text-white">
          Historic
        </button>
      </div>
    </div>
  );
};

export default Header;
