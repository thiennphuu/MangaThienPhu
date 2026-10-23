import type { LibraryResponse } from "../../../types/common";

export function LibraryStats({ stats }: { stats?: LibraryResponse["stats"] }) {
  const values = [[stats?.titles ?? "—", "Titles"], [stats?.reading ?? "—", "Reading"], [stats?.completed ?? "—", "Completed"], [stats?.planToRead ?? "—", "Plan to read"]];
  return <div className="library-stats">{values.map(([value, label]) => <div className="library-stat" key={label}><b>{value}</b><span>{label}</span></div>)}</div>;
}
