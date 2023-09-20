import { useState } from "react";
import { errorMessageOf, Logger } from "../utils";
type CopiedValue = string | null;
type CopyFn = (text: string) => Promise<boolean>; // Return success

export const useCopyToClipboard = (): [CopiedValue, CopyFn] => {
    const [copiedText, setCopiedText] = useState<CopiedValue>(null);

    const copy: CopyFn = async (text) => {
        if (!navigator?.clipboard) {
            Logger.warn({ message: "Clipboard not supported" });
            return false;
        }

        // Try to save to clipboard then save it in the state if worked
        try {
            await navigator.clipboard.writeText(text);
            setCopiedText(text);
            return true;
        } catch (error) {
            Logger.warn({ message: errorMessageOf(error) });
            setCopiedText(null);
            return false;
        }
    };

    return [copiedText, copy];
};
