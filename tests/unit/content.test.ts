import {describe, expect, it} from "vitest";

import {agendaWorkshop} from "@/content/agenda";
import {localized, site} from "@/content/site";
import {speakers} from "@/content/speakers";

describe("speakers content", () => {
  it("includes lecturer and committee roles", () => {
    expect(new Set(speakers.map((speaker) => speaker.role))).toEqual(
      new Set(["lecturer", "scientific_committee", "local_committee"])
    );
  });
});

describe("site content", () => {
  it("uses the literal PRD zh title and a single canonical localized date string", () => {
    expect(localized(site.title, "zh")).toBe("原行星盘与行星形成暑期学校及讨论班");
    expect(localized(site.dates, "zh")).toBe("2026年7月20日 - 8月28日");
    expect(localized(site.home.copy.dates, "en")).toBe("July 20 - August 28, 2026");
    expect(localized(site.dates, "en")).toBe(localized(site.home.copy.dates, "en"));
  });
});

describe("agenda content", () => {
  it("keeps the PRD week 2-6 date range", () => {
    expect(localized(agendaWorkshop.dateRange, "en")).toBe("July 25 – August 28, 2026");
    expect(localized(agendaWorkshop.dateRange, "zh")).toBe("2026年7月25日至8月28日");
  });
});
