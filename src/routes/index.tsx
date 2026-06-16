import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useTransform, animate, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Compass, Sparkles, Star, BookOpen, Phone, Mail, MapPin, MessageCircle, ChevronRight, Quote } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Arihant Raaj — Scientific Vastu, Astrology & Numerology" },
      { name: "description", content: "Ancient wisdom meets scientific guidance. Premium Vastu, Astrology and Numerology consultancy by Arihant Raaj." },
      { property: "og:title", content: "Arihant Raaj — Royal Heritage Spiritual Consultancy" },
      { property: "og:description", content: "Harmony, prosperity and success through Scientific Vastu, Astrology and Numerology." },
    ],
  }),
  component: Home,
});

/* ============================================================
   Decorative SVG primitives
   ============================================================ */

function PalaceArch({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 800 400" className={className} fill="none" preserveAspectRatio="none">
      <defs>
        <linearGradient id="goldArch" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E8C77A" />
          <stop offset="50%" stopColor="#C89B3C" />
          <stop offset="100%" stopColor="#8B6A22" />
        </linearGradient>
      </defs>
      <path
        d="M40 400 L40 200 Q40 40 400 40 Q760 40 760 200 L760 400"
        stroke="url(#goldArch)" strokeWidth="2"
      />
      <path
        d="M70 400 L70 210 Q70 70 400 70 Q730 70 730 210 L730 400"
        stroke="url(#goldArch)" strokeWidth="1" opacity="0.6"
      />
      {Array.from({ length: 24 }).map((_, i) => {
        const angle = (180 / 23) * i;
        const rad = ((angle - 0) * Math.PI) / 180;
        const cx = 400 - Math.cos(rad) * 330;
        const cy = 200 - Math.sin(rad) * 160;
        return <circle key={i} cx={cx} cy={cy} r="2" fill="#C89B3C" opacity="0.7" />;
      })}
    </svg>
  );
}

function Lotus({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor" strokeWidth="1">
      <g>
        {Array.from({ length: 8 }).map((_, i) => (
          <ellipse key={i} cx="50" cy="35" rx="6" ry="22"
            transform={`rotate(${i * 45} 50 50)`} />
        ))}
        <circle cx="50" cy="50" r="6" fill="currentColor" opacity="0.5" />
      </g>
    </svg>
  );
}

