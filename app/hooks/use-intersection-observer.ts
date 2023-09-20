"use client";
import { useEffect, RefObject } from "react";

interface Args extends IntersectionObserverInit {
    once?: boolean;
}
export const useIntersectionObserver = <T extends HTMLElement>(
    ref: RefObject<T | undefined | null>,
    onIntersecting: (entry: IntersectionObserverEntry) => void,
    options: Args,
): void => {
    useEffect(() => {
        const el = ref.current;

        if (!el) return undefined;

        const observer = new IntersectionObserver(
            ([entry]): void => {
                onIntersecting(entry);
                if (entry.isIntersecting && options.once) {
                    observer.unobserve(el);
                }
            },
            {
                root: options?.root,
                rootMargin: options?.rootMargin,
                threshold: options?.threshold,
            },
        );
        observer.observe(el);

        return (): void => {
            observer.unobserve(el);
        };
    }, [options, onIntersecting, ref]);
};
