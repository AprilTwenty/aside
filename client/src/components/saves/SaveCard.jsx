import "./SaveCard.css";

function SaveCard({ save }) {
    return (
        <article className="save-card">
            {/* Preview */}
            <iframe src="https://www.youtube.com/embed/L5p4X3gPqfg"></iframe>
            <div className="save-card__preview">
                {save.thumbnail ? (
                    <img 
                        src={save.thumbnail}
                        alt={save.title}
                    />
                ) : (
                    <div className="save-card__preview-placeholder">
                        Preview
                    </div>
                )}
            </div>

            <div className="save-card__body">
                {/* title */}
                {save.title && (
                    <h3 className="save-card__title">
                        {save.title}
                    </h3>
                )}
                {/* note */}
                {save.note && (
                    <div className="save-card__note">
                        {save.note}
                    </div>
                )}
                {/* Domain + User */}
                <div className="save-card__meta">
                    {save.source_domain && (
                        <span className="save-card__domain">
                            🌐 {save.source_domain}
                        </span>
                    )}
                    {save.user && (
                        <span className="save-card__user">
                            👤 {save.user}
                        </span>
                    )}
                </div>
                {/* Url */}
                {/*}
                <a 
                    href={save.url}
                    target="_blank"
                    rel="noreferrer"
                    className="save-card__url"
                >
                    🔗 {save.url}
                </a>
                {*/}
                {/* Buttom */}
                
                <div className="save-card__actions">
                    <a
                        href={save.url}
                        target="_blank"
                        rel="noreferrer"
                        className="save-card__button"
                    >
                        Open Link
                    </a>
                </div>
                
            </div>
        </article>
    );
}

export default SaveCard;