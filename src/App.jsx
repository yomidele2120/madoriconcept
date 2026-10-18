import { useState, useEffect } from 'react'
import { gallery, cats } from './gallery.js'

const links = [['Services', '#services'], ['Projects', '#projects'], ['Properties', '#properties'], ['Process', '#process'], ['About', '#about'], ['Contact', '#contact']]

const services = [
  ['Residential construction', 'Family homes, estates and apartment blocks built to your plans or ours.'],
  ['Commercial buildings', 'Offices, retail and mixed-use buildings delivered to a fixed schedule.'],
  ['Renovation and extension', 'Upgrade or expand an existing building without starting over.'],
  ['Architectural design', 'Floor plans, elevations and approvals handled in-house.'],
  ['Project management', 'One team accountable for cost, quality and timeline on site.'],
  ['Mosques and community buildings', 'Places of worship and community use, with carefully detailed facades.'],
  ['Property sales', 'Find, value and buy or sell homes, land and commercial property.'],
  ['Lettings and property management', 'Tenant sourcing, rent collection and upkeep for property owners.'],
]

const steps = [
  ['Consultation', 'We visit the site, listen to your brief and agree a budget.'],
  ['Design and approvals', 'Floor plans, drawings and permits, signed off by you.'],
  ['Construction', 'Weekly progress reports and a site you can visit any time.'],
  ['Handover', 'Final inspection, snag fixes and your keys.'],
]

const listings = [
  ['4-bedroom detached house', 'Placeholder listing, Abuja', 'Price on request'],
  ['3-bedroom terrace duplex', 'Placeholder listing, Abuja', 'Price on request'],
  ['Commercial plot', 'Placeholder listing, Abuja', 'Price on request'],
]

function FloorPlan() {
  return (
    <svg viewBox="0 0 600 470" className="w-full h-auto text-paper" fill="none" stroke="currentColor" strokeWidth="2.5" role="img" aria-label="Architectural floor plan drawing">
      <rect x="40" y="40" width="520" height="360" pathLength="1" className="draw" />
      <path d="M300 40V230M40 230H180M220 230H300M300 230H560M420 230V400" pathLength="1" className="draw d2" />
      <path d="M180 230V190M180 190A40 40 0 0 1 220 230M300 130H340M300 130A40 40 0 0 1 340 90" stroke="#f2c230" pathLength="1" className="draw d3" />
      <path d="M40 436H560M40 428V444M560 428V444" strokeWidth="1.5" pathLength="1" className="draw d4" />
      <g stroke="none" fill="currentColor" fontSize="15" className="lbl" fontFamily="Public Sans">
        <text x="150" y="140" textAnchor="middle">Living</text>
        <text x="430" y="140" textAnchor="middle">Kitchen</text>
        <text x="170" y="320" textAnchor="middle">Bedroom</text>
        <text x="360" y="320" textAnchor="middle">Bath</text>
        <text x="490" y="320" textAnchor="middle">Store</text>
        <text x="300" y="462" textAnchor="middle">18.0 m</text>
      </g>
    </svg>
  )
}

