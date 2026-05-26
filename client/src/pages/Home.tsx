import { Link } from "react-router-dom";
import { ArrowRight, Code2, Zap, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { getAllDentistas } from "../servicos/dentistaServico";
import { Dentista } from "../tipos/Dentista";

export default function Home() {
  const [dentistas, setDentistas] = useState<Dentista[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);

        const data = await getAllDentistas();

        setDentistas(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        setError("Não foi possível carregar os dentistas");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden py-20 md:py-50 bg-cover bg-center" 
      style={{backgroundImage: "url('https://static.vecteezy.com/ti/fotos-gratis/p1/79495583-masculino-dentista-examinando-jovem-paciente-dentro-moderno-dental-clinica-gratis-foto.jpg')",}}>
        <div className="absolute inset-0 bg-blue-900/60" />
        <div className="container relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

            <div className="text-white space-y-6">
              <div className="inline-block">
                <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold text-white border border-white/30">
                   SorriSmart - Projeto Acadêmico de Odontologia Digital
                </span>
              </div>

              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                Cuidando de sorrisos <span className="text-yellow-200">com soluções digitais inteligentes</span>
              </h1>
              

              <p className="text-lg text-white/90 max-w-md">
                Uma aplicação acadêmica voltada à odontologia digital, desenvolvida com React, Vite e TypeScript, demonstrando boas práticas de engenharia de front-end.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link to="/solucao" className="inline-flex items-center justify-center px-6 py-3 bg-white text-primary font-semibold rounded-lg hover:bg-gray-100 transition-colors">
                  Explorar Solução <ArrowRight className="ml-2" size={20} />
                </Link>
                <Link to="/integrantes" className="inline-flex items-center justify-center px-6 py-3 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-lg border border-white/30 hover:bg-white/30 transition-colors">
                  Conhecer nosso Time
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="p-10">
      <h1 className="text-3xl font-bold">SorriSmart</h1>

      <Link
        to="/dentistas"
        className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors">
        Ver Dentistas
      </Link>
    </div>
      
      <section className="py-20 md:py-32 bg-background border-t border-border">
          <div className="container">

            <h2 className="text-3xl md:text-4xl font-bold mb-2">
              Dentistas cadastrados
            </h2>

            <p className="text-muted-foreground mb-10">
              Profissionais registrados no sistema SorriSmart.
            </p>

            {loading && (
              <div className="p-6 border rounded-lg bg-muted/20">
                Carregando dentistas...
              </div>
            )}

            {error && (
              <div className="p-6 border border-red-400 text-red-600 rounded-lg">
                {error}
              </div>
            )}

            {!loading && !error && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {dentistas.map((d) => (
                  <div
                    key={d.id}
                    className="p-6 rounded-xl border bg-card shadow-sm hover:shadow-lg transition-all"
                  >
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary mb-4 flex items-center justify-center text-white font-bold">
                      🦷
                    </div>

                    <h3 className="text-lg font-semibold">
                      {d.nome}
                    </h3>

                    <p className="text-sm text-muted-foreground">
                      ID: {d.id}
                    </p>
                  </div>
                ))}

              </div>
            )}
          </div>
        </section>



      <section className="py-20 md:py-32 bg-background">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Características Principais</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Navegue pelas páginas para conhecer mais sobre o projeto acadêmico, o time e a solução desenvolvida na área de odontologia digital.
            </p>
          </div>
          

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-xl border border-border bg-card hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center text-white mb-4">
                <Zap size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Performance Otimizada</h3>
              <p className="text-muted-foreground">
                Desenvolvida com Vite para build rápido e carregamento instantâneo da aplicação.
              </p>
            </div>


            <div className="p-8 rounded-xl border border-border bg-card hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-gradient-to-br from-secondary to-primary rounded-lg flex items-center justify-center text-white mb-4">
                <Code2 size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Código Limpo</h3>
              <p className="text-muted-foreground">
                TypeScript garante segurança de tipos e componentização reutilizável com React.
              </p>
            </div>


            <div className="p-8 rounded-xl border border-border bg-card hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center text-white mb-4">
                <Users size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Responsivo</h3>
              <p className="text-muted-foreground">
                Design mobile-first com suporte completo para tablets e desktops usando TailwindCSS.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32 bg-background border-t border-border">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Stack Tecnológico</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Tecnologias utilizadas no desenvolvimento da aplicação SorriSmart.
            </p>
          </div>

          <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl p-12 border border-border">
  <h2 className="text-3xl font-bold mb-8 text-center">Stack Tecnológico</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { name: "React", img: "/icons/react-svgrepo-com.svg" },
            { name: "Vite", img: "/icons/vite-svgrepo-com.svg" },
            { name: "TypeScript", img: "/icons/typescript-svgrepo-com.svg" },
            { name: "TailwindCSS", img: "/icons/tailwindcss-icon-svgrepo-com.svg" },
            { name: "React Hook Form", img: "/icons/react-hook-form-logo-only.svg" },
            { name: "Wouter", img: "/icons/wouter.svg" },
            { name: "Lucide React", img: "https://lucide.dev/logo.light.svg" },
            { name: "Zod", img: "/icons/zod.svg" },
          ].map((tech, index) => (
            <div
              key={index}
              className="group p-5 rounded-xl border border-border bg-card hover:shadow-xl transition-all flex flex-col items-center gap-3"
            >
              <div>
                <img
                  src={tech.img}
                  alt={tech.name}
                  className="w-6 h-6 object-contain"
                />
              </div>

              <h4 className="font-semibold group-hover:text-primary transition-colors">
                {tech.name}
              </h4>
            </div>
          ))}
          </div>
          </div>
        </div>
      </section>


      <section className="py-20 md:py-32 bg-gradient-to-r from-primary/10 to-secondary/10 border-t border-border">
        <div className="container text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Pronto para explorar?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Navegue pelas páginas para conhecer mais sobre o projeto, o time e a solução desenvolvida.
          </p>
          <Link to="/integrantes" className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors">
            Começar a Exploração <ArrowRight className="ml-2" size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}
