"use client";

import { LibraryStats } from "../../features/library/components/LibraryStats";
import { LibraryFilters } from "../../features/library/components/LibraryFilters";
import { LibraryTable } from "../../features/library/components/LibraryTable";
import { useLibrary } from "../../features/library/hooks/useLibrary";

export function MyLibraryPage({ query = "", onQueryChange = () => {} }: { query?: string; onQueryChange?: (value: string) => void }) {
  useLibrary(query);
  return <div className="content-wrap"><p className="eyebrow">My library</p><h1>Your reading collection.</h1><p className="subtitle">Keep track of your progress and never lose your place.</p><LibraryStats /><LibraryFilters query={query} onQueryChange={onQueryChange} /><LibraryTable /></div>;
}

export default MyLibraryPage;
