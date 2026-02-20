import { useState, useContext } from "react";
import Chat from "./Chat";
import ChatListHeader from "./ChatListHeader";
import NewChatPanel from "./NewChatPanel";
import "./css/ChatList.css";
import { useNavigate, useOutletContext } from "react-router-dom";
import { UserContext } from "../Context/User";


function ChatList() {
  const { dark } = useOutletContext();
  const { chats } = useContext(UserContext);
  const navigate = useNavigate();
  const [showNewChat, setShowNewChat] = useState(false);
  const [query, setQuery] = useState("");

  return (
    <div className={`chatlist-container ${dark ? "dark" : "light"}`} style={{ position: "relative", overflow: "hidden" }}>

      {/* New Chat Panel slides over the list */}
      {showNewChat && (
        <NewChatPanel dark={dark} onClose={() => setShowNewChat(false)} />
      )}

      <ChatListHeader onNewChat={() => setShowNewChat(true)} query={query} setQuery={setQuery} />

      <div className="chat-list">
        {[...chats]
          .filter(chat =>
            chat.name.toLowerCase().includes(query.toLowerCase()) ||
            (chat.lastMessage && chat.lastMessage.toLowerCase().includes(query.toLowerCase()))
          )
          .sort((a, b) => new Date(b.lastMessageAt) - new Date(a.lastMessageAt))
          .map(chat => (
            <Chat key={chat.converationID} chat={chat} />
          ))}
      </div>
    </div>
  );
}

export default ChatList;
