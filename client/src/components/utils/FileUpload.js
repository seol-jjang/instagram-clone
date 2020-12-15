import React, { useState } from "react";

function FileUpload() {
  const [attachment, setAttachment] = useState([]);

  const onFileChange = (event) => {
    const {
      target: { files }
    } = event;
    console.log(files);
  };
  return (
    <>
      <input
        type="file"
        onChange={onFileChange}
        value={attachment}
        accept="image/*"
        multiple
      />
      <div></div>
    </>
  );
}

export default FileUpload;
