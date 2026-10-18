import { useState, useEffect } from 'react'
import { Link, Routes, Route, useParams, useLocation } from 'react-router-dom'
import { gallery } from './gallery.js'

const P = (n) => `/projects/${n}.jpg`
const wrap = 'mx-auto max-w-6xl px-5'
const h2 = 'font-display font-extrabold text-4xl md:text-6xl leading-none'
const btn = 'inline-block bg-tape text-ink font-semibold px-7 py-3.5 hover:bg-white'
const btn2 = 'inline-block bg-ink text-paper font-semibold px-7 py-3.5 hover:bg-draft'
const catSlug = { residential: 'Residential', commercial: 'Commercial', mosques: 'Mosques' }

const menu = [
  { label: 'Home', to: '/' },
  { label: 'About', items: [['What We Do', '/what-we-do'], ['Projects', '/projects']] },
  { label: 'Project Gallery', items: [['Residential', '/gallery/residential'], ['Commercial', '/gallery/commercial'], ['Mosques', '/gallery/mosques']] },
  { label: 'Property For Sale', to: '/property-for-sale' },
  { label: 'Contact Us', to: '/contact' },
]
const services = ['Site surveys and estimates', 'Design and approvals', 'Residential construction', 'Commercial buildings', 'Mosques and community buildings', 'Renovation and extension', 'Property sales', 'Lettings and property management']
const values = [
  ['Listening first', 'Every project starts with how people will live or work in the building. We take time to understand the brief and keep listening until handover.'],
  ['Quality in every detail', 'Durable materials, careful finishing and up-to-date approvals, whether the job is a small repair or a full building.'],
  ['A clear process', 'You know the plan, the budget and the timeline before work begins, and we report progress as the work moves.'],
  ['Skilled people', 'Our team brings different trades, reliability and pride in their work to every site.'],
]
const listings = [
  ['4-bedroom detached house', 'Placeholder listing', 'Price on request'],
  ['3-bedroom terrace duplex', 'Placeholder listing', 'Price on request'],
  ['Commercial plot', 'Placeholder listing', 'Price on request'],
]

function Header() {
  const [open, setOpen] = useState(false)
  const link = 'hover:text-tape'
  return (
    <header className="sticky top-0 z-50 bg-ink text-paper border-b border-white/10">
      <div className={wrap + ' h-16 flex items-center justify-between'}>
        <Link to="/" className="flex items-center gap-3" aria-label="MADORI Homes and Properties home">
          <img src="/logo-mark.png" alt="" className="h-8 w-auto" />
          <span className="font-display text-lg sm:text-2xl font-extrabold tracking-wide leading-none">MADORI <span className="text-tape">Homes and Properties</span></span>
        </Link>
        <nav className="hidden lg:flex items-center gap-8 text-sm">
          {menu.map((m) => m.items ? (
            <div key={m.label} className="relative group">
              <button className={link + ' py-5'}>{m.label} ▾</button>
              <div className="absolute left-0 top-full hidden group-hover:block group-focus-within:block bg-ink border border-white/10 min-w-52">
                {m.items.map(([t, to]) => <Link key={t} to={to} className="block px-5 py-3 hover:bg-white/10 hover:text-tape">{t}</Link>)}
              </div>
            </div>
          ) : <Link key={m.label} to={m.to} className={link}>{m.label}</Link>)}
        </nav>
        <button className="lg:hidden border border-white/30 px-3 py-1.5 text-sm" aria-expanded={open} onClick={() => setOpen(!open)}>{open ? 'Close' : 'Menu'}</button>
      </div>
      {open && (
        <nav className="lg:hidden px-5 pb-5 flex flex-col gap-3" onClick={() => setOpen(false)}>
          {menu.map((m) => m.items ? (
            <div key={m.label}><p className="text-paper/60 text-sm">{m.label}</p>
              {m.items.map(([t, to]) => <Link key={t} to={to} className="block py-1.5 pl-4">{t}</Link>)}</div>
          ) : <Link key={m.label} to={m.to}>{m.label}</Link>)}
        </nav>
      )}
    </header>
  )
}

