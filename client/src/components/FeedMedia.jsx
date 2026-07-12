import { parseVideoUrl } from "../utils/video";
import TiktokPlayer from "./TiktokPlayer";
import YoutubePlayer from "./YoutubePlayer";

import "./FeedMedia.css";
import MediaPlaceholder from "./MediaPlaceholder";
import YoutubeThumbnail from "./YoutubeThumbnail";

function FeedMedia({ url, active, focused }) {
    const video = parseVideoUrl(url);
    if (!video) {
        return (
            <div className="feed-media">
                <div className="feed-media__frame">
                    <MediaPlaceholder />
                </div>
            </div>
        );
    }
    let content;
    if (!active) {
        if (video.platform === "youtube") {
            content = <YoutubeThumbnail id={video.id} />;
        } else {
            content = <MediaPlaceholder platform={video.platform} />;
        }
    } else {
        switch (video.platform) {
            case "youtube":
                content = <YoutubePlayer id={video.id} active={focused} />;
                break;

            case "tiktok":
                content = <TiktokPlayer id={video.id} active={focused} />;
                break;

            default:
                content = <MediaPlaceholder />;
        }
    }

    return (
        <div className="feed-media">
            <div className={`feed-media__frame feed-media__frame--${video.platform}`}>
                {content}
            </div>
        </div>
    );
}

export default FeedMedia;