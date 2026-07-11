import { ArrowRight } from "lucide-react"
import Link from "next/link"

import { cn } from "@/lib/utils"

type InteractiveHoverButtonProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "onClick"
> & {
  // When set, renders a Link instead of a button — nesting a <button>
  // inside a <Link> is invalid HTML.
  href?: string
  onClick?: React.MouseEventHandler<HTMLElement>
}

export function InteractiveHoverButton({
  children,
  className,
  href,
  onClick,
  ...props
}: InteractiveHoverButtonProps) {
  const classes = cn(
    "group bg-background relative w-auto cursor-pointer overflow-hidden rounded-full border p-2 px-6 text-center font-semibold",
    className
  )

  const content = (
    <>
      <div className="flex items-center justify-center gap-2">
        <div className="bg-primary h-2 w-2 rounded-full transition-all duration-300 group-hover:scale-[100.8]"></div>
        <span className="inline-block transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0">
          {children}
        </span>
      </div>
      <div className="text-primary-foreground absolute top-0 z-10 flex h-full w-full translate-x-12 items-center justify-center gap-2 opacity-0 transition-all duration-300 group-hover:-translate-x-5 group-hover:opacity-100">
        <span>{children}</span>
        <ArrowRight />
      </div>
    </>
  )

  if (href) {
    return (
      <Link href={href} className={cn("inline-block", classes)} onClick={onClick}>
        {content}
      </Link>
    )
  }

  return (
    <button className={classes} onClick={onClick} {...props}>
      {content}
    </button>
  )
}
