import Sidebar from "../components/layout/Sidebar";
import { Outlet } from "react-router-dom";

import "./MainLayout.css";
import RecentSave from "./RecentSaves";

function MainLayout() {
    return (
        <main className="layout">
            <Sidebar />
            <section className="layout__content">
                <Outlet />
            </section>
            <aside className="layout__right">
                <RecentSave />
            </aside>
        </main>
    )
}

export default MainLayout;
