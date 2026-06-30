export function detectPlatform(url) {
    if (!url) return null;

    if (url.includes("youtube.com") || url.includes("youtu.be")) {
        return "youtube";
    }

    if (url.includes("tiktok.com")) {
        return "tiktok";
    }

    return "unknown";
}

export function getYoutubeId(url) {
    try {
        const parsed = new URL(url);
        //watch?v=
        if (parsed.searchParams.get("v")) {
            return parsed.searchParams.get("v");
        }
        //shorts/
        if (parsed.pathname.startsWith("/shorts/")) {
            return parsed.pathname.split("/")[2];
        }
        // youtu.be
        if (parsed.hostname === "youtu.be") {
            return parsed.pathname.slice(1);
        }
    } catch {
            return null;
        }
    return null;
}

export function getTiktokId(url) {
    try {
        const parsed = new URL(url);
        const parts = parsed.pathname.split("/");
        const index = parts.indexOf("video");

        if (index !== -1) {
            return parts[index + 1 ];
        }
    } catch {
        return null;
    }
    return null;
}

export function parseVideoUrl(url) {
    const platform = detectPlatform(url);
    if (platform === "youtube") {
        const id = getYoutubeId(url);

        if (!id) return null

        return {
            platform,
            id
        };
    }
    if (platform === "tiktok") {
        const id = getTiktokId(url);

        if (!id) return null
        
        return {
            platform,
            id
        };
    }
    return null;
}