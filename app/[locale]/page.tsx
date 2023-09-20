import type { Metadata } from "next";
import { PageProps } from "./types";

export const metadata: Metadata = {
    title: "Home",
    description: "Home",
};

const IndexPage = async ({ params: { locale } }: PageProps) => {
    console.log(locale);
    return (
        <>
            <div className={"flex flex-col items-center justify-center m-12"}>
                <h1 className={"text-7xl font-extrabold font-adelia"}>
                    Yoshinari Yamanaka
                </h1>
                <h3 className={`font-title-sub text-5xl font-normal`}>
                    Software Engineer
                </h3>
            </div>
        </>
    );
};

export default IndexPage;