export default function App() {
  const [open, setOpen] = useState(false)
  const [sent, setSent] = useState(false)
  const [filter, setFilter] = useState('All')
  const [view, setView] = useState(null)
  const shown = gallery.filter((g) => filter === 'All' || g.cat === filter)
  useEffect(() => {
    const k = (e) => e.key === 'Escape' && setView(null)
    window.addEventListener('keydown', k)
    return () => window.removeEventListener('keydown', k)
  }, [])

  return (
    <>
      <header className="sticky top-0 z-50 bg-ink text-paper border-b border-white/10">
        <div className="mx-auto max-w-6xl px-5 h-16 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-3" aria-label="MADORI Homes and Properties home">
            <img src="/logo-mark.png" alt="" className="h-8 w-auto" />
            <span className="font-display text-lg sm:text-2xl font-extrabold tracking-wide leading-none">MADORI <span className="text-tape">Homes and Properties</span></span>
          </a>
          <nav className="hidden lg:flex items-center gap-8 text-sm">
            {links.map(([t, h]) => <a key={t} href={h} className="hover:text-tape">{t}</a>)}
            <a href="#contact" className="bg-tape text-ink font-semibold px-5 py-2.5 hover:bg-white">Get a quote</a>
          </nav>
          <button className="lg:hidden border border-white/30 px-3 py-1.5 text-sm" aria-expanded={open} onClick={() => setOpen(!open)}>{open ? 'Close' : 'Menu'}</button>
        </div>
        {open && (
          <nav className="lg:hidden px-5 pb-5 flex flex-col gap-4">
            {links.map(([t, h]) => <a key={t} href={h} onClick={() => setOpen(false)}>{t}</a>)}
            <a href="#contact" onClick={() => setOpen(false)} className="bg-tape text-ink font-semibold px-5 py-3 text-center">Get a quote</a>
          </nav>
        )}
      </header>

      <main id="top">
        <section className="grid-bg text-paper">
          <div className="mx-auto max-w-6xl px-5 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h1 className="font-display font-black text-6xl md:text-8xl leading-[.9]">
                From floor plan to front door.
              </h1>
              <p className="mt-6 text-lg text-paper/80 max-w-md leading-relaxed">
                MADORI Homes and Properties builds homes and commercial buildings, and helps you buy, sell and rent property. One team, from the first plan to the day you get your keys.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a href="#contact" className="bg-tape text-ink font-semibold px-7 py-3.5 hover:bg-white">Request a quote</a>
                <a href="#projects" className="border border-paper/40 px-7 py-3.5 hover:border-tape hover:text-tape">View projects</a>
              </div>
            </div>
            <FloorPlan />
          </div>
        </section>

        <section id="services" className="mx-auto max-w-6xl px-5 py-20 md:py-28 grid md:grid-cols-[1fr_2fr] gap-10">
          <h2 className="font-display font-extrabold text-5xl md:text-6xl leading-none">What we do</h2>
          <ul className="border-b border-ink/20">
            {services.map(([t, d]) => (
              <li key={t} className="border-t border-ink/20 py-6 grid sm:grid-cols-2 gap-2 hover:bg-white">
                <h3 className="font-display text-3xl font-bold">{t}</h3>
                <p className="text-ink/75 leading-relaxed">{d}</p>
              </li>
            ))}
          </ul>
        </section>

        <section id="projects" className="bg-concrete">
          <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
            <h2 className="font-display font-extrabold text-5xl md:text-6xl leading-none">Our projects</h2>
            <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Filter projects">
              {cats.map((c) => (
                <button key={c} onClick={() => setFilter(c)} aria-pressed={filter === c}
                  className={'px-4 py-2 text-sm font-semibold border ' + (filter === c ? 'bg-ink text-paper border-ink' : 'border-ink/30 hover:border-ink')}>{c}</button>
              ))}
            </div>
            <div className="mt-8 columns-1 sm:columns-2 lg:columns-3 gap-5">
              {shown.map((g) => (
                <figure key={g.src} className="mb-5 break-inside-avoid">
                  <button onClick={() => setView(g)} className="block w-full overflow-hidden group" aria-label={'View larger: ' + g.title}>
                    <img src={g.src} alt={g.title} width={g.w} height={g.h} loading="lazy" className="w-full h-auto transition-transform duration-500 group-hover:scale-105" />
                  </button>
                  <figcaption className="mt-2 flex justify-between gap-3 border-b border-ink/30 pb-2 text-sm">
                    <span className="font-semibold">{g.title}</span><span className="text-ink/70 shrink-0">{g.cat}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
        {view && (
          <div className="fixed inset-0 z-[60] bg-ink/95 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label={view.title} onClick={() => setView(null)}>
            <button className="absolute top-4 right-4 text-paper border border-white/40 px-4 py-2 hover:border-tape" onClick={() => setView(null)}>Close</button>
            <figure onClick={(e) => e.stopPropagation()}>
              <img src={view.src} alt={view.title} className="max-h-[80vh] max-w-full w-auto mx-auto" />
              <figcaption className="mt-3 text-paper text-center">{view.title}</figcaption>
            </figure>
          </div>
        )}

        <section id="properties" className="mx-auto max-w-6xl px-5 py-20 md:py-28">
          <h2 className="font-display font-extrabold text-5xl md:text-6xl leading-none">Properties available</h2>
          <ul className="mt-10 border-b border-ink/20">
            {listings.map(([t, d, pr]) => (
              <li key={t} className="border-t border-ink/20 py-6 grid sm:grid-cols-[2fr_2fr_1fr] gap-2 items-baseline hover:bg-white">
                <h3 className="font-display text-3xl font-bold">{t}</h3>
                <p className="text-ink/75">{d}</p>
                <p className="font-semibold sm:text-right">{pr}</p>
              </li>
            ))}
          </ul>
          <a href="#contact" className="mt-8 inline-block bg-ink text-paper font-semibold px-7 py-3.5 hover:bg-draft">Ask about a property</a>
        </section>

        <section id="process" className="mx-auto max-w-6xl px-5 py-20 md:py-28">
          <h2 className="font-display font-extrabold text-5xl md:text-6xl leading-none">How a project runs</h2>
          <ol className="mt-12 grid md:grid-cols-4 gap-0 border-t-4 border-ink">
            {steps.map(([t, d], i) => (
              <li key={t} className="pt-6 pr-6 pb-8 md:border-r border-ink/20 last:border-r-0">
                <span className="font-display text-5xl font-black text-draft">{i + 1}</span>
                <h3 className="mt-2 font-display text-2xl font-bold">{t}</h3>
                <p className="mt-2 text-ink/75 leading-relaxed">{d}</p>
              </li>
            ))}
          </ol>
        </section>

        <section id="about" className="grid-bg text-paper">
          <div className="mx-auto max-w-6xl px-5 py-20 md:py-28 grid md:grid-cols-2 gap-10">
            <h2 className="font-display font-extrabold text-5xl md:text-6xl leading-none">Named after Malam Madori.</h2>
            <div className="text-lg text-paper/85 leading-relaxed space-y-5 max-w-lg">
              <p>The name MADORI comes from Malam Madori, a local government area under the Hadejia Emirate in Jigawa State, north-east Nigeria. We carry that sense of place into every project: start with what the people living or working there need, then build exactly what was drawn, to the budget and date we agreed.</p>
              <p>MADORI Homes and Properties is part of the MADORI Global Concept group. Our team handles design, construction and property sales together, so you deal with one company from the first sketch to the final handover.</p>
            </div>
          </div>
        </section>

        <section id="founder" className="bg-concrete">
          <div className="mx-auto max-w-6xl px-5 py-20 md:py-28 grid md:grid-cols-[1fr_1.2fr] gap-10 md:gap-16 items-center">
            <img src="/founder.jpg" alt="Abubakar Aminu, founder of MADORI Homes and Properties" width="900" height="1153" className="w-full max-w-sm md:max-w-none aspect-[4/5] object-cover object-top border-b-8 border-tape" />
            <div>
              <h2 className="font-display font-extrabold text-5xl md:text-7xl leading-none">Abubakar Aminu</h2>
              <p className="mt-3 text-xl font-semibold">Founder, MADORI Homes and Properties</p>
              <div className="mt-6 space-y-5 text-lg text-ink/80 leading-relaxed max-w-lg">
                <p>Abubakar Aminu founded MADORI Homes and Properties to build and sell homes and commercial buildings, as part of the MADORI Global Concept group of companies.</p>
              </div>
              <a href="#contact" className="mt-8 inline-block bg-ink text-paper font-semibold px-7 py-3.5 hover:bg-draft">Talk to our team</a>
            </div>
          </div>
        </section>

        <section id="contact" className="mx-auto max-w-6xl px-5 py-20 md:py-28 grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="font-display font-extrabold text-5xl md:text-6xl leading-none">Tell us what you want to build</h2>
            <p className="mt-6 text-ink/75 max-w-sm leading-relaxed">Send a few details and we will reply within one working day.</p>
            <dl className="mt-8 space-y-3">
              <div><dt className="font-semibold">Phone</dt><dd>+234 000 000 0000</dd></div>
              <div><dt className="font-semibold">Email</dt><dd>info@madoriconcept.com</dd></div>
              <div><dt className="font-semibold">Office</dt><dd>Abuja, Nigeria</dd></div>
            </dl>
          </div>
          {sent ? (
            <p className="bg-concrete p-8 text-xl font-semibold self-start">Thanks. We have your request and will reply within one working day.</p>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSent(true) }} className="space-y-5">
              {[['Name', 'text'], ['Phone', 'tel'], ['Email', 'email']].map(([l, t]) => (
                <label key={l} className="block font-semibold text-sm">{l}
                  <input required type={t} className="mt-1 w-full border border-ink/30 bg-white px-4 py-3 font-normal" />
                </label>
              ))}
              <label className="block font-semibold text-sm">Project type
                <select className="mt-1 w-full border border-ink/30 bg-white px-4 py-3 font-normal">
                  {['Residential construction', 'Commercial construction', 'Renovation', 'Buying a property', 'Renting or managing a property', 'Not sure yet'].map((o) => <option key={o}>{o}</option>)}
                </select>
              </label>
              <label className="block font-semibold text-sm">About your project
                <textarea rows="4" className="mt-1 w-full border border-ink/30 bg-white px-4 py-3 font-normal" />
              </label>
              <button className="bg-ink text-paper font-semibold px-8 py-3.5 hover:bg-draft">Send request</button>
            </form>
          )}
        </section>
      </main>

      <footer className="bg-ink text-paper/80">
        <div className="mx-auto max-w-6xl px-5 py-10 flex flex-wrap items-end justify-between gap-6 text-sm">
          <img src="/logo-full.png" alt="MADORI Global Concept, RC-9454059" className="h-28 w-auto" />
          <span>© {new Date().getFullYear()} MADORI Homes and Properties, a member of MADORI Global Concept. All rights reserved.</span>
        </div>
      </footer>
    </>
  )
}
