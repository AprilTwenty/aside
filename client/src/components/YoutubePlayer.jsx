import { useEffect, useRef } from "react";
import "./YoutubePlayer.css";

function YoutubePlayer({ id, active }) {
    const iframeRef = useRef(null);
    useEffect(() => {

        if (!iframeRef.current) return;

        const timer = setTimeout(() => {

            iframeRef.current.contentWindow.postMessage(
                JSON.stringify({
                    event:"command",
                    func: active ? "playVideo" : "pauseVideo",
                    args:[]
                }),
                "*"
            );

        },300);


        return () => clearTimeout(timer);


    },[active]);
    return (
        <div className="youtube-player">
            <iframe
                ref={iframeRef}
                src={`https://www.youtube.com/embed/${id}?enablejsapi=1&origin=${window.location.origin}&autoplay=1&mute=1`}
                title="YouTube player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            />
        </div>
    );
}

export default YoutubePlayer;