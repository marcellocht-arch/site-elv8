/** Re-monté à chaque navigation : la nouvelle page entre en douceur derrière le rideau. */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
