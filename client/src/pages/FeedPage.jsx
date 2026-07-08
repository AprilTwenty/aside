import { useEffect, useState } from "react";
import { getSave } from "../api/save";
import FeedItem from "../components/FeedItem";

import "./FeedPage.css";

function FeedPage() {
    const [ saves, setSaves ] = useState([]);
    const [ loading, setLoading ] = useState(true);
    const [currentIndex,setCurrentIndex] = useState(0);

    useEffect(() => {
        async function fetchSaves() {
            try {
                const fatchSaves = await getSave();
                setSaves(fatchSaves);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
        fetchSaves();
        
    },[]);

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <div className="feed-page">
            {saves.map((save, index) => (
                <FeedItem   
                    key={save.id}
                    save={save}
                    index={index}
                    currentIndex={currentIndex}
                    setCurrentIndex={setCurrentIndex}
                />
            ))}
        </div>
    )

}

export default FeedPage;