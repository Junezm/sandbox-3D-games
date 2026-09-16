import { SignInButton, SignUpButton, Show, UserButton } from "@clerk/nextjs"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"

export default function Page() {
  return (
    <Empty className="relative flex min-h-svh">
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
    </Empty>
  )
}
