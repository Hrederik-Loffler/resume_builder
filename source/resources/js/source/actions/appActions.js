import { HIDE_TOAST, SHOW_TOAST, SHOW_SAVE_BAR } from "./actionTypes";

export const showSaveBar = (flag) => {
    return {
        type: SHOW_SAVE_BAR,
        payload: {
            flag: flag
        }
    }
}

export const showToast = (message, isError) => {
    return {
        type: SHOW_TOAST,
        payload: {
            message: message,
            isError: isError
        }
    }
}

export const hideToast = () => {
    return {
        type: HIDE_TOAST,
        payload: {
            message:  "",
            isError: false
        }
    }
}
