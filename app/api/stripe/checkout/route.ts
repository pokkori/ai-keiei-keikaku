import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!);
}

export async function POST(req: NextRequest) {
  const { priceType } = await req.json();
  const origin = req.headers.get("origin") || "https://ai-keiei-keikaku.vercel.app";

  const priceId = priceType === "monthly"
    ? process.env.STRIPE_PRICE_MONTHLY!
    : process.env.STRIPE_PRICE_ONCE!;

  const mode = priceType === "monthly" ? "subscription" : "payment";

  const session = await getStripe().checkout.sessions.create({
    mode,
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/`,
    locale: "ja",
  });

  return NextResponse.json({ url: session.url });
}
