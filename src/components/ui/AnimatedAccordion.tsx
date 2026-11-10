import { useId, useState, type ReactNode } from 'react'

interface AnimatedAccordionProps {
  title: string
  children: ReactNode
  open?: boolean
  onToggle?: () => void
  variant?: 'faq' | 'product'
}

export default function AnimatedAccordion({
  title,
  children,
  open,
  onToggle,
  variant = 'faq',
}: AnimatedAccordionProps) {
  const [localOpen, setLocalOpen] = useState(false)
  const contentId = useId()

  const isOpen = open ?? localOpen
  const isProduct = variant === 'product'

  function handleToggle() {
    if (onToggle) {
      onToggle()
    } else {
      setLocalOpen((current) => !current)
    }
  }

  return (
    <div className="border-b border-neutral-600">
      <button
        type="button"
        onClick={handleToggle}
        aria-expanded={isOpen}
        aria-controls={contentId}
        className={`flex w-full cursor-pointer items-center justify-between gap-5 text-left font-['Barlow_Condensed'] font-bold uppercase transition-colors hover:text-neutral-300 focus-visible:outline-2 focus-visible:outline-white ${
          isProduct ? 'py-4 text-[14px]' : 'py-6 text-lg'
        }`}
      >
        <span>{title}</span>

        <span
          aria-hidden="true"
          className="shrink-0 text-xl leading-none"
        >
          {isOpen ? '−' : '+'}
        </span>
      </button>

      <div
        id={contentId}
        aria-hidden={!isOpen}
        inert={!isOpen}
        className={`grid transition-[grid-template-rows] duration-300 ease-in-out motion-reduce:transition-none ${
          isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="min-h-0 overflow-hidden">
          <div
            className={`text-neutral-300 ${
              isProduct
                ? 'pb-4 text-[13px] leading-6'
                : 'pb-6 text-sm leading-7'
            }`}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}