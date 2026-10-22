export type ViewName = "overview" | "discover" | "library" | "reader";

export type Manga = {
  title: string;
  genres: string[];
  chapters: string;
  progress?: number;
  currentChapter?: number;
  currentPage?: number;
  rating?: string;
  image: string;
};
