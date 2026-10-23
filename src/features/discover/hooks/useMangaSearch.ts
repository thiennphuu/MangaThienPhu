import { useCallback } from "react";
import { useDebounce } from "../../../hooks/useDebounce";
import { useApiResource } from "../../../hooks/useApiResource";
import { mangaService } from "../../../services/mangaService";

export function useMangaSearch(query: string) {
  const debouncedQuery = useDebounce(query);
  const loader = useCallback(() => mangaService.search({ query: debouncedQuery }), [debouncedQuery]);
  return useApiResource(loader);
}
