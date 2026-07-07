import { FiGlobe, FiUser, FiPlayCircle } from "react-icons/fi";

import "./FeedInfo.css";

function FeedInfo({ title, note, domain, user }) {
    return (
        <div className="feed-info">


            {note && (
                <p className="feed-note">
                    {note}
                </p>
            )}

            <div className="feed-footer">

                <span className="feed-meta">
                    <FiGlobe size={15} />
                    {domain}
                </span>

                <span className="feed-meta">
                    <FiUser size={15} />
                    @{user}
                </span>

            </div>

        </div>
    );
}

export default FeedInfo;