import { Minus, Plus, Trash2 } from 'lucide-react'
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
    <main className="min-h-screen w-full bg-black text-white">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 lg:py-16">

        {/* Заголовок корзины */}
        <header className="border-b border-neutral-600 pb-5">
          <h1
            className="m-0 text-5xl font-black uppercase leading-none tracking-tighter sm:text-7xl"
            style={{ color: '#ffffff' }}
          >
            YOUR BAG.
          </h1>

          <p className="mt-2 text-xs font-semibold uppercase text-neutral-500">
            {String(itemCount).padStart(2, '0')} ITEMS
          </p>
        </header>

        {items.length === 0 ? (
          /* Пустая корзина */
          <section className="py-24 text-center">
            <p className="text-2xl font-bold uppercase">
              YOUR BAG IS EMPTY
            </p>

            <p className="mt-3 text-sm text-neutral-500">
              EXPLORE THE ODD COLLECTION.
            </p>
          </section>
        ) : (
          <div className="mt-4 grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px]">

            {/* Список товаров */}
            <section aria-label="Cart items">
              <ul className="divide-y divide-neutral-700">
                {items.map((item) => {
                  const { product, size, quantity } = item

                  return (
                    <li
                      key={`${product.id}:${size ?? ''}`}
                      className="flex gap-4 py-5 sm:gap-6"
                    >
                      {/* Изображение товара */}
                      {product.images[0] ? (
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          loading="lazy"
                          className="h-28 w-28 shrink-0 bg-neutral-200 object-contain sm:h-32 sm:w-32"
                        />
                      ) : (
                        <div className="flex h-28 w-28 shrink-0 items-center justify-center bg-neutral-200 text-xs text-neutral-500 sm:h-32 sm:w-32">
                          NO IMAGE
                        </div>
                      )}

                      {/* Информация о товаре */}
                      <div className="flex min-w-0 flex-1 flex-col">
                        <h2 className="m-0 text-base font-black uppercase sm:text-lg">
                          {product.name}
                        </h2>

                        <p className="mt-2 text-xs uppercase text-neutral-500">
                          {size ? `SIZE ${size}` : 'ONE SIZE'}
                          {' / '}
                          QTY {quantity}
                        </p>

                        <p className="mt-3 text-sm font-bold uppercase">
                          {product.price === null
                            ? 'PRICE TBC'
                            : formatPrice(product.price * quantity)}
                        </p>

                        {/* Управление количеством */}
                        <div className="mt-4 flex flex-wrap items-center gap-3">
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
                              className="p-2.5 transition-colors hover:bg-neutral-800 focus-visible:outline-2 focus-visible:outline-white"
                            >
                              <Minus size={16} />
                            </button>

                            <span className="min-w-8 text-center text-sm">
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
                              className="p-2.5 transition-colors hover:bg-neutral-800 focus-visible:outline-2 focus-visible:outline-white"
                            >
                              <Plus size={16} />
                            </button>
                          </div>

                          <button
                            type="button"
                            aria-label={`Удалить ${product.name}`}
                            onClick={() =>
                              removeItem(product.id, size)
                            }
                            className="p-2.5 text-neutral-400 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-white"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </section>

            {/* Сводка заказа */}
            <aside className="h-fit bg-neutral-950 p-6 sm:p-7">
              <h2 className="m-0 text-xl font-black uppercase">
                YOUR ORDER
              </h2>

              <div className="mt-8 flex justify-between text-sm uppercase">
                <span className="text-neutral-400">ITEMS</span>
                <span>{String(itemCount).padStart(2, '0')}</span>
              </div>

              <div className="mt-3 flex justify-between border-t border-neutral-600 pt-5 text-base font-bold uppercase">
                <span>TOTAL</span>
                <span>
                  {canCheckout ? formatPrice(total) : 'TBC'}
                </span>
              </div>

              <button
                type="button"
                disabled
                className="mt-10 w-full cursor-not-allowed bg-neutral-200 px-4 py-4 text-sm font-black uppercase text-black opacity-60"
              >
                ORDER VIA TELEGRAM
              </button>

              <p className="mt-5 text-xs uppercase leading-relaxed text-neutral-500">
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