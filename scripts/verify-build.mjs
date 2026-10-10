/**
 * Menace World Tech — static build verification script
 * Run with:  npm run verify
 *
 * Rebuilds the site then asserts:
 *   - All 6 expected output files exist and are non-empty
 *   - Required copy/pricing strings are present
 *   - WhatsApp number is in every page
 *   - No lorem ipsum, placeholder images, or TODO markers
 */

import { execSync } from 'node:child_process';
import { readFileSync, existsSync, statSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const dist = resolve(root, 'dist');

// ---------- helpers ----------
let failures = 0;

function pass(msg) {
  console.log(`  ✓  ${msg}`);
}

function fail(msg) {
  console.error(`  ✗  ${msg}`);
  failures++;
}

function check(condition, passMsg, failMsg) {
  if (condition) pass(passMsg);
  else fail(failMsg);
}

function readPage(rel) {
  const full = resolve(dist, rel);
  if (!existsSync(full)) {
    fail(`File missing: ${rel}`);
    return '';
  }
  const size = statSync(full).size;
  check(size > 2000, `${rel} exists (${size} bytes)`, `${rel} is suspiciously small (${size} bytes)`);
  return readFileSync(full, 'utf8');
}

// ---------- build ----------
console.log('\n▸ Building…');
try {
  execSync('npm run build', { cwd: root, stdio: 'inherit' });
  console.log('  ✓  Build completed\n');
} catch {
  console.error('  ✗  Build failed — aborting verification');
  process.exit(1);
}

// ---------- required files ----------
console.log('▸ Required output files');
const pages = {
  'index.html': readPage('index.html'),
  'about/index.html': readPage('about/index.html'),
  'services/index.html': readPage('services/index.html'),
  'packages/index.html': readPage('packages/index.html'),
  'contact/index.html': readPage('contact/index.html'),
  '404.html': readPage('404.html'),
};

// ---------- contact info ----------
console.log('\n▸ WhatsApp number in every page');
for (const [name, html] of Object.entries(pages)) {
  check(html.includes('263783980802'), `${name} contains WA number`, `${name} MISSING WA number`);
}

// ---------- key copy / pricing ----------
console.log('\n▸ Required copy & pricing');
check(pages['index.html'].includes('customer-generating'), 'HOME: "customer-generating"', 'HOME: missing "customer-generating"');
check(pages['index.html'].includes("Zimbabwe's growth partner"), 'HOME: Zimbabwe eyebrow', 'HOME: missing Zimbabwe eyebrow');
check(pages['packages/index.html'].includes('Start fast'), 'PACKAGES: "Start fast"', 'PACKAGES: missing "Start fast"');
check(pages['packages/index.html'].includes('$60'), 'PACKAGES: starter price $60', 'PACKAGES: missing starter price');
check(pages['packages/index.html'].includes('$400'), 'PACKAGES: premium price $400', 'PACKAGES: missing premium price');
check(pages['packages/index.html'].includes('Ad budget'), 'PACKAGES: "Ad budget" callout', 'PACKAGES: missing ad budget callout');
check(pages['services/index.html'].includes('Social media marketing'), 'SERVICES: social media section', 'SERVICES: missing social media section');
check(pages['services/index.html'].includes('Paid advertising'), 'SERVICES: paid advertising section', 'SERVICES: missing paid advertising section');
check(pages['services/index.html'].includes('Website design'), 'SERVICES: website design section', 'SERVICES: missing website design section');
check(pages['about/index.html'].includes('small business'), 'ABOUT: SME positioning', 'ABOUT: missing SME positioning');
check(pages['about/index.html'].includes('Clarity over jargon'), 'ABOUT: values', 'ABOUT: missing values');
check(pages['contact/index.html'].includes('growth audit'), 'CONTACT: growth audit', 'CONTACT: missing growth audit');
check(pages['404.html'].includes('Page not found'), '404: page title', '404: missing page title');

// ---------- prohibited content ----------
console.log('\n▸ Prohibited content');
const allHtml = Object.values(pages).join('\n');
check(!allHtml.toLowerCase().includes('lorem ipsum'), 'No lorem ipsum', 'FOUND lorem ipsum placeholder text');
check(!allHtml.includes('TODO'), 'No TODO markers', 'FOUND TODO markers in output');
check(!allHtml.includes('undefined'), 'No "undefined" strings', 'FOUND "undefined" in output HTML');
check(!allHtml.includes('picsum.photos'), 'No external placeholder images', 'FOUND picsum.photos placeholder');
check(!allHtml.includes('placeholder.com'), 'No placeholder.com images', 'FOUND placeholder.com image');
// Catch guarantee language that IS a promise (not "not guaranteed" disclaimers)
check(!allHtml.match(/(?<!not\s)guarantee[sd]?\s+(specific|exact)?\s*(sales|leads|followers|results)\s*(?!are not)/i), 'No improper guarantee language', 'FOUND improper guarantee language');

// ---------- result ----------
console.log(`\n${'─'.repeat(50)}`);
if (failures === 0) {
  console.log('✓  All checks passed.\n');
  process.exit(0);
} else {
  console.error(`✗  ${failures} check(s) failed.\n`);
  process.exit(1);
}
