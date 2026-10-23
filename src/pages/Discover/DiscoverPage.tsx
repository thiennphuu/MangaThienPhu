"use client";

import { useMangaSearch } from "../../features/discover/hooks/useMangaSearch";
import { MangaSearchBar } from "../../features/discover/components/MangaSearchBar";
import { MangaFilters } from "../../features/discover/components/MangaFilters";
import { FeaturedManga } from "../../features/discover/components/FeaturedManga";
import { TrendingManga } from "../../features/discover/components/TrendingManga";
import { ResourceState } from "../../components/ui/ResourceState";

export function DiscoverPage({ query = "", onQueryChange = () => {} }: { query?: string; onQueryChange?: (value: string) => void }) {
  const search = useMangaSearch(query);
  const items = search.data?.items ?? [];
  return <div className="content-wrap"><p className="eyebrow">Discover</p><h1>Find your next obsession.</h1><p className="subtitle">Explore new worlds, meet unforgettable characters, and find manga that speaks to you.</p><MangaSearchBar query={query} onChange={onQueryChange} /><MangaFilters /><ResourceState loading={search.loading} error={search.error} empty={!items.length} />{items[0] && <FeaturedManga manga={items[0]} />}<TrendingManga items={items.slice(1)} /></div>;
}

export default DiscoverPage;
