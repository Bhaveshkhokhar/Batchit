import { useState,useContext } from "react";
import { BsChatSquareTextFill } from "react-icons/bs";
import { RiChatSmile2Line, RiChatVoiceAiLine } from "react-icons/ri";
import { MdAddCall, MdUpdate, MdDarkMode, MdLightMode } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import "./css/Sidebar.css";
import { Link } from "react-router-dom";
import { UserContext } from "../Context/User";
import defaultimage from "../assets/image/defaultimage.png";


function Sidebar({changeState,dark,setDark}) {
  const { userDetail, loadingUser, updateUserDetail } = useContext(UserContext);
  
const image =
    userDetail.profilePicturePreSignedURL === "default" ||
    !userDetail.profilePicturePreSignedURL
      ? defaultimage
      : userDetail.profilePicturePreSignedURL;
  const iconColor = dark ? "#ffffff" : "#202c33"; // 👈 MAGIC LINE

  return (
    <div
      className="d-flex flex-column flex-shrink-0"
      style={{
        width: "4.5rem",
        height: "100vh",
        backgroundColor: dark ? "#202c33" : "#f0f2f5",
        color: iconColor,
      }}
    >
      {/* TOP */}
      <ul className="nav nav-pills nav-flush flex-column text-center">
        <li>
          <a className="d-block p-3 text-decoration-none ">
            <div className="icon-wrap">
            <RiChatSmile2Line size={22} color={iconColor} />
            </div>
            <div style={{ fontSize: "10px", color: iconColor }}>batchit</div>
          </a>
        </li>

        <li>
          <Link to="/" className="nav-link py-3 ">
            <div className="icon-wrap">
            <BsChatSquareTextFill size={22} color={iconColor} />
            </div>
          </Link>
        </li>

        <li>
          <Link to="/call" className="nav-link py-3 ">
            <div className="icon-wrap">
            <MdAddCall size={22} color={iconColor} />
            </div>
          </Link>
        </li>

        <li>
          <Link to="/status" className="nav-link py-3 ">
            <div className="icon-wrap">
            <MdUpdate size={22} color={iconColor} />
            </div>
          </Link>
        </li>

        <li>
          <Link to="/{ai.id}" className="nav-link py-3 ">
            <div className="icon-wrap">
            <RiChatVoiceAiLine size={22} color={iconColor} />
            </div>
          </Link>
        </li>
      </ul>

      {/* BOTTOM */}
      <div className="mt-auto text-center">
        {/* DARK MODE TOGGLE */}
        <button
          onClick={() => setDark(!dark)}
          className="btn w-100 py-3 "
          style={{ color: iconColor }}
        >
          {dark ? (
            <MdLightMode size={22} color={iconColor} />
          ) : (
            <MdDarkMode size={22} color={iconColor} />
          )}
        </button>

        {/* SETTINGS */}
        <Link to ="/setting" className="nav-link py-3 border-top">
          <IoSettingsOutline size={22} color={iconColor} />
        </Link>

        {/* PROFILE */}
        <div className=" p-3">
          <Link to="/profile">
          <img
            src={image}
            alt="profile"
            width="24"
            height="24"
            className="rounded-circle"
          />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
