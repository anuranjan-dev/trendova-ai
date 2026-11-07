/** Illustrative prices supplied in the homepage export, not active subscriptions. */
export function previewPrice(plan: "starter" | "pro" | "team", annual: boolean): number {
  if (plan === "starter") return 0;
  if (plan === "pro") return annual ? 15 : 19;
  return annual ? 39 : 49;
}