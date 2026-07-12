import { useState } from "react";

import "./YoutubeThumbnail.css";
import MediaPlaceholder from "./MediaPlaceholder";

function YoutubeThumbnail({ id }) {
    const [error, setError] = useState(false);

    if (error) {
        return (
            <MediaPlaceholder />
        );
    }

    return (
        <div className="youtube-thumbnail">
            <img
                src={`https://img.youtube.com/vi/${id}/maxresdefault.jpg`}
                alt="YouTube thumbnail"
                onError={() => setError(true)}
            />
        </div>
    );
}

export default YoutubeThumbnail;