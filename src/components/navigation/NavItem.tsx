"use client";

import type { ReactNode } from "react";
import type { ViewName } from "../../types/common";

export function NavItem({ label, icon, view, active, onNavigate }: { label: string; icon: ReactNode; view: ViewName; active: boolean; onNavigate: (view: ViewName) => void }) {
  return <button className={`nav-item ${active ? "active" : ""}`} onClick={() => onNavigate(view)}><span>{icon}</span>{label}</button>;
}
