import "./FeedItem.css";

function FeedItem({ save }) {
    return (
        <article className="feed-item">

            <div className="feed-item__preview">
                {/* hardcode test v. only */}
                <iframe 
                    src="https://www.youtube.com/embed/QBAQHh_zVCw"
                    title="Youtube Video"
                    allow="accelerometer; autoplay; clipboard-wite; encrypted-media; gyrosocope; picture-in-picture;"
                    allowFullScreen
                />

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