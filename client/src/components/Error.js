import React, { useState } from "react";

// Error component
const Error = (props) => {
  const [closeBox, setCloseBox] = useState(false);

  const closeErrorBox = () => {
    setCloseBox(true);
  };

  return (
    <>
      {!closeBox && (
        <div className="alert alert-danger" role="alert">
          {props.msg}
          <button type="button" className="close" onClick={closeErrorBox}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      )}
    </>
  );
};

export default Error;
