// Redesign verification: screenshots + behaviour checks.
// Run: node scripts/redesign-verify.mjs
import puppeteer from "puppeteer";
import fs from "node:fs";

const URL = "http://localhost:3000";
const OUT = "screenshots";
if (!fs.existsSync(OUT)) fs.mkdirSync(OUT);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function autoScroll(page, step = 400, pause = 120) {
  await page.evaluate(
    async ({ step, pause }) => {
      const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
      const max = () =>
        document.documentElement.scrollHeight - window.innerHeight;
      for (let y = 0; y <= max(); y += step) {
        window.scrollTo(0, y);
        await sleep(pause);
      }
      window.scrollTo(0, max());
      await sleep(300);
    },
    { step, pause }
  );
}

const results = {};

const browser = await puppeteer.launch({ headless: true });

/* ── Desktop 1440 ─────────────────────────────────────────── */
{
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(URL, { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.waitForSelector("#hero img", { timeout: 30000 });

  // Let the hero opening sequence finish
  await sleep(4000);
  await page.screenshot({ path: `${OUT}/redesign-hero-1440.png` });

  // ── Custom cursor checks ──
  results.cursorMounted = await page.evaluate(() => {
    return {
      bodyHasCursorNone: document.body.classList.contains("cursor-none"),
      bodyCursorStyle: getComputedStyle(document.body).cursor,
    };
  });

  await page.mouse.move(700, 450);
  await sleep(600);
  results.cursorAtRest = await page.evaluate(() => {
    const el = document.querySelector('[style*="mix-blend-mode"]');
    if (!el) return null;
    const s = getComputedStyle(el);
    return { transform: s.transform, opacity: s.opacity, blend: s.mixBlendMode };
  });

  // Hover the nav Donate button (interactive element)
  const donateBox = await page.evaluate(() => {
    const a = document.querySelector('header a[href="/donate"]');
    const r = a.getBoundingClientRect();
    return { x: r.x + r.width / 2, y: r.y + r.height / 2 };
  });
  await page.mouse.move(donateBox.x, donateBox.y, { steps: 12 });
  await sleep(700);
  results.cursorOnInteractive = await page.evaluate(() => {
    const el = document.querySelector('[style*="mix-blend-mode"]');
    const s = getComputedStyle(el);
    return {
      transform: s.transform,
      hoverClass: el.classList.contains("cursor-is-hover"),
      fillOpacity: getComputedStyle(el.querySelector(".cursor-fill")).opacity,
    };
  });

  // ── Smart nav checks ──
  await page.evaluate(() => window.scrollTo(0, 1800));
  await sleep(150);
  await page.evaluate(() => window.scrollTo(0, 2400)); // scrolling down past hero
  await sleep(600);
  results.navHiddenOnScrollDown = await page.evaluate(
    () => getComputedStyle(document.querySelector("header")).transform
  );
  await page.evaluate(() => window.scrollTo(0, 2200)); // scroll up a bit
  await sleep(600);
  results.navShownOnScrollUp = await page.evaluate(
    () => getComputedStyle(document.querySelector("header")).transform
  );

  // ── Scroll progress line ──
  await autoScroll(page);
  await sleep(1200);
  results.progressAtBottom = await page.evaluate(() => {
    const track = document.querySelector('div[style*="z-index: 80"], div[aria-hidden="true"]');
    // find the gold bar: fixed 2px-wide element's child
    const candidates = [...document.querySelectorAll("div")].filter((d) => {
      const s = getComputedStyle(d);
      return s.position === "fixed" && s.width === "2px" && s.left === "0px";
    });
    const bar = candidates[0]?.firstElementChild;
    return bar ? getComputedStyle(bar).transform : null;
  });

  // ── Count-up landed ──
  results.statsText = await page.evaluate(() => {
    const els = [...document.querySelectorAll('div[aria-label]')].filter((e) =>
      /^\d+%?$/.test(e.getAttribute("aria-label") || "")
    );
    return els.map((e) => e.textContent.trim());
  });

  // ── Quote chars visible after scroll-through ──
  results.quoteVisible = await page.evaluate(() => {
    const bq = document.querySelector('section[aria-label="Mission quote"] blockquote');
    if (!bq) return null;
    const span = bq.querySelector("span span span");
    return span ? getComputedStyle(span).opacity : null;
  });

  // Back to top for the full-page capture (nav + hero in resting state)
  await page.evaluate(() => window.scrollTo(0, 0));
  await sleep(1000);
  await page.screenshot({ path: `${OUT}/redesign-desktop-full-1440.png`, fullPage: true });
  await page.close();
}

/* ── Mobile 375 (touch) ───────────────────────────────────── */
{
  const page = await browser.newPage();
  await page.setViewport({ width: 375, height: 812, hasTouch: true, isMobile: true });
  await page.goto(URL, { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.waitForSelector("#hero img", { timeout: 30000 });
  await sleep(4000);
  await page.screenshot({ path: `${OUT}/redesign-hero-375.png` });

  results.mobileCursor = await page.evaluate(() => ({
    bodyHasCursorNone: document.body.classList.contains("cursor-none"),
    cursorElExists: !!document.querySelector('[style*="mix-blend-mode"]'),
  }));

  await autoScroll(page, 350, 100);
  await sleep(3500); // let the quote finish its character reveal
  await page.evaluate(() => window.scrollTo(0, 0));
  await sleep(900);
  await page.screenshot({ path: `${OUT}/redesign-mobile-full-375.png`, fullPage: true });
  await page.close();
}

await browser.close();
console.log(JSON.stringify(results, null, 2));
