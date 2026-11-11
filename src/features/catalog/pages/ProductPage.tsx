import { assetUrl } from '../../../utils/assetUrl'

import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import type { Product } from '../../../types/product'
import { useCartStore } from '../../cart/store/useCartStore'
import AnimatedAccordion from '../../../components/ui/AnimatedAccordion'

interface ProductPageProps {
  product: Product
  onBack?: () => void
}

export function ProductPage({ product, onBack }: ProductPageProps) {
  const navigate = useNavigate()

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

  const detailImage = assetUrl(`/images/products/detail/${product.id}.png`)

  const canAddToBag =
    product.price !== null &&
    (!requiresSize || selectedSize !== null)

  const formattedPrice =
    product.price === null
      ? 'PRICE TBC'
      : `${product.price.toLocaleString('ru-RU')} ₽`

  function toggleSection(section: string) {
    setOpenSection((current) =>
      current === section ? null : section
    )
  }

  function handleSelectSize(size: string) {
    setSelectedSize(size)
    setAddedToBag(false)
  }

  function handleAddToBag() {
    if (!canAddToBag) return

    addItem(product, sizeForCart)
    setAddedToBag(true)
  }

  function handleBuyNow() {
    if (!canAddToBag) return

    addItem(product, sizeForCart)
    navigate('/cart')
    window.scrollTo(0, 0)
  }

  function handleBack() {
    if (onBack) {
      onBack()
    } else {
      navigate('/')
    }
  }

  const imageSection = (
    <section
      aria-label={`${product.name} image`}
      className="relative flex min-h-[340px] items-center justify-center overflow-hidden sm:min-h-[440px] lg:min-h-[520px]"
    >
      <img
        key={product.id}
        src={detailImage}
        alt={product.name}
        className="relative h-auto w-full max-w-[470px] object-contain px-2 sm:w-[90%] sm:px-0"
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
  )

  const purchaseSection = (
    <section className="font-['Barlow_Condensed'] lg:self-center">
      {/* PRODUCT NAME ON MOBILE */}
      <div className="mb-6 lg:hidden">
        <h1 className="text-[24px] font-bold uppercase leading-tight">
          {product.name}
        </h1>
      </div>

      {/* PRICE */}
      <p className="text-[18px] font-bold uppercase lg:text-right lg:text-[14px]">
        {formattedPrice}
      </p>

      {/* SINGLE SIZE */}
      {sizes.length === 1 && (
        <p className="mt-5 text-[14px] font-bold uppercase">
          SIZE: {sizes[0]}
        </p>
      )}

      {/* SIZE SELECTION */}
      {requiresSize && (
        <div className="mt-7">
          <p className="mb-3 text-[14px] font-bold uppercase">
            SELECT SIZE
          </p>

          <div className="flex flex-wrap gap-2">
            {sizes.map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => handleSelectSize(size)}
                aria-pressed={selectedSize === size}
                className={
                  'min-h-11 min-w-11 cursor-pointer border px-4 py-3 text-[14px] font-bold uppercase transition-colors ' +
                  (selectedSize === size
                    ? 'border-white bg-white text-black'
                    : 'border-neutral-500 bg-black text-white hover:border-white')
                }
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* PURCHASE BUTTONS */}
      <div className="mt-7 flex flex-col gap-3">
        <button
          type="button"
          onClick={handleAddToBag}
          disabled={!canAddToBag}
          className="min-h-[52px] w-full cursor-pointer bg-white px-5 py-4 text-[17px] font-bold uppercase text-black transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {addedToBag ? 'ADDED TO BAG ✓' : 'ADD TO BAG'}
        </button>

        <button
          type="button"
          onClick={handleBuyNow}
          disabled={!canAddToBag}
          className="min-h-[52px] w-full cursor-pointer border border-white bg-black px-5 py-4 text-[17px] font-bold uppercase text-white transition-colors hover:bg-white hover:text-black disabled:cursor-not-allowed disabled:opacity-40"
        >
          BUY NOW
        </button>
      </div>

      <p className="mt-5 text-center text-[12px] font-bold uppercase tracking-wide text-neutral-400">
        {product.price === null
          ? 'PRICE WILL BE CONFIRMED BEFORE LAUNCH'
          : 'BUY NOW OPENS YOUR SHOPPING BAG'}
      </p>
    </section>
  )

  const descriptionSection = (
    <section className="font-['Barlow_Condensed']">
      {/* PRODUCT NAME ON DESKTOP */}
      <h1 className="hidden text-[22px] font-bold uppercase leading-tight lg:block">
        {product.name}
      </h1>

      <div className="lg:mt-11">
        <p className="text-[17px] font-bold uppercase leading-tight">
          A PIECE FOR MOVEMENT.
          <br />
          FOR THE CLASS, FOR THE STREET,
          <br />
          FOR EVERYWHERE BETWEEN.
        </p>

        <p className="mt-6 max-w-[440px] text-[14px] leading-relaxed text-neutral-300 lg:mt-9">
          {product.description ??
            'Designed for the ODD community. Product details and measurements will be added after the final shoot.'}
        </p>
      </div>

      {/* DETAILS / CARE */}
      <div className="mt-9 lg:mt-12">
        <h2 className="mb-3 text-[15px] font-bold uppercase">
          DETAILS / CARE
        </h2>

        <ul className="list-disc space-y-1 pl-5 text-[13px] uppercase leading-relaxed">
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
  )

  const informationSection = (
    <section className="font-['Barlow_Condensed']">
      <div className="border-t border-neutral-600">
        <AnimatedAccordion
          variant="product"
          title="SHIPPING + RETURNS"
          open={openSection === 'shipping'}
          onToggle={() => toggleSection('shipping')}
        >
          <p>
            Delivery options, shipping costs and return
            conditions will be confirmed before checkout opens.
          </p>

          <Link
            to="/shipping-returns"
            className="mt-4 inline-block font-bold uppercase text-white underline underline-offset-4 transition-colors hover:text-neutral-400"
            onClick={() => window.scrollTo(0, 0)}
          >
            VIEW SHIPPING & RETURNS →
          </Link>
        </AnimatedAccordion>

        <AnimatedAccordion
          variant="product"
          title="SIZE GUIDE"
          open={openSection === 'size'}
          onToggle={() => toggleSection('size')}
        >
          <p>
            Size measurements will be added before launch.
          </p>
        </AnimatedAccordion>
      </div>
    </section>
  )

  return (
    <main className="min-h-[calc(100vh-112px)] overflow-x-clip bg-black text-white">
      <div className="mx-auto max-w-[1440px] px-5 pb-16 pt-5 md:px-9 lg:pb-14 lg:pt-7">
        {/* BACK BUTTON */}
        <button
          type="button"
          onClick={handleBack}
          className="cursor-pointer font-['Barlow_Condensed'] text-xs uppercase text-neutral-400 transition-colors hover:text-white"
        >
          ← BACK TO SHOP
        </button>

        {/* MOBILE AND TABLET */}
        <div className="mt-6 flex flex-col gap-9 lg:hidden">
          {imageSection}
          {purchaseSection}
          {descriptionSection}
          {informationSection}
        </div>

        {/* DESKTOP */}
        <div className="mt-10 hidden grid-cols-[1fr_1.65fr_1fr] items-center gap-6 lg:grid">
          {descriptionSection}

          {imageSection}

          <div className="flex flex-col gap-8">
            {purchaseSection}
            {informationSection}
          </div>
        </div>
      </div>
    </main>
  )
}


