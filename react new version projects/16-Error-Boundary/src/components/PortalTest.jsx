import { createPortal } from "react-dom";

const PortalTest = () => {
  return createPortal(
    <div>
      <h4>My Portal Test</h4>
    </div>,
    document.getElementById("portal-root")
  );
};

export default PortalTest;

//https://codesandbox.io/s/00254q4n6p
