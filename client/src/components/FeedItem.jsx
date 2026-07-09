import FeedInfo from "./FeedInfo";
import FeedMedia from "./FeedMedia";

import "./FeedItem.css";
import { useEffect, useRef } from "react";



function FeedItem({ save, index, currentIndex, setCurrentIndex }) {
    const ref = useRef(null);

    useEffect(() => {

        if (!ref.current) return;

        const observer = new IntersectionObserver(
            ([entry]) => {

                if (entry.isIntersecting) {
                    setCurrentIndex(index);
                }

            },
            {
                threshold:0.7,
            }
        );


        observer.observe(ref.current);


        return () => {
            observer.disconnect();
        };

    }, [index, setCurrentIndex]);
    return (
        <article className="feed-item" ref={ref}>
            {save.title && (
                <h2 className="feed-title">
                    {save.title}
                </h2>
            )}

            <FeedMedia url={save.url} active={index===currentIndex} focused={index===currentIndex} />
            <FeedInfo note={save.note} domain={save.source_domain} user={save.user} />
        </article>
    );
}

export default FeedItem;