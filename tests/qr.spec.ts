import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const logoBuffer = fs.readFileSync(path.join(__dirname, 'assets', 'logo.png'));

async function generateQr(page, { proxyType, proxyValue, amount, editable, company, refNumber, expiry, logo }: {
  proxyType: '0' | '2';
  proxyValue: string;
  amount?: string;
  editable?: boolean;
  company?: string;
  refNumber?: string;
  expiry?: string;
  logo?: { name: string; mimeType: string; buffer: Buffer };
}) {
  await page.goto('./');

  await page.selectOption('#proxyType', proxyType);
  await page.fill('#proxyValue', proxyValue);

  await page.fill('#amount', '');
  if (amount !== undefined) {
    await page.fill('#amount', amount);
  }

  const checkbox = page.locator('#editable');
  const shouldBeChecked = Boolean(editable);
  if (await checkbox.isChecked() !== shouldBeChecked) {
    await checkbox.setChecked(shouldBeChecked);
  }

  if (company !== undefined) {
    await page.fill('#company', company);
  }

  if (refNumber !== undefined) {
    await page.fill('#refNumber', refNumber);
  }

  if (expiry !== undefined) {
    await page.fill('#expiry', expiry);
  }

  if (logo) {
    await page.setInputFiles('#logo', logo);
  }

  await page.click('button[type="submit"]');

  const error = page.locator('#error');
  await expect(error).toBeHidden();

  const qrSvg = page.locator('#qr svg');
  await expect(qrSvg).toHaveCount(1);

  const payloadField = page.locator('#payload');
  await expect(payloadField).not.toHaveValue('');

  const payload = await payloadField.inputValue();

  const downloadLink = page.locator('#downloadSvg');
  await expect(downloadLink).toHaveAttribute('aria-disabled', 'false');
  await expect(downloadLink).toHaveAttribute('href', /blob:/);

  return payload;
}

function expectContainsSegments(payload: string, segments: Array<RegExp | string>) {
  for (const segment of segments) {
    if (segment instanceof RegExp) {
      expect(payload).toMatch(segment);
    } else {
      expect(payload).toContain(segment);
    }
  }
}

const UEN = '201817593E';
const MOBILE = '92717425';
const MOBILE_WITH_CC = `65${MOBILE}`;
const LOGO_FILE = { name: 'logo.png', mimeType: 'image/png', buffer: logoBuffer };

test('generates QR for UEN with fixed amount', async ({ page }) => {
  const payload = await generateQr(page, {
    proxyType: '2',
    proxyValue: UEN,
    amount: '123.45',
    editable: false,
    company: 'Demo Co',
    refNumber: 'INV-001',
    expiry: '2025-12-31',
  });

  expectContainsSegments(payload, [
    UEN,
    /5406123\.45/, // Amount embedded in tag 54
    '030100', // Amount locked
    'SG.PAYNOW0101202',
    'INV-001',
  ]);
});

test('allows payer-decided amount for UEN when amount omitted', async ({ page }) => {
  const payload = await generateQr(page, {
    proxyType: '2',
    proxyValue: UEN,
    editable: true,
  });

  expectContainsSegments(payload, [
    UEN,
    '030110', // editable flag set
    '54010',  // amount defaults to 0
  ]);
});

test('generates QR for mobile proxy without amount', async ({ page }) => {
  const payload = await generateQr(page, {
    proxyType: '0',
    proxyValue: MOBILE,
    editable: true,
  });

  expectContainsSegments(payload, [
    MOBILE_WITH_CC,
    '010100', // 26-01 indicates mobile proxy (value 0)
    '02106592717425', // 26-02 holds mobile with country code
    '030110',
    '54010',
  ]);
});

test('accepts mobile proxy with preset amount', async ({ page }) => {
  const payload = await generateQr(page, {
    proxyType: '0',
    proxyValue: MOBILE,
    amount: '50',
    editable: false,
  });

  expectContainsSegments(payload, [
    MOBILE_WITH_CC,
    '010100',
    '02106592717425',
    /540250/, // amount 50.00 gets serialized as 50
    '030100',
  ]);
});

test('embeds uploaded logo into QR SVG', async ({ page }) => {
  await generateQr(page, {
    proxyType: '2',
    proxyValue: UEN,
    amount: '10',
    editable: false,
    logo: LOGO_FILE,
  });

  const logoNode = page.locator('#qr svg image');
  await expect(logoNode).toHaveCount(1);
  const outerHtml = await logoNode.evaluate((el) => el.outerHTML);
  expect(outerHtml).toContain('data:image/png;base64,');
  await expect(page.locator('#qr svg rect')).toHaveCount(2); // background + logo backing
});
