import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import helmetIcon from "@/assets/helmet-icon.png";

type NavLink = {
  label: string;
  href: string;
  hoverClass: string;
  activeClass: string;
  to?: string;
};

const navLinks: NavLink[] = [
  { label: "Home", href: "/#home", hoverClass: "hover:text-yellow-400", activeClass: "active:text-green-500 focus:text-green-500" },
  { label: "About", href: "/#about", hoverClass: "hover:text-safety-blue", activeClass: "active:text-safety-blue focus:text-safety-blue" },
  { label: "Services", href: "/#services", hoverClass: "hover:text-purple-400", activeClass: "active:text-purple-400 focus:text-purple-400" },
  { label: "Gallery", href: "/gallery", to: "/gallery", hoverClass: "hover:text-pink-400", activeClass: "active:text-pink-400 focus:text-pink-400" },
  { label: "Contact", href: "/#contact", hoverClass: "hover:text-destructive", activeClass: "active:text-yellow-400 focus:text-yellow-400" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-secondary">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2">
          <img src={helmetIcon} alt="Safety helmet" className="h-14 w-14 object-contain" />
          <div className="flex flex-col leading-tight">
            <span className="font-display text-lg font-extrabold text-primary md:text-xl">
              FC<span className="text-secondary-foreground"> Safety Consultants</span>
            </span>
            <span className="text-[10px] font-semibold text-secondary-foreground/70 tracking-wide uppercase md:text-xs">
              Your Trusted Health &amp; Safety Consultant
            </span>
          </div>
        </Link>
        <button
          onClick={() => setOpen(!open)}
          className="text-secondary-foreground p-2 hover:text-primary transition-colors"
          aria-label="Toggle menu"
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>
      {open && (
        <div className="bg-secondary border-t border-muted/20 pb-4">
          {navLinks.map((link) => {
            const className = `block px-6 py-3 text-secondary-foreground ${link.hoverClass} ${link.activeClass} hover:bg-secondary/80 font-display font-semibold transition-colors`;
            if (link.to) {
              return (
                <Link key={link.href} to={link.to} onClick={() => setOpen(false)} className={className}>
                  {link.label}
                </Link>
              );
            }
            return (
              <a key={link.href} href={link.href} onClick={() => setOpen(false)} className={className}>
                {link.label}
              </a>
            );
          })}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
