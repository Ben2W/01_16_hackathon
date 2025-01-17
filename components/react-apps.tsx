"use client";

import { getReactApps } from "@/lib/db/actions";
import Link from "next/link";
import { useEffect, useState } from "react";

export function ReactApps() {
  const [apps, setApps] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    async function fetchApps() {
      const fetchedApps = await getReactApps();
      setApps(fetchedApps);
    }
    fetchApps();
  }, []);

  return (
    <div className="flex flex-col gap-2">
      {apps.map((app) => (
        <Link
          key={app.id}
          href={`/react-apps/${app.id}`}
          className="p-2 hover:bg-muted/50 transition-colors cursor-pointer rounded-md"
        >
          <div className="flex flex-col">
            <span className="font-medium">{app.name}</span>
            <span className="text-xs text-muted-foreground">
              Interactive React App
            </span>
          </div>
        </Link>
      ))}
      {apps.length === 0 && (
        <div className="p-2 text-sm text-muted-foreground">
          No React applications available
        </div>
      )}
    </div>
  );
}
