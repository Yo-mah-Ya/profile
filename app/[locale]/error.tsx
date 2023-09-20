"use client";
import { fallbackLng } from "../i18n/settings";
import Link from "next/link";
import { errorMessageOf, Logger } from "../utils";
import { useEffect } from "react";

const GlobalError = ({ error }: { error: Error; reset: () => void }) => {
    useEffect(() => {
        Logger.warn({ message: errorMessageOf(error), error });
    }, [error]);
    return (
        <>
            <div
                className={`flex flex-col items-center justify-center w-screen text-9xl`}
            >
                <h1>Sorry something goes wrong...</h1>
            </div>
            <Link href={`/${fallbackLng}`}>Home</Link>
        </>
    );
};
export default GlobalError;
