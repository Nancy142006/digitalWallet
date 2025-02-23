import React, { useState } from "react";
import axios from "axios";
import "../styles/profile.css"

function ProfileSettings({ userId, onProfileUpdate }) {
  const [name, setName] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    setProfilePicture(e.target.files[0]);
    setPreview(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    if (profilePicture) {
      formData.append("profilePicture", profilePicture);
    }

    try {
      await axios.put(
        `http://localhost:5000/api/update-profile/${userId}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      alert("Profile updated successfully");
      onProfileUpdate(); // ✅ Notify Navbar to refresh
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="profile-settings-container">
      <h2>Update Profile</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>New Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>Profile Picture:</label>
          <input type="file" onChange={handleFileChange} />
          {preview && <img src={preview} alt="Preview" width="100" />}
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default ProfileSettings;
