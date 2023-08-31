import Header from "../components/Header";
import ConversationCard from "../components/ConversationCard";
import { useEffect, useState } from "react";

const Historic = () => {
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/conversations")
      .then((res) => res.json())
      .then((data) => setConversations(data));
  }
  , []);

  return (
    <div>
      <Header />
      <ConversationCard></ConversationCard>
    </div>
  );
};

export default Historic;
