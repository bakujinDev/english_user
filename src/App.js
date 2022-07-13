import { BrowserRouter, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import { ToastContainer } from "react-toastify";
import EventListener from "./components/common/EventListener";
import GlobalStyle from "./components/common/globalStyle";
import Auth from "./routers/Auth/Auth";
import Class from "./routers/class/Class";
import Main from "./routers/Main";
import "./util/ReactToastify.css";
// import "react-toastify/dist/ReactToastify.css";

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

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <BrowserRouter>
        <GlobalStyle />
        <EventListener />

        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/auth/*" element={<Auth />} />
          <Route path="/class/*" element={<Class />} />
        </Routes>
      </BrowserRouter>
    </AppBox>
  );
}

const AppBox = styled.div`
  height: 100vh;
`;
