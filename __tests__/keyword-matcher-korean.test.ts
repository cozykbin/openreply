import { describe, expect, it } from "vitest";
import { matchKeywords } from "../lib/utils/keyword-matcher";
import { getCampaignTemplate } from "../lib/templates/campaign-templates";

describe("Korean comment campaigns", () => {
  it("matches a Korean keyword with punctuation, emojis, and decomposed Hangul", () => {
    for (const comment of ["정보 주세요!", "🔥정보🔥", "정보".normalize("NFD")]) {
      expect(matchKeywords(comment, ["정보"], true)).toEqual({ matched: true, matchedKeyword: "정보" });
    }
  });

  it("requires an explicit partial match for Korean particles and joined text", () => {
    for (const comment of ["정보요", "정보주세요", "개인정보"]) {
      expect(matchKeywords(comment, ["정보"], true).matched).toBe(false);
      expect(matchKeywords(comment, ["정보"], false).matched).toBe(true);
    }
  });

  it("matches each Korean starter template's sample with the production default", () => {
    for (const slug of ["ko-resource-link", "ko-product-link", "ko-event-signup"]) {
      const template = getCampaignTemplate(slug)!;
      expect(matchKeywords(template.triggerExample, template.keywords, true).matched).toBe(true);
    }
  });
});
