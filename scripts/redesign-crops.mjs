// Close-up captures: quote section, map tooltip (hovered), donate boxes, footer.
import puppeteer from "puppeteer";

const URL = "http://localhost:3000";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto(URL, { waitUntil: "domcontentloaded", timeout: 60000 });
await page.waitForSelector("#hero img", { timeout: 30000 });
await sleep(1500);

async function shootSection(selector, path, settle = 1500, extra = null) {
  await page.evaluate((sel) => {
    document.querySelector(sel)?.scrollIntoView({ block: "center" });
  }, selector);
  await sleep(settle);
  if (extra) await extra();
  const el = await page.$(selector);
  await el.screenshot({ path });
}

// Fonts actually resolved on the script elements?
const fontCheck = await page.evaluate(() => {
  const quote = document.querySelector('section[aria-label="Mission quote"]');
  const attribution = quote?.querySelectorAll("p")[0];
  const footerScript = document.querySelector(".script-shimmer");
  return {
    attributionFont: attribution ? getComputedStyle(attribution).fontFamily : null,
    footerFont: footerScript ? getComputedStyle(footerScript).fontFamily : null,
    dancingLoaded: document.fonts.check('16px "Dancing Script"') ||
      [...document.fonts].some((f) => /Dancing/i.test(f.family) && f.status === "loaded"),
    kalamLoaded: [...document.fonts].some((f) => /Kalam/i.test(f.family) && f.status === "loaded"),
    fontFaces: [...document.fonts].map((f) => `${f.family}:${f.status}`),
  };
});
console.log(JSON.stringify(fontCheck, null, 2));

// Quote section (wait for char reveal to finish ≈ 3.5s)
await shootSection('section[aria-label="Mission quote"]', "screenshots/crop-quote-section.png", 4200);

// Map with tooltip hovered
await page.evaluate(() => {
  document.querySelector('section[aria-labelledby="map-heading"]')?.scrollIntoView({ block: "center" });
});
await sleep(2500); // draw-in
const pin = await page.evaluate(() => {
  const svg = document.querySelector('svg[aria-label*="Map of Nepal"]');
  const pinCircle = svg.querySelectorAll("g g circle")[0]; // hit area
  const r = pinCircle.getBoundingClientRect();
  return { x: r.x + r.width / 2, y: r.y + r.height / 2 };
});
await page.mouse.move(pin.x, pin.y, { steps: 10 });
await sleep(700);
const mapEl = await page.$('section[aria-labelledby="map-heading"]');
await mapEl.screenshot({ path: "screenshots/crop-map-tooltip.png" });

// Donate boxes — click first box, capture pulse/checkmark/dim states
await page.evaluate(() => {
  document.querySelector('section[aria-labelledby="donate-heading"]')?.scrollIntoView({ block: "center" });
});
await sleep(1500);
const btn = await page.$('button[aria-pressed]');
await btn.click();
await sleep(600);
const donateEl = await page.$('section[aria-labelledby="donate-heading"]');
await donateEl.screenshot({ path: "screenshots/crop-donate-boxes.png" });

// Footer signature
await shootSection("footer", "screenshots/crop-footer.png", 1200);

// Programme card hover state
await page.evaluate(() => {
  document.querySelector('section[aria-labelledby="programs-heading"]')?.scrollIntoView({ block: "center" });
});
await sleep(1500);
const card = await page.evaluate(() => {
  const c = document.querySelector(".program-card");
  const r = c.getBoundingClientRect();
  return { x: r.x + r.width / 2, y: r.y + r.height / 2 };
});
await page.mouse.move(card.x, card.y, { steps: 10 });
await sleep(900);
const progEl = await page.$('section[aria-labelledby="programs-heading"]');
await progEl.screenshot({ path: "screenshots/crop-programs-hover.png" });

await browser.close();
console.log("crops done");
