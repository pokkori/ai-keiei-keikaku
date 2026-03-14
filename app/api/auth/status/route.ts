import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const FREE_LIMIT = 2;
const COOKIE_KEY = "keikaku_use_count";

export async function GET(req: NextRequest) {
  const stripePremium = req.cookies.get("stripe_premium")?.value === "1";
  const payjpPremium = !!req.cookies.get("premium")?.value;
  const isPremium = stripePremium || payjpPremium;
  const usedCount = parseInt(req.cookies.get(COOKIE_KEY)?.value || "0", 10);
  const remaining = isPremium ? null : Math.max(0, FREE_LIMIT - usedCount);
  return NextResponse.json({ premium: isPremium, remaining });
}
