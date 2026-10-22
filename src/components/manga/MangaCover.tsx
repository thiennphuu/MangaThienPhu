export function MangaCover({ title, image }: { title: string; image: string }) {
  return <div className="manga-cover" role="img" aria-label={title} style={{ backgroundImage: `url(${image})` }} />;
}
