import React from "react";
import { Toast, ToastContainer } from "react-bootstrap";

import reduxIcon from "../Icons/reduxIcon.svg";

const ToastComponent = ({ message, color }: { message: string; color: string }): JSX.Element => {
  const [show, setShow] = React.useState<boolean>(false);
  // console.log({ color });

  const toggleShow = () => setShow(!show);

  React.useEffect(() => {
    if (message) {
      setShow(true);
    }
  }, [message]);

  return (
    <React.Fragment>
      <ToastContainer className="p-3" position={"middle-end"}>
        {message && (
          <Toast show={show} onClose={toggleShow} bg={color} delay={3000} autohide={true}>
            <Toast.Header>
              <img src={reduxIcon} width={25} height={25} alt="Redux Icon" style={{ marginRight: "0.5rem" }} />
              <strong className="me-auto">PERN Stack App</strong>
            </Toast.Header>
            <Toast.Body>{message}</Toast.Body>
          </Toast>
        )}
      </ToastContainer>
    </React.Fragment>
  );
};

export default ToastComponent;
