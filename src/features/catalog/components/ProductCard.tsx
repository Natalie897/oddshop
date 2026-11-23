
import { useState } from 'react'
import type { Product } from '../../../types/product'

interface ProductCardProps {
  product: Product
  onClick?: () => void
}

export function ProductCard({
  product,
  onClick,
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)

const primaryImage =
  product.images[0] ?? `/images/products/detail/${product.id}.png`

const hoverImage = product.images[2] ?? primaryImage

const image = isHovered ? hoverImage : primaryImage

  return (
    <article className="w-full text-center">
      <button
        type="button"
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="block w-full cursor-pointer text-center"
      >
        <div className="flex aspect-[450/458] w-full items-center justify-center overflow-hidden bg-white">
          <img
            src={image}
            alt={product.name}
            className="h-full w-full scale-[0.90] object-contain transition-transform duration-300 hover:scale-[0.94]"
          />
        </div>

        <div className="mt-3 flex flex-col items-center text-center">
          <h2 className="font-['Barlow_Condensed'] text-[15px] font-bold uppercase leading-tight">
            {product.name}
          </h2>

          <p className="mt-1 font-['Barlow_Condensed'] text-[13px] font-medium uppercase leading-tight">
            {product.price === null
              ? 'PRICE TBC'
              : product.price.toLocaleString('ru-RU') + ' ₽'}
          </p>

          {product.sku && (
            <p className="mt-2 font-['Barlow_Condensed'] text-[10px] uppercase tracking-[1.2px] text-neutral-500">
              {product.sku}
            </p>
          )}
        </div>
      </button>
    </article>
  )
}
