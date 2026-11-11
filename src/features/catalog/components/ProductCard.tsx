import { assetUrl } from '../../../utils/assetUrl'

import type { Product } from '../../../types/product'

interface ProductCardProps {
  product: Product
  onClick?: () => void
}

export function ProductCard({
  product,
  onClick,
}: ProductCardProps) {
  const image = assetUrl(`/images/products/detail/${product.id}.png`)

  return (
    <article className="min-w-0 w-full text-center">
      <button
        type="button"
        onClick={onClick}
        className="block w-full cursor-pointer text-center"
        aria-label={`View ${product.name}`}
      >
        <div className="flex aspect-[450/458] w-full items-center justify-center overflow-hidden bg-white">
          <img
            src={image}
            alt={product.name}
            loading="lazy"
            className="h-full w-full scale-[0.92] object-contain transition-transform duration-300 ease-out hover:scale-[0.97] motion-reduce:transition-none"
          />
        </div>

        <div className="mt-5 flex min-w-0 flex-col items-center px-1 text-center md:mt-3">
          <h2 className="font-['Barlow_Condensed'] text-[13px] font-bold uppercase leading-[1.15] sm:text-[14px] md:text-[15px]">
            {product.name}
          </h2>

          <p className="mt-3 font-['Barlow_Condensed'] text-[12px] font-semibold uppercase leading-tight md:mt-1 md:text-[13px]">
            {product.price === null
              ? 'PRICE TBC'
              : product.price.toLocaleString('ru-RU') + ' ₽'}
          </p>

          {product.sku && (
            <p className="mt-2 hidden font-['Barlow_Condensed'] text-[10px] uppercase tracking-[1.2px] text-neutral-500 md:block">
              {product.sku}
            </p>
          )}
        </div>
      </button>
    </article>
  )
}


