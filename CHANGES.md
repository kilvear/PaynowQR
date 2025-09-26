# PaynowQR Fork – Change Log

This change log documents enhancements made on top of the original
`DHCertainty/PaynowQR` project. Entries are grouped by release batches so the
history is easy to scan when preparing deployments.

## v1.2.0 – Branded QR downloads (2024-09-25)

- **Logo overlay** – Uploaded images (PNG/JPEG/SVG ≤ 200&nbsp;KB) are embedded
  into the generated SVG with protective white padding so branded codes remain
  scannable.
- **Download support** – Added a `Download SVG` action that exports the latest
  QR (including logo) using a blob URL; object URLs are revoked on reset/unload
  to avoid leaks.
- **UI polish** – Added structured logo fieldset, status messaging, and button
  styles for consistent presentation.
- **Tests** – Extended the Playwright suite to assert the download link and
  verify the embedded logo markup.

## v1.1.0 – Configurable proxies & web demo (2024-09-24)

- **Proxy selection** – Generator now supports both UEN (`proxyType: '2'`) and
  PayNow mobile proxies (`proxyType: '0'`), validating identifiers and emitting
  descriptive errors for unsupported values.
- **Input sanitisation** – Centralised string trimming and proxy-value
  resolution to prevent `undefined` strings in EMV tags.
- **Browser demo** – Built the `webapp/` interface with inputs for amount,
  editability, company label, reference number, expiry, and account type.
- **QR preview** – Client-side rendering via the bundled UMD build, including
  responsive layout and error handling.
- **Build tooling** – Rollup + Terser build with `postbuild` copy step to
  populate `webapp/vendor/`; added Playwright end-to-end tests for UEN/mobile
  scenarios.
- **Documentation** – README now lists all configurable options and explains
  how to serve the demo.

## Usage Notes

- Serve `webapp/` via any static server (for example: `python3 -m http.server
  4173 --directory webapp`), upload a logo, generate the QR, and click
  **Download SVG** to save the branded code.
- Keep uploaded artwork simple and centred; large or highly detailed logos can
  impact scan reliability despite the white padding.
