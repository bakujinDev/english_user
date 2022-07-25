import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import PleaseLoginPopup from "../../components/common/PleaseLoginPopup";
import PopupBg from "../../components/common/PopupBg";
import { D_experimentList } from "../../data/D_laboratory";
import ExperimentIndex from "./ExperimentIndex";

export default function Laboratory() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [pleaseLoginPopup, setPleaseLoginPopup] = useState(false);

  useEffect(() => {
    if (!token) setPleaseLoginPopup(true);
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<ExperimentIndex />} />

        {D_experimentList.map((v, i) => (
          <Route key={i} path={v.url} element={v.comp} />
        ))}
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
