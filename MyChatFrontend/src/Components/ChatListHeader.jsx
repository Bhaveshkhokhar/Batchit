import { BsSearch, BsThreeDotsVertical } from "react-icons/bs";
import { RiChatNewLine } from "react-icons/ri";

function ChatListHeader() {
  return (
    <>
      {/* Header */}
      <div className="chatlist-header">
        <h2>Chats</h2>
        <div className="header-icons">
          <RiChatNewLine size={22}/>
          <BsThreeDotsVertical size={22} />
        </div>
      </div>

      {/* Search */}
      <div className="chatlist-search">
        <BsSearch />
        <input placeholder="Ask Meta AI or Search" />
      </div>

      {/* Filters */}
      <div className="chatlist-filters">
        <span className="active">All</span>
        <span>Unread</span>
        <span>Favourites</span>
        <span>Groups</span>
      </div>
    </>
  );
}

export default ChatListHeader;
