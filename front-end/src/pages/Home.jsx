import Chat from "../components/Chat";
import Header from "../components/Header";
import { useProvider } from "../context/Provider"; // Certifique-se de que está importando corretamente o useProvider
import Loading from "react-loading-components"; // Importando o componente de loading, se necessário

const Home = () => {
  const { globalLoading, isTransitioning } = useProvider();

  return (
    <div>
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
        <div className={`${isTransitioning ? "fade-out" : "fade-in"}`}>
          <Header />
          <Chat />
        </div>
      )}
    </div>
  );
};

export default Home;
