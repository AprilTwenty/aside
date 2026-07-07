
import "./InfoYoutube.css";

function InfoYoutube({ note, domain, user }) {
    return (
            <div className="feed-info">
                {note && (
                    <p className="feed-note">
                        {note}
                    </p>
                )}
                <div className="feed-footer">
                    <span className="feed-item__domain">
                        {domain}
                    </span>
                    <span>
                        •
                    </span>
                    <span>
                        @{user}
                    </span>
                </div>
            </div>
    )
}
export default InfoYoutube;