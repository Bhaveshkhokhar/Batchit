import { BsChatDots, BsSearch } from "react-icons/bs";

function ChatWindow({ id, dark }) {
  if (!id) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-[#f0f2f5] dark:bg-[#0b141a]">
        
        {/* Center Card */}
        <div className="flex flex-col items-center text-center max-w-md px-8 py-10 rounded-xl bg-white dark:bg-[#202c33] shadow-sm">
          
          {/* Icon */}
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#e9edef] dark:bg-[#111b21]">
            <BsChatDots size={38} className="text-[#54656f] dark:text-[#aebac1]" />
          </div>

          {/* Heading */}
          <h2 className="text-2xl font-semibold text-[#111b21] dark:text-[#e9edef]">
            Select a chat
          </h2>

          {/* Description */}
          <p className="mt-3 text-sm text-[#667781] dark:text-[#8696a0]">
            Choose a conversation from the list on the left or search for someone to start chatting.
          </p>

          {/* Search CTA */}
          <div className="mt-6 flex items-center gap-2 rounded-full border px-5 py-2 cursor-pointer
                          hover:bg-[#f5f6f6] dark:hover:bg-[#111b21] transition">
            <BsSearch size={14} className="text-[#667781] dark:text-[#8696a0]" />
            <span className="text-sm text-[#667781] dark:text-[#8696a0]">
              Search chats
            </span>
          </div>

          {/* Footer */}
          <p className="mt-8 text-xs text-[#8696a0]">
            🔒 Messages are end-to-end encrypted
          </p>
        </div>
      </div>
    );
  }

  return <div className="h-full">Chat opened with ID: {id}</div>;
}

export default ChatWindow;
