import FeedInfo from "./FeedInfo";
import FeedMedia from "./FeedMedia";

import "./FeedItem.css";
import { useEffect, useRef, useState } from "react";



function FeedItem({ save, index, currentIndex, setCurrentIndex }) {
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setCurrentIndex(index);
                }
            },
            {
                threshold: 0.7,
            }
        );

        observer.observe(ref.current);

        return () => {
            observer.disconnect();
        };

    }, []);
    return (
        <article className="feed-item" ref={ref}>
            {save.title && (
                <h2 className="feed-title">
                    {save.title}
                </h2>
            )}

            <FeedMedia url={save.url} active={Math.abs(index-currentIndex)<=2} focused={index===currentIndex} />
            <FeedInfo note={save.note} domain={save.source_domain} user={save.user} />
        </article>
    );
}

export default FeedItem;