function Divider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-4 text-gold ${className}`}>
      <span className="h-px w-16 sm:w-24 bg-gradient-to-r from-transparent to-gold/60" />
      <Lotus className="w-6 h-6 text-gold" />
      <span className="h-px w-16 sm:w-24 bg-gradient-to-l from-transparent to-gold/60" />
    </div>
  );
}

/* ============================================================
   Floating gold particles
   ============================================================ */

function GoldParticles({ count = 18 }: { count?: number }) {
  const particles = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 2 + Math.random() * 4,
        duration: 14 + Math.random() * 18,
        delay: Math.random() * -20,
        opacity: 0.3 + Math.random() * 0.5,
      })),
    [count]
  );
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full bg-gold animate-float-up"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            boxShadow: "0 0 8px 1px rgba(200,155,60,0.7)",
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

/* ============================================================
   Reveal wrapper
   ============================================================ */

function Reveal({ children, delay = 0, y = 30, className = "" }: { children: React.ReactNode; delay?: number; y?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ============================================================
   Brand / Logo mark
   ============================================================ */

function BrandMark({ className = "" }: { className?: string }) {
  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      <svg viewBox="0 0 60 60" className="w-10 h-10">
        <defs>
          <linearGradient id="lm" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#E8C77A" />
            <stop offset="100%" stopColor="#A67828" />
          </linearGradient>
        </defs>
        <circle cx="30" cy="30" r="28" fill="none" stroke="url(#lm)" strokeWidth="1" />
        <circle cx="30" cy="30" r="22" fill="none" stroke="url(#lm)" strokeWidth="0.5" />
        <g stroke="url(#lm)" strokeWidth="1" fill="none">
          {Array.from({ length: 8 }).map((_, i) => (
            <ellipse key={i} cx="30" cy="18" rx="3" ry="11" transform={`rotate(${i * 45} 30 30)`} />
          ))}
        </g>
        <text x="30" y="35" textAnchor="middle" fontSize="11" fill="#6D1A1A" fontFamily="Cinzel" fontWeight="700">AR</text>
      </svg>
      <div className="flex flex-col leading-tight">
        <span className="font-display text-lg sm:text-xl text-maroon tracking-widest">ARIHANT RAAJ</span>
        <span className="font-serif italic text-[10px] sm:text-xs text-gold tracking-[0.3em]">EST · WISDOM · LEGACY</span>
      </div>
    </div>
  );
}

/* ============================================================
   Header
   ============================================================ */

function Header() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 30);
    on();
    window.addEventListener("scroll", on);
    return () => window.removeEventListener("scroll", on);
  }, []);
  const links = [
    ["Home", "#home"], ["Founder", "#founder"], ["Services", "#pillars"],
    ["Vastu", "#compass"], ["Astrology", "#zodiac"], ["Numerology", "#numerology"], ["Contact", "#contact"],
  ];
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "bg-ivory/95 backdrop-blur-sm border-b border-gold/30 py-3" : "py-5"}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 flex items-center justify-between gap-4">
        <a href="#home"><BrandMark /></a>
        <nav className="hidden lg:flex items-center gap-7 text-sm tracking-wide text-ink/80">
          {links.map(([l, h]) => (
            <a key={h} href={h} className="relative hover:text-maroon transition-colors after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-gold hover:after:w-full after:transition-all after:duration-500">{l}</a>
          ))}
        </nav>
        <a href="#contact" className="hidden sm:inline-flex items-center gap-2 rounded-none border border-gold/70 px-5 py-2 text-xs uppercase tracking-[0.25em] text-maroon hover:bg-maroon hover:text-ivory transition-all">
          Book <ChevronRight className="w-3 h-3" />
        </a>
      </div>
    </header>
  );
}

/* ============================================================
   Hero
   ============================================================ */

function Hero() {
  return (
    <section id="home" className="relative min-h-[100svh] flex items-center justify-center ivory-texture overflow-hidden pt-24">
      {/* Mandala watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="mandala-bg w-[900px] h-[900px] max-w-[120vw] max-h-[120vw] opacity-60 animate-spin-slower" />
      </div>

      {/* Palace arch frame */}
      <PalaceArch className="absolute inset-x-0 top-16 w-full h-[80vh] opacity-70 pointer-events-none" />

      <GoldParticles count={22} />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <Reveal delay={0.1}>
          <div className="inline-flex items-center gap-3 mb-8">
            <span className="h-px w-12 bg-gold/60" />
            <span className="font-serif italic text-gold tracking-[0.4em] text-xs sm:text-sm">SINCE 2009</span>
            <span className="h-px w-12 bg-gold/60" />
          </div>
        </Reveal>

        <Reveal delay={0.25}>
          <BrandMark className="mb-8 justify-center" />
        </Reveal>

        <Reveal delay={0.4}>
          <h1 className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-maroon leading-[1.1]">
            Ancient Wisdom.
            <br />
            <span className="font-serif italic font-normal gold-text">Scientific Guidance.</span>
            <br />
            Transformative Results.
          </h1>
        </Reveal>

        <Reveal delay={0.6}>
          <p className="mt-8 max-w-2xl mx-auto font-serif text-lg sm:text-xl text-ink/80 leading-relaxed">
            Helping individuals, families, and businesses achieve harmony, prosperity, and success through
            <span className="text-maroon font-medium"> Scientific Vastu, Astrology, and Numerology</span>.
          </p>
        </Reveal>

        <Reveal delay={0.8}>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#contact" className="group relative inline-flex items-center gap-2 bg-maroon text-ivory px-8 py-4 text-xs uppercase tracking-[0.3em] gold-shimmer overflow-hidden">
              <span className="relative z-10">Book Consultation</span>
              <ChevronRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
              <span className="gold-shimmer-inner" />
              <span className="absolute inset-0 border border-gold/50" />
            </a>
            <a href="#pillars" className="inline-flex items-center gap-2 border border-maroon/40 text-maroon px-8 py-4 text-xs uppercase tracking-[0.3em] hover:bg-maroon/5 transition-colors">
              Explore Services
            </a>
          </div>
        </Reveal>

        <Reveal delay={1}>
          <Divider className="mt-16" />
        </Reveal>
      </div>
    </section>
  );
}

/* ============================================================
   Founder's message — manuscript
   ============================================================ */

function Founder() {
  return (
    <section id="founder" className="relative py-24 sm:py-32 bg-ivory-deep/50">
      <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-12 gap-12 items-center">
        <Reveal className="lg:col-span-5">
          <div className="relative">
            <div className="absolute -inset-4 border border-gold/50" />
            <div className="absolute -inset-2 border border-gold/30" />
            <div className="relative aspect-[3/4] bg-gradient-to-br from-maroon/90 to-maroon-deep overflow-hidden">
              <div className="absolute inset-0 mandala-bg opacity-30" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-ivory/90">
                  <div className="w-32 h-32 mx-auto rounded-full bg-ivory/10 border border-gold/60 flex items-center justify-center mb-4">
                    <span className="font-display text-5xl gold-text">AR</span>
                  </div>
                  <p className="font-serif italic text-lg">Arihant Raaj</p>
                  <p className="text-xs tracking-[0.3em] text-gold mt-2">FOUNDER · ACHARYA</p>
                </div>
              </div>
              {/* Corner ornaments */}
              {[0,1,2,3].map((i) => (
                <div key={i} className={`absolute w-8 h-8 border-gold/70 ${i===0?"top-2 left-2 border-t border-l":i===1?"top-2 right-2 border-t border-r":i===2?"bottom-2 left-2 border-b border-l":"bottom-2 right-2 border-b border-r"}`} />
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.2} className="lg:col-span-7">
          <p className="font-serif italic text-gold tracking-[0.3em] text-xs uppercase mb-4">A Message from the Founder</p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-maroon leading-tight">
            Wisdom passed through generations, guided by science.
          </h2>
          <Divider className="my-8 !justify-start" />
          <div className="space-y-5 font-serif text-lg text-ink/85 leading-relaxed">
            <p>
              <span className="float-left font-display text-6xl text-maroon leading-none mr-3 mt-1">F</span>
              or over fifteen years, I have devoted my life to the sacred study of Vastu Shastra, Vedic Astrology and Numerology — disciplines refined by sages and tested by time. My approach is rooted in scientific rigor, ancestral knowledge, and a genuine commitment to every family I serve.
            </p>
            <p>
              We do not offer predictions of fear. We offer clarity, alignment, and practical guidance — so you may live a life of harmony, abundance, and unwavering purpose.
            </p>
            <p className="font-display text-maroon tracking-wider not-italic">— Acharya Arihant Raaj</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ============================================================
   Three pillars
   ============================================================ */

function Pillars() {
  const items = [
    {
      title: "Scientific Vastu",
      desc: "Harmonize your home and workplace with the timeless laws of directional energy and sacred architecture.",
      icon: (
        <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="1.2">
          <path d="M20 80 L20 50 L50 25 L80 50 L80 80 Z" />
          <path d="M35 80 L35 60 L65 60 L65 80" />
          <path d="M50 60 L50 80" />
          <path d="M10 80 L90 80" />
          <path d="M30 45 L50 30 L70 45" />
          <circle cx="50" cy="48" r="2" fill="currentColor" />
        </svg>
      ),
    },
    {
      title: "Vedic Astrology",
      desc: "Decode your celestial blueprint through ancient Jyotish — illuminating purpose, timing and destiny.",
      icon: (
        <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="1.2">
          <circle cx="50" cy="50" r="35" />
          <circle cx="50" cy="50" r="25" />
          {Array.from({length:12}).map((_,i)=>(
            <line key={i} x1="50" y1="15" x2="50" y2="25" transform={`rotate(${i*30} 50 50)`} />
          ))}
          <path d="M50 30 L55 45 L70 45 L58 53 L63 68 L50 60 L37 68 L42 53 L30 45 L45 45 Z" fill="currentColor" opacity="0.15"/>
        </svg>
      ),
    },
    {
      title: "Sacred Numerology",
      desc: "Reveal the vibrational signature of your name and birth — the silent architecture of your fortune.",
      icon: (
        <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="1.2">
          <polygon points="50,15 85,40 72,80 28,80 15,40" />
          <circle cx="50" cy="50" r="20" />
          <path d="M50 30 L50 70 M30 50 L70 50 M35 35 L65 65 M65 35 L35 65" opacity="0.5"/>
          <text x="50" y="56" textAnchor="middle" fontSize="14" fill="currentColor" fontFamily="Cinzel">9</text>
        </svg>
      ),
    },
  ];
  return (
    <section id="pillars" className="relative py-24 sm:py-32 ivory-texture">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <p className="text-center font-serif italic text-gold tracking-[0.3em] text-xs uppercase">The Three Pillars</p>
          <h2 className="mt-4 text-center font-display text-3xl sm:text-5xl text-maroon">Sacred Disciplines, Refined for Today</h2>
          <Divider className="mt-8" />
        </Reveal>

        <div className="mt-20 grid md:grid-cols-3 gap-12 lg:gap-16">
          {items.map((it, i) => (
            <Reveal key={it.title} delay={i * 0.15}>
              <div className="group text-center">
                <div className="relative mx-auto w-56 h-56 lg:w-64 lg:h-64">
                  <div className="absolute inset-0 rounded-full border border-gold/40 group-hover:animate-glow-pulse transition-all" />
                  <div className="absolute inset-3 rounded-full border border-gold/25" />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-ivory to-ivory-deep flex items-center justify-center transition-transform duration-700 group-hover:-translate-y-2 group-hover:shadow-[0_30px_60px_-25px_rgba(109,26,26,0.4)]">
                    <div className="w-28 h-28 text-maroon transition-transform duration-700 group-hover:scale-110">
                      {it.icon}
                    </div>
                  </div>
                </div>
                <h3 className="mt-8 font-display text-2xl text-maroon">{it.title}</h3>
                <p className="mt-3 font-serif text-lg text-ink/75 leading-relaxed max-w-xs mx-auto">{it.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   Why Arihant Raaj
   ============================================================ */

function WhyUs() {
  const items = [
    { t: "Scientific Approach", d: "Every recommendation grounded in measurable principles." },
    { t: "Personalized Solutions", d: "No templates. Each consultation crafted for your unique chart." },
    { t: "Experienced Guidance", d: "Over 15 years of dedicated practice and study." },
    { t: "Authentic Knowledge", d: "Lineage rooted in classical Jain and Vedic texts." },
    { t: "Practical Recommendations", d: "Remedies that fit your home, schedule and budget." },
    { t: "Proven Client Results", d: "A thousand families transformed across India and abroad." },
  ];
  const icons = ["✦", "❖", "✧", "❋", "✺", "✹"];
  return (
    <section className="relative py-24 sm:py-32 bg-maroon text-ivory overflow-hidden">
      <div className="absolute inset-0 mandala-bg opacity-[0.08]" />
      <div className="absolute inset-0 bg-gradient-to-b from-maroon-deep/30 via-transparent to-maroon-deep/30" />
      <div className="relative max-w-7xl mx-auto px-6">
        <Reveal>
          <p className="text-center font-serif italic text-gold tracking-[0.3em] text-xs uppercase">Why Arihant Raaj</p>
          <h2 className="mt-4 text-center font-display text-3xl sm:text-5xl text-ivory">The Hallmarks of a Royal Practice</h2>
          <div className="mt-6 flex items-center justify-center gap-4 text-gold">
            <span className="h-px w-16 bg-gold/60" /><Lotus className="w-6 h-6" /><span className="h-px w-16 bg-gold/60" />
          </div>
        </Reveal>

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-gold/20">
          {items.map((it, i) => (
            <Reveal key={it.t} delay={i * 0.08}>
              <div className="h-full bg-maroon p-10 group hover:bg-maroon-deep transition-colors">
                <div className="text-gold text-3xl mb-4 group-hover:scale-110 transition-transform inline-block">{icons[i]}</div>
                <h3 className="font-display text-xl text-ivory tracking-wide">{it.t}</h3>
                <div className="mt-3 h-px w-10 bg-gold/60 group-hover:w-20 transition-all" />
                <p className="mt-4 font-serif text-lg text-ivory/75 leading-relaxed">{it.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   Interactive Vastu compass
   ============================================================ */

const DIRECTIONS = {
  N: { name: "North", element: "Water · Kuber", importance: "The seat of wealth and career flow. Aligning the North invites financial opportunity and steady professional growth.", benefits: ["Career advancement", "Wealth accumulation", "New opportunities"], remedies: ["Place a water feature or aquarium", "Use shades of blue and black", "Keep this zone open and uncluttered"] },
  E: { name: "East", element: "Air · Indra", importance: "The direction of the rising sun — vitality, health and clarity. East-facing entrances welcome auspicious energy.", benefits: ["Vibrant health", "Mental clarity", "Family harmony"], remedies: ["Allow ample morning sunlight", "Use green or light yellow", "Place sacred plants like Tulsi"] },
  S: { name: "South", element: "Fire · Yama", importance: "Governs strength, fame and reputation. A balanced South builds enduring authority and public recognition.", benefits: ["Strength and stability", "Fame and recognition", "Protection from negativity"], remedies: ["Use red and earthen tones", "Place heavy furniture here", "Display awards and achievements"] },
  W: { name: "West", element: "Earth · Varuna", importance: "The direction of fulfillment, gains and progeny. A well-tuned West brings completion and creative reward.", benefits: ["Financial gains", "Creative success", "Joy with children"], remedies: ["Use white and silver hues", "Keep the storage zone here", "Place metallic decor elements"] },
} as const;

type DirKey = keyof typeof DIRECTIONS;

function VastuCompass() {
  const [dir, setDir] = useState<DirKey>("N");
  const angle: Record<DirKey, number> = { N: 0, E: 90, S: 180, W: 270 };
  const current = DIRECTIONS[dir];
  return (
    <section id="compass" className="relative py-24 sm:py-32 ivory-texture">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <p className="text-center font-serif italic text-gold tracking-[0.3em] text-xs uppercase">Interactive Vastu Compass</p>
          <h2 className="mt-4 text-center font-display text-3xl sm:text-5xl text-maroon">Discover the Wisdom of Direction</h2>
          <Divider className="mt-8" />
        </Reveal>

        <div className="mt-16 grid lg:grid-cols-2 gap-16 items-center">
          <Reveal>
            <div className="relative mx-auto w-[320px] h-[320px] sm:w-[420px] sm:h-[420px]">
              {/* Outer brass ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gold-soft via-gold to-[#8B6A22] shadow-[0_30px_80px_-20px_rgba(109,26,26,0.4)]" />
              <div className="absolute inset-2 rounded-full bg-gradient-to-br from-ivory to-ivory-deep" />
              {/* Tick marks */}
              <motion.div
                className="absolute inset-0"
                animate={{ rotate: -angle[dir] }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              >
                {Array.from({ length: 36 }).map((_, i) => (
                  <div key={i} className="absolute left-1/2 top-3 -translate-x-1/2 origin-[50%_calc(50vw)]"
                    style={{ height: i % 9 === 0 ? 18 : 8, width: i % 9 === 0 ? 2 : 1, background: "#6D1A1A", transform: `rotate(${i*10}deg) translateY(0)`, transformOrigin: "50% calc(50% - 2px)", left: "50%", top: "8px" } as React.CSSProperties}
                  />
                ))}
                {/* Compass face decor */}
                <div className="absolute inset-8 rounded-full border border-maroon/40" />
                <div className="absolute inset-16 rounded-full border border-maroon/30" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Lotus className="w-32 h-32 text-maroon/30" />
                </div>
              </motion.div>

              {/* Cardinal buttons (don't rotate) */}
              {(["N","E","S","W"] as DirKey[]).map((k) => {
                const pos = k === "N" ? "top-4 left-1/2 -translate-x-1/2" : k === "S" ? "bottom-4 left-1/2 -translate-x-1/2" : k === "E" ? "right-4 top-1/2 -translate-y-1/2" : "left-4 top-1/2 -translate-y-1/2";
                return (
                  <button
                    key={k}
                    onClick={() => setDir(k)}
                    className={`absolute ${pos} w-12 h-12 rounded-full font-display text-lg transition-all ${dir===k ? "bg-maroon text-ivory shadow-lg scale-110" : "bg-ivory text-maroon hover:bg-gold/20"} border-2 border-gold/70 z-10`}
                    aria-label={DIRECTIONS[k].name}
                  >{k}</button>
                );
              })}

              {/* Needle */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                animate={{ rotate: angle[dir] }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="relative w-3 h-[55%]">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[10px] border-r-[10px] border-b-[40%] border-l-transparent border-r-transparent border-b-maroon" style={{ borderBottomWidth: "55%" } as React.CSSProperties}/>
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-r-[8px] border-l-transparent border-r-transparent" style={{ borderTopWidth: "30%", borderTopStyle: "solid", borderTopColor: "#C89B3C" } as React.CSSProperties}/>
                </div>
              </motion.div>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-5 h-5 rounded-full bg-gradient-to-br from-gold to-[#8B6A22] border-2 border-maroon" />
              </div>
            </div>
          </Reveal>

          <AnimatePresence mode="wait">
            <motion.div
              key={dir}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.6 }}
              className="bg-ivory/80 backdrop-blur-sm p-8 sm:p-10 border border-gold/40 relative"
            >
              <div className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-gold" />
              <div className="absolute -top-3 -right-3 w-6 h-6 border-t-2 border-r-2 border-gold" />
              <div className="absolute -bottom-3 -left-3 w-6 h-6 border-b-2 border-l-2 border-gold" />
              <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-gold" />

              <p className="font-serif italic text-gold tracking-[0.3em] text-xs">{current.element}</p>
              <h3 className="mt-2 font-display text-3xl sm:text-4xl text-maroon">{current.name}</h3>
              <p className="mt-4 font-serif text-lg text-ink/80 leading-relaxed">{current.importance}</p>

              <div className="mt-6 grid sm:grid-cols-2 gap-6">
                <div>
                  <p className="font-display text-sm tracking-widest text-maroon">BENEFITS</p>
                  <ul className="mt-3 space-y-2">
                    {current.benefits.map(b => <li key={b} className="font-serif text-ink/80 flex gap-2"><span className="text-gold">✦</span>{b}</li>)}
                  </ul>
                </div>
                <div>
                  <p className="font-display text-sm tracking-widest text-maroon">REMEDIES</p>
                  <ul className="mt-3 space-y-2">
                    {current.remedies.map(r => <li key={r} className="font-serif text-ink/80 flex gap-2"><span className="text-gold">✦</span>{r}</li>)}
                  </ul>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   Zodiac wheel
   ============================================================ */

const ZODIACS = [
  { sign: "Aries", sym: "♈", date: "Mar 21 – Apr 19", trait: "Pioneer · Courage · Initiative" },
  { sign: "Taurus", sym: "♉", date: "Apr 20 – May 20", trait: "Stability · Beauty · Patience" },
  { sign: "Gemini", sym: "♊", date: "May 21 – Jun 20", trait: "Curiosity · Wit · Communication" },
  { sign: "Cancer", sym: "♋", date: "Jun 21 – Jul 22", trait: "Intuition · Nurture · Home" },
  { sign: "Leo", sym: "♌", date: "Jul 23 – Aug 22", trait: "Royalty · Warmth · Creativity" },
  { sign: "Virgo", sym: "♍", date: "Aug 23 – Sep 22", trait: "Precision · Service · Wisdom" },
  { sign: "Libra", sym: "♎", date: "Sep 23 – Oct 22", trait: "Harmony · Grace · Justice" },
  { sign: "Scorpio", sym: "♏", date: "Oct 23 – Nov 21", trait: "Depth · Power · Transformation" },
  { sign: "Sagittarius", sym: "♐", date: "Nov 22 – Dec 21", trait: "Vision · Truth · Adventure" },
  { sign: "Capricorn", sym: "♑", date: "Dec 22 – Jan 19", trait: "Mastery · Discipline · Legacy" },
  { sign: "Aquarius", sym: "♒", date: "Jan 20 – Feb 18", trait: "Innovation · Insight · Vision" },
  { sign: "Pisces", sym: "♓", date: "Feb 19 – Mar 20", trait: "Compassion · Dream · Spirit" },
];

function ZodiacWheel() {
  const [active, setActive] = useState(0);
  const current = ZODIACS[active];
  return (
    <section id="zodiac" className="relative py-24 sm:py-32 bg-ivory-deep/40">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <p className="text-center font-serif italic text-gold tracking-[0.3em] text-xs uppercase">The Sacred Zodiac</p>
          <h2 className="mt-4 text-center font-display text-3xl sm:text-5xl text-maroon">Your Celestial Signature</h2>
          <Divider className="mt-8" />
        </Reveal>

        <div className="mt-16 grid lg:grid-cols-2 gap-12 items-center">
          <Reveal>
            <div className="relative mx-auto w-[320px] h-[320px] sm:w-[440px] sm:h-[440px]">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-maroon to-maroon-deep shadow-[0_30px_80px_-20px_rgba(109,26,26,0.5)]" />
              <div className="absolute inset-3 rounded-full border-2 border-gold/60" />
              <div className="absolute inset-8 rounded-full border border-gold/40" />
              <motion.div
                className="absolute inset-0"
                animate={{ rotate: -active * 30 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              >
                {ZODIACS.map((z, i) => {
                  const angle = i * 30;
                  return (
                    <button
                      key={z.sign}
                      onClick={() => setActive(i)}
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                      style={{ transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-42%) rotate(${active * 30}deg)` } as React.CSSProperties}
                      aria-label={z.sign}
                    >
                      <span className={`flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full text-2xl sm:text-3xl transition-all ${active===i ? "bg-gold text-maroon scale-125 shadow-lg" : "bg-ivory/10 text-gold hover:bg-ivory/20"}`}>
                        {z.sym}
                      </span>
                    </button>
                  );
                })}
              </motion.div>
              {/* Center medallion */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-gradient-to-br from-gold-soft to-gold flex items-center justify-center border-4 border-maroon">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={current.sign}
                      initial={{ opacity: 0, scale: 0.6 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.6 }}
                      transition={{ duration: 0.4 }}
                      className="text-5xl sm:text-6xl text-maroon font-display"
                    >{current.sym}</motion.span>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <AnimatePresence mode="wait">
              <motion.div
                key={current.sign}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-center lg:text-left"
              >
                <p className="font-serif italic text-gold tracking-[0.3em] text-xs">{current.date}</p>
                <h3 className="mt-2 font-display text-5xl sm:text-6xl text-maroon">{current.sign}</h3>
                <p className="mt-4 font-serif text-2xl text-ink/80">{current.trait}</p>
                <p className="mt-6 font-serif text-lg text-ink/70 leading-relaxed max-w-md mx-auto lg:mx-0">
                  Each sign carries an ancient archetype — a key to understanding your strengths, your karma, and the auspicious path before you. A personal reading reveals the precise dance of planets at your moment of birth.
                </p>
                <a href="#contact" className="mt-8 inline-flex items-center gap-2 text-maroon border-b border-gold pb-1 hover:gap-3 transition-all">
                  Request a personal chart <ChevronRight className="w-4 h-4" />
                </a>
              </motion.div>
            </AnimatePresence>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   Numerology calculator
   ============================================================ */

function reduce(n: number): number {
  while (n > 9 && n !== 11 && n !== 22 && n !== 33) {
    n = String(n).split("").reduce((a, c) => a + Number(c), 0);
  }
  return n;
}
function lifePath(dob: string): number {
  const digits = dob.replace(/[^0-9]/g, "");
  if (!digits) return 0;
  return reduce(digits.split("").reduce((a, c) => a + Number(c), 0));
}
function letterValue(ch: string): number {
  const map: Record<string, number> = { a:1,b:2,c:3,d:4,e:5,f:6,g:7,h:8,i:9,j:1,k:2,l:3,m:4,n:5,o:6,p:7,q:8,r:9,s:1,t:2,u:3,v:4,w:5,x:6,y:7,z:8 };
  return map[ch.toLowerCase()] ?? 0;
}
function destiny(name: string): number {
  const sum = name.replace(/[^a-zA-Z]/g, "").split("").reduce((a, c) => a + letterValue(c), 0);
  return sum ? reduce(sum) : 0;
}
function personality(name: string): number {
  const vowels = "aeiou";
  const sum = name.replace(/[^a-zA-Z]/g, "").split("").filter(c => !vowels.includes(c.toLowerCase())).reduce((a, c) => a + letterValue(c), 0);
  return sum ? reduce(sum) : 0;
}

function Numerology() {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [show, setShow] = useState(false);
  const lp = useMemo(() => lifePath(dob), [dob]);
  const dn = useMemo(() => destiny(name), [name]);
  const pn = useMemo(() => personality(name), [name]);
  const canShow = name.trim().length > 1 && /^\d{4}-\d{2}-\d{2}$/.test(dob);

  return (
    <section id="numerology" className="relative py-24 sm:py-32 ivory-texture">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal>
          <p className="text-center font-serif italic text-gold tracking-[0.3em] text-xs uppercase">Sacred Numerology</p>
          <h2 className="mt-4 text-center font-display text-3xl sm:text-5xl text-maroon">Unlock the Numbers of Your Soul</h2>
          <Divider className="mt-8" />
        </Reveal>

        <div className="mt-16 grid lg:grid-cols-2 gap-12 items-center">
          <Reveal>
            <div className="bg-ivory border border-gold/40 p-8 sm:p-10 relative">
              <div className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-gold" />
              <div className="absolute -top-3 -right-3 w-6 h-6 border-t-2 border-r-2 border-gold" />
              <div className="absolute -bottom-3 -left-3 w-6 h-6 border-b-2 border-l-2 border-gold" />
              <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-gold" />
              <p className="font-display text-lg text-maroon tracking-widest">YOUR ESSENCE</p>
              <p className="font-serif text-ink/70 mt-2">Enter your full name as on birth certificate and date of birth.</p>

              <div className="mt-6 space-y-5">
                <div>
                  <Label htmlFor="num-name" className="font-display text-xs tracking-widest text-maroon">FULL NAME</Label>
                  <Input id="num-name" value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Arihant Raaj"
                    className="mt-2 bg-transparent border-0 border-b border-gold/50 rounded-none focus-visible:ring-0 focus-visible:border-maroon font-serif text-lg" />
                </div>
                <div>
                  <Label htmlFor="num-dob" className="font-display text-xs tracking-widest text-maroon">DATE OF BIRTH</Label>
                  <Input id="num-dob" type="date" value={dob} onChange={e => setDob(e.target.value)}
                    className="mt-2 bg-transparent border-0 border-b border-gold/50 rounded-none focus-visible:ring-0 focus-visible:border-maroon font-serif text-lg" />
                </div>
                <Button
                  onClick={() => setShow(true)}
                  disabled={!canShow}
                  className="w-full bg-maroon hover:bg-maroon-deep text-ivory rounded-none py-6 uppercase tracking-[0.3em] text-xs disabled:opacity-50"
                >
                  Reveal My Numbers
                </Button>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="relative mx-auto w-[300px] h-[300px] sm:w-[400px] sm:h-[400px]">
              <div className="absolute inset-0 animate-spin-slow opacity-70">
                <svg viewBox="0 0 200 200" fill="none" stroke="#C89B3C" strokeWidth="0.4">
                  <circle cx="100" cy="100" r="95" />
                  <circle cx="100" cy="100" r="80" />
                  <circle cx="100" cy="100" r="65" />
                  {Array.from({length:24}).map((_,i)=>(
                    <line key={i} x1="100" y1="5" x2="100" y2="95" transform={`rotate(${i*15} 100 100)`} />
                  ))}
                  {Array.from({length:8}).map((_,i)=>(
                    <ellipse key={i} cx="100" cy="55" rx="6" ry="22" transform={`rotate(${i*45} 100 100)`} />
                  ))}
                </svg>
              </div>
              <div className="absolute inset-12 rounded-full bg-gradient-to-br from-ivory-deep to-ivory border border-gold/50 flex items-center justify-center">
                <AnimatePresence mode="wait">
                  {show && canShow ? (
                    <motion.div
                      key="result"
                      initial={{ opacity: 0, scale: 0.7 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.7 }}
                      className="text-center px-6"
                    >
                      <p className="font-serif italic text-gold text-xs tracking-[0.3em] uppercase">Life Path</p>
                      <p className="font-display text-7xl sm:text-8xl gold-text leading-none mt-1">{lp}</p>
                      <div className="mt-6 flex justify-center gap-6">
                        <div>
                          <p className="font-serif italic text-gold text-[10px] tracking-[0.25em] uppercase">Destiny</p>
                          <p className="font-display text-3xl text-maroon">{dn}</p>
                        </div>
                        <div className="w-px bg-gold/40" />
                        <div>
                          <p className="font-serif italic text-gold text-[10px] tracking-[0.25em] uppercase">Personality</p>
                          <p className="font-display text-3xl text-maroon">{pn}</p>
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div key="empty" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="text-center px-6">
                      <Sparkles className="w-10 h-10 text-gold mx-auto" />
                      <p className="mt-4 font-serif italic text-ink/60">Your sacred numbers await</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   Client journey — royal scroll
   ============================================================ */

function Journey() {
  const steps = [
    { n: "I", t: "Consultation", d: "We listen with attention to your goals, your home and your story." },
    { n: "II", t: "Analysis", d: "Your chart, your space, your numbers — examined through classical methods." },
    { n: "III", t: "Recommendations", d: "A bespoke plan of remedies, rituals and practical guidance." },
    { n: "IV", t: "Transformation", d: "Living results — harmony, prosperity, clarity, and peace." },
  ];
  return (
    <section className="relative py-24 sm:py-32 bg-ivory-deep/50">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal>
          <p className="text-center font-serif italic text-gold tracking-[0.3em] text-xs uppercase">The Royal Journey</p>
          <h2 className="mt-4 text-center font-display text-3xl sm:text-5xl text-maroon">Your Path Unfolds</h2>
          <Divider className="mt-8" />
        </Reveal>

        <div className="mt-16 relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-12 left-[12%] right-[12%] h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
          <div className="grid lg:grid-cols-4 gap-12">
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.15}>
                <div className="text-center group">
                  <div className="relative mx-auto w-24 h-24 flex items-center justify-center">
                    <div className="absolute inset-0 rotate-45 bg-ivory border border-gold/60 group-hover:bg-maroon transition-colors duration-500" />
                    <span className="relative font-display text-2xl text-maroon group-hover:text-ivory transition-colors duration-500">{s.n}</span>
                  </div>
                  <h3 className="mt-6 font-display text-xl text-maroon tracking-wider">{s.t}</h3>
                  <p className="mt-3 font-serif text-ink/75 leading-relaxed">{s.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   Testimonials
   ============================================================ */

const TESTIMONIALS = [
  { name: "Mrs. Ananya Sharma", type: "Home Vastu Consultation", rating: 5, text: "Within months of implementing the remedies, our family found a calm we had been missing for years. Acharya-ji's guidance is precise, gentle and deeply effective.", initial: "AS" },
  { name: "Mr. Rohan Mehta", type: "Business Astrology", rating: 5, text: "His reading of my chart revealed exact timing for our expansion. We launched on the date he suggested — and have not looked back since.", initial: "RM" },
  { name: "Mrs. Priya Jain", type: "Numerology Naming", rating: 5, text: "He selected a name vibration for our newborn that has already brought such auspiciousness. His knowledge of Jain numerology is unparalleled.", initial: "PJ" },
];

function Testimonials() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI(v => (v + 1) % TESTIMONIALS.length), 7000);
    return () => clearInterval(id);
  }, []);
  const t = TESTIMONIALS[i];
  return (
    <section className="relative py-24 sm:py-32 ivory-texture">
      <div className="max-w-5xl mx-auto px-6">
        <Reveal>
          <p className="text-center font-serif italic text-gold tracking-[0.3em] text-xs uppercase">Words from Our Patrons</p>
          <h2 className="mt-4 text-center font-display text-3xl sm:text-5xl text-maroon">Stories of Transformation</h2>
          <Divider className="mt-8" />
        </Reveal>

        <div className="mt-16 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.7 }}
              className="relative bg-ivory border border-gold/40 p-10 sm:p-14"
            >
              <div className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-gold" />
              <div className="absolute -top-3 -right-3 w-6 h-6 border-t-2 border-r-2 border-gold" />
              <div className="absolute -bottom-3 -left-3 w-6 h-6 border-b-2 border-l-2 border-gold" />
              <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-gold" />
              <Quote className="w-12 h-12 text-gold/60 mx-auto" />
              <p className="mt-6 text-center font-serif text-xl sm:text-2xl italic text-ink/85 leading-relaxed">
                "{t.text}"
              </p>
              <div className="mt-8 flex flex-col items-center gap-2">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-maroon to-maroon-deep flex items-center justify-center text-gold font-display text-lg border-2 border-gold/60">{t.initial}</div>
                <p className="font-display text-maroon tracking-wider">{t.name}</p>
                <p className="font-serif italic text-gold text-sm">{t.type}</p>
                <div className="flex gap-1">{Array.from({length:t.rating}).map((_,k)=><Star key={k} className="w-4 h-4 fill-gold text-gold"/>)}</div>
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="mt-8 flex justify-center gap-2">
            {TESTIMONIALS.map((_, k) => (
              <button key={k} onClick={() => setI(k)}
                className={`h-2 transition-all rounded-full ${k===i?"w-8 bg-maroon":"w-2 bg-gold/40 hover:bg-gold"}`} aria-label={`Testimonial ${k+1}`}/>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   Metrics
   ============================================================ */

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, v => Math.floor(v).toLocaleString());
  useEffect(() => {
    if (inView) {
      const controls = animate(mv, to, { duration: 2.2, ease: [0.22, 1, 0.36, 1] });
      return () => controls.stop();
    }
  }, [inView, mv, to]);
  return <span ref={ref}><motion.span>{rounded}</motion.span>{suffix}</span>;
}

function Metrics() {
  const items = [
    { v: 1000, s: "+", label: "Consultations" },
    { v: 500, s: "+", label: "Happy Families" },
    { v: 15, s: "+", label: "Years Experience" },
    { v: 98, s: "%", label: "Satisfaction Rate" },
  ];
  return (
    <section className="relative py-20 bg-maroon text-ivory overflow-hidden">
      <div className="absolute inset-0 mandala-bg opacity-[0.06]" />
      <div className="relative max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-10">
        {items.map((it, i) => (
          <Reveal key={it.label} delay={i*0.1} className="text-center">
            <p className="font-display text-5xl sm:text-6xl gold-text"><Counter to={it.v} suffix={it.s} /></p>
            <div className="mt-2 h-px w-10 mx-auto bg-gold/60" />
            <p className="mt-3 font-serif italic text-ivory/80 tracking-widest text-sm uppercase">{it.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ============================================================
   Wisdom library
   ============================================================ */

function Library() {
  const books = [
    { cat: "Vastu Insights", title: "The Cardinal Sciences", desc: "Eight directions, one harmonious home.", hue: "from-maroon to-maroon-deep" },
    { cat: "Astrology", title: "Reading the Stars", desc: "Classical Jyotish for modern lives.", hue: "from-[#3a1d4a] to-[#1f0e2a]" },
    { cat: "Numerology", title: "Sacred Vibrations", desc: "The mathematics of destiny.", hue: "from-[#1c3d3a] to-[#0f1f1d]" },
    { cat: "Success Stories", title: "Lives Transformed", desc: "Real journeys, real harmony.", hue: "from-[#6d4e1a] to-[#3a2a0e]" },
  ];
  return (
    <section className="relative py-24 sm:py-32 bg-ivory-deep/40">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <p className="text-center font-serif italic text-gold tracking-[0.3em] text-xs uppercase">The Wisdom Library</p>
          <h2 className="mt-4 text-center font-display text-3xl sm:text-5xl text-maroon">Sacred Knowledge, Carefully Preserved</h2>
          <Divider className="mt-8" />
        </Reveal>

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {books.map((b, i) => (
            <Reveal key={b.title} delay={i*0.1}>
              <div className="group cursor-pointer">
                <div className={`relative aspect-[3/4] bg-gradient-to-br ${b.hue} overflow-hidden shadow-[0_20px_40px_-15px_rgba(0,0,0,0.4)] transition-transform duration-700 group-hover:-translate-y-2 group-hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)]`}>
                  <div className="absolute inset-0 mandala-bg opacity-20" />
                  <div className="absolute inset-3 border border-gold/60" />
                  <div className="absolute inset-5 border border-gold/30" />
                  {/* Spine */}
                  <div className="absolute left-0 inset-y-0 w-3 bg-gradient-to-r from-black/40 to-transparent" />
                  {/* Gold corner */}
                  <div className="absolute top-4 right-4 w-8 h-8">
                    <Lotus className="w-full h-full text-gold" />
                  </div>
                  <div className="absolute inset-0 flex flex-col justify-end p-6">
                    <p className="font-serif italic text-gold text-xs tracking-[0.3em] uppercase">{b.cat}</p>
                    <h3 className="mt-2 font-display text-2xl text-ivory">{b.title}</h3>
                    <div className="my-3 h-px w-10 bg-gold/70" />
                    <p className="font-serif italic text-ivory/80">{b.desc}</p>
                  </div>
                </div>
                <p className="mt-4 text-sm text-maroon font-display tracking-widest text-center group-hover:gap-2 inline-flex items-center justify-center w-full gap-1 transition-all">
                  EXPLORE <ChevronRight className="w-3 h-3" />
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   CTA
   ============================================================ */

function CTA() {
  return (
    <section className="relative py-24 sm:py-32 bg-maroon text-ivory overflow-hidden">
      <div className="absolute inset-0 mandala-bg opacity-[0.08]" />
      <div className="absolute inset-x-8 inset-y-8 border border-gold/40 pointer-events-none" />
      <div className="absolute inset-x-12 inset-y-12 border border-gold/20 pointer-events-none" />
      <GoldParticles count={12} />
      <div className="relative max-w-3xl mx-auto px-6 text-center">
        <Reveal>
          <Lotus className="w-12 h-12 text-gold mx-auto" />
          <h2 className="mt-6 font-display text-3xl sm:text-5xl md:text-6xl text-ivory leading-tight">
            Begin Your Journey Towards <span className="gold-text italic font-serif">Harmony & Success</span>
          </h2>
          <p className="mt-6 font-serif text-xl text-ivory/80 max-w-xl mx-auto">
            A single consultation can illuminate decades. Let us walk beside you.
          </p>
          <a href="#contact" className="mt-10 group relative inline-flex items-center gap-2 bg-gold text-maroon px-10 py-5 text-xs uppercase tracking-[0.3em] gold-shimmer overflow-hidden border border-gold">
            <span className="relative z-10 font-medium">Book Your Consultation</span>
            <ChevronRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
            <span className="gold-shimmer-inner" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}

/* ============================================================
   Contact — royal invitation
   ============================================================ */

function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  return (
    <section id="contact" className="relative py-24 sm:py-32 ivory-texture">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal>
          <p className="text-center font-serif italic text-gold tracking-[0.3em] text-xs uppercase">A Royal Invitation</p>
          <h2 className="mt-4 text-center font-display text-3xl sm:text-5xl text-maroon">Reach Out & Begin</h2>
          <Divider className="mt-8" />
        </Reveal>

        <div className="mt-16 relative">
          <div className="absolute -inset-4 border border-gold/40 pointer-events-none" />
          <div className="absolute -inset-2 border border-gold/20 pointer-events-none" />
          <div className="grid lg:grid-cols-5 bg-ivory border border-gold/50 relative">
            {[0,1,2,3].map(i=>(
              <div key={i} className={`absolute w-10 h-10 border-gold ${i===0?"top-3 left-3 border-t-2 border-l-2":i===1?"top-3 right-3 border-t-2 border-r-2":i===2?"bottom-3 left-3 border-b-2 border-l-2":"bottom-3 right-3 border-b-2 border-r-2"}`}>
                <Lotus className="w-full h-full p-2 text-gold/60"/>
              </div>
            ))}

            <div className="lg:col-span-3 p-10 sm:p-14">
              {submitted ? (
                <motion.div initial={{opacity:0,scale:0.9}} animate={{opacity:1,scale:1}} className="text-center py-16">
                  <Lotus className="w-16 h-16 text-gold mx-auto" />
                  <h3 className="mt-6 font-display text-3xl text-maroon">Your message has reached us</h3>
                  <p className="mt-4 font-serif text-lg text-ink/70">We shall respond with care and intention shortly.</p>
                </motion.div>
              ) : (
                <form
                  onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
                  className="space-y-6"
                >
                  <p className="font-display text-xl text-maroon tracking-widest">SEND YOUR ENQUIRY</p>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="c-name" className="font-display text-xs tracking-widest text-maroon">FULL NAME</Label>
                      <Input id="c-name" required value={form.name} onChange={e=>setForm({...form, name:e.target.value})}
                        className="mt-2 bg-transparent border-0 border-b border-gold/50 rounded-none focus-visible:ring-0 focus-visible:border-maroon font-serif text-lg" />
                    </div>
                    <div>
                      <Label htmlFor="c-phone" className="font-display text-xs tracking-widest text-maroon">PHONE</Label>
                      <Input id="c-phone" required value={form.phone} onChange={e=>setForm({...form, phone:e.target.value})}
                        className="mt-2 bg-transparent border-0 border-b border-gold/50 rounded-none focus-visible:ring-0 focus-visible:border-maroon font-serif text-lg" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="c-email" className="font-display text-xs tracking-widest text-maroon">EMAIL</Label>
                    <Input id="c-email" type="email" required value={form.email} onChange={e=>setForm({...form, email:e.target.value})}
                      className="mt-2 bg-transparent border-0 border-b border-gold/50 rounded-none focus-visible:ring-0 focus-visible:border-maroon font-serif text-lg" />
                  </div>
                  <div>
                    <Label htmlFor="c-msg" className="font-display text-xs tracking-widest text-maroon">YOUR ENQUIRY</Label>
                    <Textarea id="c-msg" required value={form.message} onChange={e=>setForm({...form, message:e.target.value})}
                      rows={4}
                      className="mt-2 bg-transparent border border-gold/40 rounded-none focus-visible:ring-0 focus-visible:border-maroon font-serif text-lg" />
                  </div>
                  <Button type="submit" className="bg-maroon hover:bg-maroon-deep text-ivory rounded-none px-10 py-6 uppercase tracking-[0.3em] text-xs">
                    Send Enquiry
                  </Button>
                </form>
              )}
            </div>

            <div className="lg:col-span-2 bg-maroon text-ivory p-10 sm:p-14 relative overflow-hidden">
              <div className="absolute inset-0 mandala-bg opacity-[0.07]" />
              <div className="relative">
                <p className="font-display text-xl tracking-widest">VISIT · CALL · WRITE</p>
                <div className="mt-8 space-y-6 font-serif">
                  <div className="flex items-start gap-4">
                    <Phone className="w-5 h-5 text-gold mt-1 shrink-0" />
                    <div>
                      <p className="text-gold text-xs tracking-[0.25em] uppercase">Phone</p>
                      <p className="text-lg">+91 98765 43210</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <MessageCircle className="w-5 h-5 text-gold mt-1 shrink-0" />
                    <div>
                      <p className="text-gold text-xs tracking-[0.25em] uppercase">WhatsApp</p>
                      <a href="https://wa.me/919876543210" className="text-lg hover:text-gold transition-colors">+91 98765 43210</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Mail className="w-5 h-5 text-gold mt-1 shrink-0" />
                    <div>
                      <p className="text-gold text-xs tracking-[0.25em] uppercase">Email</p>
                      <p className="text-lg">consult@arihantraaj.com</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <MapPin className="w-5 h-5 text-gold mt-1 shrink-0" />
                    <div>
                      <p className="text-gold text-xs tracking-[0.25em] uppercase">Heritage Office</p>
                      <p className="text-lg leading-snug">Civil Lines, Jaipur,<br/>Rajasthan, India</p>
                    </div>
                  </div>
                </div>
                <div className="mt-8 aspect-video bg-maroon-deep border border-gold/40 flex items-center justify-center">
                  <div className="text-center">
                    <Compass className="w-10 h-10 text-gold mx-auto"/>
                    <p className="mt-2 font-serif italic text-ivory/70 text-sm">Map view</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   Footer
   ============================================================ */

function Footer() {
  return (
    <footer className="relative bg-maroon-deep text-ivory overflow-hidden">
      <div className="absolute inset-0 mandala-bg opacity-[0.05]" />
      <div className="paisley-divider" />
      <div className="relative max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <BrandMark />
          <p className="mt-6 font-serif text-ivory/70 max-w-md leading-relaxed">
            A royal heritage practice devoted to the timeless sciences of Vastu, Vedic Astrology and Sacred Numerology. Guiding families across India for over fifteen years.
          </p>
        </div>
        <div>
          <p className="font-display tracking-widest text-gold text-sm">NAVIGATE</p>
          <ul className="mt-4 space-y-2 font-serif text-ivory/80">
            {[["Home","#home"],["Founder","#founder"],["Services","#pillars"],["Library","#"],["Contact","#contact"]].map(([l,h])=>(
              <li key={l}><a href={h} className="hover:text-gold transition-colors">{l}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-display tracking-widest text-gold text-sm">SERVICES</p>
          <ul className="mt-4 space-y-2 font-serif text-ivory/80">
            <li>Scientific Vastu</li>
            <li>Vedic Astrology</li>
            <li>Sacred Numerology</li>
            <li>Business Consultations</li>
            <li>Name Selection</li>
          </ul>
        </div>
      </div>
      <div className="paisley-divider opacity-50" />
      <div className="relative border-t border-gold/20">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ivory/60 font-serif">
          <p>© {new Date().getFullYear()} Arihant Raaj. All ancient wisdom respectfully preserved.</p>
          <p className="tracking-[0.3em] text-gold uppercase">Vastu · Astrology · Numerology</p>
        </div>
      </div>
    </footer>
  );
}

/* ============================================================
   Home
   ============================================================ */

function Home() {
  return (
    <div className="bg-ivory text-ink min-h-screen overflow-x-hidden">
      <Header />
      <main>
        <Hero />
        <Founder />
        <Pillars />
        <WhyUs />
        <VastuCompass />
        <ZodiacWheel />
        <Numerology />
        <Journey />
        <Testimonials />
        <Metrics />
        <Library />
        <CTA />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
