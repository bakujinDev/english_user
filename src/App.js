import { BrowserRouter, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import EventListener from "./components/common/EventListener";
import GlobalStyle from "./components/common/globalStyle";
import Auth from "./routers/Auth";
import Class from "./routers/Class";
import Main from "./page/Main";
import Record from "./routers/Record";
import Word from "./routers/Word";
import "react-datepicker/dist/react-datepicker.css";
import Help from "./routers/Help";
import { useEffect } from "react";
import { useState } from "react";
import TermPopup from "./components/common/TermPopup";
import PopupBg from "./components/common/PopupBg";

export default function App() {
  const token = localStorage.getItem("token");

  const [termPopup, setTermPopup] = useState(false);

  useEffect(() => {
    if (token && !localStorage.getItem("readTerm")) setTermPopup(true);
  }, []);

  return (
    <AppBox className="appBox">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="true"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Edu+SA+Beginner&display=swap"
        rel="stylesheet"
      />

      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />

      <BrowserRouter>
        <GlobalStyle />
        <EventListener />

        {termPopup && (
          <>
            <TermPopup off={setTermPopup} />
            <PopupBg blur off={setTermPopup} />
          </>
        )}

        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/auth/*" element={<Auth />} />
          <Route path="/class/*" element={<Class />} />
          <Route path="/word/*" element={<Word />} />
          <Route path="/record/*" element={<Record />} />
          <Route path="/help/*" element={<Help />} />
        </Routes>
      </BrowserRouter>
    </AppBox>
  );
}

const AppBox = styled.div`
  height: 100vh;
  color: #fff;
  background: #22242a;
`;
