import "./css/ProfileWindow.css";
import { IoCopyOutline } from "react-icons/io5";
import { FaPhone } from "react-icons/fa6";
import {
  MdModeEdit,
  MdCheck,
  MdClose,
  MdInsertEmoticon,
} from "react-icons/md";
import { GrGallery } from "react-icons/gr";
import EmojiPicker from "emoji-picker-react";
import defaultimage from "../assets/image/defaultimage.png";
import { useContext, useRef, useState } from "react";
import { UserContext } from "../Context/User";
import ProfileWindowShimmer from "./Shimmer/ProfileWindowShimmer";
import { toast } from "react-toastify";

const NAME_LIMIT = 50;
const ABOUT_LIMIT = 250;

function ProfileWindow({ dark }) {
  const { userDetail, loadingUser, updateUserDetail } =
    useContext(UserContext);

  const nameInput = useRef(null);
  const aboutInput = useRef(null);

  const [editName, setEditName] = useState(false);
  const [editAbout, setEditAbout] = useState(false);

  const [nameCount, setNameCount] = useState(userDetail.name?.length || 0);
  const [aboutCount, setAboutCount] = useState(userDetail.about?.length || 0);

  // "name" | "about" | null
  const [emojiTarget, setEmojiTarget] = useState(null);

  const phone = userDetail.phoneNumber;
  const name = userDetail.name;
  const about = userDetail.about;

  const image =
    userDetail.profilePicturePreSignedURL === "default" ||
    !userDetail.profilePicturePreSignedURL
      ? defaultimage
      : userDetail.profilePicturePreSignedURL;

  if (loadingUser) return <ProfileWindowShimmer />;

  /* ---------- INSERT EMOJI ---------- */
  const insertEmoji = (emoji) => {
    const input =
      emojiTarget === "name" ? nameInput.current : aboutInput.current;

    if (!input) return;

    const start = input.selectionStart;
    const end = input.selectionEnd;

    input.value =
      input.value.slice(0, start) +
      emoji +
      input.value.slice(end);

    input.focus();
    input.setSelectionRange(
      start + emoji.length,
      start + emoji.length
    );

    // update counters
    if (emojiTarget === "name") {
      setNameCount(input.value.length);
    } else {
      setAboutCount(input.value.length);
    }
  };
  /* ---------- COPY PHONE NUMBER ---------- */
  const copyPhone = async () => {
  try {
    await navigator.clipboard.writeText(phone);
    toast.success("Phone number copied");
  } catch (err) {
    console.error(err);
    toast.error("Failed to copy phone number");
  }
};
  /* ---------- UPDATE NAME & ABOUT ---------- */
  async function updateName(e){
    if (!nameInput.current.value.trim()) {
                  toast.error("Name is required");
                  return;
                }

      try{
        const response=await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/userName`,{
          method:'POST',
          credentials:'include',
          headers:{
            'Content-Type':'application/json',  
          },
          body:JSON.stringify({name:nameInput.current.value.trim()}),
      });
      const data=await response.json();

      if(!response.ok){
        const error=new Error(data?.message || "Failed to update name");
        error.status=response.status;
        throw error;
      }
      updateUserDetail(data.response);
    }
      catch(err){
        toast.error(err.message || "Failed to update name");
      }
      finally{
        setEditName(false);
        setEmojiTarget(null);
      }

  }

  async function updateAbout(e){
    if (!aboutInput.current.value.trim()) {
                  toast.error("About is required");
                  return;
                }

      try{
        const response=await fetch(`${import.meta.env.VITE_BACKEND_URL}user/update-about`,{
        method:"PUT",
        credentials:"include",
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify({about:aboutInput.current.value.trim()}),
      });
      const data=await response.json();
      if(!response.ok){
        const error=new Error(data?.message || "Failed to update about");
        error.status=response.status;
        throw error;
      }
      updateUserDetail(data.response);

      }
      catch(err){
        toast.error(err.message || "Failed to update about");
      }
      finally{
        setEditAbout(false);
        setEmojiTarget(null);
      }

  }

  return (
    <>
      <div className={`Profile-container ${dark ? "dark" : "light"}`}>
        <div className="profile-header">
          <h1>Profile</h1>
        </div>

        {/* ---------- PROFILE IMAGE ---------- */}
        <div className="profile-image-wrapper">
          <div className="profile-image-container">
            <img src={image} alt="Profile" className="profile-image" />
            <div className="profile-image-overlay">
              <GrGallery className="gallery-icon" />
              <span className="overlay-text">Change profile picture</span>
            </div>
          </div>
        </div>

        {/* ---------- NAME ---------- */}
        <div className="profile-section">
          <span className="section-label">Name</span>

          <div className="section-row about-row">
            {editName ? (
              <>
                <input
                  className="edit-input"
                  ref={nameInput}
                  autoFocus
                  defaultValue={name}
                  maxLength={NAME_LIMIT}
                  onChange={(e) => setNameCount(e.target.value.length)}
                />

                <span className="char-count">
                  {nameCount}/{NAME_LIMIT}
                </span>

                <span
                  className="edit-icon"
                  onClick={() =>
                    setEmojiTarget(
                      emojiTarget === "name" ? null : "name"
                    )
                  }
                >
                  <MdInsertEmoticon />
                </span>

                <span
                  className="edit-icon"
                  onClick={
                    (e)=>updateName(e)}
                >
                  <MdCheck />
                </span>

                <span
                  className="edit-icon"
                  onClick={
                    () => {
                    
                    setEditName(false);
                    setEmojiTarget(null);
                  }
                  }
                >
                  <MdClose />
                </span>
              </>
            ) : (
              <>
                <span className="section-value">{name}</span>
                <span
                  className="edit-icon"
                  onClick={() => {
                    setNameCount(name.length);
                    setEditName(true);
                  }}
                >
                  <MdModeEdit />
                </span>
              </>
            )}
          </div>
        </div>

        {/* ---------- ABOUT ---------- */}
        <div className="profile-section">
          <span className="section-label">About</span>

          <div className="section-row about-row">
            {editAbout ? (
              <>
                <input
                  className="edit-input"
                  ref={aboutInput}
                  autoFocus
                  defaultValue={about}
                  maxLength={ABOUT_LIMIT}
                  onChange={(e) => setAboutCount(e.target.value.length)}
                />

                <span className="char-count">
                  {aboutCount}/{ABOUT_LIMIT}
                </span>

                <span
                  className="edit-icon"
                  onClick={() =>
                    setEmojiTarget(
                      emojiTarget === "about" ? null : "about"
                    )
                  }
                >
                  <MdInsertEmoticon />
                </span>

                <span
                  className="edit-icon"
                  onClick={(e)=>updateAbout(e)}
                >
                  <MdCheck />
                </span>

                <span
                  className="edit-icon"
                  onClick={() => {
                    setEditAbout(false);
                    setEmojiTarget(null);
                  }}
                >
                  <MdClose />
                </span>
              </>
            ) : (
              <>
                <span className="section-value">{about}</span>
                <span
                  className="edit-icon"
                  onClick={() => {
                    setAboutCount(about.length);
                    setEditAbout(true);
                  }}
                >
                  <MdModeEdit />
                </span>
              </>
            )}
          </div>
        </div>

       {/* ---------- PHONE ---------- */}
<div className="profile-section">
  <span className="section-label">Phone</span>
  <div className="section-row">
    <FaPhone className="phone-icon" />
    <span className="section-value">{phone}</span>
    <IoCopyOutline
      className="copy-icon"
      onClick={copyPhone}
    />
  </div>
</div>

      </div>

      {/* ---------- EMOJI PICKER (FIXED RIGHT SIDE) ---------- */}
      {emojiTarget && (
        <div className="emoji-picker-fixed">
          <EmojiPicker onEmojiClick={(e) => insertEmoji(e.emoji)} />
        </div>
      )}
    </>
  );
}

export default ProfileWindow;
