import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import PleaseLoginPopup from "../../components/common/PleaseLoginPopup";
import PopupBg from "../../components/common/PopupBg";
import { D_classList } from "../../data/D_class";
import ClassIndex from "./ClassIndex";

export default function Class() {
  const navigate =useNavigate();
  const token = localStorage.getItem("token");

  const [pleaseLoginPopup, setPleaseLoginPopup] = useState(false);

  useEffect(() => {
    if (!token) setPleaseLoginPopup(true);
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<ClassIndex />} />

        {D_classList.map((v, i) => (
          <Route key={i} path={v.url} element={v.comp} />
        ))}
      </Routes>
      {pleaseLoginPopup && (
        <>
          <PleaseLoginPopup off={setPleaseLoginPopup} />
          <PopupBg bg off={()=>navigate(-1)} />
        </>
      )}
    </>
  );
}
