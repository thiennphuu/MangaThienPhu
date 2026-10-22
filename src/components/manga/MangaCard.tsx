import type { Manga } from "../../types/common";
import { MangaCover } from "./MangaCover";
import { MangaRating } from "./MangaRating";
import { Button } from "../ui/Button";

export function MangaCard({ manga, onContinue }: { manga: Manga; onContinue?: () => void }) {
  return <article className="manga-card"><MangaCover title={manga.title} image={manga.image} /><div><h3>{manga.title}</h3><p>{manga.genres.join(" · ")}</p>{manga.rating && <MangaRating rating={manga.rating} />}<small>{manga.chapters}</small>{onContinue && <Button onClick={onContinue}>Continue <span aria-hidden="true">→</span></Button>}</div></article>;
}
