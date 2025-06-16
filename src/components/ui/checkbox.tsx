import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { CheckIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
  data-slot="checkbox"
  className={cn(
    "peer size-4 shrink-0 rounded-[4px] border border-[#807B7B] bg-transparent transition-shadow outline-none transform-none focus-visible:outline-none focus-visible:ring-0 data-[state=checked]:bg-[#807B7B] data-[state=checked]:border-[#807B7B] data-[state=checked]:text-white",
    className
  )}
  {...props}
>
  <CheckboxPrimitive.Indicator className="flex items-center justify-center text-current">
    <CheckIcon className="size-3.5" />
  </CheckboxPrimitive.Indicator>
</CheckboxPrimitive.Root>

  )
}

export { Checkbox }
