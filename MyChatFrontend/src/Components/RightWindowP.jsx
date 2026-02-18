import "./css/RightWindow.css";
import { MdOutlineAccountCircle } from "react-icons/md";

function RightWindowP({ dark }) {
  return (
    <div className={`right-window ${dark ? "dark" : "light"}`}>
      <div className="right-window-content">
        <MdOutlineAccountCircle className="profile-icon" />
        <h2>Profile</h2>
      </div>
    </div>
  );
}

export default RightWindowP;
