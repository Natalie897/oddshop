import { useState } from 'react'
import type { Product } from '../../../types/product'

interface ProductPageProps {
  product: Product
  onBack?: () => void
}

export function ProductPage({ product, onBack }: ProductPageProps) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [openSection, setOpenSection] = useState<string | null>(null)

  const sizes = product.sizes ?? []
  const requiresSize = sizes.length > 0

  const isTshirt = product.category === 't-shirts'
  const isCap = product.category === 'caps'

  const detailImage = `/images/products/detail/${product.id}.png`

  function toggleSection(section: string) {
    setOpenSection((current) =>
      current === section ? null : section
    )
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-[1440px] px-5 pb-16 pt-6 md:px-9 lg:pt-8">

        {/* Возврат в каталог */}
        <button
          type="button"
          onClick={onBack}
          className="cursor-pointer font-['Barlow_Condensed'] text-xs uppercase text-neutral-400 hover:text-white"
        >
          ← BACK TO SHOP
        </button>

        {/* Пространство под шапку сайта из Figma */}
        <div
          aria-hidden="true"
          className="h-10 md:h-16 lg:h-[150px]"
        />

        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[1fr_1.65fr_1fr] lg:gap-6">

          {/* Левая колонка — описание */}
          <section className="font-['Barlow_Condensed'] lg:pt-8">
            <h1 className="text-[22px] font-bold uppercase leading-tight">
              {product.name}
            </h1>

            <div className="mt-10 lg:mt-14">
              <p className="text-[16px] font-bold uppercase leading-tight">
                A PIECE FOR MOVEMENT.
                <br />
                FOR THE CLASS, FOR THE STREET,
                <br />
                FOR EVERYWHERE BETWEEN.
              </p>

              <p className="mt-8 max-w-[230px] text-[13px] leading-snug text-neutral-300 lg:mt-10">
                {product.description ??
                  'Designed for the ODD community. Product details and measurements will be added after the final shoot.'}
              </p>
            </div>

            <div className="mt-10 lg:mt-16">
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

          {/* Центральная колонка — фотография */}
          <section className="relative flex min-h-[300px] items-center justify-center overflow-hidden pt-8 sm:min-h-[400px] lg:min-h-[490px] lg:pt-6">
            <img
              key={product.id}
              src={detailImage}
              alt={product.name}
              className="relative h-auto w-[88%] max-w-[490px] object-contain"
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
          <section className="font-['Barlow_Condensed'] lg:pt-8">
            <p className="text-right text-[14px] font-bold uppercase">
              {product.price === null
                ? 'PRICE TBC'
                : `${product.price.toLocaleString('ru-RU')} ₽`}
            </p>

            <button
              type="button"
              disabled={requiresSize && !selectedSize}
              className="mt-3 w-full bg-[#e8eaed] px-5 py-4 text-[17px] font-bold uppercase text-black transition-colors hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              ADD TO BAG
            </button>

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
                      onClick={() => setSelectedSize(size)}
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

            <p className="mt-9 text-center text-[12px] font-bold uppercase tracking-wide text-neutral-500">
              NEXT STEP / ORDER IN TELEGRAM BOT
            </p>

            <div className="mt-9 border-t border-neutral-500">
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
