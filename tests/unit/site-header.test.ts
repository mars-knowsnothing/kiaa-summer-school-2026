import {describe, expect, it} from "vitest";

import {getLocaleSwitchHref} from "@/components/layout/site-header";

describe("getLocaleSwitchHref", () => {
  it("switches the locale segment and preserves the rest of the pathname", () => {
    expect(getLocaleSwitchHref("/zh/speakers", "zh")).toBe("/en/speakers");
    expect(getLocaleSwitchHref("/en/agenda/day-1", "en")).toBe("/zh/agenda/day-1");
  });

  it("falls back to the alternate locale homepage when the pathname is not prefixed", () => {
    expect(getLocaleSwitchHref("/", "zh")).toBe("/en");
  });
});
