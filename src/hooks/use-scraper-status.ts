import { useEffect, useState } from "react"

type ScraperStatus = "online" | "offline" | "unknown"

export function useScraperStatus(wsUrl?: string | null) {
    const [status, setStatus] = useState<ScraperStatus>("unknown")

    useEffect(() => {
        if (!wsUrl) {
            setStatus("unknown")
            return
        }

        let ws: WebSocket | null = null
        try {
            ws = new WebSocket(wsUrl)
        } catch {
            setStatus("offline")
            return
        }

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