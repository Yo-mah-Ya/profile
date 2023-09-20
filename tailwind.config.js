/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
    theme: {
        extend: {
            fontFamily: {
                adelia: ["ADELIA", "cursive"],
                "title-sub": [
                    "Segoe UI",
                    "Tahoma",
                    "Geneva",
                    "Verdana",
                    "sans-serif",
                ],
            },
            gridTemplateRows: {
                layout: "56px 1fr 100px",
            },
        },
    },
    plugins: [],
};
