import { useRef, forwardRef, useImperativeHandle } from "react";

let BootstrapInput = (props, ref) => {
  const inputRef = useRef();

  useImperativeHandle(ref, () => ({
    focus: () => {
      // inputRef.current.focus();
      alert("سلام من اجرا شدم");
    },
  }));

  return <input ref={inputRef} {...props} />;
};
BootstrapInput = forwardRef(BootstrapInput);

const UseImperativeHandleExample = () => {
  const inputRef = useRef(null);

  const handleFocus = () => {
    inputRef.current.focus();
  };

  return (
    <div className="mx-auto mt-5 d-grid gap-3 w-50">
      <h5 className="alert alert-success text-center">
        آشنایی با هوک useImperativeHandle
      </h5>

      <hr className="bg-danger" />

      <BootstrapInput type="text" className="form-control" ref={inputRef} />

      <button className="btn btn-block btn-success" onClick={handleFocus}>
        تمرکز بنما 👀{" "}
      </button>
    </div>
  );
};

export default UseImperativeHandleExample;
