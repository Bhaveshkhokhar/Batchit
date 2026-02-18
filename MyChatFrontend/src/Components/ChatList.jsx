import Chat from "./Chat";
import ChatListHeader from "./ChatListHeader";
import "./css/chatList.css";
import { useNavigate, useOutletContext } from "react-router-dom";

const chats = [
  { id: 1, name: "Rahul", lastMsg: "Hey, how are you?", time: "13:18", unread: 1 },
  { id: 2, name: "Ankit", lastMsg: "Meeting at 6?", time: "14:08" },
  { id: 3, name: "Mom", lastMsg: "Call me", time: "Yesterday" },

  { id: 4, name: "Amit", lastMsg: "Send the notes", time: "12:45" },
  { id: 5, name: "Rohit", lastMsg: "Done 👍", time: "11:30" },
  { id: 6, name: "Sneha", lastMsg: "Where are you?", time: "10:58", unread: 2 },
  { id: 7, name: "Pooja", lastMsg: "Let’s catch up tomorrow", time: "10:10" },
  { id: 8, name: "Vikas", lastMsg: "Call me when free", time: "09:40" },
  { id: 9, name: "Neha", lastMsg: "😂😂", time: "09:15" },
  { id: 10, name: "Saurabh", lastMsg: "Project done?", time: "08:55", unread: 3 },

  { id: 11, name: "Dad", lastMsg: "Reached safely?", time: "08:20" },
  { id: 12, name: "Kunal", lastMsg: "Let’s play tonight", time: "Yesterday" },
  { id: 13, name: "Shubham", lastMsg: "Check email", time: "Yesterday", unread: 1 },
  { id: 14, name: "Ritika", lastMsg: "Good morning ☀️", time: "Yesterday" },
  { id: 15, name: "Akash", lastMsg: "On my way", time: "Yesterday" },

  { id: 16, name: "Placement Group", lastMsg: "Interview schedule updated", time: "Mon", unread: 5 },
  { id: 17, name: "College Friends", lastMsg: "Party kab?", time: "Mon" },
  { id: 18, name: "HR - Amazon", lastMsg: "Regarding your application", time: "Sun", unread: 1 },
  { id: 19, name: "Vinay", lastMsg: "Bro urgent hai", time: "Sun" },
  { id: 20, name: "Nikhil", lastMsg: "Thanks!", time: "Sun" },

  { id: 21, name: "Arjun", lastMsg: "See you soon", time: "Sat" },
  { id: 22, name: "Manish", lastMsg: "File received", time: "Sat" },
  { id: 23, name: "Priya", lastMsg: "Okay 😊", time: "Sat" },
  { id: 24, name: "Office Group", lastMsg: "Standup at 10", time: "Fri", unread: 2 },
  { id: 25, name: "Ashish", lastMsg: "Ping me later", time: "Fri" },

  { id: 26, name: "Startup Team", lastMsg: "Deployment done 🚀", time: "Fri" },
  { id: 27, name: "Harsh", lastMsg: "Exam kaisa gaya?", time: "Thu" },
  { id: 28, name: "Mehul", lastMsg: "Budget final?", time: "Thu", unread: 1 },
  { id: 29, name: "Anjali", lastMsg: "Miss you ❤️", time: "Thu" },
  { id: 30, name: "Roommates", lastMsg: "Groceries le aana", time: "Wed" },

  { id: 31, name: "Dev", lastMsg: "PR raised", time: "Wed" },
  { id: 32, name: "Sonal", lastMsg: "All the best!", time: "Wed" },
  { id: 33, name: "Marketing Team", lastMsg: "Campaign live", time: "Tue", unread: 4 },
  { id: 34, name: "Gaurav", lastMsg: "Let me know", time: "Tue" },
  { id: 35, name: "Ankita", lastMsg: "Sure 👍", time: "Tue" },

  { id: 36, name: "Tech Group", lastMsg: "Bug fixed", time: "Mon" },
  { id: 37, name: "Siddharth", lastMsg: "Call later?", time: "Mon" },
  { id: 38, name: "Ramesh", lastMsg: "Invoice sent", time: "Mon" },
  { id: 39, name: "Travel Buddies", lastMsg: "Tickets booked ✈️", time: "Sun", unread: 2 },
  { id: 40, name: "Ayush", lastMsg: "GG bro", time: "Sun" },

  { id: 41, name: "Nisha", lastMsg: "Good night 🌙", time: "Sat" },
  { id: 42, name: "Client A", lastMsg: "Looks good", time: "Sat" },
  { id: 43, name: "Client B", lastMsg: "Need changes", time: "Sat", unread: 1 },
  { id: 44, name: "Startup Mentor", lastMsg: "Let’s discuss", time: "Fri" },
  { id: 45, name: "Gym Buddy", lastMsg: "Leg day today", time: "Fri" },

  { id: 46, name: "Foodies Group", lastMsg: "Order placed 🍕", time: "Thu" },
  { id: 47, name: "Raj", lastMsg: "On the way", time: "Thu" },
  { id: 48, name: "Simran", lastMsg: "Voice note 🎧", time: "Thu" },
  { id: 49, name: "Startup HR", lastMsg: "Offer letter", time: "Wed", unread: 1 },
  { id: 50, name: "Old School Friends", lastMsg: "Reunion plan?", time: "Wed" },

  { id: 51, name: "Freelance Client", lastMsg: "Payment sent 💸", time: "Tue" },
  { id: 52, name: "YouTube Collab", lastMsg: "Script ready", time: "Tue" },
  { id: 53, name: "Cousin", lastMsg: "Shaadi fix ho gayi!", time: "Mon" }
];


function ChatList() {
const {dark}= useOutletContext();
const navigate=useNavigate();
  return (
    <div className={`chatlist-container ${dark? "dark" : "light"}`}>
      <ChatListHeader />

      <div className="chat-list">
        {chats.map(chat => (
          <Chat key={chat.id} chat={chat} />
        ))}
      </div>
    </div>
  );
}

export default ChatList;
