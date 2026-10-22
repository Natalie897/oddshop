
import { useState } from 'react'
import type { Product } from '../../../types/product'
import { useCartStore } from '../../cart/store/useCartStore'

interface ProductPageProps {
  product: Product
  onBack?: () => void
}

export function ProductPage({ product, onBack }: ProductPageProps) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [openSection, setOpenSection] = useState<string | null>(null)
  const [addedToBag, setAddedToBag] = useState(false)

  const addItem = useCartStore((state) => state.addItem)

  const sizes = product.sizes ?? []

  const requiresSize = sizes.length > 1

  const sizeForCart =
    sizes.length === 1
      ? sizes[0]
      : selectedSize ?? undefined

  const isTshirt = product.category === 't-shirts'
  const isCap = product.category === 'caps'

  const detailImage = `/images/products/detail/${product.id}.png`

  const canAddToBag =
    product.price !== null &&
    (!requiresSize || selectedSize !== null)

  function toggleSection(section: string) {
    setOpenSection((current) =>
      current === section ? null : section
    )
  }

  function handleAddToBag() {
    if (!canAddToBag) return

    addItem(product, sizeForCart)
    setAddedToBag(true)
  }

  function handleSelectSize(size: string) {
    setSelectedSize(size)
    setAddedToBag(false)
  }

  return (
    <main className="min-h-[calc(100vh-112px)] bg-black text-white">
      <div className="mx-auto max-w-[1440px] px-5 pb-12 pt-5 md:px-9 lg:pb-14 lg:pt-7">
        <button
          type="button"
          onClick={onBack}
          className="cursor-pointer font-['Barlow_Condensed'] text-xs uppercase text-neutral-400 transition-colors hover:text-white"
        >
          ← BACK TO SHOP
        </button>

        <div className="mt-8 grid grid-cols-1 items-center gap-8 lg:mt-10 lg:grid-cols-[1fr_1.65fr_1fr] lg:gap-6">
          {/* Левая колонка */}
          <section className="font-['Barlow_Condensed'] lg:self-center">
            <h1 className="text-[22px] font-bold uppercase leading-tight">
              {product.name}
            </h1>

            <div className="mt-8 lg:mt-11">
              <p className="text-[16px] font-bold uppercase leading-tight">
                A PIECE FOR MOVEMENT.
                <br />
                FOR THE CLASS, FOR THE STREET,
                <br />
                FOR EVERYWHERE BETWEEN.
              </p>

              <p className="mt-7 max-w-[250px] text-[13px] leading-snug text-neutral-300 lg:mt-9">
                {product.description ??
                  'Designed for the ODD community. Product details and measurements will be added after the final shoot.'}
              </p>
            </div>

            <div className="mt-10 lg:mt-12">
              <h2 className="mb-3 text-[14px] font-bold uppercase">
                DETAILS / CARE
              </h2>

              <ul className="list-disc pl-4 text-[13px] uppercase leading-relaxed">
                {isTshirt ? (
                  <>
                    <li>COTTON T-SHIRT</li>
                    <li>PRINTED GRAPHIC</li>
                    <li>SIZE GUIDE TO FOLLOW</li>
                  </>
                ) : isCap ? (
                  <>
                    <li>ODD CAP</li>
                    <li>ONE SIZE</li>
                    <li>CARE INSTRUCTIONS TO FOLLOW</li>
                  </>
                ) : (
                  <>
                    <li>ODD CLOTHES MERCH</li>
                    <li>PRODUCT DETAILS TO FOLLOW</li>
                    <li>CARE INSTRUCTIONS TO FOLLOW</li>
                  </>
                )}
              </ul>
            </div>
          </section>

          {/* Центральная фотография */}
          <section className="relative flex min-h-[290px] items-center justify-center overflow-hidden sm:min-h-[360px] lg:min-h-[430px]">
            <img
              key={product.id}
              src={detailImage}
              alt={product.name}
              className="relative h-auto w-[90%] max-w-[470px] object-contain"
              style={{
                filter: [
                  'drop-shadow(1px 0 0 rgba(160,160,160,0.65))',
                  'drop-shadow(-1px 0 0 rgba(160,160,160,0.65))',
                  'drop-shadow(0 1px 0 rgba(160,160,160,0.65))',
                  'drop-shadow(0 -1px 0 rgba(160,160,160,0.65))',
                  'drop-shadow(0 0 5px rgba(150,150,150,0.22))',
                ].join(' '),
              }}
            />
          </section>

          {/* Правая колонка — покупка */}
          <section className="font-['Barlow_Condensed'] lg:self-center">
            <p className="text-right text-[14px] font-bold uppercase">
              {product.price === null
                ? 'PRICE TBC'
                : `${product.price.toLocaleString('ru-RU')} ₽`}
            </p>

            <button
              type="button"
              onClick={handleAddToBag}
              disabled={!canAddToBag}
              className="mt-3 w-full bg-[#e8eaed] px-5 py-4 text-[17px] font-bold uppercase text-black transition-colors hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              {addedToBag ? 'ADDED TO BAG ✓' : 'ADD TO BAG'}
            </button>

            {sizes.length === 1 && (
              <div className="mt-7">
                <p className="text-[14px] font-bold uppercase">
                  SIZE: {sizes[0]}
                </p>
              </div>
            )}
            {requiresSize && (
              <div className="mt-7">
                <p className="mb-2 text-[14px] font-bold uppercase">
                  SIZE
                </p>

                <div className="flex flex-wrap gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => handleSelectSize(size)}
                      aria-pressed={selectedSize === size}
                      className={`min-w-[44px] cursor-pointer border px-3 py-3 text-[14px] font-bold uppercase transition-colors ${
                        selectedSize === size
                          ? 'border-white bg-white text-black'
                          : 'border-neutral-500 bg-[#e8eaed] text-black hover:bg-white'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <p className="mt-8 text-center text-[12px] font-bold uppercase tracking-wide text-neutral-500">
              {product.price === null
                ? 'PRICE WILL BE CONFIRMED BEFORE LAUNCH'
                : 'NEXT STEP / ORDER IN TELEGRAM BOT'}
            </p>

            <div className="mt-8 border-t border-neutral-500">
              <button
                type="button"
                onClick={() => toggleSection('shipping')}
                aria-expanded={openSection === 'shipping'}
                className="flex w-full cursor-pointer items-center justify-between border-b border-neutral-500 py-4 text-left text-[14px] font-bold uppercase"
              >
                SHIPPING + RETURNS
                <span>{openSection === 'shipping' ? '−' : '+'}</span>
              </button>

              {openSection === 'shipping' && (
                <p className="py-4 text-[13px] text-neutral-300">
                  Shipping and returns information will be added before launch.
                </p>
              )}

              <button
                type="button"
                onClick={() => toggleSection('size')}
                aria-expanded={openSection === 'size'}
                className="flex w-full cursor-pointer items-center justify-between border-b border-neutral-500 py-4 text-left text-[14px] font-bold uppercase"
              >
                SIZE GUIDE
                <span>{openSection === 'size' ? '−' : '+'}</span>
              </button>

              {openSection === 'size' && (
                <p className="py-4 text-[13px] text-neutral-300">
                  Size measurements will be added before launch.
                </p>
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
