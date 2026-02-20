function Chat({ chat }) {
  const isGroup = chat.type !== "ONE_TO_ONE";

  const formattedTime = chat.lastMessageAt
    ? new Date(chat.lastMessageAt).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

  const avatarText = chat.name ? chat.name.charAt(0).toUpperCase() : "?";

  const lastMsgPreview =
    isGroup && chat.lastUserName
      ? `${chat.lastUserName}: ${chat.lastMessage}`
      : chat.lastMessage;

  return (
    <div className="chat-item w-full">
      <div className="chat-avatar">
        {chat.groupDpPresignedUrl && chat.groupDpPresignedUrl !== "default" ? (
          <img src={chat.groupDpPresignedUrl} alt={chat.name} />
        ) : (
          avatarText
        )}
      </div>

      <div className="chat-info">
        <div className="chat-top">
          <span className="chat-name">{chat.name}</span>
          <span className={`chat-time ${chat.unreadMessage ? "active" : ""}`}>
            {formattedTime}
          </span>
        </div>

        <div className="chat-bottom">
          <span className="chat-msg">{lastMsgPreview}</span>
          {chat.unreadMessage > 0 && (
            <span className="unread">{chat.unreadMessage}</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default Chat;
