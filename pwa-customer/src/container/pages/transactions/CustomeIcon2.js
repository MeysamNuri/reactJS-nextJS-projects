import React from "react";

function CustomeIcon2({ blue, src }) {
  return (
    <div>
      <img
      src={`assets/images/${src}${blue ? '-blue.svg' : '.svg'}`}
      />
    </div>
  );
}

export default CustomeIcon2;
