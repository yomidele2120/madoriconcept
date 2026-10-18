import { useState, useEffect } from 'react'
import { Link, Routes, Route, useLocation } from 'react-router-dom'
import { gallery, cats } from './gallery.js'

const P = (n) => `/projects/${n}.jpg`
const wrap = 'mx-auto max-w-6xl px-5'
const h1 = 'text-3xl md:text-5xl font-bold'
const h2 = 'text-2xl md:text-3xl font-bold'
const btn = 'inline-block bg-brand text-white font-bold px-6 py-3 hover:bg-neutral-700'
const nav = [['Home', '/'], ['About', '/about'], ['Projects', '/projects'], ['Properties', '/properties'], ['Contact', '/contact']]

const services = [
  ['Residential construction', 'Family homes and apartment blocks, built to your plans or ours.'],
  ['Commercial buildings', 'Shops, offices and mixed-use buildings.'],
  ['Mosques and community buildings', 'Places of worship and community use.'],
  ['Renovation and extension', 'Upgrade or enlarge an existing building.'],
  ['Design and approvals', 'Drawings, estimates and permits handled for you.'],
  ['Property sales and lettings', 'Buying, selling, renting and managing property.'],
]
const listings = [
  ['4-bedroom detached house', 'Details to come', 'Price on request'],
  ['3-bedroom terrace duplex', 'Details to come', 'Price on request'],
  ['Commercial plot', 'Details to come', 'Price on request'],
]

function Header() {
  const [open, setOpen] = useState(false)
  return (
    <header className="bg-brand text-white sticky top-0 z-50">
      <div className={wrap + ' h-16 flex items-center justify-between'}>
        <Link to="/" className="flex items-center gap-3" aria-label="MADORI Homes and Properties home">
          <img src="/logo-mark.png" alt="" className="h-8 w-auto" />
          <span className="leading-tight"><span className="block font-black text-lg sm:inline">MADORI</span> <span className="block text-xs sm:inline sm:text-lg sm:font-bold">Homes and Properties</span></span>
        </Link>
        <nav className="hidden md:flex gap-7 text-sm">
          {nav.map(([t, to]) => <Link key={t} to={to} className="hover:underline underline-offset-4">{t}</Link>)}
        </nav>
        <button className="md:hidden border border-white/40 px-3 py-1.5 text-sm" aria-expanded={open} onClick={() => setOpen(!open)}>{open ? 'Close' : 'Menu'}</button>
      </div>
      {open && (
        <nav className="md:hidden px-5 pb-3 flex flex-col" onClick={() => setOpen(false)}>
          {nav.map(([t, to]) => <Link key={t} to={to} className="py-3 border-t border-white/15">{t}</Link>)}
        </nav>
      )}
    </header>
  )
}

function Grid({ items }) {
  const [view, setView] = useState(null)
  useEffect(() => {
    const k = (e) => e.key === 'Escape' && setView(null)
    window.addEventListener('keydown', k)
    return () => window.removeEventListener('keydown', k)
  }, [])
  return (
    <>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4">
        {items.map((g) => (
          <button key={g.src} onClick={() => setView(g)} aria-label={'View larger: ' + g.title}>
            <img src={g.src} alt={g.title} width={g.w} height={g.h} loading="lazy" className="w-full aspect-[4/3] object-cover" />
          </button>
        ))}
      </div>
      {view && (
        <div className="fixed inset-0 z-[60] bg-black/90 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label={view.title} onClick={() => setView(null)}>
          <button className="absolute top-4 right-4 text-white border border-white/50 px-4 py-2" onClick={() => setView(null)}>Close</button>
          <figure onClick={(e) => e.stopPropagation()}>
            <img src={view.src} alt={view.title} className="max-h-[75dvh] max-w-full w-auto mx-auto" />
            <figcaption className="mt-3 text-white text-center">{view.title}</figcaption>
          </figure>
        </div>
      )}
    </>
  )
}

