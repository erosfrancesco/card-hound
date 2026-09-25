import { Outlet } from "react-router-dom";
import { HeaderBar } from "../components/HeaderBar";

export function MainLayout() {
  return (
    <div className="min-h-screen bg-background text-on-surface font-sans flex flex-col">
      <HeaderBar />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 pb-12 pt-8">
        <Outlet />
      </main>

      <footer className="text-center text-xs text-on-surface-variant pb-8 mt-auto">
        Data sourced from CardTrader API v2
      </footer>
    </div>
  );
}
