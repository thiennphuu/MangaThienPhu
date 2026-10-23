import { MangaCard } from "../../../components/manga/MangaCard";
import type { Manga } from "../../../types/common";

export function TrendingManga({ items }: { items: Manga[] }) {
  return <section><div className="section-heading"><h2>Trending this week</h2><a>View all →</a></div><div className="trending-grid">{items.map((manga) => <MangaCard key={manga.id} manga={manga} />)}</div></section>;
}
