import { createRoot } from "react-dom/client";
import { ErrorModal } from "./ErrorDialog";

const ForceLogoutDialog = (
  errorMessage: string,
  onClose?: () => void,
  onRedirect?: () => void
) => {
  const modalDiv = document.createElement("div");
  document.body.appendChild(modalDiv);

  const handleClose = () => {
    root.unmount();
    modalDiv.remove();
    if (typeof onClose === "function") {
      onClose();
    }
    if (typeof onRedirect === "function") {
      onRedirect();
    }
  };

  const root = createRoot(modalDiv);
  root.render(<ErrorModal errorMessage={errorMessage} onClose={handleClose} />);
};

export default ForceLogoutDialog;
