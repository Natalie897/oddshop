interface FooterProps {
  theme?: 'light' | 'dark'
}

const footerItems = [
  'ALL PRODUCTS',
  'CAMPAIGNS',
  'OUR STORY',
  'FAQ',
  'INSTAGRAM ↗',
]

export default function Footer({
  theme = 'light',
}: FooterProps) {
  const isDark = theme === 'dark'

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
        <div className="text-3xl font-black uppercase tracking-tighter sm:text-4xl">
          ODD MOSCOW
        </div>

        {/* Разделы сайта */}
        <div className="mt-7 flex flex-wrap gap-x-6 gap-y-4">
          {footerItems.map((item) => (
            <span
              key={item}
              className="text-xs font-bold uppercase tracking-wide"
            >
              {item}
            </span>
          ))}
        </div>

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