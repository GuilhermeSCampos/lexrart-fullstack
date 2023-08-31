import { useState, useEffect, useRef } from "react";
import { useProvider } from "../context/Provider";
import LoginModal from "./LoginModal";
import { SendHorizontal } from "lucide-react";
import { getCurrentTime, formatDateToTime } from "../utils/formatDates";
import { botMessages } from "../utils/botMessages";
import Loading from "react-loading-components";

const Chat = () => {
  const [currentTime, setCurrentTime] = useState(getCurrentTime());
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const { userIsLogged, messages, setMessages } = useProvider();
  const [inputValue, setInputValue] = useState("");
  const [botIsTyping, setBotIsTyping] = useState(false);
  const [isChatClosed, setIsChatClosed] = useState(false);

  const messagesEndRef = useRef(null);

  const restartChat = () => {
    setMessages([]);
    setIsChatClosed(false);
    setInputValue("");
  };

  useEffect(() => {
    setMessages([]);
    const timer = setInterval(() => {
      setCurrentTime(getCurrentTime());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const getRandomDelay = () => {
    return Math.floor(Math.random() * (2000 - 1000 + 1) + 1000);
  };

  const sendChatToDB = async () => {
    const texts = messages.map((msg) => [`${msg.message}##${msg.date}`]);
    const fullString = texts.join(";;").replace(/<br\s*\/?>/gi, "").replace(/<a[^>]*>([^<]+)<\/a>/gi, '$1');

    try {
      await fetch("http://localhost:3001/conversation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ text: fullString }),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleOptionClick = (option) => {
    if (option === botMessages.loanOptions[0]) {
      sendMessage("I want to Apply for a loan");
    }
    if (option === botMessages.loanOptions[1]) {
      sendMessage("Loan conditions");
    }
    if (option === botMessages.loanOptions[2]) {
      sendMessage("Help");
    }
  };

  const verifyMessage = () => {
    if (messages.length === 0) return;

    const lastUserMessage = messages[messages.length - 1].message.toLowerCase();

    let botReply = botMessages.sorry;

    if (lastUserMessage.includes("i want")) {
      botReply = botMessages.applyForLoan;
    } else if (lastUserMessage.includes("loan conditions")) {
      botReply = botMessages.loanConditions;
    } else if (lastUserMessage === "help") {
      botReply = botMessages.help;
    } else if (lastUserMessage.includes("hello")) {
      botReply = botMessages.hello;
    } else if (lastUserMessage.includes("goodbye")) {
      botReply = botMessages.goodBye;
    } else if (lastUserMessage.includes("good")) {
      botReply = botMessages.good;
    } else if (lastUserMessage.includes("loan")) {
      botReply = botMessages.loan;
    }

    setBotIsTyping(true);

    setTimeout(() => {
      const newMessage = {
        message: botReply,
        date: getMessageDate(),
      };
      setMessages([...messages, newMessage]);
      setBotIsTyping(false);
    }, getRandomDelay());

    if (botReply === botMessages.goodBye) {
      setIsChatClosed(true);
      setTimeout(() => {
        sendChatToDB();
      }, 2000);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && inputValue.trim().length > 0) {
      sendMessage(inputValue);
    }
  };

  const getMessageDate = () => {
    const date = new Date();
    const utcTime = date.getTime() + date.getTimezoneOffset() * 60000;
    const timeOffset = -3 * 60 * 60000;
    const formattedDate = new Date(utcTime + timeOffset).toString();

    return formattedDate;
  };

  const sendMessage = (value) => {
    if (isChatClosed) return;
    if (value.trim().length < 1) return;
    if (botIsTyping) return;

    const newMessage = {
      message: value,
      date: getMessageDate(),
    };

    setInputValue("");
    setMessages([...messages, newMessage]);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if ((messages.length - 1) % 2 === 0) {
      verifyMessage();
    }
  }, [messages]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, botIsTyping]);

  return (
    <div className="border-2 rounded-xl w-6/12 mx-auto mt-20 h-[600px] flex flex-col items-center p-6 bg-gradient-to-br shadow-md">
      <div className="text-center text-xl mb-4">{currentTime}</div>
      {isChatClosed && (
        <div className="flex items-center justify-center h-1/5">
          <button
            onClick={restartChat}
            className="px-8 py-4 bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-lg shadow-md text-white"
          >
            Start a New Chat
          </button>
        </div>
      )}

      <div className="flex-grow overflow-y-auto mb-4 w-full">
        {messages.map((msg, index) => (
          <div key={index}>
            <div
              className={`my-2 flex ${
                index % 2 === 0 ? "flex-row-reverse mr-4" : "flex-row"
              } justify-start items-center`}
            >
              <div
                className={`p-3 max-w-[40%] w-fit rounded-lg break-words ${
                  index % 2 === 0 ? "bg-blue-300" : "bg-gray-300"
                }`}
              >
                {/* {msg.message} */}
                <div
                  className="blue-links"
                  dangerouslySetInnerHTML={{ __html: msg.message }}
                ></div>
                <span className="text-xs text-gray-500 ml-2">
                  {formatDateToTime(msg.date)}
                </span>
              </div>
              {index % 2 === 0 ? (
                <span className="text-gray-600 mr-2 text-lg">You</span>
              ) : (
                <span className="text-gray-600 ml-2 text-lg">Optus</span>
              )}
            </div>

            {msg.message.includes(
              "I can help you with the following loan-related services"
            ) &&
              botMessages.loanOptions.map((option, idx) => (
                <button
                  key={idx}
                  className="loan-option-button p-3 mx-1 my-2 text-white px-2 py-1 rounded"
                  onClick={() => handleOptionClick(option)}
                >
                  {option}
                </button>
              ))}
          </div>
        ))}

        {botIsTyping && (
          <div className="my-2 p-3 max-w-[40%] w-fit rounded-lg bg-gray-300 mr-auto">
            <Loading type="three_dots" width={30} height={30} fill="#000" />
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="relative w-full mt-auto">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyUp={(e) => handleKeyPress(e)}
          className="p-2 w-full pl-4 pr-10 border border-blue-300 rounded-md outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
          placeholder={
            userIsLogged
              ? isChatClosed
                ? "Chat is closed."
                : "Type a message..."
              : "You must be logged in to chat"
          }
          disabled={!userIsLogged || isChatClosed}
        />
        {userIsLogged && (
          <SendHorizontal
            className={`absolute right-3 top-1/2 transform -translate-y-1/2  ${
              isChatClosed ? "text-slate-500" : "text-blue-500"
            } cursor-pointer`}
            size={28}
            onClick={() => sendMessage(inputValue)}
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
      {isChatClosed && (
        <p className="mt-2 text-red-500 text-lg">
          Chat has been closed. You cant send further messages.
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
