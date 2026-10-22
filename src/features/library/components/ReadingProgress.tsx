export function ReadingProgress({ value }: { value: number }) {
  return <div className="reading-progress"><div><i style={{ width: `${value}%` }} /></div><small>{value}%</small></div>;
}
