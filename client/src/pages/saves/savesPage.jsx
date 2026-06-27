import { useState } from "react";
import SaveList from "../../components/saves/SaveList";
import "./SavesPage.css";
import { Search } from "lucide-react";

function SavePage() {
    const [ search, setSearch ] = useState("");

    const handleSearch = (e) => {
        e.preventDefault();
        
    }

    return (
        <div className="save-page">
            <h1 className="save-page__title">
                Aside
            </h1>
            <div className="save-page__search">
                <form onSubmit={handleSearch} >
                    <span className="save-page__search-icon">
                        🔍
                    </span>
                    <input 
                        type="text"
                        placeholder="Search saves..."
                        className="save-page__search-input"
                        value={search}
                        onChange={(e)=> setSearch(e.target.value)}
                    />
                    <button className="save-page__search-button"><Search size={18} /></button>
                </form>
            </div>
            
            <SaveList />
            
        </div>
    );
}

export default SavePage;