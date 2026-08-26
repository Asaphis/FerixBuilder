import { describe, expect, it } from "vitest";
import { decodeOAuthState, encodeOAuthState } from "../shared/const";

describe("FerixBuilder OAuth entry state", () => {
  it("preserves the frontend callback URL and one-time nonce", () => {
    const state = encodeOAuthState({ redirectUri: "https://ferixbuilder.example/api/oauth/callback", nonce: "one-time-nonce" });

    expect(decodeOAuthState(state)).toEqual({ redirectUri: "https://ferixbuilder.example/api/oauth/callback", nonce: "one-time-nonce" });
  });

  it("fails closed for malformed authentication state", () => {
    expect(decodeOAuthState("not-a-valid-oauth-state")).toEqual({ redirectUri: "" });
  });
});
