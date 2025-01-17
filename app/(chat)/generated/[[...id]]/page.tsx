import { getGeneratedReactAppById } from "@/lib/db/queries";

export default async function GeneratedApp({
  params,
}: {
  params: { id?: string[] };
}) {
  const id = params.id;
  const catchAll = id?.join("/");
  if (!catchAll) {
    return <div>No id provided</div>;
  }

  return (
    <iframe className="h-screen w-full" src={`/api/generated/${catchAll}`} />
  );
}
