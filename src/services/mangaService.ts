import type { Manga, MangaListResponse } from "../types/common";
import { apiClient, buildQuery } from "./apiClient";

function normalizeManga(manga: Manga): Manga {
  return {
    ...manga,
    genres: Array.isArray(manga.genres) ? manga.genres : [],
  };
}

function normalizeList(response: MangaListResponse): MangaListResponse {
  return {
    ...response,
    items: Array.isArray(response.items) ? response.items.map(normalizeManga) : [],
  };
}

export const mangaService = {
  getFeatured: async () => normalizeManga(await apiClient<Manga>("/api/manga/featured")),
  getTrending: (page = 1, limit = 6) =>
    apiClient<MangaListResponse>(
      `/api/manga${buildQuery({ sort: "popular", page, limit })}`,
    ).then(normalizeList),
  search: (params: {
    query?: string;
    genre?: string;
    status?: string;
    page?: number;
    limit?: number;
  }) => apiClient<MangaListResponse>(`/api/manga${buildQuery({
    search: params.query,
    genre: params.genre,
    status: params.status,
    page: params.page ?? 1,
    limit: params.limit ?? 20,
  })}`).then(normalizeList),
};
