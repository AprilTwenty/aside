import { parseVideoUrl } from "../utils/video";
import TiktokPlayer from "./TiktokPlayer";
import YoutubePlayer from "./YoutubePlayer";

import "./FeedMedia.css";
import MediaPlaceholder from "./MediaPlaceholder";

function FeedMedia({ url, active }) {
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
        content = <MediaPlaceholder platform={video.platform} />;
    } else {
        switch (video.platform) {
            case "youtube":
                content = <YoutubePlayer id={video.id} />;
                break;

            case "tiktok":
                content = <TiktokPlayer id={video.id} />;
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