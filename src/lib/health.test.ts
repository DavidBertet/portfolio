import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { getHealth } from "./health.ts";

describe("getHealth", () => {
  it("returns explicit sha", () => {
    assert.deepEqual(getHealth("abc123"), { status: "ok", sha: "abc123" });
  });

  it("falls back to GITHUB_SHA env", () => {
    process.env.GITHUB_SHA = "env-sha";
    assert.equal(getHealth().sha, "env-sha");
    delete process.env.GITHUB_SHA;
  });

  it("falls back to dev without env", () => {
    delete process.env.GITHUB_SHA;
    assert.equal(getHealth().sha, "dev");
  });
});
