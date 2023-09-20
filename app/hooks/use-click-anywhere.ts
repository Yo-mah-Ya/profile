import { useEventListener } from "./use-event-listener";

export const useClickAnyWhere = (
    handler: (event: MouseEvent) => void,
): void => {
    useEventListener("click", (event) => {
        handler(event);
    });
};
