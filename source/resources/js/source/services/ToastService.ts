// @NOTE: Import from libraries.
import { toast } from "react-hot-toast";

/**
 * ToastService - class that defines methods to show popup notification to the user.
 */
export default class ToastService {
    /**
     * Show success toast.
     *
     * @param {string} message
     */
    public static success(message?: string) {
        toast.success(message || "Successfully performed this operation");
    }

    /**
     * Show error toast.
     *
     * @param {string} message
     */
    public static error(message?: string) {
        toast.error(message || "Unknown error has occured");
    }
}
