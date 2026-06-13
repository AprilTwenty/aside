function SaveCard({ save }) {
    return (
        <div>
            <h3>{save.title}</h3>
            <p>{save.source_domain}</p>
            <a href={save.url} target="_blank">open</a>
        </div>
    );
}

export default SaveCard;