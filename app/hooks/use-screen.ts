import { useState } from "react";
import { useEventListener } from "./use-event-listener";
import { useIsomorphicLayoutEffect } from "./use-isomorphic-effect";

export const useScreen = (): Screen | undefined => {
    const getScreen = (): Screen | undefined => window?.screen;

    const [screen, setScreen] = useState<Screen | undefined>(getScreen());

    const handleSize = (): void => {
        setScreen(getScreen());
    };

    useEventListener("resize", handleSize);

    useIsomorphicLayoutEffect(() => {
        handleSize();
    }, []);

    return screen;
};
