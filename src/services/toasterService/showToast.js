import { toast } from "react-toastify";
import toastTypeConstants from "../../constants/toastTypeConstants";

export const showToast = (type, message, duration) => {
  let toastStyles = {
    position: "top-right",
    autoClose: "",
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
  };

  toastStyles.autoClose = duration;

  switch (type) {
    case toastTypeConstants.SUCCESS:
      toast.success(message, toastStyles);
      break;
    case toastTypeConstants.WARN:
      toast.warn(message, toastStyles);
      break;
    case toastTypeConstants.ERROR:
      toast.error(message, toastStyles);
      break;
    case toastTypeConstants.INFO:
      toast.info(message, toastStyles);
      break;
    default:
      toast.success(message, toastStyles);
  }
};

export default showToast;