function Banner({ img, kicker, title, tall, children }) {
  return (
    <section className={'relative text-paper flex items-end ' + (tall ? 'min-h-[80vh]' : 'min-h-[42vh]')}>
      <img src={img} alt="" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-ink/65" />
      <div className={wrap + ' relative w-full py-12 md:py-20'}>
        {kicker && <p className="text-lg md:text-xl text-paper/85 max-w-xl">{kicker}</p>}
        <h1 className="mt-2 font-display font-black text-5xl md:text-8xl leading-[.95] max-w-3xl">{title}</h1>
        {children}
      </div>
    </section>
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
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((g) => (
          <button key={g.src} onClick={() => setView(g)} className="group block overflow-hidden" aria-label={'View larger: ' + g.title}>
            <img src={g.src} alt={g.title} width={g.w} height={g.h} loading="lazy" className="w-full aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-105" />
          </button>
        ))}
      </div>
      {view && (
        <div className="fixed inset-0 z-[60] bg-ink/95 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label={view.title} onClick={() => setView(null)}>
          <button className="absolute top-4 right-4 text-paper border border-white/40 px-4 py-2 hover:border-tape" onClick={() => setView(null)}>Close</button>
          <figure onClick={(e) => e.stopPropagation()}>
            <img src={view.src} alt={view.title} className="max-h-[80vh] max-w-full w-auto mx-auto" />
            <figcaption className="mt-3 text-paper text-center">{view.title}</figcaption>
          </figure>
        </div>
      )}
    </>
  )
}

function Home() {
  return (
    <>
      <Banner tall img={P('commercial-colonnade')} kicker="Homes and commercial buildings, built and sold by one team" title="Construction and Real Estate">
        <Link to="/what-we-do" className={btn + ' mt-8'}>Learn more</Link>
      </Banner>
      <section className="mx-auto max-w-4xl px-5 py-16 md:py-24 text-center">
        <h2 className={h2}>Building and property services you can rely on</h2>
        <p className="mt-6 text-lg text-ink/80 leading-relaxed">MADORI Homes and Properties designs, builds and sells homes, commercial buildings and places of worship, as part of the MADORI Global Concept group of companies.</p>
      </section>
      <section className={wrap + ' grid md:grid-cols-2 gap-8 pb-20'}>
        {[['About', 'Find out who we are, how we work and what we have built.', '/what-we-do', 'apartment-block', 'Learn more'],
          ['Take action', 'Ready for the next step? Tell us about your project and we will reply within one working day.', '/contact', 'bungalow-stone-feature', 'Contact us']].map(([t, d, to, im, l]) => (
          <Link key={t} to={to} className="group block bg-concrete">
            <div className="overflow-hidden"><img src={P(im)} alt="" className="w-full aspect-[16/10] object-cover transition-transform duration-500 group-hover:scale-105" /></div>
            <div className="p-6"><h3 className="font-display text-4xl font-bold">{t}</h3><p className="mt-2 text-ink/80">{d}</p><span className="mt-4 inline-block font-semibold">{l} →</span></div>
          </Link>
        ))}
      </section>
      <section className="bg-concrete">
        <div className={wrap + ' py-16 md:py-24'}>
          <h2 className={h2+ ' mb-8'}>Recent work</h2>
          <Grid items={gallery.slice(0, 6)} />
          <Link to="/projects" className={btn2 + ' mt-8'}>See all projects</Link>
        </div>
      </section>
    </>
  )
}

