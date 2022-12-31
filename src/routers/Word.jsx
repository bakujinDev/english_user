import { Route, Routes } from "react-router-dom";
import WordDetail from "../page/word/WordDetail";

import WordIndex from "../page/word/WordIndex";

export default function Word() {
  return (
    <>
      <Routes>
        <Route path="/" element={<WordIndex />} />
        <Route path="/:id" element={<WordDetail />} />
      </Routes>
    </>
  );
}
