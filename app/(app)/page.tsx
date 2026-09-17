import {
  SignInButton,
  SignUpButton,
  Show,
  UserButton,
  OrganizationSwitcher,
} from "@clerk/nextjs"
import { auth } from "@clerk/nextjs/server"
import Image from "next/image"
import {
  CarFront,
  Crosshair,
  Gamepad2,
  Pickaxe,
  Plane,
  Swords,
  Zap,
} from "lucide-react"

import { ChatComposer } from "@/components/chat-composer"
import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"

const suggestions = [
  { icon: Pickaxe, label: "Voxel survival" },
  { icon: Swords, label: "Ink samurai duel" },
  { icon: Zap, label: "Comic-book firefight" },
  { icon: Plane, label: "Realistic battlefield" },
  { icon: Crosshair, label: "Fight-first shooter" },
  { icon: CarFront, label: "Jungle expedition drive" },
  { icon: Gamepad2, label: "Sunny kingdom platformer" },
]

export default async function Page() {
  await auth.protect({ unauthenticatedUrl: "/signed-in" })

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6">
      <Empty className="flex-none">
        <div className="absolute top-4 right-4 flex items-center gap-2">
          <Show when="signed-out">
            <SignInButton mode="modal">
              <Button variant="ghost">Sign in</Button>
            </SignInButton>
            <SignUpButton mode="modal">
              <Button>Sign up</Button>
            </SignUpButton>
          </Show>
          <Show when="signed-in">
            <UserButton />
          </Show>
        </div>
        <EmptyHeader>
          <EmptyMedia>
            <Image src="/logo.svg" alt="Logo" width={48} height={48} priority />
          </EmptyMedia>
          <EmptyTitle className="text-2xl">
            What should we build today?
          </EmptyTitle>
          <EmptyDescription>
            Build your own racers, shooters, puzzles and whole worlds using your
            own words. If you can describe it, you can play it.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent className="max-w-xl gap-4">
          <ChatComposer />
          <div className="flex flex-wrap justify-center gap-2">
            {suggestions.map((suggestion) => (
              <Button
                key={suggestion.label}
                variant="outline"
                className="rounded-full"
              >
                <suggestion.icon />
                {suggestion.label}
              </Button>
            ))}
          </div>
        </EmptyContent>
      </Empty>
      <UserButton />
      <OrganizationSwitcher />
    </div>
  )
}
