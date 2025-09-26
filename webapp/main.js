const form = document.getElementById('qr-form');
const proxyTypeSelect = document.getElementById('proxyType');
const proxyLabel = document.getElementById('proxyLabel');
const proxyHint = document.getElementById('proxyHint');
const proxyValueInput = document.getElementById('proxyValue');
const amountInput = document.getElementById('amount');
const editableCheckbox = document.getElementById('editable');
const companyInput = document.getElementById('company');
const refNumberInput = document.getElementById('refNumber');
const expiryInput = document.getElementById('expiry');
const errorBox = document.getElementById('error');
const outputSection = document.getElementById('output');
const qrContainer = document.getElementById('qr');
const payloadBox = document.getElementById('payload');
const clearButton = document.getElementById('clearBtn');
const logoInput = document.getElementById('logo');
const logoRemoveButton = document.getElementById('logoRemove');
const logoStatus = document.getElementById('logoStatus');
const downloadSvgLink = document.getElementById('downloadSvg');

let logoDataUrl = null;
let lastSvgMarkup = null;
let downloadSvgUrl = null;

const PROXY_CONFIG = {
  '2': {
    label: 'UEN',
    placeholder: 'e.g. 201403121W',
    hint: 'Company UEN registered with PayNow.',
  },
  '0': {
    label: 'Mobile Number',
    placeholder: 'e.g. +65 91234567',
    hint: 'PayNow registered Singapore mobile number (8 digits, optional +65).',
  },
};

function updateProxyField() {
  const type = proxyTypeSelect.value;
  const config = PROXY_CONFIG[type] || PROXY_CONFIG['2'];
  proxyLabel.textContent = config.label;
  proxyValueInput.placeholder = config.placeholder;
  proxyHint.textContent = config.hint;
  proxyValueInput.setAttribute('inputmode', type === '0' ? 'tel' : 'text');
  proxyValueInput.removeAttribute('pattern');
  proxyValueInput.focus();
}

function toExpiryValue(input) {
  if (!input) {
    return undefined;
  }
  return input.split('-').join('');
}

function sanitizeAmount(value) {
  if (!value && value !== 0) {
    return undefined;
  }
  const numeric = Number(value);
  if (Number.isNaN(numeric) || numeric < 0) {
    throw new Error('Amount must be a positive number.');
  }
  return Math.round(numeric * 100) / 100;
}

function buildOptions() {
  const proxyType = proxyTypeSelect.value;
  const proxyValue = proxyValueInput.value.trim();

  if (!proxyValue) {
    throw new Error(`Please enter a valid ${proxyType === '0' ? 'mobile number' : 'UEN'}.`);
  }

  const opts = {
    proxyType,
    editable: editableCheckbox.checked,
  };

  if (proxyType === '0') {
    opts.mobile = normalizeMobile(proxyValue);
  } else {
    opts.uen = proxyValue;
  }

  const amountValue = sanitizeAmount(amountInput.value);
  if (amountValue !== undefined) {
    opts.amount = amountValue;
  }

  if (companyInput.value.trim()) {
    opts.company = companyInput.value.trim();
  }

  if (refNumberInput.value.trim()) {
    opts.refNumber = refNumberInput.value.trim();
  }

  const expiryValue = toExpiryValue(expiryInput.value);
  if (expiryValue) {
    opts.expiry = expiryValue;
  }

  return opts;
}

function renderQr(payload) {
  const qr = qrcode(0, 'M');
  qr.addData(payload);
  qr.make();
  const svgMarkup = qr.createSvgTag({ cellSize: 6, margin: 4 });
  const finalSvg = logoDataUrl ? embedLogo(svgMarkup, logoDataUrl) : svgMarkup;
  qrContainer.innerHTML = finalSvg;
  lastSvgMarkup = finalSvg;
  updateDownloadLink();
}

