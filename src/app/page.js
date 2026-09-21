import BookingForm from "@/components/BookingForm";

const highlights = [
  { value: "12+", label: "Signature dishes" },
  { value: "4.9/5", label: "Guest rating" },
  { value: "Every", label: "Friday & Saturday event night" },
];

const menu = [
  { name: "Chef's Tasting", price: "$48", note: "A curated seasonal journey for two" },
  { name: "Fire-Grilled Lamb", price: "$34", note: "Served with saffron rice and grilled greens" },
  { name: "MeeKhaasa Platter", price: "$29", note: "A vibrant trio of house favorites" },
];

const experiences = [
  { title: "Private Dining", text: "Intimate spaces for celebrations, dinners, and elevated gatherings." },
  { title: "Live Evenings", text: "Curated entertainment, soft lighting, and a warm social atmosphere." },
  { title: "Chef's Table", text: "A front-row seat to the artistry behind every dish and pairing." },
];

export default function Home() {
  return (
    <main className="page-shell">
      <section className="hero-section">
        <nav className="topbar">
          <div className="brand-mark">
            <span className="brand-icon">M</span>
            <span>MeeKhaasa</span>
          </div>
          <div className="topbar-links">
            <a href="#about">About</a>
            <a href="#menu">Menu</a>
            <a href="#events">Events</a>
            <a href="#visit">Visit</a>
          </div>
          <a className="primary-button" href="#visit">Reserve a Table</a>
        </nav>

        <div className="hero-content">
          <div className="hero-copy">
            <p className="eyebrow">Modern dining • crafted experiences</p>
            <h1>Elegant flavors for every unforgettable evening.</h1>
            <p className="lede">
              MeeKhaasa blends warm hospitality, refined cooking, and vibrant social energy for
              memorable dinners, celebrations, and special occasions.
            </p>
            <div className="cta-row">
              <a className="primary-button" href="#visit">Book a table</a>
              <a className="secondary-button" href="#events">View events</a>
            </div>
            <div className="stats-row">
              {highlights.map((item) => (
                <div key={item.label} className="stat-card">
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="hero-visual" aria-label="Restaurant atmosphere panel">
            <div className="visual-card visual-card-large">
              <div className="card-badge">Chef&apos;s special</div>
              <h2>Charred Citrus Salmon</h2>
              <p>with saffron herb velouté and seasonal greens.</p>
            </div>
            <div className="visual-stack">
              <div className="visual-card visual-card-small">
                <span>Open today</span>
                <strong>5:00 PM – 11:30 PM</strong>
              </div>
              <div className="visual-card visual-card-small accent">
                <span>Tonight&apos;s vibe</span>
                <strong>Live jazz • candlelit dining</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="info-section split-section">
        <div>
          <p className="section-tag">Our story</p>
          <h2>Thoughtful cuisine rooted in warmth and character.</h2>
        </div>
        <p>
          From slow evenings with friends to milestone celebrations, MeeKhaasa was designed to make
          every gathering feel special. Our kitchen celebrates bold ingredients, elegant plating,
          and a welcoming atmosphere that feels both elevated and personal.
        </p>
      </section>

      <section id="menu" className="info-section menu-section">
        <div className="section-header">
          <div>
            <p className="section-tag">Signature menu</p>
            <h2>Favorites that keep guests coming back.</h2>
          </div>
          <button className="secondary-button" type="button">Explore full menu</button>
        </div>

        <div className="menu-grid">
          {menu.map((item) => (
            <article key={item.name} className="menu-card">
              <div className="dish-art" aria-hidden="true">
                <span>✦</span>
              </div>
              <div className="menu-card-body">
                <div className="menu-card-topline">
                  <h3>{item.name}</h3>
                  <strong>{item.price}</strong>
                </div>
                <p>{item.note}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="events" className="info-section experience-section">
        <div className="section-header">
          <div>
            <p className="section-tag">Experiences</p>
            <h2>Designed for celebrations and memorable nights.</h2>
          </div>
        </div>

        <div className="experience-grid">
          {experiences.map((item) => (
            <article key={item.title} className="experience-card">
              <div className="experience-icon" aria-hidden="true">
                ✧
              </div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="visit" className="visit-panel booking-panel">
        <div className="booking-intro">
          <div>
            <p className="section-tag">Plan your visit</p>
            <h2>Reserve your table for the next unforgettable evening.</h2>
          </div>
          <div className="visit-meta">
            <span>12 Garden Lane, Downtown</span>
            <span>Call: +1 (555) 018-2998</span>
          </div>
        </div>
        <BookingForm />
      </section>
    </main>
  );
}
