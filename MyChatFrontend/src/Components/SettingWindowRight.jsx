import "./css/RightWindow.css";
import { IoSettings } from "react-icons/io5";

function SettingWindowRight({dark}) {
  return <div className={`right-window ${dark ? "dark" : "light"}`}>
        <div className="right-window-content">
          <IoSettings className="profile-icon" />
          <h2>Profile</h2>
        </div>
      </div>;
} 
export default SettingWindowRight;