function embedLogo(svgMarkup, dataUrl) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(svgMarkup, 'image/svg+xml');
  const svgEl = doc.documentElement;

  if (!svgEl.getAttribute('xmlns:xlink')) {
    svgEl.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink');
  }

  const viewBox = svgEl.getAttribute('viewBox');
  const boxParts = viewBox ? viewBox.split(/\s+/) : [];
  const size = boxParts.length === 4 ? parseFloat(boxParts[2]) : parseFloat(svgEl.getAttribute('width')) || 260;

  const logoScale = 0.24; // 24% of QR width
  const logoSize = size * logoScale;
  const padding = logoSize * 0.2;
  const centre = size / 2;

  const g = doc.createElementNS('http://www.w3.org/2000/svg', 'g');
  g.setAttribute('id', 'qr-logo');

  const background = doc.createElementNS('http://www.w3.org/2000/svg', 'rect');
  background.setAttribute('x', (centre - (logoSize + padding) / 2).toString());
  background.setAttribute('y', (centre - (logoSize + padding) / 2).toString());
  background.setAttribute('width', (logoSize + padding).toString());
  background.setAttribute('height', (logoSize + padding).toString());
  background.setAttribute('rx', (logoSize * 0.1).toString());
  background.setAttribute('fill', 'white');

  const image = doc.createElementNS('http://www.w3.org/2000/svg', 'image');
  const imageStart = centre - logoSize / 2;
  image.setAttribute('x', imageStart.toString());
  image.setAttribute('y', imageStart.toString());
  image.setAttribute('width', logoSize.toString());
  image.setAttribute('height', logoSize.toString());
  image.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', dataUrl);
  image.setAttribute('href', dataUrl); // modern browsers

  g.appendChild(background);
  g.appendChild(image);

  svgEl.appendChild(g);

  return svgEl.outerHTML;
}

function resetLogo() {
  logoDataUrl = null;
  logoInput.value = '';
  logoRemoveButton.disabled = true;
  logoStatus.textContent = 'PNG/JPEG/SVG up to 200 KB. Auto-centered with safe padding.';
}

function resetDownloadLink() {
  if (downloadSvgUrl) {
    URL.revokeObjectURL(downloadSvgUrl);
    downloadSvgUrl = null;
  }
  downloadSvgLink.removeAttribute('href');
  downloadSvgLink.setAttribute('aria-disabled', 'true');
  downloadSvgLink.removeAttribute('download');
}

function updateDownloadLink() {
  if (downloadSvgUrl) {
    URL.revokeObjectURL(downloadSvgUrl);
    downloadSvgUrl = null;
  }

  if (!lastSvgMarkup) {
    resetDownloadLink();
    return;
  }

  const blob = new Blob([lastSvgMarkup], { type: 'image/svg+xml' });
  downloadSvgUrl = URL.createObjectURL(blob);
  downloadSvgLink.href = downloadSvgUrl;
  downloadSvgLink.setAttribute('download', 'paynow-qr.svg');
  downloadSvgLink.setAttribute('aria-disabled', 'false');
}

function handleError(err) {
  errorBox.textContent = err.message || String(err);
  errorBox.hidden = false;
  outputSection.classList.add('hidden');
}

function clearError() {
  errorBox.textContent = '';
  errorBox.hidden = true;
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  clearError();

  try {
    const options = buildOptions();
    const generator = new PaynowQR(options);
    const payload = generator.output();

    renderQr(payload);
    payloadBox.value = payload;
    outputSection.classList.remove('hidden');
  } catch (err) {
    handleError(err);
  }
});

proxyTypeSelect.addEventListener('change', updateProxyField);
clearButton.addEventListener('click', () => {
  form.reset();
  outputSection.classList.add('hidden');
  clearError();
  updateProxyField();
  payloadBox.value = '';
  qrContainer.innerHTML = '';
  resetLogo();
  lastSvgMarkup = null;
  resetDownloadLink();
});

logoInput.addEventListener('change', async (event) => {
  clearError();
  const file = event.target.files && event.target.files[0];
  if (!file) {
    resetLogo();
    return;
  }

  const maxBytes = 200 * 1024;
  if (file.size > maxBytes) {
    resetLogo();
    handleError(new Error('Logo file is too large. Please choose an image under 200 KB.'));
    return;
  }

  try {
    const dataUrl = await readFileAsDataURL(file);
    logoDataUrl = dataUrl;
    logoRemoveButton.disabled = false;
    logoStatus.textContent = `Attached ${file.name} (${Math.round(file.size / 1024)} KB)`;
  } catch (err) {
    resetLogo();
    handleError(err);
  }
});

logoRemoveButton.addEventListener('click', () => {
  resetLogo();
});

updateProxyField();
resetDownloadLink();

function normalizeMobile(input) {
  const digits = input.replace(/\D+/g, '');
  if (digits.length === 8) {
    return digits;
  }
  if (digits.length === 10 && digits.startsWith('65')) {
    return digits.slice(2);
  }
  throw new Error('Mobile number must be an 8-digit Singapore number (with optional +65 prefix).');
}

function readFileAsDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('Unable to read logo file.'));
      }
    };
    reader.onerror = () => reject(new Error('Failed to load logo file.'));
    reader.readAsDataURL(file);
  });
}

window.addEventListener('beforeunload', () => {
  if (downloadSvgUrl) {
    URL.revokeObjectURL(downloadSvgUrl);
  }
});
