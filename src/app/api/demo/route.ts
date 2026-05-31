import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// In docker-compose: BACKEND_URL=http://okaiz-lp-backend:8000
// In local dev (next dev outside compose): falls back to localhost
const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:8000";

export async function POST(req: Request) {
  let body: { brand?: string; budget?: string; lang?: "fr" | "en" } = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "bad_json" }, { status: 400 });
  }

  const brand = typeof body.brand === "string" ? body.brand.trim().slice(0, 40) : "";
  const budget = typeof body.budget === "string" ? body.budget.trim().slice(0, 40) : "";
  const lang: "fr" | "en" = body.lang === "en" ? "en" : "fr";

  if (!brand) {
    return NextResponse.json(
      { error: lang === "fr" ? "Selectionnez une marque." : "Select a brand." },
      { status: 400 }
    );
  }

  try {
    const r = await fetch(`${BACKEND_URL}/process`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ brand, budget, lang }),
      cache: "no-store",
    });
    const j = await r.json();
    if (!r.ok) {
      return NextResponse.json({ error: j.detail || "backend_error" }, { status: r.status });
    }
    return NextResponse.json({
      output: j.output,
      model: j.model,
      generatedAt: j.generated_at,
      staticMode: Boolean(j.static_mode),
    });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "unknown_error";
    return NextResponse.json({ error: `backend_unreachable: ${msg}` }, { status: 502 });
  }
}
