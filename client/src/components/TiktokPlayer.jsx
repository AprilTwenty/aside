function TiktokPlayer({ id }) {
    return (                     
        <iframe
            src={`https://www.tiktok.com/embed/v2/${id}`}
            title="Tiktok Video"
            allow="accelerometer; autoplay; clipboard-wite; encrypted-media; gyrosocope; picture-in-picture;"
            allowFullScreen
        />
    );
}
export default TiktokPlayer;