import User from "@js/types/User";

declare global {
    interface Window {
        // @NOTE: Laravel embeds user in `window` when returning `index.blade.php` file.
        user: User | null;
    }
}

export {};
