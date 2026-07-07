import "./YoutubePlayer.css";

function YoutubePlayer({ id }) {
    return (
        <div className="youtube-player">
            <iframe
                src={`https://www.youtube.com/embed/${id}`}
                title="YouTube player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            />
        </div>
    );
}

export default YoutubePlayer;