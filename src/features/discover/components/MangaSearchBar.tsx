import { SearchOutlined } from "@ant-design/icons";
import { Input } from "../../../components/ui/Input";

export function MangaSearchBar({ query, onChange }: { query: string; onChange: (value: string) => void }) {
  return <div className="feature-search"><SearchOutlined /><Input value={query} onChange={(event) => onChange(event.target.value)} placeholder="Search titles, authors, genres..." /><button aria-label="Search"><SearchOutlined /></button></div>;
}
