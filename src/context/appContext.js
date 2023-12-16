import { createContext } from "react";
import { toast } from "react-toastify";

export const AppContext = createContext();

const successToast = (msg) => {
  toast.success(msg, {
    position: "bottom-left",
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
};

const errorToast = (msg) => {
  toast.error(msg, {
    position: "bottom-left",
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
};

const ContextProvider = ({ children }) => {
  return (
    <AppContext.Provider value={{ successToast, errorToast }}>
      {children}
    </AppContext.Provider>
  );
};

export default ContextProvider;
