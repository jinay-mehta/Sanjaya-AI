const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export const sendMessageStream = async (
    message: string,
    onEvent: (event: any) => void
) => {
    const response = await fetch(`${API_BASE_URL}/api/chat`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: message }),
    });

    if (!response.ok) {
        throw new Error(`Failed to send message: ${response.statusText}`);
    }

    const reader = response.body?.getReader();
    const decoder = new TextDecoder();

    if (!reader) {
        throw new Error("No response body");
    }

    let buffer = "";

    while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");

        // Keep the last incomplete fragment in the buffer
        buffer = lines.pop() || "";

        for (const line of lines) {
            const trimmedLine = line.trim();
            if (trimmedLine.startsWith("data: ")) {
                const jsonStr = trimmedLine.slice(6).trim();
                if (jsonStr) {
                    try {
                        const data = JSON.parse(jsonStr);
                        onEvent(data);
                    } catch (e) {
                        console.error("Failed to parse SSE line:", jsonStr, e);
                    }
                }
            }
        }
    }

    // Process any remaining text in the buffer
    if (buffer.trim().startsWith("data: ")) {
        const jsonStr = buffer.trim().slice(6).trim();
        if (jsonStr) {
            try {
                const data = JSON.parse(jsonStr);
                onEvent(data);
            } catch (e) {
                console.error("Failed to parse final SSE buffer:", jsonStr, e);
            }
        }
    }
};