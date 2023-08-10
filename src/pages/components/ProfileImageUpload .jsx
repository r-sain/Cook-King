import React, { useState } from 'react';

const ProfileImageUpload = ({ onImageUpload }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = e => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (selectedFile) {
      onImageUpload(selectedFile);
    }
  };

  return (
    <div id="imgUploader">
 <input
        type="file"
        id="file-input"
        onChange={handleFileChange}
        accept="image/*"
        style={{ display: "none" }}

      />
      <label htmlFor="file-input" className="custom-file-button">
    Choose File
  </label>
      

      <button onClick={handleUpload}>Upload</button></div>

  );
};

export default ProfileImageUpload;
