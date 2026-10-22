import { RightOutlined } from "@ant-design/icons";
import { Button } from "../../../components/ui/Button";

export function FeaturedManga() {
  return <section className="discover-feature"><div className="discover-feature-copy"><p className="eyebrow">Featured</p><h2>Eclipse City</h2><div className="tag-row"><span>Sci-Fi</span><span>Mystery</span></div><p>In a city where the sun never rises, a detective uncovers a conspiracy that could destroy the last hope for humanity.</p><Button variant="primary">View details <RightOutlined /></Button></div><div className="discover-feature-art" /></section>;
}
