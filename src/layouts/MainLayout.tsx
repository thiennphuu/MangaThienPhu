import type { ReactNode } from "react";
import type { ViewName } from "../types/common";
import { Sidebar } from "../components/navigation/Sidebar";
import { Topbar } from "../components/navigation/Topbar";

export function MainLayout({ children, view, query, onQueryChange, onNavigate }: { children: ReactNode; view: ViewName; query: string; onQueryChange: (value: string) => void; onNavigate: (view: ViewName) => void }) {
  const pageName = view === "library" ? "My Library" : view === "reader" ? "Reader" : view[0].toUpperCase() + view.slice(1);
  return <main className="dashboard"><Sidebar view={view} onNavigate={onNavigate} /><section className="main-content"><Topbar pageName={pageName} query={query} onQueryChange={onQueryChange} />{children}</section></main>;
}
