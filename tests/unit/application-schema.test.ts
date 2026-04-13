import {describe, expect, it} from "vitest";

import {envSchema} from "@/lib/env";

describe("env schema", () => {
  it("requires the Supabase url and keys", () => {
    const result = envSchema.safeParse({});

    expect(result.success).toBe(false);
  });
});
