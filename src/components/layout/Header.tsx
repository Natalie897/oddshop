import { assetUrl } from '../../utils/assetUrl'

import { Menu } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
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
  const location = useLocation()

  const itemCount = useCartStore((state) =>
    state.items.reduce(
      (total, item) => total + item.quantity,
      0
    )
  )

  const isDark = theme === 'dark'
  const showCart = location.pathname !== '/campaigns'

  return (
    <header
      className={
        'relative z-10 h-[128px] w-full sm:h-[132px] lg:h-28 ' +
        (isDark
          ? 'bg-black text-white'
          : 'bg-white text-black')
      }
    >
      {/* LOGO */}
      <div className="absolute left-1/2 top-4 flex -translate-x-1/2 flex-col items-center lg:top-3">
        <Link
          to="/"
          aria-label="ODD Clothes - Home"
          className="flex flex-col items-center text-inherit no-underline"
        >
          <img
            src={
              isDark
                ? assetUrl("/images/odd-logo-white.png")
                : assetUrl("/images/odd-logo-black.png")
            }
            alt="ODD Clothes"
            className="block h-auto w-[105px] object-contain sm:w-[120px] lg:w-[130px]"
          />
        </Link>

        {/* CART */}
        {showCart && (
          <button
            type="button"
            onClick={onCartClick}
            aria-label={`Open cart with ${itemCount} items`}
            className="mt-3 flex min-h-10 items-center gap-2 font-['Barlow_Condensed'] text-[12px] font-bold uppercase transition-opacity hover:opacity-60 lg:mt-2 lg:min-h-0"
          >
            <span>CART</span>

            <span
              className={
                'flex h-[25px] min-w-[25px] items-center justify-center rounded-full border px-1 text-[11px] ' +
                (isDark
                  ? 'border-white bg-white text-black'
                  : 'border-black bg-black text-white')
              }
            >
              {itemCount}
            </span>
          </button>
        )}
      </div>

      {/* MENU */}
      <button
        type="button"
        onClick={onMenuClick}
        aria-label="Open menu"
        aria-haspopup="dialog"
        className="absolute right-4 top-3 flex h-11 w-11 cursor-pointer items-center justify-center transition-opacity hover:opacity-60 sm:right-7"
      >
        <Menu
          size={27}
          strokeWidth={1.6}
          className="scale-y-[0.72]"
        />
      </button>
    </header>
  )
}
