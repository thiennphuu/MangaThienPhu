"use client";

import { LibraryStats } from "../../features/library/components/LibraryStats";
import { LibraryFilters } from "../../features/library/components/LibraryFilters";
import { LibraryTable } from "../../features/library/components/LibraryTable";
import { useLibrary } from "../../features/library/hooks/useLibrary";

export function MyLibraryPage({ query = "", onQueryChange = () => {} }: { query?: string; onQueryChange?: (value: string) => void }) {
  const library = useLibrary(query);
  return <div className="content-wrap"><p className="eyebrow">My library</p><h1>Your reading collection.</h1><p className="subtitle">Keep track of your progress and never lose your place.</p><LibraryStats stats={library.data?.stats} /><LibraryFilters query={query} onQueryChange={onQueryChange} /><div className={library.loading ? "resource-state" : ""}>{library.error ? "Unable to load your library." : null}</div><LibraryTable items={library.data?.items ?? []} /></div>;
}

export default MyLibraryPage;
