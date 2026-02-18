function Chat({ chat }) {
  return (
    <div className="chat-item w-full">
      <div className="chat-avatar">
        {chat.name.charAt(0)}
      </div>

      <div className="chat-info">
        <div className="chat-top">
          <span className="chat-name">{chat.name}</span>
          <span className={`chat-time ${chat.unread ? "active" : ""}`}>
            {chat.time}
          </span>
        </div>

        <div className="chat-bottom">
          <span className="chat-msg">{chat.lastMsg}</span>
          {chat.unread && <span className="unread">{chat.unread}</span>}
        </div>
      </div>
    </div>
  );
}

export default Chat;
