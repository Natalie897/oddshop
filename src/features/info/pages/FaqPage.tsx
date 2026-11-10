import AnimatedAccordion from '../../../components/ui/AnimatedAccordion'

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

        <div className="mt-14 border-t border-neutral-600">
            {questions.map((item) => (
                <AnimatedAccordion
                key={item.question}
                title={item.question}
                >
                <p className="max-w-2xl">
                    {item.answer}
                </p>
                </AnimatedAccordion>
            ))}
        </div>
      </div>
    </main>
  )
}