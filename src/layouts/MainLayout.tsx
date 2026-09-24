import { clsx } from "clsx";
import { NavLink, Outlet } from "react-router-dom";

const navItems = [
  { to: "/search", label: "Search" },
  { to: "/my_favourites", label: "Favourites" },
];

export function MainLayout() {
  return (
    <div className="min-h-screen bg-background text-on-surface font-sans flex flex-col">
      <header className="bg-surface-container shadow-elev-1 border-b border-outline/20">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
          <h1 className="md-headline text-primary">CardTrader Zero Tracker</h1>
          <nav className="flex gap-1">
            {navItems.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={clsx(
                  "px-3 py-1.5 rounded-lg text-sm font-medium transition-colors",
                  "text-on-surface-variant hover:text-primary",
                  "data-[active=true]:bg-primary/10 data-[active=true]:text-primary",
                )}
              >
                {label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 pb-12 pt-8">
        <Outlet />
      </main>

      <footer className="text-center text-xs text-on-surface-variant pb-8 mt-auto">
        Data sourced from CardTrader API v2
      </footer>
    </div>
  );
}
