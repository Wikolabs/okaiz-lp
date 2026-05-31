"use client";

export default function HomePage() {
  const bg = "#04080F";
  const bg2 = "#070D1B";
  const card = "rgba(255,255,255,0.04)";
  const border = "rgba(255,255,255,0.09)";
  const gold = "#D4AF37";
  const goldDim = "rgba(212,175,55,0.1)";
  const goldBorder = "rgba(212,175,55,0.28)";
  const txt1 = "#F0EDE6";
  const txt2 = "#8B9DB5";
  const txt3 = "#3C5068";
  const steel = "#58A6FF";
  const steelDim = "rgba(88,166,255,0.1)";
  const steelBorder = "rgba(88,166,255,0.28)";

  const vehicles = [
    { emoji: "🚗", name: "Toyota Corolla", year: 2015, km: "95 000", fuel: "Essence", city: "Antananarivo", price: "45 000 000", category: "Berline" },
    { emoji: "🏍️", name: "Honda Wave 125", year: 2021, km: "12 000", fuel: "Essence", city: "Toamasina", price: "6 500 000", category: "Moto" },
    { emoji: "🚙", name: "Suzuki Grand Vitara", year: 2016, km: "78 000", fuel: "Diesel", city: "Antananarivo", price: "52 000 000", category: "SUV" },
    { emoji: "🛻", name: "Mitsubishi L200", year: 2014, km: "145 000", fuel: "Diesel", city: "Mahajanga", price: "58 000 000", category: "Pick-up" },
    { emoji: "🚗", name: "Peugeot 206", year: 2011, km: "168 000", fuel: "Essence", city: "Fianarantsoa", price: "14 500 000", category: "Berline" },
    { emoji: "🏍️", name: "Yamaha YBR 125", year: 2020, km: "8 500", fuel: "Essence", city: "Antananarivo", price: "7 800 000", category: "Moto" },
    { emoji: "🚙", name: "Toyota RAV4", year: 2018, km: "62 000", fuel: "Essence", city: "Antananarivo", price: "89 000 000", category: "SUV" },
    { emoji: "🚗", name: "Renault Logan", year: 2013, km: "210 000", fuel: "Diesel", city: "Antsirabe", price: "18 000 000", category: "Berline" },
  ];

  const aiFeatures = [
    { icon: "📊", title: "Estimation juste IA", desc: "Le prix analysé selon des milliers d'annonces similaires sur le marché malgache. Vendez au bon prix, achetez sans vous faire avoir." },
    { icon: "🚨", title: "Détection arnaque", desc: "Algorithmes de détection des annonces suspectes, prix anormaux et vendeurs douteux. Votre sécurité avant tout." },
    { icon: "📷", title: "Recherche par photo", desc: "Prenez une photo d'un véhicule et trouvez des annonces similaires en quelques secondes. La puissance du visuel." },
    { icon: "🔔", title: "Alerte prix", desc: "Recevez une notification dès qu'un véhicule correspondant à vos critères est publié. Ne ratez plus aucune bonne affaire." },
  ];

  const steps = [
    { num: "01", title: "Décrivez votre recherche", desc: "Entrez le modèle, le budget, la ville ou uploadez une photo. Notre IA comprend vos critères en langage naturel." },
    { num: "02", title: "L'IA analyse le marché", desc: "Notre agent parcourt en temps réel les annonces malgaches, vérifie les prix et signale les vendeurs non certifiés." },
    { num: "03", title: "Achetez en sécurité", desc: "Chaque annonce affichée est vérifiée. Vous contactez uniquement des vendeurs certifiés avec un historique clean." },
  ];

  const categories = ["Tout", "Voitures", "Motos", "SUV", "Pick-up", "Camionnettes"];

  return (
    <div style={{ minHeight: "100vh", background: bg, color: txt1 }}>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { -webkit-font-smoothing: antialiased; overflow-x: hidden; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
        @keyframes pulseDot { 0%,100%{ opacity:1; transform:scale(1); } 50%{ opacity:.4; transform:scale(1.6); } }
        .wk-card { transition: background .3s, border-color .3s, transform .35s cubic-bezier(.34,1.2,.64,1); }
        .wk-card:hover { background: rgba(255,255,255,0.07) !important; border-color: rgba(212,175,55,0.4) !important; transform: translateY(-6px) !important; }
        .wk-vcard { transition: border-color .25s, transform .25s; }
        .wk-vcard:hover { border-color: rgba(212,175,55,0.5) !important; transform: translateY(-4px) !important; }
        .wk-btn { transition: opacity .2s, transform .2s, box-shadow .2s; }
        .wk-btn:hover { opacity:.9; transform:translateY(-2px); box-shadow:0 12px 32px rgba(212,175,55,.18); }
        .wk-wa { transition: opacity .2s, transform .2s; }
        .wk-wa:hover { opacity:.9; transform:translateY(-2px); }
        .wk-cat { transition: background .2s, color .2s, border-color .2s; }
        .wk-cat:hover { border-color: rgba(212,175,55,0.4) !important; }
        .wk-nav-link { color: #8B9DB5; text-decoration:none; font-size:14px; font-weight:500; transition:color .2s; }
        .wk-nav-link:hover { color: #F0EDE6; }
        .wk-annonce { transition: background .2s, color .2s; }
        .wk-annonce:hover { background: rgba(88,166,255,0.12) !important; color: #F0EDE6 !important; }
        @media(max-width:640px){ .wk-hide-sm{ display:none!important; } .wk-hero-title{ font-size:2.2rem!important; } }
      `}</style>

      {/* NAVBAR */}
      <nav style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(4,8,15,0.88)", backdropFilter: "blur(20px)", borderBottom: `1px solid ${border}`, padding: "0 40px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.5px", color: txt1 }}>
          okaiz<span style={{ color: gold }}>.com</span>
        </span>
        <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
          <div className="wk-hide-sm" style={{ display: "flex", gap: 24 }}>
            {["Voitures", "Motos", "SUV & 4x4", "Camionnettes"].map((link) => (
              <a key={link} href="#" className="wk-nav-link">{link}</a>
            ))}
          </div>
          <button
            data-cal-link="wikolabs-team/30min"
            data-cal-namespace="wk30min"
            data-cal-config='{"layout":"month_view"}'
            className="wk-btn"
            style={{ background: gold, color: "#04080F", border: "none", borderRadius: 8, padding: "9px 18px", fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: "inherit" }}
          >
            Publier une annonce
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ padding: "90px 40px 64px", textAlign: "center", maxWidth: 900, margin: "0 auto", position: "relative" }}>
        <div style={{ position: "absolute", top: -60, left: "50%", transform: "translateX(-50%)", width: 700, height: 600, background: "radial-gradient(ellipse at 50% 30%, rgba(212,175,55,0.08) 0%, transparent 60%)", pointerEvents: "none" }} />
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 28, background: goldDim, border: `1px solid ${goldBorder}`, borderRadius: 100, padding: "6px 18px", animation: "fadeUp .5s ease both" }}>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: gold, display: "inline-block", animation: "pulseDot 2s ease-in-out infinite" }} />
          <span style={{ color: gold, fontSize: 11.5, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase" }}>Propulsé par l'intelligence artificielle</span>
        </div>
        <h1 className="wk-hero-title" style={{ fontSize: "clamp(2.4rem,5.5vw,4.2rem)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.03em", marginBottom: 24, fontFamily: "'Instrument Serif',Georgia,serif", animation: "fadeUp .5s .08s ease both" }}>
          <span style={{ display: "block", color: txt1 }}>Achetez et vendez vos véhicules</span>
          <span style={{ display: "block", color: gold, fontStyle: "italic" }}>d'occasion en toute confiance</span>
        </h1>
        <p style={{ fontSize: "1.1rem", color: txt2, maxWidth: 640, margin: "0 auto 40px", lineHeight: 1.72, animation: "fadeUp .5s .16s ease both" }}>
          L'intelligence artificielle analyse chaque annonce, détecte les arnaques et vous trouve le meilleur prix du marché malgache. Voitures, motos, SUV, camionnettes.
        </p>

        {/* Search bar */}
        <div style={{ display: "flex", gap: 0, maxWidth: 580, margin: "0 auto 44px", background: card, border: `1px solid ${border}`, borderRadius: 14, overflow: "hidden", animation: "fadeUp .5s .22s ease both" }}>
          <input
            type="text"
            placeholder="Rechercher : Toyota Corolla, Honda Wave, SUV…"
            style={{ flex: 1, background: "transparent", border: "none", outline: "none", color: txt1, padding: "16px 20px", fontSize: 15, fontFamily: "inherit" }}
          />
          <button className="wk-btn" style={{ background: gold, color: "#04080F", border: "none", padding: "16px 24px", fontWeight: 700, fontSize: 15, cursor: "pointer", whiteSpace: "nowrap", fontFamily: "inherit" }}>
            Rechercher
          </button>
        </div>

        {/* Metric badges */}
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 10, animation: "fadeUp .5s .3s ease both" }}>
          {[
            { icon: "🚘", label: "1 200+ véhicules" },
            { icon: "🤖", label: "Prix IA vérifié" },
            { icon: "✅", label: "Vendeurs certifiés" },
            { icon: "📦", label: "Livré à Tana" },
          ].map((b) => (
            <div key={b.label} style={{ background: card, border: `1px solid ${border}`, borderRadius: 10, padding: "9px 18px", display: "flex", alignItems: "center", gap: 8, fontSize: 14 }}>
              <span>{b.icon}</span>
              <span style={{ color: txt2 }}>{b.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORY FILTER */}
      <section style={{ padding: "0 40px 32px", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center" }}>
          {categories.map((cat, i) => (
            <button key={cat} className="wk-cat" style={{ background: i === 0 ? gold : card, color: i === 0 ? "#04080F" : txt2, border: `1px solid ${i === 0 ? gold : border}`, borderRadius: 20, padding: "8px 22px", fontSize: 14, fontWeight: i === 0 ? 700 : 500, cursor: "pointer", fontFamily: "inherit" }}>
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* VEHICLE CARDS GRID */}
      <section style={{ padding: "0 40px 80px", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 20 }}>
          {vehicles.map((v) => (
            <div key={v.name + v.year} className="wk-vcard" style={{ background: card, border: `1px solid ${border}`, borderRadius: 18, padding: 24, display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <span style={{ fontSize: 48, lineHeight: 1 }}>{v.emoji}</span>
                <span style={{ background: goldDim, color: gold, border: `1px solid ${goldBorder}`, borderRadius: 8, padding: "3px 10px", fontSize: 12, fontWeight: 600 }}>
                  {v.category}
                </span>
              </div>
              <div style={{ fontWeight: 700, fontSize: 17, color: txt1 }}>{v.name}</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {[v.year.toString(), `${v.km} km`, v.fuel].map((badge) => (
                  <span key={badge} style={{ background: "rgba(255,255,255,0.05)", border: `1px solid ${border}`, borderRadius: 6, padding: "3px 9px", fontSize: 12, color: txt3 }}>
                    {badge}
                  </span>
                ))}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, color: txt3, fontSize: 13 }}>
                <span>📍</span>
                <span>{v.city}</span>
              </div>
              <div style={{ fontSize: 20, fontWeight: 800, color: gold, letterSpacing: "-0.5px" }}>
                {v.price} <span style={{ fontSize: 13, fontWeight: 500 }}>Ar</span>
              </div>
              <button className="wk-annonce" style={{ background: "transparent", border: `1px solid ${steelBorder}`, color: steel, borderRadius: 10, padding: "10px 0", fontWeight: 600, fontSize: 14, cursor: "pointer", width: "100%", fontFamily: "inherit" }}>
                Voir l'annonce →
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* AI AGENT SECTION */}
      <section id="features" style={{ background: bg2, borderTop: `1px solid ${border}`, borderBottom: `1px solid ${border}`, padding: "80px 40px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: steelDim, border: `1px solid ${steelBorder}`, borderRadius: 100, padding: "6px 18px", marginBottom: 20 }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: steel, display: "inline-block", animation: "pulseDot 2s ease-in-out infinite" }} />
              <span style={{ color: steel, fontSize: 11.5, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase" }}>Agent IA</span>
            </div>
            <h2 style={{ fontSize: "clamp(1.8rem,3.5vw,2.8rem)", fontWeight: 700, color: txt1, fontFamily: "'Instrument Serif',Georgia,serif", marginBottom: 16, letterSpacing: "-0.02em" }}>
              Notre agent IA <em style={{ fontStyle: "italic", color: gold }}>cherche pour vous</em>
            </h2>
            <p style={{ color: txt2, fontSize: "1rem", maxWidth: 620, margin: "0 auto", lineHeight: 1.7 }}>
              Notre agent IA surveille en continu les marketplaces malgaches, détecte les annonces surévaluées, signale les vendeurs suspects et vous suggère des alternatives similaires dans votre budget.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 20 }}>
            {aiFeatures.map((f, i) => (
              <div key={f.title} className="wk-card" style={{ background: card, border: `1px solid ${border}`, borderRadius: 20, padding: "28px 24px", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg,transparent,${i % 2 === 0 ? gold : steel},transparent)`, opacity: 0.6 }} />
                <div style={{ fontSize: "2rem", marginBottom: 16 }}>{f.icon}</div>
                <h3 style={{ fontWeight: 700, fontSize: "1.05rem", color: txt1, marginBottom: 10 }}>{f.title}</h3>
                <p style={{ color: txt2, fontSize: "0.88rem", lineHeight: 1.7, margin: 0 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="process" style={{ padding: "80px 40px" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <p style={{ fontSize: "0.68rem", color: gold, letterSpacing: "3px", textTransform: "uppercase", fontWeight: 700, marginBottom: 14 }}>Comment ça marche</p>
            <h2 style={{ fontSize: "clamp(1.8rem,3.5vw,2.8rem)", fontWeight: 700, color: txt1, fontFamily: "'Instrument Serif',Georgia,serif", letterSpacing: "-0.02em" }}>
              Trois étapes pour acheter <em style={{ fontStyle: "italic", color: gold }}>sans risque</em>
            </h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {steps.map((s, i) => (
              <div key={s.num} style={{ display: "flex", alignItems: "flex-start", gap: 22, background: card, border: `1px solid ${border}`, borderRadius: 18, padding: "22px 26px" }}>
                <div style={{ flexShrink: 0, width: 48, height: 48, background: i === 0 ? goldDim : steelDim, border: `1px solid ${i === 0 ? goldBorder : steelBorder}`, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", color: i === 0 ? gold : steel, fontWeight: 800, fontSize: 15 }}>
                  {s.num}
                </div>
                <div>
                  <h3 style={{ fontSize: "1rem", fontWeight: 700, color: txt1, marginBottom: 6, lineHeight: 1.3 }}>{s.title}</h3>
                  <p style={{ fontSize: "0.87rem", color: txt2, lineHeight: 1.7, margin: 0 }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section id="cta" style={{ padding: "0 40px 100px", maxWidth: 860, margin: "0 auto" }}>
        <div style={{ background: card, border: `1px solid ${goldBorder}`, borderRadius: 24, padding: "64px 48px", textAlign: "center", backgroundImage: `radial-gradient(ellipse at 50% 0%, ${goldDim} 0%, transparent 65%)` }}>
          <p style={{ fontSize: "0.68rem", color: gold, letterSpacing: "3px", textTransform: "uppercase", fontWeight: 700, marginBottom: 16 }}>Demarrer</p>
          <h2 style={{ fontSize: "clamp(1.8rem,3.5vw,2.8rem)", fontWeight: 700, color: txt1, marginBottom: 14, letterSpacing: "-0.02em", fontFamily: "'Instrument Serif',Georgia,serif" }}>
            Prêt à vendre ou acheter ?
          </h2>
          <p style={{ color: txt2, fontSize: "1rem", marginBottom: 36, lineHeight: 1.7 }}>
            Discutez avec notre équipe pour publier vos annonces, activer l'agent IA ou accéder aux fonctionnalités premium d'okaiz.com.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
            <button
              data-cal-link="wikolabs-team/30min"
              data-cal-namespace="wk30min"
              data-cal-config='{"layout":"month_view"}'
              className="wk-btn"
              style={{ background: gold, color: "#04080F", border: "none", borderRadius: 10, padding: "14px 28px", fontWeight: 700, fontSize: 15, cursor: "pointer", display: "flex", alignItems: "center", gap: 8, fontFamily: "inherit" }}
            >
              📅 Planifier un appel
            </button>
            <a
              href="https://wa.me/261386626100?text=Bonjour%2C%20je%20souhaite%20discuter%20de%20okaiz.com%20avec%20Wikolabs."
              target="_blank"
              rel="noopener noreferrer"
              className="wk-wa"
              style={{ background: "#25d366", color: "#fff", borderRadius: 10, padding: "14px 28px", fontWeight: 700, fontSize: 15, textDecoration: "none", display: "flex", alignItems: "center", gap: 8 }}
            >
              💬 WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: `1px solid ${border}`, padding: "32px 40px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
          <div>
            <span style={{ fontWeight: 800, fontSize: 17, color: txt1 }}>okaiz<span style={{ color: gold }}>.com</span></span>
            <span style={{ display: "block", fontSize: 12, color: txt3, marginTop: 3 }}>Marketplace IA de véhicules d'occasion à Madagascar</span>
          </div>
          <p style={{ fontSize: 13, color: txt3 }}>© 2026 okaiz.com — Un produit <a href="https://wikolabs.com" style={{ color: txt2, textDecoration: "none" }}>Wikolabs</a></p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 16, fontSize: 13, alignItems: "center" }}>
            <a href="mailto:team@wikolabs.com" style={{ color: txt3, textDecoration: "none" }}>team@wikolabs.com</a>
            <span style={{ color: txt3 }}>·</span>
            <button data-cal-link="wikolabs-team/30min" data-cal-namespace="wk30min" data-cal-config='{"layout":"month_view"}' style={{ background: "none", border: "none", color: txt3, fontSize: 13, cursor: "pointer", fontFamily: "inherit", padding: 0 }}>Prendre RDV</button>
          </div>
        </div>
      </footer>
    </div>
  );
}
