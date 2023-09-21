import type { ReactNode } from "react";
import { dir } from "i18next";
import Header from "../components/header";
import layoutStyles from "./layout.module.scss";
import "./global.css";
import type { PageProps } from "./types";
import type { Metadata } from "next";
import { locales } from "../i18n/settings";

export async function generateMetadata(): Promise<Metadata> {
    return {
        // Basic
        applicationName: "blog",
        formatDetection: { telephone: false, email: false, address: false },
        themeColor: "white",
        // OGP
        // openGraph: {
        //     title: "blog",
        //     description: "blog",
        //     siteName: "blog",
        //     locale: params.locale,
        //     type: "website",
        // },
        // viewport
        viewport: {
            width: "device-width",
            initialScale: 1,
            maximumScale: 1,
        },
        // Apple
        // appleWebApp: {
        //     title: "Apple Web App",
        // },
    };
}

export const generateStaticParams = () =>
    locales.map((lang) => ({
        locale: lang,
    }));

const RootLayout = ({
    children,
    params: { locale },
}: { children: ReactNode } & PageProps) => {
    const commonInHeaderAndFooter =
        "text-neutral-800 bg-stone-300 border border-solid border-black";
    return (
        <html className={"text-neutral-950"} lang={locale} dir={dir(locale)}>
            <body>
                <div
                    className={`${layoutStyles["grid-container"]} grid min-h-screen`}
                >
                    <div
                        className={`${layoutStyles.header} fixed top-0 right-0 left-0 h-14 ${commonInHeaderAndFooter}`}
                    >
                        <Header />
                    </div>
                    <main className={layoutStyles.main}>{children}</main>
                    <footer
                        className={`${layoutStyles.footer} flex items-center justify-center ${commonInHeaderAndFooter}`}
                    >
                        <div className={layoutStyles["container"]}>
                            <span>
                                Copyright © {new Date().getFullYear()},
                                Yoshinari Yamanaka. All rights reserved
                            </span>
                        </div>
                    </footer>
                </div>
            </body>
        </html>
    );
};
export default RootLayout;
