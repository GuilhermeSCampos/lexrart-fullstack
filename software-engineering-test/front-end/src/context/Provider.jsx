import React, { useEffect, useState } from "react";
export const mainContext = React.createContext({});
import PropTypes from "prop-types";

export const Provider = (props) => {
  const [userIsLogged, setUserIsLogged] = useState(false);
  const [userName, setUserName] = useState("");
  const [messages, setMessages] = useState([]);
  const [globalLoading, setGlobalLoading] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const validateToken = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      const response = await fetch("http://localhost:3001/auth/validate", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setUserIsLogged(true);
        const data = await response.json();
        setUserName(data.user_name);
      } else {
        console.log('teste')
        localStorage.clear();
      }
    } else {
      console.log('teste')
      localStorage.clear();
    }

    setGlobalLoading(false);
  };

  useEffect(() => {
    validateToken();
  }, []);

  return (
    <mainContext.Provider
      value={{
        userIsLogged,
        setUserIsLogged,
        userName,
        setUserName,
        messages,
        setMessages,
        globalLoading,
        setGlobalLoading,
        isTransitioning,
        setIsTransitioning,
      }}
    >
      {props.children}
    </mainContext.Provider>
  );
};

Provider.propTypes = {
  children: PropTypes.shape().isRequired,
};

export const useProvider = () => React.useContext(mainContext);
