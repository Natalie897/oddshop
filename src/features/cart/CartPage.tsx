import {
  useCartStore,
  selectCartTotal,
} from './store/useCartStore'

export default function CartPage() {
  const items = useCartStore((state) => state.items)
  const total = useCartStore(selectCartTotal)

  return (
    <main className="mx-auto max-w-5xl px-5 py-12 text-black">
      <h1 className="mb-8 text-3xl font-bold uppercase">
        Your Cart
      </h1>

      {items.length === 0 ? (
        <p className="border-t border-neutral-300 py-10 text-neutral-500">
          Your cart is empty.
        </p>
      ) : (
        <div className="space-y-6">
          {items.map((item) => (
            <div
              key={`${item.product.id}-${item.size ?? ''}`}
              className="flex justify-between border-b border-neutral-300 pb-4"
            >
              <div>
                <h2 className="font-semibold uppercase">
                  {item.product.name}
                </h2>

                <p className="text-sm text-neutral-500">
                  Size: {item.size ?? 'One size'}
                </p>

                <p className="text-sm">
                  Quantity: {item.quantity}
                </p>
              </div>

              <span>
                {item.product.price === null
                  ? 'PRICE TBC'
                  : item.product.price * item.quantity}
              </span>
            </div>
          ))}

          <div className="flex justify-between text-lg font-bold">
            <span>TOTAL</span>
            <span>{total}</span>
          </div>
        </div>
      )}
    </main>
  )
}