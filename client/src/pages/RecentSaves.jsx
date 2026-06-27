import { useEffect, useState } from "react";
import { getRecentSaves } from "../api/save.js";
import SaveCard from "../components/saves/SaveCard.jsx";

import "./RecentSaves.css";

function RecentSaves() {
    const [ saves, setSaves ] = useState([],);
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        async function fetchRecentSave() {
            try {
                const recentSave = await getRecentSaves();
                setSaves(recentSave)
            } catch(error) {
                console.error(error);
            }finally {
                setLoading(false);
            }
        }
        fetchRecentSave();
    }, []);
    if (loading) {
        return <div>Loading....</div>;
    }
    return (
        <div className="recent-page">

            <div className="recent-page__title">
                <h3>Recent Saves</h3>
            </div>
            <div className="save-list">
                {saves.map(save => (
                    <SaveCard
                        key={save.id}
                        save={save}
                    />
                ))}
            </div>
        </div>
    )
}

export default RecentSaves;