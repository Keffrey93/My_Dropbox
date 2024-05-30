import React, { useState } from "react";

const SharedLink = ({ fileUrl }) => {
  const [expirationDate, setExpirationDate] = useState(new Date());

  const generateSharedLink = () => {
    const encryptedUrl = "https://example.com/encrypted/" + Math.random().toString(36).substring(2, 15);


    return <a href={encryptedUrl} target="_blank" rel="noreferrer">Shared Link</a>;
  };

  return (
    <div>
      <input type="date" value={expirationDate} onChange={(event) => setExpirationDate(event.target.value)} />
      <button onClick={generateSharedLink}>Generate Shared Link</button>
    </div>
  )
}

export default SharedLink;