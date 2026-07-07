import { FiPlay } from "react-icons/fi";

import "./MediaPlaceholder.css";

function MediaPlaceholder() {
    return (
        <div className="media-placeholder">
            <FiPlay className="media-placeholder__icon" />

            <p className="media-placeholder__text">
                Preview unavailable
            </p>
        </div>
    );
}

export default MediaPlaceholder;