import { useState, useContext,useEffect } from "react";
import { IoArrowBack } from "react-icons/io5";
import { BsSearch } from "react-icons/bs";
import { MdDialpad } from "react-icons/md";
import { MdPersonAdd, MdGroupAdd } from "react-icons/md";
import { UserContext } from "../Context/User";
import "./css/NewChatPanel.css";
import { toast } from "react-toastify";
import NewContactPanel from "./NewContactPanel";

function NewChatPanel({ dark, onClose }) {
  const { contacts,setContacts } = useContext(UserContext);
  const [query, setQuery] = useState("");
  const [showNewContact, setShowNewContact] = useState(false);
  
  const fetchContacts = async (signal) => {
    try{
      const response=await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/contacts`,{
        method:"GET",
        credentials:"include",
        headers:{
          "Content-Type":"application/json"
        },
        signal
      });
      const data=await response.json();
      if (!response.ok) {
        const error=new Error(data?.response?.message || "Failed to fetch contacts");
        error.status=response.status;
        throw error;
      }
      setContacts(data.response.contacts);
    }
    catch(err){
      toast.error(err.message);
    }
    };


  useEffect(() => {
    const controller=new AbortController();
    const Signal=controller.signal;
    fetchContacts(Signal);
    return () => controller.abort();
  }, []);

  const filtered = contacts.filter((c) =>
    c.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className={`newchat-panel ${dark ? "dark" : "light"}`}>

      {/* New Contact overlay */}
      {showNewContact && (
        <NewContactPanel dark={dark} onClose={() => setShowNewContact(false)} />
      )}
      {/* Header */}
      <div className="newchat-header">
        <button className="newchat-back" onClick={onClose} aria-label="Go back">
          <IoArrowBack size={22} />
        </button>
        <h2>New chat</h2>
        <button className="newchat-dialpad" aria-label="Dialpad">
          <MdDialpad size={22} />
        </button>
      </div>

      {/* Search */}
      <div className="newchat-search">
        <BsSearch className="newchat-search-icon" />
        <input
          placeholder="Search contacts"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
        />
      </div>

      {/* Scrollable area */}
      <div className="newchat-list">

        {/* Quick actions — hide while searching */}
        {!query && (
          <>
            <div className="newchat-action" onClick={() => setShowNewContact(true)}>
              <div className="newchat-action-icon"><MdPersonAdd size={22} /></div>
              <span>New contact</span>
            </div>
            <div className="newchat-action">
              <div className="newchat-action-icon"><MdGroupAdd size={22} /></div>
              <span>New group</span>
            </div>
          </>
        )}

        {/* Contacts subheading */}
        <p className="newchat-subheading">Contacts</p>

        {/* Contact items */}
        {filtered.length === 0 ? (
          <p className="newchat-empty">No contacts found</p>
        ) : (
          filtered.map((contact) => (
            <div key={contact.id} className="newchat-contact">
              <div className="newchat-avatar">
                {contact.groupDpPresignedUrl &&
                contact.groupDpPresignedUrl !== "default" ? (
                  <img src={contact.groupDpPresignedUrl} alt={contact.name} />
                ) : (
                  contact.name.charAt(0).toUpperCase()
                )}
              </div>
              <div className="newchat-contact-info">
                <span className="newchat-contact-name">{contact.name}</span>
                {contact.about && (
                  <span className="newchat-contact-about">{contact.about}</span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default NewChatPanel;
