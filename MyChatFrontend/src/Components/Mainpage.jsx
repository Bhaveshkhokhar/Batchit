import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/Auth";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";

function Mainpage() {
  const { isAuthenticated, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [state, setState] = useState("chat");
  const [dark, setDark] = useState(() => {
    const storedTheme = localStorage.getItem("darkMode");
    return storedTheme === "true"; // convert string → boolean
  });

  useEffect(() => {
    if (loading) return;
    if (!isAuthenticated) {
      navigate("/Login", { replace: true });
    }
  }, [isAuthenticated, loading]);
    useEffect(() => {
    localStorage.setItem("darkMode", dark);
  }, [dark]);

  return (
    <div className="app">
      <Sidebar changeState={setState} dark={dark} setDark={setDark} />

      {/* 🔥 Outlet Boundary */}
      <div className="outlet-wrapper">
        <Outlet context={{ dark }}/>
      </div>
    </div>
  );
}

export default Mainpage;
