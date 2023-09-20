import { Logger, errorMessageOf, unexpectedDefault } from "../utils";

type AcceptablePrimitives =
    | string
    | number
    | bigint
    | boolean
    | undefined
    | null;
type Config = RequestInit & {
    params?: Record<string, AcceptablePrimitives | AcceptablePrimitives[]>;
} & {
    timeout?: number;
};

export const buildQueryParameters = (params: Config["params"]): string => {
    if (!params) return "";

    const searchParams = new URLSearchParams();

    const parseAcceptablePrimitive = (
        primitive: Exclude<AcceptablePrimitives, undefined>,
    ): string => {
        if (typeof primitive === "string") return primitive;
        else if (
            typeof primitive === "number" ||
            typeof primitive === "bigint" ||
            typeof primitive === "boolean"
        )
            return primitive.toString();
        else if (primitive === null) return String(primitive);
        else
            throw unexpectedDefault(
                primitive,
                new Error("unexpected primitive in parseAcceptablePrimitive"),
            );
    };

    for (const [key, value] of Object.entries(params)) {
        if (Array.isArray(value)) {
            for (let i = 0; i < value.length; i++) {
                const v = value[i];
                if (v !== undefined) {
                    // Explicitly disallow nested array to avoid from recursively searching params
                    searchParams.append(key, parseAcceptablePrimitive(v));
                }
            }
        } else {
            if (value !== undefined) {
                searchParams.append(key, parseAcceptablePrimitive(value));
            }
        }

        if (!searchParams.get(key)) {
            searchParams.delete(key);
        }
    }

    return `?${searchParams.toString()}`;
};
export const fetchWrapper = async (
    baseUrl: string,
    init?: Config,
): Promise<Response> => {
    const url = `${baseUrl}${buildQueryParameters(init?.params)}`;

    const controller = new AbortController();
    const timeout = setTimeout(
        () => {
            controller.abort();
        },
        init?.timeout ?? 1000,
    );

    try {
        const response = await fetch(url, {
            ...init,
            signal: controller.signal,
        });
        if (!response.ok) {
            Logger.warn({
                message: await response.text(),
                status: response.status,
                url,
            });
            throw new Error("Response is not ok");
        }
        return response;
    } catch (error) {
        Logger.warn({ message: errorMessageOf(error), url, init });
        throw error;
    } finally {
        clearTimeout(timeout);
    }
};

export const fetchJson = async <T>(url: string, init?: Config): Promise<T> =>
    (await fetchWrapper(url, init)).json() as T;

export const fetchText = async (url: string, init?: Config): Promise<string> =>
    (await fetchWrapper(url, init)).text();
