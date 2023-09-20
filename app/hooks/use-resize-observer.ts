import { useEffect, RefObject } from "react";

export const useResizeObserver = <T extends Element>(
    ref: RefObject<T | null>,
    callBack: ResizeObserverCallback,
    options?: ResizeObserverOptions,
): void => {
    useEffect(() => {
        const entry = new ResizeObserver(callBack);
        if (ref.current) {
            entry.observe(ref.current, options);
        }
        return () => {
            entry.disconnect();
        };
    }, [ref, callBack, options]);
};
