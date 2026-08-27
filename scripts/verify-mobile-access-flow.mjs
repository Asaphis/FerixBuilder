import { chromium } from "playwright";

const baseUrl = process.env.BASE_URL ?? "https://3000-iaailze8oirz25lf2j3nz-23cc9dd7.us4.manus.computer";
const browser = await chromium.launch({ executablePath: "/usr/bin/chromium", headless: true });
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });

try {
  await page.goto(`${baseUrl}/register`, { waitUntil: "networkidle" });
  await page.getByPlaceholder("Your name").fill("Mobile Customer");
  await page.getByPlaceholder("you@example.com").fill("mobile.customer@example.com");
  await page.getByPlaceholder("+234 000 000 0000").fill("+2347000000000");
  await page.getByPlaceholder("At least 8 characters").fill("Mobile#2026");
  await page.getByPlaceholder("Repeat your password").fill("Mobile#2026");
  await page.getByLabel("I agree to the Terms of Service and Privacy Policy.").check();
  await page.getByRole("button", { name: "Create account" }).click();
  await page.waitForURL("**/verify-email");

  await page.getByPlaceholder("000000").fill("123456");
  await page.getByRole("button", { name: "Verify and continue" }).click();
  await page.waitForURL("**/workspace/onboarding");
  await page.getByRole("button", { name: /Contact/ }).click();
  await page.getByLabel("Instagram").isVisible();
  await page.getByLabel("Facebook").isVisible();
  await page.getByLabel("TikTok").isVisible();
  await page.getByLabel("X").isVisible();
  await page.getByLabel("YouTube").isVisible();

  await page.getByRole("button", { name: /Business/ }).click();
  await page.getByPlaceholder("ABC Fashion").fill("Mobile Fashion");
  await page.getByRole("button", { name: /Build/ }).click();
  await page.getByRole("button", { name: /Online store/ }).click();
  await page.getByRole("button", { name: /Requirements/ }).click();
  await page.getByPlaceholder("Do not worry about technical terms. Describe what you want your website or application to do.").fill("Customers need a responsive online store with WhatsApp contact and online ordering.");
  await page.getByRole("button", { name: /Review/ }).click();
  await page.getByRole("button", { name: "Submit project request" }).click();
  await page.waitForURL("**/dashboard");
  await page.getByText("Your project request is in progress").isVisible();

  await page.goto(`${baseUrl}/login`, { waitUntil: "networkidle" });
  await page.getByPlaceholder("you@example.com").fill("mobile.customer@example.com");
  await page.getByPlaceholder("At least 8 characters").fill("Mobile#2026");
  await page.getByRole("button", { name: "Sign in" }).click();
  await page.waitForURL("**/dashboard");
  await page.getByText("Your project request is in progress").isVisible();
  await page.screenshot({ path: "/tmp/ferixbuilder-mobile-access-flow.png", fullPage: true });
  console.log("Mobile new-user and returning-user flows passed.");
} finally {
  await browser.close();
}
