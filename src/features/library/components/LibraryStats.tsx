export function LibraryStats() {
  return <div className="library-stats">{[["24", "Titles"], ["8", "Reading"], ["11", "Completed"], ["5", "Plan to read"]].map(([value, label]) => <div className="library-stat" key={label}><b>{value}</b><span>{label}</span></div>)}</div>;
}
