import { useState } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/#home", isExternal: false },
    { name: "Service", path: "/#service", isExternal: false },
    { name: "About", path: "/#about", isExternal: false },
    { name: "Project", path: "/#project", isExternal: false },
    { name: "Contact", path: "/#contact", isExternal: false },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/90">
      <div className="w-[90%] mx-auto py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-bold text-xl text-blue-600">Logo</span>
          <p className="font-bold text-lg">Sputnik</p>
        </div>

        <nav className="hidden md:flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-4xl">
          {navLinks.map((link) =>
            link.isExternal ? (
              <Link
                key={link.name}
                to={link.path}
                className="px-4 py-2 rounded-md cursor-pointer hover:bg-white transition-all text-sm font-medium"
              >
                {link.name}
              </Link>
            ) : (
              <a
                key={link.name}
                href={link.path}
                className="px-4 py-2 rounded-md cursor-pointer hover:bg-white transition-all text-sm font-medium"
              >
                {link.name}
              </a>
            ),
          )}
        </nav>

        <button className="hidden md:block px-4 py-2 bg-[#6D9EFD] text-white rounded-md hover:bg-blue-500 transition-colors">
          <a
            key="get-quote"
            href={`#contact`}
            className="px-4 py-2 rounded-md cursor-pointer transition-colors text-sm font-medium"
          >
            Get Quote
          </a>
        </button>

        <button
          className="md:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white">
          <nav className="flex flex-col px-6 py-4 gap-1">
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="py-3 px-4 rounded-lg hover:bg-gray-100 transition-colors font-medium text-gray-700"
                onClick={() => setMenuOpen(false)}
              >
                {link}
              </a>
            ))}
            <button className="mt-3 w-full py-3 bg-[#6D9EFD] text-white rounded-md hover:bg-blue-500 transition-colors font-medium">
              Get Quote
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
