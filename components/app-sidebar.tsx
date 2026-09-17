"use client"

import { OrganizationSwitcher, UserButton } from "@clerk/nextjs"
import { usePathname } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Coins, MessageSquareIcon, SquarePen } from "lucide-react"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"
import type { Game } from "@/lib/games/queries"

function GameButton({
  game,
  isCollapsed,
}: {
  game: Game
  isCollapsed: boolean
}) {
  const button = (
    <SidebarMenuButton tooltip={game.title}>
      <MessageSquareIcon />
      <span>{game.title}</span>
    </SidebarMenuButton>
  )

  if (!isCollapsed) {
    return <SidebarMenuItem>{button}</SidebarMenuItem>
  }

  return (
    <SidebarMenuItem>
      <Popover>
        <PopoverTrigger render={button} />
        <PopoverContent align="start" side="right">
          <Link href={`/games/${game.id}`}>{game.title}</Link>
        </PopoverContent>
      </Popover>
    </SidebarMenuItem>
  )
}

export function AppSidebar({ games }: { games: Game[] }) {
  const pathname = usePathname()
  const { state } = useSidebar()
  const isCollapsed = state === "collapsed"

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="flex-row items-center">
        {!isCollapsed && (
          <>
            <Image
              src="/logo.svg"
              alt="Sandbox"
              width={20}
              height={20}
              priority
              className="size-5"
            />
            <span className="font-logo text-base">Sandbox</span>
          </>
        )}
        <SidebarTrigger className="ml-auto" />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  render={<Link href="/" />}
                  isActive={pathname === "/"}
                  tooltip="New game"
                >
                  <SquarePen />
                  <span>New game</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Recents</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {games.length > 0 ? (
                games.map((game) => (
                  <GameButton
                    key={game.id}
                    game={game}
                    isCollapsed={isCollapsed}
                  />
                ))
              ) : (
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Your games will live here.">
                    <MessageSquareIcon />
                    <span>Your games will live here.</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Credits">
              <Coins />
              <span>Credits</span>
            </SidebarMenuButton>
            <SidebarMenuBadge>$4.20</SidebarMenuBadge>
          </SidebarMenuItem>
        </SidebarMenu>
        <div className="flex items-center justify-between">
          {!isCollapsed && <OrganizationSwitcher />}
          <UserButton />
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
