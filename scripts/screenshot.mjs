import puppeteer from "puppeteer";

const browser = await puppeteer.launch({
  headless: true,
  args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"],
});

const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });

await page.goto("http://localhost:3000", { waitUntil: "networkidle0", timeout: 30000 });

// Let animations settle
await new Promise((r) => setTimeout(r, 1500));

await page.screenshot({ path: "screenshots/hero-01.png", fullPage: false });

// Also full-page
await page.screenshot({ path: "screenshots/hero-01-full.png", fullPage: true });

await browser.close();
console.log("Screenshots saved: screenshots/hero-01.png");
