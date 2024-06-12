import DeckPage from "./Pages/DeckPage/DeckPage";
import MainPage from "./Pages/MainPage/MainPage";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/Deck/:theme" element={<DeckPage />} />
      </Routes>
    </Router>
  );
}

export default App;
