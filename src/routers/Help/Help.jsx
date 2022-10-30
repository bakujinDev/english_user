import { Route, Routes } from "react-router-dom";
import HelpIndex from "./HelpIndex";

export default function Help() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HelpIndex />} />
      </Routes>
    </>
  );
}
