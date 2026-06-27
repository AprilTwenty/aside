import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";

import MainLayout from "./pages/MainLayout";

import Home from "./pages/Home";
import SavePage from "./pages/saves/savesPage";
import Explore from "./pages/Explore";
import Following from "./pages/Following";
import Collections from "./pages/Collections";
import Settings from "./pages/Settings";

function App() {
  return (
    <div className="app-wrapper">
      <BrowserRouter>
        <Routes>
          <Route element={ <MainLayout />}>
            <Route path="/" element={ <Home /> } />
            <Route path="/explore" element={ <Explore /> } />
            <Route path="/following" element={ <Following /> } />
            <Route path="/collections" element={ <Collections /> } />
            <Route path="/settings" element={ <Settings /> } />
          </Route>
        </Routes>
      </BrowserRouter>

    </div>
  )
}

export default App;
