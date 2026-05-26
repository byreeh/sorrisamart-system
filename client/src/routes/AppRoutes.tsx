import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Sobre from "../pages/Sobre";
import Integrantes from "../pages/Integrantes";

export default function AppRoutes() {
    return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<Sobre />} />
        <Route path="/integrantes" element={<Integrantes />} />
      </Routes>
    </BrowserRouter>
    );
}