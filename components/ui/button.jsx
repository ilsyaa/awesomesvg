import { cn } from "@/lib/utils";

export default function Button ({ children, className, ...props }) {
  return (
    <button {...props} className={cn('inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-cat-900 dark:bg-white text-white dark:text-cat-900 hover:opacity-95 h-9 px-4 py-2 cursor-pointer', className)}>{children}</button>
  )
}