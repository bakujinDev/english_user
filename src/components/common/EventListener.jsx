import axios from "axios";
import { useLayoutEffect } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { API } from "../../config/api";
import { pcScreenSize } from "../../config/config";
import { setMobile } from "../../store/common";

export default function EventListener() {
  const dispatch = useDispatch();
  const location = useLocation();
  const token = localStorage.getItem("token");

  function handleResize() {
    if (window.innerWidth >= pcScreenSize) dispatch(setMobile(false));
    else dispatch(setMobile(true));
  }

  function chkToken() {
    if (!token) return;
    axios
      .get(API.CHK_TOKEN)
      .then((res) => console.log(res))
      .catch((err) => {
        console.error(err);
        localStorage.clear();
        window.location.reload();
      });
  }

  useLayoutEffect(() => {
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    axios.defaults.headers.Authorization = `Bearer ${token}`;

    if (sessionStorage.getItem("reload")) {
      sessionStorage.removeItem("reload");
      window.location.reload();
    } else {
      chkToken();
    }
  }, [location]);

  return <></>;
}
