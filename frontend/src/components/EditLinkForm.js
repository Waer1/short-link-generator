import React, { useState } from "react";

function EditLinkForm({ link, editLink }) {
  const [ios, setIos] = useState(link.ios);
  const [android, setAndroid] = useState(link.android);
  const [web, setWeb] = useState(link.web);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedLink = { ...link, ios, android, web };
    editLink(updatedLink);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h4>Edit Link</h4>

      {/* Input fields for editing iOS, Android, and Web URLs */}
      <label>iOS Primary URL:</label>
      <input
        type='text'
        value={ios.primary}
        onChange={(e) => setIos({ ...ios, primary: e.target.value })}
      />
      <label>iOS Fallback URL:</label>
      <input
        type='text'
        value={ios.fallback}
        onChange={(e) => setIos({ ...ios, fallback: e.target.value })}
      />
      <label>Android Primary URL:</label>
      <input
        type='text'
        value={android.primary}
        onChange={(e) => setAndroid({ ...android, primary: e.target.value })}
      />
      <label>Android Fallback URL:</label>
      <input
        type='text'
        value={android.fallback}
        onChange={(e) => setAndroid({ ...android, fallback: e.target.value })}
      />
      <label>Web URL:</label>
      <input type='text' value={web} onChange={(e) => setWeb(e.target.value)} />

      <button type='submit'>Update</button>
    </form>
  );
}

export default EditLinkForm;
