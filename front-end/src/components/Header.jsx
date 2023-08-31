import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import RegisterModal from "./RegisterModal";
import LoginModal from "./LoginModal";
import { useProvider } from "../context/Provider";
import { LogOut } from "lucide-react";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { userIsLogged, userName, setUserIsLogged, setIsTransitioning } =
    useProvider();

  const logOutWithFade = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      logOut();
      setIsTransitioning(false);
    }, 500);
  };

  const logOut = async () => {
    localStorage.clear();
    setUserIsLogged(false);
    await fetch(`${import.meta.env.VITE_API_URL}/auth/logout`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  };

  return (
    <div className="bg-blue-400 h-16 flex justify-between">
      <div className="flex justify-around gap-12">
        <div
          className="bg-yellow-300 rounded-full w-16 h-14 flex justify-center self-center ml-5 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <h2 className="self-center text-xl">Optus</h2>
        </div>
        <div className="flex justify-around self-center w-2/12 gap-4 text-white text-sm xl:text-xl">
          {location.pathname !== "/" ? (
            <button onClick={() => navigate("/")}>Home</button>
          ) : null}

          {location.pathname !== "/history" ? (
            <button onClick={() => navigate("/history")}>Historic</button>
          ) : null}
        </div>
      </div>

      <div className="flex self-center gap-4  mr-2 md:mr-12 text-white text-sm xl:text-xl">
        {userIsLogged ? (
          <div className="flex justify-between gap-4 text-white">
            <p>Welcome, {userName}</p>
            <LogOut
              size={window.innerWidth > 640 ? 22 : 15}
              color="#ffffff"
              className="mt-1 cursor-pointer"
              onClick={logOutWithFade}
            />
          </div>
        ) : (
          <>
            <button onClick={() => setIsModalOpen(true)}>Register</button>
            <button onClick={() => setIsLoginModalOpen(true)}>Login</button>
          </>
        )}
      </div>
      <RegisterModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </div>
  );
};

export default Header;
