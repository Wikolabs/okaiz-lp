"use client";

export default function HomePage() {
  const C = {
    bg: "#0D1117",
    card: "#161B22",
    border: "#30363D",
    silver: "#C9D1D9",
    white: "#F0F6FC",
    gold: "#D4AF37",
    steel: "#58A6FF",
    green: "#3FB950",
    muted: "#8B949E",
  };

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
    { icon: "📊", title: "Estimation juste IA", desc: "Le prix analysé selon des milliers d'annonces similaires sur le marché malgache." },
    { icon: "🚨", title: "Détection arnaque", desc: "Algorithmes de détection des annonces suspectes, prix anormaux et vendeurs douteux." },
    { icon: "📷", title: "Recherche par photo", desc: "Prenez une photo d'un véhicule et trouvez des annonces similaires en quelques secondes." },
    { icon: "🔔", title: "Alerte prix", desc: "Recevez une notification dès qu'un véhicule correspondant à vos critères est publié." },
  ];

  const steps = [
    { num: "01", title: "Décrivez votre recherche", desc: "Entrez le modèle, le budget, la ville ou uploadez une photo. Notre IA comprend vos critères en langage naturel." },
    { num: "02", title: "L'IA analyse le marché", desc: "Notre agent parcourt en temps réel les annonces malgaches, vérifie les prix et signale les vendeurs non certifiés." },
    { num: "03", title: "Achetez en sécurité", desc: "Chaque annonce affichée est vérifiée. Vous contactez uniquement des vendeurs certifiés avec un historique clean." },
  ];

  const categories = ["Tout", "Voitures", "Motos", "SUV", "Pick-up", "Camionnettes"];

  return (
    <div style={{ background: C.bg, color: C.silver, minHeight: "100vh", fontFamily: "var(--font-body)" }}>

      {/* NAVBAR */}
      <nav style={{ background: C.card, borderBottom: `1px solid ${C.border}`, position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          <span style={{ fontSize: 22, fontWeight: 700, color: C.white, fontFamily: "var(--font-display)", letterSpacing: "-0.5px" }}>
            okaiz<span style={{ color: C.gold }}>.com</span>
          </span>
          <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
            <div style={{ display: "flex", gap: 24 }} className="hidden md:flex">
              {["Voitures", "Motos", "SUV & 4x4", "Camionnettes"].map((link) => (
                <a key={link} href="#" style={{ color: C.silver, textDecoration: "none", fontSize: 14, transition: "color 0.2s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = C.white)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = C.silver)}>
                  {link}
                </a>
              ))}
            </div>
            <button style={{
              background: C.gold, color: "#0D1117", border: "none", borderRadius: 8,
              padding: "9px 18px", fontWeight: 600, fontSize: 14, cursor: "pointer", whiteSpace: "nowrap"
            }}>
              Publier une annonce
            </button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ padding: "80px 24px 60px", textAlign: "center", maxWidth: 860, margin: "0 auto" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: C.card, border: `1px solid ${C.border}`, borderRadius: 20, padding: "6px 16px", marginBottom: 28 }}>
          <span style={{ color: C.gold, fontSize: 13 }}>✦</span>
          <span style={{ color: C.muted, fontSize: 13 }}>Propulsé par l'intelligence artificielle</span>
        </div>
        <h1 style={{ fontSize: "clamp(28px, 5vw, 52px)", fontWeight: 800, color: C.white, lineHeight: 1.15, marginBottom: 20, fontFamily: "var(--font-display)" }}>
          Achetez et vendez vos véhicules<br />
          <span style={{ color: C.gold }}>d'occasion en toute confiance</span>
        </h1>
        <p style={{ fontSize: 18, color: C.muted, maxWidth: 640, margin: "0 auto 36px", lineHeight: 1.7 }}>
          L'intelligence artificielle analyse chaque annonce, détecte les arnaques et vous trouve le meilleur prix du marché malgache. Voitures, motos, SUV, camionnettes.
        </p>

        {/* Search bar */}
        <div style={{ display: "flex", gap: 0, maxWidth: 580, margin: "0 auto 48px", background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, overflow: "hidden" }}>
          <input
            type="text"
            placeholder="Rechercher : Toyota Corolla, Honda Wave, SUV…"
            style={{
              flex: 1, background: "transparent", border: "none", outline: "none",
              color: C.white, padding: "14px 20px", fontSize: 15
            }}
          />
          <button style={{
            background: C.gold, color: "#0D1117", border: "none", padding: "14px 24px",
            fontWeight: 700, fontSize: 15, cursor: "pointer", whiteSpace: "nowrap"
          }}>
            Rechercher
          </button>
        </div>

        {/* Metric badges */}
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12 }}>
          {[
            { icon: "🚘", label: "1 200+ véhicules" },
            { icon: "🤖", label: "Prix IA vérifié" },
            { icon: "✅", label: "Vendeurs certifiés" },
            { icon: "📦", label: "Livré à Tana" },
          ].map((b) => (
            <div key={b.label} style={{
              background: C.card, border: `1px solid ${C.border}`, borderRadius: 8,
              padding: "8px 16px", display: "flex", alignItems: "center", gap: 8, fontSize: 14
            }}>
              <span>{b.icon}</span>
              <span style={{ color: C.silver }}>{b.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORY FILTER */}
      <section style={{ padding: "0 24px 32px", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center" }}>
          {categories.map((cat, i) => (
            <button key={cat} style={{
              background: i === 0 ? C.gold : C.card,
              color: i === 0 ? "#0D1117" : C.silver,
              border: `1px solid ${i === 0 ? C.gold : C.border}`,
              borderRadius: 20, padding: "8px 20px", fontSize: 14,
              fontWeight: i === 0 ? 700 : 500, cursor: "pointer"
            }}>
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* VEHICLE CARDS GRID */}
      <section style={{ padding: "0 24px 72px", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: 20
        }}>
          {vehicles.map((v) => (
            <div key={v.name + v.year} style={{
              background: C.card, border: `1px solid ${C.border}`, borderRadius: 14,
              padding: 24, display: "flex", flexDirection: "column", gap: 14,
              transition: "border-color 0.2s, transform 0.2s",
            }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = C.gold;
                (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = C.border;
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              }}
            >
              {/* Emoji + category */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <span style={{ fontSize: 48, lineHeight: 1 }}>{v.emoji}</span>
                <span style={{
                  background: "rgba(212,175,55,0.12)", color: C.gold,
                  border: `1px solid rgba(212,175,55,0.3)`, borderRadius: 6,
                  padding: "3px 10px", fontSize: 12, fontWeight: 600
                }}>
                  {v.category}
                </span>
              </div>

              {/* Name */}
              <div>
                <div style={{ fontWeight: 700, fontSize: 17, color: C.white, fontFamily: "var(--font-display)" }}>
                  {v.name}
                </div>
              </div>

              {/* Badges: year / km / fuel */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {[v.year.toString(), `${v.km} km`, v.fuel].map((badge) => (
                  <span key={badge} style={{
                    background: "#0D1117", border: `1px solid ${C.border}`,
                    borderRadius: 5, padding: "3px 9px", fontSize: 12, color: C.muted
                  }}>
                    {badge}
                  </span>
                ))}
              </div>

              {/* City */}
              <div style={{ display: "flex", alignItems: "center", gap: 6, color: C.muted, fontSize: 13 }}>
                <span>📍</span>
                <span>{v.city}</span>
              </div>

              {/* Price */}
              <div style={{ fontSize: 20, fontWeight: 700, color: C.gold, fontFamily: "var(--font-display)" }}>
                {v.price} <span style={{ fontSize: 14 }}>Ar</span>
              </div>

              {/* CTA */}
              <button style={{
                background: "transparent", border: `1px solid ${C.steel}`,
                color: C.steel, borderRadius: 8, padding: "9px 0",
                fontWeight: 600, fontSize: 14, cursor: "pointer", width: "100%",
                transition: "background 0.2s, color 0.2s"
              }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = C.steel;
                  (e.currentTarget as HTMLElement).style.color = "#0D1117";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "transparent";
                  (e.currentTarget as HTMLElement).style.color = C.steel;
                }}
              >
                Voir l'annonce →
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* AI AGENT SECTION */}
      <section style={{ background: C.card, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, padding: "72px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(88,166,255,0.1)", border: `1px solid rgba(88,166,255,0.3)`, borderRadius: 20, padding: "6px 16px", marginBottom: 20 }}>
              <span style={{ color: C.steel, fontSize: 13 }}>🤖 Agent IA</span>
            </div>
            <h2 style={{ fontSize: "clamp(24px, 4vw, 40px)", fontWeight: 800, color: C.white, fontFamily: "var(--font-display)", marginBottom: 16 }}>
              Notre agent IA cherche pour vous
            </h2>
            <p style={{ color: C.muted, fontSize: 17, maxWidth: 620, margin: "0 auto", lineHeight: 1.7 }}>
              Notre agent IA surveille en continu les marketplaces malgaches, détecte les annonces surévaluées, signale les vendeurs suspects et vous suggère des alternatives similaires dans votre budget.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 20 }}>
            {aiFeatures.map((f) => (
              <div key={f.title} style={{
                background: C.bg, border: `1px solid ${C.border}`, borderRadius: 12,
                padding: 24, display: "flex", flexDirection: "column", gap: 12
              }}>
                <span style={{ fontSize: 32 }}>{f.icon}</span>
                <div style={{ fontWeight: 700, fontSize: 16, color: C.white, fontFamily: "var(--font-display)" }}>{f.title}</div>
                <div style={{ color: C.muted, fontSize: 14, lineHeight: 1.6 }}>{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ padding: "72px 24px", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 52 }}>
          <h2 style={{ fontSize: "clamp(24px, 4vw, 40px)", fontWeight: 800, color: C.white, fontFamily: "var(--font-display)", marginBottom: 14 }}>
            Comment ça marche
          </h2>
          <p style={{ color: C.muted, fontSize: 16 }}>Trois étapes pour acheter ou vendre sans risque</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 24 }}>
          {steps.map((s) => (
            <div key={s.num} style={{
              background: C.card, border: `1px solid ${C.border}`, borderRadius: 14,
              padding: 32, position: "relative", overflow: "hidden"
            }}>
              <div style={{
                fontSize: 64, fontWeight: 900, color: "rgba(212,175,55,0.08)",
                position: "absolute", top: 12, right: 20, fontFamily: "var(--font-display)", lineHeight: 1
              }}>
                {s.num}
              </div>
              <div style={{
                width: 40, height: 40, background: "rgba(212,175,55,0.12)",
                border: `1px solid rgba(212,175,55,0.3)`, borderRadius: 10,
                display: "flex", alignItems: "center", justifyContent: "center",
                color: C.gold, fontWeight: 800, fontSize: 16, marginBottom: 16, fontFamily: "var(--font-display)"
              }}>
                {s.num}
              </div>
              <div style={{ fontWeight: 700, fontSize: 18, color: C.white, fontFamily: "var(--font-display)", marginBottom: 10 }}>
                {s.title}
              </div>
              <div style={{ color: C.muted, fontSize: 14, lineHeight: 1.7 }}>{s.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA SECTION */}
      <section style={{ padding: "0 24px 72px", maxWidth: 860, margin: "0 auto" }}>
        <div style={{
          background: C.card, border: `1px solid ${C.border}`, borderRadius: 20,
          padding: "56px 40px", textAlign: "center",
          backgroundImage: "radial-gradient(ellipse at 50% 0%, rgba(212,175,55,0.06) 0%, transparent 60%)"
        }}>
          <h2 style={{ fontSize: "clamp(24px, 4vw, 38px)", fontWeight: 800, color: C.white, fontFamily: "var(--font-display)", marginBottom: 14 }}>
            Prêt à vendre ou acheter ?
          </h2>
          <p style={{ color: C.muted, fontSize: 16, marginBottom: 36, lineHeight: 1.7 }}>
            Discutez avec notre équipe pour publier vos annonces, activer l'agent IA ou accéder aux fonctionnalités premium d'okaiz.com.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 14, justifyContent: "center" }}>
            {/* Cal.com button */}
            <button
              data-cal-link="wikolabs-team/30min"
              data-cal-namespace="wk30min"
              data-cal-config='{"layout":"month_view"}'
              style={{
                background: C.gold, color: "#0D1117", border: "none",
                borderRadius: 10, padding: "14px 28px", fontWeight: 700,
                fontSize: 15, cursor: "pointer", display: "flex", alignItems: "center", gap: 8
              }}
            >
              <span>📅</span> Planifier un appel
            </button>
            {/* WhatsApp button */}
            <a
              href="https://wa.me/261386626100?text=Bonjour%2C%20je%20souhaite%20discuter%20de%20okaiz.com%20avec%20Wikolabs."
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: "#25d366", color: "#fff", border: "none",
                borderRadius: 10, padding: "14px 28px", fontWeight: 700,
                fontSize: 15, textDecoration: "none", display: "flex", alignItems: "center", gap: 8
              }}
            >
              <span>💬</span> WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: `1px solid ${C.border}`, padding: "32px 24px", textAlign: "center" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 16, fontWeight: 700, color: C.white, fontFamily: "var(--font-display)" }}>
            okaiz<span style={{ color: C.gold }}>.com</span>
          </span>
          <span style={{ color: C.muted, fontSize: 14 }}>
            © 2026 okaiz.com — Marketplace IA de véhicules d'occasion à Madagascar
          </span>
          <a href="mailto:team@wikolabs.com" style={{ color: C.muted, fontSize: 14, textDecoration: "none" }}>
            team@wikolabs.com
          </a>
        </div>
      </footer>
    </div>
  );
}
