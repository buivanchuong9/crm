import { toast } from "react-toastify";
import { logout } from "./auth";

export const showToast = (mgs: string, type: "error" | "success" | "warning") => {
  toast[type](mgs == "un authenticated" ? "Đã hết phiên đăng nhập, đang chuyển hướng để đăng nhập lại!" : mgs, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });

  if (type == "error" && mgs == "un authenticated") {
    setTimeout(logout, 5000);
  }
};
