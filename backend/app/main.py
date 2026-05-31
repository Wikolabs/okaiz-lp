"""okaiz demo backend - production-ready POC.

In production: this service would query a real listings index of used
cars in Madagascar (Mongo / OpenSearch) with geo and price filters,
and run an LLM-narrated ranking. For the demo: it only invokes the
LLM and returns 3 fictional but plausible listings.
"""
from datetime import datetime, timezone
from typing import Literal

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from .llm import chat, is_configured

app = FastAPI(
    title="okaiz Demo Backend",
    description="POC backend - Groq/Gemini LLM. No third-party connections.",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)

# -----------------------------------------------------------------------------
# Prompts
# -----------------------------------------------------------------------------
SYSTEM_PROMPT_FR = """Tu es okaiz, l'agent IA d'une marketplace de voitures d'occasion a Madagascar (Antananarivo, Tamatave, Majunga). L'utilisateur te donne une marque preferee et un budget en Ariary (MGA) ou EUR. Tu DOIS jouer un commercial expert du marche local et inventer 3 annonces realistes coherentes avec le marche malgache (modeles populaires : Toyota Vitz, Hilux, RAV4, Hyundai i10, Mitsubishi L200, Renault Logan...).

Format de sortie exact en MARKDOWN :
**🚗 3 annonces selectionnees**
- ANNONCE 1 : Marque + modele + annee + km + prix MGA + ville + 1 ligne commentaire
- ANNONCE 2 : idem
- ANNONCE 3 : idem (varier les fourchettes prix dans le budget)

**🎯 Pourquoi ces choix**
- 2 phrases qui expliquent le rapport qualite/prix sur le marche malgache, fiabilite, pieces detachees disponibles localement.

**📋 Conseil avant achat**
- 3 puces : controle technique a faire, papiers a verifier (carte grise, certificat de gage), points d'attention specifiques au modele.

Maximum 280 mots. Reste pragmatique, sans superlatifs. Inclus les prix en MGA (ex: "32 500 000 MGA")."""

SYSTEM_PROMPT_EN = """You are okaiz, an AI agent for a used-car marketplace in Madagascar (Antananarivo, Tamatave, Majunga). The user gives you a preferred brand and a budget in Ariary (MGA) or EUR. You MUST play a local market expert and invent 3 realistic listings consistent with the Malagasy market (popular models: Toyota Vitz, Hilux, RAV4, Hyundai i10, Mitsubishi L200, Renault Logan...).

Exact MARKDOWN output format:
**🚗 3 selected listings**
- LISTING 1: Brand + model + year + km + MGA price + city + 1-line comment
- LISTING 2: same
- LISTING 3: same (vary price brackets within budget)

**🎯 Why these picks**
- 2 sentences explaining value for money on the Malagasy market, reliability, locally available spare parts.

**📋 Pre-purchase advice**
- 3 bullets: technical inspection to do, papers to check (registration, pledge certificate), model-specific watch points.

Max 280 words. Stay pragmatic, no superlatives. Include MGA prices (e.g. "32 500 000 MGA")."""


# -----------------------------------------------------------------------------
# Models
# -----------------------------------------------------------------------------
class GenerateRequest(BaseModel):
    brand: str = Field(..., min_length=1, max_length=40)
    budget: str = Field("", max_length=40)
    lang: Literal["fr", "en"] = "fr"


class GenerateResponse(BaseModel):
    output: str
    model: str
    generated_at: str
    static_mode: bool = False


# -----------------------------------------------------------------------------
# Routes
# -----------------------------------------------------------------------------
@app.get("/health")
def health():
    return {
        "status": "ok",
        "service": "okaiz-lp-backend",
        "llm_configured": is_configured(),
    }


@app.post("/process", response_model=GenerateResponse)
async def process(req: GenerateRequest) -> GenerateResponse:
    brand = (req.brand or "").strip()[:40]
    budget = (req.budget or "").strip()[:40]
    if not brand:
        raise HTTPException(status_code=400, detail="empty_brand")

    now_iso = datetime.now(timezone.utc).isoformat()
    user_msg = (
        f'Marque souhaitee : "{brand}". Budget : "{budget or "ouvert"}". Propose 3 annonces.'
        if req.lang == "fr"
        else f'Preferred brand: "{brand}". Budget: "{budget or "open"}". Propose 3 listings.'
    )

    if not is_configured():
        return GenerateResponse(
            output=_build_mock_brief(brand, budget, req.lang),
            model="static-mock",
            generated_at=now_iso,
            static_mode=True,
        )

    try:
        text, model = await chat(
            [
                {"role": "system", "content": SYSTEM_PROMPT_FR if req.lang == "fr" else SYSTEM_PROMPT_EN},
                {"role": "user", "content": user_msg},
            ],
            max_tokens=800,
        )
    except Exception:
        return GenerateResponse(
            output=_build_mock_brief(brand, budget, req.lang),
            model="static-mock",
            generated_at=now_iso,
            static_mode=True,
        )

    return GenerateResponse(output=text, model=model, generated_at=now_iso)


# -----------------------------------------------------------------------------
# Mock brief (used when no LLM key configured)
# -----------------------------------------------------------------------------
def _build_mock_brief(brand: str, budget: str, lang: str) -> str:
    if lang == "en":
        return (
            f"**🚗 3 selected listings**\n"
            f"- LISTING 1: {brand} Vitz 2017, 78 000 km, 28 500 000 MGA, Antananarivo - well-maintained, AC working, single owner\n"
            f"- LISTING 2: {brand} Hilux 2015, 132 000 km, 65 000 000 MGA, Tamatave - 4x4 double cab, recent timing belt\n"
            f"- LISTING 3: {brand} i10 2019, 42 000 km, 32 000 000 MGA, Antananarivo - low mileage, full service history\n\n"
            f"**🎯 Why these picks**\n"
            f"- Top 3 most resold models in your range. Spare parts abundant in Behoririka, mechanics know them well.\n\n"
            f"**📋 Pre-purchase advice**\n"
            f"- Demand technical inspection by independent garage (CTM Tana ~150 000 MGA)\n"
            f"- Check registration card + pledge certificate (less than 1 month old)\n"
            f"- {brand} watch point: chain/timing belt + AC compressor (often weak in Madagascar)\n\n"
            f'Budget targeted: {budget or "open"}.'
        )
    return (
        f"**🚗 3 annonces selectionnees**\n"
        f"- ANNONCE 1 : {brand} Vitz 2017, 78 000 km, 28 500 000 MGA, Antananarivo - bien entretenue, clim OK, 1 seul proprietaire\n"
        f"- ANNONCE 2 : {brand} Hilux 2015, 132 000 km, 65 000 000 MGA, Tamatave - 4x4 double cabine, courroie distribution recente\n"
        f"- ANNONCE 3 : {brand} i10 2019, 42 000 km, 32 000 000 MGA, Antananarivo - faible kilometrage, carnet entretien complet\n\n"
        f"**🎯 Pourquoi ces choix**\n"
        f"- Top 3 des modeles les plus revendus dans votre tranche. Pieces detachees abondantes a Behoririka, mecanos qui les connaissent bien.\n\n"
        f"**📋 Conseil avant achat**\n"
        f"- Exiger controle technique par garage independant (CTM Tana ~150 000 MGA)\n"
        f"- Verifier carte grise + certificat de gage (moins d'1 mois)\n"
        f"- Point {brand} : courroie/chaine de distribution + compresseur clim (faible souvent a Madagascar)\n\n"
        f'Budget vise : {budget or "ouvert"}.'
    )
