import { X } from "lucide-react";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import Loading from "react-loading-components";
import "../index.css";
import { useProvider } from "../context/Provider";

const LoginModal = ({ isOpen, onClose }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginWarning, setLoginWarning] = useState(null);
  const [isDisplayed, setIsDisplayed] = useState(false);
  const [nameWarning, setNameWarning] = useState(null);
  const [passwordWarning, setPasswordWarning] = useState(null);
  const [currentClass, setCurrentClass] = useState("fade-enter");
  const { setUserIsLogged, setUserName: setName } = useProvider();

  useEffect(() => {
    if (isOpen) {
      setIsDisplayed(true);
      setCurrentClass("fade-enter-active");
    } else {
      setCurrentClass("fade-leave-active");
      setTimeout(() => {
        setIsDisplayed(false);
      }, 500); // Espera a duração da transição
    }
  }, [isOpen]);

  const verifyUserName = () => {
    if (!userName || userName.length < 1) {
      setNameWarning("Please provide a username.");
      setLoading(false);
      return true;
    }
  };

  const verifyPassword = () => {
    if (!password || password.length < 1) {
      setPasswordWarning("Please provide a password.");
      setLoading(false);
      return true;
    }
  };

  const loginUser = async () => {
    setNameWarning(null);
    setPasswordWarning(null);
    setLoginWarning(null);
    setLoading(true);

    if (verifyUserName() || verifyPassword()) return true;

    try {
      const response = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_name: userName, password }),
      });
      if (!response.ok) {
        setLoginWarning("Incorrect username or password");
      } else {
        const data = await response.json();
        setName(data.user_name);
        setUserIsLogged(true);
        localStorage.setItem("token", data.token);
        localStorage.setItem("user_name", data.user_name);
        onClose();
      }

      setUserName("");
      setPassword("");
      setLoading(false);
    } catch (error) {
      console.log("Error:", error);
      setLoading(false);
    }
  };

  return (
    isDisplayed && (
      <div
        className={`fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 fade-in ${currentClass}`}
      >
        <div className="bg-white p-6 rounded-lg w-3/12">
          <X
            onClick={() => {
              onClose();
              setLoading(false);
              setLoginWarning(null);
              setPassword("");
              setUserName("");
            }}
            className="float-right cursor-pointer"
          />
          <h2 className="text-xl mb-4">Login</h2>
          <input
            className="border mb-2 p-2 w-full"
            type="text"
            placeholder="Username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
           {nameWarning && (
            <p className="text-xs text-red-500 px-2">{nameWarning}</p>
          )}
          <input
            className="border mb-2 p-2 w-full"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
           {passwordWarning && (
            <p className="text-xs text-red-500 px-2">{passwordWarning}</p>
          )}
          {loginWarning && (
            <p className="text-xs text-red-500 px-2">{loginWarning}</p>
          )}
          <button
            className="bg-blue-500 text-white p-2 w-full rounded mt-4 h-10 flex items-center justify-center"
            onClick={() => loginUser()}
          >
            {loading ? (
              <Loading type="tail_spin" width={30} height={25} fill="#00000" />
            ) : (
              "Login"
            )}
          </button>
        </div>
      </div>
    )
  );
};

LoginModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default LoginModal;
