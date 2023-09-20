const assertString = (env?: string): string => {
    if (env == undefined) throw new Error("cannot get process.env");
    return env;
};

export const environments = {
    linkedInProfileUrl: assertString(process.env.NEXT_PUBLIC_LINKED_IN_URL),
    githubProfileUrl: assertString(process.env.NEXT_PUBLIC_GIT_HUB_URL),
    logLevel: assertString(process.env.NEXT_PUBLIC_LOG_LEVEL),
} as const;
