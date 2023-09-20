import { buildQueryParameters } from "./rest-api-client";

describe(buildQueryParameters, () => {
    test("primitives", () => {
        expect(
            buildQueryParameters({
                string: "string",
                number: 1,
                bigint: BigInt(
                    99999999999999999322094867436162797646170844194406400,
                ),
                boolean: true,
                undefined: undefined,
                null: null,
            }),
        ).toStrictEqual(
            "?string=string&number=1&bigint=99999999999999999322094867436162797646170844194406400&boolean=true&null=null",
        );
    });
    test("array", () => {
        expect(
            buildQueryParameters({
                string: "string",
                number: 1,
                bigint: BigInt(
                    99999999999999999322094867436162797646170844194406400,
                ),
                boolean: true,
                undefined: undefined,
                null: null,
                array: [
                    "string",
                    1,
                    BigInt(
                        99999999999999999322094867436162797646170844194406400,
                    ),
                    true,
                    undefined,
                    null,
                ],
            }),
        ).toStrictEqual(
            "?string=string&number=1&bigint=99999999999999999322094867436162797646170844194406400&boolean=true&null=null&array=string&array=1&array=99999999999999999322094867436162797646170844194406400&array=true&array=null",
        );
    });
});
