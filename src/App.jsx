import { useState, useEffect } from "react";

/* ─── RESPONSIVE HOOK ─── */
function useWindowSize() {
  const [size, setSize] = useState({ width: 0, height: 0, isMobile: false });
  useEffect(() => {
    function handleResize() {
      const width = window.innerWidth;
      setSize({ width, height: window.innerHeight, isMobile: width < 768 });
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return size;
}

/* ─── RESPONSIVE UTILITIES ─── */
const responsive = {
  pad: (mobile, desktop) => (size) => size.isMobile ? mobile : desktop,
  cols: (mobile, tablet, desktop) => (size) => size.isMobile ? mobile : size.width < 1024 ? tablet : desktop,
  fontSize: (mobile, desktop) => `clamp(${mobile}px, 2vw, ${desktop}px)`,
  gap: (mobile, desktop) => (size) => size.isMobile ? mobile : desktop,
  gridCols: (mobile, desktop) => (size) => size.isMobile ? `repeat(${mobile}, 1fr)` : `repeat(${desktop}, 1fr)`,
};

/* ─── DESIGN TOKENS ─── */
const C = {
  black: "#0A0A0A", dark: "#141414", charcoal: "#1E1E1E", graphite: "#2A2A2A",
  steel: "#3D3D3D", g600: "#525252", g500: "#6B6B6B", g400: "#8A8A8A",
  g300: "#A3A3A3", g200: "#D4D4D4", g100: "#E8E8E8", light: "#F5F5F5",
  off: "#FAFAFA", white: "#FFFFFF", accent: "#0066FF",
  success: "#22C55E", error: "#EF4444", warning: "#F59E0B",
};
const F = {
  serif: "'Instrument Serif', Georgia, serif",
  sans: "'Plus Jakarta Sans', system-ui, sans-serif",
  mono: "'JetBrains Mono', 'SF Mono', monospace",
};

/* ─── SVG GENERATORS ─── */
function logoSVG(variant = "dark", wordmark = true) {
  const fg = variant === "dark" ? C.black : C.white;
  const fg2 = variant === "dark" ? C.g500 : "rgba(255,255,255,0.5)";
  const h = wordmark ? 320 : 200;
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="200" height="${h}" viewBox="0 0 200 ${h}" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="74" y="38" width="90" height="13" rx="3.5" fill="${fg}"/>
  <rect x="74" y="38" width="13" height="62" rx="3.5" fill="${fg}"/>
  <rect x="113" y="100" width="13" height="62" rx="3.5" fill="${fg}"/>
  <rect x="36" y="149" width="90" height="13" rx="3.5" fill="${fg}"/>
  <circle cx="100" cy="100" r="3" fill="none" stroke="${fg}" stroke-width="1.5" opacity="0.25"/>
  <circle cx="160.5" cy="44.5" r="2.5" fill="${fg}" opacity="0.3"/>
  <circle cx="39.5" cy="155.5" r="2.5" fill="${fg}" opacity="0.3"/>${wordmark ? `
  <text x="100" y="240" text-anchor="middle" font-family="Plus Jakarta Sans, system-ui, sans-serif" font-size="27" font-weight="500" letter-spacing="0.18em" fill="${fg}">SANZNOVA</text>
  <text x="100" y="264" text-anchor="middle" font-family="JetBrains Mono, SF Mono, monospace" font-size="8.5" font-weight="400" letter-spacing="0.25em" fill="${fg2}">SOFTWARE &amp; INFRASTRUCTURE</text>` : ""}
</svg>`;
}

function dl(name, content) {
  const b = new Blob([content], { type: "image/svg+xml" });
  const u = URL.createObjectURL(b);
  const a = document.createElement("a");
  a.href = u; a.download = name;
  document.body.appendChild(a); a.click();
  document.body.removeChild(a); URL.revokeObjectURL(u);
}

const ICONS = [
  { name: "clock", paths: '<circle cx="12" cy="12" r="9"/><path d="M12 8v4l2.5 2.5"/>' },
  { name: "grid", paths: '<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M9 3v18M3 9h18"/>' },
  { name: "list", paths: '<path d="M4 6h16M4 12h16M4 18h10"/>' },
  { name: "check", paths: '<circle cx="12" cy="12" r="9"/><path d="M8 12l3 3 5-6"/>' },
  { name: "plus", paths: '<path d="M12 3v18M3 12h18"/>' },
  { name: "refresh", paths: '<path d="M21 12a9 9 0 11-4-7.5"/><path d="M21 3v5h-5"/>' },
  { name: "close", paths: '<path d="M4 4l16 16M20 4L4 20"/>' },
  { name: "arrow", paths: '<path d="M5 12h14M12 5l7 7-7 7"/>' },
];

function iconSVG(paths, color = "#0A0A0A") {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
  ${paths}
</svg>`;
}

function dlAll() {
  // Download all icons + logos as individual files with slight delay
  const items = [
    ...ICONS.map(ic => ({ name: `sanznova-icon-${ic.name}.svg`, content: iconSVG(ic.paths) })),
    { name: "sanznova-logo-dark.svg", content: logoSVG("dark", true) },
    { name: "sanznova-logo-light.svg", content: logoSVG("light", true) },
    { name: "sanznova-isotipo-dark.svg", content: logoSVG("dark", false) },
    { name: "sanznova-isotipo-light.svg", content: logoSVG("light", false) },
  ];
  items.forEach((item, i) => {
    setTimeout(() => dl(item.name, item.content), i * 200);
  });
}

// ─── CANVA-READY ASSET GENERATORS ───
// Generate business card SVG
async function dlBusinessCardDarkPNG() {
  const bc = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1050" height="600" viewBox="0 0 1050 600" xmlns="http://www.w3.org/2000/svg">
  <rect width="1050" height="600" fill="#1E1E1E"/>
  <rect x="50" y="50" width="950" height="500" fill="#0A0A0A" rx="24"/>
  <g transform="translate(70, 140) scale(0.3)">
    <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="74" y="38" width="90" height="13" rx="3.5" fill="#FFFFFF"/>
      <rect x="74" y="38" width="13" height="62" rx="3.5" fill="#FFFFFF"/>
      <rect x="113" y="100" width="13" height="62" rx="3.5" fill="#FFFFFF"/>
      <rect x="36" y="149" width="90" height="13" rx="3.5" fill="#FFFFFF"/>
      <circle cx="100" cy="100" r="3" stroke="#FFFFFF" stroke-width="1.5" fill="none" opacity="0.25"/>
      <circle cx="160.5" cy="44.5" r="2.5" fill="#FFFFFF" opacity="0.3"/>
      <circle cx="39.5" cy="155.5" r="2.5" fill="#FFFFFF" opacity="0.3"/>
    </svg>
  </g>
  <text x="300" y="180" font-family="Arial, sans-serif" font-size="48" font-weight="600" fill="#FFFFFF">Bryan Sanz</text>
  <text x="300" y="240" font-family="monospace" font-size="24" fill="#8A8A8A">FOUNDER & CEO</text>
  <text x="300" y="320" font-family="Arial, sans-serif" font-size="28" fill="#8A8A8A">b@sanznova.com</text>
  <text x="300" y="380" font-family="Arial, sans-serif" font-size="28" fill="#8A8A8A">+52 55 0000 0000</text>
</svg>`;
  dl("sanznova-business-card-dark.svg", bc);
}

async function dlEmailSignaturePNG() {
  const sig = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="650" height="150" viewBox="0 0 650 150" xmlns="http://www.w3.org/2000/svg">
  <rect width="650" height="150" fill="#0A0A0A"/>
  <g transform="translate(10, 10) scale(0.06)">
    <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="74" y="38" width="90" height="13" rx="3.5" fill="#FFFFFF"/>
      <rect x="74" y="38" width="13" height="62" rx="3.5" fill="#FFFFFF"/>
      <rect x="113" y="100" width="13" height="62" rx="3.5" fill="#FFFFFF"/>
      <rect x="36" y="149" width="90" height="13" rx="3.5" fill="#FFFFFF"/>
      <circle cx="100" cy="100" r="3" stroke="#FFFFFF" stroke-width="1.5" fill="none" opacity="0.25"/>
      <circle cx="160.5" cy="44.5" r="2.5" fill="#FFFFFF" opacity="0.3"/>
      <circle cx="39.5" cy="155.5" r="2.5" fill="#FFFFFF" opacity="0.3"/>
    </svg>
  </g>
  <line x1="140" y1="10" x2="140" y2="140" stroke="#1E1E1E" stroke-width="1"/>
  <text x="160" y="45" font-family="Arial, sans-serif" font-size="18" font-weight="600" fill="#FFFFFF">Bryan Sanz</text>
  <text x="160" y="70" font-family="Arial, sans-serif" font-size="14" fill="#8A8A8A">Founder & CEO — Sanznova</text>
  <text x="160" y="100" font-family="monospace" font-size="13" fill="#8A8A8A">b@sanznova.com · sanznova.com</text>
</svg>`;
  dl("sanznova-email-signature.svg", sig);
}

async function dlSocialAvatar() {
  const avatar = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1200" height="1200" viewBox="0 0 1200 1200" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="1200" fill="#0A0A0A"/>
  <g transform="translate(300, 300) scale(3)">
    <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="74" y="38" width="90" height="13" rx="3.5" fill="#FFFFFF"/>
      <rect x="74" y="38" width="13" height="62" rx="3.5" fill="#FFFFFF"/>
      <rect x="113" y="100" width="13" height="62" rx="3.5" fill="#FFFFFF"/>
      <rect x="36" y="149" width="90" height="13" rx="3.5" fill="#FFFFFF"/>
      <circle cx="100" cy="100" r="3" stroke="#FFFFFF" stroke-width="1.5" fill="none" opacity="0.25"/>
      <circle cx="160.5" cy="44.5" r="2.5" fill="#FFFFFF" opacity="0.3"/>
      <circle cx="39.5" cy="155.5" r="2.5" fill="#FFFFFF" opacity="0.3"/>
    </svg>
  </g>
</svg>`;
  dl("sanznova-avatar-social-1200x1200.svg", avatar);
}

/* ─── SHARED COMPONENTS ─── */
function Logo({ size = 200, wordmark = true, variant = "dark" }) {
  const fg = variant === "dark" ? C.black : C.white;
  const fg2 = variant === "dark" ? C.g500 : "rgba(255,255,255,0.5)";
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: size * 0.15 }}>
      <svg width={size} height={size} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="74" y="38" width="90" height="13" rx="3.5" fill={fg} />
        <rect x="74" y="38" width="13" height="62" rx="3.5" fill={fg} />
        <rect x="113" y="100" width="13" height="62" rx="3.5" fill={fg} />
        <rect x="36" y="149" width="90" height="13" rx="3.5" fill={fg} />
        <circle cx="100" cy="100" r="3" fill="none" stroke={fg} strokeWidth="1.5" opacity="0.25" />
        <circle cx="160.5" cy="44.5" r="2.5" fill={fg} opacity="0.3" />
        <circle cx="39.5" cy="155.5" r="2.5" fill={fg} opacity="0.3" />
      </svg>
      {wordmark && (
        <div style={{ textAlign: "center" }}>
          <div style={{ fontFamily: F.sans, fontSize: size * 0.16, fontWeight: 500, letterSpacing: "0.18em", color: fg, textTransform: "uppercase" }}>Sanznova</div>
          <div style={{ fontFamily: F.mono, fontSize: size * 0.05, fontWeight: 400, letterSpacing: "0.25em", color: fg2, textTransform: "uppercase", marginTop: size * 0.03 }}>Software & Infrastructure</div>
        </div>
      )}
    </div>
  );
}

function Sec({ children, bg = C.white, id }) {
  const size = useWindowSize();
  const padding = size.isMobile ? "40px 16px" : "80px 64px";
  const marginTop = size.isMobile ? 40 : 80;
  return (
    <section id={id} style={{ minHeight: "100vh", backgroundColor: bg, display: "flex", flexDirection: "column", justifyContent: "center", padding, boxSizing: "border-box", marginTop, width: "100%" }}>
      {children}
    </section>
  );
}

function Label({ children, color = C.g400 }) {
  const size = useWindowSize();
  return <div style={{ fontFamily: F.mono, fontSize: size.isMobile ? 9 : 11, fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color, marginBottom: size.isMobile ? 24 : 40 }}>{children}</div>;
}

function Title({ children, color = C.black }) {
  const size = useWindowSize();
  return <h2 style={{ fontFamily: F.serif, fontSize: size.isMobile ? "clamp(24px, 6vw, 32px)" : "clamp(30px, 4.5vw, 48px)", fontWeight: 400, fontStyle: "italic", color, margin: "0 0 20px", lineHeight: 1.15 }}>{children}</h2>;
}

function Body({ children, mw = 560 }) {
  const size = useWindowSize();
  return <p style={{ fontFamily: F.sans, fontSize: size.isMobile ? 14 : 15, lineHeight: 1.75, color: C.g500, fontWeight: 300, maxWidth: mw, margin: "0 0 40px" }}>{children}</p>;
}

function ResponsiveGrid({ children, cols = { mobile: 1, tablet: 2, desktop: 2 }, gap = { mobile: 8, desktop: 20 } }) {
  const size = useWindowSize();
  const numCols = size.isMobile ? cols.mobile : size.width < 1024 ? cols.tablet : cols.desktop;
  const gapVal = size.isMobile ? gap.mobile : gap.desktop;
  return (
    <div style={{ display: "grid", gridTemplateColumns: `repeat(${numCols}, 1fr)`, gap: gapVal, boxSizing: "border-box", width: "100%" }}>
      {children}
    </div>
  );
}

function DlBtn({ label, onClick }) {
  const size = useWindowSize();
  const [ok, setOk] = useState(false);
  const padding = size.isMobile ? "10px 14px" : "7px 12px";
  const fontSize = size.isMobile ? 11 : 10;
  return (
    <button onClick={() => { onClick(); setOk(true); setTimeout(() => setOk(false), 1500); }}
      style={{ display: "inline-flex", alignItems: "center", gap: 6, padding, background: ok ? C.charcoal : "transparent", border: `1px solid ${ok ? C.charcoal : C.g200}`, borderRadius: 6, fontFamily: F.mono, fontSize, letterSpacing: "0.08em", textTransform: "uppercase", color: ok ? C.white : C.g500, cursor: "pointer", transition: "all 0.2s", minHeight: size.isMobile ? 44 : "auto" }}>
      <svg width="11" height="11" viewBox="0 0 16 16" fill="none"><path d="M8 1v10m0 0L4 7.5m4 3.5l4-3.5M2 13h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
      {ok ? "✓" : label}
    </button>
  );
}

function Swatch({ hex, name, label }) {
  const [cp, setCp] = useState(false);
  return (
    <div onClick={() => { navigator.clipboard.writeText(hex); setCp(true); setTimeout(() => setCp(false), 1200); }} style={{ cursor: "pointer", flex: "1 1 120px" }}>
      <div style={{ width: "100%", height: 72, backgroundColor: hex, borderRadius: 8, border: hex === C.white ? `1px solid ${C.g100}` : "none", marginBottom: 8 }} />
      <div style={{ fontFamily: F.sans, fontSize: 12, fontWeight: 600, color: C.black }}>{name}</div>
      <div style={{ fontFamily: F.mono, fontSize: 10, color: C.g500, marginTop: 2 }}>{cp ? "Copied!" : hex}</div>
      {label && <div style={{ fontFamily: F.mono, fontSize: 9, color: C.g400, marginTop: 1 }}>{label}</div>}
    </div>
  );
}

/* ─── MAIN ─── */
export default function Brandbook() {
  const size = useWindowSize();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const l = document.createElement("link");
    l.href = "https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap";
    l.rel = "stylesheet"; document.head.appendChild(l);
  }, []);

  const nav = [
    "Portada","Esencia","Valores","Logo","Uso incorrecto","Color",
    "Tipografía","Iconografía","Layout","Fotografía","Voz","Papelería","Digital","Motion","Assets","Cierre"
  ];

  const navClick = (i) => {
    setMenuOpen(false);
    document.getElementById(`s${i}`)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div style={{ fontFamily: F.sans, background: C.white, color: C.black, minHeight: "100vh", overflowX: "hidden" }}>

      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, display: "flex", justifyContent: size.isMobile ? "space-between" : "center", alignItems: "center", gap: size.isMobile ? 0 : 12, padding: size.isMobile ? "12px 12px" : "12px 20px", background: "rgba(255,255,255,0.95)", backdropFilter: "blur(20px)", borderBottom: `1px solid ${C.g100}`, flexWrap: "nowrap", overflow: "hidden", boxSizing: "border-box" }}>
        {!size.isMobile && nav.map((t, i) => (
          <a key={t} href={`#s${i}`} onClick={e => { e.preventDefault(); navClick(i); }}
            style={{ fontFamily: F.mono, fontSize: 8, letterSpacing: "0.08em", textTransform: "uppercase", color: C.g400, textDecoration: "none", cursor: "pointer", transition: "color 0.2s", whiteSpace: "nowrap", flex: "0 0 auto", padding: "4px 6px" }}
            onMouseEnter={e => e.target.style.color = C.black} onMouseLeave={e => e.target.style.color = C.g400}>
            {t}
          </a>
        ))}
        
        {size.isMobile && (
          <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: "none", border: "none", cursor: "pointer", padding: "8px 8px", minWidth: 44, minHeight: 44, display: "flex", alignItems: "center", justifyContent: "center", marginLeft: "auto" }}>
            <div style={{ width: 20, height: 14, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div style={{ width: "100%", height: 2, background: C.black, borderRadius: 1 }} />
              <div style={{ width: "100%", height: 2, background: C.black, borderRadius: 1 }} />
              <div style={{ width: "100%", height: 2, background: C.black, borderRadius: 1 }} />
            </div>
          </button>
        )}
      </nav>

      {/* MOBILE MENU */}
      {size.isMobile && menuOpen && (
        <div style={{ position: "fixed", top: 50, left: 0, right: 0, bottom: 0, zIndex: 99, background: C.white, borderBottom: `1px solid ${C.g100}`, overflowY: "auto", overflowX: "hidden" }}>
          {nav.map((t, i) => (
            <a key={t} href={`#s${i}`} onClick={e => { e.preventDefault(); navClick(i); }}
              style={{ display: "block", padding: "12px 16px", fontFamily: F.mono, fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", color: C.g400, textDecoration: "none", cursor: "pointer", borderBottom: `1px solid ${C.g100}` }}
              onMouseEnter={e => e.target.style.color = C.black} onMouseLeave={e => e.target.style.color = C.g400}>
              {t}
            </a>
          ))}
        </div>
      )}

      {/* CONTENT */}
      <div style={{ paddingTop: 50, minHeight: "100vh" }}>
      {/* 00 — COVER */}
      <Sec bg={C.black} id="s0">
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", minHeight: "80vh" }}>
          <div style={{ fontFamily: F.mono, fontSize: 11, letterSpacing: "0.3em", color: C.g500, marginBottom: 64, textTransform: "uppercase" }}>Brand Guidelines — 2026</div>
          <Logo size={140} variant="light" />
        <div style={{ marginTop: size.isMobile ? 40 : 80, display: "flex", gap: size.isMobile ? 24 : 48, flexWrap: "wrap", justifyContent: "center" }}>
            {["Identidad", "Sistema", "Aplicación"].map(t => (
              <div key={t} style={{ fontFamily: F.mono, fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: C.steel }}>{t}</div>
            ))}
          </div>
        </div>
      </Sec>

      {/* 01 — BRAND ESSENCE */}
      <Sec bg={C.off} id="s1">
        <Label>01 — Esencia de marca</Label>
        <Title>Pensamiento sistémico,<br/>ejecución precisa.</Title>
        <Body>Sanznova es una firma tecnológica especializada en construir sistemas, automatización e infraestructura digital para empresas modernas. No vendemos código — diseñamos la arquitectura operativa que permite a las empresas escalar con inteligencia.</Body>
        <div style={{ display: "flex", gap: size.isMobile ? 20 : 48, marginBottom: 48, flexWrap: "wrap", justifyContent: size.isMobile ? "space-around" : "flex-start" }}>
          {[
            { n: "$20K", l: "Proyecto mínimo", s: "MXN" },
            { n: "$100K+", l: "Proyectos enterprise", s: "MXN" },
            { n: "∞", l: "Escalabilidad", s: "por diseño" },
          ].map(s => (
            <div key={s.l}>
              <div style={{ fontFamily: F.serif, fontSize: 36, fontStyle: "italic", color: C.black }}>{s.n}</div>
              <div style={{ fontFamily: F.mono, fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: C.g400, marginTop: 4 }}>{s.l}</div>
            </div>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, maxWidth: 800 }}>
          {[
            { t: "Sistemas", d: "Arquitectura modular que conecta cada pieza de tu operación." },
            { t: "Automatización", d: "Flujos inteligentes que eliminan trabajo manual y reducen error." },
            { t: "Infraestructura", d: "Bases técnicas sólidas que sostienen el crecimiento real." },
          ].map(p => (
            <div key={p.t} style={{ padding: size.isMobile ? "16px 12px" : "24px 20px", border: `1px solid ${C.g200}`, borderRadius: 12, background: C.white }}>
              <div style={{ fontFamily: F.sans, fontSize: 14, fontWeight: 600, color: C.black, marginBottom: 6 }}>{p.t}</div>
              <div style={{ fontFamily: F.sans, fontSize: 13, color: C.g500, lineHeight: 1.6, fontWeight: 300 }}>{p.d}</div>
            </div>
          ))}
        </div>
      </Sec>

      {/* 02 — VALUES */}
      <Sec bg={C.white} id="s2">
        <Label>02 — Valores de marca</Label>
        <Title>Los principios que<br/>guían cada decisión.</Title>
        {(() => {
          const size = useWindowSize();
          return (
            <div style={{ display: "grid", gridTemplateColumns: size.isMobile ? "1fr" : "repeat(2, 1fr)", gap: size.isMobile ? 16 : 20, maxWidth: 800, marginTop: 8 }}>
              {[
                { icon: "◆", t: "Claridad sobre complejidad", d: "Reducimos lo complejo a lo esencial. Si no se puede explicar en una oración, no está listo." },
                { icon: "◇", t: "Sistemas sobre soluciones", d: "No resolvemos problemas individuales. Construimos estructuras que previenen categorías enteras de problemas." },
                { icon: "▪", t: "Precisión sobre velocidad", d: "Preferimos entregar una arquitectura correcta en 6 semanas que un parche en 2. La deuda técnica es deuda real." },
                { icon: "□", t: "Transparencia radical", d: "El cliente ve lo que construimos, cómo lo construimos y por qué lo construimos así. Sin cajas negras." },
              ].map(v => (
                <div key={v.t} style={{ padding: size.isMobile ? "20px 16px" : "32px 28px", background: C.off, borderRadius: 14, border: `1px solid ${C.g100}` }}>
                  <div style={{ fontFamily: F.mono, fontSize: size.isMobile ? 16 : 20, color: C.black, marginBottom: 16, opacity: 0.6 }}>{v.icon}</div>
                  <div style={{ fontFamily: F.sans, fontSize: size.isMobile ? 13 : 15, fontWeight: 600, color: C.black, marginBottom: 8 }}>{v.t}</div>
                  <div style={{ fontFamily: F.sans, fontSize: size.isMobile ? 12 : 13, color: C.g500, lineHeight: 1.65, fontWeight: 300 }}>{v.d}</div>
                </div>
              ))}
            </div>
          );
        })()}
        {(() => {
          const size = useWindowSize();
          return (
            <div style={{ marginTop: 40, padding: size.isMobile ? "20px 16px" : "28px 32px", background: C.black, borderRadius: 14, maxWidth: 800 }}>
              <div style={{ fontFamily: F.mono, fontSize: size.isMobile ? 8 : 10, letterSpacing: "0.15em", textTransform: "uppercase", color: C.steel, marginBottom: 12 }}>Mantra interno</div>
              <div style={{ fontFamily: F.serif, fontSize: size.isMobile ? 20 : 28, fontStyle: "italic", color: C.white, lineHeight: 1.35 }}>"Si no escala, no existe."</div>
            </div>
          );
        })()}
      </Sec>

      {/* 03 — LOGO SYSTEM */}
      <Sec bg={C.off} id="s3">
        <Label>03 — Sistema de logotipo</Label>
        <Title>El símbolo del sistema.</Title>
        <Body>Dos brackets geométricos interlazados forman una "S" estructural — la inicial de Sanznova oculta en la geometría de un sistema. El nodo central hueco marca el punto de inflexión; los terminales representan puntos de entrada y salida del flujo.</Body>

        {(() => {
          const size = useWindowSize();
          return (
            <div style={{ display: "grid", gridTemplateColumns: size.isMobile ? "1fr" : "1fr 1fr", gap: size.isMobile ? 16 : 24, marginBottom: 48 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: size.isMobile ? 24 : 56, background: C.white, borderRadius: 16, border: `1px solid ${C.g100}` }}>
                <Logo size={size.isMobile ? 100 : 180} variant="dark" />
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: size.isMobile ? 24 : 56, background: C.black, borderRadius: 16 }}>
                <Logo size={size.isMobile ? 100 : 180} variant="light" />
              </div>
            </div>
          );
        })()}

        {/* Logo Origin Story */}
        <div style={{ marginBottom: 48, padding: size.isMobile ? "24px 20px" : "40px 36px", background: C.white, borderRadius: 16, border: `1px solid ${C.g100}` }}>
          <div style={{ fontFamily: F.mono, fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: C.g400, marginBottom: 20 }}>Origen del isotipo</div>
          <div style={{ fontFamily: F.serif, fontSize: 26, fontStyle: "italic", color: C.black, lineHeight: 1.35, marginBottom: 20 }}>"La S que no se dibuja, se construye."</div>
          <div style={{ display: "grid", gridTemplateColumns: size.isMobile ? "1fr" : "1fr 1fr", gap: size.isMobile ? 16 : 32 }}>
            <div>
              <p style={{ fontFamily: F.sans, fontSize: 13, color: C.g500, lineHeight: 1.75, fontWeight: 300, margin: "0 0 16px" }}>
                El isotipo de Sanznova nace de una idea simple: las mejores infraestructuras son invisibles. Nadie ve los cimientos de un edificio, pero sin ellos nada se sostiene.
              </p>
              <p style={{ fontFamily: F.sans, fontSize: 13, color: C.g500, lineHeight: 1.75, fontWeight: 300, margin: 0 }}>
                La marca toma su forma de dos brackets — el símbolo más fundamental en programación para definir estructura. Un bracket abre, otro cierra. Juntos, contienen la lógica. En nuestro caso, dos brackets se entrelazan en direcciones opuestas para formar una "S", la inicial de Sanznova, sin que ninguna línea curve: todo recto, todo preciso, todo construido.
              </p>
            </div>
            <div>
              <p style={{ fontFamily: F.sans, fontSize: 13, color: C.g500, lineHeight: 1.75, fontWeight: 300, margin: "0 0 16px" }}>
                Los tres nodos cuentan la historia del flujo: el terminal superior es el punto de entrada — donde llega el problema del cliente. El anillo central hueco es el punto de inflexión — donde el sistema transforma. El terminal inferior es la salida — el resultado operando en automático.
              </p>
              <p style={{ fontFamily: F.sans, fontSize: 13, color: C.g500, lineHeight: 1.75, fontWeight: 300, margin: 0 }}>
                El nodo central es deliberadamente hueco. No es un punto sólido ni un adorno: es un espacio. Representa que lo que construimos no es el centro de atención — lo que importa es lo que fluye a través de él. La infraestructura bien hecha desaparece.
              </p>
            </div>
          </div>
          <div style={{ display: "flex", gap: 24, marginTop: 24, paddingTop: 20, borderTop: `1px solid ${C.g100}` }}>
            {[
              { l: "Referencia formal", v: "Brackets de código { }" },
              { l: "Principio", v: "Estructura > Decoración" },
              { l: "Lectura oculta", v: "La S de Sanznova" },
            ].map(r => (
              <div key={r.l} style={{ flex: 1 }}>
                <div style={{ fontFamily: F.mono, fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: C.g400, marginBottom: 4 }}>{r.l}</div>
                <div style={{ fontFamily: F.sans, fontSize: 13, color: C.black, fontWeight: 500 }}>{r.v}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ fontFamily: F.mono, fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: C.g400, marginBottom: 16 }}>Descargas SVG</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 48 }}>
          {[
            { label: "Logo Dark", bg: C.off, border: true, v: "dark", wm: true },
            { label: "Logo Light", bg: C.black, border: false, v: "light", wm: true },
            { label: "Isotipo Dark", bg: C.light, border: false, v: "dark", wm: false },
            { label: "Isotipo Light", bg: C.charcoal, border: false, v: "light", wm: false },
          ].map(item => (
            <div key={item.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "28px 12px 20px", background: item.bg, borderRadius: 10, border: item.border ? `1px solid ${C.g100}` : "none", gap: 12 }}>
              <Logo size={item.wm ? 80 : 56} variant={item.v} wordmark={item.wm} />
              <DlBtn label={item.label} onClick={() => dl(`sanznova-${item.label.toLowerCase().replace(" ", "-")}.svg`, logoSVG(item.v, item.wm))} />
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 24 }}>
          <div style={{ padding: "24px", background: C.white, borderRadius: 12, border: `1px solid ${C.g100}` }}>
            <div style={{ fontFamily: F.mono, fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: C.g400, marginBottom: 12 }}>Zona de protección</div>
            <p style={{ fontFamily: F.sans, fontSize: 12, color: C.g500, lineHeight: 1.6, fontWeight: 300, margin: 0 }}>Espacio libre mínimo = 50% del ancho del isotipo en todos los lados.</p>
          </div>
          <div style={{ padding: "24px", background: C.white, borderRadius: 12, border: `1px solid ${C.g100}` }}>
            <div style={{ fontFamily: F.mono, fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: C.g400, marginBottom: 12 }}>Tamaño mínimo</div>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <Logo size={24} variant="dark" wordmark={false} />
              <p style={{ fontFamily: F.sans, fontSize: 12, color: C.g500, lineHeight: 1.5, fontWeight: 300, margin: 0 }}>Isotipo: 24px · Logo completo: 80px</p>
            </div>
          </div>
          <div style={{ padding: "24px", background: C.white, borderRadius: 12, border: `1px solid ${C.g100}` }}>
            <div style={{ fontFamily: F.mono, fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: C.g400, marginBottom: 12 }}>Fondos permitidos</div>
            <div style={{ display: "flex", gap: 6 }}>
              {[C.white, C.off, C.light, C.black, C.dark, C.charcoal].map(c => (
                <div key={c} style={{ width: 24, height: 24, borderRadius: 4, backgroundColor: c, border: c === C.white ? `1px solid ${C.g100}` : "none" }} />
              ))}
            </div>
          </div>
        </div>
      </Sec>

      {/* 04 — LOGO MISUSE */}
      <Sec bg={C.white} id="s4">
        <Label>04 — Uso incorrecto</Label>
        <Title>Lo que nunca hacemos.</Title>
        <Body>El logotipo debe reproducirse exactamente como se proporciona. Estas son las distorsiones más comunes que deben evitarse en toda circunstancia.</Body>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {[
            { rule: "No rotar", transform: "rotate(15deg)" },
            { rule: "No estirar", transform: "scaleX(1.4)" },
            { rule: "No comprimir", transform: "scaleY(0.7)" },
            { rule: "No agregar sombras", filter: "drop-shadow(4px 4px 8px rgba(0,0,0,0.4))" },
            { rule: "No distorsionar", transform: "skewX(10deg)" },
            { rule: "No usar sobre fondos complejos", bgOverlay: true },
          ].map(item => (
            <div key={item.rule} style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "36px 16px 24px", background: item.bgOverlay ? `linear-gradient(135deg, ${C.accent}, ${C.success}, ${C.warning})` : C.off, borderRadius: 12, border: `2px solid ${C.error}22`, gap: 12, overflow: "hidden" }}>
              <svg width="100%" height="100%" style={{ position: "absolute", top: 0, left: 0, opacity: 0.06 }}><line x1="0" y1="0" x2="100%" y2="100%" stroke={C.error} strokeWidth="2"/><line x1="100%" y1="0" x2="0" y2="100%" stroke={C.error} strokeWidth="2"/></svg>
              <div style={{ transform: item.transform || "none", filter: item.filter || "none", position: "relative", zIndex: 1, opacity: 0.5 }}>
                <Logo size={48} variant={item.bgOverlay ? "light" : "dark"} wordmark={false} />
              </div>
              <div style={{ fontFamily: F.mono, fontSize: 10, color: C.error, letterSpacing: "0.08em", textTransform: "uppercase", position: "relative", zIndex: 1 }}>✕ {item.rule}</div>
            </div>
          ))}
        </div>
      </Sec>

      {/* 05 — COLOR */}
      <Sec bg={C.off} id="s5">
        <Label>05 — Sistema de color</Label>
        <Title>Reducción consciente.</Title>
        <Body>La paleta opera en escala de grises — eliminando ruido visual para que la estructura y el contenido dominen. El acento azul se reserva para estados interactivos.</Body>

        <div style={{ marginBottom: 32 }}>
          <div style={{ fontFamily: F.mono, fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: C.g400, marginBottom: 14 }}>Primarios</div>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <Swatch hex={C.black} name="Obsidian" label="Texto principal" />
            <Swatch hex={C.dark} name="Carbon" label="Fondos dark" />
            <Swatch hex={C.charcoal} name="Charcoal" label="Superficies" />
            <Swatch hex={C.white} name="Snow" label="Fondo principal" />
            <Swatch hex={C.off} name="Mist" label="Fondo secundario" />
          </div>
        </div>
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontFamily: F.mono, fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: C.g400, marginBottom: 14 }}>Escala de grises</div>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <Swatch hex={C.graphite} name="Graphite" label="Gray 800" />
            <Swatch hex={C.steel} name="Steel" label="Gray 700" />
            <Swatch hex={C.g600} name="Iron" label="Gray 600" />
            <Swatch hex={C.g500} name="Smoke" label="Gray 500" />
            <Swatch hex={C.g400} name="Ash" label="Gray 400" />
            <Swatch hex={C.g300} name="Silver" label="Gray 300" />
            <Swatch hex={C.g200} name="Fog" label="Gray 200" />
            <Swatch hex={C.g100} name="Cloud" label="Gray 100" />
            <Swatch hex={C.light} name="Pearl" label="Gray 50" />
          </div>
        </div>
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontFamily: F.mono, fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: C.g400, marginBottom: 14 }}>Funcionales</div>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <Swatch hex={C.accent} name="Signal Blue" label="CTAs & links" />
            <Swatch hex={C.success} name="System Green" label="Éxito / activo" />
            <Swatch hex={C.error} name="System Red" label="Error / destructivo" />
            <Swatch hex={C.warning} name="System Amber" label="Advertencia" />
          </div>
          <p style={{ fontFamily: F.sans, fontSize: 11, color: C.g400, marginTop: 10, fontWeight: 300 }}>Uso restringido a estados de interfaz. Nunca como color decorativo o de marca.</p>
        </div>
        <div style={{ padding: "24px 28px", background: C.white, borderRadius: 14, border: `1px solid ${C.g100}` }}>
          <div style={{ fontFamily: F.mono, fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: C.g400, marginBottom: 14 }}>Ratios de contraste — WCAG AA</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
            {[
              { bg: C.white, fg: C.black, label: "Snow / Obsidian", ratio: "19.3:1" },
              { bg: C.black, fg: C.white, label: "Obsidian / Snow", ratio: "19.3:1" },
              { bg: C.white, fg: C.accent, label: "Snow / Signal Blue", ratio: "5.1:1" },
            ].map(c => (
              <div key={c.label} style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 14px", background: C.off, borderRadius: 8 }}>
                <div style={{ width: 32, height: 32, borderRadius: 6, background: c.bg, border: c.bg === C.white ? `1px solid ${C.g100}` : "none", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ fontFamily: F.sans, fontSize: 14, fontWeight: 700, color: c.fg }}>Aa</div>
                </div>
                <div>
                  <div style={{ fontFamily: F.sans, fontSize: 11, fontWeight: 500, color: C.black }}>{c.ratio}</div>
                  <div style={{ fontFamily: F.mono, fontSize: 9, color: C.g400 }}>{c.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Sec>

      {/* 06 — TYPOGRAPHY */}
      <Sec bg={C.white} id="s6">
        <Label>06 — Tipografía</Label>
        <Title>Tres voces, un sistema.</Title>
        <div style={{ display: "grid", gridTemplateColumns: size.isMobile ? "1fr" : "1fr 1fr 1fr", gap: size.isMobile ? 16 : 32, marginBottom: 48 }}>
          {[
            { name: "Instrument Serif", role: "Display", family: F.serif, size: 56, weight: 400, style: "italic", desc: "Títulos hero, statements. Siempre itálica." },
            { name: "Plus Jakarta Sans", role: "Body", family: F.sans, size: 56, weight: 300, style: "normal", desc: "Interfaces, cuerpo, navegación. Pesos 300–600." },
            { name: "JetBrains Mono", role: "Code", family: F.mono, size: 52, weight: 400, style: "normal", desc: "Código, etiquetas, datos técnicos." },
          ].map(t => (
            <div key={t.name}>
              <div style={{ fontFamily: F.mono, fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase", color: C.g400, marginBottom: 8 }}>{t.role}</div>
              <div style={{ fontFamily: t.family, fontSize: t.size, fontWeight: t.weight, fontStyle: t.style, color: C.black, lineHeight: 1.1, marginBottom: 12 }}>Aa</div>
              <div style={{ fontFamily: F.sans, fontSize: 13, fontWeight: 600, color: C.black, marginBottom: 4 }}>{t.name}</div>
              <div style={{ fontFamily: F.sans, fontSize: 12, color: C.g400, lineHeight: 1.5, fontWeight: 300 }}>{t.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ fontFamily: F.mono, fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: C.g400, marginBottom: 16 }}>Escala tipográfica</div>
        {[
          { l: "Display", s: 48, w: 400, f: F.serif, st: "italic" },
          { l: "H1", s: 36, w: 600, f: F.sans },
          { l: "H2", s: 28, w: 600, f: F.sans },
          { l: "H3", s: 22, w: 600, f: F.sans },
          { l: "Body L", s: 17, w: 300, f: F.sans },
          { l: "Body", s: 15, w: 400, f: F.sans },
          { l: "Caption", s: 13, w: 400, f: F.sans },
          { l: "Overline", s: 11, w: 500, f: F.mono },
        ].map(r => (
          <div key={r.l} style={{ display: "flex", alignItems: "baseline", gap: 20, padding: "10px 0", borderBottom: `1px solid ${C.g100}` }}>
            <div style={{ fontFamily: F.mono, fontSize: 10, color: C.g400, width: 70, flexShrink: 0 }}>{r.l}</div>
            <div style={{ fontFamily: F.mono, fontSize: 10, color: C.g300, width: 40, flexShrink: 0 }}>{r.s}px</div>
            <div style={{ fontFamily: r.f, fontSize: Math.min(r.s, 36), fontWeight: r.w, fontStyle: r.st || "normal", color: C.black, letterSpacing: r.f === F.mono ? "0.12em" : "normal", textTransform: r.f === F.mono ? "uppercase" : "none" }}>
              {r.l === "Overline" ? "ETIQUETA DE SISTEMA" : "Sanznova"}
            </div>
          </div>
        ))}

        <div style={{ marginTop: 40, padding: "32px 28px", background: C.charcoal, borderRadius: 14 }}>
          <div style={{ fontFamily: F.mono, fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: C.steel, marginBottom: 16 }}>Muestra de código</div>
          <div style={{ fontFamily: F.mono, fontSize: 15, color: C.g300, lineHeight: 1.9 }}>
            <span style={{ color: C.g500 }}>const</span> <span style={{ color: C.white }}>infra</span> <span style={{ color: C.g500 }}>=</span> <span style={{ color: C.accent }}>build</span><span style={{ color: C.g300 }}>{"({"}</span><br/>
            {"  "}<span style={{ color: C.g500 }}>scale:</span> <span style={{ color: C.white }}>"infinite"</span>,<br/>
            {"  "}<span style={{ color: C.g500 }}>precision:</span> <span style={{ color: C.white }}>true</span><br/>
            <span style={{ color: C.g300 }}>{"})"}</span>;
          </div>
        </div>
      </Sec>

      {/* 07 — ICONOGRAPHY */}
      <Sec bg={C.off} id="s7">
        <Label>07 — Iconografía</Label>
        <Title>Línea, no relleno.</Title>
        <Body>El sistema iconográfico usa trazos de 1.5px con terminaciones redondeadas. Los íconos operan a 24×24px y se escalan proporcionalmente. Sin rellenos sólidos, sin decoración.</Body>
        {(() => {
          const size = useWindowSize();
          const cols = size.isMobile ? 2 : 4;
          return (
            <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 12, maxWidth: 700, marginBottom: 24 }}>
              {ICONS.map(ic => (
                <div key={ic.name} onClick={() => dl(`sanznova-icon-${ic.name}.svg`, iconSVG(ic.paths))}
                  style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "20px 12px 14px", background: C.white, borderRadius: 10, border: `1px solid ${C.g100}`, cursor: "pointer", gap: 8, transition: "border-color 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = C.black}
                  onMouseLeave={e => e.currentTarget.style.borderColor = C.g100}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={C.black} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" dangerouslySetInnerHTML={{ __html: ic.paths }} />
                  <div style={{ fontFamily: F.mono, fontSize: 9, color: C.g400, letterSpacing: "0.05em" }}>{ic.name}</div>
                </div>
              ))}
            </div>
          );
        })()}
        {(() => {
          const size = useWindowSize();
          return (
            <div style={{ display: "flex", flexDirection: size.isMobile ? "column" : "row", gap: 12, maxWidth: 700, marginBottom: 40 }}>
              <DlBtn label="Descargar todos los assets" onClick={dlAll} />
              <DlBtn label="Íconos Dark" onClick={() => ICONS.forEach((ic, i) => setTimeout(() => dl(`sanznova-icon-${ic.name}.svg`, iconSVG(ic.paths)), i * 150))} />
              <DlBtn label="Íconos Light" onClick={() => ICONS.forEach((ic, i) => setTimeout(() => dl(`sanznova-icon-${ic.name}-light.svg`, iconSVG(ic.paths, "#FFFFFF")), i * 150))} />
            </div>
          );
        })()}
        {(() => {
          const size = useWindowSize();
          return (
            <div style={{ display: "grid", gridTemplateColumns: size.isMobile ? "1fr" : "repeat(3, 1fr)", gap: size.isMobile ? 12 : 16, maxWidth: 700 }}>
              {[
                { t: "Trazo", d: "1.5px, round cap, round join" },
                { t: "Grid", d: "24×24px con 2px de padding" },
                { t: "Color", d: "Obsidian sobre light · Snow sobre dark" },
              ].map(spec => (
                <div key={spec.t} style={{ padding: size.isMobile ? "12px 16px" : "16px 20px", background: C.white, borderRadius: 10, border: `1px solid ${C.g100}` }}>
                  <div style={{ fontFamily: F.sans, fontSize: size.isMobile ? 12 : 13, fontWeight: 600, color: C.black, marginBottom: 4 }}>{spec.t}</div>
                  <div style={{ fontFamily: F.mono, fontSize: 11, color: C.g500 }}>{spec.d}</div>
                </div>
              ))}
            </div>
          );
        })()}
      </Sec>

      {/* 08 — LAYOUT & GRID */}
      <Sec bg={C.white} id="s8">
        <Label>08 — Layout & Grid</Label>
        <Title>Espacio como herramienta.</Title>
        <Body>El sistema de layout prioriza el espacio negativo. Grid de 12 columnas, gutters de 24px, márgenes de 64px. Ritmo vertical basado en módulo de 8px.</Body>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24, marginBottom: 40 }}>
          <div style={{ padding: "32px", background: C.off, borderRadius: 14, border: `1px solid ${C.g100}` }}>
            <div style={{ fontFamily: F.mono, fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: C.g400, marginBottom: 16 }}>Grid base</div>
            <div style={{ display: "flex", gap: 4, marginBottom: 16 }}>
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} style={{ flex: 1, height: 48, background: `${C.accent}11`, borderRadius: 3, border: `1px solid ${C.accent}22` }} />
              ))}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontFamily: F.mono, fontSize: 10, color: C.g400 }}>12 columnas</span>
              <span style={{ fontFamily: F.mono, fontSize: 10, color: C.g400 }}>Gutter: 24px</span>
            </div>
          </div>
          <div style={{ padding: "32px", background: C.off, borderRadius: 14, border: `1px solid ${C.g100}` }}>
            <div style={{ fontFamily: F.mono, fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: C.g400, marginBottom: 16 }}>Ritmo vertical</div>
            {[8, 16, 24, 32, 48, 64].map(v => (
              <div key={v} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                <div style={{ width: v, height: 8, background: C.black, borderRadius: 2, opacity: 0.15 + (v / 100) }} />
                <span style={{ fontFamily: F.mono, fontSize: 10, color: C.g400 }}>{v}px</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
          {[
            { t: "Border radius", v: "8px base · 12px cards · 16px hero" },
            { t: "Márgenes", v: "64px desktop · 24px mobile" },
            { t: "Max-width", v: "1200px contenido · 800px texto" },
            { t: "Módulo base", v: "8px — todo múltiplo de 8" },
          ].map(s => (
            <div key={s.t} style={{ padding: "16px 18px", background: C.off, borderRadius: 10, border: `1px solid ${C.g100}` }}>
              <div style={{ fontFamily: F.sans, fontSize: 12, fontWeight: 600, color: C.black, marginBottom: 4 }}>{s.t}</div>
              <div style={{ fontFamily: F.mono, fontSize: 10, color: C.g500, lineHeight: 1.5 }}>{s.v}</div>
            </div>
          ))}
        </div>
      </Sec>

      {/* 09 — PHOTOGRAPHY */}
      <Sec bg={C.black} id="s9">
        <Label color={C.steel}>09 — Dirección fotográfica</Label>
        <Title color={C.white}>Lo real, no lo aspiracional.</Title>
        <Body mw={520}><span style={{ color: C.g400 }}>Sanznova no usa stock genérico. Las imágenes muestran tecnología en contexto real: pantallas con interfaces, espacios de trabajo operativos, infraestructura física y digital.</span></Body>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {[
            { t: "Tono", d: "Desaturado, contraste controlado. Blanco y negro o color mínimo." },
            { t: "Sujetos", d: "Pantallas, código, servidores, arquitectura, manos trabajando. Nunca rostros como foco." },
            { t: "Composición", d: "Angulada, con profundidad de campo. Mucho espacio negativo para overlays de texto." },
            { t: "Tratamiento", d: "Grain sutil (2-4%), viñeta ligera. Curvas: levantar negros a #1E1E1E." },
            { t: "Prohibido", d: "Stock genérico, handshakes, personas señalando pantallas, gráficas falsas." },
            { t: "Formato", d: "WebP para web, TIFF para print. Mínimo 300dpi para impresión." },
          ].map(p => (
            <div key={p.t} style={{ padding: size.isMobile ? "16px 12px" : "24px 20px", background: C.dark, borderRadius: 12, border: `1px solid ${C.charcoal}` }}>
              <div style={{ fontFamily: F.sans, fontSize: 13, fontWeight: 600, color: C.white, marginBottom: 6 }}>{p.t}</div>
              <div style={{ fontFamily: F.sans, fontSize: 12, color: C.g500, lineHeight: 1.55, fontWeight: 300 }}>{p.d}</div>
            </div>
          ))}
        </div>
      </Sec>

      {/* 10 — VOICE */}
      <Sec bg={C.off} id="s10">
        <Label>10 — Voz de marca</Label>
        <Title>Lo que decimos y<br/>cómo lo decimos.</Title>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 40, maxWidth: 850 }}>
          {[
            { p: "Precisos, no verbosos", y: "Automatizamos tu operación en 4 semanas.", n: "Ofrecemos servicios integrales de transformación digital que abarcan múltiples áreas." },
            { p: "Técnicos, no crípticos", y: "Conectamos tu CRM con WhatsApp vía API para cerrar en automático.", n: "Implementamos soluciones de middleware omnicanal con endpoints RESTful." },
            { p: "Seguros, no arrogantes", y: "Esto es lo que tu operación necesita. Te mostramos por qué.", n: "Somos los mejores del mercado y nadie más puede hacer lo que hacemos." },
            { p: "Directos, no fríos", y: "Tu sistema actual pierde 40% de leads. Lo arreglamos.", n: "Tras un análisis preliminar, hemos detectado áreas de oportunidad en su pipeline." },
          ].map(v => (
            <div key={v.p} style={{ padding: "24px 22px", background: C.white, borderRadius: 12, border: `1px solid ${C.g100}` }}>
              <div style={{ fontFamily: F.sans, fontSize: 14, fontWeight: 600, color: C.black, marginBottom: 14 }}>{v.p}</div>
              <div style={{ marginBottom: 10 }}>
                <div style={{ fontFamily: F.mono, fontSize: 9, color: C.success, letterSpacing: "0.1em", marginBottom: 3 }}>✓ SÍ</div>
                <div style={{ fontFamily: F.sans, fontSize: 12, color: C.g500, lineHeight: 1.5, fontWeight: 300 }}>{v.y}</div>
              </div>
              <div>
                <div style={{ fontFamily: F.mono, fontSize: 9, color: C.error, letterSpacing: "0.1em", marginBottom: 3 }}>✕ NO</div>
                <div style={{ fontFamily: F.sans, fontSize: 12, color: C.g300, lineHeight: 1.5, fontWeight: 300 }}>{v.n}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ padding: "28px 28px", background: C.white, borderRadius: 14, border: `1px solid ${C.g100}`, maxWidth: 850 }}>
          <div style={{ fontFamily: F.mono, fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: C.g400, marginBottom: 14 }}>Atributos de personalidad</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 24 }}>
            {[
              { a: "Inteligente", v: 90 }, { a: "Minimalista", v: 95 }, { a: "Técnico", v: 80 }, { a: "Premium", v: 85 }, { a: "Accesible", v: 60 },
            ].map(m => (
              <div key={m.a}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <span style={{ fontFamily: F.sans, fontSize: 11, fontWeight: 500, color: C.black }}>{m.a}</span>
                  <span style={{ fontFamily: F.mono, fontSize: 9, color: C.g400 }}>{m.v}%</span>
                </div>
                <div style={{ height: 3, background: C.g100, borderRadius: 2 }}>
                  <div style={{ height: 3, background: C.black, borderRadius: 2, width: `${m.v}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Sec>

      {/* 11 — STATIONERY */}
      <Sec bg={C.white} id="s11">
        <Label>11 — Papelería corporativa</Label>
        <Title>Sistema de identidad<br/>corporativa.</Title>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 24 }}>
          <div style={{ background: C.charcoal, borderRadius: 14, padding: 40, display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: 220, aspectRatio: "3.5/2" }}>
            <Logo size={48} variant="light" wordmark={false} />
            <div>
              <div style={{ fontFamily: F.sans, fontSize: 15, fontWeight: 500, color: C.white }}>Bryan Sanz</div>
              <div style={{ fontFamily: F.mono, fontSize: 9, color: C.g500, letterSpacing: "0.1em", marginTop: 3 }}>FOUNDER & CEO</div>
              <div style={{ fontFamily: F.sans, fontSize: 11, color: C.g500, marginTop: 10 }}>b@sanznova.com</div>
              <div style={{ fontFamily: F.sans, fontSize: 11, color: C.g500, marginTop: 2 }}>+52 55 0000 0000</div>
            </div>
          </div>
          <div style={{ background: C.white, borderRadius: 14, padding: 40, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", border: `1px solid ${C.g100}`, aspectRatio: "3.5/2" }}>
            <Logo size={80} variant="dark" />
          </div>
          <div style={{ gridColumn: "1 / -1", background: C.white, borderRadius: 14, padding: "32px 40px", border: `1px solid ${C.g100}`, minHeight: 320 }}>
            <div style={{ fontFamily: F.mono, fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: C.g400, marginBottom: 24 }}>Hoja membretada — A4</div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 40 }}>
              <Logo size={64} variant="dark" />
              <div style={{ textAlign: "right" }}>
                <div style={{ fontFamily: F.sans, fontSize: 11, color: C.g500 }}>sanznova.com</div>
                <div style={{ fontFamily: F.sans, fontSize: 11, color: C.g500 }}>b@sanznova.com</div>
                <div style={{ fontFamily: F.sans, fontSize: 11, color: C.g500 }}>Ciudad de México, MX</div>
              </div>
            </div>
            <div style={{ maxWidth: 480 }}>
              <div style={{ fontFamily: F.sans, fontSize: 13, color: C.g400, marginBottom: 16 }}>15 de mayo, 2026</div>
              <div style={{ fontFamily: F.sans, fontSize: 13, color: C.black, marginBottom: 8, fontWeight: 500 }}>Estimado equipo de [Cliente],</div>
              <div style={{ fontFamily: F.sans, fontSize: 13, color: C.g500, lineHeight: 1.7, fontWeight: 300 }}>
                Adjunto encontrarán la propuesta técnica para la implementación del sistema de automatización. El documento detalla la arquitectura, cronograma y inversión requerida.
              </div>
            </div>
            <div style={{ borderTop: `1px solid ${C.g100}`, marginTop: 40, paddingTop: 16, display: "flex", justifyContent: "space-between" }}>
              <div style={{ fontFamily: F.mono, fontSize: 9, color: C.g400 }}>SANZNOVA · RFC: XXXX000000XX0</div>
              <div style={{ fontFamily: F.mono, fontSize: 9, color: C.g400 }}>CDMX, MÉXICO</div>
            </div>
          </div>
        </div>
        <div style={{ background: C.off, borderRadius: 14, padding: "28px 40px", border: `1px solid ${C.g100}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <Logo size={32} variant="dark" wordmark={false} />
            <div>
              <div style={{ fontFamily: F.sans, fontSize: 12, fontWeight: 500, color: C.black }}>Sanznova</div>
              <div style={{ fontFamily: F.sans, fontSize: 11, color: C.g500 }}>Ciudad de México, MX 06600</div>
            </div>
          </div>
          <div style={{ fontFamily: F.mono, fontSize: 9, color: C.g400, letterSpacing: "0.1em" }}>SOBRE CORPORATIVO — #10</div>
        </div>
      </Sec>

      {/* 12 — DIGITAL */}
      <Sec bg={C.black} id="s12">
        <Label color={C.steel}>12 — Aplicaciones digitales</Label>
        <Title color={C.white}>La marca en pantalla.</Title>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginTop: 8 }}>
          <div style={{ background: C.dark, borderRadius: 14, padding: "28px 32px" }}>
            <div style={{ fontFamily: F.mono, fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase", color: C.steel, marginBottom: 16 }}>Firma de correo</div>
            <div style={{ display: "flex", alignItems: "center", gap: 20, padding: "16px 0", borderTop: `1px solid ${C.charcoal}` }}>
              <Logo size={36} variant="light" wordmark={false} />
              <div style={{ width: 1, height: 44, background: C.charcoal }} />
              <div>
                <div style={{ fontFamily: F.sans, fontSize: 13, fontWeight: 500, color: C.white }}>Bryan Sanz</div>
                <div style={{ fontFamily: F.sans, fontSize: 11, color: C.g500, marginTop: 2 }}>Founder & CEO — Sanznova</div>
                <div style={{ fontFamily: F.mono, fontSize: 10, color: C.g500, marginTop: 6 }}>b@sanznova.com · sanznova.com</div>
              </div>
            </div>
          </div>
          <div style={{ background: C.dark, borderRadius: 14, padding: "28px 32px" }}>
            <div style={{ fontFamily: F.mono, fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase", color: C.steel, marginBottom: 16 }}>Favicon & App Icon</div>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 8 }}>
              {[48, 32, 16].map(s => (
                <div key={s} style={{ width: s, height: s, background: C.black, borderRadius: s > 24 ? 10 : s > 16 ? 6 : 3, display: "flex", alignItems: "center", justifyContent: "center", border: `1px solid ${C.charcoal}` }}>
                  <Logo size={s * 0.7} variant="light" wordmark={false} />
                </div>
              ))}
              <div style={{ fontFamily: F.mono, fontSize: 10, color: C.g500, marginLeft: 8 }}>48 · 32 · 16px</div>
            </div>
          </div>
          <div style={{ background: C.dark, borderRadius: 14, padding: "28px 32px" }}>
            <div style={{ fontFamily: F.mono, fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase", color: C.steel, marginBottom: 16 }}>Avatar redes sociales</div>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ width: 64, height: 64, borderRadius: 32, background: C.black, display: "flex", alignItems: "center", justifyContent: "center", border: `2px solid ${C.charcoal}` }}>
                <Logo size={36} variant="light" wordmark={false} />
              </div>
              <div style={{ width: 48, height: 48, borderRadius: 10, background: C.black, display: "flex", alignItems: "center", justifyContent: "center", border: `1px solid ${C.charcoal}` }}>
                <Logo size={28} variant="light" wordmark={false} />
              </div>
              <div style={{ fontFamily: F.mono, fontSize: 10, color: C.g500 }}>Circular + Rounded</div>
            </div>
          </div>
          <div style={{ background: C.dark, borderRadius: 14, padding: "28px 32px" }}>
            <div style={{ fontFamily: F.mono, fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase", color: C.steel, marginBottom: 16 }}>Template OG Image</div>
            <div style={{ background: C.black, borderRadius: 8, padding: "20px 24px", aspectRatio: "1.91/1", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <Logo size={28} variant="light" wordmark={false} />
              <div>
                <div style={{ fontFamily: F.serif, fontSize: 16, fontStyle: "italic", color: C.white, lineHeight: 1.3, marginBottom: 6 }}>Infraestructura que escala.</div>
                <div style={{ fontFamily: F.mono, fontSize: 8, color: C.g500, letterSpacing: "0.1em" }}>SANZNOVA.COM</div>
              </div>
            </div>
          </div>
        </div>
      </Sec>

      {/* 13 — MOTION */}
      <Sec bg={C.off} id="s13">
        <Label>13 — Motion & Animación</Label>
        <Title>Movimiento con<br/>propósito.</Title>
        <Body>Toda animación tiene un objetivo funcional: guiar atención, confirmar acciones o revelar contenido. Nunca decorativa, nunca gratuita.</Body>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20, maxWidth: 800 }}>
          {[
            { t: "Easing", v: "cubic-bezier(0.16, 1, 0.3, 1)", d: "Ease-out exponencial. Rápido al inicio, desaceleración suave." },
            { t: "Duración", v: "200ms micro · 350ms medio · 500ms page", d: "Micro-interacciones rápidas. Transiciones de página controladas. Nunca más de 600ms." },
            { t: "Entradas", v: "opacity 0→1 + translateY 8px→0", d: "Elementos desde abajo con fade. Stagger de 50ms entre hermanos." },
            { t: "Hover", v: "transform scale(1.02) · 150ms", d: "Escala sutil en cards y botones. Sin cambios bruscos de color." },
          ].map(m => (
            <div key={m.t} style={{ padding: "28px 24px", background: C.white, borderRadius: 12, border: `1px solid ${C.g100}` }}>
              <div style={{ fontFamily: F.sans, fontSize: 14, fontWeight: 600, color: C.black, marginBottom: 4 }}>{m.t}</div>
              <div style={{ fontFamily: F.mono, fontSize: 11, color: C.accent, marginBottom: 10, wordBreak: "break-all" }}>{m.v}</div>
              <div style={{ fontFamily: F.sans, fontSize: 12, color: C.g500, lineHeight: 1.55, fontWeight: 300 }}>{m.d}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 24, padding: "20px 24px", background: C.white, borderRadius: 12, border: `1px solid ${C.g100}`, maxWidth: 800 }}>
          <div style={{ fontFamily: F.mono, fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: C.g400, marginBottom: 10 }}>Principio rector</div>
          <div style={{ fontFamily: F.serif, fontSize: 22, fontStyle: "italic", color: C.black, lineHeight: 1.35 }}>"Si el usuario no nota la animación conscientemente, está bien ejecutada."</div>
        </div>
      </Sec>

      {/* 14 — ASSET DOWNLOADS */}
      <Sec bg={C.off} id="s14">
        <Label>CENTRO DE DESCARGAS</Label>
        <Title>Todos los assets, listos para usar.</Title>
        <Body>Descarga todos los elementos del brandbook en formatos editoriales. Los archivos PNG están optimizados para Canva. Los SVGs son perfectos para diseñadores.</Body>

        {/* LOGOS & ISOTIPO */}
        <div style={{ marginBottom: 56 }}>
          <div style={{ fontFamily: F.sans, fontSize: 13, fontWeight: 600, color: C.black, marginBottom: 20 }}>Logos e Isotipos</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
            {[
              { name: "Logo Dark", file: "sanznova-logo-dark.svg", fn: () => dl("sanznova-logo-dark.svg", logoSVG("dark", true)) },
              { name: "Logo Light", file: "sanznova-logo-light.svg", fn: () => dl("sanznova-logo-light.svg", logoSVG("light", true)) },
              { name: "Isotipo Dark", file: "sanznova-isotipo-dark.svg", fn: () => dl("sanznova-isotipo-dark.svg", logoSVG("dark", false)) },
              { name: "Isotipo Light", file: "sanznova-isotipo-light.svg", fn: () => dl("sanznova-isotipo-light.svg", logoSVG("light", false)) },
            ].map((item) => (
              <div
                key={item.name}
                onClick={item.fn}
                style={{
                  padding: "20px 16px",
                  background: C.white,
                  border: `1px solid ${C.g100}`,
                  borderRadius: 10,
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = C.black;
                  e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.08)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = C.g100;
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div style={{ fontFamily: F.sans, fontSize: 11, fontWeight: 500, color: C.black, marginBottom: 6 }}>↓ {item.name}</div>
                <div style={{ fontFamily: F.mono, fontSize: 9, color: C.g400 }}>SVG · Escalable</div>
              </div>
            ))}
          </div>
        </div>

        {/* FAVICONS */}
        <div style={{ marginBottom: 56 }}>
          <div style={{ fontFamily: F.sans, fontSize: 13, fontWeight: 600, color: C.black, marginBottom: 20 }}>Favicons & App Icons</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 12 }}>
            {[
              { size: "16×16", px: 16 },
              { size: "32×32", px: 32 },
              { size: "48×48", px: 48 },
              { size: "64×64", px: 64 },
              { size: "128×128", px: 128 },
            ].map((item) => (
              <div
                key={item.size}
                onClick={() => {
                  const svg = `<svg width="${item.px}" height="${item.px}" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" fill="none">
                    <rect x="74" y="38" width="90" height="13" rx="3.5" fill="#0A0A0A"/>
                    <rect x="74" y="38" width="13" height="62" rx="3.5" fill="#0A0A0A"/>
                    <rect x="113" y="100" width="13" height="62" rx="3.5" fill="#0A0A0A"/>
                    <rect x="36" y="149" width="90" height="13" rx="3.5" fill="#0A0A0A"/>
                    <circle cx="100" cy="100" r="3" stroke="#0A0A0A" stroke-width="1.5" fill="none" opacity="0.25"/>
                    <circle cx="160.5" cy="44.5" r="2.5" fill="#0A0A0A" opacity="0.3"/>
                    <circle cx="39.5" cy="155.5" r="2.5" fill="#0A0A0A" opacity="0.3"/>
                  </svg>`;
                  dl(`sanznova-favicon-${item.size.split("×")[0]}.svg`, svg);
                }}
                style={{
                  padding: "16px",
                  background: C.white,
                  border: `1px solid ${C.g100}`,
                  borderRadius: 10,
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  transition: "all 0.2s",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = C.black;
                  e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.08)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = C.g100;
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div style={{ width: Math.min(item.px, 40), height: Math.min(item.px, 40), background: C.black, borderRadius: 6 }} />
                <div style={{ fontFamily: F.sans, fontSize: 10, fontWeight: 500, color: C.black }}>↓ {item.size}</div>
              </div>
            ))}
          </div>
        </div>

        {/* PRINT & STATIONERY */}
        <div style={{ marginBottom: 56 }}>
          <div style={{ fontFamily: F.sans, fontSize: 13, fontWeight: 600, color: C.black, marginBottom: 20 }}>Papelería Corporativa (Canva Ready)</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            {[
              { title: "Business Card Dark", desc: "1050×600px (3.5×2 in)", fn: dlBusinessCardDarkPNG },
              { title: "Email Signature", desc: "650×150px (Canva)", fn: dlEmailSignaturePNG },
              { title: "Social Avatar", desc: "1200×1200px", fn: dlSocialAvatar },
            ].map((item) => (
              <button
                key={item.title}
                onClick={() => item.fn()}
                style={{
                  padding: size.isMobile ? "16px 12px" : "24px 20px",
                  background: C.white,
                  border: `1px solid ${C.g100}`,
                  borderRadius: 10,
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "all 0.2s",
                  fontFamily: F.sans,
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = C.black;
                  e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.08)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = C.g100;
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.transform = "none";
                }}
              >
                <div style={{ fontFamily: F.sans, fontSize: 12, fontWeight: 600, color: C.black, marginBottom: 6 }}>↓ {item.title}</div>
                <div style={{ fontFamily: F.mono, fontSize: 9, color: C.g400 }}>{item.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* ICONS */}
        <div style={{ marginBottom: 56 }}>
          <div style={{ fontFamily: F.sans, fontSize: 13, fontWeight: 600, color: C.black, marginBottom: 20 }}>Sistema de Íconos (8 íconos)</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 20 }}>
            {ICONS.map((ic) => (
              <button
                key={ic.name}
                onClick={() => dl(`sanznova-icon-${ic.name}.svg`, iconSVG(ic.paths))}
                style={{
                  padding: "16px 12px",
                  background: C.white,
                  border: `1px solid ${C.g100}`,
                  borderRadius: 10,
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 8,
                  transition: "all 0.2s",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = C.black;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = C.g100;
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={C.black} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" dangerouslySetInnerHTML={{ __html: ic.paths }} />
                <div style={{ fontFamily: F.mono, fontSize: 8, color: C.g400 }}>↓ {ic.name}</div>
              </button>
            ))}
          </div>
          <DlBtn label="Descargar todos los íconos (Dark)" onClick={() => ICONS.forEach((ic, i) => setTimeout(() => dl(`sanznova-icon-${ic.name}.svg`, iconSVG(ic.paths)), i * 150))} />
        </div>

        {/* COLOR PALETTE */}
        <div>
          <div style={{ fontFamily: F.sans, fontSize: 13, fontWeight: 600, color: C.black, marginBottom: 20 }}>Paleta de Color</div>
          {(() => {
            const size = useWindowSize();
            const cols = size.isMobile ? 2 : 5;
            return (
              <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 12 }}>
                {[
                  { name: "Obsidian", hex: "#0A0A0A", color: C.black },
                  { name: "Carbon", hex: "#141414", color: C.dark },
                  { name: "Snow", hex: "#FFFFFF", color: C.white },
                  { name: "Signal Blue", hex: "#0066FF", color: C.accent },
                  { name: "System Green", hex: "#22C55E", color: C.success },
                ].map((col) => (
                  <div
                    key={col.name}
                    onClick={() => {
                      navigator.clipboard.writeText(col.hex);
                      alert("Color copiado: " + col.hex);
                    }}
                    style={{
                      padding: "12px",
                      background: C.off,
                      border: `1px solid ${C.g100}`,
                      borderRadius: 10,
                      cursor: "pointer",
                      textAlign: "center",
                    }}
                  >
                    <div style={{ width: "100%", height: 48, background: col.color, borderRadius: 6, marginBottom: 8, border: col.color === C.white ? `1px solid ${C.g100}` : "none" }} />
                    <div style={{ fontFamily: F.sans, fontSize: 10, fontWeight: 500, color: C.black, marginBottom: 2 }}>{col.name}</div>
                    <div style={{ fontFamily: F.mono, fontSize: 8, color: C.g400 }}>{col.hex}</div>
                  </div>
                ))}
              </div>
            );
          })()}
        </div>
      </Sec>

      {/* 15 — CLOSING */}
      <Sec bg={C.black} id="s15">
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", minHeight: "70vh" }}>
          <Logo size={80} variant="light" wordmark={false} />
          <div style={{ fontFamily: F.serif, fontSize: "clamp(28px, 4vw, 44px)", fontStyle: "italic", color: C.white, marginTop: 48, marginBottom: 16, lineHeight: 1.25 }}>
            La marca es el sistema.<br/>El sistema es la marca.
          </div>
          <div style={{ fontFamily: F.sans, fontSize: 14, color: C.g500, fontWeight: 300, maxWidth: 440, lineHeight: 1.7, marginBottom: 48 }}>
            Este documento es la referencia definitiva para la aplicación de la identidad visual de Sanznova en todos los puntos de contacto.
          </div>
          <div style={{ display: "flex", gap: size.isMobile ? 16 : 32, flexWrap: "wrap", justifyContent: size.isMobile ? "center" : "flex-start" }}>
            {[
              { l: "Contacto", v: "b@sanznova.com" },
              { l: "Web", v: "sanznova.com" },
              { l: "Versión", v: "1.0 — Mayo 2026" },
            ].map(c => (
              <div key={c.l}>
                <div style={{ fontFamily: F.mono, fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase", color: C.steel, marginBottom: 4 }}>{c.l}</div>
                <div style={{ fontFamily: F.sans, fontSize: 13, color: C.g400 }}>{c.v}</div>
              </div>
            ))}
          </div>
        </div>
      </Sec>

      </div>

      {/* FOOTER */}
      <div style={{ padding: size.isMobile ? "20px 16px" : "32px 64px", background: C.black, borderTop: `1px solid ${C.charcoal}`, display: "flex", flexDirection: size.isMobile ? "column" : "row", justifyContent: size.isMobile ? "center" : "space-between", alignItems: "center", gap: size.isMobile ? 12 : 0, textAlign: size.isMobile ? "center" : "left", boxSizing: "border-box" }}>
        <div style={{ fontFamily: F.mono, fontSize: 8, color: C.steel, letterSpacing: "0.1em" }}>© 2026 SANZNOVA. TODOS LOS DERECHOS RESERVADOS.</div>
        <div style={{ fontFamily: F.mono, fontSize: 8, color: C.steel, letterSpacing: "0.1em" }}>DOCUMENTO CONFIDENCIAL — USO INTERNO</div>
      </div>
    </div>
  );
}
