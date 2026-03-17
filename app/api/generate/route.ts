import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { rateLimit, getIP } from "@/lib/ratelimit";
import { isActiveSubscription } from "@/lib/supabase";

export const dynamic = "force-dynamic";

const FREE_LIMIT = 3;
const COOKIE_KEY = "keikaku_use_count";
const APP_ID = "keikaku";

function getClient() {
  return new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
}

export async function POST(req: NextRequest) {
  const { ok } = rateLimit(getIP(req));
  if (!ok) {
    return NextResponse.json({ error: "リクエストが多すぎます。しばらく待ってから再試行してください。" }, { status: 429 });
  }

  const cookieStore = await cookies();
  const email = cookieStore.get("user_email")?.value;
  let isPremium = false;
  if (email) {
    isPremium = await isActiveSubscription(email, APP_ID);
  } else {
    isPremium = cookieStore.get("stripe_premium")?.value === "1" || cookieStore.get("premium")?.value === "1";
  }
  const cookieCount = parseInt(cookieStore.get(COOKIE_KEY)?.value || "0", 10);

  if (!isPremium && cookieCount >= FREE_LIMIT) {
    return NextResponse.json({ error: "LIMIT_REACHED" }, { status: 402 });
  }

  let body: Record<string, string>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "リクエストの形式が正しくありません" }, { status: 400 });
  }

  const { businessName, industry, scale, overview, strengths, challenges, goal3y, initialFund } = body;

  if (!overview?.trim()) return NextResponse.json({ error: "事業概要は必須です" }, { status: 400 });
  if (!industry) return NextResponse.json({ error: "業種を選択してください" }, { status: 400 });

  const prompt = `あなたは経営コンサルタント・中小企業診断士のAIです。日本政策金融公庫・信用金庫・ベンチャーキャピタルへの融資・投資申請で採用された経営計画書を年間100件以上作成した実績を持ちます。審査官・投資家が「この事業には可能性がある」と判断する計画書の構成・語彙・数値設定を熟知しています。

以下の情報をもとに、融資申請・補助金申請・投資家向けに使える本格的な経営計画書を作成してください。

【品質基準（必須）】
- 各セクションで指定された文字数・項目数を必ず満たすこと（短縮禁止）
- 数値は必ず具体的に記載すること（例：「売上○○万円」「顧客単価○○円」「月間来客数○○名」）。根拠のない楽観的な数値は避け、現実的な試算を示すこと
- プロフェッショナルな経営・財務語彙を使用すること（例：「お客さん」→「顧客」「クライアント」、「儲かる」→「収益性が高い」「高い利益率が見込まれる」、「やる」→「実施する」「遂行する」「展開する」）
- 業界特有の専門用語・トレンドワードを適切に盛り込むこと（例：DX推進・サブスクリプションモデル・LTV最大化・OMO戦略等）
- 実例・同業他社の成功事例を参照した具体的な戦略提案を含めること

【事業情報】
事業名: ${businessName || "未入力"}
業種: ${industry}
事業規模: ${scale}
事業概要: ${overview}
強み・差別化: ${strengths || "未入力"}
現在の課題: ${challenges || "未入力"}
3年後の目標: ${goal3y || "未入力"}
初期投資・資金: ${initialFund || "未入力"}

以下の形式で回答してください：

===OVERVIEW===
## 事業概要・ビジョン

### 事業の目的と背景
（事業を始める理由・社会課題・市場ニーズを具体的に200文字）

### ターゲット市場
（主要顧客・市場規模・アプローチ方法を具体的に150文字）

### 独自の強み・競合優位性
（競合との差別化要因を箇条書き3〜5点）

### 収益モデル
（どのように売上を得るか、主要な収益源を明確に）

===FINANCE===
## 3年間収支計画

### 前提条件・想定
（売上単価・月間顧客数・稼働率などの前提を明記）

### 年次サマリー
| 年度 | 売上高 | 原価 | 固定費 | 営業利益 | 利益率 |
|---|---|---|---|---|---|
| 1年目 | | | | | |
| 2年目 | | | | | |
| 3年目 | | | | | |

### 損益分岐点
（月次の損益分岐点売上高と、それを達成するための必要顧客数・稼働率）

### 資金繰り計画
（初期投資の回収時期・運転資金の推移・資金ショートリスクと対策）

===SWOT===
## SWOT分析・戦略立案

**強み（Strengths）**
- （具体的な強みを3〜5点）

**弱み（Weaknesses）**
- （正直な弱みを3〜4点と対策）

**機会（Opportunities）**
- （市場トレンド・社会変化による追い風を3〜4点）

**脅威（Threats）**
- （競合・規制・経済環境などのリスクを3〜4点）

### クロスSWOT戦略
**SO戦略（強みで機会を掴む）**:
**ST戦略（強みで脅威を回避）**:
**WO戦略（弱みを克服して機会を活かす）**:
**WT戦略（リスク最小化）**:

===ACTION===
## アクションプラン（12ヶ月ロードマップ）

### フェーズ1: 準備期（1〜3ヶ月）
（具体的なタスクを箇条書き5〜7点）

### フェーズ2: 立ち上げ期（4〜6ヶ月）
（具体的なタスクを箇条書き5〜7点）

### フェーズ3: 成長期（7〜12ヶ月）
（具体的なタスクを箇条書き5〜7点）

### KPI（重要指標）
- 月次売上目標（3ヶ月後）:
- 月次売上目標（6ヶ月後）:
- 月次売上目標（12ヶ月後）:
- リピート率目標:
- 顧客獲得コスト（目標）:

===PITCH===
## 投資家向けピッチ

### エレベーターピッチ（30秒）
（1〜2文で事業の本質を伝える）

### 解決する問題
（「〇〇な人は〇〇で困っている」形式で具体的に）

### ソリューション
（どのようにその課題を解決するか）

### 市場規模
- TAM（全体市場規模）:
- SAM（対象市場規模）:
- SOM（1〜3年で獲得可能な市場）:

### ビジネスモデル
（単価・顧客数・LTVの想定とマネタイズ方法）

### 競合優位性
（他社と比べて圧倒的に優れている点3点）

### 1年後のマイルストーン
（数値で示せる具体的な目標）

===BENCHMARK===
## 業界ベンチマーク比較

### 業界標準KPIとの比較（${industry}業界）
この事業の財務計画と業界平均値を比較してください。

| 指標 | 業界平均 | 本計画目標 | 差異・コメント |
|---|---|---|---|
| 粗利益率（%） | | | |
| 営業利益率（%） | | | |
| 月次売上成長率（%） | | | |
| 顧客獲得コスト（円） | | | |
| 顧客継続率/リピート率（%） | | | |

### この事業の優位点（業界平均を上回る指標とその理由）
（2〜3点・具体的な数値と根拠）

### 改善が必要な点（業界平均を下回る可能性がある指標）
（1〜2点・改善策とセット）

### 融資審査官・投資家へのアピールポイント（この業界特有の視点）
（審査官が「この業種でこの数字なら現実的」と感じるポイントを3点）`;

  try {
    const newCount = cookieCount + 1;
    const remaining = isPremium ? null : FREE_LIMIT - newCount;
    const stream = getClient().messages.stream({
      model: "claude-sonnet-4-6",
      max_tokens: 5000,
      messages: [{ role: "user", content: prompt }],
    });
    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            if (chunk.type === "content_block_delta" && chunk.delta.type === "text_delta") {
              controller.enqueue(encoder.encode(chunk.delta.text));
            }
          }
          controller.enqueue(encoder.encode(`\nDONE:${JSON.stringify({ remaining })}`));
          controller.close();
        } catch (err) { console.error(err); controller.error(err); }
      },
    });
    const headers: Record<string, string> = {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache",
    };
    if (!isPremium) {
      headers["Set-Cookie"] = `${COOKIE_KEY}=${newCount}; Max-Age=${60 * 60 * 24 * 365}; SameSite=Lax; HttpOnly; Secure; Path=/`;
    }
    return new Response(readable, { headers });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "AI生成中にエラーが発生しました" }, { status: 500 });
  }
}
