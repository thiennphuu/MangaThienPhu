export function ResourceState({
  loading,
  error,
  empty,
}: {
  loading: boolean;
  error: string | null;
  empty: boolean;
}) {
  if (loading) return <div className="resource-state">Loading...</div>;
  if (error) return <div className="resource-state resource-error">Unable to load data. Check the backend connection.</div>;
  if (empty) return <div className="resource-state">No manga found.</div>;
  return null;
}
