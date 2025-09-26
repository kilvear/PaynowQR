# PaynowQR
Singapore Paynow QR generator for node.js and javascript. Works on both browser and nodejs. 

Have any questions or need help to do a custom implementation?

Feel free to drop us an email at partnerships@dhcertainty.com.

### Demo
> See it in action here:
> https://code.thunderquote.com/PaynowQR/



## Usage Instructions

**On nodejs**

Install via npm
```
$ npm i paynowqr
```

In your code, include the following:

```javascript
const PaynowQR = require('paynowqr');
```

**Browser**

You can use the CDN link provided by unpkg:

```html
<script src="https://unpkg.com/paynowqr@latest/dist/paynowqr.min.js"></script>
```



*Example usage:*

```javascript
//Create a PaynowQR object
let qrcode = new PaynowQR({
    proxyType: '2',             //Optional: '2' for UEN (default), '0' for mobile number
    uen:'201403121W',           //Required when proxyType is '2'
    amount : 500,               //Specify amount of money to pay.
    editable: true,             //Whether or not to allow editing of payment amount. Defaults to false if amount is specified
    expiry: '20201231',         //Set an expiry date for the Paynow QR code (YYYYMMDD). If omitted, defaults to 5 years from current time.
    refNumber: 'TQINV-10001',   //Reference number for Paynow Transaction. Useful if you need to track payments for recouncilation.
    company:  'ACME Pte Ltd.'   //Company name to embed in the QR code. Optional.               
  });
  
  //Outputs the qrcode to a UTF-8 string format, which can be passed to a QR code generation script to generate the paynow QR
  let QRstring = qrcode.output();
```

### Available options

| Option | Description |
| --- | --- |
| `proxyType` | Optional. `'2'` for UEN (default), `'0'` for PayNow mobile proxy. |
| `uen` | Required when `proxyType` is `'2'`. The merchant UEN registered with PayNow. |
| `mobile` | Required when `proxyType` is `'0'`. Singapore mobile number linked to PayNow (8 digits; `+65` prefix optional). |
| `amount` | Optional numeric amount. When omitted the QR is marked editable. |
| `editable` | Optional boolean to force amount editability. |
| `expiry` | Optional `YYYYMMDD` expiry. Defaults to 5 years from now. |
| `refNumber` | Optional bill / reference shown to payer. |
| `company` | Optional merchant label shown to payer. |

### Logo overlay

The browser demo (`webapp/`) now supports uploading a small image (PNG/JPEG/SVG) that gets embedded into the PayNow QR as an inline SVG `<image>` with automatic padding. Keep the logo under ~200&nbsp;KB and constrain it to simple artwork so the QR remains scannable. After generating, click the `Download SVG` action to save the branded code.

## Web demo

A lightweight UI lives in `webapp/` for manual testing. Run `npm run build` once to refresh the bundled library (copies the latest UMD build into `webapp/vendor/`), then serve the folder with any static file server—for example `python3 -m http.server 4173 --directory webapp`—and open it in a browser to generate and scan PayNow QR codes interactively.


## Potential usecases:

Dynamically generating payment QR codes on e-commerce or donation pages that allow tracking of payments via reference codes.

Can be used in conjunction with Bank APIs to detect resolved payments.

Integration with Xero Invoicing -  see: https://github.com/ThunderQuoteTeam/XeroPayNowQR



## To do

Incorporate QR generation into the PaynowQR class with logo / branding options



## Credits

Original code referenced from:
https://gist.github.com/chengkiang/7e1c4899768245570cc49c7d23bc394c

See also:

https://github.com/jtaych/PayNow-QR-Javascript

https://github.com/mindmedia/paynow.py

Developed by DH Certainty (https://dhcertainty.org)

Was looking around for various ways to implement dynamic SGQR codes for payment over Javascript, however couldn't find any that worked with UEN based payments.

Feel free to report any issues and feature requests!
