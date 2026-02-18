import "./css/SettingWindow.css";
import {
  MdSearch,
  MdComputer,
  MdKey,
  MdLock,
  MdChat,
  MdVideocam,
} from "react-icons/md";
import { CiLogout } from "react-icons/ci";
import defaultimage from "../assets/image/defaultimage.png";
import { use, useContext } from "react";
import { UserContext } from "../Context/User";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/Auth";
import {disconnectWebSocket } from "../service/websocket"

function SettingWindow({ dark }) {
  const { userDetail,loadingUser,updateUserDetail ,setLoadingUser} = useContext(UserContext);
  const {setloading,handleUserAuth}=useContext(AuthContext);
  const navigate = useNavigate();
  function handleLogout() {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/logout`, { method: "POST", credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        updateUserDetail({});
        handleUserAuth(false);
        disconnectWebSocket();
       })
      .catch((err) => console.error("Logout error:", err));
      
  }

  return (
    <div className={`setting-container ${dark ? "dark" : "light"}`}>
      {/* ---------- HEADER ---------- */}
      <div className="setting-header">
        <h1>Settings</h1>
      </div>

      {/* ---------- SEARCH ---------- */}
      <div className="setting-search">
        <MdSearch className="search-icon" />
        <input placeholder="Search settings" />
      </div>

      {/* ---------- SCROLLABLE CONTENT ---------- */}
      <div className="setting-scroll">
        {/* ---------- USER INFO ---------- */}
        <div
          className="setting-user"
          onClick={() => navigate("/profile")}
        >
          <img
            src={
              userDetail.profilePicturePreSignedURL === "default" ||
              !userDetail.profilePicturePreSignedURL
                ? defaultimage
                : userDetail.profilePicturePreSignedURL
            }
            alt="profile"
          />
          <span>{userDetail.name}</span>
        </div>

        <div className="setting-divider" />

        {/* ---------- SETTING ITEMS ---------- */}
        <div className="setting-item">
          <MdComputer />
          <div>
            <h3>General</h3>
            <p>Startup and close</p>
          </div>
        </div>

        <div className="setting-item">
          <MdKey />
          <div>
            <h3>Account</h3>
            <p>Security notifications, account info</p>
          </div>
        </div>

        <div className="setting-item">
          <MdLock />
          <div>
            <h3>Privacy</h3>
            <p>Blocked contacts, disappearing messages</p>
          </div>
        </div>

        <div className="setting-item">
          <MdChat />
          <div>
            <h3>Chats</h3>
            <p>Theme, wallpaper, chat settings</p>
          </div>
        </div>

        <div className="setting-item">
          <MdVideocam />
          <div>
            <h3>Video & Voice</h3>
            <p>Camera, microphone & speakers</p>
          </div>
        </div>

        <div className="setting-item">
          <MdVideocam />
          <div>
            <h3>Help and Feedback</h3>
            <p>Help center, feedback, and support</p>
          </div>
        </div>

        <div className="setting-item logout" onClick={handleLogout}>
          <CiLogout />
          <div>
            <h3 style={{ color: "red" }}>Log Out</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingWindow;
