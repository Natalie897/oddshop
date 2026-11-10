
import { useEffect, useRef, useState } from 'react'

type Campaign = {
  id: number
  image: string
  title: string
}

const campaigns: Campaign[] = [
  {
    id: 1,
    image: '/images/campaign-01.jpg',
    title: 'ODD / 001',
  },
  {
    id: 2,
    image: '/images/campaign-02.jpg',
    title: 'ODD / 002',
  },
  {
    id: 3,
    image: '/images/campaign-03.jpg',
    title: 'ODD / 003',
  },
  {
    id: 4,
    image: '/images/campaign-04.jpg',
    title: 'ODD / 004',
  },
  {
    id: 5,
    image: '/images/campaign-05.jpg',
    title: 'ODD / 005',
  },
  {
    id: 6,
    image: '/images/campaign-06.jpg',
    title: 'ODD / 006',
  },
  {
    id: 7,
    image: '/images/campaign-07.jpg',
    title: 'ODD / 007',
  },
]

function CampaignCard({ campaign }: { campaign: Campaign }) {
  const cardRef = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const element = cardRef.current
    if (!element) return

    if (!('IntersectionObserver' in window)) {
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(entry.target)
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px 40px 0px',
      }
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [])

  return (
    <article
      ref={cardRef}
      className={
        'group relative aspect-[3/4] overflow-hidden bg-neutral-900 ' +
        'transition-all duration-700 ease-out motion-reduce:transition-none ' +
        (visible
          ? 'translate-y-0 opacity-100'
          : 'translate-y-8 opacity-0')
      }
    >
      <img
        src={campaign.image}
        alt={campaign.title}
        loading="lazy"
        className={
          'absolute inset-0 h-full w-full object-cover ' +
          'transition-transform duration-700 ease-out ' +
          'group-hover:scale-105 motion-reduce:transition-none'
        }
      />

      <div
        className={
          'absolute inset-0 bg-black/25 ' +
          'transition-colors duration-500 ' +
          'group-hover:bg-black/65'
        }
      />

      <div
        className={
          'absolute inset-0 flex items-center justify-center p-5 ' +
          'opacity-100 transition-opacity duration-500 ' +
          'md:opacity-0 md:group-hover:opacity-100'
        }
      >
        <h2
          className={
            "font-['Barlow_Condensed'] text-center " +
            'text-2xl font-black uppercase tracking-wide text-white ' +
            'md:text-3xl'
          }
        >
          {campaign.title}
        </h2>
      </div>
    </article>
  )
}

export function CampaignsPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="px-4 pb-9 pt-5 md:pb-11 md:pt-7">
        <h1
          className={
            "font-['Barlow_Condensed'] text-center " +
            'text-5xl font-black uppercase tracking-tight ' +
            'md:text-6xl'
          }
        >
          CAMPAIGNS
        </h1>
      </section>

      <section
        aria-label="ODD campaigns gallery"
        className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3"
      >
        {campaigns.map((campaign) => (
          <CampaignCard
            key={campaign.id}
            campaign={campaign}
          />
        ))}
      </section>
    </main>
  )
}
