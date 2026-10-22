import { DownOutlined } from "@ant-design/icons";
import type { DiscoverFilter } from "../types";

export function MangaFilters() {
  return <><div className="filter-row">{["Genre", "Status", "Format", "Sort by"].map((filter) => <button key={filter}>{filter}<DownOutlined /></button>)}</div><div className="genre-row">{(["Action", "Fantasy", "Sci-Fi", "Romance", "Mystery"] as DiscoverFilter[]).map((genre, index) => <button className={index === 0 ? "selected" : ""} key={genre}>{genre}</button>)}</div></>;
}
