import { act, renderHook } from "@testing-library/react";
import { useCopyToClipboard } from "./use-clipboard";

describe(useCopyToClipboard, () => {
    const originalClipboard = { ...global.navigator.clipboard };
    const mockData = "Test value";

    beforeEach(() => {
        const mockClipboard = {
            writeText: jest.fn(),
        };
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore mock clipboard
        global.navigator.clipboard = mockClipboard;
    });

    afterEach(() => {
        jest.resetAllMocks();
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore mock clipboard
        global.navigator.clipboard = originalClipboard;
    });

    test("should use clipboard", () => {
        const { result } = renderHook(() => useCopyToClipboard());

        expect(result.current[0]).toBe(null);
        expect(typeof result.current[1]).toBe("function");
    });

    test("should use clipboard", () => {
        const { result } = renderHook(() => useCopyToClipboard());

        expect(result.current[0]).toBe(null);
        expect(typeof result.current[1]).toBe("function");
    });

    test("should copy to the clipboard and the state", async () => {
        const { result } = renderHook(() => useCopyToClipboard());

        await act(async () => {
            await result.current[1](mockData);
        });

        // eslint-disable-next-line @typescript-eslint/unbound-method
        expect(navigator.clipboard.writeText).toHaveBeenCalledTimes(1);
        // eslint-disable-next-line @typescript-eslint/unbound-method
        expect(navigator.clipboard.writeText).toHaveBeenCalledWith(mockData);
        expect(result.current[0]).toBe(mockData);
    });
});
