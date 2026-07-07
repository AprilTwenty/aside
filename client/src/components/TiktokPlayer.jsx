
import "./TiktokPlayer.css";

function TiktokPlayer({ id }) {
    return (                 
        <div className="tiktok-player">    
            <iframe
                src={`https://www.tiktok.com/embed/v2/${id}`}
                title="Tiktok Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
                allowFullScreen
            />
        </div>
    );
}
export default TiktokPlayer;