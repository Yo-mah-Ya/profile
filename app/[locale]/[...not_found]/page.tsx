import { notFound } from "next/navigation";

// catch-all subsequent segments
export default function NotFoundCatchAll() {
    notFound();
}
