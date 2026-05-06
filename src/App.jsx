import { useMemo, useState } from "react";

export default function PersonalServicesPortfolioSite() {
  const [activePreview, setActivePreview] = useState(null);
  const [activeContent, setActiveContent] = useState(null);

  const services = [
    {
      title: "Creative Direction",
      description: "Creative direction for brands, campaigns, and digital experiences shaped with clarity, structure, and a strong point of view.",
      bullets: ["Concept", "Direction", "Campaigns"],
    },
    {
      title: "Branded Content",
      description: "Branded content designed to build interest, trust, and a clearer visual identity across launches, campaigns, and platforms.",
      bullets: ["Campaigns", "Launches", "Visuals"],
    },
    {
      title: "Brand Films & Video",
      description: "Short-form films and video content with stronger atmosphere, sharper storytelling, and a more editorial visual language.",
      bullets: ["Films", "Video", "Storytelling"],
    },
    {
      title: "Copywriting & Editorial",
      description: "Copy, messaging, and editorial writing that help ideas feel structured, expressive, and easier to connect with.",
      bullets: ["Copy", "Messaging", "Editorial"],
    },
    {
      title: "Website & Digital Design",
      description: "Website and digital design shaped for clarity, presence, and a stronger experience across interfaces and brand touchpoints.",
      bullets: ["Websites", "Digital", "Interfaces"],
    },
    {
      title: "Audio & Podcast Production",
      description: "Audio and podcast production that supports storytelling through cleaner structure, editing, and sound presence.",
      bullets: ["Audio", "Podcasts", "Editing"],
    },
  ];

  const previewPages = useMemo(
    () => ({
      boho: {
        key: "boho",
        eyebrow: "Editorial Brand Website",
        title: "Studio Alma",
        subtitle: "A slower, softer way to create.",
        description:
          "A calm, editorial landing page for a creative studio with an intimate tone, airy spacing, and a premium handmade feel.",
        theme: "bg-[#EFE6D8] text-[#241d18]",
        component: <BohoPreview onClose={() => setActivePreview(null)} />,
      },
      coffee: {
        key: "coffee",
        eyebrow: "Lifestyle Café Website",
        title: "North House",
        subtitle: "Coffee, conversation, and a slower start to the day.",
        description:
          "A warm hospitality homepage with a menu preview, community-led copy, and a cozy brand atmosphere.",
        theme: "bg-[#3A2F28] text-[#F3E7D4]",
        component: <CoffeePreview onClose={() => setActivePreview(null)} />,
      },
      restaurant: {
        key: "restaurant",
        eyebrow: "Restaurant Website",
        title: "Noir Table",
        subtitle: "A cinematic dining experience, presented with restraint.",
        description:
          "A dark, elevated restaurant landing page focused on atmosphere, menu storytelling, and reservations.",
        theme: "bg-[#151515] text-[#F5F1E8]",
        component: <RestaurantPreview onClose={() => setActivePreview(null)} />,
      },
      futuristic: {
        key: "futuristic",
        eyebrow: "Product Website",
        title: "Aether One",
        subtitle: "Precision design for a future-facing digital product.",
        description:
          "A clean, dynamic landing page with sharper contrast, modern product messaging, and a tech-aware visual rhythm.",
        theme: "bg-[#12131A] text-[#F5F1E8]",
        component: <FuturisticPreview onClose={() => setActivePreview(null)} />,
      },
    }),
    []
  );

  const previews = Object.values(previewPages);

  const contentPreviews = {
    contactForm: <ContactFormPreview onClose={() => setActiveContent(null)} />,
    film: <FilmPreview onClose={() => setActiveContent(null)} />,
    social: <SocialPreview onClose={() => setActiveContent(null)} />,
    product: <ProductPreview onClose={() => setActiveContent(null)} />,
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-[#F5F1E8]">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top_right,rgba(120,119,198,0.13),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(82,161,122,0.10),transparent_28%)]" />

      <main className="relative mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Cormorant+Garamond:wght@300;400;500;600&family=Cinzel:wght@400;500;600&display=swap');
          .font-editorial { font-family: 'Cormorant Garamond', serif; }
          .font-clean { font-family: 'Inter', sans-serif; }
          .font-cinzel { font-family: 'Cinzel', serif; }
        `}</style>

        {/* HERO */}
        <section className="mb-32 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="max-w-3xl font-clean">
            <div className="text-[11px] uppercase tracking-[0.28em] text-neutral-500">
              Yezdan Givci · Multidisciplinary Creative Director
            </div>
            <h1 className="font-editorial mt-8 text-5xl font-light leading-[0.94] tracking-[0.01em] text-[#F5F1E8] sm:text-6xl lg:text-7xl">
              Story-driven brands,
              <br />
              commercially strong content,
              <br />
              and digital experiences.
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-8 text-neutral-400">
              Creative direction across film, branded video, writing, design, audio, and digital products. Original worlds through Yang Theory. Client work shaped with clarity, atmosphere, and intent.
              <br /><span className="text-neutral-500">Bilingual · English & Turkish · Open to AI, localization, and language-based work.</span>
            </p>
            <div className="mt-10 flex flex-wrap gap-8 text-sm text-neutral-300">
              <button onClick={() => document.getElementById('content-work')?.scrollIntoView({ behavior: 'smooth' })} className="border-b border-white/40 pb-1">Selected work</button>
              <button onClick={() => setActiveContent('contactForm')} className="border-b border-white/10 pb-1 text-neutral-500">Start a project</button>
            </div>
          </div>

          <div className="relative min-h-[520px] overflow-hidden rounded-[2rem] border border-white/10 bg-black">
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="absolute inset-0 h-full w-full object-cover"
            >
              <source
                src="https://res.cloudinary.com/dluw233th/video/upload/v1777175028/0425_3_ki6pqp.mp4"
                type="video/mp4"
              />
            </video>

            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.05),rgba(0,0,0,0.4))]" />
          </div>
        </section>
</video>
          <div className="relative min-h-[520px] overflow-hidden rounded-[2rem] border border-white/10 bg-black">
  <video
    src="/videos/hero-fluid.mp4"
    autoPlay
    muted
    loop
    playsInline
    preload="auto"
    className="absolute inset-0 h-full w-full object-cover"
  />

  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.05),rgba(0,0,0,0.4))]" />
          </div>
        </section>

        {/* SERVICES */}
        <section className="mb-32 font-clean">
          <div className="text-[11px] uppercase tracking-[0.14em] text-neutral-500">Services</div>
          <div className="mt-10 grid gap-x-12 gap-y-10 md:grid-cols-2 xl:grid-cols-3">
            {services.map((s) => (
              <div key={s.title} className="border-t border-white/10 pt-5">
                <div className="text-[1.2rem] font-medium text-[#F5F1E8]">{s.title}</div>
                <div className="mt-3 text-sm leading-7 text-neutral-400">{s.description}</div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {s.bullets.map((b) => (
                    <span key={b} className="text-[11px] uppercase tracking-[0.14em] text-neutral-500">{b}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CONTENT WORK */}
        <section id="content-work" className="mb-32 font-clean">
          <div className="flex items-end justify-between gap-6">
            <div>
              <div className="text-[11px] uppercase tracking-[0.14em] text-neutral-500">Content Work</div>
              <div className="mt-4 max-w-xl text-sm leading-7 text-neutral-400">
                Commercially strong video, social content, and visual storytelling concepts for launches, campaigns, and branded worlds.
              </div>
            </div>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <ContentCard
              title="Brand Launch Film"
              description="Cinematic brand storytelling for product and creative launches."
              variant="film"
              onClick={() => setActiveContent("film")}
            />
            <ContentCard
              title="Campaign Socials"
              description="Structured social content systems designed for clarity and visual consistency."
              variant="social"
              onClick={() => setActiveContent("social")}
            />
            <ContentCard
              title="Product Story Clip"
              description="Short-form content blending atmosphere, message, and product presence."
              variant="product"
              onClick={() => setActiveContent("product")}
            />
          </div>
        </section>

        {/* DESIGN RANGE */}
        <section className="mb-32 font-clean">
          <div className="text-[11px] uppercase tracking-[0.14em] text-neutral-500">Design Range</div>
          <div className="mt-4 max-w-xl text-sm leading-7 text-neutral-400">
            Different visual directions, different brand worlds. These are website landing concepts — each opens into a full homepage design.
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {previews.map((p) => (
              <button key={p.key} onClick={() => setActivePreview(p.key)} className="text-left group">
                <div className={`h-52 overflow-hidden rounded-[1.6rem] border border-white/10 p-4 ${p.theme}`}>
                 {p.key === 'boho' && (
  <img src="/images/luma.jpg" alt="Luma Atelier" className="h-full w-full object-cover" />
)}
                  {p.key === 'coffee' && (
  <img src="/images/north-house.jpg" alt="North House" className="h-full w-full object-cover" />
)}
                {p.key === 'restaurant' && (
  <img src="/images/noir-table.jpg" alt="Noir Table" className="h-full w-full object-cover" />
)}
             {p.key === 'futuristic' && (
  <img src="/images/aether-one.jpg" alt="Aether One" className="h-full w-full object-cover" />
)}
                </div>
                <div className="mt-3 text-sm text-neutral-400 group-hover:text-white">{p.title}</div>
              </button>
            ))}
          </div>
        </section>

        {/* FEATURED PROJECTS */}
        <section className="mb-32 font-clean">
          <div className="text-[11px] uppercase tracking-[0.14em] text-neutral-500">Featured Projects</div>
          <div className="mt-10 grid gap-8 lg:grid-cols-2">
            <a href="https://www.yangtheory.com/journey" target="_blank" rel="noopener noreferrer" className="block overflow-hidden rounded-[2rem] border border-white/10 bg-neutral-900 hover:border-white/20 transition">
              <img
                src="/images.Journey.jpg"
                alt="Journey project atmosphere"
                className="h-72 w-full object-cover"
              />
              <div className="p-7">
                <div className="text-[10px] uppercase tracking-[0.2em] text-neutral-500">Transmedia Project</div>
                <div className="mt-3 text-3xl font-medium text-[#F5F1E8]">Journey</div>
                <div className="mt-4 text-sm leading-7 text-neutral-400">
                  A creative world spanning book, soundtrack, visual design, and short film development.
                </div>
                <div className="mt-6 text-xs uppercase tracking-[0.2em] text-white/60">Enter Journey →</div>
              </div>
            </a>

            <a href="https://www.yangtheory.com/" target="_blank" rel="noopener noreferrer" className="block overflow-hidden rounded-[2rem] border border-white/10 bg-neutral-900 hover:border-white/20 transition">
              <img
                src="/images/yang-theory.jpg"
                alt="Yang Theory creative platform"
                className="h-72 w-full object-cover"
              />
              <div className="p-7">
                <div className="text-[10px] uppercase tracking-[0.2em] text-neutral-500">Creative Platform</div>
                <div className="mt-3 text-3xl font-medium text-[#F5F1E8]">Yang Theory</div>
                <div className="mt-4 text-sm leading-7 text-neutral-400">
                  The umbrella platform for original releases, concepts, and long-form creative worlds.
                </div>
                <div className="mt-6 text-xs uppercase tracking-[0.2em] text-white/60">Visit Platform →</div>
              </div>
            </a>
          </div>
        </section>

        {/* CURRENTLY IN DEVELOPMENT */}
        <section className="mb-32 font-clean">
          <div className="text-[11px] uppercase tracking-[0.14em] text-neutral-500">In Development</div>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="rounded-[1.8rem] border border-white/10 bg-neutral-900/70 p-7">
              <div className="text-[10px] uppercase tracking-[0.2em] text-neutral-500">Book Project</div>
              <div className="mt-3 text-xl font-medium text-[#F5F1E8]">Magical World of Herbs</div>
              <div className="mt-4 text-sm leading-7 text-neutral-400">
                An upcoming book project currently being written and shaped visually.
              </div>
            </div>
            <div className="rounded-[1.8rem] border border-white/10 bg-neutral-900/70 p-7">
              <div className="text-[10px] uppercase tracking-[0.2em] text-neutral-500">App Concept</div>
              <div className="mt-3 text-xl font-medium text-[#F5F1E8]">Cell</div>
              <div className="mt-4 text-sm leading-7 text-neutral-400">
                A digital product concept in active development, focused on interface, utility, and experience.
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section className="border-t border-white/10 pt-12 font-clean">
          <div className="text-[11px] uppercase tracking-[0.14em] text-neutral-500">Contact</div>
          <div className="mt-4 text-3xl font-medium text-[#F5F1E8]">Open for selected projects and collaborations.</div>
          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-neutral-400">
            <a href="mailto:hello@yangtheory.com" className="inline-flex items-center gap-2 underline">
              <span aria-hidden="true">✉</span>
              <span>Let’s connect</span>
            </a>
            <span aria-hidden="true">·</span>
            <a href="https://www.yangtheory.com/" target="_blank" rel="noopener noreferrer" className="underline">Yang Theory</a>
          </div>
        </section>
      </main>

      {activePreview && (
        <div className="fixed inset-0 z-50 bg-black/80 p-4 backdrop-blur-sm md:p-8">
          <div className="mx-auto h-full max-w-6xl overflow-hidden rounded-[2rem] border border-white/10 bg-neutral-950 shadow-2xl shadow-black/50">
            {previewPages[activePreview].component}
          </div>
        </div>
      )}

      {activeContent && (
        <div className="fixed inset-0 z-50 bg-black/80 p-4 backdrop-blur-sm md:p-8">
          <div className="mx-auto h-full max-w-6xl overflow-hidden rounded-[2rem] border border-white/10 bg-neutral-950 shadow-2xl shadow-black/50">
            {contentPreviews[activeContent]}
          </div>
        </div>
      )}
    </div>
  );
}

function ContentCard({ title, description, variant, onClick }) {
  return (
    <button
      onClick={onClick}
      className="text-left rounded-[1.8rem] border border-white/10 bg-neutral-900/90 p-4 transition hover:-translate-y-1 hover:border-white/20"
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-[1.4rem] border border-white/10 bg-black">
        {variant === "film" && (
          <img
            src="/videos/brand-launch.mp4"
            alt="Brand launch campaign"
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}
        {variant === "social" && (
          <div className="absolute inset-0 grid grid-cols-2 gap-[2px] bg-black">
            <img
              src="/images/campaign-1.jpg"
              alt="Campaign social post 1"
              className="h-full w-full object-cover"
            />
            <img
              src="/images/campaign-2.jpg"
              alt="Campaign social post 2"
              className="h-full w-full object-cover"
            />
            <img
              src="/images/campaign-3.jpg"
              alt="Campaign social post 3"
              className="h-full w-full object-cover"
            />
            <img
              src="/images/campaign-4.jpg"
              alt="Campaign social post 4"
              className="h-full w-full object-cover"
            />
          </div>
        )}
        {variant === "product" && (
          <img
            src="/images/product-story-3.jpg"
            alt="Product story clip"
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}
        <div className="absolute inset-0 p-4">
          <div className="flex h-full flex-col justify-between">
            <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.16em] text-white/60">
              <span>{variant === "film" ? "Campaign" : variant === "social" ? "Social" : "Launch"}</span>
              <span>00:24</span>
            </div>
            <div className="flex items-end justify-between">
              <div className="max-w-[75%] text-lg font-medium text-white">{title}</div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white">▶</div>
            </div>
          </div>
        </div>
      </div>
      <p className="mt-4 text-sm leading-6 text-neutral-400">{description}</p>
    </button>
  );
}

function BohoCard() {
  return (
    <div className="flex h-full flex-col justify-between">
      <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.18em] text-black/45">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#B9AA90]/40 text-[#8A7A61]">✿</div>
          <div className="leading-none">
            <div className="font-editorial text-[1.5rem] tracking-[0.08em] text-[#3A3128] normal-case">Luma</div>
            <div className="mt-1 text-[9px] uppercase tracking-[0.42em] text-[#8A7A61]">Atelier</div>
          </div>
        </div>
        <span>Studio</span>
      </div>

      <div className="grid gap-3">
        <div className="h-20 rounded-[1.2rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.25),rgba(255,255,255,0.06))]" />
        <div className="grid grid-cols-3 gap-2">
          <div className="h-12 rounded-xl bg-black/5" />
          <div className="h-12 rounded-xl bg-[#E7DED0]" />
          <div className="h-12 rounded-xl bg-black/5" />
        </div>
      </div>

      <div className="flex gap-2 text-[10px] text-black/55">
        {['Rituals', 'Skin', 'Book'].map((item) => (
          <div key={item} className="rounded-full border border-black/12 px-2 py-1">{item}</div>
        ))}
      </div>
    </div>
  );
}

function CoffeeCard() {
  return (
    <div className="flex h-full flex-col justify-between text-[#F3E7D4]">
      <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.18em] text-[#E8D7BE]/60">
        <div className="leading-none">
          <div className="font-serif text-[1.55rem] tracking-[0.06em] normal-case">North House</div>
          <div className="mt-1 text-[9px] uppercase tracking-[0.34em] text-[#D2B89A]">Coffee & Kitchen</div>
        </div>
        <span>Since 2018</span>
      </div>

      <div className="grid gap-3">
        <div className="h-24 rounded-[1.2rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))]" />
        <div className="grid grid-cols-2 gap-2">
          <div className="h-12 rounded-xl bg-[#6A5447]/55" />
          <div className="h-12 rounded-xl bg-[#8F6F59]/35" />
        </div>
      </div>

      <div className="flex gap-2 text-[10px] text-[#E8D7BE]/72">
        {['Menu', 'Visit', 'Story'].map((item) => (
          <div key={item} className="rounded-full border border-[#E8D7BE]/24 px-2 py-1">{item}</div>
        ))}
      </div>
    </div>
  );
}

function RestaurantCard() {
  return (
    <div className="flex h-full flex-col justify-between">
      <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-white/42">
        <div className="leading-none">
          <div className="font-cinzel text-[1.35rem] tracking-[0.24em] text-[#F5F1E8]">NOIR</div>
          <div className="mt-1 font-cinzel text-[9px] tracking-[0.38em] text-white/46">TABLE</div>
        </div>
        <span>Fine Dining</span>
      </div>

      <div className="grid gap-3">
        <div className="h-24 rounded-[1.2rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.01))]" />
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/16 to-transparent" />
      </div>

      <div className="flex gap-2 text-[10px] text-white/58">
        {['Menu', 'Reserve', 'Story'].map((item) => (
          <div key={item} className="rounded-full border border-white/16 px-2 py-1">{item}</div>
        ))}
      </div>
    </div>
  );
}

function FuturisticCard() {
  return (
    <div className="flex h-full flex-col justify-between text-white">
      <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-white/52">
        <div className="leading-none">
          <div className="text-[1.25rem] font-semibold tracking-[0.16em]">AETHER</div>
          <div className="mt-1 text-[9px] uppercase tracking-[0.4em] text-[#8EA4FF]">One</div>
        </div>
        <span>Product</span>
      </div>

      <div className="relative flex items-center justify-center">
        <div className="h-24 w-24 rounded-[34%_66%_58%_42%/42%_36%_64%_58%] bg-[radial-gradient(circle_at_30%_30%,rgba(255,176,86,0.95),rgba(103,120,255,0.82),rgba(90,226,255,0.55),transparent_72%)] blur-[0.5px] shadow-[0_0_40px_rgba(107,127,255,0.35)]" />
      </div>

      <div className="flex gap-2 text-[10px] text-white/62">
        {['Interface', 'System', 'Flow'].map((item) => (
          <div key={item} className="rounded-full border border-white/16 px-2 py-1">{item}</div>
        ))}
      </div>
    </div>
  );
}

function PreviewShell({ onClose, children, className = "bg-neutral-950 text-[#F5F1E8]" }) {
  return (
    <div className={`h-full overflow-y-auto ${className}`}>
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-black/10 bg-inherit/95 px-6 py-4 backdrop-blur md:px-8">
        <div className="text-xs uppercase tracking-[0.2em] text-current/55">Preview</div>
        <button
          onClick={onClose}
          className="rounded-full border border-current/15 px-4 py-2 text-xs uppercase tracking-[0.16em] text-current/70 transition hover:border-current/25 hover:text-current"
        >
          Close
        </button>
      </div>
      {children}
    </div>
  );
}

function BohoPreview({ onClose }) {
  return (
    <PreviewShell onClose={onClose} className="h-full overflow-y-auto bg-[#F3EEE6] text-[#2D261F] font-editorial">
      <div className="mx-auto max-w-[1180px] px-6 py-8 md:px-8 md:py-10">
        <div className="flex items-center justify-between border-b border-black/5 pb-6 text-[11px] uppercase tracking-[0.16em] text-black/45">
          <div className="flex items-center gap-4">
            <div className="flex flex-col leading-none">
              <span className="font-editorial text-[2.1rem] tracking-[0.12em] text-[#3A3128]">Luma</span>
              <span className="mt-1 pl-[0.12rem] text-[10px] uppercase tracking-[0.42em] text-[#8A7A61]">Atelier</span>
            </div>
          </div>
          <div className="hidden items-center gap-8 md:flex">
            <span className="text-[#8A7A61]">Home</span>
            <span>About</span>
            <span>Services</span>
            <span>Rituals</span>
            <span>Journal</span>
            <span>Contact</span>
          </div>
          <button className="rounded-none bg-[#7A826B] px-6 py-4 text-[11px] tracking-[0.16em] text-[#F3EEE6]">Book Appointment</button>
        </div>

        <div className="mt-8 grid gap-7 lg:grid-cols-[1.7fr_0.78fr]">
          <div className="relative overflow-hidden bg-[#E7DED0] min-h-[620px]">
            <img
              src="https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=1400&auto=format&fit=crop"
              alt="Luma Atelier hero"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(243,238,230,0.58),rgba(243,238,230,0.08)_48%,rgba(243,238,230,0.02))]" />
            <div className="relative flex h-full flex-col justify-end p-10 md:p-14">
              <div className="max-w-md">
                <div className="text-[11px] uppercase tracking-[0.22em] text-[#9E876A]">Beauty. Wellness. Ritual.</div>
                <div className="mt-6 h-px w-12 bg-[#CDB89A]" />
                <h1 className="mt-8 text-5xl font-light leading-[1.04] tracking-[0.01em] text-[#241E19] md:text-7xl">
                  Care that<br />
                  feels like <span className="italic text-[#8D977C]">you.</span>
                </h1>
                <button className="mt-10 bg-[#88907A] px-7 py-4 text-[11px] uppercase tracking-[0.16em] text-[#F3EEE6]">
                  Discover Our Rituals
                </button>
              </div>
            </div>
          </div>

          <div className="border border-[#D8CCBC] bg-[#EFE7DB] px-6 pb-8 pt-10 text-center">
            <div className="mx-auto flex h-[520px] max-w-[340px] flex-col rounded-t-[999px] border border-[#D7CABB] px-6 pb-8 pt-10">
              <div className="text-[11px] uppercase tracking-[0.22em] text-[#A08667]">Signature Ritual</div>
              <div className="mt-5 text-4xl font-light tracking-[0.08em] text-[#2B241E]">LUMA GLOW</div>
              <div className="mt-3 text-[11px] uppercase tracking-[0.22em] text-[#A08667]">90 Minutes</div>
              <img
                src="https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=900&auto=format&fit=crop"
                alt="Luma Glow facial"
                className="mt-10 h-56 w-full object-cover"
              />
              <div className="mt-6 text-base leading-8 text-black/65">
                A deeply restorative facial that hydrates, brightens, and renews.
              </div>
              <button className="mt-auto pt-8 text-[11px] uppercase tracking-[0.18em] text-[#2B241E]">
                Book Now →
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-0 md:grid-cols-3">
          <img
            src="https://images.unsplash.com/photo-1507652313519-d4e9174996dd?q=80&w=1000&auto=format&fit=crop"
            alt="Studio interior"
            className="h-[320px] w-full object-cover"
          />
          <div className="bg-[#EFE8E0] px-10 py-10">
            <div className="text-[11px] uppercase tracking-[0.22em] text-[#A08667]">Founder’s Note</div>
            <div className="mt-7 text-5xl italic font-light leading-none text-[#8F947E]">Welcome. I’m Alina.</div>
            <p className="mt-8 max-w-sm text-[16px] leading-8 text-black/70">
              LUMA Atelier was created as a quiet space for you to slow down and come home to yourself. Every ritual is designed with intention.
            </p>
            <div className="mt-8 text-4xl italic text-[#7D846E]">Alina</div>
            <button className="mt-6 text-[11px] uppercase tracking-[0.18em] text-[#2D261F]">Our Story →</button>
          </div>
          <div className="flex flex-col items-center justify-center bg-[#E3DED1] px-10 py-10 text-center">
            <div className="text-6xl leading-none text-[#B59B79]">“</div>
            <div className="mt-6 max-w-xs text-4xl font-light leading-[1.32] text-[#2D261F]">
              A sanctuary for skin,
              <br />
              self and soul.
            </div>
            <div className="mt-8 h-px w-10 bg-[#C9B08F]" />
            <div className="mt-8 text-[13px] uppercase tracking-[0.18em] text-[#2D261F]">Well+Good</div>
          </div>
        </div>

        <div className="mt-6 grid gap-0 lg:grid-cols-[1.45fr_0.8fr]">
          <div className="bg-[#F7F2EB] px-10 py-12 md:px-14">
            <div className="text-center">
              <div className="text-[11px] uppercase tracking-[0.22em] text-[#A08667]">Rituals That Nurture</div>
              <h2 className="mt-4 text-5xl font-light tracking-[0.01em] text-[#2D261F]">Our Treatments</h2>
            </div>
            <div className="mt-12 grid gap-0 md:grid-cols-4">
              {[
                ["✿", "Signature Facials", "Restore your natural glow with results-driven care."],
                ["✦", "Body Rituals", "Detox, relax and replenish from head to toe."],
                ["◌", "Skin Therapy", "Targeted solutions for long-term skin health."],
                ["☼", "Wellness Massage", "Relieve tension and restore your energy."],
              ].map(([icon, title, text]) => (
                <div key={title} className="flex flex-col items-center px-6 py-4 text-center md:border-r md:border-black/8 last:md:border-r-0">
                  <div className="text-3xl text-[#A58C67]">{icon}</div>
                  <div className="mt-6 text-[13px] uppercase tracking-[0.16em] text-[#2D261F]">{title}</div>
                  <div className="mt-5 text-sm leading-7 text-black/65">{text}</div>
                  <button className="mt-6 text-[11px] uppercase tracking-[0.16em] text-[#2D261F]">Book →</button>
                </div>
              ))}
            </div>
          </div>
          <img
            src="https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=1000&auto=format&fit=crop"
            alt="Luma Atelier products"
            className="h-full min-h-[360px] w-full object-cover"
          />
        </div>

        <div className="mt-6 relative overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1519823551278-64ac92734fb1?q=80&w=1400&auto=format&fit=crop"
            alt="Treatment room"
            className="h-[360px] w-full object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(58,38,22,0.18),rgba(58,38,22,0.58))]" />
          <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-[#F7F1E8]">
            <div className="text-6xl font-light leading-tight tracking-[0.01em]">Your time. Your ritual.</div>
            <div className="mt-5 text-2xl">We can’t wait to welcome you.</div>
            <button className="mt-8 bg-[#88907A] px-8 py-4 text-[11px] uppercase tracking-[0.16em] text-[#F7F1E8]">
              Book Your Ritual
            </button>
          </div>
        </div>

        <div className="grid gap-0 bg-[#7E866D] px-8 py-8 text-[#F5EFE5] md:grid-cols-[1.2fr_1fr_1fr_1.2fr_1fr] md:px-10">
          <div>
            <div className="font-editorial text-[2.2rem] tracking-[0.12em] text-[#F5EFE5]">Luma</div>
            <div className="mt-1 text-[10px] uppercase tracking-[0.42em] text-white/70">Atelier</div>
          </div>
          <div className="text-sm leading-7">123 Greenway Rd<br />Los Angeles, CA 90026</div>
          <div className="text-sm leading-7">Tue – Sun<br />10AM – 7PM</div>
          <div className="text-sm leading-7">hello@lumaatelier.com<br />323 555 0198</div>
          <div className="text-sm leading-7">Follow Along<br />Instagram · Pinterest</div>
        </div>
      </div>
    </PreviewShell>
  );
}

function CoffeePreview({ onClose }) {
  return (
    <PreviewShell onClose={onClose} className="h-full overflow-y-auto bg-[#f7f2ea] text-[#2c221c]">
      <div className="mx-auto max-w-[1180px] px-6 py-8 md:px-8 md:py-10">
        <div className="flex items-center justify-between py-4 text-[12px] text-[#6f5b4c]">
          <div className="font-serif text-3xl tracking-[0.08em]">North House</div>
          <div className="hidden items-center gap-8 uppercase tracking-[0.18em] md:flex text-[11px]">
            <span>Menu</span>
            <span>Story</span>
            <span>Location</span>
            <span>Journal</span>
          </div>
          <button className="rounded-full border border-[#bba893] px-5 py-2 text-[11px] uppercase tracking-[0.16em]">Order Ahead</button>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
          <div className="rounded-[2rem] bg-[#e9ddcf] p-8 md:p-10">
            <div className="text-[11px] uppercase tracking-[0.2em] text-[#9a7a58]">Neighborhood café</div>
            <h1 className="mt-6 max-w-sm font-serif text-5xl leading-[1.02] md:text-7xl">
              Coffee for slow mornings and long afternoons.
            </h1>
            <p className="mt-6 max-w-md text-[16px] leading-8 text-black/62">
              A warm, lived-in café brand with seasonal drinks, fresh pastries, and a room designed for staying awhile.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button className="rounded-full bg-[#7b604b] px-6 py-3 text-[11px] uppercase tracking-[0.16em] text-[#f7f2ea]">
                Explore the Menu
              </button>
              <button className="rounded-full border border-black/10 bg-white/40 px-6 py-3 text-[11px] uppercase tracking-[0.16em] text-[#2c221c]">
                Find Us
              </button>
            </div>

            <div className="mt-12 grid grid-cols-2 gap-4">
              <div className="rounded-[1.4rem] bg-white/45 p-5">
                <div className="text-[10px] uppercase tracking-[0.18em] text-[#9a7a58]">Hours</div>
                <div className="mt-3 text-2xl font-serif">7AM – 6PM</div>
              </div>
              <div className="rounded-[1.4rem] bg-[#d9c5ad] p-5">
                <div className="text-[10px] uppercase tracking-[0.18em] text-[#8a6745]">Today’s special</div>
                <div className="mt-3 text-2xl font-serif">Maple Oat Latte</div>
              </div>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-[1.05fr_0.95fr]">
            <img
              src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1400&auto=format&fit=crop"
              alt="North House interior"
              className="h-[520px] w-full rounded-[2rem] object-cover sm:h-[620px]"
            />
            <div className="flex flex-col gap-6">
              <div className="overflow-hidden rounded-[2rem] bg-[#d6b391] p-5">
                <img
                  src="https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=900&auto=format&fit=crop"
                  alt="Signature latte"
                  className="h-56 w-full rounded-[1.4rem] object-cover"
                />
                <div className="mt-5 text-[11px] uppercase tracking-[0.18em] text-[#7f5e41]">Signature drink</div>
                <div className="mt-2 font-serif text-3xl">House Latte</div>
                <div className="mt-2 text-sm leading-7 text-black/62">Espresso, oat milk, maple, and cinnamon foam.</div>
              </div>
              <div className="rounded-[2rem] bg-[#2f241e] px-6 py-7 text-[#f7efe6]">
                <div className="text-[11px] uppercase tracking-[0.18em] text-white/55">House note</div>
                <div className="mt-4 font-serif text-3xl leading-[1.2]">Come for the coffee. Stay for the room.</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[0.82fr_1.18fr]">
          <div className="rounded-[2rem] bg-[#efe5d9] p-8">
            <div className="text-[11px] uppercase tracking-[0.18em] text-[#9a7a58]">Our story</div>
            <div className="mt-5 font-serif text-4xl leading-[1.08]">Built for warm cups, good light, and daily ritual.</div>
            <p className="mt-5 text-[15px] leading-8 text-black/62">
              North House was imagined as a softer kind of café. Familiar, design-led, and easy to return to.
            </p>
            <button className="mt-8 text-[11px] uppercase tracking-[0.18em] text-[#2c221c]">Read the story →</button>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            <img
              src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1000&auto=format&fit=crop"
              alt="Coffee pour"
              className="h-64 w-full rounded-[1.8rem] object-cover sm:h-80"
            />
            <img
              src="https://images.unsplash.com/photo-1484723091739-30a097e8f929?q=80&w=1000&auto=format&fit=crop"
              alt="Pastry"
              className="h-64 w-full rounded-[1.8rem] object-cover sm:h-80"
            />
            <div className="rounded-[1.8rem] bg-[#e2d4c2] p-6 flex flex-col justify-center text-center">
              <div className="text-5xl leading-none text-[#a07d59]">“</div>
              <div className="mt-4 font-serif text-3xl leading-[1.25]">The kind of café you return to.</div>
              <div className="mt-6 text-[11px] uppercase tracking-[0.18em] text-[#7d6044]">Daily Brew Guide</div>
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-[2.2rem] bg-[#fbf7f1] px-8 py-10 md:px-12">
          <div className="flex items-end justify-between gap-6 border-b border-black/8 pb-6">
            <div>
              <div className="text-[11px] uppercase tracking-[0.18em] text-[#9a7a58]">Menu highlights</div>
              <h2 className="mt-3 font-serif text-5xl">What’s on the table</h2>
            </div>
            <div className="hidden text-[11px] uppercase tracking-[0.18em] text-[#7f6248] md:block">Updated daily</div>
          </div>

          <div className="mt-8 grid gap-0 md:grid-cols-2">
            <div className="space-y-6 pr-0 md:pr-10">
              {[
                ["House Coffee", "$4", "Balanced daily roast with caramel and cocoa notes."],
                ["Maple Oat Latte", "$6", "Soft sweetness with oat milk and cinnamon foam."],
                ["Butter Croissant", "$5", "Flaky, warm, and baked fresh every morning."],
              ].map(([item, price, desc]) => (
                <div key={item} className="border-b border-black/8 pb-6">
                  <div className="flex items-baseline justify-between gap-4">
                    <div className="font-serif text-2xl">{item}</div>
                    <div className="text-sm text-[#8a6848]">{price}</div>
                  </div>
                  <div className="mt-2 text-sm leading-7 text-black/60">{desc}</div>
                </div>
              ))}
            </div>
            <div className="mt-8 space-y-6 border-black/8 md:mt-0 md:border-l md:pl-10">
              {[
                ["Brunch Toast", "$11", "Ricotta, roasted tomato, herbs, and olive oil."],
                ["Seasonal Cake", "$7", "A rotating house bake served by the slice."],
                ["Cold Brew", "$5", "Slow-steeped and poured over ice."],
              ].map(([item, price, desc]) => (
                <div key={item} className="border-b border-black/8 pb-6">
                  <div className="flex items-baseline justify-between gap-4">
                    <div className="font-serif text-2xl">{item}</div>
                    <div className="text-sm text-[#8a6848]">{price}</div>
                  </div>
                  <div className="mt-2 text-sm leading-7 text-black/60">{desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.12fr_0.88fr]">
          <img
            src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1400&auto=format&fit=crop"
            alt="North House seating"
            className="h-[380px] w-full rounded-[2rem] object-cover"
          />
          <div className="rounded-[2rem] bg-[#7a624d] px-8 py-10 text-[#f6eee4] flex flex-col justify-between">
            <div>
              <div className="text-[11px] uppercase tracking-[0.18em] text-white/60">Visit North House</div>
              <div className="mt-4 font-serif text-5xl leading-[1.05]">Coffee, brunch, and a room worth staying in.</div>
            </div>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 text-sm leading-7 text-white/80">
              <div>87 Orchard Ave<br />Brooklyn, NY 11211</div>
              <div>Mon – Sun<br />7AM – 6PM</div>
            </div>
          </div>
        </div>
      </div>
    </PreviewShell>
  );
}

function RestaurantPreview({ onClose }) {
  return (
    <PreviewShell onClose={onClose} className="h-full overflow-y-auto bg-[#0b0b0b] text-[#EDE7DD] font-cinzel">
      <div className="mx-auto max-w-[980px] px-6 py-10 md:px-8 md:py-14">
        <div className="flex items-center justify-between text-[11px] tracking-[0.28em] text-white/40 uppercase">
          <div className="text-[13px] tracking-[0.5em] text-white/90 font-normal">NOIR TABLE</div>
          <div className="hidden md:flex gap-12">
            <span>Menu</span>
            <span>About</span>
            <span>Private Dining</span>
          </div>
        </div>

        <div className="mt-24 text-center">
          <div className="text-[10px] tracking-[0.3em] uppercase text-[#BFA27A]">Fine Dining</div>
          <h1 className="mt-6 text-[3.6rem] md:text-[5.2rem] leading-[1.05] font-normal tracking-[0.02em]">
            Noir Table
          </h1>
          <p className="mt-6 max-w-md mx-auto text-[15px] leading-8 text-white/50">
            A restrained dining experience shaped by light, silence, and precision.
          </p>
        </div>

        <div className="mt-16">
          <img
            src="https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1800&auto=format&fit=crop"
            className="w-full h-[520px] object-cover"
            alt="Fine dining minimal plating"
          />
        </div>

        <div className="mt-24 max-w-xl mx-auto text-center">
          <div className="text-[10px] uppercase tracking-[0.3em] text-[#BFA27A]">Tasting Menu</div>
          <h2 className="mt-6 text-[2.4rem] font-normal tracking-[0.02em]">Tonight’s sequence</h2>
          <div className="mt-12 space-y-8 text-left">
            {[
              "Oyster · green apple · dill",
              "Leek · cultured cream · smoke",
              "Halibut · fennel · saffron",
              "Duck · fig · bitter leaves",
              "Cheese · pear · walnut",
              "Chocolate · espresso · salt",
            ].map((item, i) => (
              <div key={i} className="flex justify-between text-[15px] text-white/80">
                <span>{item}</span>
                <span className="text-white/30">{String(i + 1).padStart(2, "0")}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-24">
          <img
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1600&auto=format&fit=crop"
            className="w-full h-[420px] object-cover"
            alt="Dark luxury dining room"
          />
        </div>

        <div className="mt-24 max-w-lg mx-auto text-center">
          <p className="text-[1.6rem] leading-[1.5] font-normal text-white/90 tracking-[0.01em]">
            “Luxury is not in what is added, but in what is removed.”
          </p>
          <div className="mt-6 text-[11px] tracking-[0.3em] uppercase text-white/40">
            The Dining Ledger
          </div>
        </div>

        <div className="mt-24 text-center text-sm text-white/50 leading-7">
          21 Mercer Street<br />New York, NY<br /><br />
          Wed – Sun · 6PM – 11PM
        </div>
      </div>
    </PreviewShell>
  );
}

function FilmPreview({ onClose }) {
  return (
    <PreviewShell onClose={onClose} className="bg-black text-white">
      <div className="p-10 md:p-12">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <div>
            <div className="text-[10px] uppercase tracking-[0.24em] text-white/45">Brand Launch Film</div>
            <h1 className="mt-6 max-w-xl text-4xl font-light leading-[1.04] md:text-5xl">
              A cinematic entry point for a brand, product, or release.
            </h1>
            <p className="mt-6 max-w-lg text-[15px] leading-8 text-neutral-400">
              Designed to create impact from the first moment, establish tone, and define the visual language of a launch through atmosphere, movement, and strong image-making.
            </p>
          </div>

          <div className="rounded-[1.6rem] border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm">
            <div className="text-[11px] uppercase tracking-[0.2em] text-white/45">What it does</div>
            <div className="mt-4 text-sm leading-7 text-neutral-300">
              Creates first impression, builds emotional connection, and gives a campaign a clear visual center across website, social, and launch materials.
            </div>
          </div>
        </div>

        <div className="relative mt-12 overflow-hidden rounded-[1.8rem] border border-white/10">
          <img
            src="/videos.brand-launch.mp4"
            alt="Brand launch campaign hero"
            className="h-[520px] w-full object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.08),rgba(0,0,0,0.55))]" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full border border-white/30 bg-white/10 text-2xl text-white backdrop-blur-sm">
              ▶
            </div>
          </div>
          <div className="absolute left-8 top-8 text-[10px] uppercase tracking-[0.22em] text-white/62">Launch visual</div>
          <div className="absolute bottom-8 left-8 max-w-sm text-sm leading-7 text-white/72">
            Hero film for an organic food product campaign.
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <div>
            <img
              src="/images.brand-launch-1.jpg"
              className="h-72 w-full rounded-[1.4rem] border border-white/10 object-cover"
            />
            <div className="mt-3 text-[11px] uppercase tracking-[0.18em] text-white/40">Opening Frame</div>
            <div className="mt-2 text-sm leading-6 text-neutral-400">
              Establishes tone, color, and visual identity from the first second.
            </div>
          </div>

          <div>
            <img
              src="/images.brand-launch-2.jpg"
              alt="Detail and texture"
              className="h-72 w-full rounded-[1.4rem] border border-white/10 object-cover"
            />
            <div className="mt-3 text-[11px] uppercase tracking-[0.18em] text-white/40">Detail / Texture</div>
            <div className="mt-2 text-sm leading-6 text-neutral-400">
              Focus on material, product, or close-up moments that build desire.
            </div>
          </div>

          <div>
            <img
              src="/images.brand-launch-3.jpg"
              alt="Narrative moment"
              className="h-72 w-full rounded-[1.4rem] border border-white/10 object-cover"
            />
            <div className="mt-3 text-[11px] uppercase tracking-[0.18em] text-white/40">Narrative Moment</div>
            <div className="mt-2 text-sm leading-6 text-neutral-400">
              A scene that adds movement, emotion, or context to the campaign.
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <div className="rounded-xl border border-white/10 bg-white/5 p-6">
            <div className="text-[11px] uppercase tracking-[0.2em] text-white/50">What it is</div>
            <div className="mt-3 text-sm leading-7 text-neutral-300">
              A hero film designed to introduce a brand or product through atmosphere, rhythm, and visual storytelling.
            </div>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-6">
            <div className="text-[11px] uppercase tracking-[0.2em] text-white/50">Deliverables</div>
            <div className="mt-3 text-sm leading-7 text-neutral-300">
              Hero film, short edits, vertical versions, campaign stills, and launch-ready cuts for different platforms.
            </div>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-6">
            <div className="text-[11px] uppercase tracking-[0.2em] text-white/50">Approach</div>
            <div className="mt-3 text-sm leading-7 text-neutral-300">
              Developed through concept direction, AI-assisted visual creation, scripting, and editing focused on strong ideas rather than production scale.
            </div>
          </div>
        </div>
      </div>
    </PreviewShell>
  );
}

function SocialPreview({ onClose }) {
  return (
    <PreviewShell onClose={onClose} className="bg-black text-white">
      <div className="p-10 md:p-12">

        {/* INTRO */}
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <div>
            <div className="text-[10px] uppercase tracking-[0.24em] text-white/45">Campaign Socials</div>
            <h1 className="mt-6 max-w-xl text-4xl font-light leading-[1.04] md:text-5xl">
              A visual system built for campaigns, not just posts.
            </h1>
            <p className="mt-6 max-w-lg text-[15px] leading-8 text-neutral-400">
              Designed to create consistency, rhythm, and recognizability across social platforms while allowing variation in tone, product, and storytelling.
            </p>
          </div>

          <div className="rounded-[1.6rem] border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm">
            <div className="text-[11px] uppercase tracking-[0.2em] text-white/45">What it does</div>
            <div className="mt-4 text-sm leading-7 text-neutral-300">
              Turns individual posts into a cohesive campaign language that can scale across drops, launches, and ongoing brand presence.
            </div>
          </div>
        </div>

        {/* CATALOG GRID (REAL FEEL) */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <img src="/images/campaign-1.jpg" />
          <img src="/images/campaign-2.jpg" />
          <img src="/images/campaign-3.jpg" />
          <img src="/images/campaign-4.jpg" />

          <img src="/images/campaign-5.jpg" />
          <img src="/images/campaign-6.jpg" />
          <img src="/images/campaign-7.jpg" />
          <img src="/images/campaign-8.jpg" />
        </div>

        {/* STRUCTURE */}
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <div className="rounded-xl border border-white/10 bg-white/5 p-6">
            <div className="text-[11px] uppercase tracking-[0.2em] text-white/50">System</div>
            <div className="mt-3 text-sm leading-7 text-neutral-300">
              A repeatable visual language that keeps campaigns consistent across posts, drops, and sequences.
            </div>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-6">
            <div className="text-[11px] uppercase tracking-[0.2em] text-white/50">Range</div>
            <div className="mt-3 text-sm leading-7 text-neutral-300">
              Fashion, product, editorial, and experimental visuals adapted to different brand tones.
            </div>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-6">
            <div className="text-[11px] uppercase tracking-[0.2em] text-white/50">Use</div>
            <div className="mt-3 text-sm leading-7 text-neutral-300">
              Launches, social campaigns, brand storytelling, and ongoing content systems.
            </div>
          </div>
        </div>

      </div>
    </PreviewShell>
  );
}

function ContactFormPreview({ onClose }) {
  return (
    <PreviewShell onClose={onClose} className="bg-[#0f0f11] text-[#F5F1E8]">
      <div className="mx-auto max-w-5xl px-8 py-12 md:px-12 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <div className="text-[10px] uppercase tracking-[0.26em] text-white/40">Studio Inquiry</div>
            <h1 className="font-editorial mt-6 text-5xl font-light leading-[0.94] tracking-[0.01em] text-[#F5F1E8] md:text-6xl">
              Enter the studio.
            </h1>
            <p className="mt-6 max-w-md text-[15px] leading-8 text-white/58">
              Share what is being built, what kind of support is needed, and what kind of direction would make the project feel stronger, clearer, and more alive.
            </p>
            <div className="mt-10 space-y-6 text-sm leading-7 text-white/62">
              <div className="border-t border-white/10 pt-5">
                Creative direction, content, websites, film, editorial work, bilingual projects, and digital concepts.
              </div>
              <div className="border-t border-white/10 pt-5">
                For collaborations, commissions, campaigns, and selected long-form creative projects.
              </div>
              <div className="border-t border-white/10 pt-5">English and Turkish inquiries welcome.</div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-sm md:p-10">
            <form action="mailto:hello@yangtheory.com" method="POST" encType="text/plain" className="grid gap-6">
              <div>
                <label className="mb-2 block text-[11px] uppercase tracking-[0.18em] text-white/42">Name</label>
                <input name="name" placeholder="Your name" className="w-full border border-white/10 bg-black/20 px-4 py-3 text-sm text-white placeholder:text-white/25 focus:outline-none" />
              </div>
              <div>
                <label className="mb-2 block text-[11px] uppercase tracking-[0.18em] text-white/42">Email</label>
                <input name="email" type="email" placeholder="Email address" className="w-full border border-white/10 bg-black/20 px-4 py-3 text-sm text-white placeholder:text-white/25 focus:outline-none" />
              </div>
              <div>
                <label className="mb-2 block text-[11px] uppercase tracking-[0.18em] text-white/42">Type of service</label>
                <input name="service" placeholder="Creative direction, branded content, website, copy, audio..." className="w-full border border-white/10 bg-black/20 px-4 py-3 text-sm text-white placeholder:text-white/25 focus:outline-none" />
              </div>
              <div>
                <label className="mb-2 block text-[11px] uppercase tracking-[0.18em] text-white/42">Project details</label>
                <textarea name="details" placeholder="Tell me what you need, the tone you want, and what would make this project successful." rows={6} className="w-full resize-none border border-white/10 bg-black/20 px-4 py-3 text-sm leading-7 text-white placeholder:text-white/25 focus:outline-none" />
              </div>
              <button type="submit" className="mt-2 self-start border border-white/18 px-8 py-4 text-[11px] uppercase tracking-[0.18em] text-white transition hover:bg-white hover:text-black">
                Send Inquiry
              </button>
            </form>
          </div>
        </div>
      </div>
    </PreviewShell>
  );
}

function ProductPreview({ onClose }) {
  return (
    <PreviewShell onClose={onClose} className="bg-black text-white">
      <div className="p-10 md:p-12">

        {/* HERO - LUXURY */}
        <div className="relative overflow-hidden rounded-[1.8rem] border border-white/10">
          <img
            src="/videos/product-story.mp4"
            className="h-[520px] w-full object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.1),rgba(0,0,0,0.6))]" />
        </div>

        <div className="mt-12 max-w-2xl">
          <h1 className="text-4xl font-light leading-tight md:text-5xl">
            Product Story Clip
          </h1>
          <p className="mt-6 leading-8 text-neutral-400">
            A refined, sensory-driven format focused on desire, material, and presence. Built to make a product feel elevated, intimate, and essential.
          </p>
        </div>

        {/* CLOSE-UP LUXURY GRID */}
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <img
            src="/images/product-story-1.jpg"
            className="h-80 w-full object-cover rounded-[1.4rem] border border-white/10"
          />
          <img
            src="/images/product-story-2.jpg"
            className="h-80 w-full object-cover rounded-[1.4rem] border border-white/10"
          />
          <img
            src="/images/product-story-3.jpg"
            className="h-80 w-full object-cover rounded-[1.4rem] border border-white/10"
          />
        </div>

        {/* STRUCTURE */}
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <div className="rounded-xl border border-white/10 bg-white/5 p-6">
            <div className="text-[11px] uppercase tracking-[0.2em] text-white/50">Focus</div>
            <div className="mt-3 text-sm leading-7 text-neutral-300">
              Texture, surface, light interaction, and close-up visual storytelling.
            </div>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-6">
            <div className="text-[11px] uppercase tracking-[0.2em] text-white/50">Tone</div>
            <div className="mt-3 text-sm leading-7 text-neutral-300">
              Minimal, cinematic, and luxury-focused with slower pacing.
            </div>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-6">
            <div className="text-[11px] uppercase tracking-[0.2em] text-white/50">Use</div>
            <div className="mt-3 text-sm leading-7 text-neutral-300">
              Product pages, premium campaigns, and high-end brand storytelling.
            </div>
          </div>
        </div>

      </div>
    </PreviewShell>
  );
}

function FuturisticPreview({ onClose }) {
  return (
    <PreviewShell onClose={onClose} className="h-full overflow-y-auto bg-[#1a1a1d] text-white">
      <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.05),transparent_26%),linear-gradient(180deg,#222327,#16171b)] px-6 py-8 md:px-10 md:py-10">
        <div className="mx-auto max-w-[1460px] rounded-[2.2rem] border border-white/10 bg-black shadow-[0_20px_80px_rgba(0,0,0,0.45)] overflow-hidden">
          {/* NAV */}
          <div className="flex items-center justify-between px-8 py-6 text-sm text-white/90 md:px-12">
            <div className="text-[1.05rem] font-semibold tracking-tight">Aether One</div>
            <div className="hidden items-center gap-10 text-[0.95rem] md:flex">
              <span>Course</span>
              <span>Tutorial</span>
              <span>Podcast</span>
              <span>About</span>
            </div>
            <div className="text-3xl leading-none text-white/90">≡</div>
          </div>

          <div className="h-px bg-white/12" />

          {/* HERO */}
          <div className="relative overflow-hidden px-8 py-14 md:px-12 md:py-16">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_58%_70%,rgba(255,116,44,0.22),transparent_16%),radial-gradient(circle_at_68%_78%,rgba(84,204,255,0.20),transparent_16%),radial-gradient(circle_at_60%_48%,rgba(124,78,255,0.18),transparent_18%)]" />

            <div className="relative z-10 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <div className="pt-4">
                <h1 className="max-w-[7.5ch] text-[4.5rem] font-extralight leading-[0.98] tracking-tight text-white md:text-[7rem]">
                  Aether into
                  <br />
                  Product
                  <br />
                  Presence
                </h1>

                <p className="mt-10 max-w-xl text-[1rem] leading-8 text-white/72 md:text-[1.05rem]">
                  A future-facing landing page built around dimensional form, atmosphere, and sharper product storytelling.
                </p>

                <button className="mt-10 rounded-full border border-white/70 px-10 py-4 text-[1rem] font-medium text-white transition hover:bg-white hover:text-black">
                  Get course
                </button>
              </div>

              {/* VISUAL */}
              <div className="relative min-h-[760px] flex items-center justify-center">
                <div className="h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(255,120,80,0.9),rgba(120,120,255,0.6),transparent_70%)] blur-2xl" />
              </div>
            </div>
          </div>

          {/* SECTION 2 - COURSES */}
          <div className="border-t border-white/10 px-10 py-20 md:px-14">
            <div className="text-[11px] uppercase tracking-[0.2em] text-white/40">Courses</div>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {["3D Fundamentals","Advanced Lighting","Product Rendering"].map((c) => (
                <div key={c} className="rounded-xl border border-white/10 bg-white/5 p-6">
                  <div className="text-xl">{c}</div>
                  <div className="mt-3 text-sm text-white/60">High-quality structured learning for visual creators.</div>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 3 - CONTENT */}
          <div className="border-t border-white/10 px-10 py-20 md:px-14">
            <div className="text-[11px] uppercase tracking-[0.2em] text-white/40">Tutorials</div>
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {[1,2].map((i) => (
                <div key={i} className="h-64 rounded-xl border border-white/10 bg-white/5" />
              ))}
            </div>
          </div>

          {/* SECTION 4 - ABOUT */}
          <div className="border-t border-white/10 px-10 py-20 md:px-14 text-center">
            <div className="max-w-2xl mx-auto">
              <div className="text-[11px] uppercase tracking-[0.2em] text-white/40">About</div>
              <h2 className="mt-6 text-4xl font-light">Aether is a space for digital creators.</h2>
              <p className="mt-6 text-white/60 leading-8">
                Focused on clarity, tools, and visual thinking — built for people working across design, 3D, and digital products.
              </p>
            </div>
          </div>

          {/* FOOTER */}
          <div className="border-t border-white/10 px-10 py-12 text-sm text-white/40 text-center">
            © Aether One — All rights reserved
          </div>
        </div>
      </div>
    </PreviewShell>
  );
}

