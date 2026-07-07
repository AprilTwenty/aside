import { parseVideoUrl } from "../utils/video";
import TiktokPlayer from "./TiktokPlayer";
import YoutubePlayer from "./YoutubePlayer";

import "./FeedMedia.css";
import MediaPlaceholder from "./MediaPlaceholder";

function FeedMedia({ url }) {
    const video = parseVideoUrl(url);
    if (!video) return <MediaPlaceholder />;
    return (
        <div className="feed-media">
            {
                (() => {
                    switch (video.platform) {
                        case "youtube" : return <YoutubePlayer id={video.id} />
                        case "tiktok" : return <TiktokPlayer id={video.id} />
                        default : return <MediaPlaceholder />
                    }

                })()
            }
        </div>
)
}

export default FeedMedia;