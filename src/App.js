import { BrowserRouter, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import EventListener from "./components/common/EventListener";
import GlobalStyle from "./components/common/globalStyle";
import Auth from "./routers/Auth/Auth";
import Class from "./routers/class/Class";
import Laboratory from "./routers/laboratory/Laboratory";
import Main from "./routers/Main";
import Record from "./routers/Record/Record";
import Word from "./routers/word/Word";
import "react-datepicker/dist/react-datepicker.css";

export default function App() {
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

        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/auth/*" element={<Auth />} />
          <Route path="/class/*" element={<Class />} />
          <Route path="/word/*" element={<Word />} />
          <Route path="/record/*" element={<Record />} />
          <Route path="/laboratory/*" element={<Laboratory />} />
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
