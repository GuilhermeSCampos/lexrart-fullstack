import { useState, useEffect } from "react";
import { useProvider } from "../context/Provider";
import LoginModal from "./LoginModal";
import { SendHorizontal } from "lucide-react";
import { getCurrentTime, formatDateToTime } from "../utils/formatDates";

const Chat = () => {

  const [currentTime, setCurrentTime] = useState(getCurrentTime());
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const { userIsLogged, messages, setMessages } = useProvider();
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(getCurrentTime());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const sendMessage = () => {
    if (inputValue.trim().length < 1) return;

    const date = new Date();
    const utcTime = date.getTime() + date.getTimezoneOffset() * 60000;
    const timeOffset = -3 * 60 * 60000;
    const formattedDate = new Date(utcTime + timeOffset).toString();

    const newMessage = {
      message: inputValue,
      date: formattedDate,
    };

    setInputValue("");
    setMessages([...messages, newMessage]);
  };

  console.log(messages);
  return (
    <div className="border-2 rounded-xl w-6/12 mx-auto mt-20 h-[600px] flex flex-col items-center p-6 bg-gradient-to-br shadow-md">
      <div className="text-center text-xl mb-4">{currentTime}</div>
      
      
    <div className="flex-grow overflow-y-auto mb-4 w-full">
      {messages.map((msg, index) => (
        <div 
          key={index} 
          className={`my-2 p-3 max-w-[40%] w-fit rounded-lg  break-words ${index % 2 === 0 ? "bg-blue-300 ml-auto mr-4" : "bg-gray-300 mr-auto"}`}
        >
          {msg.message} <span className="text-xs text-gray-500 ml-2">{formatDateToTime(msg.date)}</span>
        </div>
      ))}
    </div>
  
      <div className="relative w-full mt-auto">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="p-2 w-full pl-4 pr-10 border border-blue-300 rounded-md outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
          placeholder={userIsLogged ? "Type a message..." : "You must be logged in to chat"}
          disabled={!userIsLogged}
        />
        {userIsLogged && (
          <SendHorizontal
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-500 cursor-pointer"
            size={28}
            onClick={sendMessage}
          />
        )}
      </div>
  
      {!userIsLogged && (
        <p className="mt-2 text-red-500 text-lg">
          Please{" "}
          <span
            className="text-blue-500 cursor-pointer"
            onClick={() => setLoginModalOpen(true)}
          >
            login
          </span>{" "}
          to participate in the chat.
        </p>
      )}
  
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setLoginModalOpen(false)}
      />
    </div>
  );
};

export default Chat;
