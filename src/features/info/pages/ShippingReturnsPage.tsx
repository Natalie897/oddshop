export default function ShippingReturnsPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-4xl px-5 py-14 md:px-9 md:py-20">
        <h1 className="font-['Barlow_Condensed'] text-5xl font-black uppercase md:text-7xl">
          SHIPPING & RETURNS.
        </h1>

        <p className="mt-5 text-sm uppercase text-neutral-500">
          EVERYTHING YOU NEED TO KNOW ABOUT YOUR ORDER.
        </p>

        <div className="mt-14 space-y-12">
          <section className="border-t border-black pt-6">
            <h2 className="text-2xl font-bold uppercase">
              01 / SHIPPING
            </h2>
            <p className="mt-4 text-sm leading-7 text-neutral-700">
              Delivery options, available regions, estimated
              delivery times and shipping costs will be
              confirmed before checkout becomes available.
            </p>
          </section>

          <section className="border-t border-black pt-6">
            <h2 className="text-2xl font-bold uppercase">
              02 / ORDER TRACKING
            </h2>
            <p className="mt-4 text-sm leading-7 text-neutral-700">
              Order tracking instructions will be provided
              when the delivery process is finalized.
            </p>
          </section>

          <section className="border-t border-black pt-6">
            <h2 className="text-2xl font-bold uppercase">
              03 / RETURNS & EXCHANGES
            </h2>
            <p className="mt-4 text-sm leading-7 text-neutral-700">
              Return and exchange conditions, including
              eligible items, deadlines and the return
              procedure, will be published before launch.
            </p>
          </section>

          <section className="border-t border-black pt-6">
            <h2 className="text-2xl font-bold uppercase">
              04 / NEED HELP?
            </h2>
            <p className="mt-4 text-sm leading-7 text-neutral-700">
              Official support contact details will be
              available here before orders open.
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}