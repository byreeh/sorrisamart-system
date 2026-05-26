import { Routes, Route } from "react-router-dom";
import NotFound from "@/pages/NotFound";
import ErrorBoundary from "./components/ErrorBoundary";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Integrantes from "./pages/Integrantes";
import Sobre from "./pages/Sobre";
import FAQ from "./pages/FAQ";
import Contato from "./pages/Contato";
import Solucao from "./pages/Solucao";
import Dentistas from "./pages/Dentistas";
import DentistaDetalhe from "./pages/DentistaDetalhe";


function Router() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"/integrantes"} element={<Integrantes />} />
          <Route path={"/sobre"} element={< Sobre />} />
          <Route path={"/faq"} element={<FAQ />} />
          <Route path={"/contato"} element={<Contato />} />
          <Route path={"/solucao"} element={<Solucao />} />
          <Route path={"/404"} element={< NotFound />} />
          <Route path="/dentistas" element={<Dentistas />} />
          <Route path="/dentistas/:id" element={<DentistaDetalhe />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
          <Router />
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
