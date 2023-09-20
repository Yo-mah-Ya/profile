import Link from "next/link";
import type { Metadata } from "next";
import { fallbackLng } from "../i18n/settings";

export const metadata: Metadata = {
    title: "Not Found",
    description: "Not Found",
};

export const Page = async () => (
    <div
        className={
            "flex flex-col items-center justify-center w-screen text-9xl"
        }
    >
        <h1>Not Found</h1>
        <div>
            <Link href={`/${fallbackLng}`}>Home</Link>
        </div>
    </div>
);

export default Page;
