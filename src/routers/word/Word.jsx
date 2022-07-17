import { Route, Routes, useNavigate } from "react-router-dom";
import WordDetail from "./WordDetail";

import WordIndex from "./WordIndex";

export default function Word() {
  const navigate = useNavigate();

  return (
    <>
      <Routes>
        <Route path="/" element={<WordIndex />} />
        <Route path="/:id" element={<WordDetail />} />
      </Routes>
    </>
  );
}
