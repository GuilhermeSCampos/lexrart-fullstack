import Header from "../components/Header";
import ConversationCard from "../components/ConversationCard";
import Loading from "react-loading-components";
import { useEffect, useState } from "react";
import { useProvider } from "../context/Provider";

const Historic = () => {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeSort, setActiveSort] = useState("asc");
  const { globalLoading } = useProvider();
  console.log(globalLoading);

  useEffect(() => {
    fetch("http://localhost:3001/conversation?order=asc")
      .then((res) => res.json())
      .then((data) => {
        setConversations(data);
        setLoading(false);
      });
  }, []);

  const sortConversations = (order) => {
    setLoading(true);
    fetch(`http://localhost:3001/conversation?order=${order}`)
      .then((res) => res.json())
      .then((data) => {
        setConversations(data);
        setActiveSort(order);
        setLoading(false);
      });
  };

  const getButtonClass = (order) => `
  bg-blue-500 
  text-white 
  font-bold 
  py-2 
  px-4 
  rounded 
  transition 
  duration-200 
  ease-in-out 
  ${
    order === activeSort
      ? "bg-blue-800 border-2 border-stone-400 hover:bg-blue-900"
      : "hover:bg-blue-600"
  } 
  active:bg-blue-800 
  focus:outline-none 
  focus:ring-2 
  focus:ring-blue-600 
  focus:ring-opacity-50
`;

  return (
    <div className="">
      {globalLoading ? (
        <div className="flex justify-center items-center h-screen">
          <Loading
            type="tail_spin"
            width={90}
            height={90}
            fill="#000000"
            className="mx-auto"
          />
        </div>
      ) : (
        <div className="fade-in">
          <Header />
          <h2 className="text-center my-10 text-4xl font-semibold fade-in">
            Chat History
          </h2>
          {loading ? (
            <div className="flex justify-center items-center">
              <Loading
                type="three_dots"
                width={80}
                height={80}
                fill="#000000"
              />
            </div>
          ) : (
            <div className="flex flex-col gap-4 fade-in">
              <div className="w-5/12 flex justify-end mx-auto gap-4">
                <button
                  onClick={() => {
                    sortConversations("asc");
                    setActiveSort("asc");
                  }}
                  className={getButtonClass("asc")}
                >
                  Older
                </button>
                <button
                  onClick={() => {
                    sortConversations("desc");
                    setActiveSort("desc");
                  }}
                  className={getButtonClass("desc")}
                >
                  Recent
                </button>
              </div>
              {conversations.map((conversation) => (
                <ConversationCard
                  key={conversation.id}
                  id={conversation.id}
                  userName={conversation.user_name}
                  date={new Date(conversation.createdAt)}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Historic;
