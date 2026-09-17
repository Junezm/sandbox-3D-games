import { ArrowUp, ChevronDown, Grip } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
} from "@/components/ui/input-group"
import { createGame } from "@/lib/games/actions"

const models = ["Kimi K3", "Kimi K2", "DeepSeek V4", "GPT-5"]

export function ChatComposer() {
  return (
    <form action={createGame}>
      <InputGroup>
        <InputGroupTextarea
          name="title"
          placeholder="Describe the game you want to build…"
          rows={2}
        />
        <InputGroupAddon align="block-end">
          <DropdownMenu>
            <DropdownMenuTrigger render={<InputGroupButton size="sm" />}>
              <Grip />
              Kimi K3
              <ChevronDown />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {models.map((model) => (
                <DropdownMenuItem key={model}>{model}</DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <InputGroupButton
            type="submit"
            className="ml-auto rounded-full bg-orange-600 text-primary-foreground hover:bg-orange-600/90"
            size="icon-sm"
          >
            <ArrowUp />
            <span className="sr-only">Send</span>
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </form>
  )
}