function WhatWeDo() {
  return (
    <>
      <Banner img={P('apartment-block')} kicker="About MADORI Homes and Properties" title="What We Do" />
      <section className="mx-auto max-w-4xl px-5 py-16 md:py-24">
        <h2 className="font-display font-extrabold text-3xl md:text-5xl leading-tight">We put care into every home and commercial building we build, from small repairs to full construction.</h2>
        <p className="mt-6 text-lg text-ink/80 leading-relaxed">The name MADORI comes from Malam Madori, a local government area under the Hadejia Emirate in Jigawa State, north-east Nigeria.</p>
      </section>
      <section className="bg-concrete">
        <div className={wrap + ' py-16 md:py-24 grid md:grid-cols-[1fr_1.2fr] gap-10 md:gap-16 items-center'}>
          <img src="/founder.jpg" alt="Abubakar Aminu, founder of MADORI Homes and Properties" width="900" height="1153" className="w-full max-w-sm md:max-w-none aspect-[4/5] object-cover object-top border-b-8 border-tape" />
          <div>
            <h2 className={h2}>Our mission</h2>
            <p className="mt-6 text-lg text-ink/80 leading-relaxed max-w-lg">We aim to deliver buildings that fully meet our clients' needs, with quality in every detail, whether it is a family home, a shop or a mosque.</p>
            <p className="mt-8 font-display text-3xl font-bold">Abubakar Aminu</p>
            <p className="font-semibold">Founder, MADORI Homes and Properties</p>
          </div>
        </div>
      </section>
      <section className={wrap + ' py-16 md:py-24'}>
        <h2 className={h2}>How we work</h2>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map(([t, d]) => <div key={t} className="border-t-4 border-ink pt-4"><h3 className="font-display text-2xl font-bold">{t}</h3><p className="mt-2 text-ink/80 leading-relaxed">{d}</p></div>)}
        </div>
      </section>
      <section className="grid-bg text-paper">
        <div className={wrap + ' py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center'}>
          <div>
            <h2 className={h2}>What we can do for you</h2>
            <ul className="mt-8 space-y-3 text-lg">{services.map((s) => <li key={s} className="border-b border-white/20 pb-3">{s}</li>)}</ul>
            <Link to="/contact" className={btn + ' mt-8'}>Request a quote</Link>
          </div>
          <img src={P('home-timber-stone-corner')} alt="Two-storey home with timber and stone cladding" className="w-full aspect-[4/3] object-cover" />
        </div>
      </section>
    </>
  )
}

function Projects() {
  const blurbs = {
    Residential: 'Family homes and apartment blocks, built to the owner\u2019s plan.',
    Commercial: 'Shopfronts and commercial buildings designed to attract customers.',
    Mosques: 'Places of worship with carefully detailed facades.',
    'On site': 'Work in progress on one of our sites.',
  }
  return (
    <>
      <Banner img={P('townhouse')} kicker="A sample of buildings we have worked on" title="Projects" />
      {Object.keys(blurbs).map((c, i) => (
        <section key={c} className={i % 2 ? 'bg-concrete' : ''}>
          <div className={wrap + ' py-14 md:py-20'}>
            <h2 className={h2}>{c}</h2>
            <p className="mt-3 mb-8 text-lg text-ink/80">{blurbs[c]}</p>
            <Grid items={gallery.filter((g) => g.cat === c)} />
          </div>
        </section>
      ))}
    </>
  )
}

function GalleryPage() {
  const { cat } = useParams()
  const name = catSlug[cat] || 'Residential'
  return (
    <>
      <Banner img={P('stone-panel-house')} kicker="Project gallery" title={name} />
      <section className={wrap + ' py-14 md:py-20'}><Grid items={gallery.filter((g) => g.cat === name)} /></section>
    </>
  )
}