function Founder() {
  return (
    <div className={wrap + ' py-14 md:py-20 grid md:grid-cols-[1fr_1.5fr] gap-10 items-center'}>
      <img src="/founder.jpg" alt="Abubakar Aminu, founder of MADORI Homes and Properties" width="900" height="1153" className="w-full max-w-xs mx-auto md:mx-0 aspect-[4/5] object-cover object-top" />
      <div>
        <h2 className={h2}>Abubakar Aminu</h2>
        <p className="mt-1 text-lg text-ink/70">Founder, MADORI Homes and Properties</p>
        <p className="mt-5 text-lg leading-relaxed max-w-xl">Abubakar Aminu founded MADORI Homes and Properties to build and sell homes and commercial buildings, as part of the MADORI Global Concept group of companies.</p>
      </div>
    </div>
  )
}

function Home() {
  return (
    <>
      <section className="relative text-white">
        <img src={P('apartment-block')} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/55" />
        <div className={wrap + ' relative py-16 sm:py-24 md:py-40'}>
          <h1 className={h1 + ' md:text-6xl max-w-2xl'}>Turning Ideas Into Reality</h1>
          <p className="mt-3 text-sm sm:text-lg tracking-[.2em]">DESIGN | BUILD | DELIVER</p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link to="/contact" className="inline-block text-center bg-white text-brand font-bold px-6 py-3 hover:bg-soft">Get a quote</Link>
            <Link to="/projects" className="inline-block text-center border border-white px-6 py-3 hover:bg-white/10">View our projects</Link>
          </div>
        </div>
      </section>

      <section className={wrap + ' py-14 md:py-20 max-w-3xl'}>
        <h2 className={h2}>Who we are</h2>
        <p className="mt-4 text-lg leading-relaxed">MADORI Homes and Properties is a construction and real estate company, part of the MADORI Global Concept group. We design and build homes, commercial buildings and mosques, and we help clients buy, sell and rent property.</p>
        <Link to="/about" className="mt-4 inline-block font-bold text-brand underline">More about us</Link>
      </section>

      <section className="bg-soft">
        <div className={wrap + ' py-14 md:py-20'}>
          <h2 className={h2}>Our services</h2>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
            {services.map(([t, d]) => <div key={t}><h3 className="font-bold text-lg">{t}</h3><p className="mt-1 text-ink/80">{d}</p></div>)}
          </div>
        </div>
      </section>

      <section className={wrap + ' py-14 md:py-20'}>
        <h2 className={h2 + ' mb-8'}>Recent projects</h2>
        <Grid items={gallery.slice(0, 6)} />
        <Link to="/projects" className={btn + ' mt-8'}>See all projects</Link>
      </section>

      <section className="bg-soft"><Founder /></section>

      <section className="bg-brand text-white">
        <div className={wrap + ' py-14 text-center'}>
          <h2 className={h2}>Have a project in mind?</h2>
          <p className="mt-3 text-white/85">Tell us what you want to build or buy and we will get back to you.</p>
          <Link to="/contact" className="mt-6 inline-block bg-white text-brand font-bold px-6 py-3 hover:bg-soft">Contact us</Link>
        </div>
      </section>
    </>
  )
}

function About() {
  return (
    <>
      <section className={wrap + ' py-14 md:py-20 max-w-3xl'}>
        <h1 className={h1}>About us</h1>
        <p className="mt-6 text-lg leading-relaxed">MADORI Homes and Properties is a construction and real estate company. We design and build homes, commercial buildings and mosques, and we help clients buy, sell and rent property. We are part of the MADORI Global Concept group of companies.</p>
        <h2 className={h2 + ' mt-10'}>Where the name comes from</h2>
        <p className="mt-4 text-lg leading-relaxed">The name MADORI comes from Malam Madori, a local government area under the Hadejia Emirate in Jigawa State, north-east Nigeria.</p>
      </section>
      <section className="bg-soft"><Founder /></section>
      <section className={wrap + ' py-14 md:py-20'}>
        <h2 className={h2}>What we do</h2>
        <ul className="mt-6 grid sm:grid-cols-2 gap-x-10 text-lg">
          {services.map(([t]) => <li key={t} className="border-b border-ink/15 py-3">{t}</li>)}
        </ul>
        <Link to="/contact" className={btn + ' mt-8'}>Request a quote</Link>
      </section>
    </>
  )
}

