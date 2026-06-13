import { useEffect } from "react";
import api from "../api/api.js"

function Home() {
    useEffect(() => {
        async function fetchSaves() {
            const response = await api.get("/saves");
            console.log(response.data);
        }
        fetchSaves();
    }, []);

    return (
        <div>
            Home
        </div>
    );
}

export default Home;