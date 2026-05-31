import { NextResponse } from "next/server";
import { chat, isConfigured } from "@/lib/llm";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SYSTEM_PROMPT_FR = `Tu es okaiz, l'agent IA d'une marketplace de voitures d'occasion a Madagascar (Antananarivo, Tamatave, Majunga). L'utilisateur te donne une marque preferee et un budget en Ariary (MGA) ou EUR. Tu DOIS jouer un commercial expert du marche local et inventer 3 annonces realistes coherentes avec le marche malgache (modeles populaires : Toyota Vitz, Hilux, RAV4, Hyundai i10, Mitsubishi L200, Renault Logan...).

Format de sortie exact en MARKDOWN :
**🚗 3 annonces selectionnees**
- ANNONCE 1 : Marque + modele + annee + km + prix MGA + ville + 1 ligne commentaire
- ANNONCE 2 : idem
- ANNONCE 3 : idem (varier les fourchettes prix dans le budget)

**🎯 Pourquoi ces choix**
- 2 phrases qui expliquent le rapport qualite/prix sur le marche malgache, fiabilite, pieces detachees disponibles localement.

**📋 Conseil avant achat**
- 3 puces : controle technique a faire, papiers a verifier (carte grise, certificat de gage), points d'attention specifiques au modele.

Maximum 280 mots. Reste pragmatique, sans superlatifs. Inclus les prix en MGA (ex: "32 500 000 MGA").`;

const SYSTEM_PROMPT_EN = `You are okaiz, an AI agent for a used-car marketplace in Madagascar (Antananarivo, Tamatave, Majunga). The user gives you a preferred brand and a budget in Ariary (MGA) or EUR. You MUST play a local market expert and invent 3 realistic listings consistent with the Malagasy market (popular models: Toyota Vitz, Hilux, RAV4, Hyundai i10, Mitsubishi L200, Renault Logan...).

Exact MARKDOWN output format:
**🚗 3 selected listings**
- LISTING 1: Brand + model + year + km + MGA price + city + 1-line comment
- LISTING 2: same
- LISTING 3: same (vary price brackets within budget)

**🎯 Why these picks**
- 2 sentences explaining value for money on the Malagasy market, reliability, locally available spare parts.

**📋 Pre-purchase advice**
- 3 bullets: technical inspection to do, papers to check (registration, pledge certificate), model-specific watch points.

Max 280 words. Stay pragmatic, no superlatives. Include MGA prices (e.g. "32 500 000 MGA").`;

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const brand: string = typeof body.brand === "string" ? body.brand.trim().slice(0, 40) : "";
    const budget: string = typeof body.budget === "string" ? body.budget.trim().slice(0, 40) : "";
    const lang: "fr" | "en" = body.lang === "en" ? "en" : "fr";

    if (!brand) {
      return NextResponse.json(
        { error: lang === "fr" ? "Selectionnez une marque." : "Select a brand." },
        { status: 400 }
      );
    }

    if (!isConfigured()) {
      return NextResponse.json(
        {
          error: "llm_not_configured",
          message: lang === "fr"
            ? "Demo en mode statique - la cle LLM sera configuree au prochain deploiement."
            : "Static demo mode - LLM key will be configured at next deploy.",
          mockOutput: buildMock(brand, budget, lang),
        },
        { status: 200 }
      );
    }

    const userMsg = lang === "fr"
      ? `Marque souhaitee : "${brand}". Budget : "${budget || "ouvert"}". Propose 3 annonces.`
      : `Preferred brand: "${brand}". Budget: "${budget || "open"}". Propose 3 listings.`;

    const { text, model } = await chat(
      [
        { role: "system", content: lang === "fr" ? SYSTEM_PROMPT_FR : SYSTEM_PROMPT_EN },
        { role: "user", content: userMsg },
      ],
      800
    );

    return NextResponse.json({ output: text, model, generatedAt: new Date().toISOString() });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "unknown";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

function buildMock(brand: string, budget: string, lang: "fr" | "en"): string {
  if (lang === "en") {
    return `**🚗 3 selected listings**\n- LISTING 1: ${brand} Vitz 2017, 78 000 km, 28 500 000 MGA, Antananarivo - well-maintained, AC working, single owner\n- LISTING 2: ${brand} Hilux 2015, 132 000 km, 65 000 000 MGA, Tamatave - 4x4 double cab, recent timing belt\n- LISTING 3: ${brand} i10 2019, 42 000 km, 32 000 000 MGA, Antananarivo - low mileage, full service history\n\n**🎯 Why these picks**\n- Top 3 most resold models in your range. Spare parts abundant in Behoririka, mechanics know them well.\n\n**📋 Pre-purchase advice**\n- Demand technical inspection by independent garage (CTM Tana ~150 000 MGA)\n- Check registration card + pledge certificate (less than 1 month old)\n- ${brand} watch point: chain/timing belt + AC compressor (often weak in Madagascar)\n\nBudget targeted: ${budget || "open"}.`;
  }
  return `**🚗 3 annonces selectionnees**\n- ANNONCE 1 : ${brand} Vitz 2017, 78 000 km, 28 500 000 MGA, Antananarivo - bien entretenue, clim OK, 1 seul proprietaire\n- ANNONCE 2 : ${brand} Hilux 2015, 132 000 km, 65 000 000 MGA, Tamatave - 4x4 double cabine, courroie distribution recente\n- ANNONCE 3 : ${brand} i10 2019, 42 000 km, 32 000 000 MGA, Antananarivo - faible kilometrage, carnet entretien complet\n\n**🎯 Pourquoi ces choix**\n- Top 3 des modeles les plus revendus dans votre tranche. Pieces detachees abondantes a Behoririka, mecanos qui les connaissent bien.\n\n**📋 Conseil avant achat**\n- Exiger controle technique par garage independant (CTM Tana ~150 000 MGA)\n- Verifier carte grise + certificat de gage (moins d'1 mois)\n- Point ${brand} : courroie/chaine de distribution + compresseur clim (faible souvent a Madagascar)\n\nBudget vise : ${budget || "ouvert"}.`;
}
