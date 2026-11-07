import { describe, expect, it } from "vitest";
import { previewPrice } from "@/lib/nova/preview-pricing";

describe("Supplied illustrative plan prices", () => {
  it("keeps Starter free for both billing choices", () => {
    expect(previewPrice("starter", false)).toBe(0);
    expect(previewPrice("starter", true)).toBe(0);
  });
  it("uses Professional at 19 monthly and 15 billed yearly", () => {
    expect(previewPrice("pro", false)).toBe(19);
    expect(previewPrice("pro", true)).toBe(15);
  });
  it("uses Team at 49 monthly and 39 billed yearly", () => {
    expect(previewPrice("team", false)).toBe(49);
    expect(previewPrice("team", true)).toBe(39);
  });
});