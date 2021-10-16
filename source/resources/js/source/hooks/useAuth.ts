// @NOTE: Import from libraries.
import { useEffect, useState } from "react";

// @NOTE: Import from own files.
import User from "@js/types/User";

/**
 * @return {User | null}
 */
export default function useAuth(): User | null {
    const [user, setUser] = useState(window.user);
    useEffect(() => {
        setUser(window.user);
    }, [window.user]);
    return user;
}
