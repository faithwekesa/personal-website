import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';

const TARGETS = [
  { id: 'kilele', url: 'https://kilele-properties.vercel.app' },
  { id: 'safari', url: 'https://safari-atlas.vercel.app' },
  { id: 'bake', url: 'https://hearth-and-honey.vercel.app' },
  { id: 'nail', url: 'https://nailshop-website-seven.vercel.app' },
  { id: 'course', url: 'https://course-platform-gold-six.vercel.app' },
  { id: 'naifix', url: 'https://naifix.lovable.app' },
  { id: 'challenger', url: 'https://meridian-blond-nu.vercel.app' },
];

const DEVICES = {
  laptop: { viewport: { width: 1440, height: 900 }, scale: 1.5, mobile: false, scroll: 0 },
  tablet: { viewport: { width: 1180, height: 820 }, scale: 2, mobile: true, scroll: 0 },
  phone: { viewport: { width: 390, height: 844 }, scale: 2, mobile: true, scroll: 0 },
};

const UA = {
  desktop: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36',
  mobile: 'Mozilla/5.0 (Linux; Android 14; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Mobile Safari/537.36',
};

const [onlyId, overrideUrl] = process.argv.slice(2);
const list = TARGETS.filter((t) => !onlyId || t.id === onlyId).map((t) => (overrideUrl ? { ...t, url: overrideUrl } : t));

await mkdir('public/devices', { recursive: true });
const browser = await chromium.launch();

for (const t of list) {
  for (const [name, d] of Object.entries(DEVICES)) {
    const ctx = await browser.newContext({
      viewport: d.viewport,
      deviceScaleFactor: d.scale,
      isMobile: d.mobile,
      hasTouch: d.mobile,
      userAgent: d.mobile ? UA.mobile : UA.desktop,
      reducedMotion: 'reduce',
    });
    const page = await ctx.newPage();
    await page.goto(t.url, { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
    if (d.scroll > 0) {
      const target = Math.round(d.viewport.height * d.scroll);
      for (let y = 0; y <= target; y += 250) {
        await page.evaluate((v) => window.scrollTo(0, v), y);
        await page.waitForTimeout(150);
      }
      await page.waitForTimeout(1500);
    }
    await page.evaluate(() => {
      const vh = window.innerHeight;
      document.querySelectorAll('body *').forEach((el) => {
        if (getComputedStyle(el).position !== 'fixed') return;
        const r = el.getBoundingClientRect();
        if (r.top + r.height / 2 > vh * 0.6) el.style.display = 'none';
      });
    });
    const file = `public/devices/${t.id}-${name}.jpg`;
    await page.screenshot({ path: file, type: 'jpeg', quality: 84 });
    console.log('saved', file);
    await ctx.close();
  }
}

await browser.close();
