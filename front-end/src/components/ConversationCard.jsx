import { Upload } from "lucide-react";
import PropTypes from "prop-types";

const ConversationCard = ({ userName, id, date }) => {
  const uploadCsv = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/conversation/download/${id}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ user_name: userName }),
      }
    );
    const blob = await response.blob();
    const downloadUrl = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = downloadUrl;
    a.download = `conversation${id}.csv`; // Nome do arquivo para download

    document.body.appendChild(a);
    a.click();

    // Limpeza
    window.URL.revokeObjectURL(downloadUrl);
  };

  const formatDate = (conversationDate) => {
    const date = new Date(conversationDate);

    // Pegar o dia, mês e ano
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Os meses são de 0 a 11, por isso +1
    const year = date.getFullYear();

    // Pegar a hora e os minutos
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    // Formatar no padrão desejado
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  return (
    <div className="border-2 w-5/12 flex justify-between h-16 mx-auto items-center rounded-xl">
      <div className="ml-5">
        <p>Conversation #{id}</p>
        <p>User: {userName}</p>
      </div>
      <div className="flex gap-2">
        <Upload
          strokeWidth={2.25}
          className="cursor-pointer"
          onClick={() => uploadCsv()}
        />
        <p>Export CSV</p>
      </div>
      <p className="mr-5"> Created in: {formatDate(date)}</p>
    </div>
  );
};

ConversationCard.propTypes = {
  userName: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  date: PropTypes.instanceOf(Date).isRequired,
};

export default ConversationCard;
