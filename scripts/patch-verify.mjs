// Verification for the 6 patch changes.
import puppeteer from "puppeteer";

const URL = "http://localhost:3000";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const OUT = "screenshots";

const browser = await puppeteer.launch({ headless: true });

/* ── Desktop 1440 ─────────────────────────────────────────── */
{
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(URL, { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.waitForSelector("#hero img", { timeout: 30000 });
  await sleep(2500);

  // Change 1 — cursor gone
  const cursorCheck = await page.evaluate(() => ({
    cursorNoneClass: document.body.classList.contains("cursor-none"),
    bodyCursor: getComputedStyle(document.body).cursor,
    blendEl: !!document.querySelector('[style*="mix-blend-mode"]'),
  }));
  console.log("CHANGE 1 — cursor:", JSON.stringify(cursorCheck));

  // Change 2 — font checks
  const fontCheck = await page.evaluate(() => {
    const quote = document.querySelector('section[aria-label="Mission quote"]');
    const attribution = quote?.querySelectorAll("p")[0];
    const bigScript = quote?.querySelectorAll("p")[1];
    return {
      attributionFont: attribution ? getComputedStyle(attribution).fontFamily : null,
      bigScriptFont: bigScript ? getComputedStyle(bigScript).fontFamily : null,
    };
  });
  console.log("CHANGE 2 — fonts:", JSON.stringify(fontCheck));

  // Change 3 — mountain divider present
  await page.evaluate(() => {
    document.querySelector('section[aria-labelledby="donate-heading"]')?.scrollIntoView({ block: "end" });
  });
  await sleep(1000);
  const donateEl = await page.$('section[aria-labelledby="donate-heading"]');
  await donateEl.screenshot({ path: `${OUT}/patch-divider.png` });

  // Change 4 — footer with mountain bg
  await page.evaluate(() => {
    document.querySelector("footer")?.scrollIntoView({ block: "start" });
  });
  await sleep(1000);
  const footerEl = await page.$("footer");
  await footerEl.screenshot({ path: `${OUT}/patch-footer.png` });

  // Change 6 — Why It Matters section
  await page.evaluate(() => {
    document.querySelector('section[aria-label="Why it matters"]')?.scrollIntoView({ block: "center" });
  });
  await sleep(1200);
  const wimEl = await page.$('section[aria-label="Why it matters"]');
  await wimEl.screenshot({ path: `${OUT}/patch-why-it-matters.png` });

  await page.evaluate(() => window.scrollTo(0, 0));
  await sleep(500);
  await page.close();
}

/* ── Mobile 375 — hamburger animation ────────────────────────── */
{
  const page = await browser.newPage();
  await page.setViewport({ width: 375, height: 812 });
  await page.goto(URL, { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.waitForSelector("#hero img", { timeout: 30000 });
  await sleep(2000);

  const btn = await page.$('button[aria-label="Open menu"]');
  await btn.click();
  await sleep(80); // mid-open
  await page.screenshot({ path: `${OUT}/patch-menu-opening.png` });
  await sleep(400); // settled open
  await page.screenshot({ path: `${OUT}/patch-menu-open.png` });

  const navState = await page.evaluate(() => {
    const nav = document.querySelector('nav[aria-label="Mobile navigation"]');
    const s = getComputedStyle(nav);
    return { opacity: s.opacity, transform: s.transform, visibility: s.visibility };
  });
  console.log("CHANGE 5 — menu open state:", JSON.stringify(navState));

  await page.click('button[aria-label="Close menu"]');
  await sleep(80);
  await page.screenshot({ path: `${OUT}/patch-menu-closing.png` });
  await sleep(400);
  const navClosed = await page.evaluate(() => {
    const nav = document.querySelector('nav[aria-label="Mobile navigation"]');
    const s = getComputedStyle(nav);
    return { opacity: s.opacity, transform: s.transform, visibility: s.visibility };
  });
  console.log("CHANGE 5 — menu closed state:", JSON.stringify(navClosed));

  await page.close();
}

await browser.close();
console.log("done");
