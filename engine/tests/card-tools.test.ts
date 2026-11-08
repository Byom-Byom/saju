// Modified from tests/mcp-widgets.test.ts of Legend Saju: removed the widget HTML checks, since the widgets were removed; added the compatibility useful-god check.
import { describe, expect, it } from "vitest";
import { computeSajuChart, pickYongsin } from "../src/engine/saju-engine";
import {
  buildCompatibilityCardPayload,
  buildFortuneCardsPayload,
  buildLuckTimelinePayload,
  buildNatalCardPayload,
} from "../src/mcp-render";
import { runFortuneCardsTool, runNatalCardTool } from "../src/tools";

const birth = { year: 1991, month: 3, day: 14, hour: 7, minute: 0, gender: "여" as const };
const partner = { year: 1989, month: 8, day: 17, hour: 11, minute: 0, gender: "남" as const };

describe("ChatGPT Apps widget payloads", () => {
  it("builds a natal card with pillars, elements, verdicts, and sinsal", () => {
    const payload = buildNatalCardPayload(birth, { headline: "표현으로 여는 사주" }) as any;
    expect(payload.widget).toBe("saju-natal-card");
    expect(payload.pillars.day.gan).toBe("癸");
    expect(payload.dayMaster.label).toContain("일간");
    expect(Object.keys(payload.elements.weights)).toHaveLength(5);
    expect(payload.verdicts.geokguk.label).toContain("격");
    expect(Array.isArray(payload.sinsal)).toBe(true);
    expect(payload.narrative.headline).toBe("표현으로 여는 사주");
    expect(payload.disclaimer).toBeUndefined();
  });

  it("builds fortune cards with engine luck facts and clamps model scores", () => {
    const payload = buildFortuneCardsPayload(birth, [
      { domain: "재물운", score: 9, text: "결과물을 수입으로 잇는 흐름." },
      { domain: "연애운", text: "서두르지 않는 편이 좋다." },
    ], { asOfYear: 2026, actions: [{ title: "물건 정리" }] }) as any;
    expect(payload.widget).toBe("saju-fortune-cards");
    expect(payload.luck.year).toBe(2026);
    expect(payload.luck.daYun).toMatch(/^[一-鿿]{2}$/);
    expect(payload.cards[0].score).toBe(5);
    expect(payload.cards[1].score).toBeUndefined();
    expect(payload.verdictChips.length).toBe(3);
  });

  it("builds a compatibility card with typed deterministic signals", () => {
    const payload = buildCompatibilityCardPayload(birth, partner, { nameA: "나", nameB: "상대", score: 4 }) as any;
    expect(payload.widget).toBe("saju-compatibility-card");
    expect(payload.personA.dayGan).toBe("癸");
    expect(payload.signals.length).toBeGreaterThan(0);
    expect(payload.signals.every((signal: any) => typeof signal.type === "string" && signal.text.length > 0)).toBe(true);
  });

  it("judges compatibility useful-god signals by the natal card's useful-god candidates", () => {
    const people = Array.from({ length: 24 }, (_, i) => ({
      year: 1985 + i, month: (i % 12) + 1, day: 15, hour: 9, minute: 0, gender: (i % 2 ? "남" : "여") as "남" | "여",
    }));
    let oldHeuristicDisagrees = false;
    for (let i = 0; i + 1 < people.length; i += 1) {
      const [a, b] = [people[i], people[i + 1]];
      const [natalA, natalB] = [buildNatalCardPayload(a) as any, buildNatalCardPayload(b) as any];
      const texts = (buildCompatibilityCardPayload(a, b, {}) as any).signals.map((signal: any) => signal.text).join(" / ");
      const aHelpsB = natalB.verdicts.yongsin.label.split("·").includes(natalA.dayMaster.el);
      const bHelpsA = natalA.verdicts.yongsin.label.split("·").includes(natalB.dayMaster.el);
      expect(texts.includes("A가 B에 보탬")).toBe(aHelpsB);
      expect(texts.includes("B가 A에 보탬")).toBe(bHelpsA);
      if (pickYongsin(computeSajuChart(b)).primary.includes(natalA.dayMaster.el) !== aHelpsB) oldHeuristicDisagrees = true;
    }
    expect(oldHeuristicDisagrees).toBe(true);
  });

  it("builds a luck timeline with exactly one current 대운 and a focus year", () => {
    const payload = buildLuckTimelinePayload(birth, { asOfYear: 2026, focusYear: 2027, focusNote: "이직 후보 해" }) as any;
    expect(payload.widget).toBe("saju-luck-timeline");
    expect(payload.daYun.length).toBeGreaterThanOrEqual(7);
    expect(payload.daYun.filter((step: any) => step.current)).toHaveLength(1);
    expect(payload.focus.year).toBe(2027);
    expect(payload.focus.seYun).toMatch(/^[一-鿿]{2}$/);
    expect(payload.seYun).toBe("丙午");
  });

  it("requires gender for the luck timeline", () => {
    expect(() => buildLuckTimelinePayload({ ...birth, gender: undefined }, {})).toThrow("GENDER_REQUIRED");
  });
});

describe("widget MCP tools", () => {
  it("returns widget structuredContent from the natal card tool", () => {
    const result = runNatalCardTool({ birth });
    expect(result.isError).not.toBe(true);
    expect(result.structuredContent.widget).toBe("saju-natal-card");
  });

  it("surfaces engine errors as tool errors", () => {
    const result = runFortuneCardsTool({ birth: { ...birth, gender: undefined }, cards: [{ domain: "총운", text: "x" }] });
    expect(result.isError).toBe(true);
  });
});
