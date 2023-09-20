import { useCallback, useEffect, useState } from "react";

export const useMediaQuery = (query: string): boolean => {
    const getMatches = (query: string): boolean => {
        if (typeof window !== "undefined") {
            return window.matchMedia(query).matches;
        }
        return false;
    };

    const [matches, setMatches] = useState<boolean>(getMatches(query));

    const handleChange = useCallback(() => {
        setMatches(getMatches(query));
    }, [query]);

    useEffect(() => {
        const matchMedia = window.matchMedia(query);

        // Triggered at the first client-side load and if query changes
        handleChange();

        if (matchMedia.addListener) {
            matchMedia.addListener(handleChange);
        } else {
            matchMedia.addEventListener("change", handleChange);
        }

        return () => {
            if (matchMedia.removeListener) {
                matchMedia.removeListener(handleChange);
            } else {
                matchMedia.removeEventListener("change", handleChange);
            }
        };
    }, [query, handleChange]);

    return matches;
};
