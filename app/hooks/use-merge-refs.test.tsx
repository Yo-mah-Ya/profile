import { FC, forwardRef, useImperativeHandle } from "react";
import { render } from "@testing-library/react";
import { useMergeRefs } from "./use-merge-refs";

describe(useMergeRefs, () => {
    test("mergeRefs", () => {
        const Dummy = forwardRef(function Dummy(_, ref) {
            useImperativeHandle(ref, () => "refValue");
            return null;
        });
        const refAsFunc = jest.fn();
        const refAsObj = { current: undefined };
        const Example: FC = () => (
            <Dummy ref={useMergeRefs([refAsObj, refAsFunc])} />
        );
        const { rerender } = render(<Example />);
        expect(refAsFunc).toHaveBeenCalledTimes(1);
        expect(refAsFunc).toHaveBeenCalledWith("refValue");
        expect(refAsObj.current).toBe("refValue");

        const NullComponent: FC = () => null;
        rerender(<NullComponent />);
        expect(refAsFunc).toHaveBeenCalledTimes(2);
        expect(refAsFunc).toHaveBeenCalledWith(null);
        expect(refAsObj.current).toBe(null);
    });
});
