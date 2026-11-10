
import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'

interface FooterProps {
  theme?: 'light' | 'dark'
}

const socialLinks = [
  {
    label: 'INSTAGRAM',
    href: 'https://www.instagram.com/odd.moscow/',
  },
  {
    label: 'TELEGRAM',
    href: 'https://t.me/odd_clothes',
  },
]

export default function Footer({
  theme = 'light',
}: FooterProps) {
  const isDark = theme === 'dark'

  const linkClass =
    "inline-flex items-center gap-1 font-['Barlow_Condensed'] " +
    'text-[13px] font-semibold uppercase tracking-wide ' +
    'transition-opacity duration-200 hover:opacity-50'

  return (
    <footer
      className={
        "w-full font-['Barlow_Condensed'] " +
        (isDark
          ? 'bg-black text-white'
          : 'bg-white text-black')
      }
    >
      <div
        className={
          'mx-auto max-w-6xl border-t px-5 pb-7 pt-9 sm:px-8 sm:pb-9 sm:pt-12 ' +
          (isDark
            ? 'border-neutral-700'
            : 'border-neutral-300')
        }
      >
        {/* BRAND */}
        <div>
          <div className="text-[30px] font-bold uppercase leading-none tracking-tight sm:text-[36px]">
            ODD MOSCOW
          </div>

          <p
            className={
              'mt-3 text-[12px] font-medium uppercase tracking-wide ' +
              (isDark
                ? 'text-neutral-400'
                : 'text-neutral-600')
            }
          >
            WEAR WHAT MOVES YOU.
          </p>
        </div>

        {/* ALL LINKS IN ONE ROW */}
        <nav
          aria-label="Footer navigation"
          className={
            'mt-9 flex flex-wrap items-center gap-x-7 gap-y-4 border-t pt-6 sm:mt-10 ' +
            (isDark
              ? 'border-neutral-800'
              : 'border-neutral-200')
          }
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

          <span className="font-['Barlow_Condensed'] text-[13px] font-semibold uppercase tracking-wide">
            FAQ
          </span>

          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              {social.label}
              <ArrowUpRight size={14} strokeWidth={1.5} />
            </a>
          ))}
        </nav>

        {/* COPYRIGHT */}
        <div
          className={
            'mt-10 flex flex-wrap items-center justify-between gap-3 ' +
            'text-[11px] font-medium uppercase tracking-wide ' +
            (isDark
              ? 'text-neutral-500'
              : 'text-neutral-600')
          }
        >
          <span>© ODD PROJECT 2026</span>
          <span>MOSCOW</span>
        </div>
      </div>
    </footer>
  )
}
