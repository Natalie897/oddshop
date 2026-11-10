
import { Link } from 'react-router-dom'

interface FooterProps {
  theme?: 'light' | 'dark'
}

export default function Footer({
  theme = 'light',
}: FooterProps) {
  const isDark = theme === 'dark'

  const linkClass =
    'text-xs font-bold uppercase tracking-wide ' +
    'transition-opacity duration-200 hover:opacity-50'

  return (
    <footer
      className={`w-full ${
        isDark
          ? 'bg-black text-white'
          : 'bg-white text-black'
      }`}
    >
      <div
        className={`mx-auto max-w-6xl border-t px-5 py-9 sm:px-8 ${
          isDark
            ? 'border-neutral-600'
            : 'border-neutral-400'
        }`}
      >
        {/* Название бренда */}
        <div className="font-['Barlow_Condensed'] text-4xl font-extrabold uppercase tracking-tighter sm:text-5xl">
          ODD MOSCOW
        </div>

        {/* Разделы сайта */}
        <nav
          aria-label="Footer navigation"
          className="mt-7 flex flex-wrap gap-x-6 gap-y-4"
        >
          <Link
            to="/"
            className={linkClass}
            onClick={() => window.scrollTo(0, 0)}
          >
            ALL PRODUCTS
          </Link>

          <Link
            to="/campaigns"
            className={linkClass}
            onClick={() => window.scrollTo(0, 0)}
          >
            CAMPAIGNS
          </Link>

          <span className="text-xs font-bold uppercase tracking-wide">
            OUR STORY
          </span>

          <Link
            to="/faq"
            className={linkClass}
            onClick={() => window.scrollTo(0, 0)}
          >
            FAQ
          </Link>

          <Link
            to="/shipping-returns"
            className={linkClass}
            onClick={() => window.scrollTo(0, 0)}
          >
            SHIPPING & RETURNS
          </Link>

          <span className="text-xs font-bold uppercase tracking-wide">
            INSTAGRAM ↗
          </span>
        </nav>

        {/* Нижняя подпись */}
        <div
          className={`mt-12 flex flex-wrap gap-x-3 gap-y-1 text-[10px] uppercase tracking-wide ${
            isDark
              ? 'text-neutral-400'
              : 'text-neutral-500'
          }`}
        >
          <span>© ODD PROJECT 2026</span>
          <span>/</span>
          <span>WEAR WHAT MOVES YOU.</span>
        </div>
      </div>
    </footer>
  )
}
