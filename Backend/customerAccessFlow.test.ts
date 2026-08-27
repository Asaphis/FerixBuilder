import { afterEach, describe, expect, it } from "vitest";
import {
  completePreviewOnboarding,
  getOnboardingDraft,
  getPreviewAccount,
  registerPreviewAccount,
  saveOnboardingDraft,
  signInPreviewAccount,
  signOutPreviewAccount,
  verifyPreviewAccount,
} from "../Web/frontend/src/lib/customerAccess";

const store = new Map<string, string>();

Object.defineProperty(globalThis, "window", {
  value: {
    localStorage: {
      getItem: (key: string) => store.get(key) ?? null,
      setItem: (key: string, value: string) => store.set(key, value),
      clear: () => store.clear(),
    },
  },
  writable: true,
});

afterEach(() => store.clear());

describe("preview customer access flow", () => {
  it("keeps a new registration separate from verification and project onboarding", () => {
    const account = registerPreviewAccount({ fullName: "Ada Customer", email: "ADA@EXAMPLE.COM", phone: "+2347000000000" });
    expect(account).toMatchObject({ email: "ada@example.com", emailVerified: false, signedIn: false, onboardingComplete: false });
    expect(getOnboardingDraft()).toMatchObject({ businessEmail: "ada@example.com", businessPhone: "+2347000000000" });
  });

  it("routes the verified account through onboarding until a request is submitted", () => {
    registerPreviewAccount({ fullName: "Ada Customer", email: "ada@example.com", phone: "+2347000000000" });
    expect(signInPreviewAccount()).toBeNull();
    expect(verifyPreviewAccount()).toMatchObject({ emailVerified: true, signedIn: true, onboardingComplete: false });
    saveOnboardingDraft({ ...getOnboardingDraft(), businessName: "Ada Fashion", projectType: "Online store", requirements: "Responsive online ordering" });
    expect(completePreviewOnboarding()).toMatchObject({ onboardingComplete: true, signedIn: true });
  });

  it("returns a completed customer directly to their dashboard access state after login", () => {
    registerPreviewAccount({ fullName: "Ada Customer", email: "ada@example.com", phone: "+2347000000000" });
    verifyPreviewAccount();
    completePreviewOnboarding();
    signOutPreviewAccount();
    expect(getPreviewAccount()?.signedIn).toBe(false);
    expect(signInPreviewAccount()).toMatchObject({ signedIn: true, onboardingComplete: true });
  });
});
