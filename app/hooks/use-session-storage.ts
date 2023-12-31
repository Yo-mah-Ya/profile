import {
    Dispatch,
    SetStateAction,
    useCallback,
    useEffect,
    useState,
} from "react";
import { useEventCallback } from "./use-event-callback";
import { useEventListener } from "./use-event-listener";
import { errorMessageOf, Logger } from "../utils";

declare global {
    interface WindowEventMap {
        "session-storage": CustomEvent;
    }
}

type SetValue<T> = Dispatch<SetStateAction<T>>;

export const useSessionStorage = <T>(
    key: string,
    initialValue: T,
): [T, SetValue<T>] => {
    // Get from session storage then
    // parse stored json or return initialValue
    const readValue = useCallback((): T => {
        // Prevent build error "window is undefined" but keep keep working
        if (typeof window === "undefined") {
            return initialValue;
        }

        try {
            const item = window.sessionStorage.getItem(key);
            return item ? (parseJSON(item) as T) : initialValue;
        } catch (error) {
            Logger.warn({ message: errorMessageOf(error) });
            return initialValue;
        }
    }, [initialValue, key]);

    // State to store our value
    // Pass initial state function to useState so logic is only executed once
    const [storedValue, setStoredValue] = useState<T>(readValue);

    // Return a wrapped version of useState's setter function that ...
    // ... persists the new value to sessionStorage.
    const setValue: SetValue<T> = useEventCallback((value) => {
        // Prevent build error "window is undefined" but keeps working
        if (typeof window == "undefined") {
            Logger.warn({
                message: `Tried setting sessionStorage key "${key}" even though environment is not a client`,
            });
        }

        try {
            // Allow value to be a function so we have the same API as useState
            const newValue =
                value instanceof Function ? value(storedValue) : value;

            // Save to session storage
            window.sessionStorage.setItem(key, JSON.stringify(newValue));

            // Save state
            setStoredValue(newValue);

            // We dispatch a custom event so every useSessionStorage hook are notified
            window.dispatchEvent(new Event("session-storage"));
        } catch (error) {
            Logger.warn({ message: errorMessageOf(error) });
        }
    });

    useEffect(() => {
        setStoredValue(readValue());
    }, [readValue]);

    const handleStorageChange = useCallback(
        (event: StorageEvent | CustomEvent) => {
            if (
                (event as StorageEvent)?.key &&
                (event as StorageEvent).key !== key
            ) {
                return;
            }
            setStoredValue(readValue());
        },
        [key, readValue],
    );

    // this only works for other documents, not the current one
    useEventListener("storage", handleStorageChange);

    // this is a custom event, triggered in writeValueTosessionStorage
    // See: useSessionStorage()
    useEventListener("session-storage", handleStorageChange);

    return [storedValue, setValue];
};

const parseJSON = <T>(value: string | null): T | undefined => {
    try {
        return value === "undefined"
            ? undefined
            : (JSON.parse(value ?? "") as T);
    } catch {
        Logger.warn({ message: "parsing error on", value });
        return undefined;
    }
};
