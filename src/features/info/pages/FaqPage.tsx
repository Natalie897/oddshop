const questions = [
  {
    question: 'HOW DO I CHOOSE MY SIZE?',
    answer:
      'For T-shirts, select your size on the product page before adding the item to your bag. Caps are available in ONE SIZE.',
  },
  {
    question: 'HOW CAN I CHECK PRODUCT PRICES?',
    answer:
      'Current product prices are displayed in the catalog and on each product page.',
  },
  {
    question: 'CAN I CHANGE MY BAG?',
    answer:
      'Yes. You can change quantities and remove items directly from your bag.',
  },
  {
    question: 'HOW DO I PLACE AN ORDER?',
    answer:
      'We are preparing checkout through Telegram. Ordering will become available when the checkout process is ready.',
  },
  {
    question: 'HOW MUCH DOES SHIPPING COST?',
    answer:
      'Shipping methods and costs will be announced before checkout opens.',
  },
  {
    question: 'CAN I RETURN OR EXCHANGE AN ITEM?',
    answer:
      'Return and exchange conditions will be published in our SHIPPING & RETURNS section before launch.',
  },
]

export default function FaqPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-4xl px-5 py-14 md:px-9 md:py-20">
        <h1 className="font-['Barlow_Condensed'] text-5xl font-black uppercase md:text-7xl">
          FAQ.
        </h1>

        <p className="mt-5 text-sm uppercase text-neutral-500">
          FREQUENTLY ASKED QUESTIONS
        </p>

        <div className="mt-14 border-t border-black">
          {questions.map((item) => (
            <details
              key={item.question}
              className="group border-b border-neutral-300"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-6 font-['Barlow_Condensed'] text-lg font-bold uppercase">
                {item.question}
                <span className="text-2xl group-open:hidden">
                  +
                </span>
                <span className="hidden text-2xl group-open:inline">
                  −
                </span>
              </summary>

              <p className="max-w-2xl pb-6 text-sm leading-7 text-neutral-700">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </main>
  )
}