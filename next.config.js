/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        formats: ["image/avif", "image/webp"],
    },
    env: {
        NEXT_PUBLIC_LINKED_IN_URL:
            "https://www.linkedin.com/in/yoshinari-yamanaka-786740231/",
        NEXT_PUBLIC_GIT_HUB_URL: "https://github.com/Yo-mah-Ya",
        NEXT_PUBLIC_LOG_LEVEL: "DEBUG",
    },
    headers() {
        return [
            {
                source: "/(.*)",
                headers: [
                    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy
                    {
                        key: "Referrer-Policy",
                        value: "origin-when-cross-origin",
                    },
                    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options
                    {
                        key: "X-Frame-Options",
                        value: "DENY",
                    },
                    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options
                    {
                        key: "X-Content-Type-Options",
                        value: "nosniff",
                    },
                    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-DNS-Prefetch-Control
                    {
                        key: "X-DNS-Prefetch-Control",
                        value: "on",
                    },
                    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security
                    {
                        key: "Strict-Transport-Security",
                        value: "max-age=31536000; includeSubDomains; preload",
                    },
                    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Feature-Policy
                    {
                        key: "Permissions-Policy",
                        value: "camera=(), microphone=(), geolocation=()",
                    },
                ],
            },
        ];
    },
};

module.exports = nextConfig;
