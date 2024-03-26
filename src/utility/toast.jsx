
import toast from "react-hot-toast";

class Allhandler {
    success(mess) {
        toast.success(mess);
    }
    error = (mess) => {
        toast.error(mess);
    };
}

export const { success, error } = new Allhandler();
