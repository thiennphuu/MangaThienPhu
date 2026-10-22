"use client";

import { useState } from "react";
import { MainLayout } from "../layouts/MainLayout";
import { Router } from "./router";
import { useDashboardNavigation } from "../hooks/useDashboardNavigation";
import { continueReading } from "../features/dashboard/dashboard-data";
import type { Manga } from "../types/common";

export default function App() {
  const [query, setQuery] = useState("");
  const [readerManga, setReaderManga] = useState<Manga>(continueReading[0]);
  const { view, openView } = useDashboardNavigation();
  const startReading = (manga: Manga) => {
    setReaderManga(manga);
    openView("reader");
  };
  return <MainLayout view={view} query={query} onQueryChange={setQuery} onNavigate={openView}><Router view={view} query={query} onQueryChange={setQuery} readerManga={readerManga} onStartReading={startReading} onOpenLibrary={() => openView("library")} /></MainLayout>;
}