function Property() {
  return (
    <>
      <Banner img={P('brick-hip-roof-bungalow')} kicker="Find or build your ideal home" title="Property For Sale">
        <Link to="/contact" className={btn + ' mt-8'}>Get started</Link>
      </Banner>
      <section className="mx-auto max-w-4xl px-5 py-16 md:py-24">
        <h2 className="font-display font-extrabold text-3xl md:text-5xl leading-tight">We can source property and land for you, or build a home to your own plan.</h2>
        <p className="mt-6 text-lg text-ink/80 leading-relaxed">Building your own home lets you choose the location and shape every room. We can also give you a quote to finish incomplete building work.</p>
      </section>
      {[['Built to your specification', 'We manage the project from the first drawing to handover, including approvals, supply of materials and construction.', 'stone-panel-house'],
        ['Land and approvals', 'We can help you find land, handle the paperwork and plan your property before work begins.', 'bungalow-stone-feature']].map(([t, d, im], i) => (
        <section key={t} className={wrap + ' pb-16 grid md:grid-cols-2 gap-10 items-center'}>
          <img src={P(im)} alt="" className={'w-full aspect-[16/10] object-cover ' + (i % 2 ? 'md:order-2' : '')} />
          <div><h2 className={h2}>{t}</h2><p className="mt-4 text-lg text-ink/80 leading-relaxed">{d}</p></div>
        </section>
      ))}
      <section className="bg-concrete">
        <div className={wrap + ' py-16 md:py-24'}>
          <h2 className={h2}>Properties available</h2>
          <ul className="mt-8 border-b border-ink/20">
            {listings.map(([t, d, pr]) => (
              <li key={t} className="border-t border-ink/20 py-5 grid sm:grid-cols-[2fr_2fr_1fr] gap-2 items-baseline">
                <h3 className="font-display text-3xl font-bold">{t}</h3><p className="text-ink/75">{d}</p><p className="font-semibold sm:text-right">{pr}</p>
              </li>
            ))}
          </ul>
          <Link to="/contact" className={btn2 + ' mt-8'}>Ask about a property</Link>
        </div>
      </section>
    </>
  )
}

function Contact() {
  const [sent, setSent] = useState(false)
  const field = 'mt-1 w-full border border-ink/30 bg-white px-4 py-3 font-normal'
  return (
    <>
      <Banner img={P('shopfront-stone-column')} title="Contact Us" />
      <section className={wrap + ' py-16 md:py-24 grid md:grid-cols-2 gap-12'}>
        <div>
          <h2 className={h2}>Tell us what you want to build or buy</h2>
          <p className="mt-6 text-ink/75 max-w-sm leading-relaxed">Send a few details and we will reply within one working day.</p>
          <dl className="mt-8 space-y-3">
            <div><dt className="font-semibold">Phone</dt><dd>+234 000 000 0000</dd></div>
            <div><dt className="font-semibold">Email</dt><dd>info@madoriconcept.com</dd></div>
          </dl>
        </div>
        {sent ? <p className="bg-concrete p-8 text-xl font-semibold self-start">Thanks. We have your request and will reply within one working day.</p> : (
          <form onSubmit={(e) => { e.preventDefault(); setSent(true) }} className="space-y-5">
            {[['Name', 'text'], ['Phone', 'tel'], ['Email', 'email']].map(([l, t]) => (
              <label key={l} className="block font-semibold text-sm">{l}<input required type={t} className={field} /></label>
            ))}
            <label className="block font-semibold text-sm">Project type
              <select className={field}>{['Residential construction', 'Commercial construction', 'Renovation', 'Buying a property', 'Renting or managing a property', 'Not sure yet'].map((o) => <option key={o}>{o}</option>)}</select>
            </label>
            <label className="block font-semibold text-sm">About your project<textarea rows="4" className={field} /></label>
            <button className={btn2}>Send request</button>
          </form>
        )}
      </section>
    </>
  )
}

function Footer() {
  return (
    <footer className="grid-bg text-paper/80">
      <div className={wrap + ' py-10 flex flex-wrap items-end justify-between gap-6 text-sm'}>
        <img src="/logo-full.png" alt="MADORI Global Concept, RC-9454059" className="h-28 w-auto" />
        <div className="space-y-2">
          <p>info@madoriconcept.com</p>
          <p>© {new Date().getFullYear()} MADORI Homes and Properties, a member of MADORI Global Concept.</p>
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="underline hover:text-tape">Back to top</button>
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
          <Route path="/what-we-do" element={<WhatWeDo />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/gallery/:cat" element={<GalleryPage />} />
          <Route path="/property-for-sale" element={<Property />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}
