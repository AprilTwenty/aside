import { parseVideoUrl } from "../utils/video";
import TiktokPlayer from "./TiktokPlayer";
import YoutubePlayer from "./YoutubePlayer";

import "./VideoPlayer.css";

function VideoPlayer({ save }) {
    const video = parseVideoUrl(save.url);
    if (!video) return null;
    if (video.platform === "youtube") {
        return (
            <div className="feed-item-youtube">
                <div className="feed-player-youtube__preview">
                    <YoutubePlayer id={video.id} />
                </div>
            </div>
        )
    }
    if (video.platform === "tiktok") {
        return (
            <div className="feed-item-tiktok">
                <div className="feed-item-tiktok__preview">
                    <TiktokPlayer id={video.id} />
                </div>
            </div>
        )
    }
    return null;
}

export default VideoPlayer;