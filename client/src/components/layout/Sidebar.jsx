import { NavLink } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
    return (
        <aside className="sidebar">
            <h2 className="sidebar__logo">
                Aside
            </h2>

            <nav className="sidebar__nav">
                <NavLink to="/">🏠 Home</NavLink>
                <NavLink to="/explore">🔍 Explore</NavLink>
                <NavLink to="/following">👥 Following</NavLink>
                <NavLink to="/collections">📚 Collections</NavLink>
                <NavLink to="/settings">⚙️ Settings</NavLink>
            </nav>
        </aside>
    );
}

export default Sidebar;