import type { Manga } from "../../../types/common";
import { MangaCard } from "../../../components/manga/MangaCard";

const trending: Manga[] = ["Ashes of Tomorrow", "Moon Eater", "Silent Orbit", "The Glass Kingdom", "Redline Requiem", "Garden of Ghosts"].map((title, index) => ({ title, genres: [["Action", "Drama"], ["Fantasy", "Adventure"], ["Sci-Fi", "Drama"], ["Fantasy", "Romance"], ["Action", "Thriller"], ["Horror", "Supernatural"]][index], chapters: `${68 - index * 4} chapters`, rating: `${(9.2 - index * .2).toFixed(1)}`, image: `https://images.unsplash.com/${["photo-1518709268805-4e9042af9f23", "photo-1534447677768-be436bb09401", "photo-1614728894747-a83421e2b9c9", "photo-1519608487953-e999c86e7455", "photo-1511497584788-876760111969", "photo-1500534623283-312aade485b7"][index]}?auto=format&fit=crop&w=300&q=85` }));

export function TrendingManga() {
  return <section><div className="section-heading"><h2>Trending this week</h2><a>View all →</a></div><div className="trending-grid">{trending.map((manga) => <MangaCard key={manga.title} manga={manga} />)}</div></section>;
}
