import axios from "axios";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { API } from "../../config/api";

export default function EventListener() {
  const location = useLocation();
  const token = localStorage.getItem("token");

  function chkToken() {
    if (!token) return;
    axios
      .get(API.CHK_TOKEN)
      .then((res) => console.log(res))
      .catch((err) => {
        console.error(err);
        localStorage.clear();
        // window.location.reload();
      });
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    axios.defaults.headers.Authorization = `Bearer ${token}`;
    // chkToken();
  }, [location]);

  return <></>;
}
