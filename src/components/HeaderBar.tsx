import { clsx } from "clsx";
import { NavLink, Link } from "react-router-dom";

const navItems = [
  { to: "/search", label: "Search" },
  { to: "/my_favourites", label: "Favourites" },
];

export function HeaderBar() {
  return (
    <header className="bg-surface-container theme-header">
      <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 md-headline text-primary hover:text-primary/80 transition-colors cursor-pointer"
          aria-label="Go to home"
        >
          <span className="text-2xl" aria-hidden="true">🦴</span>
          <span className="font-semibold tracking-tight">CardTrader Zero Tracker</span>
        </Link>
        <nav className="flex gap-1">
          {navItems.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={clsx(
                "px-3 py-1.5 rounded-lg text-sm font-medium transition-colors",
                "text-on-surface-variant hover:text-primary hover:bg-primary/5",
                "data-[active=true]:bg-primary/10 data-[active=true]:text-primary data-[active=true]:font-semibold",
              )}
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}