import puppeteer from "puppeteer";
const browser = await puppeteer.launch({ headless: true, args: ["--no-sandbox", "--disable-setuid-sandbox"] });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
await page.setCacheEnabled(false);
await page.goto("http://localhost:3000", { waitUntil: "networkidle0", timeout: 30000 });
await new Promise((r) => setTimeout(r, 1800));

// Text block + Dancing Script zone
await page.screenshot({ path: "screenshots/crop-headline.png", clip: { x: 0, y: 380, width: 820, height: 520 } });

await browser.close();
console.log("done");
