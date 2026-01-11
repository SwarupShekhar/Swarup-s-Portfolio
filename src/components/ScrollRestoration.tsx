"use client";

import { useEffect } from "react";

export default function ScrollRestoration() {
    useEffect(() => {
        if (typeof window !== "undefined" && window.history) {
            window.history.scrollRestoration = "manual";
        }
    }, []);

    return null;
}
