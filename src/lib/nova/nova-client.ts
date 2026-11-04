import { buildTrendReport } from "./trend-data";
import type { BrandProfile, ContentBrief, ContentResult, NovaClient, TrendReport } from "./types";

/**
 * Demo implementation of the trend/content client contract.
 *
 * Replace the two methods with `fetch` calls to a Python (FastAPI) backend when
 * one is available — the UI depends only on the contract in `./types`.
 * Model keys must stay on the server; never in this bundle.
 */

const wait = (ms: number, signal?: AbortSignal) =>
  new Promise<void>((resolve, reject) => {
    const id = setTimeout(resolve, ms);
    signal?.addEventListener("abort", () => {
      clearTimeout(id);
      reject(new DOMException("Aborted", "AbortError"));
    });
  });

function toneLine(brief: ContentBrief, profile?: BrandProfile | null) {
  return profile?.tone?.trim() ? profile.tone : brief.tone;
}

export const demoClient: NovaClient = {
  async scanTrends({ category, brandName, signal }): Promise<TrendReport> {
    await wait(900, signal);
    if (/^fail$/i.test(category.trim())) {
      throw new Error("Trend service unavailable. Try again in a moment.");
    }
    return buildTrendReport(category, brandName);
  },

  async generateContent({ brief, profile, signal }): Promise<ContentResult> {
    await wait(1200, signal);

    const brand = brief.brandName.trim() || "your brand";
    const product = brief.product.trim() || "your product";
    const audience = brief.audience.trim() || "Gen Z";
    const tone = toneLine(brief, profile);

    return {
      postIdeas: [
        `A 15-second ${brief.platform} clip showing ${product} solving one small daily annoyance for ${audience}.`,
        `Ask ${audience} to finish the sentence: "I'd actually buy ${product} if…" — then answer the top three replies.`,
        `Show the real cost breakdown behind ${product}. Transparency reads as confidence.`,
        `Put ${product} in the hands of one real customer and let them narrate, unscripted.`,
      ],
      hooks: [
        `Nobody warned ${audience} about this.`,
        `We tested ${product} for 30 days. Here's the part we didn't expect.`,
        `If you've ever wasted money on this, watch for 10 seconds.`,
        `${brand} did the boring research so you don't have to.`,
      ],
      captions: [
        `Built for ${audience}, not for a boardroom. ${product} — out now.`,
        `Small brand, loud opinions. This is why ${product} exists.`,
        `You asked, we shipped it. ${product} is live. Tell us what to fix next.`,
      ],
      adCopy: [
        `${brand} — ${product}, made for ${audience}. ${tone} by design, honest about the price, and built to be reposted.`,
        `Stop scrolling past ads that don't get you. ${product} was designed with ${audience} in the room. Goal: ${brief.goal.toLowerCase()}.`,
      ],
      ctas: [
        "Tap in — link in bio",
        "Tell us what we got wrong",
        "Grab yours before the drop closes",
        "Save this for later",
      ],
      hashtags: [
        `#${brand.toLowerCase().replace(/[^a-z0-9]/g, "") || "trendova"}`,
        "#genz",
        "#smallbrandcheck",
        `#${brief.platform.toLowerCase().replace(/[^a-z0-9]/g, "")}`,
        "#honestmarketing",
        "#newdrop",
      ],
    };
  },
};

export const novaClient: NovaClient = demoClient;
