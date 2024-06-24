import "./CSS/global.css";

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import DeckPage from "./Pages/DeckPage/DeckPage";
import MainPage from "./Pages/MainPage/MainPage";
import SideBar from "./Components/Common/SideBar";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/deck/:theme" element={<DeckPage />} />
        </Routes>
      </Router>
      <SideBar />
    </>
  );
}

export default App;
