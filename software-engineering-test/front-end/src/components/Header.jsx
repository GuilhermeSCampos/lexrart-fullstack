import { useState } from "react";
import { useNavigate } from "react-router-dom";
import RegisterModal from "./RegisterModal";
import LoginModal from "./LoginModal";
import { useProvider } from "../context/Provider";
import { LogOut } from "lucide-react";

const Header = () => {
  const navigate = useNavigate();
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

  const logOut = () => {
    logOutWithFade();
    localStorage.clear();
    setUserIsLogged(false);
    fetch("http://localhost:3001/auth/logout", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  };

  return (
    <div className="bg-blue-400 h-16 flex justify-between">
      <div className="flex justify-around gap-12">
        <div className="bg-yellow-300 rounded-full w-16 h-14 flex justify-center self-center ml-5">
          <h2 className="self-center text-xl">Optus</h2>
        </div>
        <div className="flex justify-around self-center w-2/12 gap-4  text-white text-xl">
          <button onClick={() => navigate("/")}>Home</button>
          <button onClick={() => navigate("/history")}>Historic</button>
        </div>
      </div>

      <div className="flex self-center gap-4  mr-12 text-white text-xl">
        {userIsLogged ? (
          <div className="flex justify-between self-center gap-4   text-white text-xl">
            <p>Welcome, {userName}</p>
            <LogOut
              size={22}
              color="#ffffff"
              className="mt-1 cursor-pointer"
              onClick={logOut}
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
