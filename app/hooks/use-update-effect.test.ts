import { renderHook } from "@testing-library/react";
import { useUpdateEffect } from "./use-update-effect";

describe(useUpdateEffect, () => {
    test("the callback function should have been called on update", () => {
        const effect = jest.fn();
        const { rerender } = renderHook(() => useUpdateEffect(effect));

        expect(effect).not.toHaveBeenCalled();

        rerender();

        expect(effect).toHaveBeenCalledTimes(1);
    });
});
