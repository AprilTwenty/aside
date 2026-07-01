function YoutubePlayer({ id }) {
    return (                     
        <iframe 
            src={`https://www.youtube.com/embed/${id}`}
            title="Youtube Video"
            allow="accelerometer; autoplay; clipboard-wite; encrypted-media; gyrosocope; picture-in-picture;"
            allowFullScreen
        />
    )
}
export default YoutubePlayer;