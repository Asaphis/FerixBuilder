import { encodeOAuthState, OAUTH_STATE_COOKIE } from "@shared/const";

/** Starts the existing nonce-protected OAuth flow only after an explicit click. */
export function startAuthentication() {
  const redirectUri = `${window.location.origin}/api/oauth/callback`;
  const nonce = crypto.randomUUID();
  document.cookie = `${OAUTH_STATE_COOKIE}=${nonce}; Path=/; Max-Age=600; SameSite=None; Secure`;

  const state = encodeOAuthState({ redirectUri, nonce });
  const params = new URLSearchParams({
    app_id: import.meta.env.VITE_APP_ID,
    redirect_url: redirectUri,
    state,
  });

  window.location.assign(`${import.meta.env.VITE_OAUTH_PORTAL_URL}/login?${params.toString()}`);
}
