import { useEffect, useState } from "react";
import { getSave } from "../api/save";
import FeedItem from "../components/FeedItem";

import "./FeedPage.css";

function FeedPage() {
    const [ saves, setSaves ] = useState([]);
    const [ loading, setLoading ] = useState(true);

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
            {saves.map(save => (
                <FeedItem   
                    key={save.id}
                    save={save}
                />
            ))}
        </div>
    )

}

export default FeedPage;