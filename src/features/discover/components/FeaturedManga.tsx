import { RightOutlined } from "@ant-design/icons";
import { Button } from "../../../components/ui/Button";
import type { Manga } from "../../../types/common";

export function FeaturedManga({ manga }: { manga: Manga }) {
  return <section className="discover-feature"><div className="discover-feature-copy"><p className="eyebrow">Featured</p><h2>{manga.title}</h2><div className="tag-row">{manga.genres.map((genre) => <span key={genre}>{genre}</span>)}</div><p>{manga.description}</p><Button variant="primary">View details <RightOutlined /></Button></div><div className="discover-feature-art" style={{ backgroundImage: `url(${manga.coverUrl})` }} /></section>;
}