function Projects() {
  const [filter, setFilter] = useState('All')
  return (
    <section className={wrap + ' py-14 md:py-20'}>
      <h1 className={h1}>Projects</h1>
      <p className="mt-3 text-lg text-ink/80">Some of the buildings we have worked on.</p>
      <div className="mt-6 mb-8 flex flex-wrap gap-2" role="group" aria-label="Filter projects">
        {cats.map((c) => (
          <button key={c} onClick={() => setFilter(c)} aria-pressed={filter === c}
            className={'px-4 py-2 text-sm font-bold border ' + (filter === c ? 'bg-brand text-white border-brand' : 'border-ink/30 hover:border-brand')}>{c}</button>
        ))}
      </div>
      <Grid items={gallery.filter((g) => filter === 'All' || g.cat === filter)} />
    </section>
  )
}

function Properties() {
  return (
    <section className={wrap + ' py-14 md:py-20 max-w-4xl'}>
      <h1 className={h1}>Properties</h1>
      <p className="mt-4 text-lg leading-relaxed">We can help you find property or land, or build a home to your own plan. Listings will appear here.</p>
      <ul className="mt-8 border-b border-ink/15">
        {listings.map(([t, d, pr]) => (
          <li key={t} className="border-t border-ink/15 py-4 grid sm:grid-cols-[2fr_2fr_1fr] gap-1">
            <span className="font-bold">{t}</span><span className="text-ink/70">{d}</span><span className="sm:text-right">{pr}</span>
          </li>
        ))}
      </ul>
      <Link to="/contact" className={btn + ' mt-8'}>Ask about a property</Link>
    </section>
  )
}

function Contact() {
  const [sent, setSent] = useState(false)
  const field = 'mt-1 w-full border border-ink/30 px-3 py-2.5 text-base font-normal'
  return (
    <section className={wrap + ' py-14 md:py-20 grid md:grid-cols-2 gap-12'}>
      <div>
        <h1 className={h1}>Contact us</h1>
        <p className="mt-4 text-lg">Send us a few details about your project and we will reply as soon as we can.</p>
        <p className="mt-8"><strong>Phone:</strong> +234 000 000 0000</p>
        <p className="mt-1"><strong>Email:</strong> info@madoriconcept.com</p>
      </div>
      {sent ? <p className="bg-soft p-6 text-lg self-start">Thank you. We have received your message.</p> : (
        <form onSubmit={(e) => { e.preventDefault(); setSent(true) }} className="space-y-4">
          {[['Name', 'text'], ['Phone', 'tel'], ['Email', 'email']].map(([l, t]) => (
            <label key={l} className="block font-bold text-sm">{l}<input required type={t} className={field} /></label>
          ))}
          <label className="block font-bold text-sm">Enquiry type
            <select className={field}>{['Building a home', 'Commercial building', 'Renovation', 'Buying a property', 'Renting or managing a property', 'Other'].map((o) => <option key={o}>{o}</option>)}</select>
          </label>
          <label className="block font-bold text-sm">Message<textarea rows="4" className={field} /></label>
          <button className={btn}>Send message</button>
        </form>
      )}
    </section>
  )
}

function Footer() {
  return (
    <footer className="bg-brand text-white/85">
      <div className={wrap + ' py-10 flex flex-wrap items-end justify-between gap-6 text-sm'}>
        <img src="/logo-full.png" alt="MADORI Global Concept, RC-9454059" className="h-20 sm:h-24 w-auto" />
        <div className="space-y-1 sm:text-right">
          <p className="text-white font-bold">Turning Ideas Into Reality</p>
          <p>info@madoriconcept.com</p>
          <p>© {new Date().getFullYear()} MADORI Homes and Properties, a member of MADORI Global Concept.</p>
        </div>
      </div>
    </footer>
  )
}

export default function App() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}
