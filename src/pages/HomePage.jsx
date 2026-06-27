import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import CategoryButtons from '../components/CategoryButtons'
import RecentlyViewed from '../components/RecentlyViewed'
import EventsSection from '../components/EventsSection'

export default function HomePage() {
  const pageRef = useRef(null)

  useEffect(() => {
    const els = pageRef.current.querySelectorAll('.anim')
    gsap.fromTo(
      els,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power3.out', clearProps: 'all' }
    )
  }, [])

  return (
    <div ref={pageRef} className="min-h-screen bg-black">
      <header className="pt-8 pb-4 text-center anim">
        <h1 className="text-white text-2xl font-bold tracking-wide">
          Viaje Julio 2026
        </h1>
      </header>

      <div className="anim"><CategoryButtons /></div>
      <div className="anim"><RecentlyViewed /></div>
      <div className="anim"><EventsSection /></div>
    </div>
  )
}
