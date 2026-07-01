import "./FeedItem.css";
import VideoPlayer from "./VideoPlayer";

function FeedItem({ save }) {
    return (
        <article className="feed-item">

            <div className="feed-item__preview">
                <div className="feed-item__player">
                {/* hardcode test v. only */}
                    <VideoPlayer url={save.url} />
                </div>

            </div>

            <div className="feed-item__info">
                {save.note && (
                    <p className="feed-item__note">
                        {save.note}
                    </p>
                )}
                <div className="feed-item__footer">
                    <span className="feed-item__domain">
                        {save.source_domain}
                    </span>
                    <span>
                        •
                    </span>
                    <span>
                        @{save.user}
                    </span>
                </div>

            </div>

        </article>
    );
}

export default FeedItem;