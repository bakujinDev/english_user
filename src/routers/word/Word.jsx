import { Route, Routes } from "react-router-dom";
import WordDetail from "./WordDetail";

import WordIndex from "./WordIndex";

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
