"use server";

import { revalidatePath } from "next/cache";
import {
  getGeneratedReactApps,
  getGeneratedReactAppById,
  saveGeneratedReactApp,
} from "./queries";

export async function getReactApps() {
  const apps = await getGeneratedReactApps();
  return apps;
}

export async function getReactAppById(id: string) {
  const [app] = await getGeneratedReactAppById({ id });
  return app;
}

export async function createReactApp({
  id,
  name,
  rawReactApp,
}: {
  id: string;
  name: string;
  rawReactApp: string;
}) {
  await saveGeneratedReactApp({ id, name, rawReactApp });
  revalidatePath("/react-apps");
}
