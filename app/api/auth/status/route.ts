import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

const FREE_LIMIT = 3;
const COOKIE_KEY = "keikaku_use_count";
const PAYJP_API = "https://api.pay.jp/v1";

function payjpAuth() {
  return "Basic " + Buffer.from(process.env.PAYJP_SECRET_KEY! + ":").toString("base64");
}

async function checkSubscriptionActive(subId: string): Promise<boolean> {
  try {
    const res = await fetch(`${PAYJP_API}/subscriptions/${subId}`, {
      headers: { Authorization: payjpAuth() },
    });
    const data = await res.json();
    return data.status === "active" || data.status === "trial";
  } catch {
    return true;
  }
}

export async function GET() {
  const cookieStore = await cookies();
  const premium = cookieStore.get("premium")?.value;
  const usedCount = parseInt(cookieStore.get(COOKIE_KEY)?.value || "0", 10);

  if (!premium) {
    const remaining = Math.max(0, FREE_LIMIT - usedCount);
    return NextResponse.json({ premium: false, remaining });
  }

  const subId = cookieStore.get("payjp_sub_id")?.value;
  if (subId) {
    const isActive = await checkSubscriptionActive(subId);
    if (!isActive) {
      const res = NextResponse.json({ premium: false, remaining: 0 });
      res.cookies.set("premium", "", { maxAge: 0, path: "/" });
      res.cookies.set("payjp_sub_id", "", { maxAge: 0, path: "/" });
      return res;
    }
  }

  return NextResponse.json({ premium: true, remaining: null });
}
