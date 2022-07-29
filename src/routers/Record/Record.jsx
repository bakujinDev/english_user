import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import PleaseLoginPopup from "../../components/common/PleaseLoginPopup";
import PopupBg from "../../components/common/PopupBg";
import Create from "./Create";
import RecordIndex from "./RecordIndex";

export default function Record() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [pleaseLoginPopup, setPleaseLoginPopup] = useState(false);

  useEffect(() => {
    if (!token) setPleaseLoginPopup(true);
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<RecordIndex />} />
        <Route path="/:id" element={<RecordIndex />} />

        <Route path="/create" element={<Create />} />
      </Routes>

      {pleaseLoginPopup && (
        <>
          <PleaseLoginPopup off={setPleaseLoginPopup} />
          <PopupBg bg off={() => navigate("/")} />
        </>
      )}
    </>
  );
}
