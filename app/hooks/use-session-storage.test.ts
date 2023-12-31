import { act } from "@testing-library/react-hooks/dom";
import { renderHook } from "@testing-library/react";
import { useSessionStorage } from "./use-session-storage";

class SessionStorageMock<T> {
    store: Record<string, T> = {};

    clear = (): void => {
        this.store = {};
    };

    getItem = (key: string): T | null => {
        return this.store[key] ?? null;
    };

    setItem = (key: string, value: T): void => {
        this.store[key] = value;
    };

    removeItem = (key: string): void => {
        delete this.store[key];
    };
}

Object.defineProperty(window, "sessionStorage", {
    value: new SessionStorageMock(),
});

describe(useSessionStorage, () => {
    beforeEach(() => {
        window.sessionStorage.clear();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test("initial state is in the returned state", () => {
        const { result } = renderHook(() => useSessionStorage("key", "value"));

        expect(result.current[0]).toBe("value");
    });

    test("Initial state is a callback function", () => {
        const { result } = renderHook(() =>
            useSessionStorage("key", () => "value"),
        );

        expect(result.current[0]).toBe("value");
    });

    test("Initial state is an array", () => {
        const { result } = renderHook(() =>
            useSessionStorage("digits", [1, 2]),
        );

        expect(result.current[0]).toEqual([1, 2]);
    });

    test("Update the state", () => {
        const { result } = renderHook(() => useSessionStorage("key", "value"));

        act(() => {
            const setState = result.current[1];
            setState("edited");
        });

        expect(result.current[0]).toBe("edited");
    });

    test("Update the state writes sessionStorage", () => {
        const { result } = renderHook(() => useSessionStorage("key", "value"));

        act(() => {
            const setState = result.current[1];
            setState("edited");
        });

        expect(window.sessionStorage.getItem("key")).toBe(
            JSON.stringify("edited"),
        );
    });

    test("Update the state with a callback function", () => {
        const { result } = renderHook(() => useSessionStorage("count", 2));

        act(() => {
            const setState = result.current[1];
            setState((prev) => prev + 1);
        });

        expect(result.current[0]).toBe(3);
        expect(window.sessionStorage.getItem("count")).toEqual("3");
    });

    test("[Event] Update one hook updates the others", () => {
        const initialValues: [string, unknown] = ["key", "initial"];
        const { result: A } = renderHook(() =>
            useSessionStorage(...initialValues),
        );
        const { result: B } = renderHook(() =>
            useSessionStorage(...initialValues),
        );

        act(() => {
            const setState = A.current[1];
            setState("edited");
        });

        expect(B.current[0]).toBe("edited");
    });

    test("setValue is referentially stable", () => {
        const { result } = renderHook(() => useSessionStorage("count", 1));

        // Store a reference to the original setValue
        const originalCallback = result.current[1];

        // Now invoke a state update, if setValue is not referentially stable then this will cause the originalCallback
        // reference to not be equal to the new setValue function
        act(() => {
            const setState = result.current[1];
            setState((prev) => prev + 1);
        });

        expect(result.current[1] === originalCallback).toBe(true);
    });
});
