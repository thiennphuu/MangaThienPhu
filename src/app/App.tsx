"use client";

import { useState } from "react";
import { MainLayout } from "../layouts/MainLayout";
import { Router } from "./router";
import { useDashboardNavigation } from "../hooks/useDashboardNavigation";
import type { Manga } from "../types/common";
import { useAuth } from "../features/auth/AuthContext";
import { LoginPage } from "../page-components/Login/LoginPage";
import { RegisterPage } from "../page-components/Register/RegisterPage";

export default function App() {
  const { isAuthenticated, isLoading } = useAuth();
  const [query, setQuery] = useState("");
  const [readerManga, setReaderManga] = useState<Manga | null>(null);
  const [authView, setAuthView] = useState<"login" | "register">("login");
  const { view, openView } = useDashboardNavigation();
  const startReading = (manga: Manga) => {
    setReaderManga(manga);
    openView("reader");
  };
  if (isLoading) return null;
  if (!isAuthenticated) {
    return authView === "login" ? (
      <LoginPage onSwitchToRegister={() => setAuthView("register")} />
    ) : (
      <RegisterPage onSwitchToLogin={() => setAuthView("login")} />
    );
  }
  return <MainLayout view={view} query={query} onQueryChange={setQuery} onNavigate={openView}><Router view={view} query={query} onQueryChange={setQuery} readerManga={readerManga} onStartReading={startReading} onOpenLibrary={() => openView("library")} /></MainLayout>;
}
