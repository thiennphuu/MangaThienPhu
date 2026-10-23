import type { Manga, MangaListResponse } from "../types/common";
import { apiClient, buildQuery } from "./apiClient";

export const mangaService = {
  getFeatured: () => apiClient<Manga>("/api/manga/featured"),
  getTrending: (page = 1, limit = 6) =>
    apiClient<MangaListResponse>(
      `/api/manga${buildQuery({ sort: "popular", page, limit })}`,
    ),
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
  })}`),
};
