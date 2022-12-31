import { Route, Routes } from "react-router-dom";
import HelpIndex from "../page/help/HelpIndex";

export default function Help() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HelpIndex />} />
      </Routes>
    </>
  );
}
