import { NextResponse, NextRequest } from "next/server";
import { languages, fallbackLng } from "./app/i18n/settings";

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - assets (assets)
         * - favicon.ico (favicon file)
         */
        "/((?!_next/static|_next/image|assets|favicon.ico).*)",
    ],
};

export function middleware(request: NextRequest): NextResponse {
    if (
        request.nextUrl.pathname.indexOf("icon") > -1 ||
        request.nextUrl.pathname.indexOf("chrome") > -1
    )
        return NextResponse.next();

    // Redirect if locale in path is not supported
    if (
        !languages.some((locale) =>
            request.nextUrl.pathname.startsWith(`/${locale}`),
        ) &&
        !request.nextUrl.pathname.startsWith("/_next")
    ) {
        return NextResponse.redirect(
            new URL(`/${fallbackLng}${request.nextUrl.pathname}`, request.url),
        );
    }

    return NextResponse.next();
}
