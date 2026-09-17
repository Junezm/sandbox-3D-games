"use server"

import { revalidatePath } from "next/cache"
import { auth } from "@clerk/nextjs/server"

import { db } from "@/db"
import { games } from "@/db/schema"

export async function createGame(formData: FormData) {
  const { orgId } = await auth()

  if (!orgId) {
    throw new Error("An organization is required to create a game")
  }

  const title = String(formData.get("title") ?? "").trim()

  if (!title) {
    throw new Error("A title is required to create a game")
  }

  await db.insert(games).values({ orgId, title })

  revalidatePath("/", "layout")
}
