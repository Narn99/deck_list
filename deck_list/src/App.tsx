import DeckPage from "./Pages/DeckPage/DeckPage";
import MainPage from "./Pages/MainPage/MainPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./CSS/global.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/deck/:theme" element={<DeckPage />} />
      </Routes>
    </Router>
  );
}

export default App;
