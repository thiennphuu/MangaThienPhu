import { useMemo } from "react";
import { useDebounce } from "../../../hooks/useDebounce";

export function useMangaSearch(query: string) {
  const debouncedQuery = useDebounce(query);
  return useMemo(() => debouncedQuery.trim().toLowerCase(), [debouncedQuery]);
}
