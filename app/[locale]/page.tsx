import type { Metadata } from "next";
import { PageProps } from "./types";
import Skills from "../components/skills";
import { useTranslation } from "app/i18n";

export const metadata: Metadata = {
    title: "Home",
    description: "Home",
};

const IndexPage = async ({ params: { locale } }: PageProps) => {
    const { t } = await useTranslation(locale);
    return (
        <>
            <div className={"flex flex-col items-center justify-center m-12"}>
                <h1 className={"text-7xl font-extrabold font-adelia"}>
                    {t("name")}
                </h1>
                <h3 className={`font-title-sub text-5xl font-normal`}>
                    {t("jobRole")}
                </h3>
                <p>{t("introduction")}</p>
                <Skills />
            </div>
        </>
    );
};

export default IndexPage;
