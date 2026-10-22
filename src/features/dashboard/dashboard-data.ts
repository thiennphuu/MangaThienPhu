import type { Manga } from "../../types/common";

const image = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=700&q=85`;

export const continueReading: Manga[] = [
  {
    title: "The Last Ronin",
    genres: ["Action", "Historical"],
    chapters: "Chapter 42 / 86",
    progress: 54,
    currentChapter: 42,
    currentPage: 18,
    image: image("photo-1534447677768-be436bb09401"),
  },
  {
    title: "Orbit / Zero",
    genres: ["Sci-fi", "Adventure"],
    chapters: "Chapter 18 / 52",
    progress: 35,
    currentChapter: 18,
    currentPage: 7,
    image: image("photo-1614728894747-a83421e2b9c9"),
  },
  {
    title: "Paper Kingdom",
    genres: ["Fantasy", "Drama"],
    chapters: "Chapter 07 / 34",
    progress: 21,
    currentChapter: 7,
    currentPage: 3,
    image: image("photo-1518709268805-4e9042af9f23"),
  },
];

export const featuredManga: Manga = {
  title: "Tokyo After Dark",
  genres: ["Seinen", "Sci-fi", "Mystery"],
  chapters: "68 chapters",
  progress: 0,
  image: image("photo-1519608487953-e999c86e7455"),
};
