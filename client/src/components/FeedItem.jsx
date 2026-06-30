import { parseVideoUrl } from "../utils/video";
import "./FeedItem.css";

function FeedItem({ save }) {
    const parsedUrl = parseVideoUrl(save.url);
    console.table(parsedUrl);
    return (
        <article className="feed-item">

            <div className="feed-item__preview">
                <div className="feed-item__player">
                {/* hardcode test v. only */}
                {parsedUrl?.platform === "youtube" && (

                
                    <iframe 
                        src={`https://www.youtube.com/embed/${parsedUrl.id}`}
                        title="Youtube Video"
                        allow="accelerometer; autoplay; clipboard-wite; encrypted-media; gyrosocope; picture-in-picture;"
                        allowFullScreen
                    />
                )}
                
                {parsedUrl?.platform === "tiktok" && (
                    <iframe
                        src={`https://www.tiktok.com/embed/v2/${parsedUrl.id}`}
                        title="Tiktok Video"
                        allow="accelerometer; autoplay; clipboard-wite; encrypted-media; gyrosocope; picture-in-picture;"
                        allowFullScreen
                    />
                )}
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