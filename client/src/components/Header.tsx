import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Integrantes", href: "/integrantes" },
    { label: "Sobre", href: "/sobre" },
    { label: "FAQ", href: "/faq" },
    { label: "Solução", href: "/solucao" },
    { label: "Contato", href: "/contato" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl text-primary">
          <span className="hidden sm:inline">SorriSmart</span>
        </Link>


        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className="px-3 py-2 text-sm font-medium rounded-md transition-colors hover:bg-accent hover:text-accent-foreground text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>


        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-md hover:bg-accent transition-colors">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>


      {isOpen && (
        <nav className="md:hidden border-t border-border bg-background">
          <div className="container py-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 text-sm font-medium rounded-md transition-colors hover:bg-accent hover:text-accent-foreground text-foreground">
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
