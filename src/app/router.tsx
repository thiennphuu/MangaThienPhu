import type { ViewName } from "../types/common";
import { OverviewPage } from "../pages/Overview/OverviewPage";
import { DiscoverPage } from "../pages/Discover/DiscoverPage";
import { MyLibraryPage } from "../pages/MyLibrary/MyLibraryPage";
import { ReaderPage } from "../pages/Reader/ReaderPage";
import type { Manga } from "../types/common";

export function Router({ view, query, onQueryChange, readerManga, onStartReading, onOpenLibrary }: { view: ViewName; query: string; onQueryChange: (value: string) => void; readerManga: Manga | null; onStartReading: (manga: Manga) => void; onOpenLibrary: () => void }) {
  if (view === "discover") return <DiscoverPage query={query} onQueryChange={onQueryChange} />;
  if (view === "library") return <MyLibraryPage query={query} onQueryChange={onQueryChange} />;
  if (view === "reader" && readerManga) return <ReaderPage manga={readerManga} onBack={onOpenLibrary} />;
  return <OverviewPage onStartReading={onStartReading} onOpenLibrary={onOpenLibrary} />;
}
