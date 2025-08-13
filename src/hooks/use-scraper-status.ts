import { useEffect, useState } from "react"

type ScraperStatus = "online" | "offline"

export function useScraperStatus(wsUrl: string) {
    const [status, setStatus] = useState<ScraperStatus>("offline")

    useEffect(() => {
        let ws: WebSocket | null = new WebSocket(wsUrl)

        ws.onopen = () => setStatus("online")
        ws.onclose = () => setStatus("offline")
        ws.onerror = () => setStatus("offline")
        ws.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data)
                if (data.status === "online" || data.status === "offline") {
                    setStatus(data.status)
                }
            } catch {}
        }

        return () => {ws?.close()}

    }, [wsUrl])

    return status
}