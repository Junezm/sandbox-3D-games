import { desc, eq } from "drizzle-orm"
import { auth } from "@clerk/nextjs/server"

import { db } from "@/db"
import { games } from "@/db/schema"

export type Game = typeof games.$inferSelect

export async function listGames() {
  const { orgId } = await auth()

  if (!orgId) {
    return []
  }

  return db
    .select()
    .from(games)
    .where(eq(games.orgId, orgId))
    .orderBy(desc(games.updatedAt))
}
