export type PreviewAccount = {
  fullName: string;
  email: string;
  phone: string;
  emailVerified: boolean;
  signedIn: boolean;
  onboardingComplete: boolean;
};

export type OnboardingDraft = {
  businessName: string;
  category: string;
  description: string;
  businessPhone: string;
  whatsapp: string;
  businessEmail: string;
  address: string;
  city: string;
  state: string;
  country: string;
  openingHours: string;
  instagram: string;
  facebook: string;
  tiktok: string;
  xProfile: string;
  youtube: string;
  projectType: string;
  contentNote: string;
  brandStyle: string;
  brandColours: string;
  brandSource: "colours" | "guide" | "";
  inspirationUrl: string;
  inspirationNote: string;
  requirements: string;
  managementPreference: "self" | "managed" | "";
};

const ACCOUNT_KEY = "ferixbuilder.preview.account";
const DRAFT_KEY = "ferixbuilder.preview.onboarding";

const emptyDraft: OnboardingDraft = {
  businessName: "", category: "", description: "", businessPhone: "", whatsapp: "", businessEmail: "", address: "", city: "", state: "", country: "", openingHours: "", instagram: "", facebook: "", tiktok: "", xProfile: "", youtube: "", projectType: "", contentNote: "", brandStyle: "", brandColours: "", brandSource: "", inspirationUrl: "", inspirationNote: "", requirements: "", managementPreference: "",
};

function read<T>(key: string): T | null {
  try {
    const value = window.localStorage.getItem(key);
    return value ? JSON.parse(value) as T : null;
  } catch {
    return null;
  }
}

function write<T>(key: string, value: T) {
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function getPreviewAccount() { return read<PreviewAccount>(ACCOUNT_KEY); }
export function getOnboardingDraft() { return read<OnboardingDraft>(DRAFT_KEY) ?? emptyDraft; }

export function registerPreviewAccount(values: Pick<PreviewAccount, "fullName" | "email" | "phone">) {
  const account: PreviewAccount = { ...values, email: values.email.trim().toLowerCase(), emailVerified: false, signedIn: false, onboardingComplete: false };
  write(ACCOUNT_KEY, account);
  write(DRAFT_KEY, { ...emptyDraft, businessEmail: account.email, businessPhone: account.phone });
  return account;
}

export function verifyPreviewAccount() {
  const account = getPreviewAccount();
  if (!account) return null;
  const next = { ...account, emailVerified: true, signedIn: true };
  write(ACCOUNT_KEY, next);
  return next;
}

export function signInPreviewAccount() {
  const account = getPreviewAccount();
  if (!account || !account.emailVerified) return null;
  const next = { ...account, signedIn: true };
  write(ACCOUNT_KEY, next);
  return next;
}

export function signOutPreviewAccount() {
  const account = getPreviewAccount();
  if (account) write(ACCOUNT_KEY, { ...account, signedIn: false });
}

export function saveOnboardingDraft(draft: OnboardingDraft) { write(DRAFT_KEY, draft); }

export function completePreviewOnboarding() {
  const account = getPreviewAccount();
  if (!account) return null;
  const next = { ...account, onboardingComplete: true, signedIn: true };
  write(ACCOUNT_KEY, next);
  return next;
}
