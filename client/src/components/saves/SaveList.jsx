import { useEffect, useState } from "react";
import api from "../../api/api.js";
import SaveCard from "./SaveCard.jsx";

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
        <>
            {saves.map(save => (
                <SaveCard
                key={save.id}
                save={save}
                />
            ))}
        </>
    );
}

export default SaveList;