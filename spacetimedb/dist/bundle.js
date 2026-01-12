import * as _syscalls1_0 from "spacetime:sys@1.0";
import { register_hooks } from "spacetime:sys@1.0";
import { register_hooks as register_hooks$1 } from "spacetime:sys@1.1";
import * as _syscalls1_2 from "spacetime:sys@1.2";
import { register_hooks as register_hooks$2 } from "spacetime:sys@1.2";

//#region node_modules/headers-polyfill/lib/index.mjs
var __create$1 = Object.create;
var __defProp$1 = Object.defineProperty;
var __getOwnPropDesc$1 = Object.getOwnPropertyDescriptor;
var __getOwnPropNames$1 = Object.getOwnPropertyNames;
var __getProtoOf$1 = Object.getPrototypeOf;
var __hasOwnProp$1 = Object.prototype.hasOwnProperty;
var __commonJS$1 = (cb, mod) => function __require() {
	return mod || (0, cb[__getOwnPropNames$1(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps$1 = (to, from, except, desc) => {
	if (from && typeof from === "object" || typeof from === "function") {
		for (let key of __getOwnPropNames$1(from)) if (!__hasOwnProp$1.call(to, key) && key !== except) __defProp$1(to, key, {
			get: () => from[key],
			enumerable: !(desc = __getOwnPropDesc$1(from, key)) || desc.enumerable
		});
	}
	return to;
};
var __toESM$1 = (mod, isNodeMode, target) => (target = mod != null ? __create$1(__getProtoOf$1(mod)) : {}, __copyProps$1(isNodeMode || !mod || !mod.__esModule ? __defProp$1(target, "default", {
	value: mod,
	enumerable: true
}) : target, mod));
var import_set_cookie_parser = __toESM$1(__commonJS$1({ "node_modules/set-cookie-parser/lib/set-cookie.js"(exports, module) {
	var defaultParseOptions = {
		decodeValues: true,
		map: false,
		silent: false
	};
	function isNonEmptyString(str) {
		return typeof str === "string" && !!str.trim();
	}
	function parseString(setCookieValue, options) {
		var parts = setCookieValue.split(";").filter(isNonEmptyString);
		var parsed = parseNameValuePair(parts.shift());
		var name = parsed.name;
		var value = parsed.value;
		options = options ? Object.assign({}, defaultParseOptions, options) : defaultParseOptions;
		try {
			value = options.decodeValues ? decodeURIComponent(value) : value;
		} catch (e) {
			console.error("set-cookie-parser encountered an error while decoding a cookie with value '" + value + "'. Set options.decodeValues to false to disable this feature.", e);
		}
		var cookie = {
			name,
			value
		};
		parts.forEach(function(part) {
			var sides = part.split("=");
			var key = sides.shift().trimLeft().toLowerCase();
			var value2 = sides.join("=");
			if (key === "expires") cookie.expires = new Date(value2);
			else if (key === "max-age") cookie.maxAge = parseInt(value2, 10);
			else if (key === "secure") cookie.secure = true;
			else if (key === "httponly") cookie.httpOnly = true;
			else if (key === "samesite") cookie.sameSite = value2;
			else cookie[key] = value2;
		});
		return cookie;
	}
	function parseNameValuePair(nameValuePairStr) {
		var name = "";
		var value = "";
		var nameValueArr = nameValuePairStr.split("=");
		if (nameValueArr.length > 1) {
			name = nameValueArr.shift();
			value = nameValueArr.join("=");
		} else value = nameValuePairStr;
		return {
			name,
			value
		};
	}
	function parse(input, options) {
		options = options ? Object.assign({}, defaultParseOptions, options) : defaultParseOptions;
		if (!input) if (!options.map) return [];
		else return {};
		if (input.headers) if (typeof input.headers.getSetCookie === "function") input = input.headers.getSetCookie();
		else if (input.headers["set-cookie"]) input = input.headers["set-cookie"];
		else {
			var sch = input.headers[Object.keys(input.headers).find(function(key) {
				return key.toLowerCase() === "set-cookie";
			})];
			if (!sch && input.headers.cookie && !options.silent) console.warn("Warning: set-cookie-parser appears to have been called on a request object. It is designed to parse Set-Cookie headers from responses, not Cookie headers from requests. Set the option {silent: true} to suppress this warning.");
			input = sch;
		}
		if (!Array.isArray(input)) input = [input];
		options = options ? Object.assign({}, defaultParseOptions, options) : defaultParseOptions;
		if (!options.map) return input.filter(isNonEmptyString).map(function(str) {
			return parseString(str, options);
		});
		else return input.filter(isNonEmptyString).reduce(function(cookies2, str) {
			var cookie = parseString(str, options);
			cookies2[cookie.name] = cookie;
			return cookies2;
		}, {});
	}
	function splitCookiesString2(cookiesString) {
		if (Array.isArray(cookiesString)) return cookiesString;
		if (typeof cookiesString !== "string") return [];
		var cookiesStrings = [];
		var pos = 0;
		var start;
		var ch;
		var lastComma;
		var nextStart;
		var cookiesSeparatorFound;
		function skipWhitespace() {
			while (pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))) pos += 1;
			return pos < cookiesString.length;
		}
		function notSpecialChar() {
			ch = cookiesString.charAt(pos);
			return ch !== "=" && ch !== ";" && ch !== ",";
		}
		while (pos < cookiesString.length) {
			start = pos;
			cookiesSeparatorFound = false;
			while (skipWhitespace()) {
				ch = cookiesString.charAt(pos);
				if (ch === ",") {
					lastComma = pos;
					pos += 1;
					skipWhitespace();
					nextStart = pos;
					while (pos < cookiesString.length && notSpecialChar()) pos += 1;
					if (pos < cookiesString.length && cookiesString.charAt(pos) === "=") {
						cookiesSeparatorFound = true;
						pos = nextStart;
						cookiesStrings.push(cookiesString.substring(start, lastComma));
						start = pos;
					} else pos = lastComma + 1;
				} else pos += 1;
			}
			if (!cookiesSeparatorFound || pos >= cookiesString.length) cookiesStrings.push(cookiesString.substring(start, cookiesString.length));
		}
		return cookiesStrings;
	}
	module.exports = parse;
	module.exports.parse = parse;
	module.exports.parseString = parseString;
	module.exports.splitCookiesString = splitCookiesString2;
} })());
var HEADERS_INVALID_CHARACTERS = /[^a-z0-9\-#$%&'*+.^_`|~]/i;
function normalizeHeaderName(name) {
	if (HEADERS_INVALID_CHARACTERS.test(name) || name.trim() === "") throw new TypeError("Invalid character in header field name");
	return name.trim().toLowerCase();
}
var charCodesToRemove = [
	String.fromCharCode(10),
	String.fromCharCode(13),
	String.fromCharCode(9),
	String.fromCharCode(32)
];
var HEADER_VALUE_REMOVE_REGEXP = new RegExp(`(^[${charCodesToRemove.join("")}]|$[${charCodesToRemove.join("")}])`, "g");
function normalizeHeaderValue(value) {
	return value.replace(HEADER_VALUE_REMOVE_REGEXP, "");
}
function isValidHeaderName(value) {
	if (typeof value !== "string") return false;
	if (value.length === 0) return false;
	for (let i = 0; i < value.length; i++) {
		const character = value.charCodeAt(i);
		if (character > 127 || !isToken(character)) return false;
	}
	return true;
}
function isToken(value) {
	return ![
		127,
		32,
		"(",
		")",
		"<",
		">",
		"@",
		",",
		";",
		":",
		"\\",
		"\"",
		"/",
		"[",
		"]",
		"?",
		"=",
		"{",
		"}"
	].includes(value);
}
function isValidHeaderValue(value) {
	if (typeof value !== "string") return false;
	if (value.trim() !== value) return false;
	for (let i = 0; i < value.length; i++) {
		const character = value.charCodeAt(i);
		if (character === 0 || character === 10 || character === 13) return false;
	}
	return true;
}
var NORMALIZED_HEADERS = Symbol("normalizedHeaders");
var RAW_HEADER_NAMES = Symbol("rawHeaderNames");
var HEADER_VALUE_DELIMITER = ", ";
var _a, _b, _c;
var Headers = class _Headers {
	constructor(init$1) {
		this[_a] = {};
		this[_b] = /* @__PURE__ */ new Map();
		this[_c] = "Headers";
		if (["Headers", "HeadersPolyfill"].includes(init$1?.constructor.name) || init$1 instanceof _Headers || typeof globalThis.Headers !== "undefined" && init$1 instanceof globalThis.Headers) init$1.forEach((value, name) => {
			this.append(name, value);
		}, this);
		else if (Array.isArray(init$1)) init$1.forEach(([name, value]) => {
			this.append(name, Array.isArray(value) ? value.join(HEADER_VALUE_DELIMITER) : value);
		});
		else if (init$1) Object.getOwnPropertyNames(init$1).forEach((name) => {
			const value = init$1[name];
			this.append(name, Array.isArray(value) ? value.join(HEADER_VALUE_DELIMITER) : value);
		});
	}
	[(_a = NORMALIZED_HEADERS, _b = RAW_HEADER_NAMES, _c = Symbol.toStringTag, Symbol.iterator)]() {
		return this.entries();
	}
	*keys() {
		for (const [name] of this.entries()) yield name;
	}
	*values() {
		for (const [, value] of this.entries()) yield value;
	}
	*entries() {
		let sortedKeys = Object.keys(this[NORMALIZED_HEADERS]).sort((a, b) => a.localeCompare(b));
		for (const name of sortedKeys) if (name === "set-cookie") for (const value of this.getSetCookie()) yield [name, value];
		else yield [name, this.get(name)];
	}
	/**
	* Returns a boolean stating whether a `Headers` object contains a certain header.
	*/
	has(name) {
		if (!isValidHeaderName(name)) throw new TypeError(`Invalid header name "${name}"`);
		return this[NORMALIZED_HEADERS].hasOwnProperty(normalizeHeaderName(name));
	}
	/**
	* Returns a `ByteString` sequence of all the values of a header with a given name.
	*/
	get(name) {
		if (!isValidHeaderName(name)) throw TypeError(`Invalid header name "${name}"`);
		return this[NORMALIZED_HEADERS][normalizeHeaderName(name)] ?? null;
	}
	/**
	* Sets a new value for an existing header inside a `Headers` object, or adds the header if it does not already exist.
	*/
	set(name, value) {
		if (!isValidHeaderName(name) || !isValidHeaderValue(value)) return;
		const normalizedName = normalizeHeaderName(name);
		const normalizedValue = normalizeHeaderValue(value);
		this[NORMALIZED_HEADERS][normalizedName] = normalizeHeaderValue(normalizedValue);
		this[RAW_HEADER_NAMES].set(normalizedName, name);
	}
	/**
	* Appends a new value onto an existing header inside a `Headers` object, or adds the header if it does not already exist.
	*/
	append(name, value) {
		if (!isValidHeaderName(name) || !isValidHeaderValue(value)) return;
		const normalizedName = normalizeHeaderName(name);
		const normalizedValue = normalizeHeaderValue(value);
		let resolvedValue = this.has(normalizedName) ? `${this.get(normalizedName)}, ${normalizedValue}` : normalizedValue;
		this.set(name, resolvedValue);
	}
	/**
	* Deletes a header from the `Headers` object.
	*/
	delete(name) {
		if (!isValidHeaderName(name)) return;
		if (!this.has(name)) return;
		const normalizedName = normalizeHeaderName(name);
		delete this[NORMALIZED_HEADERS][normalizedName];
		this[RAW_HEADER_NAMES].delete(normalizedName);
	}
	/**
	* Traverses the `Headers` object,
	* calling the given callback for each header.
	*/
	forEach(callback, thisArg) {
		for (const [name, value] of this.entries()) callback.call(thisArg, value, name, this);
	}
	/**
	* Returns an array containing the values
	* of all Set-Cookie headers associated
	* with a response
	*/
	getSetCookie() {
		const setCookieHeader = this.get("set-cookie");
		if (setCookieHeader === null) return [];
		if (setCookieHeader === "") return [""];
		return (0, import_set_cookie_parser.splitCookiesString)(setCookieHeader);
	}
};
function headersToList(headers) {
	const headersList = [];
	headers.forEach((value, name) => {
		const resolvedValue = value.includes(",") ? value.split(",").map((value2) => value2.trim()) : value;
		headersList.push([name, resolvedValue]);
	});
	return headersList;
}

//#endregion
//#region node_modules/spacetimedb/dist/server/index.mjs
typeof globalThis !== "undefined" && (globalThis.global = globalThis.global || globalThis, globalThis.window = globalThis.window || globalThis);
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __knownSymbol = (name, symbol) => (symbol = Symbol[name]) ? symbol : Symbol.for("Symbol." + name);
var __typeError = (msg) => {
	throw TypeError(msg);
};
var __commonJS = (cb, mod) => function __require() {
	return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
	if (from && typeof from === "object" || typeof from === "function") {
		for (let key of __getOwnPropNames(from)) if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
			get: () => from[key],
			enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
		});
	}
	return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(__defProp(target, "default", {
	value: mod,
	enumerable: true
}), mod));
var __using = (stack, value, async) => {
	if (value != null) {
		if (typeof value !== "object" && typeof value !== "function") __typeError("Object expected");
		var dispose, inner;
		if (dispose === void 0) dispose = value[__knownSymbol("dispose")];
		if (typeof dispose !== "function") __typeError("Object not disposable");
		if (inner) dispose = function() {
			try {
				inner.call(this);
			} catch (e) {
				return Promise.reject(e);
			}
		};
		stack.push([
			async,
			dispose,
			value
		]);
	}
	return value;
};
var __callDispose = (stack, error, hasError) => {
	var E = typeof SuppressedError === "function" ? SuppressedError : function(e, s, m, _) {
		return _ = Error(m), _.name = "SuppressedError", _.error = e, _.suppressed = s, _;
	};
	var fail = (e) => error = hasError ? new E(e, error, "An error was suppressed during disposal") : (hasError = true, e);
	var next = (it) => {
		while (it = stack.pop()) try {
			var result = it[1] && it[1].call(it[2]);
			if (it[0]) return Promise.resolve(result).then(next, (e) => (fail(e), next()));
		} catch (e) {
			fail(e);
		}
		if (hasError) throw error;
	};
	return next();
};
var require_base64_js = __commonJS({ "../../node_modules/.pnpm/base64-js@1.5.1/node_modules/base64-js/index.js"(exports) {
	exports.byteLength = byteLength;
	exports.toByteArray = toByteArray;
	exports.fromByteArray = fromByteArray2;
	var lookup = [];
	var revLookup = [];
	var Arr = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
	var code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
	for (i = 0, len = code.length; i < len; ++i) {
		lookup[i] = code[i];
		revLookup[code.charCodeAt(i)] = i;
	}
	var i;
	var len;
	revLookup["-".charCodeAt(0)] = 62;
	revLookup["_".charCodeAt(0)] = 63;
	function getLens(b64) {
		var len2 = b64.length;
		if (len2 % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
		var validLen = b64.indexOf("=");
		if (validLen === -1) validLen = len2;
		var placeHoldersLen = validLen === len2 ? 0 : 4 - validLen % 4;
		return [validLen, placeHoldersLen];
	}
	function byteLength(b64) {
		var lens = getLens(b64);
		var validLen = lens[0];
		var placeHoldersLen = lens[1];
		return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
	}
	function _byteLength(b64, validLen, placeHoldersLen) {
		return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
	}
	function toByteArray(b64) {
		var tmp;
		var lens = getLens(b64);
		var validLen = lens[0];
		var placeHoldersLen = lens[1];
		var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen));
		var curByte = 0;
		var len2 = placeHoldersLen > 0 ? validLen - 4 : validLen;
		var i2;
		for (i2 = 0; i2 < len2; i2 += 4) {
			tmp = revLookup[b64.charCodeAt(i2)] << 18 | revLookup[b64.charCodeAt(i2 + 1)] << 12 | revLookup[b64.charCodeAt(i2 + 2)] << 6 | revLookup[b64.charCodeAt(i2 + 3)];
			arr[curByte++] = tmp >> 16 & 255;
			arr[curByte++] = tmp >> 8 & 255;
			arr[curByte++] = tmp & 255;
		}
		if (placeHoldersLen === 2) {
			tmp = revLookup[b64.charCodeAt(i2)] << 2 | revLookup[b64.charCodeAt(i2 + 1)] >> 4;
			arr[curByte++] = tmp & 255;
		}
		if (placeHoldersLen === 1) {
			tmp = revLookup[b64.charCodeAt(i2)] << 10 | revLookup[b64.charCodeAt(i2 + 1)] << 4 | revLookup[b64.charCodeAt(i2 + 2)] >> 2;
			arr[curByte++] = tmp >> 8 & 255;
			arr[curByte++] = tmp & 255;
		}
		return arr;
	}
	function tripletToBase64(num) {
		return lookup[num >> 18 & 63] + lookup[num >> 12 & 63] + lookup[num >> 6 & 63] + lookup[num & 63];
	}
	function encodeChunk(uint8, start, end) {
		var tmp;
		var output = [];
		for (var i2 = start; i2 < end; i2 += 3) {
			tmp = (uint8[i2] << 16 & 16711680) + (uint8[i2 + 1] << 8 & 65280) + (uint8[i2 + 2] & 255);
			output.push(tripletToBase64(tmp));
		}
		return output.join("");
	}
	function fromByteArray2(uint8) {
		var tmp;
		var len2 = uint8.length;
		var extraBytes = len2 % 3;
		var parts = [];
		var maxChunkLength = 16383;
		for (var i2 = 0, len22 = len2 - extraBytes; i2 < len22; i2 += maxChunkLength) parts.push(encodeChunk(uint8, i2, i2 + maxChunkLength > len22 ? len22 : i2 + maxChunkLength));
		if (extraBytes === 1) {
			tmp = uint8[len2 - 1];
			parts.push(lookup[tmp >> 2] + lookup[tmp << 4 & 63] + "==");
		} else if (extraBytes === 2) {
			tmp = (uint8[len2 - 2] << 8) + uint8[len2 - 1];
			parts.push(lookup[tmp >> 10] + lookup[tmp >> 4 & 63] + lookup[tmp << 2 & 63] + "=");
		}
		return parts.join("");
	}
} });
var require_text_min = __commonJS({ "../../node_modules/.pnpm/fast-text-encoding@1.0.6/node_modules/fast-text-encoding/text.min.js"(exports) {
	(function(scope) {
		function B(r, e) {
			var f;
			return r instanceof Buffer ? f = r : f = Buffer.from(r.buffer, r.byteOffset, r.byteLength), f.toString(e);
		}
		var w = function(r) {
			return Buffer.from(r);
		};
		function h(r) {
			for (var e = 0, f = Math.min(256 * 256, r.length + 1), n = new Uint16Array(f), i = [], o = 0;;) {
				var t2 = e < r.length;
				if (!t2 || o >= f - 1) {
					var m = n.subarray(0, o);
					if (i.push(String.fromCharCode.apply(null, m)), !t2) return i.join("");
					r = r.subarray(e), e = 0, o = 0;
				}
				var a = r[e++];
				if ((a & 128) === 0) n[o++] = a;
				else if ((a & 224) === 192) {
					var d = r[e++] & 63;
					n[o++] = (a & 31) << 6 | d;
				} else if ((a & 240) === 224) {
					var d = r[e++] & 63, l = r[e++] & 63;
					n[o++] = (a & 31) << 12 | d << 6 | l;
				} else if ((a & 248) === 240) {
					var d = r[e++] & 63, l = r[e++] & 63, R = r[e++] & 63, c = (a & 7) << 18 | d << 12 | l << 6 | R;
					c > 65535 && (c -= 65536, n[o++] = c >>> 10 & 1023 | 55296, c = 56320 | c & 1023), n[o++] = c;
				}
			}
		}
		function F(r) {
			for (var e = 0, f = r.length, n = 0, i = Math.max(32, f + (f >>> 1) + 7), o = new Uint8Array(i >>> 3 << 3); e < f;) {
				var t2 = r.charCodeAt(e++);
				if (t2 >= 55296 && t2 <= 56319) {
					if (e < f) {
						var s = r.charCodeAt(e);
						(s & 64512) === 56320 && (++e, t2 = ((t2 & 1023) << 10) + (s & 1023) + 65536);
					}
					if (t2 >= 55296 && t2 <= 56319) continue;
				}
				if (n + 4 > o.length) {
					i += 8, i *= 1 + e / r.length * 2, i = i >>> 3 << 3;
					var m = new Uint8Array(i);
					m.set(o), o = m;
				}
				if ((t2 & 4294967168) === 0) {
					o[n++] = t2;
					continue;
				} else if ((t2 & 4294965248) === 0) o[n++] = t2 >>> 6 & 31 | 192;
				else if ((t2 & 4294901760) === 0) o[n++] = t2 >>> 12 & 15 | 224, o[n++] = t2 >>> 6 & 63 | 128;
				else if ((t2 & 4292870144) === 0) o[n++] = t2 >>> 18 & 7 | 240, o[n++] = t2 >>> 12 & 63 | 128, o[n++] = t2 >>> 6 & 63 | 128;
				else continue;
				o[n++] = t2 & 63 | 128;
			}
			return o.slice ? o.slice(0, n) : o.subarray(0, n);
		}
		var u = "Failed to ", p = function(r, e, f) {
			if (r) throw new Error("".concat(u).concat(e, ": the '").concat(f, "' option is unsupported."));
		};
		var x = typeof Buffer == "function" && Buffer.from;
		var A = x ? w : F;
		function v() {
			this.encoding = "utf-8";
		}
		v.prototype.encode = function(r, e) {
			return p(e && e.stream, "encode", "stream"), A(r);
		};
		function U(r) {
			var e;
			try {
				var f = new Blob([r], { type: "text/plain;charset=UTF-8" });
				e = URL.createObjectURL(f);
				var n = new XMLHttpRequest();
				return n.open("GET", e, false), n.send(), n.responseText;
			} finally {
				e && URL.revokeObjectURL(e);
			}
		}
		var O = !x && typeof Blob == "function" && typeof URL == "function" && typeof URL.createObjectURL == "function", S = [
			"utf-8",
			"utf8",
			"unicode-1-1-utf-8"
		], T = h;
		x ? T = B : O && (T = function(r) {
			try {
				return U(r);
			} catch (e) {
				return h(r);
			}
		});
		var y = "construct 'TextDecoder'", E = "".concat(u, " ").concat(y, ": the ");
		function g(r, e) {
			p(e && e.fatal, y, "fatal"), r = r || "utf-8";
			var f;
			if (x ? f = Buffer.isEncoding(r) : f = S.indexOf(r.toLowerCase()) !== -1, !f) throw new RangeError("".concat(E, " encoding label provided ('").concat(r, "') is invalid."));
			this.encoding = r, this.fatal = false, this.ignoreBOM = false;
		}
		g.prototype.decode = function(r, e) {
			p(e && e.stream, "decode", "stream");
			var f;
			return r instanceof Uint8Array ? f = r : r.buffer instanceof ArrayBuffer ? f = new Uint8Array(r.buffer) : f = new Uint8Array(r), T(f, this.encoding);
		};
		scope.TextEncoder = scope.TextEncoder || v;
		scope.TextDecoder = scope.TextDecoder || g;
	})(typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : exports);
} });
var require_codes = __commonJS({ "../../node_modules/.pnpm/statuses@2.0.2/node_modules/statuses/codes.json"(exports, module) {
	module.exports = {
		"100": "Continue",
		"101": "Switching Protocols",
		"102": "Processing",
		"103": "Early Hints",
		"200": "OK",
		"201": "Created",
		"202": "Accepted",
		"203": "Non-Authoritative Information",
		"204": "No Content",
		"205": "Reset Content",
		"206": "Partial Content",
		"207": "Multi-Status",
		"208": "Already Reported",
		"226": "IM Used",
		"300": "Multiple Choices",
		"301": "Moved Permanently",
		"302": "Found",
		"303": "See Other",
		"304": "Not Modified",
		"305": "Use Proxy",
		"307": "Temporary Redirect",
		"308": "Permanent Redirect",
		"400": "Bad Request",
		"401": "Unauthorized",
		"402": "Payment Required",
		"403": "Forbidden",
		"404": "Not Found",
		"405": "Method Not Allowed",
		"406": "Not Acceptable",
		"407": "Proxy Authentication Required",
		"408": "Request Timeout",
		"409": "Conflict",
		"410": "Gone",
		"411": "Length Required",
		"412": "Precondition Failed",
		"413": "Payload Too Large",
		"414": "URI Too Long",
		"415": "Unsupported Media Type",
		"416": "Range Not Satisfiable",
		"417": "Expectation Failed",
		"418": "I'm a Teapot",
		"421": "Misdirected Request",
		"422": "Unprocessable Entity",
		"423": "Locked",
		"424": "Failed Dependency",
		"425": "Too Early",
		"426": "Upgrade Required",
		"428": "Precondition Required",
		"429": "Too Many Requests",
		"431": "Request Header Fields Too Large",
		"451": "Unavailable For Legal Reasons",
		"500": "Internal Server Error",
		"501": "Not Implemented",
		"502": "Bad Gateway",
		"503": "Service Unavailable",
		"504": "Gateway Timeout",
		"505": "HTTP Version Not Supported",
		"506": "Variant Also Negotiates",
		"507": "Insufficient Storage",
		"508": "Loop Detected",
		"509": "Bandwidth Limit Exceeded",
		"510": "Not Extended",
		"511": "Network Authentication Required"
	};
} });
var require_statuses = __commonJS({ "../../node_modules/.pnpm/statuses@2.0.2/node_modules/statuses/index.js"(exports, module) {
	var codes = require_codes();
	module.exports = status2;
	status2.message = codes;
	status2.code = createMessageToStatusCodeMap(codes);
	status2.codes = createStatusCodeList(codes);
	status2.redirect = {
		300: true,
		301: true,
		302: true,
		303: true,
		305: true,
		307: true,
		308: true
	};
	status2.empty = {
		204: true,
		205: true,
		304: true
	};
	status2.retry = {
		502: true,
		503: true,
		504: true
	};
	function createMessageToStatusCodeMap(codes2) {
		var map = {};
		Object.keys(codes2).forEach(function forEachCode(code) {
			var message = codes2[code];
			var status3 = Number(code);
			map[message.toLowerCase()] = status3;
		});
		return map;
	}
	function createStatusCodeList(codes2) {
		return Object.keys(codes2).map(function mapCode(code) {
			return Number(code);
		});
	}
	function getStatusCode(message) {
		var msg = message.toLowerCase();
		if (!Object.prototype.hasOwnProperty.call(status2.code, msg)) throw new Error("invalid status message: \"" + message + "\"");
		return status2.code[msg];
	}
	function getStatusMessage(code) {
		if (!Object.prototype.hasOwnProperty.call(status2.message, code)) throw new Error("invalid status code: " + code);
		return status2.message[code];
	}
	function status2(code) {
		if (typeof code === "number") return getStatusMessage(code);
		if (typeof code !== "string") throw new TypeError("code must be a number or string");
		var n = parseInt(code, 10);
		if (!isNaN(n)) return getStatusMessage(n);
		return getStatusCode(code);
	}
} });
var TimeDuration = class _TimeDuration {
	__time_duration_micros__;
	static MICROS_PER_MILLIS = 1000n;
	/**
	* Get the algebraic type representation of the {@link TimeDuration} type.
	* @returns The algebraic type representation of the type.
	*/
	static getAlgebraicType() {
		return AlgebraicType.Product({ elements: [{
			name: "__time_duration_micros__",
			algebraicType: AlgebraicType.I64
		}] });
	}
	static isTimeDuration(algebraicType) {
		if (algebraicType.tag !== "Product") return false;
		const elements = algebraicType.value.elements;
		if (elements.length !== 1) return false;
		const microsElement = elements[0];
		return microsElement.name === "__time_duration_micros__" && microsElement.algebraicType.tag === "I64";
	}
	get micros() {
		return this.__time_duration_micros__;
	}
	get millis() {
		return Number(this.micros / _TimeDuration.MICROS_PER_MILLIS);
	}
	constructor(micros) {
		this.__time_duration_micros__ = micros;
	}
	static fromMillis(millis) {
		return new _TimeDuration(BigInt(millis) * _TimeDuration.MICROS_PER_MILLIS);
	}
	/** This outputs the same string format that we use in the host and in Rust modules */
	toString() {
		const micros = this.micros;
		const sign = micros < 0 ? "-" : "+";
		const pos = micros < 0 ? -micros : micros;
		const secs = pos / 1000000n;
		const micros_remaining = pos % 1000000n;
		return `${sign}${secs}.${String(micros_remaining).padStart(6, "0")}`;
	}
};
var Timestamp = class _Timestamp {
	__timestamp_micros_since_unix_epoch__;
	static MICROS_PER_MILLIS = 1000n;
	get microsSinceUnixEpoch() {
		return this.__timestamp_micros_since_unix_epoch__;
	}
	constructor(micros) {
		this.__timestamp_micros_since_unix_epoch__ = micros;
	}
	/**
	* Get the algebraic type representation of the {@link Timestamp} type.
	* @returns The algebraic type representation of the type.
	*/
	static getAlgebraicType() {
		return AlgebraicType.Product({ elements: [{
			name: "__timestamp_micros_since_unix_epoch__",
			algebraicType: AlgebraicType.I64
		}] });
	}
	static isTimestamp(algebraicType) {
		if (algebraicType.tag !== "Product") return false;
		const elements = algebraicType.value.elements;
		if (elements.length !== 1) return false;
		const microsElement = elements[0];
		return microsElement.name === "__timestamp_micros_since_unix_epoch__" && microsElement.algebraicType.tag === "I64";
	}
	/**
	* The Unix epoch, the midnight at the beginning of January 1, 1970, UTC.
	*/
	static UNIX_EPOCH = new _Timestamp(0n);
	/**
	* Get a `Timestamp` representing the execution environment's belief of the current moment in time.
	*/
	static now() {
		return _Timestamp.fromDate(/* @__PURE__ */ new Date());
	}
	/** Convert to milliseconds since Unix epoch. */
	toMillis() {
		return this.microsSinceUnixEpoch / 1000n;
	}
	/**
	* Get a `Timestamp` representing the same point in time as `date`.
	*/
	static fromDate(date) {
		const millis = date.getTime();
		return new _Timestamp(BigInt(millis) * _Timestamp.MICROS_PER_MILLIS);
	}
	/**
	* Get a `Date` representing approximately the same point in time as `this`.
	*
	* This method truncates to millisecond precision,
	* and throws `RangeError` if the `Timestamp` is outside the range representable as a `Date`.
	*/
	toDate() {
		const millis = this.__timestamp_micros_since_unix_epoch__ / _Timestamp.MICROS_PER_MILLIS;
		if (millis > BigInt(Number.MAX_SAFE_INTEGER) || millis < BigInt(Number.MIN_SAFE_INTEGER)) throw new RangeError("Timestamp is outside of the representable range of JS's Date");
		return new Date(Number(millis));
	}
	since(other) {
		return new TimeDuration(this.__timestamp_micros_since_unix_epoch__ - other.__timestamp_micros_since_unix_epoch__);
	}
};
var Uuid = class _Uuid {
	__uuid__;
	/**
	* The nil UUID (all zeros).
	*
	* @example
	* ```ts
	* const uuid = Uuid.NIL;
	* console.assert(
	*   uuid.toString() === "00000000-0000-0000-0000-000000000000"
	* );
	* ```
	*/
	static NIL = new _Uuid(0n);
	static MAX_UUID_BIGINT = 340282366920938463463374607431768211455n;
	/**
	* The max UUID (all ones).
	*
	* @example
	* ```ts
	* const uuid = Uuid.MAX;
	* console.assert(
	*   uuid.toString() === "ffffffff-ffff-ffff-ffff-ffffffffffff"
	* );
	* ```
	*/
	static MAX = new _Uuid(_Uuid.MAX_UUID_BIGINT);
	/**
	* Create a UUID from a raw 128-bit value.
	*
	* @param u - Unsigned 128-bit integer
	* @throws {Error} If the value is outside the valid UUID range
	*/
	constructor(u) {
		if (u < 0n || u > _Uuid.MAX_UUID_BIGINT) throw new Error("Invalid UUID: must be between 0 and `MAX_UUID_BIGINT`");
		this.__uuid__ = u;
	}
	/**
	* Create a UUID `v4` from explicit random bytes.
	*
	* This method assumes the bytes are already sufficiently random.
	* It only sets the appropriate bits for the UUID version and variant.
	*
	* @param bytes - Exactly 16 random bytes
	* @returns A UUID `v4`
	* @throws {Error} If `bytes.length !== 16`
	*
	* @example
	* ```ts
	* const randomBytes = new Uint8Array(16);
	* const uuid = Uuid.fromRandomBytesV4(randomBytes);
	*
	* console.assert(
	*   uuid.toString() === "00000000-0000-4000-8000-000000000000"
	* );
	* ```
	*/
	static fromRandomBytesV4(bytes) {
		if (bytes.length !== 16) throw new Error("UUID v4 requires 16 bytes");
		const arr = new Uint8Array(bytes);
		arr[6] = arr[6] & 15 | 64;
		arr[8] = arr[8] & 63 | 128;
		return new _Uuid(_Uuid.bytesToBigInt(arr));
	}
	/**
	* Generate a UUID `v7` using a monotonic counter from `0` to `2^31 - 1`,
	* a timestamp, and 4 random bytes.
	*
	* The counter wraps around on overflow.
	*
	* The UUID `v7` is structured as follows:
	*
	* ```ascii
	* ┌───────────────────────────────────────────────┬───────────────────┐
	* | B0  | B1  | B2  | B3  | B4  | B5              |         B6        |
	* ├───────────────────────────────────────────────┼───────────────────┤
	* |                 unix_ts_ms                    |      version 7    |
	* └───────────────────────────────────────────────┴───────────────────┘
	* ┌──────────────┬─────────┬──────────────────┬───────────────────────┐
	* | B7           | B8      | B9  | B10 | B11  | B12 | B13 | B14 | B15 |
	* ├──────────────┼─────────┼──────────────────┼───────────────────────┤
	* | counter_high | variant |    counter_low   |        random         |
	* └──────────────┴─────────┴──────────────────┴───────────────────────┘
	* ```
	*
	* @param counter - Mutable monotonic counter (31-bit)
	* @param now - Timestamp since the Unix epoch
	* @param randomBytes - Exactly 4 random bytes
	* @returns A UUID `v7`
	*
	* @throws {Error} If the `counter` is negative
	* @throws {Error} If the `timestamp` is before the Unix epoch
	* @throws {Error} If `randomBytes.length !== 4`
	*
	* @example
	* ```ts
	* const now = Timestamp.fromMillis(1_686_000_000_000n);
	* const counter = { value: 1 };
	* const randomBytes = new Uint8Array(4);
	*
	* const uuid = Uuid.fromCounterV7(counter, now, randomBytes);
	*
	* console.assert(
	*   uuid.toString() === "0000647e-5180-7000-8000-000200000000"
	* );
	* ```
	*/
	static fromCounterV7(counter, now, randomBytes) {
		if (randomBytes.length !== 4) throw new Error("`fromCounterV7` requires `randomBytes.length == 4`");
		if (counter.value < 0) throw new Error("`fromCounterV7` uuid `counter` must be non-negative");
		if (now.__timestamp_micros_since_unix_epoch__ < 0) throw new Error("`fromCounterV7` `timestamp` before unix epoch");
		const counterVal = counter.value;
		counter.value = counterVal + 1 & 2147483647;
		const tsMs = now.toMillis() & 281474976710655n;
		const bytes = new Uint8Array(16);
		bytes[0] = Number(tsMs >> 40n & 255n);
		bytes[1] = Number(tsMs >> 32n & 255n);
		bytes[2] = Number(tsMs >> 24n & 255n);
		bytes[3] = Number(tsMs >> 16n & 255n);
		bytes[4] = Number(tsMs >> 8n & 255n);
		bytes[5] = Number(tsMs & 255n);
		bytes[7] = counterVal >>> 23 & 255;
		bytes[9] = counterVal >>> 15 & 255;
		bytes[10] = counterVal >>> 7 & 255;
		bytes[11] = (counterVal & 127) << 1 & 255;
		bytes[12] |= randomBytes[0] & 127;
		bytes[13] = randomBytes[1];
		bytes[14] = randomBytes[2];
		bytes[15] = randomBytes[3];
		bytes[6] = bytes[6] & 15 | 112;
		bytes[8] = bytes[8] & 63 | 128;
		return new _Uuid(_Uuid.bytesToBigInt(bytes));
	}
	/**
	* Parse a UUID from a string representation.
	*
	* @param s - UUID string
	* @returns Parsed UUID
	* @throws {Error} If the string is not a valid UUID
	*
	* @example
	* ```ts
	* const s = "01888d6e-5c00-7000-8000-000000000000";
	* const uuid = Uuid.parse(s);
	*
	* console.assert(uuid.toString() === s);
	* ```
	*/
	static parse(s) {
		const hex = s.replace(/-/g, "");
		if (hex.length !== 32) throw new Error("Invalid hex UUID");
		let v = 0n;
		for (let i = 0; i < 32; i += 2) v = v << 8n | BigInt(parseInt(hex.slice(i, i + 2), 16));
		return new _Uuid(v);
	}
	/** Convert to string (hyphenated form). */
	toString() {
		const hex = [..._Uuid.bigIntToBytes(this.__uuid__)].map((b) => b.toString(16).padStart(2, "0")).join("");
		return hex.slice(0, 8) + "-" + hex.slice(8, 12) + "-" + hex.slice(12, 16) + "-" + hex.slice(16, 20) + "-" + hex.slice(20);
	}
	/** Convert to bigint (u128). */
	asBigInt() {
		return this.__uuid__;
	}
	/** Return a `Uint8Array` of 16 bytes. */
	toBytes() {
		return _Uuid.bigIntToBytes(this.__uuid__);
	}
	static bytesToBigInt(bytes) {
		let result = 0n;
		for (const b of bytes) result = result << 8n | BigInt(b);
		return result;
	}
	static bigIntToBytes(value) {
		const bytes = new Uint8Array(16);
		for (let i = 15; i >= 0; i--) {
			bytes[i] = Number(value & 255n);
			value >>= 8n;
		}
		return bytes;
	}
	/**
	* Returns the version of this UUID.
	*
	* This represents the algorithm used to generate the value.
	*
	* @returns A `UuidVersion`
	* @throws {Error} If the version field is not recognized
	*/
	getVersion() {
		const version = this.toBytes()[6] >> 4 & 15;
		switch (version) {
			case 4: return "V4";
			case 7: return "V7";
			default:
				if (this == _Uuid.NIL) return "Nil";
				if (this == _Uuid.MAX) return "Max";
				throw new Error(`Unsupported UUID version: ${version}`);
		}
	}
	/**
	* Extract the monotonic counter from a UUIDv7.
	*
	* Intended for testing and diagnostics.
	* Behavior is undefined if called on a non-V7 UUID.
	*
	* @returns 31-bit counter value
	*/
	getCounter() {
		const bytes = this.toBytes();
		const high = bytes[7];
		const mid1 = bytes[9];
		const mid2 = bytes[10];
		const low = bytes[11] >>> 1;
		return high << 23 | mid1 << 15 | mid2 << 7 | low | 0;
	}
	compareTo(other) {
		if (this.__uuid__ < other.__uuid__) return -1;
		if (this.__uuid__ > other.__uuid__) return 1;
		return 0;
	}
	static getAlgebraicType() {
		return AlgebraicType.Product({ elements: [{
			name: "__uuid__",
			algebraicType: AlgebraicType.U128
		}] });
	}
};
var BinaryReader = class {
	/**
	* The DataView used to read values from the binary data.
	*
	* Note: The DataView's `byteOffset` is relative to the beginning of the
	* underlying ArrayBuffer, not the start of the provided Uint8Array input.
	* This `BinaryReader`'s `#offset` field is used to track the current read position
	* relative to the start of the provided Uint8Array input.
	*/
	#view;
	/**
	* Represents the offset (in bytes) relative to the start of the DataView
	* and provided Uint8Array input.
	*
	* Note: This is *not* the absolute byte offset within the underlying ArrayBuffer.
	*/
	#offset = 0;
	constructor(input) {
		this.#view = new DataView(input.buffer, input.byteOffset, input.byteLength);
		this.#offset = 0;
	}
	get offset() {
		return this.#offset;
	}
	get remaining() {
		return this.#view.byteLength - this.#offset;
	}
	/** Ensure we have at least `n` bytes left to read */
	#ensure(n) {
		if (this.#offset + n > this.#view.byteLength) throw new RangeError(`Tried to read ${n} byte(s) at relative offset ${this.#offset}, but only ${this.remaining} byte(s) remain`);
	}
	readUInt8Array() {
		const length = this.readU32();
		this.#ensure(length);
		return this.readBytes(length);
	}
	readBool() {
		const value = this.#view.getUint8(this.#offset);
		this.#offset += 1;
		return value !== 0;
	}
	readByte() {
		const value = this.#view.getUint8(this.#offset);
		this.#offset += 1;
		return value;
	}
	readBytes(length) {
		const array = new Uint8Array(this.#view.buffer, this.#view.byteOffset + this.#offset, length);
		this.#offset += length;
		return array;
	}
	readI8() {
		const value = this.#view.getInt8(this.#offset);
		this.#offset += 1;
		return value;
	}
	readU8() {
		return this.readByte();
	}
	readI16() {
		const value = this.#view.getInt16(this.#offset, true);
		this.#offset += 2;
		return value;
	}
	readU16() {
		const value = this.#view.getUint16(this.#offset, true);
		this.#offset += 2;
		return value;
	}
	readI32() {
		const value = this.#view.getInt32(this.#offset, true);
		this.#offset += 4;
		return value;
	}
	readU32() {
		const value = this.#view.getUint32(this.#offset, true);
		this.#offset += 4;
		return value;
	}
	readI64() {
		const value = this.#view.getBigInt64(this.#offset, true);
		this.#offset += 8;
		return value;
	}
	readU64() {
		const value = this.#view.getBigUint64(this.#offset, true);
		this.#offset += 8;
		return value;
	}
	readU128() {
		const lowerPart = this.#view.getBigUint64(this.#offset, true);
		const upperPart = this.#view.getBigUint64(this.#offset + 8, true);
		this.#offset += 16;
		return (upperPart << BigInt(64)) + lowerPart;
	}
	readI128() {
		const lowerPart = this.#view.getBigUint64(this.#offset, true);
		const upperPart = this.#view.getBigInt64(this.#offset + 8, true);
		this.#offset += 16;
		return (upperPart << BigInt(64)) + lowerPart;
	}
	readU256() {
		const p0 = this.#view.getBigUint64(this.#offset, true);
		const p1 = this.#view.getBigUint64(this.#offset + 8, true);
		const p2 = this.#view.getBigUint64(this.#offset + 16, true);
		const p3 = this.#view.getBigUint64(this.#offset + 24, true);
		this.#offset += 32;
		return (p3 << BigInt(192)) + (p2 << BigInt(128)) + (p1 << BigInt(64)) + p0;
	}
	readI256() {
		const p0 = this.#view.getBigUint64(this.#offset, true);
		const p1 = this.#view.getBigUint64(this.#offset + 8, true);
		const p2 = this.#view.getBigUint64(this.#offset + 16, true);
		const p3 = this.#view.getBigInt64(this.#offset + 24, true);
		this.#offset += 32;
		return (p3 << BigInt(192)) + (p2 << BigInt(128)) + (p1 << BigInt(64)) + p0;
	}
	readF32() {
		const value = this.#view.getFloat32(this.#offset, true);
		this.#offset += 4;
		return value;
	}
	readF64() {
		const value = this.#view.getFloat64(this.#offset, true);
		this.#offset += 8;
		return value;
	}
	readString() {
		const uint8Array = this.readUInt8Array();
		return new TextDecoder("utf-8").decode(uint8Array);
	}
};
var import_base64_js = __toESM(require_base64_js());
var BinaryWriter = class {
	#buffer;
	#view;
	#offset = 0;
	constructor(size) {
		this.#buffer = new Uint8Array(size);
		this.#view = new DataView(this.#buffer.buffer);
	}
	#expandBuffer(additionalCapacity) {
		const minCapacity = this.#offset + additionalCapacity + 1;
		if (minCapacity <= this.#buffer.length) return;
		let newCapacity = this.#buffer.length * 2;
		if (newCapacity < minCapacity) newCapacity = minCapacity;
		const newBuffer = new Uint8Array(newCapacity);
		newBuffer.set(this.#buffer);
		this.#buffer = newBuffer;
		this.#view = new DataView(this.#buffer.buffer);
	}
	toBase64() {
		return (0, import_base64_js.fromByteArray)(this.#buffer.subarray(0, this.#offset));
	}
	getBuffer() {
		return this.#buffer.slice(0, this.#offset);
	}
	get offset() {
		return this.#offset;
	}
	writeUInt8Array(value) {
		const length = value.length;
		this.#expandBuffer(4 + length);
		this.writeU32(length);
		this.#buffer.set(value, this.#offset);
		this.#offset += value.length;
	}
	writeBool(value) {
		this.#expandBuffer(1);
		this.#view.setUint8(this.#offset, value ? 1 : 0);
		this.#offset += 1;
	}
	writeByte(value) {
		this.#expandBuffer(1);
		this.#view.setUint8(this.#offset, value);
		this.#offset += 1;
	}
	writeI8(value) {
		this.#expandBuffer(1);
		this.#view.setInt8(this.#offset, value);
		this.#offset += 1;
	}
	writeU8(value) {
		this.#expandBuffer(1);
		this.#view.setUint8(this.#offset, value);
		this.#offset += 1;
	}
	writeI16(value) {
		this.#expandBuffer(2);
		this.#view.setInt16(this.#offset, value, true);
		this.#offset += 2;
	}
	writeU16(value) {
		this.#expandBuffer(2);
		this.#view.setUint16(this.#offset, value, true);
		this.#offset += 2;
	}
	writeI32(value) {
		this.#expandBuffer(4);
		this.#view.setInt32(this.#offset, value, true);
		this.#offset += 4;
	}
	writeU32(value) {
		this.#expandBuffer(4);
		this.#view.setUint32(this.#offset, value, true);
		this.#offset += 4;
	}
	writeI64(value) {
		this.#expandBuffer(8);
		this.#view.setBigInt64(this.#offset, value, true);
		this.#offset += 8;
	}
	writeU64(value) {
		this.#expandBuffer(8);
		this.#view.setBigUint64(this.#offset, value, true);
		this.#offset += 8;
	}
	writeU128(value) {
		this.#expandBuffer(16);
		const lowerPart = value & BigInt("0xFFFFFFFFFFFFFFFF");
		const upperPart = value >> BigInt(64);
		this.#view.setBigUint64(this.#offset, lowerPart, true);
		this.#view.setBigUint64(this.#offset + 8, upperPart, true);
		this.#offset += 16;
	}
	writeI128(value) {
		this.#expandBuffer(16);
		const lowerPart = value & BigInt("0xFFFFFFFFFFFFFFFF");
		const upperPart = value >> BigInt(64);
		this.#view.setBigInt64(this.#offset, lowerPart, true);
		this.#view.setBigInt64(this.#offset + 8, upperPart, true);
		this.#offset += 16;
	}
	writeU256(value) {
		this.#expandBuffer(32);
		const low_64_mask = BigInt("0xFFFFFFFFFFFFFFFF");
		const p0 = value & low_64_mask;
		const p1 = value >> BigInt(64) & low_64_mask;
		const p2 = value >> BigInt(128) & low_64_mask;
		const p3 = value >> BigInt(192);
		this.#view.setBigUint64(this.#offset + 0, p0, true);
		this.#view.setBigUint64(this.#offset + 8, p1, true);
		this.#view.setBigUint64(this.#offset + 16, p2, true);
		this.#view.setBigUint64(this.#offset + 24, p3, true);
		this.#offset += 32;
	}
	writeI256(value) {
		this.#expandBuffer(32);
		const low_64_mask = BigInt("0xFFFFFFFFFFFFFFFF");
		const p0 = value & low_64_mask;
		const p1 = value >> BigInt(64) & low_64_mask;
		const p2 = value >> BigInt(128) & low_64_mask;
		const p3 = value >> BigInt(192);
		this.#view.setBigUint64(this.#offset + 0, p0, true);
		this.#view.setBigUint64(this.#offset + 8, p1, true);
		this.#view.setBigUint64(this.#offset + 16, p2, true);
		this.#view.setBigInt64(this.#offset + 24, p3, true);
		this.#offset += 32;
	}
	writeF32(value) {
		this.#expandBuffer(4);
		this.#view.setFloat32(this.#offset, value, true);
		this.#offset += 4;
	}
	writeF64(value) {
		this.#expandBuffer(8);
		this.#view.setFloat64(this.#offset, value, true);
		this.#offset += 8;
	}
	writeString(value) {
		const encodedString = new TextEncoder().encode(value);
		this.writeU32(encodedString.length);
		this.#expandBuffer(encodedString.length);
		this.#buffer.set(encodedString, this.#offset);
		this.#offset += encodedString.length;
	}
};
function toPascalCase(s) {
	const str = s.replace(/([-_][a-z])/gi, ($1) => {
		return $1.toUpperCase().replace("-", "").replace("_", "");
	});
	return str.charAt(0).toUpperCase() + str.slice(1);
}
function uint8ArrayToHexString(array) {
	return Array.prototype.map.call(array.reverse(), (x) => ("00" + x.toString(16)).slice(-2)).join("");
}
function uint8ArrayToU128(array) {
	if (array.length != 16) throw new Error(`Uint8Array is not 16 bytes long: ${array}`);
	return new BinaryReader(array).readU128();
}
function uint8ArrayToU256(array) {
	if (array.length != 32) throw new Error(`Uint8Array is not 32 bytes long: [${array}]`);
	return new BinaryReader(array).readU256();
}
function hexStringToUint8Array(str) {
	if (str.startsWith("0x")) str = str.slice(2);
	const matches = str.match(/.{1,2}/g) || [];
	return Uint8Array.from(matches.map((byte) => parseInt(byte, 16))).reverse();
}
function hexStringToU128(str) {
	return uint8ArrayToU128(hexStringToUint8Array(str));
}
function hexStringToU256(str) {
	return uint8ArrayToU256(hexStringToUint8Array(str));
}
function u128ToUint8Array(data) {
	const writer = new BinaryWriter(16);
	writer.writeU128(data);
	return writer.getBuffer();
}
function u128ToHexString(data) {
	return uint8ArrayToHexString(u128ToUint8Array(data));
}
function u256ToUint8Array(data) {
	const writer = new BinaryWriter(32);
	writer.writeU256(data);
	return writer.getBuffer();
}
function u256ToHexString(data) {
	return uint8ArrayToHexString(u256ToUint8Array(data));
}
function toCamelCase(str) {
	return str.replace(/[-_]+/g, "_").replace(/_([a-zA-Z0-9])/g, (_, c) => c.toUpperCase());
}
function bsatnBaseSize(typespace, ty) {
	const assumedArrayLength = 4;
	while (ty.tag === "Ref") ty = typespace.types[ty.value];
	if (ty.tag === "Product") {
		let sum = 0;
		for (const { algebraicType: elem } of ty.value.elements) sum += bsatnBaseSize(typespace, elem);
		return sum;
	} else if (ty.tag === "Sum") {
		let min = Infinity;
		for (const { algebraicType: vari } of ty.value.variants) {
			const vSize = bsatnBaseSize(typespace, vari);
			if (vSize < min) min = vSize;
		}
		if (min === Infinity) min = 0;
		return 4 + min;
	} else if (ty.tag == "Array") return 4 + assumedArrayLength * bsatnBaseSize(typespace, ty.value);
	return {
		String: 4 + assumedArrayLength,
		Sum: 1,
		Bool: 1,
		I8: 1,
		U8: 1,
		I16: 2,
		U16: 2,
		I32: 4,
		U32: 4,
		F32: 4,
		I64: 8,
		U64: 8,
		F64: 8,
		I128: 16,
		U128: 16,
		I256: 32,
		U256: 32
	}[ty.tag];
}
var ConnectionId = class _ConnectionId {
	__connection_id__;
	/**
	* Creates a new `ConnectionId`.
	*/
	constructor(data) {
		this.__connection_id__ = data;
	}
	/**
	* Get the algebraic type representation of the {@link ConnectionId} type.
	* @returns The algebraic type representation of the type.
	*/
	static getAlgebraicType() {
		return AlgebraicType.Product({ elements: [{
			name: "__connection_id__",
			algebraicType: AlgebraicType.U128
		}] });
	}
	isZero() {
		return this.__connection_id__ === BigInt(0);
	}
	static nullIfZero(addr) {
		if (addr.isZero()) return null;
		else return addr;
	}
	static random() {
		function randomU8() {
			return Math.floor(Math.random() * 255);
		}
		let result = BigInt(0);
		for (let i = 0; i < 16; i++) result = result << BigInt(8) | BigInt(randomU8());
		return new _ConnectionId(result);
	}
	/**
	* Compare two connection IDs for equality.
	*/
	isEqual(other) {
		return this.__connection_id__ == other.__connection_id__;
	}
	/**
	* Check if two connection IDs are equal.
	*/
	equals(other) {
		return this.isEqual(other);
	}
	/**
	* Print the connection ID as a hexadecimal string.
	*/
	toHexString() {
		return u128ToHexString(this.__connection_id__);
	}
	/**
	* Convert the connection ID to a Uint8Array.
	*/
	toUint8Array() {
		return u128ToUint8Array(this.__connection_id__);
	}
	/**
	* Parse a connection ID from a hexadecimal string.
	*/
	static fromString(str) {
		return new _ConnectionId(hexStringToU128(str));
	}
	static fromStringOrNull(str) {
		const addr = _ConnectionId.fromString(str);
		if (addr.isZero()) return null;
		else return addr;
	}
};
var Identity = class _Identity {
	__identity__;
	/**
	* Creates a new `Identity`.
	*
	* `data` can be a hexadecimal string or a `bigint`.
	*/
	constructor(data) {
		this.__identity__ = typeof data === "string" ? hexStringToU256(data) : data;
	}
	/**
	* Get the algebraic type representation of the {@link Identity} type.
	* @returns The algebraic type representation of the type.
	*/
	static getAlgebraicType() {
		return AlgebraicType.Product({ elements: [{
			name: "__identity__",
			algebraicType: AlgebraicType.U256
		}] });
	}
	/**
	* Check if two identities are equal.
	*/
	isEqual(other) {
		return this.toHexString() === other.toHexString();
	}
	/**
	* Check if two identities are equal.
	*/
	equals(other) {
		return this.isEqual(other);
	}
	/**
	* Print the identity as a hexadecimal string.
	*/
	toHexString() {
		return u256ToHexString(this.__identity__);
	}
	/**
	* Convert the address to a Uint8Array.
	*/
	toUint8Array() {
		return u256ToUint8Array(this.__identity__);
	}
	/**
	* Parse an Identity from a hexadecimal string.
	*/
	static fromString(str) {
		return new _Identity(str);
	}
	/**
	* Zero identity (0x0000000000000000000000000000000000000000000000000000000000000000)
	*/
	static zero() {
		return new _Identity(0n);
	}
	toString() {
		return this.toHexString();
	}
};
var AlgebraicType = {
	Ref: (value) => ({
		tag: "Ref",
		value
	}),
	Sum: (value) => ({
		tag: "Sum",
		value
	}),
	Product: (value) => ({
		tag: "Product",
		value
	}),
	Array: (value) => ({
		tag: "Array",
		value
	}),
	String: { tag: "String" },
	Bool: { tag: "Bool" },
	I8: { tag: "I8" },
	U8: { tag: "U8" },
	I16: { tag: "I16" },
	U16: { tag: "U16" },
	I32: { tag: "I32" },
	U32: { tag: "U32" },
	I64: { tag: "I64" },
	U64: { tag: "U64" },
	I128: { tag: "I128" },
	U128: { tag: "U128" },
	I256: { tag: "I256" },
	U256: { tag: "U256" },
	F32: { tag: "F32" },
	F64: { tag: "F64" },
	serializeValue(writer, ty, value, typespace) {
		if (ty.tag === "Ref") {
			if (!typespace) throw new Error("cannot serialize refs without a typespace");
			while (ty.tag === "Ref") ty = typespace.types[ty.value];
		}
		switch (ty.tag) {
			case "Product":
				ProductType.serializeValue(writer, ty.value, value, typespace);
				break;
			case "Sum":
				SumType.serializeValue(writer, ty.value, value, typespace);
				break;
			case "Array":
				if (ty.value.tag === "U8") writer.writeUInt8Array(value);
				else {
					const elemType = ty.value;
					writer.writeU32(value.length);
					for (const elem of value) AlgebraicType.serializeValue(writer, elemType, elem, typespace);
				}
				break;
			case "Bool":
				writer.writeBool(value);
				break;
			case "I8":
				writer.writeI8(value);
				break;
			case "U8":
				writer.writeU8(value);
				break;
			case "I16":
				writer.writeI16(value);
				break;
			case "U16":
				writer.writeU16(value);
				break;
			case "I32":
				writer.writeI32(value);
				break;
			case "U32":
				writer.writeU32(value);
				break;
			case "I64":
				writer.writeI64(value);
				break;
			case "U64":
				writer.writeU64(value);
				break;
			case "I128":
				writer.writeI128(value);
				break;
			case "U128":
				writer.writeU128(value);
				break;
			case "I256":
				writer.writeI256(value);
				break;
			case "U256":
				writer.writeU256(value);
				break;
			case "F32":
				writer.writeF32(value);
				break;
			case "F64":
				writer.writeF64(value);
				break;
			case "String":
				writer.writeString(value);
				break;
		}
	},
	deserializeValue: function(reader, ty, typespace) {
		if (ty.tag === "Ref") {
			if (!typespace) throw new Error("cannot deserialize refs without a typespace");
			while (ty.tag === "Ref") ty = typespace.types[ty.value];
		}
		switch (ty.tag) {
			case "Product": return ProductType.deserializeValue(reader, ty.value, typespace);
			case "Sum": return SumType.deserializeValue(reader, ty.value, typespace);
			case "Array": if (ty.value.tag === "U8") return reader.readUInt8Array();
			else {
				const elemType = ty.value;
				const length = reader.readU32();
				const result = [];
				for (let i = 0; i < length; i++) result.push(AlgebraicType.deserializeValue(reader, elemType, typespace));
				return result;
			}
			case "Bool": return reader.readBool();
			case "I8": return reader.readI8();
			case "U8": return reader.readU8();
			case "I16": return reader.readI16();
			case "U16": return reader.readU16();
			case "I32": return reader.readI32();
			case "U32": return reader.readU32();
			case "I64": return reader.readI64();
			case "U64": return reader.readU64();
			case "I128": return reader.readI128();
			case "U128": return reader.readU128();
			case "I256": return reader.readI256();
			case "U256": return reader.readU256();
			case "F32": return reader.readF32();
			case "F64": return reader.readF64();
			case "String": return reader.readString();
		}
	},
	intoMapKey: function(ty, value) {
		switch (ty.tag) {
			case "U8":
			case "U16":
			case "U32":
			case "U64":
			case "U128":
			case "U256":
			case "I8":
			case "I16":
			case "I32":
			case "I64":
			case "I128":
			case "I256":
			case "F32":
			case "F64":
			case "String":
			case "Bool": return value;
			case "Product": return ProductType.intoMapKey(ty.value, value);
			default: {
				const writer = new BinaryWriter(10);
				AlgebraicType.serializeValue(writer, ty, value);
				return writer.toBase64();
			}
		}
	}
};
var ProductType = {
	serializeValue(writer, ty, value, typespace) {
		for (const element of ty.elements) AlgebraicType.serializeValue(writer, element.algebraicType, value[element.name], typespace);
	},
	deserializeValue(reader, ty, typespace) {
		const result = {};
		if (ty.elements.length === 1) {
			if (ty.elements[0].name === "__time_duration_micros__") return new TimeDuration(reader.readI64());
			if (ty.elements[0].name === "__timestamp_micros_since_unix_epoch__") return new Timestamp(reader.readI64());
			if (ty.elements[0].name === "__identity__") return new Identity(reader.readU256());
			if (ty.elements[0].name === "__connection_id__") return new ConnectionId(reader.readU128());
			if (ty.elements[0].name === "__uuid__") return new Uuid(reader.readU128());
		}
		for (const element of ty.elements) result[element.name] = AlgebraicType.deserializeValue(reader, element.algebraicType, typespace);
		return result;
	},
	intoMapKey(ty, value) {
		if (ty.elements.length === 1) {
			if (ty.elements[0].name === "__time_duration_micros__") return value.__time_duration_micros__;
			if (ty.elements[0].name === "__timestamp_micros_since_unix_epoch__") return value.__timestamp_micros_since_unix_epoch__;
			if (ty.elements[0].name === "__identity__") return value.__identity__;
			if (ty.elements[0].name === "__connection_id__") return value.__connection_id__;
			if (ty.elements[0].name === "__uuid__") return value.__uuid__;
		}
		const writer = new BinaryWriter(10);
		AlgebraicType.serializeValue(writer, AlgebraicType.Product(ty), value);
		return writer.toBase64();
	}
};
var SumType = {
	serializeValue: function(writer, ty, value, typespace) {
		if (ty.variants.length == 2 && ty.variants[0].name === "some" && ty.variants[1].name === "none") if (value !== null && value !== void 0) {
			writer.writeByte(0);
			AlgebraicType.serializeValue(writer, ty.variants[0].algebraicType, value, typespace);
		} else writer.writeByte(1);
		else if (ty.variants.length == 2 && ty.variants[0].name === "ok" && ty.variants[1].name === "err") {
			let variantName;
			let innerValue;
			let index;
			if ("ok" in value) {
				variantName = "ok";
				innerValue = value.ok;
				index = 0;
			} else {
				variantName = "err";
				innerValue = value.err;
				index = 1;
			}
			if (index < 0) throw `Result serialization error: variant '${variantName}' not found in ${JSON.stringify(ty)}`;
			writer.writeU8(index);
			AlgebraicType.serializeValue(writer, ty.variants[index].algebraicType, innerValue, typespace);
		} else {
			const variant = value["tag"];
			const index = ty.variants.findIndex((v) => v.name === variant);
			if (index < 0) throw `Can't serialize a sum type, couldn't find ${value.tag} tag ${JSON.stringify(value)} in variants ${JSON.stringify(ty)}`;
			writer.writeU8(index);
			AlgebraicType.serializeValue(writer, ty.variants[index].algebraicType, value["value"], typespace);
		}
	},
	deserializeValue: function(reader, ty, typespace) {
		const tag = reader.readU8();
		if (ty.variants.length == 2 && ty.variants[0].name === "some" && ty.variants[1].name === "none") if (tag === 0) return AlgebraicType.deserializeValue(reader, ty.variants[0].algebraicType, typespace);
		else if (tag === 1) return;
		else throw `Can't deserialize an option type, couldn't find ${tag} tag`;
		else if (ty.variants.length == 2 && ty.variants[0].name === "ok" && ty.variants[1].name === "err") if (tag === 0) return { ok: AlgebraicType.deserializeValue(reader, ty.variants[0].algebraicType, typespace) };
		else if (tag === 1) return { err: AlgebraicType.deserializeValue(reader, ty.variants[1].algebraicType, typespace) };
		else throw `Can't deserialize a result type, couldn't find ${tag} tag`;
		else {
			const variant = ty.variants[tag];
			const value = AlgebraicType.deserializeValue(reader, variant.algebraicType, typespace);
			return {
				tag: variant.name,
				value
			};
		}
	}
};
var Option = { getAlgebraicType(innerType) {
	return AlgebraicType.Sum({ variants: [{
		name: "some",
		algebraicType: innerType
	}, {
		name: "none",
		algebraicType: AlgebraicType.Product({ elements: [] })
	}] });
} };
var Result = { getAlgebraicType(okType, errType) {
	return AlgebraicType.Sum({ variants: [{
		name: "ok",
		algebraicType: okType
	}, {
		name: "err",
		algebraicType: errType
	}] });
} };
var ScheduleAt = {
	interval(value) {
		return Interval(value);
	},
	time(value) {
		return Time(value);
	},
	getAlgebraicType() {
		return AlgebraicType.Sum({ variants: [{
			name: "Interval",
			algebraicType: TimeDuration.getAlgebraicType()
		}, {
			name: "Time",
			algebraicType: Timestamp.getAlgebraicType()
		}] });
	},
	isScheduleAt(algebraicType) {
		if (algebraicType.tag !== "Sum") return false;
		const variants = algebraicType.value.variants;
		if (variants.length !== 2) return false;
		const intervalVariant = variants.find((v) => v.name === "Interval");
		const timeVariant = variants.find((v) => v.name === "Time");
		if (!intervalVariant || !timeVariant) return false;
		return TimeDuration.isTimeDuration(intervalVariant.algebraicType) && Timestamp.isTimestamp(timeVariant.algebraicType);
	}
};
var Interval = (micros) => ({
	tag: "Interval",
	value: new TimeDuration(micros)
});
var Time = (microsSinceUnixEpoch) => ({
	tag: "Time",
	value: new Timestamp(microsSinceUnixEpoch)
});
var schedule_at_default = ScheduleAt;
function set(x, t2) {
	return {
		...x,
		...t2
	};
}
var TypeBuilder = class {
	/**
	* The TypeScript phantom type. This is not stored at runtime,
	* but is visible to the compiler
	*/
	type;
	/**
	* The SpacetimeDB algebraic type (run‑time value). In addition to storing
	* the runtime representation of the `AlgebraicType`, it also captures
	* the TypeScript type information of the `AlgebraicType`. That is to say
	* the value is not merely an `AlgebraicType`, but is constructed to be
	* the corresponding concrete `AlgebraicType` for the TypeScript type `Type`.
	*
	* e.g. `string` corresponds to `AlgebraicType.String`
	*/
	algebraicType;
	constructor(algebraicType) {
		this.algebraicType = algebraicType;
	}
	optional() {
		return new OptionBuilder(this);
	}
	serialize(writer, value) {
		AlgebraicType.serializeValue(writer, this.algebraicType, value);
	}
	deserialize(reader) {
		return AlgebraicType.deserializeValue(reader, this.algebraicType);
	}
};
var U8Builder = class extends TypeBuilder {
	constructor() {
		super(AlgebraicType.U8);
	}
	index(algorithm = "btree") {
		return new U8ColumnBuilder(this, set(defaultMetadata, { indexType: algorithm }));
	}
	unique() {
		return new U8ColumnBuilder(this, set(defaultMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new U8ColumnBuilder(this, set(defaultMetadata, { isPrimaryKey: true }));
	}
	autoInc() {
		return new U8ColumnBuilder(this, set(defaultMetadata, { isAutoIncrement: true }));
	}
	default(value) {
		return new U8ColumnBuilder(this, set(defaultMetadata, { defaultValue: value }));
	}
	name(name) {
		return new U8ColumnBuilder(this, set(defaultMetadata, { name }));
	}
};
var U16Builder = class extends TypeBuilder {
	constructor() {
		super(AlgebraicType.U16);
	}
	index(algorithm = "btree") {
		return new U16ColumnBuilder(this, set(defaultMetadata, { indexType: algorithm }));
	}
	unique() {
		return new U16ColumnBuilder(this, set(defaultMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new U16ColumnBuilder(this, set(defaultMetadata, { isPrimaryKey: true }));
	}
	autoInc() {
		return new U16ColumnBuilder(this, set(defaultMetadata, { isAutoIncrement: true }));
	}
	default(value) {
		return new U16ColumnBuilder(this, set(defaultMetadata, { defaultValue: value }));
	}
	name(name) {
		return new U16ColumnBuilder(this, set(defaultMetadata, { name }));
	}
};
var U32Builder = class extends TypeBuilder {
	constructor() {
		super(AlgebraicType.U32);
	}
	index(algorithm = "btree") {
		return new U32ColumnBuilder(this, set(defaultMetadata, { indexType: algorithm }));
	}
	unique() {
		return new U32ColumnBuilder(this, set(defaultMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new U32ColumnBuilder(this, set(defaultMetadata, { isPrimaryKey: true }));
	}
	autoInc() {
		return new U32ColumnBuilder(this, set(defaultMetadata, { isAutoIncrement: true }));
	}
	default(value) {
		return new U32ColumnBuilder(this, set(defaultMetadata, { defaultValue: value }));
	}
	name(name) {
		return new U32ColumnBuilder(this, set(defaultMetadata, { name }));
	}
};
var U64Builder = class extends TypeBuilder {
	constructor() {
		super(AlgebraicType.U64);
	}
	index(algorithm = "btree") {
		return new U64ColumnBuilder(this, set(defaultMetadata, { indexType: algorithm }));
	}
	unique() {
		return new U64ColumnBuilder(this, set(defaultMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new U64ColumnBuilder(this, set(defaultMetadata, { isPrimaryKey: true }));
	}
	autoInc() {
		return new U64ColumnBuilder(this, set(defaultMetadata, { isAutoIncrement: true }));
	}
	default(value) {
		return new U64ColumnBuilder(this, set(defaultMetadata, { defaultValue: value }));
	}
	name(name) {
		return new U64ColumnBuilder(this, set(defaultMetadata, { name }));
	}
};
var U128Builder = class extends TypeBuilder {
	constructor() {
		super(AlgebraicType.U128);
	}
	index(algorithm = "btree") {
		return new U128ColumnBuilder(this, set(defaultMetadata, { indexType: algorithm }));
	}
	unique() {
		return new U128ColumnBuilder(this, set(defaultMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new U128ColumnBuilder(this, set(defaultMetadata, { isPrimaryKey: true }));
	}
	autoInc() {
		return new U128ColumnBuilder(this, set(defaultMetadata, { isAutoIncrement: true }));
	}
	default(value) {
		return new U128ColumnBuilder(this, set(defaultMetadata, { defaultValue: value }));
	}
	name(name) {
		return new U128ColumnBuilder(this, set(defaultMetadata, { name }));
	}
};
var U256Builder = class extends TypeBuilder {
	constructor() {
		super(AlgebraicType.U256);
	}
	index(algorithm = "btree") {
		return new U256ColumnBuilder(this, set(defaultMetadata, { indexType: algorithm }));
	}
	unique() {
		return new U256ColumnBuilder(this, set(defaultMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new U256ColumnBuilder(this, set(defaultMetadata, { isPrimaryKey: true }));
	}
	autoInc() {
		return new U256ColumnBuilder(this, set(defaultMetadata, { isAutoIncrement: true }));
	}
	default(value) {
		return new U256ColumnBuilder(this, set(defaultMetadata, { defaultValue: value }));
	}
	name(name) {
		return new U256ColumnBuilder(this, set(defaultMetadata, { name }));
	}
};
var I8Builder = class extends TypeBuilder {
	constructor() {
		super(AlgebraicType.I8);
	}
	index(algorithm = "btree") {
		return new I8ColumnBuilder(this, set(defaultMetadata, { indexType: algorithm }));
	}
	unique() {
		return new I8ColumnBuilder(this, set(defaultMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new I8ColumnBuilder(this, set(defaultMetadata, { isPrimaryKey: true }));
	}
	autoInc() {
		return new I8ColumnBuilder(this, set(defaultMetadata, { isAutoIncrement: true }));
	}
	default(value) {
		return new I8ColumnBuilder(this, set(defaultMetadata, { defaultValue: value }));
	}
	name(name) {
		return new I8ColumnBuilder(this, set(defaultMetadata, { name }));
	}
};
var I16Builder = class extends TypeBuilder {
	constructor() {
		super(AlgebraicType.I16);
	}
	index(algorithm = "btree") {
		return new I16ColumnBuilder(this, set(defaultMetadata, { indexType: algorithm }));
	}
	unique() {
		return new I16ColumnBuilder(this, set(defaultMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new I16ColumnBuilder(this, set(defaultMetadata, { isPrimaryKey: true }));
	}
	autoInc() {
		return new I16ColumnBuilder(this, set(defaultMetadata, { isAutoIncrement: true }));
	}
	default(value) {
		return new I16ColumnBuilder(this, set(defaultMetadata, { defaultValue: value }));
	}
	name(name) {
		return new I16ColumnBuilder(this, set(defaultMetadata, { name }));
	}
};
var I32Builder = class extends TypeBuilder {
	constructor() {
		super(AlgebraicType.I32);
	}
	index(algorithm = "btree") {
		return new I32ColumnBuilder(this, set(defaultMetadata, { indexType: algorithm }));
	}
	unique() {
		return new I32ColumnBuilder(this, set(defaultMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new I32ColumnBuilder(this, set(defaultMetadata, { isPrimaryKey: true }));
	}
	autoInc() {
		return new I32ColumnBuilder(this, set(defaultMetadata, { isAutoIncrement: true }));
	}
	default(value) {
		return new I32ColumnBuilder(this, set(defaultMetadata, { defaultValue: value }));
	}
	name(name) {
		return new I32ColumnBuilder(this, set(defaultMetadata, { name }));
	}
};
var I64Builder = class extends TypeBuilder {
	constructor() {
		super(AlgebraicType.I64);
	}
	index(algorithm = "btree") {
		return new I64ColumnBuilder(this, set(defaultMetadata, { indexType: algorithm }));
	}
	unique() {
		return new I64ColumnBuilder(this, set(defaultMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new I64ColumnBuilder(this, set(defaultMetadata, { isPrimaryKey: true }));
	}
	autoInc() {
		return new I64ColumnBuilder(this, set(defaultMetadata, { isAutoIncrement: true }));
	}
	default(value) {
		return new I64ColumnBuilder(this, set(defaultMetadata, { defaultValue: value }));
	}
	name(name) {
		return new I64ColumnBuilder(this, set(defaultMetadata, { name }));
	}
};
var I128Builder = class extends TypeBuilder {
	constructor() {
		super(AlgebraicType.I128);
	}
	index(algorithm = "btree") {
		return new I128ColumnBuilder(this, set(defaultMetadata, { indexType: algorithm }));
	}
	unique() {
		return new I128ColumnBuilder(this, set(defaultMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new I128ColumnBuilder(this, set(defaultMetadata, { isPrimaryKey: true }));
	}
	autoInc() {
		return new I128ColumnBuilder(this, set(defaultMetadata, { isAutoIncrement: true }));
	}
	default(value) {
		return new I128ColumnBuilder(this, set(defaultMetadata, { defaultValue: value }));
	}
	name(name) {
		return new I128ColumnBuilder(this, set(defaultMetadata, { name }));
	}
};
var I256Builder = class extends TypeBuilder {
	constructor() {
		super(AlgebraicType.I256);
	}
	index(algorithm = "btree") {
		return new I256ColumnBuilder(this, set(defaultMetadata, { indexType: algorithm }));
	}
	unique() {
		return new I256ColumnBuilder(this, set(defaultMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new I256ColumnBuilder(this, set(defaultMetadata, { isPrimaryKey: true }));
	}
	autoInc() {
		return new I256ColumnBuilder(this, set(defaultMetadata, { isAutoIncrement: true }));
	}
	default(value) {
		return new I256ColumnBuilder(this, set(defaultMetadata, { defaultValue: value }));
	}
	name(name) {
		return new I256ColumnBuilder(this, set(defaultMetadata, { name }));
	}
};
var F32Builder = class extends TypeBuilder {
	constructor() {
		super(AlgebraicType.F32);
	}
	default(value) {
		return new F32ColumnBuilder(this, set(defaultMetadata, { defaultValue: value }));
	}
	name(name) {
		return new F32ColumnBuilder(this, set(defaultMetadata, { name }));
	}
};
var F64Builder = class extends TypeBuilder {
	constructor() {
		super(AlgebraicType.F64);
	}
	default(value) {
		return new F64ColumnBuilder(this, set(defaultMetadata, { defaultValue: value }));
	}
	name(name) {
		return new F64ColumnBuilder(this, set(defaultMetadata, { name }));
	}
};
var BoolBuilder = class extends TypeBuilder {
	constructor() {
		super(AlgebraicType.Bool);
	}
	index(algorithm = "btree") {
		return new BoolColumnBuilder(this, set(defaultMetadata, { indexType: algorithm }));
	}
	unique() {
		return new BoolColumnBuilder(this, set(defaultMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new BoolColumnBuilder(this, set(defaultMetadata, { isPrimaryKey: true }));
	}
	default(value) {
		return new BoolColumnBuilder(this, set(defaultMetadata, { defaultValue: value }));
	}
	name(name) {
		return new BoolColumnBuilder(this, set(defaultMetadata, { name }));
	}
};
var StringBuilder = class extends TypeBuilder {
	constructor() {
		super(AlgebraicType.String);
	}
	index(algorithm = "btree") {
		return new StringColumnBuilder(this, set(defaultMetadata, { indexType: algorithm }));
	}
	unique() {
		return new StringColumnBuilder(this, set(defaultMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new StringColumnBuilder(this, set(defaultMetadata, { isPrimaryKey: true }));
	}
	default(value) {
		return new StringColumnBuilder(this, set(defaultMetadata, { defaultValue: value }));
	}
	name(name) {
		return new StringColumnBuilder(this, set(defaultMetadata, { name }));
	}
};
var ArrayBuilder = class extends TypeBuilder {
	element;
	constructor(element) {
		super(AlgebraicType.Array(element.algebraicType));
		this.element = element;
	}
	default(value) {
		return new ArrayColumnBuilder(this.element, set(defaultMetadata, { defaultValue: value }));
	}
	name(name) {
		return new ArrayColumnBuilder(this.element, set(defaultMetadata, { name }));
	}
};
var ByteArrayBuilder = class extends TypeBuilder {
	constructor() {
		super(AlgebraicType.Array(AlgebraicType.U8));
	}
	default(value) {
		return new ByteArrayColumnBuilder(set(defaultMetadata, { defaultValue: value }));
	}
	name(name) {
		return new ByteArrayColumnBuilder(set(defaultMetadata, { name }));
	}
};
var OptionBuilder = class extends TypeBuilder {
	value;
	constructor(value) {
		super(Option.getAlgebraicType(value.algebraicType));
		this.value = value;
	}
	default(value) {
		return new OptionColumnBuilder(this, set(defaultMetadata, { defaultValue: value }));
	}
	name(name) {
		return new OptionColumnBuilder(this, set(defaultMetadata, { name }));
	}
};
var ProductBuilder = class extends TypeBuilder {
	typeName;
	elements;
	constructor(elements, name) {
		function elementsArrayFromElementsObj(obj) {
			return Object.keys(obj).map((key) => ({
				name: key,
				get algebraicType() {
					return obj[key].algebraicType;
				}
			}));
		}
		super(AlgebraicType.Product({ elements: elementsArrayFromElementsObj(elements) }));
		this.typeName = name;
		this.elements = elements;
	}
	default(value) {
		return new ProductColumnBuilder(this, set(defaultMetadata, { defaultValue: value }));
	}
	name(name) {
		return new ProductColumnBuilder(this, set(defaultMetadata, { name }));
	}
};
var ResultBuilder = class extends TypeBuilder {
	ok;
	err;
	constructor(ok, err) {
		super(Result.getAlgebraicType(ok.algebraicType, err.algebraicType));
		this.ok = ok;
		this.err = err;
	}
	default(value) {
		return new ResultColumnBuilder(this, set(defaultMetadata, { defaultValue: value }));
	}
};
var UnitBuilder = class extends TypeBuilder {
	constructor() {
		super({
			tag: "Product",
			value: { elements: [] }
		});
	}
};
var RowBuilder = class extends TypeBuilder {
	row;
	typeName;
	constructor(row, name) {
		const mappedRow = Object.fromEntries(Object.entries(row).map(([colName, builder]) => [colName, builder instanceof ColumnBuilder ? builder : new ColumnBuilder(builder, {})]));
		const elements = Object.keys(mappedRow).map((name2) => ({
			name: name2,
			get algebraicType() {
				return mappedRow[name2].typeBuilder.algebraicType;
			}
		}));
		super(AlgebraicType.Product({ elements }));
		this.row = mappedRow;
		this.typeName = name;
	}
};
var SumBuilderImpl = class extends TypeBuilder {
	variants;
	typeName;
	constructor(variants, name) {
		function variantsArrayFromVariantsObj(variants2) {
			return Object.keys(variants2).map((key) => ({
				name: key,
				get algebraicType() {
					return variants2[key].algebraicType;
				}
			}));
		}
		super(AlgebraicType.Sum({ variants: variantsArrayFromVariantsObj(variants) }));
		this.variants = variants;
		this.typeName = name;
		for (const key of Object.keys(variants)) {
			const desc = Object.getOwnPropertyDescriptor(variants, key);
			const isAccessor = !!desc && (typeof desc.get === "function" || typeof desc.set === "function");
			let isUnit2 = false;
			if (!isAccessor) isUnit2 = variants[key] instanceof UnitBuilder;
			if (isUnit2) {
				const constant = this.create(key);
				Object.defineProperty(this, key, {
					value: constant,
					writable: false,
					enumerable: true,
					configurable: false
				});
			} else {
				const fn = ((value) => this.create(key, value));
				Object.defineProperty(this, key, {
					value: fn,
					writable: false,
					enumerable: true,
					configurable: false
				});
			}
		}
	}
	create(tag, value) {
		return value === void 0 ? { tag } : {
			tag,
			value
		};
	}
	default(value) {
		return new SumColumnBuilder(this, set(defaultMetadata, { defaultValue: value }));
	}
	name(name) {
		return new SumColumnBuilder(this, set(defaultMetadata, { name }));
	}
};
var SumBuilder = SumBuilderImpl;
var SimpleSumBuilderImpl = class extends SumBuilderImpl {
	index(algorithm = "btree") {
		return new SimpleSumColumnBuilder(this, set(defaultMetadata, { indexType: algorithm }));
	}
	primaryKey() {
		return new SimpleSumColumnBuilder(this, set(defaultMetadata, { isPrimaryKey: true }));
	}
};
var ScheduleAtBuilder = class extends TypeBuilder {
	constructor() {
		super(schedule_at_default.getAlgebraicType());
	}
	default(value) {
		return new ScheduleAtColumnBuilder(this, set(defaultMetadata, { defaultValue: value }));
	}
	name(name) {
		return new ScheduleAtColumnBuilder(this, set(defaultMetadata, { name }));
	}
};
var IdentityBuilder = class extends TypeBuilder {
	constructor() {
		super(Identity.getAlgebraicType());
	}
	index(algorithm = "btree") {
		return new IdentityColumnBuilder(this, set(defaultMetadata, { indexType: algorithm }));
	}
	unique() {
		return new IdentityColumnBuilder(this, set(defaultMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new IdentityColumnBuilder(this, set(defaultMetadata, { isPrimaryKey: true }));
	}
	autoInc() {
		return new IdentityColumnBuilder(this, set(defaultMetadata, { isAutoIncrement: true }));
	}
	default(value) {
		return new IdentityColumnBuilder(this, set(defaultMetadata, { defaultValue: value }));
	}
	name(name) {
		return new IdentityColumnBuilder(this, set(defaultMetadata, { name }));
	}
};
var ConnectionIdBuilder = class extends TypeBuilder {
	constructor() {
		super(ConnectionId.getAlgebraicType());
	}
	index(algorithm = "btree") {
		return new ConnectionIdColumnBuilder(this, set(defaultMetadata, { indexType: algorithm }));
	}
	unique() {
		return new ConnectionIdColumnBuilder(this, set(defaultMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new ConnectionIdColumnBuilder(this, set(defaultMetadata, { isPrimaryKey: true }));
	}
	autoInc() {
		return new ConnectionIdColumnBuilder(this, set(defaultMetadata, { isAutoIncrement: true }));
	}
	default(value) {
		return new ConnectionIdColumnBuilder(this, set(defaultMetadata, { defaultValue: value }));
	}
	name(name) {
		return new ConnectionIdColumnBuilder(this, set(defaultMetadata, { name }));
	}
};
var TimestampBuilder = class extends TypeBuilder {
	constructor() {
		super(Timestamp.getAlgebraicType());
	}
	index(algorithm = "btree") {
		return new TimestampColumnBuilder(this, set(defaultMetadata, { indexType: algorithm }));
	}
	unique() {
		return new TimestampColumnBuilder(this, set(defaultMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new TimestampColumnBuilder(this, set(defaultMetadata, { isPrimaryKey: true }));
	}
	autoInc() {
		return new TimestampColumnBuilder(this, set(defaultMetadata, { isAutoIncrement: true }));
	}
	default(value) {
		return new TimestampColumnBuilder(this, set(defaultMetadata, { defaultValue: value }));
	}
	name(name) {
		return new TimestampColumnBuilder(this, set(defaultMetadata, { name }));
	}
};
var TimeDurationBuilder = class extends TypeBuilder {
	constructor() {
		super(TimeDuration.getAlgebraicType());
	}
	index(algorithm = "btree") {
		return new TimeDurationColumnBuilder(this, set(defaultMetadata, { indexType: algorithm }));
	}
	unique() {
		return new TimeDurationColumnBuilder(this, set(defaultMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new TimeDurationColumnBuilder(this, set(defaultMetadata, { isPrimaryKey: true }));
	}
	autoInc() {
		return new TimeDurationColumnBuilder(this, set(defaultMetadata, { isAutoIncrement: true }));
	}
	default(value) {
		return new TimeDurationColumnBuilder(this, set(defaultMetadata, { defaultValue: value }));
	}
	name(name) {
		return new TimeDurationColumnBuilder(this, set(defaultMetadata, { name }));
	}
};
var UuidBuilder = class extends TypeBuilder {
	constructor() {
		super(Uuid.getAlgebraicType());
	}
	index(algorithm = "btree") {
		return new UuidColumnBuilder(this, set(defaultMetadata, { indexType: algorithm }));
	}
	unique() {
		return new UuidColumnBuilder(this, set(defaultMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new UuidColumnBuilder(this, set(defaultMetadata, { isPrimaryKey: true }));
	}
	autoInc() {
		return new UuidColumnBuilder(this, set(defaultMetadata, { isAutoIncrement: true }));
	}
	default(value) {
		return new UuidColumnBuilder(this, set(defaultMetadata, { defaultValue: value }));
	}
};
var defaultMetadata = {};
var ColumnBuilder = class {
	typeBuilder;
	columnMetadata;
	constructor(typeBuilder, metadata) {
		this.typeBuilder = typeBuilder;
		this.columnMetadata = metadata;
	}
	serialize(writer, value) {
		AlgebraicType.serializeValue(writer, this.typeBuilder.algebraicType, value);
	}
	deserialize(reader) {
		return AlgebraicType.deserializeValue(reader, this.typeBuilder.algebraicType);
	}
};
var U8ColumnBuilder = class _U8ColumnBuilder extends ColumnBuilder {
	index(algorithm = "btree") {
		return new _U8ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { indexType: algorithm }));
	}
	unique() {
		return new _U8ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new _U8ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isPrimaryKey: true }));
	}
	autoInc() {
		return new _U8ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isAutoIncrement: true }));
	}
	default(value) {
		return new _U8ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { defaultValue: value }));
	}
	name(name) {
		return new _U8ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { name }));
	}
};
var U16ColumnBuilder = class _U16ColumnBuilder extends ColumnBuilder {
	index(algorithm = "btree") {
		return new _U16ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { indexType: algorithm }));
	}
	unique() {
		return new _U16ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new _U16ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isPrimaryKey: true }));
	}
	autoInc() {
		return new _U16ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isAutoIncrement: true }));
	}
	default(value) {
		return new _U16ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { defaultValue: value }));
	}
	name(name) {
		return new _U16ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { name }));
	}
};
var U32ColumnBuilder = class _U32ColumnBuilder extends ColumnBuilder {
	index(algorithm = "btree") {
		return new _U32ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { indexType: algorithm }));
	}
	unique() {
		return new _U32ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new _U32ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isPrimaryKey: true }));
	}
	autoInc() {
		return new _U32ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isAutoIncrement: true }));
	}
	default(value) {
		return new _U32ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { defaultValue: value }));
	}
	name(name) {
		return new _U32ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { name }));
	}
};
var U64ColumnBuilder = class _U64ColumnBuilder extends ColumnBuilder {
	index(algorithm = "btree") {
		return new _U64ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { indexType: algorithm }));
	}
	unique() {
		return new _U64ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new _U64ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isPrimaryKey: true }));
	}
	autoInc() {
		return new _U64ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isAutoIncrement: true }));
	}
	default(value) {
		return new _U64ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { defaultValue: value }));
	}
	name(name) {
		return new _U64ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { name }));
	}
};
var U128ColumnBuilder = class _U128ColumnBuilder extends ColumnBuilder {
	index(algorithm = "btree") {
		return new _U128ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { indexType: algorithm }));
	}
	unique() {
		return new _U128ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new _U128ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isPrimaryKey: true }));
	}
	autoInc() {
		return new _U128ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isAutoIncrement: true }));
	}
	default(value) {
		return new _U128ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { defaultValue: value }));
	}
	name(name) {
		return new _U128ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { name }));
	}
};
var U256ColumnBuilder = class _U256ColumnBuilder extends ColumnBuilder {
	index(algorithm = "btree") {
		return new _U256ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { indexType: algorithm }));
	}
	unique() {
		return new _U256ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new _U256ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isPrimaryKey: true }));
	}
	autoInc() {
		return new _U256ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isAutoIncrement: true }));
	}
	default(value) {
		return new _U256ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { defaultValue: value }));
	}
	name(name) {
		return new _U256ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { name }));
	}
};
var I8ColumnBuilder = class _I8ColumnBuilder extends ColumnBuilder {
	index(algorithm = "btree") {
		return new _I8ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { indexType: algorithm }));
	}
	unique() {
		return new _I8ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new _I8ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isPrimaryKey: true }));
	}
	autoInc() {
		return new _I8ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isAutoIncrement: true }));
	}
	default(value) {
		return new _I8ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { defaultValue: value }));
	}
	name(name) {
		return new _I8ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { name }));
	}
};
var I16ColumnBuilder = class _I16ColumnBuilder extends ColumnBuilder {
	index(algorithm = "btree") {
		return new _I16ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { indexType: algorithm }));
	}
	unique() {
		return new _I16ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new _I16ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isPrimaryKey: true }));
	}
	autoInc() {
		return new _I16ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isAutoIncrement: true }));
	}
	default(value) {
		return new _I16ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { defaultValue: value }));
	}
	name(name) {
		return new _I16ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { name }));
	}
};
var I32ColumnBuilder = class _I32ColumnBuilder extends ColumnBuilder {
	index(algorithm = "btree") {
		return new _I32ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { indexType: algorithm }));
	}
	unique() {
		return new _I32ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new _I32ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isPrimaryKey: true }));
	}
	autoInc() {
		return new _I32ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isAutoIncrement: true }));
	}
	default(value) {
		return new _I32ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { defaultValue: value }));
	}
	name(name) {
		return new _I32ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { name }));
	}
};
var I64ColumnBuilder = class _I64ColumnBuilder extends ColumnBuilder {
	index(algorithm = "btree") {
		return new _I64ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { indexType: algorithm }));
	}
	unique() {
		return new _I64ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new _I64ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isPrimaryKey: true }));
	}
	autoInc() {
		return new _I64ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isAutoIncrement: true }));
	}
	default(value) {
		return new _I64ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { defaultValue: value }));
	}
	name(name) {
		return new _I64ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { name }));
	}
};
var I128ColumnBuilder = class _I128ColumnBuilder extends ColumnBuilder {
	index(algorithm = "btree") {
		return new _I128ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { indexType: algorithm }));
	}
	unique() {
		return new _I128ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new _I128ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isPrimaryKey: true }));
	}
	autoInc() {
		return new _I128ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isAutoIncrement: true }));
	}
	default(value) {
		return new _I128ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { defaultValue: value }));
	}
	name(name) {
		return new _I128ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { name }));
	}
};
var I256ColumnBuilder = class _I256ColumnBuilder extends ColumnBuilder {
	index(algorithm = "btree") {
		return new _I256ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { indexType: algorithm }));
	}
	unique() {
		return new _I256ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new _I256ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isPrimaryKey: true }));
	}
	autoInc() {
		return new _I256ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isAutoIncrement: true }));
	}
	default(value) {
		return new _I256ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { defaultValue: value }));
	}
	name(name) {
		return new _I256ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { name }));
	}
};
var F32ColumnBuilder = class _F32ColumnBuilder extends ColumnBuilder {
	default(value) {
		return new _F32ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { defaultValue: value }));
	}
	name(name) {
		return new _F32ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { name }));
	}
};
var F64ColumnBuilder = class _F64ColumnBuilder extends ColumnBuilder {
	default(value) {
		return new _F64ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { defaultValue: value }));
	}
	name(name) {
		return new _F64ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { name }));
	}
};
var BoolColumnBuilder = class _BoolColumnBuilder extends ColumnBuilder {
	index(algorithm = "btree") {
		return new _BoolColumnBuilder(this.typeBuilder, set(this.columnMetadata, { indexType: algorithm }));
	}
	unique() {
		return new _BoolColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new _BoolColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isPrimaryKey: true }));
	}
	default(value) {
		return new _BoolColumnBuilder(this.typeBuilder, set(this.columnMetadata, { defaultValue: value }));
	}
	name(name) {
		return new _BoolColumnBuilder(this.typeBuilder, set(this.columnMetadata, { name }));
	}
};
var StringColumnBuilder = class _StringColumnBuilder extends ColumnBuilder {
	index(algorithm = "btree") {
		return new _StringColumnBuilder(this.typeBuilder, set(this.columnMetadata, { indexType: algorithm }));
	}
	unique() {
		return new _StringColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new _StringColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isPrimaryKey: true }));
	}
	default(value) {
		return new _StringColumnBuilder(this.typeBuilder, set(this.columnMetadata, { defaultValue: value }));
	}
	name(name) {
		return new _StringColumnBuilder(this.typeBuilder, set(this.columnMetadata, { name }));
	}
};
var ArrayColumnBuilder = class _ArrayColumnBuilder extends ColumnBuilder {
	default(value) {
		return new _ArrayColumnBuilder(this.typeBuilder, set(this.columnMetadata, { defaultValue: value }));
	}
	name(name) {
		return new _ArrayColumnBuilder(this.typeBuilder, set(this.columnMetadata, { name }));
	}
};
var ByteArrayColumnBuilder = class _ByteArrayColumnBuilder extends ColumnBuilder {
	constructor(metadata) {
		super(new TypeBuilder(AlgebraicType.Array(AlgebraicType.U8)), metadata);
	}
	default(value) {
		return new _ByteArrayColumnBuilder(set(this.columnMetadata, { defaultValue: value }));
	}
	name(name) {
		return new _ByteArrayColumnBuilder(set(this.columnMetadata, { name }));
	}
};
var OptionColumnBuilder = class _OptionColumnBuilder extends ColumnBuilder {
	default(value) {
		return new _OptionColumnBuilder(this.typeBuilder, set(this.columnMetadata, { defaultValue: value }));
	}
	name(name) {
		return new _OptionColumnBuilder(this.typeBuilder, set(this.columnMetadata, { name }));
	}
};
var ResultColumnBuilder = class _ResultColumnBuilder extends ColumnBuilder {
	constructor(typeBuilder, metadata) {
		super(typeBuilder, metadata);
	}
	default(value) {
		return new _ResultColumnBuilder(this.typeBuilder, set(this.columnMetadata, { defaultValue: value }));
	}
};
var ProductColumnBuilder = class _ProductColumnBuilder extends ColumnBuilder {
	default(value) {
		return new _ProductColumnBuilder(this.typeBuilder, set(this.columnMetadata, { defaultValue: value }));
	}
	name(name) {
		return new _ProductColumnBuilder(this.typeBuilder, set(this.columnMetadata, { name }));
	}
};
var SumColumnBuilder = class _SumColumnBuilder extends ColumnBuilder {
	default(value) {
		return new _SumColumnBuilder(this.typeBuilder, set(this.columnMetadata, { defaultValue: value }));
	}
	name(name) {
		return new _SumColumnBuilder(this.typeBuilder, set(this.columnMetadata, { name }));
	}
};
var SimpleSumColumnBuilder = class _SimpleSumColumnBuilder extends SumColumnBuilder {
	index(algorithm = "btree") {
		return new _SimpleSumColumnBuilder(this.typeBuilder, set(this.columnMetadata, { indexType: algorithm }));
	}
	primaryKey() {
		return new _SimpleSumColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isPrimaryKey: true }));
	}
};
var ScheduleAtColumnBuilder = class _ScheduleAtColumnBuilder extends ColumnBuilder {
	default(value) {
		return new _ScheduleAtColumnBuilder(this.typeBuilder, set(this.columnMetadata, { defaultValue: value }));
	}
	name(name) {
		return new _ScheduleAtColumnBuilder(this.typeBuilder, set(this.columnMetadata, { name }));
	}
};
var IdentityColumnBuilder = class _IdentityColumnBuilder extends ColumnBuilder {
	index(algorithm = "btree") {
		return new _IdentityColumnBuilder(this.typeBuilder, set(this.columnMetadata, { indexType: algorithm }));
	}
	unique() {
		return new _IdentityColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new _IdentityColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isPrimaryKey: true }));
	}
	default(value) {
		return new _IdentityColumnBuilder(this.typeBuilder, set(this.columnMetadata, { defaultValue: value }));
	}
	name(name) {
		return new _IdentityColumnBuilder(this.typeBuilder, set(this.columnMetadata, { name }));
	}
};
var ConnectionIdColumnBuilder = class _ConnectionIdColumnBuilder extends ColumnBuilder {
	index(algorithm = "btree") {
		return new _ConnectionIdColumnBuilder(this.typeBuilder, set(this.columnMetadata, { indexType: algorithm }));
	}
	unique() {
		return new _ConnectionIdColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new _ConnectionIdColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isPrimaryKey: true }));
	}
	default(value) {
		return new _ConnectionIdColumnBuilder(this.typeBuilder, set(this.columnMetadata, { defaultValue: value }));
	}
	name(name) {
		return new _ConnectionIdColumnBuilder(this.typeBuilder, set(this.columnMetadata, { name }));
	}
};
var TimestampColumnBuilder = class _TimestampColumnBuilder extends ColumnBuilder {
	index(algorithm = "btree") {
		return new _TimestampColumnBuilder(this.typeBuilder, set(this.columnMetadata, { indexType: algorithm }));
	}
	unique() {
		return new _TimestampColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new _TimestampColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isPrimaryKey: true }));
	}
	default(value) {
		return new _TimestampColumnBuilder(this.typeBuilder, set(this.columnMetadata, { defaultValue: value }));
	}
	name(name) {
		return new _TimestampColumnBuilder(this.typeBuilder, set(this.columnMetadata, { name }));
	}
};
var TimeDurationColumnBuilder = class _TimeDurationColumnBuilder extends ColumnBuilder {
	index(algorithm = "btree") {
		return new _TimeDurationColumnBuilder(this.typeBuilder, set(this.columnMetadata, { indexType: algorithm }));
	}
	unique() {
		return new _TimeDurationColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new _TimeDurationColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isPrimaryKey: true }));
	}
	default(value) {
		return new _TimeDurationColumnBuilder(this.typeBuilder, set(this.columnMetadata, { defaultValue: value }));
	}
	name(name) {
		return new _TimeDurationColumnBuilder(this.typeBuilder, set(this.columnMetadata, { name }));
	}
};
var UuidColumnBuilder = class _UuidColumnBuilder extends ColumnBuilder {
	index(algorithm = "btree") {
		return new _UuidColumnBuilder(this.typeBuilder, set(this.columnMetadata, { indexType: algorithm }));
	}
	unique() {
		return new _UuidColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new _UuidColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isPrimaryKey: true }));
	}
	default(value) {
		return new _UuidColumnBuilder(this.typeBuilder, set(this.columnMetadata, { defaultValue: value }));
	}
};
var RefBuilder = class extends TypeBuilder {
	ref;
	/** The phantom type of the pointee of this ref. */
	__spacetimeType;
	constructor(ref) {
		super(AlgebraicType.Ref(ref));
		this.ref = ref;
	}
};
var enumImpl = ((nameOrObj, maybeObj) => {
	let obj = nameOrObj;
	let name = void 0;
	if (typeof nameOrObj === "string") {
		if (!maybeObj) throw new TypeError("When providing a name, you must also provide the variants object or array.");
		obj = maybeObj;
		name = nameOrObj;
	}
	if (Array.isArray(obj)) {
		const simpleVariantsObj = {};
		for (const variant of obj) simpleVariantsObj[variant] = new UnitBuilder();
		return new SimpleSumBuilderImpl(simpleVariantsObj, name);
	}
	return new SumBuilder(obj, name);
});
var t = {
	bool: () => new BoolBuilder(),
	string: () => new StringBuilder(),
	number: () => new F64Builder(),
	i8: () => new I8Builder(),
	u8: () => new U8Builder(),
	i16: () => new I16Builder(),
	u16: () => new U16Builder(),
	i32: () => new I32Builder(),
	u32: () => new U32Builder(),
	i64: () => new I64Builder(),
	u64: () => new U64Builder(),
	i128: () => new I128Builder(),
	u128: () => new U128Builder(),
	i256: () => new I256Builder(),
	u256: () => new U256Builder(),
	f32: () => new F32Builder(),
	f64: () => new F64Builder(),
	object: ((nameOrObj, maybeObj) => {
		if (typeof nameOrObj === "string") {
			if (!maybeObj) throw new TypeError("When providing a name, you must also provide the object.");
			return new ProductBuilder(maybeObj, nameOrObj);
		}
		return new ProductBuilder(nameOrObj, void 0);
	}),
	row: ((nameOrObj, maybeObj) => {
		const [obj, name] = typeof nameOrObj === "string" ? [maybeObj, nameOrObj] : [nameOrObj, void 0];
		return new RowBuilder(obj, name);
	}),
	array(e) {
		return new ArrayBuilder(e);
	},
	enum: enumImpl,
	unit() {
		return new UnitBuilder();
	},
	lazy(thunk) {
		let cached = null;
		const get = () => cached ??= thunk();
		return new Proxy({}, {
			get(_t, prop, recv) {
				const target = get();
				const val = Reflect.get(target, prop, recv);
				return typeof val === "function" ? val.bind(target) : val;
			},
			set(_t, prop, value, recv) {
				return Reflect.set(get(), prop, value, recv);
			},
			has(_t, prop) {
				return prop in get();
			},
			ownKeys() {
				return Reflect.ownKeys(get());
			},
			getOwnPropertyDescriptor(_t, prop) {
				return Object.getOwnPropertyDescriptor(get(), prop);
			},
			getPrototypeOf() {
				return Object.getPrototypeOf(get());
			}
		});
	},
	scheduleAt: () => {
		return new ScheduleAtBuilder();
	},
	option(value) {
		return new OptionBuilder(value);
	},
	result(ok, err) {
		return new ResultBuilder(ok, err);
	},
	identity: () => {
		return new IdentityBuilder();
	},
	connectionId: () => {
		return new ConnectionIdBuilder();
	},
	timestamp: () => {
		return new TimestampBuilder();
	},
	timeDuration: () => {
		return new TimeDurationBuilder();
	},
	uuid: () => {
		return new UuidBuilder();
	},
	byteArray: () => {
		return new ByteArrayBuilder();
	}
};
var lifecycle_type_default = t.enum("Lifecycle", {
	Init: t.unit(),
	OnConnect: t.unit(),
	OnDisconnect: t.unit()
});
function pushReducer(name, params, fn, lifecycle) {
	if (existingReducers.has(name)) throw new TypeError(`There is already a reducer with the name '${name}'`);
	existingReducers.add(name);
	if (!(params instanceof RowBuilder)) params = new RowBuilder(params);
	if (params.typeName === void 0) params.typeName = toPascalCase(name);
	const ref = registerTypesRecursively(params);
	const paramsType = resolveType(MODULE_DEF.typespace, ref).value;
	MODULE_DEF.reducers.push({
		name,
		params: paramsType,
		lifecycle
	});
	if (!fn.name) Object.defineProperty(fn, "name", {
		value: name,
		writable: false
	});
	REDUCERS.push(fn);
}
var existingReducers = /* @__PURE__ */ new Set();
var REDUCERS = [];
function reducer(name, params, fn) {
	pushReducer(name, params, fn);
}
function init(name, params, fn) {
	pushReducer(name, params, fn, lifecycle_type_default.Init);
}
function clientConnected(name, params, fn) {
	pushReducer(name, params, fn, lifecycle_type_default.OnConnect);
}
function clientDisconnected(name, params, fn) {
	pushReducer(name, params, fn, lifecycle_type_default.OnDisconnect);
}
var QueryBrand = Symbol("QueryBrand");
var isRowTypedQuery = (val) => !!val && typeof val === "object" && QueryBrand in val;
function toSql(q) {
	return q.toSql();
}
var SemijoinImpl = class _SemijoinImpl {
	constructor(sourceQuery, filterQuery, joinCondition) {
		this.sourceQuery = sourceQuery;
		this.filterQuery = filterQuery;
		this.joinCondition = joinCondition;
		if (sourceQuery.table.name === filterQuery.table.name) throw new Error("Cannot semijoin a table to itself");
	}
	[QueryBrand] = true;
	type = "semijoin";
	build() {
		return this;
	}
	where(predicate) {
		return new _SemijoinImpl(this.sourceQuery.where(predicate), this.filterQuery, this.joinCondition);
	}
	toSql() {
		const left = this.filterQuery;
		const right = this.sourceQuery;
		const leftTable = quoteIdentifier(left.table.name);
		const rightTable = quoteIdentifier(right.table.name);
		let sql = `SELECT ${rightTable}.* FROM ${leftTable} JOIN ${rightTable} ON ${booleanExprToSql(this.joinCondition)}`;
		const clauses = [];
		if (left.whereClause) clauses.push(booleanExprToSql(left.whereClause));
		if (right.whereClause) clauses.push(booleanExprToSql(right.whereClause));
		if (clauses.length > 0) {
			const whereSql = clauses.length === 1 ? clauses[0] : clauses.map(wrapInParens).join(" AND ");
			sql += ` WHERE ${whereSql}`;
		}
		return sql;
	}
};
var FromBuilder = class _FromBuilder {
	constructor(table2, whereClause) {
		this.table = table2;
		this.whereClause = whereClause;
	}
	[QueryBrand] = true;
	where(predicate) {
		const newCondition = predicate(this.table.cols);
		const nextWhere = this.whereClause ? and(this.whereClause, newCondition) : newCondition;
		return new _FromBuilder(this.table, nextWhere);
	}
	rightSemijoin(right, on) {
		const sourceQuery = new _FromBuilder(right);
		const joinCondition = on(this.table.indexedCols, right.indexedCols);
		return new SemijoinImpl(sourceQuery, this, joinCondition);
	}
	leftSemijoin(right, on) {
		const filterQuery = new _FromBuilder(right);
		const joinCondition = on(this.table.indexedCols, right.indexedCols);
		return new SemijoinImpl(this, filterQuery, joinCondition);
	}
	toSql() {
		return renderSelectSqlWithJoins(this.table, this.whereClause);
	}
	build() {
		return this;
	}
};
var TableRefImpl = class {
	type = "table";
	name;
	cols;
	indexedCols;
	tableDef;
	constructor(tableDef) {
		this.name = tableDef.name;
		this.cols = createRowExpr(tableDef);
		this.indexedCols = this.cols;
		this.tableDef = tableDef;
		Object.freeze(this);
	}
	asFrom() {
		return new FromBuilder(this);
	}
	rightSemijoin(other, on) {
		return this.asFrom().rightSemijoin(other, on);
	}
	leftSemijoin(other, on) {
		return this.asFrom().leftSemijoin(other, on);
	}
	build() {
		return this.asFrom().build();
	}
	toSql() {
		return this.asFrom().toSql();
	}
	where(predicate) {
		return this.asFrom().where(predicate);
	}
};
function createTableRefFromDef(tableDef) {
	return new TableRefImpl(tableDef);
}
function makeQueryBuilder(schema2) {
	const qb = /* @__PURE__ */ Object.create(null);
	for (const table2 of schema2.tables) {
		const ref = createTableRefFromDef(table2);
		qb[table2.name] = ref;
	}
	return Object.freeze(qb);
}
function createRowExpr(tableDef) {
	const row = {};
	for (const columnName of Object.keys(tableDef.columns)) {
		const columnBuilder = tableDef.columns[columnName];
		const column = new ColumnExpression(tableDef.name, columnName, columnBuilder.typeBuilder.algebraicType);
		row[columnName] = Object.freeze(column);
	}
	return Object.freeze(row);
}
function renderSelectSqlWithJoins(table2, where, extraClauses = []) {
	const sql = `SELECT * FROM ${quoteIdentifier(table2.name)}`;
	const clauses = [];
	if (where) clauses.push(booleanExprToSql(where));
	clauses.push(...extraClauses);
	if (clauses.length === 0) return sql;
	return `${sql} WHERE ${clauses.length === 1 ? clauses[0] : clauses.map(wrapInParens).join(" AND ")}`;
}
var ColumnExpression = class {
	type = "column";
	column;
	table;
	tsValueType;
	spacetimeType;
	constructor(table2, column, spacetimeType) {
		this.table = table2;
		this.column = column;
		this.spacetimeType = spacetimeType;
	}
	eq(x) {
		return {
			type: "eq",
			left: this,
			right: normalizeValue(x)
		};
	}
	lt(x) {
		return {
			type: "lt",
			left: this,
			right: normalizeValue(x)
		};
	}
	lte(x) {
		return {
			type: "lte",
			left: this,
			right: normalizeValue(x)
		};
	}
	gt(x) {
		return {
			type: "gt",
			left: this,
			right: normalizeValue(x)
		};
	}
	gte(x) {
		return {
			type: "gte",
			left: this,
			right: normalizeValue(x)
		};
	}
};
function literal(value) {
	return {
		type: "literal",
		value
	};
}
function normalizeValue(val) {
	if (val.type === "literal") return val;
	if (typeof val === "object" && val != null && "type" in val && val.type === "column") return val;
	return literal(val);
}
function and(...clauses) {
	return {
		type: "and",
		clauses
	};
}
function booleanExprToSql(expr, tableAlias) {
	switch (expr.type) {
		case "eq": return `${valueExprToSql(expr.left)} = ${valueExprToSql(expr.right)}`;
		case "ne": return `${valueExprToSql(expr.left)} <> ${valueExprToSql(expr.right)}`;
		case "gt": return `${valueExprToSql(expr.left)} > ${valueExprToSql(expr.right)}`;
		case "gte": return `${valueExprToSql(expr.left)} >= ${valueExprToSql(expr.right)}`;
		case "lt": return `${valueExprToSql(expr.left)} < ${valueExprToSql(expr.right)}`;
		case "lte": return `${valueExprToSql(expr.left)} <= ${valueExprToSql(expr.right)}`;
		case "and": return expr.clauses.map((c) => booleanExprToSql(c)).map(wrapInParens).join(" AND ");
		case "or": return expr.clauses.map((c) => booleanExprToSql(c)).map(wrapInParens).join(" OR ");
		case "not": return `NOT ${wrapInParens(booleanExprToSql(expr.clause))}`;
	}
}
function wrapInParens(sql) {
	return `(${sql})`;
}
function valueExprToSql(expr, tableAlias) {
	if (isLiteralExpr(expr)) return literalValueToSql(expr.value);
	const table2 = expr.table;
	return `${quoteIdentifier(table2)}.${quoteIdentifier(expr.column)}`;
}
function literalValueToSql(value) {
	if (value === null || value === void 0) return "NULL";
	if (value instanceof Identity || value instanceof ConnectionId) return `0x${value.toHexString()}`;
	switch (typeof value) {
		case "number":
		case "bigint": return String(value);
		case "boolean": return value ? "TRUE" : "FALSE";
		case "string": return `'${value.replace(/'/g, "''")}'`;
		default: return `'${JSON.stringify(value).replace(/'/g, "''")}'`;
	}
}
function quoteIdentifier(name) {
	return `"${name.replace(/"/g, "\"\"")}"`;
}
function isLiteralExpr(expr) {
	return expr.type === "literal";
}
function defineView(opts, anon, params, ret, fn) {
	const paramsBuilder = new RowBuilder(params, toPascalCase(opts.name));
	let returnType = registerTypesRecursively(ret).algebraicType;
	const { value: paramType } = resolveType(MODULE_DEF.typespace, registerTypesRecursively(paramsBuilder));
	MODULE_DEF.miscExports.push({
		tag: "View",
		value: {
			name: opts.name,
			index: (anon ? ANON_VIEWS : VIEWS).length,
			isPublic: opts.public,
			isAnonymous: anon,
			params: paramType,
			returnType
		}
	});
	if (returnType.tag == "Sum") {
		const originalFn = fn;
		fn = ((ctx, args) => {
			const ret2 = originalFn(ctx, args);
			return ret2 == null ? [] : [ret2];
		});
		returnType = AlgebraicType.Array(returnType.value.variants[0].algebraicType);
	}
	(anon ? ANON_VIEWS : VIEWS).push({
		fn,
		params: paramType,
		returnType,
		returnTypeBaseSize: bsatnBaseSize(MODULE_DEF.typespace, returnType)
	});
}
var VIEWS = [];
var ANON_VIEWS = [];
function procedure(name, params, ret, fn) {
	const paramsType = { elements: Object.entries(params).map(([n, c]) => ({
		name: n,
		algebraicType: registerTypesRecursively("typeBuilder" in c ? c.typeBuilder : c).algebraicType
	})) };
	const returnType = registerTypesRecursively(ret).algebraicType;
	MODULE_DEF.miscExports.push({
		tag: "Procedure",
		value: {
			name,
			params: paramsType,
			returnType
		}
	});
	PROCEDURES.push({
		fn,
		paramsType,
		returnType,
		returnTypeBaseSize: bsatnBaseSize(MODULE_DEF.typespace, returnType)
	});
}
var PROCEDURES = [];
var REGISTERED_SCHEMA = null;
function getRegisteredSchema() {
	if (REGISTERED_SCHEMA == null) throw new Error("Schema has not been registered yet. Call schema() first.");
	return REGISTERED_SCHEMA;
}
function tablesToSchema(tables) {
	return { tables: tables.map(tableToSchema) };
}
function tableToSchema(schema2) {
	const getColName = (i) => schema2.rowType.algebraicType.value.elements[i].name;
	return {
		name: schema2.tableName,
		accessorName: toCamelCase(schema2.tableName),
		columns: schema2.rowType.row,
		rowType: schema2.rowSpacetimeType,
		constraints: schema2.tableDef.constraints.map((c) => ({
			name: c.name,
			constraint: "unique",
			columns: c.data.value.columns.map(getColName)
		})),
		indexes: schema2.tableDef.indexes.map((idx) => {
			const columnIds = idx.algorithm.tag === "Direct" ? [idx.algorithm.value] : idx.algorithm.value;
			return {
				name: idx.accessorName,
				unique: schema2.tableDef.constraints.some((c) => c.data.value.columns.every((col) => columnIds.includes(col))),
				algorithm: idx.algorithm.tag.toLowerCase(),
				columns: columnIds.map(getColName)
			};
		})
	};
}
var MODULE_DEF = {
	typespace: { types: [] },
	tables: [],
	reducers: [],
	types: [],
	miscExports: [],
	rowLevelSecurity: []
};
var COMPOUND_TYPES = /* @__PURE__ */ new Map();
function resolveType(typespace, typeBuilder) {
	let ty = typeBuilder.algebraicType;
	while (ty.tag === "Ref") ty = typespace.types[ty.value];
	return ty;
}
function registerTypesRecursively(typeBuilder) {
	if (typeBuilder instanceof ProductBuilder && !isUnit(typeBuilder) || typeBuilder instanceof SumBuilder || typeBuilder instanceof RowBuilder) return registerCompoundTypeRecursively(typeBuilder);
	else if (typeBuilder instanceof OptionBuilder) return new OptionBuilder(registerTypesRecursively(typeBuilder.value));
	else if (typeBuilder instanceof ResultBuilder) return new ResultBuilder(registerTypesRecursively(typeBuilder.ok), registerTypesRecursively(typeBuilder.err));
	else if (typeBuilder instanceof ArrayBuilder) return new ArrayBuilder(registerTypesRecursively(typeBuilder.element));
	else return typeBuilder;
}
function registerCompoundTypeRecursively(typeBuilder) {
	const ty = typeBuilder.algebraicType;
	const name = typeBuilder.typeName;
	if (name === void 0) throw new Error(`Missing type name for ${typeBuilder.constructor.name ?? "TypeBuilder"} ${JSON.stringify(typeBuilder)}`);
	let r = COMPOUND_TYPES.get(ty);
	if (r != null) return r;
	const newTy = typeBuilder instanceof RowBuilder || typeBuilder instanceof ProductBuilder ? {
		tag: "Product",
		value: { elements: [] }
	} : {
		tag: "Sum",
		value: { variants: [] }
	};
	r = new RefBuilder(MODULE_DEF.typespace.types.length);
	MODULE_DEF.typespace.types.push(newTy);
	COMPOUND_TYPES.set(ty, r);
	if (typeBuilder instanceof RowBuilder) for (const [name2, elem] of Object.entries(typeBuilder.row)) newTy.value.elements.push({
		name: name2,
		algebraicType: registerTypesRecursively(elem.typeBuilder).algebraicType
	});
	else if (typeBuilder instanceof ProductBuilder) for (const [name2, elem] of Object.entries(typeBuilder.elements)) newTy.value.elements.push({
		name: name2,
		algebraicType: registerTypesRecursively(elem).algebraicType
	});
	else if (typeBuilder instanceof SumBuilder) for (const [name2, variant] of Object.entries(typeBuilder.variants)) newTy.value.variants.push({
		name: name2,
		algebraicType: registerTypesRecursively(variant).algebraicType
	});
	MODULE_DEF.types.push({
		name: splitName(name),
		ty: r.ref,
		customOrdering: true
	});
	return r;
}
function isUnit(typeBuilder) {
	return typeBuilder.typeName == null && typeBuilder.algebraicType.value.elements.length === 0;
}
function splitName(name) {
	const scope = name.split(".");
	return {
		name: scope.pop(),
		scope
	};
}
var Schema = class {
	tablesDef;
	typespace;
	schemaType;
	constructor(tables, typespace, handles) {
		this.tablesDef = { tables };
		this.typespace = typespace;
		this.schemaType = tablesToSchema(handles);
	}
	reducer(name, paramsOrFn, fn) {
		if (typeof paramsOrFn === "function") {
			reducer(name, {}, paramsOrFn);
			return paramsOrFn;
		} else {
			reducer(name, paramsOrFn, fn);
			return fn;
		}
	}
	init(nameOrFn, maybeFn) {
		const [name, fn] = typeof nameOrFn === "string" ? [nameOrFn, maybeFn] : ["init", nameOrFn];
		init(name, {}, fn);
	}
	clientConnected(nameOrFn, maybeFn) {
		const [name, fn] = typeof nameOrFn === "string" ? [nameOrFn, maybeFn] : ["on_connect", nameOrFn];
		clientConnected(name, {}, fn);
	}
	clientDisconnected(nameOrFn, maybeFn) {
		const [name, fn] = typeof nameOrFn === "string" ? [nameOrFn, maybeFn] : ["on_disconnect", nameOrFn];
		clientDisconnected(name, {}, fn);
	}
	view(opts, ret, fn) {
		defineView(opts, false, {}, ret, fn);
	}
	anonymousView(opts, ret, fn) {
		defineView(opts, true, {}, ret, fn);
	}
	procedure(name, paramsOrRet, retOrFn, maybeFn) {
		if (typeof retOrFn === "function") {
			procedure(name, {}, paramsOrRet, retOrFn);
			return retOrFn;
		} else {
			procedure(name, paramsOrRet, retOrFn, maybeFn);
			return maybeFn;
		}
	}
	clientVisibilityFilter = { sql(filter) {
		MODULE_DEF.rowLevelSecurity.push({ sql: filter });
	} };
};
function schema(...args) {
	const handles = args.length === 1 && Array.isArray(args[0]) ? args[0] : args;
	const tableDefs = handles.map((h) => h.tableDef);
	MODULE_DEF.tables.push(...tableDefs);
	REGISTERED_SCHEMA = { tables: handles.map((handle) => ({
		name: handle.tableName,
		accessorName: handle.tableName,
		columns: handle.rowType.row,
		rowType: handle.rowSpacetimeType,
		indexes: handle.idxs,
		constraints: handle.constraints
	})) };
	return new Schema(tableDefs, MODULE_DEF.typespace, handles);
}
var raw_index_algorithm_type_default = t.enum("RawIndexAlgorithm", {
	BTree: t.array(t.u16()),
	Hash: t.array(t.u16()),
	Direct: t.u16()
});
function table(opts, row) {
	const { name, public: isPublic = false, indexes: userIndexes = [], scheduled } = opts;
	const colIds = /* @__PURE__ */ new Map();
	const colNameList = [];
	if (!(row instanceof RowBuilder)) row = new RowBuilder(row);
	if (row.typeName === void 0) row.typeName = toPascalCase(name);
	const rowTypeRef = registerTypesRecursively(row);
	row.algebraicType.value.elements.forEach((elem, i) => {
		colIds.set(elem.name, i);
		colNameList.push(elem.name);
	});
	const pk = [];
	const indexes = [];
	const constraints = [];
	const sequences = [];
	let scheduleAtCol;
	for (const [name2, builder] of Object.entries(row.row)) {
		const meta = builder.columnMetadata;
		if (meta.isPrimaryKey) pk.push(colIds.get(name2));
		const isUnique = meta.isUnique || meta.isPrimaryKey;
		if (meta.indexType || isUnique) {
			const algo = meta.indexType ?? "btree";
			const id = colIds.get(name2);
			let algorithm;
			switch (algo) {
				case "btree":
					algorithm = raw_index_algorithm_type_default.BTree([id]);
					break;
				case "direct":
					algorithm = raw_index_algorithm_type_default.Direct(id);
					break;
			}
			indexes.push({
				name: void 0,
				accessorName: name2,
				algorithm
			});
		}
		if (isUnique) constraints.push({
			name: void 0,
			data: {
				tag: "Unique",
				value: { columns: [colIds.get(name2)] }
			}
		});
		if (meta.isAutoIncrement) sequences.push({
			name: void 0,
			start: void 0,
			minValue: void 0,
			maxValue: void 0,
			column: colIds.get(name2),
			increment: 1n
		});
		if (scheduled) {
			const algebraicType = builder.typeBuilder.algebraicType;
			if (schedule_at_default.isScheduleAt(algebraicType)) scheduleAtCol = colIds.get(name2);
		}
	}
	for (const indexOpts of userIndexes ?? []) {
		let algorithm;
		switch (indexOpts.algorithm) {
			case "btree":
				algorithm = {
					tag: "BTree",
					value: indexOpts.columns.map((c) => colIds.get(c))
				};
				break;
			case "direct":
				algorithm = {
					tag: "Direct",
					value: colIds.get(indexOpts.column)
				};
				break;
		}
		indexes.push({
			name: void 0,
			accessorName: indexOpts.name,
			algorithm
		});
	}
	for (const constraintOpts of opts.constraints ?? []) if (constraintOpts.constraint === "unique") {
		const data = {
			tag: "Unique",
			value: { columns: constraintOpts.columns.map((c) => colIds.get(c)) }
		};
		constraints.push({
			name: constraintOpts.name,
			data
		});
		continue;
	}
	for (const index of indexes) index.name = `${name}_${(index.algorithm.tag === "Direct" ? [index.algorithm.value] : index.algorithm.value).map((i) => colNameList[i]).join("_")}_idx_${index.algorithm.tag.toLowerCase()}`;
	const tableDef = {
		name,
		productTypeRef: rowTypeRef.ref,
		primaryKey: pk,
		indexes,
		constraints,
		sequences,
		schedule: scheduled && scheduleAtCol !== void 0 ? {
			name: void 0,
			reducerName: scheduled,
			scheduledAtColumn: scheduleAtCol
		} : void 0,
		tableType: { tag: "User" },
		tableAccess: { tag: isPublic ? "Public" : "Private" }
	};
	const productType = row.algebraicType.value;
	return {
		rowType: row,
		tableName: name,
		rowSpacetimeType: productType,
		tableDef,
		idxs: {},
		constraints
	};
}
var SpacetimeHostError = class _SpacetimeHostError extends Error {
	code;
	message;
	constructor(code, message) {
		super();
		const proto = Object.getPrototypeOf(this);
		let cls;
		if (errorProtoypes.has(proto)) {
			cls = proto.constructor;
			if (code !== cls.CODE) throw new TypeError(`invalid error code for ${cls.name}`);
		} else if (proto === _SpacetimeHostError.prototype) {
			cls = errnoToClass.get(code);
			if (!cls) throw new RangeError(`unknown error code ${code}`);
		} else throw new TypeError("cannot subclass SpacetimeError");
		Object.setPrototypeOf(this, cls.prototype);
		this.code = cls.CODE;
		this.message = message ?? cls.MESSAGE;
	}
	get name() {
		return errnoToClass.get(this.code)?.name ?? "SpacetimeHostError";
	}
};
var SenderError = class extends Error {
	constructor(message) {
		super(message);
	}
	get name() {
		return "SenderError";
	}
};
var errorData = {
	HostCallFailure: [1, "ABI called by host returned an error"],
	NotInTransaction: [2, "ABI call can only be made while in a transaction"],
	BsatnDecodeError: [3, "Couldn't decode the BSATN to the expected type"],
	NoSuchTable: [4, "No such table"],
	NoSuchIndex: [5, "No such index"],
	NoSuchIter: [6, "The provided row iterator is not valid"],
	NoSuchConsoleTimer: [7, "The provided console timer does not exist"],
	NoSuchBytes: [8, "The provided bytes source or sink is not valid"],
	NoSpace: [9, "The provided sink has no more space left"],
	BufferTooSmall: [11, "The provided buffer is not large enough to store the data"],
	UniqueAlreadyExists: [12, "Value with given unique identifier already exists"],
	ScheduleAtDelayTooLong: [13, "Specified delay in scheduling row was too long"],
	IndexNotUnique: [14, "The index was not unique"],
	NoSuchRow: [15, "The row was not found, e.g., in an update call"],
	AutoIncOverflow: [16, "The auto-increment sequence overflowed"],
	WouldBlockTransaction: [17, "Attempted async or blocking op while holding open a transaction"],
	TransactionNotAnonymous: [18, "Not in an anonymous transaction. Called by a reducer?"],
	TransactionIsReadOnly: [19, "ABI call can only be made while within a mutable transaction"],
	TransactionIsMut: [20, "ABI call can only be made while within a read-only transaction"],
	HttpError: [21, "The HTTP request failed"]
};
function mapEntries(x, f) {
	return Object.fromEntries(Object.entries(x).map(([k, v]) => [k, f(k, v)]));
}
var errors = Object.freeze(mapEntries(errorData, (name, [code, message]) => Object.defineProperty(class extends SpacetimeHostError {
	static CODE = code;
	static MESSAGE = message;
	constructor() {
		super(code);
	}
}, "name", {
	value: name,
	writable: false
})));
var errorProtoypes = new Set(Object.values(errors).map((cls) => cls.prototype));
var errnoToClass = new Map(Object.values(errors).map((cls) => [cls.CODE, cls]));
__toESM(require_text_min());
var sum_type_variant_type_default = t.object("SumTypeVariant", {
	name: t.option(t.string()),
	get algebraicType() {
		return algebraic_type_type_default;
	}
});
var sum_type_type_default = t.object("SumType", { get variants() {
	return t.array(sum_type_variant_type_default);
} });
var product_type_element_type_default = t.object("ProductTypeElement", {
	name: t.option(t.string()),
	get algebraicType() {
		return algebraic_type_type_default;
	}
});
var product_type_type_default = t.object("ProductType", { get elements() {
	return t.array(product_type_element_type_default);
} });
var AlgebraicType2 = t.enum("AlgebraicType", {
	Ref: t.u32(),
	get Sum() {
		return sum_type_type_default;
	},
	get Product() {
		return product_type_type_default;
	},
	get Array() {
		return AlgebraicType2;
	},
	String: t.unit(),
	Bool: t.unit(),
	I8: t.unit(),
	U8: t.unit(),
	I16: t.unit(),
	U16: t.unit(),
	I32: t.unit(),
	U32: t.unit(),
	I64: t.unit(),
	U64: t.unit(),
	I128: t.unit(),
	U128: t.unit(),
	I256: t.unit(),
	U256: t.unit(),
	F32: t.unit(),
	F64: t.unit()
});
var algebraic_type_type_default = AlgebraicType2;
var typespace_type_default = t.object("Typespace", { get types() {
	return t.array(algebraic_type_type_default);
} });
var raw_column_def_v_8_type_default = t.object("RawColumnDefV8", {
	colName: t.string(),
	get colType() {
		return algebraic_type_type_default;
	}
});
var index_type_type_default = t.enum("IndexType", {
	BTree: t.unit(),
	Hash: t.unit()
});
var raw_index_def_v_8_type_default = t.object("RawIndexDefV8", {
	indexName: t.string(),
	isUnique: t.bool(),
	get indexType() {
		return index_type_type_default;
	},
	columns: t.array(t.u16())
});
var raw_constraint_def_v_8_type_default = t.object("RawConstraintDefV8", {
	constraintName: t.string(),
	constraints: t.u8(),
	columns: t.array(t.u16())
});
var raw_sequence_def_v_8_type_default = t.object("RawSequenceDefV8", {
	sequenceName: t.string(),
	colPos: t.u16(),
	increment: t.i128(),
	start: t.option(t.i128()),
	minValue: t.option(t.i128()),
	maxValue: t.option(t.i128()),
	allocated: t.i128()
});
var raw_table_def_v_8_type_default = t.object("RawTableDefV8", {
	tableName: t.string(),
	get columns() {
		return t.array(raw_column_def_v_8_type_default);
	},
	get indexes() {
		return t.array(raw_index_def_v_8_type_default);
	},
	get constraints() {
		return t.array(raw_constraint_def_v_8_type_default);
	},
	get sequences() {
		return t.array(raw_sequence_def_v_8_type_default);
	},
	tableType: t.string(),
	tableAccess: t.string(),
	scheduled: t.option(t.string())
});
var table_desc_type_default = t.object("TableDesc", {
	get schema() {
		return raw_table_def_v_8_type_default;
	},
	data: t.u32()
});
var reducer_def_type_default = t.object("ReducerDef", {
	name: t.string(),
	get args() {
		return t.array(product_type_element_type_default);
	}
});
var type_alias_type_default = t.object("TypeAlias", {
	name: t.string(),
	ty: t.u32()
});
var misc_module_export_type_default = t.enum("MiscModuleExport", { get TypeAlias() {
	return type_alias_type_default;
} });
var raw_module_def_v_8_type_default = t.object("RawModuleDefV8", {
	get typespace() {
		return typespace_type_default;
	},
	get tables() {
		return t.array(table_desc_type_default);
	},
	get reducers() {
		return t.array(reducer_def_type_default);
	},
	get miscExports() {
		return t.array(misc_module_export_type_default);
	}
});
var raw_index_def_v_9_type_default = t.object("RawIndexDefV9", {
	name: t.option(t.string()),
	accessorName: t.option(t.string()),
	get algorithm() {
		return raw_index_algorithm_type_default;
	}
});
var raw_unique_constraint_data_v_9_type_default = t.object("RawUniqueConstraintDataV9", { columns: t.array(t.u16()) });
var raw_constraint_data_v_9_type_default = t.enum("RawConstraintDataV9", { get Unique() {
	return raw_unique_constraint_data_v_9_type_default;
} });
var raw_constraint_def_v_9_type_default = t.object("RawConstraintDefV9", {
	name: t.option(t.string()),
	get data() {
		return raw_constraint_data_v_9_type_default;
	}
});
var raw_sequence_def_v_9_type_default = t.object("RawSequenceDefV9", {
	name: t.option(t.string()),
	column: t.u16(),
	start: t.option(t.i128()),
	minValue: t.option(t.i128()),
	maxValue: t.option(t.i128()),
	increment: t.i128()
});
var raw_schedule_def_v_9_type_default = t.object("RawScheduleDefV9", {
	name: t.option(t.string()),
	reducerName: t.string(),
	scheduledAtColumn: t.u16()
});
var table_type_type_default = t.enum("TableType", {
	System: t.unit(),
	User: t.unit()
});
var table_access_type_default = t.enum("TableAccess", {
	Public: t.unit(),
	Private: t.unit()
});
var raw_table_def_v_9_type_default = t.object("RawTableDefV9", {
	name: t.string(),
	productTypeRef: t.u32(),
	primaryKey: t.array(t.u16()),
	get indexes() {
		return t.array(raw_index_def_v_9_type_default);
	},
	get constraints() {
		return t.array(raw_constraint_def_v_9_type_default);
	},
	get sequences() {
		return t.array(raw_sequence_def_v_9_type_default);
	},
	get schedule() {
		return t.option(raw_schedule_def_v_9_type_default);
	},
	get tableType() {
		return table_type_type_default;
	},
	get tableAccess() {
		return table_access_type_default;
	}
});
var raw_reducer_def_v_9_type_default = t.object("RawReducerDefV9", {
	name: t.string(),
	get params() {
		return product_type_type_default;
	},
	get lifecycle() {
		return t.option(lifecycle_type_default);
	}
});
var raw_scoped_type_name_v_9_type_default = t.object("RawScopedTypeNameV9", {
	scope: t.array(t.string()),
	name: t.string()
});
var raw_type_def_v_9_type_default = t.object("RawTypeDefV9", {
	get name() {
		return raw_scoped_type_name_v_9_type_default;
	},
	ty: t.u32(),
	customOrdering: t.bool()
});
var raw_column_default_value_v_9_type_default = t.object("RawColumnDefaultValueV9", {
	table: t.string(),
	colId: t.u16(),
	value: t.byteArray()
});
var raw_procedure_def_v_9_type_default = t.object("RawProcedureDefV9", {
	name: t.string(),
	get params() {
		return product_type_type_default;
	},
	get returnType() {
		return algebraic_type_type_default;
	}
});
var raw_view_def_v_9_type_default = t.object("RawViewDefV9", {
	name: t.string(),
	index: t.u32(),
	isPublic: t.bool(),
	isAnonymous: t.bool(),
	get params() {
		return product_type_type_default;
	},
	get returnType() {
		return algebraic_type_type_default;
	}
});
var raw_misc_module_export_v_9_type_default = t.enum("RawMiscModuleExportV9", {
	get ColumnDefaultValue() {
		return raw_column_default_value_v_9_type_default;
	},
	get Procedure() {
		return raw_procedure_def_v_9_type_default;
	},
	get View() {
		return raw_view_def_v_9_type_default;
	}
});
var raw_row_level_security_def_v_9_type_default = t.object("RawRowLevelSecurityDefV9", { sql: t.string() });
var raw_module_def_v_9_type_default = t.object("RawModuleDefV9", {
	get typespace() {
		return typespace_type_default;
	},
	get tables() {
		return t.array(raw_table_def_v_9_type_default);
	},
	get reducers() {
		return t.array(raw_reducer_def_v_9_type_default);
	},
	get types() {
		return t.array(raw_type_def_v_9_type_default);
	},
	get miscExports() {
		return t.array(raw_misc_module_export_v_9_type_default);
	},
	get rowLevelSecurity() {
		return t.array(raw_row_level_security_def_v_9_type_default);
	}
});
var raw_module_def_type_default = t.enum("RawModuleDef", {
	get V8BackCompat() {
		return raw_module_def_v_8_type_default;
	},
	get V9() {
		return raw_module_def_v_9_type_default;
	}
});
var Range = class {
	#from;
	#to;
	constructor(from, to) {
		this.#from = from ?? { tag: "unbounded" };
		this.#to = to ?? { tag: "unbounded" };
	}
	get from() {
		return this.#from;
	}
	get to() {
		return this.#to;
	}
};
var import_statuses = __toESM(require_statuses());
var http_header_pair_type_default = t.object("HttpHeaderPair", {
	name: t.string(),
	value: t.byteArray()
});
var http_headers_type_default = t.object("HttpHeaders", { get entries() {
	return t.array(http_header_pair_type_default);
} });
var http_method_type_default = t.enum("HttpMethod", {
	Get: t.unit(),
	Head: t.unit(),
	Post: t.unit(),
	Put: t.unit(),
	Delete: t.unit(),
	Connect: t.unit(),
	Options: t.unit(),
	Trace: t.unit(),
	Patch: t.unit(),
	Extension: t.string()
});
var http_version_type_default = t.enum("HttpVersion", {
	Http09: t.unit(),
	Http10: t.unit(),
	Http11: t.unit(),
	Http2: t.unit(),
	Http3: t.unit()
});
var http_request_type_default = t.object("HttpRequest", {
	get method() {
		return http_method_type_default;
	},
	get headers() {
		return http_headers_type_default;
	},
	timeout: t.option(t.timeDuration()),
	uri: t.string(),
	get version() {
		return http_version_type_default;
	}
});
var http_response_type_default = t.object("HttpResponse", {
	get headers() {
		return http_headers_type_default;
	},
	get version() {
		return http_version_type_default;
	},
	code: t.u16()
});
var { freeze } = Object;
var textEncoder = new TextEncoder();
var textDecoder = new TextDecoder("utf-8");
var makeResponse = Symbol("makeResponse");
var SyncResponse = class _SyncResponse {
	#body;
	#inner;
	constructor(body, init2) {
		if (body == null) this.#body = null;
		else if (typeof body === "string") this.#body = body;
		else this.#body = new Uint8Array(body).buffer;
		this.#inner = {
			headers: new Headers(init2?.headers),
			status: init2?.status ?? 200,
			statusText: init2?.statusText ?? "",
			type: "default",
			url: null,
			aborted: false
		};
	}
	static [makeResponse](body, inner) {
		const me = new _SyncResponse(body);
		me.#inner = inner;
		return me;
	}
	get headers() {
		return this.#inner.headers;
	}
	get status() {
		return this.#inner.status;
	}
	get statusText() {
		return this.#inner.statusText;
	}
	get ok() {
		return 200 <= this.#inner.status && this.#inner.status <= 299;
	}
	get url() {
		return this.#inner.url ?? "";
	}
	get type() {
		return this.#inner.type;
	}
	arrayBuffer() {
		return this.bytes().buffer;
	}
	bytes() {
		if (this.#body == null) return new Uint8Array();
		else if (typeof this.#body === "string") return textEncoder.encode(this.#body);
		else return new Uint8Array(this.#body);
	}
	json() {
		return JSON.parse(this.text());
	}
	text() {
		if (this.#body == null) return "";
		else if (typeof this.#body === "string") return this.#body;
		else return textDecoder.decode(this.#body);
	}
};
var requestBaseSize = bsatnBaseSize({ types: [] }, http_request_type_default.algebraicType);
var methods = /* @__PURE__ */ new Map([
	["GET", { tag: "Get" }],
	["HEAD", { tag: "Head" }],
	["POST", { tag: "Post" }],
	["PUT", { tag: "Put" }],
	["DELETE", { tag: "Delete" }],
	["CONNECT", { tag: "Connect" }],
	["OPTIONS", { tag: "Options" }],
	["TRACE", { tag: "Trace" }],
	["PATCH", { tag: "Patch" }]
]);
function fetch(url, init2 = {}) {
	const method = methods.get(init2.method?.toUpperCase() ?? "GET") ?? {
		tag: "Extension",
		value: init2.method
	};
	const headers = { entries: headersToList(new Headers(init2.headers)).flatMap(([k, v]) => Array.isArray(v) ? v.map((v2) => [k, v2]) : [[k, v]]).map(([name, value]) => ({
		name,
		value: textEncoder.encode(value)
	})) };
	const uri = "" + url;
	const request = freeze({
		method,
		headers,
		timeout: init2.timeout,
		uri,
		version: { tag: "Http11" }
	});
	const requestBuf = new BinaryWriter(requestBaseSize);
	http_request_type_default.serialize(requestBuf, request);
	const body = init2.body == null ? new Uint8Array() : typeof init2.body === "string" ? init2.body : new Uint8Array(init2.body);
	const [responseBuf, responseBody] = sys.procedure_http_request(requestBuf.getBuffer(), body);
	const response = http_response_type_default.deserialize(new BinaryReader(responseBuf));
	return SyncResponse[makeResponse](responseBody, {
		type: "basic",
		url: uri,
		status: response.code,
		statusText: (0, import_statuses.default)(response.code),
		headers: new Headers(),
		aborted: false
	});
}
freeze(fetch);
var httpClient = freeze({ fetch });
var { freeze: freeze2 } = Object;
function callProcedure(id, sender, connectionId, timestamp, argsBuf) {
	const { fn, paramsType, returnType, returnTypeBaseSize } = PROCEDURES[id];
	const args = ProductType.deserializeValue(new BinaryReader(argsBuf), paramsType, MODULE_DEF.typespace);
	const ctx = {
		sender,
		timestamp,
		connectionId,
		http: httpClient,
		counter_uuid: { value: 0 },
		get identity() {
			return new Identity(sys.identity().__identity__);
		},
		withTx(body) {
			const run = () => {
				const timestamp2 = sys.procedure_start_mut_tx();
				try {
					return body(new ReducerCtxImpl(sender, new Timestamp(timestamp2), connectionId));
				} catch (e) {
					sys.procedure_abort_mut_tx();
					throw e;
				}
			};
			let res = run();
			try {
				sys.procedure_commit_mut_tx();
				return res;
			} catch {}
			console.warn("committing anonymous transaction failed");
			res = run();
			try {
				sys.procedure_commit_mut_tx();
				return res;
			} catch (e) {
				throw new Error("transaction retry failed again", { cause: e });
			}
		},
		newUuidV4() {
			const bytes = crypto.getRandomValues(new Uint8Array(16));
			return Uuid.fromRandomBytesV4(bytes);
		},
		newUuidV7() {
			const bytes = crypto.getRandomValues(new Uint8Array(10));
			return Uuid.fromCounterV7(this.counter_uuid, this.timestamp, bytes);
		}
	};
	freeze2(ctx);
	const ret = callUserFunction(fn, ctx, args);
	const retBuf = new BinaryWriter(returnTypeBaseSize);
	AlgebraicType.serializeValue(retBuf, returnType, ret, MODULE_DEF.typespace);
	return retBuf.getBuffer();
}
var view_result_header_type_default = t.enum("ViewResultHeader", {
	RowData: t.unit(),
	RawSql: t.string()
});
var { freeze: freeze3 } = Object;
var sys = freeze3(wrapSyscalls(_syscalls1_0, _syscalls1_2));
function parseJsonObject(json) {
	let value;
	try {
		value = JSON.parse(json);
	} catch {
		throw new Error("Invalid JSON: failed to parse string");
	}
	if (value === null || typeof value !== "object" || Array.isArray(value)) throw new Error("Expected a JSON object at the top level");
	return value;
}
var JwtClaimsImpl = class {
	/**
	* Creates a new JwtClaims instance.
	* @param rawPayload The JWT payload as a raw JSON string.
	* @param identity The identity for this JWT. We are only taking this because we don't have a blake3 implementation (which we need to compute it).
	*/
	constructor(rawPayload, identity) {
		this.rawPayload = rawPayload;
		this.fullPayload = parseJsonObject(rawPayload);
		this._identity = identity;
	}
	fullPayload;
	_identity;
	get identity() {
		return this._identity;
	}
	get subject() {
		return this.fullPayload["sub"];
	}
	get issuer() {
		return this.fullPayload["iss"];
	}
	get audience() {
		const aud = this.fullPayload["aud"];
		if (aud == null) return [];
		return typeof aud === "string" ? [aud] : aud;
	}
};
var AuthCtxImpl = class _AuthCtxImpl {
	isInternal;
	_jwtSource;
	_initializedJWT = false;
	_jwtClaims;
	_senderIdentity;
	constructor(opts) {
		this.isInternal = opts.isInternal;
		this._jwtSource = opts.jwtSource;
		this._senderIdentity = opts.senderIdentity;
	}
	_initializeJWT() {
		if (this._initializedJWT) return;
		this._initializedJWT = true;
		const token = this._jwtSource();
		if (!token) this._jwtClaims = null;
		else this._jwtClaims = new JwtClaimsImpl(token, this._senderIdentity);
		Object.freeze(this);
	}
	/** Lazily compute whether a JWT exists and is parseable. */
	get hasJWT() {
		this._initializeJWT();
		return this._jwtClaims !== null;
	}
	/** Lazily parse the JwtClaims only when accessed. */
	get jwt() {
		this._initializeJWT();
		return this._jwtClaims;
	}
	/** Create a context representing internal (non-user) requests. */
	static internal() {
		return new _AuthCtxImpl({
			isInternal: true,
			jwtSource: () => null,
			senderIdentity: Identity.zero()
		});
	}
	/** If there is a connection id, look up the JWT payload from the system tables. */
	static fromSystemTables(connectionId, sender) {
		if (connectionId === null) return new _AuthCtxImpl({
			isInternal: false,
			jwtSource: () => null,
			senderIdentity: sender
		});
		return new _AuthCtxImpl({
			isInternal: false,
			jwtSource: () => {
				const payloadBuf = sys.get_jwt_payload(connectionId.__connection_id__);
				if (payloadBuf.length === 0) return null;
				return new TextDecoder().decode(payloadBuf);
			},
			senderIdentity: sender
		});
	}
};
var ReducerCtxImpl = class ReducerCtx {
	#identity;
	#senderAuth;
	#uuidCounter;
	sender;
	timestamp;
	connectionId;
	db;
	constructor(sender, timestamp, connectionId) {
		Object.seal(this);
		this.sender = sender;
		this.timestamp = timestamp;
		this.connectionId = connectionId;
		this.db = getDbView();
	}
	get identity() {
		return this.#identity ??= new Identity(sys.identity().__identity__);
	}
	get senderAuth() {
		return this.#senderAuth ??= AuthCtxImpl.fromSystemTables(this.connectionId, this.sender);
	}
	/**
	* Create a new random {@link Uuid} `v4` using the {@link crypto} RNG.
	*
	* WARN: Until we use a spacetime RNG this make calls non-deterministic.
	*/
	newUuidV4() {
		const bytes = crypto.getRandomValues(new Uint8Array(16));
		return Uuid.fromRandomBytesV4(bytes);
	}
	/**
	* Create a new sortable {@link Uuid} `v7` using the {@link crypto} RNG, counter,
	* and the timestamp.
	*
	* WARN: Until we use a spacetime RNG this make calls non-deterministic.
	*/
	newUuidV7() {
		const bytes = crypto.getRandomValues(new Uint8Array(4));
		const counter = this.#uuidCounter ??= { value: 0 };
		return Uuid.fromCounterV7(counter, this.timestamp, bytes);
	}
};
var callUserFunction = function __spacetimedb_end_short_backtrace(fn, ...args) {
	return fn(...args);
};
var hooks = {
	__describe_module__() {
		const writer = new BinaryWriter(128);
		AlgebraicType.serializeValue(writer, raw_module_def_type_default.algebraicType, raw_module_def_type_default.V9(MODULE_DEF));
		return writer.getBuffer();
	},
	__call_reducer__(reducerId, sender, connId, timestamp, argsBuf) {
		const argsType = AlgebraicType.Product(MODULE_DEF.reducers[reducerId].params);
		const args = AlgebraicType.deserializeValue(new BinaryReader(argsBuf), argsType, MODULE_DEF.typespace);
		const ctx = new ReducerCtxImpl(new Identity(sender), new Timestamp(timestamp), ConnectionId.nullIfZero(new ConnectionId(connId)));
		try {
			return callUserFunction(REDUCERS[reducerId], ctx, args) ?? { tag: "ok" };
		} catch (e) {
			if (e instanceof SenderError) return {
				tag: "err",
				value: e.message
			};
			throw e;
		}
	}
};
var hooks_v1_1 = {
	__call_view__(id, sender, argsBuf) {
		const { fn, params, returnType, returnTypeBaseSize } = VIEWS[id];
		const ret = callUserFunction(fn, freeze3({
			sender: new Identity(sender),
			db: getDbView(),
			from: makeQueryBuilder(getRegisteredSchema())
		}), ProductType.deserializeValue(new BinaryReader(argsBuf), params, MODULE_DEF.typespace));
		const retBuf = new BinaryWriter(returnTypeBaseSize);
		if (isRowTypedQuery(ret)) {
			const query = toSql(ret);
			const v = view_result_header_type_default.RawSql(query);
			AlgebraicType.serializeValue(retBuf, view_result_header_type_default.algebraicType, v, MODULE_DEF.typespace);
			return { data: retBuf.getBuffer() };
		} else {
			AlgebraicType.serializeValue(retBuf, view_result_header_type_default.algebraicType, view_result_header_type_default.RowData, MODULE_DEF.typespace);
			AlgebraicType.serializeValue(retBuf, returnType, ret, MODULE_DEF.typespace);
			return { data: retBuf.getBuffer() };
		}
	},
	__call_view_anon__(id, argsBuf) {
		const { fn, params, returnType, returnTypeBaseSize } = ANON_VIEWS[id];
		const ret = callUserFunction(fn, freeze3({
			db: getDbView(),
			from: makeQueryBuilder(getRegisteredSchema())
		}), ProductType.deserializeValue(new BinaryReader(argsBuf), params, MODULE_DEF.typespace));
		const retBuf = new BinaryWriter(returnTypeBaseSize);
		if (isRowTypedQuery(ret)) {
			const query = toSql(ret);
			const v = view_result_header_type_default.RawSql(query);
			AlgebraicType.serializeValue(retBuf, view_result_header_type_default.algebraicType, v, MODULE_DEF.typespace);
			return { data: retBuf.getBuffer() };
		} else {
			AlgebraicType.serializeValue(retBuf, view_result_header_type_default.algebraicType, view_result_header_type_default.RowData, MODULE_DEF.typespace);
			AlgebraicType.serializeValue(retBuf, returnType, ret, MODULE_DEF.typespace);
			return { data: retBuf.getBuffer() };
		}
	}
};
var hooks_v1_2 = { __call_procedure__(id, sender, connection_id, timestamp, args) {
	return callProcedure(id, new Identity(sender), ConnectionId.nullIfZero(new ConnectionId(connection_id)), new Timestamp(timestamp), args);
} };
var DB_VIEW = null;
function getDbView() {
	DB_VIEW ??= makeDbView(MODULE_DEF);
	return DB_VIEW;
}
function makeDbView(moduleDef) {
	return freeze3(Object.fromEntries(moduleDef.tables.map((table2) => [toCamelCase(table2.name), makeTableView(moduleDef.typespace, table2)])));
}
function makeTableView(typespace, table2) {
	const table_id = sys.table_id_from_name(table2.name);
	const rowType = typespace.types[table2.productTypeRef];
	if (rowType.tag !== "Product") throw "impossible";
	const baseSize = bsatnBaseSize(typespace, rowType);
	const sequences = table2.sequences.map((seq) => {
		const col = rowType.value.elements[seq.column];
		const colType = col.algebraicType;
		let sequenceTrigger;
		switch (colType.tag) {
			case "U8":
			case "I8":
			case "U16":
			case "I16":
			case "U32":
			case "I32":
				sequenceTrigger = 0;
				break;
			case "U64":
			case "I64":
			case "U128":
			case "I128":
			case "U256":
			case "I256":
				sequenceTrigger = 0n;
				break;
			default: throw new TypeError("invalid sequence type");
		}
		return {
			colName: col.name,
			sequenceTrigger,
			read: (reader) => AlgebraicType.deserializeValue(reader, colType, typespace)
		};
	});
	const hasAutoIncrement = sequences.length > 0;
	const iter = () => tableIterator(sys.datastore_table_scan_bsatn(table_id), rowType);
	const integrateGeneratedColumns = hasAutoIncrement ? (row, ret_buf) => {
		const reader = new BinaryReader(ret_buf);
		for (const { colName, read, sequenceTrigger } of sequences) if (row[colName] === sequenceTrigger) row[colName] = read(reader);
	} : null;
	const tableMethods = {
		count: () => sys.datastore_table_row_count(table_id),
		iter,
		[Symbol.iterator]: () => iter(),
		insert: (row) => {
			const writer = new BinaryWriter(baseSize);
			AlgebraicType.serializeValue(writer, rowType, row, typespace);
			const ret_buf = sys.datastore_insert_bsatn(table_id, writer.getBuffer());
			const ret = { ...row };
			integrateGeneratedColumns?.(ret, ret_buf);
			return ret;
		},
		delete: (row) => {
			const writer = new BinaryWriter(4 + baseSize);
			writer.writeU32(1);
			AlgebraicType.serializeValue(writer, rowType, row, typespace);
			return sys.datastore_delete_all_by_eq_bsatn(table_id, writer.getBuffer()) > 0;
		}
	};
	const tableView = Object.assign(/* @__PURE__ */ Object.create(null), tableMethods);
	for (const indexDef of table2.indexes) {
		const index_id = sys.index_id_from_name(indexDef.name);
		let column_ids;
		switch (indexDef.algorithm.tag) {
			case "BTree":
				column_ids = indexDef.algorithm.value;
				break;
			case "Hash": throw new Error("impossible");
			case "Direct":
				column_ids = [indexDef.algorithm.value];
				break;
		}
		const numColumns = column_ids.length;
		const columnSet = new Set(column_ids);
		const isUnique = table2.constraints.filter((x) => x.data.tag === "Unique").some((x) => columnSet.isSubsetOf(new Set(x.data.value.columns)));
		const indexType = AlgebraicType.Product({ elements: column_ids.map((id) => rowType.value.elements[id]) });
		const baseSize2 = bsatnBaseSize(typespace, indexType);
		const serializePrefix = (writer, prefix, prefix_elems) => {
			if (prefix_elems > numColumns - 1) throw new TypeError("too many elements in prefix");
			for (let i = 0; i < prefix_elems; i++) {
				const elemType = indexType.value.elements[i].algebraicType;
				AlgebraicType.serializeValue(writer, elemType, prefix[i], typespace);
			}
			return writer;
		};
		let index;
		if (isUnique) {
			const serializeBound = (colVal) => {
				if (colVal.length !== numColumns) throw new TypeError("wrong number of elements");
				const writer = new BinaryWriter(baseSize2 + 1);
				const prefix_elems = numColumns - 1;
				serializePrefix(writer, colVal, prefix_elems);
				const rstartOffset = writer.offset;
				writer.writeU8(0);
				AlgebraicType.serializeValue(writer, indexType.value.elements[numColumns - 1].algebraicType, colVal[numColumns - 1], typespace);
				const buffer = writer.getBuffer();
				const prefix = buffer.slice(0, rstartOffset);
				const rstart = buffer.slice(rstartOffset);
				return [
					prefix,
					prefix_elems,
					rstart,
					rstart
				];
			};
			index = {
				find: (colVal) => {
					if (numColumns === 1) colVal = [colVal];
					const args = serializeBound(colVal);
					const iter2 = tableIterator(sys.datastore_index_scan_range_bsatn(index_id, ...args), rowType);
					const { value, done } = iter2.next();
					if (done) return null;
					if (!iter2.next().done) throw new Error("`datastore_index_scan_range_bsatn` on unique field cannot return >1 rows");
					return value;
				},
				delete: (colVal) => {
					if (numColumns === 1) colVal = [colVal];
					const args = serializeBound(colVal);
					return sys.datastore_delete_by_index_scan_range_bsatn(index_id, ...args) > 0;
				},
				update: (row) => {
					const writer = new BinaryWriter(baseSize2);
					AlgebraicType.serializeValue(writer, rowType, row, typespace);
					const ret_buf = sys.datastore_update_bsatn(table_id, index_id, writer.getBuffer());
					integrateGeneratedColumns?.(row, ret_buf);
					return row;
				}
			};
		} else {
			const serializeRange = (range) => {
				if (range.length > numColumns) throw new TypeError("too many elements");
				const writer = new BinaryWriter(baseSize2 + 1);
				const prefix_elems = range.length - 1;
				serializePrefix(writer, range, prefix_elems);
				const rstartOffset = writer.offset;
				const term = range[range.length - 1];
				const termType = indexType.value.elements[range.length - 1].algebraicType;
				let rstart, rend;
				if (term instanceof Range) {
					const writeBound = (bound) => {
						writer.writeU8({
							included: 0,
							excluded: 1,
							unbounded: 2
						}[bound.tag]);
						if (bound.tag !== "unbounded") AlgebraicType.serializeValue(writer, termType, bound.value, typespace);
					};
					writeBound(term.from);
					const rendOffset = writer.offset;
					writeBound(term.to);
					rstart = writer.getBuffer().slice(rstartOffset, rendOffset);
					rend = writer.getBuffer().slice(rendOffset);
				} else {
					writer.writeU8(0);
					AlgebraicType.serializeValue(writer, termType, term, typespace);
					rstart = rend = writer.getBuffer().slice(rstartOffset);
				}
				return [
					writer.getBuffer().slice(0, rstartOffset),
					prefix_elems,
					rstart,
					rend
				];
			};
			index = {
				filter: (range) => {
					if (numColumns === 1) range = [range];
					const args = serializeRange(range);
					return tableIterator(sys.datastore_index_scan_range_bsatn(index_id, ...args), rowType);
				},
				delete: (range) => {
					if (numColumns === 1) range = [range];
					const args = serializeRange(range);
					return sys.datastore_delete_by_index_scan_range_bsatn(index_id, ...args);
				}
			};
		}
		if (Object.hasOwn(tableView, indexDef.accessorName)) freeze3(Object.assign(tableView[indexDef.accessorName], index));
		else tableView[indexDef.accessorName] = freeze3(index);
	}
	return freeze3(tableView);
}
function hasOwn(o, k) {
	return Object.hasOwn(o, k);
}
function* tableIterator(id, ty) {
	var _stack = [];
	try {
		const iter = __using(_stack, new IteratorHandle(id));
		const { typespace } = MODULE_DEF;
		let buf;
		while ((buf = advanceIter(iter)) != null) {
			const reader = new BinaryReader(buf);
			while (reader.remaining > 0) yield AlgebraicType.deserializeValue(reader, ty, typespace);
		}
	} catch (_) {
		var _error = _, _hasError = true;
	} finally {
		__callDispose(_stack, _error, _hasError);
	}
}
function advanceIter(iter) {
	let buf_max_len = 65536;
	while (true) try {
		return iter.advance(buf_max_len);
	} catch (e) {
		if (e && typeof e === "object" && hasOwn(e, "__buffer_too_small__")) {
			buf_max_len = e.__buffer_too_small__;
			continue;
		}
		throw e;
	}
}
var IteratorHandle = class _IteratorHandle {
	#id;
	static #finalizationRegistry = new FinalizationRegistry(sys.row_iter_bsatn_close);
	constructor(id) {
		this.#id = id;
		_IteratorHandle.#finalizationRegistry.register(this, id, this);
	}
	/** Unregister this object with the finalization registry and return the id */
	#detach() {
		const id = this.#id;
		this.#id = -1;
		_IteratorHandle.#finalizationRegistry.unregister(this);
		return id;
	}
	/** Call `row_iter_bsatn_advance`, returning null if this iterator was already exhausted. */
	advance(buf_max_len) {
		if (this.#id === -1) return null;
		const { 0: done, 1: buf } = sys.row_iter_bsatn_advance(this.#id, buf_max_len);
		if (done) this.#detach();
		return buf;
	}
	[Symbol.dispose]() {
		if (this.#id >= 0) {
			const id = this.#detach();
			sys.row_iter_bsatn_close(id);
		}
	}
};
function wrapSyscalls(...modules) {
	return Object.fromEntries(modules.flatMap(Object.entries).map(([k, v]) => [k, wrapSyscall(v)]));
}
function wrapSyscall(func) {
	const name = func.name;
	return { [name](...args) {
		try {
			return func(...args);
		} catch (e) {
			if (e !== null && typeof e === "object" && hasOwn(e, "__code_error__") && typeof e.__code_error__ == "number") {
				const message = hasOwn(e, "__error_message__") && typeof e.__error_message__ === "string" ? e.__error_message__ : void 0;
				throw new SpacetimeHostError(e.__code_error__, message);
			}
			throw e;
		}
	} }[name];
}
function fmtLog(...data) {
	return data.join(" ");
}
var console_level_error = 0;
var console_level_warn = 1;
var console_level_info = 2;
var console_level_debug = 3;
var console_level_trace = 4;
var timerMap = /* @__PURE__ */ new Map();
var console2 = {
	__proto__: {},
	[Symbol.toStringTag]: "console",
	assert: (condition = false, ...data) => {
		if (!condition) sys.console_log(console_level_error, fmtLog(...data));
	},
	clear: () => {},
	debug: (...data) => {
		sys.console_log(console_level_debug, fmtLog(...data));
	},
	error: (...data) => {
		sys.console_log(console_level_error, fmtLog(...data));
	},
	info: (...data) => {
		sys.console_log(console_level_info, fmtLog(...data));
	},
	log: (...data) => {
		sys.console_log(console_level_info, fmtLog(...data));
	},
	table: (tabularData, _properties) => {
		sys.console_log(console_level_info, fmtLog(tabularData));
	},
	trace: (...data) => {
		sys.console_log(console_level_trace, fmtLog(...data));
	},
	warn: (...data) => {
		sys.console_log(console_level_warn, fmtLog(...data));
	},
	dir: (_item, _options) => {},
	dirxml: (..._data) => {},
	count: (_label = "default") => {},
	countReset: (_label = "default") => {},
	group: (..._data) => {},
	groupCollapsed: (..._data) => {},
	groupEnd: () => {},
	time: (label = "default") => {
		if (timerMap.has(label)) {
			sys.console_log(console_level_warn, `Timer '${label}' already exists.`);
			return;
		}
		timerMap.set(label, sys.console_timer_start(label));
	},
	timeLog: (label = "default", ...data) => {
		sys.console_log(console_level_info, fmtLog(label, ...data));
	},
	timeEnd: (label = "default") => {
		const spanId = timerMap.get(label);
		if (spanId === void 0) {
			sys.console_log(console_level_warn, `Timer '${label}' does not exist.`);
			return;
		}
		sys.console_timer_end(spanId);
		timerMap.delete(label);
	},
	timeStamp: () => {},
	profile: () => {},
	profileEnd: () => {}
};
console2.Console = console2;
globalThis.console = console2;
register_hooks(hooks);
register_hooks$1(hooks_v1_1);
register_hooks$2(hooks_v1_2);

//#endregion
//#region src/index.ts
const LLM_Results = table({
	name: "llm_result",
	public: true
}, {
	id: t.u128().autoInc().primaryKey(),
	prompt: t.string(),
	schema: t.string(),
	response: t.string(),
	provider: t.string(),
	model: t.string()
});
function validateSchema(content, schema$1) {
	return true;
}
const spacetimedb = schema(LLM_Results);
spacetimedb.reducer("add_call", {
	prompt: t.string(),
	schema: t.string(),
	response: t.string(),
	provider: t.string(),
	model: t.string()
}, (ctx, { prompt, schema: schema$1, response, provider, model }) => {
	if (!validateSchema(prompt, schema$1)) throw new Error("Invalid schema");
	ctx.db.llmResult.insert({
		id: 0n,
		prompt,
		schema: schema$1,
		response,
		provider,
		model
	});
});

//#endregion
export { spacetimedb };
//# debugId=a29af271-8331-4ede-b847-f0af5d7ea09d
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibmFtZXMiOlsiX19jcmVhdGUiLCJfX2RlZlByb3AiLCJfX2dldE93blByb3BEZXNjIiwiX19nZXRPd25Qcm9wTmFtZXMiLCJfX2dldFByb3RvT2YiLCJfX2hhc093blByb3AiLCJfX2NvbW1vbkpTIiwiX19jb3B5UHJvcHMiLCJfX3RvRVNNIiwiaW5pdCIsIiN2aWV3IiwiI29mZnNldCIsIiNlbnN1cmUiLCIjYnVmZmVyIiwiI2V4cGFuZEJ1ZmZlciIsIiNmcm9tIiwiI3RvIiwiI2JvZHkiLCIjaW5uZXIiLCIjaWRlbnRpdHkiLCIjc2VuZGVyQXV0aCIsIiN1dWlkQ291bnRlciIsIiNmaW5hbGl6YXRpb25SZWdpc3RyeSIsIiNpZCIsIiNkZXRhY2giLCJzY2hlbWEiXSwic291cmNlcyI6WyJub2RlX21vZHVsZXMvaGVhZGVycy1wb2x5ZmlsbC9saWIvaW5kZXgubWpzIiwibm9kZV9tb2R1bGVzL3NwYWNldGltZWRiL2Rpc3Qvc2VydmVyL2luZGV4Lm1qcyIsInNyYy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgX19jcmVhdGUgPSBPYmplY3QuY3JlYXRlO1xudmFyIF9fZGVmUHJvcCA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eTtcbnZhciBfX2dldE93blByb3BEZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcjtcbnZhciBfX2dldE93blByb3BOYW1lcyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzO1xudmFyIF9fZ2V0UHJvdG9PZiA9IE9iamVjdC5nZXRQcm90b3R5cGVPZjtcbnZhciBfX2hhc093blByb3AgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xudmFyIF9fY29tbW9uSlMgPSAoY2IsIG1vZCkgPT4gZnVuY3Rpb24gX19yZXF1aXJlKCkge1xuICByZXR1cm4gbW9kIHx8ICgwLCBjYltfX2dldE93blByb3BOYW1lcyhjYilbMF1dKSgobW9kID0geyBleHBvcnRzOiB7fSB9KS5leHBvcnRzLCBtb2QpLCBtb2QuZXhwb3J0cztcbn07XG52YXIgX19jb3B5UHJvcHMgPSAodG8sIGZyb20sIGV4Y2VwdCwgZGVzYykgPT4ge1xuICBpZiAoZnJvbSAmJiB0eXBlb2YgZnJvbSA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgZnJvbSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgZm9yIChsZXQga2V5IG9mIF9fZ2V0T3duUHJvcE5hbWVzKGZyb20pKVxuICAgICAgaWYgKCFfX2hhc093blByb3AuY2FsbCh0bywga2V5KSAmJiBrZXkgIT09IGV4Y2VwdClcbiAgICAgICAgX19kZWZQcm9wKHRvLCBrZXksIHsgZ2V0OiAoKSA9PiBmcm9tW2tleV0sIGVudW1lcmFibGU6ICEoZGVzYyA9IF9fZ2V0T3duUHJvcERlc2MoZnJvbSwga2V5KSkgfHwgZGVzYy5lbnVtZXJhYmxlIH0pO1xuICB9XG4gIHJldHVybiB0bztcbn07XG52YXIgX190b0VTTSA9IChtb2QsIGlzTm9kZU1vZGUsIHRhcmdldCkgPT4gKHRhcmdldCA9IG1vZCAhPSBudWxsID8gX19jcmVhdGUoX19nZXRQcm90b09mKG1vZCkpIDoge30sIF9fY29weVByb3BzKFxuICAvLyBJZiB0aGUgaW1wb3J0ZXIgaXMgaW4gbm9kZSBjb21wYXRpYmlsaXR5IG1vZGUgb3IgdGhpcyBpcyBub3QgYW4gRVNNXG4gIC8vIGZpbGUgdGhhdCBoYXMgYmVlbiBjb252ZXJ0ZWQgdG8gYSBDb21tb25KUyBmaWxlIHVzaW5nIGEgQmFiZWwtXG4gIC8vIGNvbXBhdGlibGUgdHJhbnNmb3JtIChpLmUuIFwiX19lc01vZHVsZVwiIGhhcyBub3QgYmVlbiBzZXQpLCB0aGVuIHNldFxuICAvLyBcImRlZmF1bHRcIiB0byB0aGUgQ29tbW9uSlMgXCJtb2R1bGUuZXhwb3J0c1wiIGZvciBub2RlIGNvbXBhdGliaWxpdHkuXG4gIGlzTm9kZU1vZGUgfHwgIW1vZCB8fCAhbW9kLl9fZXNNb2R1bGUgPyBfX2RlZlByb3AodGFyZ2V0LCBcImRlZmF1bHRcIiwgeyB2YWx1ZTogbW9kLCBlbnVtZXJhYmxlOiB0cnVlIH0pIDogdGFyZ2V0LFxuICBtb2RcbikpO1xuXG4vLyBub2RlX21vZHVsZXMvc2V0LWNvb2tpZS1wYXJzZXIvbGliL3NldC1jb29raWUuanNcbnZhciByZXF1aXJlX3NldF9jb29raWUgPSBfX2NvbW1vbkpTKHtcbiAgXCJub2RlX21vZHVsZXMvc2V0LWNvb2tpZS1wYXJzZXIvbGliL3NldC1jb29raWUuanNcIihleHBvcnRzLCBtb2R1bGUpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICB2YXIgZGVmYXVsdFBhcnNlT3B0aW9ucyA9IHtcbiAgICAgIGRlY29kZVZhbHVlczogdHJ1ZSxcbiAgICAgIG1hcDogZmFsc2UsXG4gICAgICBzaWxlbnQ6IGZhbHNlXG4gICAgfTtcbiAgICBmdW5jdGlvbiBpc05vbkVtcHR5U3RyaW5nKHN0cikge1xuICAgICAgcmV0dXJuIHR5cGVvZiBzdHIgPT09IFwic3RyaW5nXCIgJiYgISFzdHIudHJpbSgpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBwYXJzZVN0cmluZyhzZXRDb29raWVWYWx1ZSwgb3B0aW9ucykge1xuICAgICAgdmFyIHBhcnRzID0gc2V0Q29va2llVmFsdWUuc3BsaXQoXCI7XCIpLmZpbHRlcihpc05vbkVtcHR5U3RyaW5nKTtcbiAgICAgIHZhciBuYW1lVmFsdWVQYWlyU3RyID0gcGFydHMuc2hpZnQoKTtcbiAgICAgIHZhciBwYXJzZWQgPSBwYXJzZU5hbWVWYWx1ZVBhaXIobmFtZVZhbHVlUGFpclN0cik7XG4gICAgICB2YXIgbmFtZSA9IHBhcnNlZC5uYW1lO1xuICAgICAgdmFyIHZhbHVlID0gcGFyc2VkLnZhbHVlO1xuICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgPyBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0UGFyc2VPcHRpb25zLCBvcHRpb25zKSA6IGRlZmF1bHRQYXJzZU9wdGlvbnM7XG4gICAgICB0cnkge1xuICAgICAgICB2YWx1ZSA9IG9wdGlvbnMuZGVjb2RlVmFsdWVzID8gZGVjb2RlVVJJQ29tcG9uZW50KHZhbHVlKSA6IHZhbHVlO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjb25zb2xlLmVycm9yKFxuICAgICAgICAgIFwic2V0LWNvb2tpZS1wYXJzZXIgZW5jb3VudGVyZWQgYW4gZXJyb3Igd2hpbGUgZGVjb2RpbmcgYSBjb29raWUgd2l0aCB2YWx1ZSAnXCIgKyB2YWx1ZSArIFwiJy4gU2V0IG9wdGlvbnMuZGVjb2RlVmFsdWVzIHRvIGZhbHNlIHRvIGRpc2FibGUgdGhpcyBmZWF0dXJlLlwiLFxuICAgICAgICAgIGVcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIHZhciBjb29raWUgPSB7XG4gICAgICAgIG5hbWUsXG4gICAgICAgIHZhbHVlXG4gICAgICB9O1xuICAgICAgcGFydHMuZm9yRWFjaChmdW5jdGlvbihwYXJ0KSB7XG4gICAgICAgIHZhciBzaWRlcyA9IHBhcnQuc3BsaXQoXCI9XCIpO1xuICAgICAgICB2YXIga2V5ID0gc2lkZXMuc2hpZnQoKS50cmltTGVmdCgpLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIHZhciB2YWx1ZTIgPSBzaWRlcy5qb2luKFwiPVwiKTtcbiAgICAgICAgaWYgKGtleSA9PT0gXCJleHBpcmVzXCIpIHtcbiAgICAgICAgICBjb29raWUuZXhwaXJlcyA9IG5ldyBEYXRlKHZhbHVlMik7XG4gICAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSBcIm1heC1hZ2VcIikge1xuICAgICAgICAgIGNvb2tpZS5tYXhBZ2UgPSBwYXJzZUludCh2YWx1ZTIsIDEwKTtcbiAgICAgICAgfSBlbHNlIGlmIChrZXkgPT09IFwic2VjdXJlXCIpIHtcbiAgICAgICAgICBjb29raWUuc2VjdXJlID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIGlmIChrZXkgPT09IFwiaHR0cG9ubHlcIikge1xuICAgICAgICAgIGNvb2tpZS5odHRwT25seSA9IHRydWU7XG4gICAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSBcInNhbWVzaXRlXCIpIHtcbiAgICAgICAgICBjb29raWUuc2FtZVNpdGUgPSB2YWx1ZTI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29va2llW2tleV0gPSB2YWx1ZTI7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIGNvb2tpZTtcbiAgICB9XG4gICAgZnVuY3Rpb24gcGFyc2VOYW1lVmFsdWVQYWlyKG5hbWVWYWx1ZVBhaXJTdHIpIHtcbiAgICAgIHZhciBuYW1lID0gXCJcIjtcbiAgICAgIHZhciB2YWx1ZSA9IFwiXCI7XG4gICAgICB2YXIgbmFtZVZhbHVlQXJyID0gbmFtZVZhbHVlUGFpclN0ci5zcGxpdChcIj1cIik7XG4gICAgICBpZiAobmFtZVZhbHVlQXJyLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgbmFtZSA9IG5hbWVWYWx1ZUFyci5zaGlmdCgpO1xuICAgICAgICB2YWx1ZSA9IG5hbWVWYWx1ZUFyci5qb2luKFwiPVwiKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhbHVlID0gbmFtZVZhbHVlUGFpclN0cjtcbiAgICAgIH1cbiAgICAgIHJldHVybiB7IG5hbWUsIHZhbHVlIH07XG4gICAgfVxuICAgIGZ1bmN0aW9uIHBhcnNlKGlucHV0LCBvcHRpb25zKSB7XG4gICAgICBvcHRpb25zID0gb3B0aW9ucyA/IE9iamVjdC5hc3NpZ24oe30sIGRlZmF1bHRQYXJzZU9wdGlvbnMsIG9wdGlvbnMpIDogZGVmYXVsdFBhcnNlT3B0aW9ucztcbiAgICAgIGlmICghaW5wdXQpIHtcbiAgICAgICAgaWYgKCFvcHRpb25zLm1hcCkge1xuICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4ge307XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChpbnB1dC5oZWFkZXJzKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaW5wdXQuaGVhZGVycy5nZXRTZXRDb29raWUgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgIGlucHV0ID0gaW5wdXQuaGVhZGVycy5nZXRTZXRDb29raWUoKTtcbiAgICAgICAgfSBlbHNlIGlmIChpbnB1dC5oZWFkZXJzW1wic2V0LWNvb2tpZVwiXSkge1xuICAgICAgICAgIGlucHV0ID0gaW5wdXQuaGVhZGVyc1tcInNldC1jb29raWVcIl07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdmFyIHNjaCA9IGlucHV0LmhlYWRlcnNbT2JqZWN0LmtleXMoaW5wdXQuaGVhZGVycykuZmluZChmdW5jdGlvbihrZXkpIHtcbiAgICAgICAgICAgIHJldHVybiBrZXkudG9Mb3dlckNhc2UoKSA9PT0gXCJzZXQtY29va2llXCI7XG4gICAgICAgICAgfSldO1xuICAgICAgICAgIGlmICghc2NoICYmIGlucHV0LmhlYWRlcnMuY29va2llICYmICFvcHRpb25zLnNpbGVudCkge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAgICAgICBcIldhcm5pbmc6IHNldC1jb29raWUtcGFyc2VyIGFwcGVhcnMgdG8gaGF2ZSBiZWVuIGNhbGxlZCBvbiBhIHJlcXVlc3Qgb2JqZWN0LiBJdCBpcyBkZXNpZ25lZCB0byBwYXJzZSBTZXQtQ29va2llIGhlYWRlcnMgZnJvbSByZXNwb25zZXMsIG5vdCBDb29raWUgaGVhZGVycyBmcm9tIHJlcXVlc3RzLiBTZXQgdGhlIG9wdGlvbiB7c2lsZW50OiB0cnVlfSB0byBzdXBwcmVzcyB0aGlzIHdhcm5pbmcuXCJcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlucHV0ID0gc2NoO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoIUFycmF5LmlzQXJyYXkoaW5wdXQpKSB7XG4gICAgICAgIGlucHV0ID0gW2lucHV0XTtcbiAgICAgIH1cbiAgICAgIG9wdGlvbnMgPSBvcHRpb25zID8gT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdFBhcnNlT3B0aW9ucywgb3B0aW9ucykgOiBkZWZhdWx0UGFyc2VPcHRpb25zO1xuICAgICAgaWYgKCFvcHRpb25zLm1hcCkge1xuICAgICAgICByZXR1cm4gaW5wdXQuZmlsdGVyKGlzTm9uRW1wdHlTdHJpbmcpLm1hcChmdW5jdGlvbihzdHIpIHtcbiAgICAgICAgICByZXR1cm4gcGFyc2VTdHJpbmcoc3RyLCBvcHRpb25zKTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgY29va2llcyA9IHt9O1xuICAgICAgICByZXR1cm4gaW5wdXQuZmlsdGVyKGlzTm9uRW1wdHlTdHJpbmcpLnJlZHVjZShmdW5jdGlvbihjb29raWVzMiwgc3RyKSB7XG4gICAgICAgICAgdmFyIGNvb2tpZSA9IHBhcnNlU3RyaW5nKHN0ciwgb3B0aW9ucyk7XG4gICAgICAgICAgY29va2llczJbY29va2llLm5hbWVdID0gY29va2llO1xuICAgICAgICAgIHJldHVybiBjb29raWVzMjtcbiAgICAgICAgfSwgY29va2llcyk7XG4gICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIHNwbGl0Q29va2llc1N0cmluZzIoY29va2llc1N0cmluZykge1xuICAgICAgaWYgKEFycmF5LmlzQXJyYXkoY29va2llc1N0cmluZykpIHtcbiAgICAgICAgcmV0dXJuIGNvb2tpZXNTdHJpbmc7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIGNvb2tpZXNTdHJpbmcgIT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgfVxuICAgICAgdmFyIGNvb2tpZXNTdHJpbmdzID0gW107XG4gICAgICB2YXIgcG9zID0gMDtcbiAgICAgIHZhciBzdGFydDtcbiAgICAgIHZhciBjaDtcbiAgICAgIHZhciBsYXN0Q29tbWE7XG4gICAgICB2YXIgbmV4dFN0YXJ0O1xuICAgICAgdmFyIGNvb2tpZXNTZXBhcmF0b3JGb3VuZDtcbiAgICAgIGZ1bmN0aW9uIHNraXBXaGl0ZXNwYWNlKCkge1xuICAgICAgICB3aGlsZSAocG9zIDwgY29va2llc1N0cmluZy5sZW5ndGggJiYgL1xccy8udGVzdChjb29raWVzU3RyaW5nLmNoYXJBdChwb3MpKSkge1xuICAgICAgICAgIHBvcyArPSAxO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwb3MgPCBjb29raWVzU3RyaW5nLmxlbmd0aDtcbiAgICAgIH1cbiAgICAgIGZ1bmN0aW9uIG5vdFNwZWNpYWxDaGFyKCkge1xuICAgICAgICBjaCA9IGNvb2tpZXNTdHJpbmcuY2hhckF0KHBvcyk7XG4gICAgICAgIHJldHVybiBjaCAhPT0gXCI9XCIgJiYgY2ggIT09IFwiO1wiICYmIGNoICE9PSBcIixcIjtcbiAgICAgIH1cbiAgICAgIHdoaWxlIChwb3MgPCBjb29raWVzU3RyaW5nLmxlbmd0aCkge1xuICAgICAgICBzdGFydCA9IHBvcztcbiAgICAgICAgY29va2llc1NlcGFyYXRvckZvdW5kID0gZmFsc2U7XG4gICAgICAgIHdoaWxlIChza2lwV2hpdGVzcGFjZSgpKSB7XG4gICAgICAgICAgY2ggPSBjb29raWVzU3RyaW5nLmNoYXJBdChwb3MpO1xuICAgICAgICAgIGlmIChjaCA9PT0gXCIsXCIpIHtcbiAgICAgICAgICAgIGxhc3RDb21tYSA9IHBvcztcbiAgICAgICAgICAgIHBvcyArPSAxO1xuICAgICAgICAgICAgc2tpcFdoaXRlc3BhY2UoKTtcbiAgICAgICAgICAgIG5leHRTdGFydCA9IHBvcztcbiAgICAgICAgICAgIHdoaWxlIChwb3MgPCBjb29raWVzU3RyaW5nLmxlbmd0aCAmJiBub3RTcGVjaWFsQ2hhcigpKSB7XG4gICAgICAgICAgICAgIHBvcyArPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHBvcyA8IGNvb2tpZXNTdHJpbmcubGVuZ3RoICYmIGNvb2tpZXNTdHJpbmcuY2hhckF0KHBvcykgPT09IFwiPVwiKSB7XG4gICAgICAgICAgICAgIGNvb2tpZXNTZXBhcmF0b3JGb3VuZCA9IHRydWU7XG4gICAgICAgICAgICAgIHBvcyA9IG5leHRTdGFydDtcbiAgICAgICAgICAgICAgY29va2llc1N0cmluZ3MucHVzaChjb29raWVzU3RyaW5nLnN1YnN0cmluZyhzdGFydCwgbGFzdENvbW1hKSk7XG4gICAgICAgICAgICAgIHN0YXJ0ID0gcG9zO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcG9zID0gbGFzdENvbW1hICsgMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcG9zICs9IDE7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICghY29va2llc1NlcGFyYXRvckZvdW5kIHx8IHBvcyA+PSBjb29raWVzU3RyaW5nLmxlbmd0aCkge1xuICAgICAgICAgIGNvb2tpZXNTdHJpbmdzLnB1c2goY29va2llc1N0cmluZy5zdWJzdHJpbmcoc3RhcnQsIGNvb2tpZXNTdHJpbmcubGVuZ3RoKSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBjb29raWVzU3RyaW5ncztcbiAgICB9XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBwYXJzZTtcbiAgICBtb2R1bGUuZXhwb3J0cy5wYXJzZSA9IHBhcnNlO1xuICAgIG1vZHVsZS5leHBvcnRzLnBhcnNlU3RyaW5nID0gcGFyc2VTdHJpbmc7XG4gICAgbW9kdWxlLmV4cG9ydHMuc3BsaXRDb29raWVzU3RyaW5nID0gc3BsaXRDb29raWVzU3RyaW5nMjtcbiAgfVxufSk7XG5cbi8vIHNyYy9IZWFkZXJzLnRzXG52YXIgaW1wb3J0X3NldF9jb29raWVfcGFyc2VyID0gX190b0VTTShyZXF1aXJlX3NldF9jb29raWUoKSk7XG5cbi8vIHNyYy91dGlscy9ub3JtYWxpemVIZWFkZXJOYW1lLnRzXG52YXIgSEVBREVSU19JTlZBTElEX0NIQVJBQ1RFUlMgPSAvW15hLXowLTlcXC0jJCUmJyorLl5fYHx+XS9pO1xuZnVuY3Rpb24gbm9ybWFsaXplSGVhZGVyTmFtZShuYW1lKSB7XG4gIGlmIChIRUFERVJTX0lOVkFMSURfQ0hBUkFDVEVSUy50ZXN0KG5hbWUpIHx8IG5hbWUudHJpbSgpID09PSBcIlwiKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgY2hhcmFjdGVyIGluIGhlYWRlciBmaWVsZCBuYW1lXCIpO1xuICB9XG4gIHJldHVybiBuYW1lLnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xufVxuXG4vLyBzcmMvdXRpbHMvbm9ybWFsaXplSGVhZGVyVmFsdWUudHNcbnZhciBjaGFyQ29kZXNUb1JlbW92ZSA9IFtcbiAgU3RyaW5nLmZyb21DaGFyQ29kZSgxMCksXG4gIFN0cmluZy5mcm9tQ2hhckNvZGUoMTMpLFxuICBTdHJpbmcuZnJvbUNoYXJDb2RlKDkpLFxuICBTdHJpbmcuZnJvbUNoYXJDb2RlKDMyKVxuXTtcbnZhciBIRUFERVJfVkFMVUVfUkVNT1ZFX1JFR0VYUCA9IG5ldyBSZWdFeHAoXG4gIGAoXlske2NoYXJDb2Rlc1RvUmVtb3ZlLmpvaW4oXCJcIil9XXwkWyR7Y2hhckNvZGVzVG9SZW1vdmUuam9pbihcIlwiKX1dKWAsXG4gIFwiZ1wiXG4pO1xuZnVuY3Rpb24gbm9ybWFsaXplSGVhZGVyVmFsdWUodmFsdWUpIHtcbiAgY29uc3QgbmV4dFZhbHVlID0gdmFsdWUucmVwbGFjZShIRUFERVJfVkFMVUVfUkVNT1ZFX1JFR0VYUCwgXCJcIik7XG4gIHJldHVybiBuZXh0VmFsdWU7XG59XG5cbi8vIHNyYy91dGlscy9pc1ZhbGlkSGVhZGVyTmFtZS50c1xuZnVuY3Rpb24gaXNWYWxpZEhlYWRlck5hbWUodmFsdWUpIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gXCJzdHJpbmdcIikge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBpZiAodmFsdWUubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgdmFsdWUubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBjaGFyYWN0ZXIgPSB2YWx1ZS5jaGFyQ29kZUF0KGkpO1xuICAgIGlmIChjaGFyYWN0ZXIgPiAxMjcgfHwgIWlzVG9rZW4oY2hhcmFjdGVyKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn1cbmZ1bmN0aW9uIGlzVG9rZW4odmFsdWUpIHtcbiAgcmV0dXJuICFbXG4gICAgMTI3LFxuICAgIDMyLFxuICAgIFwiKFwiLFxuICAgIFwiKVwiLFxuICAgIFwiPFwiLFxuICAgIFwiPlwiLFxuICAgIFwiQFwiLFxuICAgIFwiLFwiLFxuICAgIFwiO1wiLFxuICAgIFwiOlwiLFxuICAgIFwiXFxcXFwiLFxuICAgICdcIicsXG4gICAgXCIvXCIsXG4gICAgXCJbXCIsXG4gICAgXCJdXCIsXG4gICAgXCI/XCIsXG4gICAgXCI9XCIsXG4gICAgXCJ7XCIsXG4gICAgXCJ9XCJcbiAgXS5pbmNsdWRlcyh2YWx1ZSk7XG59XG5cbi8vIHNyYy91dGlscy9pc1ZhbGlkSGVhZGVyVmFsdWUudHNcbmZ1bmN0aW9uIGlzVmFsaWRIZWFkZXJWYWx1ZSh2YWx1ZSkge1xuICBpZiAodHlwZW9mIHZhbHVlICE9PSBcInN0cmluZ1wiKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGlmICh2YWx1ZS50cmltKCkgIT09IHZhbHVlKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgdmFsdWUubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBjaGFyYWN0ZXIgPSB2YWx1ZS5jaGFyQ29kZUF0KGkpO1xuICAgIGlmIChcbiAgICAgIC8vIE5VTC5cbiAgICAgIGNoYXJhY3RlciA9PT0gMCB8fCAvLyBIVFRQIG5ld2xpbmUgYnl0ZXMuXG4gICAgICBjaGFyYWN0ZXIgPT09IDEwIHx8IGNoYXJhY3RlciA9PT0gMTNcbiAgICApIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59XG5cbi8vIHNyYy9IZWFkZXJzLnRzXG52YXIgTk9STUFMSVpFRF9IRUFERVJTID0gU3ltYm9sKFwibm9ybWFsaXplZEhlYWRlcnNcIik7XG52YXIgUkFXX0hFQURFUl9OQU1FUyA9IFN5bWJvbChcInJhd0hlYWRlck5hbWVzXCIpO1xudmFyIEhFQURFUl9WQUxVRV9ERUxJTUlURVIgPSBcIiwgXCI7XG52YXIgX2EsIF9iLCBfYztcbnZhciBIZWFkZXJzID0gY2xhc3MgX0hlYWRlcnMge1xuICBjb25zdHJ1Y3Rvcihpbml0KSB7XG4gICAgLy8gTm9ybWFsaXplZCBoZWFkZXIge1wibmFtZVwiOlwiYSwgYlwifSBzdG9yYWdlLlxuICAgIHRoaXNbX2FdID0ge307XG4gICAgLy8gS2VlcHMgdGhlIG1hcHBpbmcgYmV0d2VlbiB0aGUgcmF3IGhlYWRlciBuYW1lXG4gICAgLy8gYW5kIHRoZSBub3JtYWxpemVkIGhlYWRlciBuYW1lIHRvIGVhc2UgdGhlIGxvb2t1cC5cbiAgICB0aGlzW19iXSA9IC8qIEBfX1BVUkVfXyAqLyBuZXcgTWFwKCk7XG4gICAgdGhpc1tfY10gPSBcIkhlYWRlcnNcIjtcbiAgICBpZiAoW1wiSGVhZGVyc1wiLCBcIkhlYWRlcnNQb2x5ZmlsbFwiXS5pbmNsdWRlcyhpbml0Py5jb25zdHJ1Y3Rvci5uYW1lKSB8fCBpbml0IGluc3RhbmNlb2YgX0hlYWRlcnMgfHwgdHlwZW9mIGdsb2JhbFRoaXMuSGVhZGVycyAhPT0gXCJ1bmRlZmluZWRcIiAmJiBpbml0IGluc3RhbmNlb2YgZ2xvYmFsVGhpcy5IZWFkZXJzKSB7XG4gICAgICBjb25zdCBpbml0aWFsSGVhZGVycyA9IGluaXQ7XG4gICAgICBpbml0aWFsSGVhZGVycy5mb3JFYWNoKCh2YWx1ZSwgbmFtZSkgPT4ge1xuICAgICAgICB0aGlzLmFwcGVuZChuYW1lLCB2YWx1ZSk7XG4gICAgICB9LCB0aGlzKTtcbiAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoaW5pdCkpIHtcbiAgICAgIGluaXQuZm9yRWFjaCgoW25hbWUsIHZhbHVlXSkgPT4ge1xuICAgICAgICB0aGlzLmFwcGVuZChcbiAgICAgICAgICBuYW1lLFxuICAgICAgICAgIEFycmF5LmlzQXJyYXkodmFsdWUpID8gdmFsdWUuam9pbihIRUFERVJfVkFMVUVfREVMSU1JVEVSKSA6IHZhbHVlXG4gICAgICAgICk7XG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKGluaXQpIHtcbiAgICAgIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGluaXQpLmZvckVhY2goKG5hbWUpID0+IHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSBpbml0W25hbWVdO1xuICAgICAgICB0aGlzLmFwcGVuZChcbiAgICAgICAgICBuYW1lLFxuICAgICAgICAgIEFycmF5LmlzQXJyYXkodmFsdWUpID8gdmFsdWUuam9pbihIRUFERVJfVkFMVUVfREVMSU1JVEVSKSA6IHZhbHVlXG4gICAgICAgICk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbiAgWyhfYSA9IE5PUk1BTElaRURfSEVBREVSUywgX2IgPSBSQVdfSEVBREVSX05BTUVTLCBfYyA9IFN5bWJvbC50b1N0cmluZ1RhZywgU3ltYm9sLml0ZXJhdG9yKV0oKSB7XG4gICAgcmV0dXJuIHRoaXMuZW50cmllcygpO1xuICB9XG4gICprZXlzKCkge1xuICAgIGZvciAoY29uc3QgW25hbWVdIG9mIHRoaXMuZW50cmllcygpKSB7XG4gICAgICB5aWVsZCBuYW1lO1xuICAgIH1cbiAgfVxuICAqdmFsdWVzKCkge1xuICAgIGZvciAoY29uc3QgWywgdmFsdWVdIG9mIHRoaXMuZW50cmllcygpKSB7XG4gICAgICB5aWVsZCB2YWx1ZTtcbiAgICB9XG4gIH1cbiAgKmVudHJpZXMoKSB7XG4gICAgbGV0IHNvcnRlZEtleXMgPSBPYmplY3Qua2V5cyh0aGlzW05PUk1BTElaRURfSEVBREVSU10pLnNvcnQoXG4gICAgICAoYSwgYikgPT4gYS5sb2NhbGVDb21wYXJlKGIpXG4gICAgKTtcbiAgICBmb3IgKGNvbnN0IG5hbWUgb2Ygc29ydGVkS2V5cykge1xuICAgICAgaWYgKG5hbWUgPT09IFwic2V0LWNvb2tpZVwiKSB7XG4gICAgICAgIGZvciAoY29uc3QgdmFsdWUgb2YgdGhpcy5nZXRTZXRDb29raWUoKSkge1xuICAgICAgICAgIHlpZWxkIFtuYW1lLCB2YWx1ZV07XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHlpZWxkIFtuYW1lLCB0aGlzLmdldChuYW1lKV07XG4gICAgICB9XG4gICAgfVxuICB9XG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgYm9vbGVhbiBzdGF0aW5nIHdoZXRoZXIgYSBgSGVhZGVyc2Agb2JqZWN0IGNvbnRhaW5zIGEgY2VydGFpbiBoZWFkZXIuXG4gICAqL1xuICBoYXMobmFtZSkge1xuICAgIGlmICghaXNWYWxpZEhlYWRlck5hbWUobmFtZSkpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYEludmFsaWQgaGVhZGVyIG5hbWUgXCIke25hbWV9XCJgKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXNbTk9STUFMSVpFRF9IRUFERVJTXS5oYXNPd25Qcm9wZXJ0eShub3JtYWxpemVIZWFkZXJOYW1lKG5hbWUpKTtcbiAgfVxuICAvKipcbiAgICogUmV0dXJucyBhIGBCeXRlU3RyaW5nYCBzZXF1ZW5jZSBvZiBhbGwgdGhlIHZhbHVlcyBvZiBhIGhlYWRlciB3aXRoIGEgZ2l2ZW4gbmFtZS5cbiAgICovXG4gIGdldChuYW1lKSB7XG4gICAgaWYgKCFpc1ZhbGlkSGVhZGVyTmFtZShuYW1lKSkge1xuICAgICAgdGhyb3cgVHlwZUVycm9yKGBJbnZhbGlkIGhlYWRlciBuYW1lIFwiJHtuYW1lfVwiYCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzW05PUk1BTElaRURfSEVBREVSU11bbm9ybWFsaXplSGVhZGVyTmFtZShuYW1lKV0gPz8gbnVsbDtcbiAgfVxuICAvKipcbiAgICogU2V0cyBhIG5ldyB2YWx1ZSBmb3IgYW4gZXhpc3RpbmcgaGVhZGVyIGluc2lkZSBhIGBIZWFkZXJzYCBvYmplY3QsIG9yIGFkZHMgdGhlIGhlYWRlciBpZiBpdCBkb2VzIG5vdCBhbHJlYWR5IGV4aXN0LlxuICAgKi9cbiAgc2V0KG5hbWUsIHZhbHVlKSB7XG4gICAgaWYgKCFpc1ZhbGlkSGVhZGVyTmFtZShuYW1lKSB8fCAhaXNWYWxpZEhlYWRlclZhbHVlKHZhbHVlKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBub3JtYWxpemVkTmFtZSA9IG5vcm1hbGl6ZUhlYWRlck5hbWUobmFtZSk7XG4gICAgY29uc3Qgbm9ybWFsaXplZFZhbHVlID0gbm9ybWFsaXplSGVhZGVyVmFsdWUodmFsdWUpO1xuICAgIHRoaXNbTk9STUFMSVpFRF9IRUFERVJTXVtub3JtYWxpemVkTmFtZV0gPSBub3JtYWxpemVIZWFkZXJWYWx1ZShub3JtYWxpemVkVmFsdWUpO1xuICAgIHRoaXNbUkFXX0hFQURFUl9OQU1FU10uc2V0KG5vcm1hbGl6ZWROYW1lLCBuYW1lKTtcbiAgfVxuICAvKipcbiAgICogQXBwZW5kcyBhIG5ldyB2YWx1ZSBvbnRvIGFuIGV4aXN0aW5nIGhlYWRlciBpbnNpZGUgYSBgSGVhZGVyc2Agb2JqZWN0LCBvciBhZGRzIHRoZSBoZWFkZXIgaWYgaXQgZG9lcyBub3QgYWxyZWFkeSBleGlzdC5cbiAgICovXG4gIGFwcGVuZChuYW1lLCB2YWx1ZSkge1xuICAgIGlmICghaXNWYWxpZEhlYWRlck5hbWUobmFtZSkgfHwgIWlzVmFsaWRIZWFkZXJWYWx1ZSh2YWx1ZSkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3Qgbm9ybWFsaXplZE5hbWUgPSBub3JtYWxpemVIZWFkZXJOYW1lKG5hbWUpO1xuICAgIGNvbnN0IG5vcm1hbGl6ZWRWYWx1ZSA9IG5vcm1hbGl6ZUhlYWRlclZhbHVlKHZhbHVlKTtcbiAgICBsZXQgcmVzb2x2ZWRWYWx1ZSA9IHRoaXMuaGFzKG5vcm1hbGl6ZWROYW1lKSA/IGAke3RoaXMuZ2V0KG5vcm1hbGl6ZWROYW1lKX0sICR7bm9ybWFsaXplZFZhbHVlfWAgOiBub3JtYWxpemVkVmFsdWU7XG4gICAgdGhpcy5zZXQobmFtZSwgcmVzb2x2ZWRWYWx1ZSk7XG4gIH1cbiAgLyoqXG4gICAqIERlbGV0ZXMgYSBoZWFkZXIgZnJvbSB0aGUgYEhlYWRlcnNgIG9iamVjdC5cbiAgICovXG4gIGRlbGV0ZShuYW1lKSB7XG4gICAgaWYgKCFpc1ZhbGlkSGVhZGVyTmFtZShuYW1lKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoIXRoaXMuaGFzKG5hbWUpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IG5vcm1hbGl6ZWROYW1lID0gbm9ybWFsaXplSGVhZGVyTmFtZShuYW1lKTtcbiAgICBkZWxldGUgdGhpc1tOT1JNQUxJWkVEX0hFQURFUlNdW25vcm1hbGl6ZWROYW1lXTtcbiAgICB0aGlzW1JBV19IRUFERVJfTkFNRVNdLmRlbGV0ZShub3JtYWxpemVkTmFtZSk7XG4gIH1cbiAgLyoqXG4gICAqIFRyYXZlcnNlcyB0aGUgYEhlYWRlcnNgIG9iamVjdCxcbiAgICogY2FsbGluZyB0aGUgZ2l2ZW4gY2FsbGJhY2sgZm9yIGVhY2ggaGVhZGVyLlxuICAgKi9cbiAgZm9yRWFjaChjYWxsYmFjaywgdGhpc0FyZykge1xuICAgIGZvciAoY29uc3QgW25hbWUsIHZhbHVlXSBvZiB0aGlzLmVudHJpZXMoKSkge1xuICAgICAgY2FsbGJhY2suY2FsbCh0aGlzQXJnLCB2YWx1ZSwgbmFtZSwgdGhpcyk7XG4gICAgfVxuICB9XG4gIC8qKlxuICAgKiBSZXR1cm5zIGFuIGFycmF5IGNvbnRhaW5pbmcgdGhlIHZhbHVlc1xuICAgKiBvZiBhbGwgU2V0LUNvb2tpZSBoZWFkZXJzIGFzc29jaWF0ZWRcbiAgICogd2l0aCBhIHJlc3BvbnNlXG4gICAqL1xuICBnZXRTZXRDb29raWUoKSB7XG4gICAgY29uc3Qgc2V0Q29va2llSGVhZGVyID0gdGhpcy5nZXQoXCJzZXQtY29va2llXCIpO1xuICAgIGlmIChzZXRDb29raWVIZWFkZXIgPT09IG51bGwpIHtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9XG4gICAgaWYgKHNldENvb2tpZUhlYWRlciA9PT0gXCJcIikge1xuICAgICAgcmV0dXJuIFtcIlwiXTtcbiAgICB9XG4gICAgcmV0dXJuICgwLCBpbXBvcnRfc2V0X2Nvb2tpZV9wYXJzZXIuc3BsaXRDb29raWVzU3RyaW5nKShzZXRDb29raWVIZWFkZXIpO1xuICB9XG59O1xuXG4vLyBzcmMvZ2V0UmF3SGVhZGVycy50c1xuZnVuY3Rpb24gZ2V0UmF3SGVhZGVycyhoZWFkZXJzKSB7XG4gIGNvbnN0IHJhd0hlYWRlcnMgPSB7fTtcbiAgZm9yIChjb25zdCBbbmFtZSwgdmFsdWVdIG9mIGhlYWRlcnMuZW50cmllcygpKSB7XG4gICAgcmF3SGVhZGVyc1toZWFkZXJzW1JBV19IRUFERVJfTkFNRVNdLmdldChuYW1lKV0gPSB2YWx1ZTtcbiAgfVxuICByZXR1cm4gcmF3SGVhZGVycztcbn1cblxuLy8gc3JjL3RyYW5zZm9ybWVycy9oZWFkZXJzVG9MaXN0LnRzXG5mdW5jdGlvbiBoZWFkZXJzVG9MaXN0KGhlYWRlcnMpIHtcbiAgY29uc3QgaGVhZGVyc0xpc3QgPSBbXTtcbiAgaGVhZGVycy5mb3JFYWNoKCh2YWx1ZSwgbmFtZSkgPT4ge1xuICAgIGNvbnN0IHJlc29sdmVkVmFsdWUgPSB2YWx1ZS5pbmNsdWRlcyhcIixcIikgPyB2YWx1ZS5zcGxpdChcIixcIikubWFwKCh2YWx1ZTIpID0+IHZhbHVlMi50cmltKCkpIDogdmFsdWU7XG4gICAgaGVhZGVyc0xpc3QucHVzaChbbmFtZSwgcmVzb2x2ZWRWYWx1ZV0pO1xuICB9KTtcbiAgcmV0dXJuIGhlYWRlcnNMaXN0O1xufVxuXG4vLyBzcmMvdHJhbnNmb3JtZXJzL2hlYWRlcnNUb1N0cmluZy50c1xuZnVuY3Rpb24gaGVhZGVyc1RvU3RyaW5nKGhlYWRlcnMpIHtcbiAgY29uc3QgbGlzdCA9IGhlYWRlcnNUb0xpc3QoaGVhZGVycyk7XG4gIGNvbnN0IGxpbmVzID0gbGlzdC5tYXAoKFtuYW1lLCB2YWx1ZV0pID0+IHtcbiAgICBjb25zdCB2YWx1ZXMgPSBbXS5jb25jYXQodmFsdWUpO1xuICAgIHJldHVybiBgJHtuYW1lfTogJHt2YWx1ZXMuam9pbihcIiwgXCIpfWA7XG4gIH0pO1xuICByZXR1cm4gbGluZXMuam9pbihcIlxcclxcblwiKTtcbn1cblxuLy8gc3JjL3RyYW5zZm9ybWVycy9oZWFkZXJzVG9PYmplY3QudHNcbnZhciBzaW5nbGVWYWx1ZUhlYWRlcnMgPSBbXCJ1c2VyLWFnZW50XCJdO1xuZnVuY3Rpb24gaGVhZGVyc1RvT2JqZWN0KGhlYWRlcnMpIHtcbiAgY29uc3QgaGVhZGVyc09iamVjdCA9IHt9O1xuICBoZWFkZXJzLmZvckVhY2goKHZhbHVlLCBuYW1lKSA9PiB7XG4gICAgY29uc3QgaXNNdWx0aVZhbHVlID0gIXNpbmdsZVZhbHVlSGVhZGVycy5pbmNsdWRlcyhuYW1lLnRvTG93ZXJDYXNlKCkpICYmIHZhbHVlLmluY2x1ZGVzKFwiLFwiKTtcbiAgICBoZWFkZXJzT2JqZWN0W25hbWVdID0gaXNNdWx0aVZhbHVlID8gdmFsdWUuc3BsaXQoXCIsXCIpLm1hcCgocykgPT4gcy50cmltKCkpIDogdmFsdWU7XG4gIH0pO1xuICByZXR1cm4gaGVhZGVyc09iamVjdDtcbn1cblxuLy8gc3JjL3RyYW5zZm9ybWVycy9zdHJpbmdUb0hlYWRlcnMudHNcbmZ1bmN0aW9uIHN0cmluZ1RvSGVhZGVycyhzdHIpIHtcbiAgY29uc3QgbGluZXMgPSBzdHIudHJpbSgpLnNwbGl0KC9bXFxyXFxuXSsvKTtcbiAgcmV0dXJuIGxpbmVzLnJlZHVjZSgoaGVhZGVycywgbGluZSkgPT4ge1xuICAgIGlmIChsaW5lLnRyaW0oKSA9PT0gXCJcIikge1xuICAgICAgcmV0dXJuIGhlYWRlcnM7XG4gICAgfVxuICAgIGNvbnN0IHBhcnRzID0gbGluZS5zcGxpdChcIjogXCIpO1xuICAgIGNvbnN0IG5hbWUgPSBwYXJ0cy5zaGlmdCgpO1xuICAgIGNvbnN0IHZhbHVlID0gcGFydHMuam9pbihcIjogXCIpO1xuICAgIGhlYWRlcnMuYXBwZW5kKG5hbWUsIHZhbHVlKTtcbiAgICByZXR1cm4gaGVhZGVycztcbiAgfSwgbmV3IEhlYWRlcnMoKSk7XG59XG5cbi8vIHNyYy90cmFuc2Zvcm1lcnMvbGlzdFRvSGVhZGVycy50c1xuZnVuY3Rpb24gbGlzdFRvSGVhZGVycyhsaXN0KSB7XG4gIGNvbnN0IGhlYWRlcnMgPSBuZXcgSGVhZGVycygpO1xuICBsaXN0LmZvckVhY2goKFtuYW1lLCB2YWx1ZV0pID0+IHtcbiAgICBjb25zdCB2YWx1ZXMgPSBbXS5jb25jYXQodmFsdWUpO1xuICAgIHZhbHVlcy5mb3JFYWNoKCh2YWx1ZTIpID0+IHtcbiAgICAgIGhlYWRlcnMuYXBwZW5kKG5hbWUsIHZhbHVlMik7XG4gICAgfSk7XG4gIH0pO1xuICByZXR1cm4gaGVhZGVycztcbn1cblxuLy8gc3JjL3RyYW5zZm9ybWVycy9yZWR1Y2VIZWFkZXJzT2JqZWN0LnRzXG5mdW5jdGlvbiByZWR1Y2VIZWFkZXJzT2JqZWN0KGhlYWRlcnMsIHJlZHVjZXIsIGluaXRpYWxTdGF0ZSkge1xuICByZXR1cm4gT2JqZWN0LmtleXMoaGVhZGVycykucmVkdWNlKChuZXh0SGVhZGVycywgbmFtZSkgPT4ge1xuICAgIHJldHVybiByZWR1Y2VyKG5leHRIZWFkZXJzLCBuYW1lLCBoZWFkZXJzW25hbWVdKTtcbiAgfSwgaW5pdGlhbFN0YXRlKTtcbn1cblxuLy8gc3JjL3RyYW5zZm9ybWVycy9vYmplY3RUb0hlYWRlcnMudHNcbmZ1bmN0aW9uIG9iamVjdFRvSGVhZGVycyhoZWFkZXJzT2JqZWN0KSB7XG4gIHJldHVybiByZWR1Y2VIZWFkZXJzT2JqZWN0KFxuICAgIGhlYWRlcnNPYmplY3QsXG4gICAgKGhlYWRlcnMsIG5hbWUsIHZhbHVlKSA9PiB7XG4gICAgICBjb25zdCB2YWx1ZXMgPSBbXS5jb25jYXQodmFsdWUpLmZpbHRlcihCb29sZWFuKTtcbiAgICAgIHZhbHVlcy5mb3JFYWNoKCh2YWx1ZTIpID0+IHtcbiAgICAgICAgaGVhZGVycy5hcHBlbmQobmFtZSwgdmFsdWUyKTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIGhlYWRlcnM7XG4gICAgfSxcbiAgICBuZXcgSGVhZGVycygpXG4gICk7XG59XG5cbi8vIHNyYy90cmFuc2Zvcm1lcnMvZmxhdHRlbkhlYWRlcnNMaXN0LnRzXG5mdW5jdGlvbiBmbGF0dGVuSGVhZGVyc0xpc3QobGlzdCkge1xuICByZXR1cm4gbGlzdC5tYXAoKFtuYW1lLCB2YWx1ZXNdKSA9PiB7XG4gICAgcmV0dXJuIFtuYW1lLCBbXS5jb25jYXQodmFsdWVzKS5qb2luKFwiLCBcIildO1xuICB9KTtcbn1cblxuLy8gc3JjL3RyYW5zZm9ybWVycy9mbGF0dGVuSGVhZGVyc09iamVjdC50c1xuZnVuY3Rpb24gZmxhdHRlbkhlYWRlcnNPYmplY3QoaGVhZGVyc09iamVjdCkge1xuICByZXR1cm4gcmVkdWNlSGVhZGVyc09iamVjdChcbiAgICBoZWFkZXJzT2JqZWN0LFxuICAgIChoZWFkZXJzLCBuYW1lLCB2YWx1ZSkgPT4ge1xuICAgICAgaGVhZGVyc1tuYW1lXSA9IFtdLmNvbmNhdCh2YWx1ZSkuam9pbihcIiwgXCIpO1xuICAgICAgcmV0dXJuIGhlYWRlcnM7XG4gICAgfSxcbiAgICB7fVxuICApO1xufVxuZXhwb3J0IHtcbiAgSGVhZGVycyxcbiAgZmxhdHRlbkhlYWRlcnNMaXN0LFxuICBmbGF0dGVuSGVhZGVyc09iamVjdCxcbiAgZ2V0UmF3SGVhZGVycyxcbiAgaGVhZGVyc1RvTGlzdCxcbiAgaGVhZGVyc1RvT2JqZWN0LFxuICBoZWFkZXJzVG9TdHJpbmcsXG4gIGxpc3RUb0hlYWRlcnMsXG4gIG9iamVjdFRvSGVhZGVycyxcbiAgcmVkdWNlSGVhZGVyc09iamVjdCxcbiAgc3RyaW5nVG9IZWFkZXJzXG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXgubWpzLm1hcCIsImltcG9ydCAqIGFzIF9zeXNjYWxsczFfMCBmcm9tICdzcGFjZXRpbWU6c3lzQDEuMCc7XG5pbXBvcnQgeyByZWdpc3Rlcl9ob29rcyB9IGZyb20gJ3NwYWNldGltZTpzeXNAMS4wJztcbmltcG9ydCB7IHJlZ2lzdGVyX2hvb2tzIGFzIHJlZ2lzdGVyX2hvb2tzJDEgfSBmcm9tICdzcGFjZXRpbWU6c3lzQDEuMSc7XG5pbXBvcnQgKiBhcyBfc3lzY2FsbHMxXzIgZnJvbSAnc3BhY2V0aW1lOnN5c0AxLjInO1xuaW1wb3J0IHsgcmVnaXN0ZXJfaG9va3MgYXMgcmVnaXN0ZXJfaG9va3MkMiB9IGZyb20gJ3NwYWNldGltZTpzeXNAMS4yJztcbmltcG9ydCB7IGhlYWRlcnNUb0xpc3QsIEhlYWRlcnMgfSBmcm9tICdoZWFkZXJzLXBvbHlmaWxsJztcblxudHlwZW9mIGdsb2JhbFRoaXMhPT1cInVuZGVmaW5lZFwiJiYoKGdsb2JhbFRoaXMuZ2xvYmFsPWdsb2JhbFRoaXMuZ2xvYmFsfHxnbG9iYWxUaGlzKSwoZ2xvYmFsVGhpcy53aW5kb3c9Z2xvYmFsVGhpcy53aW5kb3d8fGdsb2JhbFRoaXMpKTtcbnZhciBfX2NyZWF0ZSA9IE9iamVjdC5jcmVhdGU7XG52YXIgX19kZWZQcm9wID0gT2JqZWN0LmRlZmluZVByb3BlcnR5O1xudmFyIF9fZ2V0T3duUHJvcERlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yO1xudmFyIF9fZ2V0T3duUHJvcE5hbWVzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXM7XG52YXIgX19nZXRQcm90b09mID0gT2JqZWN0LmdldFByb3RvdHlwZU9mO1xudmFyIF9faGFzT3duUHJvcCA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG52YXIgX19rbm93blN5bWJvbCA9IChuYW1lLCBzeW1ib2wpID0+IChzeW1ib2wgPSBTeW1ib2xbbmFtZV0pID8gc3ltYm9sIDogU3ltYm9sLmZvcihcIlN5bWJvbC5cIiArIG5hbWUpO1xudmFyIF9fdHlwZUVycm9yID0gKG1zZykgPT4ge1xuICB0aHJvdyBUeXBlRXJyb3IobXNnKTtcbn07XG52YXIgX19jb21tb25KUyA9IChjYiwgbW9kKSA9PiBmdW5jdGlvbiBfX3JlcXVpcmUoKSB7XG4gIHJldHVybiBtb2QgfHwgKDAsIGNiW19fZ2V0T3duUHJvcE5hbWVzKGNiKVswXV0pKChtb2QgPSB7IGV4cG9ydHM6IHt9IH0pLmV4cG9ydHMsIG1vZCksIG1vZC5leHBvcnRzO1xufTtcbnZhciBfX2NvcHlQcm9wcyA9ICh0bywgZnJvbSwgZXhjZXB0LCBkZXNjKSA9PiB7XG4gIGlmIChmcm9tICYmIHR5cGVvZiBmcm9tID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBmcm9tID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICBmb3IgKGxldCBrZXkgb2YgX19nZXRPd25Qcm9wTmFtZXMoZnJvbSkpXG4gICAgICBpZiAoIV9faGFzT3duUHJvcC5jYWxsKHRvLCBrZXkpICYmIGtleSAhPT0gZXhjZXB0KVxuICAgICAgICBfX2RlZlByb3AodG8sIGtleSwgeyBnZXQ6ICgpID0+IGZyb21ba2V5XSwgZW51bWVyYWJsZTogIShkZXNjID0gX19nZXRPd25Qcm9wRGVzYyhmcm9tLCBrZXkpKSB8fCBkZXNjLmVudW1lcmFibGUgfSk7XG4gIH1cbiAgcmV0dXJuIHRvO1xufTtcbnZhciBfX3RvRVNNID0gKG1vZCwgaXNOb2RlTW9kZSwgdGFyZ2V0KSA9PiAodGFyZ2V0ID0gbW9kICE9IG51bGwgPyBfX2NyZWF0ZShfX2dldFByb3RvT2YobW9kKSkgOiB7fSwgX19jb3B5UHJvcHMoXG4gIC8vIElmIHRoZSBpbXBvcnRlciBpcyBpbiBub2RlIGNvbXBhdGliaWxpdHkgbW9kZSBvciB0aGlzIGlzIG5vdCBhbiBFU01cbiAgLy8gZmlsZSB0aGF0IGhhcyBiZWVuIGNvbnZlcnRlZCB0byBhIENvbW1vbkpTIGZpbGUgdXNpbmcgYSBCYWJlbC1cbiAgLy8gY29tcGF0aWJsZSB0cmFuc2Zvcm0gKGkuZS4gXCJfX2VzTW9kdWxlXCIgaGFzIG5vdCBiZWVuIHNldCksIHRoZW4gc2V0XG4gIC8vIFwiZGVmYXVsdFwiIHRvIHRoZSBDb21tb25KUyBcIm1vZHVsZS5leHBvcnRzXCIgZm9yIG5vZGUgY29tcGF0aWJpbGl0eS5cbiAgX19kZWZQcm9wKHRhcmdldCwgXCJkZWZhdWx0XCIsIHsgdmFsdWU6IG1vZCwgZW51bWVyYWJsZTogdHJ1ZSB9KSAsXG4gIG1vZFxuKSk7XG52YXIgX191c2luZyA9IChzdGFjaywgdmFsdWUsIGFzeW5jKSA9PiB7XG4gIGlmICh2YWx1ZSAhPSBudWxsKSB7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgdmFsdWUgIT09IFwiZnVuY3Rpb25cIikgX190eXBlRXJyb3IoXCJPYmplY3QgZXhwZWN0ZWRcIik7XG4gICAgdmFyIGRpc3Bvc2UsIGlubmVyO1xuICAgIGlmIChkaXNwb3NlID09PSB2b2lkIDApIHtcbiAgICAgIGRpc3Bvc2UgPSB2YWx1ZVtfX2tub3duU3ltYm9sKFwiZGlzcG9zZVwiKV07XG4gICAgfVxuICAgIGlmICh0eXBlb2YgZGlzcG9zZSAhPT0gXCJmdW5jdGlvblwiKSBfX3R5cGVFcnJvcihcIk9iamVjdCBub3QgZGlzcG9zYWJsZVwiKTtcbiAgICBpZiAoaW5uZXIpIGRpc3Bvc2UgPSBmdW5jdGlvbigpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGlubmVyLmNhbGwodGhpcyk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHN0YWNrLnB1c2goW2FzeW5jLCBkaXNwb3NlLCB2YWx1ZV0pO1xuICB9XG4gIHJldHVybiB2YWx1ZTtcbn07XG52YXIgX19jYWxsRGlzcG9zZSA9IChzdGFjaywgZXJyb3IsIGhhc0Vycm9yKSA9PiB7XG4gIHZhciBFID0gdHlwZW9mIFN1cHByZXNzZWRFcnJvciA9PT0gXCJmdW5jdGlvblwiID8gU3VwcHJlc3NlZEVycm9yIDogZnVuY3Rpb24oZSwgcywgbSwgXykge1xuICAgIHJldHVybiBfID0gRXJyb3IobSksIF8ubmFtZSA9IFwiU3VwcHJlc3NlZEVycm9yXCIsIF8uZXJyb3IgPSBlLCBfLnN1cHByZXNzZWQgPSBzLCBfO1xuICB9O1xuICB2YXIgZmFpbCA9IChlKSA9PiBlcnJvciA9IGhhc0Vycm9yID8gbmV3IEUoZSwgZXJyb3IsIFwiQW4gZXJyb3Igd2FzIHN1cHByZXNzZWQgZHVyaW5nIGRpc3Bvc2FsXCIpIDogKGhhc0Vycm9yID0gdHJ1ZSwgZSk7XG4gIHZhciBuZXh0ID0gKGl0KSA9PiB7XG4gICAgd2hpbGUgKGl0ID0gc3RhY2sucG9wKCkpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHZhciByZXN1bHQgPSBpdFsxXSAmJiBpdFsxXS5jYWxsKGl0WzJdKTtcbiAgICAgICAgaWYgKGl0WzBdKSByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlc3VsdCkudGhlbihuZXh0LCAoZSkgPT4gKGZhaWwoZSksIG5leHQoKSkpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBmYWlsKGUpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoaGFzRXJyb3IpIHRocm93IGVycm9yO1xuICB9O1xuICByZXR1cm4gbmV4dCgpO1xufTtcblxuLy8gLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL2Jhc2U2NC1qc0AxLjUuMS9ub2RlX21vZHVsZXMvYmFzZTY0LWpzL2luZGV4LmpzXG52YXIgcmVxdWlyZV9iYXNlNjRfanMgPSBfX2NvbW1vbkpTKHtcbiAgXCIuLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vYmFzZTY0LWpzQDEuNS4xL25vZGVfbW9kdWxlcy9iYXNlNjQtanMvaW5kZXguanNcIihleHBvcnRzKSB7XG4gICAgZXhwb3J0cy5ieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aDtcbiAgICBleHBvcnRzLnRvQnl0ZUFycmF5ID0gdG9CeXRlQXJyYXk7XG4gICAgZXhwb3J0cy5mcm9tQnl0ZUFycmF5ID0gZnJvbUJ5dGVBcnJheTI7XG4gICAgdmFyIGxvb2t1cCA9IFtdO1xuICAgIHZhciByZXZMb29rdXAgPSBbXTtcbiAgICB2YXIgQXJyID0gdHlwZW9mIFVpbnQ4QXJyYXkgIT09IFwidW5kZWZpbmVkXCIgPyBVaW50OEFycmF5IDogQXJyYXk7XG4gICAgdmFyIGNvZGUgPSBcIkFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5Ky9cIjtcbiAgICBmb3IgKGkgPSAwLCBsZW4gPSBjb2RlLmxlbmd0aDsgaSA8IGxlbjsgKytpKSB7XG4gICAgICBsb29rdXBbaV0gPSBjb2RlW2ldO1xuICAgICAgcmV2TG9va3VwW2NvZGUuY2hhckNvZGVBdChpKV0gPSBpO1xuICAgIH1cbiAgICB2YXIgaTtcbiAgICB2YXIgbGVuO1xuICAgIHJldkxvb2t1cFtcIi1cIi5jaGFyQ29kZUF0KDApXSA9IDYyO1xuICAgIHJldkxvb2t1cFtcIl9cIi5jaGFyQ29kZUF0KDApXSA9IDYzO1xuICAgIGZ1bmN0aW9uIGdldExlbnMoYjY0KSB7XG4gICAgICB2YXIgbGVuMiA9IGI2NC5sZW5ndGg7XG4gICAgICBpZiAobGVuMiAlIDQgPiAwKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgc3RyaW5nLiBMZW5ndGggbXVzdCBiZSBhIG11bHRpcGxlIG9mIDRcIik7XG4gICAgICB9XG4gICAgICB2YXIgdmFsaWRMZW4gPSBiNjQuaW5kZXhPZihcIj1cIik7XG4gICAgICBpZiAodmFsaWRMZW4gPT09IC0xKSB2YWxpZExlbiA9IGxlbjI7XG4gICAgICB2YXIgcGxhY2VIb2xkZXJzTGVuID0gdmFsaWRMZW4gPT09IGxlbjIgPyAwIDogNCAtIHZhbGlkTGVuICUgNDtcbiAgICAgIHJldHVybiBbdmFsaWRMZW4sIHBsYWNlSG9sZGVyc0xlbl07XG4gICAgfVxuICAgIGZ1bmN0aW9uIGJ5dGVMZW5ndGgoYjY0KSB7XG4gICAgICB2YXIgbGVucyA9IGdldExlbnMoYjY0KTtcbiAgICAgIHZhciB2YWxpZExlbiA9IGxlbnNbMF07XG4gICAgICB2YXIgcGxhY2VIb2xkZXJzTGVuID0gbGVuc1sxXTtcbiAgICAgIHJldHVybiAodmFsaWRMZW4gKyBwbGFjZUhvbGRlcnNMZW4pICogMyAvIDQgLSBwbGFjZUhvbGRlcnNMZW47XG4gICAgfVxuICAgIGZ1bmN0aW9uIF9ieXRlTGVuZ3RoKGI2NCwgdmFsaWRMZW4sIHBsYWNlSG9sZGVyc0xlbikge1xuICAgICAgcmV0dXJuICh2YWxpZExlbiArIHBsYWNlSG9sZGVyc0xlbikgKiAzIC8gNCAtIHBsYWNlSG9sZGVyc0xlbjtcbiAgICB9XG4gICAgZnVuY3Rpb24gdG9CeXRlQXJyYXkoYjY0KSB7XG4gICAgICB2YXIgdG1wO1xuICAgICAgdmFyIGxlbnMgPSBnZXRMZW5zKGI2NCk7XG4gICAgICB2YXIgdmFsaWRMZW4gPSBsZW5zWzBdO1xuICAgICAgdmFyIHBsYWNlSG9sZGVyc0xlbiA9IGxlbnNbMV07XG4gICAgICB2YXIgYXJyID0gbmV3IEFycihfYnl0ZUxlbmd0aChiNjQsIHZhbGlkTGVuLCBwbGFjZUhvbGRlcnNMZW4pKTtcbiAgICAgIHZhciBjdXJCeXRlID0gMDtcbiAgICAgIHZhciBsZW4yID0gcGxhY2VIb2xkZXJzTGVuID4gMCA/IHZhbGlkTGVuIC0gNCA6IHZhbGlkTGVuO1xuICAgICAgdmFyIGkyO1xuICAgICAgZm9yIChpMiA9IDA7IGkyIDwgbGVuMjsgaTIgKz0gNCkge1xuICAgICAgICB0bXAgPSByZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaTIpXSA8PCAxOCB8IHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpMiArIDEpXSA8PCAxMiB8IHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpMiArIDIpXSA8PCA2IHwgcmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkyICsgMyldO1xuICAgICAgICBhcnJbY3VyQnl0ZSsrXSA9IHRtcCA+PiAxNiAmIDI1NTtcbiAgICAgICAgYXJyW2N1ckJ5dGUrK10gPSB0bXAgPj4gOCAmIDI1NTtcbiAgICAgICAgYXJyW2N1ckJ5dGUrK10gPSB0bXAgJiAyNTU7XG4gICAgICB9XG4gICAgICBpZiAocGxhY2VIb2xkZXJzTGVuID09PSAyKSB7XG4gICAgICAgIHRtcCA9IHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpMildIDw8IDIgfCByZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaTIgKyAxKV0gPj4gNDtcbiAgICAgICAgYXJyW2N1ckJ5dGUrK10gPSB0bXAgJiAyNTU7XG4gICAgICB9XG4gICAgICBpZiAocGxhY2VIb2xkZXJzTGVuID09PSAxKSB7XG4gICAgICAgIHRtcCA9IHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpMildIDw8IDEwIHwgcmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkyICsgMSldIDw8IDQgfCByZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaTIgKyAyKV0gPj4gMjtcbiAgICAgICAgYXJyW2N1ckJ5dGUrK10gPSB0bXAgPj4gOCAmIDI1NTtcbiAgICAgICAgYXJyW2N1ckJ5dGUrK10gPSB0bXAgJiAyNTU7XG4gICAgICB9XG4gICAgICByZXR1cm4gYXJyO1xuICAgIH1cbiAgICBmdW5jdGlvbiB0cmlwbGV0VG9CYXNlNjQobnVtKSB7XG4gICAgICByZXR1cm4gbG9va3VwW251bSA+PiAxOCAmIDYzXSArIGxvb2t1cFtudW0gPj4gMTIgJiA2M10gKyBsb29rdXBbbnVtID4+IDYgJiA2M10gKyBsb29rdXBbbnVtICYgNjNdO1xuICAgIH1cbiAgICBmdW5jdGlvbiBlbmNvZGVDaHVuayh1aW50OCwgc3RhcnQsIGVuZCkge1xuICAgICAgdmFyIHRtcDtcbiAgICAgIHZhciBvdXRwdXQgPSBbXTtcbiAgICAgIGZvciAodmFyIGkyID0gc3RhcnQ7IGkyIDwgZW5kOyBpMiArPSAzKSB7XG4gICAgICAgIHRtcCA9ICh1aW50OFtpMl0gPDwgMTYgJiAxNjcxMTY4MCkgKyAodWludDhbaTIgKyAxXSA8PCA4ICYgNjUyODApICsgKHVpbnQ4W2kyICsgMl0gJiAyNTUpO1xuICAgICAgICBvdXRwdXQucHVzaCh0cmlwbGV0VG9CYXNlNjQodG1wKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gb3V0cHV0LmpvaW4oXCJcIik7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGZyb21CeXRlQXJyYXkyKHVpbnQ4KSB7XG4gICAgICB2YXIgdG1wO1xuICAgICAgdmFyIGxlbjIgPSB1aW50OC5sZW5ndGg7XG4gICAgICB2YXIgZXh0cmFCeXRlcyA9IGxlbjIgJSAzO1xuICAgICAgdmFyIHBhcnRzID0gW107XG4gICAgICB2YXIgbWF4Q2h1bmtMZW5ndGggPSAxNjM4MztcbiAgICAgIGZvciAodmFyIGkyID0gMCwgbGVuMjIgPSBsZW4yIC0gZXh0cmFCeXRlczsgaTIgPCBsZW4yMjsgaTIgKz0gbWF4Q2h1bmtMZW5ndGgpIHtcbiAgICAgICAgcGFydHMucHVzaChlbmNvZGVDaHVuayh1aW50OCwgaTIsIGkyICsgbWF4Q2h1bmtMZW5ndGggPiBsZW4yMiA/IGxlbjIyIDogaTIgKyBtYXhDaHVua0xlbmd0aCkpO1xuICAgICAgfVxuICAgICAgaWYgKGV4dHJhQnl0ZXMgPT09IDEpIHtcbiAgICAgICAgdG1wID0gdWludDhbbGVuMiAtIDFdO1xuICAgICAgICBwYXJ0cy5wdXNoKFxuICAgICAgICAgIGxvb2t1cFt0bXAgPj4gMl0gKyBsb29rdXBbdG1wIDw8IDQgJiA2M10gKyBcIj09XCJcbiAgICAgICAgKTtcbiAgICAgIH0gZWxzZSBpZiAoZXh0cmFCeXRlcyA9PT0gMikge1xuICAgICAgICB0bXAgPSAodWludDhbbGVuMiAtIDJdIDw8IDgpICsgdWludDhbbGVuMiAtIDFdO1xuICAgICAgICBwYXJ0cy5wdXNoKFxuICAgICAgICAgIGxvb2t1cFt0bXAgPj4gMTBdICsgbG9va3VwW3RtcCA+PiA0ICYgNjNdICsgbG9va3VwW3RtcCA8PCAyICYgNjNdICsgXCI9XCJcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBwYXJ0cy5qb2luKFwiXCIpO1xuICAgIH1cbiAgfVxufSk7XG5cbi8vIC4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9mYXN0LXRleHQtZW5jb2RpbmdAMS4wLjYvbm9kZV9tb2R1bGVzL2Zhc3QtdGV4dC1lbmNvZGluZy90ZXh0Lm1pbi5qc1xudmFyIHJlcXVpcmVfdGV4dF9taW4gPSBfX2NvbW1vbkpTKHtcbiAgXCIuLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vZmFzdC10ZXh0LWVuY29kaW5nQDEuMC42L25vZGVfbW9kdWxlcy9mYXN0LXRleHQtZW5jb2RpbmcvdGV4dC5taW4uanNcIihleHBvcnRzKSB7XG4gICAgKGZ1bmN0aW9uKHNjb3BlKSB7XG4gICAgICBmdW5jdGlvbiBCKHIsIGUpIHtcbiAgICAgICAgdmFyIGY7XG4gICAgICAgIHJldHVybiByIGluc3RhbmNlb2YgQnVmZmVyID8gZiA9IHIgOiBmID0gQnVmZmVyLmZyb20oci5idWZmZXIsIHIuYnl0ZU9mZnNldCwgci5ieXRlTGVuZ3RoKSwgZi50b1N0cmluZyhlKTtcbiAgICAgIH1cbiAgICAgIHZhciB3ID0gZnVuY3Rpb24ocikge1xuICAgICAgICByZXR1cm4gQnVmZmVyLmZyb20ocik7XG4gICAgICB9O1xuICAgICAgZnVuY3Rpb24gaChyKSB7XG4gICAgICAgIGZvciAodmFyIGUgPSAwLCBmID0gTWF0aC5taW4oMjU2ICogMjU2LCByLmxlbmd0aCArIDEpLCBuID0gbmV3IFVpbnQxNkFycmF5KGYpLCBpID0gW10sIG8gPSAwOyA7ICkge1xuICAgICAgICAgIHZhciB0MiA9IGUgPCByLmxlbmd0aDtcbiAgICAgICAgICBpZiAoIXQyIHx8IG8gPj0gZiAtIDEpIHtcbiAgICAgICAgICAgIHZhciBzID0gbi5zdWJhcnJheSgwLCBvKSwgbSA9IHM7XG4gICAgICAgICAgICBpZiAoaS5wdXNoKFN0cmluZy5mcm9tQ2hhckNvZGUuYXBwbHkobnVsbCwgbSkpLCAhdDIpIHJldHVybiBpLmpvaW4oXCJcIik7XG4gICAgICAgICAgICByID0gci5zdWJhcnJheShlKSwgZSA9IDAsIG8gPSAwO1xuICAgICAgICAgIH1cbiAgICAgICAgICB2YXIgYSA9IHJbZSsrXTtcbiAgICAgICAgICBpZiAoKGEgJiAxMjgpID09PSAwKSBuW28rK10gPSBhO1xuICAgICAgICAgIGVsc2UgaWYgKChhICYgMjI0KSA9PT0gMTkyKSB7XG4gICAgICAgICAgICB2YXIgZCA9IHJbZSsrXSAmIDYzO1xuICAgICAgICAgICAgbltvKytdID0gKGEgJiAzMSkgPDwgNiB8IGQ7XG4gICAgICAgICAgfSBlbHNlIGlmICgoYSAmIDI0MCkgPT09IDIyNCkge1xuICAgICAgICAgICAgdmFyIGQgPSByW2UrK10gJiA2MywgbCA9IHJbZSsrXSAmIDYzO1xuICAgICAgICAgICAgbltvKytdID0gKGEgJiAzMSkgPDwgMTIgfCBkIDw8IDYgfCBsO1xuICAgICAgICAgIH0gZWxzZSBpZiAoKGEgJiAyNDgpID09PSAyNDApIHtcbiAgICAgICAgICAgIHZhciBkID0gcltlKytdICYgNjMsIGwgPSByW2UrK10gJiA2MywgUiA9IHJbZSsrXSAmIDYzLCBjID0gKGEgJiA3KSA8PCAxOCB8IGQgPDwgMTIgfCBsIDw8IDYgfCBSO1xuICAgICAgICAgICAgYyA+IDY1NTM1ICYmIChjIC09IDY1NTM2LCBuW28rK10gPSBjID4+PiAxMCAmIDEwMjMgfCA1NTI5NiwgYyA9IDU2MzIwIHwgYyAmIDEwMjMpLCBuW28rK10gPSBjO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZnVuY3Rpb24gRihyKSB7XG4gICAgICAgIGZvciAodmFyIGUgPSAwLCBmID0gci5sZW5ndGgsIG4gPSAwLCBpID0gTWF0aC5tYXgoMzIsIGYgKyAoZiA+Pj4gMSkgKyA3KSwgbyA9IG5ldyBVaW50OEFycmF5KGkgPj4+IDMgPDwgMyk7IGUgPCBmOyApIHtcbiAgICAgICAgICB2YXIgdDIgPSByLmNoYXJDb2RlQXQoZSsrKTtcbiAgICAgICAgICBpZiAodDIgPj0gNTUyOTYgJiYgdDIgPD0gNTYzMTkpIHtcbiAgICAgICAgICAgIGlmIChlIDwgZikge1xuICAgICAgICAgICAgICB2YXIgcyA9IHIuY2hhckNvZGVBdChlKTtcbiAgICAgICAgICAgICAgKHMgJiA2NDUxMikgPT09IDU2MzIwICYmICgrK2UsIHQyID0gKCh0MiAmIDEwMjMpIDw8IDEwKSArIChzICYgMTAyMykgKyA2NTUzNik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodDIgPj0gNTUyOTYgJiYgdDIgPD0gNTYzMTkpIGNvbnRpbnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAobiArIDQgPiBvLmxlbmd0aCkge1xuICAgICAgICAgICAgaSArPSA4LCBpICo9IDEgKyBlIC8gci5sZW5ndGggKiAyLCBpID0gaSA+Pj4gMyA8PCAzO1xuICAgICAgICAgICAgdmFyIG0gPSBuZXcgVWludDhBcnJheShpKTtcbiAgICAgICAgICAgIG0uc2V0KG8pLCBvID0gbTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKCh0MiAmIDQyOTQ5NjcxNjgpID09PSAwKSB7XG4gICAgICAgICAgICBvW24rK10gPSB0MjtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH0gZWxzZSBpZiAoKHQyICYgNDI5NDk2NTI0OCkgPT09IDApIG9bbisrXSA9IHQyID4+PiA2ICYgMzEgfCAxOTI7XG4gICAgICAgICAgZWxzZSBpZiAoKHQyICYgNDI5NDkwMTc2MCkgPT09IDApIG9bbisrXSA9IHQyID4+PiAxMiAmIDE1IHwgMjI0LCBvW24rK10gPSB0MiA+Pj4gNiAmIDYzIHwgMTI4O1xuICAgICAgICAgIGVsc2UgaWYgKCh0MiAmIDQyOTI4NzAxNDQpID09PSAwKSBvW24rK10gPSB0MiA+Pj4gMTggJiA3IHwgMjQwLCBvW24rK10gPSB0MiA+Pj4gMTIgJiA2MyB8IDEyOCwgb1tuKytdID0gdDIgPj4+IDYgJiA2MyB8IDEyODtcbiAgICAgICAgICBlbHNlIGNvbnRpbnVlO1xuICAgICAgICAgIG9bbisrXSA9IHQyICYgNjMgfCAxMjg7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG8uc2xpY2UgPyBvLnNsaWNlKDAsIG4pIDogby5zdWJhcnJheSgwLCBuKTtcbiAgICAgIH1cbiAgICAgIHZhciB1ID0gXCJGYWlsZWQgdG8gXCIsIHAgPSBmdW5jdGlvbihyLCBlLCBmKSB7XG4gICAgICAgIGlmIChyKSB0aHJvdyBuZXcgRXJyb3IoXCJcIi5jb25jYXQodSkuY29uY2F0KGUsIFwiOiB0aGUgJ1wiKS5jb25jYXQoZiwgXCInIG9wdGlvbiBpcyB1bnN1cHBvcnRlZC5cIikpO1xuICAgICAgfTtcbiAgICAgIHZhciB4ID0gdHlwZW9mIEJ1ZmZlciA9PSBcImZ1bmN0aW9uXCIgJiYgQnVmZmVyLmZyb207XG4gICAgICB2YXIgQSA9IHggPyB3IDogRjtcbiAgICAgIGZ1bmN0aW9uIHYoKSB7XG4gICAgICAgIHRoaXMuZW5jb2RpbmcgPSBcInV0Zi04XCI7XG4gICAgICB9XG4gICAgICB2LnByb3RvdHlwZS5lbmNvZGUgPSBmdW5jdGlvbihyLCBlKSB7XG4gICAgICAgIHJldHVybiBwKGUgJiYgZS5zdHJlYW0sIFwiZW5jb2RlXCIsIFwic3RyZWFtXCIpLCBBKHIpO1xuICAgICAgfTtcbiAgICAgIGZ1bmN0aW9uIFUocikge1xuICAgICAgICB2YXIgZTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICB2YXIgZiA9IG5ldyBCbG9iKFtyXSwgeyB0eXBlOiBcInRleHQvcGxhaW47Y2hhcnNldD1VVEYtOFwiIH0pO1xuICAgICAgICAgIGUgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGYpO1xuICAgICAgICAgIHZhciBuID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICAgICAgcmV0dXJuIG4ub3BlbihcIkdFVFwiLCBlLCBmYWxzZSksIG4uc2VuZCgpLCBuLnJlc3BvbnNlVGV4dDtcbiAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICBlICYmIFVSTC5yZXZva2VPYmplY3RVUkwoZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHZhciBPID0gIXggJiYgdHlwZW9mIEJsb2IgPT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBVUkwgPT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBVUkwuY3JlYXRlT2JqZWN0VVJMID09IFwiZnVuY3Rpb25cIiwgUyA9IFtcInV0Zi04XCIsIFwidXRmOFwiLCBcInVuaWNvZGUtMS0xLXV0Zi04XCJdLCBUID0gaDtcbiAgICAgIHggPyBUID0gQiA6IE8gJiYgKFQgPSBmdW5jdGlvbihyKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgcmV0dXJuIFUocik7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICByZXR1cm4gaChyKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICB2YXIgeSA9IFwiY29uc3RydWN0ICdUZXh0RGVjb2RlcidcIiwgRSA9IFwiXCIuY29uY2F0KHUsIFwiIFwiKS5jb25jYXQoeSwgXCI6IHRoZSBcIik7XG4gICAgICBmdW5jdGlvbiBnKHIsIGUpIHtcbiAgICAgICAgcChlICYmIGUuZmF0YWwsIHksIFwiZmF0YWxcIiksIHIgPSByIHx8IFwidXRmLThcIjtcbiAgICAgICAgdmFyIGY7XG4gICAgICAgIGlmICh4ID8gZiA9IEJ1ZmZlci5pc0VuY29kaW5nKHIpIDogZiA9IFMuaW5kZXhPZihyLnRvTG93ZXJDYXNlKCkpICE9PSAtMSwgIWYpIHRocm93IG5ldyBSYW5nZUVycm9yKFwiXCIuY29uY2F0KEUsIFwiIGVuY29kaW5nIGxhYmVsIHByb3ZpZGVkICgnXCIpLmNvbmNhdChyLCBcIicpIGlzIGludmFsaWQuXCIpKTtcbiAgICAgICAgdGhpcy5lbmNvZGluZyA9IHIsIHRoaXMuZmF0YWwgPSBmYWxzZSwgdGhpcy5pZ25vcmVCT00gPSBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGcucHJvdG90eXBlLmRlY29kZSA9IGZ1bmN0aW9uKHIsIGUpIHtcbiAgICAgICAgcChlICYmIGUuc3RyZWFtLCBcImRlY29kZVwiLCBcInN0cmVhbVwiKTtcbiAgICAgICAgdmFyIGY7XG4gICAgICAgIHJldHVybiByIGluc3RhbmNlb2YgVWludDhBcnJheSA/IGYgPSByIDogci5idWZmZXIgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlciA/IGYgPSBuZXcgVWludDhBcnJheShyLmJ1ZmZlcikgOiBmID0gbmV3IFVpbnQ4QXJyYXkociksIFQoZiwgdGhpcy5lbmNvZGluZyk7XG4gICAgICB9O1xuICAgICAgc2NvcGUuVGV4dEVuY29kZXIgPSBzY29wZS5UZXh0RW5jb2RlciB8fCB2O1xuICAgICAgc2NvcGUuVGV4dERlY29kZXIgPSBzY29wZS5UZXh0RGVjb2RlciB8fCBnO1xuICAgIH0pKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDogZXhwb3J0cyk7XG4gIH1cbn0pO1xuXG4vLyAuLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vc3RhdHVzZXNAMi4wLjIvbm9kZV9tb2R1bGVzL3N0YXR1c2VzL2NvZGVzLmpzb25cbnZhciByZXF1aXJlX2NvZGVzID0gX19jb21tb25KUyh7XG4gIFwiLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL3N0YXR1c2VzQDIuMC4yL25vZGVfbW9kdWxlcy9zdGF0dXNlcy9jb2Rlcy5qc29uXCIoZXhwb3J0cywgbW9kdWxlKSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgICBcIjEwMFwiOiBcIkNvbnRpbnVlXCIsXG4gICAgICBcIjEwMVwiOiBcIlN3aXRjaGluZyBQcm90b2NvbHNcIixcbiAgICAgIFwiMTAyXCI6IFwiUHJvY2Vzc2luZ1wiLFxuICAgICAgXCIxMDNcIjogXCJFYXJseSBIaW50c1wiLFxuICAgICAgXCIyMDBcIjogXCJPS1wiLFxuICAgICAgXCIyMDFcIjogXCJDcmVhdGVkXCIsXG4gICAgICBcIjIwMlwiOiBcIkFjY2VwdGVkXCIsXG4gICAgICBcIjIwM1wiOiBcIk5vbi1BdXRob3JpdGF0aXZlIEluZm9ybWF0aW9uXCIsXG4gICAgICBcIjIwNFwiOiBcIk5vIENvbnRlbnRcIixcbiAgICAgIFwiMjA1XCI6IFwiUmVzZXQgQ29udGVudFwiLFxuICAgICAgXCIyMDZcIjogXCJQYXJ0aWFsIENvbnRlbnRcIixcbiAgICAgIFwiMjA3XCI6IFwiTXVsdGktU3RhdHVzXCIsXG4gICAgICBcIjIwOFwiOiBcIkFscmVhZHkgUmVwb3J0ZWRcIixcbiAgICAgIFwiMjI2XCI6IFwiSU0gVXNlZFwiLFxuICAgICAgXCIzMDBcIjogXCJNdWx0aXBsZSBDaG9pY2VzXCIsXG4gICAgICBcIjMwMVwiOiBcIk1vdmVkIFBlcm1hbmVudGx5XCIsXG4gICAgICBcIjMwMlwiOiBcIkZvdW5kXCIsXG4gICAgICBcIjMwM1wiOiBcIlNlZSBPdGhlclwiLFxuICAgICAgXCIzMDRcIjogXCJOb3QgTW9kaWZpZWRcIixcbiAgICAgIFwiMzA1XCI6IFwiVXNlIFByb3h5XCIsXG4gICAgICBcIjMwN1wiOiBcIlRlbXBvcmFyeSBSZWRpcmVjdFwiLFxuICAgICAgXCIzMDhcIjogXCJQZXJtYW5lbnQgUmVkaXJlY3RcIixcbiAgICAgIFwiNDAwXCI6IFwiQmFkIFJlcXVlc3RcIixcbiAgICAgIFwiNDAxXCI6IFwiVW5hdXRob3JpemVkXCIsXG4gICAgICBcIjQwMlwiOiBcIlBheW1lbnQgUmVxdWlyZWRcIixcbiAgICAgIFwiNDAzXCI6IFwiRm9yYmlkZGVuXCIsXG4gICAgICBcIjQwNFwiOiBcIk5vdCBGb3VuZFwiLFxuICAgICAgXCI0MDVcIjogXCJNZXRob2QgTm90IEFsbG93ZWRcIixcbiAgICAgIFwiNDA2XCI6IFwiTm90IEFjY2VwdGFibGVcIixcbiAgICAgIFwiNDA3XCI6IFwiUHJveHkgQXV0aGVudGljYXRpb24gUmVxdWlyZWRcIixcbiAgICAgIFwiNDA4XCI6IFwiUmVxdWVzdCBUaW1lb3V0XCIsXG4gICAgICBcIjQwOVwiOiBcIkNvbmZsaWN0XCIsXG4gICAgICBcIjQxMFwiOiBcIkdvbmVcIixcbiAgICAgIFwiNDExXCI6IFwiTGVuZ3RoIFJlcXVpcmVkXCIsXG4gICAgICBcIjQxMlwiOiBcIlByZWNvbmRpdGlvbiBGYWlsZWRcIixcbiAgICAgIFwiNDEzXCI6IFwiUGF5bG9hZCBUb28gTGFyZ2VcIixcbiAgICAgIFwiNDE0XCI6IFwiVVJJIFRvbyBMb25nXCIsXG4gICAgICBcIjQxNVwiOiBcIlVuc3VwcG9ydGVkIE1lZGlhIFR5cGVcIixcbiAgICAgIFwiNDE2XCI6IFwiUmFuZ2UgTm90IFNhdGlzZmlhYmxlXCIsXG4gICAgICBcIjQxN1wiOiBcIkV4cGVjdGF0aW9uIEZhaWxlZFwiLFxuICAgICAgXCI0MThcIjogXCJJJ20gYSBUZWFwb3RcIixcbiAgICAgIFwiNDIxXCI6IFwiTWlzZGlyZWN0ZWQgUmVxdWVzdFwiLFxuICAgICAgXCI0MjJcIjogXCJVbnByb2Nlc3NhYmxlIEVudGl0eVwiLFxuICAgICAgXCI0MjNcIjogXCJMb2NrZWRcIixcbiAgICAgIFwiNDI0XCI6IFwiRmFpbGVkIERlcGVuZGVuY3lcIixcbiAgICAgIFwiNDI1XCI6IFwiVG9vIEVhcmx5XCIsXG4gICAgICBcIjQyNlwiOiBcIlVwZ3JhZGUgUmVxdWlyZWRcIixcbiAgICAgIFwiNDI4XCI6IFwiUHJlY29uZGl0aW9uIFJlcXVpcmVkXCIsXG4gICAgICBcIjQyOVwiOiBcIlRvbyBNYW55IFJlcXVlc3RzXCIsXG4gICAgICBcIjQzMVwiOiBcIlJlcXVlc3QgSGVhZGVyIEZpZWxkcyBUb28gTGFyZ2VcIixcbiAgICAgIFwiNDUxXCI6IFwiVW5hdmFpbGFibGUgRm9yIExlZ2FsIFJlYXNvbnNcIixcbiAgICAgIFwiNTAwXCI6IFwiSW50ZXJuYWwgU2VydmVyIEVycm9yXCIsXG4gICAgICBcIjUwMVwiOiBcIk5vdCBJbXBsZW1lbnRlZFwiLFxuICAgICAgXCI1MDJcIjogXCJCYWQgR2F0ZXdheVwiLFxuICAgICAgXCI1MDNcIjogXCJTZXJ2aWNlIFVuYXZhaWxhYmxlXCIsXG4gICAgICBcIjUwNFwiOiBcIkdhdGV3YXkgVGltZW91dFwiLFxuICAgICAgXCI1MDVcIjogXCJIVFRQIFZlcnNpb24gTm90IFN1cHBvcnRlZFwiLFxuICAgICAgXCI1MDZcIjogXCJWYXJpYW50IEFsc28gTmVnb3RpYXRlc1wiLFxuICAgICAgXCI1MDdcIjogXCJJbnN1ZmZpY2llbnQgU3RvcmFnZVwiLFxuICAgICAgXCI1MDhcIjogXCJMb29wIERldGVjdGVkXCIsXG4gICAgICBcIjUwOVwiOiBcIkJhbmR3aWR0aCBMaW1pdCBFeGNlZWRlZFwiLFxuICAgICAgXCI1MTBcIjogXCJOb3QgRXh0ZW5kZWRcIixcbiAgICAgIFwiNTExXCI6IFwiTmV0d29yayBBdXRoZW50aWNhdGlvbiBSZXF1aXJlZFwiXG4gICAgfTtcbiAgfVxufSk7XG5cbi8vIC4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9zdGF0dXNlc0AyLjAuMi9ub2RlX21vZHVsZXMvc3RhdHVzZXMvaW5kZXguanNcbnZhciByZXF1aXJlX3N0YXR1c2VzID0gX19jb21tb25KUyh7XG4gIFwiLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL3N0YXR1c2VzQDIuMC4yL25vZGVfbW9kdWxlcy9zdGF0dXNlcy9pbmRleC5qc1wiKGV4cG9ydHMsIG1vZHVsZSkge1xuICAgIHZhciBjb2RlcyA9IHJlcXVpcmVfY29kZXMoKTtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IHN0YXR1czI7XG4gICAgc3RhdHVzMi5tZXNzYWdlID0gY29kZXM7XG4gICAgc3RhdHVzMi5jb2RlID0gY3JlYXRlTWVzc2FnZVRvU3RhdHVzQ29kZU1hcChjb2Rlcyk7XG4gICAgc3RhdHVzMi5jb2RlcyA9IGNyZWF0ZVN0YXR1c0NvZGVMaXN0KGNvZGVzKTtcbiAgICBzdGF0dXMyLnJlZGlyZWN0ID0ge1xuICAgICAgMzAwOiB0cnVlLFxuICAgICAgMzAxOiB0cnVlLFxuICAgICAgMzAyOiB0cnVlLFxuICAgICAgMzAzOiB0cnVlLFxuICAgICAgMzA1OiB0cnVlLFxuICAgICAgMzA3OiB0cnVlLFxuICAgICAgMzA4OiB0cnVlXG4gICAgfTtcbiAgICBzdGF0dXMyLmVtcHR5ID0ge1xuICAgICAgMjA0OiB0cnVlLFxuICAgICAgMjA1OiB0cnVlLFxuICAgICAgMzA0OiB0cnVlXG4gICAgfTtcbiAgICBzdGF0dXMyLnJldHJ5ID0ge1xuICAgICAgNTAyOiB0cnVlLFxuICAgICAgNTAzOiB0cnVlLFxuICAgICAgNTA0OiB0cnVlXG4gICAgfTtcbiAgICBmdW5jdGlvbiBjcmVhdGVNZXNzYWdlVG9TdGF0dXNDb2RlTWFwKGNvZGVzMikge1xuICAgICAgdmFyIG1hcCA9IHt9O1xuICAgICAgT2JqZWN0LmtleXMoY29kZXMyKS5mb3JFYWNoKGZ1bmN0aW9uIGZvckVhY2hDb2RlKGNvZGUpIHtcbiAgICAgICAgdmFyIG1lc3NhZ2UgPSBjb2RlczJbY29kZV07XG4gICAgICAgIHZhciBzdGF0dXMzID0gTnVtYmVyKGNvZGUpO1xuICAgICAgICBtYXBbbWVzc2FnZS50b0xvd2VyQ2FzZSgpXSA9IHN0YXR1czM7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBtYXA7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGNyZWF0ZVN0YXR1c0NvZGVMaXN0KGNvZGVzMikge1xuICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKGNvZGVzMikubWFwKGZ1bmN0aW9uIG1hcENvZGUoY29kZSkge1xuICAgICAgICByZXR1cm4gTnVtYmVyKGNvZGUpO1xuICAgICAgfSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGdldFN0YXR1c0NvZGUobWVzc2FnZSkge1xuICAgICAgdmFyIG1zZyA9IG1lc3NhZ2UudG9Mb3dlckNhc2UoKTtcbiAgICAgIGlmICghT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHN0YXR1czIuY29kZSwgbXNnKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ludmFsaWQgc3RhdHVzIG1lc3NhZ2U6IFwiJyArIG1lc3NhZ2UgKyAnXCInKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBzdGF0dXMyLmNvZGVbbXNnXTtcbiAgICB9XG4gICAgZnVuY3Rpb24gZ2V0U3RhdHVzTWVzc2FnZShjb2RlKSB7XG4gICAgICBpZiAoIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzdGF0dXMyLm1lc3NhZ2UsIGNvZGUpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcImludmFsaWQgc3RhdHVzIGNvZGU6IFwiICsgY29kZSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gc3RhdHVzMi5tZXNzYWdlW2NvZGVdO1xuICAgIH1cbiAgICBmdW5jdGlvbiBzdGF0dXMyKGNvZGUpIHtcbiAgICAgIGlmICh0eXBlb2YgY29kZSA9PT0gXCJudW1iZXJcIikge1xuICAgICAgICByZXR1cm4gZ2V0U3RhdHVzTWVzc2FnZShjb2RlKTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgY29kZSAhPT0gXCJzdHJpbmdcIikge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiY29kZSBtdXN0IGJlIGEgbnVtYmVyIG9yIHN0cmluZ1wiKTtcbiAgICAgIH1cbiAgICAgIHZhciBuID0gcGFyc2VJbnQoY29kZSwgMTApO1xuICAgICAgaWYgKCFpc05hTihuKSkge1xuICAgICAgICByZXR1cm4gZ2V0U3RhdHVzTWVzc2FnZShuKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBnZXRTdGF0dXNDb2RlKGNvZGUpO1xuICAgIH1cbiAgfVxufSk7XG5cbi8vIHNyYy9saWIvdGltZV9kdXJhdGlvbi50c1xudmFyIFRpbWVEdXJhdGlvbiA9IGNsYXNzIF9UaW1lRHVyYXRpb24ge1xuICBfX3RpbWVfZHVyYXRpb25fbWljcm9zX187XG4gIHN0YXRpYyBNSUNST1NfUEVSX01JTExJUyA9IDEwMDBuO1xuICAvKipcbiAgICogR2V0IHRoZSBhbGdlYnJhaWMgdHlwZSByZXByZXNlbnRhdGlvbiBvZiB0aGUge0BsaW5rIFRpbWVEdXJhdGlvbn0gdHlwZS5cbiAgICogQHJldHVybnMgVGhlIGFsZ2VicmFpYyB0eXBlIHJlcHJlc2VudGF0aW9uIG9mIHRoZSB0eXBlLlxuICAgKi9cbiAgc3RhdGljIGdldEFsZ2VicmFpY1R5cGUoKSB7XG4gICAgcmV0dXJuIEFsZ2VicmFpY1R5cGUuUHJvZHVjdCh7XG4gICAgICBlbGVtZW50czogW1xuICAgICAgICB7XG4gICAgICAgICAgbmFtZTogXCJfX3RpbWVfZHVyYXRpb25fbWljcm9zX19cIixcbiAgICAgICAgICBhbGdlYnJhaWNUeXBlOiBBbGdlYnJhaWNUeXBlLkk2NFxuICAgICAgICB9XG4gICAgICBdXG4gICAgfSk7XG4gIH1cbiAgc3RhdGljIGlzVGltZUR1cmF0aW9uKGFsZ2VicmFpY1R5cGUpIHtcbiAgICBpZiAoYWxnZWJyYWljVHlwZS50YWcgIT09IFwiUHJvZHVjdFwiKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGNvbnN0IGVsZW1lbnRzID0gYWxnZWJyYWljVHlwZS52YWx1ZS5lbGVtZW50cztcbiAgICBpZiAoZWxlbWVudHMubGVuZ3RoICE9PSAxKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGNvbnN0IG1pY3Jvc0VsZW1lbnQgPSBlbGVtZW50c1swXTtcbiAgICByZXR1cm4gbWljcm9zRWxlbWVudC5uYW1lID09PSBcIl9fdGltZV9kdXJhdGlvbl9taWNyb3NfX1wiICYmIG1pY3Jvc0VsZW1lbnQuYWxnZWJyYWljVHlwZS50YWcgPT09IFwiSTY0XCI7XG4gIH1cbiAgZ2V0IG1pY3JvcygpIHtcbiAgICByZXR1cm4gdGhpcy5fX3RpbWVfZHVyYXRpb25fbWljcm9zX187XG4gIH1cbiAgZ2V0IG1pbGxpcygpIHtcbiAgICByZXR1cm4gTnVtYmVyKHRoaXMubWljcm9zIC8gX1RpbWVEdXJhdGlvbi5NSUNST1NfUEVSX01JTExJUyk7XG4gIH1cbiAgY29uc3RydWN0b3IobWljcm9zKSB7XG4gICAgdGhpcy5fX3RpbWVfZHVyYXRpb25fbWljcm9zX18gPSBtaWNyb3M7XG4gIH1cbiAgc3RhdGljIGZyb21NaWxsaXMobWlsbGlzKSB7XG4gICAgcmV0dXJuIG5ldyBfVGltZUR1cmF0aW9uKEJpZ0ludChtaWxsaXMpICogX1RpbWVEdXJhdGlvbi5NSUNST1NfUEVSX01JTExJUyk7XG4gIH1cbiAgLyoqIFRoaXMgb3V0cHV0cyB0aGUgc2FtZSBzdHJpbmcgZm9ybWF0IHRoYXQgd2UgdXNlIGluIHRoZSBob3N0IGFuZCBpbiBSdXN0IG1vZHVsZXMgKi9cbiAgdG9TdHJpbmcoKSB7XG4gICAgY29uc3QgbWljcm9zID0gdGhpcy5taWNyb3M7XG4gICAgY29uc3Qgc2lnbiA9IG1pY3JvcyA8IDAgPyBcIi1cIiA6IFwiK1wiO1xuICAgIGNvbnN0IHBvcyA9IG1pY3JvcyA8IDAgPyAtbWljcm9zIDogbWljcm9zO1xuICAgIGNvbnN0IHNlY3MgPSBwb3MgLyAxMDAwMDAwbjtcbiAgICBjb25zdCBtaWNyb3NfcmVtYWluaW5nID0gcG9zICUgMTAwMDAwMG47XG4gICAgcmV0dXJuIGAke3NpZ259JHtzZWNzfS4ke1N0cmluZyhtaWNyb3NfcmVtYWluaW5nKS5wYWRTdGFydCg2LCBcIjBcIil9YDtcbiAgfVxufTtcblxuLy8gc3JjL2xpYi90aW1lc3RhbXAudHNcbnZhciBUaW1lc3RhbXAgPSBjbGFzcyBfVGltZXN0YW1wIHtcbiAgX190aW1lc3RhbXBfbWljcm9zX3NpbmNlX3VuaXhfZXBvY2hfXztcbiAgc3RhdGljIE1JQ1JPU19QRVJfTUlMTElTID0gMTAwMG47XG4gIGdldCBtaWNyb3NTaW5jZVVuaXhFcG9jaCgpIHtcbiAgICByZXR1cm4gdGhpcy5fX3RpbWVzdGFtcF9taWNyb3Nfc2luY2VfdW5peF9lcG9jaF9fO1xuICB9XG4gIGNvbnN0cnVjdG9yKG1pY3Jvcykge1xuICAgIHRoaXMuX190aW1lc3RhbXBfbWljcm9zX3NpbmNlX3VuaXhfZXBvY2hfXyA9IG1pY3JvcztcbiAgfVxuICAvKipcbiAgICogR2V0IHRoZSBhbGdlYnJhaWMgdHlwZSByZXByZXNlbnRhdGlvbiBvZiB0aGUge0BsaW5rIFRpbWVzdGFtcH0gdHlwZS5cbiAgICogQHJldHVybnMgVGhlIGFsZ2VicmFpYyB0eXBlIHJlcHJlc2VudGF0aW9uIG9mIHRoZSB0eXBlLlxuICAgKi9cbiAgc3RhdGljIGdldEFsZ2VicmFpY1R5cGUoKSB7XG4gICAgcmV0dXJuIEFsZ2VicmFpY1R5cGUuUHJvZHVjdCh7XG4gICAgICBlbGVtZW50czogW1xuICAgICAgICB7XG4gICAgICAgICAgbmFtZTogXCJfX3RpbWVzdGFtcF9taWNyb3Nfc2luY2VfdW5peF9lcG9jaF9fXCIsXG4gICAgICAgICAgYWxnZWJyYWljVHlwZTogQWxnZWJyYWljVHlwZS5JNjRcbiAgICAgICAgfVxuICAgICAgXVxuICAgIH0pO1xuICB9XG4gIHN0YXRpYyBpc1RpbWVzdGFtcChhbGdlYnJhaWNUeXBlKSB7XG4gICAgaWYgKGFsZ2VicmFpY1R5cGUudGFnICE9PSBcIlByb2R1Y3RcIikge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBjb25zdCBlbGVtZW50cyA9IGFsZ2VicmFpY1R5cGUudmFsdWUuZWxlbWVudHM7XG4gICAgaWYgKGVsZW1lbnRzLmxlbmd0aCAhPT0gMSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBjb25zdCBtaWNyb3NFbGVtZW50ID0gZWxlbWVudHNbMF07XG4gICAgcmV0dXJuIG1pY3Jvc0VsZW1lbnQubmFtZSA9PT0gXCJfX3RpbWVzdGFtcF9taWNyb3Nfc2luY2VfdW5peF9lcG9jaF9fXCIgJiYgbWljcm9zRWxlbWVudC5hbGdlYnJhaWNUeXBlLnRhZyA9PT0gXCJJNjRcIjtcbiAgfVxuICAvKipcbiAgICogVGhlIFVuaXggZXBvY2gsIHRoZSBtaWRuaWdodCBhdCB0aGUgYmVnaW5uaW5nIG9mIEphbnVhcnkgMSwgMTk3MCwgVVRDLlxuICAgKi9cbiAgc3RhdGljIFVOSVhfRVBPQ0ggPSBuZXcgX1RpbWVzdGFtcCgwbik7XG4gIC8qKlxuICAgKiBHZXQgYSBgVGltZXN0YW1wYCByZXByZXNlbnRpbmcgdGhlIGV4ZWN1dGlvbiBlbnZpcm9ubWVudCdzIGJlbGllZiBvZiB0aGUgY3VycmVudCBtb21lbnQgaW4gdGltZS5cbiAgICovXG4gIHN0YXRpYyBub3coKSB7XG4gICAgcmV0dXJuIF9UaW1lc3RhbXAuZnJvbURhdGUoLyogQF9fUFVSRV9fICovIG5ldyBEYXRlKCkpO1xuICB9XG4gIC8qKiBDb252ZXJ0IHRvIG1pbGxpc2Vjb25kcyBzaW5jZSBVbml4IGVwb2NoLiAqL1xuICB0b01pbGxpcygpIHtcbiAgICByZXR1cm4gdGhpcy5taWNyb3NTaW5jZVVuaXhFcG9jaCAvIDEwMDBuO1xuICB9XG4gIC8qKlxuICAgKiBHZXQgYSBgVGltZXN0YW1wYCByZXByZXNlbnRpbmcgdGhlIHNhbWUgcG9pbnQgaW4gdGltZSBhcyBgZGF0ZWAuXG4gICAqL1xuICBzdGF0aWMgZnJvbURhdGUoZGF0ZSkge1xuICAgIGNvbnN0IG1pbGxpcyA9IGRhdGUuZ2V0VGltZSgpO1xuICAgIGNvbnN0IG1pY3JvcyA9IEJpZ0ludChtaWxsaXMpICogX1RpbWVzdGFtcC5NSUNST1NfUEVSX01JTExJUztcbiAgICByZXR1cm4gbmV3IF9UaW1lc3RhbXAobWljcm9zKTtcbiAgfVxuICAvKipcbiAgICogR2V0IGEgYERhdGVgIHJlcHJlc2VudGluZyBhcHByb3hpbWF0ZWx5IHRoZSBzYW1lIHBvaW50IGluIHRpbWUgYXMgYHRoaXNgLlxuICAgKlxuICAgKiBUaGlzIG1ldGhvZCB0cnVuY2F0ZXMgdG8gbWlsbGlzZWNvbmQgcHJlY2lzaW9uLFxuICAgKiBhbmQgdGhyb3dzIGBSYW5nZUVycm9yYCBpZiB0aGUgYFRpbWVzdGFtcGAgaXMgb3V0c2lkZSB0aGUgcmFuZ2UgcmVwcmVzZW50YWJsZSBhcyBhIGBEYXRlYC5cbiAgICovXG4gIHRvRGF0ZSgpIHtcbiAgICBjb25zdCBtaWNyb3MgPSB0aGlzLl9fdGltZXN0YW1wX21pY3Jvc19zaW5jZV91bml4X2Vwb2NoX187XG4gICAgY29uc3QgbWlsbGlzID0gbWljcm9zIC8gX1RpbWVzdGFtcC5NSUNST1NfUEVSX01JTExJUztcbiAgICBpZiAobWlsbGlzID4gQmlnSW50KE51bWJlci5NQVhfU0FGRV9JTlRFR0VSKSB8fCBtaWxsaXMgPCBCaWdJbnQoTnVtYmVyLk1JTl9TQUZFX0lOVEVHRVIpKSB7XG4gICAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcihcbiAgICAgICAgXCJUaW1lc3RhbXAgaXMgb3V0c2lkZSBvZiB0aGUgcmVwcmVzZW50YWJsZSByYW5nZSBvZiBKUydzIERhdGVcIlxuICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBEYXRlKE51bWJlcihtaWxsaXMpKTtcbiAgfVxuICBzaW5jZShvdGhlcikge1xuICAgIHJldHVybiBuZXcgVGltZUR1cmF0aW9uKFxuICAgICAgdGhpcy5fX3RpbWVzdGFtcF9taWNyb3Nfc2luY2VfdW5peF9lcG9jaF9fIC0gb3RoZXIuX190aW1lc3RhbXBfbWljcm9zX3NpbmNlX3VuaXhfZXBvY2hfX1xuICAgICk7XG4gIH1cbn07XG5cbi8vIHNyYy9saWIvdXVpZC50c1xudmFyIFV1aWQgPSBjbGFzcyBfVXVpZCB7XG4gIF9fdXVpZF9fO1xuICAvKipcbiAgICogVGhlIG5pbCBVVUlEIChhbGwgemVyb3MpLlxuICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKiBgYGB0c1xuICAgKiBjb25zdCB1dWlkID0gVXVpZC5OSUw7XG4gICAqIGNvbnNvbGUuYXNzZXJ0KFxuICAgKiAgIHV1aWQudG9TdHJpbmcoKSA9PT0gXCIwMDAwMDAwMC0wMDAwLTAwMDAtMDAwMC0wMDAwMDAwMDAwMDBcIlxuICAgKiApO1xuICAgKiBgYGBcbiAgICovXG4gIHN0YXRpYyBOSUwgPSBuZXcgX1V1aWQoMG4pO1xuICBzdGF0aWMgTUFYX1VVSURfQklHSU5UID0gMHhmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZm47XG4gIC8qKlxuICAgKiBUaGUgbWF4IFVVSUQgKGFsbCBvbmVzKS5cbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogYGBgdHNcbiAgICogY29uc3QgdXVpZCA9IFV1aWQuTUFYO1xuICAgKiBjb25zb2xlLmFzc2VydChcbiAgICogICB1dWlkLnRvU3RyaW5nKCkgPT09IFwiZmZmZmZmZmYtZmZmZi1mZmZmLWZmZmYtZmZmZmZmZmZmZmZmXCJcbiAgICogKTtcbiAgICogYGBgXG4gICAqL1xuICBzdGF0aWMgTUFYID0gbmV3IF9VdWlkKF9VdWlkLk1BWF9VVUlEX0JJR0lOVCk7XG4gIC8qKlxuICAgKiBDcmVhdGUgYSBVVUlEIGZyb20gYSByYXcgMTI4LWJpdCB2YWx1ZS5cbiAgICpcbiAgICogQHBhcmFtIHUgLSBVbnNpZ25lZCAxMjgtYml0IGludGVnZXJcbiAgICogQHRocm93cyB7RXJyb3J9IElmIHRoZSB2YWx1ZSBpcyBvdXRzaWRlIHRoZSB2YWxpZCBVVUlEIHJhbmdlXG4gICAqL1xuICBjb25zdHJ1Y3Rvcih1KSB7XG4gICAgaWYgKHUgPCAwbiB8fCB1ID4gX1V1aWQuTUFYX1VVSURfQklHSU5UKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIFVVSUQ6IG11c3QgYmUgYmV0d2VlbiAwIGFuZCBgTUFYX1VVSURfQklHSU5UYFwiKTtcbiAgICB9XG4gICAgdGhpcy5fX3V1aWRfXyA9IHU7XG4gIH1cbiAgLyoqXG4gICAqIENyZWF0ZSBhIFVVSUQgYHY0YCBmcm9tIGV4cGxpY2l0IHJhbmRvbSBieXRlcy5cbiAgICpcbiAgICogVGhpcyBtZXRob2QgYXNzdW1lcyB0aGUgYnl0ZXMgYXJlIGFscmVhZHkgc3VmZmljaWVudGx5IHJhbmRvbS5cbiAgICogSXQgb25seSBzZXRzIHRoZSBhcHByb3ByaWF0ZSBiaXRzIGZvciB0aGUgVVVJRCB2ZXJzaW9uIGFuZCB2YXJpYW50LlxuICAgKlxuICAgKiBAcGFyYW0gYnl0ZXMgLSBFeGFjdGx5IDE2IHJhbmRvbSBieXRlc1xuICAgKiBAcmV0dXJucyBBIFVVSUQgYHY0YFxuICAgKiBAdGhyb3dzIHtFcnJvcn0gSWYgYGJ5dGVzLmxlbmd0aCAhPT0gMTZgXG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqIGBgYHRzXG4gICAqIGNvbnN0IHJhbmRvbUJ5dGVzID0gbmV3IFVpbnQ4QXJyYXkoMTYpO1xuICAgKiBjb25zdCB1dWlkID0gVXVpZC5mcm9tUmFuZG9tQnl0ZXNWNChyYW5kb21CeXRlcyk7XG4gICAqXG4gICAqIGNvbnNvbGUuYXNzZXJ0KFxuICAgKiAgIHV1aWQudG9TdHJpbmcoKSA9PT0gXCIwMDAwMDAwMC0wMDAwLTQwMDAtODAwMC0wMDAwMDAwMDAwMDBcIlxuICAgKiApO1xuICAgKiBgYGBcbiAgICovXG4gIHN0YXRpYyBmcm9tUmFuZG9tQnl0ZXNWNChieXRlcykge1xuICAgIGlmIChieXRlcy5sZW5ndGggIT09IDE2KSB0aHJvdyBuZXcgRXJyb3IoXCJVVUlEIHY0IHJlcXVpcmVzIDE2IGJ5dGVzXCIpO1xuICAgIGNvbnN0IGFyciA9IG5ldyBVaW50OEFycmF5KGJ5dGVzKTtcbiAgICBhcnJbNl0gPSBhcnJbNl0gJiAxNSB8IDY0O1xuICAgIGFycls4XSA9IGFycls4XSAmIDYzIHwgMTI4O1xuICAgIHJldHVybiBuZXcgX1V1aWQoX1V1aWQuYnl0ZXNUb0JpZ0ludChhcnIpKTtcbiAgfVxuICAvKipcbiAgICogR2VuZXJhdGUgYSBVVUlEIGB2N2AgdXNpbmcgYSBtb25vdG9uaWMgY291bnRlciBmcm9tIGAwYCB0byBgMl4zMSAtIDFgLFxuICAgKiBhIHRpbWVzdGFtcCwgYW5kIDQgcmFuZG9tIGJ5dGVzLlxuICAgKlxuICAgKiBUaGUgY291bnRlciB3cmFwcyBhcm91bmQgb24gb3ZlcmZsb3cuXG4gICAqXG4gICAqIFRoZSBVVUlEIGB2N2AgaXMgc3RydWN0dXJlZCBhcyBmb2xsb3dzOlxuICAgKlxuICAgKiBgYGBhc2NpaVxuICAgKiDilIzilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilKzilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilJBcbiAgICogfCBCMCAgfCBCMSAgfCBCMiAgfCBCMyAgfCBCNCAgfCBCNSAgICAgICAgICAgICAgfCAgICAgICAgIEI2ICAgICAgICB8XG4gICAqIOKUnOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUvOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUpFxuICAgKiB8ICAgICAgICAgICAgICAgICB1bml4X3RzX21zICAgICAgICAgICAgICAgICAgICB8ICAgICAgdmVyc2lvbiA3ICAgIHxcbiAgICog4pSU4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pS04pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSYXG4gICAqIOKUjOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUrOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUrOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUrOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUkFxuICAgKiB8IEI3ICAgICAgICAgICB8IEI4ICAgICAgfCBCOSAgfCBCMTAgfCBCMTEgIHwgQjEyIHwgQjEzIHwgQjE0IHwgQjE1IHxcbiAgICog4pSc4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pS84pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pS84pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pS84pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSkXG4gICAqIHwgY291bnRlcl9oaWdoIHwgdmFyaWFudCB8ICAgIGNvdW50ZXJfbG93ICAgfCAgICAgICAgcmFuZG9tICAgICAgICAgfFxuICAgKiDilJTilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilLTilIDilIDilIDilIDilIDilIDilIDilIDilIDilLTilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilLTilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilJhcbiAgICogYGBgXG4gICAqXG4gICAqIEBwYXJhbSBjb3VudGVyIC0gTXV0YWJsZSBtb25vdG9uaWMgY291bnRlciAoMzEtYml0KVxuICAgKiBAcGFyYW0gbm93IC0gVGltZXN0YW1wIHNpbmNlIHRoZSBVbml4IGVwb2NoXG4gICAqIEBwYXJhbSByYW5kb21CeXRlcyAtIEV4YWN0bHkgNCByYW5kb20gYnl0ZXNcbiAgICogQHJldHVybnMgQSBVVUlEIGB2N2BcbiAgICpcbiAgICogQHRocm93cyB7RXJyb3J9IElmIHRoZSBgY291bnRlcmAgaXMgbmVnYXRpdmVcbiAgICogQHRocm93cyB7RXJyb3J9IElmIHRoZSBgdGltZXN0YW1wYCBpcyBiZWZvcmUgdGhlIFVuaXggZXBvY2hcbiAgICogQHRocm93cyB7RXJyb3J9IElmIGByYW5kb21CeXRlcy5sZW5ndGggIT09IDRgXG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqIGBgYHRzXG4gICAqIGNvbnN0IG5vdyA9IFRpbWVzdGFtcC5mcm9tTWlsbGlzKDFfNjg2XzAwMF8wMDBfMDAwbik7XG4gICAqIGNvbnN0IGNvdW50ZXIgPSB7IHZhbHVlOiAxIH07XG4gICAqIGNvbnN0IHJhbmRvbUJ5dGVzID0gbmV3IFVpbnQ4QXJyYXkoNCk7XG4gICAqXG4gICAqIGNvbnN0IHV1aWQgPSBVdWlkLmZyb21Db3VudGVyVjcoY291bnRlciwgbm93LCByYW5kb21CeXRlcyk7XG4gICAqXG4gICAqIGNvbnNvbGUuYXNzZXJ0KFxuICAgKiAgIHV1aWQudG9TdHJpbmcoKSA9PT0gXCIwMDAwNjQ3ZS01MTgwLTcwMDAtODAwMC0wMDAyMDAwMDAwMDBcIlxuICAgKiApO1xuICAgKiBgYGBcbiAgICovXG4gIHN0YXRpYyBmcm9tQ291bnRlclY3KGNvdW50ZXIsIG5vdywgcmFuZG9tQnl0ZXMpIHtcbiAgICBpZiAocmFuZG9tQnl0ZXMubGVuZ3RoICE9PSA0KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJgZnJvbUNvdW50ZXJWN2AgcmVxdWlyZXMgYHJhbmRvbUJ5dGVzLmxlbmd0aCA9PSA0YFwiKTtcbiAgICB9XG4gICAgaWYgKGNvdW50ZXIudmFsdWUgPCAwKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJgZnJvbUNvdW50ZXJWN2AgdXVpZCBgY291bnRlcmAgbXVzdCBiZSBub24tbmVnYXRpdmVcIik7XG4gICAgfVxuICAgIGlmIChub3cuX190aW1lc3RhbXBfbWljcm9zX3NpbmNlX3VuaXhfZXBvY2hfXyA8IDApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcImBmcm9tQ291bnRlclY3YCBgdGltZXN0YW1wYCBiZWZvcmUgdW5peCBlcG9jaFwiKTtcbiAgICB9XG4gICAgY29uc3QgY291bnRlclZhbCA9IGNvdW50ZXIudmFsdWU7XG4gICAgY291bnRlci52YWx1ZSA9IGNvdW50ZXJWYWwgKyAxICYgMjE0NzQ4MzY0NztcbiAgICBjb25zdCB0c01zID0gbm93LnRvTWlsbGlzKCkgJiAweGZmZmZmZmZmZmZmZm47XG4gICAgY29uc3QgYnl0ZXMgPSBuZXcgVWludDhBcnJheSgxNik7XG4gICAgYnl0ZXNbMF0gPSBOdW1iZXIodHNNcyA+PiA0MG4gJiAweGZmbik7XG4gICAgYnl0ZXNbMV0gPSBOdW1iZXIodHNNcyA+PiAzMm4gJiAweGZmbik7XG4gICAgYnl0ZXNbMl0gPSBOdW1iZXIodHNNcyA+PiAyNG4gJiAweGZmbik7XG4gICAgYnl0ZXNbM10gPSBOdW1iZXIodHNNcyA+PiAxNm4gJiAweGZmbik7XG4gICAgYnl0ZXNbNF0gPSBOdW1iZXIodHNNcyA+PiA4biAmIDB4ZmZuKTtcbiAgICBieXRlc1s1XSA9IE51bWJlcih0c01zICYgMHhmZm4pO1xuICAgIGJ5dGVzWzddID0gY291bnRlclZhbCA+Pj4gMjMgJiAyNTU7XG4gICAgYnl0ZXNbOV0gPSBjb3VudGVyVmFsID4+PiAxNSAmIDI1NTtcbiAgICBieXRlc1sxMF0gPSBjb3VudGVyVmFsID4+PiA3ICYgMjU1O1xuICAgIGJ5dGVzWzExXSA9IChjb3VudGVyVmFsICYgMTI3KSA8PCAxICYgMjU1O1xuICAgIGJ5dGVzWzEyXSB8PSByYW5kb21CeXRlc1swXSAmIDEyNztcbiAgICBieXRlc1sxM10gPSByYW5kb21CeXRlc1sxXTtcbiAgICBieXRlc1sxNF0gPSByYW5kb21CeXRlc1syXTtcbiAgICBieXRlc1sxNV0gPSByYW5kb21CeXRlc1szXTtcbiAgICBieXRlc1s2XSA9IGJ5dGVzWzZdICYgMTUgfCAxMTI7XG4gICAgYnl0ZXNbOF0gPSBieXRlc1s4XSAmIDYzIHwgMTI4O1xuICAgIHJldHVybiBuZXcgX1V1aWQoX1V1aWQuYnl0ZXNUb0JpZ0ludChieXRlcykpO1xuICB9XG4gIC8qKlxuICAgKiBQYXJzZSBhIFVVSUQgZnJvbSBhIHN0cmluZyByZXByZXNlbnRhdGlvbi5cbiAgICpcbiAgICogQHBhcmFtIHMgLSBVVUlEIHN0cmluZ1xuICAgKiBAcmV0dXJucyBQYXJzZWQgVVVJRFxuICAgKiBAdGhyb3dzIHtFcnJvcn0gSWYgdGhlIHN0cmluZyBpcyBub3QgYSB2YWxpZCBVVUlEXG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqIGBgYHRzXG4gICAqIGNvbnN0IHMgPSBcIjAxODg4ZDZlLTVjMDAtNzAwMC04MDAwLTAwMDAwMDAwMDAwMFwiO1xuICAgKiBjb25zdCB1dWlkID0gVXVpZC5wYXJzZShzKTtcbiAgICpcbiAgICogY29uc29sZS5hc3NlcnQodXVpZC50b1N0cmluZygpID09PSBzKTtcbiAgICogYGBgXG4gICAqL1xuICBzdGF0aWMgcGFyc2Uocykge1xuICAgIGNvbnN0IGhleCA9IHMucmVwbGFjZSgvLS9nLCBcIlwiKTtcbiAgICBpZiAoaGV4Lmxlbmd0aCAhPT0gMzIpIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgaGV4IFVVSURcIik7XG4gICAgbGV0IHYgPSAwbjtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDMyOyBpICs9IDIpIHtcbiAgICAgIHYgPSB2IDw8IDhuIHwgQmlnSW50KHBhcnNlSW50KGhleC5zbGljZShpLCBpICsgMiksIDE2KSk7XG4gICAgfVxuICAgIHJldHVybiBuZXcgX1V1aWQodik7XG4gIH1cbiAgLyoqIENvbnZlcnQgdG8gc3RyaW5nIChoeXBoZW5hdGVkIGZvcm0pLiAqL1xuICB0b1N0cmluZygpIHtcbiAgICBjb25zdCBieXRlcyA9IF9VdWlkLmJpZ0ludFRvQnl0ZXModGhpcy5fX3V1aWRfXyk7XG4gICAgY29uc3QgaGV4ID0gWy4uLmJ5dGVzXS5tYXAoKGIpID0+IGIudG9TdHJpbmcoMTYpLnBhZFN0YXJ0KDIsIFwiMFwiKSkuam9pbihcIlwiKTtcbiAgICByZXR1cm4gaGV4LnNsaWNlKDAsIDgpICsgXCItXCIgKyBoZXguc2xpY2UoOCwgMTIpICsgXCItXCIgKyBoZXguc2xpY2UoMTIsIDE2KSArIFwiLVwiICsgaGV4LnNsaWNlKDE2LCAyMCkgKyBcIi1cIiArIGhleC5zbGljZSgyMCk7XG4gIH1cbiAgLyoqIENvbnZlcnQgdG8gYmlnaW50ICh1MTI4KS4gKi9cbiAgYXNCaWdJbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX191dWlkX187XG4gIH1cbiAgLyoqIFJldHVybiBhIGBVaW50OEFycmF5YCBvZiAxNiBieXRlcy4gKi9cbiAgdG9CeXRlcygpIHtcbiAgICByZXR1cm4gX1V1aWQuYmlnSW50VG9CeXRlcyh0aGlzLl9fdXVpZF9fKTtcbiAgfVxuICBzdGF0aWMgYnl0ZXNUb0JpZ0ludChieXRlcykge1xuICAgIGxldCByZXN1bHQgPSAwbjtcbiAgICBmb3IgKGNvbnN0IGIgb2YgYnl0ZXMpIHJlc3VsdCA9IHJlc3VsdCA8PCA4biB8IEJpZ0ludChiKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG4gIHN0YXRpYyBiaWdJbnRUb0J5dGVzKHZhbHVlKSB7XG4gICAgY29uc3QgYnl0ZXMgPSBuZXcgVWludDhBcnJheSgxNik7XG4gICAgZm9yIChsZXQgaSA9IDE1OyBpID49IDA7IGktLSkge1xuICAgICAgYnl0ZXNbaV0gPSBOdW1iZXIodmFsdWUgJiAweGZmbik7XG4gICAgICB2YWx1ZSA+Pj0gOG47XG4gICAgfVxuICAgIHJldHVybiBieXRlcztcbiAgfVxuICAvKipcbiAgICogUmV0dXJucyB0aGUgdmVyc2lvbiBvZiB0aGlzIFVVSUQuXG4gICAqXG4gICAqIFRoaXMgcmVwcmVzZW50cyB0aGUgYWxnb3JpdGhtIHVzZWQgdG8gZ2VuZXJhdGUgdGhlIHZhbHVlLlxuICAgKlxuICAgKiBAcmV0dXJucyBBIGBVdWlkVmVyc2lvbmBcbiAgICogQHRocm93cyB7RXJyb3J9IElmIHRoZSB2ZXJzaW9uIGZpZWxkIGlzIG5vdCByZWNvZ25pemVkXG4gICAqL1xuICBnZXRWZXJzaW9uKCkge1xuICAgIGNvbnN0IHZlcnNpb24gPSB0aGlzLnRvQnl0ZXMoKVs2XSA+PiA0ICYgMTU7XG4gICAgc3dpdGNoICh2ZXJzaW9uKSB7XG4gICAgICBjYXNlIDQ6XG4gICAgICAgIHJldHVybiBcIlY0XCI7XG4gICAgICBjYXNlIDc6XG4gICAgICAgIHJldHVybiBcIlY3XCI7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBpZiAodGhpcyA9PSBfVXVpZC5OSUwpIHtcbiAgICAgICAgICByZXR1cm4gXCJOaWxcIjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcyA9PSBfVXVpZC5NQVgpIHtcbiAgICAgICAgICByZXR1cm4gXCJNYXhcIjtcbiAgICAgICAgfVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFVuc3VwcG9ydGVkIFVVSUQgdmVyc2lvbjogJHt2ZXJzaW9ufWApO1xuICAgIH1cbiAgfVxuICAvKipcbiAgICogRXh0cmFjdCB0aGUgbW9ub3RvbmljIGNvdW50ZXIgZnJvbSBhIFVVSUR2Ny5cbiAgICpcbiAgICogSW50ZW5kZWQgZm9yIHRlc3RpbmcgYW5kIGRpYWdub3N0aWNzLlxuICAgKiBCZWhhdmlvciBpcyB1bmRlZmluZWQgaWYgY2FsbGVkIG9uIGEgbm9uLVY3IFVVSUQuXG4gICAqXG4gICAqIEByZXR1cm5zIDMxLWJpdCBjb3VudGVyIHZhbHVlXG4gICAqL1xuICBnZXRDb3VudGVyKCkge1xuICAgIGNvbnN0IGJ5dGVzID0gdGhpcy50b0J5dGVzKCk7XG4gICAgY29uc3QgaGlnaCA9IGJ5dGVzWzddO1xuICAgIGNvbnN0IG1pZDEgPSBieXRlc1s5XTtcbiAgICBjb25zdCBtaWQyID0gYnl0ZXNbMTBdO1xuICAgIGNvbnN0IGxvdyA9IGJ5dGVzWzExXSA+Pj4gMTtcbiAgICByZXR1cm4gaGlnaCA8PCAyMyB8IG1pZDEgPDwgMTUgfCBtaWQyIDw8IDcgfCBsb3cgfCAwO1xuICB9XG4gIGNvbXBhcmVUbyhvdGhlcikge1xuICAgIGlmICh0aGlzLl9fdXVpZF9fIDwgb3RoZXIuX191dWlkX18pIHJldHVybiAtMTtcbiAgICBpZiAodGhpcy5fX3V1aWRfXyA+IG90aGVyLl9fdXVpZF9fKSByZXR1cm4gMTtcbiAgICByZXR1cm4gMDtcbiAgfVxuICBzdGF0aWMgZ2V0QWxnZWJyYWljVHlwZSgpIHtcbiAgICByZXR1cm4gQWxnZWJyYWljVHlwZS5Qcm9kdWN0KHtcbiAgICAgIGVsZW1lbnRzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBuYW1lOiBcIl9fdXVpZF9fXCIsXG4gICAgICAgICAgYWxnZWJyYWljVHlwZTogQWxnZWJyYWljVHlwZS5VMTI4XG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9KTtcbiAgfVxufTtcblxuLy8gc3JjL2xpYi9iaW5hcnlfcmVhZGVyLnRzXG52YXIgQmluYXJ5UmVhZGVyID0gY2xhc3Mge1xuICAvKipcbiAgICogVGhlIERhdGFWaWV3IHVzZWQgdG8gcmVhZCB2YWx1ZXMgZnJvbSB0aGUgYmluYXJ5IGRhdGEuXG4gICAqXG4gICAqIE5vdGU6IFRoZSBEYXRhVmlldydzIGBieXRlT2Zmc2V0YCBpcyByZWxhdGl2ZSB0byB0aGUgYmVnaW5uaW5nIG9mIHRoZVxuICAgKiB1bmRlcmx5aW5nIEFycmF5QnVmZmVyLCBub3QgdGhlIHN0YXJ0IG9mIHRoZSBwcm92aWRlZCBVaW50OEFycmF5IGlucHV0LlxuICAgKiBUaGlzIGBCaW5hcnlSZWFkZXJgJ3MgYCNvZmZzZXRgIGZpZWxkIGlzIHVzZWQgdG8gdHJhY2sgdGhlIGN1cnJlbnQgcmVhZCBwb3NpdGlvblxuICAgKiByZWxhdGl2ZSB0byB0aGUgc3RhcnQgb2YgdGhlIHByb3ZpZGVkIFVpbnQ4QXJyYXkgaW5wdXQuXG4gICAqL1xuICAjdmlldztcbiAgLyoqXG4gICAqIFJlcHJlc2VudHMgdGhlIG9mZnNldCAoaW4gYnl0ZXMpIHJlbGF0aXZlIHRvIHRoZSBzdGFydCBvZiB0aGUgRGF0YVZpZXdcbiAgICogYW5kIHByb3ZpZGVkIFVpbnQ4QXJyYXkgaW5wdXQuXG4gICAqXG4gICAqIE5vdGU6IFRoaXMgaXMgKm5vdCogdGhlIGFic29sdXRlIGJ5dGUgb2Zmc2V0IHdpdGhpbiB0aGUgdW5kZXJseWluZyBBcnJheUJ1ZmZlci5cbiAgICovXG4gICNvZmZzZXQgPSAwO1xuICBjb25zdHJ1Y3RvcihpbnB1dCkge1xuICAgIHRoaXMuI3ZpZXcgPSBuZXcgRGF0YVZpZXcoaW5wdXQuYnVmZmVyLCBpbnB1dC5ieXRlT2Zmc2V0LCBpbnB1dC5ieXRlTGVuZ3RoKTtcbiAgICB0aGlzLiNvZmZzZXQgPSAwO1xuICB9XG4gIGdldCBvZmZzZXQoKSB7XG4gICAgcmV0dXJuIHRoaXMuI29mZnNldDtcbiAgfVxuICBnZXQgcmVtYWluaW5nKCkge1xuICAgIHJldHVybiB0aGlzLiN2aWV3LmJ5dGVMZW5ndGggLSB0aGlzLiNvZmZzZXQ7XG4gIH1cbiAgLyoqIEVuc3VyZSB3ZSBoYXZlIGF0IGxlYXN0IGBuYCBieXRlcyBsZWZ0IHRvIHJlYWQgKi9cbiAgI2Vuc3VyZShuKSB7XG4gICAgaWYgKHRoaXMuI29mZnNldCArIG4gPiB0aGlzLiN2aWV3LmJ5dGVMZW5ndGgpIHtcbiAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKFxuICAgICAgICBgVHJpZWQgdG8gcmVhZCAke259IGJ5dGUocykgYXQgcmVsYXRpdmUgb2Zmc2V0ICR7dGhpcy4jb2Zmc2V0fSwgYnV0IG9ubHkgJHt0aGlzLnJlbWFpbmluZ30gYnl0ZShzKSByZW1haW5gXG4gICAgICApO1xuICAgIH1cbiAgfVxuICByZWFkVUludDhBcnJheSgpIHtcbiAgICBjb25zdCBsZW5ndGggPSB0aGlzLnJlYWRVMzIoKTtcbiAgICB0aGlzLiNlbnN1cmUobGVuZ3RoKTtcbiAgICByZXR1cm4gdGhpcy5yZWFkQnl0ZXMobGVuZ3RoKTtcbiAgfVxuICByZWFkQm9vbCgpIHtcbiAgICBjb25zdCB2YWx1ZSA9IHRoaXMuI3ZpZXcuZ2V0VWludDgodGhpcy4jb2Zmc2V0KTtcbiAgICB0aGlzLiNvZmZzZXQgKz0gMTtcbiAgICByZXR1cm4gdmFsdWUgIT09IDA7XG4gIH1cbiAgcmVhZEJ5dGUoKSB7XG4gICAgY29uc3QgdmFsdWUgPSB0aGlzLiN2aWV3LmdldFVpbnQ4KHRoaXMuI29mZnNldCk7XG4gICAgdGhpcy4jb2Zmc2V0ICs9IDE7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG4gIHJlYWRCeXRlcyhsZW5ndGgpIHtcbiAgICBjb25zdCBhcnJheSA9IG5ldyBVaW50OEFycmF5KFxuICAgICAgdGhpcy4jdmlldy5idWZmZXIsXG4gICAgICB0aGlzLiN2aWV3LmJ5dGVPZmZzZXQgKyB0aGlzLiNvZmZzZXQsXG4gICAgICBsZW5ndGhcbiAgICApO1xuICAgIHRoaXMuI29mZnNldCArPSBsZW5ndGg7XG4gICAgcmV0dXJuIGFycmF5O1xuICB9XG4gIHJlYWRJOCgpIHtcbiAgICBjb25zdCB2YWx1ZSA9IHRoaXMuI3ZpZXcuZ2V0SW50OCh0aGlzLiNvZmZzZXQpO1xuICAgIHRoaXMuI29mZnNldCArPSAxO1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuICByZWFkVTgoKSB7XG4gICAgcmV0dXJuIHRoaXMucmVhZEJ5dGUoKTtcbiAgfVxuICByZWFkSTE2KCkge1xuICAgIGNvbnN0IHZhbHVlID0gdGhpcy4jdmlldy5nZXRJbnQxNih0aGlzLiNvZmZzZXQsIHRydWUpO1xuICAgIHRoaXMuI29mZnNldCArPSAyO1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuICByZWFkVTE2KCkge1xuICAgIGNvbnN0IHZhbHVlID0gdGhpcy4jdmlldy5nZXRVaW50MTYodGhpcy4jb2Zmc2V0LCB0cnVlKTtcbiAgICB0aGlzLiNvZmZzZXQgKz0gMjtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cbiAgcmVhZEkzMigpIHtcbiAgICBjb25zdCB2YWx1ZSA9IHRoaXMuI3ZpZXcuZ2V0SW50MzIodGhpcy4jb2Zmc2V0LCB0cnVlKTtcbiAgICB0aGlzLiNvZmZzZXQgKz0gNDtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cbiAgcmVhZFUzMigpIHtcbiAgICBjb25zdCB2YWx1ZSA9IHRoaXMuI3ZpZXcuZ2V0VWludDMyKHRoaXMuI29mZnNldCwgdHJ1ZSk7XG4gICAgdGhpcy4jb2Zmc2V0ICs9IDQ7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG4gIHJlYWRJNjQoKSB7XG4gICAgY29uc3QgdmFsdWUgPSB0aGlzLiN2aWV3LmdldEJpZ0ludDY0KHRoaXMuI29mZnNldCwgdHJ1ZSk7XG4gICAgdGhpcy4jb2Zmc2V0ICs9IDg7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG4gIHJlYWRVNjQoKSB7XG4gICAgY29uc3QgdmFsdWUgPSB0aGlzLiN2aWV3LmdldEJpZ1VpbnQ2NCh0aGlzLiNvZmZzZXQsIHRydWUpO1xuICAgIHRoaXMuI29mZnNldCArPSA4O1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuICByZWFkVTEyOCgpIHtcbiAgICBjb25zdCBsb3dlclBhcnQgPSB0aGlzLiN2aWV3LmdldEJpZ1VpbnQ2NCh0aGlzLiNvZmZzZXQsIHRydWUpO1xuICAgIGNvbnN0IHVwcGVyUGFydCA9IHRoaXMuI3ZpZXcuZ2V0QmlnVWludDY0KHRoaXMuI29mZnNldCArIDgsIHRydWUpO1xuICAgIHRoaXMuI29mZnNldCArPSAxNjtcbiAgICByZXR1cm4gKHVwcGVyUGFydCA8PCBCaWdJbnQoNjQpKSArIGxvd2VyUGFydDtcbiAgfVxuICByZWFkSTEyOCgpIHtcbiAgICBjb25zdCBsb3dlclBhcnQgPSB0aGlzLiN2aWV3LmdldEJpZ1VpbnQ2NCh0aGlzLiNvZmZzZXQsIHRydWUpO1xuICAgIGNvbnN0IHVwcGVyUGFydCA9IHRoaXMuI3ZpZXcuZ2V0QmlnSW50NjQodGhpcy4jb2Zmc2V0ICsgOCwgdHJ1ZSk7XG4gICAgdGhpcy4jb2Zmc2V0ICs9IDE2O1xuICAgIHJldHVybiAodXBwZXJQYXJ0IDw8IEJpZ0ludCg2NCkpICsgbG93ZXJQYXJ0O1xuICB9XG4gIHJlYWRVMjU2KCkge1xuICAgIGNvbnN0IHAwID0gdGhpcy4jdmlldy5nZXRCaWdVaW50NjQodGhpcy4jb2Zmc2V0LCB0cnVlKTtcbiAgICBjb25zdCBwMSA9IHRoaXMuI3ZpZXcuZ2V0QmlnVWludDY0KHRoaXMuI29mZnNldCArIDgsIHRydWUpO1xuICAgIGNvbnN0IHAyID0gdGhpcy4jdmlldy5nZXRCaWdVaW50NjQodGhpcy4jb2Zmc2V0ICsgMTYsIHRydWUpO1xuICAgIGNvbnN0IHAzID0gdGhpcy4jdmlldy5nZXRCaWdVaW50NjQodGhpcy4jb2Zmc2V0ICsgMjQsIHRydWUpO1xuICAgIHRoaXMuI29mZnNldCArPSAzMjtcbiAgICByZXR1cm4gKHAzIDw8IEJpZ0ludCgzICogNjQpKSArIChwMiA8PCBCaWdJbnQoMiAqIDY0KSkgKyAocDEgPDwgQmlnSW50KDEgKiA2NCkpICsgcDA7XG4gIH1cbiAgcmVhZEkyNTYoKSB7XG4gICAgY29uc3QgcDAgPSB0aGlzLiN2aWV3LmdldEJpZ1VpbnQ2NCh0aGlzLiNvZmZzZXQsIHRydWUpO1xuICAgIGNvbnN0IHAxID0gdGhpcy4jdmlldy5nZXRCaWdVaW50NjQodGhpcy4jb2Zmc2V0ICsgOCwgdHJ1ZSk7XG4gICAgY29uc3QgcDIgPSB0aGlzLiN2aWV3LmdldEJpZ1VpbnQ2NCh0aGlzLiNvZmZzZXQgKyAxNiwgdHJ1ZSk7XG4gICAgY29uc3QgcDMgPSB0aGlzLiN2aWV3LmdldEJpZ0ludDY0KHRoaXMuI29mZnNldCArIDI0LCB0cnVlKTtcbiAgICB0aGlzLiNvZmZzZXQgKz0gMzI7XG4gICAgcmV0dXJuIChwMyA8PCBCaWdJbnQoMyAqIDY0KSkgKyAocDIgPDwgQmlnSW50KDIgKiA2NCkpICsgKHAxIDw8IEJpZ0ludCgxICogNjQpKSArIHAwO1xuICB9XG4gIHJlYWRGMzIoKSB7XG4gICAgY29uc3QgdmFsdWUgPSB0aGlzLiN2aWV3LmdldEZsb2F0MzIodGhpcy4jb2Zmc2V0LCB0cnVlKTtcbiAgICB0aGlzLiNvZmZzZXQgKz0gNDtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cbiAgcmVhZEY2NCgpIHtcbiAgICBjb25zdCB2YWx1ZSA9IHRoaXMuI3ZpZXcuZ2V0RmxvYXQ2NCh0aGlzLiNvZmZzZXQsIHRydWUpO1xuICAgIHRoaXMuI29mZnNldCArPSA4O1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuICByZWFkU3RyaW5nKCkge1xuICAgIGNvbnN0IHVpbnQ4QXJyYXkgPSB0aGlzLnJlYWRVSW50OEFycmF5KCk7XG4gICAgcmV0dXJuIG5ldyBUZXh0RGVjb2RlcihcInV0Zi04XCIpLmRlY29kZSh1aW50OEFycmF5KTtcbiAgfVxufTtcblxuLy8gc3JjL2xpYi9iaW5hcnlfd3JpdGVyLnRzXG52YXIgaW1wb3J0X2Jhc2U2NF9qcyA9IF9fdG9FU00ocmVxdWlyZV9iYXNlNjRfanMoKSk7XG52YXIgQmluYXJ5V3JpdGVyID0gY2xhc3Mge1xuICAjYnVmZmVyO1xuICAjdmlldztcbiAgI29mZnNldCA9IDA7XG4gIGNvbnN0cnVjdG9yKHNpemUpIHtcbiAgICB0aGlzLiNidWZmZXIgPSBuZXcgVWludDhBcnJheShzaXplKTtcbiAgICB0aGlzLiN2aWV3ID0gbmV3IERhdGFWaWV3KHRoaXMuI2J1ZmZlci5idWZmZXIpO1xuICB9XG4gICNleHBhbmRCdWZmZXIoYWRkaXRpb25hbENhcGFjaXR5KSB7XG4gICAgY29uc3QgbWluQ2FwYWNpdHkgPSB0aGlzLiNvZmZzZXQgKyBhZGRpdGlvbmFsQ2FwYWNpdHkgKyAxO1xuICAgIGlmIChtaW5DYXBhY2l0eSA8PSB0aGlzLiNidWZmZXIubGVuZ3RoKSByZXR1cm47XG4gICAgbGV0IG5ld0NhcGFjaXR5ID0gdGhpcy4jYnVmZmVyLmxlbmd0aCAqIDI7XG4gICAgaWYgKG5ld0NhcGFjaXR5IDwgbWluQ2FwYWNpdHkpIG5ld0NhcGFjaXR5ID0gbWluQ2FwYWNpdHk7XG4gICAgY29uc3QgbmV3QnVmZmVyID0gbmV3IFVpbnQ4QXJyYXkobmV3Q2FwYWNpdHkpO1xuICAgIG5ld0J1ZmZlci5zZXQodGhpcy4jYnVmZmVyKTtcbiAgICB0aGlzLiNidWZmZXIgPSBuZXdCdWZmZXI7XG4gICAgdGhpcy4jdmlldyA9IG5ldyBEYXRhVmlldyh0aGlzLiNidWZmZXIuYnVmZmVyKTtcbiAgfVxuICB0b0Jhc2U2NCgpIHtcbiAgICByZXR1cm4gKDAsIGltcG9ydF9iYXNlNjRfanMuZnJvbUJ5dGVBcnJheSkodGhpcy4jYnVmZmVyLnN1YmFycmF5KDAsIHRoaXMuI29mZnNldCkpO1xuICB9XG4gIGdldEJ1ZmZlcigpIHtcbiAgICByZXR1cm4gdGhpcy4jYnVmZmVyLnNsaWNlKDAsIHRoaXMuI29mZnNldCk7XG4gIH1cbiAgZ2V0IG9mZnNldCgpIHtcbiAgICByZXR1cm4gdGhpcy4jb2Zmc2V0O1xuICB9XG4gIHdyaXRlVUludDhBcnJheSh2YWx1ZSkge1xuICAgIGNvbnN0IGxlbmd0aCA9IHZhbHVlLmxlbmd0aDtcbiAgICB0aGlzLiNleHBhbmRCdWZmZXIoNCArIGxlbmd0aCk7XG4gICAgdGhpcy53cml0ZVUzMihsZW5ndGgpO1xuICAgIHRoaXMuI2J1ZmZlci5zZXQodmFsdWUsIHRoaXMuI29mZnNldCk7XG4gICAgdGhpcy4jb2Zmc2V0ICs9IHZhbHVlLmxlbmd0aDtcbiAgfVxuICB3cml0ZUJvb2wodmFsdWUpIHtcbiAgICB0aGlzLiNleHBhbmRCdWZmZXIoMSk7XG4gICAgdGhpcy4jdmlldy5zZXRVaW50OCh0aGlzLiNvZmZzZXQsIHZhbHVlID8gMSA6IDApO1xuICAgIHRoaXMuI29mZnNldCArPSAxO1xuICB9XG4gIHdyaXRlQnl0ZSh2YWx1ZSkge1xuICAgIHRoaXMuI2V4cGFuZEJ1ZmZlcigxKTtcbiAgICB0aGlzLiN2aWV3LnNldFVpbnQ4KHRoaXMuI29mZnNldCwgdmFsdWUpO1xuICAgIHRoaXMuI29mZnNldCArPSAxO1xuICB9XG4gIHdyaXRlSTgodmFsdWUpIHtcbiAgICB0aGlzLiNleHBhbmRCdWZmZXIoMSk7XG4gICAgdGhpcy4jdmlldy5zZXRJbnQ4KHRoaXMuI29mZnNldCwgdmFsdWUpO1xuICAgIHRoaXMuI29mZnNldCArPSAxO1xuICB9XG4gIHdyaXRlVTgodmFsdWUpIHtcbiAgICB0aGlzLiNleHBhbmRCdWZmZXIoMSk7XG4gICAgdGhpcy4jdmlldy5zZXRVaW50OCh0aGlzLiNvZmZzZXQsIHZhbHVlKTtcbiAgICB0aGlzLiNvZmZzZXQgKz0gMTtcbiAgfVxuICB3cml0ZUkxNih2YWx1ZSkge1xuICAgIHRoaXMuI2V4cGFuZEJ1ZmZlcigyKTtcbiAgICB0aGlzLiN2aWV3LnNldEludDE2KHRoaXMuI29mZnNldCwgdmFsdWUsIHRydWUpO1xuICAgIHRoaXMuI29mZnNldCArPSAyO1xuICB9XG4gIHdyaXRlVTE2KHZhbHVlKSB7XG4gICAgdGhpcy4jZXhwYW5kQnVmZmVyKDIpO1xuICAgIHRoaXMuI3ZpZXcuc2V0VWludDE2KHRoaXMuI29mZnNldCwgdmFsdWUsIHRydWUpO1xuICAgIHRoaXMuI29mZnNldCArPSAyO1xuICB9XG4gIHdyaXRlSTMyKHZhbHVlKSB7XG4gICAgdGhpcy4jZXhwYW5kQnVmZmVyKDQpO1xuICAgIHRoaXMuI3ZpZXcuc2V0SW50MzIodGhpcy4jb2Zmc2V0LCB2YWx1ZSwgdHJ1ZSk7XG4gICAgdGhpcy4jb2Zmc2V0ICs9IDQ7XG4gIH1cbiAgd3JpdGVVMzIodmFsdWUpIHtcbiAgICB0aGlzLiNleHBhbmRCdWZmZXIoNCk7XG4gICAgdGhpcy4jdmlldy5zZXRVaW50MzIodGhpcy4jb2Zmc2V0LCB2YWx1ZSwgdHJ1ZSk7XG4gICAgdGhpcy4jb2Zmc2V0ICs9IDQ7XG4gIH1cbiAgd3JpdGVJNjQodmFsdWUpIHtcbiAgICB0aGlzLiNleHBhbmRCdWZmZXIoOCk7XG4gICAgdGhpcy4jdmlldy5zZXRCaWdJbnQ2NCh0aGlzLiNvZmZzZXQsIHZhbHVlLCB0cnVlKTtcbiAgICB0aGlzLiNvZmZzZXQgKz0gODtcbiAgfVxuICB3cml0ZVU2NCh2YWx1ZSkge1xuICAgIHRoaXMuI2V4cGFuZEJ1ZmZlcig4KTtcbiAgICB0aGlzLiN2aWV3LnNldEJpZ1VpbnQ2NCh0aGlzLiNvZmZzZXQsIHZhbHVlLCB0cnVlKTtcbiAgICB0aGlzLiNvZmZzZXQgKz0gODtcbiAgfVxuICB3cml0ZVUxMjgodmFsdWUpIHtcbiAgICB0aGlzLiNleHBhbmRCdWZmZXIoMTYpO1xuICAgIGNvbnN0IGxvd2VyUGFydCA9IHZhbHVlICYgQmlnSW50KFwiMHhGRkZGRkZGRkZGRkZGRkZGXCIpO1xuICAgIGNvbnN0IHVwcGVyUGFydCA9IHZhbHVlID4+IEJpZ0ludCg2NCk7XG4gICAgdGhpcy4jdmlldy5zZXRCaWdVaW50NjQodGhpcy4jb2Zmc2V0LCBsb3dlclBhcnQsIHRydWUpO1xuICAgIHRoaXMuI3ZpZXcuc2V0QmlnVWludDY0KHRoaXMuI29mZnNldCArIDgsIHVwcGVyUGFydCwgdHJ1ZSk7XG4gICAgdGhpcy4jb2Zmc2V0ICs9IDE2O1xuICB9XG4gIHdyaXRlSTEyOCh2YWx1ZSkge1xuICAgIHRoaXMuI2V4cGFuZEJ1ZmZlcigxNik7XG4gICAgY29uc3QgbG93ZXJQYXJ0ID0gdmFsdWUgJiBCaWdJbnQoXCIweEZGRkZGRkZGRkZGRkZGRkZcIik7XG4gICAgY29uc3QgdXBwZXJQYXJ0ID0gdmFsdWUgPj4gQmlnSW50KDY0KTtcbiAgICB0aGlzLiN2aWV3LnNldEJpZ0ludDY0KHRoaXMuI29mZnNldCwgbG93ZXJQYXJ0LCB0cnVlKTtcbiAgICB0aGlzLiN2aWV3LnNldEJpZ0ludDY0KHRoaXMuI29mZnNldCArIDgsIHVwcGVyUGFydCwgdHJ1ZSk7XG4gICAgdGhpcy4jb2Zmc2V0ICs9IDE2O1xuICB9XG4gIHdyaXRlVTI1Nih2YWx1ZSkge1xuICAgIHRoaXMuI2V4cGFuZEJ1ZmZlcigzMik7XG4gICAgY29uc3QgbG93XzY0X21hc2sgPSBCaWdJbnQoXCIweEZGRkZGRkZGRkZGRkZGRkZcIik7XG4gICAgY29uc3QgcDAgPSB2YWx1ZSAmIGxvd182NF9tYXNrO1xuICAgIGNvbnN0IHAxID0gdmFsdWUgPj4gQmlnSW50KDY0ICogMSkgJiBsb3dfNjRfbWFzaztcbiAgICBjb25zdCBwMiA9IHZhbHVlID4+IEJpZ0ludCg2NCAqIDIpICYgbG93XzY0X21hc2s7XG4gICAgY29uc3QgcDMgPSB2YWx1ZSA+PiBCaWdJbnQoNjQgKiAzKTtcbiAgICB0aGlzLiN2aWV3LnNldEJpZ1VpbnQ2NCh0aGlzLiNvZmZzZXQgKyA4ICogMCwgcDAsIHRydWUpO1xuICAgIHRoaXMuI3ZpZXcuc2V0QmlnVWludDY0KHRoaXMuI29mZnNldCArIDggKiAxLCBwMSwgdHJ1ZSk7XG4gICAgdGhpcy4jdmlldy5zZXRCaWdVaW50NjQodGhpcy4jb2Zmc2V0ICsgOCAqIDIsIHAyLCB0cnVlKTtcbiAgICB0aGlzLiN2aWV3LnNldEJpZ1VpbnQ2NCh0aGlzLiNvZmZzZXQgKyA4ICogMywgcDMsIHRydWUpO1xuICAgIHRoaXMuI29mZnNldCArPSAzMjtcbiAgfVxuICB3cml0ZUkyNTYodmFsdWUpIHtcbiAgICB0aGlzLiNleHBhbmRCdWZmZXIoMzIpO1xuICAgIGNvbnN0IGxvd182NF9tYXNrID0gQmlnSW50KFwiMHhGRkZGRkZGRkZGRkZGRkZGXCIpO1xuICAgIGNvbnN0IHAwID0gdmFsdWUgJiBsb3dfNjRfbWFzaztcbiAgICBjb25zdCBwMSA9IHZhbHVlID4+IEJpZ0ludCg2NCAqIDEpICYgbG93XzY0X21hc2s7XG4gICAgY29uc3QgcDIgPSB2YWx1ZSA+PiBCaWdJbnQoNjQgKiAyKSAmIGxvd182NF9tYXNrO1xuICAgIGNvbnN0IHAzID0gdmFsdWUgPj4gQmlnSW50KDY0ICogMyk7XG4gICAgdGhpcy4jdmlldy5zZXRCaWdVaW50NjQodGhpcy4jb2Zmc2V0ICsgOCAqIDAsIHAwLCB0cnVlKTtcbiAgICB0aGlzLiN2aWV3LnNldEJpZ1VpbnQ2NCh0aGlzLiNvZmZzZXQgKyA4ICogMSwgcDEsIHRydWUpO1xuICAgIHRoaXMuI3ZpZXcuc2V0QmlnVWludDY0KHRoaXMuI29mZnNldCArIDggKiAyLCBwMiwgdHJ1ZSk7XG4gICAgdGhpcy4jdmlldy5zZXRCaWdJbnQ2NCh0aGlzLiNvZmZzZXQgKyA4ICogMywgcDMsIHRydWUpO1xuICAgIHRoaXMuI29mZnNldCArPSAzMjtcbiAgfVxuICB3cml0ZUYzMih2YWx1ZSkge1xuICAgIHRoaXMuI2V4cGFuZEJ1ZmZlcig0KTtcbiAgICB0aGlzLiN2aWV3LnNldEZsb2F0MzIodGhpcy4jb2Zmc2V0LCB2YWx1ZSwgdHJ1ZSk7XG4gICAgdGhpcy4jb2Zmc2V0ICs9IDQ7XG4gIH1cbiAgd3JpdGVGNjQodmFsdWUpIHtcbiAgICB0aGlzLiNleHBhbmRCdWZmZXIoOCk7XG4gICAgdGhpcy4jdmlldy5zZXRGbG9hdDY0KHRoaXMuI29mZnNldCwgdmFsdWUsIHRydWUpO1xuICAgIHRoaXMuI29mZnNldCArPSA4O1xuICB9XG4gIHdyaXRlU3RyaW5nKHZhbHVlKSB7XG4gICAgY29uc3QgZW5jb2RlciA9IG5ldyBUZXh0RW5jb2RlcigpO1xuICAgIGNvbnN0IGVuY29kZWRTdHJpbmcgPSBlbmNvZGVyLmVuY29kZSh2YWx1ZSk7XG4gICAgdGhpcy53cml0ZVUzMihlbmNvZGVkU3RyaW5nLmxlbmd0aCk7XG4gICAgdGhpcy4jZXhwYW5kQnVmZmVyKGVuY29kZWRTdHJpbmcubGVuZ3RoKTtcbiAgICB0aGlzLiNidWZmZXIuc2V0KGVuY29kZWRTdHJpbmcsIHRoaXMuI29mZnNldCk7XG4gICAgdGhpcy4jb2Zmc2V0ICs9IGVuY29kZWRTdHJpbmcubGVuZ3RoO1xuICB9XG59O1xuXG4vLyBzcmMvbGliL3V0aWwudHNcbmZ1bmN0aW9uIHRvUGFzY2FsQ2FzZShzKSB7XG4gIGNvbnN0IHN0ciA9IHMucmVwbGFjZSgvKFstX11bYS16XSkvZ2ksICgkMSkgPT4ge1xuICAgIHJldHVybiAkMS50b1VwcGVyQ2FzZSgpLnJlcGxhY2UoXCItXCIsIFwiXCIpLnJlcGxhY2UoXCJfXCIsIFwiXCIpO1xuICB9KTtcbiAgcmV0dXJuIHN0ci5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHN0ci5zbGljZSgxKTtcbn1cbmZ1bmN0aW9uIHVpbnQ4QXJyYXlUb0hleFN0cmluZyhhcnJheSkge1xuICByZXR1cm4gQXJyYXkucHJvdG90eXBlLm1hcC5jYWxsKGFycmF5LnJldmVyc2UoKSwgKHgpID0+IChcIjAwXCIgKyB4LnRvU3RyaW5nKDE2KSkuc2xpY2UoLTIpKS5qb2luKFwiXCIpO1xufVxuZnVuY3Rpb24gdWludDhBcnJheVRvVTEyOChhcnJheSkge1xuICBpZiAoYXJyYXkubGVuZ3RoICE9IDE2KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBVaW50OEFycmF5IGlzIG5vdCAxNiBieXRlcyBsb25nOiAke2FycmF5fWApO1xuICB9XG4gIHJldHVybiBuZXcgQmluYXJ5UmVhZGVyKGFycmF5KS5yZWFkVTEyOCgpO1xufVxuZnVuY3Rpb24gdWludDhBcnJheVRvVTI1NihhcnJheSkge1xuICBpZiAoYXJyYXkubGVuZ3RoICE9IDMyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBVaW50OEFycmF5IGlzIG5vdCAzMiBieXRlcyBsb25nOiBbJHthcnJheX1dYCk7XG4gIH1cbiAgcmV0dXJuIG5ldyBCaW5hcnlSZWFkZXIoYXJyYXkpLnJlYWRVMjU2KCk7XG59XG5mdW5jdGlvbiBoZXhTdHJpbmdUb1VpbnQ4QXJyYXkoc3RyKSB7XG4gIGlmIChzdHIuc3RhcnRzV2l0aChcIjB4XCIpKSB7XG4gICAgc3RyID0gc3RyLnNsaWNlKDIpO1xuICB9XG4gIGNvbnN0IG1hdGNoZXMgPSBzdHIubWF0Y2goLy57MSwyfS9nKSB8fCBbXTtcbiAgY29uc3QgZGF0YSA9IFVpbnQ4QXJyYXkuZnJvbShcbiAgICBtYXRjaGVzLm1hcCgoYnl0ZSkgPT4gcGFyc2VJbnQoYnl0ZSwgMTYpKVxuICApO1xuICByZXR1cm4gZGF0YS5yZXZlcnNlKCk7XG59XG5mdW5jdGlvbiBoZXhTdHJpbmdUb1UxMjgoc3RyKSB7XG4gIHJldHVybiB1aW50OEFycmF5VG9VMTI4KGhleFN0cmluZ1RvVWludDhBcnJheShzdHIpKTtcbn1cbmZ1bmN0aW9uIGhleFN0cmluZ1RvVTI1NihzdHIpIHtcbiAgcmV0dXJuIHVpbnQ4QXJyYXlUb1UyNTYoaGV4U3RyaW5nVG9VaW50OEFycmF5KHN0cikpO1xufVxuZnVuY3Rpb24gdTEyOFRvVWludDhBcnJheShkYXRhKSB7XG4gIGNvbnN0IHdyaXRlciA9IG5ldyBCaW5hcnlXcml0ZXIoMTYpO1xuICB3cml0ZXIud3JpdGVVMTI4KGRhdGEpO1xuICByZXR1cm4gd3JpdGVyLmdldEJ1ZmZlcigpO1xufVxuZnVuY3Rpb24gdTEyOFRvSGV4U3RyaW5nKGRhdGEpIHtcbiAgcmV0dXJuIHVpbnQ4QXJyYXlUb0hleFN0cmluZyh1MTI4VG9VaW50OEFycmF5KGRhdGEpKTtcbn1cbmZ1bmN0aW9uIHUyNTZUb1VpbnQ4QXJyYXkoZGF0YSkge1xuICBjb25zdCB3cml0ZXIgPSBuZXcgQmluYXJ5V3JpdGVyKDMyKTtcbiAgd3JpdGVyLndyaXRlVTI1NihkYXRhKTtcbiAgcmV0dXJuIHdyaXRlci5nZXRCdWZmZXIoKTtcbn1cbmZ1bmN0aW9uIHUyNTZUb0hleFN0cmluZyhkYXRhKSB7XG4gIHJldHVybiB1aW50OEFycmF5VG9IZXhTdHJpbmcodTI1NlRvVWludDhBcnJheShkYXRhKSk7XG59XG5mdW5jdGlvbiB0b0NhbWVsQ2FzZShzdHIpIHtcbiAgcmV0dXJuIHN0ci5yZXBsYWNlKC9bLV9dKy9nLCBcIl9cIikucmVwbGFjZSgvXyhbYS16QS1aMC05XSkvZywgKF8sIGMpID0+IGMudG9VcHBlckNhc2UoKSk7XG59XG5mdW5jdGlvbiBic2F0bkJhc2VTaXplKHR5cGVzcGFjZSwgdHkpIHtcbiAgY29uc3QgYXNzdW1lZEFycmF5TGVuZ3RoID0gNDtcbiAgd2hpbGUgKHR5LnRhZyA9PT0gXCJSZWZcIikgdHkgPSB0eXBlc3BhY2UudHlwZXNbdHkudmFsdWVdO1xuICBpZiAodHkudGFnID09PSBcIlByb2R1Y3RcIikge1xuICAgIGxldCBzdW0gPSAwO1xuICAgIGZvciAoY29uc3QgeyBhbGdlYnJhaWNUeXBlOiBlbGVtIH0gb2YgdHkudmFsdWUuZWxlbWVudHMpIHtcbiAgICAgIHN1bSArPSBic2F0bkJhc2VTaXplKHR5cGVzcGFjZSwgZWxlbSk7XG4gICAgfVxuICAgIHJldHVybiBzdW07XG4gIH0gZWxzZSBpZiAodHkudGFnID09PSBcIlN1bVwiKSB7XG4gICAgbGV0IG1pbiA9IEluZmluaXR5O1xuICAgIGZvciAoY29uc3QgeyBhbGdlYnJhaWNUeXBlOiB2YXJpIH0gb2YgdHkudmFsdWUudmFyaWFudHMpIHtcbiAgICAgIGNvbnN0IHZTaXplID0gYnNhdG5CYXNlU2l6ZSh0eXBlc3BhY2UsIHZhcmkpO1xuICAgICAgaWYgKHZTaXplIDwgbWluKSBtaW4gPSB2U2l6ZTtcbiAgICB9XG4gICAgaWYgKG1pbiA9PT0gSW5maW5pdHkpIG1pbiA9IDA7XG4gICAgcmV0dXJuIDQgKyBtaW47XG4gIH0gZWxzZSBpZiAodHkudGFnID09IFwiQXJyYXlcIikge1xuICAgIHJldHVybiA0ICsgYXNzdW1lZEFycmF5TGVuZ3RoICogYnNhdG5CYXNlU2l6ZSh0eXBlc3BhY2UsIHR5LnZhbHVlKTtcbiAgfVxuICByZXR1cm4ge1xuICAgIFN0cmluZzogNCArIGFzc3VtZWRBcnJheUxlbmd0aCxcbiAgICBTdW06IDEsXG4gICAgQm9vbDogMSxcbiAgICBJODogMSxcbiAgICBVODogMSxcbiAgICBJMTY6IDIsXG4gICAgVTE2OiAyLFxuICAgIEkzMjogNCxcbiAgICBVMzI6IDQsXG4gICAgRjMyOiA0LFxuICAgIEk2NDogOCxcbiAgICBVNjQ6IDgsXG4gICAgRjY0OiA4LFxuICAgIEkxMjg6IDE2LFxuICAgIFUxMjg6IDE2LFxuICAgIEkyNTY6IDMyLFxuICAgIFUyNTY6IDMyXG4gIH1bdHkudGFnXTtcbn1cblxuLy8gc3JjL2xpYi9jb25uZWN0aW9uX2lkLnRzXG52YXIgQ29ubmVjdGlvbklkID0gY2xhc3MgX0Nvbm5lY3Rpb25JZCB7XG4gIF9fY29ubmVjdGlvbl9pZF9fO1xuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBgQ29ubmVjdGlvbklkYC5cbiAgICovXG4gIGNvbnN0cnVjdG9yKGRhdGEpIHtcbiAgICB0aGlzLl9fY29ubmVjdGlvbl9pZF9fID0gZGF0YTtcbiAgfVxuICAvKipcbiAgICogR2V0IHRoZSBhbGdlYnJhaWMgdHlwZSByZXByZXNlbnRhdGlvbiBvZiB0aGUge0BsaW5rIENvbm5lY3Rpb25JZH0gdHlwZS5cbiAgICogQHJldHVybnMgVGhlIGFsZ2VicmFpYyB0eXBlIHJlcHJlc2VudGF0aW9uIG9mIHRoZSB0eXBlLlxuICAgKi9cbiAgc3RhdGljIGdldEFsZ2VicmFpY1R5cGUoKSB7XG4gICAgcmV0dXJuIEFsZ2VicmFpY1R5cGUuUHJvZHVjdCh7XG4gICAgICBlbGVtZW50czogW1xuICAgICAgICB7IG5hbWU6IFwiX19jb25uZWN0aW9uX2lkX19cIiwgYWxnZWJyYWljVHlwZTogQWxnZWJyYWljVHlwZS5VMTI4IH1cbiAgICAgIF1cbiAgICB9KTtcbiAgfVxuICBpc1plcm8oKSB7XG4gICAgcmV0dXJuIHRoaXMuX19jb25uZWN0aW9uX2lkX18gPT09IEJpZ0ludCgwKTtcbiAgfVxuICBzdGF0aWMgbnVsbElmWmVybyhhZGRyKSB7XG4gICAgaWYgKGFkZHIuaXNaZXJvKCkpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gYWRkcjtcbiAgICB9XG4gIH1cbiAgc3RhdGljIHJhbmRvbSgpIHtcbiAgICBmdW5jdGlvbiByYW5kb21VOCgpIHtcbiAgICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyNTUpO1xuICAgIH1cbiAgICBsZXQgcmVzdWx0ID0gQmlnSW50KDApO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTY7IGkrKykge1xuICAgICAgcmVzdWx0ID0gcmVzdWx0IDw8IEJpZ0ludCg4KSB8IEJpZ0ludChyYW5kb21VOCgpKTtcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBfQ29ubmVjdGlvbklkKHJlc3VsdCk7XG4gIH1cbiAgLyoqXG4gICAqIENvbXBhcmUgdHdvIGNvbm5lY3Rpb24gSURzIGZvciBlcXVhbGl0eS5cbiAgICovXG4gIGlzRXF1YWwob3RoZXIpIHtcbiAgICByZXR1cm4gdGhpcy5fX2Nvbm5lY3Rpb25faWRfXyA9PSBvdGhlci5fX2Nvbm5lY3Rpb25faWRfXztcbiAgfVxuICAvKipcbiAgICogQ2hlY2sgaWYgdHdvIGNvbm5lY3Rpb24gSURzIGFyZSBlcXVhbC5cbiAgICovXG4gIGVxdWFscyhvdGhlcikge1xuICAgIHJldHVybiB0aGlzLmlzRXF1YWwob3RoZXIpO1xuICB9XG4gIC8qKlxuICAgKiBQcmludCB0aGUgY29ubmVjdGlvbiBJRCBhcyBhIGhleGFkZWNpbWFsIHN0cmluZy5cbiAgICovXG4gIHRvSGV4U3RyaW5nKCkge1xuICAgIHJldHVybiB1MTI4VG9IZXhTdHJpbmcodGhpcy5fX2Nvbm5lY3Rpb25faWRfXyk7XG4gIH1cbiAgLyoqXG4gICAqIENvbnZlcnQgdGhlIGNvbm5lY3Rpb24gSUQgdG8gYSBVaW50OEFycmF5LlxuICAgKi9cbiAgdG9VaW50OEFycmF5KCkge1xuICAgIHJldHVybiB1MTI4VG9VaW50OEFycmF5KHRoaXMuX19jb25uZWN0aW9uX2lkX18pO1xuICB9XG4gIC8qKlxuICAgKiBQYXJzZSBhIGNvbm5lY3Rpb24gSUQgZnJvbSBhIGhleGFkZWNpbWFsIHN0cmluZy5cbiAgICovXG4gIHN0YXRpYyBmcm9tU3RyaW5nKHN0cikge1xuICAgIHJldHVybiBuZXcgX0Nvbm5lY3Rpb25JZChoZXhTdHJpbmdUb1UxMjgoc3RyKSk7XG4gIH1cbiAgc3RhdGljIGZyb21TdHJpbmdPck51bGwoc3RyKSB7XG4gICAgY29uc3QgYWRkciA9IF9Db25uZWN0aW9uSWQuZnJvbVN0cmluZyhzdHIpO1xuICAgIGlmIChhZGRyLmlzWmVybygpKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGFkZHI7XG4gICAgfVxuICB9XG59O1xuXG4vLyBzcmMvbGliL2lkZW50aXR5LnRzXG52YXIgSWRlbnRpdHkgPSBjbGFzcyBfSWRlbnRpdHkge1xuICBfX2lkZW50aXR5X187XG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IGBJZGVudGl0eWAuXG4gICAqXG4gICAqIGBkYXRhYCBjYW4gYmUgYSBoZXhhZGVjaW1hbCBzdHJpbmcgb3IgYSBgYmlnaW50YC5cbiAgICovXG4gIGNvbnN0cnVjdG9yKGRhdGEpIHtcbiAgICB0aGlzLl9faWRlbnRpdHlfXyA9IHR5cGVvZiBkYXRhID09PSBcInN0cmluZ1wiID8gaGV4U3RyaW5nVG9VMjU2KGRhdGEpIDogZGF0YTtcbiAgfVxuICAvKipcbiAgICogR2V0IHRoZSBhbGdlYnJhaWMgdHlwZSByZXByZXNlbnRhdGlvbiBvZiB0aGUge0BsaW5rIElkZW50aXR5fSB0eXBlLlxuICAgKiBAcmV0dXJucyBUaGUgYWxnZWJyYWljIHR5cGUgcmVwcmVzZW50YXRpb24gb2YgdGhlIHR5cGUuXG4gICAqL1xuICBzdGF0aWMgZ2V0QWxnZWJyYWljVHlwZSgpIHtcbiAgICByZXR1cm4gQWxnZWJyYWljVHlwZS5Qcm9kdWN0KHtcbiAgICAgIGVsZW1lbnRzOiBbeyBuYW1lOiBcIl9faWRlbnRpdHlfX1wiLCBhbGdlYnJhaWNUeXBlOiBBbGdlYnJhaWNUeXBlLlUyNTYgfV1cbiAgICB9KTtcbiAgfVxuICAvKipcbiAgICogQ2hlY2sgaWYgdHdvIGlkZW50aXRpZXMgYXJlIGVxdWFsLlxuICAgKi9cbiAgaXNFcXVhbChvdGhlcikge1xuICAgIHJldHVybiB0aGlzLnRvSGV4U3RyaW5nKCkgPT09IG90aGVyLnRvSGV4U3RyaW5nKCk7XG4gIH1cbiAgLyoqXG4gICAqIENoZWNrIGlmIHR3byBpZGVudGl0aWVzIGFyZSBlcXVhbC5cbiAgICovXG4gIGVxdWFscyhvdGhlcikge1xuICAgIHJldHVybiB0aGlzLmlzRXF1YWwob3RoZXIpO1xuICB9XG4gIC8qKlxuICAgKiBQcmludCB0aGUgaWRlbnRpdHkgYXMgYSBoZXhhZGVjaW1hbCBzdHJpbmcuXG4gICAqL1xuICB0b0hleFN0cmluZygpIHtcbiAgICByZXR1cm4gdTI1NlRvSGV4U3RyaW5nKHRoaXMuX19pZGVudGl0eV9fKTtcbiAgfVxuICAvKipcbiAgICogQ29udmVydCB0aGUgYWRkcmVzcyB0byBhIFVpbnQ4QXJyYXkuXG4gICAqL1xuICB0b1VpbnQ4QXJyYXkoKSB7XG4gICAgcmV0dXJuIHUyNTZUb1VpbnQ4QXJyYXkodGhpcy5fX2lkZW50aXR5X18pO1xuICB9XG4gIC8qKlxuICAgKiBQYXJzZSBhbiBJZGVudGl0eSBmcm9tIGEgaGV4YWRlY2ltYWwgc3RyaW5nLlxuICAgKi9cbiAgc3RhdGljIGZyb21TdHJpbmcoc3RyKSB7XG4gICAgcmV0dXJuIG5ldyBfSWRlbnRpdHkoc3RyKTtcbiAgfVxuICAvKipcbiAgICogWmVybyBpZGVudGl0eSAoMHgwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwKVxuICAgKi9cbiAgc3RhdGljIHplcm8oKSB7XG4gICAgcmV0dXJuIG5ldyBfSWRlbnRpdHkoMG4pO1xuICB9XG4gIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLnRvSGV4U3RyaW5nKCk7XG4gIH1cbn07XG5cbi8vIHNyYy9saWIvYWxnZWJyYWljX3R5cGUudHNcbnZhciBBbGdlYnJhaWNUeXBlID0ge1xuICBSZWY6ICh2YWx1ZSkgPT4gKHsgdGFnOiBcIlJlZlwiLCB2YWx1ZSB9KSxcbiAgU3VtOiAodmFsdWUpID0+ICh7XG4gICAgdGFnOiBcIlN1bVwiLFxuICAgIHZhbHVlXG4gIH0pLFxuICBQcm9kdWN0OiAodmFsdWUpID0+ICh7XG4gICAgdGFnOiBcIlByb2R1Y3RcIixcbiAgICB2YWx1ZVxuICB9KSxcbiAgQXJyYXk6ICh2YWx1ZSkgPT4gKHtcbiAgICB0YWc6IFwiQXJyYXlcIixcbiAgICB2YWx1ZVxuICB9KSxcbiAgU3RyaW5nOiB7IHRhZzogXCJTdHJpbmdcIiB9LFxuICBCb29sOiB7IHRhZzogXCJCb29sXCIgfSxcbiAgSTg6IHsgdGFnOiBcIkk4XCIgfSxcbiAgVTg6IHsgdGFnOiBcIlU4XCIgfSxcbiAgSTE2OiB7IHRhZzogXCJJMTZcIiB9LFxuICBVMTY6IHsgdGFnOiBcIlUxNlwiIH0sXG4gIEkzMjogeyB0YWc6IFwiSTMyXCIgfSxcbiAgVTMyOiB7IHRhZzogXCJVMzJcIiB9LFxuICBJNjQ6IHsgdGFnOiBcIkk2NFwiIH0sXG4gIFU2NDogeyB0YWc6IFwiVTY0XCIgfSxcbiAgSTEyODogeyB0YWc6IFwiSTEyOFwiIH0sXG4gIFUxMjg6IHsgdGFnOiBcIlUxMjhcIiB9LFxuICBJMjU2OiB7IHRhZzogXCJJMjU2XCIgfSxcbiAgVTI1NjogeyB0YWc6IFwiVTI1NlwiIH0sXG4gIEYzMjogeyB0YWc6IFwiRjMyXCIgfSxcbiAgRjY0OiB7IHRhZzogXCJGNjRcIiB9LFxuICBzZXJpYWxpemVWYWx1ZSh3cml0ZXIsIHR5LCB2YWx1ZSwgdHlwZXNwYWNlKSB7XG4gICAgaWYgKHR5LnRhZyA9PT0gXCJSZWZcIikge1xuICAgICAgaWYgKCF0eXBlc3BhY2UpXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcImNhbm5vdCBzZXJpYWxpemUgcmVmcyB3aXRob3V0IGEgdHlwZXNwYWNlXCIpO1xuICAgICAgd2hpbGUgKHR5LnRhZyA9PT0gXCJSZWZcIikgdHkgPSB0eXBlc3BhY2UudHlwZXNbdHkudmFsdWVdO1xuICAgIH1cbiAgICBzd2l0Y2ggKHR5LnRhZykge1xuICAgICAgY2FzZSBcIlByb2R1Y3RcIjpcbiAgICAgICAgUHJvZHVjdFR5cGUuc2VyaWFsaXplVmFsdWUod3JpdGVyLCB0eS52YWx1ZSwgdmFsdWUsIHR5cGVzcGFjZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcIlN1bVwiOlxuICAgICAgICBTdW1UeXBlLnNlcmlhbGl6ZVZhbHVlKHdyaXRlciwgdHkudmFsdWUsIHZhbHVlLCB0eXBlc3BhY2UpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJBcnJheVwiOlxuICAgICAgICBpZiAodHkudmFsdWUudGFnID09PSBcIlU4XCIpIHtcbiAgICAgICAgICB3cml0ZXIud3JpdGVVSW50OEFycmF5KHZhbHVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zdCBlbGVtVHlwZSA9IHR5LnZhbHVlO1xuICAgICAgICAgIHdyaXRlci53cml0ZVUzMih2YWx1ZS5sZW5ndGgpO1xuICAgICAgICAgIGZvciAoY29uc3QgZWxlbSBvZiB2YWx1ZSkge1xuICAgICAgICAgICAgQWxnZWJyYWljVHlwZS5zZXJpYWxpemVWYWx1ZSh3cml0ZXIsIGVsZW1UeXBlLCBlbGVtLCB0eXBlc3BhY2UpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJCb29sXCI6XG4gICAgICAgIHdyaXRlci53cml0ZUJvb2wodmFsdWUpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJJOFwiOlxuICAgICAgICB3cml0ZXIud3JpdGVJOCh2YWx1ZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcIlU4XCI6XG4gICAgICAgIHdyaXRlci53cml0ZVU4KHZhbHVlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiSTE2XCI6XG4gICAgICAgIHdyaXRlci53cml0ZUkxNih2YWx1ZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcIlUxNlwiOlxuICAgICAgICB3cml0ZXIud3JpdGVVMTYodmFsdWUpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJJMzJcIjpcbiAgICAgICAgd3JpdGVyLndyaXRlSTMyKHZhbHVlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiVTMyXCI6XG4gICAgICAgIHdyaXRlci53cml0ZVUzMih2YWx1ZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcIkk2NFwiOlxuICAgICAgICB3cml0ZXIud3JpdGVJNjQodmFsdWUpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJVNjRcIjpcbiAgICAgICAgd3JpdGVyLndyaXRlVTY0KHZhbHVlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiSTEyOFwiOlxuICAgICAgICB3cml0ZXIud3JpdGVJMTI4KHZhbHVlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiVTEyOFwiOlxuICAgICAgICB3cml0ZXIud3JpdGVVMTI4KHZhbHVlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiSTI1NlwiOlxuICAgICAgICB3cml0ZXIud3JpdGVJMjU2KHZhbHVlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiVTI1NlwiOlxuICAgICAgICB3cml0ZXIud3JpdGVVMjU2KHZhbHVlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiRjMyXCI6XG4gICAgICAgIHdyaXRlci53cml0ZUYzMih2YWx1ZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcIkY2NFwiOlxuICAgICAgICB3cml0ZXIud3JpdGVGNjQodmFsdWUpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJTdHJpbmdcIjpcbiAgICAgICAgd3JpdGVyLndyaXRlU3RyaW5nKHZhbHVlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9LFxuICBkZXNlcmlhbGl6ZVZhbHVlOiBmdW5jdGlvbihyZWFkZXIsIHR5LCB0eXBlc3BhY2UpIHtcbiAgICBpZiAodHkudGFnID09PSBcIlJlZlwiKSB7XG4gICAgICBpZiAoIXR5cGVzcGFjZSlcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiY2Fubm90IGRlc2VyaWFsaXplIHJlZnMgd2l0aG91dCBhIHR5cGVzcGFjZVwiKTtcbiAgICAgIHdoaWxlICh0eS50YWcgPT09IFwiUmVmXCIpIHR5ID0gdHlwZXNwYWNlLnR5cGVzW3R5LnZhbHVlXTtcbiAgICB9XG4gICAgc3dpdGNoICh0eS50YWcpIHtcbiAgICAgIGNhc2UgXCJQcm9kdWN0XCI6XG4gICAgICAgIHJldHVybiBQcm9kdWN0VHlwZS5kZXNlcmlhbGl6ZVZhbHVlKHJlYWRlciwgdHkudmFsdWUsIHR5cGVzcGFjZSk7XG4gICAgICBjYXNlIFwiU3VtXCI6XG4gICAgICAgIHJldHVybiBTdW1UeXBlLmRlc2VyaWFsaXplVmFsdWUocmVhZGVyLCB0eS52YWx1ZSwgdHlwZXNwYWNlKTtcbiAgICAgIGNhc2UgXCJBcnJheVwiOlxuICAgICAgICBpZiAodHkudmFsdWUudGFnID09PSBcIlU4XCIpIHtcbiAgICAgICAgICByZXR1cm4gcmVhZGVyLnJlYWRVSW50OEFycmF5KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc3QgZWxlbVR5cGUgPSB0eS52YWx1ZTtcbiAgICAgICAgICBjb25zdCBsZW5ndGggPSByZWFkZXIucmVhZFUzMigpO1xuICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IFtdO1xuICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKFxuICAgICAgICAgICAgICBBbGdlYnJhaWNUeXBlLmRlc2VyaWFsaXplVmFsdWUocmVhZGVyLCBlbGVtVHlwZSwgdHlwZXNwYWNlKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfVxuICAgICAgY2FzZSBcIkJvb2xcIjpcbiAgICAgICAgcmV0dXJuIHJlYWRlci5yZWFkQm9vbCgpO1xuICAgICAgY2FzZSBcIkk4XCI6XG4gICAgICAgIHJldHVybiByZWFkZXIucmVhZEk4KCk7XG4gICAgICBjYXNlIFwiVThcIjpcbiAgICAgICAgcmV0dXJuIHJlYWRlci5yZWFkVTgoKTtcbiAgICAgIGNhc2UgXCJJMTZcIjpcbiAgICAgICAgcmV0dXJuIHJlYWRlci5yZWFkSTE2KCk7XG4gICAgICBjYXNlIFwiVTE2XCI6XG4gICAgICAgIHJldHVybiByZWFkZXIucmVhZFUxNigpO1xuICAgICAgY2FzZSBcIkkzMlwiOlxuICAgICAgICByZXR1cm4gcmVhZGVyLnJlYWRJMzIoKTtcbiAgICAgIGNhc2UgXCJVMzJcIjpcbiAgICAgICAgcmV0dXJuIHJlYWRlci5yZWFkVTMyKCk7XG4gICAgICBjYXNlIFwiSTY0XCI6XG4gICAgICAgIHJldHVybiByZWFkZXIucmVhZEk2NCgpO1xuICAgICAgY2FzZSBcIlU2NFwiOlxuICAgICAgICByZXR1cm4gcmVhZGVyLnJlYWRVNjQoKTtcbiAgICAgIGNhc2UgXCJJMTI4XCI6XG4gICAgICAgIHJldHVybiByZWFkZXIucmVhZEkxMjgoKTtcbiAgICAgIGNhc2UgXCJVMTI4XCI6XG4gICAgICAgIHJldHVybiByZWFkZXIucmVhZFUxMjgoKTtcbiAgICAgIGNhc2UgXCJJMjU2XCI6XG4gICAgICAgIHJldHVybiByZWFkZXIucmVhZEkyNTYoKTtcbiAgICAgIGNhc2UgXCJVMjU2XCI6XG4gICAgICAgIHJldHVybiByZWFkZXIucmVhZFUyNTYoKTtcbiAgICAgIGNhc2UgXCJGMzJcIjpcbiAgICAgICAgcmV0dXJuIHJlYWRlci5yZWFkRjMyKCk7XG4gICAgICBjYXNlIFwiRjY0XCI6XG4gICAgICAgIHJldHVybiByZWFkZXIucmVhZEY2NCgpO1xuICAgICAgY2FzZSBcIlN0cmluZ1wiOlxuICAgICAgICByZXR1cm4gcmVhZGVyLnJlYWRTdHJpbmcoKTtcbiAgICB9XG4gIH0sXG4gIC8qKlxuICAgKiBDb252ZXJ0IGEgdmFsdWUgb2YgdGhlIGFsZ2VicmFpYyB0eXBlIGludG8gc29tZXRoaW5nIHRoYXQgY2FuIGJlIHVzZWQgYXMgYSBrZXkgaW4gYSBtYXAuXG4gICAqIFRoZXJlIGFyZSBubyBndWFyYW50ZWVzIGFib3V0IGJlaW5nIGFibGUgdG8gb3JkZXIgaXQuXG4gICAqIFRoaXMgaXMgb25seSBndWFyYW50ZWVkIHRvIGJlIGNvbXBhcmFibGUgdG8gb3RoZXIgdmFsdWVzIG9mIHRoZSBzYW1lIHR5cGUuXG4gICAqIEBwYXJhbSB2YWx1ZSBBIHZhbHVlIG9mIHRoZSBhbGdlYnJhaWMgdHlwZVxuICAgKiBAcmV0dXJucyBTb21ldGhpbmcgdGhhdCBjYW4gYmUgdXNlZCBhcyBhIGtleSBpbiBhIG1hcC5cbiAgICovXG4gIGludG9NYXBLZXk6IGZ1bmN0aW9uKHR5LCB2YWx1ZSkge1xuICAgIHN3aXRjaCAodHkudGFnKSB7XG4gICAgICBjYXNlIFwiVThcIjpcbiAgICAgIGNhc2UgXCJVMTZcIjpcbiAgICAgIGNhc2UgXCJVMzJcIjpcbiAgICAgIGNhc2UgXCJVNjRcIjpcbiAgICAgIGNhc2UgXCJVMTI4XCI6XG4gICAgICBjYXNlIFwiVTI1NlwiOlxuICAgICAgY2FzZSBcIkk4XCI6XG4gICAgICBjYXNlIFwiSTE2XCI6XG4gICAgICBjYXNlIFwiSTMyXCI6XG4gICAgICBjYXNlIFwiSTY0XCI6XG4gICAgICBjYXNlIFwiSTEyOFwiOlxuICAgICAgY2FzZSBcIkkyNTZcIjpcbiAgICAgIGNhc2UgXCJGMzJcIjpcbiAgICAgIGNhc2UgXCJGNjRcIjpcbiAgICAgIGNhc2UgXCJTdHJpbmdcIjpcbiAgICAgIGNhc2UgXCJCb29sXCI6XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgIGNhc2UgXCJQcm9kdWN0XCI6XG4gICAgICAgIHJldHVybiBQcm9kdWN0VHlwZS5pbnRvTWFwS2V5KHR5LnZhbHVlLCB2YWx1ZSk7XG4gICAgICBkZWZhdWx0OiB7XG4gICAgICAgIGNvbnN0IHdyaXRlciA9IG5ldyBCaW5hcnlXcml0ZXIoMTApO1xuICAgICAgICBBbGdlYnJhaWNUeXBlLnNlcmlhbGl6ZVZhbHVlKHdyaXRlciwgdHksIHZhbHVlKTtcbiAgICAgICAgcmV0dXJuIHdyaXRlci50b0Jhc2U2NCgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufTtcbnZhciBQcm9kdWN0VHlwZSA9IHtcbiAgc2VyaWFsaXplVmFsdWUod3JpdGVyLCB0eSwgdmFsdWUsIHR5cGVzcGFjZSkge1xuICAgIGZvciAoY29uc3QgZWxlbWVudCBvZiB0eS5lbGVtZW50cykge1xuICAgICAgQWxnZWJyYWljVHlwZS5zZXJpYWxpemVWYWx1ZShcbiAgICAgICAgd3JpdGVyLFxuICAgICAgICBlbGVtZW50LmFsZ2VicmFpY1R5cGUsXG4gICAgICAgIHZhbHVlW2VsZW1lbnQubmFtZV0sXG4gICAgICAgIHR5cGVzcGFjZVxuICAgICAgKTtcbiAgICB9XG4gIH0sXG4gIGRlc2VyaWFsaXplVmFsdWUocmVhZGVyLCB0eSwgdHlwZXNwYWNlKSB7XG4gICAgY29uc3QgcmVzdWx0ID0ge307XG4gICAgaWYgKHR5LmVsZW1lbnRzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgaWYgKHR5LmVsZW1lbnRzWzBdLm5hbWUgPT09IFwiX190aW1lX2R1cmF0aW9uX21pY3Jvc19fXCIpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBUaW1lRHVyYXRpb24ocmVhZGVyLnJlYWRJNjQoKSk7XG4gICAgICB9XG4gICAgICBpZiAodHkuZWxlbWVudHNbMF0ubmFtZSA9PT0gXCJfX3RpbWVzdGFtcF9taWNyb3Nfc2luY2VfdW5peF9lcG9jaF9fXCIpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBUaW1lc3RhbXAocmVhZGVyLnJlYWRJNjQoKSk7XG4gICAgICB9XG4gICAgICBpZiAodHkuZWxlbWVudHNbMF0ubmFtZSA9PT0gXCJfX2lkZW50aXR5X19cIikge1xuICAgICAgICByZXR1cm4gbmV3IElkZW50aXR5KHJlYWRlci5yZWFkVTI1NigpKTtcbiAgICAgIH1cbiAgICAgIGlmICh0eS5lbGVtZW50c1swXS5uYW1lID09PSBcIl9fY29ubmVjdGlvbl9pZF9fXCIpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBDb25uZWN0aW9uSWQocmVhZGVyLnJlYWRVMTI4KCkpO1xuICAgICAgfVxuICAgICAgaWYgKHR5LmVsZW1lbnRzWzBdLm5hbWUgPT09IFwiX191dWlkX19cIikge1xuICAgICAgICByZXR1cm4gbmV3IFV1aWQocmVhZGVyLnJlYWRVMTI4KCkpO1xuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKGNvbnN0IGVsZW1lbnQgb2YgdHkuZWxlbWVudHMpIHtcbiAgICAgIHJlc3VsdFtlbGVtZW50Lm5hbWVdID0gQWxnZWJyYWljVHlwZS5kZXNlcmlhbGl6ZVZhbHVlKFxuICAgICAgICByZWFkZXIsXG4gICAgICAgIGVsZW1lbnQuYWxnZWJyYWljVHlwZSxcbiAgICAgICAgdHlwZXNwYWNlXG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9LFxuICBpbnRvTWFwS2V5KHR5LCB2YWx1ZSkge1xuICAgIGlmICh0eS5lbGVtZW50cy5sZW5ndGggPT09IDEpIHtcbiAgICAgIGlmICh0eS5lbGVtZW50c1swXS5uYW1lID09PSBcIl9fdGltZV9kdXJhdGlvbl9taWNyb3NfX1wiKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZS5fX3RpbWVfZHVyYXRpb25fbWljcm9zX187XG4gICAgICB9XG4gICAgICBpZiAodHkuZWxlbWVudHNbMF0ubmFtZSA9PT0gXCJfX3RpbWVzdGFtcF9taWNyb3Nfc2luY2VfdW5peF9lcG9jaF9fXCIpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlLl9fdGltZXN0YW1wX21pY3Jvc19zaW5jZV91bml4X2Vwb2NoX187XG4gICAgICB9XG4gICAgICBpZiAodHkuZWxlbWVudHNbMF0ubmFtZSA9PT0gXCJfX2lkZW50aXR5X19cIikge1xuICAgICAgICByZXR1cm4gdmFsdWUuX19pZGVudGl0eV9fO1xuICAgICAgfVxuICAgICAgaWYgKHR5LmVsZW1lbnRzWzBdLm5hbWUgPT09IFwiX19jb25uZWN0aW9uX2lkX19cIikge1xuICAgICAgICByZXR1cm4gdmFsdWUuX19jb25uZWN0aW9uX2lkX187XG4gICAgICB9XG4gICAgICBpZiAodHkuZWxlbWVudHNbMF0ubmFtZSA9PT0gXCJfX3V1aWRfX1wiKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZS5fX3V1aWRfXztcbiAgICAgIH1cbiAgICB9XG4gICAgY29uc3Qgd3JpdGVyID0gbmV3IEJpbmFyeVdyaXRlcigxMCk7XG4gICAgQWxnZWJyYWljVHlwZS5zZXJpYWxpemVWYWx1ZSh3cml0ZXIsIEFsZ2VicmFpY1R5cGUuUHJvZHVjdCh0eSksIHZhbHVlKTtcbiAgICByZXR1cm4gd3JpdGVyLnRvQmFzZTY0KCk7XG4gIH1cbn07XG52YXIgU3VtVHlwZSA9IHtcbiAgc2VyaWFsaXplVmFsdWU6IGZ1bmN0aW9uKHdyaXRlciwgdHksIHZhbHVlLCB0eXBlc3BhY2UpIHtcbiAgICBpZiAodHkudmFyaWFudHMubGVuZ3RoID09IDIgJiYgdHkudmFyaWFudHNbMF0ubmFtZSA9PT0gXCJzb21lXCIgJiYgdHkudmFyaWFudHNbMV0ubmFtZSA9PT0gXCJub25lXCIpIHtcbiAgICAgIGlmICh2YWx1ZSAhPT0gbnVsbCAmJiB2YWx1ZSAhPT0gdm9pZCAwKSB7XG4gICAgICAgIHdyaXRlci53cml0ZUJ5dGUoMCk7XG4gICAgICAgIEFsZ2VicmFpY1R5cGUuc2VyaWFsaXplVmFsdWUoXG4gICAgICAgICAgd3JpdGVyLFxuICAgICAgICAgIHR5LnZhcmlhbnRzWzBdLmFsZ2VicmFpY1R5cGUsXG4gICAgICAgICAgdmFsdWUsXG4gICAgICAgICAgdHlwZXNwYWNlXG4gICAgICAgICk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB3cml0ZXIud3JpdGVCeXRlKDEpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodHkudmFyaWFudHMubGVuZ3RoID09IDIgJiYgdHkudmFyaWFudHNbMF0ubmFtZSA9PT0gXCJva1wiICYmIHR5LnZhcmlhbnRzWzFdLm5hbWUgPT09IFwiZXJyXCIpIHtcbiAgICAgIGxldCB2YXJpYW50TmFtZTtcbiAgICAgIGxldCBpbm5lclZhbHVlO1xuICAgICAgbGV0IGluZGV4O1xuICAgICAgaWYgKFwib2tcIiBpbiB2YWx1ZSkge1xuICAgICAgICB2YXJpYW50TmFtZSA9IFwib2tcIjtcbiAgICAgICAgaW5uZXJWYWx1ZSA9IHZhbHVlLm9rO1xuICAgICAgICBpbmRleCA9IDA7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXJpYW50TmFtZSA9IFwiZXJyXCI7XG4gICAgICAgIGlubmVyVmFsdWUgPSB2YWx1ZS5lcnI7XG4gICAgICAgIGluZGV4ID0gMTtcbiAgICAgIH1cbiAgICAgIGlmIChpbmRleCA8IDApIHtcbiAgICAgICAgdGhyb3cgYFJlc3VsdCBzZXJpYWxpemF0aW9uIGVycm9yOiB2YXJpYW50ICcke3ZhcmlhbnROYW1lfScgbm90IGZvdW5kIGluICR7SlNPTi5zdHJpbmdpZnkodHkpfWA7XG4gICAgICB9XG4gICAgICB3cml0ZXIud3JpdGVVOChpbmRleCk7XG4gICAgICBBbGdlYnJhaWNUeXBlLnNlcmlhbGl6ZVZhbHVlKFxuICAgICAgICB3cml0ZXIsXG4gICAgICAgIHR5LnZhcmlhbnRzW2luZGV4XS5hbGdlYnJhaWNUeXBlLFxuICAgICAgICBpbm5lclZhbHVlLFxuICAgICAgICB0eXBlc3BhY2VcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHZhcmlhbnQgPSB2YWx1ZVtcInRhZ1wiXTtcbiAgICAgIGNvbnN0IGluZGV4ID0gdHkudmFyaWFudHMuZmluZEluZGV4KCh2KSA9PiB2Lm5hbWUgPT09IHZhcmlhbnQpO1xuICAgICAgaWYgKGluZGV4IDwgMCkge1xuICAgICAgICB0aHJvdyBgQ2FuJ3Qgc2VyaWFsaXplIGEgc3VtIHR5cGUsIGNvdWxkbid0IGZpbmQgJHt2YWx1ZS50YWd9IHRhZyAke0pTT04uc3RyaW5naWZ5KHZhbHVlKX0gaW4gdmFyaWFudHMgJHtKU09OLnN0cmluZ2lmeSh0eSl9YDtcbiAgICAgIH1cbiAgICAgIHdyaXRlci53cml0ZVU4KGluZGV4KTtcbiAgICAgIEFsZ2VicmFpY1R5cGUuc2VyaWFsaXplVmFsdWUoXG4gICAgICAgIHdyaXRlcixcbiAgICAgICAgdHkudmFyaWFudHNbaW5kZXhdLmFsZ2VicmFpY1R5cGUsXG4gICAgICAgIHZhbHVlW1widmFsdWVcIl0sXG4gICAgICAgIHR5cGVzcGFjZVxuICAgICAgKTtcbiAgICB9XG4gIH0sXG4gIGRlc2VyaWFsaXplVmFsdWU6IGZ1bmN0aW9uKHJlYWRlciwgdHksIHR5cGVzcGFjZSkge1xuICAgIGNvbnN0IHRhZyA9IHJlYWRlci5yZWFkVTgoKTtcbiAgICBpZiAodHkudmFyaWFudHMubGVuZ3RoID09IDIgJiYgdHkudmFyaWFudHNbMF0ubmFtZSA9PT0gXCJzb21lXCIgJiYgdHkudmFyaWFudHNbMV0ubmFtZSA9PT0gXCJub25lXCIpIHtcbiAgICAgIGlmICh0YWcgPT09IDApIHtcbiAgICAgICAgcmV0dXJuIEFsZ2VicmFpY1R5cGUuZGVzZXJpYWxpemVWYWx1ZShcbiAgICAgICAgICByZWFkZXIsXG4gICAgICAgICAgdHkudmFyaWFudHNbMF0uYWxnZWJyYWljVHlwZSxcbiAgICAgICAgICB0eXBlc3BhY2VcbiAgICAgICAgKTtcbiAgICAgIH0gZWxzZSBpZiAodGFnID09PSAxKSB7XG4gICAgICAgIHJldHVybiB2b2lkIDA7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBgQ2FuJ3QgZGVzZXJpYWxpemUgYW4gb3B0aW9uIHR5cGUsIGNvdWxkbid0IGZpbmQgJHt0YWd9IHRhZ2A7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0eS52YXJpYW50cy5sZW5ndGggPT0gMiAmJiB0eS52YXJpYW50c1swXS5uYW1lID09PSBcIm9rXCIgJiYgdHkudmFyaWFudHNbMV0ubmFtZSA9PT0gXCJlcnJcIikge1xuICAgICAgaWYgKHRhZyA9PT0gMCkge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IEFsZ2VicmFpY1R5cGUuZGVzZXJpYWxpemVWYWx1ZShcbiAgICAgICAgICByZWFkZXIsXG4gICAgICAgICAgdHkudmFyaWFudHNbMF0uYWxnZWJyYWljVHlwZSxcbiAgICAgICAgICB0eXBlc3BhY2VcbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuIHsgb2s6IHZhbHVlIH07XG4gICAgICB9IGVsc2UgaWYgKHRhZyA9PT0gMSkge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IEFsZ2VicmFpY1R5cGUuZGVzZXJpYWxpemVWYWx1ZShcbiAgICAgICAgICByZWFkZXIsXG4gICAgICAgICAgdHkudmFyaWFudHNbMV0uYWxnZWJyYWljVHlwZSxcbiAgICAgICAgICB0eXBlc3BhY2VcbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuIHsgZXJyOiB2YWx1ZSB9O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgYENhbid0IGRlc2VyaWFsaXplIGEgcmVzdWx0IHR5cGUsIGNvdWxkbid0IGZpbmQgJHt0YWd9IHRhZ2A7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHZhcmlhbnQgPSB0eS52YXJpYW50c1t0YWddO1xuICAgICAgY29uc3QgdmFsdWUgPSBBbGdlYnJhaWNUeXBlLmRlc2VyaWFsaXplVmFsdWUoXG4gICAgICAgIHJlYWRlcixcbiAgICAgICAgdmFyaWFudC5hbGdlYnJhaWNUeXBlLFxuICAgICAgICB0eXBlc3BhY2VcbiAgICAgICk7XG4gICAgICByZXR1cm4geyB0YWc6IHZhcmlhbnQubmFtZSwgdmFsdWUgfTtcbiAgICB9XG4gIH1cbn07XG5cbi8vIHNyYy9saWIvb3B0aW9uLnRzXG52YXIgT3B0aW9uID0ge1xuICBnZXRBbGdlYnJhaWNUeXBlKGlubmVyVHlwZSkge1xuICAgIHJldHVybiBBbGdlYnJhaWNUeXBlLlN1bSh7XG4gICAgICB2YXJpYW50czogW1xuICAgICAgICB7IG5hbWU6IFwic29tZVwiLCBhbGdlYnJhaWNUeXBlOiBpbm5lclR5cGUgfSxcbiAgICAgICAge1xuICAgICAgICAgIG5hbWU6IFwibm9uZVwiLFxuICAgICAgICAgIGFsZ2VicmFpY1R5cGU6IEFsZ2VicmFpY1R5cGUuUHJvZHVjdCh7IGVsZW1lbnRzOiBbXSB9KVxuICAgICAgICB9XG4gICAgICBdXG4gICAgfSk7XG4gIH1cbn07XG5cbi8vIHNyYy9saWIvcmVzdWx0LnRzXG52YXIgUmVzdWx0ID0ge1xuICBnZXRBbGdlYnJhaWNUeXBlKG9rVHlwZSwgZXJyVHlwZSkge1xuICAgIHJldHVybiBBbGdlYnJhaWNUeXBlLlN1bSh7XG4gICAgICB2YXJpYW50czogW1xuICAgICAgICB7IG5hbWU6IFwib2tcIiwgYWxnZWJyYWljVHlwZTogb2tUeXBlIH0sXG4gICAgICAgIHsgbmFtZTogXCJlcnJcIiwgYWxnZWJyYWljVHlwZTogZXJyVHlwZSB9XG4gICAgICBdXG4gICAgfSk7XG4gIH1cbn07XG5cbi8vIHNyYy9saWIvc2NoZWR1bGVfYXQudHNcbnZhciBTY2hlZHVsZUF0ID0ge1xuICBpbnRlcnZhbCh2YWx1ZSkge1xuICAgIHJldHVybiBJbnRlcnZhbCh2YWx1ZSk7XG4gIH0sXG4gIHRpbWUodmFsdWUpIHtcbiAgICByZXR1cm4gVGltZSh2YWx1ZSk7XG4gIH0sXG4gIGdldEFsZ2VicmFpY1R5cGUoKSB7XG4gICAgcmV0dXJuIEFsZ2VicmFpY1R5cGUuU3VtKHtcbiAgICAgIHZhcmlhbnRzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBuYW1lOiBcIkludGVydmFsXCIsXG4gICAgICAgICAgYWxnZWJyYWljVHlwZTogVGltZUR1cmF0aW9uLmdldEFsZ2VicmFpY1R5cGUoKVxuICAgICAgICB9LFxuICAgICAgICB7IG5hbWU6IFwiVGltZVwiLCBhbGdlYnJhaWNUeXBlOiBUaW1lc3RhbXAuZ2V0QWxnZWJyYWljVHlwZSgpIH1cbiAgICAgIF1cbiAgICB9KTtcbiAgfSxcbiAgaXNTY2hlZHVsZUF0KGFsZ2VicmFpY1R5cGUpIHtcbiAgICBpZiAoYWxnZWJyYWljVHlwZS50YWcgIT09IFwiU3VtXCIpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgY29uc3QgdmFyaWFudHMgPSBhbGdlYnJhaWNUeXBlLnZhbHVlLnZhcmlhbnRzO1xuICAgIGlmICh2YXJpYW50cy5sZW5ndGggIT09IDIpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgY29uc3QgaW50ZXJ2YWxWYXJpYW50ID0gdmFyaWFudHMuZmluZCgodikgPT4gdi5uYW1lID09PSBcIkludGVydmFsXCIpO1xuICAgIGNvbnN0IHRpbWVWYXJpYW50ID0gdmFyaWFudHMuZmluZCgodikgPT4gdi5uYW1lID09PSBcIlRpbWVcIik7XG4gICAgaWYgKCFpbnRlcnZhbFZhcmlhbnQgfHwgIXRpbWVWYXJpYW50KSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiBUaW1lRHVyYXRpb24uaXNUaW1lRHVyYXRpb24oaW50ZXJ2YWxWYXJpYW50LmFsZ2VicmFpY1R5cGUpICYmIFRpbWVzdGFtcC5pc1RpbWVzdGFtcCh0aW1lVmFyaWFudC5hbGdlYnJhaWNUeXBlKTtcbiAgfVxufTtcbnZhciBJbnRlcnZhbCA9IChtaWNyb3MpID0+ICh7XG4gIHRhZzogXCJJbnRlcnZhbFwiLFxuICB2YWx1ZTogbmV3IFRpbWVEdXJhdGlvbihtaWNyb3MpXG59KTtcbnZhciBUaW1lID0gKG1pY3Jvc1NpbmNlVW5peEVwb2NoKSA9PiAoe1xuICB0YWc6IFwiVGltZVwiLFxuICB2YWx1ZTogbmV3IFRpbWVzdGFtcChtaWNyb3NTaW5jZVVuaXhFcG9jaClcbn0pO1xudmFyIHNjaGVkdWxlX2F0X2RlZmF1bHQgPSBTY2hlZHVsZUF0O1xuXG4vLyBzcmMvbGliL3R5cGVfdXRpbC50c1xuZnVuY3Rpb24gc2V0KHgsIHQyKSB7XG4gIHJldHVybiB7IC4uLngsIC4uLnQyIH07XG59XG5cbi8vIHNyYy9saWIvdHlwZV9idWlsZGVycy50c1xudmFyIFR5cGVCdWlsZGVyID0gY2xhc3Mge1xuICAvKipcbiAgICogVGhlIFR5cGVTY3JpcHQgcGhhbnRvbSB0eXBlLiBUaGlzIGlzIG5vdCBzdG9yZWQgYXQgcnVudGltZSxcbiAgICogYnV0IGlzIHZpc2libGUgdG8gdGhlIGNvbXBpbGVyXG4gICAqL1xuICB0eXBlO1xuICAvKipcbiAgICogVGhlIFNwYWNldGltZURCIGFsZ2VicmFpYyB0eXBlIChydW7igJF0aW1lIHZhbHVlKS4gSW4gYWRkaXRpb24gdG8gc3RvcmluZ1xuICAgKiB0aGUgcnVudGltZSByZXByZXNlbnRhdGlvbiBvZiB0aGUgYEFsZ2VicmFpY1R5cGVgLCBpdCBhbHNvIGNhcHR1cmVzXG4gICAqIHRoZSBUeXBlU2NyaXB0IHR5cGUgaW5mb3JtYXRpb24gb2YgdGhlIGBBbGdlYnJhaWNUeXBlYC4gVGhhdCBpcyB0byBzYXlcbiAgICogdGhlIHZhbHVlIGlzIG5vdCBtZXJlbHkgYW4gYEFsZ2VicmFpY1R5cGVgLCBidXQgaXMgY29uc3RydWN0ZWQgdG8gYmVcbiAgICogdGhlIGNvcnJlc3BvbmRpbmcgY29uY3JldGUgYEFsZ2VicmFpY1R5cGVgIGZvciB0aGUgVHlwZVNjcmlwdCB0eXBlIGBUeXBlYC5cbiAgICpcbiAgICogZS5nLiBgc3RyaW5nYCBjb3JyZXNwb25kcyB0byBgQWxnZWJyYWljVHlwZS5TdHJpbmdgXG4gICAqL1xuICBhbGdlYnJhaWNUeXBlO1xuICBjb25zdHJ1Y3RvcihhbGdlYnJhaWNUeXBlKSB7XG4gICAgdGhpcy5hbGdlYnJhaWNUeXBlID0gYWxnZWJyYWljVHlwZTtcbiAgfVxuICBvcHRpb25hbCgpIHtcbiAgICByZXR1cm4gbmV3IE9wdGlvbkJ1aWxkZXIodGhpcyk7XG4gIH1cbiAgc2VyaWFsaXplKHdyaXRlciwgdmFsdWUpIHtcbiAgICBBbGdlYnJhaWNUeXBlLnNlcmlhbGl6ZVZhbHVlKHdyaXRlciwgdGhpcy5hbGdlYnJhaWNUeXBlLCB2YWx1ZSk7XG4gIH1cbiAgZGVzZXJpYWxpemUocmVhZGVyKSB7XG4gICAgcmV0dXJuIEFsZ2VicmFpY1R5cGUuZGVzZXJpYWxpemVWYWx1ZShyZWFkZXIsIHRoaXMuYWxnZWJyYWljVHlwZSk7XG4gIH1cbn07XG52YXIgVThCdWlsZGVyID0gY2xhc3MgZXh0ZW5kcyBUeXBlQnVpbGRlciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKEFsZ2VicmFpY1R5cGUuVTgpO1xuICB9XG4gIGluZGV4KGFsZ29yaXRobSA9IFwiYnRyZWVcIikge1xuICAgIHJldHVybiBuZXcgVThDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcyxcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgaW5kZXhUeXBlOiBhbGdvcml0aG0gfSlcbiAgICApO1xuICB9XG4gIHVuaXF1ZSgpIHtcbiAgICByZXR1cm4gbmV3IFU4Q29sdW1uQnVpbGRlcih0aGlzLCBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IGlzVW5pcXVlOiB0cnVlIH0pKTtcbiAgfVxuICBwcmltYXJ5S2V5KCkge1xuICAgIHJldHVybiBuZXcgVThDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcyxcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgaXNQcmltYXJ5S2V5OiB0cnVlIH0pXG4gICAgKTtcbiAgfVxuICBhdXRvSW5jKCkge1xuICAgIHJldHVybiBuZXcgVThDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcyxcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgaXNBdXRvSW5jcmVtZW50OiB0cnVlIH0pXG4gICAgKTtcbiAgfVxuICBkZWZhdWx0KHZhbHVlKSB7XG4gICAgcmV0dXJuIG5ldyBVOENvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLFxuICAgICAgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBkZWZhdWx0VmFsdWU6IHZhbHVlIH0pXG4gICAgKTtcbiAgfVxuICBuYW1lKG5hbWUpIHtcbiAgICByZXR1cm4gbmV3IFU4Q29sdW1uQnVpbGRlcih0aGlzLCBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IG5hbWUgfSkpO1xuICB9XG59O1xudmFyIFUxNkJ1aWxkZXIgPSBjbGFzcyBleHRlbmRzIFR5cGVCdWlsZGVyIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoQWxnZWJyYWljVHlwZS5VMTYpO1xuICB9XG4gIGluZGV4KGFsZ29yaXRobSA9IFwiYnRyZWVcIikge1xuICAgIHJldHVybiBuZXcgVTE2Q29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMsXG4gICAgICBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IGluZGV4VHlwZTogYWxnb3JpdGhtIH0pXG4gICAgKTtcbiAgfVxuICB1bmlxdWUoKSB7XG4gICAgcmV0dXJuIG5ldyBVMTZDb2x1bW5CdWlsZGVyKHRoaXMsIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgaXNVbmlxdWU6IHRydWUgfSkpO1xuICB9XG4gIHByaW1hcnlLZXkoKSB7XG4gICAgcmV0dXJuIG5ldyBVMTZDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcyxcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgaXNQcmltYXJ5S2V5OiB0cnVlIH0pXG4gICAgKTtcbiAgfVxuICBhdXRvSW5jKCkge1xuICAgIHJldHVybiBuZXcgVTE2Q29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMsXG4gICAgICBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IGlzQXV0b0luY3JlbWVudDogdHJ1ZSB9KVxuICAgICk7XG4gIH1cbiAgZGVmYXVsdCh2YWx1ZSkge1xuICAgIHJldHVybiBuZXcgVTE2Q29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMsXG4gICAgICBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IGRlZmF1bHRWYWx1ZTogdmFsdWUgfSlcbiAgICApO1xuICB9XG4gIG5hbWUobmFtZSkge1xuICAgIHJldHVybiBuZXcgVTE2Q29sdW1uQnVpbGRlcih0aGlzLCBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IG5hbWUgfSkpO1xuICB9XG59O1xudmFyIFUzMkJ1aWxkZXIgPSBjbGFzcyBleHRlbmRzIFR5cGVCdWlsZGVyIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoQWxnZWJyYWljVHlwZS5VMzIpO1xuICB9XG4gIGluZGV4KGFsZ29yaXRobSA9IFwiYnRyZWVcIikge1xuICAgIHJldHVybiBuZXcgVTMyQ29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMsXG4gICAgICBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IGluZGV4VHlwZTogYWxnb3JpdGhtIH0pXG4gICAgKTtcbiAgfVxuICB1bmlxdWUoKSB7XG4gICAgcmV0dXJuIG5ldyBVMzJDb2x1bW5CdWlsZGVyKHRoaXMsIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgaXNVbmlxdWU6IHRydWUgfSkpO1xuICB9XG4gIHByaW1hcnlLZXkoKSB7XG4gICAgcmV0dXJuIG5ldyBVMzJDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcyxcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgaXNQcmltYXJ5S2V5OiB0cnVlIH0pXG4gICAgKTtcbiAgfVxuICBhdXRvSW5jKCkge1xuICAgIHJldHVybiBuZXcgVTMyQ29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMsXG4gICAgICBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IGlzQXV0b0luY3JlbWVudDogdHJ1ZSB9KVxuICAgICk7XG4gIH1cbiAgZGVmYXVsdCh2YWx1ZSkge1xuICAgIHJldHVybiBuZXcgVTMyQ29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMsXG4gICAgICBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IGRlZmF1bHRWYWx1ZTogdmFsdWUgfSlcbiAgICApO1xuICB9XG4gIG5hbWUobmFtZSkge1xuICAgIHJldHVybiBuZXcgVTMyQ29sdW1uQnVpbGRlcih0aGlzLCBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IG5hbWUgfSkpO1xuICB9XG59O1xudmFyIFU2NEJ1aWxkZXIgPSBjbGFzcyBleHRlbmRzIFR5cGVCdWlsZGVyIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoQWxnZWJyYWljVHlwZS5VNjQpO1xuICB9XG4gIGluZGV4KGFsZ29yaXRobSA9IFwiYnRyZWVcIikge1xuICAgIHJldHVybiBuZXcgVTY0Q29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMsXG4gICAgICBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IGluZGV4VHlwZTogYWxnb3JpdGhtIH0pXG4gICAgKTtcbiAgfVxuICB1bmlxdWUoKSB7XG4gICAgcmV0dXJuIG5ldyBVNjRDb2x1bW5CdWlsZGVyKHRoaXMsIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgaXNVbmlxdWU6IHRydWUgfSkpO1xuICB9XG4gIHByaW1hcnlLZXkoKSB7XG4gICAgcmV0dXJuIG5ldyBVNjRDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcyxcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgaXNQcmltYXJ5S2V5OiB0cnVlIH0pXG4gICAgKTtcbiAgfVxuICBhdXRvSW5jKCkge1xuICAgIHJldHVybiBuZXcgVTY0Q29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMsXG4gICAgICBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IGlzQXV0b0luY3JlbWVudDogdHJ1ZSB9KVxuICAgICk7XG4gIH1cbiAgZGVmYXVsdCh2YWx1ZSkge1xuICAgIHJldHVybiBuZXcgVTY0Q29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMsXG4gICAgICBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IGRlZmF1bHRWYWx1ZTogdmFsdWUgfSlcbiAgICApO1xuICB9XG4gIG5hbWUobmFtZSkge1xuICAgIHJldHVybiBuZXcgVTY0Q29sdW1uQnVpbGRlcih0aGlzLCBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IG5hbWUgfSkpO1xuICB9XG59O1xudmFyIFUxMjhCdWlsZGVyID0gY2xhc3MgZXh0ZW5kcyBUeXBlQnVpbGRlciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKEFsZ2VicmFpY1R5cGUuVTEyOCk7XG4gIH1cbiAgaW5kZXgoYWxnb3JpdGhtID0gXCJidHJlZVwiKSB7XG4gICAgcmV0dXJuIG5ldyBVMTI4Q29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMsXG4gICAgICBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IGluZGV4VHlwZTogYWxnb3JpdGhtIH0pXG4gICAgKTtcbiAgfVxuICB1bmlxdWUoKSB7XG4gICAgcmV0dXJuIG5ldyBVMTI4Q29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMsXG4gICAgICBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IGlzVW5pcXVlOiB0cnVlIH0pXG4gICAgKTtcbiAgfVxuICBwcmltYXJ5S2V5KCkge1xuICAgIHJldHVybiBuZXcgVTEyOENvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLFxuICAgICAgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBpc1ByaW1hcnlLZXk6IHRydWUgfSlcbiAgICApO1xuICB9XG4gIGF1dG9JbmMoKSB7XG4gICAgcmV0dXJuIG5ldyBVMTI4Q29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMsXG4gICAgICBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IGlzQXV0b0luY3JlbWVudDogdHJ1ZSB9KVxuICAgICk7XG4gIH1cbiAgZGVmYXVsdCh2YWx1ZSkge1xuICAgIHJldHVybiBuZXcgVTEyOENvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLFxuICAgICAgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBkZWZhdWx0VmFsdWU6IHZhbHVlIH0pXG4gICAgKTtcbiAgfVxuICBuYW1lKG5hbWUpIHtcbiAgICByZXR1cm4gbmV3IFUxMjhDb2x1bW5CdWlsZGVyKHRoaXMsIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgbmFtZSB9KSk7XG4gIH1cbn07XG52YXIgVTI1NkJ1aWxkZXIgPSBjbGFzcyBleHRlbmRzIFR5cGVCdWlsZGVyIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoQWxnZWJyYWljVHlwZS5VMjU2KTtcbiAgfVxuICBpbmRleChhbGdvcml0aG0gPSBcImJ0cmVlXCIpIHtcbiAgICByZXR1cm4gbmV3IFUyNTZDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcyxcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgaW5kZXhUeXBlOiBhbGdvcml0aG0gfSlcbiAgICApO1xuICB9XG4gIHVuaXF1ZSgpIHtcbiAgICByZXR1cm4gbmV3IFUyNTZDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcyxcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgaXNVbmlxdWU6IHRydWUgfSlcbiAgICApO1xuICB9XG4gIHByaW1hcnlLZXkoKSB7XG4gICAgcmV0dXJuIG5ldyBVMjU2Q29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMsXG4gICAgICBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IGlzUHJpbWFyeUtleTogdHJ1ZSB9KVxuICAgICk7XG4gIH1cbiAgYXV0b0luYygpIHtcbiAgICByZXR1cm4gbmV3IFUyNTZDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcyxcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgaXNBdXRvSW5jcmVtZW50OiB0cnVlIH0pXG4gICAgKTtcbiAgfVxuICBkZWZhdWx0KHZhbHVlKSB7XG4gICAgcmV0dXJuIG5ldyBVMjU2Q29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMsXG4gICAgICBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IGRlZmF1bHRWYWx1ZTogdmFsdWUgfSlcbiAgICApO1xuICB9XG4gIG5hbWUobmFtZSkge1xuICAgIHJldHVybiBuZXcgVTI1NkNvbHVtbkJ1aWxkZXIodGhpcywgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBuYW1lIH0pKTtcbiAgfVxufTtcbnZhciBJOEJ1aWxkZXIgPSBjbGFzcyBleHRlbmRzIFR5cGVCdWlsZGVyIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoQWxnZWJyYWljVHlwZS5JOCk7XG4gIH1cbiAgaW5kZXgoYWxnb3JpdGhtID0gXCJidHJlZVwiKSB7XG4gICAgcmV0dXJuIG5ldyBJOENvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLFxuICAgICAgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBpbmRleFR5cGU6IGFsZ29yaXRobSB9KVxuICAgICk7XG4gIH1cbiAgdW5pcXVlKCkge1xuICAgIHJldHVybiBuZXcgSThDb2x1bW5CdWlsZGVyKHRoaXMsIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgaXNVbmlxdWU6IHRydWUgfSkpO1xuICB9XG4gIHByaW1hcnlLZXkoKSB7XG4gICAgcmV0dXJuIG5ldyBJOENvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLFxuICAgICAgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBpc1ByaW1hcnlLZXk6IHRydWUgfSlcbiAgICApO1xuICB9XG4gIGF1dG9JbmMoKSB7XG4gICAgcmV0dXJuIG5ldyBJOENvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLFxuICAgICAgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBpc0F1dG9JbmNyZW1lbnQ6IHRydWUgfSlcbiAgICApO1xuICB9XG4gIGRlZmF1bHQodmFsdWUpIHtcbiAgICByZXR1cm4gbmV3IEk4Q29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMsXG4gICAgICBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IGRlZmF1bHRWYWx1ZTogdmFsdWUgfSlcbiAgICApO1xuICB9XG4gIG5hbWUobmFtZSkge1xuICAgIHJldHVybiBuZXcgSThDb2x1bW5CdWlsZGVyKHRoaXMsIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgbmFtZSB9KSk7XG4gIH1cbn07XG52YXIgSTE2QnVpbGRlciA9IGNsYXNzIGV4dGVuZHMgVHlwZUJ1aWxkZXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcihBbGdlYnJhaWNUeXBlLkkxNik7XG4gIH1cbiAgaW5kZXgoYWxnb3JpdGhtID0gXCJidHJlZVwiKSB7XG4gICAgcmV0dXJuIG5ldyBJMTZDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcyxcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgaW5kZXhUeXBlOiBhbGdvcml0aG0gfSlcbiAgICApO1xuICB9XG4gIHVuaXF1ZSgpIHtcbiAgICByZXR1cm4gbmV3IEkxNkNvbHVtbkJ1aWxkZXIodGhpcywgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBpc1VuaXF1ZTogdHJ1ZSB9KSk7XG4gIH1cbiAgcHJpbWFyeUtleSgpIHtcbiAgICByZXR1cm4gbmV3IEkxNkNvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLFxuICAgICAgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBpc1ByaW1hcnlLZXk6IHRydWUgfSlcbiAgICApO1xuICB9XG4gIGF1dG9JbmMoKSB7XG4gICAgcmV0dXJuIG5ldyBJMTZDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcyxcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgaXNBdXRvSW5jcmVtZW50OiB0cnVlIH0pXG4gICAgKTtcbiAgfVxuICBkZWZhdWx0KHZhbHVlKSB7XG4gICAgcmV0dXJuIG5ldyBJMTZDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcyxcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgZGVmYXVsdFZhbHVlOiB2YWx1ZSB9KVxuICAgICk7XG4gIH1cbiAgbmFtZShuYW1lKSB7XG4gICAgcmV0dXJuIG5ldyBJMTZDb2x1bW5CdWlsZGVyKHRoaXMsIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgbmFtZSB9KSk7XG4gIH1cbn07XG52YXIgSTMyQnVpbGRlciA9IGNsYXNzIGV4dGVuZHMgVHlwZUJ1aWxkZXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcihBbGdlYnJhaWNUeXBlLkkzMik7XG4gIH1cbiAgaW5kZXgoYWxnb3JpdGhtID0gXCJidHJlZVwiKSB7XG4gICAgcmV0dXJuIG5ldyBJMzJDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcyxcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgaW5kZXhUeXBlOiBhbGdvcml0aG0gfSlcbiAgICApO1xuICB9XG4gIHVuaXF1ZSgpIHtcbiAgICByZXR1cm4gbmV3IEkzMkNvbHVtbkJ1aWxkZXIodGhpcywgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBpc1VuaXF1ZTogdHJ1ZSB9KSk7XG4gIH1cbiAgcHJpbWFyeUtleSgpIHtcbiAgICByZXR1cm4gbmV3IEkzMkNvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLFxuICAgICAgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBpc1ByaW1hcnlLZXk6IHRydWUgfSlcbiAgICApO1xuICB9XG4gIGF1dG9JbmMoKSB7XG4gICAgcmV0dXJuIG5ldyBJMzJDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcyxcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgaXNBdXRvSW5jcmVtZW50OiB0cnVlIH0pXG4gICAgKTtcbiAgfVxuICBkZWZhdWx0KHZhbHVlKSB7XG4gICAgcmV0dXJuIG5ldyBJMzJDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcyxcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgZGVmYXVsdFZhbHVlOiB2YWx1ZSB9KVxuICAgICk7XG4gIH1cbiAgbmFtZShuYW1lKSB7XG4gICAgcmV0dXJuIG5ldyBJMzJDb2x1bW5CdWlsZGVyKHRoaXMsIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgbmFtZSB9KSk7XG4gIH1cbn07XG52YXIgSTY0QnVpbGRlciA9IGNsYXNzIGV4dGVuZHMgVHlwZUJ1aWxkZXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcihBbGdlYnJhaWNUeXBlLkk2NCk7XG4gIH1cbiAgaW5kZXgoYWxnb3JpdGhtID0gXCJidHJlZVwiKSB7XG4gICAgcmV0dXJuIG5ldyBJNjRDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcyxcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgaW5kZXhUeXBlOiBhbGdvcml0aG0gfSlcbiAgICApO1xuICB9XG4gIHVuaXF1ZSgpIHtcbiAgICByZXR1cm4gbmV3IEk2NENvbHVtbkJ1aWxkZXIodGhpcywgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBpc1VuaXF1ZTogdHJ1ZSB9KSk7XG4gIH1cbiAgcHJpbWFyeUtleSgpIHtcbiAgICByZXR1cm4gbmV3IEk2NENvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLFxuICAgICAgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBpc1ByaW1hcnlLZXk6IHRydWUgfSlcbiAgICApO1xuICB9XG4gIGF1dG9JbmMoKSB7XG4gICAgcmV0dXJuIG5ldyBJNjRDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcyxcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgaXNBdXRvSW5jcmVtZW50OiB0cnVlIH0pXG4gICAgKTtcbiAgfVxuICBkZWZhdWx0KHZhbHVlKSB7XG4gICAgcmV0dXJuIG5ldyBJNjRDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcyxcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgZGVmYXVsdFZhbHVlOiB2YWx1ZSB9KVxuICAgICk7XG4gIH1cbiAgbmFtZShuYW1lKSB7XG4gICAgcmV0dXJuIG5ldyBJNjRDb2x1bW5CdWlsZGVyKHRoaXMsIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgbmFtZSB9KSk7XG4gIH1cbn07XG52YXIgSTEyOEJ1aWxkZXIgPSBjbGFzcyBleHRlbmRzIFR5cGVCdWlsZGVyIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoQWxnZWJyYWljVHlwZS5JMTI4KTtcbiAgfVxuICBpbmRleChhbGdvcml0aG0gPSBcImJ0cmVlXCIpIHtcbiAgICByZXR1cm4gbmV3IEkxMjhDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcyxcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgaW5kZXhUeXBlOiBhbGdvcml0aG0gfSlcbiAgICApO1xuICB9XG4gIHVuaXF1ZSgpIHtcbiAgICByZXR1cm4gbmV3IEkxMjhDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcyxcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgaXNVbmlxdWU6IHRydWUgfSlcbiAgICApO1xuICB9XG4gIHByaW1hcnlLZXkoKSB7XG4gICAgcmV0dXJuIG5ldyBJMTI4Q29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMsXG4gICAgICBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IGlzUHJpbWFyeUtleTogdHJ1ZSB9KVxuICAgICk7XG4gIH1cbiAgYXV0b0luYygpIHtcbiAgICByZXR1cm4gbmV3IEkxMjhDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcyxcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgaXNBdXRvSW5jcmVtZW50OiB0cnVlIH0pXG4gICAgKTtcbiAgfVxuICBkZWZhdWx0KHZhbHVlKSB7XG4gICAgcmV0dXJuIG5ldyBJMTI4Q29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMsXG4gICAgICBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IGRlZmF1bHRWYWx1ZTogdmFsdWUgfSlcbiAgICApO1xuICB9XG4gIG5hbWUobmFtZSkge1xuICAgIHJldHVybiBuZXcgSTEyOENvbHVtbkJ1aWxkZXIodGhpcywgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBuYW1lIH0pKTtcbiAgfVxufTtcbnZhciBJMjU2QnVpbGRlciA9IGNsYXNzIGV4dGVuZHMgVHlwZUJ1aWxkZXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcihBbGdlYnJhaWNUeXBlLkkyNTYpO1xuICB9XG4gIGluZGV4KGFsZ29yaXRobSA9IFwiYnRyZWVcIikge1xuICAgIHJldHVybiBuZXcgSTI1NkNvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLFxuICAgICAgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBpbmRleFR5cGU6IGFsZ29yaXRobSB9KVxuICAgICk7XG4gIH1cbiAgdW5pcXVlKCkge1xuICAgIHJldHVybiBuZXcgSTI1NkNvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLFxuICAgICAgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBpc1VuaXF1ZTogdHJ1ZSB9KVxuICAgICk7XG4gIH1cbiAgcHJpbWFyeUtleSgpIHtcbiAgICByZXR1cm4gbmV3IEkyNTZDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcyxcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgaXNQcmltYXJ5S2V5OiB0cnVlIH0pXG4gICAgKTtcbiAgfVxuICBhdXRvSW5jKCkge1xuICAgIHJldHVybiBuZXcgSTI1NkNvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLFxuICAgICAgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBpc0F1dG9JbmNyZW1lbnQ6IHRydWUgfSlcbiAgICApO1xuICB9XG4gIGRlZmF1bHQodmFsdWUpIHtcbiAgICByZXR1cm4gbmV3IEkyNTZDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcyxcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgZGVmYXVsdFZhbHVlOiB2YWx1ZSB9KVxuICAgICk7XG4gIH1cbiAgbmFtZShuYW1lKSB7XG4gICAgcmV0dXJuIG5ldyBJMjU2Q29sdW1uQnVpbGRlcih0aGlzLCBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IG5hbWUgfSkpO1xuICB9XG59O1xudmFyIEYzMkJ1aWxkZXIgPSBjbGFzcyBleHRlbmRzIFR5cGVCdWlsZGVyIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoQWxnZWJyYWljVHlwZS5GMzIpO1xuICB9XG4gIGRlZmF1bHQodmFsdWUpIHtcbiAgICByZXR1cm4gbmV3IEYzMkNvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLFxuICAgICAgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBkZWZhdWx0VmFsdWU6IHZhbHVlIH0pXG4gICAgKTtcbiAgfVxuICBuYW1lKG5hbWUpIHtcbiAgICByZXR1cm4gbmV3IEYzMkNvbHVtbkJ1aWxkZXIodGhpcywgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBuYW1lIH0pKTtcbiAgfVxufTtcbnZhciBGNjRCdWlsZGVyID0gY2xhc3MgZXh0ZW5kcyBUeXBlQnVpbGRlciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKEFsZ2VicmFpY1R5cGUuRjY0KTtcbiAgfVxuICBkZWZhdWx0KHZhbHVlKSB7XG4gICAgcmV0dXJuIG5ldyBGNjRDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcyxcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgZGVmYXVsdFZhbHVlOiB2YWx1ZSB9KVxuICAgICk7XG4gIH1cbiAgbmFtZShuYW1lKSB7XG4gICAgcmV0dXJuIG5ldyBGNjRDb2x1bW5CdWlsZGVyKHRoaXMsIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgbmFtZSB9KSk7XG4gIH1cbn07XG52YXIgQm9vbEJ1aWxkZXIgPSBjbGFzcyBleHRlbmRzIFR5cGVCdWlsZGVyIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoQWxnZWJyYWljVHlwZS5Cb29sKTtcbiAgfVxuICBpbmRleChhbGdvcml0aG0gPSBcImJ0cmVlXCIpIHtcbiAgICByZXR1cm4gbmV3IEJvb2xDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcyxcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgaW5kZXhUeXBlOiBhbGdvcml0aG0gfSlcbiAgICApO1xuICB9XG4gIHVuaXF1ZSgpIHtcbiAgICByZXR1cm4gbmV3IEJvb2xDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcyxcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgaXNVbmlxdWU6IHRydWUgfSlcbiAgICApO1xuICB9XG4gIHByaW1hcnlLZXkoKSB7XG4gICAgcmV0dXJuIG5ldyBCb29sQ29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMsXG4gICAgICBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IGlzUHJpbWFyeUtleTogdHJ1ZSB9KVxuICAgICk7XG4gIH1cbiAgZGVmYXVsdCh2YWx1ZSkge1xuICAgIHJldHVybiBuZXcgQm9vbENvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLFxuICAgICAgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBkZWZhdWx0VmFsdWU6IHZhbHVlIH0pXG4gICAgKTtcbiAgfVxuICBuYW1lKG5hbWUpIHtcbiAgICByZXR1cm4gbmV3IEJvb2xDb2x1bW5CdWlsZGVyKHRoaXMsIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgbmFtZSB9KSk7XG4gIH1cbn07XG52YXIgU3RyaW5nQnVpbGRlciA9IGNsYXNzIGV4dGVuZHMgVHlwZUJ1aWxkZXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcihBbGdlYnJhaWNUeXBlLlN0cmluZyk7XG4gIH1cbiAgaW5kZXgoYWxnb3JpdGhtID0gXCJidHJlZVwiKSB7XG4gICAgcmV0dXJuIG5ldyBTdHJpbmdDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcyxcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgaW5kZXhUeXBlOiBhbGdvcml0aG0gfSlcbiAgICApO1xuICB9XG4gIHVuaXF1ZSgpIHtcbiAgICByZXR1cm4gbmV3IFN0cmluZ0NvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLFxuICAgICAgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBpc1VuaXF1ZTogdHJ1ZSB9KVxuICAgICk7XG4gIH1cbiAgcHJpbWFyeUtleSgpIHtcbiAgICByZXR1cm4gbmV3IFN0cmluZ0NvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLFxuICAgICAgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBpc1ByaW1hcnlLZXk6IHRydWUgfSlcbiAgICApO1xuICB9XG4gIGRlZmF1bHQodmFsdWUpIHtcbiAgICByZXR1cm4gbmV3IFN0cmluZ0NvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLFxuICAgICAgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBkZWZhdWx0VmFsdWU6IHZhbHVlIH0pXG4gICAgKTtcbiAgfVxuICBuYW1lKG5hbWUpIHtcbiAgICByZXR1cm4gbmV3IFN0cmluZ0NvbHVtbkJ1aWxkZXIodGhpcywgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBuYW1lIH0pKTtcbiAgfVxufTtcbnZhciBBcnJheUJ1aWxkZXIgPSBjbGFzcyBleHRlbmRzIFR5cGVCdWlsZGVyIHtcbiAgZWxlbWVudDtcbiAgY29uc3RydWN0b3IoZWxlbWVudCkge1xuICAgIHN1cGVyKEFsZ2VicmFpY1R5cGUuQXJyYXkoZWxlbWVudC5hbGdlYnJhaWNUeXBlKSk7XG4gICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcbiAgfVxuICBkZWZhdWx0KHZhbHVlKSB7XG4gICAgcmV0dXJuIG5ldyBBcnJheUNvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLmVsZW1lbnQsXG4gICAgICBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IGRlZmF1bHRWYWx1ZTogdmFsdWUgfSlcbiAgICApO1xuICB9XG4gIG5hbWUobmFtZSkge1xuICAgIHJldHVybiBuZXcgQXJyYXlDb2x1bW5CdWlsZGVyKHRoaXMuZWxlbWVudCwgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBuYW1lIH0pKTtcbiAgfVxufTtcbnZhciBCeXRlQXJyYXlCdWlsZGVyID0gY2xhc3MgZXh0ZW5kcyBUeXBlQnVpbGRlciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKEFsZ2VicmFpY1R5cGUuQXJyYXkoQWxnZWJyYWljVHlwZS5VOCkpO1xuICB9XG4gIGRlZmF1bHQodmFsdWUpIHtcbiAgICByZXR1cm4gbmV3IEJ5dGVBcnJheUNvbHVtbkJ1aWxkZXIoXG4gICAgICBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IGRlZmF1bHRWYWx1ZTogdmFsdWUgfSlcbiAgICApO1xuICB9XG4gIG5hbWUobmFtZSkge1xuICAgIHJldHVybiBuZXcgQnl0ZUFycmF5Q29sdW1uQnVpbGRlcihzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IG5hbWUgfSkpO1xuICB9XG59O1xudmFyIE9wdGlvbkJ1aWxkZXIgPSBjbGFzcyBleHRlbmRzIFR5cGVCdWlsZGVyIHtcbiAgdmFsdWU7XG4gIGNvbnN0cnVjdG9yKHZhbHVlKSB7XG4gICAgc3VwZXIoT3B0aW9uLmdldEFsZ2VicmFpY1R5cGUodmFsdWUuYWxnZWJyYWljVHlwZSkpO1xuICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgfVxuICBkZWZhdWx0KHZhbHVlKSB7XG4gICAgcmV0dXJuIG5ldyBPcHRpb25Db2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcyxcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgZGVmYXVsdFZhbHVlOiB2YWx1ZSB9KVxuICAgICk7XG4gIH1cbiAgbmFtZShuYW1lKSB7XG4gICAgcmV0dXJuIG5ldyBPcHRpb25Db2x1bW5CdWlsZGVyKHRoaXMsIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgbmFtZSB9KSk7XG4gIH1cbn07XG52YXIgUHJvZHVjdEJ1aWxkZXIgPSBjbGFzcyBleHRlbmRzIFR5cGVCdWlsZGVyIHtcbiAgdHlwZU5hbWU7XG4gIGVsZW1lbnRzO1xuICBjb25zdHJ1Y3RvcihlbGVtZW50cywgbmFtZSkge1xuICAgIGZ1bmN0aW9uIGVsZW1lbnRzQXJyYXlGcm9tRWxlbWVudHNPYmoob2JqKSB7XG4gICAgICByZXR1cm4gT2JqZWN0LmtleXMob2JqKS5tYXAoKGtleSkgPT4gKHtcbiAgICAgICAgbmFtZToga2V5LFxuICAgICAgICAvLyBMYXppbHkgcmVzb2x2ZSB0aGUgdW5kZXJseWluZyBvYmplY3QncyBhbGdlYnJhaWNUeXBlLlxuICAgICAgICAvLyBUaGlzIHdpbGwgY2FsbCBvYmpba2V5XS5hbGdlYnJhaWNUeXBlIG9ubHkgd2hlbiBzb21lb25lXG4gICAgICAgIC8vIGFjdHVhbGx5IHJlYWRzIHRoaXMgcHJvcGVydHkuXG4gICAgICAgIGdldCBhbGdlYnJhaWNUeXBlKCkge1xuICAgICAgICAgIHJldHVybiBvYmpba2V5XS5hbGdlYnJhaWNUeXBlO1xuICAgICAgICB9XG4gICAgICB9KSk7XG4gICAgfVxuICAgIHN1cGVyKFxuICAgICAgQWxnZWJyYWljVHlwZS5Qcm9kdWN0KHtcbiAgICAgICAgZWxlbWVudHM6IGVsZW1lbnRzQXJyYXlGcm9tRWxlbWVudHNPYmooZWxlbWVudHMpXG4gICAgICB9KVxuICAgICk7XG4gICAgdGhpcy50eXBlTmFtZSA9IG5hbWU7XG4gICAgdGhpcy5lbGVtZW50cyA9IGVsZW1lbnRzO1xuICB9XG4gIGRlZmF1bHQodmFsdWUpIHtcbiAgICByZXR1cm4gbmV3IFByb2R1Y3RDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcyxcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgZGVmYXVsdFZhbHVlOiB2YWx1ZSB9KVxuICAgICk7XG4gIH1cbiAgbmFtZShuYW1lKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9kdWN0Q29sdW1uQnVpbGRlcih0aGlzLCBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IG5hbWUgfSkpO1xuICB9XG59O1xudmFyIFJlc3VsdEJ1aWxkZXIgPSBjbGFzcyBleHRlbmRzIFR5cGVCdWlsZGVyIHtcbiAgb2s7XG4gIGVycjtcbiAgY29uc3RydWN0b3Iob2ssIGVycikge1xuICAgIHN1cGVyKFJlc3VsdC5nZXRBbGdlYnJhaWNUeXBlKG9rLmFsZ2VicmFpY1R5cGUsIGVyci5hbGdlYnJhaWNUeXBlKSk7XG4gICAgdGhpcy5vayA9IG9rO1xuICAgIHRoaXMuZXJyID0gZXJyO1xuICB9XG4gIGRlZmF1bHQodmFsdWUpIHtcbiAgICByZXR1cm4gbmV3IFJlc3VsdENvbHVtbkJ1aWxkZXIodGhpcywgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBkZWZhdWx0VmFsdWU6IHZhbHVlIH0pKTtcbiAgfVxufTtcbnZhciBVbml0QnVpbGRlciA9IGNsYXNzIGV4dGVuZHMgVHlwZUJ1aWxkZXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcih7IHRhZzogXCJQcm9kdWN0XCIsIHZhbHVlOiB7IGVsZW1lbnRzOiBbXSB9IH0pO1xuICB9XG59O1xudmFyIFJvd0J1aWxkZXIgPSBjbGFzcyBleHRlbmRzIFR5cGVCdWlsZGVyIHtcbiAgcm93O1xuICB0eXBlTmFtZTtcbiAgY29uc3RydWN0b3Iocm93LCBuYW1lKSB7XG4gICAgY29uc3QgbWFwcGVkUm93ID0gT2JqZWN0LmZyb21FbnRyaWVzKFxuICAgICAgT2JqZWN0LmVudHJpZXMocm93KS5tYXAoKFtjb2xOYW1lLCBidWlsZGVyXSkgPT4gW1xuICAgICAgICBjb2xOYW1lLFxuICAgICAgICBidWlsZGVyIGluc3RhbmNlb2YgQ29sdW1uQnVpbGRlciA/IGJ1aWxkZXIgOiBuZXcgQ29sdW1uQnVpbGRlcihidWlsZGVyLCB7fSlcbiAgICAgIF0pXG4gICAgKTtcbiAgICBjb25zdCBlbGVtZW50cyA9IE9iamVjdC5rZXlzKG1hcHBlZFJvdykubWFwKChuYW1lMikgPT4gKHtcbiAgICAgIG5hbWU6IG5hbWUyLFxuICAgICAgZ2V0IGFsZ2VicmFpY1R5cGUoKSB7XG4gICAgICAgIHJldHVybiBtYXBwZWRSb3dbbmFtZTJdLnR5cGVCdWlsZGVyLmFsZ2VicmFpY1R5cGU7XG4gICAgICB9XG4gICAgfSkpO1xuICAgIHN1cGVyKEFsZ2VicmFpY1R5cGUuUHJvZHVjdCh7IGVsZW1lbnRzIH0pKTtcbiAgICB0aGlzLnJvdyA9IG1hcHBlZFJvdztcbiAgICB0aGlzLnR5cGVOYW1lID0gbmFtZTtcbiAgfVxufTtcbnZhciBTdW1CdWlsZGVySW1wbCA9IGNsYXNzIGV4dGVuZHMgVHlwZUJ1aWxkZXIge1xuICB2YXJpYW50cztcbiAgdHlwZU5hbWU7XG4gIGNvbnN0cnVjdG9yKHZhcmlhbnRzLCBuYW1lKSB7XG4gICAgZnVuY3Rpb24gdmFyaWFudHNBcnJheUZyb21WYXJpYW50c09iaih2YXJpYW50czIpIHtcbiAgICAgIHJldHVybiBPYmplY3Qua2V5cyh2YXJpYW50czIpLm1hcCgoa2V5KSA9PiAoe1xuICAgICAgICBuYW1lOiBrZXksXG4gICAgICAgIC8vIExhemlseSByZXNvbHZlIHRoZSB1bmRlcmx5aW5nIG9iamVjdCdzIGFsZ2VicmFpY1R5cGUuXG4gICAgICAgIC8vIFRoaXMgd2lsbCBjYWxsIG9ialtrZXldLmFsZ2VicmFpY1R5cGUgb25seSB3aGVuIHNvbWVvbmVcbiAgICAgICAgLy8gYWN0dWFsbHkgcmVhZHMgdGhpcyBwcm9wZXJ0eS5cbiAgICAgICAgZ2V0IGFsZ2VicmFpY1R5cGUoKSB7XG4gICAgICAgICAgcmV0dXJuIHZhcmlhbnRzMltrZXldLmFsZ2VicmFpY1R5cGU7XG4gICAgICAgIH1cbiAgICAgIH0pKTtcbiAgICB9XG4gICAgc3VwZXIoXG4gICAgICBBbGdlYnJhaWNUeXBlLlN1bSh7XG4gICAgICAgIHZhcmlhbnRzOiB2YXJpYW50c0FycmF5RnJvbVZhcmlhbnRzT2JqKHZhcmlhbnRzKVxuICAgICAgfSlcbiAgICApO1xuICAgIHRoaXMudmFyaWFudHMgPSB2YXJpYW50cztcbiAgICB0aGlzLnR5cGVOYW1lID0gbmFtZTtcbiAgICBmb3IgKGNvbnN0IGtleSBvZiBPYmplY3Qua2V5cyh2YXJpYW50cykpIHtcbiAgICAgIGNvbnN0IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHZhcmlhbnRzLCBrZXkpO1xuICAgICAgY29uc3QgaXNBY2Nlc3NvciA9ICEhZGVzYyAmJiAodHlwZW9mIGRlc2MuZ2V0ID09PSBcImZ1bmN0aW9uXCIgfHwgdHlwZW9mIGRlc2Muc2V0ID09PSBcImZ1bmN0aW9uXCIpO1xuICAgICAgbGV0IGlzVW5pdDIgPSBmYWxzZTtcbiAgICAgIGlmICghaXNBY2Nlc3Nvcikge1xuICAgICAgICBjb25zdCB2YXJpYW50ID0gdmFyaWFudHNba2V5XTtcbiAgICAgICAgaXNVbml0MiA9IHZhcmlhbnQgaW5zdGFuY2VvZiBVbml0QnVpbGRlcjtcbiAgICAgIH1cbiAgICAgIGlmIChpc1VuaXQyKSB7XG4gICAgICAgIGNvbnN0IGNvbnN0YW50ID0gdGhpcy5jcmVhdGUoa2V5KTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsIGtleSwge1xuICAgICAgICAgIHZhbHVlOiBjb25zdGFudCxcbiAgICAgICAgICB3cml0YWJsZTogZmFsc2UsXG4gICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICBjb25maWd1cmFibGU6IGZhbHNlXG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgZm4gPSAoKHZhbHVlKSA9PiB0aGlzLmNyZWF0ZShrZXksIHZhbHVlKSk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCBrZXksIHtcbiAgICAgICAgICB2YWx1ZTogZm4sXG4gICAgICAgICAgd3JpdGFibGU6IGZhbHNlLFxuICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgY29uZmlndXJhYmxlOiBmYWxzZVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgY3JlYXRlKHRhZywgdmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUgPT09IHZvaWQgMCA/IHsgdGFnIH0gOiB7IHRhZywgdmFsdWUgfTtcbiAgfVxuICBkZWZhdWx0KHZhbHVlKSB7XG4gICAgcmV0dXJuIG5ldyBTdW1Db2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcyxcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgZGVmYXVsdFZhbHVlOiB2YWx1ZSB9KVxuICAgICk7XG4gIH1cbiAgbmFtZShuYW1lKSB7XG4gICAgcmV0dXJuIG5ldyBTdW1Db2x1bW5CdWlsZGVyKHRoaXMsIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgbmFtZSB9KSk7XG4gIH1cbn07XG52YXIgU3VtQnVpbGRlciA9IFN1bUJ1aWxkZXJJbXBsO1xudmFyIFNpbXBsZVN1bUJ1aWxkZXJJbXBsID0gY2xhc3MgZXh0ZW5kcyBTdW1CdWlsZGVySW1wbCB7XG4gIGluZGV4KGFsZ29yaXRobSA9IFwiYnRyZWVcIikge1xuICAgIHJldHVybiBuZXcgU2ltcGxlU3VtQ29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMsXG4gICAgICBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IGluZGV4VHlwZTogYWxnb3JpdGhtIH0pXG4gICAgKTtcbiAgfVxuICBwcmltYXJ5S2V5KCkge1xuICAgIHJldHVybiBuZXcgU2ltcGxlU3VtQ29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMsXG4gICAgICBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IGlzUHJpbWFyeUtleTogdHJ1ZSB9KVxuICAgICk7XG4gIH1cbn07XG52YXIgU2ltcGxlU3VtQnVpbGRlciA9IFNpbXBsZVN1bUJ1aWxkZXJJbXBsO1xudmFyIFNjaGVkdWxlQXRCdWlsZGVyID0gY2xhc3MgZXh0ZW5kcyBUeXBlQnVpbGRlciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKHNjaGVkdWxlX2F0X2RlZmF1bHQuZ2V0QWxnZWJyYWljVHlwZSgpKTtcbiAgfVxuICBkZWZhdWx0KHZhbHVlKSB7XG4gICAgcmV0dXJuIG5ldyBTY2hlZHVsZUF0Q29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMsXG4gICAgICBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IGRlZmF1bHRWYWx1ZTogdmFsdWUgfSlcbiAgICApO1xuICB9XG4gIG5hbWUobmFtZSkge1xuICAgIHJldHVybiBuZXcgU2NoZWR1bGVBdENvbHVtbkJ1aWxkZXIodGhpcywgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBuYW1lIH0pKTtcbiAgfVxufTtcbnZhciBJZGVudGl0eUJ1aWxkZXIgPSBjbGFzcyBleHRlbmRzIFR5cGVCdWlsZGVyIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoSWRlbnRpdHkuZ2V0QWxnZWJyYWljVHlwZSgpKTtcbiAgfVxuICBpbmRleChhbGdvcml0aG0gPSBcImJ0cmVlXCIpIHtcbiAgICByZXR1cm4gbmV3IElkZW50aXR5Q29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMsXG4gICAgICBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IGluZGV4VHlwZTogYWxnb3JpdGhtIH0pXG4gICAgKTtcbiAgfVxuICB1bmlxdWUoKSB7XG4gICAgcmV0dXJuIG5ldyBJZGVudGl0eUNvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLFxuICAgICAgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBpc1VuaXF1ZTogdHJ1ZSB9KVxuICAgICk7XG4gIH1cbiAgcHJpbWFyeUtleSgpIHtcbiAgICByZXR1cm4gbmV3IElkZW50aXR5Q29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMsXG4gICAgICBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IGlzUHJpbWFyeUtleTogdHJ1ZSB9KVxuICAgICk7XG4gIH1cbiAgYXV0b0luYygpIHtcbiAgICByZXR1cm4gbmV3IElkZW50aXR5Q29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMsXG4gICAgICBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IGlzQXV0b0luY3JlbWVudDogdHJ1ZSB9KVxuICAgICk7XG4gIH1cbiAgZGVmYXVsdCh2YWx1ZSkge1xuICAgIHJldHVybiBuZXcgSWRlbnRpdHlDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcyxcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgZGVmYXVsdFZhbHVlOiB2YWx1ZSB9KVxuICAgICk7XG4gIH1cbiAgbmFtZShuYW1lKSB7XG4gICAgcmV0dXJuIG5ldyBJZGVudGl0eUNvbHVtbkJ1aWxkZXIodGhpcywgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBuYW1lIH0pKTtcbiAgfVxufTtcbnZhciBDb25uZWN0aW9uSWRCdWlsZGVyID0gY2xhc3MgZXh0ZW5kcyBUeXBlQnVpbGRlciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKENvbm5lY3Rpb25JZC5nZXRBbGdlYnJhaWNUeXBlKCkpO1xuICB9XG4gIGluZGV4KGFsZ29yaXRobSA9IFwiYnRyZWVcIikge1xuICAgIHJldHVybiBuZXcgQ29ubmVjdGlvbklkQ29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMsXG4gICAgICBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IGluZGV4VHlwZTogYWxnb3JpdGhtIH0pXG4gICAgKTtcbiAgfVxuICB1bmlxdWUoKSB7XG4gICAgcmV0dXJuIG5ldyBDb25uZWN0aW9uSWRDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcyxcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgaXNVbmlxdWU6IHRydWUgfSlcbiAgICApO1xuICB9XG4gIHByaW1hcnlLZXkoKSB7XG4gICAgcmV0dXJuIG5ldyBDb25uZWN0aW9uSWRDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcyxcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgaXNQcmltYXJ5S2V5OiB0cnVlIH0pXG4gICAgKTtcbiAgfVxuICBhdXRvSW5jKCkge1xuICAgIHJldHVybiBuZXcgQ29ubmVjdGlvbklkQ29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMsXG4gICAgICBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IGlzQXV0b0luY3JlbWVudDogdHJ1ZSB9KVxuICAgICk7XG4gIH1cbiAgZGVmYXVsdCh2YWx1ZSkge1xuICAgIHJldHVybiBuZXcgQ29ubmVjdGlvbklkQ29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMsXG4gICAgICBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IGRlZmF1bHRWYWx1ZTogdmFsdWUgfSlcbiAgICApO1xuICB9XG4gIG5hbWUobmFtZSkge1xuICAgIHJldHVybiBuZXcgQ29ubmVjdGlvbklkQ29sdW1uQnVpbGRlcih0aGlzLCBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IG5hbWUgfSkpO1xuICB9XG59O1xudmFyIFRpbWVzdGFtcEJ1aWxkZXIgPSBjbGFzcyBleHRlbmRzIFR5cGVCdWlsZGVyIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoVGltZXN0YW1wLmdldEFsZ2VicmFpY1R5cGUoKSk7XG4gIH1cbiAgaW5kZXgoYWxnb3JpdGhtID0gXCJidHJlZVwiKSB7XG4gICAgcmV0dXJuIG5ldyBUaW1lc3RhbXBDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcyxcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgaW5kZXhUeXBlOiBhbGdvcml0aG0gfSlcbiAgICApO1xuICB9XG4gIHVuaXF1ZSgpIHtcbiAgICByZXR1cm4gbmV3IFRpbWVzdGFtcENvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLFxuICAgICAgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBpc1VuaXF1ZTogdHJ1ZSB9KVxuICAgICk7XG4gIH1cbiAgcHJpbWFyeUtleSgpIHtcbiAgICByZXR1cm4gbmV3IFRpbWVzdGFtcENvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLFxuICAgICAgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBpc1ByaW1hcnlLZXk6IHRydWUgfSlcbiAgICApO1xuICB9XG4gIGF1dG9JbmMoKSB7XG4gICAgcmV0dXJuIG5ldyBUaW1lc3RhbXBDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcyxcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgaXNBdXRvSW5jcmVtZW50OiB0cnVlIH0pXG4gICAgKTtcbiAgfVxuICBkZWZhdWx0KHZhbHVlKSB7XG4gICAgcmV0dXJuIG5ldyBUaW1lc3RhbXBDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcyxcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgZGVmYXVsdFZhbHVlOiB2YWx1ZSB9KVxuICAgICk7XG4gIH1cbiAgbmFtZShuYW1lKSB7XG4gICAgcmV0dXJuIG5ldyBUaW1lc3RhbXBDb2x1bW5CdWlsZGVyKHRoaXMsIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgbmFtZSB9KSk7XG4gIH1cbn07XG52YXIgVGltZUR1cmF0aW9uQnVpbGRlciA9IGNsYXNzIGV4dGVuZHMgVHlwZUJ1aWxkZXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcihUaW1lRHVyYXRpb24uZ2V0QWxnZWJyYWljVHlwZSgpKTtcbiAgfVxuICBpbmRleChhbGdvcml0aG0gPSBcImJ0cmVlXCIpIHtcbiAgICByZXR1cm4gbmV3IFRpbWVEdXJhdGlvbkNvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLFxuICAgICAgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBpbmRleFR5cGU6IGFsZ29yaXRobSB9KVxuICAgICk7XG4gIH1cbiAgdW5pcXVlKCkge1xuICAgIHJldHVybiBuZXcgVGltZUR1cmF0aW9uQ29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMsXG4gICAgICBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IGlzVW5pcXVlOiB0cnVlIH0pXG4gICAgKTtcbiAgfVxuICBwcmltYXJ5S2V5KCkge1xuICAgIHJldHVybiBuZXcgVGltZUR1cmF0aW9uQ29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMsXG4gICAgICBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IGlzUHJpbWFyeUtleTogdHJ1ZSB9KVxuICAgICk7XG4gIH1cbiAgYXV0b0luYygpIHtcbiAgICByZXR1cm4gbmV3IFRpbWVEdXJhdGlvbkNvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLFxuICAgICAgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBpc0F1dG9JbmNyZW1lbnQ6IHRydWUgfSlcbiAgICApO1xuICB9XG4gIGRlZmF1bHQodmFsdWUpIHtcbiAgICByZXR1cm4gbmV3IFRpbWVEdXJhdGlvbkNvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLFxuICAgICAgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBkZWZhdWx0VmFsdWU6IHZhbHVlIH0pXG4gICAgKTtcbiAgfVxuICBuYW1lKG5hbWUpIHtcbiAgICByZXR1cm4gbmV3IFRpbWVEdXJhdGlvbkNvbHVtbkJ1aWxkZXIodGhpcywgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBuYW1lIH0pKTtcbiAgfVxufTtcbnZhciBVdWlkQnVpbGRlciA9IGNsYXNzIGV4dGVuZHMgVHlwZUJ1aWxkZXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcihVdWlkLmdldEFsZ2VicmFpY1R5cGUoKSk7XG4gIH1cbiAgaW5kZXgoYWxnb3JpdGhtID0gXCJidHJlZVwiKSB7XG4gICAgcmV0dXJuIG5ldyBVdWlkQ29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMsXG4gICAgICBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IGluZGV4VHlwZTogYWxnb3JpdGhtIH0pXG4gICAgKTtcbiAgfVxuICB1bmlxdWUoKSB7XG4gICAgcmV0dXJuIG5ldyBVdWlkQ29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMsXG4gICAgICBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IGlzVW5pcXVlOiB0cnVlIH0pXG4gICAgKTtcbiAgfVxuICBwcmltYXJ5S2V5KCkge1xuICAgIHJldHVybiBuZXcgVXVpZENvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLFxuICAgICAgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBpc1ByaW1hcnlLZXk6IHRydWUgfSlcbiAgICApO1xuICB9XG4gIGF1dG9JbmMoKSB7XG4gICAgcmV0dXJuIG5ldyBVdWlkQ29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMsXG4gICAgICBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IGlzQXV0b0luY3JlbWVudDogdHJ1ZSB9KVxuICAgICk7XG4gIH1cbiAgZGVmYXVsdCh2YWx1ZSkge1xuICAgIHJldHVybiBuZXcgVXVpZENvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLFxuICAgICAgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBkZWZhdWx0VmFsdWU6IHZhbHVlIH0pXG4gICAgKTtcbiAgfVxufTtcbnZhciBkZWZhdWx0TWV0YWRhdGEgPSB7fTtcbnZhciBDb2x1bW5CdWlsZGVyID0gY2xhc3Mge1xuICB0eXBlQnVpbGRlcjtcbiAgY29sdW1uTWV0YWRhdGE7XG4gIGNvbnN0cnVjdG9yKHR5cGVCdWlsZGVyLCBtZXRhZGF0YSkge1xuICAgIHRoaXMudHlwZUJ1aWxkZXIgPSB0eXBlQnVpbGRlcjtcbiAgICB0aGlzLmNvbHVtbk1ldGFkYXRhID0gbWV0YWRhdGE7XG4gIH1cbiAgc2VyaWFsaXplKHdyaXRlciwgdmFsdWUpIHtcbiAgICBBbGdlYnJhaWNUeXBlLnNlcmlhbGl6ZVZhbHVlKHdyaXRlciwgdGhpcy50eXBlQnVpbGRlci5hbGdlYnJhaWNUeXBlLCB2YWx1ZSk7XG4gIH1cbiAgZGVzZXJpYWxpemUocmVhZGVyKSB7XG4gICAgcmV0dXJuIEFsZ2VicmFpY1R5cGUuZGVzZXJpYWxpemVWYWx1ZShcbiAgICAgIHJlYWRlcixcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIuYWxnZWJyYWljVHlwZVxuICAgICk7XG4gIH1cbn07XG52YXIgVThDb2x1bW5CdWlsZGVyID0gY2xhc3MgX1U4Q29sdW1uQnVpbGRlciBleHRlbmRzIENvbHVtbkJ1aWxkZXIge1xuICBpbmRleChhbGdvcml0aG0gPSBcImJ0cmVlXCIpIHtcbiAgICByZXR1cm4gbmV3IF9VOENvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgaW5kZXhUeXBlOiBhbGdvcml0aG0gfSlcbiAgICApO1xuICB9XG4gIHVuaXF1ZSgpIHtcbiAgICByZXR1cm4gbmV3IF9VOENvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgaXNVbmlxdWU6IHRydWUgfSlcbiAgICApO1xuICB9XG4gIHByaW1hcnlLZXkoKSB7XG4gICAgcmV0dXJuIG5ldyBfVThDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IGlzUHJpbWFyeUtleTogdHJ1ZSB9KVxuICAgICk7XG4gIH1cbiAgYXV0b0luYygpIHtcbiAgICByZXR1cm4gbmV3IF9VOENvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgaXNBdXRvSW5jcmVtZW50OiB0cnVlIH0pXG4gICAgKTtcbiAgfVxuICBkZWZhdWx0KHZhbHVlKSB7XG4gICAgcmV0dXJuIG5ldyBfVThDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7XG4gICAgICAgIGRlZmF1bHRWYWx1ZTogdmFsdWVcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuICBuYW1lKG5hbWUpIHtcbiAgICByZXR1cm4gbmV3IF9VOENvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgbmFtZSB9KVxuICAgICk7XG4gIH1cbn07XG52YXIgVTE2Q29sdW1uQnVpbGRlciA9IGNsYXNzIF9VMTZDb2x1bW5CdWlsZGVyIGV4dGVuZHMgQ29sdW1uQnVpbGRlciB7XG4gIGluZGV4KGFsZ29yaXRobSA9IFwiYnRyZWVcIikge1xuICAgIHJldHVybiBuZXcgX1UxNkNvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgaW5kZXhUeXBlOiBhbGdvcml0aG0gfSlcbiAgICApO1xuICB9XG4gIHVuaXF1ZSgpIHtcbiAgICByZXR1cm4gbmV3IF9VMTZDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IGlzVW5pcXVlOiB0cnVlIH0pXG4gICAgKTtcbiAgfVxuICBwcmltYXJ5S2V5KCkge1xuICAgIHJldHVybiBuZXcgX1UxNkNvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgaXNQcmltYXJ5S2V5OiB0cnVlIH0pXG4gICAgKTtcbiAgfVxuICBhdXRvSW5jKCkge1xuICAgIHJldHVybiBuZXcgX1UxNkNvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgaXNBdXRvSW5jcmVtZW50OiB0cnVlIH0pXG4gICAgKTtcbiAgfVxuICBkZWZhdWx0KHZhbHVlKSB7XG4gICAgcmV0dXJuIG5ldyBfVTE2Q29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwge1xuICAgICAgICBkZWZhdWx0VmFsdWU6IHZhbHVlXG4gICAgICB9KVxuICAgICk7XG4gIH1cbiAgbmFtZShuYW1lKSB7XG4gICAgcmV0dXJuIG5ldyBfVTE2Q29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBuYW1lIH0pXG4gICAgKTtcbiAgfVxufTtcbnZhciBVMzJDb2x1bW5CdWlsZGVyID0gY2xhc3MgX1UzMkNvbHVtbkJ1aWxkZXIgZXh0ZW5kcyBDb2x1bW5CdWlsZGVyIHtcbiAgaW5kZXgoYWxnb3JpdGhtID0gXCJidHJlZVwiKSB7XG4gICAgcmV0dXJuIG5ldyBfVTMyQ29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBpbmRleFR5cGU6IGFsZ29yaXRobSB9KVxuICAgICk7XG4gIH1cbiAgdW5pcXVlKCkge1xuICAgIHJldHVybiBuZXcgX1UzMkNvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgaXNVbmlxdWU6IHRydWUgfSlcbiAgICApO1xuICB9XG4gIHByaW1hcnlLZXkoKSB7XG4gICAgcmV0dXJuIG5ldyBfVTMyQ29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBpc1ByaW1hcnlLZXk6IHRydWUgfSlcbiAgICApO1xuICB9XG4gIGF1dG9JbmMoKSB7XG4gICAgcmV0dXJuIG5ldyBfVTMyQ29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBpc0F1dG9JbmNyZW1lbnQ6IHRydWUgfSlcbiAgICApO1xuICB9XG4gIGRlZmF1bHQodmFsdWUpIHtcbiAgICByZXR1cm4gbmV3IF9VMzJDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7XG4gICAgICAgIGRlZmF1bHRWYWx1ZTogdmFsdWVcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuICBuYW1lKG5hbWUpIHtcbiAgICByZXR1cm4gbmV3IF9VMzJDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IG5hbWUgfSlcbiAgICApO1xuICB9XG59O1xudmFyIFU2NENvbHVtbkJ1aWxkZXIgPSBjbGFzcyBfVTY0Q29sdW1uQnVpbGRlciBleHRlbmRzIENvbHVtbkJ1aWxkZXIge1xuICBpbmRleChhbGdvcml0aG0gPSBcImJ0cmVlXCIpIHtcbiAgICByZXR1cm4gbmV3IF9VNjRDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IGluZGV4VHlwZTogYWxnb3JpdGhtIH0pXG4gICAgKTtcbiAgfVxuICB1bmlxdWUoKSB7XG4gICAgcmV0dXJuIG5ldyBfVTY0Q29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBpc1VuaXF1ZTogdHJ1ZSB9KVxuICAgICk7XG4gIH1cbiAgcHJpbWFyeUtleSgpIHtcbiAgICByZXR1cm4gbmV3IF9VNjRDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IGlzUHJpbWFyeUtleTogdHJ1ZSB9KVxuICAgICk7XG4gIH1cbiAgYXV0b0luYygpIHtcbiAgICByZXR1cm4gbmV3IF9VNjRDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IGlzQXV0b0luY3JlbWVudDogdHJ1ZSB9KVxuICAgICk7XG4gIH1cbiAgZGVmYXVsdCh2YWx1ZSkge1xuICAgIHJldHVybiBuZXcgX1U2NENvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHtcbiAgICAgICAgZGVmYXVsdFZhbHVlOiB2YWx1ZVxuICAgICAgfSlcbiAgICApO1xuICB9XG4gIG5hbWUobmFtZSkge1xuICAgIHJldHVybiBuZXcgX1U2NENvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgbmFtZSB9KVxuICAgICk7XG4gIH1cbn07XG52YXIgVTEyOENvbHVtbkJ1aWxkZXIgPSBjbGFzcyBfVTEyOENvbHVtbkJ1aWxkZXIgZXh0ZW5kcyBDb2x1bW5CdWlsZGVyIHtcbiAgaW5kZXgoYWxnb3JpdGhtID0gXCJidHJlZVwiKSB7XG4gICAgcmV0dXJuIG5ldyBfVTEyOENvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgaW5kZXhUeXBlOiBhbGdvcml0aG0gfSlcbiAgICApO1xuICB9XG4gIHVuaXF1ZSgpIHtcbiAgICByZXR1cm4gbmV3IF9VMTI4Q29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBpc1VuaXF1ZTogdHJ1ZSB9KVxuICAgICk7XG4gIH1cbiAgcHJpbWFyeUtleSgpIHtcbiAgICByZXR1cm4gbmV3IF9VMTI4Q29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBpc1ByaW1hcnlLZXk6IHRydWUgfSlcbiAgICApO1xuICB9XG4gIGF1dG9JbmMoKSB7XG4gICAgcmV0dXJuIG5ldyBfVTEyOENvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgaXNBdXRvSW5jcmVtZW50OiB0cnVlIH0pXG4gICAgKTtcbiAgfVxuICBkZWZhdWx0KHZhbHVlKSB7XG4gICAgcmV0dXJuIG5ldyBfVTEyOENvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHtcbiAgICAgICAgZGVmYXVsdFZhbHVlOiB2YWx1ZVxuICAgICAgfSlcbiAgICApO1xuICB9XG4gIG5hbWUobmFtZSkge1xuICAgIHJldHVybiBuZXcgX1UxMjhDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IG5hbWUgfSlcbiAgICApO1xuICB9XG59O1xudmFyIFUyNTZDb2x1bW5CdWlsZGVyID0gY2xhc3MgX1UyNTZDb2x1bW5CdWlsZGVyIGV4dGVuZHMgQ29sdW1uQnVpbGRlciB7XG4gIGluZGV4KGFsZ29yaXRobSA9IFwiYnRyZWVcIikge1xuICAgIHJldHVybiBuZXcgX1UyNTZDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IGluZGV4VHlwZTogYWxnb3JpdGhtIH0pXG4gICAgKTtcbiAgfVxuICB1bmlxdWUoKSB7XG4gICAgcmV0dXJuIG5ldyBfVTI1NkNvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgaXNVbmlxdWU6IHRydWUgfSlcbiAgICApO1xuICB9XG4gIHByaW1hcnlLZXkoKSB7XG4gICAgcmV0dXJuIG5ldyBfVTI1NkNvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgaXNQcmltYXJ5S2V5OiB0cnVlIH0pXG4gICAgKTtcbiAgfVxuICBhdXRvSW5jKCkge1xuICAgIHJldHVybiBuZXcgX1UyNTZDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IGlzQXV0b0luY3JlbWVudDogdHJ1ZSB9KVxuICAgICk7XG4gIH1cbiAgZGVmYXVsdCh2YWx1ZSkge1xuICAgIHJldHVybiBuZXcgX1UyNTZDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7XG4gICAgICAgIGRlZmF1bHRWYWx1ZTogdmFsdWVcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuICBuYW1lKG5hbWUpIHtcbiAgICByZXR1cm4gbmV3IF9VMjU2Q29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBuYW1lIH0pXG4gICAgKTtcbiAgfVxufTtcbnZhciBJOENvbHVtbkJ1aWxkZXIgPSBjbGFzcyBfSThDb2x1bW5CdWlsZGVyIGV4dGVuZHMgQ29sdW1uQnVpbGRlciB7XG4gIGluZGV4KGFsZ29yaXRobSA9IFwiYnRyZWVcIikge1xuICAgIHJldHVybiBuZXcgX0k4Q29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBpbmRleFR5cGU6IGFsZ29yaXRobSB9KVxuICAgICk7XG4gIH1cbiAgdW5pcXVlKCkge1xuICAgIHJldHVybiBuZXcgX0k4Q29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBpc1VuaXF1ZTogdHJ1ZSB9KVxuICAgICk7XG4gIH1cbiAgcHJpbWFyeUtleSgpIHtcbiAgICByZXR1cm4gbmV3IF9JOENvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgaXNQcmltYXJ5S2V5OiB0cnVlIH0pXG4gICAgKTtcbiAgfVxuICBhdXRvSW5jKCkge1xuICAgIHJldHVybiBuZXcgX0k4Q29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBpc0F1dG9JbmNyZW1lbnQ6IHRydWUgfSlcbiAgICApO1xuICB9XG4gIGRlZmF1bHQodmFsdWUpIHtcbiAgICByZXR1cm4gbmV3IF9JOENvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHtcbiAgICAgICAgZGVmYXVsdFZhbHVlOiB2YWx1ZVxuICAgICAgfSlcbiAgICApO1xuICB9XG4gIG5hbWUobmFtZSkge1xuICAgIHJldHVybiBuZXcgX0k4Q29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBuYW1lIH0pXG4gICAgKTtcbiAgfVxufTtcbnZhciBJMTZDb2x1bW5CdWlsZGVyID0gY2xhc3MgX0kxNkNvbHVtbkJ1aWxkZXIgZXh0ZW5kcyBDb2x1bW5CdWlsZGVyIHtcbiAgaW5kZXgoYWxnb3JpdGhtID0gXCJidHJlZVwiKSB7XG4gICAgcmV0dXJuIG5ldyBfSTE2Q29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBpbmRleFR5cGU6IGFsZ29yaXRobSB9KVxuICAgICk7XG4gIH1cbiAgdW5pcXVlKCkge1xuICAgIHJldHVybiBuZXcgX0kxNkNvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgaXNVbmlxdWU6IHRydWUgfSlcbiAgICApO1xuICB9XG4gIHByaW1hcnlLZXkoKSB7XG4gICAgcmV0dXJuIG5ldyBfSTE2Q29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBpc1ByaW1hcnlLZXk6IHRydWUgfSlcbiAgICApO1xuICB9XG4gIGF1dG9JbmMoKSB7XG4gICAgcmV0dXJuIG5ldyBfSTE2Q29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBpc0F1dG9JbmNyZW1lbnQ6IHRydWUgfSlcbiAgICApO1xuICB9XG4gIGRlZmF1bHQodmFsdWUpIHtcbiAgICByZXR1cm4gbmV3IF9JMTZDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7XG4gICAgICAgIGRlZmF1bHRWYWx1ZTogdmFsdWVcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuICBuYW1lKG5hbWUpIHtcbiAgICByZXR1cm4gbmV3IF9JMTZDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IG5hbWUgfSlcbiAgICApO1xuICB9XG59O1xudmFyIEkzMkNvbHVtbkJ1aWxkZXIgPSBjbGFzcyBfSTMyQ29sdW1uQnVpbGRlciBleHRlbmRzIENvbHVtbkJ1aWxkZXIge1xuICBpbmRleChhbGdvcml0aG0gPSBcImJ0cmVlXCIpIHtcbiAgICByZXR1cm4gbmV3IF9JMzJDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IGluZGV4VHlwZTogYWxnb3JpdGhtIH0pXG4gICAgKTtcbiAgfVxuICB1bmlxdWUoKSB7XG4gICAgcmV0dXJuIG5ldyBfSTMyQ29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBpc1VuaXF1ZTogdHJ1ZSB9KVxuICAgICk7XG4gIH1cbiAgcHJpbWFyeUtleSgpIHtcbiAgICByZXR1cm4gbmV3IF9JMzJDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IGlzUHJpbWFyeUtleTogdHJ1ZSB9KVxuICAgICk7XG4gIH1cbiAgYXV0b0luYygpIHtcbiAgICByZXR1cm4gbmV3IF9JMzJDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IGlzQXV0b0luY3JlbWVudDogdHJ1ZSB9KVxuICAgICk7XG4gIH1cbiAgZGVmYXVsdCh2YWx1ZSkge1xuICAgIHJldHVybiBuZXcgX0kzMkNvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHtcbiAgICAgICAgZGVmYXVsdFZhbHVlOiB2YWx1ZVxuICAgICAgfSlcbiAgICApO1xuICB9XG4gIG5hbWUobmFtZSkge1xuICAgIHJldHVybiBuZXcgX0kzMkNvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgbmFtZSB9KVxuICAgICk7XG4gIH1cbn07XG52YXIgSTY0Q29sdW1uQnVpbGRlciA9IGNsYXNzIF9JNjRDb2x1bW5CdWlsZGVyIGV4dGVuZHMgQ29sdW1uQnVpbGRlciB7XG4gIGluZGV4KGFsZ29yaXRobSA9IFwiYnRyZWVcIikge1xuICAgIHJldHVybiBuZXcgX0k2NENvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgaW5kZXhUeXBlOiBhbGdvcml0aG0gfSlcbiAgICApO1xuICB9XG4gIHVuaXF1ZSgpIHtcbiAgICByZXR1cm4gbmV3IF9JNjRDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IGlzVW5pcXVlOiB0cnVlIH0pXG4gICAgKTtcbiAgfVxuICBwcmltYXJ5S2V5KCkge1xuICAgIHJldHVybiBuZXcgX0k2NENvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgaXNQcmltYXJ5S2V5OiB0cnVlIH0pXG4gICAgKTtcbiAgfVxuICBhdXRvSW5jKCkge1xuICAgIHJldHVybiBuZXcgX0k2NENvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgaXNBdXRvSW5jcmVtZW50OiB0cnVlIH0pXG4gICAgKTtcbiAgfVxuICBkZWZhdWx0KHZhbHVlKSB7XG4gICAgcmV0dXJuIG5ldyBfSTY0Q29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwge1xuICAgICAgICBkZWZhdWx0VmFsdWU6IHZhbHVlXG4gICAgICB9KVxuICAgICk7XG4gIH1cbiAgbmFtZShuYW1lKSB7XG4gICAgcmV0dXJuIG5ldyBfSTY0Q29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBuYW1lIH0pXG4gICAgKTtcbiAgfVxufTtcbnZhciBJMTI4Q29sdW1uQnVpbGRlciA9IGNsYXNzIF9JMTI4Q29sdW1uQnVpbGRlciBleHRlbmRzIENvbHVtbkJ1aWxkZXIge1xuICBpbmRleChhbGdvcml0aG0gPSBcImJ0cmVlXCIpIHtcbiAgICByZXR1cm4gbmV3IF9JMTI4Q29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBpbmRleFR5cGU6IGFsZ29yaXRobSB9KVxuICAgICk7XG4gIH1cbiAgdW5pcXVlKCkge1xuICAgIHJldHVybiBuZXcgX0kxMjhDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IGlzVW5pcXVlOiB0cnVlIH0pXG4gICAgKTtcbiAgfVxuICBwcmltYXJ5S2V5KCkge1xuICAgIHJldHVybiBuZXcgX0kxMjhDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IGlzUHJpbWFyeUtleTogdHJ1ZSB9KVxuICAgICk7XG4gIH1cbiAgYXV0b0luYygpIHtcbiAgICByZXR1cm4gbmV3IF9JMTI4Q29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBpc0F1dG9JbmNyZW1lbnQ6IHRydWUgfSlcbiAgICApO1xuICB9XG4gIGRlZmF1bHQodmFsdWUpIHtcbiAgICByZXR1cm4gbmV3IF9JMTI4Q29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwge1xuICAgICAgICBkZWZhdWx0VmFsdWU6IHZhbHVlXG4gICAgICB9KVxuICAgICk7XG4gIH1cbiAgbmFtZShuYW1lKSB7XG4gICAgcmV0dXJuIG5ldyBfSTEyOENvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgbmFtZSB9KVxuICAgICk7XG4gIH1cbn07XG52YXIgSTI1NkNvbHVtbkJ1aWxkZXIgPSBjbGFzcyBfSTI1NkNvbHVtbkJ1aWxkZXIgZXh0ZW5kcyBDb2x1bW5CdWlsZGVyIHtcbiAgaW5kZXgoYWxnb3JpdGhtID0gXCJidHJlZVwiKSB7XG4gICAgcmV0dXJuIG5ldyBfSTI1NkNvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgaW5kZXhUeXBlOiBhbGdvcml0aG0gfSlcbiAgICApO1xuICB9XG4gIHVuaXF1ZSgpIHtcbiAgICByZXR1cm4gbmV3IF9JMjU2Q29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBpc1VuaXF1ZTogdHJ1ZSB9KVxuICAgICk7XG4gIH1cbiAgcHJpbWFyeUtleSgpIHtcbiAgICByZXR1cm4gbmV3IF9JMjU2Q29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBpc1ByaW1hcnlLZXk6IHRydWUgfSlcbiAgICApO1xuICB9XG4gIGF1dG9JbmMoKSB7XG4gICAgcmV0dXJuIG5ldyBfSTI1NkNvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgaXNBdXRvSW5jcmVtZW50OiB0cnVlIH0pXG4gICAgKTtcbiAgfVxuICBkZWZhdWx0KHZhbHVlKSB7XG4gICAgcmV0dXJuIG5ldyBfSTI1NkNvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHtcbiAgICAgICAgZGVmYXVsdFZhbHVlOiB2YWx1ZVxuICAgICAgfSlcbiAgICApO1xuICB9XG4gIG5hbWUobmFtZSkge1xuICAgIHJldHVybiBuZXcgX0kyNTZDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IG5hbWUgfSlcbiAgICApO1xuICB9XG59O1xudmFyIEYzMkNvbHVtbkJ1aWxkZXIgPSBjbGFzcyBfRjMyQ29sdW1uQnVpbGRlciBleHRlbmRzIENvbHVtbkJ1aWxkZXIge1xuICBkZWZhdWx0KHZhbHVlKSB7XG4gICAgcmV0dXJuIG5ldyBfRjMyQ29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwge1xuICAgICAgICBkZWZhdWx0VmFsdWU6IHZhbHVlXG4gICAgICB9KVxuICAgICk7XG4gIH1cbiAgbmFtZShuYW1lKSB7XG4gICAgcmV0dXJuIG5ldyBfRjMyQ29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBuYW1lIH0pXG4gICAgKTtcbiAgfVxufTtcbnZhciBGNjRDb2x1bW5CdWlsZGVyID0gY2xhc3MgX0Y2NENvbHVtbkJ1aWxkZXIgZXh0ZW5kcyBDb2x1bW5CdWlsZGVyIHtcbiAgZGVmYXVsdCh2YWx1ZSkge1xuICAgIHJldHVybiBuZXcgX0Y2NENvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHtcbiAgICAgICAgZGVmYXVsdFZhbHVlOiB2YWx1ZVxuICAgICAgfSlcbiAgICApO1xuICB9XG4gIG5hbWUobmFtZSkge1xuICAgIHJldHVybiBuZXcgX0Y2NENvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgbmFtZSB9KVxuICAgICk7XG4gIH1cbn07XG52YXIgQm9vbENvbHVtbkJ1aWxkZXIgPSBjbGFzcyBfQm9vbENvbHVtbkJ1aWxkZXIgZXh0ZW5kcyBDb2x1bW5CdWlsZGVyIHtcbiAgaW5kZXgoYWxnb3JpdGhtID0gXCJidHJlZVwiKSB7XG4gICAgcmV0dXJuIG5ldyBfQm9vbENvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgaW5kZXhUeXBlOiBhbGdvcml0aG0gfSlcbiAgICApO1xuICB9XG4gIHVuaXF1ZSgpIHtcbiAgICByZXR1cm4gbmV3IF9Cb29sQ29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBpc1VuaXF1ZTogdHJ1ZSB9KVxuICAgICk7XG4gIH1cbiAgcHJpbWFyeUtleSgpIHtcbiAgICByZXR1cm4gbmV3IF9Cb29sQ29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBpc1ByaW1hcnlLZXk6IHRydWUgfSlcbiAgICApO1xuICB9XG4gIGRlZmF1bHQodmFsdWUpIHtcbiAgICByZXR1cm4gbmV3IF9Cb29sQ29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwge1xuICAgICAgICBkZWZhdWx0VmFsdWU6IHZhbHVlXG4gICAgICB9KVxuICAgICk7XG4gIH1cbiAgbmFtZShuYW1lKSB7XG4gICAgcmV0dXJuIG5ldyBfQm9vbENvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgbmFtZSB9KVxuICAgICk7XG4gIH1cbn07XG52YXIgU3RyaW5nQ29sdW1uQnVpbGRlciA9IGNsYXNzIF9TdHJpbmdDb2x1bW5CdWlsZGVyIGV4dGVuZHMgQ29sdW1uQnVpbGRlciB7XG4gIGluZGV4KGFsZ29yaXRobSA9IFwiYnRyZWVcIikge1xuICAgIHJldHVybiBuZXcgX1N0cmluZ0NvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgaW5kZXhUeXBlOiBhbGdvcml0aG0gfSlcbiAgICApO1xuICB9XG4gIHVuaXF1ZSgpIHtcbiAgICByZXR1cm4gbmV3IF9TdHJpbmdDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IGlzVW5pcXVlOiB0cnVlIH0pXG4gICAgKTtcbiAgfVxuICBwcmltYXJ5S2V5KCkge1xuICAgIHJldHVybiBuZXcgX1N0cmluZ0NvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgaXNQcmltYXJ5S2V5OiB0cnVlIH0pXG4gICAgKTtcbiAgfVxuICBkZWZhdWx0KHZhbHVlKSB7XG4gICAgcmV0dXJuIG5ldyBfU3RyaW5nQ29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwge1xuICAgICAgICBkZWZhdWx0VmFsdWU6IHZhbHVlXG4gICAgICB9KVxuICAgICk7XG4gIH1cbiAgbmFtZShuYW1lKSB7XG4gICAgcmV0dXJuIG5ldyBfU3RyaW5nQ29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBuYW1lIH0pXG4gICAgKTtcbiAgfVxufTtcbnZhciBBcnJheUNvbHVtbkJ1aWxkZXIgPSBjbGFzcyBfQXJyYXlDb2x1bW5CdWlsZGVyIGV4dGVuZHMgQ29sdW1uQnVpbGRlciB7XG4gIGRlZmF1bHQodmFsdWUpIHtcbiAgICByZXR1cm4gbmV3IF9BcnJheUNvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHtcbiAgICAgICAgZGVmYXVsdFZhbHVlOiB2YWx1ZVxuICAgICAgfSlcbiAgICApO1xuICB9XG4gIG5hbWUobmFtZSkge1xuICAgIHJldHVybiBuZXcgX0FycmF5Q29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBuYW1lIH0pXG4gICAgKTtcbiAgfVxufTtcbnZhciBCeXRlQXJyYXlDb2x1bW5CdWlsZGVyID0gY2xhc3MgX0J5dGVBcnJheUNvbHVtbkJ1aWxkZXIgZXh0ZW5kcyBDb2x1bW5CdWlsZGVyIHtcbiAgY29uc3RydWN0b3IobWV0YWRhdGEpIHtcbiAgICBzdXBlcihuZXcgVHlwZUJ1aWxkZXIoQWxnZWJyYWljVHlwZS5BcnJheShBbGdlYnJhaWNUeXBlLlU4KSksIG1ldGFkYXRhKTtcbiAgfVxuICBkZWZhdWx0KHZhbHVlKSB7XG4gICAgcmV0dXJuIG5ldyBfQnl0ZUFycmF5Q29sdW1uQnVpbGRlcihcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IGRlZmF1bHRWYWx1ZTogdmFsdWUgfSlcbiAgICApO1xuICB9XG4gIG5hbWUobmFtZSkge1xuICAgIHJldHVybiBuZXcgX0J5dGVBcnJheUNvbHVtbkJ1aWxkZXIoc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgbmFtZSB9KSk7XG4gIH1cbn07XG52YXIgT3B0aW9uQ29sdW1uQnVpbGRlciA9IGNsYXNzIF9PcHRpb25Db2x1bW5CdWlsZGVyIGV4dGVuZHMgQ29sdW1uQnVpbGRlciB7XG4gIGRlZmF1bHQodmFsdWUpIHtcbiAgICByZXR1cm4gbmV3IF9PcHRpb25Db2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7XG4gICAgICAgIGRlZmF1bHRWYWx1ZTogdmFsdWVcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuICBuYW1lKG5hbWUpIHtcbiAgICByZXR1cm4gbmV3IF9PcHRpb25Db2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IG5hbWUgfSlcbiAgICApO1xuICB9XG59O1xudmFyIFJlc3VsdENvbHVtbkJ1aWxkZXIgPSBjbGFzcyBfUmVzdWx0Q29sdW1uQnVpbGRlciBleHRlbmRzIENvbHVtbkJ1aWxkZXIge1xuICBjb25zdHJ1Y3Rvcih0eXBlQnVpbGRlciwgbWV0YWRhdGEpIHtcbiAgICBzdXBlcih0eXBlQnVpbGRlciwgbWV0YWRhdGEpO1xuICB9XG4gIGRlZmF1bHQodmFsdWUpIHtcbiAgICByZXR1cm4gbmV3IF9SZXN1bHRDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7XG4gICAgICAgIGRlZmF1bHRWYWx1ZTogdmFsdWVcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxufTtcbnZhciBQcm9kdWN0Q29sdW1uQnVpbGRlciA9IGNsYXNzIF9Qcm9kdWN0Q29sdW1uQnVpbGRlciBleHRlbmRzIENvbHVtbkJ1aWxkZXIge1xuICBkZWZhdWx0KHZhbHVlKSB7XG4gICAgcmV0dXJuIG5ldyBfUHJvZHVjdENvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgZGVmYXVsdFZhbHVlOiB2YWx1ZSB9KVxuICAgICk7XG4gIH1cbiAgbmFtZShuYW1lKSB7XG4gICAgcmV0dXJuIG5ldyBfUHJvZHVjdENvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgbmFtZSB9KVxuICAgICk7XG4gIH1cbn07XG52YXIgU3VtQ29sdW1uQnVpbGRlciA9IGNsYXNzIF9TdW1Db2x1bW5CdWlsZGVyIGV4dGVuZHMgQ29sdW1uQnVpbGRlciB7XG4gIGRlZmF1bHQodmFsdWUpIHtcbiAgICByZXR1cm4gbmV3IF9TdW1Db2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IGRlZmF1bHRWYWx1ZTogdmFsdWUgfSlcbiAgICApO1xuICB9XG4gIG5hbWUobmFtZSkge1xuICAgIHJldHVybiBuZXcgX1N1bUNvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgbmFtZSB9KVxuICAgICk7XG4gIH1cbn07XG52YXIgU2ltcGxlU3VtQ29sdW1uQnVpbGRlciA9IGNsYXNzIF9TaW1wbGVTdW1Db2x1bW5CdWlsZGVyIGV4dGVuZHMgU3VtQ29sdW1uQnVpbGRlciB7XG4gIGluZGV4KGFsZ29yaXRobSA9IFwiYnRyZWVcIikge1xuICAgIHJldHVybiBuZXcgX1NpbXBsZVN1bUNvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgaW5kZXhUeXBlOiBhbGdvcml0aG0gfSlcbiAgICApO1xuICB9XG4gIHByaW1hcnlLZXkoKSB7XG4gICAgcmV0dXJuIG5ldyBfU2ltcGxlU3VtQ29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBpc1ByaW1hcnlLZXk6IHRydWUgfSlcbiAgICApO1xuICB9XG59O1xudmFyIFNjaGVkdWxlQXRDb2x1bW5CdWlsZGVyID0gY2xhc3MgX1NjaGVkdWxlQXRDb2x1bW5CdWlsZGVyIGV4dGVuZHMgQ29sdW1uQnVpbGRlciB7XG4gIGRlZmF1bHQodmFsdWUpIHtcbiAgICByZXR1cm4gbmV3IF9TY2hlZHVsZUF0Q29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBkZWZhdWx0VmFsdWU6IHZhbHVlIH0pXG4gICAgKTtcbiAgfVxuICBuYW1lKG5hbWUpIHtcbiAgICByZXR1cm4gbmV3IF9TY2hlZHVsZUF0Q29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBuYW1lIH0pXG4gICAgKTtcbiAgfVxufTtcbnZhciBJZGVudGl0eUNvbHVtbkJ1aWxkZXIgPSBjbGFzcyBfSWRlbnRpdHlDb2x1bW5CdWlsZGVyIGV4dGVuZHMgQ29sdW1uQnVpbGRlciB7XG4gIGluZGV4KGFsZ29yaXRobSA9IFwiYnRyZWVcIikge1xuICAgIHJldHVybiBuZXcgX0lkZW50aXR5Q29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBpbmRleFR5cGU6IGFsZ29yaXRobSB9KVxuICAgICk7XG4gIH1cbiAgdW5pcXVlKCkge1xuICAgIHJldHVybiBuZXcgX0lkZW50aXR5Q29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBpc1VuaXF1ZTogdHJ1ZSB9KVxuICAgICk7XG4gIH1cbiAgcHJpbWFyeUtleSgpIHtcbiAgICByZXR1cm4gbmV3IF9JZGVudGl0eUNvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgaXNQcmltYXJ5S2V5OiB0cnVlIH0pXG4gICAgKTtcbiAgfVxuICBkZWZhdWx0KHZhbHVlKSB7XG4gICAgcmV0dXJuIG5ldyBfSWRlbnRpdHlDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IGRlZmF1bHRWYWx1ZTogdmFsdWUgfSlcbiAgICApO1xuICB9XG4gIG5hbWUobmFtZSkge1xuICAgIHJldHVybiBuZXcgX0lkZW50aXR5Q29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBuYW1lIH0pXG4gICAgKTtcbiAgfVxufTtcbnZhciBDb25uZWN0aW9uSWRDb2x1bW5CdWlsZGVyID0gY2xhc3MgX0Nvbm5lY3Rpb25JZENvbHVtbkJ1aWxkZXIgZXh0ZW5kcyBDb2x1bW5CdWlsZGVyIHtcbiAgaW5kZXgoYWxnb3JpdGhtID0gXCJidHJlZVwiKSB7XG4gICAgcmV0dXJuIG5ldyBfQ29ubmVjdGlvbklkQ29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBpbmRleFR5cGU6IGFsZ29yaXRobSB9KVxuICAgICk7XG4gIH1cbiAgdW5pcXVlKCkge1xuICAgIHJldHVybiBuZXcgX0Nvbm5lY3Rpb25JZENvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgaXNVbmlxdWU6IHRydWUgfSlcbiAgICApO1xuICB9XG4gIHByaW1hcnlLZXkoKSB7XG4gICAgcmV0dXJuIG5ldyBfQ29ubmVjdGlvbklkQ29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBpc1ByaW1hcnlLZXk6IHRydWUgfSlcbiAgICApO1xuICB9XG4gIGRlZmF1bHQodmFsdWUpIHtcbiAgICByZXR1cm4gbmV3IF9Db25uZWN0aW9uSWRDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IGRlZmF1bHRWYWx1ZTogdmFsdWUgfSlcbiAgICApO1xuICB9XG4gIG5hbWUobmFtZSkge1xuICAgIHJldHVybiBuZXcgX0Nvbm5lY3Rpb25JZENvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgbmFtZSB9KVxuICAgICk7XG4gIH1cbn07XG52YXIgVGltZXN0YW1wQ29sdW1uQnVpbGRlciA9IGNsYXNzIF9UaW1lc3RhbXBDb2x1bW5CdWlsZGVyIGV4dGVuZHMgQ29sdW1uQnVpbGRlciB7XG4gIGluZGV4KGFsZ29yaXRobSA9IFwiYnRyZWVcIikge1xuICAgIHJldHVybiBuZXcgX1RpbWVzdGFtcENvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgaW5kZXhUeXBlOiBhbGdvcml0aG0gfSlcbiAgICApO1xuICB9XG4gIHVuaXF1ZSgpIHtcbiAgICByZXR1cm4gbmV3IF9UaW1lc3RhbXBDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IGlzVW5pcXVlOiB0cnVlIH0pXG4gICAgKTtcbiAgfVxuICBwcmltYXJ5S2V5KCkge1xuICAgIHJldHVybiBuZXcgX1RpbWVzdGFtcENvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgaXNQcmltYXJ5S2V5OiB0cnVlIH0pXG4gICAgKTtcbiAgfVxuICBkZWZhdWx0KHZhbHVlKSB7XG4gICAgcmV0dXJuIG5ldyBfVGltZXN0YW1wQ29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBkZWZhdWx0VmFsdWU6IHZhbHVlIH0pXG4gICAgKTtcbiAgfVxuICBuYW1lKG5hbWUpIHtcbiAgICByZXR1cm4gbmV3IF9UaW1lc3RhbXBDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IG5hbWUgfSlcbiAgICApO1xuICB9XG59O1xudmFyIFRpbWVEdXJhdGlvbkNvbHVtbkJ1aWxkZXIgPSBjbGFzcyBfVGltZUR1cmF0aW9uQ29sdW1uQnVpbGRlciBleHRlbmRzIENvbHVtbkJ1aWxkZXIge1xuICBpbmRleChhbGdvcml0aG0gPSBcImJ0cmVlXCIpIHtcbiAgICByZXR1cm4gbmV3IF9UaW1lRHVyYXRpb25Db2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IGluZGV4VHlwZTogYWxnb3JpdGhtIH0pXG4gICAgKTtcbiAgfVxuICB1bmlxdWUoKSB7XG4gICAgcmV0dXJuIG5ldyBfVGltZUR1cmF0aW9uQ29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBpc1VuaXF1ZTogdHJ1ZSB9KVxuICAgICk7XG4gIH1cbiAgcHJpbWFyeUtleSgpIHtcbiAgICByZXR1cm4gbmV3IF9UaW1lRHVyYXRpb25Db2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IGlzUHJpbWFyeUtleTogdHJ1ZSB9KVxuICAgICk7XG4gIH1cbiAgZGVmYXVsdCh2YWx1ZSkge1xuICAgIHJldHVybiBuZXcgX1RpbWVEdXJhdGlvbkNvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgZGVmYXVsdFZhbHVlOiB2YWx1ZSB9KVxuICAgICk7XG4gIH1cbiAgbmFtZShuYW1lKSB7XG4gICAgcmV0dXJuIG5ldyBfVGltZUR1cmF0aW9uQ29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBuYW1lIH0pXG4gICAgKTtcbiAgfVxufTtcbnZhciBVdWlkQ29sdW1uQnVpbGRlciA9IGNsYXNzIF9VdWlkQ29sdW1uQnVpbGRlciBleHRlbmRzIENvbHVtbkJ1aWxkZXIge1xuICBpbmRleChhbGdvcml0aG0gPSBcImJ0cmVlXCIpIHtcbiAgICByZXR1cm4gbmV3IF9VdWlkQ29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBpbmRleFR5cGU6IGFsZ29yaXRobSB9KVxuICAgICk7XG4gIH1cbiAgdW5pcXVlKCkge1xuICAgIHJldHVybiBuZXcgX1V1aWRDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IGlzVW5pcXVlOiB0cnVlIH0pXG4gICAgKTtcbiAgfVxuICBwcmltYXJ5S2V5KCkge1xuICAgIHJldHVybiBuZXcgX1V1aWRDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IGlzUHJpbWFyeUtleTogdHJ1ZSB9KVxuICAgICk7XG4gIH1cbiAgZGVmYXVsdCh2YWx1ZSkge1xuICAgIHJldHVybiBuZXcgX1V1aWRDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IGRlZmF1bHRWYWx1ZTogdmFsdWUgfSlcbiAgICApO1xuICB9XG59O1xudmFyIFJlZkJ1aWxkZXIgPSBjbGFzcyBleHRlbmRzIFR5cGVCdWlsZGVyIHtcbiAgcmVmO1xuICAvKiogVGhlIHBoYW50b20gdHlwZSBvZiB0aGUgcG9pbnRlZSBvZiB0aGlzIHJlZi4gKi9cbiAgX19zcGFjZXRpbWVUeXBlO1xuICBjb25zdHJ1Y3RvcihyZWYpIHtcbiAgICBzdXBlcihBbGdlYnJhaWNUeXBlLlJlZihyZWYpKTtcbiAgICB0aGlzLnJlZiA9IHJlZjtcbiAgfVxufTtcbnZhciBlbnVtSW1wbCA9ICgobmFtZU9yT2JqLCBtYXliZU9iaikgPT4ge1xuICBsZXQgb2JqID0gbmFtZU9yT2JqO1xuICBsZXQgbmFtZSA9IHZvaWQgMDtcbiAgaWYgKHR5cGVvZiBuYW1lT3JPYmogPT09IFwic3RyaW5nXCIpIHtcbiAgICBpZiAoIW1heWJlT2JqKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFxuICAgICAgICBcIldoZW4gcHJvdmlkaW5nIGEgbmFtZSwgeW91IG11c3QgYWxzbyBwcm92aWRlIHRoZSB2YXJpYW50cyBvYmplY3Qgb3IgYXJyYXkuXCJcbiAgICAgICk7XG4gICAgfVxuICAgIG9iaiA9IG1heWJlT2JqO1xuICAgIG5hbWUgPSBuYW1lT3JPYmo7XG4gIH1cbiAgaWYgKEFycmF5LmlzQXJyYXkob2JqKSkge1xuICAgIGNvbnN0IHNpbXBsZVZhcmlhbnRzT2JqID0ge307XG4gICAgZm9yIChjb25zdCB2YXJpYW50IG9mIG9iaikge1xuICAgICAgc2ltcGxlVmFyaWFudHNPYmpbdmFyaWFudF0gPSBuZXcgVW5pdEJ1aWxkZXIoKTtcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBTaW1wbGVTdW1CdWlsZGVySW1wbChzaW1wbGVWYXJpYW50c09iaiwgbmFtZSk7XG4gIH1cbiAgcmV0dXJuIG5ldyBTdW1CdWlsZGVyKG9iaiwgbmFtZSk7XG59KTtcbnZhciB0ID0ge1xuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBgQm9vbGAge0BsaW5rIEFsZ2VicmFpY1R5cGV9IHRvIGJlIHVzZWQgaW4gdGFibGUgZGVmaW5pdGlvbnNcbiAgICogUmVwcmVzZW50ZWQgYXMgYGJvb2xlYW5gIGluIFR5cGVTY3JpcHQuXG4gICAqIEByZXR1cm5zIEEgbmV3IHtAbGluayBCb29sQnVpbGRlcn0gaW5zdGFuY2VcbiAgICovXG4gIGJvb2w6ICgpID0+IG5ldyBCb29sQnVpbGRlcigpLFxuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBgU3RyaW5nYCB7QGxpbmsgQWxnZWJyYWljVHlwZX0gdG8gYmUgdXNlZCBpbiB0YWJsZSBkZWZpbml0aW9uc1xuICAgKiBSZXByZXNlbnRlZCBhcyBgc3RyaW5nYCBpbiBUeXBlU2NyaXB0LlxuICAgKiBAcmV0dXJucyBBIG5ldyB7QGxpbmsgU3RyaW5nQnVpbGRlcn0gaW5zdGFuY2VcbiAgICovXG4gIHN0cmluZzogKCkgPT4gbmV3IFN0cmluZ0J1aWxkZXIoKSxcbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgYEY2NGAge0BsaW5rIEFsZ2VicmFpY1R5cGV9IHRvIGJlIHVzZWQgaW4gdGFibGUgZGVmaW5pdGlvbnNcbiAgICogUmVwcmVzZW50ZWQgYXMgYG51bWJlcmAgaW4gVHlwZVNjcmlwdC5cbiAgICogQHJldHVybnMgQSBuZXcge0BsaW5rIEY2NEJ1aWxkZXJ9IGluc3RhbmNlXG4gICAqL1xuICBudW1iZXI6ICgpID0+IG5ldyBGNjRCdWlsZGVyKCksXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IGBJOGAge0BsaW5rIEFsZ2VicmFpY1R5cGV9IHRvIGJlIHVzZWQgaW4gdGFibGUgZGVmaW5pdGlvbnNcbiAgICogUmVwcmVzZW50ZWQgYXMgYG51bWJlcmAgaW4gVHlwZVNjcmlwdC5cbiAgICogQHJldHVybnMgQSBuZXcge0BsaW5rIEk4QnVpbGRlcn0gaW5zdGFuY2VcbiAgICovXG4gIGk4OiAoKSA9PiBuZXcgSThCdWlsZGVyKCksXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IGBVOGAge0BsaW5rIEFsZ2VicmFpY1R5cGV9IHRvIGJlIHVzZWQgaW4gdGFibGUgZGVmaW5pdGlvbnNcbiAgICogUmVwcmVzZW50ZWQgYXMgYG51bWJlcmAgaW4gVHlwZVNjcmlwdC5cbiAgICogQHJldHVybnMgQSBuZXcge0BsaW5rIFU4QnVpbGRlcn0gaW5zdGFuY2VcbiAgICovXG4gIHU4OiAoKSA9PiBuZXcgVThCdWlsZGVyKCksXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IGBJMTZgIHtAbGluayBBbGdlYnJhaWNUeXBlfSB0byBiZSB1c2VkIGluIHRhYmxlIGRlZmluaXRpb25zXG4gICAqIFJlcHJlc2VudGVkIGFzIGBudW1iZXJgIGluIFR5cGVTY3JpcHQuXG4gICAqIEByZXR1cm5zIEEgbmV3IHtAbGluayBJMTZCdWlsZGVyfSBpbnN0YW5jZVxuICAgKi9cbiAgaTE2OiAoKSA9PiBuZXcgSTE2QnVpbGRlcigpLFxuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBgVTE2YCB7QGxpbmsgQWxnZWJyYWljVHlwZX0gdG8gYmUgdXNlZCBpbiB0YWJsZSBkZWZpbml0aW9uc1xuICAgKiBSZXByZXNlbnRlZCBhcyBgbnVtYmVyYCBpbiBUeXBlU2NyaXB0LlxuICAgKiBAcmV0dXJucyBBIG5ldyB7QGxpbmsgVTE2QnVpbGRlcn0gaW5zdGFuY2VcbiAgICovXG4gIHUxNjogKCkgPT4gbmV3IFUxNkJ1aWxkZXIoKSxcbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgYEkzMmAge0BsaW5rIEFsZ2VicmFpY1R5cGV9IHRvIGJlIHVzZWQgaW4gdGFibGUgZGVmaW5pdGlvbnNcbiAgICogUmVwcmVzZW50ZWQgYXMgYG51bWJlcmAgaW4gVHlwZVNjcmlwdC5cbiAgICogQHJldHVybnMgQSBuZXcge0BsaW5rIEkzMkJ1aWxkZXJ9IGluc3RhbmNlXG4gICAqL1xuICBpMzI6ICgpID0+IG5ldyBJMzJCdWlsZGVyKCksXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IGBVMzJgIHtAbGluayBBbGdlYnJhaWNUeXBlfSB0byBiZSB1c2VkIGluIHRhYmxlIGRlZmluaXRpb25zXG4gICAqIFJlcHJlc2VudGVkIGFzIGBudW1iZXJgIGluIFR5cGVTY3JpcHQuXG4gICAqIEByZXR1cm5zIEEgbmV3IHtAbGluayBVMzJCdWlsZGVyfSBpbnN0YW5jZVxuICAgKi9cbiAgdTMyOiAoKSA9PiBuZXcgVTMyQnVpbGRlcigpLFxuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBgSTY0YCB7QGxpbmsgQWxnZWJyYWljVHlwZX0gdG8gYmUgdXNlZCBpbiB0YWJsZSBkZWZpbml0aW9uc1xuICAgKiBSZXByZXNlbnRlZCBhcyBgYmlnaW50YCBpbiBUeXBlU2NyaXB0LlxuICAgKiBAcmV0dXJucyBBIG5ldyB7QGxpbmsgSTY0QnVpbGRlcn0gaW5zdGFuY2VcbiAgICovXG4gIGk2NDogKCkgPT4gbmV3IEk2NEJ1aWxkZXIoKSxcbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgYFU2NGAge0BsaW5rIEFsZ2VicmFpY1R5cGV9IHRvIGJlIHVzZWQgaW4gdGFibGUgZGVmaW5pdGlvbnNcbiAgICogUmVwcmVzZW50ZWQgYXMgYGJpZ2ludGAgaW4gVHlwZVNjcmlwdC5cbiAgICogQHJldHVybnMgQSBuZXcge0BsaW5rIFU2NEJ1aWxkZXJ9IGluc3RhbmNlXG4gICAqL1xuICB1NjQ6ICgpID0+IG5ldyBVNjRCdWlsZGVyKCksXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IGBJMTI4YCB7QGxpbmsgQWxnZWJyYWljVHlwZX0gdG8gYmUgdXNlZCBpbiB0YWJsZSBkZWZpbml0aW9uc1xuICAgKiBSZXByZXNlbnRlZCBhcyBgYmlnaW50YCBpbiBUeXBlU2NyaXB0LlxuICAgKiBAcmV0dXJucyBBIG5ldyB7QGxpbmsgSTEyOEJ1aWxkZXJ9IGluc3RhbmNlXG4gICAqL1xuICBpMTI4OiAoKSA9PiBuZXcgSTEyOEJ1aWxkZXIoKSxcbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgYFUxMjhgIHtAbGluayBBbGdlYnJhaWNUeXBlfSB0byBiZSB1c2VkIGluIHRhYmxlIGRlZmluaXRpb25zXG4gICAqIFJlcHJlc2VudGVkIGFzIGBiaWdpbnRgIGluIFR5cGVTY3JpcHQuXG4gICAqIEByZXR1cm5zIEEgbmV3IHtAbGluayBVMTI4QnVpbGRlcn0gaW5zdGFuY2VcbiAgICovXG4gIHUxMjg6ICgpID0+IG5ldyBVMTI4QnVpbGRlcigpLFxuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBgSTI1NmAge0BsaW5rIEFsZ2VicmFpY1R5cGV9IHRvIGJlIHVzZWQgaW4gdGFibGUgZGVmaW5pdGlvbnNcbiAgICogUmVwcmVzZW50ZWQgYXMgYGJpZ2ludGAgaW4gVHlwZVNjcmlwdC5cbiAgICogQHJldHVybnMgQSBuZXcge0BsaW5rIEkyNTZCdWlsZGVyfSBpbnN0YW5jZVxuICAgKi9cbiAgaTI1NjogKCkgPT4gbmV3IEkyNTZCdWlsZGVyKCksXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IGBVMjU2YCB7QGxpbmsgQWxnZWJyYWljVHlwZX0gdG8gYmUgdXNlZCBpbiB0YWJsZSBkZWZpbml0aW9uc1xuICAgKiBSZXByZXNlbnRlZCBhcyBgYmlnaW50YCBpbiBUeXBlU2NyaXB0LlxuICAgKiBAcmV0dXJucyBBIG5ldyB7QGxpbmsgVTI1NkJ1aWxkZXJ9IGluc3RhbmNlXG4gICAqL1xuICB1MjU2OiAoKSA9PiBuZXcgVTI1NkJ1aWxkZXIoKSxcbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgYEYzMmAge0BsaW5rIEFsZ2VicmFpY1R5cGV9IHRvIGJlIHVzZWQgaW4gdGFibGUgZGVmaW5pdGlvbnNcbiAgICogUmVwcmVzZW50ZWQgYXMgYG51bWJlcmAgaW4gVHlwZVNjcmlwdC5cbiAgICogQHJldHVybnMgQSBuZXcge0BsaW5rIEYzMkJ1aWxkZXJ9IGluc3RhbmNlXG4gICAqL1xuICBmMzI6ICgpID0+IG5ldyBGMzJCdWlsZGVyKCksXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IGBGNjRgIHtAbGluayBBbGdlYnJhaWNUeXBlfSB0byBiZSB1c2VkIGluIHRhYmxlIGRlZmluaXRpb25zXG4gICAqIFJlcHJlc2VudGVkIGFzIGBudW1iZXJgIGluIFR5cGVTY3JpcHQuXG4gICAqIEByZXR1cm5zIEEgbmV3IHtAbGluayBGNjRCdWlsZGVyfSBpbnN0YW5jZVxuICAgKi9cbiAgZjY0OiAoKSA9PiBuZXcgRjY0QnVpbGRlcigpLFxuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBgUHJvZHVjdGAge0BsaW5rIEFsZ2VicmFpY1R5cGV9IHRvIGJlIHVzZWQgaW4gdGFibGUgZGVmaW5pdGlvbnMuIFByb2R1Y3QgdHlwZXMgaW4gU3BhY2V0aW1lREJcbiAgICogYXJlIGVzc2VudGlhbGx5IHRoZSBzYW1lIGFzIG9iamVjdHMgaW4gSmF2YVNjcmlwdC9UeXBlU2NyaXB0LlxuICAgKiBQcm9wZXJ0aWVzIG9mIHRoZSBvYmplY3QgbXVzdCBhbHNvIGJlIHtAbGluayBUeXBlQnVpbGRlcn1zLlxuICAgKiBSZXByZXNlbnRlZCBhcyBhbiBvYmplY3Qgd2l0aCBzcGVjaWZpYyBwcm9wZXJ0aWVzIGluIFR5cGVTY3JpcHQuXG4gICAqXG4gICAqIEBwYXJhbSBuYW1lIChvcHRpb25hbCkgQSBkaXNwbGF5IG5hbWUgZm9yIHRoZSBwcm9kdWN0IHR5cGUuIElmIG9taXR0ZWQsIGFuIGFub255bW91cyBwcm9kdWN0IHR5cGUgaXMgY3JlYXRlZC5cbiAgICogQHBhcmFtIG9iaiBUaGUgb2JqZWN0IGRlZmluaW5nIHRoZSBwcm9wZXJ0aWVzIG9mIHRoZSB0eXBlLCB3aG9zZSBwcm9wZXJ0eVxuICAgKiB2YWx1ZXMgbXVzdCBiZSB7QGxpbmsgVHlwZUJ1aWxkZXJ9cy5cbiAgICogQHJldHVybnMgQSBuZXcge0BsaW5rIFByb2R1Y3RCdWlsZGVyfSBpbnN0YW5jZS5cbiAgICovXG4gIG9iamVjdDogKChuYW1lT3JPYmosIG1heWJlT2JqKSA9PiB7XG4gICAgaWYgKHR5cGVvZiBuYW1lT3JPYmogPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIGlmICghbWF5YmVPYmopIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcbiAgICAgICAgICBcIldoZW4gcHJvdmlkaW5nIGEgbmFtZSwgeW91IG11c3QgYWxzbyBwcm92aWRlIHRoZSBvYmplY3QuXCJcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBuZXcgUHJvZHVjdEJ1aWxkZXIobWF5YmVPYmosIG5hbWVPck9iaik7XG4gICAgfVxuICAgIHJldHVybiBuZXcgUHJvZHVjdEJ1aWxkZXIobmFtZU9yT2JqLCB2b2lkIDApO1xuICB9KSxcbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgYFJvd2Age0BsaW5rIEFsZ2VicmFpY1R5cGV9IHRvIGJlIHVzZWQgaW4gdGFibGUgZGVmaW5pdGlvbnMuIFJvdyB0eXBlcyBpbiBTcGFjZXRpbWVEQlxuICAgKiBhcmUgc2ltaWxhciB0byBgUHJvZHVjdGAgdHlwZXMsIGJ1dCBhcmUgc3BlY2lmaWNhbGx5IHVzZWQgdG8gZGVmaW5lIHRoZSBzY2hlbWEgb2YgYSB0YWJsZSByb3cuXG4gICAqIFByb3BlcnRpZXMgb2YgdGhlIG9iamVjdCBtdXN0IGFsc28gYmUge0BsaW5rIFR5cGVCdWlsZGVyfSBvciB7QGxpbmsgQ29sdW1uQnVpbGRlcn1zLlxuICAgKlxuICAgKiBZb3UgY2FuIHJlcHJlc2VudCBhIGBSb3dgIGFzIGVpdGhlciBhIHtAbGluayBSb3dPYmp9IG9yIGFuIHtAbGluayBSb3dCdWlsZGVyfSB0eXBlIHdoZW5cbiAgICogZGVmaW5pbmcgYSB0YWJsZSBzY2hlbWEuXG4gICAqXG4gICAqIFRoZSB7QGxpbmsgUm93QnVpbGRlcn0gdHlwZSBpcyB1c2VmdWwgd2hlbiB5b3Ugd2FudCB0byBjcmVhdGUgYSB0eXBlIHdoaWNoIGNhbiBiZSB1c2VkIGFueXdoZXJlXG4gICAqIGEge0BsaW5rIFR5cGVCdWlsZGVyfSBpcyBhY2NlcHRlZCwgc3VjaCBhcyBpbiBuZXN0ZWQgb2JqZWN0cyBvciBhcnJheXMsIG9yIGFzIHRoZSBhcmd1bWVudFxuICAgKiB0byBhIHNjaGVkdWxlZCBmdW5jdGlvbi5cbiAgICpcbiAgICogQHBhcmFtIG9iaiBUaGUgb2JqZWN0IGRlZmluaW5nIHRoZSBwcm9wZXJ0aWVzIG9mIHRoZSByb3csIHdob3NlIHByb3BlcnR5XG4gICAqIHZhbHVlcyBtdXN0IGJlIHtAbGluayBUeXBlQnVpbGRlcn1zIG9yIHtAbGluayBDb2x1bW5CdWlsZGVyfXMuXG4gICAqIEByZXR1cm5zIEEgbmV3IHtAbGluayBSb3dCdWlsZGVyfSBpbnN0YW5jZVxuICAgKi9cbiAgcm93OiAoKG5hbWVPck9iaiwgbWF5YmVPYmopID0+IHtcbiAgICBjb25zdCBbb2JqLCBuYW1lXSA9IHR5cGVvZiBuYW1lT3JPYmogPT09IFwic3RyaW5nXCIgPyBbbWF5YmVPYmosIG5hbWVPck9ial0gOiBbbmFtZU9yT2JqLCB2b2lkIDBdO1xuICAgIHJldHVybiBuZXcgUm93QnVpbGRlcihvYmosIG5hbWUpO1xuICB9KSxcbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgYEFycmF5YCB7QGxpbmsgQWxnZWJyYWljVHlwZX0gdG8gYmUgdXNlZCBpbiB0YWJsZSBkZWZpbml0aW9ucy5cbiAgICogUmVwcmVzZW50ZWQgYXMgYW4gYXJyYXkgaW4gVHlwZVNjcmlwdC5cbiAgICogQHBhcmFtIGVsZW1lbnQgVGhlIGVsZW1lbnQgdHlwZSBvZiB0aGUgYXJyYXksIHdoaWNoIG11c3QgYmUgYSBgVHlwZUJ1aWxkZXJgLlxuICAgKiBAcmV0dXJucyBBIG5ldyB7QGxpbmsgQXJyYXlCdWlsZGVyfSBpbnN0YW5jZVxuICAgKi9cbiAgYXJyYXkoZSkge1xuICAgIHJldHVybiBuZXcgQXJyYXlCdWlsZGVyKGUpO1xuICB9LFxuICBlbnVtOiBlbnVtSW1wbCxcbiAgLyoqXG4gICAqIFRoaXMgaXMgYSBzcGVjaWFsIGhlbHBlciBmdW5jdGlvbiBmb3IgY29udmVuaWVudGx5IGNyZWF0aW5nIHtAbGluayBQcm9kdWN0fSB0eXBlIGNvbHVtbnMgd2l0aCBubyBmaWVsZHMuXG4gICAqXG4gICAqIEByZXR1cm5zIEEgbmV3IHtAbGluayBQcm9kdWN0QnVpbGRlcn0gaW5zdGFuY2Ugd2l0aCBubyBmaWVsZHMuXG4gICAqL1xuICB1bml0KCkge1xuICAgIHJldHVybiBuZXcgVW5pdEJ1aWxkZXIoKTtcbiAgfSxcbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBsYXppbHktZXZhbHVhdGVkIHtAbGluayBUeXBlQnVpbGRlcn0uIFRoaXMgaXMgdXNlZnVsIGZvciBjcmVhdGluZ1xuICAgKiByZWN1cnNpdmUgdHlwZXMsIHN1Y2ggYXMgYSB0cmVlIG9yIGxpbmtlZCBsaXN0LlxuICAgKiBAcGFyYW0gdGh1bmsgQSBmdW5jdGlvbiB0aGF0IHJldHVybnMgYSB7QGxpbmsgVHlwZUJ1aWxkZXJ9LlxuICAgKiBAcmV0dXJucyBBIHByb3h5IHtAbGluayBUeXBlQnVpbGRlcn0gdGhhdCBldmFsdWF0ZXMgdGhlIHRodW5rIG9uIGZpcnN0IGFjY2Vzcy5cbiAgICovXG4gIGxhenkodGh1bmspIHtcbiAgICBsZXQgY2FjaGVkID0gbnVsbDtcbiAgICBjb25zdCBnZXQgPSAoKSA9PiBjYWNoZWQgPz89IHRodW5rKCk7XG4gICAgY29uc3QgcHJveHkgPSBuZXcgUHJveHkoe30sIHtcbiAgICAgIGdldChfdCwgcHJvcCwgcmVjdikge1xuICAgICAgICBjb25zdCB0YXJnZXQgPSBnZXQoKTtcbiAgICAgICAgY29uc3QgdmFsID0gUmVmbGVjdC5nZXQodGFyZ2V0LCBwcm9wLCByZWN2KTtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiB2YWwgPT09IFwiZnVuY3Rpb25cIiA/IHZhbC5iaW5kKHRhcmdldCkgOiB2YWw7XG4gICAgICB9LFxuICAgICAgc2V0KF90LCBwcm9wLCB2YWx1ZSwgcmVjdikge1xuICAgICAgICByZXR1cm4gUmVmbGVjdC5zZXQoZ2V0KCksIHByb3AsIHZhbHVlLCByZWN2KTtcbiAgICAgIH0sXG4gICAgICBoYXMoX3QsIHByb3ApIHtcbiAgICAgICAgcmV0dXJuIHByb3AgaW4gZ2V0KCk7XG4gICAgICB9LFxuICAgICAgb3duS2V5cygpIHtcbiAgICAgICAgcmV0dXJuIFJlZmxlY3Qub3duS2V5cyhnZXQoKSk7XG4gICAgICB9LFxuICAgICAgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKF90LCBwcm9wKSB7XG4gICAgICAgIHJldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGdldCgpLCBwcm9wKTtcbiAgICAgIH0sXG4gICAgICBnZXRQcm90b3R5cGVPZigpIHtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5nZXRQcm90b3R5cGVPZihnZXQoKSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHByb3h5O1xuICB9LFxuICAvKipcbiAgICogVGhpcyBpcyBhIHNwZWNpYWwgaGVscGVyIGZ1bmN0aW9uIGZvciBjb252ZW5pZW50bHkgY3JlYXRpbmcge0BsaW5rIFNjaGVkdWxlQXR9IHR5cGUgY29sdW1ucy5cbiAgICogQHJldHVybnMgQSBuZXcgQ29sdW1uQnVpbGRlciBpbnN0YW5jZSB3aXRoIHRoZSB7QGxpbmsgU2NoZWR1bGVBdH0gdHlwZS5cbiAgICovXG4gIHNjaGVkdWxlQXQ6ICgpID0+IHtcbiAgICByZXR1cm4gbmV3IFNjaGVkdWxlQXRCdWlsZGVyKCk7XG4gIH0sXG4gIC8qKlxuICAgKiBUaGlzIGlzIGEgY29udmVuaWVuY2UgbWV0aG9kIGZvciBjcmVhdGluZyBhIGNvbHVtbiB3aXRoIHRoZSB7QGxpbmsgT3B0aW9ufSB0eXBlLlxuICAgKiBZb3UgY2FuIGNyZWF0ZSBhIGNvbHVtbiBvZiB0aGUgc2FtZSB0eXBlIGJ5IGNvbnN0cnVjdGluZyBhbiBlbnVtIHdpdGggYSBgc29tZWAgYW5kIGBub25lYCB2YXJpYW50LlxuICAgKiBAcGFyYW0gdmFsdWUgVGhlIHR5cGUgb2YgdGhlIHZhbHVlIGNvbnRhaW5lZCBpbiB0aGUgYHNvbWVgIHZhcmlhbnQgb2YgdGhlIGBPcHRpb25gLlxuICAgKiBAcmV0dXJucyBBIG5ldyB7QGxpbmsgT3B0aW9uQnVpbGRlcn0gaW5zdGFuY2Ugd2l0aCB0aGUge0BsaW5rIE9wdGlvbn0gdHlwZS5cbiAgICovXG4gIG9wdGlvbih2YWx1ZSkge1xuICAgIHJldHVybiBuZXcgT3B0aW9uQnVpbGRlcih2YWx1ZSk7XG4gIH0sXG4gIC8qKlxuICAgKiBUaGlzIGlzIGEgY29udmVuaWVuY2UgbWV0aG9kIGZvciBjcmVhdGluZyBhIGNvbHVtbiB3aXRoIHRoZSB7QGxpbmsgUmVzdWx0fSB0eXBlLlxuICAgKiBZb3UgY2FuIGNyZWF0ZSBhIGNvbHVtbiBvZiB0aGUgc2FtZSB0eXBlIGJ5IGNvbnN0cnVjdGluZyBhbiBlbnVtIHdpdGggYW4gYG9rYCBhbmQgYGVycmAgdmFyaWFudC5cbiAgICogQHBhcmFtIG9rIFRoZSB0eXBlIG9mIHRoZSB2YWx1ZSBjb250YWluZWQgaW4gdGhlIGBva2AgdmFyaWFudCBvZiB0aGUgYFJlc3VsdGAuXG4gICAqIEBwYXJhbSBlcnIgVGhlIHR5cGUgb2YgdGhlIHZhbHVlIGNvbnRhaW5lZCBpbiB0aGUgYGVycmAgdmFyaWFudCBvZiB0aGUgYFJlc3VsdGAuXG4gICAqIEByZXR1cm5zIEEgbmV3IHtAbGluayBSZXN1bHRCdWlsZGVyfSBpbnN0YW5jZSB3aXRoIHRoZSB7QGxpbmsgUmVzdWx0fSB0eXBlLlxuICAgKi9cbiAgcmVzdWx0KG9rLCBlcnIpIHtcbiAgICByZXR1cm4gbmV3IFJlc3VsdEJ1aWxkZXIob2ssIGVycik7XG4gIH0sXG4gIC8qKlxuICAgKiBUaGlzIGlzIGEgY29udmVuaWVuY2UgbWV0aG9kIGZvciBjcmVhdGluZyBhIGNvbHVtbiB3aXRoIHRoZSB7QGxpbmsgSWRlbnRpdHl9IHR5cGUuXG4gICAqIFlvdSBjYW4gY3JlYXRlIGEgY29sdW1uIG9mIHRoZSBzYW1lIHR5cGUgYnkgY29uc3RydWN0aW5nIGFuIGBvYmplY3RgIHdpdGggYSBzaW5nbGUgYF9faWRlbnRpdHlfX2AgZWxlbWVudC5cbiAgICogQHJldHVybnMgQSBuZXcge0BsaW5rIFR5cGVCdWlsZGVyfSBpbnN0YW5jZSB3aXRoIHRoZSB7QGxpbmsgSWRlbnRpdHl9IHR5cGUuXG4gICAqL1xuICBpZGVudGl0eTogKCkgPT4ge1xuICAgIHJldHVybiBuZXcgSWRlbnRpdHlCdWlsZGVyKCk7XG4gIH0sXG4gIC8qKlxuICAgKiBUaGlzIGlzIGEgY29udmVuaWVuY2UgbWV0aG9kIGZvciBjcmVhdGluZyBhIGNvbHVtbiB3aXRoIHRoZSB7QGxpbmsgQ29ubmVjdGlvbklkfSB0eXBlLlxuICAgKiBZb3UgY2FuIGNyZWF0ZSBhIGNvbHVtbiBvZiB0aGUgc2FtZSB0eXBlIGJ5IGNvbnN0cnVjdGluZyBhbiBgb2JqZWN0YCB3aXRoIGEgc2luZ2xlIGBfX2Nvbm5lY3Rpb25faWRfX2AgZWxlbWVudC5cbiAgICogQHJldHVybnMgQSBuZXcge0BsaW5rIFR5cGVCdWlsZGVyfSBpbnN0YW5jZSB3aXRoIHRoZSB7QGxpbmsgQ29ubmVjdGlvbklkfSB0eXBlLlxuICAgKi9cbiAgY29ubmVjdGlvbklkOiAoKSA9PiB7XG4gICAgcmV0dXJuIG5ldyBDb25uZWN0aW9uSWRCdWlsZGVyKCk7XG4gIH0sXG4gIC8qKlxuICAgKiBUaGlzIGlzIGEgY29udmVuaWVuY2UgbWV0aG9kIGZvciBjcmVhdGluZyBhIGNvbHVtbiB3aXRoIHRoZSB7QGxpbmsgVGltZXN0YW1wfSB0eXBlLlxuICAgKiBZb3UgY2FuIGNyZWF0ZSBhIGNvbHVtbiBvZiB0aGUgc2FtZSB0eXBlIGJ5IGNvbnN0cnVjdGluZyBhbiBgb2JqZWN0YCB3aXRoIGEgc2luZ2xlIGBfX3RpbWVzdGFtcF9taWNyb3Nfc2luY2VfdW5peF9lcG9jaF9fYCBlbGVtZW50LlxuICAgKiBAcmV0dXJucyBBIG5ldyB7QGxpbmsgVHlwZUJ1aWxkZXJ9IGluc3RhbmNlIHdpdGggdGhlIHtAbGluayBUaW1lc3RhbXB9IHR5cGUuXG4gICAqL1xuICB0aW1lc3RhbXA6ICgpID0+IHtcbiAgICByZXR1cm4gbmV3IFRpbWVzdGFtcEJ1aWxkZXIoKTtcbiAgfSxcbiAgLyoqXG4gICAqIFRoaXMgaXMgYSBjb252ZW5pZW5jZSBtZXRob2QgZm9yIGNyZWF0aW5nIGEgY29sdW1uIHdpdGggdGhlIHtAbGluayBUaW1lRHVyYXRpb259IHR5cGUuXG4gICAqIFlvdSBjYW4gY3JlYXRlIGEgY29sdW1uIG9mIHRoZSBzYW1lIHR5cGUgYnkgY29uc3RydWN0aW5nIGFuIGBvYmplY3RgIHdpdGggYSBzaW5nbGUgYF9fdGltZV9kdXJhdGlvbl9taWNyb3NfX2AgZWxlbWVudC5cbiAgICogQHJldHVybnMgQSBuZXcge0BsaW5rIFR5cGVCdWlsZGVyfSBpbnN0YW5jZSB3aXRoIHRoZSB7QGxpbmsgVGltZUR1cmF0aW9ufSB0eXBlLlxuICAgKi9cbiAgdGltZUR1cmF0aW9uOiAoKSA9PiB7XG4gICAgcmV0dXJuIG5ldyBUaW1lRHVyYXRpb25CdWlsZGVyKCk7XG4gIH0sXG4gIC8qKlxuICAgKiBUaGlzIGlzIGEgY29udmVuaWVuY2UgbWV0aG9kIGZvciBjcmVhdGluZyBhIGNvbHVtbiB3aXRoIHRoZSB7QGxpbmsgVXVpZH0gdHlwZS5cbiAgICogWW91IGNhbiBjcmVhdGUgYSBjb2x1bW4gb2YgdGhlIHNhbWUgdHlwZSBieSBjb25zdHJ1Y3RpbmcgYW4gYG9iamVjdGAgd2l0aCBhIHNpbmdsZSBgX191dWlkX19gIGVsZW1lbnQuXG4gICAqIEByZXR1cm5zIEEgbmV3IHtAbGluayBUeXBlQnVpbGRlcn0gaW5zdGFuY2Ugd2l0aCB0aGUge0BsaW5rIFV1aWR9IHR5cGUuXG4gICAqL1xuICB1dWlkOiAoKSA9PiB7XG4gICAgcmV0dXJuIG5ldyBVdWlkQnVpbGRlcigpO1xuICB9LFxuICAvKipcbiAgICogVGhpcyBpcyBhIGNvbnZlbmllbmNlIG1ldGhvZCBmb3IgY3JlYXRpbmcgYSBjb2x1bW4gd2l0aCB0aGUge0BsaW5rIEJ5dGVBcnJheX0gdHlwZS5cbiAgICogWW91IGNhbiBjcmVhdGUgYSBjb2x1bW4gb2YgdGhlIHNhbWUgdHlwZSBieSBjb25zdHJ1Y3RpbmcgYW4gYGFycmF5YCBvZiBgdThgLlxuICAgKiBUaGUgVHlwZVNjcmlwdCByZXByZXNlbnRhdGlvbiBpcyB7QGxpbmsgVWludDhBcnJheX0uXG4gICAqIEByZXR1cm5zIEEgbmV3IHtAbGluayBCeXRlQXJyYXlCdWlsZGVyfSBpbnN0YW5jZSB3aXRoIHRoZSB7QGxpbmsgQnl0ZUFycmF5fSB0eXBlLlxuICAgKi9cbiAgYnl0ZUFycmF5OiAoKSA9PiB7XG4gICAgcmV0dXJuIG5ldyBCeXRlQXJyYXlCdWlsZGVyKCk7XG4gIH1cbn07XG5cbi8vIHNyYy9saWIvYXV0b2dlbi9saWZlY3ljbGVfdHlwZS50c1xudmFyIExpZmVjeWNsZSA9IHQuZW51bShcIkxpZmVjeWNsZVwiLCB7XG4gIEluaXQ6IHQudW5pdCgpLFxuICBPbkNvbm5lY3Q6IHQudW5pdCgpLFxuICBPbkRpc2Nvbm5lY3Q6IHQudW5pdCgpXG59KTtcbnZhciBsaWZlY3ljbGVfdHlwZV9kZWZhdWx0ID0gTGlmZWN5Y2xlO1xuXG4vLyBzcmMvbGliL3JlZHVjZXJzLnRzXG5mdW5jdGlvbiBwdXNoUmVkdWNlcihuYW1lLCBwYXJhbXMsIGZuLCBsaWZlY3ljbGUpIHtcbiAgaWYgKGV4aXN0aW5nUmVkdWNlcnMuaGFzKG5hbWUpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgVGhlcmUgaXMgYWxyZWFkeSBhIHJlZHVjZXIgd2l0aCB0aGUgbmFtZSAnJHtuYW1lfSdgKTtcbiAgfVxuICBleGlzdGluZ1JlZHVjZXJzLmFkZChuYW1lKTtcbiAgaWYgKCEocGFyYW1zIGluc3RhbmNlb2YgUm93QnVpbGRlcikpIHtcbiAgICBwYXJhbXMgPSBuZXcgUm93QnVpbGRlcihwYXJhbXMpO1xuICB9XG4gIGlmIChwYXJhbXMudHlwZU5hbWUgPT09IHZvaWQgMCkge1xuICAgIHBhcmFtcy50eXBlTmFtZSA9IHRvUGFzY2FsQ2FzZShuYW1lKTtcbiAgfVxuICBjb25zdCByZWYgPSByZWdpc3RlclR5cGVzUmVjdXJzaXZlbHkocGFyYW1zKTtcbiAgY29uc3QgcGFyYW1zVHlwZSA9IHJlc29sdmVUeXBlKE1PRFVMRV9ERUYudHlwZXNwYWNlLCByZWYpLnZhbHVlO1xuICBNT0RVTEVfREVGLnJlZHVjZXJzLnB1c2goe1xuICAgIG5hbWUsXG4gICAgcGFyYW1zOiBwYXJhbXNUeXBlLFxuICAgIGxpZmVjeWNsZVxuICAgIC8vIDwtIGxpZmVjeWNsZSBmbGFnIGxhbmRzIGhlcmVcbiAgfSk7XG4gIGlmICghZm4ubmFtZSkge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShmbiwgXCJuYW1lXCIsIHsgdmFsdWU6IG5hbWUsIHdyaXRhYmxlOiBmYWxzZSB9KTtcbiAgfVxuICBSRURVQ0VSUy5wdXNoKGZuKTtcbn1cbnZhciBleGlzdGluZ1JlZHVjZXJzID0gLyogQF9fUFVSRV9fICovIG5ldyBTZXQoKTtcbnZhciBSRURVQ0VSUyA9IFtdO1xuZnVuY3Rpb24gcmVkdWNlcihuYW1lLCBwYXJhbXMsIGZuKSB7XG4gIHB1c2hSZWR1Y2VyKG5hbWUsIHBhcmFtcywgZm4pO1xufVxuZnVuY3Rpb24gaW5pdChuYW1lLCBwYXJhbXMsIGZuKSB7XG4gIHB1c2hSZWR1Y2VyKG5hbWUsIHBhcmFtcywgZm4sIGxpZmVjeWNsZV90eXBlX2RlZmF1bHQuSW5pdCk7XG59XG5mdW5jdGlvbiBjbGllbnRDb25uZWN0ZWQobmFtZSwgcGFyYW1zLCBmbikge1xuICBwdXNoUmVkdWNlcihuYW1lLCBwYXJhbXMsIGZuLCBsaWZlY3ljbGVfdHlwZV9kZWZhdWx0Lk9uQ29ubmVjdCk7XG59XG5mdW5jdGlvbiBjbGllbnREaXNjb25uZWN0ZWQobmFtZSwgcGFyYW1zLCBmbikge1xuICBwdXNoUmVkdWNlcihuYW1lLCBwYXJhbXMsIGZuLCBsaWZlY3ljbGVfdHlwZV9kZWZhdWx0Lk9uRGlzY29ubmVjdCk7XG59XG52YXIgUmVkdWNlcnMgPSBjbGFzcyB7XG4gIHJlZHVjZXJzVHlwZTtcbiAgY29uc3RydWN0b3IoaGFuZGxlcykge1xuICAgIHRoaXMucmVkdWNlcnNUeXBlID0gcmVkdWNlcnNUb1NjaGVtYShoYW5kbGVzKTtcbiAgfVxufTtcbmZ1bmN0aW9uIHJlZHVjZXJzVG9TY2hlbWEocmVkdWNlcnMyKSB7XG4gIGNvbnN0IG1hcHBlZCA9IHJlZHVjZXJzMi5tYXAoKHIpID0+IHtcbiAgICBjb25zdCBwYXJhbXNSb3cgPSByLnBhcmFtcy5yb3c7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5hbWU6IHIucmVkdWNlck5hbWUsXG4gICAgICAvLyBQcmVmZXIgdGhlIHNjaGVtYSdzIG93biBhY2Nlc3Nvck5hbWUgaWYgcHJlc2VudCBhdCBydW50aW1lOyBvdGhlcndpc2UgZGVyaXZlIGl0LlxuICAgICAgYWNjZXNzb3JOYW1lOiByLmFjY2Vzc29yTmFtZSxcbiAgICAgIHBhcmFtczogcGFyYW1zUm93LFxuICAgICAgcGFyYW1zVHlwZTogci5wYXJhbXNTcGFjZXRpbWVUeXBlXG4gICAgfTtcbiAgfSk7XG4gIGNvbnN0IHJlc3VsdCA9IHsgcmVkdWNlcnM6IG1hcHBlZCB9O1xuICByZXR1cm4gcmVzdWx0O1xufVxuZnVuY3Rpb24gcmVkdWNlcnMoLi4uYXJncykge1xuICBjb25zdCBoYW5kbGVzID0gYXJncy5sZW5ndGggPT09IDEgJiYgQXJyYXkuaXNBcnJheShhcmdzWzBdKSA/IGFyZ3NbMF0gOiBhcmdzO1xuICByZXR1cm4gbmV3IFJlZHVjZXJzKGhhbmRsZXMpO1xufVxuXG4vLyBzcmMvc2VydmVyL3F1ZXJ5LnRzXG52YXIgUXVlcnlCcmFuZCA9IFN5bWJvbChcIlF1ZXJ5QnJhbmRcIik7XG52YXIgaXNSb3dUeXBlZFF1ZXJ5ID0gKHZhbCkgPT4gISF2YWwgJiYgdHlwZW9mIHZhbCA9PT0gXCJvYmplY3RcIiAmJiBRdWVyeUJyYW5kIGluIHZhbDtcbmZ1bmN0aW9uIHRvU3FsKHEpIHtcbiAgcmV0dXJuIHEudG9TcWwoKTtcbn1cbnZhciBTZW1pam9pbkltcGwgPSBjbGFzcyBfU2VtaWpvaW5JbXBsIHtcbiAgY29uc3RydWN0b3Ioc291cmNlUXVlcnksIGZpbHRlclF1ZXJ5LCBqb2luQ29uZGl0aW9uKSB7XG4gICAgdGhpcy5zb3VyY2VRdWVyeSA9IHNvdXJjZVF1ZXJ5O1xuICAgIHRoaXMuZmlsdGVyUXVlcnkgPSBmaWx0ZXJRdWVyeTtcbiAgICB0aGlzLmpvaW5Db25kaXRpb24gPSBqb2luQ29uZGl0aW9uO1xuICAgIGlmIChzb3VyY2VRdWVyeS50YWJsZS5uYW1lID09PSBmaWx0ZXJRdWVyeS50YWJsZS5uYW1lKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3Qgc2VtaWpvaW4gYSB0YWJsZSB0byBpdHNlbGZcIik7XG4gICAgfVxuICB9XG4gIFtRdWVyeUJyYW5kXSA9IHRydWU7XG4gIHR5cGUgPSBcInNlbWlqb2luXCI7XG4gIGJ1aWxkKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIHdoZXJlKHByZWRpY2F0ZSkge1xuICAgIGNvbnN0IG5leHRTb3VyY2VRdWVyeSA9IHRoaXMuc291cmNlUXVlcnkud2hlcmUocHJlZGljYXRlKTtcbiAgICByZXR1cm4gbmV3IF9TZW1pam9pbkltcGwoXG4gICAgICBuZXh0U291cmNlUXVlcnksXG4gICAgICB0aGlzLmZpbHRlclF1ZXJ5LFxuICAgICAgdGhpcy5qb2luQ29uZGl0aW9uXG4gICAgKTtcbiAgfVxuICB0b1NxbCgpIHtcbiAgICBjb25zdCBsZWZ0ID0gdGhpcy5maWx0ZXJRdWVyeTtcbiAgICBjb25zdCByaWdodCA9IHRoaXMuc291cmNlUXVlcnk7XG4gICAgY29uc3QgbGVmdFRhYmxlID0gcXVvdGVJZGVudGlmaWVyKGxlZnQudGFibGUubmFtZSk7XG4gICAgY29uc3QgcmlnaHRUYWJsZSA9IHF1b3RlSWRlbnRpZmllcihyaWdodC50YWJsZS5uYW1lKTtcbiAgICBsZXQgc3FsID0gYFNFTEVDVCAke3JpZ2h0VGFibGV9LiogRlJPTSAke2xlZnRUYWJsZX0gSk9JTiAke3JpZ2h0VGFibGV9IE9OICR7Ym9vbGVhbkV4cHJUb1NxbCh0aGlzLmpvaW5Db25kaXRpb24pfWA7XG4gICAgY29uc3QgY2xhdXNlcyA9IFtdO1xuICAgIGlmIChsZWZ0LndoZXJlQ2xhdXNlKSB7XG4gICAgICBjbGF1c2VzLnB1c2goYm9vbGVhbkV4cHJUb1NxbChsZWZ0LndoZXJlQ2xhdXNlKSk7XG4gICAgfVxuICAgIGlmIChyaWdodC53aGVyZUNsYXVzZSkge1xuICAgICAgY2xhdXNlcy5wdXNoKGJvb2xlYW5FeHByVG9TcWwocmlnaHQud2hlcmVDbGF1c2UpKTtcbiAgICB9XG4gICAgaWYgKGNsYXVzZXMubGVuZ3RoID4gMCkge1xuICAgICAgY29uc3Qgd2hlcmVTcWwgPSBjbGF1c2VzLmxlbmd0aCA9PT0gMSA/IGNsYXVzZXNbMF0gOiBjbGF1c2VzLm1hcCh3cmFwSW5QYXJlbnMpLmpvaW4oXCIgQU5EIFwiKTtcbiAgICAgIHNxbCArPSBgIFdIRVJFICR7d2hlcmVTcWx9YDtcbiAgICB9XG4gICAgcmV0dXJuIHNxbDtcbiAgfVxufTtcbnZhciBGcm9tQnVpbGRlciA9IGNsYXNzIF9Gcm9tQnVpbGRlciB7XG4gIGNvbnN0cnVjdG9yKHRhYmxlMiwgd2hlcmVDbGF1c2UpIHtcbiAgICB0aGlzLnRhYmxlID0gdGFibGUyO1xuICAgIHRoaXMud2hlcmVDbGF1c2UgPSB3aGVyZUNsYXVzZTtcbiAgfVxuICBbUXVlcnlCcmFuZF0gPSB0cnVlO1xuICB3aGVyZShwcmVkaWNhdGUpIHtcbiAgICBjb25zdCBuZXdDb25kaXRpb24gPSBwcmVkaWNhdGUodGhpcy50YWJsZS5jb2xzKTtcbiAgICBjb25zdCBuZXh0V2hlcmUgPSB0aGlzLndoZXJlQ2xhdXNlID8gYW5kKHRoaXMud2hlcmVDbGF1c2UsIG5ld0NvbmRpdGlvbikgOiBuZXdDb25kaXRpb247XG4gICAgcmV0dXJuIG5ldyBfRnJvbUJ1aWxkZXIodGhpcy50YWJsZSwgbmV4dFdoZXJlKTtcbiAgfVxuICByaWdodFNlbWlqb2luKHJpZ2h0LCBvbikge1xuICAgIGNvbnN0IHNvdXJjZVF1ZXJ5ID0gbmV3IF9Gcm9tQnVpbGRlcihyaWdodCk7XG4gICAgY29uc3Qgam9pbkNvbmRpdGlvbiA9IG9uKFxuICAgICAgdGhpcy50YWJsZS5pbmRleGVkQ29scyxcbiAgICAgIHJpZ2h0LmluZGV4ZWRDb2xzXG4gICAgKTtcbiAgICByZXR1cm4gbmV3IFNlbWlqb2luSW1wbChzb3VyY2VRdWVyeSwgdGhpcywgam9pbkNvbmRpdGlvbik7XG4gIH1cbiAgbGVmdFNlbWlqb2luKHJpZ2h0LCBvbikge1xuICAgIGNvbnN0IGZpbHRlclF1ZXJ5ID0gbmV3IF9Gcm9tQnVpbGRlcihyaWdodCk7XG4gICAgY29uc3Qgam9pbkNvbmRpdGlvbiA9IG9uKFxuICAgICAgdGhpcy50YWJsZS5pbmRleGVkQ29scyxcbiAgICAgIHJpZ2h0LmluZGV4ZWRDb2xzXG4gICAgKTtcbiAgICByZXR1cm4gbmV3IFNlbWlqb2luSW1wbCh0aGlzLCBmaWx0ZXJRdWVyeSwgam9pbkNvbmRpdGlvbik7XG4gIH1cbiAgdG9TcWwoKSB7XG4gICAgcmV0dXJuIHJlbmRlclNlbGVjdFNxbFdpdGhKb2lucyh0aGlzLnRhYmxlLCB0aGlzLndoZXJlQ2xhdXNlKTtcbiAgfVxuICBidWlsZCgpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxufTtcbnZhciBUYWJsZVJlZkltcGwgPSBjbGFzcyB7XG4gIHR5cGUgPSBcInRhYmxlXCI7XG4gIG5hbWU7XG4gIGNvbHM7XG4gIGluZGV4ZWRDb2xzO1xuICB0YWJsZURlZjtcbiAgY29uc3RydWN0b3IodGFibGVEZWYpIHtcbiAgICB0aGlzLm5hbWUgPSB0YWJsZURlZi5uYW1lO1xuICAgIHRoaXMuY29scyA9IGNyZWF0ZVJvd0V4cHIodGFibGVEZWYpO1xuICAgIHRoaXMuaW5kZXhlZENvbHMgPSB0aGlzLmNvbHM7XG4gICAgdGhpcy50YWJsZURlZiA9IHRhYmxlRGVmO1xuICAgIE9iamVjdC5mcmVlemUodGhpcyk7XG4gIH1cbiAgYXNGcm9tKCkge1xuICAgIHJldHVybiBuZXcgRnJvbUJ1aWxkZXIodGhpcyk7XG4gIH1cbiAgcmlnaHRTZW1pam9pbihvdGhlciwgb24pIHtcbiAgICByZXR1cm4gdGhpcy5hc0Zyb20oKS5yaWdodFNlbWlqb2luKG90aGVyLCBvbik7XG4gIH1cbiAgbGVmdFNlbWlqb2luKG90aGVyLCBvbikge1xuICAgIHJldHVybiB0aGlzLmFzRnJvbSgpLmxlZnRTZW1pam9pbihvdGhlciwgb24pO1xuICB9XG4gIGJ1aWxkKCkge1xuICAgIHJldHVybiB0aGlzLmFzRnJvbSgpLmJ1aWxkKCk7XG4gIH1cbiAgdG9TcWwoKSB7XG4gICAgcmV0dXJuIHRoaXMuYXNGcm9tKCkudG9TcWwoKTtcbiAgfVxuICB3aGVyZShwcmVkaWNhdGUpIHtcbiAgICByZXR1cm4gdGhpcy5hc0Zyb20oKS53aGVyZShwcmVkaWNhdGUpO1xuICB9XG59O1xuZnVuY3Rpb24gY3JlYXRlVGFibGVSZWZGcm9tRGVmKHRhYmxlRGVmKSB7XG4gIHJldHVybiBuZXcgVGFibGVSZWZJbXBsKHRhYmxlRGVmKTtcbn1cbmZ1bmN0aW9uIG1ha2VRdWVyeUJ1aWxkZXIoc2NoZW1hMikge1xuICBjb25zdCBxYiA9IC8qIEBfX1BVUkVfXyAqLyBPYmplY3QuY3JlYXRlKG51bGwpO1xuICBmb3IgKGNvbnN0IHRhYmxlMiBvZiBzY2hlbWEyLnRhYmxlcykge1xuICAgIGNvbnN0IHJlZiA9IGNyZWF0ZVRhYmxlUmVmRnJvbURlZihcbiAgICAgIHRhYmxlMlxuICAgICk7XG4gICAgcWJbdGFibGUyLm5hbWVdID0gcmVmO1xuICB9XG4gIHJldHVybiBPYmplY3QuZnJlZXplKHFiKTtcbn1cbmZ1bmN0aW9uIGNyZWF0ZVJvd0V4cHIodGFibGVEZWYpIHtcbiAgY29uc3Qgcm93ID0ge307XG4gIGZvciAoY29uc3QgY29sdW1uTmFtZSBvZiBPYmplY3Qua2V5cyh0YWJsZURlZi5jb2x1bW5zKSkge1xuICAgIGNvbnN0IGNvbHVtbkJ1aWxkZXIgPSB0YWJsZURlZi5jb2x1bW5zW2NvbHVtbk5hbWVdO1xuICAgIGNvbnN0IGNvbHVtbiA9IG5ldyBDb2x1bW5FeHByZXNzaW9uKFxuICAgICAgdGFibGVEZWYubmFtZSxcbiAgICAgIGNvbHVtbk5hbWUsXG4gICAgICBjb2x1bW5CdWlsZGVyLnR5cGVCdWlsZGVyLmFsZ2VicmFpY1R5cGVcbiAgICApO1xuICAgIHJvd1tjb2x1bW5OYW1lXSA9IE9iamVjdC5mcmVlemUoY29sdW1uKTtcbiAgfVxuICByZXR1cm4gT2JqZWN0LmZyZWV6ZShyb3cpO1xufVxuZnVuY3Rpb24gcmVuZGVyU2VsZWN0U3FsV2l0aEpvaW5zKHRhYmxlMiwgd2hlcmUsIGV4dHJhQ2xhdXNlcyA9IFtdKSB7XG4gIGNvbnN0IHF1b3RlZFRhYmxlID0gcXVvdGVJZGVudGlmaWVyKHRhYmxlMi5uYW1lKTtcbiAgY29uc3Qgc3FsID0gYFNFTEVDVCAqIEZST00gJHtxdW90ZWRUYWJsZX1gO1xuICBjb25zdCBjbGF1c2VzID0gW107XG4gIGlmICh3aGVyZSkgY2xhdXNlcy5wdXNoKGJvb2xlYW5FeHByVG9TcWwod2hlcmUpKTtcbiAgY2xhdXNlcy5wdXNoKC4uLmV4dHJhQ2xhdXNlcyk7XG4gIGlmIChjbGF1c2VzLmxlbmd0aCA9PT0gMCkgcmV0dXJuIHNxbDtcbiAgY29uc3Qgd2hlcmVTcWwgPSBjbGF1c2VzLmxlbmd0aCA9PT0gMSA/IGNsYXVzZXNbMF0gOiBjbGF1c2VzLm1hcCh3cmFwSW5QYXJlbnMpLmpvaW4oXCIgQU5EIFwiKTtcbiAgcmV0dXJuIGAke3NxbH0gV0hFUkUgJHt3aGVyZVNxbH1gO1xufVxudmFyIENvbHVtbkV4cHJlc3Npb24gPSBjbGFzcyB7XG4gIHR5cGUgPSBcImNvbHVtblwiO1xuICBjb2x1bW47XG4gIHRhYmxlO1xuICAvLyBwaGFudG9tOiBhY3R1YWwgcnVudGltZSB2YWx1ZSBpcyB1bmRlZmluZWRcbiAgdHNWYWx1ZVR5cGU7XG4gIHNwYWNldGltZVR5cGU7XG4gIGNvbnN0cnVjdG9yKHRhYmxlMiwgY29sdW1uLCBzcGFjZXRpbWVUeXBlKSB7XG4gICAgdGhpcy50YWJsZSA9IHRhYmxlMjtcbiAgICB0aGlzLmNvbHVtbiA9IGNvbHVtbjtcbiAgICB0aGlzLnNwYWNldGltZVR5cGUgPSBzcGFjZXRpbWVUeXBlO1xuICB9XG4gIC8vIFRoZXNlIHR5cGVzIGNvdWxkIGJlIHRpZ2h0ZWQsIGJ1dCBzaW5jZSB3ZSBkZWNsYXJlIHRoZSBvdmVybG9hZHMgYWJvdmUsIGl0IGRvZXNuJ3Qgd2Vha2VuIHRoZSBBUEkgc3VyZmFjZS5cbiAgZXEoeCkge1xuICAgIHJldHVybiB7XG4gICAgICB0eXBlOiBcImVxXCIsXG4gICAgICBsZWZ0OiB0aGlzLFxuICAgICAgcmlnaHQ6IG5vcm1hbGl6ZVZhbHVlKHgpXG4gICAgfTtcbiAgfVxuICAvLyBUaGVzZSB0eXBlcyBjb3VsZCBiZSB0aWdodGVkLCBidXQgc2luY2Ugd2UgZGVjbGFyZSB0aGUgb3ZlcmxvYWRzIGFib3ZlLCBpdCBkb2Vzbid0IHdlYWtlbiB0aGUgQVBJIHN1cmZhY2UuXG4gIGx0KHgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdHlwZTogXCJsdFwiLFxuICAgICAgbGVmdDogdGhpcyxcbiAgICAgIHJpZ2h0OiBub3JtYWxpemVWYWx1ZSh4KVxuICAgIH07XG4gIH1cbiAgLy8gVGhlc2UgdHlwZXMgY291bGQgYmUgdGlnaHRlZCwgYnV0IHNpbmNlIHdlIGRlY2xhcmUgdGhlIG92ZXJsb2FkcyBhYm92ZSwgaXQgZG9lc24ndCB3ZWFrZW4gdGhlIEFQSSBzdXJmYWNlLlxuICBsdGUoeCkge1xuICAgIHJldHVybiB7XG4gICAgICB0eXBlOiBcImx0ZVwiLFxuICAgICAgbGVmdDogdGhpcyxcbiAgICAgIHJpZ2h0OiBub3JtYWxpemVWYWx1ZSh4KVxuICAgIH07XG4gIH1cbiAgLy8gVGhlc2UgdHlwZXMgY291bGQgYmUgdGlnaHRlZCwgYnV0IHNpbmNlIHdlIGRlY2xhcmUgdGhlIG92ZXJsb2FkcyBhYm92ZSwgaXQgZG9lc24ndCB3ZWFrZW4gdGhlIEFQSSBzdXJmYWNlLlxuICBndCh4KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHR5cGU6IFwiZ3RcIixcbiAgICAgIGxlZnQ6IHRoaXMsXG4gICAgICByaWdodDogbm9ybWFsaXplVmFsdWUoeClcbiAgICB9O1xuICB9XG4gIC8vIFRoZXNlIHR5cGVzIGNvdWxkIGJlIHRpZ2h0ZWQsIGJ1dCBzaW5jZSB3ZSBkZWNsYXJlIHRoZSBvdmVybG9hZHMgYWJvdmUsIGl0IGRvZXNuJ3Qgd2Vha2VuIHRoZSBBUEkgc3VyZmFjZS5cbiAgZ3RlKHgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdHlwZTogXCJndGVcIixcbiAgICAgIGxlZnQ6IHRoaXMsXG4gICAgICByaWdodDogbm9ybWFsaXplVmFsdWUoeClcbiAgICB9O1xuICB9XG59O1xuZnVuY3Rpb24gbGl0ZXJhbCh2YWx1ZSkge1xuICByZXR1cm4geyB0eXBlOiBcImxpdGVyYWxcIiwgdmFsdWUgfTtcbn1cbmZ1bmN0aW9uIG5vcm1hbGl6ZVZhbHVlKHZhbCkge1xuICBpZiAodmFsLnR5cGUgPT09IFwibGl0ZXJhbFwiKVxuICAgIHJldHVybiB2YWw7XG4gIGlmICh0eXBlb2YgdmFsID09PSBcIm9iamVjdFwiICYmIHZhbCAhPSBudWxsICYmIFwidHlwZVwiIGluIHZhbCAmJiB2YWwudHlwZSA9PT0gXCJjb2x1bW5cIikge1xuICAgIHJldHVybiB2YWw7XG4gIH1cbiAgcmV0dXJuIGxpdGVyYWwodmFsKTtcbn1cbmZ1bmN0aW9uIG5vdChjbGF1c2UpIHtcbiAgcmV0dXJuIHsgdHlwZTogXCJub3RcIiwgY2xhdXNlIH07XG59XG5mdW5jdGlvbiBhbmQoLi4uY2xhdXNlcykge1xuICByZXR1cm4geyB0eXBlOiBcImFuZFwiLCBjbGF1c2VzIH07XG59XG5mdW5jdGlvbiBvciguLi5jbGF1c2VzKSB7XG4gIHJldHVybiB7IHR5cGU6IFwib3JcIiwgY2xhdXNlcyB9O1xufVxuZnVuY3Rpb24gYm9vbGVhbkV4cHJUb1NxbChleHByLCB0YWJsZUFsaWFzKSB7XG4gIHN3aXRjaCAoZXhwci50eXBlKSB7XG4gICAgY2FzZSBcImVxXCI6XG4gICAgICByZXR1cm4gYCR7dmFsdWVFeHByVG9TcWwoZXhwci5sZWZ0KX0gPSAke3ZhbHVlRXhwclRvU3FsKGV4cHIucmlnaHQpfWA7XG4gICAgY2FzZSBcIm5lXCI6XG4gICAgICByZXR1cm4gYCR7dmFsdWVFeHByVG9TcWwoZXhwci5sZWZ0KX0gPD4gJHt2YWx1ZUV4cHJUb1NxbChleHByLnJpZ2h0KX1gO1xuICAgIGNhc2UgXCJndFwiOlxuICAgICAgcmV0dXJuIGAke3ZhbHVlRXhwclRvU3FsKGV4cHIubGVmdCl9ID4gJHt2YWx1ZUV4cHJUb1NxbChleHByLnJpZ2h0KX1gO1xuICAgIGNhc2UgXCJndGVcIjpcbiAgICAgIHJldHVybiBgJHt2YWx1ZUV4cHJUb1NxbChleHByLmxlZnQpfSA+PSAke3ZhbHVlRXhwclRvU3FsKGV4cHIucmlnaHQpfWA7XG4gICAgY2FzZSBcImx0XCI6XG4gICAgICByZXR1cm4gYCR7dmFsdWVFeHByVG9TcWwoZXhwci5sZWZ0KX0gPCAke3ZhbHVlRXhwclRvU3FsKGV4cHIucmlnaHQpfWA7XG4gICAgY2FzZSBcImx0ZVwiOlxuICAgICAgcmV0dXJuIGAke3ZhbHVlRXhwclRvU3FsKGV4cHIubGVmdCl9IDw9ICR7dmFsdWVFeHByVG9TcWwoZXhwci5yaWdodCl9YDtcbiAgICBjYXNlIFwiYW5kXCI6XG4gICAgICByZXR1cm4gZXhwci5jbGF1c2VzLm1hcCgoYykgPT4gYm9vbGVhbkV4cHJUb1NxbChjKSkubWFwKHdyYXBJblBhcmVucykuam9pbihcIiBBTkQgXCIpO1xuICAgIGNhc2UgXCJvclwiOlxuICAgICAgcmV0dXJuIGV4cHIuY2xhdXNlcy5tYXAoKGMpID0+IGJvb2xlYW5FeHByVG9TcWwoYykpLm1hcCh3cmFwSW5QYXJlbnMpLmpvaW4oXCIgT1IgXCIpO1xuICAgIGNhc2UgXCJub3RcIjpcbiAgICAgIHJldHVybiBgTk9UICR7d3JhcEluUGFyZW5zKGJvb2xlYW5FeHByVG9TcWwoZXhwci5jbGF1c2UpKX1gO1xuICB9XG59XG5mdW5jdGlvbiB3cmFwSW5QYXJlbnMoc3FsKSB7XG4gIHJldHVybiBgKCR7c3FsfSlgO1xufVxuZnVuY3Rpb24gdmFsdWVFeHByVG9TcWwoZXhwciwgdGFibGVBbGlhcykge1xuICBpZiAoaXNMaXRlcmFsRXhwcihleHByKSkge1xuICAgIHJldHVybiBsaXRlcmFsVmFsdWVUb1NxbChleHByLnZhbHVlKTtcbiAgfVxuICBjb25zdCB0YWJsZTIgPSBleHByLnRhYmxlO1xuICByZXR1cm4gYCR7cXVvdGVJZGVudGlmaWVyKHRhYmxlMil9LiR7cXVvdGVJZGVudGlmaWVyKGV4cHIuY29sdW1uKX1gO1xufVxuZnVuY3Rpb24gbGl0ZXJhbFZhbHVlVG9TcWwodmFsdWUpIHtcbiAgaWYgKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB2b2lkIDApIHtcbiAgICByZXR1cm4gXCJOVUxMXCI7XG4gIH1cbiAgaWYgKHZhbHVlIGluc3RhbmNlb2YgSWRlbnRpdHkgfHwgdmFsdWUgaW5zdGFuY2VvZiBDb25uZWN0aW9uSWQpIHtcbiAgICByZXR1cm4gYDB4JHt2YWx1ZS50b0hleFN0cmluZygpfWA7XG4gIH1cbiAgc3dpdGNoICh0eXBlb2YgdmFsdWUpIHtcbiAgICBjYXNlIFwibnVtYmVyXCI6XG4gICAgY2FzZSBcImJpZ2ludFwiOlxuICAgICAgcmV0dXJuIFN0cmluZyh2YWx1ZSk7XG4gICAgY2FzZSBcImJvb2xlYW5cIjpcbiAgICAgIHJldHVybiB2YWx1ZSA/IFwiVFJVRVwiIDogXCJGQUxTRVwiO1xuICAgIGNhc2UgXCJzdHJpbmdcIjpcbiAgICAgIHJldHVybiBgJyR7dmFsdWUucmVwbGFjZSgvJy9nLCBcIicnXCIpfSdgO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gYCcke0pTT04uc3RyaW5naWZ5KHZhbHVlKS5yZXBsYWNlKC8nL2csIFwiJydcIil9J2A7XG4gIH1cbn1cbmZ1bmN0aW9uIHF1b3RlSWRlbnRpZmllcihuYW1lKSB7XG4gIHJldHVybiBgXCIke25hbWUucmVwbGFjZSgvXCIvZywgJ1wiXCInKX1cImA7XG59XG5mdW5jdGlvbiBpc0xpdGVyYWxFeHByKGV4cHIpIHtcbiAgcmV0dXJuIGV4cHIudHlwZSA9PT0gXCJsaXRlcmFsXCI7XG59XG5cbi8vIHNyYy9saWIvdmlld3MudHNcbmZ1bmN0aW9uIGRlZmluZVZpZXcob3B0cywgYW5vbiwgcGFyYW1zLCByZXQsIGZuKSB7XG4gIGNvbnN0IHBhcmFtc0J1aWxkZXIgPSBuZXcgUm93QnVpbGRlcihwYXJhbXMsIHRvUGFzY2FsQ2FzZShvcHRzLm5hbWUpKTtcbiAgbGV0IHJldHVyblR5cGUgPSByZWdpc3RlclR5cGVzUmVjdXJzaXZlbHkocmV0KS5hbGdlYnJhaWNUeXBlO1xuICBjb25zdCB7IHZhbHVlOiBwYXJhbVR5cGUgfSA9IHJlc29sdmVUeXBlKFxuICAgIE1PRFVMRV9ERUYudHlwZXNwYWNlLFxuICAgIHJlZ2lzdGVyVHlwZXNSZWN1cnNpdmVseShwYXJhbXNCdWlsZGVyKVxuICApO1xuICBNT0RVTEVfREVGLm1pc2NFeHBvcnRzLnB1c2goe1xuICAgIHRhZzogXCJWaWV3XCIsXG4gICAgdmFsdWU6IHtcbiAgICAgIG5hbWU6IG9wdHMubmFtZSxcbiAgICAgIGluZGV4OiAoYW5vbiA/IEFOT05fVklFV1MgOiBWSUVXUykubGVuZ3RoLFxuICAgICAgaXNQdWJsaWM6IG9wdHMucHVibGljLFxuICAgICAgaXNBbm9ueW1vdXM6IGFub24sXG4gICAgICBwYXJhbXM6IHBhcmFtVHlwZSxcbiAgICAgIHJldHVyblR5cGVcbiAgICB9XG4gIH0pO1xuICBpZiAocmV0dXJuVHlwZS50YWcgPT0gXCJTdW1cIikge1xuICAgIGNvbnN0IG9yaWdpbmFsRm4gPSBmbjtcbiAgICBmbiA9ICgoY3R4LCBhcmdzKSA9PiB7XG4gICAgICBjb25zdCByZXQyID0gb3JpZ2luYWxGbihjdHgsIGFyZ3MpO1xuICAgICAgcmV0dXJuIHJldDIgPT0gbnVsbCA/IFtdIDogW3JldDJdO1xuICAgIH0pO1xuICAgIHJldHVyblR5cGUgPSBBbGdlYnJhaWNUeXBlLkFycmF5KFxuICAgICAgcmV0dXJuVHlwZS52YWx1ZS52YXJpYW50c1swXS5hbGdlYnJhaWNUeXBlXG4gICAgKTtcbiAgfVxuICAoYW5vbiA/IEFOT05fVklFV1MgOiBWSUVXUykucHVzaCh7XG4gICAgZm4sXG4gICAgcGFyYW1zOiBwYXJhbVR5cGUsXG4gICAgcmV0dXJuVHlwZSxcbiAgICByZXR1cm5UeXBlQmFzZVNpemU6IGJzYXRuQmFzZVNpemUoTU9EVUxFX0RFRi50eXBlc3BhY2UsIHJldHVyblR5cGUpXG4gIH0pO1xufVxudmFyIFZJRVdTID0gW107XG52YXIgQU5PTl9WSUVXUyA9IFtdO1xuXG4vLyBzcmMvbGliL3Byb2NlZHVyZXMudHNcbmZ1bmN0aW9uIHByb2NlZHVyZShuYW1lLCBwYXJhbXMsIHJldCwgZm4pIHtcbiAgY29uc3QgcGFyYW1zVHlwZSA9IHtcbiAgICBlbGVtZW50czogT2JqZWN0LmVudHJpZXMocGFyYW1zKS5tYXAoKFtuLCBjXSkgPT4gKHtcbiAgICAgIG5hbWU6IG4sXG4gICAgICBhbGdlYnJhaWNUeXBlOiByZWdpc3RlclR5cGVzUmVjdXJzaXZlbHkoXG4gICAgICAgIFwidHlwZUJ1aWxkZXJcIiBpbiBjID8gYy50eXBlQnVpbGRlciA6IGNcbiAgICAgICkuYWxnZWJyYWljVHlwZVxuICAgIH0pKVxuICB9O1xuICBjb25zdCByZXR1cm5UeXBlID0gcmVnaXN0ZXJUeXBlc1JlY3Vyc2l2ZWx5KHJldCkuYWxnZWJyYWljVHlwZTtcbiAgTU9EVUxFX0RFRi5taXNjRXhwb3J0cy5wdXNoKHtcbiAgICB0YWc6IFwiUHJvY2VkdXJlXCIsXG4gICAgdmFsdWU6IHtcbiAgICAgIG5hbWUsXG4gICAgICBwYXJhbXM6IHBhcmFtc1R5cGUsXG4gICAgICByZXR1cm5UeXBlXG4gICAgfVxuICB9KTtcbiAgUFJPQ0VEVVJFUy5wdXNoKHtcbiAgICBmbixcbiAgICBwYXJhbXNUeXBlLFxuICAgIHJldHVyblR5cGUsXG4gICAgcmV0dXJuVHlwZUJhc2VTaXplOiBic2F0bkJhc2VTaXplKE1PRFVMRV9ERUYudHlwZXNwYWNlLCByZXR1cm5UeXBlKVxuICB9KTtcbn1cbnZhciBQUk9DRURVUkVTID0gW107XG5cbi8vIHNyYy9saWIvc2NoZW1hLnRzXG52YXIgUkVHSVNURVJFRF9TQ0hFTUEgPSBudWxsO1xuZnVuY3Rpb24gZ2V0UmVnaXN0ZXJlZFNjaGVtYSgpIHtcbiAgaWYgKFJFR0lTVEVSRURfU0NIRU1BID09IG51bGwpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJTY2hlbWEgaGFzIG5vdCBiZWVuIHJlZ2lzdGVyZWQgeWV0LiBDYWxsIHNjaGVtYSgpIGZpcnN0LlwiKTtcbiAgfVxuICByZXR1cm4gUkVHSVNURVJFRF9TQ0hFTUE7XG59XG5mdW5jdGlvbiB0YWJsZXNUb1NjaGVtYSh0YWJsZXMpIHtcbiAgcmV0dXJuIHsgdGFibGVzOiB0YWJsZXMubWFwKHRhYmxlVG9TY2hlbWEpIH07XG59XG5mdW5jdGlvbiB0YWJsZVRvU2NoZW1hKHNjaGVtYTIpIHtcbiAgY29uc3QgZ2V0Q29sTmFtZSA9IChpKSA9PiBzY2hlbWEyLnJvd1R5cGUuYWxnZWJyYWljVHlwZS52YWx1ZS5lbGVtZW50c1tpXS5uYW1lO1xuICByZXR1cm4ge1xuICAgIG5hbWU6IHNjaGVtYTIudGFibGVOYW1lLFxuICAgIGFjY2Vzc29yTmFtZTogdG9DYW1lbENhc2Uoc2NoZW1hMi50YWJsZU5hbWUpLFxuICAgIGNvbHVtbnM6IHNjaGVtYTIucm93VHlwZS5yb3csXG4gICAgLy8gdHlwZWQgYXMgVFtpXVsncm93VHlwZSddWydyb3cnXSB1bmRlciBUYWJsZXNUb1NjaGVtYTxUPlxuICAgIHJvd1R5cGU6IHNjaGVtYTIucm93U3BhY2V0aW1lVHlwZSxcbiAgICBjb25zdHJhaW50czogc2NoZW1hMi50YWJsZURlZi5jb25zdHJhaW50cy5tYXAoKGMpID0+ICh7XG4gICAgICBuYW1lOiBjLm5hbWUsXG4gICAgICBjb25zdHJhaW50OiBcInVuaXF1ZVwiLFxuICAgICAgY29sdW1uczogYy5kYXRhLnZhbHVlLmNvbHVtbnMubWFwKGdldENvbE5hbWUpXG4gICAgfSkpLFxuICAgIC8vIFRPRE86IGhvcnJpYmxlIGhvcnJpYmxlIGhvcnJpYmxlLiB3ZSBzbXVnZ2xlIHRoaXMgYEFycmF5PFVudHlwZWRJbmRleD5gXG4gICAgLy8gYnkgY2FzdGluZyBpdCB0byBhbiBgQXJyYXk8SW5kZXhPcHRzPmAgYXMgYFRhYmxlVG9TY2hlbWFgIGV4cGVjdHMuXG4gICAgLy8gVGhpcyBpcyB0aGVuIHVzZWQgaW4gYFRhYmxlQ2FjaGVJbXBsLmNvbnN0cnVjdG9yYCBhbmQgd2hvIGtub3dzIHdoZXJlIGVsc2UuXG4gICAgLy8gV2Ugc2hvdWxkIHN0b3AgbHlpbmcgYWJvdXQgb3VyIHR5cGVzLlxuICAgIGluZGV4ZXM6IHNjaGVtYTIudGFibGVEZWYuaW5kZXhlcy5tYXAoKGlkeCkgPT4ge1xuICAgICAgY29uc3QgY29sdW1uSWRzID0gaWR4LmFsZ29yaXRobS50YWcgPT09IFwiRGlyZWN0XCIgPyBbaWR4LmFsZ29yaXRobS52YWx1ZV0gOiBpZHguYWxnb3JpdGhtLnZhbHVlO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbmFtZTogaWR4LmFjY2Vzc29yTmFtZSxcbiAgICAgICAgdW5pcXVlOiBzY2hlbWEyLnRhYmxlRGVmLmNvbnN0cmFpbnRzLnNvbWUoXG4gICAgICAgICAgKGMpID0+IGMuZGF0YS52YWx1ZS5jb2x1bW5zLmV2ZXJ5KChjb2wpID0+IGNvbHVtbklkcy5pbmNsdWRlcyhjb2wpKVxuICAgICAgICApLFxuICAgICAgICBhbGdvcml0aG06IGlkeC5hbGdvcml0aG0udGFnLnRvTG93ZXJDYXNlKCksXG4gICAgICAgIGNvbHVtbnM6IGNvbHVtbklkcy5tYXAoZ2V0Q29sTmFtZSlcbiAgICAgIH07XG4gICAgfSlcbiAgfTtcbn1cbnZhciBNT0RVTEVfREVGID0ge1xuICB0eXBlc3BhY2U6IHsgdHlwZXM6IFtdIH0sXG4gIHRhYmxlczogW10sXG4gIHJlZHVjZXJzOiBbXSxcbiAgdHlwZXM6IFtdLFxuICBtaXNjRXhwb3J0czogW10sXG4gIHJvd0xldmVsU2VjdXJpdHk6IFtdXG59O1xudmFyIENPTVBPVU5EX1RZUEVTID0gLyogQF9fUFVSRV9fICovIG5ldyBNYXAoKTtcbmZ1bmN0aW9uIHJlc29sdmVUeXBlKHR5cGVzcGFjZSwgdHlwZUJ1aWxkZXIpIHtcbiAgbGV0IHR5ID0gdHlwZUJ1aWxkZXIuYWxnZWJyYWljVHlwZTtcbiAgd2hpbGUgKHR5LnRhZyA9PT0gXCJSZWZcIikge1xuICAgIHR5ID0gdHlwZXNwYWNlLnR5cGVzW3R5LnZhbHVlXTtcbiAgfVxuICByZXR1cm4gdHk7XG59XG5mdW5jdGlvbiByZWdpc3RlclR5cGVzUmVjdXJzaXZlbHkodHlwZUJ1aWxkZXIpIHtcbiAgaWYgKHR5cGVCdWlsZGVyIGluc3RhbmNlb2YgUHJvZHVjdEJ1aWxkZXIgJiYgIWlzVW5pdCh0eXBlQnVpbGRlcikgfHwgdHlwZUJ1aWxkZXIgaW5zdGFuY2VvZiBTdW1CdWlsZGVyIHx8IHR5cGVCdWlsZGVyIGluc3RhbmNlb2YgUm93QnVpbGRlcikge1xuICAgIHJldHVybiByZWdpc3RlckNvbXBvdW5kVHlwZVJlY3Vyc2l2ZWx5KHR5cGVCdWlsZGVyKTtcbiAgfSBlbHNlIGlmICh0eXBlQnVpbGRlciBpbnN0YW5jZW9mIE9wdGlvbkJ1aWxkZXIpIHtcbiAgICByZXR1cm4gbmV3IE9wdGlvbkJ1aWxkZXIoXG4gICAgICByZWdpc3RlclR5cGVzUmVjdXJzaXZlbHkodHlwZUJ1aWxkZXIudmFsdWUpXG4gICAgKTtcbiAgfSBlbHNlIGlmICh0eXBlQnVpbGRlciBpbnN0YW5jZW9mIFJlc3VsdEJ1aWxkZXIpIHtcbiAgICByZXR1cm4gbmV3IFJlc3VsdEJ1aWxkZXIoXG4gICAgICByZWdpc3RlclR5cGVzUmVjdXJzaXZlbHkodHlwZUJ1aWxkZXIub2spLFxuICAgICAgcmVnaXN0ZXJUeXBlc1JlY3Vyc2l2ZWx5KHR5cGVCdWlsZGVyLmVycilcbiAgICApO1xuICB9IGVsc2UgaWYgKHR5cGVCdWlsZGVyIGluc3RhbmNlb2YgQXJyYXlCdWlsZGVyKSB7XG4gICAgcmV0dXJuIG5ldyBBcnJheUJ1aWxkZXIoXG4gICAgICByZWdpc3RlclR5cGVzUmVjdXJzaXZlbHkodHlwZUJ1aWxkZXIuZWxlbWVudClcbiAgICApO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB0eXBlQnVpbGRlcjtcbiAgfVxufVxuZnVuY3Rpb24gcmVnaXN0ZXJDb21wb3VuZFR5cGVSZWN1cnNpdmVseSh0eXBlQnVpbGRlcikge1xuICBjb25zdCB0eSA9IHR5cGVCdWlsZGVyLmFsZ2VicmFpY1R5cGU7XG4gIGNvbnN0IG5hbWUgPSB0eXBlQnVpbGRlci50eXBlTmFtZTtcbiAgaWYgKG5hbWUgPT09IHZvaWQgMCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgIGBNaXNzaW5nIHR5cGUgbmFtZSBmb3IgJHt0eXBlQnVpbGRlci5jb25zdHJ1Y3Rvci5uYW1lID8/IFwiVHlwZUJ1aWxkZXJcIn0gJHtKU09OLnN0cmluZ2lmeSh0eXBlQnVpbGRlcil9YFxuICAgICk7XG4gIH1cbiAgbGV0IHIgPSBDT01QT1VORF9UWVBFUy5nZXQodHkpO1xuICBpZiAociAhPSBudWxsKSB7XG4gICAgcmV0dXJuIHI7XG4gIH1cbiAgY29uc3QgbmV3VHkgPSB0eXBlQnVpbGRlciBpbnN0YW5jZW9mIFJvd0J1aWxkZXIgfHwgdHlwZUJ1aWxkZXIgaW5zdGFuY2VvZiBQcm9kdWN0QnVpbGRlciA/IHtcbiAgICB0YWc6IFwiUHJvZHVjdFwiLFxuICAgIHZhbHVlOiB7IGVsZW1lbnRzOiBbXSB9XG4gIH0gOiB7IHRhZzogXCJTdW1cIiwgdmFsdWU6IHsgdmFyaWFudHM6IFtdIH0gfTtcbiAgciA9IG5ldyBSZWZCdWlsZGVyKE1PRFVMRV9ERUYudHlwZXNwYWNlLnR5cGVzLmxlbmd0aCk7XG4gIE1PRFVMRV9ERUYudHlwZXNwYWNlLnR5cGVzLnB1c2gobmV3VHkpO1xuICBDT01QT1VORF9UWVBFUy5zZXQodHksIHIpO1xuICBpZiAodHlwZUJ1aWxkZXIgaW5zdGFuY2VvZiBSb3dCdWlsZGVyKSB7XG4gICAgZm9yIChjb25zdCBbbmFtZTIsIGVsZW1dIG9mIE9iamVjdC5lbnRyaWVzKHR5cGVCdWlsZGVyLnJvdykpIHtcbiAgICAgIG5ld1R5LnZhbHVlLmVsZW1lbnRzLnB1c2goe1xuICAgICAgICBuYW1lOiBuYW1lMixcbiAgICAgICAgYWxnZWJyYWljVHlwZTogcmVnaXN0ZXJUeXBlc1JlY3Vyc2l2ZWx5KGVsZW0udHlwZUJ1aWxkZXIpLmFsZ2VicmFpY1R5cGVcbiAgICAgIH0pO1xuICAgIH1cbiAgfSBlbHNlIGlmICh0eXBlQnVpbGRlciBpbnN0YW5jZW9mIFByb2R1Y3RCdWlsZGVyKSB7XG4gICAgZm9yIChjb25zdCBbbmFtZTIsIGVsZW1dIG9mIE9iamVjdC5lbnRyaWVzKHR5cGVCdWlsZGVyLmVsZW1lbnRzKSkge1xuICAgICAgbmV3VHkudmFsdWUuZWxlbWVudHMucHVzaCh7XG4gICAgICAgIG5hbWU6IG5hbWUyLFxuICAgICAgICBhbGdlYnJhaWNUeXBlOiByZWdpc3RlclR5cGVzUmVjdXJzaXZlbHkoZWxlbSkuYWxnZWJyYWljVHlwZVxuICAgICAgfSk7XG4gICAgfVxuICB9IGVsc2UgaWYgKHR5cGVCdWlsZGVyIGluc3RhbmNlb2YgU3VtQnVpbGRlcikge1xuICAgIGZvciAoY29uc3QgW25hbWUyLCB2YXJpYW50XSBvZiBPYmplY3QuZW50cmllcyh0eXBlQnVpbGRlci52YXJpYW50cykpIHtcbiAgICAgIG5ld1R5LnZhbHVlLnZhcmlhbnRzLnB1c2goe1xuICAgICAgICBuYW1lOiBuYW1lMixcbiAgICAgICAgYWxnZWJyYWljVHlwZTogcmVnaXN0ZXJUeXBlc1JlY3Vyc2l2ZWx5KHZhcmlhbnQpLmFsZ2VicmFpY1R5cGVcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuICBNT0RVTEVfREVGLnR5cGVzLnB1c2goe1xuICAgIG5hbWU6IHNwbGl0TmFtZShuYW1lKSxcbiAgICB0eTogci5yZWYsXG4gICAgY3VzdG9tT3JkZXJpbmc6IHRydWVcbiAgfSk7XG4gIHJldHVybiByO1xufVxuZnVuY3Rpb24gaXNVbml0KHR5cGVCdWlsZGVyKSB7XG4gIHJldHVybiB0eXBlQnVpbGRlci50eXBlTmFtZSA9PSBudWxsICYmIHR5cGVCdWlsZGVyLmFsZ2VicmFpY1R5cGUudmFsdWUuZWxlbWVudHMubGVuZ3RoID09PSAwO1xufVxuZnVuY3Rpb24gc3BsaXROYW1lKG5hbWUpIHtcbiAgY29uc3Qgc2NvcGUgPSBuYW1lLnNwbGl0KFwiLlwiKTtcbiAgcmV0dXJuIHsgbmFtZTogc2NvcGUucG9wKCksIHNjb3BlIH07XG59XG52YXIgU2NoZW1hID0gY2xhc3Mge1xuICB0YWJsZXNEZWY7XG4gIHR5cGVzcGFjZTtcbiAgc2NoZW1hVHlwZTtcbiAgY29uc3RydWN0b3IodGFibGVzLCB0eXBlc3BhY2UsIGhhbmRsZXMpIHtcbiAgICB0aGlzLnRhYmxlc0RlZiA9IHsgdGFibGVzIH07XG4gICAgdGhpcy50eXBlc3BhY2UgPSB0eXBlc3BhY2U7XG4gICAgdGhpcy5zY2hlbWFUeXBlID0gdGFibGVzVG9TY2hlbWEoaGFuZGxlcyk7XG4gIH1cbiAgcmVkdWNlcihuYW1lLCBwYXJhbXNPckZuLCBmbikge1xuICAgIGlmICh0eXBlb2YgcGFyYW1zT3JGbiA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICByZWR1Y2VyKG5hbWUsIHt9LCBwYXJhbXNPckZuKTtcbiAgICAgIHJldHVybiBwYXJhbXNPckZuO1xuICAgIH0gZWxzZSB7XG4gICAgICByZWR1Y2VyKG5hbWUsIHBhcmFtc09yRm4sIGZuKTtcbiAgICAgIHJldHVybiBmbjtcbiAgICB9XG4gIH1cbiAgaW5pdChuYW1lT3JGbiwgbWF5YmVGbikge1xuICAgIGNvbnN0IFtuYW1lLCBmbl0gPSB0eXBlb2YgbmFtZU9yRm4gPT09IFwic3RyaW5nXCIgPyBbbmFtZU9yRm4sIG1heWJlRm5dIDogW1wiaW5pdFwiLCBuYW1lT3JGbl07XG4gICAgaW5pdChuYW1lLCB7fSwgZm4pO1xuICB9XG4gIGNsaWVudENvbm5lY3RlZChuYW1lT3JGbiwgbWF5YmVGbikge1xuICAgIGNvbnN0IFtuYW1lLCBmbl0gPSB0eXBlb2YgbmFtZU9yRm4gPT09IFwic3RyaW5nXCIgPyBbbmFtZU9yRm4sIG1heWJlRm5dIDogW1wib25fY29ubmVjdFwiLCBuYW1lT3JGbl07XG4gICAgY2xpZW50Q29ubmVjdGVkKG5hbWUsIHt9LCBmbik7XG4gIH1cbiAgY2xpZW50RGlzY29ubmVjdGVkKG5hbWVPckZuLCBtYXliZUZuKSB7XG4gICAgY29uc3QgW25hbWUsIGZuXSA9IHR5cGVvZiBuYW1lT3JGbiA9PT0gXCJzdHJpbmdcIiA/IFtuYW1lT3JGbiwgbWF5YmVGbl0gOiBbXCJvbl9kaXNjb25uZWN0XCIsIG5hbWVPckZuXTtcbiAgICBjbGllbnREaXNjb25uZWN0ZWQobmFtZSwge30sIGZuKTtcbiAgfVxuICB2aWV3KG9wdHMsIHJldCwgZm4pIHtcbiAgICBkZWZpbmVWaWV3KG9wdHMsIGZhbHNlLCB7fSwgcmV0LCBmbik7XG4gIH1cbiAgLy8gVE9ETzogcmUtZW5hYmxlIG9uY2UgcGFyYW1ldGVyaXplZCB2aWV3cyBhcmUgc3VwcG9ydGVkIGluIFNRTFxuICAvLyB2aWV3PFJldCBleHRlbmRzIFZpZXdSZXR1cm5UeXBlQnVpbGRlcj4oXG4gIC8vICAgb3B0czogVmlld09wdHMsXG4gIC8vICAgcmV0OiBSZXQsXG4gIC8vICAgZm46IFZpZXdGbjxTLCB7fSwgUmV0PlxuICAvLyApOiB2b2lkO1xuICAvLyB2aWV3PFBhcmFtcyBleHRlbmRzIFBhcmFtc09iaiwgUmV0IGV4dGVuZHMgVmlld1JldHVyblR5cGVCdWlsZGVyPihcbiAgLy8gICBvcHRzOiBWaWV3T3B0cyxcbiAgLy8gICBwYXJhbXM6IFBhcmFtcyxcbiAgLy8gICByZXQ6IFJldCxcbiAgLy8gICBmbjogVmlld0ZuPFMsIHt9LCBSZXQ+XG4gIC8vICk6IHZvaWQ7XG4gIC8vIHZpZXc8UGFyYW1zIGV4dGVuZHMgUGFyYW1zT2JqLCBSZXQgZXh0ZW5kcyBWaWV3UmV0dXJuVHlwZUJ1aWxkZXI+KFxuICAvLyAgIG9wdHM6IFZpZXdPcHRzLFxuICAvLyAgIHBhcmFtc09yUmV0OiBSZXQgfCBQYXJhbXMsXG4gIC8vICAgcmV0T3JGbjogVmlld0ZuPFMsIHt9LCBSZXQ+IHwgUmV0LFxuICAvLyAgIG1heWJlRm4/OiBWaWV3Rm48UywgUGFyYW1zLCBSZXQ+XG4gIC8vICk6IHZvaWQge1xuICAvLyAgIGlmICh0eXBlb2YgcmV0T3JGbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAvLyAgICAgZGVmaW5lVmlldyhuYW1lLCBmYWxzZSwge30sIHBhcmFtc09yUmV0IGFzIFJldCwgcmV0T3JGbik7XG4gIC8vICAgfSBlbHNlIHtcbiAgLy8gICAgIGRlZmluZVZpZXcobmFtZSwgZmFsc2UsIHBhcmFtc09yUmV0IGFzIFBhcmFtcywgcmV0T3JGbiwgbWF5YmVGbiEpO1xuICAvLyAgIH1cbiAgLy8gfVxuICBhbm9ueW1vdXNWaWV3KG9wdHMsIHJldCwgZm4pIHtcbiAgICBkZWZpbmVWaWV3KG9wdHMsIHRydWUsIHt9LCByZXQsIGZuKTtcbiAgfVxuICBwcm9jZWR1cmUobmFtZSwgcGFyYW1zT3JSZXQsIHJldE9yRm4sIG1heWJlRm4pIHtcbiAgICBpZiAodHlwZW9mIHJldE9yRm4gPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgcHJvY2VkdXJlKG5hbWUsIHt9LCBwYXJhbXNPclJldCwgcmV0T3JGbik7XG4gICAgICByZXR1cm4gcmV0T3JGbjtcbiAgICB9IGVsc2Uge1xuICAgICAgcHJvY2VkdXJlKG5hbWUsIHBhcmFtc09yUmV0LCByZXRPckZuLCBtYXliZUZuKTtcbiAgICAgIHJldHVybiBtYXliZUZuO1xuICAgIH1cbiAgfVxuICBjbGllbnRWaXNpYmlsaXR5RmlsdGVyID0ge1xuICAgIHNxbChmaWx0ZXIpIHtcbiAgICAgIE1PRFVMRV9ERUYucm93TGV2ZWxTZWN1cml0eS5wdXNoKHsgc3FsOiBmaWx0ZXIgfSk7XG4gICAgfVxuICB9O1xufTtcbmZ1bmN0aW9uIHNjaGVtYSguLi5hcmdzKSB7XG4gIGNvbnN0IGhhbmRsZXMgPSBhcmdzLmxlbmd0aCA9PT0gMSAmJiBBcnJheS5pc0FycmF5KGFyZ3NbMF0pID8gYXJnc1swXSA6IGFyZ3M7XG4gIGNvbnN0IHRhYmxlRGVmcyA9IGhhbmRsZXMubWFwKChoKSA9PiBoLnRhYmxlRGVmKTtcbiAgTU9EVUxFX0RFRi50YWJsZXMucHVzaCguLi50YWJsZURlZnMpO1xuICBSRUdJU1RFUkVEX1NDSEVNQSA9IHtcbiAgICB0YWJsZXM6IGhhbmRsZXMubWFwKChoYW5kbGUpID0+ICh7XG4gICAgICBuYW1lOiBoYW5kbGUudGFibGVOYW1lLFxuICAgICAgYWNjZXNzb3JOYW1lOiBoYW5kbGUudGFibGVOYW1lLFxuICAgICAgY29sdW1uczogaGFuZGxlLnJvd1R5cGUucm93LFxuICAgICAgcm93VHlwZTogaGFuZGxlLnJvd1NwYWNldGltZVR5cGUsXG4gICAgICBpbmRleGVzOiBoYW5kbGUuaWR4cyxcbiAgICAgIGNvbnN0cmFpbnRzOiBoYW5kbGUuY29uc3RyYWludHNcbiAgICB9KSlcbiAgfTtcbiAgcmV0dXJuIG5ldyBTY2hlbWEodGFibGVEZWZzLCBNT0RVTEVfREVGLnR5cGVzcGFjZSwgaGFuZGxlcyk7XG59XG5cbi8vIHNyYy9saWIvYXV0b2dlbi9yYXdfaW5kZXhfYWxnb3JpdGhtX3R5cGUudHNcbnZhciBSYXdJbmRleEFsZ29yaXRobSA9IHQuZW51bShcIlJhd0luZGV4QWxnb3JpdGhtXCIsIHtcbiAgQlRyZWU6IHQuYXJyYXkodC51MTYoKSksXG4gIEhhc2g6IHQuYXJyYXkodC51MTYoKSksXG4gIERpcmVjdDogdC51MTYoKVxufSk7XG52YXIgcmF3X2luZGV4X2FsZ29yaXRobV90eXBlX2RlZmF1bHQgPSBSYXdJbmRleEFsZ29yaXRobTtcblxuLy8gc3JjL2xpYi90YWJsZS50c1xuZnVuY3Rpb24gdGFibGUob3B0cywgcm93KSB7XG4gIGNvbnN0IHtcbiAgICBuYW1lLFxuICAgIHB1YmxpYzogaXNQdWJsaWMgPSBmYWxzZSxcbiAgICBpbmRleGVzOiB1c2VySW5kZXhlcyA9IFtdLFxuICAgIHNjaGVkdWxlZFxuICB9ID0gb3B0cztcbiAgY29uc3QgY29sSWRzID0gLyogQF9fUFVSRV9fICovIG5ldyBNYXAoKTtcbiAgY29uc3QgY29sTmFtZUxpc3QgPSBbXTtcbiAgaWYgKCEocm93IGluc3RhbmNlb2YgUm93QnVpbGRlcikpIHtcbiAgICByb3cgPSBuZXcgUm93QnVpbGRlcihyb3cpO1xuICB9XG4gIGlmIChyb3cudHlwZU5hbWUgPT09IHZvaWQgMCkge1xuICAgIHJvdy50eXBlTmFtZSA9IHRvUGFzY2FsQ2FzZShuYW1lKTtcbiAgfVxuICBjb25zdCByb3dUeXBlUmVmID0gcmVnaXN0ZXJUeXBlc1JlY3Vyc2l2ZWx5KHJvdyk7XG4gIHJvdy5hbGdlYnJhaWNUeXBlLnZhbHVlLmVsZW1lbnRzLmZvckVhY2goKGVsZW0sIGkpID0+IHtcbiAgICBjb2xJZHMuc2V0KGVsZW0ubmFtZSwgaSk7XG4gICAgY29sTmFtZUxpc3QucHVzaChlbGVtLm5hbWUpO1xuICB9KTtcbiAgY29uc3QgcGsgPSBbXTtcbiAgY29uc3QgaW5kZXhlcyA9IFtdO1xuICBjb25zdCBjb25zdHJhaW50cyA9IFtdO1xuICBjb25zdCBzZXF1ZW5jZXMgPSBbXTtcbiAgbGV0IHNjaGVkdWxlQXRDb2w7XG4gIGZvciAoY29uc3QgW25hbWUyLCBidWlsZGVyXSBvZiBPYmplY3QuZW50cmllcyhyb3cucm93KSkge1xuICAgIGNvbnN0IG1ldGEgPSBidWlsZGVyLmNvbHVtbk1ldGFkYXRhO1xuICAgIGlmIChtZXRhLmlzUHJpbWFyeUtleSkge1xuICAgICAgcGsucHVzaChjb2xJZHMuZ2V0KG5hbWUyKSk7XG4gICAgfVxuICAgIGNvbnN0IGlzVW5pcXVlID0gbWV0YS5pc1VuaXF1ZSB8fCBtZXRhLmlzUHJpbWFyeUtleTtcbiAgICBpZiAobWV0YS5pbmRleFR5cGUgfHwgaXNVbmlxdWUpIHtcbiAgICAgIGNvbnN0IGFsZ28gPSBtZXRhLmluZGV4VHlwZSA/PyBcImJ0cmVlXCI7XG4gICAgICBjb25zdCBpZCA9IGNvbElkcy5nZXQobmFtZTIpO1xuICAgICAgbGV0IGFsZ29yaXRobTtcbiAgICAgIHN3aXRjaCAoYWxnbykge1xuICAgICAgICBjYXNlIFwiYnRyZWVcIjpcbiAgICAgICAgICBhbGdvcml0aG0gPSByYXdfaW5kZXhfYWxnb3JpdGhtX3R5cGVfZGVmYXVsdC5CVHJlZShbaWRdKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcImRpcmVjdFwiOlxuICAgICAgICAgIGFsZ29yaXRobSA9IHJhd19pbmRleF9hbGdvcml0aG1fdHlwZV9kZWZhdWx0LkRpcmVjdChpZCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBpbmRleGVzLnB1c2goe1xuICAgICAgICBuYW1lOiB2b2lkIDAsXG4gICAgICAgIC8vIFVubmFtZWQgaW5kZXhlcyB3aWxsIGJlIGFzc2lnbmVkIGEgZ2xvYmFsbHkgdW5pcXVlIG5hbWVcbiAgICAgICAgYWNjZXNzb3JOYW1lOiBuYW1lMixcbiAgICAgICAgLy8gVGhlIG5hbWUgb2YgdGhpcyBjb2x1bW4gd2lsbCBiZSB1c2VkIGFzIHRoZSBhY2Nlc3NvciBuYW1lXG4gICAgICAgIGFsZ29yaXRobVxuICAgICAgfSk7XG4gICAgfVxuICAgIGlmIChpc1VuaXF1ZSkge1xuICAgICAgY29uc3RyYWludHMucHVzaCh7XG4gICAgICAgIG5hbWU6IHZvaWQgMCxcbiAgICAgICAgZGF0YTogeyB0YWc6IFwiVW5pcXVlXCIsIHZhbHVlOiB7IGNvbHVtbnM6IFtjb2xJZHMuZ2V0KG5hbWUyKV0gfSB9XG4gICAgICB9KTtcbiAgICB9XG4gICAgaWYgKG1ldGEuaXNBdXRvSW5jcmVtZW50KSB7XG4gICAgICBzZXF1ZW5jZXMucHVzaCh7XG4gICAgICAgIG5hbWU6IHZvaWQgMCxcbiAgICAgICAgc3RhcnQ6IHZvaWQgMCxcbiAgICAgICAgbWluVmFsdWU6IHZvaWQgMCxcbiAgICAgICAgbWF4VmFsdWU6IHZvaWQgMCxcbiAgICAgICAgY29sdW1uOiBjb2xJZHMuZ2V0KG5hbWUyKSxcbiAgICAgICAgaW5jcmVtZW50OiAxblxuICAgICAgfSk7XG4gICAgfVxuICAgIGlmIChzY2hlZHVsZWQpIHtcbiAgICAgIGNvbnN0IGFsZ2VicmFpY1R5cGUgPSBidWlsZGVyLnR5cGVCdWlsZGVyLmFsZ2VicmFpY1R5cGU7XG4gICAgICBpZiAoc2NoZWR1bGVfYXRfZGVmYXVsdC5pc1NjaGVkdWxlQXQoYWxnZWJyYWljVHlwZSkpIHtcbiAgICAgICAgc2NoZWR1bGVBdENvbCA9IGNvbElkcy5nZXQobmFtZTIpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBmb3IgKGNvbnN0IGluZGV4T3B0cyBvZiB1c2VySW5kZXhlcyA/PyBbXSkge1xuICAgIGxldCBhbGdvcml0aG07XG4gICAgc3dpdGNoIChpbmRleE9wdHMuYWxnb3JpdGhtKSB7XG4gICAgICBjYXNlIFwiYnRyZWVcIjpcbiAgICAgICAgYWxnb3JpdGhtID0ge1xuICAgICAgICAgIHRhZzogXCJCVHJlZVwiLFxuICAgICAgICAgIHZhbHVlOiBpbmRleE9wdHMuY29sdW1ucy5tYXAoKGMpID0+IGNvbElkcy5nZXQoYykpXG4gICAgICAgIH07XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImRpcmVjdFwiOlxuICAgICAgICBhbGdvcml0aG0gPSB7IHRhZzogXCJEaXJlY3RcIiwgdmFsdWU6IGNvbElkcy5nZXQoaW5kZXhPcHRzLmNvbHVtbikgfTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGluZGV4ZXMucHVzaCh7IG5hbWU6IHZvaWQgMCwgYWNjZXNzb3JOYW1lOiBpbmRleE9wdHMubmFtZSwgYWxnb3JpdGhtIH0pO1xuICB9XG4gIGZvciAoY29uc3QgY29uc3RyYWludE9wdHMgb2Ygb3B0cy5jb25zdHJhaW50cyA/PyBbXSkge1xuICAgIGlmIChjb25zdHJhaW50T3B0cy5jb25zdHJhaW50ID09PSBcInVuaXF1ZVwiKSB7XG4gICAgICBjb25zdCBkYXRhID0ge1xuICAgICAgICB0YWc6IFwiVW5pcXVlXCIsXG4gICAgICAgIHZhbHVlOiB7IGNvbHVtbnM6IGNvbnN0cmFpbnRPcHRzLmNvbHVtbnMubWFwKChjKSA9PiBjb2xJZHMuZ2V0KGMpKSB9XG4gICAgICB9O1xuICAgICAgY29uc3RyYWludHMucHVzaCh7IG5hbWU6IGNvbnN0cmFpbnRPcHRzLm5hbWUsIGRhdGEgfSk7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gIH1cbiAgZm9yIChjb25zdCBpbmRleCBvZiBpbmRleGVzKSB7XG4gICAgY29uc3QgY29scyA9IGluZGV4LmFsZ29yaXRobS50YWcgPT09IFwiRGlyZWN0XCIgPyBbaW5kZXguYWxnb3JpdGhtLnZhbHVlXSA6IGluZGV4LmFsZ29yaXRobS52YWx1ZTtcbiAgICBjb25zdCBjb2xTID0gY29scy5tYXAoKGkpID0+IGNvbE5hbWVMaXN0W2ldKS5qb2luKFwiX1wiKTtcbiAgICBpbmRleC5uYW1lID0gYCR7bmFtZX1fJHtjb2xTfV9pZHhfJHtpbmRleC5hbGdvcml0aG0udGFnLnRvTG93ZXJDYXNlKCl9YDtcbiAgfVxuICBjb25zdCB0YWJsZURlZiA9IHtcbiAgICBuYW1lLFxuICAgIHByb2R1Y3RUeXBlUmVmOiByb3dUeXBlUmVmLnJlZixcbiAgICBwcmltYXJ5S2V5OiBwayxcbiAgICBpbmRleGVzLFxuICAgIGNvbnN0cmFpbnRzLFxuICAgIHNlcXVlbmNlcyxcbiAgICBzY2hlZHVsZTogc2NoZWR1bGVkICYmIHNjaGVkdWxlQXRDb2wgIT09IHZvaWQgMCA/IHtcbiAgICAgIG5hbWU6IHZvaWQgMCxcbiAgICAgIHJlZHVjZXJOYW1lOiBzY2hlZHVsZWQsXG4gICAgICBzY2hlZHVsZWRBdENvbHVtbjogc2NoZWR1bGVBdENvbFxuICAgIH0gOiB2b2lkIDAsXG4gICAgdGFibGVUeXBlOiB7IHRhZzogXCJVc2VyXCIgfSxcbiAgICB0YWJsZUFjY2VzczogeyB0YWc6IGlzUHVibGljID8gXCJQdWJsaWNcIiA6IFwiUHJpdmF0ZVwiIH1cbiAgfTtcbiAgY29uc3QgcHJvZHVjdFR5cGUgPSByb3cuYWxnZWJyYWljVHlwZS52YWx1ZTtcbiAgcmV0dXJuIHtcbiAgICByb3dUeXBlOiByb3csXG4gICAgdGFibGVOYW1lOiBuYW1lLFxuICAgIHJvd1NwYWNldGltZVR5cGU6IHByb2R1Y3RUeXBlLFxuICAgIHRhYmxlRGVmLFxuICAgIGlkeHM6IHt9LFxuICAgIGNvbnN0cmFpbnRzXG4gIH07XG59XG5cbi8vIHNyYy9zZXJ2ZXIvZXJyb3JzLnRzXG52YXIgU3BhY2V0aW1lSG9zdEVycm9yID0gY2xhc3MgX1NwYWNldGltZUhvc3RFcnJvciBleHRlbmRzIEVycm9yIHtcbiAgY29kZTtcbiAgbWVzc2FnZTtcbiAgY29uc3RydWN0b3IoY29kZSwgbWVzc2FnZSkge1xuICAgIHN1cGVyKCk7XG4gICAgY29uc3QgcHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YodGhpcyk7XG4gICAgbGV0IGNscztcbiAgICBpZiAoZXJyb3JQcm90b3lwZXMuaGFzKHByb3RvKSkge1xuICAgICAgY2xzID0gcHJvdG8uY29uc3RydWN0b3I7XG4gICAgICBpZiAoY29kZSAhPT0gY2xzLkNPREUpXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYGludmFsaWQgZXJyb3IgY29kZSBmb3IgJHtjbHMubmFtZX1gKTtcbiAgICB9IGVsc2UgaWYgKHByb3RvID09PSBfU3BhY2V0aW1lSG9zdEVycm9yLnByb3RvdHlwZSkge1xuICAgICAgY2xzID0gZXJybm9Ub0NsYXNzLmdldChjb2RlKTtcbiAgICAgIGlmICghY2xzKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcihgdW5rbm93biBlcnJvciBjb2RlICR7Y29kZX1gKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcImNhbm5vdCBzdWJjbGFzcyBTcGFjZXRpbWVFcnJvclwiKTtcbiAgICB9XG4gICAgT2JqZWN0LnNldFByb3RvdHlwZU9mKHRoaXMsIGNscy5wcm90b3R5cGUpO1xuICAgIHRoaXMuY29kZSA9IGNscy5DT0RFO1xuICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2UgPz8gY2xzLk1FU1NBR0U7XG4gIH1cbiAgZ2V0IG5hbWUoKSB7XG4gICAgcmV0dXJuIGVycm5vVG9DbGFzcy5nZXQodGhpcy5jb2RlKT8ubmFtZSA/PyBcIlNwYWNldGltZUhvc3RFcnJvclwiO1xuICB9XG59O1xudmFyIFNlbmRlckVycm9yID0gY2xhc3MgZXh0ZW5kcyBFcnJvciB7XG4gIGNvbnN0cnVjdG9yKG1lc3NhZ2UpIHtcbiAgICBzdXBlcihtZXNzYWdlKTtcbiAgfVxuICBnZXQgbmFtZSgpIHtcbiAgICByZXR1cm4gXCJTZW5kZXJFcnJvclwiO1xuICB9XG59O1xudmFyIGVycm9yRGF0YSA9IHtcbiAgLyoqXG4gICAqIEEgZ2VuZXJpYyBlcnJvciBjbGFzcyBmb3IgdW5rbm93biBlcnJvciBjb2Rlcy5cbiAgICovXG4gIEhvc3RDYWxsRmFpbHVyZTogWzEsIFwiQUJJIGNhbGxlZCBieSBob3N0IHJldHVybmVkIGFuIGVycm9yXCJdLFxuICAvKipcbiAgICogRXJyb3IgaW5kaWNhdGluZyB0aGF0IGFuIEFCSSBjYWxsIHdhcyBtYWRlIG91dHNpZGUgb2YgYSB0cmFuc2FjdGlvbi5cbiAgICovXG4gIE5vdEluVHJhbnNhY3Rpb246IFsyLCBcIkFCSSBjYWxsIGNhbiBvbmx5IGJlIG1hZGUgd2hpbGUgaW4gYSB0cmFuc2FjdGlvblwiXSxcbiAgLyoqXG4gICAqIEVycm9yIGluZGljYXRpbmcgdGhhdCBCU0FUTiBkZWNvZGluZyBmYWlsZWQuXG4gICAqIFRoaXMgdHlwaWNhbGx5IG1lYW5zIHRoYXQgdGhlIGRhdGEgY291bGQgbm90IGJlIGRlY29kZWQgdG8gdGhlIGV4cGVjdGVkIHR5cGUuXG4gICAqL1xuICBCc2F0bkRlY29kZUVycm9yOiBbMywgXCJDb3VsZG4ndCBkZWNvZGUgdGhlIEJTQVROIHRvIHRoZSBleHBlY3RlZCB0eXBlXCJdLFxuICAvKipcbiAgICogRXJyb3IgaW5kaWNhdGluZyB0aGF0IGEgc3BlY2lmaWVkIHRhYmxlIGRvZXMgbm90IGV4aXN0LlxuICAgKi9cbiAgTm9TdWNoVGFibGU6IFs0LCBcIk5vIHN1Y2ggdGFibGVcIl0sXG4gIC8qKlxuICAgKiBFcnJvciBpbmRpY2F0aW5nIHRoYXQgYSBzcGVjaWZpZWQgaW5kZXggZG9lcyBub3QgZXhpc3QuXG4gICAqL1xuICBOb1N1Y2hJbmRleDogWzUsIFwiTm8gc3VjaCBpbmRleFwiXSxcbiAgLyoqXG4gICAqIEVycm9yIGluZGljYXRpbmcgdGhhdCBhIHNwZWNpZmllZCByb3cgaXRlcmF0b3IgaXMgbm90IHZhbGlkLlxuICAgKi9cbiAgTm9TdWNoSXRlcjogWzYsIFwiVGhlIHByb3ZpZGVkIHJvdyBpdGVyYXRvciBpcyBub3QgdmFsaWRcIl0sXG4gIC8qKlxuICAgKiBFcnJvciBpbmRpY2F0aW5nIHRoYXQgYSBzcGVjaWZpZWQgY29uc29sZSB0aW1lciBkb2VzIG5vdCBleGlzdC5cbiAgICovXG4gIE5vU3VjaENvbnNvbGVUaW1lcjogWzcsIFwiVGhlIHByb3ZpZGVkIGNvbnNvbGUgdGltZXIgZG9lcyBub3QgZXhpc3RcIl0sXG4gIC8qKlxuICAgKiBFcnJvciBpbmRpY2F0aW5nIHRoYXQgYSBzcGVjaWZpZWQgYnl0ZXMgc291cmNlIG9yIHNpbmsgaXMgbm90IHZhbGlkLlxuICAgKi9cbiAgTm9TdWNoQnl0ZXM6IFs4LCBcIlRoZSBwcm92aWRlZCBieXRlcyBzb3VyY2Ugb3Igc2luayBpcyBub3QgdmFsaWRcIl0sXG4gIC8qKlxuICAgKiBFcnJvciBpbmRpY2F0aW5nIHRoYXQgYSBwcm92aWRlZCBzaW5rIGhhcyBubyBtb3JlIHNwYWNlIGxlZnQuXG4gICAqL1xuICBOb1NwYWNlOiBbOSwgXCJUaGUgcHJvdmlkZWQgc2luayBoYXMgbm8gbW9yZSBzcGFjZSBsZWZ0XCJdLFxuICAvKipcbiAgICogRXJyb3IgaW5kaWNhdGluZyB0aGF0IHRoZXJlIGlzIG5vIG1vcmUgc3BhY2UgaW4gdGhlIGRhdGFiYXNlLlxuICAgKi9cbiAgQnVmZmVyVG9vU21hbGw6IFtcbiAgICAxMSxcbiAgICBcIlRoZSBwcm92aWRlZCBidWZmZXIgaXMgbm90IGxhcmdlIGVub3VnaCB0byBzdG9yZSB0aGUgZGF0YVwiXG4gIF0sXG4gIC8qKlxuICAgKiBFcnJvciBpbmRpY2F0aW5nIHRoYXQgYSB2YWx1ZSB3aXRoIGEgZ2l2ZW4gdW5pcXVlIGlkZW50aWZpZXIgYWxyZWFkeSBleGlzdHMuXG4gICAqL1xuICBVbmlxdWVBbHJlYWR5RXhpc3RzOiBbXG4gICAgMTIsXG4gICAgXCJWYWx1ZSB3aXRoIGdpdmVuIHVuaXF1ZSBpZGVudGlmaWVyIGFscmVhZHkgZXhpc3RzXCJcbiAgXSxcbiAgLyoqXG4gICAqIEVycm9yIGluZGljYXRpbmcgdGhhdCB0aGUgc3BlY2lmaWVkIGRlbGF5IGluIHNjaGVkdWxpbmcgYSByb3cgd2FzIHRvbyBsb25nLlxuICAgKi9cbiAgU2NoZWR1bGVBdERlbGF5VG9vTG9uZzogW1xuICAgIDEzLFxuICAgIFwiU3BlY2lmaWVkIGRlbGF5IGluIHNjaGVkdWxpbmcgcm93IHdhcyB0b28gbG9uZ1wiXG4gIF0sXG4gIC8qKlxuICAgKiBFcnJvciBpbmRpY2F0aW5nIHRoYXQgYW4gaW5kZXggd2FzIG5vdCB1bmlxdWUgd2hlbiBpdCB3YXMgZXhwZWN0ZWQgdG8gYmUuXG4gICAqL1xuICBJbmRleE5vdFVuaXF1ZTogWzE0LCBcIlRoZSBpbmRleCB3YXMgbm90IHVuaXF1ZVwiXSxcbiAgLyoqXG4gICAqIEVycm9yIGluZGljYXRpbmcgdGhhdCBhbiBpbmRleCB3YXMgbm90IHVuaXF1ZSB3aGVuIGl0IHdhcyBleHBlY3RlZCB0byBiZS5cbiAgICovXG4gIE5vU3VjaFJvdzogWzE1LCBcIlRoZSByb3cgd2FzIG5vdCBmb3VuZCwgZS5nLiwgaW4gYW4gdXBkYXRlIGNhbGxcIl0sXG4gIC8qKlxuICAgKiBFcnJvciBpbmRpY2F0aW5nIHRoYXQgYW4gYXV0by1pbmNyZW1lbnQgc2VxdWVuY2UgaGFzIG92ZXJmbG93ZWQuXG4gICAqL1xuICBBdXRvSW5jT3ZlcmZsb3c6IFsxNiwgXCJUaGUgYXV0by1pbmNyZW1lbnQgc2VxdWVuY2Ugb3ZlcmZsb3dlZFwiXSxcbiAgV291bGRCbG9ja1RyYW5zYWN0aW9uOiBbXG4gICAgMTcsXG4gICAgXCJBdHRlbXB0ZWQgYXN5bmMgb3IgYmxvY2tpbmcgb3Agd2hpbGUgaG9sZGluZyBvcGVuIGEgdHJhbnNhY3Rpb25cIlxuICBdLFxuICBUcmFuc2FjdGlvbk5vdEFub255bW91czogW1xuICAgIDE4LFxuICAgIFwiTm90IGluIGFuIGFub255bW91cyB0cmFuc2FjdGlvbi4gQ2FsbGVkIGJ5IGEgcmVkdWNlcj9cIlxuICBdLFxuICBUcmFuc2FjdGlvbklzUmVhZE9ubHk6IFtcbiAgICAxOSxcbiAgICBcIkFCSSBjYWxsIGNhbiBvbmx5IGJlIG1hZGUgd2hpbGUgd2l0aGluIGEgbXV0YWJsZSB0cmFuc2FjdGlvblwiXG4gIF0sXG4gIFRyYW5zYWN0aW9uSXNNdXQ6IFtcbiAgICAyMCxcbiAgICBcIkFCSSBjYWxsIGNhbiBvbmx5IGJlIG1hZGUgd2hpbGUgd2l0aGluIGEgcmVhZC1vbmx5IHRyYW5zYWN0aW9uXCJcbiAgXSxcbiAgSHR0cEVycm9yOiBbMjEsIFwiVGhlIEhUVFAgcmVxdWVzdCBmYWlsZWRcIl1cbn07XG5mdW5jdGlvbiBtYXBFbnRyaWVzKHgsIGYpIHtcbiAgcmV0dXJuIE9iamVjdC5mcm9tRW50cmllcyhcbiAgICBPYmplY3QuZW50cmllcyh4KS5tYXAoKFtrLCB2XSkgPT4gW2ssIGYoaywgdildKVxuICApO1xufVxudmFyIGVycm9ycyA9IE9iamVjdC5mcmVlemUoXG4gIG1hcEVudHJpZXMoXG4gICAgZXJyb3JEYXRhLFxuICAgIChuYW1lLCBbY29kZSwgbWVzc2FnZV0pID0+IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShcbiAgICAgIGNsYXNzIGV4dGVuZHMgU3BhY2V0aW1lSG9zdEVycm9yIHtcbiAgICAgICAgc3RhdGljIENPREUgPSBjb2RlO1xuICAgICAgICBzdGF0aWMgTUVTU0FHRSA9IG1lc3NhZ2U7XG4gICAgICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICAgIHN1cGVyKGNvZGUpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgXCJuYW1lXCIsXG4gICAgICB7IHZhbHVlOiBuYW1lLCB3cml0YWJsZTogZmFsc2UgfVxuICAgIClcbiAgKVxuKTtcbnZhciBlcnJvclByb3RveXBlcyA9IG5ldyBTZXQoT2JqZWN0LnZhbHVlcyhlcnJvcnMpLm1hcCgoY2xzKSA9PiBjbHMucHJvdG90eXBlKSk7XG52YXIgZXJybm9Ub0NsYXNzID0gbmV3IE1hcChcbiAgT2JqZWN0LnZhbHVlcyhlcnJvcnMpLm1hcCgoY2xzKSA9PiBbY2xzLkNPREUsIGNsc10pXG4pO1xuXG4vLyBzcmMvc2VydmVyL3BvbHlmaWxscy50c1xuX190b0VTTShyZXF1aXJlX3RleHRfbWluKCkpO1xuXG4vLyBzcmMvbGliL2F1dG9nZW4vc3VtX3R5cGVfdmFyaWFudF90eXBlLnRzXG52YXIgc3VtX3R5cGVfdmFyaWFudF90eXBlX2RlZmF1bHQgPSB0Lm9iamVjdChcIlN1bVR5cGVWYXJpYW50XCIsIHtcbiAgbmFtZTogdC5vcHRpb24odC5zdHJpbmcoKSksXG4gIGdldCBhbGdlYnJhaWNUeXBlKCkge1xuICAgIHJldHVybiBhbGdlYnJhaWNfdHlwZV90eXBlX2RlZmF1bHQ7XG4gIH1cbn0pO1xuXG4vLyBzcmMvbGliL2F1dG9nZW4vc3VtX3R5cGVfdHlwZS50c1xudmFyIHN1bV90eXBlX3R5cGVfZGVmYXVsdCA9IHQub2JqZWN0KFwiU3VtVHlwZVwiLCB7XG4gIGdldCB2YXJpYW50cygpIHtcbiAgICByZXR1cm4gdC5hcnJheShzdW1fdHlwZV92YXJpYW50X3R5cGVfZGVmYXVsdCk7XG4gIH1cbn0pO1xuXG4vLyBzcmMvbGliL2F1dG9nZW4vcHJvZHVjdF90eXBlX2VsZW1lbnRfdHlwZS50c1xudmFyIHByb2R1Y3RfdHlwZV9lbGVtZW50X3R5cGVfZGVmYXVsdCA9IHQub2JqZWN0KFwiUHJvZHVjdFR5cGVFbGVtZW50XCIsIHtcbiAgbmFtZTogdC5vcHRpb24odC5zdHJpbmcoKSksXG4gIGdldCBhbGdlYnJhaWNUeXBlKCkge1xuICAgIHJldHVybiBhbGdlYnJhaWNfdHlwZV90eXBlX2RlZmF1bHQ7XG4gIH1cbn0pO1xuXG4vLyBzcmMvbGliL2F1dG9nZW4vcHJvZHVjdF90eXBlX3R5cGUudHNcbnZhciBwcm9kdWN0X3R5cGVfdHlwZV9kZWZhdWx0ID0gdC5vYmplY3QoXCJQcm9kdWN0VHlwZVwiLCB7XG4gIGdldCBlbGVtZW50cygpIHtcbiAgICByZXR1cm4gdC5hcnJheShwcm9kdWN0X3R5cGVfZWxlbWVudF90eXBlX2RlZmF1bHQpO1xuICB9XG59KTtcblxuLy8gc3JjL2xpYi9hdXRvZ2VuL2FsZ2VicmFpY190eXBlX3R5cGUudHNcbnZhciBBbGdlYnJhaWNUeXBlMiA9IHQuZW51bShcIkFsZ2VicmFpY1R5cGVcIiwge1xuICBSZWY6IHQudTMyKCksXG4gIGdldCBTdW0oKSB7XG4gICAgcmV0dXJuIHN1bV90eXBlX3R5cGVfZGVmYXVsdDtcbiAgfSxcbiAgZ2V0IFByb2R1Y3QoKSB7XG4gICAgcmV0dXJuIHByb2R1Y3RfdHlwZV90eXBlX2RlZmF1bHQ7XG4gIH0sXG4gIGdldCBBcnJheSgpIHtcbiAgICByZXR1cm4gQWxnZWJyYWljVHlwZTI7XG4gIH0sXG4gIFN0cmluZzogdC51bml0KCksXG4gIEJvb2w6IHQudW5pdCgpLFxuICBJODogdC51bml0KCksXG4gIFU4OiB0LnVuaXQoKSxcbiAgSTE2OiB0LnVuaXQoKSxcbiAgVTE2OiB0LnVuaXQoKSxcbiAgSTMyOiB0LnVuaXQoKSxcbiAgVTMyOiB0LnVuaXQoKSxcbiAgSTY0OiB0LnVuaXQoKSxcbiAgVTY0OiB0LnVuaXQoKSxcbiAgSTEyODogdC51bml0KCksXG4gIFUxMjg6IHQudW5pdCgpLFxuICBJMjU2OiB0LnVuaXQoKSxcbiAgVTI1NjogdC51bml0KCksXG4gIEYzMjogdC51bml0KCksXG4gIEY2NDogdC51bml0KClcbn0pO1xudmFyIGFsZ2VicmFpY190eXBlX3R5cGVfZGVmYXVsdCA9IEFsZ2VicmFpY1R5cGUyO1xuXG4vLyBzcmMvbGliL2F1dG9nZW4vdHlwZXNwYWNlX3R5cGUudHNcbnZhciB0eXBlc3BhY2VfdHlwZV9kZWZhdWx0ID0gdC5vYmplY3QoXCJUeXBlc3BhY2VcIiwge1xuICBnZXQgdHlwZXMoKSB7XG4gICAgcmV0dXJuIHQuYXJyYXkoYWxnZWJyYWljX3R5cGVfdHlwZV9kZWZhdWx0KTtcbiAgfVxufSk7XG5cbi8vIHNyYy9saWIvYXV0b2dlbi9yYXdfY29sdW1uX2RlZl92XzhfdHlwZS50c1xudmFyIHJhd19jb2x1bW5fZGVmX3ZfOF90eXBlX2RlZmF1bHQgPSB0Lm9iamVjdChcIlJhd0NvbHVtbkRlZlY4XCIsIHtcbiAgY29sTmFtZTogdC5zdHJpbmcoKSxcbiAgZ2V0IGNvbFR5cGUoKSB7XG4gICAgcmV0dXJuIGFsZ2VicmFpY190eXBlX3R5cGVfZGVmYXVsdDtcbiAgfVxufSk7XG5cbi8vIHNyYy9saWIvYXV0b2dlbi9pbmRleF90eXBlX3R5cGUudHNcbnZhciBJbmRleFR5cGUgPSB0LmVudW0oXCJJbmRleFR5cGVcIiwge1xuICBCVHJlZTogdC51bml0KCksXG4gIEhhc2g6IHQudW5pdCgpXG59KTtcbnZhciBpbmRleF90eXBlX3R5cGVfZGVmYXVsdCA9IEluZGV4VHlwZTtcblxuLy8gc3JjL2xpYi9hdXRvZ2VuL3Jhd19pbmRleF9kZWZfdl84X3R5cGUudHNcbnZhciByYXdfaW5kZXhfZGVmX3ZfOF90eXBlX2RlZmF1bHQgPSB0Lm9iamVjdChcIlJhd0luZGV4RGVmVjhcIiwge1xuICBpbmRleE5hbWU6IHQuc3RyaW5nKCksXG4gIGlzVW5pcXVlOiB0LmJvb2woKSxcbiAgZ2V0IGluZGV4VHlwZSgpIHtcbiAgICByZXR1cm4gaW5kZXhfdHlwZV90eXBlX2RlZmF1bHQ7XG4gIH0sXG4gIGNvbHVtbnM6IHQuYXJyYXkodC51MTYoKSlcbn0pO1xuXG4vLyBzcmMvbGliL2F1dG9nZW4vcmF3X2NvbnN0cmFpbnRfZGVmX3ZfOF90eXBlLnRzXG52YXIgcmF3X2NvbnN0cmFpbnRfZGVmX3ZfOF90eXBlX2RlZmF1bHQgPSB0Lm9iamVjdChcIlJhd0NvbnN0cmFpbnREZWZWOFwiLCB7XG4gIGNvbnN0cmFpbnROYW1lOiB0LnN0cmluZygpLFxuICBjb25zdHJhaW50czogdC51OCgpLFxuICBjb2x1bW5zOiB0LmFycmF5KHQudTE2KCkpXG59KTtcblxuLy8gc3JjL2xpYi9hdXRvZ2VuL3Jhd19zZXF1ZW5jZV9kZWZfdl84X3R5cGUudHNcbnZhciByYXdfc2VxdWVuY2VfZGVmX3ZfOF90eXBlX2RlZmF1bHQgPSB0Lm9iamVjdChcIlJhd1NlcXVlbmNlRGVmVjhcIiwge1xuICBzZXF1ZW5jZU5hbWU6IHQuc3RyaW5nKCksXG4gIGNvbFBvczogdC51MTYoKSxcbiAgaW5jcmVtZW50OiB0LmkxMjgoKSxcbiAgc3RhcnQ6IHQub3B0aW9uKHQuaTEyOCgpKSxcbiAgbWluVmFsdWU6IHQub3B0aW9uKHQuaTEyOCgpKSxcbiAgbWF4VmFsdWU6IHQub3B0aW9uKHQuaTEyOCgpKSxcbiAgYWxsb2NhdGVkOiB0LmkxMjgoKVxufSk7XG5cbi8vIHNyYy9saWIvYXV0b2dlbi9yYXdfdGFibGVfZGVmX3ZfOF90eXBlLnRzXG52YXIgcmF3X3RhYmxlX2RlZl92XzhfdHlwZV9kZWZhdWx0ID0gdC5vYmplY3QoXCJSYXdUYWJsZURlZlY4XCIsIHtcbiAgdGFibGVOYW1lOiB0LnN0cmluZygpLFxuICBnZXQgY29sdW1ucygpIHtcbiAgICByZXR1cm4gdC5hcnJheShyYXdfY29sdW1uX2RlZl92XzhfdHlwZV9kZWZhdWx0KTtcbiAgfSxcbiAgZ2V0IGluZGV4ZXMoKSB7XG4gICAgcmV0dXJuIHQuYXJyYXkocmF3X2luZGV4X2RlZl92XzhfdHlwZV9kZWZhdWx0KTtcbiAgfSxcbiAgZ2V0IGNvbnN0cmFpbnRzKCkge1xuICAgIHJldHVybiB0LmFycmF5KHJhd19jb25zdHJhaW50X2RlZl92XzhfdHlwZV9kZWZhdWx0KTtcbiAgfSxcbiAgZ2V0IHNlcXVlbmNlcygpIHtcbiAgICByZXR1cm4gdC5hcnJheShyYXdfc2VxdWVuY2VfZGVmX3ZfOF90eXBlX2RlZmF1bHQpO1xuICB9LFxuICB0YWJsZVR5cGU6IHQuc3RyaW5nKCksXG4gIHRhYmxlQWNjZXNzOiB0LnN0cmluZygpLFxuICBzY2hlZHVsZWQ6IHQub3B0aW9uKHQuc3RyaW5nKCkpXG59KTtcblxuLy8gc3JjL2xpYi9hdXRvZ2VuL3RhYmxlX2Rlc2NfdHlwZS50c1xudmFyIHRhYmxlX2Rlc2NfdHlwZV9kZWZhdWx0ID0gdC5vYmplY3QoXCJUYWJsZURlc2NcIiwge1xuICBnZXQgc2NoZW1hKCkge1xuICAgIHJldHVybiByYXdfdGFibGVfZGVmX3ZfOF90eXBlX2RlZmF1bHQ7XG4gIH0sXG4gIGRhdGE6IHQudTMyKClcbn0pO1xuXG4vLyBzcmMvbGliL2F1dG9nZW4vcmVkdWNlcl9kZWZfdHlwZS50c1xudmFyIHJlZHVjZXJfZGVmX3R5cGVfZGVmYXVsdCA9IHQub2JqZWN0KFwiUmVkdWNlckRlZlwiLCB7XG4gIG5hbWU6IHQuc3RyaW5nKCksXG4gIGdldCBhcmdzKCkge1xuICAgIHJldHVybiB0LmFycmF5KHByb2R1Y3RfdHlwZV9lbGVtZW50X3R5cGVfZGVmYXVsdCk7XG4gIH1cbn0pO1xuXG4vLyBzcmMvbGliL2F1dG9nZW4vdHlwZV9hbGlhc190eXBlLnRzXG52YXIgdHlwZV9hbGlhc190eXBlX2RlZmF1bHQgPSB0Lm9iamVjdChcIlR5cGVBbGlhc1wiLCB7XG4gIG5hbWU6IHQuc3RyaW5nKCksXG4gIHR5OiB0LnUzMigpXG59KTtcblxuLy8gc3JjL2xpYi9hdXRvZ2VuL21pc2NfbW9kdWxlX2V4cG9ydF90eXBlLnRzXG52YXIgTWlzY01vZHVsZUV4cG9ydCA9IHQuZW51bShcIk1pc2NNb2R1bGVFeHBvcnRcIiwge1xuICBnZXQgVHlwZUFsaWFzKCkge1xuICAgIHJldHVybiB0eXBlX2FsaWFzX3R5cGVfZGVmYXVsdDtcbiAgfVxufSk7XG52YXIgbWlzY19tb2R1bGVfZXhwb3J0X3R5cGVfZGVmYXVsdCA9IE1pc2NNb2R1bGVFeHBvcnQ7XG5cbi8vIHNyYy9saWIvYXV0b2dlbi9yYXdfbW9kdWxlX2RlZl92XzhfdHlwZS50c1xudmFyIHJhd19tb2R1bGVfZGVmX3ZfOF90eXBlX2RlZmF1bHQgPSB0Lm9iamVjdChcIlJhd01vZHVsZURlZlY4XCIsIHtcbiAgZ2V0IHR5cGVzcGFjZSgpIHtcbiAgICByZXR1cm4gdHlwZXNwYWNlX3R5cGVfZGVmYXVsdDtcbiAgfSxcbiAgZ2V0IHRhYmxlcygpIHtcbiAgICByZXR1cm4gdC5hcnJheSh0YWJsZV9kZXNjX3R5cGVfZGVmYXVsdCk7XG4gIH0sXG4gIGdldCByZWR1Y2VycygpIHtcbiAgICByZXR1cm4gdC5hcnJheShyZWR1Y2VyX2RlZl90eXBlX2RlZmF1bHQpO1xuICB9LFxuICBnZXQgbWlzY0V4cG9ydHMoKSB7XG4gICAgcmV0dXJuIHQuYXJyYXkobWlzY19tb2R1bGVfZXhwb3J0X3R5cGVfZGVmYXVsdCk7XG4gIH1cbn0pO1xuXG4vLyBzcmMvbGliL2F1dG9nZW4vcmF3X2luZGV4X2RlZl92XzlfdHlwZS50c1xudmFyIHJhd19pbmRleF9kZWZfdl85X3R5cGVfZGVmYXVsdCA9IHQub2JqZWN0KFwiUmF3SW5kZXhEZWZWOVwiLCB7XG4gIG5hbWU6IHQub3B0aW9uKHQuc3RyaW5nKCkpLFxuICBhY2Nlc3Nvck5hbWU6IHQub3B0aW9uKHQuc3RyaW5nKCkpLFxuICBnZXQgYWxnb3JpdGhtKCkge1xuICAgIHJldHVybiByYXdfaW5kZXhfYWxnb3JpdGhtX3R5cGVfZGVmYXVsdDtcbiAgfVxufSk7XG5cbi8vIHNyYy9saWIvYXV0b2dlbi9yYXdfdW5pcXVlX2NvbnN0cmFpbnRfZGF0YV92XzlfdHlwZS50c1xudmFyIHJhd191bmlxdWVfY29uc3RyYWludF9kYXRhX3ZfOV90eXBlX2RlZmF1bHQgPSB0Lm9iamVjdChcIlJhd1VuaXF1ZUNvbnN0cmFpbnREYXRhVjlcIiwge1xuICBjb2x1bW5zOiB0LmFycmF5KHQudTE2KCkpXG59KTtcblxuLy8gc3JjL2xpYi9hdXRvZ2VuL3Jhd19jb25zdHJhaW50X2RhdGFfdl85X3R5cGUudHNcbnZhciBSYXdDb25zdHJhaW50RGF0YVY5ID0gdC5lbnVtKFwiUmF3Q29uc3RyYWludERhdGFWOVwiLCB7XG4gIGdldCBVbmlxdWUoKSB7XG4gICAgcmV0dXJuIHJhd191bmlxdWVfY29uc3RyYWludF9kYXRhX3ZfOV90eXBlX2RlZmF1bHQ7XG4gIH1cbn0pO1xudmFyIHJhd19jb25zdHJhaW50X2RhdGFfdl85X3R5cGVfZGVmYXVsdCA9IFJhd0NvbnN0cmFpbnREYXRhVjk7XG5cbi8vIHNyYy9saWIvYXV0b2dlbi9yYXdfY29uc3RyYWludF9kZWZfdl85X3R5cGUudHNcbnZhciByYXdfY29uc3RyYWludF9kZWZfdl85X3R5cGVfZGVmYXVsdCA9IHQub2JqZWN0KFwiUmF3Q29uc3RyYWludERlZlY5XCIsIHtcbiAgbmFtZTogdC5vcHRpb24odC5zdHJpbmcoKSksXG4gIGdldCBkYXRhKCkge1xuICAgIHJldHVybiByYXdfY29uc3RyYWludF9kYXRhX3ZfOV90eXBlX2RlZmF1bHQ7XG4gIH1cbn0pO1xuXG4vLyBzcmMvbGliL2F1dG9nZW4vcmF3X3NlcXVlbmNlX2RlZl92XzlfdHlwZS50c1xudmFyIHJhd19zZXF1ZW5jZV9kZWZfdl85X3R5cGVfZGVmYXVsdCA9IHQub2JqZWN0KFwiUmF3U2VxdWVuY2VEZWZWOVwiLCB7XG4gIG5hbWU6IHQub3B0aW9uKHQuc3RyaW5nKCkpLFxuICBjb2x1bW46IHQudTE2KCksXG4gIHN0YXJ0OiB0Lm9wdGlvbih0LmkxMjgoKSksXG4gIG1pblZhbHVlOiB0Lm9wdGlvbih0LmkxMjgoKSksXG4gIG1heFZhbHVlOiB0Lm9wdGlvbih0LmkxMjgoKSksXG4gIGluY3JlbWVudDogdC5pMTI4KClcbn0pO1xuXG4vLyBzcmMvbGliL2F1dG9nZW4vcmF3X3NjaGVkdWxlX2RlZl92XzlfdHlwZS50c1xudmFyIHJhd19zY2hlZHVsZV9kZWZfdl85X3R5cGVfZGVmYXVsdCA9IHQub2JqZWN0KFwiUmF3U2NoZWR1bGVEZWZWOVwiLCB7XG4gIG5hbWU6IHQub3B0aW9uKHQuc3RyaW5nKCkpLFxuICByZWR1Y2VyTmFtZTogdC5zdHJpbmcoKSxcbiAgc2NoZWR1bGVkQXRDb2x1bW46IHQudTE2KClcbn0pO1xuXG4vLyBzcmMvbGliL2F1dG9nZW4vdGFibGVfdHlwZV90eXBlLnRzXG52YXIgVGFibGVUeXBlID0gdC5lbnVtKFwiVGFibGVUeXBlXCIsIHtcbiAgU3lzdGVtOiB0LnVuaXQoKSxcbiAgVXNlcjogdC51bml0KClcbn0pO1xudmFyIHRhYmxlX3R5cGVfdHlwZV9kZWZhdWx0ID0gVGFibGVUeXBlO1xuXG4vLyBzcmMvbGliL2F1dG9nZW4vdGFibGVfYWNjZXNzX3R5cGUudHNcbnZhciBUYWJsZUFjY2VzcyA9IHQuZW51bShcIlRhYmxlQWNjZXNzXCIsIHtcbiAgUHVibGljOiB0LnVuaXQoKSxcbiAgUHJpdmF0ZTogdC51bml0KClcbn0pO1xudmFyIHRhYmxlX2FjY2Vzc190eXBlX2RlZmF1bHQgPSBUYWJsZUFjY2VzcztcblxuLy8gc3JjL2xpYi9hdXRvZ2VuL3Jhd190YWJsZV9kZWZfdl85X3R5cGUudHNcbnZhciByYXdfdGFibGVfZGVmX3ZfOV90eXBlX2RlZmF1bHQgPSB0Lm9iamVjdChcIlJhd1RhYmxlRGVmVjlcIiwge1xuICBuYW1lOiB0LnN0cmluZygpLFxuICBwcm9kdWN0VHlwZVJlZjogdC51MzIoKSxcbiAgcHJpbWFyeUtleTogdC5hcnJheSh0LnUxNigpKSxcbiAgZ2V0IGluZGV4ZXMoKSB7XG4gICAgcmV0dXJuIHQuYXJyYXkocmF3X2luZGV4X2RlZl92XzlfdHlwZV9kZWZhdWx0KTtcbiAgfSxcbiAgZ2V0IGNvbnN0cmFpbnRzKCkge1xuICAgIHJldHVybiB0LmFycmF5KHJhd19jb25zdHJhaW50X2RlZl92XzlfdHlwZV9kZWZhdWx0KTtcbiAgfSxcbiAgZ2V0IHNlcXVlbmNlcygpIHtcbiAgICByZXR1cm4gdC5hcnJheShyYXdfc2VxdWVuY2VfZGVmX3ZfOV90eXBlX2RlZmF1bHQpO1xuICB9LFxuICBnZXQgc2NoZWR1bGUoKSB7XG4gICAgcmV0dXJuIHQub3B0aW9uKHJhd19zY2hlZHVsZV9kZWZfdl85X3R5cGVfZGVmYXVsdCk7XG4gIH0sXG4gIGdldCB0YWJsZVR5cGUoKSB7XG4gICAgcmV0dXJuIHRhYmxlX3R5cGVfdHlwZV9kZWZhdWx0O1xuICB9LFxuICBnZXQgdGFibGVBY2Nlc3MoKSB7XG4gICAgcmV0dXJuIHRhYmxlX2FjY2Vzc190eXBlX2RlZmF1bHQ7XG4gIH1cbn0pO1xuXG4vLyBzcmMvbGliL2F1dG9nZW4vcmF3X3JlZHVjZXJfZGVmX3ZfOV90eXBlLnRzXG52YXIgcmF3X3JlZHVjZXJfZGVmX3ZfOV90eXBlX2RlZmF1bHQgPSB0Lm9iamVjdChcIlJhd1JlZHVjZXJEZWZWOVwiLCB7XG4gIG5hbWU6IHQuc3RyaW5nKCksXG4gIGdldCBwYXJhbXMoKSB7XG4gICAgcmV0dXJuIHByb2R1Y3RfdHlwZV90eXBlX2RlZmF1bHQ7XG4gIH0sXG4gIGdldCBsaWZlY3ljbGUoKSB7XG4gICAgcmV0dXJuIHQub3B0aW9uKGxpZmVjeWNsZV90eXBlX2RlZmF1bHQpO1xuICB9XG59KTtcblxuLy8gc3JjL2xpYi9hdXRvZ2VuL3Jhd19zY29wZWRfdHlwZV9uYW1lX3ZfOV90eXBlLnRzXG52YXIgcmF3X3Njb3BlZF90eXBlX25hbWVfdl85X3R5cGVfZGVmYXVsdCA9IHQub2JqZWN0KFwiUmF3U2NvcGVkVHlwZU5hbWVWOVwiLCB7XG4gIHNjb3BlOiB0LmFycmF5KHQuc3RyaW5nKCkpLFxuICBuYW1lOiB0LnN0cmluZygpXG59KTtcblxuLy8gc3JjL2xpYi9hdXRvZ2VuL3Jhd190eXBlX2RlZl92XzlfdHlwZS50c1xudmFyIHJhd190eXBlX2RlZl92XzlfdHlwZV9kZWZhdWx0ID0gdC5vYmplY3QoXCJSYXdUeXBlRGVmVjlcIiwge1xuICBnZXQgbmFtZSgpIHtcbiAgICByZXR1cm4gcmF3X3Njb3BlZF90eXBlX25hbWVfdl85X3R5cGVfZGVmYXVsdDtcbiAgfSxcbiAgdHk6IHQudTMyKCksXG4gIGN1c3RvbU9yZGVyaW5nOiB0LmJvb2woKVxufSk7XG5cbi8vIHNyYy9saWIvYXV0b2dlbi9yYXdfY29sdW1uX2RlZmF1bHRfdmFsdWVfdl85X3R5cGUudHNcbnZhciByYXdfY29sdW1uX2RlZmF1bHRfdmFsdWVfdl85X3R5cGVfZGVmYXVsdCA9IHQub2JqZWN0KFwiUmF3Q29sdW1uRGVmYXVsdFZhbHVlVjlcIiwge1xuICB0YWJsZTogdC5zdHJpbmcoKSxcbiAgY29sSWQ6IHQudTE2KCksXG4gIHZhbHVlOiB0LmJ5dGVBcnJheSgpXG59KTtcblxuLy8gc3JjL2xpYi9hdXRvZ2VuL3Jhd19wcm9jZWR1cmVfZGVmX3ZfOV90eXBlLnRzXG52YXIgcmF3X3Byb2NlZHVyZV9kZWZfdl85X3R5cGVfZGVmYXVsdCA9IHQub2JqZWN0KFwiUmF3UHJvY2VkdXJlRGVmVjlcIiwge1xuICBuYW1lOiB0LnN0cmluZygpLFxuICBnZXQgcGFyYW1zKCkge1xuICAgIHJldHVybiBwcm9kdWN0X3R5cGVfdHlwZV9kZWZhdWx0O1xuICB9LFxuICBnZXQgcmV0dXJuVHlwZSgpIHtcbiAgICByZXR1cm4gYWxnZWJyYWljX3R5cGVfdHlwZV9kZWZhdWx0O1xuICB9XG59KTtcblxuLy8gc3JjL2xpYi9hdXRvZ2VuL3Jhd192aWV3X2RlZl92XzlfdHlwZS50c1xudmFyIHJhd192aWV3X2RlZl92XzlfdHlwZV9kZWZhdWx0ID0gdC5vYmplY3QoXCJSYXdWaWV3RGVmVjlcIiwge1xuICBuYW1lOiB0LnN0cmluZygpLFxuICBpbmRleDogdC51MzIoKSxcbiAgaXNQdWJsaWM6IHQuYm9vbCgpLFxuICBpc0Fub255bW91czogdC5ib29sKCksXG4gIGdldCBwYXJhbXMoKSB7XG4gICAgcmV0dXJuIHByb2R1Y3RfdHlwZV90eXBlX2RlZmF1bHQ7XG4gIH0sXG4gIGdldCByZXR1cm5UeXBlKCkge1xuICAgIHJldHVybiBhbGdlYnJhaWNfdHlwZV90eXBlX2RlZmF1bHQ7XG4gIH1cbn0pO1xuXG4vLyBzcmMvbGliL2F1dG9nZW4vcmF3X21pc2NfbW9kdWxlX2V4cG9ydF92XzlfdHlwZS50c1xudmFyIFJhd01pc2NNb2R1bGVFeHBvcnRWOSA9IHQuZW51bShcIlJhd01pc2NNb2R1bGVFeHBvcnRWOVwiLCB7XG4gIGdldCBDb2x1bW5EZWZhdWx0VmFsdWUoKSB7XG4gICAgcmV0dXJuIHJhd19jb2x1bW5fZGVmYXVsdF92YWx1ZV92XzlfdHlwZV9kZWZhdWx0O1xuICB9LFxuICBnZXQgUHJvY2VkdXJlKCkge1xuICAgIHJldHVybiByYXdfcHJvY2VkdXJlX2RlZl92XzlfdHlwZV9kZWZhdWx0O1xuICB9LFxuICBnZXQgVmlldygpIHtcbiAgICByZXR1cm4gcmF3X3ZpZXdfZGVmX3ZfOV90eXBlX2RlZmF1bHQ7XG4gIH1cbn0pO1xudmFyIHJhd19taXNjX21vZHVsZV9leHBvcnRfdl85X3R5cGVfZGVmYXVsdCA9IFJhd01pc2NNb2R1bGVFeHBvcnRWOTtcblxuLy8gc3JjL2xpYi9hdXRvZ2VuL3Jhd19yb3dfbGV2ZWxfc2VjdXJpdHlfZGVmX3ZfOV90eXBlLnRzXG52YXIgcmF3X3Jvd19sZXZlbF9zZWN1cml0eV9kZWZfdl85X3R5cGVfZGVmYXVsdCA9IHQub2JqZWN0KFwiUmF3Um93TGV2ZWxTZWN1cml0eURlZlY5XCIsIHtcbiAgc3FsOiB0LnN0cmluZygpXG59KTtcblxuLy8gc3JjL2xpYi9hdXRvZ2VuL3Jhd19tb2R1bGVfZGVmX3ZfOV90eXBlLnRzXG52YXIgcmF3X21vZHVsZV9kZWZfdl85X3R5cGVfZGVmYXVsdCA9IHQub2JqZWN0KFwiUmF3TW9kdWxlRGVmVjlcIiwge1xuICBnZXQgdHlwZXNwYWNlKCkge1xuICAgIHJldHVybiB0eXBlc3BhY2VfdHlwZV9kZWZhdWx0O1xuICB9LFxuICBnZXQgdGFibGVzKCkge1xuICAgIHJldHVybiB0LmFycmF5KHJhd190YWJsZV9kZWZfdl85X3R5cGVfZGVmYXVsdCk7XG4gIH0sXG4gIGdldCByZWR1Y2VycygpIHtcbiAgICByZXR1cm4gdC5hcnJheShyYXdfcmVkdWNlcl9kZWZfdl85X3R5cGVfZGVmYXVsdCk7XG4gIH0sXG4gIGdldCB0eXBlcygpIHtcbiAgICByZXR1cm4gdC5hcnJheShyYXdfdHlwZV9kZWZfdl85X3R5cGVfZGVmYXVsdCk7XG4gIH0sXG4gIGdldCBtaXNjRXhwb3J0cygpIHtcbiAgICByZXR1cm4gdC5hcnJheShyYXdfbWlzY19tb2R1bGVfZXhwb3J0X3ZfOV90eXBlX2RlZmF1bHQpO1xuICB9LFxuICBnZXQgcm93TGV2ZWxTZWN1cml0eSgpIHtcbiAgICByZXR1cm4gdC5hcnJheShyYXdfcm93X2xldmVsX3NlY3VyaXR5X2RlZl92XzlfdHlwZV9kZWZhdWx0KTtcbiAgfVxufSk7XG5cbi8vIHNyYy9saWIvYXV0b2dlbi9yYXdfbW9kdWxlX2RlZl90eXBlLnRzXG52YXIgUmF3TW9kdWxlRGVmID0gdC5lbnVtKFwiUmF3TW9kdWxlRGVmXCIsIHtcbiAgZ2V0IFY4QmFja0NvbXBhdCgpIHtcbiAgICByZXR1cm4gcmF3X21vZHVsZV9kZWZfdl84X3R5cGVfZGVmYXVsdDtcbiAgfSxcbiAgZ2V0IFY5KCkge1xuICAgIHJldHVybiByYXdfbW9kdWxlX2RlZl92XzlfdHlwZV9kZWZhdWx0O1xuICB9XG59KTtcbnZhciByYXdfbW9kdWxlX2RlZl90eXBlX2RlZmF1bHQgPSBSYXdNb2R1bGVEZWY7XG5cbi8vIHNyYy9zZXJ2ZXIvcmFuZ2UudHNcbnZhciBSYW5nZSA9IGNsYXNzIHtcbiAgI2Zyb207XG4gICN0bztcbiAgY29uc3RydWN0b3IoZnJvbSwgdG8pIHtcbiAgICB0aGlzLiNmcm9tID0gZnJvbSA/PyB7IHRhZzogXCJ1bmJvdW5kZWRcIiB9O1xuICAgIHRoaXMuI3RvID0gdG8gPz8geyB0YWc6IFwidW5ib3VuZGVkXCIgfTtcbiAgfVxuICBnZXQgZnJvbSgpIHtcbiAgICByZXR1cm4gdGhpcy4jZnJvbTtcbiAgfVxuICBnZXQgdG8oKSB7XG4gICAgcmV0dXJuIHRoaXMuI3RvO1xuICB9XG59O1xuXG4vLyBzcmMvc2VydmVyL2h0dHBfaW50ZXJuYWwudHNcbnZhciBpbXBvcnRfc3RhdHVzZXMgPSBfX3RvRVNNKHJlcXVpcmVfc3RhdHVzZXMoKSk7XG5cbi8vIHNyYy9saWIvYXV0b2dlbi9odHRwX2hlYWRlcl9wYWlyX3R5cGUudHNcbnZhciBodHRwX2hlYWRlcl9wYWlyX3R5cGVfZGVmYXVsdCA9IHQub2JqZWN0KFwiSHR0cEhlYWRlclBhaXJcIiwge1xuICBuYW1lOiB0LnN0cmluZygpLFxuICB2YWx1ZTogdC5ieXRlQXJyYXkoKVxufSk7XG5cbi8vIHNyYy9saWIvYXV0b2dlbi9odHRwX2hlYWRlcnNfdHlwZS50c1xudmFyIGh0dHBfaGVhZGVyc190eXBlX2RlZmF1bHQgPSB0Lm9iamVjdChcIkh0dHBIZWFkZXJzXCIsIHtcbiAgZ2V0IGVudHJpZXMoKSB7XG4gICAgcmV0dXJuIHQuYXJyYXkoaHR0cF9oZWFkZXJfcGFpcl90eXBlX2RlZmF1bHQpO1xuICB9XG59KTtcblxuLy8gc3JjL2xpYi9hdXRvZ2VuL2h0dHBfbWV0aG9kX3R5cGUudHNcbnZhciBIdHRwTWV0aG9kID0gdC5lbnVtKFwiSHR0cE1ldGhvZFwiLCB7XG4gIEdldDogdC51bml0KCksXG4gIEhlYWQ6IHQudW5pdCgpLFxuICBQb3N0OiB0LnVuaXQoKSxcbiAgUHV0OiB0LnVuaXQoKSxcbiAgRGVsZXRlOiB0LnVuaXQoKSxcbiAgQ29ubmVjdDogdC51bml0KCksXG4gIE9wdGlvbnM6IHQudW5pdCgpLFxuICBUcmFjZTogdC51bml0KCksXG4gIFBhdGNoOiB0LnVuaXQoKSxcbiAgRXh0ZW5zaW9uOiB0LnN0cmluZygpXG59KTtcbnZhciBodHRwX21ldGhvZF90eXBlX2RlZmF1bHQgPSBIdHRwTWV0aG9kO1xuXG4vLyBzcmMvbGliL2F1dG9nZW4vaHR0cF92ZXJzaW9uX3R5cGUudHNcbnZhciBIdHRwVmVyc2lvbiA9IHQuZW51bShcIkh0dHBWZXJzaW9uXCIsIHtcbiAgSHR0cDA5OiB0LnVuaXQoKSxcbiAgSHR0cDEwOiB0LnVuaXQoKSxcbiAgSHR0cDExOiB0LnVuaXQoKSxcbiAgSHR0cDI6IHQudW5pdCgpLFxuICBIdHRwMzogdC51bml0KClcbn0pO1xudmFyIGh0dHBfdmVyc2lvbl90eXBlX2RlZmF1bHQgPSBIdHRwVmVyc2lvbjtcblxuLy8gc3JjL2xpYi9hdXRvZ2VuL2h0dHBfcmVxdWVzdF90eXBlLnRzXG52YXIgaHR0cF9yZXF1ZXN0X3R5cGVfZGVmYXVsdCA9IHQub2JqZWN0KFwiSHR0cFJlcXVlc3RcIiwge1xuICBnZXQgbWV0aG9kKCkge1xuICAgIHJldHVybiBodHRwX21ldGhvZF90eXBlX2RlZmF1bHQ7XG4gIH0sXG4gIGdldCBoZWFkZXJzKCkge1xuICAgIHJldHVybiBodHRwX2hlYWRlcnNfdHlwZV9kZWZhdWx0O1xuICB9LFxuICB0aW1lb3V0OiB0Lm9wdGlvbih0LnRpbWVEdXJhdGlvbigpKSxcbiAgdXJpOiB0LnN0cmluZygpLFxuICBnZXQgdmVyc2lvbigpIHtcbiAgICByZXR1cm4gaHR0cF92ZXJzaW9uX3R5cGVfZGVmYXVsdDtcbiAgfVxufSk7XG5cbi8vIHNyYy9saWIvYXV0b2dlbi9odHRwX3Jlc3BvbnNlX3R5cGUudHNcbnZhciBodHRwX3Jlc3BvbnNlX3R5cGVfZGVmYXVsdCA9IHQub2JqZWN0KFwiSHR0cFJlc3BvbnNlXCIsIHtcbiAgZ2V0IGhlYWRlcnMoKSB7XG4gICAgcmV0dXJuIGh0dHBfaGVhZGVyc190eXBlX2RlZmF1bHQ7XG4gIH0sXG4gIGdldCB2ZXJzaW9uKCkge1xuICAgIHJldHVybiBodHRwX3ZlcnNpb25fdHlwZV9kZWZhdWx0O1xuICB9LFxuICBjb2RlOiB0LnUxNigpXG59KTtcblxuLy8gc3JjL3NlcnZlci9odHRwX2ludGVybmFsLnRzXG52YXIgeyBmcmVlemUgfSA9IE9iamVjdDtcbnZhciB0ZXh0RW5jb2RlciA9IG5ldyBUZXh0RW5jb2RlcigpO1xudmFyIHRleHREZWNvZGVyID0gbmV3IFRleHREZWNvZGVyKFxuICBcInV0Zi04XCJcbiAgLyogeyBmYXRhbDogdHJ1ZSB9ICovXG4pO1xudmFyIG1ha2VSZXNwb25zZSA9IFN5bWJvbChcIm1ha2VSZXNwb25zZVwiKTtcbnZhciBTeW5jUmVzcG9uc2UgPSBjbGFzcyBfU3luY1Jlc3BvbnNlIHtcbiAgI2JvZHk7XG4gICNpbm5lcjtcbiAgY29uc3RydWN0b3IoYm9keSwgaW5pdDIpIHtcbiAgICBpZiAoYm9keSA9PSBudWxsKSB7XG4gICAgICB0aGlzLiNib2R5ID0gbnVsbDtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBib2R5ID09PSBcInN0cmluZ1wiKSB7XG4gICAgICB0aGlzLiNib2R5ID0gYm9keTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy4jYm9keSA9IG5ldyBVaW50OEFycmF5KGJvZHkpLmJ1ZmZlcjtcbiAgICB9XG4gICAgdGhpcy4jaW5uZXIgPSB7XG4gICAgICBoZWFkZXJzOiBuZXcgSGVhZGVycyhpbml0Mj8uaGVhZGVycyksXG4gICAgICBzdGF0dXM6IGluaXQyPy5zdGF0dXMgPz8gMjAwLFxuICAgICAgc3RhdHVzVGV4dDogaW5pdDI/LnN0YXR1c1RleHQgPz8gXCJcIixcbiAgICAgIHR5cGU6IFwiZGVmYXVsdFwiLFxuICAgICAgdXJsOiBudWxsLFxuICAgICAgYWJvcnRlZDogZmFsc2VcbiAgICB9O1xuICB9XG4gIHN0YXRpYyBbbWFrZVJlc3BvbnNlXShib2R5LCBpbm5lcikge1xuICAgIGNvbnN0IG1lID0gbmV3IF9TeW5jUmVzcG9uc2UoYm9keSk7XG4gICAgbWUuI2lubmVyID0gaW5uZXI7XG4gICAgcmV0dXJuIG1lO1xuICB9XG4gIGdldCBoZWFkZXJzKCkge1xuICAgIHJldHVybiB0aGlzLiNpbm5lci5oZWFkZXJzO1xuICB9XG4gIGdldCBzdGF0dXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuI2lubmVyLnN0YXR1cztcbiAgfVxuICBnZXQgc3RhdHVzVGV4dCgpIHtcbiAgICByZXR1cm4gdGhpcy4jaW5uZXIuc3RhdHVzVGV4dDtcbiAgfVxuICBnZXQgb2soKSB7XG4gICAgcmV0dXJuIDIwMCA8PSB0aGlzLiNpbm5lci5zdGF0dXMgJiYgdGhpcy4jaW5uZXIuc3RhdHVzIDw9IDI5OTtcbiAgfVxuICBnZXQgdXJsKCkge1xuICAgIHJldHVybiB0aGlzLiNpbm5lci51cmwgPz8gXCJcIjtcbiAgfVxuICBnZXQgdHlwZSgpIHtcbiAgICByZXR1cm4gdGhpcy4jaW5uZXIudHlwZTtcbiAgfVxuICBhcnJheUJ1ZmZlcigpIHtcbiAgICByZXR1cm4gdGhpcy5ieXRlcygpLmJ1ZmZlcjtcbiAgfVxuICBieXRlcygpIHtcbiAgICBpZiAodGhpcy4jYm9keSA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiB0aGlzLiNib2R5ID09PSBcInN0cmluZ1wiKSB7XG4gICAgICByZXR1cm4gdGV4dEVuY29kZXIuZW5jb2RlKHRoaXMuI2JvZHkpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkodGhpcy4jYm9keSk7XG4gICAgfVxuICB9XG4gIGpzb24oKSB7XG4gICAgcmV0dXJuIEpTT04ucGFyc2UodGhpcy50ZXh0KCkpO1xuICB9XG4gIHRleHQoKSB7XG4gICAgaWYgKHRoaXMuI2JvZHkgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIFwiXCI7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgdGhpcy4jYm9keSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgcmV0dXJuIHRoaXMuI2JvZHk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0ZXh0RGVjb2Rlci5kZWNvZGUodGhpcy4jYm9keSk7XG4gICAgfVxuICB9XG59O1xudmFyIHJlcXVlc3RCYXNlU2l6ZSA9IGJzYXRuQmFzZVNpemUoeyB0eXBlczogW10gfSwgaHR0cF9yZXF1ZXN0X3R5cGVfZGVmYXVsdC5hbGdlYnJhaWNUeXBlKTtcbnZhciBtZXRob2RzID0gLyogQF9fUFVSRV9fICovIG5ldyBNYXAoW1xuICBbXCJHRVRcIiwgeyB0YWc6IFwiR2V0XCIgfV0sXG4gIFtcIkhFQURcIiwgeyB0YWc6IFwiSGVhZFwiIH1dLFxuICBbXCJQT1NUXCIsIHsgdGFnOiBcIlBvc3RcIiB9XSxcbiAgW1wiUFVUXCIsIHsgdGFnOiBcIlB1dFwiIH1dLFxuICBbXCJERUxFVEVcIiwgeyB0YWc6IFwiRGVsZXRlXCIgfV0sXG4gIFtcIkNPTk5FQ1RcIiwgeyB0YWc6IFwiQ29ubmVjdFwiIH1dLFxuICBbXCJPUFRJT05TXCIsIHsgdGFnOiBcIk9wdGlvbnNcIiB9XSxcbiAgW1wiVFJBQ0VcIiwgeyB0YWc6IFwiVHJhY2VcIiB9XSxcbiAgW1wiUEFUQ0hcIiwgeyB0YWc6IFwiUGF0Y2hcIiB9XVxuXSk7XG5mdW5jdGlvbiBmZXRjaCh1cmwsIGluaXQyID0ge30pIHtcbiAgY29uc3QgbWV0aG9kID0gbWV0aG9kcy5nZXQoaW5pdDIubWV0aG9kPy50b1VwcGVyQ2FzZSgpID8/IFwiR0VUXCIpID8/IHtcbiAgICB0YWc6IFwiRXh0ZW5zaW9uXCIsXG4gICAgdmFsdWU6IGluaXQyLm1ldGhvZFxuICB9O1xuICBjb25zdCBoZWFkZXJzID0ge1xuICAgIC8vIGFueXMgYmVjYXVzZSB0aGUgdHlwaW5ncyBhcmUgd29ua3kgLSBzZWUgY29tbWVudCBpbiBTeW5jUmVzcG9uc2UuY29uc3RydWN0b3JcbiAgICBlbnRyaWVzOiBoZWFkZXJzVG9MaXN0KG5ldyBIZWFkZXJzKGluaXQyLmhlYWRlcnMpKS5mbGF0TWFwKChbaywgdl0pID0+IEFycmF5LmlzQXJyYXkodikgPyB2Lm1hcCgodjIpID0+IFtrLCB2Ml0pIDogW1trLCB2XV0pLm1hcCgoW25hbWUsIHZhbHVlXSkgPT4gKHsgbmFtZSwgdmFsdWU6IHRleHRFbmNvZGVyLmVuY29kZSh2YWx1ZSkgfSkpXG4gIH07XG4gIGNvbnN0IHVyaSA9IFwiXCIgKyB1cmw7XG4gIGNvbnN0IHJlcXVlc3QgPSBmcmVlemUoe1xuICAgIG1ldGhvZCxcbiAgICBoZWFkZXJzLFxuICAgIHRpbWVvdXQ6IGluaXQyLnRpbWVvdXQsXG4gICAgdXJpLFxuICAgIHZlcnNpb246IHsgdGFnOiBcIkh0dHAxMVwiIH1cbiAgfSk7XG4gIGNvbnN0IHJlcXVlc3RCdWYgPSBuZXcgQmluYXJ5V3JpdGVyKHJlcXVlc3RCYXNlU2l6ZSk7XG4gIGh0dHBfcmVxdWVzdF90eXBlX2RlZmF1bHQuc2VyaWFsaXplKHJlcXVlc3RCdWYsIHJlcXVlc3QpO1xuICBjb25zdCBib2R5ID0gaW5pdDIuYm9keSA9PSBudWxsID8gbmV3IFVpbnQ4QXJyYXkoKSA6IHR5cGVvZiBpbml0Mi5ib2R5ID09PSBcInN0cmluZ1wiID8gaW5pdDIuYm9keSA6IG5ldyBVaW50OEFycmF5KGluaXQyLmJvZHkpO1xuICBjb25zdCBbcmVzcG9uc2VCdWYsIHJlc3BvbnNlQm9keV0gPSBzeXMucHJvY2VkdXJlX2h0dHBfcmVxdWVzdChcbiAgICByZXF1ZXN0QnVmLmdldEJ1ZmZlcigpLFxuICAgIGJvZHlcbiAgKTtcbiAgY29uc3QgcmVzcG9uc2UgPSBodHRwX3Jlc3BvbnNlX3R5cGVfZGVmYXVsdC5kZXNlcmlhbGl6ZShuZXcgQmluYXJ5UmVhZGVyKHJlc3BvbnNlQnVmKSk7XG4gIHJldHVybiBTeW5jUmVzcG9uc2VbbWFrZVJlc3BvbnNlXShyZXNwb25zZUJvZHksIHtcbiAgICB0eXBlOiBcImJhc2ljXCIsXG4gICAgdXJsOiB1cmksXG4gICAgc3RhdHVzOiByZXNwb25zZS5jb2RlLFxuICAgIHN0YXR1c1RleHQ6ICgwLCBpbXBvcnRfc3RhdHVzZXMuZGVmYXVsdCkocmVzcG9uc2UuY29kZSksXG4gICAgaGVhZGVyczogbmV3IEhlYWRlcnMoKSxcbiAgICBhYm9ydGVkOiBmYWxzZVxuICB9KTtcbn1cbmZyZWV6ZShmZXRjaCk7XG52YXIgaHR0cENsaWVudCA9IGZyZWV6ZSh7IGZldGNoIH0pO1xuXG4vLyBzcmMvc2VydmVyL3Byb2NlZHVyZXMudHNcbnZhciB7IGZyZWV6ZTogZnJlZXplMiB9ID0gT2JqZWN0O1xuZnVuY3Rpb24gY2FsbFByb2NlZHVyZShpZCwgc2VuZGVyLCBjb25uZWN0aW9uSWQsIHRpbWVzdGFtcCwgYXJnc0J1Zikge1xuICBjb25zdCB7IGZuLCBwYXJhbXNUeXBlLCByZXR1cm5UeXBlLCByZXR1cm5UeXBlQmFzZVNpemUgfSA9IFBST0NFRFVSRVNbaWRdO1xuICBjb25zdCBhcmdzID0gUHJvZHVjdFR5cGUuZGVzZXJpYWxpemVWYWx1ZShcbiAgICBuZXcgQmluYXJ5UmVhZGVyKGFyZ3NCdWYpLFxuICAgIHBhcmFtc1R5cGUsXG4gICAgTU9EVUxFX0RFRi50eXBlc3BhY2VcbiAgKTtcbiAgY29uc3QgY3R4ID0ge1xuICAgIHNlbmRlcixcbiAgICB0aW1lc3RhbXAsXG4gICAgY29ubmVjdGlvbklkLFxuICAgIGh0dHA6IGh0dHBDbGllbnQsXG4gICAgLy8gKipOb3RlOioqIG11c3QgYmUgMC4uPXUzMjo6TUFYXG4gICAgY291bnRlcl91dWlkOiB7IHZhbHVlOiBOdW1iZXIoMCkgfSxcbiAgICBnZXQgaWRlbnRpdHkoKSB7XG4gICAgICByZXR1cm4gbmV3IElkZW50aXR5KHN5cy5pZGVudGl0eSgpLl9faWRlbnRpdHlfXyk7XG4gICAgfSxcbiAgICB3aXRoVHgoYm9keSkge1xuICAgICAgY29uc3QgcnVuID0gKCkgPT4ge1xuICAgICAgICBjb25zdCB0aW1lc3RhbXAyID0gc3lzLnByb2NlZHVyZV9zdGFydF9tdXRfdHgoKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBjb25zdCBjdHgyID0gbmV3IFJlZHVjZXJDdHhJbXBsKFxuICAgICAgICAgICAgc2VuZGVyLFxuICAgICAgICAgICAgbmV3IFRpbWVzdGFtcCh0aW1lc3RhbXAyKSxcbiAgICAgICAgICAgIGNvbm5lY3Rpb25JZFxuICAgICAgICAgICk7XG4gICAgICAgICAgcmV0dXJuIGJvZHkoY3R4Mik7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICBzeXMucHJvY2VkdXJlX2Fib3J0X211dF90eCgpO1xuICAgICAgICAgIHRocm93IGU7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICBsZXQgcmVzID0gcnVuKCk7XG4gICAgICB0cnkge1xuICAgICAgICBzeXMucHJvY2VkdXJlX2NvbW1pdF9tdXRfdHgoKTtcbiAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgIH0gY2F0Y2gge1xuICAgICAgfVxuICAgICAgY29uc29sZS53YXJuKFwiY29tbWl0dGluZyBhbm9ueW1vdXMgdHJhbnNhY3Rpb24gZmFpbGVkXCIpO1xuICAgICAgcmVzID0gcnVuKCk7XG4gICAgICB0cnkge1xuICAgICAgICBzeXMucHJvY2VkdXJlX2NvbW1pdF9tdXRfdHgoKTtcbiAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwidHJhbnNhY3Rpb24gcmV0cnkgZmFpbGVkIGFnYWluXCIsIHsgY2F1c2U6IGUgfSk7XG4gICAgICB9XG4gICAgfSxcbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYSBuZXcgcmFuZG9tIHtAbGluayBVdWlkfSBgdjRgIHVzaW5nIHRoZSB7QGxpbmsgY3J5cHRvfSBSTkcuXG4gICAgICpcbiAgICAgKiBXQVJOOiBVbnRpbCB3ZSB1c2UgYSBzcGFjZXRpbWUgUk5HIHRoaXMgbWFrZSBjYWxscyBub24tZGV0ZXJtaW5pc3RpYy5cbiAgICAgKi9cbiAgICBuZXdVdWlkVjQoKSB7XG4gICAgICBjb25zdCBieXRlcyA9IGNyeXB0by5nZXRSYW5kb21WYWx1ZXMobmV3IFVpbnQ4QXJyYXkoMTYpKTtcbiAgICAgIHJldHVybiBVdWlkLmZyb21SYW5kb21CeXRlc1Y0KGJ5dGVzKTtcbiAgICB9LFxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIG5ldyBzb3J0YWJsZSB7QGxpbmsgVXVpZH0gYHY3YCB1c2luZyB0aGUge0BsaW5rIGNyeXB0b30gUk5HLCBjb3VudGVyLFxuICAgICAqIGFuZCB0aGUgdGltZXN0YW1wLlxuICAgICAqXG4gICAgICogV0FSTjogVW50aWwgd2UgdXNlIGEgc3BhY2V0aW1lIFJORyB0aGlzIG1ha2UgY2FsbHMgbm9uLWRldGVybWluaXN0aWMuXG4gICAgICovXG4gICAgbmV3VXVpZFY3KCkge1xuICAgICAgY29uc3QgYnl0ZXMgPSBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKG5ldyBVaW50OEFycmF5KDEwKSk7XG4gICAgICByZXR1cm4gVXVpZC5mcm9tQ291bnRlclY3KHRoaXMuY291bnRlcl91dWlkLCB0aGlzLnRpbWVzdGFtcCwgYnl0ZXMpO1xuICAgIH1cbiAgfTtcbiAgZnJlZXplMihjdHgpO1xuICBjb25zdCByZXQgPSBjYWxsVXNlckZ1bmN0aW9uKGZuLCBjdHgsIGFyZ3MpO1xuICBjb25zdCByZXRCdWYgPSBuZXcgQmluYXJ5V3JpdGVyKHJldHVyblR5cGVCYXNlU2l6ZSk7XG4gIEFsZ2VicmFpY1R5cGUuc2VyaWFsaXplVmFsdWUocmV0QnVmLCByZXR1cm5UeXBlLCByZXQsIE1PRFVMRV9ERUYudHlwZXNwYWNlKTtcbiAgcmV0dXJuIHJldEJ1Zi5nZXRCdWZmZXIoKTtcbn1cblxuLy8gc3JjL2xpYi9hdXRvZ2VuL3ZpZXdfcmVzdWx0X2hlYWRlcl90eXBlLnRzXG52YXIgVmlld1Jlc3VsdEhlYWRlciA9IHQuZW51bShcIlZpZXdSZXN1bHRIZWFkZXJcIiwge1xuICBSb3dEYXRhOiB0LnVuaXQoKSxcbiAgUmF3U3FsOiB0LnN0cmluZygpXG59KTtcbnZhciB2aWV3X3Jlc3VsdF9oZWFkZXJfdHlwZV9kZWZhdWx0ID0gVmlld1Jlc3VsdEhlYWRlcjtcblxuLy8gc3JjL3NlcnZlci9ydW50aW1lLnRzXG52YXIgeyBmcmVlemU6IGZyZWV6ZTMgfSA9IE9iamVjdDtcbnZhciBzeXMgPSBmcmVlemUzKHdyYXBTeXNjYWxscyhfc3lzY2FsbHMxXzAsIF9zeXNjYWxsczFfMikpO1xuZnVuY3Rpb24gcGFyc2VKc29uT2JqZWN0KGpzb24pIHtcbiAgbGV0IHZhbHVlO1xuICB0cnkge1xuICAgIHZhbHVlID0gSlNPTi5wYXJzZShqc29uKTtcbiAgfSBjYXRjaCB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBKU09OOiBmYWlsZWQgdG8gcGFyc2Ugc3RyaW5nXCIpO1xuICB9XG4gIGlmICh2YWx1ZSA9PT0gbnVsbCB8fCB0eXBlb2YgdmFsdWUgIT09IFwib2JqZWN0XCIgfHwgQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJFeHBlY3RlZCBhIEpTT04gb2JqZWN0IGF0IHRoZSB0b3AgbGV2ZWxcIik7XG4gIH1cbiAgcmV0dXJuIHZhbHVlO1xufVxudmFyIEp3dENsYWltc0ltcGwgPSBjbGFzcyB7XG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IEp3dENsYWltcyBpbnN0YW5jZS5cbiAgICogQHBhcmFtIHJhd1BheWxvYWQgVGhlIEpXVCBwYXlsb2FkIGFzIGEgcmF3IEpTT04gc3RyaW5nLlxuICAgKiBAcGFyYW0gaWRlbnRpdHkgVGhlIGlkZW50aXR5IGZvciB0aGlzIEpXVC4gV2UgYXJlIG9ubHkgdGFraW5nIHRoaXMgYmVjYXVzZSB3ZSBkb24ndCBoYXZlIGEgYmxha2UzIGltcGxlbWVudGF0aW9uICh3aGljaCB3ZSBuZWVkIHRvIGNvbXB1dGUgaXQpLlxuICAgKi9cbiAgY29uc3RydWN0b3IocmF3UGF5bG9hZCwgaWRlbnRpdHkpIHtcbiAgICB0aGlzLnJhd1BheWxvYWQgPSByYXdQYXlsb2FkO1xuICAgIHRoaXMuZnVsbFBheWxvYWQgPSBwYXJzZUpzb25PYmplY3QocmF3UGF5bG9hZCk7XG4gICAgdGhpcy5faWRlbnRpdHkgPSBpZGVudGl0eTtcbiAgfVxuICBmdWxsUGF5bG9hZDtcbiAgX2lkZW50aXR5O1xuICBnZXQgaWRlbnRpdHkoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2lkZW50aXR5O1xuICB9XG4gIGdldCBzdWJqZWN0KCkge1xuICAgIHJldHVybiB0aGlzLmZ1bGxQYXlsb2FkW1wic3ViXCJdO1xuICB9XG4gIGdldCBpc3N1ZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuZnVsbFBheWxvYWRbXCJpc3NcIl07XG4gIH1cbiAgZ2V0IGF1ZGllbmNlKCkge1xuICAgIGNvbnN0IGF1ZCA9IHRoaXMuZnVsbFBheWxvYWRbXCJhdWRcIl07XG4gICAgaWYgKGF1ZCA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gW107XG4gICAgfVxuICAgIHJldHVybiB0eXBlb2YgYXVkID09PSBcInN0cmluZ1wiID8gW2F1ZF0gOiBhdWQ7XG4gIH1cbn07XG52YXIgQXV0aEN0eEltcGwgPSBjbGFzcyBfQXV0aEN0eEltcGwge1xuICBpc0ludGVybmFsO1xuICAvLyBTb3VyY2Ugb2YgdGhlIEpXVCBwYXlsb2FkIHN0cmluZywgaWYgdGhlcmUgaXMgb25lLlxuICBfand0U291cmNlO1xuICAvLyBXaGV0aGVyIHdlIGhhdmUgaW5pdGlhbGl6ZWQgdGhlIEpXVCBjbGFpbXMuXG4gIF9pbml0aWFsaXplZEpXVCA9IGZhbHNlO1xuICBfand0Q2xhaW1zO1xuICBfc2VuZGVySWRlbnRpdHk7XG4gIGNvbnN0cnVjdG9yKG9wdHMpIHtcbiAgICB0aGlzLmlzSW50ZXJuYWwgPSBvcHRzLmlzSW50ZXJuYWw7XG4gICAgdGhpcy5fand0U291cmNlID0gb3B0cy5qd3RTb3VyY2U7XG4gICAgdGhpcy5fc2VuZGVySWRlbnRpdHkgPSBvcHRzLnNlbmRlcklkZW50aXR5O1xuICB9XG4gIF9pbml0aWFsaXplSldUKCkge1xuICAgIGlmICh0aGlzLl9pbml0aWFsaXplZEpXVCkgcmV0dXJuO1xuICAgIHRoaXMuX2luaXRpYWxpemVkSldUID0gdHJ1ZTtcbiAgICBjb25zdCB0b2tlbiA9IHRoaXMuX2p3dFNvdXJjZSgpO1xuICAgIGlmICghdG9rZW4pIHtcbiAgICAgIHRoaXMuX2p3dENsYWltcyA9IG51bGw7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2p3dENsYWltcyA9IG5ldyBKd3RDbGFpbXNJbXBsKHRva2VuLCB0aGlzLl9zZW5kZXJJZGVudGl0eSk7XG4gICAgfVxuICAgIE9iamVjdC5mcmVlemUodGhpcyk7XG4gIH1cbiAgLyoqIExhemlseSBjb21wdXRlIHdoZXRoZXIgYSBKV1QgZXhpc3RzIGFuZCBpcyBwYXJzZWFibGUuICovXG4gIGdldCBoYXNKV1QoKSB7XG4gICAgdGhpcy5faW5pdGlhbGl6ZUpXVCgpO1xuICAgIHJldHVybiB0aGlzLl9qd3RDbGFpbXMgIT09IG51bGw7XG4gIH1cbiAgLyoqIExhemlseSBwYXJzZSB0aGUgSnd0Q2xhaW1zIG9ubHkgd2hlbiBhY2Nlc3NlZC4gKi9cbiAgZ2V0IGp3dCgpIHtcbiAgICB0aGlzLl9pbml0aWFsaXplSldUKCk7XG4gICAgcmV0dXJuIHRoaXMuX2p3dENsYWltcztcbiAgfVxuICAvKiogQ3JlYXRlIGEgY29udGV4dCByZXByZXNlbnRpbmcgaW50ZXJuYWwgKG5vbi11c2VyKSByZXF1ZXN0cy4gKi9cbiAgc3RhdGljIGludGVybmFsKCkge1xuICAgIHJldHVybiBuZXcgX0F1dGhDdHhJbXBsKHtcbiAgICAgIGlzSW50ZXJuYWw6IHRydWUsXG4gICAgICBqd3RTb3VyY2U6ICgpID0+IG51bGwsXG4gICAgICBzZW5kZXJJZGVudGl0eTogSWRlbnRpdHkuemVybygpXG4gICAgfSk7XG4gIH1cbiAgLyoqIElmIHRoZXJlIGlzIGEgY29ubmVjdGlvbiBpZCwgbG9vayB1cCB0aGUgSldUIHBheWxvYWQgZnJvbSB0aGUgc3lzdGVtIHRhYmxlcy4gKi9cbiAgc3RhdGljIGZyb21TeXN0ZW1UYWJsZXMoY29ubmVjdGlvbklkLCBzZW5kZXIpIHtcbiAgICBpZiAoY29ubmVjdGlvbklkID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gbmV3IF9BdXRoQ3R4SW1wbCh7XG4gICAgICAgIGlzSW50ZXJuYWw6IGZhbHNlLFxuICAgICAgICBqd3RTb3VyY2U6ICgpID0+IG51bGwsXG4gICAgICAgIHNlbmRlcklkZW50aXR5OiBzZW5kZXJcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IF9BdXRoQ3R4SW1wbCh7XG4gICAgICBpc0ludGVybmFsOiBmYWxzZSxcbiAgICAgIGp3dFNvdXJjZTogKCkgPT4ge1xuICAgICAgICBjb25zdCBwYXlsb2FkQnVmID0gc3lzLmdldF9qd3RfcGF5bG9hZChjb25uZWN0aW9uSWQuX19jb25uZWN0aW9uX2lkX18pO1xuICAgICAgICBpZiAocGF5bG9hZEJ1Zi5sZW5ndGggPT09IDApIHJldHVybiBudWxsO1xuICAgICAgICBjb25zdCBwYXlsb2FkU3RyID0gbmV3IFRleHREZWNvZGVyKCkuZGVjb2RlKHBheWxvYWRCdWYpO1xuICAgICAgICByZXR1cm4gcGF5bG9hZFN0cjtcbiAgICAgIH0sXG4gICAgICBzZW5kZXJJZGVudGl0eTogc2VuZGVyXG4gICAgfSk7XG4gIH1cbn07XG52YXIgUmVkdWNlckN0eEltcGwgPSBjbGFzcyBSZWR1Y2VyQ3R4IHtcbiAgI2lkZW50aXR5O1xuICAjc2VuZGVyQXV0aDtcbiAgI3V1aWRDb3VudGVyO1xuICBzZW5kZXI7XG4gIHRpbWVzdGFtcDtcbiAgY29ubmVjdGlvbklkO1xuICBkYjtcbiAgY29uc3RydWN0b3Ioc2VuZGVyLCB0aW1lc3RhbXAsIGNvbm5lY3Rpb25JZCkge1xuICAgIE9iamVjdC5zZWFsKHRoaXMpO1xuICAgIHRoaXMuc2VuZGVyID0gc2VuZGVyO1xuICAgIHRoaXMudGltZXN0YW1wID0gdGltZXN0YW1wO1xuICAgIHRoaXMuY29ubmVjdGlvbklkID0gY29ubmVjdGlvbklkO1xuICAgIHRoaXMuZGIgPSBnZXREYlZpZXcoKTtcbiAgfVxuICBnZXQgaWRlbnRpdHkoKSB7XG4gICAgcmV0dXJuIHRoaXMuI2lkZW50aXR5ID8/PSBuZXcgSWRlbnRpdHkoc3lzLmlkZW50aXR5KCkuX19pZGVudGl0eV9fKTtcbiAgfVxuICBnZXQgc2VuZGVyQXV0aCgpIHtcbiAgICByZXR1cm4gdGhpcy4jc2VuZGVyQXV0aCA/Pz0gQXV0aEN0eEltcGwuZnJvbVN5c3RlbVRhYmxlcyhcbiAgICAgIHRoaXMuY29ubmVjdGlvbklkLFxuICAgICAgdGhpcy5zZW5kZXJcbiAgICApO1xuICB9XG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgcmFuZG9tIHtAbGluayBVdWlkfSBgdjRgIHVzaW5nIHRoZSB7QGxpbmsgY3J5cHRvfSBSTkcuXG4gICAqXG4gICAqIFdBUk46IFVudGlsIHdlIHVzZSBhIHNwYWNldGltZSBSTkcgdGhpcyBtYWtlIGNhbGxzIG5vbi1kZXRlcm1pbmlzdGljLlxuICAgKi9cbiAgbmV3VXVpZFY0KCkge1xuICAgIGNvbnN0IGJ5dGVzID0gY3J5cHRvLmdldFJhbmRvbVZhbHVlcyhuZXcgVWludDhBcnJheSgxNikpO1xuICAgIHJldHVybiBVdWlkLmZyb21SYW5kb21CeXRlc1Y0KGJ5dGVzKTtcbiAgfVxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IHNvcnRhYmxlIHtAbGluayBVdWlkfSBgdjdgIHVzaW5nIHRoZSB7QGxpbmsgY3J5cHRvfSBSTkcsIGNvdW50ZXIsXG4gICAqIGFuZCB0aGUgdGltZXN0YW1wLlxuICAgKlxuICAgKiBXQVJOOiBVbnRpbCB3ZSB1c2UgYSBzcGFjZXRpbWUgUk5HIHRoaXMgbWFrZSBjYWxscyBub24tZGV0ZXJtaW5pc3RpYy5cbiAgICovXG4gIG5ld1V1aWRWNygpIHtcbiAgICBjb25zdCBieXRlcyA9IGNyeXB0by5nZXRSYW5kb21WYWx1ZXMobmV3IFVpbnQ4QXJyYXkoNCkpO1xuICAgIGNvbnN0IGNvdW50ZXIgPSB0aGlzLiN1dWlkQ291bnRlciA/Pz0geyB2YWx1ZTogMCB9O1xuICAgIHJldHVybiBVdWlkLmZyb21Db3VudGVyVjcoY291bnRlciwgdGhpcy50aW1lc3RhbXAsIGJ5dGVzKTtcbiAgfVxufTtcbnZhciBjYWxsVXNlckZ1bmN0aW9uID0gZnVuY3Rpb24gX19zcGFjZXRpbWVkYl9lbmRfc2hvcnRfYmFja3RyYWNlKGZuLCAuLi5hcmdzKSB7XG4gIHJldHVybiBmbiguLi5hcmdzKTtcbn07XG52YXIgaG9va3MgPSB7XG4gIF9fZGVzY3JpYmVfbW9kdWxlX18oKSB7XG4gICAgY29uc3Qgd3JpdGVyID0gbmV3IEJpbmFyeVdyaXRlcigxMjgpO1xuICAgIEFsZ2VicmFpY1R5cGUuc2VyaWFsaXplVmFsdWUoXG4gICAgICB3cml0ZXIsXG4gICAgICByYXdfbW9kdWxlX2RlZl90eXBlX2RlZmF1bHQuYWxnZWJyYWljVHlwZSxcbiAgICAgIHJhd19tb2R1bGVfZGVmX3R5cGVfZGVmYXVsdC5WOShNT0RVTEVfREVGKVxuICAgICk7XG4gICAgcmV0dXJuIHdyaXRlci5nZXRCdWZmZXIoKTtcbiAgfSxcbiAgX19jYWxsX3JlZHVjZXJfXyhyZWR1Y2VySWQsIHNlbmRlciwgY29ubklkLCB0aW1lc3RhbXAsIGFyZ3NCdWYpIHtcbiAgICBjb25zdCBhcmdzVHlwZSA9IEFsZ2VicmFpY1R5cGUuUHJvZHVjdChcbiAgICAgIE1PRFVMRV9ERUYucmVkdWNlcnNbcmVkdWNlcklkXS5wYXJhbXNcbiAgICApO1xuICAgIGNvbnN0IGFyZ3MgPSBBbGdlYnJhaWNUeXBlLmRlc2VyaWFsaXplVmFsdWUoXG4gICAgICBuZXcgQmluYXJ5UmVhZGVyKGFyZ3NCdWYpLFxuICAgICAgYXJnc1R5cGUsXG4gICAgICBNT0RVTEVfREVGLnR5cGVzcGFjZVxuICAgICk7XG4gICAgY29uc3Qgc2VuZGVySWRlbnRpdHkgPSBuZXcgSWRlbnRpdHkoc2VuZGVyKTtcbiAgICBjb25zdCBjdHggPSBuZXcgUmVkdWNlckN0eEltcGwoXG4gICAgICBzZW5kZXJJZGVudGl0eSxcbiAgICAgIG5ldyBUaW1lc3RhbXAodGltZXN0YW1wKSxcbiAgICAgIENvbm5lY3Rpb25JZC5udWxsSWZaZXJvKG5ldyBDb25uZWN0aW9uSWQoY29ubklkKSlcbiAgICApO1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gY2FsbFVzZXJGdW5jdGlvbihSRURVQ0VSU1tyZWR1Y2VySWRdLCBjdHgsIGFyZ3MpID8/IHsgdGFnOiBcIm9rXCIgfTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBpZiAoZSBpbnN0YW5jZW9mIFNlbmRlckVycm9yKSB7XG4gICAgICAgIHJldHVybiB7IHRhZzogXCJlcnJcIiwgdmFsdWU6IGUubWVzc2FnZSB9O1xuICAgICAgfVxuICAgICAgdGhyb3cgZTtcbiAgICB9XG4gIH1cbn07XG52YXIgaG9va3NfdjFfMSA9IHtcbiAgX19jYWxsX3ZpZXdfXyhpZCwgc2VuZGVyLCBhcmdzQnVmKSB7XG4gICAgY29uc3QgeyBmbiwgcGFyYW1zLCByZXR1cm5UeXBlLCByZXR1cm5UeXBlQmFzZVNpemUgfSA9IFZJRVdTW2lkXTtcbiAgICBjb25zdCBjdHggPSBmcmVlemUzKHtcbiAgICAgIHNlbmRlcjogbmV3IElkZW50aXR5KHNlbmRlciksXG4gICAgICAvLyB0aGlzIGlzIHRoZSBub24tcmVhZG9ubHkgRGJWaWV3LCBidXQgdGhlIHR5cGluZyBmb3IgdGhlIHVzZXIgd2lsbCBiZVxuICAgICAgLy8gdGhlIHJlYWRvbmx5IG9uZSwgYW5kIGlmIHRoZXkgZG8gY2FsbCBtdXRhdGluZyBmdW5jdGlvbnMgaXQgd2lsbCBmYWlsXG4gICAgICAvLyBhdCBydW50aW1lXG4gICAgICBkYjogZ2V0RGJWaWV3KCksXG4gICAgICBmcm9tOiBtYWtlUXVlcnlCdWlsZGVyKGdldFJlZ2lzdGVyZWRTY2hlbWEoKSlcbiAgICB9KTtcbiAgICBjb25zdCBhcmdzID0gUHJvZHVjdFR5cGUuZGVzZXJpYWxpemVWYWx1ZShcbiAgICAgIG5ldyBCaW5hcnlSZWFkZXIoYXJnc0J1ZiksXG4gICAgICBwYXJhbXMsXG4gICAgICBNT0RVTEVfREVGLnR5cGVzcGFjZVxuICAgICk7XG4gICAgY29uc3QgcmV0ID0gY2FsbFVzZXJGdW5jdGlvbihmbiwgY3R4LCBhcmdzKTtcbiAgICBjb25zdCByZXRCdWYgPSBuZXcgQmluYXJ5V3JpdGVyKHJldHVyblR5cGVCYXNlU2l6ZSk7XG4gICAgaWYgKGlzUm93VHlwZWRRdWVyeShyZXQpKSB7XG4gICAgICBjb25zdCBxdWVyeSA9IHRvU3FsKHJldCk7XG4gICAgICBjb25zdCB2ID0gdmlld19yZXN1bHRfaGVhZGVyX3R5cGVfZGVmYXVsdC5SYXdTcWwocXVlcnkpO1xuICAgICAgQWxnZWJyYWljVHlwZS5zZXJpYWxpemVWYWx1ZShcbiAgICAgICAgcmV0QnVmLFxuICAgICAgICB2aWV3X3Jlc3VsdF9oZWFkZXJfdHlwZV9kZWZhdWx0LmFsZ2VicmFpY1R5cGUsXG4gICAgICAgIHYsXG4gICAgICAgIE1PRFVMRV9ERUYudHlwZXNwYWNlXG4gICAgICApO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgZGF0YTogcmV0QnVmLmdldEJ1ZmZlcigpXG4gICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICBBbGdlYnJhaWNUeXBlLnNlcmlhbGl6ZVZhbHVlKFxuICAgICAgICByZXRCdWYsXG4gICAgICAgIHZpZXdfcmVzdWx0X2hlYWRlcl90eXBlX2RlZmF1bHQuYWxnZWJyYWljVHlwZSxcbiAgICAgICAgdmlld19yZXN1bHRfaGVhZGVyX3R5cGVfZGVmYXVsdC5Sb3dEYXRhLFxuICAgICAgICBNT0RVTEVfREVGLnR5cGVzcGFjZVxuICAgICAgKTtcbiAgICAgIEFsZ2VicmFpY1R5cGUuc2VyaWFsaXplVmFsdWUoXG4gICAgICAgIHJldEJ1ZixcbiAgICAgICAgcmV0dXJuVHlwZSxcbiAgICAgICAgcmV0LFxuICAgICAgICBNT0RVTEVfREVGLnR5cGVzcGFjZVxuICAgICAgKTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGRhdGE6IHJldEJ1Zi5nZXRCdWZmZXIoKVxuICAgICAgfTtcbiAgICB9XG4gIH0sXG4gIF9fY2FsbF92aWV3X2Fub25fXyhpZCwgYXJnc0J1Zikge1xuICAgIGNvbnN0IHsgZm4sIHBhcmFtcywgcmV0dXJuVHlwZSwgcmV0dXJuVHlwZUJhc2VTaXplIH0gPSBBTk9OX1ZJRVdTW2lkXTtcbiAgICBjb25zdCBjdHggPSBmcmVlemUzKHtcbiAgICAgIC8vIHRoaXMgaXMgdGhlIG5vbi1yZWFkb25seSBEYlZpZXcsIGJ1dCB0aGUgdHlwaW5nIGZvciB0aGUgdXNlciB3aWxsIGJlXG4gICAgICAvLyB0aGUgcmVhZG9ubHkgb25lLCBhbmQgaWYgdGhleSBkbyBjYWxsIG11dGF0aW5nIGZ1bmN0aW9ucyBpdCB3aWxsIGZhaWxcbiAgICAgIC8vIGF0IHJ1bnRpbWVcbiAgICAgIGRiOiBnZXREYlZpZXcoKSxcbiAgICAgIGZyb206IG1ha2VRdWVyeUJ1aWxkZXIoZ2V0UmVnaXN0ZXJlZFNjaGVtYSgpKVxuICAgIH0pO1xuICAgIGNvbnN0IGFyZ3MgPSBQcm9kdWN0VHlwZS5kZXNlcmlhbGl6ZVZhbHVlKFxuICAgICAgbmV3IEJpbmFyeVJlYWRlcihhcmdzQnVmKSxcbiAgICAgIHBhcmFtcyxcbiAgICAgIE1PRFVMRV9ERUYudHlwZXNwYWNlXG4gICAgKTtcbiAgICBjb25zdCByZXQgPSBjYWxsVXNlckZ1bmN0aW9uKGZuLCBjdHgsIGFyZ3MpO1xuICAgIGNvbnN0IHJldEJ1ZiA9IG5ldyBCaW5hcnlXcml0ZXIocmV0dXJuVHlwZUJhc2VTaXplKTtcbiAgICBpZiAoaXNSb3dUeXBlZFF1ZXJ5KHJldCkpIHtcbiAgICAgIGNvbnN0IHF1ZXJ5ID0gdG9TcWwocmV0KTtcbiAgICAgIGNvbnN0IHYgPSB2aWV3X3Jlc3VsdF9oZWFkZXJfdHlwZV9kZWZhdWx0LlJhd1NxbChxdWVyeSk7XG4gICAgICBBbGdlYnJhaWNUeXBlLnNlcmlhbGl6ZVZhbHVlKFxuICAgICAgICByZXRCdWYsXG4gICAgICAgIHZpZXdfcmVzdWx0X2hlYWRlcl90eXBlX2RlZmF1bHQuYWxnZWJyYWljVHlwZSxcbiAgICAgICAgdixcbiAgICAgICAgTU9EVUxFX0RFRi50eXBlc3BhY2VcbiAgICAgICk7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBkYXRhOiByZXRCdWYuZ2V0QnVmZmVyKClcbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIEFsZ2VicmFpY1R5cGUuc2VyaWFsaXplVmFsdWUoXG4gICAgICAgIHJldEJ1ZixcbiAgICAgICAgdmlld19yZXN1bHRfaGVhZGVyX3R5cGVfZGVmYXVsdC5hbGdlYnJhaWNUeXBlLFxuICAgICAgICB2aWV3X3Jlc3VsdF9oZWFkZXJfdHlwZV9kZWZhdWx0LlJvd0RhdGEsXG4gICAgICAgIE1PRFVMRV9ERUYudHlwZXNwYWNlXG4gICAgICApO1xuICAgICAgQWxnZWJyYWljVHlwZS5zZXJpYWxpemVWYWx1ZShcbiAgICAgICAgcmV0QnVmLFxuICAgICAgICByZXR1cm5UeXBlLFxuICAgICAgICByZXQsXG4gICAgICAgIE1PRFVMRV9ERUYudHlwZXNwYWNlXG4gICAgICApO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgZGF0YTogcmV0QnVmLmdldEJ1ZmZlcigpXG4gICAgICB9O1xuICAgIH1cbiAgfVxufTtcbnZhciBob29rc192MV8yID0ge1xuICBfX2NhbGxfcHJvY2VkdXJlX18oaWQsIHNlbmRlciwgY29ubmVjdGlvbl9pZCwgdGltZXN0YW1wLCBhcmdzKSB7XG4gICAgcmV0dXJuIGNhbGxQcm9jZWR1cmUoXG4gICAgICBpZCxcbiAgICAgIG5ldyBJZGVudGl0eShzZW5kZXIpLFxuICAgICAgQ29ubmVjdGlvbklkLm51bGxJZlplcm8obmV3IENvbm5lY3Rpb25JZChjb25uZWN0aW9uX2lkKSksXG4gICAgICBuZXcgVGltZXN0YW1wKHRpbWVzdGFtcCksXG4gICAgICBhcmdzXG4gICAgKTtcbiAgfVxufTtcbnZhciBEQl9WSUVXID0gbnVsbDtcbmZ1bmN0aW9uIGdldERiVmlldygpIHtcbiAgREJfVklFVyA/Pz0gbWFrZURiVmlldyhNT0RVTEVfREVGKTtcbiAgcmV0dXJuIERCX1ZJRVc7XG59XG5mdW5jdGlvbiBtYWtlRGJWaWV3KG1vZHVsZURlZikge1xuICByZXR1cm4gZnJlZXplMyhcbiAgICBPYmplY3QuZnJvbUVudHJpZXMoXG4gICAgICBtb2R1bGVEZWYudGFibGVzLm1hcCgodGFibGUyKSA9PiBbXG4gICAgICAgIHRvQ2FtZWxDYXNlKHRhYmxlMi5uYW1lKSxcbiAgICAgICAgbWFrZVRhYmxlVmlldyhtb2R1bGVEZWYudHlwZXNwYWNlLCB0YWJsZTIpXG4gICAgICBdKVxuICAgIClcbiAgKTtcbn1cbmZ1bmN0aW9uIG1ha2VUYWJsZVZpZXcodHlwZXNwYWNlLCB0YWJsZTIpIHtcbiAgY29uc3QgdGFibGVfaWQgPSBzeXMudGFibGVfaWRfZnJvbV9uYW1lKHRhYmxlMi5uYW1lKTtcbiAgY29uc3Qgcm93VHlwZSA9IHR5cGVzcGFjZS50eXBlc1t0YWJsZTIucHJvZHVjdFR5cGVSZWZdO1xuICBpZiAocm93VHlwZS50YWcgIT09IFwiUHJvZHVjdFwiKSB7XG4gICAgdGhyb3cgXCJpbXBvc3NpYmxlXCI7XG4gIH1cbiAgY29uc3QgYmFzZVNpemUgPSBic2F0bkJhc2VTaXplKHR5cGVzcGFjZSwgcm93VHlwZSk7XG4gIGNvbnN0IHNlcXVlbmNlcyA9IHRhYmxlMi5zZXF1ZW5jZXMubWFwKChzZXEpID0+IHtcbiAgICBjb25zdCBjb2wgPSByb3dUeXBlLnZhbHVlLmVsZW1lbnRzW3NlcS5jb2x1bW5dO1xuICAgIGNvbnN0IGNvbFR5cGUgPSBjb2wuYWxnZWJyYWljVHlwZTtcbiAgICBsZXQgc2VxdWVuY2VUcmlnZ2VyO1xuICAgIHN3aXRjaCAoY29sVHlwZS50YWcpIHtcbiAgICAgIGNhc2UgXCJVOFwiOlxuICAgICAgY2FzZSBcIkk4XCI6XG4gICAgICBjYXNlIFwiVTE2XCI6XG4gICAgICBjYXNlIFwiSTE2XCI6XG4gICAgICBjYXNlIFwiVTMyXCI6XG4gICAgICBjYXNlIFwiSTMyXCI6XG4gICAgICAgIHNlcXVlbmNlVHJpZ2dlciA9IDA7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcIlU2NFwiOlxuICAgICAgY2FzZSBcIkk2NFwiOlxuICAgICAgY2FzZSBcIlUxMjhcIjpcbiAgICAgIGNhc2UgXCJJMTI4XCI6XG4gICAgICBjYXNlIFwiVTI1NlwiOlxuICAgICAgY2FzZSBcIkkyNTZcIjpcbiAgICAgICAgc2VxdWVuY2VUcmlnZ2VyID0gMG47XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcImludmFsaWQgc2VxdWVuY2UgdHlwZVwiKTtcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgIGNvbE5hbWU6IGNvbC5uYW1lLFxuICAgICAgc2VxdWVuY2VUcmlnZ2VyLFxuICAgICAgcmVhZDogKHJlYWRlcikgPT4gQWxnZWJyYWljVHlwZS5kZXNlcmlhbGl6ZVZhbHVlKHJlYWRlciwgY29sVHlwZSwgdHlwZXNwYWNlKVxuICAgIH07XG4gIH0pO1xuICBjb25zdCBoYXNBdXRvSW5jcmVtZW50ID0gc2VxdWVuY2VzLmxlbmd0aCA+IDA7XG4gIGNvbnN0IGl0ZXIgPSAoKSA9PiB0YWJsZUl0ZXJhdG9yKHN5cy5kYXRhc3RvcmVfdGFibGVfc2Nhbl9ic2F0bih0YWJsZV9pZCksIHJvd1R5cGUpO1xuICBjb25zdCBpbnRlZ3JhdGVHZW5lcmF0ZWRDb2x1bW5zID0gaGFzQXV0b0luY3JlbWVudCA/IChyb3csIHJldF9idWYpID0+IHtcbiAgICBjb25zdCByZWFkZXIgPSBuZXcgQmluYXJ5UmVhZGVyKHJldF9idWYpO1xuICAgIGZvciAoY29uc3QgeyBjb2xOYW1lLCByZWFkLCBzZXF1ZW5jZVRyaWdnZXIgfSBvZiBzZXF1ZW5jZXMpIHtcbiAgICAgIGlmIChyb3dbY29sTmFtZV0gPT09IHNlcXVlbmNlVHJpZ2dlcikge1xuICAgICAgICByb3dbY29sTmFtZV0gPSByZWFkKHJlYWRlcik7XG4gICAgICB9XG4gICAgfVxuICB9IDogbnVsbDtcbiAgY29uc3QgdGFibGVNZXRob2RzID0ge1xuICAgIGNvdW50OiAoKSA9PiBzeXMuZGF0YXN0b3JlX3RhYmxlX3Jvd19jb3VudCh0YWJsZV9pZCksXG4gICAgaXRlcixcbiAgICBbU3ltYm9sLml0ZXJhdG9yXTogKCkgPT4gaXRlcigpLFxuICAgIGluc2VydDogKHJvdykgPT4ge1xuICAgICAgY29uc3Qgd3JpdGVyID0gbmV3IEJpbmFyeVdyaXRlcihiYXNlU2l6ZSk7XG4gICAgICBBbGdlYnJhaWNUeXBlLnNlcmlhbGl6ZVZhbHVlKHdyaXRlciwgcm93VHlwZSwgcm93LCB0eXBlc3BhY2UpO1xuICAgICAgY29uc3QgcmV0X2J1ZiA9IHN5cy5kYXRhc3RvcmVfaW5zZXJ0X2JzYXRuKHRhYmxlX2lkLCB3cml0ZXIuZ2V0QnVmZmVyKCkpO1xuICAgICAgY29uc3QgcmV0ID0geyAuLi5yb3cgfTtcbiAgICAgIGludGVncmF0ZUdlbmVyYXRlZENvbHVtbnM/LihyZXQsIHJldF9idWYpO1xuICAgICAgcmV0dXJuIHJldDtcbiAgICB9LFxuICAgIGRlbGV0ZTogKHJvdykgPT4ge1xuICAgICAgY29uc3Qgd3JpdGVyID0gbmV3IEJpbmFyeVdyaXRlcig0ICsgYmFzZVNpemUpO1xuICAgICAgd3JpdGVyLndyaXRlVTMyKDEpO1xuICAgICAgQWxnZWJyYWljVHlwZS5zZXJpYWxpemVWYWx1ZSh3cml0ZXIsIHJvd1R5cGUsIHJvdywgdHlwZXNwYWNlKTtcbiAgICAgIGNvbnN0IGNvdW50ID0gc3lzLmRhdGFzdG9yZV9kZWxldGVfYWxsX2J5X2VxX2JzYXRuKFxuICAgICAgICB0YWJsZV9pZCxcbiAgICAgICAgd3JpdGVyLmdldEJ1ZmZlcigpXG4gICAgICApO1xuICAgICAgcmV0dXJuIGNvdW50ID4gMDtcbiAgICB9XG4gIH07XG4gIGNvbnN0IHRhYmxlVmlldyA9IE9iamVjdC5hc3NpZ24oXG4gICAgLyogQF9fUFVSRV9fICovIE9iamVjdC5jcmVhdGUobnVsbCksXG4gICAgdGFibGVNZXRob2RzXG4gICk7XG4gIGZvciAoY29uc3QgaW5kZXhEZWYgb2YgdGFibGUyLmluZGV4ZXMpIHtcbiAgICBjb25zdCBpbmRleF9pZCA9IHN5cy5pbmRleF9pZF9mcm9tX25hbWUoaW5kZXhEZWYubmFtZSk7XG4gICAgbGV0IGNvbHVtbl9pZHM7XG4gICAgc3dpdGNoIChpbmRleERlZi5hbGdvcml0aG0udGFnKSB7XG4gICAgICBjYXNlIFwiQlRyZWVcIjpcbiAgICAgICAgY29sdW1uX2lkcyA9IGluZGV4RGVmLmFsZ29yaXRobS52YWx1ZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiSGFzaFwiOlxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJpbXBvc3NpYmxlXCIpO1xuICAgICAgY2FzZSBcIkRpcmVjdFwiOlxuICAgICAgICBjb2x1bW5faWRzID0gW2luZGV4RGVmLmFsZ29yaXRobS52YWx1ZV07XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBjb25zdCBudW1Db2x1bW5zID0gY29sdW1uX2lkcy5sZW5ndGg7XG4gICAgY29uc3QgY29sdW1uU2V0ID0gbmV3IFNldChjb2x1bW5faWRzKTtcbiAgICBjb25zdCBpc1VuaXF1ZSA9IHRhYmxlMi5jb25zdHJhaW50cy5maWx0ZXIoKHgpID0+IHguZGF0YS50YWcgPT09IFwiVW5pcXVlXCIpLnNvbWUoKHgpID0+IGNvbHVtblNldC5pc1N1YnNldE9mKG5ldyBTZXQoeC5kYXRhLnZhbHVlLmNvbHVtbnMpKSk7XG4gICAgY29uc3QgaW5kZXhUeXBlID0gQWxnZWJyYWljVHlwZS5Qcm9kdWN0KHtcbiAgICAgIGVsZW1lbnRzOiBjb2x1bW5faWRzLm1hcCgoaWQpID0+IHJvd1R5cGUudmFsdWUuZWxlbWVudHNbaWRdKVxuICAgIH0pO1xuICAgIGNvbnN0IGJhc2VTaXplMiA9IGJzYXRuQmFzZVNpemUodHlwZXNwYWNlLCBpbmRleFR5cGUpO1xuICAgIGNvbnN0IHNlcmlhbGl6ZVByZWZpeCA9ICh3cml0ZXIsIHByZWZpeCwgcHJlZml4X2VsZW1zKSA9PiB7XG4gICAgICBpZiAocHJlZml4X2VsZW1zID4gbnVtQ29sdW1ucyAtIDEpXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJ0b28gbWFueSBlbGVtZW50cyBpbiBwcmVmaXhcIik7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByZWZpeF9lbGVtczsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGVsZW1UeXBlID0gaW5kZXhUeXBlLnZhbHVlLmVsZW1lbnRzW2ldLmFsZ2VicmFpY1R5cGU7XG4gICAgICAgIEFsZ2VicmFpY1R5cGUuc2VyaWFsaXplVmFsdWUod3JpdGVyLCBlbGVtVHlwZSwgcHJlZml4W2ldLCB0eXBlc3BhY2UpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHdyaXRlcjtcbiAgICB9O1xuICAgIGxldCBpbmRleDtcbiAgICBpZiAoaXNVbmlxdWUpIHtcbiAgICAgIGNvbnN0IHNlcmlhbGl6ZUJvdW5kID0gKGNvbFZhbCkgPT4ge1xuICAgICAgICBpZiAoY29sVmFsLmxlbmd0aCAhPT0gbnVtQ29sdW1ucylcbiAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwid3JvbmcgbnVtYmVyIG9mIGVsZW1lbnRzXCIpO1xuICAgICAgICBjb25zdCB3cml0ZXIgPSBuZXcgQmluYXJ5V3JpdGVyKGJhc2VTaXplMiArIDEpO1xuICAgICAgICBjb25zdCBwcmVmaXhfZWxlbXMgPSBudW1Db2x1bW5zIC0gMTtcbiAgICAgICAgc2VyaWFsaXplUHJlZml4KHdyaXRlciwgY29sVmFsLCBwcmVmaXhfZWxlbXMpO1xuICAgICAgICBjb25zdCByc3RhcnRPZmZzZXQgPSB3cml0ZXIub2Zmc2V0O1xuICAgICAgICB3cml0ZXIud3JpdGVVOCgwKTtcbiAgICAgICAgQWxnZWJyYWljVHlwZS5zZXJpYWxpemVWYWx1ZShcbiAgICAgICAgICB3cml0ZXIsXG4gICAgICAgICAgaW5kZXhUeXBlLnZhbHVlLmVsZW1lbnRzW251bUNvbHVtbnMgLSAxXS5hbGdlYnJhaWNUeXBlLFxuICAgICAgICAgIGNvbFZhbFtudW1Db2x1bW5zIC0gMV0sXG4gICAgICAgICAgdHlwZXNwYWNlXG4gICAgICAgICk7XG4gICAgICAgIGNvbnN0IGJ1ZmZlciA9IHdyaXRlci5nZXRCdWZmZXIoKTtcbiAgICAgICAgY29uc3QgcHJlZml4ID0gYnVmZmVyLnNsaWNlKDAsIHJzdGFydE9mZnNldCk7XG4gICAgICAgIGNvbnN0IHJzdGFydCA9IGJ1ZmZlci5zbGljZShyc3RhcnRPZmZzZXQpO1xuICAgICAgICByZXR1cm4gW3ByZWZpeCwgcHJlZml4X2VsZW1zLCByc3RhcnQsIHJzdGFydF07XG4gICAgICB9O1xuICAgICAgaW5kZXggPSB7XG4gICAgICAgIGZpbmQ6IChjb2xWYWwpID0+IHtcbiAgICAgICAgICBpZiAobnVtQ29sdW1ucyA9PT0gMSkgY29sVmFsID0gW2NvbFZhbF07XG4gICAgICAgICAgY29uc3QgYXJncyA9IHNlcmlhbGl6ZUJvdW5kKGNvbFZhbCk7XG4gICAgICAgICAgY29uc3QgaXRlcjIgPSB0YWJsZUl0ZXJhdG9yKFxuICAgICAgICAgICAgc3lzLmRhdGFzdG9yZV9pbmRleF9zY2FuX3JhbmdlX2JzYXRuKGluZGV4X2lkLCAuLi5hcmdzKSxcbiAgICAgICAgICAgIHJvd1R5cGVcbiAgICAgICAgICApO1xuICAgICAgICAgIGNvbnN0IHsgdmFsdWUsIGRvbmUgfSA9IGl0ZXIyLm5leHQoKTtcbiAgICAgICAgICBpZiAoZG9uZSkgcmV0dXJuIG51bGw7XG4gICAgICAgICAgaWYgKCFpdGVyMi5uZXh0KCkuZG9uZSlcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAgICAgXCJgZGF0YXN0b3JlX2luZGV4X3NjYW5fcmFuZ2VfYnNhdG5gIG9uIHVuaXF1ZSBmaWVsZCBjYW5ub3QgcmV0dXJuID4xIHJvd3NcIlxuICAgICAgICAgICAgKTtcbiAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgIH0sXG4gICAgICAgIGRlbGV0ZTogKGNvbFZhbCkgPT4ge1xuICAgICAgICAgIGlmIChudW1Db2x1bW5zID09PSAxKSBjb2xWYWwgPSBbY29sVmFsXTtcbiAgICAgICAgICBjb25zdCBhcmdzID0gc2VyaWFsaXplQm91bmQoY29sVmFsKTtcbiAgICAgICAgICBjb25zdCBudW0gPSBzeXMuZGF0YXN0b3JlX2RlbGV0ZV9ieV9pbmRleF9zY2FuX3JhbmdlX2JzYXRuKFxuICAgICAgICAgICAgaW5kZXhfaWQsXG4gICAgICAgICAgICAuLi5hcmdzXG4gICAgICAgICAgKTtcbiAgICAgICAgICByZXR1cm4gbnVtID4gMDtcbiAgICAgICAgfSxcbiAgICAgICAgdXBkYXRlOiAocm93KSA9PiB7XG4gICAgICAgICAgY29uc3Qgd3JpdGVyID0gbmV3IEJpbmFyeVdyaXRlcihiYXNlU2l6ZTIpO1xuICAgICAgICAgIEFsZ2VicmFpY1R5cGUuc2VyaWFsaXplVmFsdWUod3JpdGVyLCByb3dUeXBlLCByb3csIHR5cGVzcGFjZSk7XG4gICAgICAgICAgY29uc3QgcmV0X2J1ZiA9IHN5cy5kYXRhc3RvcmVfdXBkYXRlX2JzYXRuKFxuICAgICAgICAgICAgdGFibGVfaWQsXG4gICAgICAgICAgICBpbmRleF9pZCxcbiAgICAgICAgICAgIHdyaXRlci5nZXRCdWZmZXIoKVxuICAgICAgICAgICk7XG4gICAgICAgICAgaW50ZWdyYXRlR2VuZXJhdGVkQ29sdW1ucz8uKHJvdywgcmV0X2J1Zik7XG4gICAgICAgICAgcmV0dXJuIHJvdztcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3Qgc2VyaWFsaXplUmFuZ2UgPSAocmFuZ2UpID0+IHtcbiAgICAgICAgaWYgKHJhbmdlLmxlbmd0aCA+IG51bUNvbHVtbnMpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJ0b28gbWFueSBlbGVtZW50c1wiKTtcbiAgICAgICAgY29uc3Qgd3JpdGVyID0gbmV3IEJpbmFyeVdyaXRlcihiYXNlU2l6ZTIgKyAxKTtcbiAgICAgICAgY29uc3QgcHJlZml4X2VsZW1zID0gcmFuZ2UubGVuZ3RoIC0gMTtcbiAgICAgICAgc2VyaWFsaXplUHJlZml4KHdyaXRlciwgcmFuZ2UsIHByZWZpeF9lbGVtcyk7XG4gICAgICAgIGNvbnN0IHJzdGFydE9mZnNldCA9IHdyaXRlci5vZmZzZXQ7XG4gICAgICAgIGNvbnN0IHRlcm0gPSByYW5nZVtyYW5nZS5sZW5ndGggLSAxXTtcbiAgICAgICAgY29uc3QgdGVybVR5cGUgPSBpbmRleFR5cGUudmFsdWUuZWxlbWVudHNbcmFuZ2UubGVuZ3RoIC0gMV0uYWxnZWJyYWljVHlwZTtcbiAgICAgICAgbGV0IHJzdGFydCwgcmVuZDtcbiAgICAgICAgaWYgKHRlcm0gaW5zdGFuY2VvZiBSYW5nZSkge1xuICAgICAgICAgIGNvbnN0IHdyaXRlQm91bmQgPSAoYm91bmQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHRhZ3MgPSB7IGluY2x1ZGVkOiAwLCBleGNsdWRlZDogMSwgdW5ib3VuZGVkOiAyIH07XG4gICAgICAgICAgICB3cml0ZXIud3JpdGVVOCh0YWdzW2JvdW5kLnRhZ10pO1xuICAgICAgICAgICAgaWYgKGJvdW5kLnRhZyAhPT0gXCJ1bmJvdW5kZWRcIilcbiAgICAgICAgICAgICAgQWxnZWJyYWljVHlwZS5zZXJpYWxpemVWYWx1ZShcbiAgICAgICAgICAgICAgICB3cml0ZXIsXG4gICAgICAgICAgICAgICAgdGVybVR5cGUsXG4gICAgICAgICAgICAgICAgYm91bmQudmFsdWUsXG4gICAgICAgICAgICAgICAgdHlwZXNwYWNlXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgfTtcbiAgICAgICAgICB3cml0ZUJvdW5kKHRlcm0uZnJvbSk7XG4gICAgICAgICAgY29uc3QgcmVuZE9mZnNldCA9IHdyaXRlci5vZmZzZXQ7XG4gICAgICAgICAgd3JpdGVCb3VuZCh0ZXJtLnRvKTtcbiAgICAgICAgICByc3RhcnQgPSB3cml0ZXIuZ2V0QnVmZmVyKCkuc2xpY2UocnN0YXJ0T2Zmc2V0LCByZW5kT2Zmc2V0KTtcbiAgICAgICAgICByZW5kID0gd3JpdGVyLmdldEJ1ZmZlcigpLnNsaWNlKHJlbmRPZmZzZXQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHdyaXRlci53cml0ZVU4KDApO1xuICAgICAgICAgIEFsZ2VicmFpY1R5cGUuc2VyaWFsaXplVmFsdWUod3JpdGVyLCB0ZXJtVHlwZSwgdGVybSwgdHlwZXNwYWNlKTtcbiAgICAgICAgICByc3RhcnQgPSByZW5kID0gd3JpdGVyLmdldEJ1ZmZlcigpLnNsaWNlKHJzdGFydE9mZnNldCk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgYnVmZmVyID0gd3JpdGVyLmdldEJ1ZmZlcigpO1xuICAgICAgICBjb25zdCBwcmVmaXggPSBidWZmZXIuc2xpY2UoMCwgcnN0YXJ0T2Zmc2V0KTtcbiAgICAgICAgcmV0dXJuIFtwcmVmaXgsIHByZWZpeF9lbGVtcywgcnN0YXJ0LCByZW5kXTtcbiAgICAgIH07XG4gICAgICBpbmRleCA9IHtcbiAgICAgICAgZmlsdGVyOiAocmFuZ2UpID0+IHtcbiAgICAgICAgICBpZiAobnVtQ29sdW1ucyA9PT0gMSkgcmFuZ2UgPSBbcmFuZ2VdO1xuICAgICAgICAgIGNvbnN0IGFyZ3MgPSBzZXJpYWxpemVSYW5nZShyYW5nZSk7XG4gICAgICAgICAgcmV0dXJuIHRhYmxlSXRlcmF0b3IoXG4gICAgICAgICAgICBzeXMuZGF0YXN0b3JlX2luZGV4X3NjYW5fcmFuZ2VfYnNhdG4oaW5kZXhfaWQsIC4uLmFyZ3MpLFxuICAgICAgICAgICAgcm93VHlwZVxuICAgICAgICAgICk7XG4gICAgICAgIH0sXG4gICAgICAgIGRlbGV0ZTogKHJhbmdlKSA9PiB7XG4gICAgICAgICAgaWYgKG51bUNvbHVtbnMgPT09IDEpIHJhbmdlID0gW3JhbmdlXTtcbiAgICAgICAgICBjb25zdCBhcmdzID0gc2VyaWFsaXplUmFuZ2UocmFuZ2UpO1xuICAgICAgICAgIHJldHVybiBzeXMuZGF0YXN0b3JlX2RlbGV0ZV9ieV9pbmRleF9zY2FuX3JhbmdlX2JzYXRuKFxuICAgICAgICAgICAgaW5kZXhfaWQsXG4gICAgICAgICAgICAuLi5hcmdzXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9XG4gICAgaWYgKE9iamVjdC5oYXNPd24odGFibGVWaWV3LCBpbmRleERlZi5hY2Nlc3Nvck5hbWUpKSB7XG4gICAgICBmcmVlemUzKE9iamVjdC5hc3NpZ24odGFibGVWaWV3W2luZGV4RGVmLmFjY2Vzc29yTmFtZV0sIGluZGV4KSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRhYmxlVmlld1tpbmRleERlZi5hY2Nlc3Nvck5hbWVdID0gZnJlZXplMyhpbmRleCk7XG4gICAgfVxuICB9XG4gIHJldHVybiBmcmVlemUzKHRhYmxlVmlldyk7XG59XG5mdW5jdGlvbiBoYXNPd24obywgaykge1xuICByZXR1cm4gT2JqZWN0Lmhhc093bihvLCBrKTtcbn1cbmZ1bmN0aW9uKiB0YWJsZUl0ZXJhdG9yKGlkLCB0eSkge1xuICB2YXIgX3N0YWNrID0gW107XG4gIHRyeSB7XG4gICAgY29uc3QgaXRlciA9IF9fdXNpbmcoX3N0YWNrLCBuZXcgSXRlcmF0b3JIYW5kbGUoaWQpKTtcbiAgICBjb25zdCB7IHR5cGVzcGFjZSB9ID0gTU9EVUxFX0RFRjtcbiAgICBsZXQgYnVmO1xuICAgIHdoaWxlICgoYnVmID0gYWR2YW5jZUl0ZXIoaXRlcikpICE9IG51bGwpIHtcbiAgICAgIGNvbnN0IHJlYWRlciA9IG5ldyBCaW5hcnlSZWFkZXIoYnVmKTtcbiAgICAgIHdoaWxlIChyZWFkZXIucmVtYWluaW5nID4gMCkge1xuICAgICAgICB5aWVsZCBBbGdlYnJhaWNUeXBlLmRlc2VyaWFsaXplVmFsdWUocmVhZGVyLCB0eSwgdHlwZXNwYWNlKTtcbiAgICAgIH1cbiAgICB9XG4gIH0gY2F0Y2ggKF8pIHtcbiAgICB2YXIgX2Vycm9yID0gXywgX2hhc0Vycm9yID0gdHJ1ZTtcbiAgfSBmaW5hbGx5IHtcbiAgICBfX2NhbGxEaXNwb3NlKF9zdGFjaywgX2Vycm9yLCBfaGFzRXJyb3IpO1xuICB9XG59XG5mdW5jdGlvbiBhZHZhbmNlSXRlcihpdGVyKSB7XG4gIGxldCBidWZfbWF4X2xlbiA9IDY1NTM2O1xuICB3aGlsZSAodHJ1ZSkge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gaXRlci5hZHZhbmNlKGJ1Zl9tYXhfbGVuKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBpZiAoZSAmJiB0eXBlb2YgZSA9PT0gXCJvYmplY3RcIiAmJiBoYXNPd24oZSwgXCJfX2J1ZmZlcl90b29fc21hbGxfX1wiKSkge1xuICAgICAgICBidWZfbWF4X2xlbiA9IGUuX19idWZmZXJfdG9vX3NtYWxsX187XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgdGhyb3cgZTtcbiAgICB9XG4gIH1cbn1cbnZhciBJdGVyYXRvckhhbmRsZSA9IGNsYXNzIF9JdGVyYXRvckhhbmRsZSB7XG4gICNpZDtcbiAgc3RhdGljICNmaW5hbGl6YXRpb25SZWdpc3RyeSA9IG5ldyBGaW5hbGl6YXRpb25SZWdpc3RyeShcbiAgICBzeXMucm93X2l0ZXJfYnNhdG5fY2xvc2VcbiAgKTtcbiAgY29uc3RydWN0b3IoaWQpIHtcbiAgICB0aGlzLiNpZCA9IGlkO1xuICAgIF9JdGVyYXRvckhhbmRsZS4jZmluYWxpemF0aW9uUmVnaXN0cnkucmVnaXN0ZXIodGhpcywgaWQsIHRoaXMpO1xuICB9XG4gIC8qKiBVbnJlZ2lzdGVyIHRoaXMgb2JqZWN0IHdpdGggdGhlIGZpbmFsaXphdGlvbiByZWdpc3RyeSBhbmQgcmV0dXJuIHRoZSBpZCAqL1xuICAjZGV0YWNoKCkge1xuICAgIGNvbnN0IGlkID0gdGhpcy4jaWQ7XG4gICAgdGhpcy4jaWQgPSAtMTtcbiAgICBfSXRlcmF0b3JIYW5kbGUuI2ZpbmFsaXphdGlvblJlZ2lzdHJ5LnVucmVnaXN0ZXIodGhpcyk7XG4gICAgcmV0dXJuIGlkO1xuICB9XG4gIC8qKiBDYWxsIGByb3dfaXRlcl9ic2F0bl9hZHZhbmNlYCwgcmV0dXJuaW5nIG51bGwgaWYgdGhpcyBpdGVyYXRvciB3YXMgYWxyZWFkeSBleGhhdXN0ZWQuICovXG4gIGFkdmFuY2UoYnVmX21heF9sZW4pIHtcbiAgICBpZiAodGhpcy4jaWQgPT09IC0xKSByZXR1cm4gbnVsbDtcbiAgICBjb25zdCB7IDA6IGRvbmUsIDE6IGJ1ZiB9ID0gc3lzLnJvd19pdGVyX2JzYXRuX2FkdmFuY2UoXG4gICAgICB0aGlzLiNpZCxcbiAgICAgIGJ1Zl9tYXhfbGVuXG4gICAgKTtcbiAgICBpZiAoZG9uZSkgdGhpcy4jZGV0YWNoKCk7XG4gICAgcmV0dXJuIGJ1ZjtcbiAgfVxuICBbU3ltYm9sLmRpc3Bvc2VdKCkge1xuICAgIGlmICh0aGlzLiNpZCA+PSAwKSB7XG4gICAgICBjb25zdCBpZCA9IHRoaXMuI2RldGFjaCgpO1xuICAgICAgc3lzLnJvd19pdGVyX2JzYXRuX2Nsb3NlKGlkKTtcbiAgICB9XG4gIH1cbn07XG5mdW5jdGlvbiB3cmFwU3lzY2FsbHMoLi4ubW9kdWxlcykge1xuICByZXR1cm4gT2JqZWN0LmZyb21FbnRyaWVzKFxuICAgIG1vZHVsZXMuZmxhdE1hcChPYmplY3QuZW50cmllcykubWFwKChbaywgdl0pID0+IFtrLCB3cmFwU3lzY2FsbCh2KV0pXG4gICk7XG59XG5mdW5jdGlvbiB3cmFwU3lzY2FsbChmdW5jKSB7XG4gIGNvbnN0IG5hbWUgPSBmdW5jLm5hbWU7XG4gIHJldHVybiB7XG4gICAgW25hbWVdKC4uLmFyZ3MpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHJldHVybiBmdW5jKC4uLmFyZ3MpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBpZiAoZSAhPT0gbnVsbCAmJiB0eXBlb2YgZSA9PT0gXCJvYmplY3RcIiAmJiBoYXNPd24oZSwgXCJfX2NvZGVfZXJyb3JfX1wiKSAmJiB0eXBlb2YgZS5fX2NvZGVfZXJyb3JfXyA9PSBcIm51bWJlclwiKSB7XG4gICAgICAgICAgY29uc3QgbWVzc2FnZSA9IGhhc093bihlLCBcIl9fZXJyb3JfbWVzc2FnZV9fXCIpICYmIHR5cGVvZiBlLl9fZXJyb3JfbWVzc2FnZV9fID09PSBcInN0cmluZ1wiID8gZS5fX2Vycm9yX21lc3NhZ2VfXyA6IHZvaWQgMDtcbiAgICAgICAgICB0aHJvdyBuZXcgU3BhY2V0aW1lSG9zdEVycm9yKGUuX19jb2RlX2Vycm9yX18sIG1lc3NhZ2UpO1xuICAgICAgICB9XG4gICAgICAgIHRocm93IGU7XG4gICAgICB9XG4gICAgfVxuICB9W25hbWVdO1xufVxuZnVuY3Rpb24gZm10TG9nKC4uLmRhdGEpIHtcbiAgcmV0dXJuIGRhdGEuam9pbihcIiBcIik7XG59XG52YXIgY29uc29sZV9sZXZlbF9lcnJvciA9IDA7XG52YXIgY29uc29sZV9sZXZlbF93YXJuID0gMTtcbnZhciBjb25zb2xlX2xldmVsX2luZm8gPSAyO1xudmFyIGNvbnNvbGVfbGV2ZWxfZGVidWcgPSAzO1xudmFyIGNvbnNvbGVfbGV2ZWxfdHJhY2UgPSA0O1xudmFyIHRpbWVyTWFwID0gLyogQF9fUFVSRV9fICovIG5ldyBNYXAoKTtcbnZhciBjb25zb2xlMiA9IHtcbiAgLy8gQHRzLWV4cGVjdC1lcnJvciB3ZSB3YW50IGEgYmxhbmsgcHJvdG90eXBlLCBidXQgdHlwZXNjcmlwdCBjb21wbGFpbnNcbiAgX19wcm90b19fOiB7fSxcbiAgW1N5bWJvbC50b1N0cmluZ1RhZ106IFwiY29uc29sZVwiLFxuICBhc3NlcnQ6IChjb25kaXRpb24gPSBmYWxzZSwgLi4uZGF0YSkgPT4ge1xuICAgIGlmICghY29uZGl0aW9uKSB7XG4gICAgICBzeXMuY29uc29sZV9sb2coY29uc29sZV9sZXZlbF9lcnJvciwgZm10TG9nKC4uLmRhdGEpKTtcbiAgICB9XG4gIH0sXG4gIGNsZWFyOiAoKSA9PiB7XG4gIH0sXG4gIGRlYnVnOiAoLi4uZGF0YSkgPT4ge1xuICAgIHN5cy5jb25zb2xlX2xvZyhjb25zb2xlX2xldmVsX2RlYnVnLCBmbXRMb2coLi4uZGF0YSkpO1xuICB9LFxuICBlcnJvcjogKC4uLmRhdGEpID0+IHtcbiAgICBzeXMuY29uc29sZV9sb2coY29uc29sZV9sZXZlbF9lcnJvciwgZm10TG9nKC4uLmRhdGEpKTtcbiAgfSxcbiAgaW5mbzogKC4uLmRhdGEpID0+IHtcbiAgICBzeXMuY29uc29sZV9sb2coY29uc29sZV9sZXZlbF9pbmZvLCBmbXRMb2coLi4uZGF0YSkpO1xuICB9LFxuICBsb2c6ICguLi5kYXRhKSA9PiB7XG4gICAgc3lzLmNvbnNvbGVfbG9nKGNvbnNvbGVfbGV2ZWxfaW5mbywgZm10TG9nKC4uLmRhdGEpKTtcbiAgfSxcbiAgdGFibGU6ICh0YWJ1bGFyRGF0YSwgX3Byb3BlcnRpZXMpID0+IHtcbiAgICBzeXMuY29uc29sZV9sb2coY29uc29sZV9sZXZlbF9pbmZvLCBmbXRMb2codGFidWxhckRhdGEpKTtcbiAgfSxcbiAgdHJhY2U6ICguLi5kYXRhKSA9PiB7XG4gICAgc3lzLmNvbnNvbGVfbG9nKGNvbnNvbGVfbGV2ZWxfdHJhY2UsIGZtdExvZyguLi5kYXRhKSk7XG4gIH0sXG4gIHdhcm46ICguLi5kYXRhKSA9PiB7XG4gICAgc3lzLmNvbnNvbGVfbG9nKGNvbnNvbGVfbGV2ZWxfd2FybiwgZm10TG9nKC4uLmRhdGEpKTtcbiAgfSxcbiAgZGlyOiAoX2l0ZW0sIF9vcHRpb25zKSA9PiB7XG4gIH0sXG4gIGRpcnhtbDogKC4uLl9kYXRhKSA9PiB7XG4gIH0sXG4gIC8vIENvdW50aW5nXG4gIGNvdW50OiAoX2xhYmVsID0gXCJkZWZhdWx0XCIpID0+IHtcbiAgfSxcbiAgY291bnRSZXNldDogKF9sYWJlbCA9IFwiZGVmYXVsdFwiKSA9PiB7XG4gIH0sXG4gIC8vIEdyb3VwaW5nXG4gIGdyb3VwOiAoLi4uX2RhdGEpID0+IHtcbiAgfSxcbiAgZ3JvdXBDb2xsYXBzZWQ6ICguLi5fZGF0YSkgPT4ge1xuICB9LFxuICBncm91cEVuZDogKCkgPT4ge1xuICB9LFxuICAvLyBUaW1pbmdcbiAgdGltZTogKGxhYmVsID0gXCJkZWZhdWx0XCIpID0+IHtcbiAgICBpZiAodGltZXJNYXAuaGFzKGxhYmVsKSkge1xuICAgICAgc3lzLmNvbnNvbGVfbG9nKGNvbnNvbGVfbGV2ZWxfd2FybiwgYFRpbWVyICcke2xhYmVsfScgYWxyZWFkeSBleGlzdHMuYCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRpbWVyTWFwLnNldChsYWJlbCwgc3lzLmNvbnNvbGVfdGltZXJfc3RhcnQobGFiZWwpKTtcbiAgfSxcbiAgdGltZUxvZzogKGxhYmVsID0gXCJkZWZhdWx0XCIsIC4uLmRhdGEpID0+IHtcbiAgICBzeXMuY29uc29sZV9sb2coY29uc29sZV9sZXZlbF9pbmZvLCBmbXRMb2cobGFiZWwsIC4uLmRhdGEpKTtcbiAgfSxcbiAgdGltZUVuZDogKGxhYmVsID0gXCJkZWZhdWx0XCIpID0+IHtcbiAgICBjb25zdCBzcGFuSWQgPSB0aW1lck1hcC5nZXQobGFiZWwpO1xuICAgIGlmIChzcGFuSWQgPT09IHZvaWQgMCkge1xuICAgICAgc3lzLmNvbnNvbGVfbG9nKGNvbnNvbGVfbGV2ZWxfd2FybiwgYFRpbWVyICcke2xhYmVsfScgZG9lcyBub3QgZXhpc3QuYCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHN5cy5jb25zb2xlX3RpbWVyX2VuZChzcGFuSWQpO1xuICAgIHRpbWVyTWFwLmRlbGV0ZShsYWJlbCk7XG4gIH0sXG4gIC8vIEFkZGl0aW9uYWwgY29uc29sZSBtZXRob2RzIHRvIHNhdGlzZnkgdGhlIENvbnNvbGUgaW50ZXJmYWNlXG4gIHRpbWVTdGFtcDogKCkgPT4ge1xuICB9LFxuICBwcm9maWxlOiAoKSA9PiB7XG4gIH0sXG4gIHByb2ZpbGVFbmQ6ICgpID0+IHtcbiAgfVxufTtcbmNvbnNvbGUyLkNvbnNvbGUgPSBjb25zb2xlMjtcbmdsb2JhbFRoaXMuY29uc29sZSA9IGNvbnNvbGUyO1xuXG4vLyBzcmMvc2VydmVyL3JlZ2lzdGVyX2hvb2tzLnRzXG5yZWdpc3Rlcl9ob29rcyhob29rcyk7XG5yZWdpc3Rlcl9ob29rcyQxKGhvb2tzX3YxXzEpO1xucmVnaXN0ZXJfaG9va3MkMihob29rc192MV8yKTtcbi8qISBCdW5kbGVkIGxpY2Vuc2UgaW5mb3JtYXRpb246XG5cbnN0YXR1c2VzL2luZGV4LmpzOlxuICAoKiFcbiAgICogc3RhdHVzZXNcbiAgICogQ29weXJpZ2h0KGMpIDIwMTQgSm9uYXRoYW4gT25nXG4gICAqIENvcHlyaWdodChjKSAyMDE2IERvdWdsYXMgQ2hyaXN0b3BoZXIgV2lsc29uXG4gICAqIE1JVCBMaWNlbnNlZFxuICAgKilcbiovXG5cbmV4cG9ydCB7IEFycmF5QnVpbGRlciwgQXJyYXlDb2x1bW5CdWlsZGVyLCBCb29sQnVpbGRlciwgQm9vbENvbHVtbkJ1aWxkZXIsIEJ5dGVBcnJheUJ1aWxkZXIsIEJ5dGVBcnJheUNvbHVtbkJ1aWxkZXIsIENvbHVtbkJ1aWxkZXIsIENvbm5lY3Rpb25JZEJ1aWxkZXIsIENvbm5lY3Rpb25JZENvbHVtbkJ1aWxkZXIsIEYzMkJ1aWxkZXIsIEYzMkNvbHVtbkJ1aWxkZXIsIEY2NEJ1aWxkZXIsIEY2NENvbHVtbkJ1aWxkZXIsIEkxMjhCdWlsZGVyLCBJMTI4Q29sdW1uQnVpbGRlciwgSTE2QnVpbGRlciwgSTE2Q29sdW1uQnVpbGRlciwgSTI1NkJ1aWxkZXIsIEkyNTZDb2x1bW5CdWlsZGVyLCBJMzJCdWlsZGVyLCBJMzJDb2x1bW5CdWlsZGVyLCBJNjRCdWlsZGVyLCBJNjRDb2x1bW5CdWlsZGVyLCBJOEJ1aWxkZXIsIEk4Q29sdW1uQnVpbGRlciwgSWRlbnRpdHlCdWlsZGVyLCBJZGVudGl0eUNvbHVtbkJ1aWxkZXIsIE9wdGlvbkJ1aWxkZXIsIE9wdGlvbkNvbHVtbkJ1aWxkZXIsIFByb2R1Y3RCdWlsZGVyLCBQcm9kdWN0Q29sdW1uQnVpbGRlciwgUmVmQnVpbGRlciwgUmVzdWx0QnVpbGRlciwgUmVzdWx0Q29sdW1uQnVpbGRlciwgUm93QnVpbGRlciwgU2NoZWR1bGVBdEJ1aWxkZXIsIFNjaGVkdWxlQXRDb2x1bW5CdWlsZGVyLCBTZW5kZXJFcnJvciwgU2ltcGxlU3VtQnVpbGRlciwgU2ltcGxlU3VtQ29sdW1uQnVpbGRlciwgU3BhY2V0aW1lSG9zdEVycm9yLCBTdHJpbmdCdWlsZGVyLCBTdHJpbmdDb2x1bW5CdWlsZGVyLCBTdW1CdWlsZGVyLCBTdW1Db2x1bW5CdWlsZGVyLCBUaW1lRHVyYXRpb25CdWlsZGVyLCBUaW1lRHVyYXRpb25Db2x1bW5CdWlsZGVyLCBUaW1lc3RhbXBCdWlsZGVyLCBUaW1lc3RhbXBDb2x1bW5CdWlsZGVyLCBUeXBlQnVpbGRlciwgVTEyOEJ1aWxkZXIsIFUxMjhDb2x1bW5CdWlsZGVyLCBVMTZCdWlsZGVyLCBVMTZDb2x1bW5CdWlsZGVyLCBVMjU2QnVpbGRlciwgVTI1NkNvbHVtbkJ1aWxkZXIsIFUzMkJ1aWxkZXIsIFUzMkNvbHVtbkJ1aWxkZXIsIFU2NEJ1aWxkZXIsIFU2NENvbHVtbkJ1aWxkZXIsIFU4QnVpbGRlciwgVThDb2x1bW5CdWlsZGVyLCBVdWlkQnVpbGRlciwgVXVpZENvbHVtbkJ1aWxkZXIsIGFuZCwgZXJyb3JzLCBub3QsIG9yLCByZWR1Y2Vycywgc2NoZW1hLCB0LCB0YWJsZSwgdG9DYW1lbENhc2UgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4Lm1qcy5tYXBcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4Lm1qcy5tYXAiLCJpbXBvcnQgeyBzY2hlbWEsIHRhYmxlLCB0fSBmcm9tICdzcGFjZXRpbWVkYi9zZXJ2ZXInO1xuXG5cbmNvbnN0IExMTV9SZXN1bHRzID0gdGFibGUoXG4gIHtcbiAgICBuYW1lOiAnbGxtX3Jlc3VsdCcsXG4gICAgcHVibGljOiB0cnVlXG4gIH0sXG4gIHtcbiAgICBpZDogdC51MTI4KCkuYXV0b0luYygpLnByaW1hcnlLZXkoKSxcbiAgICBwcm9tcHQ6IHQuc3RyaW5nKCksXG4gICAgc2NoZW1hOiB0LnN0cmluZygpLFxuICAgIHJlc3BvbnNlOiB0LnN0cmluZygpLFxuICAgIHByb3ZpZGVyOiB0LnN0cmluZygpLFxuICAgIG1vZGVsOiB0LnN0cmluZygpLFxuICB9XG4pXG5cbmZ1bmN0aW9uIHZhbGlkYXRlU2NoZW1hKGNvbnRlbnQ6IHN0cmluZywgc2NoZW1hOiBzdHJpbmcpe1xuICByZXR1cm4gdHJ1ZTtcbn1cblxuZXhwb3J0IGNvbnN0IHNwYWNldGltZWRiID0gc2NoZW1hKExMTV9SZXN1bHRzKVxuXG5cblxuXG5zcGFjZXRpbWVkYi5yZWR1Y2VyKCdhZGRfY2FsbCcsIHtcbiAgcHJvbXB0OiB0LnN0cmluZygpLFxuICBzY2hlbWE6IHQuc3RyaW5nKCksXG4gIHJlc3BvbnNlOiB0LnN0cmluZygpLFxuICBwcm92aWRlcjogdC5zdHJpbmcoKSxcbiAgbW9kZWw6IHQuc3RyaW5nKCksXG59LCAoY3R4LCB7IHByb21wdCwgc2NoZW1hLCByZXNwb25zZSwgcHJvdmlkZXIsIG1vZGVsIH0pID0+IHtcblxuXG4gIGlmICghdmFsaWRhdGVTY2hlbWEocHJvbXB0LCBzY2hlbWEpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIHNjaGVtYScpO1xuICB9XG5cbiAgY3R4LmRiLmxsbVJlc3VsdC5pbnNlcnQoe2lkOiAwbiwgcHJvbXB0LCBzY2hlbWEsIHJlc3BvbnNlLCBwcm92aWRlciwgbW9kZWwgfSk7XG5cblxufSk7XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQSxJQUFJQSxhQUFXLE9BQU87QUFDdEIsSUFBSUMsY0FBWSxPQUFP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QU0sY0FBYyxNQUNsQjtDQUNFLE1BQU07Q0FDTixRQUFRO0NBQ1QsRUFDRDtDQUNFLElBQUksRUFBRSxNQUFNLENBQUMsU0FBUyxDQUFDLFlBQVk7Q0FDbkMsUUFBUSxFQUFFLFFBQVE7Q0FDbEIsUUFBUSxFQUFFLFFBQVE7Q0FDbEIsVUFBVSxFQUFFLFFBQVE7Q0FDcEIsVUFBVSxFQUFFLFFBQVE7Q0FDcEIsT0FBTyxFQUFFLFFBQVE7Q0FDbEIsQ0FDRjtBQUVELFNBQVMsZUFBZSxTQUFpQixVQUFlO0FBQ3RELFFBQU87O0FBR1QsTUFBYSxjQUFjLE9BQU8sWUFBWTtBQUs5QyxZQUFZLFFBQVEsWUFBWTtDQUM5QixRQUFRLEVBQUUsUUFBUTtDQUNsQixRQUFRLEVBQUUsUUFBUTtDQUNsQixVQUFVLEVBQUUsUUFBUTtDQUNwQixVQUFVLEVBQUUsUUFBUTtDQUNwQixPQUFPLEVBQUUsUUFBUTtDQUNsQixHQUFHLEtBQUssRUFBRSxRQUFRLGtCQUFRLFVBQVUsVUFBVSxZQUFZO0FBR3pELEtBQUksQ0FBQyxlQUFlLFFBQVFDLFNBQU8sQ0FDakMsT0FBTSxJQUFJLE1BQU0saUJBQWlCO0FBR25DLEtBQUksR0FBRyxVQUFVLE9BQU87RUFBQyxJQUFJO0VBQUk7RUFBUTtFQUFRO0VBQVU7RUFBVTtFQUFPLENBQUM7RUFHN0UiLCJkZWJ1Z0lkIjoiYTI5YWYyNzEtODMzMS00ZWRlLWI4NDctZjBhZjVkN2VhMDlkIn0=