
import { Menu } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useCartStore } from '../../features/cart/store/useCartStore'

interface HeaderProps {
  onMenuClick: () => void
  onCartClick: () => void
  theme?: 'light' | 'dark'
}

export default function Header({
  onMenuClick,
  onCartClick,
  theme = 'light',
}: HeaderProps) {
  const itemCount = useCartStore((state) =>
    state.items.reduce(
      (total, item) => total + item.quantity,
      0
    )
  )

  const isDark = theme === 'dark'

  return (
    <header
      className={`relative h-28 w-full ${
        isDark
          ? 'bg-black text-white'
          : 'bg-white text-black'
      }`}
    >
      {/* ODD logo */}
      <div className="absolute left-1/2 top-3 flex -translate-x-1/2 flex-col items-center">
        <Link
          to="/"
          aria-label="ODD Clothes - Home"
          className="flex flex-col items-center text-inherit no-underline"
        >
          <span className="text-4xl font-black lowercase leading-none tracking-tighter">
            odd.
          </span>

          <span className="text-sm font-bold tracking-tight">
            Clothes
          </span>
        </Link>

        {/* Cart counter */}
        <button
          type="button"
          onClick={onCartClick}
          aria-label={`Open cart with ${itemCount} items`}
          className="mt-2 whitespace-nowrap text-xs font-bold uppercase tracking-wider hover:opacity-60"
        >
          CART ( {itemCount} )
        </button>
      </div>

      {/* Mobile menu button */}
      <button
        type="button"
        onClick={onMenuClick}
        aria-label="Open menu"
        className="absolute right-5 top-5 p-2 transition-opacity hover:opacity-60 sm:right-8"
      >
        <Menu size={27} strokeWidth={1.7} />
      </button>
    </header>
  )
}
