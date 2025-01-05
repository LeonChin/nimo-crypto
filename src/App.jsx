import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./Pages/HomePage";
import CoinPage from "./Pages/CoinPage";
import { css } from "@emotion/css";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div
        className={css`
          background-color: #14161a;
          color: white;
          min-height: 100vh;
        `}
      >
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/coin/:id" element={<CoinPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
