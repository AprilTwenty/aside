import { useEffect } from "react";
import api from "../api/api.js"

import Sidebar from "../components/layout/Sidebar.jsx";
import SavePage from "./saves/SavesPage.jsx";
import FeedPage from "./FeedPage.jsx";

import "./Home.css";

function Home() {


    return (
        <main className="home">
                <FeedPage />
        </main>
    );
}

export default Home;