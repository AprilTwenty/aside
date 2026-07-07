import FeedInfo from "./FeedInfo";
import FeedMedia from "./FeedMedia";

import "./FeedItem.css";

function FeedItem({ save }) {
    return (
        <article className="feed-item">
            {save.title && (
                <h2 className="feed-title">
                    {save.title}
                </h2>
            )}

            <FeedMedia url={save.url} />
            <FeedInfo note={save.note} domain={save.source_domain} user={save.user} />
        </article>
    );
}

export default FeedItem;