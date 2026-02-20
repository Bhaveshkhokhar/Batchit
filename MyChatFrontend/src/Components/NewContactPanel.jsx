import { useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import { toast } from "react-toastify";
import "./css/NewContactPanel.css";

function NewContactPanel({ dark, onClose }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [saving, setSaving] = useState(false);

  const handlePhoneChange = (e) => {
    const val = e.target.value.replace(/\D/g, "").slice(0, 10);
    setPhone(val);
  };

  const handleSave = async () => {
    if (!name.trim()) {
      toast.error("Please enter a name");
      return;
    }
    if (phone.length !== 10) {
      toast.error("Please enter a valid 10-digit number");
      return;
    }

    setSaving(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/contacts`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), PhoneNumber:phone }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.response?.message || "Failed to save contact");
      }
      toast.success("Contact saved!");
      onClose();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className={`newcontact-panel ${dark ? "dark" : "light"}`}>
      {/* Header */}
      <div className="newcontact-header">
        <button className="newcontact-back" onClick={onClose} aria-label="Go back">
          <IoArrowBack size={22} />
        </button>
        <h2>New contact</h2>
      </div>

      {/* Form */}
      <div className="newcontact-form">
        <div className="newcontact-field">
          <label>Name</label>
          <input
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
          />
        </div>

        <div className="newcontact-field">
          <label>Phone number</label>
          <input
            type="tel"
            placeholder="10-digit number"
            value={phone}
            onChange={handlePhoneChange}
            inputMode="numeric"
            maxLength={10}
          />
          <span className="newcontact-counter">{phone.length}/10</span>
        </div>

        <button
          className={`newcontact-save ${saving ? "loading" : ""}`}
          onClick={handleSave}
          disabled={saving}
        >
          {saving ? "Saving…" : "Save contact"}
        </button>
      </div>
    </div>
  );
}

export default NewContactPanel;
