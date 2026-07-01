import { parseVideoUrl } from "../utils/video";
import TiktokPlayer from "./TiktokPlayer";
import YoutubePlayer from "./YoutubePlayer";

function VideoPlayer({ url }) {
    const video = parseVideoUrl(url);
    if (!video) return null;
    if (video.platform === "youtube") {
        return <YoutubePlayer id={video.id} />
    }
    if (video.platform === "tiktok") {
        return <TiktokPlayer id={video.id} />
    }
    return null;
}

export default VideoPlayer;