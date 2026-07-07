import { parseVideoUrl } from "../utils/video";
import "./FeedCard.css";
import FeedInfo from "./FeedInfo";
import VideoPlayer from "./VideoPlayer";
import YoutubePlayer from "./YoutubePlayer";

function FeedCard({ save }) {
    return (
        <div className="feed-card">
            <div className="feed-card__player">
                <VideoPlayer url={save.url} />
            </div>
            <div className="feed-card__info">
                <FeedInfo url={save.url} note={save.note} domain={save.souce_domain} user={save.user} />
            </div>
        </div>
    )
}

export default FeedCard