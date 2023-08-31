import { Route, Routes } from "react-router-dom";
import History from "./pages/History";
import Home from "./pages/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/history" element={<History />} />
      <Route path="*" element={<h1>Not Found</h1>} />
    </Routes>
  );
}

export default App;
