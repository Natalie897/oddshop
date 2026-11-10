
import { Minus, Plus, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import {
  useCartStore,
  selectCartTotal,
  selectCanCheckout,
} from './store/useCartStore'

const formatPrice = (price: number) =>
  new Intl.NumberFormat('ru-RU').format(price)

export default function CartPage() {
  const items = useCartStore((state) => state.items)
  const total = useCartStore(selectCartTotal)
  const canCheckout = useCartStore(selectCanCheckout)

  const updateQuantity = useCartStore(
    (state) => state.updateQuantity
  )

  const removeItem = useCartStore(
    (state) => state.removeItem
  )

  const itemCount = items.reduce(
    (count, item) => count + item.quantity,
    0
  )

  return (
    <main className="min-h-screen w-full overflow-x-clip bg-black font-['Barlow_Condensed'] text-white">
      <div className="mx-auto max-w-6xl px-4 pb-16 pt-5 sm:px-8 sm:pt-10 lg:py-16">

        {/* PAGE TITLE */}
        <header className="border-b border-neutral-700 pb-5 sm:pb-7">
          <h1 className="m-0 text-[43px] font-black uppercase leading-none tracking-tight sm:text-7xl">
            YOUR BAG.
          </h1>

          <p className="mt-3 text-[12px] font-bold uppercase tracking-wide text-neutral-400">
            {String(itemCount).padStart(2, '0')} ITEMS
          </p>
        </header>

        {items.length === 0 ? (
          /* EMPTY BAG */
          <section className="flex flex-col items-center py-20 text-center sm:py-28">
            <p className="text-[25px] font-black uppercase">
              YOUR BAG IS EMPTY
            </p>

            <p className="mt-3 text-[14px] uppercase text-neutral-400">
              EXPLORE THE ODD COLLECTION.
            </p>

            <Link
              to="/"
              className="mt-8 inline-flex min-h-12 items-center justify-center border border-white px-8 text-[15px] font-bold uppercase text-white transition-colors hover:bg-white hover:text-black"
            >
              CONTINUE SHOPPING
            </Link>
          </section>
        ) : (
          <div className="mt-3 grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-12">

            {/* PRODUCTS */}
            <section aria-label="Cart items" className="min-w-0">
              <ul className="divide-y divide-neutral-700">
                {items.map((item) => {
                  const { product, size, quantity } = item

                  return (
                    <li
                      key={`${product.id}:${size ?? ''}`}
                      className="flex min-w-0 gap-3 py-5 sm:gap-6 sm:py-7"
                    >
                      {/* PRODUCT IMAGE */}
                      <div className="h-[105px] w-[105px] shrink-0 overflow-hidden bg-neutral-200 sm:h-32 sm:w-32">
                        {product.images[0] ? (
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            loading="lazy"
                            className="h-full w-full object-contain"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-xs text-neutral-500">
                            NO IMAGE
                          </div>
                        )}
                      </div>

                      {/* PRODUCT INFO */}
                      <div className="flex min-w-0 flex-1 flex-col">
                        <h2 className="m-0 break-words text-[17px] font-black uppercase leading-tight sm:text-xl">
                          {product.name}
                        </h2>

                        <p className="mt-2 text-[12px] font-semibold uppercase text-neutral-400">
                          {size ? `SIZE ${size}` : 'ONE SIZE'}
                        </p>

                        <p className="mt-2 text-[16px] font-bold uppercase">
                          {product.price === null
                            ? 'PRICE TBC'
                            : `${formatPrice(product.price * quantity)} ₽`}
                        </p>

                        {/* QUANTITY AND REMOVE */}
                        <div className="mt-3 flex flex-wrap items-center gap-2 sm:mt-5 sm:gap-4">
                          <div className="flex items-center border border-neutral-600">
                            <button
                              type="button"
                              aria-label={`Уменьшить количество ${product.name}`}
                              onClick={() =>
                                quantity > 1
                                  ? updateQuantity(
                                      product.id,
                                      quantity - 1,
                                      size
                                    )
                                  : removeItem(product.id, size)
                              }
                              className="flex h-10 w-9 items-center justify-center transition-colors hover:bg-neutral-800 focus-visible:outline-2 focus-visible:outline-white sm:h-11 sm:w-11"
                            >
                              <Minus size={15} />
                            </button>

                            <span className="min-w-6 text-center text-[14px] font-bold">
                              {quantity}
                            </span>

                            <button
                              type="button"
                              aria-label={`Увеличить количество ${product.name}`}
                              onClick={() =>
                                updateQuantity(
                                  product.id,
                                  quantity + 1,
                                  size
                                )
                              }
                              className="flex h-10 w-9 items-center justify-center transition-colors hover:bg-neutral-800 focus-visible:outline-2 focus-visible:outline-white sm:h-11 sm:w-11"
                            >
                              <Plus size={15} />
                            </button>
                          </div>

                          <button
                            type="button"
                            aria-label={`Удалить ${product.name}`}
                            onClick={() =>
                              removeItem(product.id, size)
                            }
                            className="flex h-10 w-10 items-center justify-center text-neutral-400 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-white sm:h-11 sm:w-11"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </li>
                  )
                })}
              </ul>

              <Link
                to="/"
                className="mt-6 inline-block text-[13px] font-bold uppercase tracking-wide text-neutral-400 underline underline-offset-4 transition-colors hover:text-white"
              >
                ← CONTINUE SHOPPING
              </Link>
            </section>

            {/* ORDER SUMMARY */}
            <aside className="h-fit border-t border-neutral-600 bg-neutral-950 px-5 py-7 sm:p-7 lg:border-t-0">
              <h2 className="m-0 text-[23px] font-black uppercase">
                YOUR ORDER
              </h2>

              <div className="mt-8 flex items-center justify-between text-[14px] font-bold uppercase">
                <span className="text-neutral-400">
                  ITEMS
                </span>

                <span>
                  {String(itemCount).padStart(2, '0')}
                </span>
              </div>

              <div className="mt-5 flex items-center justify-between border-t border-neutral-600 pt-5 text-[20px] font-black uppercase">
                <span>TOTAL</span>

                <span>
                  {canCheckout
                    ? `${formatPrice(total)} ₽`
                    : 'TBC'}
                </span>
              </div>

              <button
                type="button"
                disabled
                className="mt-8 min-h-[52px] w-full cursor-not-allowed bg-white px-4 py-4 text-[16px] font-black uppercase text-black opacity-50"
              >
                ORDER VIA TELEGRAM
              </button>

              <p className="mt-5 text-[12px] uppercase leading-relaxed text-neutral-400">
                {canCheckout
                  ? 'ORDER SUBMISSION IS NOT CONNECTED YET.'
                  : 'ITEMS WITH UNCONFIRMED PRICES CANNOT BE ORDERED.'}
              </p>
            </aside>
          </div>
        )}
      </div>
    </main>
  )
}
