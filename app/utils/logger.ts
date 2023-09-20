export type CallSite = {
    file?: string;
    function?: string;
    line?: string;
};
type LogMessage = {
    message: string;
    callSite?: CallSite;
};

const logLevelConfig = {
    trace: {
        name: "TRACE",
        level: 0,
        logger: console.trace,
    },
    debug: {
        name: "DEBUG",
        level: 1,
        logger: console.debug,
    },
    info: {
        name: "INFO",
        level: 2,
        logger: console.info,
    },
    warn: {
        name: "WARN",
        level: 3,
        logger: console.warn,
    },
    error: {
        name: "ERROR",
        level: 4,
        logger: console.error,
    },
} as const;

const envLogLevelConfig = (() => {
    switch (process.env.LOG_LEVEL) {
        case logLevelConfig.trace.name:
            return logLevelConfig.trace;
        case logLevelConfig.info.name:
            return logLevelConfig.info;
        case logLevelConfig.warn.name:
            return logLevelConfig.warn;
        case logLevelConfig.error.name:
            return logLevelConfig.error;
        case logLevelConfig.debug.name:
        default:
            return logLevelConfig.debug;
    }
})();

type LoggerConfig =
    | (typeof logLevelConfig)[keyof typeof logLevelConfig]
    | { name: string; logger: () => void };

const getLogger = (
    logLevel: (typeof logLevelConfig)[keyof typeof logLevelConfig],
): LoggerConfig => {
    if (logLevel.level >= envLogLevelConfig.level) {
        return logLevel;
    } else {
        return {
            name: "",
            logger: () => {},
        };
    }
};

const messageWith = (
    logLevel: (typeof logLevelConfig)[keyof typeof logLevelConfig],
): (<T extends LogMessage>(message: T) => void) => {
    const { logger, name } = getLogger(logLevel);
    return <T extends LogMessage>(message: T): void => {
        logger(`[${name}] ${new Date().toISOString()}`, message);
    };
};

export const trace = messageWith(logLevelConfig.trace);
export const debug = messageWith(logLevelConfig.debug);
export const info = messageWith(logLevelConfig.info);
export const warn = messageWith(logLevelConfig.warn);
export const error = messageWith(logLevelConfig.error);
