export type PageProps = {
    params: { locale: string; id: string };
    searchParams: { [key: string]: string | string[] | undefined };
};
