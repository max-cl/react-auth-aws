export function developmentLogs({ message, response }: { message: string; response: unknown }) {
    if (import.meta.env.VITE_ENVIRONMENT === "development") {
        console.log(message, JSON.parse(JSON.stringify(response)));
    }
}
