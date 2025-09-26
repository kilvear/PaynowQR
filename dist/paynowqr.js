var PaynowQR = (function () {
	'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var dayjs_min = createCommonjsModule(function (module, exports) {
	!function(t,e){module.exports=e();}(commonjsGlobal,(function(){var t=1e3,e=6e4,n=36e5,r="millisecond",i="second",s="minute",u="hour",a="day",o="week",c="month",f="quarter",h="year",d="date",l="Invalid Date",$=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,y=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,M={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(t){var e=["th","st","nd","rd"],n=t%100;return "["+t+(e[(n-20)%10]||e[n]||e[0])+"]"}},m=function(t,e,n){var r=String(t);return !r||r.length>=e?t:""+Array(e+1-r.length).join(n)+t},v={s:m,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),r=Math.floor(n/60),i=n%60;return (e<=0?"+":"-")+m(r,2,"0")+":"+m(i,2,"0")},m:function t(e,n){if(e.date()<n.date())return -t(n,e);var r=12*(n.year()-e.year())+(n.month()-e.month()),i=e.clone().add(r,c),s=n-i<0,u=e.clone().add(r+(s?-1:1),c);return +(-(r+(n-i)/(s?i-u:u-i))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(t){return {M:c,y:h,w:o,d:a,D:d,h:u,m:s,s:i,ms:r,Q:f}[t]||String(t||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},g="en",D={};D[g]=M;var p="$isDayjsObject",S=function(t){return t instanceof _||!(!t||!t[p])},w=function t(e,n,r){var i;if(!e)return g;if("string"==typeof e){var s=e.toLowerCase();D[s]&&(i=s),n&&(D[s]=n,i=s);var u=e.split("-");if(!i&&u.length>1)return t(u[0])}else {var a=e.name;D[a]=e,i=a;}return !r&&i&&(g=i),i||!r&&g},O=function(t,e){if(S(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new _(n)},b=v;b.l=w,b.i=S,b.w=function(t,e){return O(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var _=function(){function M(t){this.$L=w(t.locale,null,!0),this.parse(t),this.$x=this.$x||t.x||{},this[p]=!0;}var m=M.prototype;return m.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(b.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var r=e.match($);if(r){var i=r[2]-1||0,s=(r[7]||"0").substring(0,3);return n?new Date(Date.UTC(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)):new Date(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)}}return new Date(e)}(t),this.init();},m.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds();},m.$utils=function(){return b},m.isValid=function(){return !(this.$d.toString()===l)},m.isSame=function(t,e){var n=O(t);return this.startOf(e)<=n&&n<=this.endOf(e)},m.isAfter=function(t,e){return O(t)<this.startOf(e)},m.isBefore=function(t,e){return this.endOf(e)<O(t)},m.$g=function(t,e,n){return b.u(t)?this[e]:this.set(n,t)},m.unix=function(){return Math.floor(this.valueOf()/1e3)},m.valueOf=function(){return this.$d.getTime()},m.startOf=function(t,e){var n=this,r=!!b.u(e)||e,f=b.p(t),l=function(t,e){var i=b.w(n.$u?Date.UTC(n.$y,e,t):new Date(n.$y,e,t),n);return r?i:i.endOf(a)},$=function(t,e){return b.w(n.toDate()[t].apply(n.toDate("s"),(r?[0,0,0,0]:[23,59,59,999]).slice(e)),n)},y=this.$W,M=this.$M,m=this.$D,v="set"+(this.$u?"UTC":"");switch(f){case h:return r?l(1,0):l(31,11);case c:return r?l(1,M):l(0,M+1);case o:var g=this.$locale().weekStart||0,D=(y<g?y+7:y)-g;return l(r?m-D:m+(6-D),M);case a:case d:return $(v+"Hours",0);case u:return $(v+"Minutes",1);case s:return $(v+"Seconds",2);case i:return $(v+"Milliseconds",3);default:return this.clone()}},m.endOf=function(t){return this.startOf(t,!1)},m.$set=function(t,e){var n,o=b.p(t),f="set"+(this.$u?"UTC":""),l=(n={},n[a]=f+"Date",n[d]=f+"Date",n[c]=f+"Month",n[h]=f+"FullYear",n[u]=f+"Hours",n[s]=f+"Minutes",n[i]=f+"Seconds",n[r]=f+"Milliseconds",n)[o],$=o===a?this.$D+(e-this.$W):e;if(o===c||o===h){var y=this.clone().set(d,1);y.$d[l]($),y.init(),this.$d=y.set(d,Math.min(this.$D,y.daysInMonth())).$d;}else l&&this.$d[l]($);return this.init(),this},m.set=function(t,e){return this.clone().$set(t,e)},m.get=function(t){return this[b.p(t)]()},m.add=function(r,f){var d,l=this;r=Number(r);var $=b.p(f),y=function(t){var e=O(l);return b.w(e.date(e.date()+Math.round(t*r)),l)};if($===c)return this.set(c,this.$M+r);if($===h)return this.set(h,this.$y+r);if($===a)return y(1);if($===o)return y(7);var M=(d={},d[s]=e,d[u]=n,d[i]=t,d)[$]||1,m=this.$d.getTime()+r*M;return b.w(m,this)},m.subtract=function(t,e){return this.add(-1*t,e)},m.format=function(t){var e=this,n=this.$locale();if(!this.isValid())return n.invalidDate||l;var r=t||"YYYY-MM-DDTHH:mm:ssZ",i=b.z(this),s=this.$H,u=this.$m,a=this.$M,o=n.weekdays,c=n.months,f=n.meridiem,h=function(t,n,i,s){return t&&(t[n]||t(e,r))||i[n].slice(0,s)},d=function(t){return b.s(s%12||12,t,"0")},$=f||function(t,e,n){var r=t<12?"AM":"PM";return n?r.toLowerCase():r};return r.replace(y,(function(t,r){return r||function(t){switch(t){case"YY":return String(e.$y).slice(-2);case"YYYY":return b.s(e.$y,4,"0");case"M":return a+1;case"MM":return b.s(a+1,2,"0");case"MMM":return h(n.monthsShort,a,c,3);case"MMMM":return h(c,a);case"D":return e.$D;case"DD":return b.s(e.$D,2,"0");case"d":return String(e.$W);case"dd":return h(n.weekdaysMin,e.$W,o,2);case"ddd":return h(n.weekdaysShort,e.$W,o,3);case"dddd":return o[e.$W];case"H":return String(s);case"HH":return b.s(s,2,"0");case"h":return d(1);case"hh":return d(2);case"a":return $(s,u,!0);case"A":return $(s,u,!1);case"m":return String(u);case"mm":return b.s(u,2,"0");case"s":return String(e.$s);case"ss":return b.s(e.$s,2,"0");case"SSS":return b.s(e.$ms,3,"0");case"Z":return i}return null}(t)||i.replace(":","")}))},m.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},m.diff=function(r,d,l){var $,y=this,M=b.p(d),m=O(r),v=(m.utcOffset()-this.utcOffset())*e,g=this-m,D=function(){return b.m(y,m)};switch(M){case h:$=D()/12;break;case c:$=D();break;case f:$=D()/3;break;case o:$=(g-v)/6048e5;break;case a:$=(g-v)/864e5;break;case u:$=g/n;break;case s:$=g/e;break;case i:$=g/t;break;default:$=g;}return l?$:b.a($)},m.daysInMonth=function(){return this.endOf(c).$D},m.$locale=function(){return D[this.$L]},m.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),r=w(t,e,!0);return r&&(n.$L=r),n},m.clone=function(){return b.w(this.$d,this)},m.toDate=function(){return new Date(this.valueOf())},m.toJSON=function(){return this.isValid()?this.toISOString():null},m.toISOString=function(){return this.$d.toISOString()},m.toString=function(){return this.$d.toUTCString()},M}(),k=_.prototype;return O.prototype=k,[["$ms",r],["$s",i],["$m",s],["$H",u],["$W",a],["$M",c],["$y",h],["$D",d]].forEach((function(t){k[t[1]]=function(e){return this.$g(e,t[0],t[1])};})),O.extend=function(t,e){return t.$i||(t(e,_,O),t.$i=!0),O},O.locale=w,O.isDayjs=S,O.unix=function(t){return O(1e3*t)},O.en=D[g],O.Ls=D,O.p={},O}));
	});

	class PaynowQR{
	  constructor(opts){
	    Object.defineProperty(this, 'qrstring',{
	      value : this.generate(opts)
	    });
	  }
	  output(){
	    return this.qrstring;
	  }

	  padLeft(s, n, str) {
	      if (n < String(s).length) {
	        return s.toString();
	      }
	      else {
	        return Array(n - String(s).length + 1).join(str || '0') + s;
	      }
	    }
	  
	  crc16(s) {
	    var crcTable = [0x0000, 0x1021, 0x2042, 0x3063, 0x4084, 0x50a5,
	      0x60c6, 0x70e7, 0x8108, 0x9129, 0xa14a, 0xb16b,
	      0xc18c, 0xd1ad, 0xe1ce, 0xf1ef, 0x1231, 0x0210,
	      0x3273, 0x2252, 0x52b5, 0x4294, 0x72f7, 0x62d6,
	      0x9339, 0x8318, 0xb37b, 0xa35a, 0xd3bd, 0xc39c,
	      0xf3ff, 0xe3de, 0x2462, 0x3443, 0x0420, 0x1401,
	      0x64e6, 0x74c7, 0x44a4, 0x5485, 0xa56a, 0xb54b,
	      0x8528, 0x9509, 0xe5ee, 0xf5cf, 0xc5ac, 0xd58d,
	      0x3653, 0x2672, 0x1611, 0x0630, 0x76d7, 0x66f6,
	      0x5695, 0x46b4, 0xb75b, 0xa77a, 0x9719, 0x8738,
	      0xf7df, 0xe7fe, 0xd79d, 0xc7bc, 0x48c4, 0x58e5,
	      0x6886, 0x78a7, 0x0840, 0x1861, 0x2802, 0x3823,
	      0xc9cc, 0xd9ed, 0xe98e, 0xf9af, 0x8948, 0x9969,
	      0xa90a, 0xb92b, 0x5af5, 0x4ad4, 0x7ab7, 0x6a96,
	      0x1a71, 0x0a50, 0x3a33, 0x2a12, 0xdbfd, 0xcbdc,
	      0xfbbf, 0xeb9e, 0x9b79, 0x8b58, 0xbb3b, 0xab1a,
	      0x6ca6, 0x7c87, 0x4ce4, 0x5cc5, 0x2c22, 0x3c03,
	      0x0c60, 0x1c41, 0xedae, 0xfd8f, 0xcdec, 0xddcd,
	      0xad2a, 0xbd0b, 0x8d68, 0x9d49, 0x7e97, 0x6eb6,
	      0x5ed5, 0x4ef4, 0x3e13, 0x2e32, 0x1e51, 0x0e70,
	      0xff9f, 0xefbe, 0xdfdd, 0xcffc, 0xbf1b, 0xaf3a,
	      0x9f59, 0x8f78, 0x9188, 0x81a9, 0xb1ca, 0xa1eb,
	      0xd10c, 0xc12d, 0xf14e, 0xe16f, 0x1080, 0x00a1,
	      0x30c2, 0x20e3, 0x5004, 0x4025, 0x7046, 0x6067,
	      0x83b9, 0x9398, 0xa3fb, 0xb3da, 0xc33d, 0xd31c,
	      0xe37f, 0xf35e, 0x02b1, 0x1290, 0x22f3, 0x32d2,
	      0x4235, 0x5214, 0x6277, 0x7256, 0xb5ea, 0xa5cb,
	      0x95a8, 0x8589, 0xf56e, 0xe54f, 0xd52c, 0xc50d,
	      0x34e2, 0x24c3, 0x14a0, 0x0481, 0x7466, 0x6447,
	      0x5424, 0x4405, 0xa7db, 0xb7fa, 0x8799, 0x97b8,
	      0xe75f, 0xf77e, 0xc71d, 0xd73c, 0x26d3, 0x36f2,
	      0x0691, 0x16b0, 0x6657, 0x7676, 0x4615, 0x5634,
	      0xd94c, 0xc96d, 0xf90e, 0xe92f, 0x99c8, 0x89e9,
	      0xb98a, 0xa9ab, 0x5844, 0x4865, 0x7806, 0x6827,
	      0x18c0, 0x08e1, 0x3882, 0x28a3, 0xcb7d, 0xdb5c,
	      0xeb3f, 0xfb1e, 0x8bf9, 0x9bd8, 0xabbb, 0xbb9a,
	      0x4a75, 0x5a54, 0x6a37, 0x7a16, 0x0af1, 0x1ad0,
	      0x2ab3, 0x3a92, 0xfd2e, 0xed0f, 0xdd6c, 0xcd4d,
	      0xbdaa, 0xad8b, 0x9de8, 0x8dc9, 0x7c26, 0x6c07,
	      0x5c64, 0x4c45, 0x3ca2, 0x2c83, 0x1ce0, 0x0cc1,
	      0xef1f, 0xff3e, 0xcf5d, 0xdf7c, 0xaf9b, 0xbfba,
	      0x8fd9, 0x9ff8, 0x6e17, 0x7e36, 0x4e55, 0x5e74,
	      0x2e93, 0x3eb2, 0x0ed1, 0x1ef0];
	  
	    var crc = 0xFFFF;
	    var j, i;
	  
	    for (i = 0; i < s.length; i++) {
	  
	      let c = s.charCodeAt(i);
	      if (c > 255) {
	        throw new RangeError();
	      }
	      j = (c ^ (crc >> 8)) & 0xFF;
	      crc = crcTable[j] ^ (crc << 8);
	    }
	  
	    return ((crc ^ 0) & 0xFFFF).toString(16).toUpperCase();
	  }
	  
	  resolveProxyType(opts) {
	    const explicit = opts.hasOwnProperty('proxyType') ? opts.proxyType : opts.accountType;
	    if (explicit !== undefined && explicit !== null) {
	      const normalized = String(explicit).trim();
	      if (normalized === '0' || normalized === '2') {
	        return normalized;
	      }
	      throw new Error('Invalid PayNow proxy type. Use "0" for mobile or "2" for UEN.');
	    }

	    if (opts.mobile !== undefined && opts.mobile !== null) {
	      return '0';
	    }
	    if (opts.mobileNumber !== undefined && opts.mobileNumber !== null) {
	      return '0';
	    }

	    return '2';
	  }

	  resolveProxyValue(proxyType, opts) {
	    const candidates = proxyType === '0'
	      ? [opts.mobile, opts.mobileNumber, opts.proxyValue, opts.account]
	      : [opts.uen, opts.proxyValue, opts.account];

	    let value = candidates.find(v => v !== undefined && v !== null && String(v).trim() !== '');

	    if (value === undefined) {
	      throw new Error('PayNow proxy value is required for the selected account type.');
	    }

	    value = String(value).trim();

	    if (proxyType === '0') {
	      const digitsOnly = value.replace(/\D+/g, '');
	      const normalized = digitsOnly.startsWith('65') ? digitsOnly : `65${digitsOnly}`;

	      if (!/^65\d{8}$/.test(normalized)) {
	        throw new Error('PayNow mobile proxies must include an 8-digit Singapore number (optionally prefixed by +65).');
	      }

	      return normalized;
	    }

	    return value;
	  }

	  
	  generate( opts ) {

	    for(let key in opts){
	      if(typeof opts[key] == 'string'){
	        opts[key] = opts[key].trim();
	      }
	    }

	  
	    const proxyType = this.resolveProxyType(opts);
	    const proxyValue = this.resolveProxyValue(proxyType, opts);

	    const p = [
	      { id: '00', value: '01' },                    // ID 00: Payload Format Indicator (Fixed to '01')
	      { id: '01', value: '12' },                    // ID 01: Point of Initiation Method 11: static, 12: dynamic
	      {
	        id: '26', value:                            // ID 26: Merchant Account Info Template
	          [{ id: '00', value: 'SG.PAYNOW' },
	          { id: '01', value: proxyType },           // 0 for mobile, 2 for UEN. 1 is reserved in SGQR.
	          { id: '02', value: proxyValue },          // PayNow proxy identifier (mobile number or UEN)
	          { id: '03', value: String(! opts.amount ||opts.editable ? 1 : 0) },       // 1 = Payment amount is editable, 0 = Not Editable
	          { id: '04', value: String(opts.expiry|| dayjs_min().add(5,"year").format('YYYYMMDD') )}]         // Expiry date (YYYYMMDD)
	      },
	      { id: '52', value: '0000' },                  // ID 52: Merchant Category Code (not used)
	      { id: '53', value: '702' },                   // ID 53: Currency. SGD is 702
	      { id: '54', value: String(opts.amount || 0) },  // ID 54: Transaction Amount
	      { id: '58', value: 'SG' },                    // ID 58: 2-letter Country Code (SG)
	      { id: '59', value: String(opts.company ||'COMPANY') },          // ID 59: Company Name
	      { id: '60', value: 'Singapore' }             // ID 60: Merchant City
	      
	    ];
	  
	    let otherdata = {
	      id: '62', value: [{                         // ID 62: Additional data fields
	        id: '01', value: String(opts.refNumber||'')           // ID 01: Bill Number
	      }]
	    };

	    if(opts.refNumber){
	      p.push(otherdata);
	    }

	    let str = p.reduce((final, current) => {
	      if (Array.isArray(current.value)) { //nest loop
	        current.value = current.value.reduce((f, c) => {
	          f += c.id + this.padLeft(c.value.length.toString(),2) + c.value;
	          return f
	        }, "");
	      }
	      final += current.id + this.padLeft(current.value.length.toString(),2) + current.value;
	      return final
	    }, "");
	  
	    // Here we add "6304" to the previous string
	    // ID 63 (Checksum) 04 (4 characters)
	    // Do a CRC16 of the whole string including the "6304"
	    // then append it to the end.
	    str += '6304' + this.padLeft(this.crc16(str + '6304'), 4);
	  
	    return str;
	  
	  }
	}
	var paynowqr = PaynowQR;

	return paynowqr;

})();
