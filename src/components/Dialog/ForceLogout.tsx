import { createRoot } from "react-dom/client";
import { ErrorModal } from "./ErrorDialog";
import { LOGIN_ROUTE } from "routes/ConstantsURLRoutes";

const ForceLogoutDialog = (errorMessage: string) => {
  const modalDiv = document.createElement("div");
  document.body.appendChild(modalDiv);

  const handleClose = () => {
    window.location.href = LOGIN_ROUTE;
    root.unmount();
    modalDiv.remove();
  };

  const root = createRoot(modalDiv);
  root.render(<ErrorModal errorMessage={errorMessage} onClose={handleClose} />);
};

export default ForceLogoutDialog;
