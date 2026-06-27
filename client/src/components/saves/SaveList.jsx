import { useEffect, useState } from "react";
import api from "../../api/api.js";
import SaveCard from "./SaveCard.jsx";
import "./SaveList.css";

function SaveList() {
    const [saves, setSaves] = useState([]);

    useEffect(() => {
        async function fetchSaves() {
            const response = await api.get("/saves");

            setSaves(response.data.data);
            
        }
        fetchSaves();
    }, []);
    return (
        <section className="save-list">
            {saves.map(save => (
                <SaveCard
                key={save.id}
                save={save}
                />
            ))}
        </section>
    );
}

export default SaveList;