const nextJest = require("next/jest");
const createJestConfig = nextJest({
    dir: "./",
});
/**
 * @type {import('@jest/types/build').Config.InitialOptions}
 */
const customJestConfig = {
    collectCoverage: true,
    coverageDirectory: "coverage",
    preset: "ts-jest",
    testEnvironment: "jest-environment-jsdom",
    // testRegex: "test.([t]sx?)$",
    testPathIgnorePatterns: [
        // "/node_modules/",
        "/npm-packages-offline-cache/",
        // "/dist/",
        "/.vscode/",
        "/ci/",
        "/coverage/",
        "/public/",
    ],
    // moduleNameMapper: {
    //     // Handle CSS imports (with CSS modules)
    //     // https://jestjs.io/docs/webpack#mocking-css-modules
    //     "^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy",
    // },
    // moduleDirectories: ["node_modules", "/"],
    verbose: true,
};
module.exports = createJestConfig(customJestConfig);
