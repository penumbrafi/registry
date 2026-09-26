var Ln = Object.defineProperty;
var Rn = (s, e, n) => e in s ? Ln(s, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : s[e] = n;
var c = (s, e, n) => Rn(s, typeof e != "symbol" ? e + "" : e, n);
function f(s, e) {
  if (!s)
    throw new Error(e);
}
const Pn = 34028234663852886e22, Fn = -34028234663852886e22, Yn = 4294967295, Qn = 2147483647, Gn = -2147483648;
function ee(s) {
  if (typeof s != "number")
    throw new Error("invalid int 32: " + typeof s);
  if (!Number.isInteger(s) || s > Qn || s < Gn)
    throw new Error("invalid int 32: " + s);
}
function ge(s) {
  if (typeof s != "number")
    throw new Error("invalid uint 32: " + typeof s);
  if (!Number.isInteger(s) || s > Yn || s < 0)
    throw new Error("invalid uint 32: " + s);
}
function Qe(s) {
  if (typeof s != "number")
    throw new Error("invalid float 32: " + typeof s);
  if (Number.isFinite(s) && (s > Pn || s < Fn))
    throw new Error("invalid float 32: " + s);
}
const Ge = Symbol("@bufbuild/protobuf/enum-type");
function Jn(s) {
  const e = s[Ge];
  return f(e, "missing enum type on enum object"), e;
}
function Je(s, e, n, t) {
  s[Ge] = Ke(e, n.map((r) => ({
    no: r.no,
    name: r.name,
    localName: s[r.no]
  })));
}
function Ke(s, e, n) {
  const t = /* @__PURE__ */ Object.create(null), r = /* @__PURE__ */ Object.create(null), a = [];
  for (const o of e) {
    const m = We(o);
    a.push(m), t[o.name] = m, r[o.no] = m;
  }
  return {
    typeName: s,
    values: a,
    // We do not surface options at this time
    // options: opt?.options ?? Object.create(null),
    findName(o) {
      return t[o];
    },
    findNumber(o) {
      return r[o];
    }
  };
}
function Kn(s, e, n) {
  const t = {};
  for (const r of e) {
    const a = We(r);
    t[a.localName] = a.no, t[a.no] = a.localName;
  }
  return Je(t, s, e), t;
}
function We(s) {
  return "localName" in s ? s : Object.assign(Object.assign({}, s), { localName: s.name });
}
class b {
  /**
   * Compare with a message of the same type.
   * Note that this function disregards extensions and unknown fields.
   */
  equals(e) {
    return this.getType().runtime.util.equals(this.getType(), this, e);
  }
  /**
   * Create a deep copy.
   */
  clone() {
    return this.getType().runtime.util.clone(this);
  }
  /**
   * Parse from binary data, merging fields.
   *
   * Repeated fields are appended. Map entries are added, overwriting
   * existing keys.
   *
   * If a message field is already present, it will be merged with the
   * new data.
   */
  fromBinary(e, n) {
    const t = this.getType(), r = t.runtime.bin, a = r.makeReadOptions(n);
    return r.readMessage(this, a.readerFactory(e), e.byteLength, a), this;
  }
  /**
   * Parse a message from a JSON value.
   */
  fromJson(e, n) {
    const t = this.getType(), r = t.runtime.json, a = r.makeReadOptions(n);
    return r.readMessage(t, e, a, this), this;
  }
  /**
   * Parse a message from a JSON string.
   */
  fromJsonString(e, n) {
    let t;
    try {
      t = JSON.parse(e);
    } catch (r) {
      throw new Error(`cannot decode ${this.getType().typeName} from JSON: ${r instanceof Error ? r.message : String(r)}`);
    }
    return this.fromJson(t, n);
  }
  /**
   * Serialize the message to binary data.
   */
  toBinary(e) {
    const n = this.getType(), t = n.runtime.bin, r = t.makeWriteOptions(e), a = r.writerFactory();
    return t.writeMessage(this, a, r), a.finish();
  }
  /**
   * Serialize the message to a JSON value, a JavaScript value that can be
   * passed to JSON.stringify().
   */
  toJson(e) {
    const n = this.getType(), t = n.runtime.json, r = t.makeWriteOptions(e);
    return t.writeMessage(this, r);
  }
  /**
   * Serialize the message to a JSON string.
   */
  toJsonString(e) {
    var n;
    const t = this.toJson(e);
    return JSON.stringify(t, null, (n = e == null ? void 0 : e.prettySpaces) !== null && n !== void 0 ? n : 0);
  }
  /**
   * Override for serialization behavior. This will be invoked when calling
   * JSON.stringify on this message (i.e. JSON.stringify(msg)).
   *
   * Note that this will not serialize google.protobuf.Any with a packed
   * message because the protobuf JSON format specifies that it needs to be
   * unpacked, and this is only possible with a type registry to look up the
   * message type.  As a result, attempting to serialize a message with this
   * type will throw an Error.
   *
   * This method is protected because you should not need to invoke it
   * directly -- instead use JSON.stringify or toJsonString for
   * stringified JSON.  Alternatively, if actual JSON is desired, you should
   * use toJson.
   */
  toJSON() {
    return this.toJson({
      emitDefaultValues: !0
    });
  }
  /**
   * Retrieve the MessageType of this message - a singleton that represents
   * the protobuf message declaration and provides metadata for reflection-
   * based operations.
   */
  getType() {
    return Object.getPrototypeOf(this).constructor;
  }
}
function Wn(s, e, n, t) {
  var r;
  const a = (r = t == null ? void 0 : t.localName) !== null && r !== void 0 ? r : e.substring(e.lastIndexOf(".") + 1), o = {
    [a]: function(m) {
      s.util.initFields(this), s.util.initPartial(m, this);
    }
  }[a];
  return Object.setPrototypeOf(o.prototype, new b()), Object.assign(o, {
    runtime: s,
    typeName: e,
    fields: s.util.newFieldList(n),
    fromBinary(m, l) {
      return new o().fromBinary(m, l);
    },
    fromJson(m, l) {
      return new o().fromJson(m, l);
    },
    fromJsonString(m, l) {
      return new o().fromJsonString(m, l);
    },
    equals(m, l) {
      return s.util.equals(o, m, l);
    }
  }), o;
}
function Vn() {
  let s = 0, e = 0;
  for (let t = 0; t < 28; t += 7) {
    let r = this.buf[this.pos++];
    if (s |= (r & 127) << t, !(r & 128))
      return this.assertBounds(), [s, e];
  }
  let n = this.buf[this.pos++];
  if (s |= (n & 15) << 28, e = (n & 112) >> 4, !(n & 128))
    return this.assertBounds(), [s, e];
  for (let t = 3; t <= 31; t += 7) {
    let r = this.buf[this.pos++];
    if (e |= (r & 127) << t, !(r & 128))
      return this.assertBounds(), [s, e];
  }
  throw new Error("invalid varint");
}
function ce(s, e, n) {
  for (let a = 0; a < 28; a = a + 7) {
    const o = s >>> a, m = !(!(o >>> 7) && e == 0), l = (m ? o | 128 : o) & 255;
    if (n.push(l), !m)
      return;
  }
  const t = s >>> 28 & 15 | (e & 7) << 4, r = !!(e >> 3);
  if (n.push((r ? t | 128 : t) & 255), !!r) {
    for (let a = 3; a < 31; a = a + 7) {
      const o = e >>> a, m = !!(o >>> 7), l = (m ? o | 128 : o) & 255;
      if (n.push(l), !m)
        return;
    }
    n.push(e >>> 31 & 1);
  }
}
const ne = 4294967296;
function Ae(s) {
  const e = s[0] === "-";
  e && (s = s.slice(1));
  const n = 1e6;
  let t = 0, r = 0;
  function a(o, m) {
    const l = Number(s.slice(o, m));
    r *= n, t = t * n + l, t >= ne && (r = r + (t / ne | 0), t = t % ne);
  }
  return a(-24, -18), a(-18, -12), a(-12, -6), a(-6), e ? Xe(t, r) : qe(t, r);
}
function Xn(s, e) {
  let n = qe(s, e);
  const t = n.hi & 2147483648;
  t && (n = Xe(n.lo, n.hi));
  const r = Ve(n.lo, n.hi);
  return t ? "-" + r : r;
}
function Ve(s, e) {
  if ({ lo: s, hi: e } = Zn(s, e), e <= 2097151)
    return String(ne * e + s);
  const n = s & 16777215, t = (s >>> 24 | e << 8) & 16777215, r = e >> 16 & 65535;
  let a = n + t * 6777216 + r * 6710656, o = t + r * 8147497, m = r * 2;
  const l = 1e7;
  return a >= l && (o += Math.floor(a / l), a %= l), o >= l && (m += Math.floor(o / l), o %= l), m.toString() + Ie(o) + Ie(a);
}
function Zn(s, e) {
  return { lo: s >>> 0, hi: e >>> 0 };
}
function qe(s, e) {
  return { lo: s | 0, hi: e | 0 };
}
function Xe(s, e) {
  return e = ~e, s ? s = ~s + 1 : e += 1, qe(s, e);
}
const Ie = (s) => {
  const e = String(s);
  return "0000000".slice(e.length) + e;
};
function ze(s, e) {
  if (s >= 0) {
    for (; s > 127; )
      e.push(s & 127 | 128), s = s >>> 7;
    e.push(s);
  } else {
    for (let n = 0; n < 9; n++)
      e.push(s & 127 | 128), s = s >> 7;
    e.push(1);
  }
}
function _n() {
  let s = this.buf[this.pos++], e = s & 127;
  if (!(s & 128))
    return this.assertBounds(), e;
  if (s = this.buf[this.pos++], e |= (s & 127) << 7, !(s & 128))
    return this.assertBounds(), e;
  if (s = this.buf[this.pos++], e |= (s & 127) << 14, !(s & 128))
    return this.assertBounds(), e;
  if (s = this.buf[this.pos++], e |= (s & 127) << 21, !(s & 128))
    return this.assertBounds(), e;
  s = this.buf[this.pos++], e |= (s & 15) << 28;
  for (let n = 5; s & 128 && n < 10; n++)
    s = this.buf[this.pos++];
  if (s & 128)
    throw new Error("invalid varint");
  return this.assertBounds(), e >>> 0;
}
function $n() {
  const s = new DataView(new ArrayBuffer(8));
  if (typeof BigInt == "function" && typeof s.getBigInt64 == "function" && typeof s.getBigUint64 == "function" && typeof s.setBigInt64 == "function" && typeof s.setBigUint64 == "function" && (typeof process != "object" || typeof process.env != "object" || process.env.BUF_BIGINT_DISABLE !== "1")) {
    const r = BigInt("-9223372036854775808"), a = BigInt("9223372036854775807"), o = BigInt("0"), m = BigInt("18446744073709551615");
    return {
      zero: BigInt(0),
      supported: !0,
      parse(l) {
        const g = typeof l == "bigint" ? l : BigInt(l);
        if (g > a || g < r)
          throw new Error(`int64 invalid: ${l}`);
        return g;
      },
      uParse(l) {
        const g = typeof l == "bigint" ? l : BigInt(l);
        if (g > m || g < o)
          throw new Error(`uint64 invalid: ${l}`);
        return g;
      },
      enc(l) {
        return s.setBigInt64(0, this.parse(l), !0), {
          lo: s.getInt32(0, !0),
          hi: s.getInt32(4, !0)
        };
      },
      uEnc(l) {
        return s.setBigInt64(0, this.uParse(l), !0), {
          lo: s.getInt32(0, !0),
          hi: s.getInt32(4, !0)
        };
      },
      dec(l, g) {
        return s.setInt32(0, l, !0), s.setInt32(4, g, !0), s.getBigInt64(0, !0);
      },
      uDec(l, g) {
        return s.setInt32(0, l, !0), s.setInt32(4, g, !0), s.getBigUint64(0, !0);
      }
    };
  }
  const n = (r) => f(/^-?[0-9]+$/.test(r), `int64 invalid: ${r}`), t = (r) => f(/^[0-9]+$/.test(r), `uint64 invalid: ${r}`);
  return {
    zero: "0",
    supported: !1,
    parse(r) {
      return typeof r != "string" && (r = r.toString()), n(r), r;
    },
    uParse(r) {
      return typeof r != "string" && (r = r.toString()), t(r), r;
    },
    enc(r) {
      return typeof r != "string" && (r = r.toString()), n(r), Ae(r);
    },
    uEnc(r) {
      return typeof r != "string" && (r = r.toString()), t(r), Ae(r);
    },
    dec(r, a) {
      return Xn(r, a);
    },
    uDec(r, a) {
      return Ve(r, a);
    }
  };
}
const w = $n();
var i;
(function(s) {
  s[s.DOUBLE = 1] = "DOUBLE", s[s.FLOAT = 2] = "FLOAT", s[s.INT64 = 3] = "INT64", s[s.UINT64 = 4] = "UINT64", s[s.INT32 = 5] = "INT32", s[s.FIXED64 = 6] = "FIXED64", s[s.FIXED32 = 7] = "FIXED32", s[s.BOOL = 8] = "BOOL", s[s.STRING = 9] = "STRING", s[s.BYTES = 12] = "BYTES", s[s.UINT32 = 13] = "UINT32", s[s.SFIXED32 = 15] = "SFIXED32", s[s.SFIXED64 = 16] = "SFIXED64", s[s.SINT32 = 17] = "SINT32", s[s.SINT64 = 18] = "SINT64";
})(i || (i = {}));
var P;
(function(s) {
  s[s.BIGINT = 0] = "BIGINT", s[s.STRING = 1] = "STRING";
})(P || (P = {}));
function R(s, e, n) {
  if (e === n)
    return !0;
  if (s == i.BYTES) {
    if (!(e instanceof Uint8Array) || !(n instanceof Uint8Array) || e.length !== n.length)
      return !1;
    for (let t = 0; t < e.length; t++)
      if (e[t] !== n[t])
        return !1;
    return !0;
  }
  switch (s) {
    case i.UINT64:
    case i.FIXED64:
    case i.INT64:
    case i.SFIXED64:
    case i.SINT64:
      return e == n;
  }
  return !1;
}
function G(s, e) {
  switch (s) {
    case i.BOOL:
      return !1;
    case i.UINT64:
    case i.FIXED64:
    case i.INT64:
    case i.SFIXED64:
    case i.SINT64:
      return e == 0 ? w.zero : "0";
    case i.DOUBLE:
    case i.FLOAT:
      return 0;
    case i.BYTES:
      return new Uint8Array(0);
    case i.STRING:
      return "";
    default:
      return 0;
  }
}
function Ze(s, e) {
  switch (s) {
    case i.BOOL:
      return e === !1;
    case i.STRING:
      return e === "";
    case i.BYTES:
      return e instanceof Uint8Array && !e.byteLength;
    default:
      return e == 0;
  }
}
var y;
(function(s) {
  s[s.Varint = 0] = "Varint", s[s.Bit64 = 1] = "Bit64", s[s.LengthDelimited = 2] = "LengthDelimited", s[s.StartGroup = 3] = "StartGroup", s[s.EndGroup = 4] = "EndGroup", s[s.Bit32 = 5] = "Bit32";
})(y || (y = {}));
class es {
  constructor(e) {
    this.stack = [], this.textEncoder = e ?? new TextEncoder(), this.chunks = [], this.buf = [];
  }
  /**
   * Return all bytes written and reset this writer.
   */
  finish() {
    this.chunks.push(new Uint8Array(this.buf));
    let e = 0;
    for (let r = 0; r < this.chunks.length; r++)
      e += this.chunks[r].length;
    let n = new Uint8Array(e), t = 0;
    for (let r = 0; r < this.chunks.length; r++)
      n.set(this.chunks[r], t), t += this.chunks[r].length;
    return this.chunks = [], n;
  }
  /**
   * Start a new fork for length-delimited data like a message
   * or a packed repeated field.
   *
   * Must be joined later with `join()`.
   */
  fork() {
    return this.stack.push({ chunks: this.chunks, buf: this.buf }), this.chunks = [], this.buf = [], this;
  }
  /**
   * Join the last fork. Write its length and bytes, then
   * return to the previous state.
   */
  join() {
    let e = this.finish(), n = this.stack.pop();
    if (!n)
      throw new Error("invalid state, fork stack empty");
    return this.chunks = n.chunks, this.buf = n.buf, this.uint32(e.byteLength), this.raw(e);
  }
  /**
   * Writes a tag (field number and wire type).
   *
   * Equivalent to `uint32( (fieldNo << 3 | type) >>> 0 )`.
   *
   * Generated code should compute the tag ahead of time and call `uint32()`.
   */
  tag(e, n) {
    return this.uint32((e << 3 | n) >>> 0);
  }
  /**
   * Write a chunk of raw bytes.
   */
  raw(e) {
    return this.buf.length && (this.chunks.push(new Uint8Array(this.buf)), this.buf = []), this.chunks.push(e), this;
  }
  /**
   * Write a `uint32` value, an unsigned 32 bit varint.
   */
  uint32(e) {
    for (ge(e); e > 127; )
      this.buf.push(e & 127 | 128), e = e >>> 7;
    return this.buf.push(e), this;
  }
  /**
   * Write a `int32` value, a signed 32 bit varint.
   */
  int32(e) {
    return ee(e), ze(e, this.buf), this;
  }
  /**
   * Write a `bool` value, a variant.
   */
  bool(e) {
    return this.buf.push(e ? 1 : 0), this;
  }
  /**
   * Write a `bytes` value, length-delimited arbitrary data.
   */
  bytes(e) {
    return this.uint32(e.byteLength), this.raw(e);
  }
  /**
   * Write a `string` value, length-delimited data converted to UTF-8 text.
   */
  string(e) {
    let n = this.textEncoder.encode(e);
    return this.uint32(n.byteLength), this.raw(n);
  }
  /**
   * Write a `float` value, 32-bit floating point number.
   */
  float(e) {
    Qe(e);
    let n = new Uint8Array(4);
    return new DataView(n.buffer).setFloat32(0, e, !0), this.raw(n);
  }
  /**
   * Write a `double` value, a 64-bit floating point number.
   */
  double(e) {
    let n = new Uint8Array(8);
    return new DataView(n.buffer).setFloat64(0, e, !0), this.raw(n);
  }
  /**
   * Write a `fixed32` value, an unsigned, fixed-length 32-bit integer.
   */
  fixed32(e) {
    ge(e);
    let n = new Uint8Array(4);
    return new DataView(n.buffer).setUint32(0, e, !0), this.raw(n);
  }
  /**
   * Write a `sfixed32` value, a signed, fixed-length 32-bit integer.
   */
  sfixed32(e) {
    ee(e);
    let n = new Uint8Array(4);
    return new DataView(n.buffer).setInt32(0, e, !0), this.raw(n);
  }
  /**
   * Write a `sint32` value, a signed, zigzag-encoded 32-bit varint.
   */
  sint32(e) {
    return ee(e), e = (e << 1 ^ e >> 31) >>> 0, ze(e, this.buf), this;
  }
  /**
   * Write a `fixed64` value, a signed, fixed-length 64-bit integer.
   */
  sfixed64(e) {
    let n = new Uint8Array(8), t = new DataView(n.buffer), r = w.enc(e);
    return t.setInt32(0, r.lo, !0), t.setInt32(4, r.hi, !0), this.raw(n);
  }
  /**
   * Write a `fixed64` value, an unsigned, fixed-length 64 bit integer.
   */
  fixed64(e) {
    let n = new Uint8Array(8), t = new DataView(n.buffer), r = w.uEnc(e);
    return t.setInt32(0, r.lo, !0), t.setInt32(4, r.hi, !0), this.raw(n);
  }
  /**
   * Write a `int64` value, a signed 64-bit varint.
   */
  int64(e) {
    let n = w.enc(e);
    return ce(n.lo, n.hi, this.buf), this;
  }
  /**
   * Write a `sint64` value, a signed, zig-zag-encoded 64-bit varint.
   */
  sint64(e) {
    let n = w.enc(e), t = n.hi >> 31, r = n.lo << 1 ^ t, a = (n.hi << 1 | n.lo >>> 31) ^ t;
    return ce(r, a, this.buf), this;
  }
  /**
   * Write a `uint64` value, an unsigned 64-bit varint.
   */
  uint64(e) {
    let n = w.uEnc(e);
    return ce(n.lo, n.hi, this.buf), this;
  }
}
class ns {
  constructor(e, n) {
    this.varint64 = Vn, this.uint32 = _n, this.buf = e, this.len = e.length, this.pos = 0, this.view = new DataView(e.buffer, e.byteOffset, e.byteLength), this.textDecoder = n ?? new TextDecoder();
  }
  /**
   * Reads a tag - field number and wire type.
   */
  tag() {
    let e = this.uint32(), n = e >>> 3, t = e & 7;
    if (n <= 0 || t < 0 || t > 5)
      throw new Error("illegal tag: field no " + n + " wire type " + t);
    return [n, t];
  }
  /**
   * Skip one element and return the skipped data.
   *
   * When skipping StartGroup, provide the tags field number to check for
   * matching field number in the EndGroup tag.
   */
  skip(e, n) {
    let t = this.pos;
    switch (e) {
      case y.Varint:
        for (; this.buf[this.pos++] & 128; )
          ;
        break;
      case y.Bit64:
        this.pos += 4;
      case y.Bit32:
        this.pos += 4;
        break;
      case y.LengthDelimited:
        let r = this.uint32();
        this.pos += r;
        break;
      case y.StartGroup:
        for (; ; ) {
          const [a, o] = this.tag();
          if (o === y.EndGroup) {
            if (n !== void 0 && a !== n)
              throw new Error("invalid end group tag");
            break;
          }
          this.skip(o, a);
        }
        break;
      default:
        throw new Error("cant skip wire type " + e);
    }
    return this.assertBounds(), this.buf.subarray(t, this.pos);
  }
  /**
   * Throws error if position in byte array is out of range.
   */
  assertBounds() {
    if (this.pos > this.len)
      throw new RangeError("premature EOF");
  }
  /**
   * Read a `int32` field, a signed 32 bit varint.
   */
  int32() {
    return this.uint32() | 0;
  }
  /**
   * Read a `sint32` field, a signed, zigzag-encoded 32-bit varint.
   */
  sint32() {
    let e = this.uint32();
    return e >>> 1 ^ -(e & 1);
  }
  /**
   * Read a `int64` field, a signed 64-bit varint.
   */
  int64() {
    return w.dec(...this.varint64());
  }
  /**
   * Read a `uint64` field, an unsigned 64-bit varint.
   */
  uint64() {
    return w.uDec(...this.varint64());
  }
  /**
   * Read a `sint64` field, a signed, zig-zag-encoded 64-bit varint.
   */
  sint64() {
    let [e, n] = this.varint64(), t = -(e & 1);
    return e = (e >>> 1 | (n & 1) << 31) ^ t, n = n >>> 1 ^ t, w.dec(e, n);
  }
  /**
   * Read a `bool` field, a variant.
   */
  bool() {
    let [e, n] = this.varint64();
    return e !== 0 || n !== 0;
  }
  /**
   * Read a `fixed32` field, an unsigned, fixed-length 32-bit integer.
   */
  fixed32() {
    return this.view.getUint32((this.pos += 4) - 4, !0);
  }
  /**
   * Read a `sfixed32` field, a signed, fixed-length 32-bit integer.
   */
  sfixed32() {
    return this.view.getInt32((this.pos += 4) - 4, !0);
  }
  /**
   * Read a `fixed64` field, an unsigned, fixed-length 64 bit integer.
   */
  fixed64() {
    return w.uDec(this.sfixed32(), this.sfixed32());
  }
  /**
   * Read a `fixed64` field, a signed, fixed-length 64-bit integer.
   */
  sfixed64() {
    return w.dec(this.sfixed32(), this.sfixed32());
  }
  /**
   * Read a `float` field, 32-bit floating point number.
   */
  float() {
    return this.view.getFloat32((this.pos += 4) - 4, !0);
  }
  /**
   * Read a `double` field, a 64-bit floating point number.
   */
  double() {
    return this.view.getFloat64((this.pos += 8) - 8, !0);
  }
  /**
   * Read a `bytes` field, length-delimited arbitrary data.
   */
  bytes() {
    let e = this.uint32(), n = this.pos;
    return this.pos += e, this.assertBounds(), this.buf.subarray(n, n + e);
  }
  /**
   * Read a `string` field, length-delimited data converted to UTF-8 text.
   */
  string() {
    return this.textDecoder.decode(this.bytes());
  }
}
function ss(s, e, n, t) {
  let r;
  return {
    typeName: e,
    extendee: n,
    get field() {
      if (!r) {
        const a = typeof t == "function" ? t() : t;
        a.name = e.split(".").pop(), a.jsonName = `[${e}]`, r = s.util.newFieldList([a]).list()[0];
      }
      return r;
    },
    runtime: s
  };
}
function _e(s) {
  const e = s.field.localName, n = /* @__PURE__ */ Object.create(null);
  return n[e] = ts(s), [n, () => n[e]];
}
function ts(s) {
  const e = s.field;
  if (e.repeated)
    return [];
  if (e.default !== void 0)
    return e.default;
  switch (e.kind) {
    case "enum":
      return e.T.values[0].no;
    case "scalar":
      return G(e.T, e.L);
    case "message":
      const n = e.T, t = new n();
      return n.fieldWrapper ? n.fieldWrapper.unwrapField(t) : t;
    case "map":
      throw "map fields are not allowed to be extensions";
  }
}
function rs(s, e) {
  if (!e.repeated && (e.kind == "enum" || e.kind == "scalar")) {
    for (let n = s.length - 1; n >= 0; --n)
      if (s[n].no == e.no)
        return [s[n]];
    return [];
  }
  return s.filter((n) => n.no === e.no);
}
let M = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split(""), ie = [];
for (let s = 0; s < M.length; s++)
  ie[M[s].charCodeAt(0)] = s;
ie[45] = M.indexOf("+");
ie[95] = M.indexOf("/");
const $e = {
  /**
   * Decodes a base64 string to a byte array.
   *
   * - ignores white-space, including line breaks and tabs
   * - allows inner padding (can decode concatenated base64 strings)
   * - does not require padding
   * - understands base64url encoding:
   *   "-" instead of "+",
   *   "_" instead of "/",
   *   no padding
   */
  dec(s) {
    let e = s.length * 3 / 4;
    s[s.length - 2] == "=" ? e -= 2 : s[s.length - 1] == "=" && (e -= 1);
    let n = new Uint8Array(e), t = 0, r = 0, a, o = 0;
    for (let m = 0; m < s.length; m++) {
      if (a = ie[s.charCodeAt(m)], a === void 0)
        switch (s[m]) {
          case "=":
            r = 0;
          case `
`:
          case "\r":
          case "	":
          case " ":
            continue;
          default:
            throw Error("invalid base64 string.");
        }
      switch (r) {
        case 0:
          o = a, r = 1;
          break;
        case 1:
          n[t++] = o << 2 | (a & 48) >> 4, o = a, r = 2;
          break;
        case 2:
          n[t++] = (o & 15) << 4 | (a & 60) >> 2, o = a, r = 3;
          break;
        case 3:
          n[t++] = (o & 3) << 6 | a, r = 0;
          break;
      }
    }
    if (r == 1)
      throw Error("invalid base64 string.");
    return n.subarray(0, t);
  },
  /**
   * Encode a byte array to a base64 string.
   */
  enc(s) {
    let e = "", n = 0, t, r = 0;
    for (let a = 0; a < s.length; a++)
      switch (t = s[a], n) {
        case 0:
          e += M[t >> 2], r = (t & 3) << 4, n = 1;
          break;
        case 1:
          e += M[r | t >> 4], r = (t & 15) << 2, n = 2;
          break;
        case 2:
          e += M[r | t >> 6], e += M[t & 63], n = 0;
          break;
      }
    return n && (e += M[r], e += "=", n == 1 && (e += "=")), e;
  }
};
function as(s, e, n) {
  nn(e, s);
  const t = e.runtime.bin.makeReadOptions(n), r = rs(s.getType().runtime.bin.listUnknownFields(s), e.field), [a, o] = _e(e);
  for (const m of r)
    e.runtime.bin.readField(a, t.readerFactory(m.data), e.field, m.wireType, t);
  return o();
}
function os(s, e, n, t) {
  nn(e, s);
  const r = e.runtime.bin.makeReadOptions(t), a = e.runtime.bin.makeWriteOptions(t);
  if (en(s, e)) {
    const g = s.getType().runtime.bin.listUnknownFields(s).filter((d) => d.no != e.field.no);
    s.getType().runtime.bin.discardUnknownFields(s);
    for (const d of g)
      s.getType().runtime.bin.onUnknownField(s, d.no, d.wireType, d.data);
  }
  const o = a.writerFactory();
  let m = e.field;
  !m.opt && !m.repeated && (m.kind == "enum" || m.kind == "scalar") && (m = Object.assign(Object.assign({}, e.field), { opt: !0 })), e.runtime.bin.writeField(m, n, o, a);
  const l = r.readerFactory(o.finish());
  for (; l.pos < l.len; ) {
    const [g, d] = l.tag(), p = l.skip(d, g);
    s.getType().runtime.bin.onUnknownField(s, g, d, p);
  }
}
function en(s, e) {
  const n = s.getType();
  return e.extendee.typeName === n.typeName && !!n.runtime.bin.listUnknownFields(s).find((t) => t.no == e.field.no);
}
function nn(s, e) {
  f(s.extendee.typeName == e.getType().typeName, `extension ${s.typeName} can only be applied to message ${s.extendee.typeName}`);
}
function sn(s, e) {
  const n = s.localName;
  if (s.repeated)
    return e[n].length > 0;
  if (s.oneof)
    return e[s.oneof.localName].case === n;
  switch (s.kind) {
    case "enum":
    case "scalar":
      return s.opt || s.req ? e[n] !== void 0 : s.kind == "enum" ? e[n] !== s.T.values[0].no : !Ze(s.T, e[n]);
    case "message":
      return e[n] !== void 0;
    case "map":
      return Object.keys(e[n]).length > 0;
  }
}
function je(s, e) {
  const n = s.localName, t = !s.opt && !s.req;
  if (s.repeated)
    e[n] = [];
  else if (s.oneof)
    e[s.oneof.localName] = { case: void 0 };
  else
    switch (s.kind) {
      case "map":
        e[n] = {};
        break;
      case "enum":
        e[n] = t ? s.T.values[0].no : void 0;
        break;
      case "scalar":
        e[n] = t ? G(s.T, s.L) : void 0;
        break;
      case "message":
        e[n] = void 0;
        break;
    }
}
function Y(s, e) {
  if (s === null || typeof s != "object" || !Object.getOwnPropertyNames(b.prototype).every((t) => t in s && typeof s[t] == "function"))
    return !1;
  const n = s.getType();
  return n === null || typeof n != "function" || !("typeName" in n) || typeof n.typeName != "string" ? !1 : e === void 0 ? !0 : n.typeName == e.typeName;
}
function tn(s, e) {
  return Y(e) || !s.fieldWrapper ? e : s.fieldWrapper.wrapField(e);
}
i.DOUBLE, i.FLOAT, i.INT64, i.UINT64, i.INT32, i.UINT32, i.BOOL, i.STRING, i.BYTES;
const Ue = {
  ignoreUnknownFields: !1
}, Ce = {
  emitDefaultValues: !1,
  enumAsInteger: !1,
  useProtoFieldName: !1,
  prettySpaces: 0
};
function ms(s) {
  return s ? Object.assign(Object.assign({}, Ue), s) : Ue;
}
function is(s) {
  return s ? Object.assign(Object.assign({}, Ce), s) : Ce;
}
const ae = Symbol(), se = Symbol();
function cs() {
  return {
    makeReadOptions: ms,
    makeWriteOptions: is,
    readMessage(s, e, n, t) {
      if (e == null || Array.isArray(e) || typeof e != "object")
        throw new Error(`cannot decode message ${s.typeName} from JSON: ${x(e)}`);
      t = t ?? new s();
      const r = /* @__PURE__ */ new Map(), a = n.typeRegistry;
      for (const [o, m] of Object.entries(e)) {
        const l = s.fields.findJsonName(o);
        if (l) {
          if (l.oneof) {
            if (m === null && l.kind == "scalar")
              continue;
            const g = r.get(l.oneof);
            if (g !== void 0)
              throw new Error(`cannot decode message ${s.typeName} from JSON: multiple keys for oneof "${l.oneof.name}" present: "${g}", "${o}"`);
            r.set(l.oneof, o);
          }
          Te(t, m, l, n, s);
        } else {
          let g = !1;
          if (a != null && a.findExtension && o.startsWith("[") && o.endsWith("]")) {
            const d = a.findExtension(o.substring(1, o.length - 1));
            if (d && d.extendee.typeName == s.typeName) {
              g = !0;
              const [p, u] = _e(d);
              Te(p, m, d.field, n, d), os(t, d, u(), n);
            }
          }
          if (!g && !n.ignoreUnknownFields)
            throw new Error(`cannot decode message ${s.typeName} from JSON: key "${o}" is unknown`);
        }
      }
      return t;
    },
    writeMessage(s, e) {
      const n = s.getType(), t = {};
      let r;
      try {
        for (r of n.fields.byNumber()) {
          if (!sn(r, s)) {
            if (r.req)
              throw "required field not set";
            if (!e.emitDefaultValues || !hs(r))
              continue;
          }
          const o = r.oneof ? s[r.oneof.localName].value : s[r.localName], m = Se(r, o, e);
          m !== void 0 && (t[e.useProtoFieldName ? r.name : r.jsonName] = m);
        }
        const a = e.typeRegistry;
        if (a != null && a.findExtensionFor)
          for (const o of n.runtime.bin.listUnknownFields(s)) {
            const m = a.findExtensionFor(n.typeName, o.no);
            if (m && en(s, m)) {
              const l = as(s, m, e), g = Se(m.field, l, e);
              g !== void 0 && (t[m.field.jsonName] = g);
            }
          }
      } catch (a) {
        const o = r ? `cannot encode field ${n.typeName}.${r.name} to JSON` : `cannot encode message ${n.typeName} to JSON`, m = a instanceof Error ? a.message : String(a);
        throw new Error(o + (m.length > 0 ? `: ${m}` : ""));
      }
      return t;
    },
    readScalar(s, e, n) {
      return X(s, e, n ?? P.BIGINT, !0);
    },
    writeScalar(s, e, n) {
      if (e !== void 0 && (n || Ze(s, e)))
        return te(s, e);
    },
    debug: x
  };
}
function x(s) {
  if (s === null)
    return "null";
  switch (typeof s) {
    case "object":
      return Array.isArray(s) ? "array" : "object";
    case "string":
      return s.length > 100 ? "string" : `"${s.split('"').join('\\"')}"`;
    default:
      return String(s);
  }
}
function Te(s, e, n, t, r) {
  let a = n.localName;
  if (n.repeated) {
    if (f(n.kind != "map"), e === null)
      return;
    if (!Array.isArray(e))
      throw new Error(`cannot decode field ${r.typeName}.${n.name} from JSON: ${x(e)}`);
    const o = s[a];
    for (const m of e) {
      if (m === null)
        throw new Error(`cannot decode field ${r.typeName}.${n.name} from JSON: ${x(m)}`);
      switch (n.kind) {
        case "message":
          o.push(n.T.fromJson(m, t));
          break;
        case "enum":
          const l = le(n.T, m, t.ignoreUnknownFields, !0);
          l !== se && o.push(l);
          break;
        case "scalar":
          try {
            o.push(X(n.T, m, n.L, !0));
          } catch (g) {
            let d = `cannot decode field ${r.typeName}.${n.name} from JSON: ${x(m)}`;
            throw g instanceof Error && g.message.length > 0 && (d += `: ${g.message}`), new Error(d);
          }
          break;
      }
    }
  } else if (n.kind == "map") {
    if (e === null)
      return;
    if (typeof e != "object" || Array.isArray(e))
      throw new Error(`cannot decode field ${r.typeName}.${n.name} from JSON: ${x(e)}`);
    const o = s[a];
    for (const [m, l] of Object.entries(e)) {
      if (l === null)
        throw new Error(`cannot decode field ${r.typeName}.${n.name} from JSON: map value null`);
      let g;
      try {
        g = ls(n.K, m);
      } catch (d) {
        let p = `cannot decode map key for field ${r.typeName}.${n.name} from JSON: ${x(e)}`;
        throw d instanceof Error && d.message.length > 0 && (p += `: ${d.message}`), new Error(p);
      }
      switch (n.V.kind) {
        case "message":
          o[g] = n.V.T.fromJson(l, t);
          break;
        case "enum":
          const d = le(n.V.T, l, t.ignoreUnknownFields, !0);
          d !== se && (o[g] = d);
          break;
        case "scalar":
          try {
            o[g] = X(n.V.T, l, P.BIGINT, !0);
          } catch (p) {
            let u = `cannot decode map value for field ${r.typeName}.${n.name} from JSON: ${x(e)}`;
            throw p instanceof Error && p.message.length > 0 && (u += `: ${p.message}`), new Error(u);
          }
          break;
      }
    }
  } else
    switch (n.oneof && (s = s[n.oneof.localName] = { case: a }, a = "value"), n.kind) {
      case "message":
        const o = n.T;
        if (e === null && o.typeName != "google.protobuf.Value")
          return;
        let m = s[a];
        Y(m) ? m.fromJson(e, t) : (s[a] = m = o.fromJson(e, t), o.fieldWrapper && !n.oneof && (s[a] = o.fieldWrapper.unwrapField(m)));
        break;
      case "enum":
        const l = le(n.T, e, t.ignoreUnknownFields, !1);
        switch (l) {
          case ae:
            je(n, s);
            break;
          case se:
            break;
          default:
            s[a] = l;
            break;
        }
        break;
      case "scalar":
        try {
          const g = X(n.T, e, n.L, !1);
          switch (g) {
            case ae:
              je(n, s);
              break;
            default:
              s[a] = g;
              break;
          }
        } catch (g) {
          let d = `cannot decode field ${r.typeName}.${n.name} from JSON: ${x(e)}`;
          throw g instanceof Error && g.message.length > 0 && (d += `: ${g.message}`), new Error(d);
        }
        break;
    }
}
function ls(s, e) {
  if (s === i.BOOL)
    switch (e) {
      case "true":
        e = !0;
        break;
      case "false":
        e = !1;
        break;
    }
  return X(s, e, P.BIGINT, !0).toString();
}
function X(s, e, n, t) {
  if (e === null)
    return t ? G(s, n) : ae;
  switch (s) {
    case i.DOUBLE:
    case i.FLOAT:
      if (e === "NaN")
        return Number.NaN;
      if (e === "Infinity")
        return Number.POSITIVE_INFINITY;
      if (e === "-Infinity")
        return Number.NEGATIVE_INFINITY;
      if (e === "" || typeof e == "string" && e.trim().length !== e.length || typeof e != "string" && typeof e != "number")
        break;
      const r = Number(e);
      if (Number.isNaN(r) || !Number.isFinite(r))
        break;
      return s == i.FLOAT && Qe(r), r;
    case i.INT32:
    case i.FIXED32:
    case i.SFIXED32:
    case i.SINT32:
    case i.UINT32:
      let a;
      if (typeof e == "number" ? a = e : typeof e == "string" && e.length > 0 && e.trim().length === e.length && (a = Number(e)), a === void 0)
        break;
      return s == i.UINT32 || s == i.FIXED32 ? ge(a) : ee(a), a;
    case i.INT64:
    case i.SFIXED64:
    case i.SINT64:
      if (typeof e != "number" && typeof e != "string")
        break;
      const o = w.parse(e);
      return n ? o.toString() : o;
    case i.FIXED64:
    case i.UINT64:
      if (typeof e != "number" && typeof e != "string")
        break;
      const m = w.uParse(e);
      return n ? m.toString() : m;
    case i.BOOL:
      if (typeof e != "boolean")
        break;
      return e;
    case i.STRING:
      if (typeof e != "string")
        break;
      try {
        encodeURIComponent(e);
      } catch {
        throw new Error("invalid UTF8");
      }
      return e;
    case i.BYTES:
      if (e === "")
        return new Uint8Array(0);
      if (typeof e != "string")
        break;
      return $e.dec(e);
  }
  throw new Error();
}
function le(s, e, n, t) {
  if (e === null)
    return s.typeName == "google.protobuf.NullValue" ? 0 : t ? s.values[0].no : ae;
  switch (typeof e) {
    case "number":
      if (Number.isInteger(e))
        return e;
      break;
    case "string":
      const r = s.findName(e);
      if (r !== void 0)
        return r.no;
      if (n)
        return se;
      break;
  }
  throw new Error(`cannot decode enum ${s.typeName} from JSON: ${x(e)}`);
}
function hs(s) {
  return s.repeated || s.kind == "map" ? !0 : !(s.oneof || s.kind == "message" || s.opt || s.req);
}
function Se(s, e, n) {
  if (s.kind == "map") {
    f(typeof e == "object" && e != null);
    const t = {}, r = Object.entries(e);
    switch (s.V.kind) {
      case "scalar":
        for (const [o, m] of r)
          t[o.toString()] = te(s.V.T, m);
        break;
      case "message":
        for (const [o, m] of r)
          t[o.toString()] = m.toJson(n);
        break;
      case "enum":
        const a = s.V.T;
        for (const [o, m] of r)
          t[o.toString()] = he(a, m, n.enumAsInteger);
        break;
    }
    return n.emitDefaultValues || r.length > 0 ? t : void 0;
  }
  if (s.repeated) {
    f(Array.isArray(e));
    const t = [];
    switch (s.kind) {
      case "scalar":
        for (let r = 0; r < e.length; r++)
          t.push(te(s.T, e[r]));
        break;
      case "enum":
        for (let r = 0; r < e.length; r++)
          t.push(he(s.T, e[r], n.enumAsInteger));
        break;
      case "message":
        for (let r = 0; r < e.length; r++)
          t.push(e[r].toJson(n));
        break;
    }
    return n.emitDefaultValues || t.length > 0 ? t : void 0;
  }
  switch (s.kind) {
    case "scalar":
      return te(s.T, e);
    case "enum":
      return he(s.T, e, n.enumAsInteger);
    case "message":
      return tn(s.T, e).toJson(n);
  }
}
function he(s, e, n) {
  var t;
  if (f(typeof e == "number"), s.typeName == "google.protobuf.NullValue")
    return null;
  if (n)
    return e;
  const r = s.findNumber(e);
  return (t = r == null ? void 0 : r.name) !== null && t !== void 0 ? t : e;
}
function te(s, e) {
  switch (s) {
    case i.INT32:
    case i.SFIXED32:
    case i.SINT32:
    case i.FIXED32:
    case i.UINT32:
      return f(typeof e == "number"), e;
    case i.FLOAT:
    case i.DOUBLE:
      return f(typeof e == "number"), Number.isNaN(e) ? "NaN" : e === Number.POSITIVE_INFINITY ? "Infinity" : e === Number.NEGATIVE_INFINITY ? "-Infinity" : e;
    case i.STRING:
      return f(typeof e == "string"), e;
    case i.BOOL:
      return f(typeof e == "boolean"), e;
    case i.UINT64:
    case i.FIXED64:
    case i.INT64:
    case i.SFIXED64:
    case i.SINT64:
      return f(typeof e == "bigint" || typeof e == "string" || typeof e == "number"), e.toString();
    case i.BYTES:
      return f(e instanceof Uint8Array), $e.enc(e);
  }
}
const Q = Symbol("@bufbuild/protobuf/unknown-fields"), Oe = {
  readUnknownFields: !0,
  readerFactory: (s) => new ns(s)
}, He = {
  writeUnknownFields: !0,
  writerFactory: () => new es()
};
function ds(s) {
  return s ? Object.assign(Object.assign({}, Oe), s) : Oe;
}
function gs(s) {
  return s ? Object.assign(Object.assign({}, He), s) : He;
}
function ps() {
  return {
    makeReadOptions: ds,
    makeWriteOptions: gs,
    listUnknownFields(s) {
      var e;
      return (e = s[Q]) !== null && e !== void 0 ? e : [];
    },
    discardUnknownFields(s) {
      delete s[Q];
    },
    writeUnknownFields(s, e) {
      const t = s[Q];
      if (t)
        for (const r of t)
          e.tag(r.no, r.wireType).raw(r.data);
    },
    onUnknownField(s, e, n, t) {
      const r = s;
      Array.isArray(r[Q]) || (r[Q] = []), r[Q].push({ no: e, wireType: n, data: t });
    },
    readMessage(s, e, n, t, r) {
      const a = s.getType(), o = r ? e.len : e.pos + n;
      let m, l;
      for (; e.pos < o && ([m, l] = e.tag(), !(r === !0 && l == y.EndGroup)); ) {
        const g = a.fields.find(m);
        if (!g) {
          const d = e.skip(l, m);
          t.readUnknownFields && this.onUnknownField(s, m, l, d);
          continue;
        }
        Ne(s, e, g, l, t);
      }
      if (r && // eslint-disable-line @typescript-eslint/strict-boolean-expressions
      (l != y.EndGroup || m !== n))
        throw new Error("invalid end group tag");
    },
    readField: Ne,
    writeMessage(s, e, n) {
      const t = s.getType();
      for (const r of t.fields.byNumber()) {
        if (!sn(r, s)) {
          if (r.req)
            throw new Error(`cannot encode field ${t.typeName}.${r.name} to binary: required field not set`);
          continue;
        }
        const a = r.oneof ? s[r.oneof.localName].value : s[r.localName];
        Be(r, a, e, n);
      }
      return n.writeUnknownFields && this.writeUnknownFields(s, e), e;
    },
    writeField(s, e, n, t) {
      e !== void 0 && Be(s, e, n, t);
    }
  };
}
function Ne(s, e, n, t, r) {
  let { repeated: a, localName: o } = n;
  switch (n.oneof && (s = s[n.oneof.localName], s.case != o && delete s.value, s.case = o, o = "value"), n.kind) {
    case "scalar":
    case "enum":
      const m = n.kind == "enum" ? i.INT32 : n.T;
      let l = oe;
      if (n.kind == "scalar" && n.L > 0 && (l = fs), a) {
        let u = s[o];
        if (t == y.LengthDelimited && m != i.STRING && m != i.BYTES) {
          let F = e.uint32() + e.pos;
          for (; e.pos < F; )
            u.push(l(e, m));
        } else
          u.push(l(e, m));
      } else
        s[o] = l(e, m);
      break;
    case "message":
      const g = n.T;
      a ? s[o].push(re(e, new g(), r, n)) : Y(s[o]) ? re(e, s[o], r, n) : (s[o] = re(e, new g(), r, n), g.fieldWrapper && !n.oneof && !n.repeated && (s[o] = g.fieldWrapper.unwrapField(s[o])));
      break;
    case "map":
      let [d, p] = us(n, e, r);
      s[o][d] = p;
      break;
  }
}
function re(s, e, n, t) {
  const r = e.getType().runtime.bin, a = t == null ? void 0 : t.delimited;
  return r.readMessage(
    e,
    s,
    a ? t.no : s.uint32(),
    // eslint-disable-line @typescript-eslint/strict-boolean-expressions
    n,
    a
  ), e;
}
function us(s, e, n) {
  const t = e.uint32(), r = e.pos + t;
  let a, o;
  for (; e.pos < r; ) {
    const [m] = e.tag();
    switch (m) {
      case 1:
        a = oe(e, s.K);
        break;
      case 2:
        switch (s.V.kind) {
          case "scalar":
            o = oe(e, s.V.T);
            break;
          case "enum":
            o = e.int32();
            break;
          case "message":
            o = re(e, new s.V.T(), n, void 0);
            break;
        }
        break;
    }
  }
  if (a === void 0 && (a = G(s.K, P.BIGINT)), typeof a != "string" && typeof a != "number" && (a = a.toString()), o === void 0)
    switch (s.V.kind) {
      case "scalar":
        o = G(s.V.T, P.BIGINT);
        break;
      case "enum":
        o = s.V.T.values[0].no;
        break;
      case "message":
        o = new s.V.T();
        break;
    }
  return [a, o];
}
function fs(s, e) {
  const n = oe(s, e);
  return typeof n == "bigint" ? n.toString() : n;
}
function oe(s, e) {
  switch (e) {
    case i.STRING:
      return s.string();
    case i.BOOL:
      return s.bool();
    case i.DOUBLE:
      return s.double();
    case i.FLOAT:
      return s.float();
    case i.INT32:
      return s.int32();
    case i.INT64:
      return s.int64();
    case i.UINT64:
      return s.uint64();
    case i.FIXED64:
      return s.fixed64();
    case i.BYTES:
      return s.bytes();
    case i.FIXED32:
      return s.fixed32();
    case i.SFIXED32:
      return s.sfixed32();
    case i.SFIXED64:
      return s.sfixed64();
    case i.SINT64:
      return s.sint64();
    case i.UINT32:
      return s.uint32();
    case i.SINT32:
      return s.sint32();
  }
}
function Be(s, e, n, t) {
  f(e !== void 0);
  const r = s.repeated;
  switch (s.kind) {
    case "scalar":
    case "enum":
      let a = s.kind == "enum" ? i.INT32 : s.T;
      if (r)
        if (f(Array.isArray(e)), s.packed)
          bs(n, a, s.no, e);
        else
          for (const o of e)
            Z(n, a, s.no, o);
      else
        Z(n, a, s.no, e);
      break;
    case "message":
      if (r) {
        f(Array.isArray(e));
        for (const o of e)
          Ee(n, t, s, o);
      } else
        Ee(n, t, s, e);
      break;
    case "map":
      f(typeof e == "object" && e != null);
      for (const [o, m] of Object.entries(e))
        ys(n, t, s, o, m);
      break;
  }
}
function ys(s, e, n, t, r) {
  s.tag(n.no, y.LengthDelimited), s.fork();
  let a = t;
  switch (n.K) {
    case i.INT32:
    case i.FIXED32:
    case i.UINT32:
    case i.SFIXED32:
    case i.SINT32:
      a = Number.parseInt(t);
      break;
    case i.BOOL:
      f(t == "true" || t == "false"), a = t == "true";
      break;
  }
  switch (Z(s, n.K, 1, a), n.V.kind) {
    case "scalar":
      Z(s, n.V.T, 2, r);
      break;
    case "enum":
      Z(s, i.INT32, 2, r);
      break;
    case "message":
      f(r !== void 0), s.tag(2, y.LengthDelimited).bytes(r.toBinary(e));
      break;
  }
  s.join();
}
function Ee(s, e, n, t) {
  const r = tn(n.T, t);
  n.delimited ? s.tag(n.no, y.StartGroup).raw(r.toBinary(e)).tag(n.no, y.EndGroup) : s.tag(n.no, y.LengthDelimited).bytes(r.toBinary(e));
}
function Z(s, e, n, t) {
  f(t !== void 0);
  let [r, a] = rn(e);
  s.tag(n, r)[a](t);
}
function bs(s, e, n, t) {
  if (!t.length)
    return;
  s.tag(n, y.LengthDelimited).fork();
  let [, r] = rn(e);
  for (let a = 0; a < t.length; a++)
    s[r](t[a]);
  s.join();
}
function rn(s) {
  let e = y.Varint;
  switch (s) {
    case i.BYTES:
    case i.STRING:
      e = y.LengthDelimited;
      break;
    case i.DOUBLE:
    case i.FIXED64:
    case i.SFIXED64:
      e = y.Bit64;
      break;
    case i.FIXED32:
    case i.SFIXED32:
    case i.FLOAT:
      e = y.Bit32;
      break;
  }
  const n = i[s].toLowerCase();
  return [e, n];
}
function ws() {
  return {
    setEnumType: Je,
    initPartial(s, e) {
      if (s === void 0)
        return;
      const n = e.getType();
      for (const t of n.fields.byMember()) {
        const r = t.localName, a = e, o = s;
        if (o[r] != null)
          switch (t.kind) {
            case "oneof":
              const m = o[r].case;
              if (m === void 0)
                continue;
              const l = t.findField(m);
              let g = o[r].value;
              l && l.kind == "message" && !Y(g, l.T) ? g = new l.T(g) : l && l.kind === "scalar" && l.T === i.BYTES && (g = W(g)), a[r] = { case: m, value: g };
              break;
            case "scalar":
            case "enum":
              let d = o[r];
              t.T === i.BYTES && (d = t.repeated ? d.map(W) : W(d)), a[r] = d;
              break;
            case "map":
              switch (t.V.kind) {
                case "scalar":
                case "enum":
                  if (t.V.T === i.BYTES)
                    for (const [K, F] of Object.entries(o[r]))
                      a[r][K] = W(F);
                  else
                    Object.assign(a[r], o[r]);
                  break;
                case "message":
                  const u = t.V.T;
                  for (const K of Object.keys(o[r])) {
                    let F = o[r][K];
                    u.fieldWrapper || (F = new u(F)), a[r][K] = F;
                  }
                  break;
              }
              break;
            case "message":
              const p = t.T;
              if (t.repeated)
                a[r] = o[r].map((u) => Y(u, p) ? u : new p(u));
              else {
                const u = o[r];
                p.fieldWrapper ? /* We can't use BytesValue.typeName as that will create a circular import */ p.typeName === "google.protobuf.BytesValue" ? a[r] = W(u) : a[r] = u : a[r] = Y(u, p) ? u : new p(u);
              }
              break;
          }
      }
    },
    // TODO use isFieldSet() here to support future field presence
    equals(s, e, n) {
      return e === n ? !0 : !e || !n ? !1 : s.fields.byMember().every((t) => {
        const r = e[t.localName], a = n[t.localName];
        if (t.repeated) {
          if (r.length !== a.length)
            return !1;
          switch (t.kind) {
            case "message":
              return r.every((o, m) => t.T.equals(o, a[m]));
            case "scalar":
              return r.every((o, m) => R(t.T, o, a[m]));
            case "enum":
              return r.every((o, m) => R(i.INT32, o, a[m]));
          }
          throw new Error(`repeated cannot contain ${t.kind}`);
        }
        switch (t.kind) {
          case "message":
            return t.T.equals(r, a);
          case "enum":
            return R(i.INT32, r, a);
          case "scalar":
            return R(t.T, r, a);
          case "oneof":
            if (r.case !== a.case)
              return !1;
            const o = t.findField(r.case);
            if (o === void 0)
              return !0;
            switch (o.kind) {
              case "message":
                return o.T.equals(r.value, a.value);
              case "enum":
                return R(i.INT32, r.value, a.value);
              case "scalar":
                return R(o.T, r.value, a.value);
            }
            throw new Error(`oneof cannot contain ${o.kind}`);
          case "map":
            const m = Object.keys(r).concat(Object.keys(a));
            switch (t.V.kind) {
              case "message":
                const l = t.V.T;
                return m.every((d) => l.equals(r[d], a[d]));
              case "enum":
                return m.every((d) => R(i.INT32, r[d], a[d]));
              case "scalar":
                const g = t.V.T;
                return m.every((d) => R(g, r[d], a[d]));
            }
            break;
        }
      });
    },
    // TODO use isFieldSet() here to support future field presence
    clone(s) {
      const e = s.getType(), n = new e(), t = n;
      for (const r of e.fields.byMember()) {
        const a = s[r.localName];
        let o;
        if (r.repeated)
          o = a.map($);
        else if (r.kind == "map") {
          o = t[r.localName];
          for (const [m, l] of Object.entries(a))
            o[m] = $(l);
        } else r.kind == "oneof" ? o = r.findField(a.case) ? { case: a.case, value: $(a.value) } : { case: void 0 } : o = $(a);
        t[r.localName] = o;
      }
      for (const r of e.runtime.bin.listUnknownFields(s))
        e.runtime.bin.onUnknownField(t, r.no, r.wireType, r.data);
      return n;
    }
  };
}
function $(s) {
  if (s === void 0)
    return s;
  if (Y(s))
    return s.clone();
  if (s instanceof Uint8Array) {
    const e = new Uint8Array(s.byteLength);
    return e.set(s), e;
  }
  return s;
}
function W(s) {
  return s instanceof Uint8Array ? s : new Uint8Array(s);
}
function xs(s, e, n) {
  return {
    syntax: s,
    json: cs(),
    bin: ps(),
    util: Object.assign(Object.assign({}, ws()), {
      newFieldList: e,
      initFields: n
    }),
    makeMessageType(t, r, a) {
      return Wn(this, t, r, a);
    },
    makeEnum: Kn,
    makeEnumType: Ke,
    getEnumType: Jn,
    makeExtension(t, r, a) {
      return ss(this, t, r, a);
    }
  };
}
class vs {
  constructor(e, n) {
    this._fields = e, this._normalizer = n;
  }
  findJsonName(e) {
    if (!this.jsonNames) {
      const n = {};
      for (const t of this.list())
        n[t.jsonName] = n[t.name] = t;
      this.jsonNames = n;
    }
    return this.jsonNames[e];
  }
  find(e) {
    if (!this.numbers) {
      const n = {};
      for (const t of this.list())
        n[t.no] = t;
      this.numbers = n;
    }
    return this.numbers[e];
  }
  list() {
    return this.all || (this.all = this._normalizer(this._fields)), this.all;
  }
  byNumber() {
    return this.numbersAsc || (this.numbersAsc = this.list().concat().sort((e, n) => e.no - n.no)), this.numbersAsc;
  }
  byMember() {
    if (!this.members) {
      this.members = [];
      const e = this.members;
      let n;
      for (const t of this.list())
        t.oneof ? t.oneof !== n && (n = t.oneof, e.push(n)) : e.push(t);
    }
    return this.members;
  }
}
function an(s, e) {
  const n = on(s);
  return e ? n : js(zs(n));
}
function ks(s) {
  return an(s, !1);
}
const qs = on;
function on(s) {
  let e = !1;
  const n = [];
  for (let t = 0; t < s.length; t++) {
    let r = s.charAt(t);
    switch (r) {
      case "_":
        e = !0;
        break;
      case "0":
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
        n.push(r), e = !1;
        break;
      default:
        e && (e = !1, r = r.toUpperCase()), n.push(r);
        break;
    }
  }
  return n.join("");
}
const As = /* @__PURE__ */ new Set([
  // names reserved by JavaScript
  "constructor",
  "toString",
  "toJSON",
  "valueOf"
]), Is = /* @__PURE__ */ new Set([
  // names reserved by the runtime
  "getType",
  "clone",
  "equals",
  "fromBinary",
  "fromJson",
  "fromJsonString",
  "toBinary",
  "toJson",
  "toJsonString",
  // names reserved by the runtime for the future
  "toObject"
]), mn = (s) => `${s}$`, zs = (s) => Is.has(s) ? mn(s) : s, js = (s) => As.has(s) ? mn(s) : s;
class Us {
  constructor(e) {
    this.kind = "oneof", this.repeated = !1, this.packed = !1, this.opt = !1, this.req = !1, this.default = void 0, this.fields = [], this.name = e, this.localName = ks(e);
  }
  addField(e) {
    f(e.oneof === this, `field ${e.name} not one of ${this.name}`), this.fields.push(e);
  }
  findField(e) {
    if (!this._lookup) {
      this._lookup = /* @__PURE__ */ Object.create(null);
      for (let n = 0; n < this.fields.length; n++)
        this._lookup[this.fields[n].localName] = this.fields[n];
    }
    return this._lookup[e];
  }
}
function Cs(s, e) {
  var n, t, r, a, o, m;
  const l = [];
  let g;
  for (const d of typeof s == "function" ? s() : s) {
    const p = d;
    if (p.localName = an(d.name, d.oneof !== void 0), p.jsonName = (n = d.jsonName) !== null && n !== void 0 ? n : qs(d.name), p.repeated = (t = d.repeated) !== null && t !== void 0 ? t : !1, d.kind == "scalar" && (p.L = (r = d.L) !== null && r !== void 0 ? r : P.BIGINT), p.delimited = (a = d.delimited) !== null && a !== void 0 ? a : !1, p.req = (o = d.req) !== null && o !== void 0 ? o : !1, p.opt = (m = d.opt) !== null && m !== void 0 ? m : !1, d.packed === void 0 && (p.packed = d.kind == "enum" || d.kind == "scalar" && d.T != i.BYTES && d.T != i.STRING), d.oneof !== void 0) {
      const u = typeof d.oneof == "string" ? d.oneof : d.oneof.name;
      (!g || g.name != u) && (g = new Us(u)), p.oneof = g, g.addField(p);
    }
    l.push(p);
  }
  return l;
}
const h = xs(
  "proto3",
  (s) => new vs(s, (e) => Cs(e)),
  // TODO merge with proto2 and initExtensionField, also see initPartial, equals, clone
  (s) => {
    for (const e of s.getType().fields.byMember()) {
      if (e.opt)
        continue;
      const n = e.localName, t = s;
      if (e.repeated) {
        t[n] = [];
        continue;
      }
      switch (e.kind) {
        case "oneof":
          t[n] = { case: void 0 };
          break;
        case "enum":
          t[n] = 0;
          break;
        case "map":
          t[n] = {};
          break;
        case "scalar":
          t[n] = G(e.T, e.L);
          break;
      }
    }
  }
);
class v extends b {
  constructor(e) {
    super(), this.typeUrl = "", this.value = new Uint8Array(0), h.util.initPartial(e, this);
  }
  toJson(e) {
    var n;
    if (this.typeUrl === "")
      return {};
    const t = this.typeUrlToName(this.typeUrl), r = (n = e == null ? void 0 : e.typeRegistry) === null || n === void 0 ? void 0 : n.findMessage(t);
    if (!r)
      throw new Error(`cannot encode message google.protobuf.Any to JSON: "${this.typeUrl}" is not in the type registry`);
    let o = r.fromBinary(this.value).toJson(e);
    return (t.startsWith("google.protobuf.") || o === null || Array.isArray(o) || typeof o != "object") && (o = { value: o }), o["@type"] = this.typeUrl, o;
  }
  fromJson(e, n) {
    var t;
    if (e === null || Array.isArray(e) || typeof e != "object")
      throw new Error(`cannot decode message google.protobuf.Any from JSON: expected object but got ${e === null ? "null" : Array.isArray(e) ? "array" : typeof e}`);
    if (Object.keys(e).length == 0)
      return this;
    const r = e["@type"];
    if (typeof r != "string" || r == "")
      throw new Error('cannot decode message google.protobuf.Any from JSON: "@type" is empty');
    const a = this.typeUrlToName(r), o = (t = n == null ? void 0 : n.typeRegistry) === null || t === void 0 ? void 0 : t.findMessage(a);
    if (!o)
      throw new Error(`cannot decode message google.protobuf.Any from JSON: ${r} is not in the type registry`);
    let m;
    if (a.startsWith("google.protobuf.") && Object.prototype.hasOwnProperty.call(e, "value"))
      m = o.fromJson(e.value, n);
    else {
      const l = Object.assign({}, e);
      delete l["@type"], m = o.fromJson(l, n);
    }
    return this.packFrom(m), this;
  }
  packFrom(e) {
    this.value = e.toBinary(), this.typeUrl = this.typeNameToUrl(e.getType().typeName);
  }
  unpackTo(e) {
    return this.is(e.getType()) ? (e.fromBinary(this.value), !0) : !1;
  }
  unpack(e) {
    if (this.typeUrl === "")
      return;
    const n = e.findMessage(this.typeUrlToName(this.typeUrl));
    if (n)
      return n.fromBinary(this.value);
  }
  is(e) {
    if (this.typeUrl === "")
      return !1;
    const n = this.typeUrlToName(this.typeUrl);
    let t = "";
    return typeof e == "string" ? t = e : t = e.typeName, n === t;
  }
  typeNameToUrl(e) {
    return `type.googleapis.com/${e}`;
  }
  typeUrlToName(e) {
    if (!e.length)
      throw new Error(`invalid type url: ${e}`);
    const n = e.lastIndexOf("/"), t = n >= 0 ? e.substring(n + 1) : e;
    if (!t.length)
      throw new Error(`invalid type url: ${e}`);
    return t;
  }
  static pack(e) {
    const n = new v();
    return n.packFrom(e), n;
  }
  static fromBinary(e, n) {
    return new v().fromBinary(e, n);
  }
  static fromJson(e, n) {
    return new v().fromJson(e, n);
  }
  static fromJsonString(e, n) {
    return new v().fromJsonString(e, n);
  }
  static equals(e, n) {
    return h.util.equals(v, e, n);
  }
}
v.runtime = h;
v.typeName = "google.protobuf.Any";
v.fields = h.util.newFieldList(() => [
  {
    no: 1,
    name: "type_url",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 2,
    name: "value",
    kind: "scalar",
    T: 12
    /* ScalarType.BYTES */
  }
]);
const k = class k extends b {
  constructor(n) {
    super();
    /**
     * @generated from field: uint64 lo = 1;
     */
    c(this, "lo", w.zero);
    /**
     * @generated from field: uint64 hi = 2;
     */
    c(this, "hi", w.zero);
    h.util.initPartial(n, this);
  }
  static fromBinary(n, t) {
    return new k().fromBinary(n, t);
  }
  static fromJson(n, t) {
    return new k().fromJson(n, t);
  }
  static fromJsonString(n, t) {
    return new k().fromJsonString(n, t);
  }
  static equals(n, t) {
    return h.util.equals(k, n, t);
  }
};
c(k, "runtime", h), c(k, "typeName", "penumbra.core.num.v1.Amount"), c(k, "fields", h.util.newFieldList(() => [
  {
    no: 1,
    name: "lo",
    kind: "scalar",
    T: 4
    /* ScalarType.UINT64 */
  },
  {
    no: 2,
    name: "hi",
    kind: "scalar",
    T: 4
    /* ScalarType.UINT64 */
  }
]));
let J = k;
const q = class q extends b {
  constructor(n) {
    super();
    /**
     * @generated from field: bytes inner = 1;
     */
    c(this, "inner", new Uint8Array(0));
    h.util.initPartial(n, this);
  }
  static fromBinary(n, t) {
    return new q().fromBinary(n, t);
  }
  static fromJson(n, t) {
    return new q().fromJson(n, t);
  }
  static fromJsonString(n, t) {
    return new q().fromJsonString(n, t);
  }
  static equals(n, t) {
    return h.util.equals(q, n, t);
  }
};
c(q, "runtime", h), c(q, "typeName", "penumbra.core.asset.v1.BalanceCommitment"), c(q, "fields", h.util.newFieldList(() => [
  {
    no: 1,
    name: "inner",
    kind: "scalar",
    T: 12
    /* ScalarType.BYTES */
  }
]));
let De = q;
const A = class A extends b {
  constructor(n) {
    super();
    /**
     * The bytes of the asset ID.
     *
     * @generated from field: bytes inner = 1;
     */
    c(this, "inner", new Uint8Array(0));
    /**
     * Alternatively, a Bech32m-encoded string representation of the `inner`
     * bytes.
     *
     * NOTE: implementations are not required to support parsing this field.
     * Implementations should prefer to encode the `inner` bytes in all messages they
     * produce. Implementations must not accept messages with both `inner` and
     * `alt_bech32m` set.  This field exists for convenience of RPC users.
     *
     * @generated from field: string alt_bech32m = 2;
     */
    c(this, "altBech32m", "");
    /**
     * Alternatively, a base denomination string which should be hashed to obtain the asset ID.
     *
     * NOTE: implementations are not required to support parsing this field.
     * Implementations should prefer to encode the bytes in all messages they
     * produce. Implementations must not accept messages with both `inner` and
     * `alt_base_denom` set.  This field exists for convenience of RPC users.
     *
     * @generated from field: string alt_base_denom = 3;
     */
    c(this, "altBaseDenom", "");
    h.util.initPartial(n, this);
  }
  static fromBinary(n, t) {
    return new A().fromBinary(n, t);
  }
  static fromJson(n, t) {
    return new A().fromJson(n, t);
  }
  static fromJsonString(n, t) {
    return new A().fromJsonString(n, t);
  }
  static equals(n, t) {
    return h.util.equals(A, n, t);
  }
};
c(A, "runtime", h), c(A, "typeName", "penumbra.core.asset.v1.AssetId"), c(A, "fields", h.util.newFieldList(() => [
  {
    no: 1,
    name: "inner",
    kind: "scalar",
    T: 12
    /* ScalarType.BYTES */
  },
  {
    no: 2,
    name: "alt_bech32m",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 3,
    name: "alt_base_denom",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]));
let L = A;
const I = class I extends b {
  constructor(n) {
    super();
    /**
     * @generated from field: string denom = 1;
     */
    c(this, "denom", "");
    h.util.initPartial(n, this);
  }
  static fromBinary(n, t) {
    return new I().fromBinary(n, t);
  }
  static fromJson(n, t) {
    return new I().fromJson(n, t);
  }
  static fromJsonString(n, t) {
    return new I().fromJsonString(n, t);
  }
  static equals(n, t) {
    return h.util.equals(I, n, t);
  }
};
c(I, "runtime", h), c(I, "typeName", "penumbra.core.asset.v1.Denom"), c(I, "fields", h.util.newFieldList(() => [
  {
    no: 1,
    name: "denom",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]));
let pe = I;
const z = class z extends b {
  constructor(n) {
    super();
    /**
     * @generated from field: string description = 1;
     */
    c(this, "description", "");
    /**
     * denom_units represents the list of DenomUnit's for a given coin
     *
     * @generated from field: repeated penumbra.core.asset.v1.DenomUnit denom_units = 2;
     */
    c(this, "denomUnits", []);
    /**
     * base represents the base denom (should be the DenomUnit with exponent = 0).
     *
     * @generated from field: string base = 3;
     */
    c(this, "base", "");
    /**
     * display indicates the suggested denom that should be
     * displayed in clients.
     *
     * @generated from field: string display = 4;
     */
    c(this, "display", "");
    /**
     * name defines the name of the token (eg: Cosmos Atom)
     *
     * @generated from field: string name = 5;
     */
    c(this, "name", "");
    /**
     * symbol is the token symbol usually shown on exchanges (eg: ATOM). This can
     * be the same as the display.
     *
     * @generated from field: string symbol = 6;
     */
    c(this, "symbol", "");
    /**
     * the asset ID on Penumbra for this denomination.
     *
     * @generated from field: penumbra.core.asset.v1.AssetId penumbra_asset_id = 1984;
     */
    c(this, "penumbraAssetId");
    /**
     * @generated from field: repeated penumbra.core.asset.v1.AssetImage images = 1985;
     */
    c(this, "images", []);
    /**
     * An optional "score" used to prioritize token lists.
     *
     * This is solely for use in client-side registries.
     *
     * @generated from field: uint64 priority_score = 1986;
     */
    c(this, "priorityScore", w.zero);
    /**
     * Associated icons for asset.
     * For ibc assets, usually an image of the source chain.
     *
     * @generated from field: repeated penumbra.core.asset.v1.AssetImage badges = 1987;
     */
    c(this, "badges", []);
    /**
     * Coingecko ID for the asset.
     *
     * @generated from field: string coingecko_id = 1988;
     */
    c(this, "coingeckoId", "");
    h.util.initPartial(n, this);
  }
  static fromBinary(n, t) {
    return new z().fromBinary(n, t);
  }
  static fromJson(n, t) {
    return new z().fromJson(n, t);
  }
  static fromJsonString(n, t) {
    return new z().fromJsonString(n, t);
  }
  static equals(n, t) {
    return h.util.equals(z, n, t);
  }
};
c(z, "runtime", h), c(z, "typeName", "penumbra.core.asset.v1.Metadata"), c(z, "fields", h.util.newFieldList(() => [
  {
    no: 1,
    name: "description",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  { no: 2, name: "denom_units", kind: "message", T: ue, repeated: !0 },
  {
    no: 3,
    name: "base",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 4,
    name: "display",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 5,
    name: "name",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 6,
    name: "symbol",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  { no: 1984, name: "penumbra_asset_id", kind: "message", T: L },
  { no: 1985, name: "images", kind: "message", T: me, repeated: !0 },
  {
    no: 1986,
    name: "priority_score",
    kind: "scalar",
    T: 4
    /* ScalarType.UINT64 */
  },
  { no: 1987, name: "badges", kind: "message", T: me, repeated: !0 },
  {
    no: 1988,
    name: "coingecko_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]));
let _ = z;
const j = class j extends b {
  constructor(n) {
    super();
    /**
     * denom represents the string name of the given denom unit (e.g uatom).
     *
     * @generated from field: string denom = 1;
     */
    c(this, "denom", "");
    /**
     * exponent represents power of 10 exponent that one must
     * raise the base_denom to in order to equal the given DenomUnit's denom
     * 1 denom = 10^exponent base_denom
     * (e.g. with a base_denom of uatom, one can create a DenomUnit of 'atom' with
     * exponent = 6, thus: 1 atom = 10^6 uatom).
     *
     * @generated from field: uint32 exponent = 2;
     */
    c(this, "exponent", 0);
    /**
     * aliases is a list of string aliases for the given denom
     *
     * @generated from field: repeated string aliases = 3;
     */
    c(this, "aliases", []);
    h.util.initPartial(n, this);
  }
  static fromBinary(n, t) {
    return new j().fromBinary(n, t);
  }
  static fromJson(n, t) {
    return new j().fromJson(n, t);
  }
  static fromJsonString(n, t) {
    return new j().fromJsonString(n, t);
  }
  static equals(n, t) {
    return h.util.equals(j, n, t);
  }
};
c(j, "runtime", h), c(j, "typeName", "penumbra.core.asset.v1.DenomUnit"), c(j, "fields", h.util.newFieldList(() => [
  {
    no: 1,
    name: "denom",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 2,
    name: "exponent",
    kind: "scalar",
    T: 13
    /* ScalarType.UINT32 */
  },
  { no: 3, name: "aliases", kind: "scalar", T: 9, repeated: !0 }
]));
let ue = j;
const U = class U extends b {
  constructor(n) {
    super();
    /**
     * @generated from field: penumbra.core.num.v1.Amount amount = 1;
     */
    c(this, "amount");
    /**
     * @generated from field: penumbra.core.asset.v1.AssetId asset_id = 2;
     */
    c(this, "assetId");
    h.util.initPartial(n, this);
  }
  static fromBinary(n, t) {
    return new U().fromBinary(n, t);
  }
  static fromJson(n, t) {
    return new U().fromJson(n, t);
  }
  static fromJsonString(n, t) {
    return new U().fromJsonString(n, t);
  }
  static equals(n, t) {
    return h.util.equals(U, n, t);
  }
};
c(U, "runtime", h), c(U, "typeName", "penumbra.core.asset.v1.Value"), c(U, "fields", h.util.newFieldList(() => [
  { no: 1, name: "amount", kind: "message", T: J },
  { no: 2, name: "asset_id", kind: "message", T: L }
]));
let fe = U;
const C = class C extends b {
  constructor(n) {
    super();
    /**
     * Represents the vector of 'Value's in the balance.
     *
     * @generated from field: repeated penumbra.core.asset.v1.Balance.SignedValue values = 1;
     */
    c(this, "values", []);
    h.util.initPartial(n, this);
  }
  static fromBinary(n, t) {
    return new C().fromBinary(n, t);
  }
  static fromJson(n, t) {
    return new C().fromJson(n, t);
  }
  static fromJsonString(n, t) {
    return new C().fromJsonString(n, t);
  }
  static equals(n, t) {
    return h.util.equals(C, n, t);
  }
};
c(C, "runtime", h), c(C, "typeName", "penumbra.core.asset.v1.Balance"), c(C, "fields", h.util.newFieldList(() => [
  { no: 1, name: "values", kind: "message", T: ye, repeated: !0 }
]));
let Me = C;
const T = class T extends b {
  constructor(n) {
    super();
    /**
     * @generated from field: penumbra.core.asset.v1.Value value = 1;
     */
    c(this, "value");
    /**
     * @generated from field: bool negated = 2;
     */
    c(this, "negated", !1);
    h.util.initPartial(n, this);
  }
  static fromBinary(n, t) {
    return new T().fromBinary(n, t);
  }
  static fromJson(n, t) {
    return new T().fromJson(n, t);
  }
  static fromJsonString(n, t) {
    return new T().fromJsonString(n, t);
  }
  static equals(n, t) {
    return h.util.equals(T, n, t);
  }
};
c(T, "runtime", h), c(T, "typeName", "penumbra.core.asset.v1.Balance.SignedValue"), c(T, "fields", h.util.newFieldList(() => [
  { no: 1, name: "value", kind: "message", T: fe },
  {
    no: 2,
    name: "negated",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  }
]));
let ye = T;
const S = class S extends b {
  constructor(n) {
    super();
    /**
     * @generated from oneof penumbra.core.asset.v1.ValueView.value_view
     */
    c(this, "valueView", { case: void 0 });
    h.util.initPartial(n, this);
  }
  static fromBinary(n, t) {
    return new S().fromBinary(n, t);
  }
  static fromJson(n, t) {
    return new S().fromJson(n, t);
  }
  static fromJsonString(n, t) {
    return new S().fromJsonString(n, t);
  }
  static equals(n, t) {
    return h.util.equals(S, n, t);
  }
};
c(S, "runtime", h), c(S, "typeName", "penumbra.core.asset.v1.ValueView"), c(S, "fields", h.util.newFieldList(() => [
  { no: 1, name: "known_asset_id", kind: "message", T: be, oneof: "value_view" },
  { no: 2, name: "unknown_asset_id", kind: "message", T: we, oneof: "value_view" }
]));
let Le = S;
const O = class O extends b {
  constructor(n) {
    super();
    /**
     * The amount of the value.
     *
     * @generated from field: penumbra.core.num.v1.Amount amount = 1;
     */
    c(this, "amount");
    /**
     * The asset metadata describing the asset of the value.
     *
     * @generated from field: penumbra.core.asset.v1.Metadata metadata = 2;
     */
    c(this, "metadata");
    /**
     * Optionally, a list of equivalent values in other numeraires.
     *
     * @generated from field: repeated penumbra.core.asset.v1.EquivalentValue equivalent_values = 3;
     */
    c(this, "equivalentValues", []);
    /**
     * Optionally, extended, dynamically-typed metadata about the object this
     * token represents.
     *
     * This is left flexible to allow future extensions. For instance, a view
     * server could augment an LPNFT with a message describing the current state
     * of the position and its reserves, allowing a frontend to render LPNFTs
     * with their position information (trading pair, etc). However, because
     * this is in an extension, a frontend that does not have special handling
     * logic would fall back on the ordinary asset metadata.
     *
     * @generated from field: google.protobuf.Any extended_metadata = 4;
     */
    c(this, "extendedMetadata");
    h.util.initPartial(n, this);
  }
  static fromBinary(n, t) {
    return new O().fromBinary(n, t);
  }
  static fromJson(n, t) {
    return new O().fromJson(n, t);
  }
  static fromJsonString(n, t) {
    return new O().fromJsonString(n, t);
  }
  static equals(n, t) {
    return h.util.equals(O, n, t);
  }
};
c(O, "runtime", h), c(O, "typeName", "penumbra.core.asset.v1.ValueView.KnownAssetId"), c(O, "fields", h.util.newFieldList(() => [
  { no: 1, name: "amount", kind: "message", T: J },
  { no: 2, name: "metadata", kind: "message", T: _ },
  { no: 3, name: "equivalent_values", kind: "message", T: ve, repeated: !0 },
  { no: 4, name: "extended_metadata", kind: "message", T: v }
]));
let be = O;
const H = class H extends b {
  constructor(n) {
    super();
    /**
     * @generated from field: penumbra.core.num.v1.Amount amount = 1;
     */
    c(this, "amount");
    /**
     * @generated from field: penumbra.core.asset.v1.AssetId asset_id = 2;
     */
    c(this, "assetId");
    h.util.initPartial(n, this);
  }
  static fromBinary(n, t) {
    return new H().fromBinary(n, t);
  }
  static fromJson(n, t) {
    return new H().fromJson(n, t);
  }
  static fromJsonString(n, t) {
    return new H().fromJsonString(n, t);
  }
  static equals(n, t) {
    return h.util.equals(H, n, t);
  }
};
c(H, "runtime", h), c(H, "typeName", "penumbra.core.asset.v1.ValueView.UnknownAssetId"), c(H, "fields", h.util.newFieldList(() => [
  { no: 1, name: "amount", kind: "message", T: J },
  { no: 2, name: "asset_id", kind: "message", T: L }
]));
let we = H;
const N = class N extends b {
  constructor(n) {
    super();
    /**
     * The URI of the image in PNG format.
     *
     * @generated from field: string png = 1;
     */
    c(this, "png", "");
    /**
     * The URI of the image in SVG format.
     *
     * @generated from field: string svg = 2;
     */
    c(this, "svg", "");
    /**
     * @generated from field: penumbra.core.asset.v1.AssetImage.Theme theme = 3;
     */
    c(this, "theme");
    h.util.initPartial(n, this);
  }
  static fromBinary(n, t) {
    return new N().fromBinary(n, t);
  }
  static fromJson(n, t) {
    return new N().fromJson(n, t);
  }
  static fromJsonString(n, t) {
    return new N().fromJsonString(n, t);
  }
  static equals(n, t) {
    return h.util.equals(N, n, t);
  }
};
c(N, "runtime", h), c(N, "typeName", "penumbra.core.asset.v1.AssetImage"), c(N, "fields", h.util.newFieldList(() => [
  {
    no: 1,
    name: "png",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 2,
    name: "svg",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  { no: 3, name: "theme", kind: "message", T: xe }
]));
let me = N;
const B = class B extends b {
  constructor(n) {
    super();
    /**
     * Should be in hex format, `^#[0-9a-fA-F]{6}$`.
     *
     * @generated from field: string primary_color_hex = 1;
     */
    c(this, "primaryColorHex", "");
    /**
     * @generated from field: bool circle = 2;
     */
    c(this, "circle", !1);
    /**
     * @generated from field: bool dark_mode = 3;
     */
    c(this, "darkMode", !1);
    h.util.initPartial(n, this);
  }
  static fromBinary(n, t) {
    return new B().fromBinary(n, t);
  }
  static fromJson(n, t) {
    return new B().fromJson(n, t);
  }
  static fromJsonString(n, t) {
    return new B().fromJsonString(n, t);
  }
  static equals(n, t) {
    return h.util.equals(B, n, t);
  }
};
c(B, "runtime", h), c(B, "typeName", "penumbra.core.asset.v1.AssetImage.Theme"), c(B, "fields", h.util.newFieldList(() => [
  {
    no: 1,
    name: "primary_color_hex",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 2,
    name: "circle",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  },
  {
    no: 3,
    name: "dark_mode",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  }
]));
let xe = B;
const E = class E extends b {
  constructor(n) {
    super();
    /**
     * @generated from field: penumbra.core.asset.v1.AssetId priced_asset = 1;
     */
    c(this, "pricedAsset");
    /**
     * @generated from field: penumbra.core.asset.v1.AssetId numeraire = 2;
     */
    c(this, "numeraire");
    /**
     * Multiply units of the priced asset by this value to get the value in the numeraire.
     *
     * This is a floating-point number since the price is approximate.
     *
     * @generated from field: double numeraire_per_unit = 3;
     */
    c(this, "numerairePerUnit", 0);
    /**
     * If set, gives some idea of when the price was estimated.
     *
     * @generated from field: uint64 as_of_height = 4;
     */
    c(this, "asOfHeight", w.zero);
    h.util.initPartial(n, this);
  }
  static fromBinary(n, t) {
    return new E().fromBinary(n, t);
  }
  static fromJson(n, t) {
    return new E().fromJson(n, t);
  }
  static fromJsonString(n, t) {
    return new E().fromJsonString(n, t);
  }
  static equals(n, t) {
    return h.util.equals(E, n, t);
  }
};
c(E, "runtime", h), c(E, "typeName", "penumbra.core.asset.v1.EstimatedPrice"), c(E, "fields", h.util.newFieldList(() => [
  { no: 1, name: "priced_asset", kind: "message", T: L },
  { no: 2, name: "numeraire", kind: "message", T: L },
  {
    no: 3,
    name: "numeraire_per_unit",
    kind: "scalar",
    T: 1
    /* ScalarType.DOUBLE */
  },
  {
    no: 4,
    name: "as_of_height",
    kind: "scalar",
    T: 4
    /* ScalarType.UINT64 */
  }
]));
let Re = E;
const D = class D extends b {
  constructor(n) {
    super();
    /**
     * The equivalent amount of the parent Value in terms of the numeraire.
     *
     * @generated from field: penumbra.core.num.v1.Amount equivalent_amount = 1;
     */
    c(this, "equivalentAmount");
    /**
     * Metadata describing the numeraire.
     *
     * @generated from field: penumbra.core.asset.v1.Metadata numeraire = 2;
     */
    c(this, "numeraire");
    /**
     * If set, gives some idea of when the price/equivalence was estimated.
     *
     * @generated from field: uint64 as_of_height = 3;
     */
    c(this, "asOfHeight", w.zero);
    h.util.initPartial(n, this);
  }
  static fromBinary(n, t) {
    return new D().fromBinary(n, t);
  }
  static fromJson(n, t) {
    return new D().fromJson(n, t);
  }
  static fromJsonString(n, t) {
    return new D().fromJsonString(n, t);
  }
  static equals(n, t) {
    return h.util.equals(D, n, t);
  }
};
c(D, "runtime", h), c(D, "typeName", "penumbra.core.asset.v1.EquivalentValue"), c(D, "fields", h.util.newFieldList(() => [
  { no: 1, name: "equivalent_amount", kind: "message", T: J },
  { no: 2, name: "numeraire", kind: "message", T: _ },
  {
    no: 3,
    name: "as_of_height",
    kind: "scalar",
    T: 4
    /* ScalarType.UINT64 */
  }
]));
let ve = D;
const Pe = (s) => {
  const e = String.fromCodePoint(...s);
  return btoa(e);
}, Ts = (s) => {
  if (!/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(s))
    throw new Error("Input string is not a valid Base64 encoded string");
  const n = atob(s);
  return Uint8Array.from(n, (t) => t.codePointAt(0));
}, Ss = (s) => s.toString(16).padStart(2, "0"), Os = async (s) => {
  const e = await crypto.subtle.digest("SHA-256", s);
  return new Uint8Array(e);
}, cn = async (s) => {
  const n = new TextEncoder().encode(s), t = await Os(n);
  return Array.from(t).map(Ss).join("");
}, de = (s) => (s == null ? void 0 : s.getType().typeName) === pe.typeName;
class ke {
  constructor(e) {
    c(this, "chainId");
    c(this, "ibcConnections");
    c(this, "numeraires");
    c(this, "assetById", {});
    c(this, "assetByDenom", {});
    this.chainId = e.chainId, this.ibcConnections = e.ibcConnections, this.numeraires = e.numeraires.map((n) => new L({ inner: Ts(n) })), Object.entries(e.assetById).forEach(([n, t]) => {
      const r = _.fromJson(t, {
        ignoreUnknownFields: !0
      });
      this.assetById[n] = r, this.assetByDenom[r.base] = r;
    });
  }
  _resolveMetadata(e, n) {
    const t = de(e) ? this.assetByDenom[e.denom] : this.assetById[Pe(e.inner)];
    if (!t && n) {
      const r = de(e) ? e.denom : Pe(e.inner), a = de(e) ? "denom" : "asset id";
      throw new Error(`No metadata in registry for ${a}: ${r}`);
    }
    return t;
  }
  // Throws an error if not in registry
  getMetadata(e) {
    return this._resolveMetadata(e, !0);
  }
  // Returns undefined if not in registry
  tryGetMetadata(e) {
    return this._resolveMetadata(e, !1);
  }
  getAllAssets() {
    return Object.values(this.assetById);
  }
  async version() {
    return cn(JSON.stringify(this));
  }
}
const ln = "penumbra-testnet-deimos-8-x6de97e39", hn = [
  {
    addressPrefix: "osmo",
    chainId: "osmo-test-5",
    channelId: "channel-0",
    counterpartyChannelId: "channel-8568",
    displayName: "Osmosis",
    images: [
      {
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/f1348793beb994c6cc0256ed7ebdb48c7aa70003/osmosis/images/osmo.svg"
      }
    ]
  },
  {
    addressPrefix: "noble",
    chainId: "grand-1",
    channelId: "channel-1",
    counterpartyChannelId: "channel-199",
    displayName: "Noble",
    images: [
      {
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/2ca39d0e4eaf3431cca13991948e099801f02e46/noble/images/stake.svg"
      }
    ]
  }
], dn = {
  "6KBVsPINa8gWSHhfH+kAFJC4afEJA3EtuB2HyCqJUws=": {
    denomUnits: [
      {
        denom: "cube"
      }
    ],
    base: "cube",
    display: "cube",
    symbol: "CUBE",
    penumbraAssetId: {
      inner: "6KBVsPINa8gWSHhfH+kAFJC4afEJA3EtuB2HyCqJUws="
    }
  },
  "HLkKbVfA72oQaMdYFroWQ1qoSyl/KLHZiOMJhL2y9w0=": {
    denomUnits: [
      {
        denom: "test_eth",
        exponent: 18
      },
      {
        denom: "wtest_eth"
      }
    ],
    base: "wtest_eth",
    display: "test_eth",
    symbol: "TestETH",
    penumbraAssetId: {
      inner: "HLkKbVfA72oQaMdYFroWQ1qoSyl/KLHZiOMJhL2y9w0="
    }
  },
  "HW2Eq3UZVSBttoUwUi/MUtE7rr2UU7/UH500byp7OAc=": {
    denomUnits: [
      {
        denom: "gm",
        exponent: 6
      },
      {
        denom: "mgm",
        exponent: 3
      },
      {
        denom: "ugm"
      }
    ],
    base: "ugm",
    display: "gm",
    symbol: "GM",
    penumbraAssetId: {
      inner: "HW2Eq3UZVSBttoUwUi/MUtE7rr2UU7/UH500byp7OAc="
    },
    images: [
      {
        svg: "https://raw.githubusercontent.com/penumbrafi/registry/main/images/full-moon-face.svg",
        theme: {
          primaryColorHex: "#ac9454"
        }
      }
    ]
  },
  "J0fi/vGPSy8XmGGzU+rtpPxHirechCzuPf23cnZ5FgA=": {
    description: "USD Coin",
    denomUnits: [
      {
        denom: "transfer/channel-1/uusdc"
      },
      {
        denom: "transfer/channel-1/usdc",
        exponent: 6
      }
    ],
    base: "transfer/channel-1/uusdc",
    display: "transfer/channel-1/usdc",
    name: "USD Coin",
    symbol: "USDC.n",
    penumbraAssetId: {
      inner: "J0fi/vGPSy8XmGGzU+rtpPxHirechCzuPf23cnZ5FgA="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/ethereum/images/usdc.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/ethereum/images/usdc.svg",
        theme: {
          primaryColorHex: "#2474cb"
        }
      }
    ],
    coingeckoId: "usd-coin"
  },
  "KX8cjRGFpZUkZCwCtUX8Pi2lEyO5g0oPVr8WhsLgkwg=": {
    denomUnits: [
      {
        denom: "transfer/channel-0/uion"
      },
      {
        denom: "transfer/channel-0/ion",
        exponent: 6
      }
    ],
    base: "transfer/channel-0/uion",
    display: "transfer/channel-0/ion",
    name: "Ion",
    symbol: "ION",
    penumbraAssetId: {
      inner: "KX8cjRGFpZUkZCwCtUX8Pi2lEyO5g0oPVr8WhsLgkwg="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/ion.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/ion.svg",
        theme: {
          primaryColorHex: "#90cfde"
        }
      }
    ],
    coingeckoId: "ion"
  },
  "KeqcLzNx9qSH5+lcJHBB9KNW+YPrBk5dKzvPMiypahA=": {
    description: "The native token of Penumbra",
    denomUnits: [
      {
        denom: "penumbra",
        exponent: 6
      },
      {
        denom: "mpenumbra",
        exponent: 3
      },
      {
        denom: "upenumbra"
      }
    ],
    base: "upenumbra",
    display: "penumbra",
    name: "Penumbra",
    symbol: "UM",
    penumbraAssetId: {
      inner: "KeqcLzNx9qSH5+lcJHBB9KNW+YPrBk5dKzvPMiypahA="
    },
    images: [
      {
        svg: "https://raw.githubusercontent.com/penumbrafi/registry/main/images/um.svg",
        theme: {
          primaryColorHex: "#c9a975"
        }
      }
    ]
  },
  "VvnzHX2uGYbOLAf4etff37yf1EQAS/8RzdAS63FZuwI=": {
    description: "Love is a test tokenfactory asset controlled by the Strangelove Team",
    denomUnits: [
      {
        denom: "transfer/channel-1/ulove"
      },
      {
        denom: "transfer/channel-1/love",
        exponent: 6
      }
    ],
    base: "transfer/channel-1/ulove",
    display: "transfer/channel-1/love",
    name: "Love",
    symbol: "LOVE",
    penumbraAssetId: {
      inner: "VvnzHX2uGYbOLAf4etff37yf1EQAS/8RzdAS63FZuwI="
    }
  },
  "Y3SIJktGY/trlNV/VRPhMVyBA4RyXmubxjzs0BGsPQ0=": {
    denomUnits: [
      {
        denom: "udelegation_penumbravalid1d3c0v5phydt7vdakajzxpw0mev7jcgurk7eeuw6z4cqqks2wxyrqu72gau"
      },
      {
        denom: "mdelegation_penumbravalid1d3c0v5phydt7vdakajzxpw0mev7jcgurk7eeuw6z4cqqks2wxyrqu72gau",
        exponent: 3
      },
      {
        denom: "delegation_penumbravalid1d3c0v5phydt7vdakajzxpw0mev7jcgurk7eeuw6z4cqqks2wxyrqu72gau",
        exponent: 6
      }
    ],
    base: "udelegation_penumbravalid1d3c0v5phydt7vdakajzxpw0mev7jcgurk7eeuw6z4cqqks2wxyrqu72gau",
    display: "delegation_penumbravalid1d3c0v5phydt7vdakajzxpw0mev7jcgurk7eeuw6z4cqqks2wxyrqu72gau",
    symbol: "delUM(Penumbra Labs CI 1)",
    penumbraAssetId: {
      inner: "Y3SIJktGY/trlNV/VRPhMVyBA4RyXmubxjzs0BGsPQ0="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/penumbrafi/registry/main/images/penumbra-favicon.png",
        theme: {
          primaryColorHex: "#1d1e1d"
        }
      }
    ]
  },
  "g128RUoEK9S9qg/E26hO/HqfS1x+alzMmC1TN7e9fgk=": {
    description: "The controlled staking asset for Noble Chain",
    denomUnits: [
      {
        denom: "transfer/channel-1/ustake"
      },
      {
        denom: "transfer/channel-1/stake",
        exponent: 6
      }
    ],
    base: "transfer/channel-1/ustake",
    display: "transfer/channel-1/stake",
    name: "Stake",
    symbol: "STAKE",
    penumbraAssetId: {
      inner: "g128RUoEK9S9qg/E26hO/HqfS1x+alzMmC1TN7e9fgk="
    }
  },
  "j0fAr5g+SxQguIafcYD1ifc+q9jE2m2dZ+u6YrsPdAU=": {
    description: "Ondo US Dollar Yield",
    denomUnits: [
      {
        denom: "transfer/channel-1/ausdy"
      },
      {
        denom: "transfer/channel-1/usdy",
        exponent: 18
      }
    ],
    base: "transfer/channel-1/ausdy",
    display: "transfer/channel-1/usdy",
    name: "Ondo US Dollar Yield",
    symbol: "USDY",
    penumbraAssetId: {
      inner: "j0fAr5g+SxQguIafcYD1ifc+q9jE2m2dZ+u6YrsPdAU="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/testnets/nobletestnet/images/usdy.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/testnets/nobletestnet/images/usdy.svg",
        theme: {
          primaryColorHex: "#142b5b"
        }
      }
    ]
  },
  "jIowYEpoMr+LQYqjDVEnQO6hyzb9raVxbO1GLyDxlhI=": {
    description: "The native token of Osmosis",
    denomUnits: [
      {
        denom: "transfer/channel-0/uosmo"
      },
      {
        denom: "transfer/channel-0/osmo",
        exponent: 6
      }
    ],
    base: "transfer/channel-0/uosmo",
    display: "transfer/channel-0/osmo",
    name: "Osmosis Testnet",
    symbol: "OSMO",
    penumbraAssetId: {
      inner: "jIowYEpoMr+LQYqjDVEnQO6hyzb9raVxbO1GLyDxlhI="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/osmo.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/osmo.svg",
        theme: {
          primaryColorHex: "#6b0db7"
        }
      }
    ],
    coingeckoId: "osmosis"
  },
  "nDjzm+ldIrNMJha1anGMDVxpA5cLCPnUYQ1clmHF1gw=": {
    denomUnits: [
      {
        denom: "pizza"
      }
    ],
    base: "pizza",
    display: "pizza",
    symbol: "PIZZA",
    penumbraAssetId: {
      inner: "nDjzm+ldIrNMJha1anGMDVxpA5cLCPnUYQ1clmHF1gw="
    },
    images: [
      {
        svg: "https://raw.githubusercontent.com/penumbrafi/registry/main/images/pizza.svg",
        theme: {
          primaryColorHex: "#ab1221"
        }
      }
    ]
  },
  "nwPDkQq3OvLnBwGTD+nmv1Ifb2GEmFCgNHrU++9BsRE=": {
    denomUnits: [
      {
        denom: "gn",
        exponent: 6
      },
      {
        denom: "mgn",
        exponent: 3
      },
      {
        denom: "ugn"
      }
    ],
    base: "ugn",
    display: "gn",
    symbol: "GN",
    penumbraAssetId: {
      inner: "nwPDkQq3OvLnBwGTD+nmv1Ifb2GEmFCgNHrU++9BsRE="
    },
    images: [
      {
        svg: "https://raw.githubusercontent.com/penumbrafi/registry/main/images/new-moon-face.svg",
        theme: {
          primaryColorHex: "#546068"
        }
      }
    ]
  },
  "o2gZdbhCH70Ry+7iBhkSeHC/PB1LZhgkn7LHC2kEhQc=": {
    denomUnits: [
      {
        denom: "test_btc",
        exponent: 8
      },
      {
        denom: "test_sat"
      }
    ],
    base: "test_sat",
    display: "test_btc",
    symbol: "TestBTC",
    penumbraAssetId: {
      inner: "o2gZdbhCH70Ry+7iBhkSeHC/PB1LZhgkn7LHC2kEhQc="
    }
  },
  "pmpygqUf4DL+z849rGPpudpdK/+FAv8qQ01U2C73kAw=": {
    denomUnits: [
      {
        denom: "test_osmo",
        exponent: 6
      },
      {
        denom: "mtest_osmo",
        exponent: 3
      },
      {
        denom: "utest_osmo"
      }
    ],
    base: "utest_osmo",
    display: "test_osmo",
    symbol: "TestOSMO",
    penumbraAssetId: {
      inner: "pmpygqUf4DL+z849rGPpudpdK/+FAv8qQ01U2C73kAw="
    }
  },
  "ra98J77CX10Us2s6+d7bebfpm1Q3+UOycPfaaEeeuAY=": {
    denomUnits: [
      {
        denom: "transfer/channel-0/factory/osmo1zlkzu72774ynac53necz46u4ycqtp36wedrar0/willyz"
      },
      {
        denom: "transfer/channel-0/willyz",
        exponent: 6
      }
    ],
    base: "transfer/channel-0/factory/osmo1zlkzu72774ynac53necz46u4ycqtp36wedrar0/willyz",
    display: "transfer/channel-0/willyz",
    name: "Willyz",
    symbol: "WILLYZ",
    penumbraAssetId: {
      inner: "ra98J77CX10Us2s6+d7bebfpm1Q3+UOycPfaaEeeuAY="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/testnets/osmosistestnet/images/willyz.png",
        theme: {
          primaryColorHex: "#e4bc82"
        }
      }
    ]
  },
  "reum7wQmk/owgvGMWMZn/6RFPV24zIKq3W6In/WwZgg=": {
    denomUnits: [
      {
        denom: "test_usd",
        exponent: 18
      },
      {
        denom: "wtest_usd"
      }
    ],
    base: "wtest_usd",
    display: "test_usd",
    symbol: "TestUSD",
    penumbraAssetId: {
      inner: "reum7wQmk/owgvGMWMZn/6RFPV24zIKq3W6In/WwZgg="
    },
    images: [
      {
        svg: "https://raw.githubusercontent.com/penumbrafi/registry/main/images/test-usd.svg",
        theme: {
          primaryColorHex: "#14833b"
        }
      }
    ]
  },
  "ypUT1AOtjfwMOKMATACoD9RSvi8jY/YnYGi46CZ/6Q8=": {
    denomUnits: [
      {
        denom: "test_atom",
        exponent: 6
      },
      {
        denom: "mtest_atom",
        exponent: 3
      },
      {
        denom: "utest_atom"
      }
    ],
    base: "utest_atom",
    display: "test_atom",
    symbol: "TestATOM",
    penumbraAssetId: {
      inner: "ypUT1AOtjfwMOKMATACoD9RSvi8jY/YnYGi46CZ/6Q8="
    }
  }
}, gn = [
  "reum7wQmk/owgvGMWMZn/6RFPV24zIKq3W6In/WwZgg=",
  "J0fi/vGPSy8XmGGzU+rtpPxHirechCzuPf23cnZ5FgA="
], Hs = {
  chainId: ln,
  ibcConnections: hn,
  assetById: dn,
  numeraires: gn
}, Ns = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  assetById: dn,
  chainId: ln,
  default: Hs,
  ibcConnections: hn,
  numeraires: gn
}, Symbol.toStringTag, { value: "Module" })), pn = "penumbra-1", un = [
  {
    addressPrefix: "cosmos",
    chainId: "cosmoshub-4",
    channelId: "channel-0",
    counterpartyChannelId: "channel-940",
    displayName: "Cosmos Hub (legacy)",
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/cosmoshub/images/atom.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/cosmoshub/images/atom.svg"
      }
    ],
    status: "expired"
  },
  {
    addressPrefix: "noble",
    chainId: "noble-1",
    channelId: "channel-2",
    counterpartyChannelId: "channel-89",
    displayName: "Noble",
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/noble/images/stake.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/noble/images/stake.svg"
      }
    ],
    status: "active"
  },
  {
    addressPrefix: "celestia",
    chainId: "celestia",
    channelId: "channel-3",
    counterpartyChannelId: "channel-35",
    displayName: "Celestia (legacy)",
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/celestia/images/celestia.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/celestia/images/celestia.svg"
      }
    ],
    status: "expired"
  },
  {
    addressPrefix: "osmo",
    chainId: "osmosis-1",
    channelId: "channel-4",
    counterpartyChannelId: "channel-79703",
    displayName: "Osmosis (legacy)",
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/osmo.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/osmo.svg"
      }
    ],
    status: "expired"
  },
  {
    addressPrefix: "dydx",
    chainId: "dxdy-mainnet-1",
    channelId: "channel-16",
    counterpartyChannelId: "channel-89",
    displayName: "dYdX Protocol",
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/dydx/images/dydx.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/dydx/images/dydx.svg"
      }
    ],
    status: "expired"
  },
  {
    addressPrefix: "inj",
    chainId: "injective-1",
    channelId: "channel-18",
    counterpartyChannelId: "channel-494",
    displayName: "Injective Finance",
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/injective/images/inj.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/injective/images/inj.svg"
      }
    ],
    status: "active"
  },
  {
    addressPrefix: "stride",
    chainId: "stride-1",
    channelId: "channel-8",
    counterpartyChannelId: "channel-307",
    displayName: "Stride",
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/stride/images/strd.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/stride/images/strd.svg"
      }
    ],
    status: "expired"
  },
  {
    addressPrefix: "neutron",
    chainId: "neutron-1",
    channelId: "channel-9",
    counterpartyChannelId: "channel-6560",
    displayName: "Neutron",
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/neutron/images/neutron.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/neutron/images/neutron.svg"
      }
    ],
    status: "expired"
  },
  {
    addressPrefix: "axelar",
    chainId: "axelar-dojo-1",
    channelId: "channel-7",
    counterpartyChannelId: "channel-171",
    displayName: "Axelar",
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/axelar/images/axl.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/axelar/images/axl.svg"
      }
    ],
    status: "expired"
  },
  {
    addressPrefix: "osmo",
    chainId: "osmosis-1",
    channelId: "channel-20",
    counterpartyChannelId: "channel-111093",
    displayName: "Osmosis",
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/osmo.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/osmo.svg"
      }
    ],
    status: "active"
  },
  {
    addressPrefix: "cosmos",
    chainId: "cosmoshub-4",
    channelId: "channel-22",
    counterpartyChannelId: "channel-1934",
    displayName: "Cosmos Hub",
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/cosmoshub/images/atom.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/cosmoshub/images/atom.svg"
      }
    ],
    status: "active"
  },
  {
    addressPrefix: "celestia",
    chainId: "celestia",
    channelId: "channel-23",
    counterpartyChannelId: "channel-701",
    displayName: "Celestia",
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/celestia/images/celestia.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/celestia/images/celestia.svg"
      }
    ],
    status: "active"
  },
  {
    addressPrefix: "kava",
    chainId: "kava_2222-10",
    channelId: "channel-21",
    counterpartyChannelId: "channel-162",
    displayName: "Kava",
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/kava/images/kava.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/kava/images/kava.svg"
      }
    ],
    status: "active"
  }
], fn = {
  "+CcJwejdvToU1FqwLLm9/InRANKjDoHbnsssdQ/s+gQ=": {
    description: "Arbitrum on Axelar",
    denomUnits: [
      {
        denom: "transfer/channel-7/arb-wei"
      },
      {
        denom: "transfer/channel-7/arb",
        exponent: 18
      }
    ],
    base: "transfer/channel-7/arb-wei",
    display: "transfer/channel-7/arb",
    name: "Arbitrum",
    symbol: "axlARB",
    penumbraAssetId: {
      inner: "+CcJwejdvToU1FqwLLm9/InRANKjDoHbnsssdQ/s+gQ="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/arbitrum/images/arb.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/arbitrum/images/arb.svg",
        theme: {
          primaryColorHex: "#9dcceb"
        }
      }
    ]
  },
  "+Det1wn1jJQKu9r+Gtp2uBwopjANl8tZ/bQ0t6JTawc=": {
    description: `$9 Dollers is programmed

Made with ❤️`,
    denomUnits: [
      {
        denom: "transfer/channel-20/factory/osmo1q77cw0mmlluxu0wr29fcdd0tdnh78gzhkvhe4n6ulal9qvrtu43qtd0nh8/ninedollers"
      },
      {
        denom: "transfer/channel-20/NINEDOLLERS",
        exponent: 6
      }
    ],
    base: "transfer/channel-20/factory/osmo1q77cw0mmlluxu0wr29fcdd0tdnh78gzhkvhe4n6ulal9qvrtu43qtd0nh8/ninedollers",
    display: "transfer/channel-20/NINEDOLLERS",
    name: "Nine Dollers",
    symbol: "NINEDOLLERS",
    penumbraAssetId: {
      inner: "+Det1wn1jJQKu9r+Gtp2uBwopjANl8tZ/bQ0t6JTawc="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/NINEDOLLERS.png",
        theme: {
          primaryColorHex: "#b6ef75"
        }
      }
    ]
  },
  "+Xjkupc3rSy48zQ4DNGcdm9qdqqjyejP0m67JkXYLwQ=": {
    description: "Fractionalized CEWTs",
    denomUnits: [
      {
        denom: "transfer/channel-20/factory/osmo1dywfmhyc8y0wga7qpzej0x0mgwqg25fj4eccp494w8yafzdpgamsx9ryyv/fCEWT"
      },
      {
        denom: "transfer/channel-20/fCEWT",
        exponent: 9
      }
    ],
    base: "transfer/channel-20/factory/osmo1dywfmhyc8y0wga7qpzej0x0mgwqg25fj4eccp494w8yafzdpgamsx9ryyv/fCEWT",
    display: "transfer/channel-20/fCEWT",
    name: "fCEWT",
    symbol: "fCEWT",
    penumbraAssetId: {
      inner: "+Xjkupc3rSy48zQ4DNGcdm9qdqqjyejP0m67JkXYLwQ="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/fCEWT.png",
        theme: {
          primaryColorHex: "#ccd5b6"
        }
      }
    ]
  },
  "+e8DILwTCy+sr9Dj3ims882EEQNTN7LpddoYLDGNahA=": {
    description: "Governance token of Kava Swap Protocol",
    denomUnits: [
      {
        denom: "transfer/channel-21/swp"
      },
      {
        denom: "transfer/channel-21/SWP",
        exponent: 6
      }
    ],
    base: "transfer/channel-21/swp",
    display: "transfer/channel-21/SWP",
    name: "Kava Swap",
    symbol: "SWP",
    penumbraAssetId: {
      inner: "+e8DILwTCy+sr9Dj3ims882EEQNTN7LpddoYLDGNahA="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/kava/images/swp.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/kava/images/swp.svg",
        theme: {
          primaryColorHex: "#544cfb"
        }
      }
    ]
  },
  "+nbomVQwTdwEJD/z6sBlIDXMWc4uAsxqD8mu29/Q8xA=": {
    description: "ashLAB - Burned LAB",
    denomUnits: [
      {
        denom: "transfer/channel-20/factory/osmo1svj5kd8kzj7xxtrd6ftjk0856ffpyj4egz7f9pd9dge5wr4kwansmefq07/lab.ash"
      },
      {
        denom: "transfer/channel-20/ashLAB",
        exponent: 6
      }
    ],
    base: "transfer/channel-20/factory/osmo1svj5kd8kzj7xxtrd6ftjk0856ffpyj4egz7f9pd9dge5wr4kwansmefq07/lab.ash",
    display: "transfer/channel-20/ashLAB",
    name: "Burned LAB",
    symbol: "ashLAB",
    penumbraAssetId: {
      inner: "+nbomVQwTdwEJD/z6sBlIDXMWc4uAsxqD8mu29/Q8xA="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/ashLAB.png",
        theme: {
          primaryColorHex: "#edb294"
        }
      }
    ]
  },
  "+op3s5SAYE/1BOwkmT4XYJ8svOn+SPtS2e1WFoMMVwM=": {
    description: "Cosmo is the best currency in the universe.",
    denomUnits: [
      {
        denom: "transfer/channel-18/factory/inj1je6n5sr4qtx2lhpldfxndntmgls9hf38ncmcez/COSMO"
      },
      {
        denom: "transfer/channel-18/COSMO",
        exponent: 6
      }
    ],
    base: "transfer/channel-18/factory/inj1je6n5sr4qtx2lhpldfxndntmgls9hf38ncmcez/COSMO",
    display: "transfer/channel-18/COSMO",
    name: "Cosmo",
    symbol: "COSMO",
    penumbraAssetId: {
      inner: "+op3s5SAYE/1BOwkmT4XYJ8svOn+SPtS2e1WFoMMVwM="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/injective/images/cosmo.png",
        theme: {
          primaryColorHex: "#eadcd6"
        }
      }
    ]
  },
  "+qq1yKIfdxoUSQMQU0SnKkDXDRrD1VhP0x/qw1hZKRA=": {
    description: "Margined Power Token sqOSMO",
    denomUnits: [
      {
        denom: "transfer/channel-20/factory/osmo1g8qypve6l95xmhgc0fddaecerffymsl7kn9muw/squosmo"
      },
      {
        denom: "transfer/channel-20/sqosmo",
        exponent: 6
      }
    ],
    base: "transfer/channel-20/factory/osmo1g8qypve6l95xmhgc0fddaecerffymsl7kn9muw/squosmo",
    display: "transfer/channel-20/sqosmo",
    name: "OSMO Squared",
    symbol: "sqOSMO",
    penumbraAssetId: {
      inner: "+qq1yKIfdxoUSQMQU0SnKkDXDRrD1VhP0x/qw1hZKRA="
    },
    images: [
      {
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/sqosmo.svg",
        theme: {
          primaryColorHex: "#040404"
        }
      }
    ]
  },
  "/479qYXE+dD7kScmzQU/5eeJqI78sk40NG5cYF0acQQ=": {
    description: "An alloy of DYDX asset variants on Osmosis.",
    denomUnits: [
      {
        denom: "transfer/channel-4/factory/osmo1zem8r6dv6u38f6qpg546zy30946av8h5srgug0s4gcyy6cfecf3seac083/alloyed/allDYDX"
      },
      {
        denom: "transfer/channel-4/allDYDX",
        exponent: 12
      }
    ],
    base: "transfer/channel-4/factory/osmo1zem8r6dv6u38f6qpg546zy30946av8h5srgug0s4gcyy6cfecf3seac083/alloyed/allDYDX",
    display: "transfer/channel-4/allDYDX",
    name: "dYdX Protocol",
    symbol: "allDYDX.ch4",
    penumbraAssetId: {
      inner: "/479qYXE+dD7kScmzQU/5eeJqI78sk40NG5cYF0acQQ="
    },
    images: [
      {
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/dydx/images/dydx-circle.svg",
        theme: {
          primaryColorHex: "#d0d0d3"
        }
      },
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/dydx/images/dydx.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/dydx/images/dydx.svg",
        theme: {
          primaryColorHex: "#d3d3d5"
        }
      }
    ]
  },
  "/I39D+P3G8rGvgQT/Aa+mlYgnCwyipNA9K6sjjRWMww=": {
    description: "An alloy of USD asset variants on Osmosis.",
    denomUnits: [
      {
        denom: "transfer/channel-20/factory/osmo1t82ql2w69m9g3un7c6sk5wss578ewst2uscr7zdkn6k8rmzc3e8qz9n4q2/alloyed/allUSD"
      },
      {
        denom: "transfer/channel-20/allUSD",
        exponent: 6
      }
    ],
    base: "transfer/channel-20/factory/osmo1t82ql2w69m9g3un7c6sk5wss578ewst2uscr7zdkn6k8rmzc3e8qz9n4q2/alloyed/allUSD",
    display: "transfer/channel-20/allUSD",
    name: "Osmosis Alloyed USD",
    symbol: "allUSD",
    penumbraAssetId: {
      inner: "/I39D+P3G8rGvgQT/Aa+mlYgnCwyipNA9K6sjjRWMww="
    },
    images: [
      {
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/usd.svg",
        theme: {
          primaryColorHex: "#0454b4"
        }
      }
    ]
  },
  "/Vy+5MICHE1gbv/SdMOanJ3IcyW3PcYjQouTPcpekA0=": {
    denomUnits: [
      {
        denom: "udelegation_penumbravalid19jqf35xytm4ht9f8awtad9wxmfky0tjygug8390cewyqjwmyucqqkkrc9r"
      },
      {
        denom: "mdelegation_penumbravalid19jqf35xytm4ht9f8awtad9wxmfky0tjygug8390cewyqjwmyucqqkkrc9r",
        exponent: 3
      },
      {
        denom: "delegation_penumbravalid19jqf35xytm4ht9f8awtad9wxmfky0tjygug8390cewyqjwmyucqqkkrc9r",
        exponent: 6
      }
    ],
    base: "udelegation_penumbravalid19jqf35xytm4ht9f8awtad9wxmfky0tjygug8390cewyqjwmyucqqkkrc9r",
    display: "delegation_penumbravalid19jqf35xytm4ht9f8awtad9wxmfky0tjygug8390cewyqjwmyucqqkkrc9r",
    symbol: "delUM(silent)",
    penumbraAssetId: {
      inner: "/Vy+5MICHE1gbv/SdMOanJ3IcyW3PcYjQouTPcpekA0="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/penumbrafi/registry/main/images/validators/penumbravalid19jqf35xytm4ht9f8awtad9wxmfky0tjygug8390cewyqjwmyucqqkkrc9r.png",
        theme: {
          primaryColorHex: "#0c0e14"
        }
      }
    ]
  },
  "0AuCAHQ15QQQ8duQq+5MWlVd7SFkJzh5d0ub3fUecgw=": {
    description: `Join Matcha Club - use our ecosystem for for free.
NFT builder, utility apps. Cooking non-stop!`,
    denomUnits: [
      {
        denom: "transfer/channel-20/factory/osmo1q77cw0mmlluxu0wr29fcdd0tdnh78gzhkvhe4n6ulal9qvrtu43qtd0nh8/mtc"
      },
      {
        denom: "transfer/channel-20/MTC",
        exponent: 6
      }
    ],
    base: "transfer/channel-20/factory/osmo1q77cw0mmlluxu0wr29fcdd0tdnh78gzhkvhe4n6ulal9qvrtu43qtd0nh8/mtc",
    display: "transfer/channel-20/MTC",
    name: "Matcha Club",
    symbol: "MTC",
    penumbraAssetId: {
      inner: "0AuCAHQ15QQQ8duQq+5MWlVd7SFkJzh5d0ub3fUecgw="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/MTC.png",
        theme: {
          primaryColorHex: "#395a4a"
        }
      }
    ]
  },
  "0MEQQsTe/BbQkavD+bHMcWiLsVAv21ifSVMalRXDjhA=": {
    description: "Stride's liquid staked TIA",
    denomUnits: [
      {
        denom: "transfer/channel-8/stutia"
      },
      {
        denom: "transfer/channel-8/stTIA",
        exponent: 6
      }
    ],
    base: "transfer/channel-8/stutia",
    display: "transfer/channel-8/stTIA",
    name: "Stride Staked TIA",
    symbol: "stTIA",
    penumbraAssetId: {
      inner: "0MEQQsTe/BbQkavD+bHMcWiLsVAv21ifSVMalRXDjhA="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/stride/images/sttia.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/stride/images/sttia.svg",
        theme: {
          primaryColorHex: "#e30474"
        }
      }
    ]
  },
  "0NWuvxN2vjYqEQhoqZeat18IMcn67Rn3TAGX1iSiygk=": {
    description: "GSI is the native digital asset of Grey Stone Incorporated, engineered to function as a leveraged Bitcoin proxy through proprietary automated market maker configuration methodologies.",
    denomUnits: [
      {
        denom: "transfer/channel-20/factory/osmo187hj0cr8csrhzm8ukzsp53vc0cfp338ftacy7j/gsi"
      },
      {
        denom: "transfer/channel-20/gsi",
        exponent: 6
      }
    ],
    base: "transfer/channel-20/factory/osmo187hj0cr8csrhzm8ukzsp53vc0cfp338ftacy7j/gsi",
    display: "transfer/channel-20/gsi",
    name: "Grey Stone Incorporated",
    symbol: "GSI",
    penumbraAssetId: {
      inner: "0NWuvxN2vjYqEQhoqZeat18IMcn67Rn3TAGX1iSiygk="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/gsi.png",
        theme: {
          primaryColorHex: "#bebebe"
        }
      }
    ]
  },
  "0SuJsiK7sOHgnilM9D5M5/fmp4X89KejPiSWkgFukwk=": {
    description: "Stride's liquid staked DYM",
    denomUnits: [
      {
        denom: "transfer/channel-8/stadym"
      },
      {
        denom: "transfer/channel-8/stDYM",
        exponent: 18
      }
    ],
    base: "transfer/channel-8/stadym",
    display: "transfer/channel-8/stDYM",
    name: "Stride Staked DYM",
    symbol: "stDYM",
    penumbraAssetId: {
      inner: "0SuJsiK7sOHgnilM9D5M5/fmp4X89KejPiSWkgFukwk="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/stride/images/stdym.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/stride/images/stdym.svg",
        theme: {
          primaryColorHex: "#e30474"
        }
      }
    ]
  },
  "0YAzpvfyl5vY+YkJ10i9G94LkWcBaGxTv0mgET98MRA=": {
    description: "Drop staked NTRN",
    denomUnits: [
      {
        denom: "transfer/channel-9/factory/neutron1frc0p5czd9uaaymdkug2njz7dc7j65jxukp9apmt9260a8egujkspms2t2/udntrn"
      },
      {
        denom: "transfer/channel-9/dNTRN",
        exponent: 6
      }
    ],
    base: "transfer/channel-9/factory/neutron1frc0p5czd9uaaymdkug2njz7dc7j65jxukp9apmt9260a8egujkspms2t2/udntrn",
    display: "transfer/channel-9/dNTRN",
    name: "dNTRN",
    symbol: "dNTRN",
    penumbraAssetId: {
      inner: "0YAzpvfyl5vY+YkJ10i9G94LkWcBaGxTv0mgET98MRA="
    },
    images: [
      {
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/neutron/images/dNTRN.svg",
        theme: {
          primaryColorHex: "#643cfc"
        }
      }
    ]
  },
  "0b4Hbk1MljuuEsCWRqWQg9ID+eBB+faHP25Z5OTdHQI=": {
    description: "Uhm, Power Bottom",
    denomUnits: [
      {
        denom: "transfer/channel-20/factory/osmo1q77cw0mmlluxu0wr29fcdd0tdnh78gzhkvhe4n6ulal9qvrtu43qtd0nh8/pbb"
      },
      {
        denom: "transfer/channel-20/PBB",
        exponent: 6
      }
    ],
    base: "transfer/channel-20/factory/osmo1q77cw0mmlluxu0wr29fcdd0tdnh78gzhkvhe4n6ulal9qvrtu43qtd0nh8/pbb",
    display: "transfer/channel-20/PBB",
    name: "Power Bottom",
    symbol: "PBB",
    penumbraAssetId: {
      inner: "0b4Hbk1MljuuEsCWRqWQg9ID+eBB+faHP25Z5OTdHQI="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/PBB.png",
        theme: {
          primaryColorHex: "#f31414"
        }
      }
    ]
  },
  "0kVhQRyUleM1JzS7rkLnEuZ6tAQ43rYzhd5YupNw6Ac=": {
    description: "Boost DAO FUEL",
    denomUnits: [
      {
        denom: "transfer/channel-9/factory/neutron1zl2htquajn50vxu5ltz0y5hf2qzvkgnjaaza2rssef268xplq6vsjuruxm/fuel"
      },
      {
        denom: "transfer/channel-9/FUEL",
        exponent: 6
      }
    ],
    base: "transfer/channel-9/factory/neutron1zl2htquajn50vxu5ltz0y5hf2qzvkgnjaaza2rssef268xplq6vsjuruxm/fuel",
    display: "transfer/channel-9/FUEL",
    name: "FUEL",
    symbol: "FUEL",
    penumbraAssetId: {
      inner: "0kVhQRyUleM1JzS7rkLnEuZ6tAQ43rYzhd5YupNw6Ac="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/neutron/images/fuel.png",
        theme: {
          primaryColorHex: "#d7e4f1"
        }
      }
    ]
  },
  "0pGhIkJ9TM9VB7y+kTMyQ/MWRjlu2gE+lfwbUbtnbgY=": {
    description: "Reflections of cartel activity on Cosmos.",
    denomUnits: [
      {
        denom: "transfer/channel-9/factory/neutron1w0pz4mjw7n96kkragj8etgfgakg5vw9lzg77wq/cartel"
      },
      {
        denom: "transfer/channel-9/cartel",
        exponent: 6
      }
    ],
    base: "transfer/channel-9/factory/neutron1w0pz4mjw7n96kkragj8etgfgakg5vw9lzg77wq/cartel",
    display: "transfer/channel-9/cartel",
    name: "cartel",
    symbol: "CARTEL",
    penumbraAssetId: {
      inner: "0pGhIkJ9TM9VB7y+kTMyQ/MWRjlu2gE+lfwbUbtnbgY="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/neutron/images/cartel.png",
        theme: {
          primaryColorHex: "#8e8c92"
        }
      }
    ]
  },
  "0wAF6QGXQj+EP/tedKPzs087mo0fV9NqBVwsmSiwoQs=": {
    description: `Join Matcha Club - use our ecosystem for for free.
NFT builder, utility apps. Cooking non-stop!`,
    denomUnits: [
      {
        denom: "transfer/channel-4/factory/osmo1q77cw0mmlluxu0wr29fcdd0tdnh78gzhkvhe4n6ulal9qvrtu43qtd0nh8/mtc"
      },
      {
        denom: "transfer/channel-4/MTC",
        exponent: 6
      }
    ],
    base: "transfer/channel-4/factory/osmo1q77cw0mmlluxu0wr29fcdd0tdnh78gzhkvhe4n6ulal9qvrtu43qtd0nh8/mtc",
    display: "transfer/channel-4/MTC",
    name: "Matcha Club",
    symbol: "MTC.ch4",
    penumbraAssetId: {
      inner: "0wAF6QGXQj+EP/tedKPzs087mo0fV9NqBVwsmSiwoQs="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/MTC.png",
        theme: {
          primaryColorHex: "#395a4a"
        }
      }
    ]
  },
  "11ulh+zO2v206EDtb6L2SdB09q4ChrHcc+p1zHubzgU=": {
    description: "COOK is the governance token for Start.Cooking, the premier token factory on Cosmos.",
    denomUnits: [
      {
        denom: "transfer/channel-4/factory/osmo1q77cw0mmlluxu0wr29fcdd0tdnh78gzhkvhe4n6ulal9qvrtu43qtd0nh8/COOK"
      },
      {
        denom: "transfer/channel-4/COOK",
        exponent: 6
      }
    ],
    base: "transfer/channel-4/factory/osmo1q77cw0mmlluxu0wr29fcdd0tdnh78gzhkvhe4n6ulal9qvrtu43qtd0nh8/COOK",
    display: "transfer/channel-4/COOK",
    name: "COOK",
    symbol: "COOK.ch4",
    penumbraAssetId: {
      inner: "11ulh+zO2v206EDtb6L2SdB09q4ChrHcc+p1zHubzgU="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/COOK.png",
        theme: {
          primaryColorHex: "#f7bca7"
        }
      }
    ]
  },
  "16ztCNRCyQZYu3cNN7DNMevUt0v2pERpUBflNfwP+wc=": {
    description: "USD Coin issued natively on Injective by Circle",
    denomUnits: [
      {
        denom: "transfer/channel-18/erc20:0xa00C59fF5a080D2b954d0c75e46E22a0c371235a"
      },
      {
        denom: "transfer/channel-18/usdc",
        exponent: 6
      }
    ],
    base: "transfer/channel-18/erc20:0xa00C59fF5a080D2b954d0c75e46E22a0c371235a",
    display: "transfer/channel-18/usdc",
    name: "USDC",
    symbol: "USDC.inj",
    penumbraAssetId: {
      inner: "16ztCNRCyQZYu3cNN7DNMevUt0v2pERpUBflNfwP+wc="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/ethereum/images/usdc.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/ethereum/images/usdc.svg",
        theme: {
          primaryColorHex: "#2474cb"
        }
      }
    ],
    priorityScore: "800000000101",
    coingeckoId: "usd-coin"
  },
  "18lRl/PREbyO+heQ5M7ydQ21OwMH2/VKuFoqhu8JEgo=": {
    description: "Commemorative token dedicated to the old Prussian noble family",
    denomUnits: [
      {
        denom: "transfer/channel-20/factory/osmo1q77cw0mmlluxu0wr29fcdd0tdnh78gzhkvhe4n6ulal9qvrtu43qtd0nh8/ba-ba"
      },
      {
        denom: "transfer/channel-20/BA-BA",
        exponent: 6
      }
    ],
    base: "transfer/channel-20/factory/osmo1q77cw0mmlluxu0wr29fcdd0tdnh78gzhkvhe4n6ulal9qvrtu43qtd0nh8/ba-ba",
    display: "transfer/channel-20/BA-BA",
    name: "von Baysen-Bażeński",
    symbol: "BABA",
    penumbraAssetId: {
      inner: "18lRl/PREbyO+heQ5M7ydQ21OwMH2/VKuFoqhu8JEgo="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/BA-BA.png",
        theme: {
          primaryColorHex: "#bf2019"
        }
      }
    ]
  },
  "1KnnW2hZa5VOGRlXSDgexDY72QOjuWa2if43is7ldwE=": {
    description: "Fractionalized Celestine Sloth Society",
    denomUnits: [
      {
        denom: "transfer/channel-4/factory/osmo1dywfmhyc8y0wga7qpzej0x0mgwqg25fj4eccp494w8yafzdpgamsx9ryyv/fSLOTH"
      },
      {
        denom: "transfer/channel-4/fSLOTH",
        exponent: 9
      }
    ],
    base: "transfer/channel-4/factory/osmo1dywfmhyc8y0wga7qpzej0x0mgwqg25fj4eccp494w8yafzdpgamsx9ryyv/fSLOTH",
    display: "transfer/channel-4/fSLOTH",
    name: "fSLOTH",
    symbol: "fSLOTH.ch4",
    penumbraAssetId: {
      inner: "1KnnW2hZa5VOGRlXSDgexDY72QOjuWa2if43is7ldwE="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/fSLOTH.png",
        theme: {
          primaryColorHex: "#dadcbf"
        }
      }
    ]
  },
  "1RP/xXNeYICp2gwgz3lv6r0xa/3jKw3JitScl+QDhgk=": {
    description: "What the Fuck",
    denomUnits: [
      {
        denom: "transfer/channel-9/neutron12h09p8hq5y4xpsmcuxxzsn9juef4f6jvekp8yefc6xnlwm6uumnsdk29wf"
      },
      {
        denom: "transfer/channel-9/wtf",
        exponent: 6
      }
    ],
    base: "transfer/channel-9/neutron12h09p8hq5y4xpsmcuxxzsn9juef4f6jvekp8yefc6xnlwm6uumnsdk29wf",
    display: "transfer/channel-9/wtf",
    name: "wtf",
    symbol: "WTF",
    penumbraAssetId: {
      inner: "1RP/xXNeYICp2gwgz3lv6r0xa/3jKw3JitScl+QDhgk="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/neutron/images/WTF.png",
        theme: {
          primaryColorHex: "#ddd7ad"
        }
      }
    ]
  },
  "1b1489PiR06kGAYS4y4+J0baqVEdYYqLDlxkHLy5CwA=": {
    description: "The governance and utility token of Yieldmos, the Interchain Automation Protocol",
    denomUnits: [
      {
        denom: "transfer/channel-4/factory/osmo1vdvnznwg597qngrq9mnfcfk0am9jdc9y446jewhcqdreqz4r75xq5j5zvy/ymos"
      },
      {
        denom: "transfer/channel-4/ymos",
        exponent: 6
      }
    ],
    base: "transfer/channel-4/factory/osmo1vdvnznwg597qngrq9mnfcfk0am9jdc9y446jewhcqdreqz4r75xq5j5zvy/ymos",
    display: "transfer/channel-4/ymos",
    name: "Yieldmos Coin",
    symbol: "YMOS.ch4",
    penumbraAssetId: {
      inner: "1b1489PiR06kGAYS4y4+J0baqVEdYYqLDlxkHLy5CwA="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/ymos.png",
        theme: {
          primaryColorHex: "#2c3454"
        }
      }
    ]
  },
  "25h1LaXIyYS0CNzXgIaXdSpK91BlM8zByspZcVQ4mgM=": {
    description: "OnE mEmEcOiN tO cOnNeCt oL ImBeCiles - aNd in Da Cosmos BiNd DeM",
    denomUnits: [
      {
        denom: "transfer/channel-20/factory/osmo1kqdw6pvn0xww6tyfv2sqvkkencdz0qw406x54r/IBC"
      },
      {
        denom: "transfer/channel-20/IBC",
        exponent: 6
      }
    ],
    base: "transfer/channel-20/factory/osmo1kqdw6pvn0xww6tyfv2sqvkkencdz0qw406x54r/IBC",
    display: "transfer/channel-20/IBC",
    name: "IBC",
    symbol: "IBC",
    penumbraAssetId: {
      inner: "25h1LaXIyYS0CNzXgIaXdSpK91BlM8zByspZcVQ4mgM="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/ibc.png",
        theme: {
          primaryColorHex: "#040404"
        }
      }
    ]
  },
  "26qxGqev+0d1jEJc8C5iJhejfieGaoB/ypiRRmSacAw=": {
    description: "Internet Computer bridged via Omnity Network.",
    denomUnits: [
      {
        denom: "transfer/channel-4/factory/osmo10c4y9csfs8q7mtvfg4p9gd8d0acx0hpc2mte9xqzthd7rd3348tsfhaesm/sICP-native-ICP"
      },
      {
        denom: "transfer/channel-4/icp",
        exponent: 8
      }
    ],
    base: "transfer/channel-4/factory/osmo10c4y9csfs8q7mtvfg4p9gd8d0acx0hpc2mte9xqzthd7rd3348tsfhaesm/sICP-native-ICP",
    display: "transfer/channel-4/icp",
    name: "Internet Computer",
    symbol: "ICP.ch4",
    penumbraAssetId: {
      inner: "26qxGqev+0d1jEJc8C5iJhejfieGaoB/ypiRRmSacAw="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/internetcomputer/images/icp.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/internetcomputer/images/icp.svg",
        theme: {
          primaryColorHex: "#e3e3e3"
        }
      }
    ]
  },
  "2EG6vOq/2YXCYlhzeSQEwXIIVvoroVvMse0e3Hc4PAE=": {
    description: "The first native memecoin on Osmosis. Crafted by the deftest of hands in the lab of lunacy. It's scientifically anarchic, professionally foolish, and your ticket to the madhouse.",
    denomUnits: [
      {
        denom: "transfer/channel-4/factory/osmo1pfyxruwvtwk00y8z06dh2lqjdj82ldvy74wzm3/WOSMO"
      },
      {
        denom: "transfer/channel-4/WOSMO",
        exponent: 6
      }
    ],
    base: "transfer/channel-4/factory/osmo1pfyxruwvtwk00y8z06dh2lqjdj82ldvy74wzm3/WOSMO",
    display: "transfer/channel-4/WOSMO",
    name: "WOSMO",
    symbol: "WOSMO.ch4",
    penumbraAssetId: {
      inner: "2EG6vOq/2YXCYlhzeSQEwXIIVvoroVvMse0e3Hc4PAE="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/wosmo.png",
        theme: {
          primaryColorHex: "#2c0d6c"
        }
      }
    ]
  },
  "2bI7t6znuSOLlmhL/+KK5Yhkpyhrver8XPclcmGJsgc=": {
    description: "Injective is a decentralized exchange protocol that enables fast, secure, and fully decentralized trading of derivatives, futures, and spot markets.",
    denomUnits: [
      {
        denom: "transfer/channel-18/inj"
      },
      {
        denom: "transfer/channel-18/INJ",
        exponent: 18
      }
    ],
    base: "transfer/channel-18/inj",
    display: "transfer/channel-18/INJ",
    name: "Injective",
    symbol: "INJ",
    penumbraAssetId: {
      inner: "2bI7t6znuSOLlmhL/+KK5Yhkpyhrver8XPclcmGJsgc="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/injective/images/inj.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/injective/images/inj.svg",
        theme: {
          primaryColorHex: "#4c3cfb"
        }
      }
    ],
    priorityScore: "600000000000",
    coingeckoId: "injective-protocol"
  },
  "2iqxPGHxW2TYNdH+v+s/t2dbzTQG1vyWJtul6BzsdQc=": {
    description: "An alloy of XRP asset variants on Osmosis.",
    denomUnits: [
      {
        denom: "transfer/channel-20/factory/osmo1qnglc04tmhg32uc4kxlxh55a5cmhj88cpa3rmtly484xqu82t79sfv94w0/alloyed/allXRP"
      },
      {
        denom: "transfer/channel-20/allXRP",
        exponent: 6
      }
    ],
    base: "transfer/channel-20/factory/osmo1qnglc04tmhg32uc4kxlxh55a5cmhj88cpa3rmtly484xqu82t79sfv94w0/alloyed/allXRP",
    display: "transfer/channel-20/allXRP",
    name: "Ripple",
    symbol: "XRP",
    penumbraAssetId: {
      inner: "2iqxPGHxW2TYNdH+v+s/t2dbzTQG1vyWJtul6BzsdQc="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/xrpl/images/xrp.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/xrpl/images/xrp.svg",
        theme: {
          primaryColorHex: "#c8c8c8"
        }
      }
    ]
  },
  "2k9aUF4SL9uEXl02lWocY2g1z2gkPQEFu+1glmZJngw=": {
    denomUnits: [
      {
        denom: "transfer/channel-7/sfrxeth-wei"
      },
      {
        denom: "transfer/channel-7/sfrxeth",
        exponent: 18
      }
    ],
    base: "transfer/channel-7/sfrxeth-wei",
    display: "transfer/channel-7/sfrxeth",
    name: "Staked Frax Ether",
    symbol: "sfrxETH",
    penumbraAssetId: {
      inner: "2k9aUF4SL9uEXl02lWocY2g1z2gkPQEFu+1glmZJngw="
    },
    images: [
      {
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/ethereum/images/sfrxeth.svg",
        theme: {
          primaryColorHex: "#c8c8c8"
        }
      }
    ]
  },
  "2ml14g3KHeDrNcJtIWAmNGk9TDxMHU567QvBtTyFeA0=": {
    description: "COOK is the governance token for Start.Cooking, the premier token factory on Cosmos.",
    denomUnits: [
      {
        denom: "transfer/channel-20/factory/osmo1q77cw0mmlluxu0wr29fcdd0tdnh78gzhkvhe4n6ulal9qvrtu43qtd0nh8/COOK"
      },
      {
        denom: "transfer/channel-20/COOK",
        exponent: 6
      }
    ],
    base: "transfer/channel-20/factory/osmo1q77cw0mmlluxu0wr29fcdd0tdnh78gzhkvhe4n6ulal9qvrtu43qtd0nh8/COOK",
    display: "transfer/channel-20/COOK",
    name: "COOK",
    symbol: "COOK",
    penumbraAssetId: {
      inner: "2ml14g3KHeDrNcJtIWAmNGk9TDxMHU567QvBtTyFeA0="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/COOK.png",
        theme: {
          primaryColorHex: "#f7bca7"
        }
      }
    ]
  },
  "2p0X6bSqkay2n8G0hPGIsaaZt9oDz6v48YEAOCcHuwg=": {
    description: "A synthetic version of USDT issued by Router, which can be unwrapped to USDT on several chains.",
    denomUnits: [
      {
        denom: "transfer/channel-20/factory/osmo1myv2g72h8dan7n4hx7stt3mmust6ws03zh6gxc7vz4hpmgp5z3lq9aunm9/USDT.rt"
      },
      {
        denom: "transfer/channel-20/usdt",
        exponent: 6
      }
    ],
    base: "transfer/channel-20/factory/osmo1myv2g72h8dan7n4hx7stt3mmust6ws03zh6gxc7vz4hpmgp5z3lq9aunm9/USDT.rt",
    display: "transfer/channel-20/usdt",
    name: "Tether USD (Ethereum via Router)",
    symbol: "USDT.eth.rt",
    penumbraAssetId: {
      inner: "2p0X6bSqkay2n8G0hPGIsaaZt9oDz6v48YEAOCcHuwg="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/ethereum/images/usdt.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/ethereum/images/usdt.svg",
        theme: {
          primaryColorHex: "#049393"
        }
      }
    ]
  },
  "2xS/1WB0QswaA59huaDnxz14eoyg+nj9fyTpWktxpRE=": {
    description: "Axie Infinity Shard on Axelar",
    denomUnits: [
      {
        denom: "transfer/channel-7/axs-wei"
      },
      {
        denom: "transfer/channel-7/axs",
        exponent: 18
      }
    ],
    base: "transfer/channel-7/axs-wei",
    display: "transfer/channel-7/axs",
    name: "Axie Infinity Shard",
    symbol: "AXS",
    penumbraAssetId: {
      inner: "2xS/1WB0QswaA59huaDnxz14eoyg+nj9fyTpWktxpRE="
    },
    images: [
      {
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/ethereum/images/axs.svg",
        theme: {
          primaryColorHex: "#0454d3"
        }
      }
    ]
  },
  "2y7gnWr1oRWGPkc7pESx5PCHkHdNuNcdPJXQSHOOuAM=": {
    description: "An alloy of DYDX asset variants on Osmosis.",
    denomUnits: [
      {
        denom: "transfer/channel-20/factory/osmo1zem8r6dv6u38f6qpg546zy30946av8h5srgug0s4gcyy6cfecf3seac083/alloyed/allDYDX"
      },
      {
        denom: "transfer/channel-20/allDYDX",
        exponent: 12
      }
    ],
    base: "transfer/channel-20/factory/osmo1zem8r6dv6u38f6qpg546zy30946av8h5srgug0s4gcyy6cfecf3seac083/alloyed/allDYDX",
    display: "transfer/channel-20/allDYDX",
    name: "dYdX Protocol",
    symbol: "allDYDX",
    penumbraAssetId: {
      inner: "2y7gnWr1oRWGPkc7pESx5PCHkHdNuNcdPJXQSHOOuAM="
    },
    images: [
      {
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/dydx/images/dydx-circle.svg",
        theme: {
          primaryColorHex: "#d0d0d3"
        }
      },
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/dydx/images/dydx.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/dydx/images/dydx.svg",
        theme: {
          primaryColorHex: "#d3d3d5"
        }
      }
    ]
  },
  "3+pvzSlOgqbNjrWLu+IyLn1VNVqDHTjYzS1eHw5VFgM=": {
    description: "ION is the second native token of Osmosis.",
    denomUnits: [
      {
        denom: "transfer/channel-20/uion"
      },
      {
        denom: "transfer/channel-20/ion",
        exponent: 6
      }
    ],
    base: "transfer/channel-20/uion",
    display: "transfer/channel-20/ion",
    name: "Ion DAO",
    symbol: "ION",
    penumbraAssetId: {
      inner: "3+pvzSlOgqbNjrWLu+IyLn1VNVqDHTjYzS1eHw5VFgM="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/ion.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/ion.svg",
        theme: {
          primaryColorHex: "#90cfde"
        }
      }
    ],
    coingeckoId: "ion"
  },
  "3BjmjkGGlQwMPQBtXrN/WFMuW3V2oQYgxmnISUBf8Ag=": {
    description: "ashION - Burned ION",
    denomUnits: [
      {
        denom: "transfer/channel-20/factory/osmo1svj5kd8kzj7xxtrd6ftjk0856ffpyj4egz7f9pd9dge5wr4kwansmefq07/ion.ash"
      },
      {
        denom: "transfer/channel-20/ashION",
        exponent: 6
      }
    ],
    base: "transfer/channel-20/factory/osmo1svj5kd8kzj7xxtrd6ftjk0856ffpyj4egz7f9pd9dge5wr4kwansmefq07/ion.ash",
    display: "transfer/channel-20/ashION",
    name: "Burned ION",
    symbol: "ashION",
    penumbraAssetId: {
      inner: "3BjmjkGGlQwMPQBtXrN/WFMuW3V2oQYgxmnISUBf8Ag="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/ashion.png",
        theme: {
          primaryColorHex: "#479df0"
        }
      }
    ]
  },
  "3S8ichX6hmgJ59R/rk60YHoNMUW9tjgFdCxJof5/xgs=": {
    description: "A receipt token for lent USDT issued by the Neptune Protocol.",
    denomUnits: [
      {
        denom: "transfer/channel-18/inj1cy9hes20vww2yr6crvs75gxy5hpycya2hmjg9s"
      },
      {
        denom: "transfer/channel-18/nUSDT",
        exponent: 6
      }
    ],
    base: "transfer/channel-18/inj1cy9hes20vww2yr6crvs75gxy5hpycya2hmjg9s",
    display: "transfer/channel-18/nUSDT",
    name: "Neptune Receipt USDT",
    symbol: "nUSDT",
    penumbraAssetId: {
      inner: "3S8ichX6hmgJ59R/rk60YHoNMUW9tjgFdCxJof5/xgs="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/injective/images/nusdt.png",
        theme: {
          primaryColorHex: "#54ac94"
        }
      }
    ]
  },
  "3iA9anFxe2oS0eun85y2l6f77wnK78c31GVrLFgltgI=": {
    description: "Dai stablecoin on Axelar",
    denomUnits: [
      {
        denom: "transfer/channel-7/dai-wei"
      },
      {
        denom: "transfer/channel-7/dai",
        exponent: 18
      }
    ],
    base: "transfer/channel-7/dai-wei",
    display: "transfer/channel-7/dai",
    name: "Dai Stablecoin",
    symbol: "DAI",
    penumbraAssetId: {
      inner: "3iA9anFxe2oS0eun85y2l6f77wnK78c31GVrLFgltgI="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/axelar/images/dai.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/axelar/images/dai.svg",
        theme: {
          primaryColorHex: "#f3ab34"
        }
      }
    ]
  },
  "3jBzXlXvGMufL9A2BPgfYkOLvPGQqMvuzHJw1ZIstQU=": {
    description: "ApeCoin on Axelar",
    denomUnits: [
      {
        denom: "transfer/channel-7/ape-wei"
      },
      {
        denom: "transfer/channel-7/ape",
        exponent: 18
      }
    ],
    base: "transfer/channel-7/ape-wei",
    display: "transfer/channel-7/ape",
    name: "ApeCoin",
    symbol: "APE",
    penumbraAssetId: {
      inner: "3jBzXlXvGMufL9A2BPgfYkOLvPGQqMvuzHJw1ZIstQU="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/ethereum/images/ape.png",
        theme: {
          primaryColorHex: "#040404"
        }
      }
    ]
  },
  "3zeuvXpzbdHCL1t6Ih846Vep6iiyEWyCpLpVXgrJaRA=": {
    description: "An alloy of USD asset variants on Osmosis.",
    denomUnits: [
      {
        denom: "transfer/channel-4/factory/osmo1t82ql2w69m9g3un7c6sk5wss578ewst2uscr7zdkn6k8rmzc3e8qz9n4q2/alloyed/allUSD"
      },
      {
        denom: "transfer/channel-4/allUSD",
        exponent: 6
      }
    ],
    base: "transfer/channel-4/factory/osmo1t82ql2w69m9g3un7c6sk5wss578ewst2uscr7zdkn6k8rmzc3e8qz9n4q2/alloyed/allUSD",
    display: "transfer/channel-4/allUSD",
    name: "Osmosis Alloyed USD",
    symbol: "allUSD.ch4",
    penumbraAssetId: {
      inner: "3zeuvXpzbdHCL1t6Ih846Vep6iiyEWyCpLpVXgrJaRA="
    },
    images: [
      {
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/usd.svg",
        theme: {
          primaryColorHex: "#0454b4"
        }
      }
    ]
  },
  "43MGNOeNet0OxyIjo7ENmIJ1Sr2p6ALAK5gygAIFDwg=": {
    description: "NEWTROLL",
    denomUnits: [
      {
        denom: "transfer/channel-9/factory/neutron1ume2n42r5j0660gegrr28fzdze7aqf7r5cd9y6/newtroll"
      },
      {
        denom: "transfer/channel-9/newtroll",
        exponent: 6
      }
    ],
    base: "transfer/channel-9/factory/neutron1ume2n42r5j0660gegrr28fzdze7aqf7r5cd9y6/newtroll",
    display: "transfer/channel-9/newtroll",
    name: "Newtroll",
    symbol: "NTRL",
    penumbraAssetId: {
      inner: "43MGNOeNet0OxyIjo7ENmIJ1Sr2p6ALAK5gygAIFDwg="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/neutron/images/newtroll.png",
        theme: {
          primaryColorHex: "#dfeaeb"
        }
      }
    ]
  },
  "4KwdCQTdeO7QlJcEObIlASWEvnox5L+BKXzfZHohgwA=": {
    description: "Astrovault xATOM on Neutron Chain",
    denomUnits: [
      {
        denom: "transfer/channel-9/cw20:neutron1vjl4ze7gr32lar5s4fj776v70j4ml7mlt4aqln2hwgfhqjck8xwqfhx8vj"
      },
      {
        denom: "transfer/channel-9/xATOM",
        exponent: 6
      }
    ],
    base: "transfer/channel-9/cw20:neutron1vjl4ze7gr32lar5s4fj776v70j4ml7mlt4aqln2hwgfhqjck8xwqfhx8vj",
    display: "transfer/channel-9/xATOM",
    name: "Astrovault xATOM (Neutron)",
    symbol: "xATOM",
    penumbraAssetId: {
      inner: "4KwdCQTdeO7QlJcEObIlASWEvnox5L+BKXzfZHohgwA="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/neutron/images/xatom.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/neutron/images/xatom.svg",
        theme: {
          primaryColorHex: "#0cd9c3"
        }
      }
    ]
  },
  "4S24boIE2iFGH9vme1ztzP/2HnNCij4BFV+v7XE+jgg=": {
    denomUnits: [
      {
        denom: "transfer/channel-7/pepe-wei"
      },
      {
        denom: "transfer/channel-7/pepe",
        exponent: 18
      }
    ],
    base: "transfer/channel-7/pepe-wei",
    display: "transfer/channel-7/pepe",
    name: "Pepe",
    symbol: "axlPEPE",
    penumbraAssetId: {
      inner: "4S24boIE2iFGH9vme1ztzP/2HnNCij4BFV+v7XE+jgg="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/ethereum/images/pepe.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/ethereum/images/pepe.svg",
        theme: {
          primaryColorHex: "#c5282e"
        }
      }
    ]
  },
  "4SyJhOnRdGZ1QCskCW2dlvvGRecy7pTphIUFNicfTw0=": {
    description: "Talis governance token",
    denomUnits: [
      {
        denom: "transfer/channel-18/factory/inj1maeyvxfamtn8lfyxpjca8kuvauuf2qeu6gtxm3/Talis"
      },
      {
        denom: "transfer/channel-18/Talis",
        exponent: 6
      }
    ],
    base: "transfer/channel-18/factory/inj1maeyvxfamtn8lfyxpjca8kuvauuf2qeu6gtxm3/Talis",
    display: "transfer/channel-18/Talis",
    name: "Talis Token",
    symbol: "TALIS",
    penumbraAssetId: {
      inner: "4SyJhOnRdGZ1QCskCW2dlvvGRecy7pTphIUFNicfTw0="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/injective/images/talis.png",
        theme: {
          primaryColorHex: "#05e13e"
        }
      }
    ]
  },
  "4jHUqvDhiWLxTDhiYpfkqDCWZJ8vyKtT+NPB6r8PVAM=": {
    description: "Tether's USD stablecoin from Polygon on Axelar",
    denomUnits: [
      {
        denom: "transfer/channel-7/polygon-uusdt"
      },
      {
        denom: "transfer/channel-7/usdt",
        exponent: 6
      }
    ],
    base: "transfer/channel-7/polygon-uusdt",
    display: "transfer/channel-7/usdt",
    name: "Tether USD (Polygon)",
    symbol: "axlUSDT.polygon",
    penumbraAssetId: {
      inner: "4jHUqvDhiWLxTDhiYpfkqDCWZJ8vyKtT+NPB6r8PVAM="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/ethereum/images/usdt.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/ethereum/images/usdt.svg",
        theme: {
          primaryColorHex: "#049393"
        }
      }
    ]
  },
  "4nZ1TdLedKzescXln5u5SjhIhOm9tyLvtuMY856P0gw=": {
    description: "The memecoin built for the Celestia community",
    denomUnits: [
      {
        denom: "transfer/channel-20/factory/osmo1nr8zfakf6jauye3uqa9lrmr5xumee5n42lv92z/toro"
      },
      {
        denom: "transfer/channel-20/toro",
        exponent: 6
      }
    ],
    base: "transfer/channel-20/factory/osmo1nr8zfakf6jauye3uqa9lrmr5xumee5n42lv92z/toro",
    display: "transfer/channel-20/toro",
    name: "TORO",
    symbol: "TORO",
    penumbraAssetId: {
      inner: "4nZ1TdLedKzescXln5u5SjhIhOm9tyLvtuMY856P0gw="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/toro.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/toro.svg",
        theme: {
          primaryColorHex: "#d9bedd"
        }
      }
    ]
  },
  "4oyjsrIftezXMm5xBVMef2Pn+dhkEx1GFwIOniiPnQw=": {
    description: "wLibra is a bridged version of Libra Coin from 0L Network via LibraBridge.",
    denomUnits: [
      {
        denom: "transfer/channel-4/factory/osmo19hdqma2mj0vnmgcxag6ytswjnr8a3y07q7e70p/wLIBRA"
      },
      {
        denom: "transfer/channel-4/wLIBRA",
        exponent: 6
      }
    ],
    base: "transfer/channel-4/factory/osmo19hdqma2mj0vnmgcxag6ytswjnr8a3y07q7e70p/wLIBRA",
    display: "transfer/channel-4/wLIBRA",
    name: "Wrapped Libra Coin (LibraBridge)",
    symbol: "wLIBRA.ch4",
    penumbraAssetId: {
      inner: "4oyjsrIftezXMm5xBVMef2Pn+dhkEx1GFwIOniiPnQw="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/0l/images/libra.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/0l/images/libra.svg",
        theme: {
          primaryColorHex: "#e45c5c"
        }
      }
    ]
  },
  "4rBRD1He9RNXc+6+KOw1vCKG7ZsLWqOVL4NRWdbKDQc=": {
    description: "TRONIX is the mainnet native token of the TRON Protocol issued by TRON DAO, known as TRX.",
    denomUnits: [
      {
        denom: "transfer/channel-4/factory/osmo14mafhhp337yjj2aujplawz0tks6jd2lel4hkwz4agyzhvvztzaqsqzjq8x/alloyed/allTRX"
      },
      {
        denom: "transfer/channel-4/trx",
        exponent: 6
      }
    ],
    base: "transfer/channel-4/factory/osmo14mafhhp337yjj2aujplawz0tks6jd2lel4hkwz4agyzhvvztzaqsqzjq8x/alloyed/allTRX",
    display: "transfer/channel-4/trx",
    name: "Tron",
    symbol: "TRX.ch4",
    penumbraAssetId: {
      inner: "4rBRD1He9RNXc+6+KOw1vCKG7ZsLWqOVL4NRWdbKDQc="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/tron/images/trx.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/tron/images/trx.svg",
        theme: {
          primaryColorHex: "#fb040c"
        }
      }
    ],
    priorityScore: "4000000000",
    coingeckoId: "trx"
  },
  "4zJUpIiC0Z24kiyTmDPbH6D2R27UhNu8eTJI7o6YaQ0=": {
    description: "GSI is the native digital asset of Grey Stone Incorporated, engineered to function as a leveraged Bitcoin proxy through proprietary automated market maker configuration methodologies.",
    denomUnits: [
      {
        denom: "transfer/channel-4/factory/osmo187hj0cr8csrhzm8ukzsp53vc0cfp338ftacy7j/gsi"
      },
      {
        denom: "transfer/channel-4/gsi",
        exponent: 6
      }
    ],
    base: "transfer/channel-4/factory/osmo187hj0cr8csrhzm8ukzsp53vc0cfp338ftacy7j/gsi",
    display: "transfer/channel-4/gsi",
    name: "Grey Stone Incorporated",
    symbol: "GSI.ch4",
    penumbraAssetId: {
      inner: "4zJUpIiC0Z24kiyTmDPbH6D2R27UhNu8eTJI7o6YaQ0="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/gsi.png",
        theme: {
          primaryColorHex: "#bebebe"
        }
      }
    ]
  },
  "5B0jxWP9LX+U4uD7aU9OVsIk0U385uD2q+a2eEerHg0=": {
    description: "Cosmos Airdrop Chat",
    denomUnits: [
      {
        denom: "transfer/channel-4/factory/osmo1q77cw0mmlluxu0wr29fcdd0tdnh78gzhkvhe4n6ulal9qvrtu43qtd0nh8/cac"
      },
      {
        denom: "transfer/channel-4/CAC",
        exponent: 6
      }
    ],
    base: "transfer/channel-4/factory/osmo1q77cw0mmlluxu0wr29fcdd0tdnh78gzhkvhe4n6ulal9qvrtu43qtd0nh8/cac",
    display: "transfer/channel-4/CAC",
    name: "Cosmos Airdrop Chat",
    symbol: "CAC.ch4",
    penumbraAssetId: {
      inner: "5B0jxWP9LX+U4uD7aU9OVsIk0U385uD2q+a2eEerHg0="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/CAC.png",
        theme: {
          primaryColorHex: "#190552"
        }
      }
    ]
  },
  "5J/z8GuWKseaZ/aEhmQKbKYtVzsmUd9I1f2oi+xi2Qs=": {
    description: "pARTy (ART) - where art meets party in the interchain. A fair-launched community art token minted natively on Cosmos Hub via tokenfactory.",
    denomUnits: [
      {
        denom: "transfer/channel-0/factory/cosmos1w9ee57gnduzm4l9h6xwn9tee9pyh8wlr4r9r35/art"
      },
      {
        denom: "transfer/channel-0/art",
        exponent: 6
      }
    ],
    base: "transfer/channel-0/factory/cosmos1w9ee57gnduzm4l9h6xwn9tee9pyh8wlr4r9r35/art",
    display: "transfer/channel-0/art",
    name: "pARTy",
    symbol: "ART.ch0",
    penumbraAssetId: {
      inner: "5J/z8GuWKseaZ/aEhmQKbKYtVzsmUd9I1f2oi+xi2Qs="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/cosmoshub/images/art.png",
        theme: {
          primaryColorHex: "#c3765c"
        }
      }
    ]
  },
  "5QjC25GYK9LOU39kjHGYTS9tJSAiPNuDl/RDnNLxaBE=": {
    description: "Uhm, Power Bottom",
    denomUnits: [
      {
        denom: "transfer/channel-4/factory/osmo1q77cw0mmlluxu0wr29fcdd0tdnh78gzhkvhe4n6ulal9qvrtu43qtd0nh8/pbb"
      },
      {
        denom: "transfer/channel-4/PBB",
        exponent: 6
      }
    ],
    base: "transfer/channel-4/factory/osmo1q77cw0mmlluxu0wr29fcdd0tdnh78gzhkvhe4n6ulal9qvrtu43qtd0nh8/pbb",
    display: "transfer/channel-4/PBB",
    name: "Power Bottom",
    symbol: "PBB.ch4",
    penumbraAssetId: {
      inner: "5QjC25GYK9LOU39kjHGYTS9tJSAiPNuDl/RDnNLxaBE="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/PBB.png",
        theme: {
          primaryColorHex: "#f31414"
        }
      }
    ]
  },
  "5S97EVlmU2mSEj0DV8HSLv5+Q1Wn4dyk3ZXgAeRiGgs=": {
    description: "Formation Of $hit Tokens",
    denomUnits: [
      {
        denom: "transfer/channel-4/factory/osmo1q77cw0mmlluxu0wr29fcdd0tdnh78gzhkvhe4n6ulal9qvrtu43qtd0nh8/fost"
      },
      {
        denom: "transfer/channel-4/FOST",
        exponent: 6
      }
    ],
    base: "transfer/channel-4/factory/osmo1q77cw0mmlluxu0wr29fcdd0tdnh78gzhkvhe4n6ulal9qvrtu43qtd0nh8/fost",
    display: "transfer/channel-4/FOST",
    name: "Fost",
    symbol: "FOST.ch4",
    penumbraAssetId: {
      inner: "5S97EVlmU2mSEj0DV8HSLv5+Q1Wn4dyk3ZXgAeRiGgs="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/FOST.png",
        theme: {
          primaryColorHex: "#201604"
        }
      }
    ]
  },
  "63+dQ57ItK/VCG1qf4GTHVEWF8SXs6vppRKmmVmmMQo=": {
    description: "Rai Reflex Index on Axelar",
    denomUnits: [
      {
        denom: "transfer/channel-7/rai-wei"
      },
      {
        denom: "transfer/channel-7/rai",
        exponent: 18
      }
    ],
    base: "transfer/channel-7/rai-wei",
    display: "transfer/channel-7/rai",
    name: "Rai Reflex Index",
    symbol: "RAI",
    penumbraAssetId: {
      inner: "63+dQ57ItK/VCG1qf4GTHVEWF8SXs6vppRKmmVmmMQo="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/ethereum/images/rai.png",
        theme: {
          primaryColorHex: "#040504"
        }
      }
    ]
  },
  "6BcP7AowU/QXFjfqhtysWRWN8MxY7liN8miezOyUYg0=": {
    description: "Avail is a web3 infrastructure layer that allows modular execution layers to scale and interoperate in a trust minimized way.",
    denomUnits: [
      {
        denom: "transfer/channel-20/factory/osmo1myv2g72h8dan7n4hx7stt3mmust6ws03zh6gxc7vz4hpmgp5z3lq9aunm9/AVAIL.rt"
      },
      {
        denom: "transfer/channel-20/AVAIL",
        exponent: 18
      }
    ],
    base: "transfer/channel-20/factory/osmo1myv2g72h8dan7n4hx7stt3mmust6ws03zh6gxc7vz4hpmgp5z3lq9aunm9/AVAIL.rt",
    display: "transfer/channel-20/AVAIL",
    name: "Avail (Ethereum via Router)",
    symbol: "AVAIL.eth.rt",
    penumbraAssetId: {
      inner: "6BcP7AowU/QXFjfqhtysWRWN8MxY7liN8miezOyUYg0="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/avail/images/avail.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/avail/images/avail.svg",
        theme: {
          primaryColorHex: "#3cb5eb"
        }
      }
    ]
  },
  "6IDer/CFuwr5OgoPj6GSy2bpLVON6aQdfFibMsRMrAU=": {
    description: "SinGarden token",
    denomUnits: [
      {
        denom: "transfer/channel-9/factory/neutron133xakkrfksq39wxy575unve2nyehg5npx75nph/sin"
      },
      {
        denom: "transfer/channel-9/SIN",
        exponent: 6
      }
    ],
    base: "transfer/channel-9/factory/neutron133xakkrfksq39wxy575unve2nyehg5npx75nph/sin",
    display: "transfer/channel-9/SIN",
    name: "SIN",
    symbol: "SIN",
    penumbraAssetId: {
      inner: "6IDer/CFuwr5OgoPj6GSy2bpLVON6aQdfFibMsRMrAU="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/neutron/images/sin.png",
        theme: {
          primaryColorHex: "#cecece"
        }
      }
    ]
  },
  "6OSUf8+orUcMxjFsM/EslwctDAE6+PBBBgf3PojNTw8=": {
    description: "An alloy of USDT asset variants on Osmosis.",
    denomUnits: [
      {
        denom: "transfer/channel-20/factory/osmo1em6xs47hd82806f5cxgyufguxrrc7l0aqx7nzzptjuqgswczk8csavdxek/alloyed/allUSDT"
      },
      {
        denom: "transfer/channel-20/allUSDT",
        exponent: 6
      }
    ],
    base: "transfer/channel-20/factory/osmo1em6xs47hd82806f5cxgyufguxrrc7l0aqx7nzzptjuqgswczk8csavdxek/alloyed/allUSDT",
    display: "transfer/channel-20/allUSDT",
    name: "Tether USD",
    symbol: "allUSDT",
    penumbraAssetId: {
      inner: "6OSUf8+orUcMxjFsM/EslwctDAE6+PBBBgf3PojNTw8="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/ethereum/images/usdt.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/ethereum/images/usdt.svg",
        theme: {
          primaryColorHex: "#049393"
        }
      },
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/ethereum/images/usdt_logomark.png",
        theme: {
          primaryColorHex: "#53ac94"
        }
      }
    ],
    priorityScore: "700000000000",
    coingeckoId: "osmosis-allusdt"
  },
  "6xVpui0Nmgiigj/S+3zZQBWeHAhDcMxkvISwiL2Npg8=": {
    description: "An alloy of BCH asset variants on Osmosis.",
    denomUnits: [
      {
        denom: "transfer/channel-4/factory/osmo1cranx3twqxfrgeqvgsu262gy54vafpc9xap6scye99v244zl970s7kw2sz/alloyed/allBCH"
      },
      {
        denom: "transfer/channel-4/allBCH",
        exponent: 8
      }
    ],
    base: "transfer/channel-4/factory/osmo1cranx3twqxfrgeqvgsu262gy54vafpc9xap6scye99v244zl970s7kw2sz/alloyed/allBCH",
    display: "transfer/channel-4/allBCH",
    name: "Bitcoin Cash",
    symbol: "BCH.ch4",
    penumbraAssetId: {
      inner: "6xVpui0Nmgiigj/S+3zZQBWeHAhDcMxkvISwiL2Npg8="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/bitcoincash/images/bch.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/bitcoincash/images/bch.svg",
        theme: {
          primaryColorHex: "#0cc38b"
        }
      }
    ]
  },
  "6zEm1cTHN1PsueimuNxC+6S/t6uDYRdhbitgkUV9IxE=": {
    description: "MilkyWay's liquid staked TIA",
    denomUnits: [
      {
        denom: "transfer/channel-4/factory/osmo1f5vfcph2dvfeqcqkhetwv75fda69z7e5c2dldm3kvgj23crkv6wqcn47a0/umilkTIA"
      },
      {
        denom: "transfer/channel-4/milkTIA",
        exponent: 6
      }
    ],
    base: "transfer/channel-4/factory/osmo1f5vfcph2dvfeqcqkhetwv75fda69z7e5c2dldm3kvgj23crkv6wqcn47a0/umilkTIA",
    display: "transfer/channel-4/milkTIA",
    name: "milkTIA",
    symbol: "milkTIA.ch4",
    penumbraAssetId: {
      inner: "6zEm1cTHN1PsueimuNxC+6S/t6uDYRdhbitgkUV9IxE="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/milktia.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/milktia.svg",
        theme: {
          primaryColorHex: "#d08dfb"
        }
      }
    ],
    coingeckoId: "milktia"
  },
  "7C8UKtz0L3WMutEXjvtXsSLxc2c8821ZJ6b0/V2fkAw=": {
    description: "A receipt token for lent INJ issued by the Neptune Protocol.",
    denomUnits: [
      {
        denom: "transfer/channel-18/inj1rmzufd7h09sqfrre5dtvu5d09ta7c0t4jzkr2f"
      },
      {
        denom: "transfer/channel-18/nINJ",
        exponent: 18
      }
    ],
    base: "transfer/channel-18/inj1rmzufd7h09sqfrre5dtvu5d09ta7c0t4jzkr2f",
    display: "transfer/channel-18/nINJ",
    name: "Neptune Receipt INJ",
    symbol: "nINJ",
    penumbraAssetId: {
      inner: "7C8UKtz0L3WMutEXjvtXsSLxc2c8821ZJ6b0/V2fkAw="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/injective/images/ninj.png",
        theme: {
          primaryColorHex: "#19b1f6"
        }
      }
    ]
  },
  "7SqPa62VX7e0Er/NRqT63BoL7iwH/n/yttPfiFko8QI=": {
    description: "An alloy of AIOZ asset variants on Osmosis.",
    denomUnits: [
      {
        denom: "transfer/channel-20/factory/osmo17ceugf0nnkk228k2sulemn0s9pl3yg554462eexxs3pgq8p629us98gqae/alloyed/allAIOZ"
      },
      {
        denom: "transfer/channel-20/allAIOZ",
        exponent: 12
      }
    ],
    base: "transfer/channel-20/factory/osmo17ceugf0nnkk228k2sulemn0s9pl3yg554462eexxs3pgq8p629us98gqae/alloyed/allAIOZ",
    display: "transfer/channel-20/allAIOZ",
    name: "AIOZ Network",
    symbol: "AIOZ",
    penumbraAssetId: {
      inner: "7SqPa62VX7e0Er/NRqT63BoL7iwH/n/yttPfiFko8QI="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/aioz/images/aioz.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/aioz/images/aioz.svg",
        theme: {
          primaryColorHex: "#23231b"
        }
      }
    ]
  },
  "7Vf/lL80Mu4FfmwBVKjo++cp15ZLn1aUPZukApt4AA0=": {
    description: "An alloy of XRP asset variants on Osmosis.",
    denomUnits: [
      {
        denom: "transfer/channel-4/factory/osmo1qnglc04tmhg32uc4kxlxh55a5cmhj88cpa3rmtly484xqu82t79sfv94w0/alloyed/allXRP"
      },
      {
        denom: "transfer/channel-4/allXRP",
        exponent: 6
      }
    ],
    base: "transfer/channel-4/factory/osmo1qnglc04tmhg32uc4kxlxh55a5cmhj88cpa3rmtly484xqu82t79sfv94w0/alloyed/allXRP",
    display: "transfer/channel-4/allXRP",
    name: "Ripple",
    symbol: "XRP.ch4",
    penumbraAssetId: {
      inner: "7Vf/lL80Mu4FfmwBVKjo++cp15ZLn1aUPZukApt4AA0="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/xrpl/images/xrp.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/xrpl/images/xrp.svg",
        theme: {
          primaryColorHex: "#c8c8c8"
        }
      }
    ]
  },
  "7XE2sxLyZisypl6pZwkaxgvEUuR/2nwAEe2NGan2zg0=": {
    description: "An alloy of ARB asset variants on Osmosis.",
    denomUnits: [
      {
        denom: "transfer/channel-20/factory/osmo1p7x454ex08s4f9ztmm7wfv7lvtgdkfztj2u7v7fezfcauy85q35qmqrdpk/alloyed/allARB"
      },
      {
        denom: "transfer/channel-20/arb",
        exponent: 12
      }
    ],
    base: "transfer/channel-20/factory/osmo1p7x454ex08s4f9ztmm7wfv7lvtgdkfztj2u7v7fezfcauy85q35qmqrdpk/alloyed/allARB",
    display: "transfer/channel-20/arb",
    name: "Arbitrum",
    symbol: "allARB",
    penumbraAssetId: {
      inner: "7XE2sxLyZisypl6pZwkaxgvEUuR/2nwAEe2NGan2zg0="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/arbitrum/images/arb.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/arbitrum/images/arb.svg",
        theme: {
          primaryColorHex: "#9dcceb"
        }
      }
    ],
    priorityScore: "500000000000",
    coingeckoId: "arbitrum"
  },
  "7eT7kabmjqSa7k1bTrPQUSjHS5Watuq/X+3tW5usjA4=": {
    description: "WEIRD FRIENDS token",
    denomUnits: [
      {
        denom: "transfer/channel-9/factory/neutron133xakkrfksq39wxy575unve2nyehg5npx75nph/WEIRD"
      },
      {
        denom: "transfer/channel-9/WEIRD",
        exponent: 6
      }
    ],
    base: "transfer/channel-9/factory/neutron133xakkrfksq39wxy575unve2nyehg5npx75nph/WEIRD",
    display: "transfer/channel-9/WEIRD",
    name: "WEIRD",
    symbol: "WEIRD",
    penumbraAssetId: {
      inner: "7eT7kabmjqSa7k1bTrPQUSjHS5Watuq/X+3tW5usjA4="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/neutron/images/WEIRD.png",
        theme: {
          primaryColorHex: "#688ec9"
        }
      }
    ]
  },
  "7zuUYv+TkccghFJqgKeyv/JmydEK02B7fVtFqAwhxAc=": {
    description: "A receipt token for lent ATOM issued by the Neptune Protocol.",
    denomUnits: [
      {
        denom: "transfer/channel-18/inj16jf4qkcarp3lan4wl2qkrelf4kduvvujwg0780"
      },
      {
        denom: "transfer/channel-18/nATOM",
        exponent: 6
      }
    ],
    base: "transfer/channel-18/inj16jf4qkcarp3lan4wl2qkrelf4kduvvujwg0780",
    display: "transfer/channel-18/nATOM",
    name: "Neptune Receipt ATOM",
    symbol: "nATOM",
    penumbraAssetId: {
      inner: "7zuUYv+TkccghFJqgKeyv/JmydEK02B7fVtFqAwhxAc="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/injective/images/natom.png",
        theme: {
          primaryColorHex: "#161a27"
        }
      }
    ]
  },
  "8RPKCPIUN1js8AYW/fSncylaYcCg+XYm98i3fbqdRwU=": {
    description: "T7S is the utility and governance token of TheSevens - a community driven project offering NFT tools, on-chain games, staking rewards and more via our Webpage. Stakers earn multiple tokens, vote on proposals.",
    denomUnits: [
      {
        denom: "transfer/channel-4/factory/osmo1q77cw0mmlluxu0wr29fcdd0tdnh78gzhkvhe4n6ulal9qvrtu43qtd0nh8/t7s"
      },
      {
        denom: "transfer/channel-4/T7S",
        exponent: 6
      }
    ],
    base: "transfer/channel-4/factory/osmo1q77cw0mmlluxu0wr29fcdd0tdnh78gzhkvhe4n6ulal9qvrtu43qtd0nh8/t7s",
    display: "transfer/channel-4/T7S",
    name: "The Sevens",
    symbol: "T7S.ch4",
    penumbraAssetId: {
      inner: "8RPKCPIUN1js8AYW/fSncylaYcCg+XYm98i3fbqdRwU="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/T7S.png",
        theme: {
          primaryColorHex: "#31f244"
        }
      }
    ]
  },
  "8SUSbNQv+PP0hbTduAuvfx98/GKjGtVMC7Mz2KAp7wQ=": {
    description: "Lombard Staked Bitcoin on Axelar",
    denomUnits: [
      {
        denom: "transfer/channel-7/lbtc-satoshi"
      },
      {
        denom: "transfer/channel-7/lbtc",
        exponent: 8
      }
    ],
    base: "transfer/channel-7/lbtc-satoshi",
    display: "transfer/channel-7/lbtc",
    name: "Lombard Staked Bitcoin",
    symbol: "axlLBTC",
    penumbraAssetId: {
      inner: "8SUSbNQv+PP0hbTduAuvfx98/GKjGtVMC7Mz2KAp7wQ="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/ethereum/images/lbtc.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/ethereum/images/lbtc.svg",
        theme: {
          primaryColorHex: "#c1faf1"
        }
      }
    ]
  },
  "8hfHJTwuJitG4smbML+fbyySTUqKEPG7vN141EjqiAc=": {
    description: "The Spice memecoin",
    denomUnits: [
      {
        denom: "transfer/channel-20/factory/osmo1n6asrjy9754q8y9jsxqf557zmsv3s3xa5m9eg5/uspice"
      },
      {
        denom: "transfer/channel-20/Spice",
        exponent: 6
      }
    ],
    base: "transfer/channel-20/factory/osmo1n6asrjy9754q8y9jsxqf557zmsv3s3xa5m9eg5/uspice",
    display: "transfer/channel-20/Spice",
    name: "Spice",
    symbol: "SPICE",
    penumbraAssetId: {
      inner: "8hfHJTwuJitG4smbML+fbyySTUqKEPG7vN141EjqiAc="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/spice.png",
        theme: {
          primaryColorHex: "#dbbf7d"
        }
      }
    ],
    coingeckoId: "spice-2"
  },
  "8sSKWMnV4A30a8bY3epIFmm2RWGsLtHRFp8sBcCWJhI=": {
    denomUnits: [
      {
        denom: "transfer/channel-21/erc20/tether/usdt"
      },
      {
        denom: "transfer/channel-21/usdt",
        exponent: 6
      }
    ],
    base: "transfer/channel-21/erc20/tether/usdt",
    display: "transfer/channel-21/usdt",
    name: "Tether USD",
    symbol: "USDT.kava",
    penumbraAssetId: {
      inner: "8sSKWMnV4A30a8bY3epIFmm2RWGsLtHRFp8sBcCWJhI="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/ethereum/images/usdt.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/ethereum/images/usdt.svg",
        theme: {
          primaryColorHex: "#049393"
        }
      }
    ],
    priorityScore: "700000000001",
    coingeckoId: "tether"
  },
  "9G0MFF7l2Xs0abrI+i2CDuylEDj6tFqCHv9jIo0bow8=": {
    description: "Coin to support the real world in Wilhelmshall im Huy",
    denomUnits: [
      {
        denom: "transfer/channel-20/factory/osmo1q77cw0mmlluxu0wr29fcdd0tdnh78gzhkvhe4n6ulal9qvrtu43qtd0nh8/wiha"
      },
      {
        denom: "transfer/channel-20/WIHA",
        exponent: 6
      }
    ],
    base: "transfer/channel-20/factory/osmo1q77cw0mmlluxu0wr29fcdd0tdnh78gzhkvhe4n6ulal9qvrtu43qtd0nh8/wiha",
    display: "transfer/channel-20/WIHA",
    name: "WiliHall",
    symbol: "WIHA",
    penumbraAssetId: {
      inner: "9G0MFF7l2Xs0abrI+i2CDuylEDj6tFqCHv9jIo0bow8="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/WIHA.png",
        theme: {
          primaryColorHex: "#151412"
        }
      }
    ]
  },
  "9J5jx5EgJEE6YGDROmeHmPbMUsE4tpi9rLkmUPI0/AY=": {
    description: "SLAYER OF ZEROS ",
    denomUnits: [
      {
        denom: "transfer/channel-4/factory/osmo1q77cw0mmlluxu0wr29fcdd0tdnh78gzhkvhe4n6ulal9qvrtu43qtd0nh8/slayer"
      },
      {
        denom: "transfer/channel-4/SLAYER",
        exponent: 6
      }
    ],
    base: "transfer/channel-4/factory/osmo1q77cw0mmlluxu0wr29fcdd0tdnh78gzhkvhe4n6ulal9qvrtu43qtd0nh8/slayer",
    display: "transfer/channel-4/SLAYER",
    name: "SLAYER",
    symbol: "SLAYER.ch4",
    penumbraAssetId: {
      inner: "9J5jx5EgJEE6YGDROmeHmPbMUsE4tpi9rLkmUPI0/AY="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/SLAYER.png",
        theme: {
          primaryColorHex: "#9c7a6a"
        }
      }
    ]
  },
  "9K0nhsHG5pn/MpmxYDkGyIHbVXh2aZm3eknCYy9auws=": {
    description: "A group of french boulanger who wanna bring fun and baguette on cosmos",
    denomUnits: [
      {
        denom: "transfer/channel-4/factory/osmo1q77cw0mmlluxu0wr29fcdd0tdnh78gzhkvhe4n6ulal9qvrtu43qtd0nh8/bag"
      },
      {
        denom: "transfer/channel-4/BAG",
        exponent: 6
      }
    ],
    base: "transfer/channel-4/factory/osmo1q77cw0mmlluxu0wr29fcdd0tdnh78gzhkvhe4n6ulal9qvrtu43qtd0nh8/bag",
    display: "transfer/channel-4/BAG",
    name: "Baguette",
    symbol: "BAG.ch4",
    penumbraAssetId: {
      inner: "9K0nhsHG5pn/MpmxYDkGyIHbVXh2aZm3eknCYy9auws="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/BAG.png",
        theme: {
          primaryColorHex: "#9f6c3b"
        }
      }
    ]
  },
  "9VIeoeIBQKwl62qLvZlyYRnnjZ95USzJtreNL4mVbQs=": {
    description: "An alloy of POL asset variants on Osmosis.",
    denomUnits: [
      {
        denom: "transfer/channel-20/factory/osmo1fg7y3j86fkp93yxpq5q8lk8c64k8wxj3qw8us49msgpr2gsgddjqxpgr9m/alloyed/allPOL"
      },
      {
        denom: "transfer/channel-20/allPOL",
        exponent: 12
      }
    ],
    base: "transfer/channel-20/factory/osmo1fg7y3j86fkp93yxpq5q8lk8c64k8wxj3qw8us49msgpr2gsgddjqxpgr9m/alloyed/allPOL",
    display: "transfer/channel-20/allPOL",
    name: "Polygon (ex-MATIC)",
    symbol: "POL",
    penumbraAssetId: {
      inner: "9VIeoeIBQKwl62qLvZlyYRnnjZ95USzJtreNL4mVbQs="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/polygon/images/matic-purple.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/polygon/images/matic-purple.svg",
        theme: {
          primaryColorHex: "#8344e3"
        }
      }
    ]
  },
  "9Z2H/H4MCnYH8evt2Q6kMCTFSYe88EtWn7131rmwgAA=": {
    description: "LAB - Everything is an Experiment",
    denomUnits: [
      {
        denom: "transfer/channel-4/factory/osmo17fel472lgzs87ekt9dvk0zqyh5gl80sqp4sk4n/LAB"
      },
      {
        denom: "transfer/channel-4/LAB",
        exponent: 6
      }
    ],
    base: "transfer/channel-4/factory/osmo17fel472lgzs87ekt9dvk0zqyh5gl80sqp4sk4n/LAB",
    display: "transfer/channel-4/LAB",
    name: "LAB",
    symbol: "LAB.ch4",
    penumbraAssetId: {
      inner: "9Z2H/H4MCnYH8evt2Q6kMCTFSYe88EtWn7131rmwgAA="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/LAB.png",
        theme: {
          primaryColorHex: "#5bd146"
        }
      }
    ]
  },
  "9hxO0eoOeL5nRYGrI7X751jo/Q3BHqU2E84QtCn0aA8=": {
    description: "The Spice memecoin",
    denomUnits: [
      {
        denom: "transfer/channel-4/factory/osmo1n6asrjy9754q8y9jsxqf557zmsv3s3xa5m9eg5/uspice"
      },
      {
        denom: "transfer/channel-4/Spice",
        exponent: 6
      }
    ],
    base: "transfer/channel-4/factory/osmo1n6asrjy9754q8y9jsxqf557zmsv3s3xa5m9eg5/uspice",
    display: "transfer/channel-4/Spice",
    name: "Spice",
    symbol: "SPICE.ch4",
    penumbraAssetId: {
      inner: "9hxO0eoOeL5nRYGrI7X751jo/Q3BHqU2E84QtCn0aA8="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/spice.png",
        theme: {
          primaryColorHex: "#dbbf7d"
        }
      }
    ],
    coingeckoId: "spice-2"
  },
  "9sKDSVM9qU0G3ASpZted8wJB8fhdadAtzxZxE5tJMxI=": {
    description: "An alloy of ARB asset variants on Osmosis.",
    denomUnits: [
      {
        denom: "transfer/channel-4/factory/osmo1p7x454ex08s4f9ztmm7wfv7lvtgdkfztj2u7v7fezfcauy85q35qmqrdpk/alloyed/allARB"
      },
      {
        denom: "transfer/channel-4/arb",
        exponent: 12
      }
    ],
    base: "transfer/channel-4/factory/osmo1p7x454ex08s4f9ztmm7wfv7lvtgdkfztj2u7v7fezfcauy85q35qmqrdpk/alloyed/allARB",
    display: "transfer/channel-4/arb",
    name: "Arbitrum",
    symbol: "allARB.ch4",
    penumbraAssetId: {
      inner: "9sKDSVM9qU0G3ASpZted8wJB8fhdadAtzxZxE5tJMxI="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/arbitrum/images/arb.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/arbitrum/images/arb.svg",
        theme: {
          primaryColorHex: "#9dcceb"
        }
      }
    ],
    priorityScore: "5000000000",
    coingeckoId: "arbitrum"
  },
  "A/8PdbaWqFds9NiYzmAN75SehGpkLwr7tgoVmwaIVgg=": {
    description: "Circle's stablecoin on Axelar",
    denomUnits: [
      {
        denom: "transfer/channel-7/uusdc"
      },
      {
        denom: "transfer/channel-7/usdc",
        exponent: 6
      }
    ],
    base: "transfer/channel-7/uusdc",
    display: "transfer/channel-7/usdc",
    name: "USD Coin",
    symbol: "axlUSDC",
    penumbraAssetId: {
      inner: "A/8PdbaWqFds9NiYzmAN75SehGpkLwr7tgoVmwaIVgg="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/axelar/images/usdc.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/axelar/images/usdc.svg",
        theme: {
          primaryColorHex: "#2474cb"
        }
      }
    ],
    coingeckoId: "axlusdc"
  },
  "AGSa1heoUNAoE0q1XuDBb/O2MItm7RTV5Y3U6D9RpQI=": {
    description: "An alloy of TRUMP asset variants on Osmosis.",
    denomUnits: [
      {
        denom: "transfer/channel-4/factory/osmo1524q4dt7ckx25daydfd0ya0hyu6t26ch5509nvmxm4gcvuhk0fvs8qzl5q/alloyed/allTRUMP"
      },
      {
        denom: "transfer/channel-4/allTRUMP",
        exponent: 6
      }
    ],
    base: "transfer/channel-4/factory/osmo1524q4dt7ckx25daydfd0ya0hyu6t26ch5509nvmxm4gcvuhk0fvs8qzl5q/alloyed/allTRUMP",
    display: "transfer/channel-4/allTRUMP",
    name: "Official Trump",
    symbol: "TRUMP.ch4",
    penumbraAssetId: {
      inner: "AGSa1heoUNAoE0q1XuDBb/O2MItm7RTV5Y3U6D9RpQI="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/solana/images/trump.png",
        theme: {
          primaryColorHex: "#e1d4a5"
        }
      }
    ]
  },
  "AT0QqBttTDnvma0S/pOJViUIJLqVFNNDkGaRtCiGlQU=": {
    denomUnits: [
      {
        denom: "udelegation_penumbravalid19qcxdmkpry2zda9htt2wprpk32yc9nwjgmc0xvqwm8qz5afk6upsmg55hh"
      },
      {
        denom: "mdelegation_penumbravalid19qcxdmkpry2zda9htt2wprpk32yc9nwjgmc0xvqwm8qz5afk6upsmg55hh",
        exponent: 3
      },
      {
        denom: "delegation_penumbravalid19qcxdmkpry2zda9htt2wprpk32yc9nwjgmc0xvqwm8qz5afk6upsmg55hh",
        exponent: 6
      }
    ],
    base: "udelegation_penumbravalid19qcxdmkpry2zda9htt2wprpk32yc9nwjgmc0xvqwm8qz5afk6upsmg55hh",
    display: "delegation_penumbravalid19qcxdmkpry2zda9htt2wprpk32yc9nwjgmc0xvqwm8qz5afk6upsmg55hh",
    symbol: "delUM(Bryanlabs)",
    penumbraAssetId: {
      inner: "AT0QqBttTDnvma0S/pOJViUIJLqVFNNDkGaRtCiGlQU="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/penumbrafi/registry/main/images/validators/penumbravalid19qcxdmkpry2zda9htt2wprpk32yc9nwjgmc0xvqwm8qz5afk6upsmg55hh.png",
        theme: {
          primaryColorHex: "#99d44a"
        }
      }
    ]
  },
  "AZNpOxU3/aSGlWks2uHN3CR9f/RKZ95GvwRNWeVA/gE=": {
    description: "Fractionalized Bad Kids",
    denomUnits: [
      {
        denom: "transfer/channel-20/factory/osmo1dywfmhyc8y0wga7qpzej0x0mgwqg25fj4eccp494w8yafzdpgamsx9ryyv/fBAD"
      },
      {
        denom: "transfer/channel-20/fBAD",
        exponent: 9
      }
    ],
    base: "transfer/channel-20/factory/osmo1dywfmhyc8y0wga7qpzej0x0mgwqg25fj4eccp494w8yafzdpgamsx9ryyv/fBAD",
    display: "transfer/channel-20/fBAD",
    name: "fBAD",
    symbol: "fBAD",
    penumbraAssetId: {
      inner: "AZNpOxU3/aSGlWks2uHN3CR9f/RKZ95GvwRNWeVA/gE="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/fBAD.png",
        theme: {
          primaryColorHex: "#e9c4a1"
        }
      }
    ]
  },
  "Ab+YgSwUEu9eoWqiLieB6N1MyllLiM7/NOO7lfP9kwQ=": {
    description: "The governance token of the Arena DAO",
    denomUnits: [
      {
        denom: "transfer/channel-9/factory/neutron129ukd5cwahcjkccujz87rjemjukff7jf6sau72qrhva677xgz9gs4m4jeq/uarena"
      },
      {
        denom: "transfer/channel-9/arena",
        exponent: 6
      }
    ],
    base: "transfer/channel-9/factory/neutron129ukd5cwahcjkccujz87rjemjukff7jf6sau72qrhva677xgz9gs4m4jeq/uarena",
    display: "transfer/channel-9/arena",
    name: "Arena Token",
    symbol: "ARENA",
    penumbraAssetId: {
      inner: "Ab+YgSwUEu9eoWqiLieB6N1MyllLiM7/NOO7lfP9kwQ="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/neutron/images/arena_dao.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/neutron/images/arena_dao.svg",
        theme: {
          primaryColorHex: "#f9f0ee"
        }
      }
    ]
  },
  "AdAns2u2zWNp7W0oWgyzi/4vDS73jEQnZlDIKo4FdgI=": {
    description: "HELIXPOINT is the points token on Injective, launched on Trippy Pump (SHROOM Pad)",
    denomUnits: [
      {
        denom: "transfer/channel-18/factory/inj13j2rpnlwl30c02d4pzukykwfeyyhelvry9cqte/shroom_8_be9bddf36b94db69"
      },
      {
        denom: "transfer/channel-18/HELIXPOINT",
        exponent: 18
      }
    ],
    base: "transfer/channel-18/factory/inj13j2rpnlwl30c02d4pzukykwfeyyhelvry9cqte/shroom_8_be9bddf36b94db69",
    display: "transfer/channel-18/HELIXPOINT",
    name: "HELIXPOINT",
    symbol: "HELIXPOINT",
    penumbraAssetId: {
      inner: "AdAns2u2zWNp7W0oWgyzi/4vDS73jEQnZlDIKo4FdgI="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/injective/images/helixpoint.png",
        theme: {
          primaryColorHex: "#aaafaa"
        }
      }
    ]
  },
  "AdlT67pUDx0wsIFBC4opbslYEOk6+QDIzWUcVtQlXgQ=": {
    description: "Chain-key Bitcoin bridged via Omnity Network.",
    denomUnits: [
      {
        denom: "transfer/channel-4/factory/osmo10c4y9csfs8q7mtvfg4p9gd8d0acx0hpc2mte9xqzthd7rd3348tsfhaesm/sICP-icrc-ckBTC"
      },
      {
        denom: "transfer/channel-4/ckBTC",
        exponent: 8
      }
    ],
    base: "transfer/channel-4/factory/osmo10c4y9csfs8q7mtvfg4p9gd8d0acx0hpc2mte9xqzthd7rd3348tsfhaesm/sICP-icrc-ckBTC",
    display: "transfer/channel-4/ckBTC",
    name: "Chain-key Bitcoin",
    symbol: "ckBTC.ch4",
    penumbraAssetId: {
      inner: "AdlT67pUDx0wsIFBC4opbslYEOk6+QDIzWUcVtQlXgQ="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/internetcomputer/images/ckbtc.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/internetcomputer/images/ckbtc.svg",
        theme: {
          primaryColorHex: "#2ca8e2"
        }
      }
    ],
    coingeckoId: "chain-key-bitcoin"
  },
  "Ar6MhFcFk9QWltJ2omSY3xgXpextuXXTsQsubmSy7gk=": {
    description: "Sail DAO is a liquidity deployment and management DAO built as a collaboration between the Osmosis and Migaloo Blockchains.",
    denomUnits: [
      {
        denom: "transfer/channel-4/factory/osmo1rckme96ptawr4zwexxj5g5gej9s2dmud8r2t9j0k0prn5mch5g4snzzwjv/sail"
      },
      {
        denom: "transfer/channel-4/sail",
        exponent: 6
      }
    ],
    base: "transfer/channel-4/factory/osmo1rckme96ptawr4zwexxj5g5gej9s2dmud8r2t9j0k0prn5mch5g4snzzwjv/sail",
    display: "transfer/channel-4/sail",
    name: "Sail",
    symbol: "SAIL.ch4",
    penumbraAssetId: {
      inner: "Ar6MhFcFk9QWltJ2omSY3xgXpextuXXTsQsubmSy7gk="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/sail.png",
        theme: {
          primaryColorHex: "#f6f3f7"
        }
      }
    ]
  },
  "Az7J/zscBkl8WRCuLB9c8a56hy96iEQ6IDF9K+JXWgw=": {
    denomUnits: [
      {
        denom: "udelegation_penumbravalid1ktcv24rwkp69mc6hf5g7kwpwrevy6mrzdsg07nq3za6z4fp72cyqf4aw3d"
      },
      {
        denom: "mdelegation_penumbravalid1ktcv24rwkp69mc6hf5g7kwpwrevy6mrzdsg07nq3za6z4fp72cyqf4aw3d",
        exponent: 3
      },
      {
        denom: "delegation_penumbravalid1ktcv24rwkp69mc6hf5g7kwpwrevy6mrzdsg07nq3za6z4fp72cyqf4aw3d",
        exponent: 6
      }
    ],
    base: "udelegation_penumbravalid1ktcv24rwkp69mc6hf5g7kwpwrevy6mrzdsg07nq3za6z4fp72cyqf4aw3d",
    display: "delegation_penumbravalid1ktcv24rwkp69mc6hf5g7kwpwrevy6mrzdsg07nq3za6z4fp72cyqf4aw3d",
    symbol: "delUM(antumbra.net)",
    penumbraAssetId: {
      inner: "Az7J/zscBkl8WRCuLB9c8a56hy96iEQ6IDF9K+JXWgw="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/penumbrafi/registry/main/images/validators/penumbravalid1ktcv24rwkp69mc6hf5g7kwpwrevy6mrzdsg07nq3za6z4fp72cyqf4aw3d.png",
        theme: {
          primaryColorHex: "#702c0d"
        }
      }
    ]
  },
  "B+9mATKkwyNfqyctQ9m5dSqDN7LRCFl6v/r/XyRtDw8=": {
    description: "ATOM is the native cryptocurrency of the Cosmos network, designed to facilitate interoperability between multiple blockchains through its innovative hub-and-spoke model.",
    denomUnits: [
      {
        denom: "transfer/channel-0/uatom"
      },
      {
        denom: "transfer/channel-0/atom",
        exponent: 6
      }
    ],
    base: "transfer/channel-0/uatom",
    display: "transfer/channel-0/atom",
    name: "Cosmos Hub Atom",
    symbol: "ATOM.ch0",
    penumbraAssetId: {
      inner: "B+9mATKkwyNfqyctQ9m5dSqDN7LRCFl6v/r/XyRtDw8="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/cosmoshub/images/atom.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/cosmoshub/images/atom.svg",
        theme: {
          primaryColorHex: "#272d45"
        }
      }
    ],
    priorityScore: "8000000000",
    coingeckoId: "cosmos"
  },
  "B586s8ouFWKjvJQTYElvNjF4y05Az+ip4cilDWicvAU=": {
    description: "An alloy of FIL asset variants on Osmosis.",
    denomUnits: [
      {
        denom: "transfer/channel-20/factory/osmo1ss0n3ghv5rr4z4y54fnkprc69tegmdm3ejlkgr2z4utnyg7eljgs9pztvs/alloyed/allFIL"
      },
      {
        denom: "transfer/channel-20/allFIL",
        exponent: 12
      }
    ],
    base: "transfer/channel-20/factory/osmo1ss0n3ghv5rr4z4y54fnkprc69tegmdm3ejlkgr2z4utnyg7eljgs9pztvs/alloyed/allFIL",
    display: "transfer/channel-20/allFIL",
    name: "Filecoin",
    symbol: "FIL",
    penumbraAssetId: {
      inner: "B586s8ouFWKjvJQTYElvNjF4y05Az+ip4cilDWicvAU="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/filecoin/images/fil.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/filecoin/images/fil.svg",
        theme: {
          primaryColorHex: "#0493fb"
        }
      }
    ]
  },
  "BK/Hz826s94tKv7AxSPTGqojgzTnZSsZjpUTYupkZws=": {
    description: "An alloy of TON asset variants on Osmosis.",
    denomUnits: [
      {
        denom: "transfer/channel-4/factory/osmo12lnwf54yd30p6amzaged2atln8k0l32n7ncxf04ctg7u7ymnsy7qkqgsw4/alloyed/allTON"
      },
      {
        denom: "transfer/channel-4/ton",
        exponent: 9
      }
    ],
    base: "transfer/channel-4/factory/osmo12lnwf54yd30p6amzaged2atln8k0l32n7ncxf04ctg7u7ymnsy7qkqgsw4/alloyed/allTON",
    display: "transfer/channel-4/ton",
    name: "Toncoin",
    symbol: "TON.ch4",
    penumbraAssetId: {
      inner: "BK/Hz826s94tKv7AxSPTGqojgzTnZSsZjpUTYupkZws="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/ton/images/ton.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/ton/images/ton.svg",
        theme: {
          primaryColorHex: "#048ccc"
        }
      }
    ],
    priorityScore: "4000000000",
    coingeckoId: "the-open-network"
  },
  "BWqv9jswBdv/ig9aaa35ostn7bmvnp3GmcODqgkbBAQ=": {
    description: "Frax's fractional-algorithmic stablecoin on Axelar",
    denomUnits: [
      {
        denom: "transfer/channel-7/frax-wei"
      },
      {
        denom: "transfer/channel-7/frax",
        exponent: 18
      }
    ],
    base: "transfer/channel-7/frax-wei",
    display: "transfer/channel-7/frax",
    name: "Frax",
    symbol: "FRAX",
    penumbraAssetId: {
      inner: "BWqv9jswBdv/ig9aaa35ostn7bmvnp3GmcODqgkbBAQ="
    },
    images: [
      {
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/ethereum/images/frax.svg",
        theme: {
          primaryColorHex: "#bfbfbf"
        }
      }
    ]
  },
  "BYrmeDwTX7i1szu85yMFU8rNeg+1oeTAc5S8bNF5kAI=": {
    description: "Tether's USD stablecoin from Arbitrum on Axelar",
    denomUnits: [
      {
        denom: "transfer/channel-7/arbitrum-uusdt"
      },
      {
        denom: "transfer/channel-7/usdt",
        exponent: 6
      }
    ],
    base: "transfer/channel-7/arbitrum-uusdt",
    display: "transfer/channel-7/usdt",
    name: "Tether USD (Arbitrum)",
    symbol: "axlUSDT.arbitrum",
    penumbraAssetId: {
      inner: "BYrmeDwTX7i1szu85yMFU8rNeg+1oeTAc5S8bNF5kAI="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/ethereum/images/usdt.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/ethereum/images/usdt.svg",
        theme: {
          primaryColorHex: "#049393"
        }
      }
    ]
  },
  "Bf6TAsoksSuet5HE0CR9q63XV7ltLMBEivKiNRnT4AQ=": {
    description: "An alloy of BCH asset variants on Osmosis.",
    denomUnits: [
      {
        denom: "transfer/channel-20/factory/osmo1cranx3twqxfrgeqvgsu262gy54vafpc9xap6scye99v244zl970s7kw2sz/alloyed/allBCH"
      },
      {
        denom: "transfer/channel-20/allBCH",
        exponent: 8
      }
    ],
    base: "transfer/channel-20/factory/osmo1cranx3twqxfrgeqvgsu262gy54vafpc9xap6scye99v244zl970s7kw2sz/alloyed/allBCH",
    display: "transfer/channel-20/allBCH",
    name: "Bitcoin Cash",
    symbol: "BCH",
    penumbraAssetId: {
      inner: "Bf6TAsoksSuet5HE0CR9q63XV7ltLMBEivKiNRnT4AQ="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/bitcoincash/images/bch.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/bitcoincash/images/bch.svg",
        theme: {
          primaryColorHex: "#0cc38b"
        }
      }
    ]
  },
  "BnSvnSoramn/A3n60rYRTydWKIyibJi2z/a8ItIllhE=": {
    denomUnits: [
      {
        denom: "transfer/channel-8/staevmos"
      },
      {
        denom: "transfer/channel-8/stevmos",
        exponent: 18
      }
    ],
    base: "transfer/channel-8/staevmos",
    display: "transfer/channel-8/stevmos",
    name: "Stride Staked EVMOS",
    symbol: "stEVMOS",
    penumbraAssetId: {
      inner: "BnSvnSoramn/A3n60rYRTydWKIyibJi2z/a8ItIllhE="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/stride/images/stevmos.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/stride/images/stevmos.svg",
        theme: {
          primaryColorHex: "#e30474"
        }
      }
    ]
  },
  "CR4atxWjAgc6XNBxCB1UryK9ILPO0dt4e+G4Rdsa0As=": {
    description: "Membrane's CDP-style stablecoin called CDT",
    denomUnits: [
      {
        denom: "transfer/channel-20/factory/osmo1s794h9rxggytja3a4pmwul53u98k06zy2qtrdvjnfuxruh7s8yjs6cyxgd/ucdt"
      },
      {
        denom: "transfer/channel-20/cdt",
        exponent: 6
      }
    ],
    base: "transfer/channel-20/factory/osmo1s794h9rxggytja3a4pmwul53u98k06zy2qtrdvjnfuxruh7s8yjs6cyxgd/ucdt",
    display: "transfer/channel-20/cdt",
    name: "CDT Stablecoin",
    symbol: "CDT",
    penumbraAssetId: {
      inner: "CR4atxWjAgc6XNBxCB1UryK9ILPO0dt4e+G4Rdsa0As="
    },
    images: [
      {
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/CDT.svg",
        theme: {
          primaryColorHex: "#5a9ce2"
        }
      }
    ]
  },
  "Cdb40b4t3vfSbS3awIRBBapF9MdcbrlMTEdzYqxUNwE=": {
    description: "An alloy of USDC asset variants on Osmosis.",
    denomUnits: [
      {
        denom: "transfer/channel-20/factory/osmo147h5x9pcj7lm0cttlaefx6sqq5vdfnmwfcqxkmjd7exqm9gc7grqhr75m0/alloyed/allUSDC"
      },
      {
        denom: "transfer/channel-20/allUSDC",
        exponent: 6
      }
    ],
    base: "transfer/channel-20/factory/osmo147h5x9pcj7lm0cttlaefx6sqq5vdfnmwfcqxkmjd7exqm9gc7grqhr75m0/alloyed/allUSDC",
    display: "transfer/channel-20/allUSDC",
    name: "USD Coin",
    symbol: "allUSDC",
    penumbraAssetId: {
      inner: "Cdb40b4t3vfSbS3awIRBBapF9MdcbrlMTEdzYqxUNwE="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/ethereum/images/usdc.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/ethereum/images/usdc.svg",
        theme: {
          primaryColorHex: "#2474cb"
        }
      }
    ]
  },
  "CrpjT5yuH5IIuXpU7sdGAMhceoEAxWsIPOtAij2YxAc=": {
    description: "TabCoin",
    denomUnits: [
      {
        denom: "transfer/channel-9/factory/neutron1r5qx58l3xx2y8gzjtkqjndjgx69mktmapl45vns0pa73z0zpn7fqgltnll/TAB"
      },
      {
        denom: "transfer/channel-9/TAB",
        exponent: 6
      }
    ],
    base: "transfer/channel-9/factory/neutron1r5qx58l3xx2y8gzjtkqjndjgx69mktmapl45vns0pa73z0zpn7fqgltnll/TAB",
    display: "transfer/channel-9/TAB",
    name: "TabCoin",
    symbol: "TAB",
    penumbraAssetId: {
      inner: "CrpjT5yuH5IIuXpU7sdGAMhceoEAxWsIPOtAij2YxAc="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/neutron/images/TAB.png",
        theme: {
          primaryColorHex: "#f9f8f0"
        }
      }
    ]
  },
  "D0RDJEVlGzcTajk+WAojd75lx7heXmsI0I2NdX+QeAg=": {
    description: "Movement ($MOVE) from Ethereum via Axelar bridge",
    denomUnits: [
      {
        denom: "transfer/channel-7/unit-move"
      },
      {
        denom: "transfer/channel-7/move",
        exponent: 8
      }
    ],
    base: "transfer/channel-7/unit-move",
    display: "transfer/channel-7/move",
    name: "Movement",
    symbol: "axlMOVE",
    penumbraAssetId: {
      inner: "D0RDJEVlGzcTajk+WAojd75lx7heXmsI0I2NdX+QeAg="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/movement/images/move.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/movement/images/move.svg",
        theme: {
          primaryColorHex: "#040404"
        }
      }
    ]
  },
  "DJlyenhbLm2EYBi/BkFJ7SNSEF1aJj2vm/1zGoz5vAc=": {
    description: "BITCOSMOS",
    denomUnits: [
      {
        denom: "transfer/channel-9/neutron1fjzg7fmv770hsvahqm0nwnu6grs3rjnd2wa6fvm9unv6vedkzekqpw44qj"
      },
      {
        denom: "transfer/channel-9/bitcosmos",
        exponent: 6
      }
    ],
    base: "transfer/channel-9/neutron1fjzg7fmv770hsvahqm0nwnu6grs3rjnd2wa6fvm9unv6vedkzekqpw44qj",
    display: "transfer/channel-9/bitcosmos",
    name: "Bitcosmos",
    symbol: "BTC",
    penumbraAssetId: {
      inner: "DJlyenhbLm2EYBi/BkFJ7SNSEF1aJj2vm/1zGoz5vAc="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/neutron/images/bitcosmos.png",
        theme: {
          primaryColorHex: "#d6b499"
        }
      }
    ]
  },
  "DMlO14akLvrOHVKexJgiR7G1bQXKJaKxankonLBSHg8=": {
    description: "An alloy of OP asset variants on Osmosis.",
    denomUnits: [
      {
        denom: "transfer/channel-20/factory/osmo1nufyzqlm8qhu2w7lm0l4rrax0ec8rsk69mga4tel8eare7c7ljaqpk2lyg/alloyed/allOP"
      },
      {
        denom: "transfer/channel-20/op",
        exponent: 12
      }
    ],
    base: "transfer/channel-20/factory/osmo1nufyzqlm8qhu2w7lm0l4rrax0ec8rsk69mga4tel8eare7c7ljaqpk2lyg/alloyed/allOP",
    display: "transfer/channel-20/op",
    name: "Optimism",
    symbol: "allOP",
    penumbraAssetId: {
      inner: "DMlO14akLvrOHVKexJgiR7G1bQXKJaKxankonLBSHg8="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/optimism/images/op.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/optimism/images/op.svg",
        theme: {
          primaryColorHex: "#fb0423"
        }
      }
    ],
    priorityScore: "500000000000",
    coingeckoId: "osmosis-allop"
  },
  "DlQgYGxcEOT/G5cBKKqiSt2UxACW5oEoYeocmccJygk=": {
    description: "Rapture insurance is the first ever P2P insurance platform on $OSMO. Get rewarded to take care of peoples loved ones after the Rapture.",
    denomUnits: [
      {
        denom: "transfer/channel-20/factory/osmo1279xudevmf5cw83vkhglct7jededp86k90k2le/RAPTR"
      },
      {
        denom: "transfer/channel-20/RAPTR",
        exponent: 6
      }
    ],
    base: "transfer/channel-20/factory/osmo1279xudevmf5cw83vkhglct7jededp86k90k2le/RAPTR",
    display: "transfer/channel-20/RAPTR",
    name: "RAPTR",
    symbol: "RAPTR",
    penumbraAssetId: {
      inner: "DlQgYGxcEOT/G5cBKKqiSt2UxACW5oEoYeocmccJygk="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/RAPTR.png",
        theme: {
          primaryColorHex: "#ddb179"
        }
      }
    ]
  },
  "E1f1RVE3f8KUVXrN/0DYAKeHib2XuIuheqiV8OFY5gk=": {
    description: "An alloy of DYM asset variants on Osmosis.",
    denomUnits: [
      {
        denom: "transfer/channel-20/factory/osmo12cf6l99qrchfppmjp80gvkpnle2tuxpck2cf6fz030w74mq49u4qm3dh4d/alloyed/allDYM"
      },
      {
        denom: "transfer/channel-20/allDYM",
        exponent: 12
      }
    ],
    base: "transfer/channel-20/factory/osmo12cf6l99qrchfppmjp80gvkpnle2tuxpck2cf6fz030w74mq49u4qm3dh4d/alloyed/allDYM",
    display: "transfer/channel-20/allDYM",
    name: "Dymension Hub",
    symbol: "DYM",
    penumbraAssetId: {
      inner: "E1f1RVE3f8KUVXrN/0DYAKeHib2XuIuheqiV8OFY5gk="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/dymension/images/dymension-logo.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/dymension/images/dymension-logo.svg",
        theme: {
          primaryColorHex: "#b4ac9c"
        }
      }
    ]
  },
  "E5du4/WKTWCiIQwDdAlqwuCxhdNfVy+V4Y4mkYMmvwA=": {
    description: "An alloy of TON asset variants on Osmosis.",
    denomUnits: [
      {
        denom: "transfer/channel-20/factory/osmo12lnwf54yd30p6amzaged2atln8k0l32n7ncxf04ctg7u7ymnsy7qkqgsw4/alloyed/allTON"
      },
      {
        denom: "transfer/channel-20/ton",
        exponent: 9
      }
    ],
    base: "transfer/channel-20/factory/osmo12lnwf54yd30p6amzaged2atln8k0l32n7ncxf04ctg7u7ymnsy7qkqgsw4/alloyed/allTON",
    display: "transfer/channel-20/ton",
    name: "Toncoin",
    symbol: "TON",
    penumbraAssetId: {
      inner: "E5du4/WKTWCiIQwDdAlqwuCxhdNfVy+V4Y4mkYMmvwA="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/ton/images/ton.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/ton/images/ton.svg",
        theme: {
          primaryColorHex: "#048ccc"
        }
      }
    ],
    priorityScore: "400000000000",
    coingeckoId: "the-open-network"
  },
  "EMttUTznXaZu2d7ecHS5UC0RvJsBh9GYc79abym2ewc=": {
    description: "Margined Power Token sqBTC",
    denomUnits: [
      {
        denom: "transfer/channel-4/factory/osmo1g8qypve6l95xmhgc0fddaecerffymsl7kn9muw/sqbtc"
      },
      {
        denom: "transfer/channel-4/sqbtc",
        exponent: 6
      }
    ],
    base: "transfer/channel-4/factory/osmo1g8qypve6l95xmhgc0fddaecerffymsl7kn9muw/sqbtc",
    display: "transfer/channel-4/sqbtc",
    name: "BTC Squared",
    symbol: "sqBTC.ch4",
    penumbraAssetId: {
      inner: "EMttUTznXaZu2d7ecHS5UC0RvJsBh9GYc79abym2ewc="
    },
    images: [
      {
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/sqbtc.svg",
        theme: {
          primaryColorHex: "#bae343"
        }
      }
    ]
  },
  "EQbzRHIIuD+AbS7XJFVSYaDXh88mcPuOzlpJ+f0PIQk=": {
    description: "Axelar is a decentralized interoperability network connecting multiple blockchain ecosystems, enabling seamless cross-chain communication and value transfer.",
    denomUnits: [
      {
        denom: "transfer/channel-7/uaxl"
      },
      {
        denom: "transfer/channel-7/axl",
        exponent: 6
      }
    ],
    base: "transfer/channel-7/uaxl",
    display: "transfer/channel-7/axl",
    name: "Axelar",
    symbol: "AXL",
    penumbraAssetId: {
      inner: "EQbzRHIIuD+AbS7XJFVSYaDXh88mcPuOzlpJ+f0PIQk="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/axelar/images/axl.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/axelar/images/axl.svg",
        theme: {
          primaryColorHex: "#d5d5d5"
        }
      }
    ],
    coingeckoId: "axelar"
  },
  "EU9JBYNHzB2K86odbG0AwsRyQYWe15BicDzUXG/yYQ4=": {
    description: "CW20 hINJ - Hydro Staked INJ",
    denomUnits: [
      {
        denom: "transfer/channel-18/cw20:inj18luqttqyckgpddndh8hvaq25d5nfwjc78m56lc"
      },
      {
        denom: "transfer/channel-18/hINJ",
        exponent: 18
      }
    ],
    base: "transfer/channel-18/cw20:inj18luqttqyckgpddndh8hvaq25d5nfwjc78m56lc",
    display: "transfer/channel-18/hINJ",
    name: "cw20 hINJ",
    symbol: "hINJ.cw20",
    penumbraAssetId: {
      inner: "EU9JBYNHzB2K86odbG0AwsRyQYWe15BicDzUXG/yYQ4="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/injective/images/hinj.png",
        theme: {
          primaryColorHex: "#ef350a"
        }
      }
    ]
  },
  "EcnyMANizU+7U7JdNakQJL7RwNYFxECqmPxaVETk1gs=": {
    denomUnits: [
      {
        denom: "transfer/channel-8/stuosmo"
      },
      {
        denom: "transfer/channel-8/stosmo",
        exponent: 6
      }
    ],
    base: "transfer/channel-8/stuosmo",
    display: "transfer/channel-8/stosmo",
    name: "Stride Staked OSMO",
    symbol: "stOSMO",
    penumbraAssetId: {
      inner: "EcnyMANizU+7U7JdNakQJL7RwNYFxECqmPxaVETk1gs="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/stride/images/stosmo.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/stride/images/stosmo.svg",
        theme: {
          primaryColorHex: "#e30474"
        }
      }
    ],
    coingeckoId: "stride-staked-osmo"
  },
  "FFeNjKpkyVe/0xG+IjcguviSLq+Rvp6qdeO2jjKX8ww=": {
    denomUnits: [
      {
        denom: "transfer/channel-20/factory/osmo1xqw2sl9zk8a6pch0csaw78n4swg5ws8t62wc5qta4gnjxfqg6v2qcs243k/stuibcx"
      },
      {
        denom: "transfer/channel-20/stibcx",
        exponent: 6
      }
    ],
    base: "transfer/channel-20/factory/osmo1xqw2sl9zk8a6pch0csaw78n4swg5ws8t62wc5qta4gnjxfqg6v2qcs243k/stuibcx",
    display: "transfer/channel-20/stibcx",
    name: "Staked IBCX",
    symbol: "stIBCX",
    penumbraAssetId: {
      inner: "FFeNjKpkyVe/0xG+IjcguviSLq+Rvp6qdeO2jjKX8ww="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/stibcx.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/stibcx.svg",
        theme: {
          primaryColorHex: "#e30474"
        }
      }
    ]
  },
  "FIdS5rnrff3QpXFrxcNUP8sbLzz+aHjlb/qJ+OIFEgM=": {
    description: "Fractionalized Geckies",
    denomUnits: [
      {
        denom: "transfer/channel-20/factory/osmo1dywfmhyc8y0wga7qpzej0x0mgwqg25fj4eccp494w8yafzdpgamsx9ryyv/fGECK"
      },
      {
        denom: "transfer/channel-20/fGECK",
        exponent: 9
      }
    ],
    base: "transfer/channel-20/factory/osmo1dywfmhyc8y0wga7qpzej0x0mgwqg25fj4eccp494w8yafzdpgamsx9ryyv/fGECK",
    display: "transfer/channel-20/fGECK",
    name: "fGECK",
    symbol: "fGECK",
    penumbraAssetId: {
      inner: "FIdS5rnrff3QpXFrxcNUP8sbLzz+aHjlb/qJ+OIFEgM="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/fGECK.png",
        theme: {
          primaryColorHex: "#d0d8a8"
        }
      }
    ]
  },
  "FRRdTvPErKQOa3WzsiDc8YAgwZ7LxvsQbkxkcsvOiwA=": {
    description: "The Sherpa memecoin",
    denomUnits: [
      {
        denom: "transfer/channel-4/factory/osmo1n6asrjy9754q8y9jsxqf557zmsv3s3xa5m9eg5/usherpa"
      },
      {
        denom: "transfer/channel-4/Sherpa",
        exponent: 6
      }
    ],
    base: "transfer/channel-4/factory/osmo1n6asrjy9754q8y9jsxqf557zmsv3s3xa5m9eg5/usherpa",
    display: "transfer/channel-4/Sherpa",
    name: "Sherpa",
    symbol: "SHERPA.ch4",
    penumbraAssetId: {
      inner: "FRRdTvPErKQOa3WzsiDc8YAgwZ7LxvsQbkxkcsvOiwA="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/sherpa.png",
        theme: {
          primaryColorHex: "#0f0807"
        }
      }
    ]
  },
  "GCbUGi0SI+e683+iay8RnQpTCex3TnbwRbronZ01mQU=": {
    description: "An alloy of EPIX asset variants on Osmosis.",
    denomUnits: [
      {
        denom: "transfer/channel-4/factory/osmo130tfawc7katf7jwzt2rjdranhqju929rjra3xwsrfsd85hedh3tsssy9j7/alloyed/allEPIX"
      },
      {
        denom: "transfer/channel-4/allEPIX",
        exponent: 12
      }
    ],
    base: "transfer/channel-4/factory/osmo130tfawc7katf7jwzt2rjdranhqju929rjra3xwsrfsd85hedh3tsssy9j7/alloyed/allEPIX",
    display: "transfer/channel-4/allEPIX",
    name: "Epix",
    symbol: "EPIX.ch4",
    penumbraAssetId: {
      inner: "GCbUGi0SI+e683+iay8RnQpTCex3TnbwRbronZ01mQU="
    },
    images: [
      {
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/epix/images/epix.svg",
        theme: {
          primaryColorHex: "#5f91d4"
        }
      },
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/epix/images/epix.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/epix/images/epix.svg",
        theme: {
          primaryColorHex: "#5f91d4"
        }
      }
    ]
  },
  "GbgtRiLud3Pw9nLpkAY6DjmUOxA03YAMA3FmnZr5wAc=": {
    description: "clownmaxxed store of value",
    denomUnits: [
      {
        denom: "transfer/channel-9/factory/neutron170v88vrtnedesyfytuku257cggxc79rd7lwt7q/ucircus"
      },
      {
        denom: "transfer/channel-9/circus",
        exponent: 6
      }
    ],
    base: "transfer/channel-9/factory/neutron170v88vrtnedesyfytuku257cggxc79rd7lwt7q/ucircus",
    display: "transfer/channel-9/circus",
    name: "AtomEconomicZone69JaeKwonInu",
    symbol: "CIRCUS",
    penumbraAssetId: {
      inner: "GbgtRiLud3Pw9nLpkAY6DjmUOxA03YAMA3FmnZr5wAc="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/neutron/images/circus.png",
        theme: {
          primaryColorHex: "#dda882"
        }
      }
    ]
  },
  "Gd4occjNW78Gyil3Zvbr48dWxSLJMZEv5uRZ3QxIzwA=": {
    description: "A receipt token for lent TIA issued by the Neptune Protocol.",
    denomUnits: [
      {
        denom: "transfer/channel-18/inj1fzquxxxam59z6fzewy2hvvreeh3m04x83zg4vv"
      },
      {
        denom: "transfer/channel-18/nTIA",
        exponent: 6
      }
    ],
    base: "transfer/channel-18/inj1fzquxxxam59z6fzewy2hvvreeh3m04x83zg4vv",
    display: "transfer/channel-18/nTIA",
    name: "Neptune Receipt TIA",
    symbol: "nTIA",
    penumbraAssetId: {
      inner: "Gd4occjNW78Gyil3Zvbr48dWxSLJMZEv5uRZ3QxIzwA="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/injective/images/ntia.png",
        theme: {
          primaryColorHex: "#7c2cfb"
        }
      }
    ]
  },
  "Glcci7d86Dz3LmCdVFpBimWx4044PwWHBX9C8jY99wU=": {
    description: "The Representative factory token for Trump Kemistry",
    denomUnits: [
      {
        denom: "transfer/channel-20/factory/osmo1hg0zf0c9can4tvtulh5gmmxe4jpflre3yewxjl/XTRUMP"
      },
      {
        denom: "transfer/channel-20/XTRUMP",
        exponent: 6
      }
    ],
    base: "transfer/channel-20/factory/osmo1hg0zf0c9can4tvtulh5gmmxe4jpflre3yewxjl/XTRUMP",
    display: "transfer/channel-20/XTRUMP",
    name: "XTRUMP",
    symbol: "XTRUMP",
    penumbraAssetId: {
      inner: "Glcci7d86Dz3LmCdVFpBimWx4044PwWHBX9C8jY99wU="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/XTRUMP.png",
        theme: {
          primaryColorHex: "#e6b87d"
        }
      }
    ]
  },
  "GvC3yPE4w9XEAzSJg5wyqMQllDxvnEqTPS+kW3cf4gQ=": {
    description: "JUDO is a very futuristic meme token.",
    denomUnits: [
      {
        denom: "transfer/channel-18/inj16ukv8g2jcmml7gykxn5ws8ykhxjkugl4zhft5h"
      },
      {
        denom: "transfer/channel-18/JUDO",
        exponent: 6
      }
    ],
    base: "transfer/channel-18/inj16ukv8g2jcmml7gykxn5ws8ykhxjkugl4zhft5h",
    display: "transfer/channel-18/JUDO",
    name: "Judo",
    symbol: "JUDO",
    penumbraAssetId: {
      inner: "GvC3yPE4w9XEAzSJg5wyqMQllDxvnEqTPS+kW3cf4gQ="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/injective/images/judo.png",
        theme: {
          primaryColorHex: "#e4ddd1"
        }
      }
    ]
  },
  "HC3YBPn1AX7wca2jKg3mYeYuwuTPzYYrZAmUIebrgQc=": {
    description: "Fractionalized DAONuts",
    denomUnits: [
      {
        denom: "transfer/channel-20/factory/osmo1dywfmhyc8y0wga7qpzej0x0mgwqg25fj4eccp494w8yafzdpgamsx9ryyv/fNUT"
      },
      {
        denom: "transfer/channel-20/fNUT",
        exponent: 9
      }
    ],
    base: "transfer/channel-20/factory/osmo1dywfmhyc8y0wga7qpzej0x0mgwqg25fj4eccp494w8yafzdpgamsx9ryyv/fNUT",
    display: "transfer/channel-20/fNUT",
    name: "fNUT",
    symbol: "fNUT",
    penumbraAssetId: {
      inner: "HC3YBPn1AX7wca2jKg3mYeYuwuTPzYYrZAmUIebrgQc="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/fNUT.png",
        theme: {
          primaryColorHex: "#161113"
        }
      }
    ]
  },
  "HE8LX0NZkFZ3R2B592dN+G/AspWJdOGaD9KXY4UO6wQ=": {
    description: "An alloy of MOVE asset variants on Osmosis.",
    denomUnits: [
      {
        denom: "transfer/channel-4/factory/osmo1v90ezcqkv5utjc52vg4w2gztmcpt7l4vqxzuryj6zl3qr8wy539quxeafk/alloyed/allMOVE"
      },
      {
        denom: "transfer/channel-4/allMOVE",
        exponent: 8
      }
    ],
    base: "transfer/channel-4/factory/osmo1v90ezcqkv5utjc52vg4w2gztmcpt7l4vqxzuryj6zl3qr8wy539quxeafk/alloyed/allMOVE",
    display: "transfer/channel-4/allMOVE",
    name: "Movement",
    symbol: "MOVE.ch4",
    penumbraAssetId: {
      inner: "HE8LX0NZkFZ3R2B592dN+G/AspWJdOGaD9KXY4UO6wQ="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/movement/images/move.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/movement/images/move.svg",
        theme: {
          primaryColorHex: "#040404"
        }
      }
    ]
  },
  "Hc4eF3SnUuBYBsSZDC0rIZU/f25xHGZ2w9aR6/l0lgs=": {
    description: "The governance and utility token of Yieldmos, the Interchain Automation Protocol",
    denomUnits: [
      {
        denom: "transfer/channel-20/factory/osmo1vdvnznwg597qngrq9mnfcfk0am9jdc9y446jewhcqdreqz4r75xq5j5zvy/ymos"
      },
      {
        denom: "transfer/channel-20/ymos",
        exponent: 6
      }
    ],
    base: "transfer/channel-20/factory/osmo1vdvnznwg597qngrq9mnfcfk0am9jdc9y446jewhcqdreqz4r75xq5j5zvy/ymos",
    display: "transfer/channel-20/ymos",
    name: "Yieldmos Coin",
    symbol: "YMOS",
    penumbraAssetId: {
      inner: "Hc4eF3SnUuBYBsSZDC0rIZU/f25xHGZ2w9aR6/l0lgs="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/ymos.png",
        theme: {
          primaryColorHex: "#2c3454"
        }
      }
    ]
  },
  "HcWOAtii1Jedf2YJLAHdl+PnF9tVP5I5lO7BNPlFyhA=": {
    description: "POSTHUMAN Reputation (RESP) is the reputation token of the POSTHUMAN ecosystem, migrated from the legacy Juno RESP token to Cosmos Hub through TokenFactory.",
    denomUnits: [
      {
        denom: "transfer/channel-22/factory/cosmos1nxxz937qd6zqxllwplydy6hts97c4amaqj8jxa57nsme3dmckk4s3mqujr/RESP"
      },
      {
        denom: "transfer/channel-22/resp",
        exponent: 6
      }
    ],
    base: "transfer/channel-22/factory/cosmos1nxxz937qd6zqxllwplydy6hts97c4amaqj8jxa57nsme3dmckk4s3mqujr/RESP",
    display: "transfer/channel-22/resp",
    name: "POSTHUMAN Reputation",
    symbol: "RESP",
    penumbraAssetId: {
      inner: "HcWOAtii1Jedf2YJLAHdl+PnF9tVP5I5lO7BNPlFyhA="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/cosmoshub/images/resp.png",
        theme: {
          primaryColorHex: "#bfc0c1"
        }
      }
    ]
  },
  "HdpWbcNXdtMuKEpUBmQsY1YWLDhZ4oYl2zMApenCyQs=": {
    description: "Fractionalized Pixel Wizards",
    denomUnits: [
      {
        denom: "transfer/channel-20/factory/osmo1dywfmhyc8y0wga7qpzej0x0mgwqg25fj4eccp494w8yafzdpgamsx9ryyv/fWIZ"
      },
      {
        denom: "transfer/channel-20/fWIZ",
        exponent: 9
      }
    ],
    base: "transfer/channel-20/factory/osmo1dywfmhyc8y0wga7qpzej0x0mgwqg25fj4eccp494w8yafzdpgamsx9ryyv/fWIZ",
    display: "transfer/channel-20/fWIZ",
    name: "fWIZ",
    symbol: "fWIZ",
    penumbraAssetId: {
      inner: "HdpWbcNXdtMuKEpUBmQsY1YWLDhZ4oYl2zMApenCyQs="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/fWIZ.png",
        theme: {
          primaryColorHex: "#0e0c10"
        }
      }
    ]
  },
  "HeyqUTuJZ4MSiCi/9qQRNWZ1irxjX+0HS19KnHtwSRE=": {
    description: "An alloy of LTC asset variants on Osmosis.",
    denomUnits: [
      {
        denom: "transfer/channel-20/factory/osmo1csp8fk353hnq2tmulklecxpex43qmjvrkxjcsh4c3eqcw2vjcslq5jls9v/alloyed/allLTC"
      },
      {
        denom: "transfer/channel-20/allLTC",
        exponent: 8
      }
    ],
    base: "transfer/channel-20/factory/osmo1csp8fk353hnq2tmulklecxpex43qmjvrkxjcsh4c3eqcw2vjcslq5jls9v/alloyed/allLTC",
    display: "transfer/channel-20/allLTC",
    name: "Litecoin",
    symbol: "LTC",
    penumbraAssetId: {
      inner: "HeyqUTuJZ4MSiCi/9qQRNWZ1irxjX+0HS19KnHtwSRE="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/litecoin/images/ltc.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/litecoin/images/ltc.svg",
        theme: {
          primaryColorHex: "#345b9b"
        }
      }
    ]
  },
  "HiMfbhLbTTAP0bDI1spwmkZUDAl658X8/8WptethTww=": {
    denomUnits: [
      {
        denom: "transfer/channel-4/factory/osmo1xqw2sl9zk8a6pch0csaw78n4swg5ws8t62wc5qta4gnjxfqg6v2qcs243k/stuibcx"
      },
      {
        denom: "transfer/channel-4/stibcx",
        exponent: 6
      }
    ],
    base: "transfer/channel-4/factory/osmo1xqw2sl9zk8a6pch0csaw78n4swg5ws8t62wc5qta4gnjxfqg6v2qcs243k/stuibcx",
    display: "transfer/channel-4/stibcx",
    name: "Staked IBCX",
    symbol: "stIBCX.ch4",
    penumbraAssetId: {
      inner: "HiMfbhLbTTAP0bDI1spwmkZUDAl658X8/8WptethTww="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/stibcx.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/stibcx.svg",
        theme: {
          primaryColorHex: "#e30474"
        }
      }
    ]
  },
  "HirrT0N2UFSWuJ+MYmH2gYxTY3s+U2wVNzA38tYGthE=": {
    description: "A Mechanical Canine",
    denomUnits: [
      {
        denom: "transfer/channel-9/factory/neutron1t5qrjtyryh8gzt800qr5vylhh2f8cmx4wmz9mc/ugoddard"
      },
      {
        denom: "transfer/channel-9/goddard",
        exponent: 6
      }
    ],
    base: "transfer/channel-9/factory/neutron1t5qrjtyryh8gzt800qr5vylhh2f8cmx4wmz9mc/ugoddard",
    display: "transfer/channel-9/goddard",
    name: "Goddard",
    symbol: "GODRD",
    penumbraAssetId: {
      inner: "HirrT0N2UFSWuJ+MYmH2gYxTY3s+U2wVNzA38tYGthE="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/neutron/images/goddardntrn.png",
        theme: {
          primaryColorHex: "#44744c"
        }
      }
    ]
  },
  "Hx6+G77CU22yfExfD7X8TO31QpqcABYAYzXScadLhgU=": {
    description: "Fractionalized Geckies",
    denomUnits: [
      {
        denom: "transfer/channel-4/factory/osmo1dywfmhyc8y0wga7qpzej0x0mgwqg25fj4eccp494w8yafzdpgamsx9ryyv/fGECK"
      },
      {
        denom: "transfer/channel-4/fGECK",
        exponent: 9
      }
    ],
    base: "transfer/channel-4/factory/osmo1dywfmhyc8y0wga7qpzej0x0mgwqg25fj4eccp494w8yafzdpgamsx9ryyv/fGECK",
    display: "transfer/channel-4/fGECK",
    name: "fGECK",
    symbol: "fGECK.ch4",
    penumbraAssetId: {
      inner: "Hx6+G77CU22yfExfD7X8TO31QpqcABYAYzXScadLhgU="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/fGECK.png",
        theme: {
          primaryColorHex: "#d0d8a8"
        }
      }
    ]
  },
  "J4w9rlk4Hx6VpVLI/kqtxf+KcxEwyGNkTtzxYUpKqwY=": {
    description: "Margined Power Token sqATOM",
    denomUnits: [
      {
        denom: "transfer/channel-4/factory/osmo1g8qypve6l95xmhgc0fddaecerffymsl7kn9muw/sqatom"
      },
      {
        denom: "transfer/channel-4/sqatom",
        exponent: 6
      }
    ],
    base: "transfer/channel-4/factory/osmo1g8qypve6l95xmhgc0fddaecerffymsl7kn9muw/sqatom",
    display: "transfer/channel-4/sqatom",
    name: "ATOM Squared",
    symbol: "sqATOM.ch4",
    penumbraAssetId: {
      inner: "J4w9rlk4Hx6VpVLI/kqtxf+KcxEwyGNkTtzxYUpKqwY="
    },
    images: [
      {
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/sqatom.svg",
        theme: {
          primaryColorHex: "#040404"
        }
      }
    ]
  },
  "J5fl721TUDElXFEMzCRcc8TPBsv3XbKnTJujdoVBXgE=": {
    description: "Stride is a liquid staking blockchain in the Cosmos ecosystem that allows users to stake any IBC-compatible tokens and receive stTokens in return, providing liquidity while earning staking rewards.",
    denomUnits: [
      {
        denom: "transfer/channel-8/ustrd"
      },
      {
        denom: "transfer/channel-8/strd",
        exponent: 6
      }
    ],
    base: "transfer/channel-8/ustrd",
    display: "transfer/channel-8/strd",
    name: "Stride",
    symbol: "STRD",
    penumbraAssetId: {
      inner: "J5fl721TUDElXFEMzCRcc8TPBsv3XbKnTJujdoVBXgE="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/stride/images/strd.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/stride/images/strd.svg",
        theme: {
          primaryColorHex: "#e3047c"
        }
      }
    ],
    coingeckoId: "stride"
  },
  "JXiRZP+KHklM82iViFWqItsvQh/haRAOeKZ/p8+Elw4=": {
    description: `$9 Dollers is programmed

Made with ❤️`,
    denomUnits: [
      {
        denom: "transfer/channel-4/factory/osmo1q77cw0mmlluxu0wr29fcdd0tdnh78gzhkvhe4n6ulal9qvrtu43qtd0nh8/ninedollers"
      },
      {
        denom: "transfer/channel-4/NINEDOLLERS",
        exponent: 6
      }
    ],
    base: "transfer/channel-4/factory/osmo1q77cw0mmlluxu0wr29fcdd0tdnh78gzhkvhe4n6ulal9qvrtu43qtd0nh8/ninedollers",
    display: "transfer/channel-4/NINEDOLLERS",
    name: "Nine Dollers",
    symbol: "NINEDOLLERS.ch4",
    penumbraAssetId: {
      inner: "JXiRZP+KHklM82iViFWqItsvQh/haRAOeKZ/p8+Elw4="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/NINEDOLLERS.png",
        theme: {
          primaryColorHex: "#b6ef75"
        }
      }
    ]
  },
  "JYxf1s+1m4rB2Cl/s4tcZrxjE614W1c4Y2PsEKEfdQ4=": {
    description: "Fire Bitcoin on Axelar",
    denomUnits: [
      {
        denom: "transfer/channel-7/fbtc-satoshi"
      },
      {
        denom: "transfer/channel-7/fbtc",
        exponent: 8
      }
    ],
    base: "transfer/channel-7/fbtc-satoshi",
    display: "transfer/channel-7/fbtc",
    name: "Fire Bitcoin",
    symbol: "axlFBTC",
    penumbraAssetId: {
      inner: "JYxf1s+1m4rB2Cl/s4tcZrxjE614W1c4Y2PsEKEfdQ4="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/mantle/images/fbtc.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/mantle/images/fbtc.svg",
        theme: {
          primaryColorHex: "#8b29fc"
        }
      }
    ]
  },
  "JfJc35xgtUPmKfidDjgHDnIYQ2klmu8x4N8lbKryDwY=": {
    description: "For th",
    denomUnits: [
      {
        denom: "transfer/channel-4/factory/osmo1q77cw0mmlluxu0wr29fcdd0tdnh78gzhkvhe4n6ulal9qvrtu43qtd0nh8/crazyhorse"
      },
      {
        denom: "transfer/channel-4/CRAZYHORSE",
        exponent: 6
      }
    ],
    base: "transfer/channel-4/factory/osmo1q77cw0mmlluxu0wr29fcdd0tdnh78gzhkvhe4n6ulal9qvrtu43qtd0nh8/crazyhorse",
    display: "transfer/channel-4/CRAZYHORSE",
    name: "HorseShoeBar",
    symbol: "CRAZYHORSE.ch4",
    penumbraAssetId: {
      inner: "JfJc35xgtUPmKfidDjgHDnIYQ2klmu8x4N8lbKryDwY="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/CrazyHorse.png",
        theme: {
          primaryColorHex: "#040404"
        }
      }
    ]
  },
  "JwzSnGeM1yTqaztdNGMUZE7OTkGSZ0yMa60IHPRvdQc=": {
    description: "An alloy of SUI asset variants on Osmosis.",
    denomUnits: [
      {
        denom: "transfer/channel-20/factory/osmo1nqu7rc5mj5p2cgyfp7gl3lw7kw99cltple3xtzl2cs5fyw0r2tasr7xv48/alloyed/allSUI"
      },
      {
        denom: "transfer/channel-20/sui",
        exponent: 8
      }
    ],
    base: "transfer/channel-20/factory/osmo1nqu7rc5mj5p2cgyfp7gl3lw7kw99cltple3xtzl2cs5fyw0r2tasr7xv48/alloyed/allSUI",
    display: "transfer/channel-20/sui",
    name: "Sui",
    symbol: "SUI",
    penumbraAssetId: {
      inner: "JwzSnGeM1yTqaztdNGMUZE7OTkGSZ0yMa60IHPRvdQc="
    },
    images: [
      {
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/sui/images/sui.svg",
        theme: {
          primaryColorHex: "#6fbeee"
        }
      }
    ]
  },
  "Jzu8FWtTgnL6bEL2lz8WjUrTVZYr+YC9j/aKncTPLQ4=": {
    description: "CosmoUSD",
    denomUnits: [
      {
        denom: "transfer/channel-20/factory/osmo104jtrwcljnxfljhml8mxrw7qetcsdmqvy3sprw/ucosmousd"
      },
      {
        denom: "transfer/channel-20/CosmoUSD",
        exponent: 6
      }
    ],
    base: "transfer/channel-20/factory/osmo104jtrwcljnxfljhml8mxrw7qetcsdmqvy3sprw/ucosmousd",
    display: "transfer/channel-20/CosmoUSD",
    name: "CosmoUSD",
    symbol: "COSMOUSD",
    penumbraAssetId: {
      inner: "Jzu8FWtTgnL6bEL2lz8WjUrTVZYr+YC9j/aKncTPLQ4="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/CosmoUSD.png",
        theme: {
          primaryColorHex: "#352f41"
        }
      }
    ]
  },
  "KRiGHpv2/L0vixwjgMUdOZI9JqLreJksGAv0VirTBxI=": {
    description: "ashION - Burned ION",
    denomUnits: [
      {
        denom: "transfer/channel-4/factory/osmo1svj5kd8kzj7xxtrd6ftjk0856ffpyj4egz7f9pd9dge5wr4kwansmefq07/ion.ash"
      },
      {
        denom: "transfer/channel-4/ashION",
        exponent: 6
      }
    ],
    base: "transfer/channel-4/factory/osmo1svj5kd8kzj7xxtrd6ftjk0856ffpyj4egz7f9pd9dge5wr4kwansmefq07/ion.ash",
    display: "transfer/channel-4/ashION",
    name: "Burned ION",
    symbol: "ashION.ch4",
    penumbraAssetId: {
      inner: "KRiGHpv2/L0vixwjgMUdOZI9JqLreJksGAv0VirTBxI="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/ashion.png",
        theme: {
          primaryColorHex: "#479df0"
        }
      }
    ]
  },
  "KSOgqHs6JCHxZcyFPb9zqb2vtdoNlIVktgWcsCF8RAc=": {
    description: "The native token of Osmosis",
    denomUnits: [
      {
        denom: "transfer/channel-4/uosmo"
      },
      {
        denom: "transfer/channel-4/osmo",
        exponent: 6
      }
    ],
    base: "transfer/channel-4/uosmo",
    display: "transfer/channel-4/osmo",
    name: "Osmosis",
    symbol: "OSMO.ch4",
    penumbraAssetId: {
      inner: "KSOgqHs6JCHxZcyFPb9zqb2vtdoNlIVktgWcsCF8RAc="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/osmo.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/osmo.svg",
        theme: {
          primaryColorHex: "#6b0db7"
        }
      }
    ],
    priorityScore: "8000000000",
    coingeckoId: "osmosis"
  },
  "KTJ9iZ/eNN42V2hhzs6Nlgb8zzdJmlBZZvKfCc4GiAw=": {
    description: "A clan of 11y bad kids crafting chaos on the Cosmos eco. One bad memecoin to rule them all  $BADKID. Airdropped to Badkids NFT holders and $STARS stakers. It's so bad, your wallet's throwing a tantrum for it.",
    denomUnits: [
      {
        denom: "transfer/channel-4/factory/osmo10n8rv8npx870l69248hnp6djy6pll2yuzzn9x8/BADKID"
      },
      {
        denom: "transfer/channel-4/BADKID",
        exponent: 6
      }
    ],
    base: "transfer/channel-4/factory/osmo10n8rv8npx870l69248hnp6djy6pll2yuzzn9x8/BADKID",
    display: "transfer/channel-4/BADKID",
    name: "BADKID",
    symbol: "BADKID.ch4",
    penumbraAssetId: {
      inner: "KTJ9iZ/eNN42V2hhzs6Nlgb8zzdJmlBZZvKfCc4GiAw="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/badkid.png",
        theme: {
          primaryColorHex: "#1a1a19"
        }
      }
    ]
  },
  "KWWGxjlLGRIfjHc1Ldn4hUZNTJaUNtxsqKXAJ2ZNSAY=": {
    description: "Wrapped AVAX on Axelar.",
    denomUnits: [
      {
        denom: "transfer/channel-7/wavax-wei"
      },
      {
        denom: "transfer/channel-7/avax",
        exponent: 18
      }
    ],
    base: "transfer/channel-7/wavax-wei",
    display: "transfer/channel-7/avax",
    name: "Wrapped AVAX",
    symbol: "WAVAX",
    penumbraAssetId: {
      inner: "KWWGxjlLGRIfjHc1Ldn4hUZNTJaUNtxsqKXAJ2ZNSAY="
    },
    images: [
      {
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/avalanche/images/wavax.svg",
        theme: {
          primaryColorHex: "#040404"
        }
      }
    ]
  },
  "KY6IqjGyZyfiLdykar3/fgoOWT10Fxu3Jq8YVFqDoAg=": {
    denomUnits: [
      {
        denom: "transfer/channel-8/stujuno"
      },
      {
        denom: "transfer/channel-8/stjuno",
        exponent: 6
      }
    ],
    base: "transfer/channel-8/stujuno",
    display: "transfer/channel-8/stjuno",
    name: "Stride Staked JUNO",
    symbol: "stJUNO",
    penumbraAssetId: {
      inner: "KY6IqjGyZyfiLdykar3/fgoOWT10Fxu3Jq8YVFqDoAg="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/stride/images/stjuno.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/stride/images/stjuno.svg",
        theme: {
          primaryColorHex: "#e30474"
        }
      }
    ],
    coingeckoId: "stride-staked-juno"
  },
  "KdqOKWAqwGaS9OMklvTpTO9I/lhMzys2xl8U/47aLQk=": {
    description: "pARTy (ART) - where art meets party in the interchain. A fair-launched community art token minted natively on Cosmos Hub via tokenfactory.",
    denomUnits: [
      {
        denom: "transfer/channel-22/factory/cosmos1w9ee57gnduzm4l9h6xwn9tee9pyh8wlr4r9r35/art"
      },
      {
        denom: "transfer/channel-22/art",
        exponent: 6
      }
    ],
    base: "transfer/channel-22/factory/cosmos1w9ee57gnduzm4l9h6xwn9tee9pyh8wlr4r9r35/art",
    display: "transfer/channel-22/art",
    name: "pARTy",
    symbol: "ART",
    penumbraAssetId: {
      inner: "KdqOKWAqwGaS9OMklvTpTO9I/lhMzys2xl8U/47aLQk="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/cosmoshub/images/art.png",
        theme: {
          primaryColorHex: "#c3765c"
        }
      }
    ]
  },
  "KeqcLzNx9qSH5+lcJHBB9KNW+YPrBk5dKzvPMiypahA=": {
    description: "The native token of Penumbra",
    denomUnits: [
      {
        denom: "penumbra",
        exponent: 6
      },
      {
        denom: "mpenumbra",
        exponent: 3
      },
      {
        denom: "upenumbra"
      }
    ],
    base: "upenumbra",
    display: "penumbra",
    name: "Penumbra",
    symbol: "UM",
    penumbraAssetId: {
      inner: "KeqcLzNx9qSH5+lcJHBB9KNW+YPrBk5dKzvPMiypahA="
    },
    images: [
      {
        svg: "https://raw.githubusercontent.com/penumbrafi/registry/main/images/um.svg",
        theme: {
          primaryColorHex: "#c9a975"
        }
      }
    ],
    priorityScore: "999999999999",
    coingeckoId: "penumbra"
  },
  "Kh5RK8vXnSzJNFw63CKY8MticOcV7eSf2TtT3IzzdBI=": {
    denomUnits: [
      {
        denom: "transfer/channel-8/stucmdx"
      },
      {
        denom: "transfer/channel-8/stcmdx",
        exponent: 6
      }
    ],
    base: "transfer/channel-8/stucmdx",
    display: "transfer/channel-8/stcmdx",
    name: "Stride Staked CMDX",
    symbol: "stCMDX",
    penumbraAssetId: {
      inner: "Kh5RK8vXnSzJNFw63CKY8MticOcV7eSf2TtT3IzzdBI="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/stride/images/stcmdx.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/stride/images/stcmdx.svg",
        theme: {
          primaryColorHex: "#e30473"
        }
      }
    ]
  },
  "KsJcYxPl9PI1DUJugnYzbbSf2gl1ByeJK/Tqjonebgo=": {
    description: "An alloy of POL asset variants on Osmosis.",
    denomUnits: [
      {
        denom: "transfer/channel-4/factory/osmo1fg7y3j86fkp93yxpq5q8lk8c64k8wxj3qw8us49msgpr2gsgddjqxpgr9m/alloyed/allPOL"
      },
      {
        denom: "transfer/channel-4/allPOL",
        exponent: 12
      }
    ],
    base: "transfer/channel-4/factory/osmo1fg7y3j86fkp93yxpq5q8lk8c64k8wxj3qw8us49msgpr2gsgddjqxpgr9m/alloyed/allPOL",
    display: "transfer/channel-4/allPOL",
    name: "Polygon (ex-MATIC)",
    symbol: "POL.ch4",
    penumbraAssetId: {
      inner: "KsJcYxPl9PI1DUJugnYzbbSf2gl1ByeJK/Tqjonebgo="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/polygon/images/matic-purple.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/polygon/images/matic-purple.svg",
        theme: {
          primaryColorHex: "#8344e3"
        }
      }
    ]
  },
  "KxBfQpQ3Ye+TRk+BjPSI3tZff/qu57NaR9iqLxam5gQ=": {
    description: `Jacob Haertnellez Turtle. Launched by Jake's Personally appointed TURD Cult Leader..."NotSeanO'Riley." TURD is going to lead the shitcoins of Cosmos! Or Rug You. It will be Jake's Fault. `,
    denomUnits: [
      {
        denom: "transfer/channel-20/factory/osmo1q77cw0mmlluxu0wr29fcdd0tdnh78gzhkvhe4n6ulal9qvrtu43qtd0nh8/turd"
      },
      {
        denom: "transfer/channel-20/TURD",
        exponent: 6
      }
    ],
    base: "transfer/channel-20/factory/osmo1q77cw0mmlluxu0wr29fcdd0tdnh78gzhkvhe4n6ulal9qvrtu43qtd0nh8/turd",
    display: "transfer/channel-20/TURD",
    name: "TURDLE",
    symbol: "TURD",
    penumbraAssetId: {
      inner: "KxBfQpQ3Ye+TRk+BjPSI3tZff/qu57NaR9iqLxam5gQ="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/TURD.png",
        theme: {
          primaryColorHex: "#bdef86"
        }
      }
    ]
  },
  "LC7Ukr7xj8svDSn7dUukMB1JPGZdiLRzrd1hki6yPAs=": {
    description: "Chain-key Bitcoin bridged via Omnity Network.",
    denomUnits: [
      {
        denom: "transfer/channel-20/factory/osmo10c4y9csfs8q7mtvfg4p9gd8d0acx0hpc2mte9xqzthd7rd3348tsfhaesm/sICP-icrc-ckBTC"
      },
      {
        denom: "transfer/channel-20/ckBTC",
        exponent: 8
      }
    ],
    base: "transfer/channel-20/factory/osmo10c4y9csfs8q7mtvfg4p9gd8d0acx0hpc2mte9xqzthd7rd3348tsfhaesm/sICP-icrc-ckBTC",
    display: "transfer/channel-20/ckBTC",
    name: "Chain-key Bitcoin",
    symbol: "ckBTC",
    penumbraAssetId: {
      inner: "LC7Ukr7xj8svDSn7dUukMB1JPGZdiLRzrd1hki6yPAs="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/internetcomputer/images/ckbtc.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/internetcomputer/images/ckbtc.svg",
        theme: {
          primaryColorHex: "#2ca8e2"
        }
      }
    ]
  },
  "LCnV547WcwYq7mZSsWvTN6aiq+Cn11CdhI+/LUVO2AU=": {
    description: "Community-secured Meme token on Osmosis",
    denomUnits: [
      {
        denom: "transfer/channel-4/factory/osmo1are7fpe5l6jzm9sjn7u4qkq6q77wwrrsxzlyw8lcegmmaxdukvuq4h46dx/LABS"
      },
      {
        denom: "transfer/channel-4/LABS",
        exponent: 6
      }
    ],
    base: "transfer/channel-4/factory/osmo1are7fpe5l6jzm9sjn7u4qkq6q77wwrrsxzlyw8lcegmmaxdukvuq4h46dx/LABS",
    display: "transfer/channel-4/LABS",
    name: "Labrador",
    symbol: "LABS.ch4",
    penumbraAssetId: {
      inner: "LCnV547WcwYq7mZSsWvTN6aiq+Cn11CdhI+/LUVO2AU="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/LABS.png",
        theme: {
          primaryColorHex: "#e1994b"
        }
      }
    ]
  },
  "LMAzkQ0KgrdRtlcPVP2zWjL1molRVGLYc7Gz5b1VRw4=": {
    description: "Wrapped Matic on Axelar",
    denomUnits: [
      {
        denom: "transfer/channel-7/wmatic-wei"
      },
      {
        denom: "transfer/channel-7/wmatic",
        exponent: 18
      }
    ],
    base: "transfer/channel-7/wmatic-wei",
    display: "transfer/channel-7/wmatic",
    name: "Wrapped Matic",
    symbol: "WMATIC",
    penumbraAssetId: {
      inner: "LMAzkQ0KgrdRtlcPVP2zWjL1molRVGLYc7Gz5b1VRw4="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/polygon/images/wmatic.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/polygon/images/wmatic.svg",
        theme: {
          primaryColorHex: "#2b6beb"
        }
      }
    ]
  },
  "LMhe3C4by+5uoY5dnLaiD10nJOBl1kZ2xyN+A35OKwc=": {
    description: "Formation Of $hit Tokens",
    denomUnits: [
      {
        denom: "transfer/channel-20/factory/osmo1q77cw0mmlluxu0wr29fcdd0tdnh78gzhkvhe4n6ulal9qvrtu43qtd0nh8/fost"
      },
      {
        denom: "transfer/channel-20/FOST",
        exponent: 6
      }
    ],
    base: "transfer/channel-20/factory/osmo1q77cw0mmlluxu0wr29fcdd0tdnh78gzhkvhe4n6ulal9qvrtu43qtd0nh8/fost",
    display: "transfer/channel-20/FOST",
    name: "Fost",
    symbol: "FOST",
    penumbraAssetId: {
      inner: "LMhe3C4by+5uoY5dnLaiD10nJOBl1kZ2xyN+A35OKwc="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/FOST.png",
        theme: {
          primaryColorHex: "#201604"
        }
      }
    ]
  },
  "LPgsVcmWhTA8XmOVMBwljytgYbea+ZIs/W/4MWayjRA=": {
    description: "Astropepe meme coin",
    denomUnits: [
      {
        denom: "transfer/channel-9/factory/neutron14henrqx9y328fjrdvz6l6d92r0t7g5hk86q5nd/uastropepe"
      },
      {
        denom: "transfer/channel-9/ASTROPEPE",
        exponent: 6
      }
    ],
    base: "transfer/channel-9/factory/neutron14henrqx9y328fjrdvz6l6d92r0t7g5hk86q5nd/uastropepe",
    display: "transfer/channel-9/ASTROPEPE",
    name: "AstroPepe",
    symbol: "ASTROPEPE",
    penumbraAssetId: {
      inner: "LPgsVcmWhTA8XmOVMBwljytgYbea+ZIs/W/4MWayjRA="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/neutron/images/astropepe.png",
        theme: {
          primaryColorHex: "#d0b66b"
        }
      }
    ]
  },
  "LU8O7Ir7xPiHZBy9ribdXDJLQdu3ctwVmDo75C0hvAk=": {
    description: "GLTO-ERC20 on injective",
    denomUnits: [
      {
        denom: "transfer/channel-18/peggy0xd73175f9eb15eee81745d367ae59309Ca2ceb5e2"
      },
      {
        denom: "transfer/channel-18/glto",
        exponent: 6
      }
    ],
    base: "transfer/channel-18/peggy0xd73175f9eb15eee81745d367ae59309Ca2ceb5e2",
    display: "transfer/channel-18/glto",
    name: "Gelotto",
    symbol: "GLTO",
    penumbraAssetId: {
      inner: "LU8O7Ir7xPiHZBy9ribdXDJLQdu3ctwVmDo75C0hvAk="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/ethereum/images/glto.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/ethereum/images/glto.svg",
        theme: {
          primaryColorHex: "#d5a474"
        }
      }
    ]
  },
  "LdexCcIS7h5jbSjieMV+MoC2IB1XmuKxzNNeRgq4QAQ=": {
    description: "An alloy of SOL asset variants on Osmosis.",
    denomUnits: [
      {
        denom: "transfer/channel-4/factory/osmo1n3n75av8awcnw4jl62n3l48e6e4sxqmaf97w5ua6ddu4s475q5qq9udvx4/alloyed/allSOL"
      },
      {
        denom: "transfer/channel-4/allSOL",
        exponent: 9
      }
    ],
    base: "transfer/channel-4/factory/osmo1n3n75av8awcnw4jl62n3l48e6e4sxqmaf97w5ua6ddu4s475q5qq9udvx4/alloyed/allSOL",
    display: "transfer/channel-4/allSOL",
    name: "Solana",
    symbol: "SOL.ch4",
    penumbraAssetId: {
      inner: "LdexCcIS7h5jbSjieMV+MoC2IB1XmuKxzNNeRgq4QAQ="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/solana/images/sol_circle.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/solana/images/sol_circle.svg",
        theme: {
          primaryColorHex: "#54b3c4"
        }
      },
      {
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/solana/images/sol.svg",
        theme: {
          primaryColorHex: "#5da1ca"
        }
      }
    ],
    priorityScore: "6000000000",
    coingeckoId: "osmosis-allsol"
  },
  "LxNVMf/SJsusrDEYZUN3Dfc4c4N2DV7FgiD0Vo867g8=": {
    description: "The native STARS token, migrated from Stargaze to the Cosmos Hub.",
    denomUnits: [
      {
        denom: "transfer/channel-0/factory/cosmos1s8qx0zvz8yd6e4x0mqmqf7fr9vvfn6226hkvrq/ustars"
      },
      {
        denom: "transfer/channel-0/stars",
        exponent: 6
      }
    ],
    base: "transfer/channel-0/factory/cosmos1s8qx0zvz8yd6e4x0mqmqf7fr9vvfn6226hkvrq/ustars",
    display: "transfer/channel-0/stars",
    name: "Stargaze",
    symbol: "STARS.ch0",
    penumbraAssetId: {
      inner: "LxNVMf/SJsusrDEYZUN3Dfc4c4N2DV7FgiD0Vo867g8="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/cosmoshub/images/stars.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/cosmoshub/images/stars.svg",
        theme: {
          primaryColorHex: "#eb0473"
        }
      }
    ],
    coingeckoId: "stargaze"
  },
  "MMDbC4jQ7GUP6yEU+Yo2xkW85LyRKJASJN4MPHAPmhE=": {
    description: "Levana Well-funded Perps is a protocol for perpetual swaps, which are leveraged trading contracts.",
    denomUnits: [
      {
        denom: "transfer/channel-4/factory/osmo1mlng7pz4pnyxtpq0akfwall37czyk9lukaucsrn30ameplhhshtqdvfm5c/ulvn"
      },
      {
        denom: "transfer/channel-4/lvn",
        exponent: 6
      }
    ],
    base: "transfer/channel-4/factory/osmo1mlng7pz4pnyxtpq0akfwall37czyk9lukaucsrn30ameplhhshtqdvfm5c/ulvn",
    display: "transfer/channel-4/lvn",
    name: "Levana",
    symbol: "LVN.ch4",
    penumbraAssetId: {
      inner: "MMDbC4jQ7GUP6yEU+Yo2xkW85LyRKJASJN4MPHAPmhE="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/levana.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/levana.svg",
        theme: {
          primaryColorHex: "#4b146b"
        }
      }
    ],
    coingeckoId: "levana-protocol"
  },
  "MQbgb4DeaNVeT5W109jnJrlr5QD6wBqYk/5cGiq4jQo=": {
    description: "Auto-compounding vault for Membrane's Stability Pool used to ease the UX of compounding CDT",
    denomUnits: [
      {
        denom: "transfer/channel-20/factory/osmo1jw6r68y0uhfmqagc7uhtdddctc7wq95pncvrqnvtd47w4hx46p7se9nju5/earn-cdt"
      },
      {
        denom: "transfer/channel-20/earnCDT",
        exponent: 6
      }
    ],
    base: "transfer/channel-20/factory/osmo1jw6r68y0uhfmqagc7uhtdddctc7wq95pncvrqnvtd47w4hx46p7se9nju5/earn-cdt",
    display: "transfer/channel-20/earnCDT",
    name: "Earn CDT Vault",
    symbol: "earnCDT",
    penumbraAssetId: {
      inner: "MQbgb4DeaNVeT5W109jnJrlr5QD6wBqYk/5cGiq4jQo="
    }
  },
  "MSI0pPxpG8X6m5Q2gDumdtTU3sza8oYo3tmap3h5WQc=": {
    description: "For th",
    denomUnits: [
      {
        denom: "transfer/channel-20/factory/osmo1q77cw0mmlluxu0wr29fcdd0tdnh78gzhkvhe4n6ulal9qvrtu43qtd0nh8/crazyhorse"
      },
      {
        denom: "transfer/channel-20/CRAZYHORSE",
        exponent: 6
      }
    ],
    base: "transfer/channel-20/factory/osmo1q77cw0mmlluxu0wr29fcdd0tdnh78gzhkvhe4n6ulal9qvrtu43qtd0nh8/crazyhorse",
    display: "transfer/channel-20/CRAZYHORSE",
    name: "HorseShoeBar",
    symbol: "CRAZYHORSE",
    penumbraAssetId: {
      inner: "MSI0pPxpG8X6m5Q2gDumdtTU3sza8oYo3tmap3h5WQc="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/CrazyHorse.png",
        theme: {
          primaryColorHex: "#040404"
        }
      }
    ]
  },
  "McCafoNb60lBtL1I77ADhx0GII9EHH8iCqmpGro3Pgk=": {
    description: "An alloy of PEPE asset variants on Osmosis.",
    denomUnits: [
      {
        denom: "transfer/channel-4/factory/osmo1nnlxegt0scm9qkzys9c874t0ntapv4epfjy2w49c0xdrp3dr0v4ssmelzx/alloyed/allPEPE"
      },
      {
        denom: "transfer/channel-4/pepe",
        exponent: 12
      }
    ],
    base: "transfer/channel-4/factory/osmo1nnlxegt0scm9qkzys9c874t0ntapv4epfjy2w49c0xdrp3dr0v4ssmelzx/alloyed/allPEPE",
    display: "transfer/channel-4/pepe",
    name: "Pepe",
    symbol: "allPEPE.ch4",
    penumbraAssetId: {
      inner: "McCafoNb60lBtL1I77ADhx0GII9EHH8iCqmpGro3Pgk="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/ethereum/images/pepe.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/ethereum/images/pepe.svg",
        theme: {
          primaryColorHex: "#c5282e"
        }
      }
    ],
    coingeckoId: "osmosis-allpepe"
  },
  "Md6xXujgk0jvdUPhlf/05wvTeXDEh8X/bDurrVJw2gU=": {
    description: "Banana Vault Token - Peelworks Factory II",
    denomUnits: [
      {
        denom: "transfer/channel-4/factory/osmo1xu0gk9aggv79597xwazyfzaggv2pze9z7cq3p9p72tkkux9a7xaqufa792/BVT"
      },
      {
        denom: "transfer/channel-4/BVT0",
        exponent: 18
      }
    ],
    base: "transfer/channel-4/factory/osmo1xu0gk9aggv79597xwazyfzaggv2pze9z7cq3p9p72tkkux9a7xaqufa792/BVT",
    display: "transfer/channel-4/BVT0",
    name: "Peelworks Factory",
    symbol: "BVT0.ch4",
    penumbraAssetId: {
      inner: "Md6xXujgk0jvdUPhlf/05wvTeXDEh8X/bDurrVJw2gU="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/BVT0.png",
        theme: {
          primaryColorHex: "#b2c4b9"
        }
      }
    ]
  },
  "MxTwfUmSi6AkUEPIXdTHRyJWi83koyJ06QEgWl3Kbg4=": {
    description: "T7S is the utility and governance token of TheSevens - a community driven project offering NFT tools, on-chain games, staking rewards and more via our Webpage. Stakers earn multiple tokens, vote on proposals.",
    denomUnits: [
      {
        denom: "transfer/channel-20/factory/osmo1q77cw0mmlluxu0wr29fcdd0tdnh78gzhkvhe4n6ulal9qvrtu43qtd0nh8/t7s"
      },
      {
        denom: "transfer/channel-20/T7S",
        exponent: 6
      }
    ],
    base: "transfer/channel-20/factory/osmo1q77cw0mmlluxu0wr29fcdd0tdnh78gzhkvhe4n6ulal9qvrtu43qtd0nh8/t7s",
    display: "transfer/channel-20/T7S",
    name: "The Sevens",
    symbol: "T7S",
    penumbraAssetId: {
      inner: "MxTwfUmSi6AkUEPIXdTHRyJWi83koyJ06QEgWl3Kbg4="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/T7S.png",
        theme: {
          primaryColorHex: "#31f244"
        }
      }
    ]
  },
  "N1X01EuWa+PABhSItnvavUvrZ7I2eyABQiGZRA2hZRE=": {
    description: "Coinbase Wrapped Bitcoin on Axelar",
    denomUnits: [
      {
        denom: "transfer/channel-7/cbbtc-satoshi"
      },
      {
        denom: "transfer/channel-7/cbbtc",
        exponent: 8
      }
    ],
    base: "transfer/channel-7/cbbtc-satoshi",
    display: "transfer/channel-7/cbbtc",
    name: "Coinbase Wrapped Bitcoin",
    symbol: "axl-cbBTC",
    penumbraAssetId: {
      inner: "N1X01EuWa+PABhSItnvavUvrZ7I2eyABQiGZRA2hZRE="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/base/images/cbbtc.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/base/images/cbbtc.svg",
        theme: {
          primaryColorHex: "#bad1fc"
        }
      }
    ]
  },
  "N2QcFox6Cd7LkOwl97gOOVXMkcHDudNz+ddtQNNJQww=": {
    description: "Internet Computer bridged via Omnity Network.",
    denomUnits: [
      {
        denom: "transfer/channel-20/factory/osmo10c4y9csfs8q7mtvfg4p9gd8d0acx0hpc2mte9xqzthd7rd3348tsfhaesm/sICP-native-ICP"
      },
      {
        denom: "transfer/channel-20/icp",
        exponent: 8
      }
    ],
    base: "transfer/channel-20/factory/osmo10c4y9csfs8q7mtvfg4p9gd8d0acx0hpc2mte9xqzthd7rd3348tsfhaesm/sICP-native-ICP",
    display: "transfer/channel-20/icp",
    name: "Internet Computer",
    symbol: "ICP",
    penumbraAssetId: {
      inner: "N2QcFox6Cd7LkOwl97gOOVXMkcHDudNz+ddtQNNJQww="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/internetcomputer/images/icp.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/internetcomputer/images/icp.svg",
        theme: {
          primaryColorHex: "#e3e3e3"
        }
      }
    ]
  },
  "N6cjbF+9/ztCnmEb035XRlDJCgxwm4Q+apv5m73ZGgA=": {
    description: "The permissioned staking asset for Noble Chain",
    denomUnits: [
      {
        denom: "transfer/channel-2/ustake"
      },
      {
        denom: "transfer/channel-2/stake",
        exponent: 6
      }
    ],
    base: "transfer/channel-2/ustake",
    display: "transfer/channel-2/stake",
    name: "Stake",
    symbol: "STAKE",
    penumbraAssetId: {
      inner: "N6cjbF+9/ztCnmEb035XRlDJCgxwm4Q+apv5m73ZGgA="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/noble/images/stake.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/noble/images/stake.svg",
        theme: {
          primaryColorHex: "#a9bbfb"
        }
      }
    ]
  },
  "NOESp7JdfFAbqjvjFqMAk/lwF+eIii+VIU5ZjCj62Qo=": {
    description: "Fractionalized Mad Scientists",
    denomUnits: [
      {
        denom: "transfer/channel-4/factory/osmo1dywfmhyc8y0wga7qpzej0x0mgwqg25fj4eccp494w8yafzdpgamsx9ryyv/fMAD"
      },
      {
        denom: "transfer/channel-4/fMAD",
        exponent: 9
      }
    ],
    base: "transfer/channel-4/factory/osmo1dywfmhyc8y0wga7qpzej0x0mgwqg25fj4eccp494w8yafzdpgamsx9ryyv/fMAD",
    display: "transfer/channel-4/fMAD",
    name: "fMAD",
    symbol: "fMAD.ch4",
    penumbraAssetId: {
      inner: "NOESp7JdfFAbqjvjFqMAk/lwF+eIii+VIU5ZjCj62Qo="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/fMAD.png",
        theme: {
          primaryColorHex: "#c8e6c9"
        }
      }
    ]
  },
  "NcfDACjHzyiH4cXuAPKAMkFJ+FKmH/1OFHVDqSn3YQI=": {
    description: "CULT - Less Brainwashing, More Utility",
    denomUnits: [
      {
        denom: "transfer/channel-4/factory/osmo1qdvwftqd8ml6t9w6dmj97m03ck5ghqqmd8y7cm/cult"
      },
      {
        denom: "transfer/channel-4/CULT",
        exponent: 6
      }
    ],
    base: "transfer/channel-4/factory/osmo1qdvwftqd8ml6t9w6dmj97m03ck5ghqqmd8y7cm/cult",
    display: "transfer/channel-4/CULT",
    name: "CULT",
    symbol: "CULT.ch4",
    penumbraAssetId: {
      inner: "NcfDACjHzyiH4cXuAPKAMkFJ+FKmH/1OFHVDqSn3YQI="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/cult.png",
        theme: {
          primaryColorHex: "#f1a507"
        }
      }
    ]
  },
  "NvehO9xjv8Xe9rdTMuamYB5tqQcdCW80XwDdpa7UHwk=": {
    description: "The first native memecoin on Osmosis. Crafted by the deftest of hands in the lab of lunacy. It's scientifically anarchic, professionally foolish, and your ticket to the madhouse.",
    denomUnits: [
      {
        denom: "transfer/channel-20/factory/osmo1pfyxruwvtwk00y8z06dh2lqjdj82ldvy74wzm3/WOSMO"
      },
      {
        denom: "transfer/channel-20/WOSMO",
        exponent: 6
      }
    ],
    base: "transfer/channel-20/factory/osmo1pfyxruwvtwk00y8z06dh2lqjdj82ldvy74wzm3/WOSMO",
    display: "transfer/channel-20/WOSMO",
    name: "WOSMO",
    symbol: "WOSMO",
    penumbraAssetId: {
      inner: "NvehO9xjv8Xe9rdTMuamYB5tqQcdCW80XwDdpa7UHwk="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/wosmo.png",
        theme: {
          primaryColorHex: "#2c0d6c"
        }
      }
    ]
  },
  "Nz372A15H4HG+u7xSYPQJe4MDuymVL4QzzAvaqMl8go=": {
    description: "Legend token",
    denomUnits: [
      {
        denom: "transfer/channel-20/factory/osmo1c3sjhsneuajqn4ke84kqqaf26ct5cjs8z5ale0yv7096wh6fyf6qxmgkph/leg"
      },
      {
        denom: "transfer/channel-20/LEG",
        exponent: 6
      }
    ],
    base: "transfer/channel-20/factory/osmo1c3sjhsneuajqn4ke84kqqaf26ct5cjs8z5ale0yv7096wh6fyf6qxmgkph/leg",
    display: "transfer/channel-20/LEG",
    name: "LEG",
    symbol: "LEG",
    penumbraAssetId: {
      inner: "Nz372A15H4HG+u7xSYPQJe4MDuymVL4QzzAvaqMl8go="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/leg.png",
        theme: {
          primaryColorHex: "#c2c4c3"
        }
      }
    ]
  },
  "ORCGkcQbHhhuJnjz8KuSHaeD7d7oLT1tvea8aMVLtQw=": {
    description: "Distributing happiness, is a serious business",
    denomUnits: [
      {
        denom: "transfer/channel-18/factory/inj178zy7myyxewek7ka7v9hru8ycpvfnen6xeps89/DRUGS"
      },
      {
        denom: "transfer/channel-18/DRUGS",
        exponent: 6
      }
    ],
    base: "transfer/channel-18/factory/inj178zy7myyxewek7ka7v9hru8ycpvfnen6xeps89/DRUGS",
    display: "transfer/channel-18/DRUGS",
    name: "DRUGS",
    symbol: "DRUGS.factory",
    penumbraAssetId: {
      inner: "ORCGkcQbHhhuJnjz8KuSHaeD7d7oLT1tvea8aMVLtQw="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/injective/images/drugs.png",
        theme: {
          primaryColorHex: "#aff95a"
        }
      }
    ]
  },
  "OUcXG7YEx8a5Nld/wCMK1aOKARlvoJtGpXHkju4LVgQ=": {
    description: "Coin to support the real world in Wilhelmshall im Huy",
    denomUnits: [
      {
        denom: "transfer/channel-4/factory/osmo1q77cw0mmlluxu0wr29fcdd0tdnh78gzhkvhe4n6ulal9qvrtu43qtd0nh8/wiha"
      },
      {
        denom: "transfer/channel-4/WIHA",
        exponent: 6
      }
    ],
    base: "transfer/channel-4/factory/osmo1q77cw0mmlluxu0wr29fcdd0tdnh78gzhkvhe4n6ulal9qvrtu43qtd0nh8/wiha",
    display: "transfer/channel-4/WIHA",
    name: "WiliHall",
    symbol: "WIHA.ch4",
    penumbraAssetId: {
      inner: "OUcXG7YEx8a5Nld/wCMK1aOKARlvoJtGpXHkju4LVgQ="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/WIHA.png",
        theme: {
          primaryColorHex: "#151412"
        }
      }
    ]
  },
  "OoF3KTZTk0SHDFx0fNfNMYuepDiGewhe1q4PFh77/w4=": {
    description: "Aave on Axelar",
    denomUnits: [
      {
        denom: "transfer/channel-7/aave-wei"
      },
      {
        denom: "transfer/channel-7/aave",
        exponent: 18
      }
    ],
    base: "transfer/channel-7/aave-wei",
    display: "transfer/channel-7/aave",
    name: "Aave",
    symbol: "AAVE",
    penumbraAssetId: {
      inner: "OoF3KTZTk0SHDFx0fNfNMYuepDiGewhe1q4PFh77/w4="
    },
    images: [
      {
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/ethereum/images/aave.svg",
        theme: {
          primaryColorHex: "#6c8ab4"
        }
      }
    ]
  },
  "Orc48lgn3n+fPgKZEvsioa5NyosT8XFQdOr1o1fisA0=": {
    description: "Fractionalized Atlas DAO",
    denomUnits: [
      {
        denom: "transfer/channel-4/factory/osmo1dywfmhyc8y0wga7qpzej0x0mgwqg25fj4eccp494w8yafzdpgamsx9ryyv/fATLAS"
      },
      {
        denom: "transfer/channel-4/fATLAS",
        exponent: 9
      }
    ],
    base: "transfer/channel-4/factory/osmo1dywfmhyc8y0wga7qpzej0x0mgwqg25fj4eccp494w8yafzdpgamsx9ryyv/fATLAS",
    display: "transfer/channel-4/fATLAS",
    name: "fATLAS",
    symbol: "fATLAS.ch4",
    penumbraAssetId: {
      inner: "Orc48lgn3n+fPgKZEvsioa5NyosT8XFQdOr1o1fisA0="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/fATLAS.png",
        theme: {
          primaryColorHex: "#222222"
        }
      }
    ]
  },
  "Oub7StLSW7l7FO1SejnC4l8gvK6C4/9YuOnbbnfwqxA=": {
    description: "The cutest NEWT token on Neutron chain.",
    denomUnits: [
      {
        denom: "transfer/channel-9/factory/neutron1p8d89wvxyjcnawmgw72klknr3lg9gwwl6ypxda/newt"
      },
      {
        denom: "transfer/channel-9/newt",
        exponent: 6
      }
    ],
    base: "transfer/channel-9/factory/neutron1p8d89wvxyjcnawmgw72klknr3lg9gwwl6ypxda/newt",
    display: "transfer/channel-9/newt",
    name: "Newt",
    symbol: "NEWT",
    penumbraAssetId: {
      inner: "Oub7StLSW7l7FO1SejnC4l8gvK6C4/9YuOnbbnfwqxA="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/neutron/images/newt.png",
        theme: {
          primaryColorHex: "#e0bc6b"
        }
      }
    ]
  },
  "P2nfAmaAzrvMMw+d1Frmhrb1cRTKluUc+ML7IJ+/Pwc=": {
    denomUnits: [
      {
        denom: "transfer/channel-7/wsteth-wei"
      },
      {
        denom: "transfer/channel-7/wsteth",
        exponent: 18
      }
    ],
    base: "transfer/channel-7/wsteth-wei",
    display: "transfer/channel-7/wsteth",
    name: "Wrapped Lido Staked Ether",
    symbol: "wstETH.axelar",
    penumbraAssetId: {
      inner: "P2nfAmaAzrvMMw+d1Frmhrb1cRTKluUc+ML7IJ+/Pwc="
    },
    images: [
      {
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/ethereum/images/wsteth.svg",
        theme: {
          primaryColorHex: "#9cdcfc"
        }
      }
    ]
  },
  "P928xm2+hBkMqojONs0jkgFP+59sLnyYYOOStAHPDQ8=": {
    description: "ALLiN Gaming is a GameFi platform on Dymension and Osmosis, featuring casino games, PvP games, and prediction markets. It offers a fun, transparent, and rewarding experience with a unique points system.",
    denomUnits: [
      {
        denom: "transfer/channel-20/factory/osmo1gzcz4anh88fz3vanx0842gsa3y8jcvck3qw90e/uallin"
      },
      {
        denom: "transfer/channel-20/allin",
        exponent: 6
      }
    ],
    base: "transfer/channel-20/factory/osmo1gzcz4anh88fz3vanx0842gsa3y8jcvck3qw90e/uallin",
    display: "transfer/channel-20/allin",
    name: "ALLIN",
    symbol: "ALLIN",
    penumbraAssetId: {
      inner: "P928xm2+hBkMqojONs0jkgFP+59sLnyYYOOStAHPDQ8="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/allin.png",
        theme: {
          primaryColorHex: "#f0e31e"
        }
      }
    ]
  },
  "PEyFiIQTuHTPUq9tsGkOds50VbX4ePoKBXZTG3oJMAo=": {
    description: "An alloy of TRUMP asset variants on Osmosis.",
    denomUnits: [
      {
        denom: "transfer/channel-20/factory/osmo1524q4dt7ckx25daydfd0ya0hyu6t26ch5509nvmxm4gcvuhk0fvs8qzl5q/alloyed/allTRUMP"
      },
      {
        denom: "transfer/channel-20/allTRUMP",
        exponent: 6
      }
    ],
    base: "transfer/channel-20/factory/osmo1524q4dt7ckx25daydfd0ya0hyu6t26ch5509nvmxm4gcvuhk0fvs8qzl5q/alloyed/allTRUMP",
    display: "transfer/channel-20/allTRUMP",
    name: "Official Trump",
    symbol: "TRUMP",
    penumbraAssetId: {
      inner: "PEyFiIQTuHTPUq9tsGkOds50VbX4ePoKBXZTG3oJMAo="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/solana/images/trump.png",
        theme: {
          primaryColorHex: "#e1d4a5"
        }
      }
    ]
  },
  "PT6qKy4Pi7Npzcs3e2BUthWie179C/rpQvtlrcSQhwU=": {
    description: "Fractionalized Cryptonium Maker",
    denomUnits: [
      {
        denom: "transfer/channel-4/factory/osmo1dywfmhyc8y0wga7qpzej0x0mgwqg25fj4eccp494w8yafzdpgamsx9ryyv/fCRYPTONIUM"
      },
      {
        denom: "transfer/channel-4/fCRYPTONIUM",
        exponent: 9
      }
    ],
    base: "transfer/channel-4/factory/osmo1dywfmhyc8y0wga7qpzej0x0mgwqg25fj4eccp494w8yafzdpgamsx9ryyv/fCRYPTONIUM",
    display: "transfer/channel-4/fCRYPTONIUM",
    name: "fCRYPTONIUM",
    symbol: "fCRYPTONIUM.ch4",
    penumbraAssetId: {
      inner: "PT6qKy4Pi7Npzcs3e2BUthWie179C/rpQvtlrcSQhwU="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/fCRYPTONIUM.png",
        theme: {
          primaryColorHex: "#d8b29c"
        }
      }
    ]
  },
  "PdrpZrQu57ldrkZCStTGUHsPccgFtSx0xjAmGI28ggY=": {
    description: "An alloy of BTC asset variants on Osmosis.",
    denomUnits: [
      {
        denom: "transfer/channel-20/factory/osmo1z6r6qdknhgsc0zeracktgpcxf43j6sekq07nw8sxduc9lg0qjjlqfu25e3/alloyed/allBTC"
      },
      {
        denom: "transfer/channel-20/allBTC",
        exponent: 8
      }
    ],
    base: "transfer/channel-20/factory/osmo1z6r6qdknhgsc0zeracktgpcxf43j6sekq07nw8sxduc9lg0qjjlqfu25e3/alloyed/allBTC",
    display: "transfer/channel-20/allBTC",
    name: "Bitcoin",
    symbol: "allBTC",
    penumbraAssetId: {
      inner: "PdrpZrQu57ldrkZCStTGUHsPccgFtSx0xjAmGI28ggY="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/bitcoin/images/btc.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/bitcoin/images/btc.svg",
        theme: {
          primaryColorHex: "#fce8ce"
        }
      }
    ],
    priorityScore: "600000000000",
    coingeckoId: "osmosis-allbtc"
  },
  "PfJDf0NlJfecKDCV4rv6QCQWpF79Q/bdLdYvRJUsQAY=": {
    description: "Levana Well-funded Perps is a protocol for perpetual swaps, which are leveraged trading contracts.",
    denomUnits: [
      {
        denom: "transfer/channel-20/factory/osmo1mlng7pz4pnyxtpq0akfwall37czyk9lukaucsrn30ameplhhshtqdvfm5c/ulvn"
      },
      {
        denom: "transfer/channel-20/lvn",
        exponent: 6
      }
    ],
    base: "transfer/channel-20/factory/osmo1mlng7pz4pnyxtpq0akfwall37czyk9lukaucsrn30ameplhhshtqdvfm5c/ulvn",
    display: "transfer/channel-20/lvn",
    name: "Levana",
    symbol: "LVN",
    penumbraAssetId: {
      inner: "PfJDf0NlJfecKDCV4rv6QCQWpF79Q/bdLdYvRJUsQAY="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/levana.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/levana.svg",
        theme: {
          primaryColorHex: "#4b146b"
        }
      }
    ],
    coingeckoId: "levana-protocol"
  },
  "PjouKv626JSUImljc13/bCeQ7owkX/7mjErTF3P/bgw=": {
    denomUnits: [
      {
        denom: "transfer/channel-7/base-weth-wei"
      },
      {
        denom: "transfer/channel-7/base-weth",
        exponent: 18
      }
    ],
    base: "transfer/channel-7/base-weth-wei",
    display: "transfer/channel-7/base-weth",
    name: "Base axlETH",
    symbol: "axlETH.base",
    penumbraAssetId: {
      inner: "PjouKv626JSUImljc13/bCeQ7owkX/7mjErTF3P/bgw="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/ethereum/images/eth-white.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/ethereum/images/eth-white.svg",
        theme: {
          primaryColorHex: "#8c8c8c"
        }
      },
      {
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/ethereum/images/weth.svg",
        theme: {
          primaryColorHex: "#e71e7b"
        }
      }
    ]
  },
  "PrkqbW/CDJZQk6x6xQ5daViApV6Jz8VeZzoLdpxJegY=": {
    description: "$AUTISM exists to celebrate autism as a superior biological tech stack for a changing world",
    denomUnits: [
      {
        denom: "transfer/channel-18/factory/inj14lf8xm6fcvlggpa7guxzjqwjmtr24gnvf56hvz/autism"
      },
      {
        denom: "transfer/channel-18/autism",
        exponent: 6
      }
    ],
    base: "transfer/channel-18/factory/inj14lf8xm6fcvlggpa7guxzjqwjmtr24gnvf56hvz/autism",
    display: "transfer/channel-18/autism",
    name: "Autism",
    symbol: "AUTISM",
    penumbraAssetId: {
      inner: "PrkqbW/CDJZQk6x6xQ5daViApV6Jz8VeZzoLdpxJegY="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/injective/images/autism.png",
        theme: {
          primaryColorHex: "#d2d2d3"
        }
      }
    ]
  },
  "PsEY3Xhxy5Vm8gULqiby3xiKo6MOyL7SrE+XD/tDvhE=": {
    description: "BackBone Labs Liquid Staked OSMO",
    denomUnits: [
      {
        denom: "transfer/channel-20/factory/osmo1s3l0lcqc7tu0vpj6wdjz9wqpxv8nk6eraevje4fuwkyjnwuy82qsx3lduv/boneOsmo"
      },
      {
        denom: "transfer/channel-20/bOSMO",
        exponent: 6
      }
    ],
    base: "transfer/channel-20/factory/osmo1s3l0lcqc7tu0vpj6wdjz9wqpxv8nk6eraevje4fuwkyjnwuy82qsx3lduv/boneOsmo",
    display: "transfer/channel-20/bOSMO",
    name: "BackBone Labs Liquid Staked OSMO",
    symbol: "bOSMO",
    penumbraAssetId: {
      inner: "PsEY3Xhxy5Vm8gULqiby3xiKo6MOyL7SrE+XD/tDvhE="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/bOSMO.png",
        theme: {
          primaryColorHex: "#823995"
        }
      }
    ]
  },
  "Px1BjGEeaPvgSPZX/8gDwHwwn2BWD+fjMrdu5/ZhLhI=": {
    description: "Bernese Mountain Dog — a simple dog token with a fixed supply of 132M; non-mineable, non-stakeable, no inflation, no community pool, no dev allocation; initial genesis fairdrop was a tribute to stakers and LPs of the three-headed-dog chain before it stopped.",
    denomUnits: [
      {
        denom: "transfer/channel-4/factory/osmo1s6ht8qrm8x0eg8xag5x3ckx9mse9g4se248yss/BERNESE"
      },
      {
        denom: "transfer/channel-4/BERNESE",
        exponent: 6
      }
    ],
    base: "transfer/channel-4/factory/osmo1s6ht8qrm8x0eg8xag5x3ckx9mse9g4se248yss/BERNESE",
    display: "transfer/channel-4/BERNESE",
    name: "BERNESE",
    symbol: "BERNESE.ch4",
    penumbraAssetId: {
      inner: "Px1BjGEeaPvgSPZX/8gDwHwwn2BWD+fjMrdu5/ZhLhI="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/bernese.png",
        theme: {
          primaryColorHex: "#e67550"
        }
      }
    ]
  },
  "QCrnqqh9Qi+vwf9Fst5vq1yMI1F/cP1zX0bGwXGBBxI=": {
    description: "Mars Protocol is a cross-collateralized Money Market Protocol on Neutron and Osmosis.",
    denomUnits: [
      {
        denom: "transfer/channel-9/factory/neutron1ndu2wvkrxtane8se2tr48gv7nsm46y5gcqjhux/MARS"
      },
      {
        denom: "transfer/channel-9/MARS",
        exponent: 6
      }
    ],
    base: "transfer/channel-9/factory/neutron1ndu2wvkrxtane8se2tr48gv7nsm46y5gcqjhux/MARS",
    display: "transfer/channel-9/MARS",
    name: "Mars Protocol",
    symbol: "MARS",
    penumbraAssetId: {
      inner: "QCrnqqh9Qi+vwf9Fst5vq1yMI1F/cP1zX0bGwXGBBxI="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/neutron/images/mars-token.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/neutron/images/mars-token.svg",
        theme: {
          primaryColorHex: "#f0e3e3"
        }
      }
    ]
  },
  "QDkB9ymMuORf7EUx0VT8Z+ZR604KxF1GAvg1IZDOnxI=": {
    description: "Factory Wrapped hINJ - Hydro Staked INJ",
    denomUnits: [
      {
        denom: "transfer/channel-18/factory/inj14ejqjyq8um4p3xfqj74yld5waqljf88f9eneuk/inj18luqttqyckgpddndh8hvaq25d5nfwjc78m56lc"
      },
      {
        denom: "transfer/channel-18/Hydro Wrapped hINJ",
        exponent: 18
      }
    ],
    base: "transfer/channel-18/factory/inj14ejqjyq8um4p3xfqj74yld5waqljf88f9eneuk/inj18luqttqyckgpddndh8hvaq25d5nfwjc78m56lc",
    display: "transfer/channel-18/Hydro Wrapped hINJ",
    name: "Hydro Wrapped hINJ",
    symbol: "hINJ.factory",
    penumbraAssetId: {
      inner: "QDkB9ymMuORf7EUx0VT8Z+ZR604KxF1GAvg1IZDOnxI="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/injective/images/hinj.png",
        theme: {
          primaryColorHex: "#ef350a"
        }
      }
    ]
  },
  "QFjIaLO4iuoCR36PQ2R5BiKPbwLmptMGtNx/caaQ2wA=": {
    description: "Memecoin for The International Brane Wave",
    denomUnits: [
      {
        denom: "transfer/channel-20/factory/osmo13gu58hzw3e9aqpj25h67m7snwcjuccd7v4p55w/brnz"
      }
    ],
    base: "transfer/channel-20/factory/osmo13gu58hzw3e9aqpj25h67m7snwcjuccd7v4p55w/brnz",
    display: "transfer/channel-20/factory/osmo13gu58hzw3e9aqpj25h67m7snwcjuccd7v4p55w/brnz",
    name: "Branez",
    symbol: "BRNZ",
    penumbraAssetId: {
      inner: "QFjIaLO4iuoCR36PQ2R5BiKPbwLmptMGtNx/caaQ2wA="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/BRNZ.png",
        theme: {
          primaryColorHex: "#e929ac"
        }
      }
    ]
  },
  "QNxSHbs7l8blcWkjfSG91qLZa7xW9AdfUB106LE9owo=": {
    description: "An alloy of SHIB asset variants on Osmosis.",
    denomUnits: [
      {
        denom: "transfer/channel-20/factory/osmo1f588gk9dazpsueevdl2w6wfkmfmhg5gdvg2uerdlzl0atkasqhsq59qc6a/alloyed/allSHIB"
      },
      {
        denom: "transfer/channel-20/shib",
        exponent: 12
      }
    ],
    base: "transfer/channel-20/factory/osmo1f588gk9dazpsueevdl2w6wfkmfmhg5gdvg2uerdlzl0atkasqhsq59qc6a/alloyed/allSHIB",
    display: "transfer/channel-20/shib",
    name: "Shiba Inu",
    symbol: "allSHIB",
    penumbraAssetId: {
      inner: "QNxSHbs7l8blcWkjfSG91qLZa7xW9AdfUB106LE9owo="
    },
    images: [
      {
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/ethereum/images/shib.svg",
        theme: {
          primaryColorHex: "#060505"
        }
      }
    ],
    priorityScore: "500000000000",
    coingeckoId: "osmosis-allshib"
  },
  "QU5yP3S9mHwCzLyZdYXtUrGW4v/nWzeTqmjMKZZiaRA=": {
    description: "An alloy of BTC asset variants on Osmosis.",
    denomUnits: [
      {
        denom: "transfer/channel-4/factory/osmo1z6r6qdknhgsc0zeracktgpcxf43j6sekq07nw8sxduc9lg0qjjlqfu25e3/alloyed/allBTC"
      },
      {
        denom: "transfer/channel-4/allBTC",
        exponent: 8
      }
    ],
    base: "transfer/channel-4/factory/osmo1z6r6qdknhgsc0zeracktgpcxf43j6sekq07nw8sxduc9lg0qjjlqfu25e3/alloyed/allBTC",
    display: "transfer/channel-4/allBTC",
    name: "Bitcoin",
    symbol: "allBTC.ch4",
    penumbraAssetId: {
      inner: "QU5yP3S9mHwCzLyZdYXtUrGW4v/nWzeTqmjMKZZiaRA="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/bitcoin/images/btc.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/bitcoin/images/btc.svg",
        theme: {
          primaryColorHex: "#fce8ce"
        }
      }
    ],
    priorityScore: "6000000000",
    coingeckoId: "osmosis-allbtc"
  },
  "Qd25ISoOrtLdcWKlFLIRLTlDTfrBYkuCATwtRYbVHQM=": {
    denomUnits: [
      {
        denom: "transfer/channel-7/ox-wei"
      },
      {
        denom: "transfer/channel-7/ox",
        exponent: 18
      }
    ],
    base: "transfer/channel-7/ox-wei",
    display: "transfer/channel-7/ox",
    name: "Open Exchange Token",
    symbol: "OX",
    penumbraAssetId: {
      inner: "Qd25ISoOrtLdcWKlFLIRLTlDTfrBYkuCATwtRYbVHQM="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/ethereum/images/ox.png",
        theme: {
          primaryColorHex: "#e6c72a"
        }
      }
    ]
  },
  "QhxKBl8Hc5YbL5O9wrFJ2th2s587v61phMDzdFZUTw4=": {
    denomUnits: [
      {
        denom: "udelegation_penumbravalid10n2srs5257a6nxq9x3fhcsqyc0wh8q2lp7f80qd7wlmzdm6znypse23mmh"
      },
      {
        denom: "mdelegation_penumbravalid10n2srs5257a6nxq9x3fhcsqyc0wh8q2lp7f80qd7wlmzdm6znypse23mmh",
        exponent: 3
      },
      {
        denom: "delegation_penumbravalid10n2srs5257a6nxq9x3fhcsqyc0wh8q2lp7f80qd7wlmzdm6znypse23mmh",
        exponent: 6
      }
    ],
    base: "udelegation_penumbravalid10n2srs5257a6nxq9x3fhcsqyc0wh8q2lp7f80qd7wlmzdm6znypse23mmh",
    display: "delegation_penumbravalid10n2srs5257a6nxq9x3fhcsqyc0wh8q2lp7f80qd7wlmzdm6znypse23mmh",
    symbol: "delUM(ghostinnet)",
    penumbraAssetId: {
      inner: "QhxKBl8Hc5YbL5O9wrFJ2th2s587v61phMDzdFZUTw4="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/penumbrafi/registry/main/images/validators/penumbravalid10n2srs5257a6nxq9x3fhcsqyc0wh8q2lp7f80qd7wlmzdm6znypse23mmh.png",
        theme: {
          primaryColorHex: "#dd2912"
        }
      }
    ]
  },
  "QnAMDwszxX3EMgb3dFGw2dcGaN9najQfY5+kTxD85g8=": {
    description: "An alloy of APTOS asset variants on Osmosis.",
    denomUnits: [
      {
        denom: "transfer/channel-4/factory/osmo1zynnzvwdu72zc4mxqnnp348ksfmayldqyfs8khdud3myr7m5h8nsqwta2v/alloyed/allAPT"
      },
      {
        denom: "transfer/channel-4/APT",
        exponent: 8
      }
    ],
    base: "transfer/channel-4/factory/osmo1zynnzvwdu72zc4mxqnnp348ksfmayldqyfs8khdud3myr7m5h8nsqwta2v/alloyed/allAPT",
    display: "transfer/channel-4/APT",
    name: "Aptos Coin",
    symbol: "APT.ch4",
    penumbraAssetId: {
      inner: "QnAMDwszxX3EMgb3dFGw2dcGaN9najQfY5+kTxD85g8="
    },
    images: [
      {
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/aptos/images/aptos.svg",
        theme: {
          primaryColorHex: "#040404"
        }
      },
      {
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/aptos/images/apt-dm.svg",
        theme: {
          primaryColorHex: "#c4c4c4"
        }
      }
    ]
  },
  "Qr22nGRhXnitkbr/XF5n1CBjSW4zh6mHtUsLbe7FIAk=": {
    description: "Governance token of Kava Lend Protocol",
    denomUnits: [
      {
        denom: "transfer/channel-21/hard"
      },
      {
        denom: "transfer/channel-21/HARD",
        exponent: 6
      }
    ],
    base: "transfer/channel-21/hard",
    display: "transfer/channel-21/HARD",
    name: "Kava Hard",
    symbol: "HARD",
    penumbraAssetId: {
      inner: "Qr22nGRhXnitkbr/XF5n1CBjSW4zh6mHtUsLbe7FIAk="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/kava/images/hard.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/kava/images/hard.svg",
        theme: {
          primaryColorHex: "#7c34ac"
        }
      }
    ],
    coingeckoId: "kava-lend"
  },
  "Qu54v14zKyAjAL1yxYGuk/kHawPvNrtZoa+TREUwyxE=": {
    description: "A group of french boulanger who wanna bring fun and baguette on cosmos",
    denomUnits: [
      {
        denom: "transfer/channel-20/factory/osmo1q77cw0mmlluxu0wr29fcdd0tdnh78gzhkvhe4n6ulal9qvrtu43qtd0nh8/bag"
      },
      {
        denom: "transfer/channel-20/BAG",
        exponent: 6
      }
    ],
    base: "transfer/channel-20/factory/osmo1q77cw0mmlluxu0wr29fcdd0tdnh78gzhkvhe4n6ulal9qvrtu43qtd0nh8/bag",
    display: "transfer/channel-20/BAG",
    name: "Baguette",
    symbol: "BAG",
    penumbraAssetId: {
      inner: "Qu54v14zKyAjAL1yxYGuk/kHawPvNrtZoa+TREUwyxE="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/BAG.png",
        theme: {
          primaryColorHex: "#9f6c3b"
        }
      }
    ]
  },
  "Quu49DrgokgwjsRfiv8OH4jc1sAvKLPEAjgesRYzjA8=": {
    description: "TRONIX is the mainnet native token of the TRON Protocol issued by TRON DAO, known as TRX.",
    denomUnits: [
      {
        denom: "transfer/channel-20/factory/osmo1myv2g72h8dan7n4hx7stt3mmust6ws03zh6gxc7vz4hpmgp5z3lq9aunm9/TRX.rt"
      },
      {
        denom: "transfer/channel-20/trx",
        exponent: 6
      }
    ],
    base: "transfer/channel-20/factory/osmo1myv2g72h8dan7n4hx7stt3mmust6ws03zh6gxc7vz4hpmgp5z3lq9aunm9/TRX.rt",
    display: "transfer/channel-20/trx",
    name: "Tron (Router)",
    symbol: "TRX.rt",
    penumbraAssetId: {
      inner: "Quu49DrgokgwjsRfiv8OH4jc1sAvKLPEAjgesRYzjA8="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/tron/images/trx.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/tron/images/trx.svg",
        theme: {
          primaryColorHex: "#fb040c"
        }
      }
    ]
  },
  "R+Y5/877zMGYZWkHuHR/33tIatSHnplaSlsFyy8+pAM=": {
    description: "Beer Is Good for You!",
    denomUnits: [
      {
        denom: "transfer/channel-20/factory/osmo1q77cw0mmlluxu0wr29fcdd0tdnh78gzhkvhe4n6ulal9qvrtu43qtd0nh8/bwh"
      },
      {
        denom: "transfer/channel-20/bwh",
        exponent: 6
      }
    ],
    base: "transfer/channel-20/factory/osmo1q77cw0mmlluxu0wr29fcdd0tdnh78gzhkvhe4n6ulal9qvrtu43qtd0nh8/bwh",
    display: "transfer/channel-20/bwh",
    name: "BeerWifHat",
    symbol: "BWH",
    penumbraAssetId: {
      inner: "R+Y5/877zMGYZWkHuHR/33tIatSHnplaSlsFyy8+pAM="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/BWH.png",
        theme: {
          primaryColorHex: "#775038"
        }
      }
    ]
  },
  "R3ER+rODPbaYzFZXNvCd+6iHYSknFM6KGJzOraJGqQM=": {
    description: "BEAST-ERC20 on injective",
    denomUnits: [
      {
        denom: "transfer/channel-18/peggy0xA4426666addBE8c4985377d36683D17FB40c31Be"
      },
      {
        denom: "transfer/channel-18/beast",
        exponent: 6
      }
    ],
    base: "transfer/channel-18/peggy0xA4426666addBE8c4985377d36683D17FB40c31Be",
    display: "transfer/channel-18/beast",
    name: "Gelotto BEAST",
    symbol: "BEAST",
    penumbraAssetId: {
      inner: "R3ER+rODPbaYzFZXNvCd+6iHYSknFM6KGJzOraJGqQM="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/ethereum/images/beast.png",
        theme: {
          primaryColorHex: "#6d25a4"
        }
      }
    ]
  },
  "RCCSNAvC5M/35jkBCHBU6os5Auhr0Ug6FzFMU0jkiBI=": {
    description: "POSTHUMAN (PHMN) is the governance token of the POSTHUMAN DAO, issued on Cosmos Hub through TokenFactory.",
    denomUnits: [
      {
        denom: "transfer/channel-0/factory/cosmos146s5j3t7gh2g37ywm47dp8avhesu2htvjjaxq7z55e7xj0rq0k8q5qnjjy/PHMN"
      },
      {
        denom: "transfer/channel-0/phmn",
        exponent: 6
      }
    ],
    base: "transfer/channel-0/factory/cosmos146s5j3t7gh2g37ywm47dp8avhesu2htvjjaxq7z55e7xj0rq0k8q5qnjjy/PHMN",
    display: "transfer/channel-0/phmn",
    name: "POSTHUMAN",
    symbol: "PHMN.ch0",
    penumbraAssetId: {
      inner: "RCCSNAvC5M/35jkBCHBU6os5Auhr0Ug6FzFMU0jkiBI="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/cosmoshub/images/phmn.png",
        theme: {
          primaryColorHex: "#bb944d"
        }
      }
    ]
  },
  "RQ5rKT8WiMEzqpoe7lhFoSCm2jMRXK4LENOR3yRXPQw=": {
    description: "Cosmus Cartol always get rich",
    denomUnits: [
      {
        denom: "transfer/channel-20/factory/osmo1q77cw0mmlluxu0wr29fcdd0tdnh78gzhkvhe4n6ulal9qvrtu43qtd0nh8/coca"
      },
      {
        denom: "transfer/channel-20/COCA",
        exponent: 6
      }
    ],
    base: "transfer/channel-20/factory/osmo1q77cw0mmlluxu0wr29fcdd0tdnh78gzhkvhe4n6ulal9qvrtu43qtd0nh8/coca",
    display: "transfer/channel-20/COCA",
    name: "CosmusCartol",
    symbol: "COCA",
    penumbraAssetId: {
      inner: "RQ5rKT8WiMEzqpoe7lhFoSCm2jMRXK4LENOR3yRXPQw="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/COCA.png",
        theme: {
          primaryColorHex: "#dfc7ba"
        }
      }
    ]
  },
  "RR9FWDueCYkECvuKqgon8gsV6VKB13c+G1MIRfmgHgE=": {
    description: "An alloy of PEPE asset variants on Osmosis.",
    denomUnits: [
      {
        denom: "transfer/channel-20/factory/osmo1nnlxegt0scm9qkzys9c874t0ntapv4epfjy2w49c0xdrp3dr0v4ssmelzx/alloyed/allPEPE"
      },
      {
        denom: "transfer/channel-20/pepe",
        exponent: 12
      }
    ],
    base: "transfer/channel-20/factory/osmo1nnlxegt0scm9qkzys9c874t0ntapv4epfjy2w49c0xdrp3dr0v4ssmelzx/alloyed/allPEPE",
    display: "transfer/channel-20/pepe",
    name: "Pepe",
    symbol: "allPEPE",
    penumbraAssetId: {
      inner: "RR9FWDueCYkECvuKqgon8gsV6VKB13c+G1MIRfmgHgE="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/ethereum/images/pepe.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/ethereum/images/pepe.svg",
        theme: {
          primaryColorHex: "#c5282e"
        }
      }
    ]
  },
  "RZBIsRmODi+iDJM+p5IH629V5/Xvv6tMMvsrmTXBIwQ=": {
    description: "Ninja Blaze is a decentralized multi-chain gaming platform powered by Injective Blockchain.",
    denomUnits: [
      {
        denom: "transfer/channel-18/factory/inj1llr45x92t7jrqtxvc02gpkcqhqr82dvyzkr4mz/NBZ"
      },
      {
        denom: "transfer/channel-18/NBZ",
        exponent: 6
      }
    ],
    base: "transfer/channel-18/factory/inj1llr45x92t7jrqtxvc02gpkcqhqr82dvyzkr4mz/NBZ",
    display: "transfer/channel-18/NBZ",
    name: "Ninja Blaze",
    symbol: "NBZ",
    penumbraAssetId: {
      inner: "RZBIsRmODi+iDJM+p5IH629V5/Xvv6tMMvsrmTXBIwQ="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/injective/images/NBZ.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/injective/images/NBZ.svg",
        theme: {
          primaryColorHex: "#040404"
        }
      }
    ]
  },
  "Rvh55FJrd8q3kT8xYIl5ApTOc9ErxyL8m1NS5RArHxE=": {
    description: "An alloy of OP asset variants on Osmosis.",
    denomUnits: [
      {
        denom: "transfer/channel-4/factory/osmo1nufyzqlm8qhu2w7lm0l4rrax0ec8rsk69mga4tel8eare7c7ljaqpk2lyg/alloyed/allOP"
      },
      {
        denom: "transfer/channel-4/op",
        exponent: 12
      }
    ],
    base: "transfer/channel-4/factory/osmo1nufyzqlm8qhu2w7lm0l4rrax0ec8rsk69mga4tel8eare7c7ljaqpk2lyg/alloyed/allOP",
    display: "transfer/channel-4/op",
    name: "Optimism",
    symbol: "allOP.ch4",
    penumbraAssetId: {
      inner: "Rvh55FJrd8q3kT8xYIl5ApTOc9ErxyL8m1NS5RArHxE="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/optimism/images/op.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/optimism/images/op.svg",
        theme: {
          primaryColorHex: "#fb0423"
        }
      }
    ],
    priorityScore: "5000000000",
    coingeckoId: "osmosis-allop"
  },
  "Rw5reO179530Znstv1X0FLCc4mVIXLR158Q1IcJmDg0=": {
    description: "Wrapped Bitcoin on Axelar",
    denomUnits: [
      {
        denom: "transfer/channel-7/wbtc-satoshi"
      },
      {
        denom: "transfer/channel-7/wbtc",
        exponent: 8
      }
    ],
    base: "transfer/channel-7/wbtc-satoshi",
    display: "transfer/channel-7/wbtc",
    name: "Wrapped Bitcoin",
    symbol: "axlWBTC",
    penumbraAssetId: {
      inner: "Rw5reO179530Znstv1X0FLCc4mVIXLR158Q1IcJmDg0="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/ethereum/images/wbtc.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/ethereum/images/wbtc.svg",
        theme: {
          primaryColorHex: "#e4e2e5"
        }
      }
    ]
  },
  "SAJRPGYZdDZqVmlYzPvEeJFXEIZjVkXBqCn8NR5uYAQ=": {
    description: "The native governance and staking token for the Neptune Finance protocol",
    denomUnits: [
      {
        denom: "transfer/channel-18/factory/inj1v3a4zznudwpukpr8y987pu5gnh4xuf7v36jhva/nept"
      },
      {
        denom: "transfer/channel-18/NEPT",
        exponent: 6
      }
    ],
    base: "transfer/channel-18/factory/inj1v3a4zznudwpukpr8y987pu5gnh4xuf7v36jhva/nept",
    display: "transfer/channel-18/NEPT",
    name: "Neptune Finance",
    symbol: "NEPT",
    penumbraAssetId: {
      inner: "SAJRPGYZdDZqVmlYzPvEeJFXEIZjVkXBqCn8NR5uYAQ="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/injective/images/nept.png",
        theme: {
          primaryColorHex: "#0f3581"
        }
      }
    ],
    coingeckoId: "neptune-2"
  },
  "SBYNLMUsCQQJaZZYXbrDHD5u/q6rdo6sURKyBlGMtxE=": {
    description: "An alloy of DOT asset variants on Osmosis.",
    denomUnits: [
      {
        denom: "transfer/channel-4/factory/osmo1r53fx9fvcdzncrs7zkn4gw5vfelx5gk8k5wc6wqha2jpkh992rusr5tk02/alloyed/allDOT"
      },
      {
        denom: "transfer/channel-4/dot",
        exponent: 10
      }
    ],
    base: "transfer/channel-4/factory/osmo1r53fx9fvcdzncrs7zkn4gw5vfelx5gk8k5wc6wqha2jpkh992rusr5tk02/alloyed/allDOT",
    display: "transfer/channel-4/dot",
    name: "Polkadot",
    symbol: "allDOT.ch4",
    penumbraAssetId: {
      inner: "SBYNLMUsCQQJaZZYXbrDHD5u/q6rdo6sURKyBlGMtxE="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/polkadot/images/dot.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/polkadot/images/dot.svg",
        theme: {
          primaryColorHex: "#e4047c"
        }
      }
    ],
    coingeckoId: "osmosis-alldot"
  },
  "SChNnza9qDQMNGqwSoQMzB2x2M5nmEBtST1EoSy29gM=": {
    description: "An alloy of UNI asset variants on Osmosis.",
    denomUnits: [
      {
        denom: "transfer/channel-4/factory/osmo1eqjda4pc6e09jtxzxggf6jl3jye2yn453ja58we5gxwzmf5ah28qvlnaz8/alloyed/allUNI"
      },
      {
        denom: "transfer/channel-4/allUNI",
        exponent: 12
      }
    ],
    base: "transfer/channel-4/factory/osmo1eqjda4pc6e09jtxzxggf6jl3jye2yn453ja58we5gxwzmf5ah28qvlnaz8/alloyed/allUNI",
    display: "transfer/channel-4/allUNI",
    name: "Uniswap",
    symbol: "allUNI.ch4",
    penumbraAssetId: {
      inner: "SChNnza9qDQMNGqwSoQMzB2x2M5nmEBtST1EoSy29gM="
    },
    images: [
      {
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/ethereum/images/uni.svg",
        theme: {
          primaryColorHex: "#fc047c"
        }
      }
    ],
    coingeckoId: "uniswap"
  },
  "SJWTxdOg6FzGX+Yp2bQP0IHW3cOknmjxOGASdOksrA8=": {
    description: "Banana Vault Token - Banana Beach (🍹,🌴) II",
    denomUnits: [
      {
        denom: "transfer/channel-20/factory/osmo16nxtnrnl7lctvnhhpcxqmmpv63n93zgg0ukaveyc0jl4dtad79cs53c3an/BVT"
      },
      {
        denom: "transfer/channel-20/BVT1",
        exponent: 18
      }
    ],
    base: "transfer/channel-20/factory/osmo16nxtnrnl7lctvnhhpcxqmmpv63n93zgg0ukaveyc0jl4dtad79cs53c3an/BVT",
    display: "transfer/channel-20/BVT1",
    name: "Banana Beach",
    symbol: "BVT1",
    penumbraAssetId: {
      inner: "SJWTxdOg6FzGX+Yp2bQP0IHW3cOknmjxOGASdOksrA8="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/BVT1.png",
        theme: {
          primaryColorHex: "#e9edbe"
        }
      }
    ]
  },
  "SbW7AL9jbUhCub5QvW+B0bYamMinRj0Tb8+xMeNZLwk=": {
    description: "Binance USD on Axelar.",
    denomUnits: [
      {
        denom: "transfer/channel-7/busd-wei"
      },
      {
        denom: "transfer/channel-7/busd",
        exponent: 18
      }
    ],
    base: "transfer/channel-7/busd-wei",
    display: "transfer/channel-7/busd",
    name: "Binance USD",
    symbol: "BUSD",
    penumbraAssetId: {
      inner: "SbW7AL9jbUhCub5QvW+B0bYamMinRj0Tb8+xMeNZLwk="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/ethereum/images/busd.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/ethereum/images/busd.svg",
        theme: {
          primaryColorHex: "#f3bb0c"
        }
      }
    ]
  },
  "SmEz7RDk7h38jwpL+xNIsTT5XAtmWXDO60ZLve+Puw8=": {
    denomUnits: [
      {
        denom: "udelegation_penumbravalid1gq4j0hh6grl6d7apwg8z5qj97q7uhkeq0tp9qr66xe03cyrjkyrskp7s6v"
      },
      {
        denom: "mdelegation_penumbravalid1gq4j0hh6grl6d7apwg8z5qj97q7uhkeq0tp9qr66xe03cyrjkyrskp7s6v",
        exponent: 3
      },
      {
        denom: "delegation_penumbravalid1gq4j0hh6grl6d7apwg8z5qj97q7uhkeq0tp9qr66xe03cyrjkyrskp7s6v",
        exponent: 6
      }
    ],
    base: "udelegation_penumbravalid1gq4j0hh6grl6d7apwg8z5qj97q7uhkeq0tp9qr66xe03cyrjkyrskp7s6v",
    display: "delegation_penumbravalid1gq4j0hh6grl6d7apwg8z5qj97q7uhkeq0tp9qr66xe03cyrjkyrskp7s6v",
    symbol: "delUM(PathrockNetwork)",
    penumbraAssetId: {
      inner: "SmEz7RDk7h38jwpL+xNIsTT5XAtmWXDO60ZLve+Puw8="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/penumbrafi/registry/main/images/validators/penumbravalid1gq4j0hh6grl6d7apwg8z5qj97q7uhkeq0tp9qr66xe03cyrjkyrskp7s6v.png",
        theme: {
          primaryColorHex: "#14151e"
        }
      }
    ]
  },
  "SqkPQvMBCuRleo9ooI0SbN6EJspdsDZRCfZ9Q7Eeyws=": {
    description: "An alloy of FET asset variants on Osmosis.",
    denomUnits: [
      {
        denom: "transfer/channel-4/factory/osmo1mdvn6lmykp2z345ncpf647dztslyll8cyhwj9pltrc0lf7nva3cqvrp6qs/alloyed/allFET"
      },
      {
        denom: "transfer/channel-4/allFET",
        exponent: 12
      }
    ],
    base: "transfer/channel-4/factory/osmo1mdvn6lmykp2z345ncpf647dztslyll8cyhwj9pltrc0lf7nva3cqvrp6qs/alloyed/allFET",
    display: "transfer/channel-4/allFET",
    name: "Fetch.ai",
    symbol: "FET.ch4",
    penumbraAssetId: {
      inner: "SqkPQvMBCuRleo9ooI0SbN6EJspdsDZRCfZ9Q7Eeyws="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/fetchhub/images/fet.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/fetchhub/images/fet.svg",
        theme: {
          primaryColorHex: "#040404"
        }
      },
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/fetchhub/images/fet_white.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/fetchhub/images/fet_white.svg",
        theme: {
          primaryColorHex: "#e4e4e4"
        }
      }
    ]
  },
  "TNHw/+5PPN0BC2U1Q80CnhoiKx3GI8ivmb2OG6m5yAI=": {
    description: "TRONIX is the mainnet native token of the TRON Protocol issued by TRON DAO, known as TRX.",
    denomUnits: [
      {
        denom: "transfer/channel-4/factory/osmo1myv2g72h8dan7n4hx7stt3mmust6ws03zh6gxc7vz4hpmgp5z3lq9aunm9/TRX.rt"
      },
      {
        denom: "transfer/channel-4/trx",
        exponent: 6
      }
    ],
    base: "transfer/channel-4/factory/osmo1myv2g72h8dan7n4hx7stt3mmust6ws03zh6gxc7vz4hpmgp5z3lq9aunm9/TRX.rt",
    display: "transfer/channel-4/trx",
    name: "Tron (Router)",
    symbol: "TRX.rt.ch4",
    penumbraAssetId: {
      inner: "TNHw/+5PPN0BC2U1Q80CnhoiKx3GI8ivmb2OG6m5yAI="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/tron/images/trx.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/tron/images/trx.svg",
        theme: {
          primaryColorHex: "#fb040c"
        }
      }
    ],
    coingeckoId: "tron"
  },
  "TTd52XruqC2iBicsxg12rzOjkEG+n7Vu863GKZyuORA=": {
    description: "An alloy of PENGU asset variants on Osmosis.",
    denomUnits: [
      {
        denom: "transfer/channel-4/factory/osmo10nu66efsxxkdgh70xs8xur9mygrg79m5ht7zcmzsrdzxkhz7hpssz9hg9k/alloyed/allPENGU"
      },
      {
        denom: "transfer/channel-4/allPENGU",
        exponent: 6
      }
    ],
    base: "transfer/channel-4/factory/osmo10nu66efsxxkdgh70xs8xur9mygrg79m5ht7zcmzsrdzxkhz7hpssz9hg9k/alloyed/allPENGU",
    display: "transfer/channel-4/allPENGU",
    name: "Pudgy Penguins",
    symbol: "PENGU.ch4",
    penumbraAssetId: {
      inner: "TTd52XruqC2iBicsxg12rzOjkEG+n7Vu863GKZyuORA="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/solana/images/pengu.png",
        theme: {
          primaryColorHex: "#060709"
        }
      }
    ]
  },
  "U3U0P+fV2U5EqU0+kgq7qd+sjCbVhGeB6F8ix421WAc=": {
    description: "Memecoin for The International Brane Wave",
    denomUnits: [
      {
        denom: "transfer/channel-4/factory/osmo13gu58hzw3e9aqpj25h67m7snwcjuccd7v4p55w/brnz"
      }
    ],
    base: "transfer/channel-4/factory/osmo13gu58hzw3e9aqpj25h67m7snwcjuccd7v4p55w/brnz",
    display: "transfer/channel-4/factory/osmo13gu58hzw3e9aqpj25h67m7snwcjuccd7v4p55w/brnz",
    name: "Branez",
    symbol: "BRNZ.ch4",
    penumbraAssetId: {
      inner: "U3U0P+fV2U5EqU0+kgq7qd+sjCbVhGeB6F8ix421WAc="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/BRNZ.png",
        theme: {
          primaryColorHex: "#e929ac"
        }
      }
    ]
  },
  "UFqqBwFTahpJGJwFNmS8x2ZA/vDExCvnMKVFBsMFbgY=": {
    description: "An alloy of EPIX asset variants on Osmosis.",
    denomUnits: [
      {
        denom: "transfer/channel-20/factory/osmo130tfawc7katf7jwzt2rjdranhqju929rjra3xwsrfsd85hedh3tsssy9j7/alloyed/allEPIX"
      },
      {
        denom: "transfer/channel-20/allEPIX",
        exponent: 12
      }
    ],
    base: "transfer/channel-20/factory/osmo130tfawc7katf7jwzt2rjdranhqju929rjra3xwsrfsd85hedh3tsssy9j7/alloyed/allEPIX",
    display: "transfer/channel-20/allEPIX",
    name: "Epix",
    symbol: "EPIX",
    penumbraAssetId: {
      inner: "UFqqBwFTahpJGJwFNmS8x2ZA/vDExCvnMKVFBsMFbgY="
    },
    images: [
      {
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/epix/images/epix.svg",
        theme: {
          primaryColorHex: "#5f91d4"
        }
      },
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/epix/images/epix.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/epix/images/epix.svg",
        theme: {
          primaryColorHex: "#5f91d4"
        }
      }
    ]
  },
  "UQ6zDpd5oyrbaca6z2R4wPOXRNq048k/WvG4+mgxtA4=": {
    description: "Margined Power Token sqTIA",
    denomUnits: [
      {
        denom: "transfer/channel-20/factory/osmo1g8qypve6l95xmhgc0fddaecerffymsl7kn9muw/sqtia"
      },
      {
        denom: "transfer/channel-20/sqtia",
        exponent: 6
      }
    ],
    base: "transfer/channel-20/factory/osmo1g8qypve6l95xmhgc0fddaecerffymsl7kn9muw/sqtia",
    display: "transfer/channel-20/sqtia",
    name: "TIA Squared",
    symbol: "sqTIA",
    penumbraAssetId: {
      inner: "UQ6zDpd5oyrbaca6z2R4wPOXRNq048k/WvG4+mgxtA4="
    },
    images: [
      {
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/sqtia.svg",
        theme: {
          primaryColorHex: "#bbe446"
        }
      }
    ]
  },
  "UWEI0NC7o/duH5gtCnzeEYgzMHsDwM1My5TogrU8Hw8=": {
    description: "Wrapped Bitcoin (WBTC) is an ERC20 token backed 1:1 with Bitcoin. Completely transparent. 100% verifiable. Community led.",
    denomUnits: [
      {
        denom: "transfer/channel-4/factory/osmo1z0qrq605sjgcqpylfl4aa6s90x738j7m58wyatt0tdzflg2ha26q67k743/wbtc"
      },
      {
        denom: "transfer/channel-4/wbtc",
        exponent: 8
      }
    ],
    base: "transfer/channel-4/factory/osmo1z0qrq605sjgcqpylfl4aa6s90x738j7m58wyatt0tdzflg2ha26q67k743/wbtc",
    display: "transfer/channel-4/wbtc",
    name: "Wrapped Bitcoin",
    symbol: "osmoWBTC.ch4",
    penumbraAssetId: {
      inner: "UWEI0NC7o/duH5gtCnzeEYgzMHsDwM1My5TogrU8Hw8="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/ethereum/images/wbtc.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/ethereum/images/wbtc.svg",
        theme: {
          primaryColorHex: "#e4e2e5"
        }
      }
    ],
    priorityScore: "6000000000",
    coingeckoId: "wrapped-bitcoin"
  },
  "UgI2CETO8zWMoiK1P2/VhfNUsy//5YKlwtzyViRa3ww=": {
    description: "Maker on Axelar",
    denomUnits: [
      {
        denom: "transfer/channel-7/mkr-wei"
      },
      {
        denom: "transfer/channel-7/mkr",
        exponent: 18
      }
    ],
    base: "transfer/channel-7/mkr-wei",
    display: "transfer/channel-7/mkr",
    name: "Maker",
    symbol: "MKR",
    penumbraAssetId: {
      inner: "UgI2CETO8zWMoiK1P2/VhfNUsy//5YKlwtzyViRa3ww="
    },
    images: [
      {
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/ethereum/images/mkr.svg",
        theme: {
          primaryColorHex: "#5bb9a9"
        }
      }
    ]
  },
  "Ugr8HKpkY9+EFvbxfCm9GsJgj8D/jxT+umvxTDZ9VQw=": {
    description: "Astrovault AXV",
    denomUnits: [
      {
        denom: "transfer/channel-9/cw20:neutron10dxyft3nv4vpxh5vrpn0xw8geej8dw3g39g7nqp8mrm307ypssksau29af"
      },
      {
        denom: "transfer/channel-9/AXV",
        exponent: 6
      }
    ],
    base: "transfer/channel-9/cw20:neutron10dxyft3nv4vpxh5vrpn0xw8geej8dw3g39g7nqp8mrm307ypssksau29af",
    display: "transfer/channel-9/AXV",
    name: "Astrovault AXV (Neutron)",
    symbol: "AXV",
    penumbraAssetId: {
      inner: "Ugr8HKpkY9+EFvbxfCm9GsJgj8D/jxT+umvxTDZ9VQw="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/neutron/images/axv.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/neutron/images/axv.svg",
        theme: {
          primaryColorHex: "#141434"
        }
      }
    ]
  },
  "UkxOwF0fEethJexuH0JcBiIphfjVUodI6rIWz2Qu7Q8=": {
    description: "Circle's stablecoin from Polygon on Axelar",
    denomUnits: [
      {
        denom: "transfer/channel-7/polygon-uusdc"
      },
      {
        denom: "transfer/channel-7/polygon-usdc",
        exponent: 6
      }
    ],
    base: "transfer/channel-7/polygon-uusdc",
    display: "transfer/channel-7/polygon-usdc",
    name: "USD Coin from Polygon",
    symbol: "axlUSDC.polygon",
    penumbraAssetId: {
      inner: "UkxOwF0fEethJexuH0JcBiIphfjVUodI6rIWz2Qu7Q8="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/axelar/images/usdc.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/axelar/images/usdc.svg",
        theme: {
          primaryColorHex: "#2474cb"
        }
      }
    ]
  },
  "Uqxim3LGpkyOIo7EAvUaBlqfAFQRIs06JbA3jZxPiQI=": {
    description: "An alloy of AIOZ asset variants on Osmosis.",
    denomUnits: [
      {
        denom: "transfer/channel-4/factory/osmo17ceugf0nnkk228k2sulemn0s9pl3yg554462eexxs3pgq8p629us98gqae/alloyed/allAIOZ"
      },
      {
        denom: "transfer/channel-4/allAIOZ",
        exponent: 12
      }
    ],
    base: "transfer/channel-4/factory/osmo17ceugf0nnkk228k2sulemn0s9pl3yg554462eexxs3pgq8p629us98gqae/alloyed/allAIOZ",
    display: "transfer/channel-4/allAIOZ",
    name: "AIOZ Network",
    symbol: "AIOZ.ch4",
    penumbraAssetId: {
      inner: "Uqxim3LGpkyOIo7EAvUaBlqfAFQRIs06JbA3jZxPiQI="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/aioz/images/aioz.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/aioz/images/aioz.svg",
        theme: {
          primaryColorHex: "#23231b"
        }
      }
    ]
  },
  "UxSzPuz9XKLpnAttHgzK/j0t1YHJUtgU+2T99R+FxBE=": {
    description: "Celestia is a modular blockchain network focused on data availability, allowing developers to deploy their own customizable blockchains with ease.",
    denomUnits: [
      {
        denom: "transfer/channel-3/utia"
      },
      {
        denom: "transfer/channel-3/tia",
        exponent: 6
      }
    ],
    base: "transfer/channel-3/utia",
    display: "transfer/channel-3/tia",
    name: "Celestia",
    symbol: "TIA.ch3",
    penumbraAssetId: {
      inner: "UxSzPuz9XKLpnAttHgzK/j0t1YHJUtgU+2T99R+FxBE="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/celestia/images/celestia.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/celestia/images/celestia.svg",
        theme: {
          primaryColorHex: "#7c2cfb"
        }
      }
    ],
    priorityScore: "8000000000",
    coingeckoId: "celestia"
  },
  "V2lptyKrN+nUDx0axSsA5asIeVJ4FApkc8lCigJwXAo=": {
    description: "ALLiN Gaming is a GameFi platform on Dymension and Osmosis, featuring casino games, PvP games, and prediction markets. It offers a fun, transparent, and rewarding experience with a unique points system.",
    denomUnits: [
      {
        denom: "transfer/channel-4/factory/osmo1gzcz4anh88fz3vanx0842gsa3y8jcvck3qw90e/uallin"
      },
      {
        denom: "transfer/channel-4/allin",
        exponent: 6
      }
    ],
    base: "transfer/channel-4/factory/osmo1gzcz4anh88fz3vanx0842gsa3y8jcvck3qw90e/uallin",
    display: "transfer/channel-4/allin",
    name: "ALLIN",
    symbol: "ALLIN.ch4",
    penumbraAssetId: {
      inner: "V2lptyKrN+nUDx0axSsA5asIeVJ4FApkc8lCigJwXAo="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/allin.png",
        theme: {
          primaryColorHex: "#f0e31e"
        }
      }
    ]
  },
  "V572bV9yiK9nJWMM9/P5mwCeiGfT4JbMy6j2RUi93g4=": {
    description: "Fractionalized Bad Kids",
    denomUnits: [
      {
        denom: "transfer/channel-4/factory/osmo1dywfmhyc8y0wga7qpzej0x0mgwqg25fj4eccp494w8yafzdpgamsx9ryyv/fBAD"
      },
      {
        denom: "transfer/channel-4/fBAD",
        exponent: 9
      }
    ],
    base: "transfer/channel-4/factory/osmo1dywfmhyc8y0wga7qpzej0x0mgwqg25fj4eccp494w8yafzdpgamsx9ryyv/fBAD",
    display: "transfer/channel-4/fBAD",
    name: "fBAD",
    symbol: "fBAD.ch4",
    penumbraAssetId: {
      inner: "V572bV9yiK9nJWMM9/P5mwCeiGfT4JbMy6j2RUi93g4="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/fBAD.png",
        theme: {
          primaryColorHex: "#e9c4a1"
        }
      }
    ]
  },
  "V6BAFGX7JAuGaKapK16m1E3vtgtFpNEdzWPwUoOmbQo=": {
    description: "MOTION is the token of Motionism on Injective, launched on Trippy Pump (SHROOM Pad). Nothing happens until something moves.",
    denomUnits: [
      {
        denom: "transfer/channel-18/factory/inj13j2rpnlwl30c02d4pzukykwfeyyhelvry9cqte/shroom_0_3b4d31d5571b97db"
      },
      {
        denom: "transfer/channel-18/MOTION",
        exponent: 18
      }
    ],
    base: "transfer/channel-18/factory/inj13j2rpnlwl30c02d4pzukykwfeyyhelvry9cqte/shroom_0_3b4d31d5571b97db",
    display: "transfer/channel-18/MOTION",
    name: "Motion",
    symbol: "MOTION",
    penumbraAssetId: {
      inner: "V6BAFGX7JAuGaKapK16m1E3vtgtFpNEdzWPwUoOmbQo="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/injective/images/motion.png",
        theme: {
          primaryColorHex: "#83fb04"
        }
      }
    ],
    coingeckoId: "motion-6"
  },
  "V9cu9zxcEXqcd6RwuXENy3iSDDgMpFFip38ZV5ZcvgA=": {
    description: "Membrane's protocol token",
    denomUnits: [
      {
        denom: "transfer/channel-20/factory/osmo1s794h9rxggytja3a4pmwul53u98k06zy2qtrdvjnfuxruh7s8yjs6cyxgd/umbrn"
      },
      {
        denom: "transfer/channel-20/mbrn",
        exponent: 6
      }
    ],
    base: "transfer/channel-20/factory/osmo1s794h9rxggytja3a4pmwul53u98k06zy2qtrdvjnfuxruh7s8yjs6cyxgd/umbrn",
    display: "transfer/channel-20/mbrn",
    name: "Membrane",
    symbol: "MBRN",
    penumbraAssetId: {
      inner: "V9cu9zxcEXqcd6RwuXENy3iSDDgMpFFip38ZV5ZcvgA="
    },
    images: [
      {
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/MBRN.svg",
        theme: {
          primaryColorHex: "#6ca0da"
        }
      }
    ]
  },
  "V9oS4+zznPDEnVR7Dz4GGjEazn4jI4XgbuR7Qmc63hA=": {
    description: "Wrapped Ether on Axelar",
    denomUnits: [
      {
        denom: "transfer/channel-7/weth-wei"
      },
      {
        denom: "transfer/channel-7/weth",
        exponent: 18
      }
    ],
    base: "transfer/channel-7/weth-wei",
    display: "transfer/channel-7/weth",
    name: "Wrapped Ether",
    symbol: "WETH",
    penumbraAssetId: {
      inner: "V9oS4+zznPDEnVR7Dz4GGjEazn4jI4XgbuR7Qmc63hA="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/ethereum/images/eth-white.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/ethereum/images/eth-white.svg",
        theme: {
          primaryColorHex: "#8c8c8c"
        }
      },
      {
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/ethereum/images/weth.svg",
        theme: {
          primaryColorHex: "#e71e7b"
        }
      }
    ],
    coingeckoId: "axlweth"
  },
  "VD7dI7GVKShGSa7IO0uOETnYwXofS7bkYTM6DLOJrgM=": {
    description: "Kava is a decentralized finance (DeFi) platform that provides a range of financial services, including lending, borrowing, and stablecoins, leveraging the Cosmos and Ethereum ecosystems.",
    denomUnits: [
      {
        denom: "transfer/channel-21/ukava"
      },
      {
        denom: "transfer/channel-21/kava",
        exponent: 6
      }
    ],
    base: "transfer/channel-21/ukava",
    display: "transfer/channel-21/kava",
    name: "Kava",
    symbol: "KAVA",
    penumbraAssetId: {
      inner: "VD7dI7GVKShGSa7IO0uOETnYwXofS7bkYTM6DLOJrgM="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/kava/images/kava.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/kava/images/kava.svg",
        theme: {
          primaryColorHex: "#fc443c"
        }
      }
    ],
    coingeckoId: "kava"
  },
  "VDEYVUZ8ZKlhsAT2nr6NgdNdi7jREsKmFUV0U5uUxwU=": {
    description: "OnE mEmEcOiN tO cOnNeCt oL ImBeCiles - aNd in Da Cosmos BiNd DeM",
    denomUnits: [
      {
        denom: "transfer/channel-4/factory/osmo1kqdw6pvn0xww6tyfv2sqvkkencdz0qw406x54r/IBC"
      },
      {
        denom: "transfer/channel-4/IBC",
        exponent: 6
      }
    ],
    base: "transfer/channel-4/factory/osmo1kqdw6pvn0xww6tyfv2sqvkkencdz0qw406x54r/IBC",
    display: "transfer/channel-4/IBC",
    name: "IBC",
    symbol: "IBC.ch4",
    penumbraAssetId: {
      inner: "VDEYVUZ8ZKlhsAT2nr6NgdNdi7jREsKmFUV0U5uUxwU="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/ibc.png",
        theme: {
          primaryColorHex: "#040404"
        }
      }
    ]
  },
  "VJ3A7A4jV74gBYVOojNGe2zfm86D9G4Ragdb0FVyxwU=": {
    description: "Sssshhh…",
    denomUnits: [
      {
        denom: "transfer/channel-4/factory/osmo1q77cw0mmlluxu0wr29fcdd0tdnh78gzhkvhe4n6ulal9qvrtu43qtd0nh8/bomu"
      },
      {
        denom: "transfer/channel-4/BOMU",
        exponent: 6
      }
    ],
    base: "transfer/channel-4/factory/osmo1q77cw0mmlluxu0wr29fcdd0tdnh78gzhkvhe4n6ulal9qvrtu43qtd0nh8/bomu",
    display: "transfer/channel-4/BOMU",
    name: "$bomu",
    symbol: "BOMU.ch4",
    penumbraAssetId: {
      inner: "VJ3A7A4jV74gBYVOojNGe2zfm86D9G4Ragdb0FVyxwU="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/bomu.png",
        theme: {
          primaryColorHex: "#e54437"
        }
      }
    ]
  },
  "VKplP4RCQjholdRhqVOiuXIJOd7hc56GJo5aVK5F5g8=": {
    description: "An alloy of PENGU asset variants on Osmosis.",
    denomUnits: [
      {
        denom: "transfer/channel-20/factory/osmo10nu66efsxxkdgh70xs8xur9mygrg79m5ht7zcmzsrdzxkhz7hpssz9hg9k/alloyed/allPENGU"
      },
      {
        denom: "transfer/channel-20/allPENGU",
        exponent: 6
      }
    ],
    base: "transfer/channel-20/factory/osmo10nu66efsxxkdgh70xs8xur9mygrg79m5ht7zcmzsrdzxkhz7hpssz9hg9k/alloyed/allPENGU",
    display: "transfer/channel-20/allPENGU",
    name: "Pudgy Penguins",
    symbol: "PENGU",
    penumbraAssetId: {
      inner: "VKplP4RCQjholdRhqVOiuXIJOd7hc56GJo5aVK5F5g8="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/solana/images/pengu.png",
        theme: {
          primaryColorHex: "#060709"
        }
      }
    ]
  },
  "VzDVzgpZW+YmKzPs1yJkLcUJtJ6oz7ECO2zkEhvkGg0=": {
    description: "THE FIRST NATIVE GODDARD MEMECOIN ON NEUTRON",
    denomUnits: [
      {
        denom: "transfer/channel-9/factory/neutron1yqj9vcc0y73xfxjzegaj4v8q0zefevnlpuh4rj/GODDARD"
      },
      {
        denom: "transfer/channel-9/goddard",
        exponent: 6
      }
    ],
    base: "transfer/channel-9/factory/neutron1yqj9vcc0y73xfxjzegaj4v8q0zefevnlpuh4rj/GODDARD",
    display: "transfer/channel-9/goddard",
    name: "Goddard",
    symbol: "GODDARD",
    penumbraAssetId: {
      inner: "VzDVzgpZW+YmKzPs1yJkLcUJtJ6oz7ECO2zkEhvkGg0="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/neutron/images/goddard.png",
        theme: {
          primaryColorHex: "#c9d9d9"
        }
      }
    ]
  },
  "W5GBT1Lezfiwupp4I1VcHyyTDT7kJl/1Paf6P2JZuAY=": {
    description: "Wrapped FIL on Axelar",
    denomUnits: [
      {
        denom: "transfer/channel-7/wfil-wei"
      },
      {
        denom: "transfer/channel-7/fil",
        exponent: 18
      }
    ],
    base: "transfer/channel-7/wfil-wei",
    display: "transfer/channel-7/fil",
    name: "Wrapped FIL from Filecoin",
    symbol: "axlFIL",
    penumbraAssetId: {
      inner: "W5GBT1Lezfiwupp4I1VcHyyTDT7kJl/1Paf6P2JZuAY="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/filecoin/images/wfil.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/filecoin/images/wfil.svg",
        theme: {
          primaryColorHex: "#badffc"
        }
      }
    ]
  },
  "W8C0xP3tSG/DK9kcxCXqUClGs1Y+UYPiatlZqYev+wY=": {
    description: "Community-secured Meme token on Osmosis",
    denomUnits: [
      {
        denom: "transfer/channel-20/factory/osmo1are7fpe5l6jzm9sjn7u4qkq6q77wwrrsxzlyw8lcegmmaxdukvuq4h46dx/LABS"
      },
      {
        denom: "transfer/channel-20/LABS",
        exponent: 6
      }
    ],
    base: "transfer/channel-20/factory/osmo1are7fpe5l6jzm9sjn7u4qkq6q77wwrrsxzlyw8lcegmmaxdukvuq4h46dx/LABS",
    display: "transfer/channel-20/LABS",
    name: "Labrador",
    symbol: "LABS",
    penumbraAssetId: {
      inner: "W8C0xP3tSG/DK9kcxCXqUClGs1Y+UYPiatlZqYev+wY="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/LABS.png",
        theme: {
          primaryColorHex: "#e1994b"
        }
      }
    ]
  },
  "WAw+YLjn/KFmK+TdG3N8UwJJc52cp2xhTKQF/q39EAE=": {
    description: "Nether (NTHR) is the utility token of the Underworld NFT ecosystem, issued via tokenfactory on the Cosmos Hub. NTHR powers the NecroVault, a soft-staking platform where holders of Underworld collections earn rewards while keeping their NFTs in their wallets. Fixed supply: 21,000.",
    denomUnits: [
      {
        denom: "transfer/channel-22/factory/cosmos1wdja2gcsesyl07raq9jm3rcvu0sse5zkev0h8m/Nether"
      },
      {
        denom: "transfer/channel-22/nthr",
        exponent: 6
      }
    ],
    base: "transfer/channel-22/factory/cosmos1wdja2gcsesyl07raq9jm3rcvu0sse5zkev0h8m/Nether",
    display: "transfer/channel-22/nthr",
    name: "Nether",
    symbol: "NTHR",
    penumbraAssetId: {
      inner: "WAw+YLjn/KFmK+TdG3N8UwJJc52cp2xhTKQF/q39EAE="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/cosmoshub/images/nthr.png",
        theme: {
          primaryColorHex: "#bd85d4"
        }
      }
    ]
  },
  "WF8l68uYLxTTaHfI2lvGvIwGB8r+jo1yWvornrlbpRE=": {
    description: "Cosmos Bitcoin",
    denomUnits: [
      {
        denom: "transfer/channel-18/factory/inj1s9hr5zfz3xrkzchde94hd2d0edjs4q5mrqrz6x/BITCOIN"
      },
      {
        denom: "transfer/channel-18/BITCOIN",
        exponent: 6
      }
    ],
    base: "transfer/channel-18/factory/inj1s9hr5zfz3xrkzchde94hd2d0edjs4q5mrqrz6x/BITCOIN",
    display: "transfer/channel-18/BITCOIN",
    name: "Cosmos Bitcoin",
    symbol: "BITCOIN",
    penumbraAssetId: {
      inner: "WF8l68uYLxTTaHfI2lvGvIwGB8r+jo1yWvornrlbpRE="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/injective/images/bitcoin.png",
        theme: {
          primaryColorHex: "#28a1c6"
        }
      }
    ]
  },
  "WIjzOdDTBfSD1SfZzGeYKwhpu+Z95IdB+mO7s0W8YhA=": {
    description: "SYN burn Derivative; minted when SYN is burned via The Furnace",
    denomUnits: [
      {
        denom: "transfer/channel-18/factory/inj1ej2f3lmpxj4djsmmuxvnfuvplrut7zmwrq7zj8/syn.ash"
      },
      {
        denom: "transfer/channel-18/ashSYN",
        exponent: 6
      }
    ],
    base: "transfer/channel-18/factory/inj1ej2f3lmpxj4djsmmuxvnfuvplrut7zmwrq7zj8/syn.ash",
    display: "transfer/channel-18/ashSYN",
    name: "ASH Syndicate",
    symbol: "ashSYN",
    penumbraAssetId: {
      inner: "WIjzOdDTBfSD1SfZzGeYKwhpu+Z95IdB+mO7s0W8YhA="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/injective/images/syn.ash.png",
        theme: {
          primaryColorHex: "#44744c"
        }
      }
    ]
  },
  "WOyM4tESN7UFmMkqVPfNCzK8IaTCzhZktU3TBQjdUgg=": {
    denomUnits: [
      {
        denom: "transfer/channel-7/op-wei"
      },
      {
        denom: "transfer/channel-7/op",
        exponent: 18
      }
    ],
    base: "transfer/channel-7/op-wei",
    display: "transfer/channel-7/op",
    name: "Optimism",
    symbol: "axlOP",
    penumbraAssetId: {
      inner: "WOyM4tESN7UFmMkqVPfNCzK8IaTCzhZktU3TBQjdUgg="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/optimism/images/op.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/optimism/images/op.svg",
        theme: {
          primaryColorHex: "#fb0423"
        }
      }
    ]
  },
  "WaTLvjfj1BKKtIwzCWFMW2xozOQ3X0XcSVrl/KGtRgw=": {
    description: "Shiba Inu on Axelar",
    denomUnits: [
      {
        denom: "transfer/channel-7/shib-wei"
      },
      {
        denom: "transfer/channel-7/shib",
        exponent: 18
      }
    ],
    base: "transfer/channel-7/shib-wei",
    display: "transfer/channel-7/shib",
    name: "Shiba Inu",
    symbol: "axlSHIB",
    penumbraAssetId: {
      inner: "WaTLvjfj1BKKtIwzCWFMW2xozOQ3X0XcSVrl/KGtRgw="
    },
    images: [
      {
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/ethereum/images/shib.svg",
        theme: {
          primaryColorHex: "#060505"
        }
      }
    ]
  },
  "WdHeHDmklWKxFf0g86MiYy6Mt6lUQza5g+NfNuK2oAE=": {
    description: "Membrane's CDP-style stablecoin called CDT",
    denomUnits: [
      {
        denom: "transfer/channel-4/factory/osmo1s794h9rxggytja3a4pmwul53u98k06zy2qtrdvjnfuxruh7s8yjs6cyxgd/ucdt"
      },
      {
        denom: "transfer/channel-4/cdt",
        exponent: 6
      }
    ],
    base: "transfer/channel-4/factory/osmo1s794h9rxggytja3a4pmwul53u98k06zy2qtrdvjnfuxruh7s8yjs6cyxgd/ucdt",
    display: "transfer/channel-4/cdt",
    name: "CDT Stablecoin",
    symbol: "CDT.ch4",
    penumbraAssetId: {
      inner: "WdHeHDmklWKxFf0g86MiYy6Mt6lUQza5g+NfNuK2oAE="
    },
    images: [
      {
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/CDT.svg",
        theme: {
          primaryColorHex: "#5a9ce2"
        }
      }
    ],
    coingeckoId: "collateralized-debt-token"
  },
  "WsoQy6JaL61GC9t1ORImD/JWruwYFkp6yMZOYJY7pRE=": {
    description: "An alloy of BNB asset variants on Osmosis.",
    denomUnits: [
      {
        denom: "transfer/channel-20/factory/osmo1zetxzc5nka4jm203ljjtjf933jwjh45ge6spfeef447rnnhqxc4qrazrcz/alloyed/allBNB"
      },
      {
        denom: "transfer/channel-20/bnb",
        exponent: 12
      }
    ],
    base: "transfer/channel-20/factory/osmo1zetxzc5nka4jm203ljjtjf933jwjh45ge6spfeef447rnnhqxc4qrazrcz/alloyed/allBNB",
    display: "transfer/channel-20/bnb",
    name: "Binance Coin",
    symbol: "BNB",
    penumbraAssetId: {
      inner: "WsoQy6JaL61GC9t1ORImD/JWruwYFkp6yMZOYJY7pRE="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/binancesmartchain/images/bnb.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/binancesmartchain/images/bnb.svg",
        theme: {
          primaryColorHex: "#f3bb0c"
        }
      }
    ]
  },
  "WumzwIu4j0VHASx3VfxiOTDOeebLRIoOX82d6QXokQc=": {
    denomUnits: [
      {
        denom: "transfer/channel-7/polygon-weth-wei"
      },
      {
        denom: "transfer/channel-7/polygon-weth",
        exponent: 18
      }
    ],
    base: "transfer/channel-7/polygon-weth-wei",
    display: "transfer/channel-7/polygon-weth",
    name: "Polygon axlETH",
    symbol: "axlETH.polygon",
    penumbraAssetId: {
      inner: "WumzwIu4j0VHASx3VfxiOTDOeebLRIoOX82d6QXokQc="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/ethereum/images/eth-white.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/ethereum/images/eth-white.svg",
        theme: {
          primaryColorHex: "#8c8c8c"
        }
      },
      {
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/ethereum/images/weth.svg",
        theme: {
          primaryColorHex: "#e71e7b"
        }
      }
    ]
  },
  "X6QOpPgnkqzMhj8XW4vfGpBYB8AcGc5gmyQWiJnqbQA=": {
    description: "TRONIX is the mainnet native token of the TRON Protocol issued by TRON DAO, known as TRX.",
    denomUnits: [
      {
        denom: "transfer/channel-20/factory/osmo14mafhhp337yjj2aujplawz0tks6jd2lel4hkwz4agyzhvvztzaqsqzjq8x/alloyed/allTRX"
      },
      {
        denom: "transfer/channel-20/trx",
        exponent: 6
      }
    ],
    base: "transfer/channel-20/factory/osmo14mafhhp337yjj2aujplawz0tks6jd2lel4hkwz4agyzhvvztzaqsqzjq8x/alloyed/allTRX",
    display: "transfer/channel-20/trx",
    name: "Tron",
    symbol: "TRX",
    penumbraAssetId: {
      inner: "X6QOpPgnkqzMhj8XW4vfGpBYB8AcGc5gmyQWiJnqbQA="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/tron/images/trx.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/tron/images/trx.svg",
        theme: {
          primaryColorHex: "#fb040c"
        }
      }
    ],
    priorityScore: "400000000000",
    coingeckoId: "trx"
  },
  "XPEu4VQhC123XAENrLVyRNy4gDKTJMGpWyWvauXFvg8=": {
    description: "Agora USD Coin",
    denomUnits: [
      {
        denom: "transfer/channel-18/factory/inj1n636d9gzrqggdk66n2f97th0x8yuhfrtx520e7/ausd"
      },
      {
        denom: "transfer/channel-18/AUSD",
        exponent: 6
      }
    ],
    base: "transfer/channel-18/factory/inj1n636d9gzrqggdk66n2f97th0x8yuhfrtx520e7/ausd",
    display: "transfer/channel-18/AUSD",
    name: "Agora USD",
    symbol: "AUSD",
    penumbraAssetId: {
      inner: "XPEu4VQhC123XAENrLVyRNy4gDKTJMGpWyWvauXFvg8="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/injective/images/ausd.png",
        theme: {
          primaryColorHex: "#9c9454"
        }
      }
    ],
    priorityScore: "500000000000",
    coingeckoId: "agora-dollar"
  },
  "XREY/7po0kX/cIgBeXzuVTQXsweMLMhsIg72Ag7OOw4=": {
    denomUnits: [
      {
        denom: "transfer/channel-8/stustars"
      },
      {
        denom: "transfer/channel-8/ststars",
        exponent: 6
      }
    ],
    base: "transfer/channel-8/stustars",
    display: "transfer/channel-8/ststars",
    name: "Stride Staked STARS",
    symbol: "stSTARS",
    penumbraAssetId: {
      inner: "XREY/7po0kX/cIgBeXzuVTQXsweMLMhsIg72Ag7OOw4="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/stride/images/ststars.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/stride/images/ststars.svg",
        theme: {
          primaryColorHex: "#e30474"
        }
      }
    ]
  },
  "YDb9HdTGlrd1EC33sjDbBjBelMBYJjAoWo3EnP3hlgc=": {
    description: "Fractionalized Crypto Hamsters",
    denomUnits: [
      {
        denom: "transfer/channel-4/factory/osmo1dywfmhyc8y0wga7qpzej0x0mgwqg25fj4eccp494w8yafzdpgamsx9ryyv/fHAM"
      },
      {
        denom: "transfer/channel-4/fHAM",
        exponent: 9
      }
    ],
    base: "transfer/channel-4/factory/osmo1dywfmhyc8y0wga7qpzej0x0mgwqg25fj4eccp494w8yafzdpgamsx9ryyv/fHAM",
    display: "transfer/channel-4/fHAM",
    name: "fHAM",
    symbol: "fHAM.ch4",
    penumbraAssetId: {
      inner: "YDb9HdTGlrd1EC33sjDbBjBelMBYJjAoWo3EnP3hlgc="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/fHAM.png",
        theme: {
          primaryColorHex: "#7b9967"
        }
      }
    ]
  },
  "YO8vm5ho5dN0jyOrtXQe9E4mrhFUHSQ3UMcJFExV0Qo=": {
    description: "The native stablecoin of Kava",
    denomUnits: [
      {
        denom: "transfer/channel-21/usdx"
      },
      {
        denom: "transfer/channel-21/USDX",
        exponent: 6
      }
    ],
    base: "transfer/channel-21/usdx",
    display: "transfer/channel-21/USDX",
    name: "Kava USDX",
    symbol: "USDX",
    penumbraAssetId: {
      inner: "YO8vm5ho5dN0jyOrtXQe9E4mrhFUHSQ3UMcJFExV0Qo="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/kava/images/usdx.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/kava/images/usdx.svg",
        theme: {
          primaryColorHex: "#04d4a4"
        }
      }
    ]
  },
  "Ycn7kPuoqkSTkorULDU0A9YrxzJvBOQJZ2dTNONnrwQ=": {
    description: "ERIS liquid staked OSMO",
    denomUnits: [
      {
        denom: "transfer/channel-20/factory/osmo1dv8wz09tckslr2wy5z86r46dxvegylhpt97r9yd6qc3kyc6tv42qa89dr9/ampOSMO"
      },
      {
        denom: "transfer/channel-20/ampOSMO",
        exponent: 6
      }
    ],
    base: "transfer/channel-20/factory/osmo1dv8wz09tckslr2wy5z86r46dxvegylhpt97r9yd6qc3kyc6tv42qa89dr9/ampOSMO",
    display: "transfer/channel-20/ampOSMO",
    name: "ERIS Amplified OSMO",
    symbol: "ampOSMO",
    penumbraAssetId: {
      inner: "Ycn7kPuoqkSTkorULDU0A9YrxzJvBOQJZ2dTNONnrwQ="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/amposmo.png",
        theme: {
          primaryColorHex: "#c6d4ee"
        }
      }
    ]
  },
  "Yj/gwGbYCzeuCoXoB/bwdAKplm0N9qxVWjps9uPfpAI=": {
    description: "Banana Vault Token - Peelworks Factory II",
    denomUnits: [
      {
        denom: "transfer/channel-20/factory/osmo1xu0gk9aggv79597xwazyfzaggv2pze9z7cq3p9p72tkkux9a7xaqufa792/BVT"
      },
      {
        denom: "transfer/channel-20/BVT0",
        exponent: 18
      }
    ],
    base: "transfer/channel-20/factory/osmo1xu0gk9aggv79597xwazyfzaggv2pze9z7cq3p9p72tkkux9a7xaqufa792/BVT",
    display: "transfer/channel-20/BVT0",
    name: "Peelworks Factory",
    symbol: "BVT0",
    penumbraAssetId: {
      inner: "Yj/gwGbYCzeuCoXoB/bwdAKplm0N9qxVWjps9uPfpAI="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/BVT0.png",
        theme: {
          primaryColorHex: "#b2c4b9"
        }
      }
    ]
  },
  "Z1gUhUl8UjUVpNvR7DV/Fp/5xN9ZaTBDVe6n5MfK/xE=": {
    description: "RWA Commercial fishing operation",
    denomUnits: [
      {
        denom: "transfer/channel-18/factory/inj1jdt04erw6jdmh6c939u87kldf3mvvmkedsjp3w/OYCI"
      },
      {
        denom: "transfer/channel-18/OYCI",
        exponent: 6
      }
    ],
    base: "transfer/channel-18/factory/inj1jdt04erw6jdmh6c939u87kldf3mvvmkedsjp3w/OYCI",
    display: "transfer/channel-18/OYCI",
    name: "Oyster Cage Initiative",
    symbol: "OYCI",
    penumbraAssetId: {
      inner: "Z1gUhUl8UjUVpNvR7DV/Fp/5xN9ZaTBDVe6n5MfK/xE="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/injective/images/oyci.png",
        theme: {
          primaryColorHex: "#11100a"
        }
      }
    ]
  },
  "ZAf0vwfQdMjLyJH6OIQrt6t2y6VU37rzXBm8XeF6dQY=": {
    denomUnits: [
      {
        denom: "transfer/channel-4/factory/osmo14klwqgkmackvx2tqa0trtg69dmy0nrg4ntq4gjgw2za4734r5seqjqm4gm/uibcx"
      },
      {
        denom: "transfer/channel-4/ibcx",
        exponent: 6
      }
    ],
    base: "transfer/channel-4/factory/osmo14klwqgkmackvx2tqa0trtg69dmy0nrg4ntq4gjgw2za4734r5seqjqm4gm/uibcx",
    display: "transfer/channel-4/ibcx",
    name: "IBC Index",
    symbol: "IBCX.ch4",
    penumbraAssetId: {
      inner: "ZAf0vwfQdMjLyJH6OIQrt6t2y6VU37rzXBm8XeF6dQY="
    },
    images: [
      {
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/ibcx.svg",
        theme: {
          primaryColorHex: "#c1dafb"
        }
      }
    ],
    coingeckoId: "ibc-index"
  },
  "ZGVQkxNUu4zO9J+Hu0SxDHP34/Yme6eKrm4U1gitNgA=": {
    description: "The native STARS token, migrated from Stargaze to the Cosmos Hub.",
    denomUnits: [
      {
        denom: "transfer/channel-22/factory/cosmos1s8qx0zvz8yd6e4x0mqmqf7fr9vvfn6226hkvrq/ustars"
      },
      {
        denom: "transfer/channel-22/stars",
        exponent: 6
      }
    ],
    base: "transfer/channel-22/factory/cosmos1s8qx0zvz8yd6e4x0mqmqf7fr9vvfn6226hkvrq/ustars",
    display: "transfer/channel-22/stars",
    name: "Stargaze",
    symbol: "STARS",
    penumbraAssetId: {
      inner: "ZGVQkxNUu4zO9J+Hu0SxDHP34/Yme6eKrm4U1gitNgA="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/cosmoshub/images/stars.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/cosmoshub/images/stars.svg",
        theme: {
          primaryColorHex: "#eb0473"
        }
      }
    ],
    coingeckoId: "stargaze"
  },
  "ZI8z7Vm/WF2Y5sOw0h5JYBV6jzA94PjtSOZnUcdtvQA=": {
    description: "USDC supplied on Mars looped using Membrane by a vault that also has an entry fee",
    denomUnits: [
      {
        denom: "transfer/channel-20/factory/osmo1vf6e300hv2qe7r5rln8deft45ewgyytjnwfrdfcv5rgzrfy0s6cswjqf9r/mars-usdc-looped"
      },
      {
        denom: "transfer/channel-20/earnUSDC",
        exponent: 6
      }
    ],
    base: "transfer/channel-20/factory/osmo1vf6e300hv2qe7r5rln8deft45ewgyytjnwfrdfcv5rgzrfy0s6cswjqf9r/mars-usdc-looped",
    display: "transfer/channel-20/earnUSDC",
    name: "Mars Looped USDC Vault",
    symbol: "earnUSDC",
    penumbraAssetId: {
      inner: "ZI8z7Vm/WF2Y5sOw0h5JYBV6jzA94PjtSOZnUcdtvQA="
    }
  },
  "ZMvzNe0oaoRjhBIPf0KgUGH0EVaE6der5FavRNfMbgQ=": {
    description: "Fractionalized DAONuts",
    denomUnits: [
      {
        denom: "transfer/channel-4/factory/osmo1dywfmhyc8y0wga7qpzej0x0mgwqg25fj4eccp494w8yafzdpgamsx9ryyv/fNUT"
      },
      {
        denom: "transfer/channel-4/fNUT",
        exponent: 9
      }
    ],
    base: "transfer/channel-4/factory/osmo1dywfmhyc8y0wga7qpzej0x0mgwqg25fj4eccp494w8yafzdpgamsx9ryyv/fNUT",
    display: "transfer/channel-4/fNUT",
    name: "fNUT",
    symbol: "fNUT.ch4",
    penumbraAssetId: {
      inner: "ZMvzNe0oaoRjhBIPf0KgUGH0EVaE6der5FavRNfMbgQ="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/fNUT.png",
        theme: {
          primaryColorHex: "#161113"
        }
      }
    ]
  },
  "ZQVJ7bnTaYrIhhQXQQnIJjQ4DklK1ncPczO2wrsEyxE=": {
    denomUnits: [
      {
        denom: "transfer/channel-9/factory/neutron17sp75wng9vl2hu3sf4ky86d7smmk3wle9gkts2gmedn9x4ut3xcqa5xp34/maxbtc"
      },
      {
        denom: "transfer/channel-9/maxBTC",
        exponent: 8
      }
    ],
    base: "transfer/channel-9/factory/neutron17sp75wng9vl2hu3sf4ky86d7smmk3wle9gkts2gmedn9x4ut3xcqa5xp34/maxbtc",
    display: "transfer/channel-9/maxBTC",
    name: "maxBTC",
    symbol: "maxBTC",
    penumbraAssetId: {
      inner: "ZQVJ7bnTaYrIhhQXQQnIJjQ4DklK1ncPczO2wrsEyxE="
    },
    images: [
      {
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/neutron/images/maxBTC.svg",
        theme: {
          primaryColorHex: "#dfdfdf"
        }
      }
    ]
  },
  "ZhFBNHfIMMpmMKcMwUWx8b5rhkCIOX4UzZEhruRPxgs=": {
    description: "Liquid Staked USDC",
    denomUnits: [
      {
        denom: "transfer/channel-9/factory/neutron1mdy5fhtwdjagp5eallsdhlx6gxylm8rxqk72wjzg6y5d5kt44ysqprkduw/JSD"
      },
      {
        denom: "transfer/channel-9/JSD",
        exponent: 6
      }
    ],
    base: "transfer/channel-9/factory/neutron1mdy5fhtwdjagp5eallsdhlx6gxylm8rxqk72wjzg6y5d5kt44ysqprkduw/JSD",
    display: "transfer/channel-9/JSD",
    name: "Jade",
    symbol: "JSD",
    penumbraAssetId: {
      inner: "ZhFBNHfIMMpmMKcMwUWx8b5rhkCIOX4UzZEhruRPxgs="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/neutron/images/jsd.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/neutron/images/jsd.svg",
        theme: {
          primaryColorHex: "#24c35c"
        }
      }
    ]
  },
  "Zi8uYzf0sKRBZppHbELs/OsQx/KugQVVL1MWV67c5gE=": {
    description: "Wrapped Moonbeam on Axelar",
    denomUnits: [
      {
        denom: "transfer/channel-7/wglmr-wei"
      },
      {
        denom: "transfer/channel-7/wglmr",
        exponent: 18
      }
    ],
    base: "transfer/channel-7/wglmr-wei",
    display: "transfer/channel-7/wglmr",
    name: "Wrapped Moonbeam",
    symbol: "WGLMR",
    penumbraAssetId: {
      inner: "Zi8uYzf0sKRBZppHbELs/OsQx/KugQVVL1MWV67c5gE="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/moonbeam/images/glmr.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/moonbeam/images/glmr.svg",
        theme: {
          primaryColorHex: "#e4147c"
        }
      }
    ]
  },
  "ZpIbxFwvlU4udh9mutG/2hLBIpdNXhat3TCRbs1kbgI=": {
    description: "Roostock BTC bridged via Router.",
    denomUnits: [
      {
        denom: "transfer/channel-4/factory/osmo1myv2g72h8dan7n4hx7stt3mmust6ws03zh6gxc7vz4hpmgp5z3lq9aunm9/BTC.rt"
      },
      {
        denom: "transfer/channel-4/rbtc",
        exponent: 18
      }
    ],
    base: "transfer/channel-4/factory/osmo1myv2g72h8dan7n4hx7stt3mmust6ws03zh6gxc7vz4hpmgp5z3lq9aunm9/BTC.rt",
    display: "transfer/channel-4/rbtc",
    name: "Rootstock (Router)",
    symbol: "RBTC.rt.ch4",
    penumbraAssetId: {
      inner: "ZpIbxFwvlU4udh9mutG/2hLBIpdNXhat3TCRbs1kbgI="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/rootstock/images/rbtc.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/rootstock/images/rbtc.svg",
        theme: {
          primaryColorHex: "#f7e7d1"
        }
      }
    ],
    coingeckoId: "rootstock"
  },
  "a4i6BHOdI55dAsSmOSAnFundZYQlC2tjhYZqrhQfFhA=": {
    description: "ZigCoin from Ethereum via Axelar Bridge",
    denomUnits: [
      {
        denom: "transfer/channel-7/unit-zig"
      },
      {
        denom: "transfer/channel-7/zig",
        exponent: 18
      }
    ],
    base: "transfer/channel-7/unit-zig",
    display: "transfer/channel-7/zig",
    name: "ZigCoin",
    symbol: "ZigCoin",
    penumbraAssetId: {
      inner: "a4i6BHOdI55dAsSmOSAnFundZYQlC2tjhYZqrhQfFhA="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/zigchain/images/zigchain.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/zigchain/images/zigchain.svg",
        theme: {
          primaryColorHex: "#1fadb1"
        }
      }
    ]
  },
  "a9wClCSO17WCBONq0Hwj5ZTwa9hoZPAXxxjk7ZNstwU=": {
    description: "Celestia is a modular blockchain network focused on data availability, allowing developers to deploy their own customizable blockchains with ease.",
    denomUnits: [
      {
        denom: "transfer/channel-23/utia"
      },
      {
        denom: "transfer/channel-23/tia",
        exponent: 6
      }
    ],
    base: "transfer/channel-23/utia",
    display: "transfer/channel-23/tia",
    name: "Celestia",
    symbol: "TIA",
    penumbraAssetId: {
      inner: "a9wClCSO17WCBONq0Hwj5ZTwa9hoZPAXxxjk7ZNstwU="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/celestia/images/celestia.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/celestia/images/celestia.svg",
        theme: {
          primaryColorHex: "#7c2cfb"
        }
      }
    ],
    priorityScore: "800000000097",
    coingeckoId: "celestia"
  },
  "aTfHc0qgIevh4rlteheJ/YxuIOGPomodkFIK2juXDxI=": {
    description: "BackBone Labs Liquid Staked Injective",
    denomUnits: [
      {
        denom: "transfer/channel-18/factory/inj1dxp690rd86xltejgfq2fa7f2nxtgmm5cer3hvu/bINJ"
      },
      {
        denom: "transfer/channel-18/bINJ",
        exponent: 18
      }
    ],
    base: "transfer/channel-18/factory/inj1dxp690rd86xltejgfq2fa7f2nxtgmm5cer3hvu/bINJ",
    display: "transfer/channel-18/bINJ",
    name: "BackBone Labs Liquid Staked Injective",
    symbol: "bINJ",
    penumbraAssetId: {
      inner: "aTfHc0qgIevh4rlteheJ/YxuIOGPomodkFIK2juXDxI="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/injective/images/binj.png",
        theme: {
          primaryColorHex: "#06ade7"
        }
      }
    ]
  },
  "abrdf1mXyR0ETvgrlfhTyWukAvRmB3tEpf3XsAKhZws=": {
    description: "The Sherpa memecoin",
    denomUnits: [
      {
        denom: "transfer/channel-20/factory/osmo1n6asrjy9754q8y9jsxqf557zmsv3s3xa5m9eg5/usherpa"
      },
      {
        denom: "transfer/channel-20/Sherpa",
        exponent: 6
      }
    ],
    base: "transfer/channel-20/factory/osmo1n6asrjy9754q8y9jsxqf557zmsv3s3xa5m9eg5/usherpa",
    display: "transfer/channel-20/Sherpa",
    name: "Sherpa",
    symbol: "SHERPA",
    penumbraAssetId: {
      inner: "abrdf1mXyR0ETvgrlfhTyWukAvRmB3tEpf3XsAKhZws="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/sherpa.png",
        theme: {
          primaryColorHex: "#0f0807"
        }
      }
    ]
  },
  "aeWpmOx+9ol58LfOfu2bz73UvjVCW6SesIo0tP1RNQo=": {
    description: "Hava Coin is the lifeblood of the Cosmos & Injective networks, rewarding builders and welcoming supporters.",
    denomUnits: [
      {
        denom: "transfer/channel-18/factory/inj1h0ypsdtjfcjynqu3m75z2zwwz5mmrj8rtk2g52/uhava"
      },
      {
        denom: "transfer/channel-18/hava",
        exponent: 6
      }
    ],
    base: "transfer/channel-18/factory/inj1h0ypsdtjfcjynqu3m75z2zwwz5mmrj8rtk2g52/uhava",
    display: "transfer/channel-18/hava",
    name: "Hava Coin",
    symbol: "HAVA",
    penumbraAssetId: {
      inner: "aeWpmOx+9ol58LfOfu2bz73UvjVCW6SesIo0tP1RNQo="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/injective/images/hava.png",
        theme: {
          primaryColorHex: "#ec984d"
        }
      }
    ]
  },
  "aezl/7HfCWqufiT9/Y0nGvjzrwD6l39Vn2ZA/UgQuwQ=": {
    description: "Real power moves quietly.",
    denomUnits: [
      {
        denom: "transfer/channel-20/factory/osmo1q77cw0mmlluxu0wr29fcdd0tdnh78gzhkvhe4n6ulal9qvrtu43qtd0nh8/stlth"
      },
      {
        denom: "transfer/channel-20/STLTH",
        exponent: 6
      }
    ],
    base: "transfer/channel-20/factory/osmo1q77cw0mmlluxu0wr29fcdd0tdnh78gzhkvhe4n6ulal9qvrtu43qtd0nh8/stlth",
    display: "transfer/channel-20/STLTH",
    name: "Stealth",
    symbol: "STLTH",
    penumbraAssetId: {
      inner: "aezl/7HfCWqufiT9/Y0nGvjzrwD6l39Vn2ZA/UgQuwQ="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/STLTH.png",
        theme: {
          primaryColorHex: "#049ccc"
        }
      },
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/stlth-circle.png",
        theme: {
          primaryColorHex: "#049ccc"
        }
      }
    ]
  },
  "ag8PKsaCMDmXqcwH0eJdfu1l3lhWQo1C1YoQzuFiFgM=": {
    description: "Instant Noodles Coin",
    denomUnits: [
      {
        denom: "transfer/channel-18/factory/inj1s9hr5zfz3xrkzchde94hd2d0edjs4q5mrqrz6x/INC"
      },
      {
        denom: "transfer/channel-18/INC",
        exponent: 6
      }
    ],
    base: "transfer/channel-18/factory/inj1s9hr5zfz3xrkzchde94hd2d0edjs4q5mrqrz6x/INC",
    display: "transfer/channel-18/INC",
    name: "Instant Noodles Coin",
    symbol: "INC",
    penumbraAssetId: {
      inner: "ag8PKsaCMDmXqcwH0eJdfu1l3lhWQo1C1YoQzuFiFgM="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/injective/images/inc.png",
        theme: {
          primaryColorHex: "#72d2fc"
        }
      }
    ]
  },
  "ak8flKkYZVvnZGJikv1eb9H7BKVujlvhMiQoUhRcWww=": {
    description: "CULT - Less Brainwashing, More Utility",
    denomUnits: [
      {
        denom: "transfer/channel-20/factory/osmo1qdvwftqd8ml6t9w6dmj97m03ck5ghqqmd8y7cm/cult"
      },
      {
        denom: "transfer/channel-20/CULT",
        exponent: 6
      }
    ],
    base: "transfer/channel-20/factory/osmo1qdvwftqd8ml6t9w6dmj97m03ck5ghqqmd8y7cm/cult",
    display: "transfer/channel-20/CULT",
    name: "CULT",
    symbol: "CULT",
    penumbraAssetId: {
      inner: "ak8flKkYZVvnZGJikv1eb9H7BKVujlvhMiQoUhRcWww="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/cult.png",
        theme: {
          primaryColorHex: "#f1a507"
        }
      }
    ]
  },
  "b2xQZ0osCRxg2oFT5ym9srLucqyIaVhAesz7goNMawY=": {
    description: "An alloy of FET asset variants on Osmosis.",
    denomUnits: [
      {
        denom: "transfer/channel-20/factory/osmo1mdvn6lmykp2z345ncpf647dztslyll8cyhwj9pltrc0lf7nva3cqvrp6qs/alloyed/allFET"
      },
      {
        denom: "transfer/channel-20/allFET",
        exponent: 12
      }
    ],
    base: "transfer/channel-20/factory/osmo1mdvn6lmykp2z345ncpf647dztslyll8cyhwj9pltrc0lf7nva3cqvrp6qs/alloyed/allFET",
    display: "transfer/channel-20/allFET",
    name: "Fetch.ai",
    symbol: "FET",
    penumbraAssetId: {
      inner: "b2xQZ0osCRxg2oFT5ym9srLucqyIaVhAesz7goNMawY="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/fetchhub/images/fet.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/fetchhub/images/fet.svg",
        theme: {
          primaryColorHex: "#040404"
        }
      },
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/fetchhub/images/fet_white.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/fetchhub/images/fet_white.svg",
        theme: {
          primaryColorHex: "#e4e4e4"
        }
      }
    ]
  },
  "b5NltMpWXHJVmKhWJq0BaVNZAGP6olIRX69KaUQXOw4=": {
    description: "wstETH on Neutron",
    denomUnits: [
      {
        denom: "transfer/channel-9/factory/neutron1ug740qrkquxzrk2hh29qrlx3sktkfml3je7juusc2te7xmvsscns0n2wry/wstETH"
      },
      {
        denom: "transfer/channel-9/wstETH",
        exponent: 18
      }
    ],
    base: "transfer/channel-9/factory/neutron1ug740qrkquxzrk2hh29qrlx3sktkfml3je7juusc2te7xmvsscns0n2wry/wstETH",
    display: "transfer/channel-9/wstETH",
    name: "wstETH",
    symbol: "wstETH.neutron",
    penumbraAssetId: {
      inner: "b5NltMpWXHJVmKhWJq0BaVNZAGP6olIRX69KaUQXOw4="
    },
    images: [
      {
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/ethereum/images/wsteth.svg",
        theme: {
          primaryColorHex: "#9cdcfc"
        }
      }
    ]
  },
  "b6G+pb5NbJQzZ1FqdilnIEmCalItc8EG0vDR4pt8tgs=": {
    description: "Margined Power Token sqATOM",
    denomUnits: [
      {
        denom: "transfer/channel-20/factory/osmo1g8qypve6l95xmhgc0fddaecerffymsl7kn9muw/sqatom"
      },
      {
        denom: "transfer/channel-20/sqatom",
        exponent: 6
      }
    ],
    base: "transfer/channel-20/factory/osmo1g8qypve6l95xmhgc0fddaecerffymsl7kn9muw/sqatom",
    display: "transfer/channel-20/sqatom",
    name: "ATOM Squared",
    symbol: "sqATOM",
    penumbraAssetId: {
      inner: "b6G+pb5NbJQzZ1FqdilnIEmCalItc8EG0vDR4pt8tgs="
    },
    images: [
      {
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/sqatom.svg",
        theme: {
          primaryColorHex: "#040404"
        }
      }
    ]
  },
  "bGyMhKt6ljVza7oZktPkID3ftcRO56dGt3x1B/WvnAY=": {
    description: "EHO is the native token powering Cognitive Echo — a VR + AI ecosystem where thoughts become visual, insights resonate, and cognitive echo transforms ideas into reality. The infinity symbol (∞) represents infinite resonance and community-driven growth.",
    denomUnits: [
      {
        denom: "transfer/channel-9/cw20:neutron15e56mauwr8n2cma56f78cvtnd9c2pr0y7f4mffdwda7z49sksyvqh2hke2"
      },
      {
        denom: "transfer/channel-9/eho",
        exponent: 6
      }
    ],
    base: "transfer/channel-9/cw20:neutron15e56mauwr8n2cma56f78cvtnd9c2pr0y7f4mffdwda7z49sksyvqh2hke2",
    display: "transfer/channel-9/eho",
    name: "Cognitive Echo",
    symbol: "EHO",
    penumbraAssetId: {
      inner: "bGyMhKt6ljVza7oZktPkID3ftcRO56dGt3x1B/WvnAY="
    },
    images: [
      {
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/neutron/images/eho.svg",
        theme: {
          primaryColorHex: "#3532c8"
        }
      }
    ]
  },
  "bKYDq4zkPiKV7zxFWsziGwlRHechNcIhz+zd9Bo7FA4=": {
    denomUnits: [
      {
        denom: "transfer/channel-8/stuumee"
      },
      {
        denom: "transfer/channel-8/stumee",
        exponent: 6
      }
    ],
    base: "transfer/channel-8/stuumee",
    display: "transfer/channel-8/stumee",
    name: "Stride Staked UMEE",
    symbol: "stUMEE",
    penumbraAssetId: {
      inner: "bKYDq4zkPiKV7zxFWsziGwlRHechNcIhz+zd9Bo7FA4="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/stride/images/stumee.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/stride/images/stumee.svg",
        theme: {
          primaryColorHex: "#fbd9e9"
        }
      }
    ]
  },
  "bLiFZ+hxSpvHBE8ehzDOI2YOLH02J8BvfCSrMPyK+gI=": {
    description: "Crypto",
    denomUnits: [
      {
        denom: "transfer/channel-18/factory/inj1s9hr5zfz3xrkzchde94hd2d0edjs4q5mrqrz6x/CRYPTO"
      },
      {
        denom: "transfer/channel-18/CRYPTO",
        exponent: 6
      }
    ],
    base: "transfer/channel-18/factory/inj1s9hr5zfz3xrkzchde94hd2d0edjs4q5mrqrz6x/CRYPTO",
    display: "transfer/channel-18/CRYPTO",
    name: "Crypto",
    symbol: "CRYPTO",
    penumbraAssetId: {
      inner: "bLiFZ+hxSpvHBE8ehzDOI2YOLH02J8BvfCSrMPyK+gI="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/injective/images/crypto.png",
        theme: {
          primaryColorHex: "#f49414"
        }
      }
    ]
  },
  "bPgl4L4AZ50lxcgvFkJJLTjhRYdGlhv7HByGwQSM/gw=": {
    description: "Lido Staked Ether on Axelar",
    denomUnits: [
      {
        denom: "transfer/channel-7/steth-wei"
      },
      {
        denom: "transfer/channel-7/steth",
        exponent: 18
      }
    ],
    base: "transfer/channel-7/steth-wei",
    display: "transfer/channel-7/steth",
    name: "Lido Staked Ether",
    symbol: "stETH",
    penumbraAssetId: {
      inner: "bPgl4L4AZ50lxcgvFkJJLTjhRYdGlhv7HByGwQSM/gw="
    },
    images: [
      {
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/ethereum/images/steth.svg",
        theme: {
          primaryColorHex: "#3cb8fc"
        }
      }
    ]
  },
  "bRVleb2+QC3W4VXLw5ycxJYmndvTWmwbnFNvXrVEJBE=": {
    description: "An alloy of BNB asset variants on Osmosis.",
    denomUnits: [
      {
        denom: "transfer/channel-4/factory/osmo1zetxzc5nka4jm203ljjtjf933jwjh45ge6spfeef447rnnhqxc4qrazrcz/alloyed/allBNB"
      },
      {
        denom: "transfer/channel-4/bnb",
        exponent: 12
      }
    ],
    base: "transfer/channel-4/factory/osmo1zetxzc5nka4jm203ljjtjf933jwjh45ge6spfeef447rnnhqxc4qrazrcz/alloyed/allBNB",
    display: "transfer/channel-4/bnb",
    name: "Binance Coin",
    symbol: "BNB.ch4",
    penumbraAssetId: {
      inner: "bRVleb2+QC3W4VXLw5ycxJYmndvTWmwbnFNvXrVEJBE="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/binancesmartchain/images/bnb.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/binancesmartchain/images/bnb.svg",
        theme: {
          primaryColorHex: "#f3bb0c"
        }
      }
    ]
  },
  "bY3UfJkxbd2vTpysr3RXXqqMoxCf9iLSekVUbLimAQo=": {
    description: "Fractionalized Rekt Bulls",
    denomUnits: [
      {
        denom: "transfer/channel-20/factory/osmo1dywfmhyc8y0wga7qpzej0x0mgwqg25fj4eccp494w8yafzdpgamsx9ryyv/fBULLS"
      },
      {
        denom: "transfer/channel-20/fBULLS",
        exponent: 9
      }
    ],
    base: "transfer/channel-20/factory/osmo1dywfmhyc8y0wga7qpzej0x0mgwqg25fj4eccp494w8yafzdpgamsx9ryyv/fBULLS",
    display: "transfer/channel-20/fBULLS",
    name: "fBULLS",
    symbol: "fBULLS",
    penumbraAssetId: {
      inner: "bY3UfJkxbd2vTpysr3RXXqqMoxCf9iLSekVUbLimAQo="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/fBULLS.png",
        theme: {
          primaryColorHex: "#080d11"
        }
      }
    ]
  },
  "bbT/GSRPfGhuUp9DuDZqkP25azndkkU9/wcWIIJIQwc=": {
    denomUnits: [
      {
        denom: "udelegation_penumbravalid1mr4j6nh3za3wjptjr2uj2ssr3fg0gxxqgqg9vgjl7luqa3qur5zs3fj5w6"
      },
      {
        denom: "mdelegation_penumbravalid1mr4j6nh3za3wjptjr2uj2ssr3fg0gxxqgqg9vgjl7luqa3qur5zs3fj5w6",
        exponent: 3
      },
      {
        denom: "delegation_penumbravalid1mr4j6nh3za3wjptjr2uj2ssr3fg0gxxqgqg9vgjl7luqa3qur5zs3fj5w6",
        exponent: 6
      }
    ],
    base: "udelegation_penumbravalid1mr4j6nh3za3wjptjr2uj2ssr3fg0gxxqgqg9vgjl7luqa3qur5zs3fj5w6",
    display: "delegation_penumbravalid1mr4j6nh3za3wjptjr2uj2ssr3fg0gxxqgqg9vgjl7luqa3qur5zs3fj5w6",
    symbol: "delUM(Tessellated)",
    penumbraAssetId: {
      inner: "bbT/GSRPfGhuUp9DuDZqkP25azndkkU9/wcWIIJIQwc="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/penumbrafi/registry/main/images/validators/penumbravalid1mr4j6nh3za3wjptjr2uj2ssr3fg0gxxqgqg9vgjl7luqa3qur5zs3fj5w6.png",
        theme: {
          primaryColorHex: "#d42c2c"
        }
      }
    ]
  },
  "cNEnw3iPGCEJlLiGlq9Y++lZPwJoMxe6JnLzBb8Hiwg=": {
    description: "Astroport is a neutral marketplace where anyone, from anywhere in the galaxy, can dock to trade their wares.",
    denomUnits: [
      {
        denom: "transfer/channel-9/factory/neutron1zlf3hutsa4qnmue53lz2tfxrutp8y2e3rj4nkghg3rupgl4mqy8s5jgxsn/xASTRO"
      },
      {
        denom: "transfer/channel-9/xASTRO",
        exponent: 6
      }
    ],
    base: "transfer/channel-9/factory/neutron1zlf3hutsa4qnmue53lz2tfxrutp8y2e3rj4nkghg3rupgl4mqy8s5jgxsn/xASTRO",
    display: "transfer/channel-9/xASTRO",
    name: "Staked Astroport Token",
    symbol: "xASTRO",
    penumbraAssetId: {
      inner: "cNEnw3iPGCEJlLiGlq9Y++lZPwJoMxe6JnLzBb8Hiwg="
    },
    images: [
      {
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/neutron/images/xAstro.svg",
        theme: {
          primaryColorHex: "#483ef1"
        }
      }
    ]
  },
  "cNtVyf0Y5iT1riCFkoTSICeQfDyrGgzxMGljt66Udgw=": {
    description: "CW20 DRUGS meme coin",
    denomUnits: [
      {
        denom: "transfer/channel-18/cw20:inj19vy83ne9tzta2yqynj8yg7dq9ghca6yqn9hyej"
      },
      {
        denom: "transfer/channel-18/DRUGS",
        exponent: 18
      }
    ],
    base: "transfer/channel-18/cw20:inj19vy83ne9tzta2yqynj8yg7dq9ghca6yqn9hyej",
    display: "transfer/channel-18/DRUGS",
    name: "cw20 DRUGS",
    symbol: "DRUGS.cw20",
    penumbraAssetId: {
      inner: "cNtVyf0Y5iT1riCFkoTSICeQfDyrGgzxMGljt66Udgw="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/injective/images/cw20drugs.png",
        theme: {
          primaryColorHex: "#f5db48"
        }
      }
    ]
  },
  "cPW0G3CJM+DtgQ76hH7sF+c9tFiWW4uzcBequf6mAg4=": {
    denomUnits: [
      {
        denom: "udelegation_penumbravalid1ar6hyxmvy0em86nclqgxc4qlauj9ct747g4dsx8tn6wthg9nuvrq099640"
      },
      {
        denom: "mdelegation_penumbravalid1ar6hyxmvy0em86nclqgxc4qlauj9ct747g4dsx8tn6wthg9nuvrq099640",
        exponent: 3
      },
      {
        denom: "delegation_penumbravalid1ar6hyxmvy0em86nclqgxc4qlauj9ct747g4dsx8tn6wthg9nuvrq099640",
        exponent: 6
      }
    ],
    base: "udelegation_penumbravalid1ar6hyxmvy0em86nclqgxc4qlauj9ct747g4dsx8tn6wthg9nuvrq099640",
    display: "delegation_penumbravalid1ar6hyxmvy0em86nclqgxc4qlauj9ct747g4dsx8tn6wthg9nuvrq099640",
    symbol: "delUM(rotko.net)",
    penumbraAssetId: {
      inner: "cPW0G3CJM+DtgQ76hH7sF+c9tFiWW4uzcBequf6mAg4="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/penumbrafi/registry/main/images/validators/penumbravalid1ar6hyxmvy0em86nclqgxc4qlauj9ct747g4dsx8tn6wthg9nuvrq099640.png",
        theme: {
          primaryColorHex: "#14eceb"
        }
      }
    ]
  },
  "cVUXl/yKIL6gnJAjjLGdH9df4r2MVZmOf9SRkfRlkgY=": {
    description: "The first meme coin on Injective. It’s a dog, but he has nunchucks",
    denomUnits: [
      {
        denom: "transfer/channel-18/factory/inj1xtel2knkt8hmc9dnzpjz6kdmacgcfmlv5f308w/ninja"
      },
      {
        denom: "transfer/channel-18/NINJA",
        exponent: 6
      }
    ],
    base: "transfer/channel-18/factory/inj1xtel2knkt8hmc9dnzpjz6kdmacgcfmlv5f308w/ninja",
    display: "transfer/channel-18/NINJA",
    name: "Dog wif nunchucks",
    symbol: "NINJA",
    penumbraAssetId: {
      inner: "cVUXl/yKIL6gnJAjjLGdH9df4r2MVZmOf9SRkfRlkgY="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/injective/images/ninja.png",
        theme: {
          primaryColorHex: "#f0d59e"
        }
      }
    ],
    coingeckoId: "dog-wif-nuchucks"
  },
  "cmKHlW9Y1Lk2HqejjdrBW3054TAgQvG79YALcRol2wA=": {
    denomUnits: [
      {
        denom: "transfer/channel-8/stuatom"
      },
      {
        denom: "transfer/channel-8/statom",
        exponent: 6
      }
    ],
    base: "transfer/channel-8/stuatom",
    display: "transfer/channel-8/statom",
    name: "Stride Staked ATOM",
    symbol: "stATOM",
    penumbraAssetId: {
      inner: "cmKHlW9Y1Lk2HqejjdrBW3054TAgQvG79YALcRol2wA="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/stride/images/statom.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/stride/images/statom.svg",
        theme: {
          primaryColorHex: "#e40474"
        }
      }
    ],
    coingeckoId: "stride-staked-atom"
  },
  "cuFLyCSTGPQ23pe1xl5EK1IOTAiMRAFdLxoMaull7go=": {
    description: "Cosmos Airdrop Chat",
    denomUnits: [
      {
        denom: "transfer/channel-20/factory/osmo1q77cw0mmlluxu0wr29fcdd0tdnh78gzhkvhe4n6ulal9qvrtu43qtd0nh8/cac"
      },
      {
        denom: "transfer/channel-20/CAC",
        exponent: 6
      }
    ],
    base: "transfer/channel-20/factory/osmo1q77cw0mmlluxu0wr29fcdd0tdnh78gzhkvhe4n6ulal9qvrtu43qtd0nh8/cac",
    display: "transfer/channel-20/CAC",
    name: "Cosmos Airdrop Chat",
    symbol: "CAC",
    penumbraAssetId: {
      inner: "cuFLyCSTGPQ23pe1xl5EK1IOTAiMRAFdLxoMaull7go="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/CAC.png",
        theme: {
          primaryColorHex: "#190552"
        }
      }
    ]
  },
  "d2/yBdjkz//htrQwHYXVx3XN2QILdZoS5ickDAcRWgs=": {
    description: "Beer Is Good for You!",
    denomUnits: [
      {
        denom: "transfer/channel-4/factory/osmo1q77cw0mmlluxu0wr29fcdd0tdnh78gzhkvhe4n6ulal9qvrtu43qtd0nh8/bwh"
      },
      {
        denom: "transfer/channel-4/bwh",
        exponent: 6
      }
    ],
    base: "transfer/channel-4/factory/osmo1q77cw0mmlluxu0wr29fcdd0tdnh78gzhkvhe4n6ulal9qvrtu43qtd0nh8/bwh",
    display: "transfer/channel-4/bwh",
    name: "BeerWifHat",
    symbol: "BWH.ch4",
    penumbraAssetId: {
      inner: "d2/yBdjkz//htrQwHYXVx3XN2QILdZoS5ickDAcRWgs="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/BWH.png",
        theme: {
          primaryColorHex: "#775038"
        }
      }
    ]
  },
  "dN2Bc92n4dRFKSV7qgLOIGEG6dYRboqUqO2HoMvwYAU=": {
    description: "Drop staked TIA",
    denomUnits: [
      {
        denom: "transfer/channel-9/factory/neutron1ut4c6pv4u6vyu97yw48y8g7mle0cat54848v6m97k977022lzxtsaqsgmq/udtia"
      },
      {
        denom: "transfer/channel-9/dTIA",
        exponent: 6
      }
    ],
    base: "transfer/channel-9/factory/neutron1ut4c6pv4u6vyu97yw48y8g7mle0cat54848v6m97k977022lzxtsaqsgmq/udtia",
    display: "transfer/channel-9/dTIA",
    name: "dTIA",
    symbol: "dTIA",
    penumbraAssetId: {
      inner: "dN2Bc92n4dRFKSV7qgLOIGEG6dYRboqUqO2HoMvwYAU="
    },
    images: [
      {
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/neutron/images/dTIA.svg",
        theme: {
          primaryColorHex: "#d4cafc"
        }
      }
    ]
  },
  "dkG3cdqjb2MIsC9IO1eh+vKPMrg0itFcV9dGlIES6wQ=": {
    description: "An alloy of ETH asset variants on Osmosis.",
    denomUnits: [
      {
        denom: "transfer/channel-20/factory/osmo1k6c8jln7ejuqwtqmay3yvzrg3kueaczl96pk067ldg8u835w0yhsw27twm/alloyed/allETH"
      },
      {
        denom: "transfer/channel-20/allETH",
        exponent: 18
      }
    ],
    base: "transfer/channel-20/factory/osmo1k6c8jln7ejuqwtqmay3yvzrg3kueaczl96pk067ldg8u835w0yhsw27twm/alloyed/allETH",
    display: "transfer/channel-20/allETH",
    name: "Ethereum",
    symbol: "allETH",
    penumbraAssetId: {
      inner: "dkG3cdqjb2MIsC9IO1eh+vKPMrg0itFcV9dGlIES6wQ="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/ethereum/images/eth-white.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/ethereum/images/eth-white.svg",
        theme: {
          primaryColorHex: "#8c8c8c"
        }
      }
    ],
    priorityScore: "600000000000",
    coingeckoId: "osmosis-alleth"
  },
  "drPksQaBNYwSOzgfkGOEdrd4kEDkeALeh58Ps+7cjQs=": {
    description: "USD Coin",
    denomUnits: [
      {
        denom: "transfer/channel-2/uusdc"
      },
      {
        denom: "transfer/channel-2/usdc",
        exponent: 6
      }
    ],
    base: "transfer/channel-2/uusdc",
    display: "transfer/channel-2/usdc",
    name: "USDC",
    symbol: "USDC",
    penumbraAssetId: {
      inner: "drPksQaBNYwSOzgfkGOEdrd4kEDkeALeh58Ps+7cjQs="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/ethereum/images/usdc.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/ethereum/images/usdc.svg",
        theme: {
          primaryColorHex: "#2474cb"
        }
      }
    ],
    priorityScore: "800000000100",
    coingeckoId: "usd-coin"
  },
  "eHP8hLia2CIA2WTf7Be3fXGmXSlQVVSzTT5yTBPiOA8=": {
    description: "Jimmy Neutron Finance",
    denomUnits: [
      {
        denom: "transfer/channel-9/factory/neutron108x7vp9zv22d6wxrs9as8dshd3pd5vsga463yd/JIMMY"
      },
      {
        denom: "transfer/channel-9/jimmy",
        exponent: 6
      }
    ],
    base: "transfer/channel-9/factory/neutron108x7vp9zv22d6wxrs9as8dshd3pd5vsga463yd/JIMMY",
    display: "transfer/channel-9/jimmy",
    name: "jimmy",
    symbol: "JIMMY",
    penumbraAssetId: {
      inner: "eHP8hLia2CIA2WTf7Be3fXGmXSlQVVSzTT5yTBPiOA8="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/neutron/images/jimmy.png",
        theme: {
          primaryColorHex: "#f0b78b"
        }
      }
    ]
  },
  "eOc1J1x0MAlkkRefNB+RKfn0/VBsiZ/3x3u1IkOW3QI=": {
    description: "The most degenerate NFT on Injective. Gravedigger collection for $bINJ. Giving power back to the community.",
    denomUnits: [
      {
        denom: "transfer/channel-18/factory/inj1a6xdezq7a94qwamec6n6cnup02nvewvjtz6h6e/SYN"
      },
      {
        denom: "transfer/channel-18/SYN",
        exponent: 6
      }
    ],
    base: "transfer/channel-18/factory/inj1a6xdezq7a94qwamec6n6cnup02nvewvjtz6h6e/SYN",
    display: "transfer/channel-18/SYN",
    name: "Syndicate",
    symbol: "SYN",
    penumbraAssetId: {
      inner: "eOc1J1x0MAlkkRefNB+RKfn0/VBsiZ/3x3u1IkOW3QI="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/injective/images/syn.png",
        theme: {
          primaryColorHex: "#44734c"
        }
      }
    ]
  },
  "eQthHIzuZ6ACthJK/RnzfkG5F3KVHjKfuqBJPY3QFwQ=": {
    description: "The deflationary utility token of the Apollo DAO project",
    denomUnits: [
      {
        denom: "transfer/channel-9/factory/neutron154gg0wtm2v4h9ur8xg32ep64e8ef0g5twlsgvfeajqwghdryvyqsqhgk8e/APOLLO"
      },
      {
        denom: "transfer/channel-9/apollo",
        exponent: 6
      }
    ],
    base: "transfer/channel-9/factory/neutron154gg0wtm2v4h9ur8xg32ep64e8ef0g5twlsgvfeajqwghdryvyqsqhgk8e/APOLLO",
    display: "transfer/channel-9/apollo",
    name: "Apollo DAO",
    symbol: "APOLLO",
    penumbraAssetId: {
      inner: "eQthHIzuZ6ACthJK/RnzfkG5F3KVHjKfuqBJPY3QFwQ="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/neutron/images/apollo.png",
        theme: {
          primaryColorHex: "#f6ab31"
        }
      }
    ]
  },
  "eU9fuBe2GaX8FiBFO1v8DmE71ypULZ5utjvNUoa+1RE=": {
    description: "Fractionalized Mad Scientists",
    denomUnits: [
      {
        denom: "transfer/channel-20/factory/osmo1dywfmhyc8y0wga7qpzej0x0mgwqg25fj4eccp494w8yafzdpgamsx9ryyv/fMAD"
      },
      {
        denom: "transfer/channel-20/fMAD",
        exponent: 9
      }
    ],
    base: "transfer/channel-20/factory/osmo1dywfmhyc8y0wga7qpzej0x0mgwqg25fj4eccp494w8yafzdpgamsx9ryyv/fMAD",
    display: "transfer/channel-20/fMAD",
    name: "fMAD",
    symbol: "fMAD",
    penumbraAssetId: {
      inner: "eU9fuBe2GaX8FiBFO1v8DmE71ypULZ5utjvNUoa+1RE="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/fMAD.png",
        theme: {
          primaryColorHex: "#c8e6c9"
        }
      }
    ]
  },
  "eadmBjFk3DK9kiRTmVE/6nJyaOsYPRvu7CTsBBDCsBE=": {
    description: "A multi-chain dogecoin twin, trustlessly created by chain-key cryptography and Internet Computer smart contracts that directly hold raw dogecoin.",
    denomUnits: [
      {
        denom: "transfer/channel-20/factory/osmo10c4y9csfs8q7mtvfg4p9gd8d0acx0hpc2mte9xqzthd7rd3348tsfhaesm/dogecoin-native-DOGE"
      },
      {
        denom: "transfer/channel-20/ckDOGE",
        exponent: 8
      }
    ],
    base: "transfer/channel-20/factory/osmo10c4y9csfs8q7mtvfg4p9gd8d0acx0hpc2mte9xqzthd7rd3348tsfhaesm/dogecoin-native-DOGE",
    display: "transfer/channel-20/ckDOGE",
    name: "Chain-key Dogecoin",
    symbol: "ckDOGE",
    penumbraAssetId: {
      inner: "eadmBjFk3DK9kiRTmVE/6nJyaOsYPRvu7CTsBBDCsBE="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/ckDOGE.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/ckDOGE.svg",
        theme: {
          primaryColorHex: "#e3bc65"
        }
      },
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/dogecoin/images/doge.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/dogecoin/images/doge.svg",
        theme: {
          primaryColorHex: "#b99937"
        }
      }
    ]
  },
  "ehfBSAU7pDA6A+15ibXrFj5/JralUkm5T91utk91AA8=": {
    description: "A receipt token for lent USDC issued by the Neptune Protocol.",
    denomUnits: [
      {
        denom: "transfer/channel-18/inj1dafy7fv7qczzatd98dv8hekx6ssckrflswpjaz"
      },
      {
        denom: "transfer/channel-18/nUSDC",
        exponent: 6
      }
    ],
    base: "transfer/channel-18/inj1dafy7fv7qczzatd98dv8hekx6ssckrflswpjaz",
    display: "transfer/channel-18/nUSDC",
    name: "Neptune Receipt USDC",
    symbol: "nUSDC",
    penumbraAssetId: {
      inner: "ehfBSAU7pDA6A+15ibXrFj5/JralUkm5T91utk91AA8="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/injective/images/nusdc.png",
        theme: {
          primaryColorHex: "#2874cd"
        }
      }
    ]
  },
  "f/E2un9IADXOB/3hsj8EvMVciJMOLn2HgT7Pg9SN8gg=": {
    description: "USDN token",
    denomUnits: [
      {
        denom: "transfer/channel-2/uusdn"
      },
      {
        denom: "transfer/channel-2/usdn",
        exponent: 6
      }
    ],
    base: "transfer/channel-2/uusdn",
    display: "transfer/channel-2/usdn",
    name: "Noble Dollar",
    symbol: "USDN",
    penumbraAssetId: {
      inner: "f/E2un9IADXOB/3hsj8EvMVciJMOLn2HgT7Pg9SN8gg="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/noble/images/USDN.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/noble/images/USDN.svg",
        theme: {
          primaryColorHex: "#14c484"
        }
      }
    ]
  },
  "f/IAN065Ou6XwYdWe3m3SgiLFDYOAY47vphr9y+bowQ=": {
    description: "Fractionalized Pixel Wizards",
    denomUnits: [
      {
        denom: "transfer/channel-4/factory/osmo1dywfmhyc8y0wga7qpzej0x0mgwqg25fj4eccp494w8yafzdpgamsx9ryyv/fWIZ"
      },
      {
        denom: "transfer/channel-4/fWIZ",
        exponent: 9
      }
    ],
    base: "transfer/channel-4/factory/osmo1dywfmhyc8y0wga7qpzej0x0mgwqg25fj4eccp494w8yafzdpgamsx9ryyv/fWIZ",
    display: "transfer/channel-4/fWIZ",
    name: "fWIZ",
    symbol: "fWIZ.ch4",
    penumbraAssetId: {
      inner: "f/IAN065Ou6XwYdWe3m3SgiLFDYOAY47vphr9y+bowQ="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/fWIZ.png",
        theme: {
          primaryColorHex: "#0e0c10"
        }
      }
    ]
  },
  "fVJKvR0IQtpYvtHmOF3IDNyV4O5oeyA5o7HCskf9MxE=": {
    denomUnits: [
      {
        denom: "transfer/channel-8/staISLM"
      },
      {
        denom: "transfer/channel-8/stISLM",
        exponent: 18
      }
    ],
    base: "transfer/channel-8/staISLM",
    display: "transfer/channel-8/stISLM",
    name: "Stride Staked ISLM",
    symbol: "stISLM",
    penumbraAssetId: {
      inner: "fVJKvR0IQtpYvtHmOF3IDNyV4O5oeyA5o7HCskf9MxE="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/stride/images/stislm.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/stride/images/stislm.svg",
        theme: {
          primaryColorHex: "#e30474"
        }
      }
    ],
    coingeckoId: "stride-staked-islm"
  },
  "fZFhCeC/N3PaOI3P7WRaYtx1ljSl+dVqbVYxBQpSDwE=": {
    description: "CryptoGopniks token",
    denomUnits: [
      {
        denom: "transfer/channel-9/factory/neutron133xakkrfksq39wxy575unve2nyehg5npx75nph/GOP"
      },
      {
        denom: "transfer/channel-9/GOP",
        exponent: 6
      }
    ],
    base: "transfer/channel-9/factory/neutron133xakkrfksq39wxy575unve2nyehg5npx75nph/GOP",
    display: "transfer/channel-9/GOP",
    name: "GOP",
    symbol: "GOP",
    penumbraAssetId: {
      inner: "fZFhCeC/N3PaOI3P7WRaYtx1ljSl+dVqbVYxBQpSDwE="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/neutron/images/gop.png",
        theme: {
          primaryColorHex: "#e6e6e6"
        }
      }
    ]
  },
  "feVP7pst7vgPhoxLLiYtNHFwUprssLR8Nfn7wUU2WwA=": {
    description: "Margined Power Token sqTIA",
    denomUnits: [
      {
        denom: "transfer/channel-4/factory/osmo1g8qypve6l95xmhgc0fddaecerffymsl7kn9muw/sqtia"
      },
      {
        denom: "transfer/channel-4/sqtia",
        exponent: 6
      }
    ],
    base: "transfer/channel-4/factory/osmo1g8qypve6l95xmhgc0fddaecerffymsl7kn9muw/sqtia",
    display: "transfer/channel-4/sqtia",
    name: "TIA Squared",
    symbol: "sqTIA.ch4",
    penumbraAssetId: {
      inner: "feVP7pst7vgPhoxLLiYtNHFwUprssLR8Nfn7wUU2WwA="
    },
    images: [
      {
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/sqtia.svg",
        theme: {
          primaryColorHex: "#bbe446"
        }
      }
    ]
  },
  "g+yIhd+Gk3N96/swkxeEsck6YUlrpgcNjJrQaqfsHhI=": {
    denomUnits: [
      {
        denom: "transfer/channel-20/factory/osmo14klwqgkmackvx2tqa0trtg69dmy0nrg4ntq4gjgw2za4734r5seqjqm4gm/uibcx"
      },
      {
        denom: "transfer/channel-20/ibcx",
        exponent: 6
      }
    ],
    base: "transfer/channel-20/factory/osmo14klwqgkmackvx2tqa0trtg69dmy0nrg4ntq4gjgw2za4734r5seqjqm4gm/uibcx",
    display: "transfer/channel-20/ibcx",
    name: "IBC Index",
    symbol: "IBCX",
    penumbraAssetId: {
      inner: "g+yIhd+Gk3N96/swkxeEsck6YUlrpgcNjJrQaqfsHhI="
    },
    images: [
      {
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/ibcx.svg",
        theme: {
          primaryColorHex: "#c1dafb"
        }
      }
    ],
    coingeckoId: "ibc-index"
  },
  "g4mop84SBeLOfjiHNEpnMKUpP2SY7BAoCXfCxY7wsgI=": {
    description: "EURe is a Euro-backed stablecoin issued by Monerium on Noble.",
    denomUnits: [
      {
        denom: "transfer/channel-2/ueure"
      },
      {
        denom: "transfer/channel-2/eure",
        exponent: 6
      }
    ],
    base: "transfer/channel-2/ueure",
    display: "transfer/channel-2/eure",
    name: "Monerium EUR emoney",
    symbol: "EURe",
    penumbraAssetId: {
      inner: "g4mop84SBeLOfjiHNEpnMKUpP2SY7BAoCXfCxY7wsgI="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/ethereum/images/eure.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/ethereum/images/eure.svg",
        theme: {
          primaryColorHex: "#bdd5e1"
        }
      }
    ],
    coingeckoId: "monerium-eur-money"
  },
  "gLmZhUXt/2jdpLgs+LF6b8jjsoINWBxK+mOuK0VJuw0=": {
    description: "An alloy of SUI asset variants on Osmosis.",
    denomUnits: [
      {
        denom: "transfer/channel-4/factory/osmo1nqu7rc5mj5p2cgyfp7gl3lw7kw99cltple3xtzl2cs5fyw0r2tasr7xv48/alloyed/allSUI"
      },
      {
        denom: "transfer/channel-4/sui",
        exponent: 8
      }
    ],
    base: "transfer/channel-4/factory/osmo1nqu7rc5mj5p2cgyfp7gl3lw7kw99cltple3xtzl2cs5fyw0r2tasr7xv48/alloyed/allSUI",
    display: "transfer/channel-4/sui",
    name: "Sui",
    symbol: "SUI.ch4",
    penumbraAssetId: {
      inner: "gLmZhUXt/2jdpLgs+LF6b8jjsoINWBxK+mOuK0VJuw0="
    },
    images: [
      {
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/sui/images/sui.svg",
        theme: {
          primaryColorHex: "#6fbeee"
        }
      }
    ]
  },
  "gO4qR7mYarC4AAPCck7XHhujNBUWGsaxRW6U3JkrSgM=": {
    description: "Rapture insurance is the first ever P2P insurance platform on $OSMO. Get rewarded to take care of peoples loved ones after the Rapture.",
    denomUnits: [
      {
        denom: "transfer/channel-4/factory/osmo1279xudevmf5cw83vkhglct7jededp86k90k2le/RAPTR"
      },
      {
        denom: "transfer/channel-4/RAPTR",
        exponent: 6
      }
    ],
    base: "transfer/channel-4/factory/osmo1279xudevmf5cw83vkhglct7jededp86k90k2le/RAPTR",
    display: "transfer/channel-4/RAPTR",
    name: "RAPTR",
    symbol: "RAPTR.ch4",
    penumbraAssetId: {
      inner: "gO4qR7mYarC4AAPCck7XHhujNBUWGsaxRW6U3JkrSgM="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/RAPTR.png",
        theme: {
          primaryColorHex: "#ddb179"
        }
      }
    ]
  },
  "gURFgIt85+OSRYbdQ2X4/KcQVhY6nHf6mbBNt4tnDRI=": {
    description: "The second meme coin on Injective.",
    denomUnits: [
      {
        denom: "transfer/channel-18/inj1sudjgsyhufqu95yp7rqad3g78ws8g6htf32h88"
      },
      {
        denom: "transfer/channel-18/NINPO",
        exponent: 6
      }
    ],
    base: "transfer/channel-18/inj1sudjgsyhufqu95yp7rqad3g78ws8g6htf32h88",
    display: "transfer/channel-18/NINPO",
    name: "Ninpo",
    symbol: "NINPO",
    penumbraAssetId: {
      inner: "gURFgIt85+OSRYbdQ2X4/KcQVhY6nHf6mbBNt4tnDRI="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/injective/images/ninpo.png",
        theme: {
          primaryColorHex: "#292020"
        }
      }
    ]
  },
  "gWd90cf8h/fDbYt68Dy45VAxQc2sG3ir+GMbphxOMwc=": {
    description: "DYDX is a decentralized trading platform focused on derivatives and perpetual contracts, offering a secure and efficient trading experience without intermediaries.",
    denomUnits: [
      {
        denom: "transfer/channel-16/adydx"
      },
      {
        denom: "transfer/channel-16/dydx",
        exponent: 18
      }
    ],
    base: "transfer/channel-16/adydx",
    display: "transfer/channel-16/dydx",
    name: "dYdX",
    symbol: "DYDX",
    penumbraAssetId: {
      inner: "gWd90cf8h/fDbYt68Dy45VAxQc2sG3ir+GMbphxOMwc="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/dydx/images/dydx.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/dydx/images/dydx.svg",
        theme: {
          primaryColorHex: "#d3d3d5"
        }
      },
      {
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/dydx/images/dydx-circle.svg",
        theme: {
          primaryColorHex: "#d0d0d3"
        }
      }
    ],
    priorityScore: "600000000000",
    coingeckoId: "dydx-chain"
  },
  "gc3Zc8L95o9uAlTqoVNYbW6kjNbu93996tEJgB3BSgc=": {
    description: "An alloy of DOGE asset variants on Osmosis.",
    denomUnits: [
      {
        denom: "transfer/channel-20/factory/osmo10pk4crey8fpdyqd62rsau0y02e3rk055w5u005ah6ly7k849k5tsf72x40/alloyed/allDOGE"
      },
      {
        denom: "transfer/channel-20/allDOGE",
        exponent: 8
      }
    ],
    base: "transfer/channel-20/factory/osmo10pk4crey8fpdyqd62rsau0y02e3rk055w5u005ah6ly7k849k5tsf72x40/alloyed/allDOGE",
    display: "transfer/channel-20/allDOGE",
    name: "Dogecoin",
    symbol: "DOGE",
    penumbraAssetId: {
      inner: "gc3Zc8L95o9uAlTqoVNYbW6kjNbu93996tEJgB3BSgc="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/dogecoin/images/doge.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/dogecoin/images/doge.svg",
        theme: {
          primaryColorHex: "#b99937"
        }
      }
    ]
  },
  "gjZ6AXKLriH+HZCGJX8CV06RusaJG4QqngdJnq5LTQI=": {
    denomUnits: [
      {
        denom: "transfer/channel-8/stuband"
      },
      {
        denom: "transfer/channel-8/stBAND",
        exponent: 6
      }
    ],
    base: "transfer/channel-8/stuband",
    display: "transfer/channel-8/stBAND",
    name: "Stride Staked BAND",
    symbol: "stBAND",
    penumbraAssetId: {
      inner: "gjZ6AXKLriH+HZCGJX8CV06RusaJG4QqngdJnq5LTQI="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/stride/images/stband.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/stride/images/stband.svg",
        theme: {
          primaryColorHex: "#e30474"
        }
      }
    ]
  },
  "gtlw2unvpuzJnUFKPQcv2TvhRcDACWEUkc4RLw+hLAU=": {
    description: "wLibra is a bridged version of Libra Coin from 0L Network via LibraBridge.",
    denomUnits: [
      {
        denom: "transfer/channel-20/factory/osmo19hdqma2mj0vnmgcxag6ytswjnr8a3y07q7e70p/wLIBRA"
      },
      {
        denom: "transfer/channel-20/wLIBRA",
        exponent: 6
      }
    ],
    base: "transfer/channel-20/factory/osmo19hdqma2mj0vnmgcxag6ytswjnr8a3y07q7e70p/wLIBRA",
    display: "transfer/channel-20/wLIBRA",
    name: "Wrapped Libra Coin (LibraBridge)",
    symbol: "wLIBRA",
    penumbraAssetId: {
      inner: "gtlw2unvpuzJnUFKPQcv2TvhRcDACWEUkc4RLw+hLAU="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/0l/images/libra.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/0l/images/libra.svg",
        theme: {
          primaryColorHex: "#e45c5c"
        }
      }
    ]
  },
  "gzi+nuewDdsSvP3jb0LeUzq+/3+c07faLR9V0k2yoQA=": {
    denomUnits: [
      {
        denom: "transfer/channel-8/stinj"
      },
      {
        denom: "transfer/channel-8/stINJ",
        exponent: 18
      }
    ],
    base: "transfer/channel-8/stinj",
    display: "transfer/channel-8/stINJ",
    name: "Stride Staked INJ",
    symbol: "stINJ",
    penumbraAssetId: {
      inner: "gzi+nuewDdsSvP3jb0LeUzq+/3+c07faLR9V0k2yoQA="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/stride/images/stinj.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/stride/images/stinj.svg",
        theme: {
          primaryColorHex: "#e30474"
        }
      }
    ]
  },
  "h4c+OAGonGVREC9ZaYzLbrpnSkUpl0JhHqHwBogeXw0=": {
    description: "An alloy of LINK asset variants on Osmosis.",
    denomUnits: [
      {
        denom: "transfer/channel-4/factory/osmo18zdw5yvs6gfp95rp74qqwug9yduw2fyr8kplk2xgs726s9axc5usa2vpgw/alloyed/allLINK"
      },
      {
        denom: "transfer/channel-4/link",
        exponent: 12
      }
    ],
    base: "transfer/channel-4/factory/osmo18zdw5yvs6gfp95rp74qqwug9yduw2fyr8kplk2xgs726s9axc5usa2vpgw/alloyed/allLINK",
    display: "transfer/channel-4/link",
    name: "Chainlink",
    symbol: "allLINK.ch4",
    penumbraAssetId: {
      inner: "h4c+OAGonGVREC9ZaYzLbrpnSkUpl0JhHqHwBogeXw0="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/ethereum/images/link.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/ethereum/images/link.svg",
        theme: {
          primaryColorHex: "#2c5cdc"
        }
      }
    ],
    coingeckoId: "osmosis-alllink"
  },
  "h751d5VBk37nWEUCcAD0RM/3Zll22vSO77rhgF/WKwU=": {
    description: "An alloy of ZEC asset variants on Osmosis.",
    denomUnits: [
      {
        denom: "transfer/channel-4/factory/osmo1twk0c4kcwnhkyn6pzxe0qsk6a3nrye2w2sy309d60sljfysugagsd7e3mn/alloyed/allZEC"
      },
      {
        denom: "transfer/channel-4/allZEC",
        exponent: 8
      }
    ],
    base: "transfer/channel-4/factory/osmo1twk0c4kcwnhkyn6pzxe0qsk6a3nrye2w2sy309d60sljfysugagsd7e3mn/alloyed/allZEC",
    display: "transfer/channel-4/allZEC",
    name: "Zcash",
    symbol: "ZEC.ch4",
    penumbraAssetId: {
      inner: "h751d5VBk37nWEUCcAD0RM/3Zll22vSO77rhgF/WKwU="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/zcash/images/zec.png",
        theme: {
          primaryColorHex: "#f4b42c"
        }
      }
    ]
  },
  "hOnMqQbpe5Abe7vvfHYda77fg3Zit88fatqDfPO1bgQ=": {
    description: "An alloy of SHIB asset variants on Osmosis.",
    denomUnits: [
      {
        denom: "transfer/channel-4/factory/osmo1f588gk9dazpsueevdl2w6wfkmfmhg5gdvg2uerdlzl0atkasqhsq59qc6a/alloyed/allSHIB"
      },
      {
        denom: "transfer/channel-4/shib",
        exponent: 12
      }
    ],
    base: "transfer/channel-4/factory/osmo1f588gk9dazpsueevdl2w6wfkmfmhg5gdvg2uerdlzl0atkasqhsq59qc6a/alloyed/allSHIB",
    display: "transfer/channel-4/shib",
    name: "Shiba Inu",
    symbol: "allSHIB.ch4",
    penumbraAssetId: {
      inner: "hOnMqQbpe5Abe7vvfHYda77fg3Zit88fatqDfPO1bgQ="
    },
    images: [
      {
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/ethereum/images/shib.svg",
        theme: {
          primaryColorHex: "#060505"
        }
      }
    ],
    priorityScore: "5000000000",
    coingeckoId: "osmosis-allshib"
  },
  "hZntyCsNRTDrRdd9co7TcsGFJ22uBMeJLj4TmP+6Hgw=": {
    denomUnits: [
      {
        denom: "transfer/channel-7/yum-wei"
      },
      {
        denom: "transfer/channel-7/yum",
        exponent: 18
      }
    ],
    base: "transfer/channel-7/yum-wei",
    display: "transfer/channel-7/yum",
    name: "Axelar Wrapped YUM",
    symbol: "YUM.axl",
    penumbraAssetId: {
      inner: "hZntyCsNRTDrRdd9co7TcsGFJ22uBMeJLj4TmP+6Hgw="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/ethereum/images/yum.png",
        theme: {
          primaryColorHex: "#33a7e9"
        }
      }
    ]
  },
  "hd1cfmkXrXyqjN0jvn8zkALFHmiwm5S/Uo9JkChfkAw=": {
    description: "Legend token",
    denomUnits: [
      {
        denom: "transfer/channel-4/factory/osmo1c3sjhsneuajqn4ke84kqqaf26ct5cjs8z5ale0yv7096wh6fyf6qxmgkph/leg"
      },
      {
        denom: "transfer/channel-4/LEG",
        exponent: 6
      }
    ],
    base: "transfer/channel-4/factory/osmo1c3sjhsneuajqn4ke84kqqaf26ct5cjs8z5ale0yv7096wh6fyf6qxmgkph/leg",
    display: "transfer/channel-4/LEG",
    name: "LEG",
    symbol: "LEG.ch4",
    penumbraAssetId: {
      inner: "hd1cfmkXrXyqjN0jvn8zkALFHmiwm5S/Uo9JkChfkAw="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/leg.png",
        theme: {
          primaryColorHex: "#c2c4c3"
        }
      }
    ]
  },
  "htLwQf0FJsTyKOeezmSuLcSzn4hZsYKokOFbUbzaHwU=": {
    description: "An alloy of ZEC asset variants on Osmosis.",
    denomUnits: [
      {
        denom: "transfer/channel-20/factory/osmo1twk0c4kcwnhkyn6pzxe0qsk6a3nrye2w2sy309d60sljfysugagsd7e3mn/alloyed/allZEC"
      },
      {
        denom: "transfer/channel-20/allZEC",
        exponent: 8
      }
    ],
    base: "transfer/channel-20/factory/osmo1twk0c4kcwnhkyn6pzxe0qsk6a3nrye2w2sy309d60sljfysugagsd7e3mn/alloyed/allZEC",
    display: "transfer/channel-20/allZEC",
    name: "Zcash",
    symbol: "ZEC",
    penumbraAssetId: {
      inner: "htLwQf0FJsTyKOeezmSuLcSzn4hZsYKokOFbUbzaHwU="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/zcash/images/zec.png",
        theme: {
          primaryColorHex: "#f4b42c"
        }
      }
    ]
  },
  "i+PyXu+EB6JUn1xtHXJgAK5VWvoDuZoTc/UGESZzQQ4=": {
    description: "Wrapped BNB on Axelar",
    denomUnits: [
      {
        denom: "transfer/channel-7/wbnb-wei"
      },
      {
        denom: "transfer/channel-7/wbnb",
        exponent: 18
      }
    ],
    base: "transfer/channel-7/wbnb-wei",
    display: "transfer/channel-7/wbnb",
    name: "Wrapped BNB",
    symbol: "WBNB",
    penumbraAssetId: {
      inner: "i+PyXu+EB6JUn1xtHXJgAK5VWvoDuZoTc/UGESZzQQ4="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/binancesmartchain/images/wbnb.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/binancesmartchain/images/wbnb.svg",
        theme: {
          primaryColorHex: "#f3bb0c"
        }
      }
    ]
  },
  "i0Tayo0Inl+SbRdpLACLlMbKvBkI2zt/celeUoZXHhE=": {
    description: "A multi-chain dogecoin twin, trustlessly created by chain-key cryptography and Internet Computer smart contracts that directly hold raw dogecoin.",
    denomUnits: [
      {
        denom: "transfer/channel-4/factory/osmo10c4y9csfs8q7mtvfg4p9gd8d0acx0hpc2mte9xqzthd7rd3348tsfhaesm/dogecoin-native-DOGE"
      },
      {
        denom: "transfer/channel-4/ckDOGE",
        exponent: 8
      }
    ],
    base: "transfer/channel-4/factory/osmo10c4y9csfs8q7mtvfg4p9gd8d0acx0hpc2mte9xqzthd7rd3348tsfhaesm/dogecoin-native-DOGE",
    display: "transfer/channel-4/ckDOGE",
    name: "Chain-key Dogecoin",
    symbol: "ckDOGE.ch4",
    penumbraAssetId: {
      inner: "i0Tayo0Inl+SbRdpLACLlMbKvBkI2zt/celeUoZXHhE="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/ckDOGE.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/ckDOGE.svg",
        theme: {
          primaryColorHex: "#e3bc65"
        }
      },
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/dogecoin/images/doge.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/dogecoin/images/doge.svg",
        theme: {
          primaryColorHex: "#b99937"
        }
      }
    ]
  },
  "i8+QN8X8CDCzFNKoxGruRVCHecDY5oVg2HPILg0CJAA=": {
    description: "Chain on Axelar",
    denomUnits: [
      {
        denom: "transfer/channel-7/xcn-wei"
      },
      {
        denom: "transfer/channel-7/xcn",
        exponent: 18
      }
    ],
    base: "transfer/channel-7/xcn-wei",
    display: "transfer/channel-7/xcn",
    name: "Chain",
    symbol: "XCN",
    penumbraAssetId: {
      inner: "i8+QN8X8CDCzFNKoxGruRVCHecDY5oVg2HPILg0CJAA="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/ethereum/images/xcn.png",
        theme: {
          primaryColorHex: "#040409"
        }
      }
    ]
  },
  "iI81O5821jqBIu4F1S2E4++UlzcvK+yI8cLEKZICgAs=": {
    description: "ERIS liquid staked OSMO",
    denomUnits: [
      {
        denom: "transfer/channel-4/factory/osmo1dv8wz09tckslr2wy5z86r46dxvegylhpt97r9yd6qc3kyc6tv42qa89dr9/ampOSMO"
      },
      {
        denom: "transfer/channel-4/ampOSMO",
        exponent: 6
      }
    ],
    base: "transfer/channel-4/factory/osmo1dv8wz09tckslr2wy5z86r46dxvegylhpt97r9yd6qc3kyc6tv42qa89dr9/ampOSMO",
    display: "transfer/channel-4/ampOSMO",
    name: "ERIS Amplified OSMO",
    symbol: "ampOSMO.ch4",
    penumbraAssetId: {
      inner: "iI81O5821jqBIu4F1S2E4++UlzcvK+yI8cLEKZICgAs="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/amposmo.png",
        theme: {
          primaryColorHex: "#c6d4ee"
        }
      }
    ],
    coingeckoId: "eris-amplified-osmo"
  },
  "inEy5XNQBP5u7oz7eUcRLhuuBWiC1FTnJEfBhXIX7A8=": {
    description: "BackBone Labs Liquid Staked OSMO",
    denomUnits: [
      {
        denom: "transfer/channel-4/factory/osmo1s3l0lcqc7tu0vpj6wdjz9wqpxv8nk6eraevje4fuwkyjnwuy82qsx3lduv/boneOsmo"
      },
      {
        denom: "transfer/channel-4/bOSMO",
        exponent: 6
      }
    ],
    base: "transfer/channel-4/factory/osmo1s3l0lcqc7tu0vpj6wdjz9wqpxv8nk6eraevje4fuwkyjnwuy82qsx3lduv/boneOsmo",
    display: "transfer/channel-4/bOSMO",
    name: "BackBone Labs Liquid Staked OSMO",
    symbol: "bOSMO.ch4",
    penumbraAssetId: {
      inner: "inEy5XNQBP5u7oz7eUcRLhuuBWiC1FTnJEfBhXIX7A8="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/bOSMO.png",
        theme: {
          primaryColorHex: "#823995"
        }
      }
    ],
    coingeckoId: "backbone-staked-osmo"
  },
  "ipRnRZ9a5nmauojPsKUviUYrv0hxomur7FGxSOAAUAA=": {
    denomUnits: [
      {
        denom: "transfer/channel-7/yieldeth-wei"
      },
      {
        denom: "transfer/channel-7/YieldETH",
        exponent: 18
      }
    ],
    base: "transfer/channel-7/yieldeth-wei",
    display: "transfer/channel-7/YieldETH",
    name: "Real Yield Eth",
    symbol: "YieldETH",
    penumbraAssetId: {
      inner: "ipRnRZ9a5nmauojPsKUviUYrv0hxomur7FGxSOAAUAA="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/ethereum/images/yieldeth.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/ethereum/images/yieldeth.svg",
        theme: {
          primaryColorHex: "#3381f7"
        }
      }
    ]
  },
  "j4Zp0H1+tuOU7c+w6TYlCy6TehvpG3OzMUjhHHbvHRI=": {
    description: "Coinbase Wrapped DOGE on Axelar",
    denomUnits: [
      {
        denom: "transfer/channel-7/cbdoge-satoshi"
      },
      {
        denom: "transfer/channel-7/cbdoge",
        exponent: 8
      }
    ],
    base: "transfer/channel-7/cbdoge-satoshi",
    display: "transfer/channel-7/cbdoge",
    name: "Coinbase Wrapped DOGE",
    symbol: "axl-cbDOGE",
    penumbraAssetId: {
      inner: "j4Zp0H1+tuOU7c+w6TYlCy6TehvpG3OzMUjhHHbvHRI="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/base/images/cbdoge.png",
        theme: {
          primaryColorHex: "#0554fc"
        }
      }
    ]
  },
  "jGrzwnjoy2tM8tOLUMEFoY04JGFOyg4N34wOiNiC+g4=": {
    description: "Fractionalized Celestine Sloth Society",
    denomUnits: [
      {
        denom: "transfer/channel-20/factory/osmo1dywfmhyc8y0wga7qpzej0x0mgwqg25fj4eccp494w8yafzdpgamsx9ryyv/fSLOTH"
      },
      {
        denom: "transfer/channel-20/fSLOTH",
        exponent: 9
      }
    ],
    base: "transfer/channel-20/factory/osmo1dywfmhyc8y0wga7qpzej0x0mgwqg25fj4eccp494w8yafzdpgamsx9ryyv/fSLOTH",
    display: "transfer/channel-20/fSLOTH",
    name: "fSLOTH",
    symbol: "fSLOTH",
    penumbraAssetId: {
      inner: "jGrzwnjoy2tM8tOLUMEFoY04JGFOyg4N34wOiNiC+g4="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/fSLOTH.png",
        theme: {
          primaryColorHex: "#dadcbf"
        }
      }
    ]
  },
  "jSP/6H7XVJz/CfMQGozKE+pLUAJuBAkb4vd/HHFQeAc=": {
    description: "Bernese Mountain Dog — a simple dog token with a fixed supply of 132M; non-mineable, non-stakeable, no inflation, no community pool, no dev allocation; initial genesis fairdrop was a tribute to stakers and LPs of the three-headed-dog chain before it stopped.",
    denomUnits: [
      {
        denom: "transfer/channel-20/factory/osmo1s6ht8qrm8x0eg8xag5x3ckx9mse9g4se248yss/BERNESE"
      },
      {
        denom: "transfer/channel-20/BERNESE",
        exponent: 6
      }
    ],
    base: "transfer/channel-20/factory/osmo1s6ht8qrm8x0eg8xag5x3ckx9mse9g4se248yss/BERNESE",
    display: "transfer/channel-20/BERNESE",
    name: "BERNESE",
    symbol: "BERNESE",
    penumbraAssetId: {
      inner: "jSP/6H7XVJz/CfMQGozKE+pLUAJuBAkb4vd/HHFQeAc="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/bernese.png",
        theme: {
          primaryColorHex: "#e67550"
        }
      }
    ]
  },
  "jWrt4r5oJ3lH0s3sKa8o9MKMc7SPPHP5xvgJQSOYVwU=": {
    description: "Baby Corgi is the real doggo of Neutron!",
    denomUnits: [
      {
        denom: "transfer/channel-9/factory/neutron1tklm6cvr2wxg8k65t8gh5ewslnzdfd5fsk0w3f/corgi"
      },
      {
        denom: "transfer/channel-9/corgi",
        exponent: 6
      }
    ],
    base: "transfer/channel-9/factory/neutron1tklm6cvr2wxg8k65t8gh5ewslnzdfd5fsk0w3f/corgi",
    display: "transfer/channel-9/corgi",
    name: "Baby Corgi",
    symbol: "CORGI",
    penumbraAssetId: {
      inner: "jWrt4r5oJ3lH0s3sKa8o9MKMc7SPPHP5xvgJQSOYVwU="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/neutron/images/babycorgi.png",
        theme: {
          primaryColorHex: "#410506"
        }
      }
    ]
  },
  "jgUruNN8vekbLgKgLKKPirYSq3l6RolLtB9GTuav8Q4=": {
    description: "The $WGMI Token - We Gonna Make It. Are you ready?",
    denomUnits: [
      {
        denom: "transfer/channel-18/factory/inj1rmjzj9fn47kdmfk4f3z39qr6czexxe0yjyc546/WGMI"
      },
      {
        denom: "transfer/channel-18/WGMI",
        exponent: 6
      }
    ],
    base: "transfer/channel-18/factory/inj1rmjzj9fn47kdmfk4f3z39qr6czexxe0yjyc546/WGMI",
    display: "transfer/channel-18/WGMI",
    name: "WGMI",
    symbol: "WGMI",
    penumbraAssetId: {
      inner: "jgUruNN8vekbLgKgLKKPirYSq3l6RolLtB9GTuav8Q4="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/injective/images/wgmi.png",
        theme: {
          primaryColorHex: "#040404"
        }
      }
    ]
  },
  "jm8R/hHUxcqdCW6GilDQNg3J2FdOytuXU5LDahzhrQk=": {
    description: "Circle's stablecoin from Avalanche on Axelar",
    denomUnits: [
      {
        denom: "transfer/channel-7/avalanche-uusdc"
      },
      {
        denom: "transfer/channel-7/avalanche-usdc",
        exponent: 6
      }
    ],
    base: "transfer/channel-7/avalanche-uusdc",
    display: "transfer/channel-7/avalanche-usdc",
    name: "USD Coin from Avalanche",
    symbol: "axlUSDC.avax",
    penumbraAssetId: {
      inner: "jm8R/hHUxcqdCW6GilDQNg3J2FdOytuXU5LDahzhrQk="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/axelar/images/usdc.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/axelar/images/usdc.svg",
        theme: {
          primaryColorHex: "#2474cb"
        }
      }
    ]
  },
  "jwo+u0cDkbUOIRfAsPE9DRCrQ9m3AdkRBCvnP7VyRhI=": {
    description: "Retro Game",
    denomUnits: [
      {
        denom: "transfer/channel-9/factory/neutron1t24nc7whl77relnu3taxyg3p66pjyuk82png2y/uretro"
      },
      {
        denom: "transfer/channel-9/retro",
        exponent: 6
      }
    ],
    base: "transfer/channel-9/factory/neutron1t24nc7whl77relnu3taxyg3p66pjyuk82png2y/uretro",
    display: "transfer/channel-9/retro",
    name: "Retro",
    symbol: "RETRO",
    penumbraAssetId: {
      inner: "jwo+u0cDkbUOIRfAsPE9DRCrQ9m3AdkRBCvnP7VyRhI="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/neutron/images/retro.png",
        theme: {
          primaryColorHex: "#0e1520"
        }
      }
    ]
  },
  "k2flRuIwi8IAvyDasAL/9fjl8mGpPCPCMhYmsh8AlQQ=": {
    description: "CosmoUSD",
    denomUnits: [
      {
        denom: "transfer/channel-4/factory/osmo104jtrwcljnxfljhml8mxrw7qetcsdmqvy3sprw/ucosmousd"
      },
      {
        denom: "transfer/channel-4/CosmoUSD",
        exponent: 6
      }
    ],
    base: "transfer/channel-4/factory/osmo104jtrwcljnxfljhml8mxrw7qetcsdmqvy3sprw/ucosmousd",
    display: "transfer/channel-4/CosmoUSD",
    name: "CosmoUSD",
    symbol: "COSMOUSD.ch4",
    penumbraAssetId: {
      inner: "k2flRuIwi8IAvyDasAL/9fjl8mGpPCPCMhYmsh8AlQQ="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/CosmoUSD.png",
        theme: {
          primaryColorHex: "#352f41"
        }
      }
    ]
  },
  "k3wpWFkTLuYk5wCBXdRrqNeTI4+0K4m6TNB1Xms2TwA=": {
    description: "Drop staked ATOM",
    denomUnits: [
      {
        denom: "transfer/channel-9/factory/neutron1k6hr0f83e7un2wjf29cspk7j69jrnskk65k3ek2nj9dztrlzpj6q00rtsa/udatom"
      },
      {
        denom: "transfer/channel-9/dATOM",
        exponent: 6
      }
    ],
    base: "transfer/channel-9/factory/neutron1k6hr0f83e7un2wjf29cspk7j69jrnskk65k3ek2nj9dztrlzpj6q00rtsa/udatom",
    display: "transfer/channel-9/dATOM",
    name: "dATOM",
    symbol: "dATOM",
    penumbraAssetId: {
      inner: "k3wpWFkTLuYk5wCBXdRrqNeTI4+0K4m6TNB1Xms2TwA="
    },
    images: [
      {
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/neutron/images/dATOM.svg",
        theme: {
          primaryColorHex: "#643cfb"
        }
      }
    ],
    coingeckoId: "drop-staked-atom"
  },
  "kCcUIFYcJ7rVOxyzk4VI5E2Nm1RlaENNCg7F6tnnFg0=": {
    description: "An alloy of DOT asset variants on Osmosis.",
    denomUnits: [
      {
        denom: "transfer/channel-20/factory/osmo1r53fx9fvcdzncrs7zkn4gw5vfelx5gk8k5wc6wqha2jpkh992rusr5tk02/alloyed/allDOT"
      },
      {
        denom: "transfer/channel-20/dot",
        exponent: 10
      }
    ],
    base: "transfer/channel-20/factory/osmo1r53fx9fvcdzncrs7zkn4gw5vfelx5gk8k5wc6wqha2jpkh992rusr5tk02/alloyed/allDOT",
    display: "transfer/channel-20/dot",
    name: "Polkadot",
    symbol: "allDOT",
    penumbraAssetId: {
      inner: "kCcUIFYcJ7rVOxyzk4VI5E2Nm1RlaENNCg7F6tnnFg0="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/polkadot/images/dot.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/polkadot/images/dot.svg",
        theme: {
          primaryColorHex: "#e4047c"
        }
      }
    ]
  },
  "kCvT1FiNGNhJdwq1u/v4ugzJ1FDUXkLdvIPOWhNVRQI=": {
    description: "Sail DAO is a liquidity deployment and management DAO built as a collaboration between the Osmosis and Migaloo Blockchains.",
    denomUnits: [
      {
        denom: "transfer/channel-20/factory/osmo1rckme96ptawr4zwexxj5g5gej9s2dmud8r2t9j0k0prn5mch5g4snzzwjv/sail"
      },
      {
        denom: "transfer/channel-20/sail",
        exponent: 6
      }
    ],
    base: "transfer/channel-20/factory/osmo1rckme96ptawr4zwexxj5g5gej9s2dmud8r2t9j0k0prn5mch5g4snzzwjv/sail",
    display: "transfer/channel-20/sail",
    name: "Sail",
    symbol: "SAIL",
    penumbraAssetId: {
      inner: "kCvT1FiNGNhJdwq1u/v4ugzJ1FDUXkLdvIPOWhNVRQI="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/sail.png",
        theme: {
          primaryColorHex: "#f6f3f7"
        }
      }
    ]
  },
  "kmxtCtqVIc/lLgdQkonBEvAK/3Qk1yrv0r7CuXo45A4=": {
    denomUnits: [
      {
        denom: "transfer/channel-7/reth-wei"
      },
      {
        denom: "transfer/channel-7/reth",
        exponent: 18
      }
    ],
    base: "transfer/channel-7/reth-wei",
    display: "transfer/channel-7/reth",
    name: "Rocket Pool Ether",
    symbol: "rETH",
    penumbraAssetId: {
      inner: "kmxtCtqVIc/lLgdQkonBEvAK/3Qk1yrv0r7CuXo45A4="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/ethereum/images/reth.png",
        theme: {
          primaryColorHex: "#050504"
        }
      }
    ]
  },
  "kqDk0RPwwVDwnLLe1YunfWT5nL8/TpoUYVS5SfPQ/AY=": {
    description: "An alloy of UNI asset variants on Osmosis.",
    denomUnits: [
      {
        denom: "transfer/channel-20/factory/osmo1eqjda4pc6e09jtxzxggf6jl3jye2yn453ja58we5gxwzmf5ah28qvlnaz8/alloyed/allUNI"
      },
      {
        denom: "transfer/channel-20/allUNI",
        exponent: 12
      }
    ],
    base: "transfer/channel-20/factory/osmo1eqjda4pc6e09jtxzxggf6jl3jye2yn453ja58we5gxwzmf5ah28qvlnaz8/alloyed/allUNI",
    display: "transfer/channel-20/allUNI",
    name: "Uniswap",
    symbol: "allUNI",
    penumbraAssetId: {
      inner: "kqDk0RPwwVDwnLLe1YunfWT5nL8/TpoUYVS5SfPQ/AY="
    },
    images: [
      {
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/ethereum/images/uni.svg",
        theme: {
          primaryColorHex: "#fc047c"
        }
      }
    ]
  },
  "ky7zgNZcLgisQoxQanYw1buQYB5s6Hb3cmP68KWWVAU=": {
    description: "SEED token",
    denomUnits: [
      {
        denom: "transfer/channel-9/factory/neutron133xakkrfksq39wxy575unve2nyehg5npx75nph/seed"
      },
      {
        denom: "transfer/channel-9/SEED",
        exponent: 6
      }
    ],
    base: "transfer/channel-9/factory/neutron133xakkrfksq39wxy575unve2nyehg5npx75nph/seed",
    display: "transfer/channel-9/SEED",
    name: "SEED",
    symbol: "SEED",
    penumbraAssetId: {
      inner: "ky7zgNZcLgisQoxQanYw1buQYB5s6Hb3cmP68KWWVAU="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/neutron/images/seed.png",
        theme: {
          primaryColorHex: "#0d0d0c"
        }
      }
    ]
  },
  "l1BDGTroOXzg1FnpfuaerQJtUksXCgRjv3P6lyCb3As=": {
    description: "An alloy of SOL asset variants on Osmosis.",
    denomUnits: [
      {
        denom: "transfer/channel-20/factory/osmo1n3n75av8awcnw4jl62n3l48e6e4sxqmaf97w5ua6ddu4s475q5qq9udvx4/alloyed/allSOL"
      },
      {
        denom: "transfer/channel-20/allSOL",
        exponent: 9
      }
    ],
    base: "transfer/channel-20/factory/osmo1n3n75av8awcnw4jl62n3l48e6e4sxqmaf97w5ua6ddu4s475q5qq9udvx4/alloyed/allSOL",
    display: "transfer/channel-20/allSOL",
    name: "Solana",
    symbol: "SOL",
    penumbraAssetId: {
      inner: "l1BDGTroOXzg1FnpfuaerQJtUksXCgRjv3P6lyCb3As="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/solana/images/sol_circle.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/solana/images/sol_circle.svg",
        theme: {
          primaryColorHex: "#54b3c4"
        }
      },
      {
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/solana/images/sol.svg",
        theme: {
          primaryColorHex: "#5da1ca"
        }
      }
    ],
    priorityScore: "600000000000",
    coingeckoId: "osmosis-allsol"
  },
  "l3nVls1gmhYwff5V95YP4cNQEsg1eZJavtF03ty/mwI=": {
    description: "POSTHUMAN (PHMN) is the governance token of the POSTHUMAN DAO, issued on Cosmos Hub through TokenFactory.",
    denomUnits: [
      {
        denom: "transfer/channel-22/factory/cosmos146s5j3t7gh2g37ywm47dp8avhesu2htvjjaxq7z55e7xj0rq0k8q5qnjjy/PHMN"
      },
      {
        denom: "transfer/channel-22/phmn",
        exponent: 6
      }
    ],
    base: "transfer/channel-22/factory/cosmos146s5j3t7gh2g37ywm47dp8avhesu2htvjjaxq7z55e7xj0rq0k8q5qnjjy/PHMN",
    display: "transfer/channel-22/phmn",
    name: "POSTHUMAN",
    symbol: "PHMN",
    penumbraAssetId: {
      inner: "l3nVls1gmhYwff5V95YP4cNQEsg1eZJavtF03ty/mwI="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/cosmoshub/images/phmn.png",
        theme: {
          primaryColorHex: "#bb944d"
        }
      }
    ]
  },
  "laTqmqV0r3PERHERkPSyNu7d697F4C8mupKyfsKnjAo=": {
    description: "Avail is a web3 infrastructure layer that allows modular execution layers to scale and interoperate in a trust minimized way.",
    denomUnits: [
      {
        denom: "transfer/channel-4/factory/osmo1myv2g72h8dan7n4hx7stt3mmust6ws03zh6gxc7vz4hpmgp5z3lq9aunm9/AVAIL.rt"
      },
      {
        denom: "transfer/channel-4/AVAIL",
        exponent: 18
      }
    ],
    base: "transfer/channel-4/factory/osmo1myv2g72h8dan7n4hx7stt3mmust6ws03zh6gxc7vz4hpmgp5z3lq9aunm9/AVAIL.rt",
    display: "transfer/channel-4/AVAIL",
    name: "Avail (Ethereum via Router)",
    symbol: "AVAIL.eth.rt.ch4",
    penumbraAssetId: {
      inner: "laTqmqV0r3PERHERkPSyNu7d697F4C8mupKyfsKnjAo="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/avail/images/avail.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/avail/images/avail.svg",
        theme: {
          primaryColorHex: "#3cb5eb"
        }
      }
    ],
    coingeckoId: "avail"
  },
  "lc579Rmc/HH88zXHAvcqSDY0HtOAm3YV/BkaTbp7KhA=": {
    description: "eBABY – Escher’s chain-abstracted liquid-staking token for BABY",
    denomUnits: [
      {
        denom: "transfer/channel-4/factory/osmo12r3yc76u9lxe33yemstatnw8602culdjzrtr8lmnpycmd3z7d4jsxx60kc/FwNhFaW3zLxoLUgXCdWjqBzcvGNPaB7B2XZqm2xgrB93"
      },
      {
        denom: "transfer/channel-4/ebaby",
        exponent: 6
      }
    ],
    base: "transfer/channel-4/factory/osmo12r3yc76u9lxe33yemstatnw8602culdjzrtr8lmnpycmd3z7d4jsxx60kc/FwNhFaW3zLxoLUgXCdWjqBzcvGNPaB7B2XZqm2xgrB93",
    display: "transfer/channel-4/ebaby",
    name: "eBABY",
    symbol: "EBABY.ch4",
    penumbraAssetId: {
      inner: "lc579Rmc/HH88zXHAvcqSDY0HtOAm3YV/BkaTbp7KhA="
    },
    images: [
      {
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/babylon/images/eBABY.svg",
        theme: {
          primaryColorHex: "#040cfb"
        }
      }
    ]
  },
  "lo47TNClfKme5ZVjSBoWlFilyXpEfIOVCHJ39nGh5ws=": {
    description: "The Cosmos Network's premier self-hatred memecoin.",
    denomUnits: [
      {
        denom: "transfer/channel-20/factory/osmo1q77cw0mmlluxu0wr29fcdd0tdnh78gzhkvhe4n6ulal9qvrtu43qtd0nh8/shitmos"
      },
      {
        denom: "transfer/channel-20/SHITMOS",
        exponent: 6
      }
    ],
    base: "transfer/channel-20/factory/osmo1q77cw0mmlluxu0wr29fcdd0tdnh78gzhkvhe4n6ulal9qvrtu43qtd0nh8/shitmos",
    display: "transfer/channel-20/SHITMOS",
    name: "Shitmos",
    symbol: "SHITMOS",
    penumbraAssetId: {
      inner: "lo47TNClfKme5ZVjSBoWlFilyXpEfIOVCHJ39nGh5ws="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/shitmos.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/shitmos.svg",
        theme: {
          primaryColorHex: "#5d3b26"
        }
      }
    ]
  },
  "m4g1V91Iwjd+moqk+mbxGr9+mtFZl2jqde5HbltTGw8=": {
    description: "Stride's liquid staked SAGA",
    denomUnits: [
      {
        denom: "transfer/channel-8/stusaga"
      },
      {
        denom: "transfer/channel-8/stSAGA",
        exponent: 6
      }
    ],
    base: "transfer/channel-8/stusaga",
    display: "transfer/channel-8/stSAGA",
    name: "Stride Staked SAGA",
    symbol: "stSAGA",
    penumbraAssetId: {
      inner: "m4g1V91Iwjd+moqk+mbxGr9+mtFZl2jqde5HbltTGw8="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/stride/images/stsaga.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/stride/images/stsaga.svg",
        theme: {
          primaryColorHex: "#e30474"
        }
      }
    ]
  },
  "mCAtTXRwbs3Fa9uAKUOoFeewpZFr0s+4ijsvHI1UdQ8=": {
    description: "An alloy of DYM asset variants on Osmosis.",
    denomUnits: [
      {
        denom: "transfer/channel-4/factory/osmo12cf6l99qrchfppmjp80gvkpnle2tuxpck2cf6fz030w74mq49u4qm3dh4d/alloyed/allDYM"
      },
      {
        denom: "transfer/channel-4/allDYM",
        exponent: 12
      }
    ],
    base: "transfer/channel-4/factory/osmo12cf6l99qrchfppmjp80gvkpnle2tuxpck2cf6fz030w74mq49u4qm3dh4d/alloyed/allDYM",
    display: "transfer/channel-4/allDYM",
    name: "Dymension Hub",
    symbol: "DYM.ch4",
    penumbraAssetId: {
      inner: "mCAtTXRwbs3Fa9uAKUOoFeewpZFr0s+4ijsvHI1UdQ8="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/dymension/images/dymension-logo.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/dymension/images/dymension-logo.svg",
        theme: {
          primaryColorHex: "#b4ac9c"
        }
      }
    ]
  },
  "mOsZDHVV/Ni5tMvOFJpVpVbqljSJrBBcEx9cRfHl1AI=": {
    description: "Fractionalized Pixel Witches",
    denomUnits: [
      {
        denom: "transfer/channel-20/factory/osmo1dywfmhyc8y0wga7qpzej0x0mgwqg25fj4eccp494w8yafzdpgamsx9ryyv/fWITCH"
      },
      {
        denom: "transfer/channel-20/fWITCH",
        exponent: 9
      }
    ],
    base: "transfer/channel-20/factory/osmo1dywfmhyc8y0wga7qpzej0x0mgwqg25fj4eccp494w8yafzdpgamsx9ryyv/fWITCH",
    display: "transfer/channel-20/fWITCH",
    name: "fWITCH",
    symbol: "fWITCH",
    penumbraAssetId: {
      inner: "mOsZDHVV/Ni5tMvOFJpVpVbqljSJrBBcEx9cRfHl1AI="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/fWITCH.png",
        theme: {
          primaryColorHex: "#cce1d7"
        }
      }
    ]
  },
  "n3badZGZ/y5sAyi3tnYYVuJX+squzic2GOVV9Fr1bBA=": {
    description: "Fractionalized Rekt Bulls",
    denomUnits: [
      {
        denom: "transfer/channel-4/factory/osmo1dywfmhyc8y0wga7qpzej0x0mgwqg25fj4eccp494w8yafzdpgamsx9ryyv/fBULLS"
      },
      {
        denom: "transfer/channel-4/fBULLS",
        exponent: 9
      }
    ],
    base: "transfer/channel-4/factory/osmo1dywfmhyc8y0wga7qpzej0x0mgwqg25fj4eccp494w8yafzdpgamsx9ryyv/fBULLS",
    display: "transfer/channel-4/fBULLS",
    name: "fBULLS",
    symbol: "fBULLS.ch4",
    penumbraAssetId: {
      inner: "n3badZGZ/y5sAyi3tnYYVuJX+squzic2GOVV9Fr1bBA="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/fBULLS.png",
        theme: {
          primaryColorHex: "#080d11"
        }
      }
    ]
  },
  "nSOEmc6AXBz9+0EMnVFtcjmfMAd/fGeLpESZqs2ktwU=": {
    description: "Fractionalized CEWTs",
    denomUnits: [
      {
        denom: "transfer/channel-4/factory/osmo1dywfmhyc8y0wga7qpzej0x0mgwqg25fj4eccp494w8yafzdpgamsx9ryyv/fCEWT"
      },
      {
        denom: "transfer/channel-4/fCEWT",
        exponent: 9
      }
    ],
    base: "transfer/channel-4/factory/osmo1dywfmhyc8y0wga7qpzej0x0mgwqg25fj4eccp494w8yafzdpgamsx9ryyv/fCEWT",
    display: "transfer/channel-4/fCEWT",
    name: "fCEWT",
    symbol: "fCEWT.ch4",
    penumbraAssetId: {
      inner: "nSOEmc6AXBz9+0EMnVFtcjmfMAd/fGeLpESZqs2ktwU="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/fCEWT.png",
        theme: {
          primaryColorHex: "#ccd5b6"
        }
      }
    ]
  },
  "nTb3jJ7DqDXcjE3Jx1Q76gXtdv599bZJTHVYoS/fkAE=": {
    description: "ERIS liquid staked INJ",
    denomUnits: [
      {
        denom: "transfer/channel-18/factory/inj1cdwt8g7nxgtg2k4fn8sj363mh9ahkw2qt0vrnc/ampINJ"
      },
      {
        denom: "transfer/channel-18/ampINJ",
        exponent: 6
      }
    ],
    base: "transfer/channel-18/factory/inj1cdwt8g7nxgtg2k4fn8sj363mh9ahkw2qt0vrnc/ampINJ",
    display: "transfer/channel-18/ampINJ",
    name: "ERIS Amplified INJ",
    symbol: "ampINJ",
    penumbraAssetId: {
      inner: "nTb3jJ7DqDXcjE3Jx1Q76gXtdv599bZJTHVYoS/fkAE="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/injective/images/ampinj.png",
        theme: {
          primaryColorHex: "#549ccc"
        }
      }
    ]
  },
  "nUkr/qDT2BjaRK6npdi8JHWRim272uE81bFX5kKcgwo=": {
    description: "SLAYER OF ZEROS ",
    denomUnits: [
      {
        denom: "transfer/channel-20/factory/osmo1q77cw0mmlluxu0wr29fcdd0tdnh78gzhkvhe4n6ulal9qvrtu43qtd0nh8/slayer"
      },
      {
        denom: "transfer/channel-20/SLAYER",
        exponent: 6
      }
    ],
    base: "transfer/channel-20/factory/osmo1q77cw0mmlluxu0wr29fcdd0tdnh78gzhkvhe4n6ulal9qvrtu43qtd0nh8/slayer",
    display: "transfer/channel-20/SLAYER",
    name: "SLAYER",
    symbol: "SLAYER",
    penumbraAssetId: {
      inner: "nUkr/qDT2BjaRK6npdi8JHWRim272uE81bFX5kKcgwo="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/SLAYER.png",
        theme: {
          primaryColorHex: "#9c7a6a"
        }
      }
    ]
  },
  "nWdK83xWG2zCRrVsj637XXd4sbxVY5Nu1fVL4bNOjAw=": {
    description: "Roostock BTC bridged via Router.",
    denomUnits: [
      {
        denom: "transfer/channel-20/factory/osmo1myv2g72h8dan7n4hx7stt3mmust6ws03zh6gxc7vz4hpmgp5z3lq9aunm9/BTC.rt"
      },
      {
        denom: "transfer/channel-20/rbtc",
        exponent: 18
      }
    ],
    base: "transfer/channel-20/factory/osmo1myv2g72h8dan7n4hx7stt3mmust6ws03zh6gxc7vz4hpmgp5z3lq9aunm9/BTC.rt",
    display: "transfer/channel-20/rbtc",
    name: "Rootstock (Router)",
    symbol: "RBTC.rt",
    penumbraAssetId: {
      inner: "nWdK83xWG2zCRrVsj637XXd4sbxVY5Nu1fVL4bNOjAw="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/rootstock/images/rbtc.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/rootstock/images/rbtc.svg",
        theme: {
          primaryColorHex: "#f7e7d1"
        }
      }
    ]
  },
  "naVaN9pPiMqLDNr9NUQXql3iiGhnWFTmjFvZXl9HOws=": {
    description: "Talis revenue sharing token",
    denomUnits: [
      {
        denom: "transfer/channel-18/factory/inj1maeyvxfamtn8lfyxpjca8kuvauuf2qeu6gtxm3/xTalis"
      },
      {
        denom: "transfer/channel-18/xTalis",
        exponent: 6
      }
    ],
    base: "transfer/channel-18/factory/inj1maeyvxfamtn8lfyxpjca8kuvauuf2qeu6gtxm3/xTalis",
    display: "transfer/channel-18/xTalis",
    name: "xTalis Token",
    symbol: "XTALIS",
    penumbraAssetId: {
      inner: "naVaN9pPiMqLDNr9NUQXql3iiGhnWFTmjFvZXl9HOws="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/injective/images/xtalis.png",
        theme: {
          primaryColorHex: "#0be518"
        }
      }
    ]
  },
  "neh64toTy3b5K0n1sHBFiR0NYpO3QsN124Ov60oXVAA=": {
    description: "Uniswap on Axelar",
    denomUnits: [
      {
        denom: "transfer/channel-7/uni-wei"
      },
      {
        denom: "transfer/channel-7/uni",
        exponent: 18
      }
    ],
    base: "transfer/channel-7/uni-wei",
    display: "transfer/channel-7/uni",
    name: "Uniswap",
    symbol: "axlUNI",
    penumbraAssetId: {
      inner: "neh64toTy3b5K0n1sHBFiR0NYpO3QsN124Ov60oXVAA="
    },
    images: [
      {
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/ethereum/images/uni.svg",
        theme: {
          primaryColorHex: "#fc047c"
        }
      }
    ]
  },
  "nhxlufFkZckcEbBTdxnKyvxUuAgUpUJJJIcJVRcIbAg=": {
    denomUnits: [
      {
        denom: "udelegation_penumbravalid1q2eu6p33ne58aq0xh2ramsftmxqtqzlzwpa6uy8tgygje39mzypsq6nuyw"
      },
      {
        denom: "mdelegation_penumbravalid1q2eu6p33ne58aq0xh2ramsftmxqtqzlzwpa6uy8tgygje39mzypsq6nuyw",
        exponent: 3
      },
      {
        denom: "delegation_penumbravalid1q2eu6p33ne58aq0xh2ramsftmxqtqzlzwpa6uy8tgygje39mzypsq6nuyw",
        exponent: 6
      }
    ],
    base: "udelegation_penumbravalid1q2eu6p33ne58aq0xh2ramsftmxqtqzlzwpa6uy8tgygje39mzypsq6nuyw",
    display: "delegation_penumbravalid1q2eu6p33ne58aq0xh2ramsftmxqtqzlzwpa6uy8tgygje39mzypsq6nuyw",
    symbol: "delUM(Validatus)",
    penumbraAssetId: {
      inner: "nhxlufFkZckcEbBTdxnKyvxUuAgUpUJJJIcJVRcIbAg="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/penumbrafi/registry/main/images/validators/penumbravalid1q2eu6p33ne58aq0xh2ramsftmxqtqzlzwpa6uy8tgygje39mzypsq6nuyw.png",
        theme: {
          primaryColorHex: "#aa1e0e"
        }
      }
    ]
  },
  "njcHX/y5YWp6yxX+Bd6t6kPOvPCMoRsG4xdfM8gFBg4=": {
    description: "ATOM is the native cryptocurrency of the Cosmos network, designed to facilitate interoperability between multiple blockchains through its innovative hub-and-spoke model.",
    denomUnits: [
      {
        denom: "transfer/channel-22/uatom"
      },
      {
        denom: "transfer/channel-22/atom",
        exponent: 6
      }
    ],
    base: "transfer/channel-22/uatom",
    display: "transfer/channel-22/atom",
    name: "Cosmos Hub Atom",
    symbol: "ATOM",
    penumbraAssetId: {
      inner: "njcHX/y5YWp6yxX+Bd6t6kPOvPCMoRsG4xdfM8gFBg4="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/cosmoshub/images/atom.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/cosmoshub/images/atom.svg",
        theme: {
          primaryColorHex: "#272d45"
        }
      }
    ],
    priorityScore: "800000000098",
    coingeckoId: "cosmos"
  },
  "o+MALwmW631aohS0whSZ45kjaObtS+jgFI6Gbfc/CwY=": {
    description: "Baddest coin on Cosmos",
    denomUnits: [
      {
        denom: "transfer/channel-9/factory/neutron143wp6g8paqasnuuey6zyapucknwy9rhnld8hkr/bad"
      },
      {
        denom: "transfer/channel-9/bad",
        exponent: 6
      }
    ],
    base: "transfer/channel-9/factory/neutron143wp6g8paqasnuuey6zyapucknwy9rhnld8hkr/bad",
    display: "transfer/channel-9/bad",
    name: "Badcoin",
    symbol: "BAD",
    penumbraAssetId: {
      inner: "o+MALwmW631aohS0whSZ45kjaObtS+jgFI6Gbfc/CwY="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/neutron/images/bad.png",
        theme: {
          primaryColorHex: "#0a0906"
        }
      }
    ]
  },
  "o4n0zz6kvjLFJTXO6MBdtLMOC/WA4f5J500LRK7OWgY=": {
    description: "The advance token for ATOM denominated vaults on Amulet Protocol",
    denomUnits: [
      {
        denom: "transfer/channel-9/factory/neutron1shwxlkpdjd8h5wdtrykypwd2v62z5glr95yp0etdcspkkjwm5meq82ndxs/amatom"
      },
      {
        denom: "transfer/channel-9/amATOM",
        exponent: 6
      }
    ],
    base: "transfer/channel-9/factory/neutron1shwxlkpdjd8h5wdtrykypwd2v62z5glr95yp0etdcspkkjwm5meq82ndxs/amatom",
    display: "transfer/channel-9/amATOM",
    name: "amATOM",
    symbol: "amATOM",
    penumbraAssetId: {
      inner: "o4n0zz6kvjLFJTXO6MBdtLMOC/WA4f5J500LRK7OWgY="
    },
    images: [
      {
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/neutron/images/amATOM.svg",
        theme: {
          primaryColorHex: "#0f526b"
        }
      }
    ]
  },
  "o8n5vpqn0GuV+ckTqq9WMOW5Jw5Hf6TuuMHRXdLvywI=": {
    description: "Tether USDt from Ethereum via Peggy bridge.",
    denomUnits: [
      {
        denom: "transfer/channel-18/peggy0xdAC17F958D2ee523a2206206994597C13D831ec7"
      },
      {
        denom: "transfer/channel-18/usdt",
        exponent: 6
      }
    ],
    base: "transfer/channel-18/peggy0xdAC17F958D2ee523a2206206994597C13D831ec7",
    display: "transfer/channel-18/usdt",
    name: "Tether USDT",
    symbol: "USDT",
    penumbraAssetId: {
      inner: "o8n5vpqn0GuV+ckTqq9WMOW5Jw5Hf6TuuMHRXdLvywI="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/ethereum/images/usdt.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/ethereum/images/usdt.svg",
        theme: {
          primaryColorHex: "#049393"
        }
      }
    ],
    priorityScore: "600000000000",
    coingeckoId: "tether"
  },
  "oJrqiS598GEGDk2k1aSzyjgQGDKcNB5gnvf62kE9JQQ=": {
    denomUnits: [
      {
        denom: "transfer/channel-7/arbitrum-weth-wei"
      },
      {
        denom: "transfer/channel-7/arbitrum-weth",
        exponent: 18
      }
    ],
    base: "transfer/channel-7/arbitrum-weth-wei",
    display: "transfer/channel-7/arbitrum-weth",
    name: "Arbitrum axlETH",
    symbol: "axlETH.arbitrum",
    penumbraAssetId: {
      inner: "oJrqiS598GEGDk2k1aSzyjgQGDKcNB5gnvf62kE9JQQ="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/ethereum/images/eth-white.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/ethereum/images/eth-white.svg",
        theme: {
          primaryColorHex: "#8c8c8c"
        }
      },
      {
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/ethereum/images/weth.svg",
        theme: {
          primaryColorHex: "#e71e7b"
        }
      }
    ]
  },
  "oeTpmaKnmA34fOFYBilNnNKGzgkbFomyL6YuardkHgc=": {
    description: "A clan of 11y bad kids crafting chaos on the Cosmos eco. One bad memecoin to rule them all  $BADKID. Airdropped to Badkids NFT holders and $STARS stakers. It's so bad, your wallet's throwing a tantrum for it.",
    denomUnits: [
      {
        denom: "transfer/channel-20/factory/osmo10n8rv8npx870l69248hnp6djy6pll2yuzzn9x8/BADKID"
      },
      {
        denom: "transfer/channel-20/BADKID",
        exponent: 6
      }
    ],
    base: "transfer/channel-20/factory/osmo10n8rv8npx870l69248hnp6djy6pll2yuzzn9x8/BADKID",
    display: "transfer/channel-20/BADKID",
    name: "BADKID",
    symbol: "BADKID",
    penumbraAssetId: {
      inner: "oeTpmaKnmA34fOFYBilNnNKGzgkbFomyL6YuardkHgc="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/badkid.png",
        theme: {
          primaryColorHex: "#1a1a19"
        }
      }
    ]
  },
  "p6M59C5nGy2x3iJtRIPT5jA2ZhytFVTXX192/gTsHgA=": {
    description: "The Cosmos Network's premier self-hatred memecoin.",
    denomUnits: [
      {
        denom: "transfer/channel-4/factory/osmo1q77cw0mmlluxu0wr29fcdd0tdnh78gzhkvhe4n6ulal9qvrtu43qtd0nh8/shitmos"
      },
      {
        denom: "transfer/channel-4/SHITMOS",
        exponent: 6
      }
    ],
    base: "transfer/channel-4/factory/osmo1q77cw0mmlluxu0wr29fcdd0tdnh78gzhkvhe4n6ulal9qvrtu43qtd0nh8/shitmos",
    display: "transfer/channel-4/SHITMOS",
    name: "Shitmos",
    symbol: "SHITMOS.ch4",
    penumbraAssetId: {
      inner: "p6M59C5nGy2x3iJtRIPT5jA2ZhytFVTXX192/gTsHgA="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/shitmos.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/shitmos.svg",
        theme: {
          primaryColorHex: "#5d3b26"
        }
      }
    ],
    priorityScore: "800000000096"
  },
  "pIYEpegpxegCQLsCjAXpyVKynOBM3S5RDec2deMZVQM=": {
    description: "An alloy of LINK asset variants on Osmosis.",
    denomUnits: [
      {
        denom: "transfer/channel-20/factory/osmo18zdw5yvs6gfp95rp74qqwug9yduw2fyr8kplk2xgs726s9axc5usa2vpgw/alloyed/allLINK"
      },
      {
        denom: "transfer/channel-20/link",
        exponent: 12
      }
    ],
    base: "transfer/channel-20/factory/osmo18zdw5yvs6gfp95rp74qqwug9yduw2fyr8kplk2xgs726s9axc5usa2vpgw/alloyed/allLINK",
    display: "transfer/channel-20/link",
    name: "Chainlink",
    symbol: "allLINK",
    penumbraAssetId: {
      inner: "pIYEpegpxegCQLsCjAXpyVKynOBM3S5RDec2deMZVQM="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/ethereum/images/link.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/ethereum/images/link.svg",
        theme: {
          primaryColorHex: "#2c5cdc"
        }
      }
    ]
  },
  "pSv19K/OgZyJvCsSomOh0hpfkTkCndM6iEuEtjakFQE=": {
    description: "Bricscoin",
    denomUnits: [
      {
        denom: "transfer/channel-18/factory/inj1s9hr5zfz3xrkzchde94hd2d0edjs4q5mrqrz6x/BRICS"
      },
      {
        denom: "transfer/channel-18/BRICS",
        exponent: 6
      }
    ],
    base: "transfer/channel-18/factory/inj1s9hr5zfz3xrkzchde94hd2d0edjs4q5mrqrz6x/BRICS",
    display: "transfer/channel-18/BRICS",
    name: "Bricscoin",
    symbol: "BRICS",
    penumbraAssetId: {
      inner: "pSv19K/OgZyJvCsSomOh0hpfkTkCndM6iEuEtjakFQE="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/injective/images/brics.png",
        theme: {
          primaryColorHex: "#fb9522"
        }
      }
    ]
  },
  "pYLfzg2T4+NOqw7eT9Mk72h+odbRgkP0gqtAwl+XEwQ=": {
    description: "Commemorative token dedicated to the old Prussian noble family",
    denomUnits: [
      {
        denom: "transfer/channel-4/factory/osmo1q77cw0mmlluxu0wr29fcdd0tdnh78gzhkvhe4n6ulal9qvrtu43qtd0nh8/ba-ba"
      },
      {
        denom: "transfer/channel-4/BA-BA",
        exponent: 6
      }
    ],
    base: "transfer/channel-4/factory/osmo1q77cw0mmlluxu0wr29fcdd0tdnh78gzhkvhe4n6ulal9qvrtu43qtd0nh8/ba-ba",
    display: "transfer/channel-4/BA-BA",
    name: "von Baysen-Bażeński",
    symbol: "BABA.ch4",
    penumbraAssetId: {
      inner: "pYLfzg2T4+NOqw7eT9Mk72h+odbRgkP0gqtAwl+XEwQ="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/BA-BA.png",
        theme: {
          primaryColorHex: "#bf2019"
        }
      }
    ]
  },
  "pbFlvS5JAHyhRQDnIJuGd/mxfeLpdu7ee/KfVh15Gw0=": {
    description: "Tether's USD stablecoin from Optimism on Axelar",
    denomUnits: [
      {
        denom: "transfer/channel-7/optimism-uusdt"
      },
      {
        denom: "transfer/channel-7/usdt",
        exponent: 6
      }
    ],
    base: "transfer/channel-7/optimism-uusdt",
    display: "transfer/channel-7/usdt",
    name: "Tether USD (Optimism)",
    symbol: "axlUSDT.optimism",
    penumbraAssetId: {
      inner: "pbFlvS5JAHyhRQDnIJuGd/mxfeLpdu7ee/KfVh15Gw0="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/ethereum/images/usdt.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/ethereum/images/usdt.svg",
        theme: {
          primaryColorHex: "#049393"
        }
      }
    ]
  },
  "pfau1v4i2fSqAS7d9crfwB+qAIiV7IfjvzmTNsMoLww=": {
    denomUnits: [
      {
        denom: "transfer/channel-9/factory/neutron19tynwawkm2rgefqxy7weupu4hdamyhg890zep2/TAKUMI"
      },
      {
        denom: "transfer/channel-9/takumi",
        exponent: 6
      }
    ],
    base: "transfer/channel-9/factory/neutron19tynwawkm2rgefqxy7weupu4hdamyhg890zep2/TAKUMI",
    display: "transfer/channel-9/takumi",
    name: "Takumi Asano",
    symbol: "TAKUMI",
    penumbraAssetId: {
      inner: "pfau1v4i2fSqAS7d9crfwB+qAIiV7IfjvzmTNsMoLww="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/neutron/images/takumi.png",
        theme: {
          primaryColorHex: "#c28f78"
        }
      }
    ]
  },
  "pfhuSArfwYCRpRI+PY3bM3wWpmKdgqZlmxrqCPhrXhA=": {
    description: "Frienzies are an IBC token redeemable exclusively for a physical asset issued by the Noble entity.",
    denomUnits: [
      {
        denom: "transfer/channel-2/ufrienzies"
      },
      {
        denom: "transfer/channel-2/frienzies",
        exponent: 6
      }
    ],
    base: "transfer/channel-2/ufrienzies",
    display: "transfer/channel-2/frienzies",
    name: "Frienzies",
    symbol: "FRNZ",
    penumbraAssetId: {
      inner: "pfhuSArfwYCRpRI+PY3bM3wWpmKdgqZlmxrqCPhrXhA="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/noble/images/frnz.png",
        theme: {
          primaryColorHex: "#04041c"
        }
      }
    ]
  },
  "pg8WjZqwBktMi4mY4Fb2C+YGwctVw0cOLnOL9awOQwg=": {
    description: "Stride's liquid staked DYDX",
    denomUnits: [
      {
        denom: "transfer/channel-8/stadydx"
      },
      {
        denom: "transfer/channel-8/stDYDX",
        exponent: 18
      }
    ],
    base: "transfer/channel-8/stadydx",
    display: "transfer/channel-8/stDYDX",
    name: "Stride Staked DYDX",
    symbol: "stDYDX",
    penumbraAssetId: {
      inner: "pg8WjZqwBktMi4mY4Fb2C+YGwctVw0cOLnOL9awOQwg="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/stride/images/stdydx.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/stride/images/stdydx.svg",
        theme: {
          primaryColorHex: "#e30474"
        }
      }
    ]
  },
  "pmzfmUbjmJ5hPRHQlPc7q99GqyC84871NThrLyxfPws=": {
    denomUnits: [
      {
        denom: "transfer/channel-7/cbeth-wei"
      },
      {
        denom: "transfer/channel-7/cbeth",
        exponent: 18
      }
    ],
    base: "transfer/channel-7/cbeth-wei",
    display: "transfer/channel-7/cbeth",
    name: "Coinbase Wrapped Staked ETH",
    symbol: "cbETH",
    penumbraAssetId: {
      inner: "pmzfmUbjmJ5hPRHQlPc7q99GqyC84871NThrLyxfPws="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/ethereum/images/cbeth.png",
        theme: {
          primaryColorHex: "#0554fc"
        }
      }
    ]
  },
  "pzc014qp4vcTEAB+F0xGY4l0YOLF1eBt36BD26wXyQE=": {
    description: "Quark ($QUARK) is an Osmosis token launched on the Cosmos Hub.",
    denomUnits: [
      {
        denom: "transfer/channel-20/factory/osmo1x7s7a2erqspkm6e79n7yh7fw3yh7xx4lt54mxg/uquark"
      },
      {
        denom: "transfer/channel-20/QUARK",
        exponent: 6
      }
    ],
    base: "transfer/channel-20/factory/osmo1x7s7a2erqspkm6e79n7yh7fw3yh7xx4lt54mxg/uquark",
    display: "transfer/channel-20/QUARK",
    name: "Quark",
    symbol: "QUARK",
    penumbraAssetId: {
      inner: "pzc014qp4vcTEAB+F0xGY4l0YOLF1eBt36BD26wXyQE="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/quark.png",
        theme: {
          primaryColorHex: "#72c1f1"
        }
      }
    ]
  },
  "q+QdsB0j6GY5ZcgysYJYWfgOfEzUJ2lJXXf7gDiw0AA=": {
    description: "Fractionalized Pixel Witches",
    denomUnits: [
      {
        denom: "transfer/channel-4/factory/osmo1dywfmhyc8y0wga7qpzej0x0mgwqg25fj4eccp494w8yafzdpgamsx9ryyv/fWITCH"
      },
      {
        denom: "transfer/channel-4/fWITCH",
        exponent: 9
      }
    ],
    base: "transfer/channel-4/factory/osmo1dywfmhyc8y0wga7qpzej0x0mgwqg25fj4eccp494w8yafzdpgamsx9ryyv/fWITCH",
    display: "transfer/channel-4/fWITCH",
    name: "fWITCH",
    symbol: "fWITCH.ch4",
    penumbraAssetId: {
      inner: "q+QdsB0j6GY5ZcgysYJYWfgOfEzUJ2lJXXf7gDiw0AA="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/fWITCH.png",
        theme: {
          primaryColorHex: "#cce1d7"
        }
      }
    ]
  },
  "q8PoP4dzqzHUyiqvrs0SnvjXnCi96gfhxAe2ci59zg0=": {
    description: "Chainlink on Axelar",
    denomUnits: [
      {
        denom: "transfer/channel-7/link-wei"
      },
      {
        denom: "transfer/channel-7/link",
        exponent: 18
      }
    ],
    base: "transfer/channel-7/link-wei",
    display: "transfer/channel-7/link",
    name: "Chainlink",
    symbol: "axlLINK",
    penumbraAssetId: {
      inner: "q8PoP4dzqzHUyiqvrs0SnvjXnCi96gfhxAe2ci59zg0="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/ethereum/images/link.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/ethereum/images/link.svg",
        theme: {
          primaryColorHex: "#2c5cdc"
        }
      }
    ]
  },
  "qNyZjBiM2AdaeqTtviMWhlcHz1MohQcQRYldYtdHWA0=": {
    description: "Margined Power Token sqBTC",
    denomUnits: [
      {
        denom: "transfer/channel-20/factory/osmo1g8qypve6l95xmhgc0fddaecerffymsl7kn9muw/sqbtc"
      },
      {
        denom: "transfer/channel-20/sqbtc",
        exponent: 6
      }
    ],
    base: "transfer/channel-20/factory/osmo1g8qypve6l95xmhgc0fddaecerffymsl7kn9muw/sqbtc",
    display: "transfer/channel-20/sqbtc",
    name: "BTC Squared",
    symbol: "sqBTC",
    penumbraAssetId: {
      inner: "qNyZjBiM2AdaeqTtviMWhlcHz1MohQcQRYldYtdHWA0="
    },
    images: [
      {
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/sqbtc.svg",
        theme: {
          primaryColorHex: "#bae343"
        }
      }
    ]
  },
  "qTadoyL6MJQ99tlXjmwjccuytSxSNByMLpVzZtVarQw=": {
    description: "Membrane's protocol token",
    denomUnits: [
      {
        denom: "transfer/channel-4/factory/osmo1s794h9rxggytja3a4pmwul53u98k06zy2qtrdvjnfuxruh7s8yjs6cyxgd/umbrn"
      },
      {
        denom: "transfer/channel-4/mbrn",
        exponent: 6
      }
    ],
    base: "transfer/channel-4/factory/osmo1s794h9rxggytja3a4pmwul53u98k06zy2qtrdvjnfuxruh7s8yjs6cyxgd/umbrn",
    display: "transfer/channel-4/mbrn",
    name: "Membrane",
    symbol: "MBRN.ch4",
    penumbraAssetId: {
      inner: "qTadoyL6MJQ99tlXjmwjccuytSxSNByMLpVzZtVarQw="
    },
    images: [
      {
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/MBRN.svg",
        theme: {
          primaryColorHex: "#6ca0da"
        }
      }
    ],
    coingeckoId: "membrane"
  },
  "qaDFFlDQ00yzmgR0QElCA9WgtA847cyE+R6aaXClQQg=": {
    description: "An alloy of DOGE asset variants on Osmosis.",
    denomUnits: [
      {
        denom: "transfer/channel-4/factory/osmo10pk4crey8fpdyqd62rsau0y02e3rk055w5u005ah6ly7k849k5tsf72x40/alloyed/allDOGE"
      },
      {
        denom: "transfer/channel-4/allDOGE",
        exponent: 8
      }
    ],
    base: "transfer/channel-4/factory/osmo10pk4crey8fpdyqd62rsau0y02e3rk055w5u005ah6ly7k849k5tsf72x40/alloyed/allDOGE",
    display: "transfer/channel-4/allDOGE",
    name: "Dogecoin",
    symbol: "DOGE.ch4",
    penumbraAssetId: {
      inner: "qaDFFlDQ00yzmgR0QElCA9WgtA847cyE+R6aaXClQQg="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/dogecoin/images/doge.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/dogecoin/images/doge.svg",
        theme: {
          primaryColorHex: "#b99937"
        }
      }
    ]
  },
  "qhGnX2cUuvGR3zBLjZSd9yUgHIjlkzaTSktq6y5XLg0=": {
    description: "Wrapped FTM on Axelar.",
    denomUnits: [
      {
        denom: "transfer/channel-7/wftm-wei"
      },
      {
        denom: "transfer/channel-7/ftm",
        exponent: 18
      }
    ],
    base: "transfer/channel-7/wftm-wei",
    display: "transfer/channel-7/ftm",
    name: "Wrapped FTM",
    symbol: "WFTM",
    penumbraAssetId: {
      inner: "qhGnX2cUuvGR3zBLjZSd9yUgHIjlkzaTSktq6y5XLg0="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/fantom/images/ftm.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/fantom/images/ftm.svg",
        theme: {
          primaryColorHex: "#1c6bfb"
        }
      }
    ]
  },
  "qjKxQD0DLvC+DzGnUB5M7fuckbGN0VLerJKXzAkTPQQ=": {
    description: "POSTHUMAN Reputation (RESP) is the reputation token of the POSTHUMAN ecosystem, migrated from the legacy Juno RESP token to Cosmos Hub through TokenFactory.",
    denomUnits: [
      {
        denom: "transfer/channel-0/factory/cosmos1nxxz937qd6zqxllwplydy6hts97c4amaqj8jxa57nsme3dmckk4s3mqujr/RESP"
      },
      {
        denom: "transfer/channel-0/resp",
        exponent: 6
      }
    ],
    base: "transfer/channel-0/factory/cosmos1nxxz937qd6zqxllwplydy6hts97c4amaqj8jxa57nsme3dmckk4s3mqujr/RESP",
    display: "transfer/channel-0/resp",
    name: "POSTHUMAN Reputation",
    symbol: "RESP.ch0",
    penumbraAssetId: {
      inner: "qjKxQD0DLvC+DzGnUB5M7fuckbGN0VLerJKXzAkTPQQ="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/cosmoshub/images/resp.png",
        theme: {
          primaryColorHex: "#bfc0c1"
        }
      }
    ]
  },
  "qv0KzIQ8nB5hl6A0yj4BDG+5oz6REJCK6xebCjXopg4=": {
    description: "Astroport is a neutral marketplace where anyone, from anywhere in the galaxy, can dock to trade their wares.",
    denomUnits: [
      {
        denom: "transfer/channel-9/factory/neutron1ffus553eet978k024lmssw0czsxwr97mggyv85lpcsdkft8v9ufsz3sa07/astro"
      },
      {
        denom: "transfer/channel-9/astro",
        exponent: 6
      }
    ],
    base: "transfer/channel-9/factory/neutron1ffus553eet978k024lmssw0czsxwr97mggyv85lpcsdkft8v9ufsz3sa07/astro",
    display: "transfer/channel-9/astro",
    name: "Astroport token",
    symbol: "ASTRO",
    penumbraAssetId: {
      inner: "qv0KzIQ8nB5hl6A0yj4BDG+5oz6REJCK6xebCjXopg4="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/neutron/images/astro.png",
        theme: {
          primaryColorHex: "#1c9bd4"
        }
      }
    ],
    coingeckoId: "astroport-fi"
  },
  "r6Wo7Cslzvy77Bf0AgG7IzXoflpF3ABo08TLUHs0zAQ=": {
    description: "An alloy of APTOS asset variants on Osmosis.",
    denomUnits: [
      {
        denom: "transfer/channel-20/factory/osmo1zynnzvwdu72zc4mxqnnp348ksfmayldqyfs8khdud3myr7m5h8nsqwta2v/alloyed/allAPT"
      },
      {
        denom: "transfer/channel-20/APT",
        exponent: 8
      }
    ],
    base: "transfer/channel-20/factory/osmo1zynnzvwdu72zc4mxqnnp348ksfmayldqyfs8khdud3myr7m5h8nsqwta2v/alloyed/allAPT",
    display: "transfer/channel-20/APT",
    name: "Aptos Coin",
    symbol: "APT",
    penumbraAssetId: {
      inner: "r6Wo7Cslzvy77Bf0AgG7IzXoflpF3ABo08TLUHs0zAQ="
    },
    images: [
      {
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/aptos/images/aptos.svg",
        theme: {
          primaryColorHex: "#040404"
        }
      },
      {
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/aptos/images/apt-dm.svg",
        theme: {
          primaryColorHex: "#c4c4c4"
        }
      }
    ]
  },
  "r869mbpTcPt+OGPdYPmK7bc/UID4E37Fyn1JsNj4uA8=": {
    description: "Real power moves quietly.",
    denomUnits: [
      {
        denom: "transfer/channel-4/factory/osmo1q77cw0mmlluxu0wr29fcdd0tdnh78gzhkvhe4n6ulal9qvrtu43qtd0nh8/stlth"
      },
      {
        denom: "transfer/channel-4/STLTH",
        exponent: 6
      }
    ],
    base: "transfer/channel-4/factory/osmo1q77cw0mmlluxu0wr29fcdd0tdnh78gzhkvhe4n6ulal9qvrtu43qtd0nh8/stlth",
    display: "transfer/channel-4/STLTH",
    name: "Stealth",
    symbol: "STLTH.ch4",
    penumbraAssetId: {
      inner: "r869mbpTcPt+OGPdYPmK7bc/UID4E37Fyn1JsNj4uA8="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/STLTH.png",
        theme: {
          primaryColorHex: "#049ccc"
        }
      },
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/stlth-circle.png",
        theme: {
          primaryColorHex: "#049ccc"
        }
      }
    ]
  },
  "rNNsvEj1LBheBJ3R4rJg+gmG6YXVGA6xmHCFVy0CPgM=": {
    description: "USDC supplied on Mars looped using Membrane by a vault that also has an entry fee",
    denomUnits: [
      {
        denom: "transfer/channel-4/factory/osmo1vf6e300hv2qe7r5rln8deft45ewgyytjnwfrdfcv5rgzrfy0s6cswjqf9r/mars-usdc-looped"
      },
      {
        denom: "transfer/channel-4/earnUSDC",
        exponent: 6
      }
    ],
    base: "transfer/channel-4/factory/osmo1vf6e300hv2qe7r5rln8deft45ewgyytjnwfrdfcv5rgzrfy0s6cswjqf9r/mars-usdc-looped",
    display: "transfer/channel-4/earnUSDC",
    name: "Mars Looped USDC Vault",
    symbol: "earnUSDC.ch4",
    penumbraAssetId: {
      inner: "rNNsvEj1LBheBJ3R4rJg+gmG6YXVGA6xmHCFVy0CPgM="
    }
  },
  "rRtXYAWZ/JT3dJfZOMBwDclYK1iN+DzCjOPBwsDDDwE=": {
    description: "Fractionalized Atlas DAO",
    denomUnits: [
      {
        denom: "transfer/channel-20/factory/osmo1dywfmhyc8y0wga7qpzej0x0mgwqg25fj4eccp494w8yafzdpgamsx9ryyv/fATLAS"
      },
      {
        denom: "transfer/channel-20/fATLAS",
        exponent: 9
      }
    ],
    base: "transfer/channel-20/factory/osmo1dywfmhyc8y0wga7qpzej0x0mgwqg25fj4eccp494w8yafzdpgamsx9ryyv/fATLAS",
    display: "transfer/channel-20/fATLAS",
    name: "fATLAS",
    symbol: "fATLAS",
    penumbraAssetId: {
      inner: "rRtXYAWZ/JT3dJfZOMBwDclYK1iN+DzCjOPBwsDDDwE="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/fATLAS.png",
        theme: {
          primaryColorHex: "#222222"
        }
      }
    ]
  },
  "rWjsRV+4UYUKK7gkkgOVP/zkRdtODkQKl4/sq4QesRA=": {
    description: "An alloy of MOVE asset variants on Osmosis.",
    denomUnits: [
      {
        denom: "transfer/channel-20/factory/osmo1v90ezcqkv5utjc52vg4w2gztmcpt7l4vqxzuryj6zl3qr8wy539quxeafk/alloyed/allMOVE"
      },
      {
        denom: "transfer/channel-20/allMOVE",
        exponent: 8
      }
    ],
    base: "transfer/channel-20/factory/osmo1v90ezcqkv5utjc52vg4w2gztmcpt7l4vqxzuryj6zl3qr8wy539quxeafk/alloyed/allMOVE",
    display: "transfer/channel-20/allMOVE",
    name: "Movement",
    symbol: "MOVE",
    penumbraAssetId: {
      inner: "rWjsRV+4UYUKK7gkkgOVP/zkRdtODkQKl4/sq4QesRA="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/movement/images/move.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/movement/images/move.svg",
        theme: {
          primaryColorHex: "#040404"
        }
      }
    ]
  },
  "rgU+AY/4UuE8BmSXa207+3OoQocmv6/C/ddWWdmT2gs=": {
    description: "Wrapped Bitcoin (WBTC) is an ERC20 token backed 1:1 with Bitcoin. Completely transparent. 100% verifiable. Community led.",
    denomUnits: [
      {
        denom: "transfer/channel-20/factory/osmo1z0qrq605sjgcqpylfl4aa6s90x738j7m58wyatt0tdzflg2ha26q67k743/wbtc"
      },
      {
        denom: "transfer/channel-20/wbtc",
        exponent: 8
      }
    ],
    base: "transfer/channel-20/factory/osmo1z0qrq605sjgcqpylfl4aa6s90x738j7m58wyatt0tdzflg2ha26q67k743/wbtc",
    display: "transfer/channel-20/wbtc",
    name: "Wrapped Bitcoin",
    symbol: "osmoWBTC",
    penumbraAssetId: {
      inner: "rgU+AY/4UuE8BmSXa207+3OoQocmv6/C/ddWWdmT2gs="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/ethereum/images/wbtc.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/ethereum/images/wbtc.svg",
        theme: {
          primaryColorHex: "#e4e2e5"
        }
      }
    ],
    priorityScore: "600000000000",
    coingeckoId: "wrapped-bitcoin"
  },
  "rqhdrBBlVtwkHicjGz8hO5ucYLDT+Cq0IL4rHSDn2AM=": {
    denomUnits: [
      {
        denom: "transfer/channel-8/stusomm"
      },
      {
        denom: "transfer/channel-8/stsomm",
        exponent: 6
      }
    ],
    base: "transfer/channel-8/stusomm",
    display: "transfer/channel-8/stsomm",
    name: "Stride Staked SOMM",
    symbol: "stSOMM",
    penumbraAssetId: {
      inner: "rqhdrBBlVtwkHicjGz8hO5ucYLDT+Cq0IL4rHSDn2AM="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/stride/images/stsomm.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/stride/images/stsomm.svg",
        theme: {
          primaryColorHex: "#fbf9fa"
        }
      }
    ]
  },
  "ruDiSE9Am2PocCybCvYNoCMDVVSzrF7NrxX/kQOn0wE=": {
    description: "LAB - Everything is an Experiment",
    denomUnits: [
      {
        denom: "transfer/channel-20/factory/osmo17fel472lgzs87ekt9dvk0zqyh5gl80sqp4sk4n/LAB"
      },
      {
        denom: "transfer/channel-20/LAB",
        exponent: 6
      }
    ],
    base: "transfer/channel-20/factory/osmo17fel472lgzs87ekt9dvk0zqyh5gl80sqp4sk4n/LAB",
    display: "transfer/channel-20/LAB",
    name: "LAB",
    symbol: "LAB",
    penumbraAssetId: {
      inner: "ruDiSE9Am2PocCybCvYNoCMDVVSzrF7NrxX/kQOn0wE="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/LAB.png",
        theme: {
          primaryColorHex: "#5bd146"
        }
      }
    ]
  },
  "rvPy5azGrvxTK0dzmiLWAfzsGrlqV9WM7wfHQhPJiQE=": {
    description: `Jacob Haertnellez Turtle. Launched by Jake's Personally appointed TURD Cult Leader..."NotSeanO'Riley." TURD is going to lead the shitcoins of Cosmos! Or Rug You. It will be Jake's Fault. `,
    denomUnits: [
      {
        denom: "transfer/channel-4/factory/osmo1q77cw0mmlluxu0wr29fcdd0tdnh78gzhkvhe4n6ulal9qvrtu43qtd0nh8/turd"
      },
      {
        denom: "transfer/channel-4/TURD",
        exponent: 6
      }
    ],
    base: "transfer/channel-4/factory/osmo1q77cw0mmlluxu0wr29fcdd0tdnh78gzhkvhe4n6ulal9qvrtu43qtd0nh8/turd",
    display: "transfer/channel-4/TURD",
    name: "TURDLE",
    symbol: "TURD.ch4",
    penumbraAssetId: {
      inner: "rvPy5azGrvxTK0dzmiLWAfzsGrlqV9WM7wfHQhPJiQE="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/TURD.png",
        theme: {
          primaryColorHex: "#bdef86"
        }
      }
    ]
  },
  "sFaJYKF7Zsgeer8N4d22rM/l57EQqIApJuX2vlvzuQc=": {
    description: "Neutron is a smart contract blockchain within the Cosmos ecosystem, leveraging the Cosmos Hub's security to provide cross-chain DeFi applications.",
    denomUnits: [
      {
        denom: "transfer/channel-9/untrn"
      },
      {
        denom: "transfer/channel-9/ntrn",
        exponent: 6
      }
    ],
    base: "transfer/channel-9/untrn",
    display: "transfer/channel-9/ntrn",
    name: "Neutron",
    symbol: "NTRN",
    penumbraAssetId: {
      inner: "sFaJYKF7Zsgeer8N4d22rM/l57EQqIApJuX2vlvzuQc="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/neutron/images/ntrn.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/neutron/images/ntrn.svg",
        theme: {
          primaryColorHex: "#040404"
        }
      }
    ],
    coingeckoId: "neutron-3"
  },
  "sKnf7dH1bzQ+PI/+N2Y8edAkRYyE94l5NyoUWKi1KRA=": {
    description: "An alloy of FIL asset variants on Osmosis.",
    denomUnits: [
      {
        denom: "transfer/channel-4/factory/osmo1ss0n3ghv5rr4z4y54fnkprc69tegmdm3ejlkgr2z4utnyg7eljgs9pztvs/alloyed/allFIL"
      },
      {
        denom: "transfer/channel-4/allFIL",
        exponent: 12
      }
    ],
    base: "transfer/channel-4/factory/osmo1ss0n3ghv5rr4z4y54fnkprc69tegmdm3ejlkgr2z4utnyg7eljgs9pztvs/alloyed/allFIL",
    display: "transfer/channel-4/allFIL",
    name: "Filecoin",
    symbol: "FIL.ch4",
    penumbraAssetId: {
      inner: "sKnf7dH1bzQ+PI/+N2Y8edAkRYyE94l5NyoUWKi1KRA="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/filecoin/images/fil.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/filecoin/images/fil.svg",
        theme: {
          primaryColorHex: "#0493fb"
        }
      }
    ]
  },
  "sejeYcpmUBFKNUSXUIx9tYzgiHrcfkwro/86oVRmKgg=": {
    description: "MilkyWay's liquid staked TIA",
    denomUnits: [
      {
        denom: "transfer/channel-20/factory/osmo1f5vfcph2dvfeqcqkhetwv75fda69z7e5c2dldm3kvgj23crkv6wqcn47a0/umilkTIA"
      },
      {
        denom: "transfer/channel-20/milkTIA",
        exponent: 6
      }
    ],
    base: "transfer/channel-20/factory/osmo1f5vfcph2dvfeqcqkhetwv75fda69z7e5c2dldm3kvgj23crkv6wqcn47a0/umilkTIA",
    display: "transfer/channel-20/milkTIA",
    name: "milkTIA",
    symbol: "milkTIA",
    penumbraAssetId: {
      inner: "sejeYcpmUBFKNUSXUIx9tYzgiHrcfkwro/86oVRmKgg="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/milktia.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/milktia.svg",
        theme: {
          primaryColorHex: "#d08dfb"
        }
      }
    ],
    coingeckoId: "milkyway-staked-tia"
  },
  "soFDlfb+rRbLs46dTbxb12VK2o6E/H3g2WdDieA+jgo=": {
    description: "An alloy of USDC asset variants on Osmosis.",
    denomUnits: [
      {
        denom: "transfer/channel-4/factory/osmo147h5x9pcj7lm0cttlaefx6sqq5vdfnmwfcqxkmjd7exqm9gc7grqhr75m0/alloyed/allUSDC"
      },
      {
        denom: "transfer/channel-4/allUSDC",
        exponent: 6
      }
    ],
    base: "transfer/channel-4/factory/osmo147h5x9pcj7lm0cttlaefx6sqq5vdfnmwfcqxkmjd7exqm9gc7grqhr75m0/alloyed/allUSDC",
    display: "transfer/channel-4/allUSDC",
    name: "USD Coin",
    symbol: "allUSDC.ch4",
    penumbraAssetId: {
      inner: "soFDlfb+rRbLs46dTbxb12VK2o6E/H3g2WdDieA+jgo="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/ethereum/images/usdc.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/ethereum/images/usdc.svg",
        theme: {
          primaryColorHex: "#2474cb"
        }
      }
    ]
  },
  "tX/lhccfqhH8PvG3Hxa+cvXLpmeJUZsq6oUHrDO9uAI=": {
    description: "Fractionalized Crypto Hamsters",
    denomUnits: [
      {
        denom: "transfer/channel-20/factory/osmo1dywfmhyc8y0wga7qpzej0x0mgwqg25fj4eccp494w8yafzdpgamsx9ryyv/fHAM"
      },
      {
        denom: "transfer/channel-20/fHAM",
        exponent: 9
      }
    ],
    base: "transfer/channel-20/factory/osmo1dywfmhyc8y0wga7qpzej0x0mgwqg25fj4eccp494w8yafzdpgamsx9ryyv/fHAM",
    display: "transfer/channel-20/fHAM",
    name: "fHAM",
    symbol: "fHAM",
    penumbraAssetId: {
      inner: "tX/lhccfqhH8PvG3Hxa+cvXLpmeJUZsq6oUHrDO9uAI="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/fHAM.png",
        theme: {
          primaryColorHex: "#7b9967"
        }
      }
    ]
  },
  "tZ7M43uupSAILEHoXQbPRR2lVA9mTd0hUg6NVJnbxQw=": {
    description: "Quark ($QUARK) is an Osmosis token launched on the Cosmos Hub.",
    denomUnits: [
      {
        denom: "transfer/channel-4/factory/osmo1x7s7a2erqspkm6e79n7yh7fw3yh7xx4lt54mxg/uquark"
      },
      {
        denom: "transfer/channel-4/QUARK",
        exponent: 6
      }
    ],
    base: "transfer/channel-4/factory/osmo1x7s7a2erqspkm6e79n7yh7fw3yh7xx4lt54mxg/uquark",
    display: "transfer/channel-4/QUARK",
    name: "Quark",
    symbol: "QUARK.ch4",
    penumbraAssetId: {
      inner: "tZ7M43uupSAILEHoXQbPRR2lVA9mTd0hUg6NVJnbxQw="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/quark.png",
        theme: {
          primaryColorHex: "#72c1f1"
        }
      }
    ]
  },
  "tavJ/TAKws0M/Mguef8wxx0rqZQtKjAFTA8vM41+Sgc=": {
    description: "The memecoin built for the Celestia community",
    denomUnits: [
      {
        denom: "transfer/channel-4/factory/osmo1nr8zfakf6jauye3uqa9lrmr5xumee5n42lv92z/toro"
      },
      {
        denom: "transfer/channel-4/toro",
        exponent: 6
      }
    ],
    base: "transfer/channel-4/factory/osmo1nr8zfakf6jauye3uqa9lrmr5xumee5n42lv92z/toro",
    display: "transfer/channel-4/toro",
    name: "TORO",
    symbol: "TORO.ch4",
    penumbraAssetId: {
      inner: "tavJ/TAKws0M/Mguef8wxx0rqZQtKjAFTA8vM41+Sgc="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/toro.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/toro.svg",
        theme: {
          primaryColorHex: "#d9bedd"
        }
      }
    ]
  },
  "tcjFeHt0h93dx5iEqq2iR+WKuxtn7nxUpAEOrPm+2wY=": {
    description: "ashLAB - Burned LAB",
    denomUnits: [
      {
        denom: "transfer/channel-4/factory/osmo1svj5kd8kzj7xxtrd6ftjk0856ffpyj4egz7f9pd9dge5wr4kwansmefq07/lab.ash"
      },
      {
        denom: "transfer/channel-4/ashLAB",
        exponent: 6
      }
    ],
    base: "transfer/channel-4/factory/osmo1svj5kd8kzj7xxtrd6ftjk0856ffpyj4egz7f9pd9dge5wr4kwansmefq07/lab.ash",
    display: "transfer/channel-4/ashLAB",
    name: "Burned LAB",
    symbol: "ashLAB.ch4",
    penumbraAssetId: {
      inner: "tcjFeHt0h93dx5iEqq2iR+WKuxtn7nxUpAEOrPm+2wY="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/ashLAB.png",
        theme: {
          primaryColorHex: "#edb294"
        }
      }
    ]
  },
  "tec7y297UYj1eKMzI8jE5QwxW7lpY3GJH65UHE1MmwI=": {
    description: "An alloy of LTC asset variants on Osmosis.",
    denomUnits: [
      {
        denom: "transfer/channel-4/factory/osmo1csp8fk353hnq2tmulklecxpex43qmjvrkxjcsh4c3eqcw2vjcslq5jls9v/alloyed/allLTC"
      },
      {
        denom: "transfer/channel-4/allLTC",
        exponent: 8
      }
    ],
    base: "transfer/channel-4/factory/osmo1csp8fk353hnq2tmulklecxpex43qmjvrkxjcsh4c3eqcw2vjcslq5jls9v/alloyed/allLTC",
    display: "transfer/channel-4/allLTC",
    name: "Litecoin",
    symbol: "LTC.ch4",
    penumbraAssetId: {
      inner: "tec7y297UYj1eKMzI8jE5QwxW7lpY3GJH65UHE1MmwI="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/litecoin/images/ltc.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/litecoin/images/ltc.svg",
        theme: {
          primaryColorHex: "#345b9b"
        }
      }
    ]
  },
  "tg3IEJqnzEkGGiWGbSWmC/CdcP8kVEmyqw0f43praAI=": {
    description: "Fractionalized Cryptonium Maker",
    denomUnits: [
      {
        denom: "transfer/channel-20/factory/osmo1dywfmhyc8y0wga7qpzej0x0mgwqg25fj4eccp494w8yafzdpgamsx9ryyv/fCRYPTONIUM"
      },
      {
        denom: "transfer/channel-20/fCRYPTONIUM",
        exponent: 9
      }
    ],
    base: "transfer/channel-20/factory/osmo1dywfmhyc8y0wga7qpzej0x0mgwqg25fj4eccp494w8yafzdpgamsx9ryyv/fCRYPTONIUM",
    display: "transfer/channel-20/fCRYPTONIUM",
    name: "fCRYPTONIUM",
    symbol: "fCRYPTONIUM",
    penumbraAssetId: {
      inner: "tg3IEJqnzEkGGiWGbSWmC/CdcP8kVEmyqw0f43praAI="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/fCRYPTONIUM.png",
        theme: {
          primaryColorHex: "#d8b29c"
        }
      }
    ]
  },
  "tiqjoeiKwglZyFbvinYhCNpI8lpUQmxNlrsn7Q3m2gw=": {
    description: "Margined Power Token sqOSMO",
    denomUnits: [
      {
        denom: "transfer/channel-4/factory/osmo1g8qypve6l95xmhgc0fddaecerffymsl7kn9muw/squosmo"
      },
      {
        denom: "transfer/channel-4/sqosmo",
        exponent: 6
      }
    ],
    base: "transfer/channel-4/factory/osmo1g8qypve6l95xmhgc0fddaecerffymsl7kn9muw/squosmo",
    display: "transfer/channel-4/sqosmo",
    name: "OSMO Squared",
    symbol: "sqOSMO.ch4",
    penumbraAssetId: {
      inner: "tiqjoeiKwglZyFbvinYhCNpI8lpUQmxNlrsn7Q3m2gw="
    },
    images: [
      {
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/sqosmo.svg",
        theme: {
          primaryColorHex: "#040404"
        }
      }
    ]
  },
  "u0FIAb117e4ZDn3sFwA/fTJti/n1Cl6x47I51J29sQA=": {
    description: "Auto-compounding vault for Membrane's Stability Pool used to ease the UX of compounding CDT",
    denomUnits: [
      {
        denom: "transfer/channel-4/factory/osmo1jw6r68y0uhfmqagc7uhtdddctc7wq95pncvrqnvtd47w4hx46p7se9nju5/earn-cdt"
      },
      {
        denom: "transfer/channel-4/earnCDT",
        exponent: 6
      }
    ],
    base: "transfer/channel-4/factory/osmo1jw6r68y0uhfmqagc7uhtdddctc7wq95pncvrqnvtd47w4hx46p7se9nju5/earn-cdt",
    display: "transfer/channel-4/earnCDT",
    name: "Earn CDT Vault",
    symbol: "earnCDT.ch4",
    penumbraAssetId: {
      inner: "u0FIAb117e4ZDn3sFwA/fTJti/n1Cl6x47I51J29sQA="
    }
  },
  "u4I7XjKzWb4FYTqPNI1Ivb49vBUX9TjaKuGhFgtTVgQ=": {
    description: "A receipt token for lent SOL issued by the Neptune Protocol.",
    denomUnits: [
      {
        denom: "transfer/channel-18/inj1zcwr03uqw57g88nqvgpwfkazwutpqz9kplny4s"
      },
      {
        denom: "transfer/channel-18/nSOL",
        exponent: 8
      }
    ],
    base: "transfer/channel-18/inj1zcwr03uqw57g88nqvgpwfkazwutpqz9kplny4s",
    display: "transfer/channel-18/nSOL",
    name: "Neptune Receipt SOL",
    symbol: "nSOL",
    penumbraAssetId: {
      inner: "u4I7XjKzWb4FYTqPNI1Ivb49vBUX9TjaKuGhFgtTVgQ="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/injective/images/nsol.png",
        theme: {
          primaryColorHex: "#58bad4"
        }
      }
    ]
  },
  "u7X7v2nphA7l1Ga7pE1TTBRCbMDN1XyWi5P+wu6fnBA=": {
    description: "The native token of Osmosis",
    denomUnits: [
      {
        denom: "transfer/channel-20/uosmo"
      },
      {
        denom: "transfer/channel-20/osmo",
        exponent: 6
      }
    ],
    base: "transfer/channel-20/uosmo",
    display: "transfer/channel-20/osmo",
    name: "Osmosis",
    symbol: "OSMO",
    penumbraAssetId: {
      inner: "u7X7v2nphA7l1Ga7pE1TTBRCbMDN1XyWi5P+wu6fnBA="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/osmo.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/osmo.svg",
        theme: {
          primaryColorHex: "#6b0db7"
        }
      }
    ],
    priorityScore: "800000000099",
    coingeckoId: "osmosis"
  },
  "uXK2ihrObFuUlAF4KinZ/VZgvObq6MN8MnJcC9ci8AQ=": {
    description: "Wrapped Polkadot on Axelar",
    denomUnits: [
      {
        denom: "transfer/channel-7/dot-planck"
      },
      {
        denom: "transfer/channel-7/dot",
        exponent: 10
      }
    ],
    base: "transfer/channel-7/dot-planck",
    display: "transfer/channel-7/dot",
    name: "Wrapped Polkadot",
    symbol: "axlDOT",
    penumbraAssetId: {
      inner: "uXK2ihrObFuUlAF4KinZ/VZgvObq6MN8MnJcC9ci8AQ="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/polkadot/images/dot.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/polkadot/images/dot.svg",
        theme: {
          primaryColorHex: "#e4047c"
        }
      }
    ]
  },
  "uaJd0dbz4PUg85mKDcIQTxpTYqHOcmg+qoFLTClKhQg=": {
    denomUnits: [
      {
        denom: "transfer/channel-8/stuluna"
      },
      {
        denom: "transfer/channel-8/stluna",
        exponent: 6
      }
    ],
    base: "transfer/channel-8/stuluna",
    display: "transfer/channel-8/stluna",
    name: "Stride Staked LUNA",
    symbol: "stLUNA",
    penumbraAssetId: {
      inner: "uaJd0dbz4PUg85mKDcIQTxpTYqHOcmg+qoFLTClKhQg="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/stride/images/stluna.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/stride/images/stluna.svg",
        theme: {
          primaryColorHex: "#e30474"
        }
      }
    ]
  },
  "udb9fOKZIdHZBrzj+7ks+LnGKY/jvMvHFAU1fMFl/Ao=": {
    denomUnits: [
      {
        denom: "udelegation_penumbravalid1jf8tmgqaar2xdrhspmmuwyd6jt6hedjh0gz32pz4vwrmh93tvsyswth2sf"
      },
      {
        denom: "mdelegation_penumbravalid1jf8tmgqaar2xdrhspmmuwyd6jt6hedjh0gz32pz4vwrmh93tvsyswth2sf",
        exponent: 3
      },
      {
        denom: "delegation_penumbravalid1jf8tmgqaar2xdrhspmmuwyd6jt6hedjh0gz32pz4vwrmh93tvsyswth2sf",
        exponent: 6
      }
    ],
    base: "udelegation_penumbravalid1jf8tmgqaar2xdrhspmmuwyd6jt6hedjh0gz32pz4vwrmh93tvsyswth2sf",
    display: "delegation_penumbravalid1jf8tmgqaar2xdrhspmmuwyd6jt6hedjh0gz32pz4vwrmh93tvsyswth2sf",
    symbol: "delUM(MathNodes)",
    penumbraAssetId: {
      inner: "udb9fOKZIdHZBrzj+7ks+LnGKY/jvMvHFAU1fMFl/Ao="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/penumbrafi/registry/main/images/validators/penumbravalid1jf8tmgqaar2xdrhspmmuwyd6jt6hedjh0gz32pz4vwrmh93tvsyswth2sf.png",
        theme: {
          primaryColorHex: "#c0c0c0"
        }
      }
    ]
  },
  "v4sDXdozm2zajyIeeXc7D9hx8npHKSD4TEqitPmKcA0=": {
    description: "An alloy of USDT asset variants on Osmosis.",
    denomUnits: [
      {
        denom: "transfer/channel-4/factory/osmo1em6xs47hd82806f5cxgyufguxrrc7l0aqx7nzzptjuqgswczk8csavdxek/alloyed/allUSDT"
      },
      {
        denom: "transfer/channel-4/allUSDT",
        exponent: 6
      }
    ],
    base: "transfer/channel-4/factory/osmo1em6xs47hd82806f5cxgyufguxrrc7l0aqx7nzzptjuqgswczk8csavdxek/alloyed/allUSDT",
    display: "transfer/channel-4/allUSDT",
    name: "Tether USD",
    symbol: "allUSDT.ch4",
    penumbraAssetId: {
      inner: "v4sDXdozm2zajyIeeXc7D9hx8npHKSD4TEqitPmKcA0="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/ethereum/images/usdt.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/ethereum/images/usdt.svg",
        theme: {
          primaryColorHex: "#049393"
        }
      },
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/ethereum/images/usdt_logomark.png",
        theme: {
          primaryColorHex: "#53ac94"
        }
      }
    ],
    priorityScore: "7000000000",
    coingeckoId: "osmosis-allusdt"
  },
  "vSCVmtndzw2C2RYuB2vcKWfkPVZRCP9GNN8MwB6QUAU=": {
    description: "Cosmus Cartol always get rich",
    denomUnits: [
      {
        denom: "transfer/channel-4/factory/osmo1q77cw0mmlluxu0wr29fcdd0tdnh78gzhkvhe4n6ulal9qvrtu43qtd0nh8/coca"
      },
      {
        denom: "transfer/channel-4/COCA",
        exponent: 6
      }
    ],
    base: "transfer/channel-4/factory/osmo1q77cw0mmlluxu0wr29fcdd0tdnh78gzhkvhe4n6ulal9qvrtu43qtd0nh8/coca",
    display: "transfer/channel-4/COCA",
    name: "CosmusCartol",
    symbol: "COCA.ch4",
    penumbraAssetId: {
      inner: "vSCVmtndzw2C2RYuB2vcKWfkPVZRCP9GNN8MwB6QUAU="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/COCA.png",
        theme: {
          primaryColorHex: "#dfc7ba"
        }
      }
    ]
  },
  "veEt/mKr1XWzRv9qwEs3MxXA+ffzZgbRRLVk0kiW/QE=": {
    description: "Sssshhh…",
    denomUnits: [
      {
        denom: "transfer/channel-20/factory/osmo1q77cw0mmlluxu0wr29fcdd0tdnh78gzhkvhe4n6ulal9qvrtu43qtd0nh8/bomu"
      },
      {
        denom: "transfer/channel-20/BOMU",
        exponent: 6
      }
    ],
    base: "transfer/channel-20/factory/osmo1q77cw0mmlluxu0wr29fcdd0tdnh78gzhkvhe4n6ulal9qvrtu43qtd0nh8/bomu",
    display: "transfer/channel-20/BOMU",
    name: "$bomu",
    symbol: "BOMU",
    penumbraAssetId: {
      inner: "veEt/mKr1XWzRv9qwEs3MxXA+ffzZgbRRLVk0kiW/QE="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/bomu.png",
        theme: {
          primaryColorHex: "#e54437"
        }
      }
    ]
  },
  "vix6AUI9f1duSX5DgLPAXD7Jluqu6UPOJ7BoRHzGDQo=": {
    description: "Nether (NTHR) is the utility token of the Underworld NFT ecosystem, issued via tokenfactory on the Cosmos Hub. NTHR powers the NecroVault, a soft-staking platform where holders of Underworld collections earn rewards while keeping their NFTs in their wallets. Fixed supply: 21,000.",
    denomUnits: [
      {
        denom: "transfer/channel-0/factory/cosmos1wdja2gcsesyl07raq9jm3rcvu0sse5zkev0h8m/Nether"
      },
      {
        denom: "transfer/channel-0/nthr",
        exponent: 6
      }
    ],
    base: "transfer/channel-0/factory/cosmos1wdja2gcsesyl07raq9jm3rcvu0sse5zkev0h8m/Nether",
    display: "transfer/channel-0/nthr",
    name: "Nether",
    symbol: "NTHR.ch0",
    penumbraAssetId: {
      inner: "vix6AUI9f1duSX5DgLPAXD7Jluqu6UPOJ7BoRHzGDQo="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/cosmoshub/images/nthr.png",
        theme: {
          primaryColorHex: "#bd85d4"
        }
      }
    ]
  },
  "w/XFvxel/TroZYPNEY4i9OdesQvFjJFgnURmnpNHhwM=": {
    description: "Bonded GopLend USDC",
    denomUnits: [
      {
        denom: "transfer/channel-9/factory/neutron16ue9kysgneyqktmjxdfshajgvlrcx9rehxz8x9th7g8fgtnlxwuqvg9mgp/bglUSDC"
      },
      {
        denom: "transfer/channel-9/bglUSDC",
        exponent: 6
      }
    ],
    base: "transfer/channel-9/factory/neutron16ue9kysgneyqktmjxdfshajgvlrcx9rehxz8x9th7g8fgtnlxwuqvg9mgp/bglUSDC",
    display: "transfer/channel-9/bglUSDC",
    name: "bglUSDC",
    symbol: "bglUSDC",
    penumbraAssetId: {
      inner: "w/XFvxel/TroZYPNEY4i9OdesQvFjJFgnURmnpNHhwM="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/neutron/images/bglUSDC.png",
        theme: {
          primaryColorHex: "#3aa6e0"
        }
      }
    ]
  },
  "w4O3mziGXG7TuIupoybfMBMMlXj4jFNGKXyHl5cQtQE=": {
    description: "Tether's USD stablecoin on Axelar",
    denomUnits: [
      {
        denom: "transfer/channel-7/uusdt"
      },
      {
        denom: "transfer/channel-7/usdt",
        exponent: 6
      }
    ],
    base: "transfer/channel-7/uusdt",
    display: "transfer/channel-7/usdt",
    name: "Tether USD",
    symbol: "axlUSDT",
    penumbraAssetId: {
      inner: "w4O3mziGXG7TuIupoybfMBMMlXj4jFNGKXyHl5cQtQE="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/ethereum/images/usdt.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/ethereum/images/usdt.svg",
        theme: {
          primaryColorHex: "#049393"
        }
      }
    ],
    coingeckoId: "axelar-usdt"
  },
  "w5681cktB4+4eGef8ADtZ8fQSlt3IuLI7BtueUwVOg0=": {
    description: "A synthetic version of USDT issued by Router, which can be unwrapped to USDT on several chains.",
    denomUnits: [
      {
        denom: "transfer/channel-4/factory/osmo1myv2g72h8dan7n4hx7stt3mmust6ws03zh6gxc7vz4hpmgp5z3lq9aunm9/USDT.rt"
      },
      {
        denom: "transfer/channel-4/usdt",
        exponent: 6
      }
    ],
    base: "transfer/channel-4/factory/osmo1myv2g72h8dan7n4hx7stt3mmust6ws03zh6gxc7vz4hpmgp5z3lq9aunm9/USDT.rt",
    display: "transfer/channel-4/usdt",
    name: "Tether USD (Ethereum via Router)",
    symbol: "USDT.eth.rt.ch4",
    penumbraAssetId: {
      inner: "w5681cktB4+4eGef8ADtZ8fQSlt3IuLI7BtueUwVOg0="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/ethereum/images/usdt.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/ethereum/images/usdt.svg",
        theme: {
          primaryColorHex: "#049393"
        }
      }
    ]
  },
  "wK3qqrXW4tv5VvO2fyhpuzhKR2i1E9X7dFFm1qlXMwY=": {
    description: "The Representative factory token for Trump Kemistry",
    denomUnits: [
      {
        denom: "transfer/channel-4/factory/osmo1hg0zf0c9can4tvtulh5gmmxe4jpflre3yewxjl/XTRUMP"
      },
      {
        denom: "transfer/channel-4/XTRUMP",
        exponent: 6
      }
    ],
    base: "transfer/channel-4/factory/osmo1hg0zf0c9can4tvtulh5gmmxe4jpflre3yewxjl/XTRUMP",
    display: "transfer/channel-4/XTRUMP",
    name: "XTRUMP",
    symbol: "XTRUMP.ch4",
    penumbraAssetId: {
      inner: "wK3qqrXW4tv5VvO2fyhpuzhKR2i1E9X7dFFm1qlXMwY="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/XTRUMP.png",
        theme: {
          primaryColorHex: "#e6b87d"
        }
      }
    ]
  },
  "wvdhZWgNarKHAJit1ikuBeR7nQB7x83rgf6vYYBHdg4=": {
    description: "An alloy of ETH asset variants on Osmosis.",
    denomUnits: [
      {
        denom: "transfer/channel-4/factory/osmo1k6c8jln7ejuqwtqmay3yvzrg3kueaczl96pk067ldg8u835w0yhsw27twm/alloyed/allETH"
      },
      {
        denom: "transfer/channel-4/allETH",
        exponent: 18
      }
    ],
    base: "transfer/channel-4/factory/osmo1k6c8jln7ejuqwtqmay3yvzrg3kueaczl96pk067ldg8u835w0yhsw27twm/alloyed/allETH",
    display: "transfer/channel-4/allETH",
    name: "Ethereum",
    symbol: "allETH.ch4",
    penumbraAssetId: {
      inner: "wvdhZWgNarKHAJit1ikuBeR7nQB7x83rgf6vYYBHdg4="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/ethereum/images/eth-white.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/ethereum/images/eth-white.svg",
        theme: {
          primaryColorHex: "#8c8c8c"
        }
      }
    ],
    priorityScore: "6000000000",
    coingeckoId: "osmosis-alleth"
  },
  "xNdg/Pc2CvrtawUX41EBLTlgj83RTenRJaBFXxsSTwk=": {
    description: "ION is the second native token of Osmosis.",
    denomUnits: [
      {
        denom: "transfer/channel-4/uion"
      },
      {
        denom: "transfer/channel-4/ion",
        exponent: 6
      }
    ],
    base: "transfer/channel-4/uion",
    display: "transfer/channel-4/ion",
    name: "Ion DAO",
    symbol: "ION.ch4",
    penumbraAssetId: {
      inner: "xNdg/Pc2CvrtawUX41EBLTlgj83RTenRJaBFXxsSTwk="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/ion.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/ion.svg",
        theme: {
          primaryColorHex: "#90cfde"
        }
      }
    ],
    coingeckoId: "ion"
  },
  "xcKXD4CC9tGBVZo5wt/hDhkzW4X9N7roReQERRaK4gs=": {
    denomUnits: [
      {
        denom: "udelegation_penumbravalid1he9sez9r2yzc8dekh5w7vqqz6r5c557s8jjchmu3879e9lzn4g9q57k04c"
      },
      {
        denom: "mdelegation_penumbravalid1he9sez9r2yzc8dekh5w7vqqz6r5c557s8jjchmu3879e9lzn4g9q57k04c",
        exponent: 3
      },
      {
        denom: "delegation_penumbravalid1he9sez9r2yzc8dekh5w7vqqz6r5c557s8jjchmu3879e9lzn4g9q57k04c",
        exponent: 6
      }
    ],
    base: "udelegation_penumbravalid1he9sez9r2yzc8dekh5w7vqqz6r5c557s8jjchmu3879e9lzn4g9q57k04c",
    display: "delegation_penumbravalid1he9sez9r2yzc8dekh5w7vqqz6r5c557s8jjchmu3879e9lzn4g9q57k04c",
    symbol: "delUM(OriginStake)",
    penumbraAssetId: {
      inner: "xcKXD4CC9tGBVZo5wt/hDhkzW4X9N7roReQERRaK4gs="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/penumbrafi/registry/main/images/validators/penumbravalid1he9sez9r2yzc8dekh5w7vqqz6r5c557s8jjchmu3879e9lzn4g9q57k04c.png",
        theme: {
          primaryColorHex: "#046cfc"
        }
      }
    ]
  },
  "xiQRY+bbf/knL8LkZc7sv0/uvMNdZwdiuReCN/3YkQM=": {
    description: "$ATOM to $1,000 LFG!!",
    denomUnits: [
      {
        denom: "transfer/channel-9/factory/neutron13lkh47msw28yynspc5rnmty3yktk43wc3dsv0l/ATOM1KLFG"
      },
      {
        denom: "transfer/channel-9/ATOM1KLFG",
        exponent: 6
      }
    ],
    base: "transfer/channel-9/factory/neutron13lkh47msw28yynspc5rnmty3yktk43wc3dsv0l/ATOM1KLFG",
    display: "transfer/channel-9/ATOM1KLFG",
    name: "ATOM1KLFG",
    symbol: "ATOM1KLFG",
    penumbraAssetId: {
      inner: "xiQRY+bbf/knL8LkZc7sv0/uvMNdZwdiuReCN/3YkQM="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/neutron/images/ATOM1KLFGc.png",
        theme: {
          primaryColorHex: "#e3a018"
        }
      }
    ]
  },
  "xy0xRYKFo60GIeEPiDeM5e4sk6gSjxx+WBWhVTBCBwE=": {
    description: "eBABY – Escher’s chain-abstracted liquid-staking token for BABY",
    denomUnits: [
      {
        denom: "transfer/channel-20/factory/osmo12r3yc76u9lxe33yemstatnw8602culdjzrtr8lmnpycmd3z7d4jsxx60kc/FwNhFaW3zLxoLUgXCdWjqBzcvGNPaB7B2XZqm2xgrB93"
      },
      {
        denom: "transfer/channel-20/ebaby",
        exponent: 6
      }
    ],
    base: "transfer/channel-20/factory/osmo12r3yc76u9lxe33yemstatnw8602culdjzrtr8lmnpycmd3z7d4jsxx60kc/FwNhFaW3zLxoLUgXCdWjqBzcvGNPaB7B2XZqm2xgrB93",
    display: "transfer/channel-20/ebaby",
    name: "eBABY",
    symbol: "EBABY",
    penumbraAssetId: {
      inner: "xy0xRYKFo60GIeEPiDeM5e4sk6gSjxx+WBWhVTBCBwE="
    },
    images: [
      {
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/babylon/images/eBABY.svg",
        theme: {
          primaryColorHex: "#040cfb"
        }
      }
    ]
  },
  "zA08nu8Mf/TiJeyoWjCUYDaR0omur0KKsNhzGa2TowI=": {
    description: "Ondo US Dollar Yield",
    denomUnits: [
      {
        denom: "transfer/channel-2/ausdy"
      },
      {
        denom: "transfer/channel-2/usdy",
        exponent: 18
      }
    ],
    base: "transfer/channel-2/ausdy",
    display: "transfer/channel-2/usdy",
    name: "Ondo US Dollar Yield",
    symbol: "USDY",
    penumbraAssetId: {
      inner: "zA08nu8Mf/TiJeyoWjCUYDaR0omur0KKsNhzGa2TowI="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/noble/images/usdy.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/noble/images/usdy.svg",
        theme: {
          primaryColorHex: "#142b5b"
        }
      }
    ],
    priorityScore: "800000000095",
    coingeckoId: "ondo-us-dollar-yield"
  },
  "zC+ORf7HacuaeqpExaDI99HNPPuJHQ7I9UNYjmC37gk=": {
    description: "Astro BOY",
    denomUnits: [
      {
        denom: "transfer/channel-9/neutron1uqvse8fdrd9tam47f2jhy9m6al6xxtqpc83f9pdnz5gdle4swc0spfnctv"
      },
      {
        denom: "transfer/channel-9/boy",
        exponent: 6
      }
    ],
    base: "transfer/channel-9/neutron1uqvse8fdrd9tam47f2jhy9m6al6xxtqpc83f9pdnz5gdle4swc0spfnctv",
    display: "transfer/channel-9/boy",
    name: "boy",
    symbol: "BOY",
    penumbraAssetId: {
      inner: "zC+ORf7HacuaeqpExaDI99HNPPuJHQ7I9UNYjmC37gk="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/neutron/images/boy.png",
        theme: {
          primaryColorHex: "#f4d1ad"
        }
      }
    ]
  },
  "za/OmxtGVAwvXWiizJSHIjT/PBzQ6Xh2lXtBbMv8UxE=": {
    description: "Banana Vault Token - Banana Beach (🍹,🌴) II",
    denomUnits: [
      {
        denom: "transfer/channel-4/factory/osmo16nxtnrnl7lctvnhhpcxqmmpv63n93zgg0ukaveyc0jl4dtad79cs53c3an/BVT"
      },
      {
        denom: "transfer/channel-4/BVT1",
        exponent: 18
      }
    ],
    base: "transfer/channel-4/factory/osmo16nxtnrnl7lctvnhhpcxqmmpv63n93zgg0ukaveyc0jl4dtad79cs53c3an/BVT",
    display: "transfer/channel-4/BVT1",
    name: "Banana Beach",
    symbol: "BVT1.ch4",
    penumbraAssetId: {
      inner: "za/OmxtGVAwvXWiizJSHIjT/PBzQ6Xh2lXtBbMv8UxE="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/BVT1.png",
        theme: {
          primaryColorHex: "#e9edbe"
        }
      }
    ]
  },
  "zo9hSeCHwNTMLMhULQ63mquVWDOdYTqvV7V8v4rmgA0=": {
    description: "A receipt token for lent WETH issued by the Neptune Protocol.",
    denomUnits: [
      {
        denom: "transfer/channel-18/inj1kehk5nvreklhylx22p3x0yjydfsz9fv3fvg5xt"
      },
      {
        denom: "transfer/channel-18/nWETH",
        exponent: 18
      }
    ],
    base: "transfer/channel-18/inj1kehk5nvreklhylx22p3x0yjydfsz9fv3fvg5xt",
    display: "transfer/channel-18/nWETH",
    name: "Neptune Receipt WETH",
    symbol: "nWETH",
    penumbraAssetId: {
      inner: "zo9hSeCHwNTMLMhULQ63mquVWDOdYTqvV7V8v4rmgA0="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/injective/images/nweth.png",
        theme: {
          primaryColorHex: "#9aa1ad"
        }
      }
    ]
  }
}, yn = [
  "16ztCNRCyQZYu3cNN7DNMevUt0v2pERpUBflNfwP+wc=",
  "drPksQaBNYwSOzgfkGOEdrd4kEDkeALeh58Ps+7cjQs="
], Bs = {
  chainId: pn,
  ibcConnections: un,
  assetById: fn,
  numeraires: yn
}, Es = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  assetById: fn,
  chainId: pn,
  default: Bs,
  ibcConnections: un,
  numeraires: yn
}, Symbol.toStringTag, { value: "Module" })), bn = "penumbra-testnet-phobos-1", wn = [
  {
    addressPrefix: "osmo",
    chainId: "osmo-test-5",
    channelId: "channel-0",
    counterpartyChannelId: "channel-8660",
    displayName: "Osmosis",
    images: [
      {
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/f1348793beb994c6cc0256ed7ebdb48c7aa70003/osmosis/images/osmo.svg"
      }
    ]
  },
  {
    addressPrefix: "noble",
    chainId: "grand-1",
    channelId: "channel-1",
    counterpartyChannelId: "channel-202",
    displayName: "Noble",
    images: [
      {
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/2ca39d0e4eaf3431cca13991948e099801f02e46/noble/images/stake.svg"
      }
    ]
  }
], xn = {
  "+9bJC2eD0enk2+gBQwoKL21f5YvmA2EHQFk8O0ZrFwY=": {
    denomUnits: [
      {
        denom: "udelegation_penumbravalid1zs08uufzz0an35lmr0lm9dhk5z3vn0np7l827q0fjllx0yu2yvqqsj9ta3"
      },
      {
        denom: "mdelegation_penumbravalid1zs08uufzz0an35lmr0lm9dhk5z3vn0np7l827q0fjllx0yu2yvqqsj9ta3",
        exponent: 3
      },
      {
        denom: "delegation_penumbravalid1zs08uufzz0an35lmr0lm9dhk5z3vn0np7l827q0fjllx0yu2yvqqsj9ta3",
        exponent: 6
      }
    ],
    base: "udelegation_penumbravalid1zs08uufzz0an35lmr0lm9dhk5z3vn0np7l827q0fjllx0yu2yvqqsj9ta3",
    display: "delegation_penumbravalid1zs08uufzz0an35lmr0lm9dhk5z3vn0np7l827q0fjllx0yu2yvqqsj9ta3",
    symbol: "delUM(Penumbra Labs CI 1)",
    penumbraAssetId: {
      inner: "+9bJC2eD0enk2+gBQwoKL21f5YvmA2EHQFk8O0ZrFwY="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/penumbrafi/registry/main/images/penumbra-favicon.png",
        theme: {
          primaryColorHex: "#1d1e1d"
        }
      }
    ]
  },
  "6KBVsPINa8gWSHhfH+kAFJC4afEJA3EtuB2HyCqJUws=": {
    denomUnits: [
      {
        denom: "cube"
      }
    ],
    base: "cube",
    display: "cube",
    symbol: "CUBE",
    penumbraAssetId: {
      inner: "6KBVsPINa8gWSHhfH+kAFJC4afEJA3EtuB2HyCqJUws="
    }
  },
  "HLkKbVfA72oQaMdYFroWQ1qoSyl/KLHZiOMJhL2y9w0=": {
    denomUnits: [
      {
        denom: "test_eth",
        exponent: 18
      },
      {
        denom: "wtest_eth"
      }
    ],
    base: "wtest_eth",
    display: "test_eth",
    symbol: "TestETH",
    penumbraAssetId: {
      inner: "HLkKbVfA72oQaMdYFroWQ1qoSyl/KLHZiOMJhL2y9w0="
    }
  },
  "HW2Eq3UZVSBttoUwUi/MUtE7rr2UU7/UH500byp7OAc=": {
    denomUnits: [
      {
        denom: "gm",
        exponent: 6
      },
      {
        denom: "mgm",
        exponent: 3
      },
      {
        denom: "ugm"
      }
    ],
    base: "ugm",
    display: "gm",
    symbol: "GM",
    penumbraAssetId: {
      inner: "HW2Eq3UZVSBttoUwUi/MUtE7rr2UU7/UH500byp7OAc="
    },
    images: [
      {
        svg: "https://raw.githubusercontent.com/penumbrafi/registry/main/images/full-moon-face.svg",
        theme: {
          primaryColorHex: "#ac9454"
        }
      }
    ]
  },
  "J0fi/vGPSy8XmGGzU+rtpPxHirechCzuPf23cnZ5FgA=": {
    description: "USD Coin",
    denomUnits: [
      {
        denom: "transfer/channel-1/uusdc"
      },
      {
        denom: "transfer/channel-1/usdc",
        exponent: 6
      }
    ],
    base: "transfer/channel-1/uusdc",
    display: "transfer/channel-1/usdc",
    name: "USD Coin",
    symbol: "USDC.n",
    penumbraAssetId: {
      inner: "J0fi/vGPSy8XmGGzU+rtpPxHirechCzuPf23cnZ5FgA="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/ethereum/images/usdc.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/ethereum/images/usdc.svg",
        theme: {
          primaryColorHex: "#2474cb"
        }
      }
    ],
    coingeckoId: "usd-coin"
  },
  "KX8cjRGFpZUkZCwCtUX8Pi2lEyO5g0oPVr8WhsLgkwg=": {
    denomUnits: [
      {
        denom: "transfer/channel-0/uion"
      },
      {
        denom: "transfer/channel-0/ion",
        exponent: 6
      }
    ],
    base: "transfer/channel-0/uion",
    display: "transfer/channel-0/ion",
    name: "Ion",
    symbol: "ION",
    penumbraAssetId: {
      inner: "KX8cjRGFpZUkZCwCtUX8Pi2lEyO5g0oPVr8WhsLgkwg="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/ion.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/ion.svg",
        theme: {
          primaryColorHex: "#90cfde"
        }
      }
    ],
    coingeckoId: "ion"
  },
  "KeqcLzNx9qSH5+lcJHBB9KNW+YPrBk5dKzvPMiypahA=": {
    description: "The native token of Penumbra",
    denomUnits: [
      {
        denom: "penumbra",
        exponent: 6
      },
      {
        denom: "mpenumbra",
        exponent: 3
      },
      {
        denom: "upenumbra"
      }
    ],
    base: "upenumbra",
    display: "penumbra",
    name: "Penumbra",
    symbol: "UM",
    penumbraAssetId: {
      inner: "KeqcLzNx9qSH5+lcJHBB9KNW+YPrBk5dKzvPMiypahA="
    },
    images: [
      {
        svg: "https://raw.githubusercontent.com/penumbrafi/registry/main/images/um.svg",
        theme: {
          primaryColorHex: "#c9a975"
        }
      }
    ]
  },
  "VvnzHX2uGYbOLAf4etff37yf1EQAS/8RzdAS63FZuwI=": {
    description: "Love is a test tokenfactory asset controlled by the Strangelove Team",
    denomUnits: [
      {
        denom: "transfer/channel-1/ulove"
      },
      {
        denom: "transfer/channel-1/love",
        exponent: 6
      }
    ],
    base: "transfer/channel-1/ulove",
    display: "transfer/channel-1/love",
    name: "Love",
    symbol: "LOVE",
    penumbraAssetId: {
      inner: "VvnzHX2uGYbOLAf4etff37yf1EQAS/8RzdAS63FZuwI="
    }
  },
  "g128RUoEK9S9qg/E26hO/HqfS1x+alzMmC1TN7e9fgk=": {
    description: "The controlled staking asset for Noble Chain",
    denomUnits: [
      {
        denom: "transfer/channel-1/ustake"
      },
      {
        denom: "transfer/channel-1/stake",
        exponent: 6
      }
    ],
    base: "transfer/channel-1/ustake",
    display: "transfer/channel-1/stake",
    name: "Stake",
    symbol: "STAKE",
    penumbraAssetId: {
      inner: "g128RUoEK9S9qg/E26hO/HqfS1x+alzMmC1TN7e9fgk="
    }
  },
  "j0fAr5g+SxQguIafcYD1ifc+q9jE2m2dZ+u6YrsPdAU=": {
    description: "Ondo US Dollar Yield",
    denomUnits: [
      {
        denom: "transfer/channel-1/ausdy"
      },
      {
        denom: "transfer/channel-1/usdy",
        exponent: 18
      }
    ],
    base: "transfer/channel-1/ausdy",
    display: "transfer/channel-1/usdy",
    name: "Ondo US Dollar Yield",
    symbol: "USDY",
    penumbraAssetId: {
      inner: "j0fAr5g+SxQguIafcYD1ifc+q9jE2m2dZ+u6YrsPdAU="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/testnets/nobletestnet/images/usdy.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/testnets/nobletestnet/images/usdy.svg",
        theme: {
          primaryColorHex: "#142b5b"
        }
      }
    ]
  },
  "jIowYEpoMr+LQYqjDVEnQO6hyzb9raVxbO1GLyDxlhI=": {
    description: "The native token of Osmosis",
    denomUnits: [
      {
        denom: "transfer/channel-0/uosmo"
      },
      {
        denom: "transfer/channel-0/osmo",
        exponent: 6
      }
    ],
    base: "transfer/channel-0/uosmo",
    display: "transfer/channel-0/osmo",
    name: "Osmosis Testnet",
    symbol: "OSMO",
    penumbraAssetId: {
      inner: "jIowYEpoMr+LQYqjDVEnQO6hyzb9raVxbO1GLyDxlhI="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/osmo.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/osmo.svg",
        theme: {
          primaryColorHex: "#6b0db7"
        }
      }
    ],
    coingeckoId: "osmosis"
  },
  "nDjzm+ldIrNMJha1anGMDVxpA5cLCPnUYQ1clmHF1gw=": {
    denomUnits: [
      {
        denom: "pizza"
      }
    ],
    base: "pizza",
    display: "pizza",
    symbol: "PIZZA",
    penumbraAssetId: {
      inner: "nDjzm+ldIrNMJha1anGMDVxpA5cLCPnUYQ1clmHF1gw="
    },
    images: [
      {
        svg: "https://raw.githubusercontent.com/penumbrafi/registry/main/images/pizza.svg",
        theme: {
          primaryColorHex: "#ab1221"
        }
      }
    ]
  },
  "nwPDkQq3OvLnBwGTD+nmv1Ifb2GEmFCgNHrU++9BsRE=": {
    denomUnits: [
      {
        denom: "gn",
        exponent: 6
      },
      {
        denom: "mgn",
        exponent: 3
      },
      {
        denom: "ugn"
      }
    ],
    base: "ugn",
    display: "gn",
    symbol: "GN",
    penumbraAssetId: {
      inner: "nwPDkQq3OvLnBwGTD+nmv1Ifb2GEmFCgNHrU++9BsRE="
    },
    images: [
      {
        svg: "https://raw.githubusercontent.com/penumbrafi/registry/main/images/new-moon-face.svg",
        theme: {
          primaryColorHex: "#546068"
        }
      }
    ]
  },
  "o2gZdbhCH70Ry+7iBhkSeHC/PB1LZhgkn7LHC2kEhQc=": {
    denomUnits: [
      {
        denom: "test_btc",
        exponent: 8
      },
      {
        denom: "test_sat"
      }
    ],
    base: "test_sat",
    display: "test_btc",
    symbol: "TestBTC",
    penumbraAssetId: {
      inner: "o2gZdbhCH70Ry+7iBhkSeHC/PB1LZhgkn7LHC2kEhQc="
    }
  },
  "pmpygqUf4DL+z849rGPpudpdK/+FAv8qQ01U2C73kAw=": {
    denomUnits: [
      {
        denom: "test_osmo",
        exponent: 6
      },
      {
        denom: "mtest_osmo",
        exponent: 3
      },
      {
        denom: "utest_osmo"
      }
    ],
    base: "utest_osmo",
    display: "test_osmo",
    symbol: "TestOSMO",
    penumbraAssetId: {
      inner: "pmpygqUf4DL+z849rGPpudpdK/+FAv8qQ01U2C73kAw="
    }
  },
  "ra98J77CX10Us2s6+d7bebfpm1Q3+UOycPfaaEeeuAY=": {
    denomUnits: [
      {
        denom: "transfer/channel-0/factory/osmo1zlkzu72774ynac53necz46u4ycqtp36wedrar0/willyz"
      },
      {
        denom: "transfer/channel-0/willyz",
        exponent: 6
      }
    ],
    base: "transfer/channel-0/factory/osmo1zlkzu72774ynac53necz46u4ycqtp36wedrar0/willyz",
    display: "transfer/channel-0/willyz",
    name: "Willyz",
    symbol: "WILLYZ",
    penumbraAssetId: {
      inner: "ra98J77CX10Us2s6+d7bebfpm1Q3+UOycPfaaEeeuAY="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/testnets/osmosistestnet/images/willyz.png",
        theme: {
          primaryColorHex: "#e4bc82"
        }
      }
    ]
  },
  "reum7wQmk/owgvGMWMZn/6RFPV24zIKq3W6In/WwZgg=": {
    denomUnits: [
      {
        denom: "test_usd",
        exponent: 18
      },
      {
        denom: "wtest_usd"
      }
    ],
    base: "wtest_usd",
    display: "test_usd",
    symbol: "TestUSD",
    penumbraAssetId: {
      inner: "reum7wQmk/owgvGMWMZn/6RFPV24zIKq3W6In/WwZgg="
    },
    images: [
      {
        svg: "https://raw.githubusercontent.com/penumbrafi/registry/main/images/test-usd.svg",
        theme: {
          primaryColorHex: "#14833b"
        }
      }
    ]
  },
  "ypUT1AOtjfwMOKMATACoD9RSvi8jY/YnYGi46CZ/6Q8=": {
    denomUnits: [
      {
        denom: "test_atom",
        exponent: 6
      },
      {
        denom: "mtest_atom",
        exponent: 3
      },
      {
        denom: "utest_atom"
      }
    ],
    base: "utest_atom",
    display: "test_atom",
    symbol: "TestATOM",
    penumbraAssetId: {
      inner: "ypUT1AOtjfwMOKMATACoD9RSvi8jY/YnYGi46CZ/6Q8="
    }
  }
}, vn = [
  "reum7wQmk/owgvGMWMZn/6RFPV24zIKq3W6In/WwZgg=",
  "J0fi/vGPSy8XmGGzU+rtpPxHirechCzuPf23cnZ5FgA="
], Ds = {
  chainId: bn,
  ibcConnections: wn,
  assetById: xn,
  numeraires: vn
}, Ms = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  assetById: xn,
  chainId: bn,
  default: Ds,
  ibcConnections: wn,
  numeraires: vn
}, Symbol.toStringTag, { value: "Module" })), kn = "penumbra-testnet-phobos-2", qn = [
  {
    addressPrefix: "osmo",
    chainId: "osmo-test-5",
    channelId: "channel-34",
    counterpartyChannelId: "channel-10070",
    displayName: "Osmosis",
    images: [
      {
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/f1348793beb994c6cc0256ed7ebdb48c7aa70003/osmosis/images/osmo.svg"
      }
    ]
  },
  {
    addressPrefix: "noble",
    chainId: "grand-1",
    channelId: "channel-37",
    counterpartyChannelId: "channel-313",
    displayName: "Noble",
    images: [
      {
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/2ca39d0e4eaf3431cca13991948e099801f02e46/noble/images/stake.svg"
      }
    ]
  },
  {
    addressPrefix: "noble",
    chainId: "duke-1",
    channelId: "channel-26",
    counterpartyChannelId: "channel-8",
    displayName: "Duke",
    images: [
      {}
    ]
  }
], An = {
  "/DEKwGJvF1Y64y4yvAXOpQWcRICh9fDvfGeaouK5jg4=": {
    description: "USD Coin",
    denomUnits: [
      {
        denom: "transfer/channel-37/uusdc"
      },
      {
        denom: "transfer/channel-37/usdc",
        exponent: 6
      }
    ],
    base: "transfer/channel-37/uusdc",
    display: "transfer/channel-37/usdc",
    name: "USD Coin",
    symbol: "USDC.n",
    penumbraAssetId: {
      inner: "/DEKwGJvF1Y64y4yvAXOpQWcRICh9fDvfGeaouK5jg4="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/ethereum/images/usdc.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/ethereum/images/usdc.svg",
        theme: {
          primaryColorHex: "#2474cb"
        }
      }
    ],
    coingeckoId: "usd-coin"
  },
  "3ErXVnp08wv5lSOfwIi2MjWSTKUa7NQI94Rvh3ua1gU=": {
    denomUnits: [
      {
        denom: "udelegation_penumbravalid17mpua4areft935urde60aygd6zf88lzg0rs8g4gnknxllcyppczs57979z"
      },
      {
        denom: "mdelegation_penumbravalid17mpua4areft935urde60aygd6zf88lzg0rs8g4gnknxllcyppczs57979z",
        exponent: 3
      },
      {
        denom: "delegation_penumbravalid17mpua4areft935urde60aygd6zf88lzg0rs8g4gnknxllcyppczs57979z",
        exponent: 6
      }
    ],
    base: "udelegation_penumbravalid17mpua4areft935urde60aygd6zf88lzg0rs8g4gnknxllcyppczs57979z",
    display: "delegation_penumbravalid17mpua4areft935urde60aygd6zf88lzg0rs8g4gnknxllcyppczs57979z",
    symbol: "delUM(Penumbra Labs CI 1)",
    penumbraAssetId: {
      inner: "3ErXVnp08wv5lSOfwIi2MjWSTKUa7NQI94Rvh3ua1gU="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/penumbrafi/registry/main/images/penumbra-favicon.png",
        theme: {
          primaryColorHex: "#1d1e1d"
        }
      }
    ]
  },
  "45ebKrg3UZ1ax8TH8aNKA+kgZF7KlUhi+FSPyz2V3A4=": {
    description: "Ondo US Dollar Yield",
    denomUnits: [
      {
        denom: "transfer/channel-37/ausdy"
      },
      {
        denom: "transfer/channel-37/usdy",
        exponent: 18
      }
    ],
    base: "transfer/channel-37/ausdy",
    display: "transfer/channel-37/usdy",
    name: "Ondo US Dollar Yield",
    symbol: "USDY",
    penumbraAssetId: {
      inner: "45ebKrg3UZ1ax8TH8aNKA+kgZF7KlUhi+FSPyz2V3A4="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/testnets/nobletestnet/images/usdy.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/testnets/nobletestnet/images/usdy.svg",
        theme: {
          primaryColorHex: "#142b5b"
        }
      }
    ]
  },
  "6KBVsPINa8gWSHhfH+kAFJC4afEJA3EtuB2HyCqJUws=": {
    denomUnits: [
      {
        denom: "cube"
      }
    ],
    base: "cube",
    display: "cube",
    symbol: "CUBE",
    penumbraAssetId: {
      inner: "6KBVsPINa8gWSHhfH+kAFJC4afEJA3EtuB2HyCqJUws="
    }
  },
  "7uMQrRBpSmITdxfs5FKsMxmV0VsDoD21y9Ao5nDQlQ0=": {
    description: "The native token of Osmosis",
    denomUnits: [
      {
        denom: "transfer/channel-34/uosmo"
      },
      {
        denom: "transfer/channel-34/osmo",
        exponent: 6
      }
    ],
    base: "transfer/channel-34/uosmo",
    display: "transfer/channel-34/osmo",
    name: "Osmosis Testnet",
    symbol: "OSMO",
    penumbraAssetId: {
      inner: "7uMQrRBpSmITdxfs5FKsMxmV0VsDoD21y9Ao5nDQlQ0="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/osmo.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/osmo.svg",
        theme: {
          primaryColorHex: "#6b0db7"
        }
      }
    ],
    coingeckoId: "osmosis"
  },
  "Dfd6xgFCU9AKO1Ik+GHhunVNRSAApSrASdOUJIIWgA0=": {
    description: "Ondo US Dollar Yield",
    denomUnits: [
      {
        denom: "transfer/channel-26/ausdy"
      },
      {
        denom: "transfer/channel-26/usdy",
        exponent: 18
      }
    ],
    base: "transfer/channel-26/ausdy",
    display: "transfer/channel-26/usdy",
    name: "Ondo US Dollar Yield",
    symbol: "USDY.duke",
    penumbraAssetId: {
      inner: "Dfd6xgFCU9AKO1Ik+GHhunVNRSAApSrASdOUJIIWgA0="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/testnets/nobletestnet/images/usdy.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/testnets/nobletestnet/images/usdy.svg",
        theme: {
          primaryColorHex: "#142b5b"
        }
      }
    ]
  },
  "HLkKbVfA72oQaMdYFroWQ1qoSyl/KLHZiOMJhL2y9w0=": {
    denomUnits: [
      {
        denom: "test_eth",
        exponent: 18
      },
      {
        denom: "wtest_eth"
      }
    ],
    base: "wtest_eth",
    display: "test_eth",
    symbol: "TestETH",
    penumbraAssetId: {
      inner: "HLkKbVfA72oQaMdYFroWQ1qoSyl/KLHZiOMJhL2y9w0="
    }
  },
  "HW2Eq3UZVSBttoUwUi/MUtE7rr2UU7/UH500byp7OAc=": {
    denomUnits: [
      {
        denom: "gm",
        exponent: 6
      },
      {
        denom: "mgm",
        exponent: 3
      },
      {
        denom: "ugm"
      }
    ],
    base: "ugm",
    display: "gm",
    symbol: "GM",
    penumbraAssetId: {
      inner: "HW2Eq3UZVSBttoUwUi/MUtE7rr2UU7/UH500byp7OAc="
    },
    images: [
      {
        svg: "https://raw.githubusercontent.com/penumbrafi/registry/main/images/full-moon-face.svg",
        theme: {
          primaryColorHex: "#ac9454"
        }
      }
    ],
    priorityScore: "900"
  },
  "HbLk6ohhBpsDMbQsE7w6xp2kOx2ONziU0VfR5JLZMAI=": {
    denomUnits: [
      {
        denom: "transfer/channel-34/factory/osmo1zlkzu72774ynac53necz46u4ycqtp36wedrar0/willyz"
      },
      {
        denom: "transfer/channel-34/willyz",
        exponent: 6
      }
    ],
    base: "transfer/channel-34/factory/osmo1zlkzu72774ynac53necz46u4ycqtp36wedrar0/willyz",
    display: "transfer/channel-34/willyz",
    name: "Willyz",
    symbol: "WILLYZ",
    penumbraAssetId: {
      inner: "HbLk6ohhBpsDMbQsE7w6xp2kOx2ONziU0VfR5JLZMAI="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/testnets/osmosistestnet/images/willyz.png",
        theme: {
          primaryColorHex: "#e4bc82"
        }
      }
    ]
  },
  "KeqcLzNx9qSH5+lcJHBB9KNW+YPrBk5dKzvPMiypahA=": {
    description: "The native token of Penumbra",
    denomUnits: [
      {
        denom: "penumbra",
        exponent: 6
      },
      {
        denom: "mpenumbra",
        exponent: 3
      },
      {
        denom: "upenumbra"
      }
    ],
    base: "upenumbra",
    display: "penumbra",
    name: "Penumbra",
    symbol: "UM",
    penumbraAssetId: {
      inner: "KeqcLzNx9qSH5+lcJHBB9KNW+YPrBk5dKzvPMiypahA="
    },
    images: [
      {
        svg: "https://raw.githubusercontent.com/penumbrafi/registry/main/images/um.svg",
        theme: {
          primaryColorHex: "#c9a975"
        }
      }
    ],
    priorityScore: "999999999999"
  },
  "Pu2BHCnQ1Ic8JJwpsro6CSkTdUexz4rFcEL2E3lCNQk=": {
    description: "Love is a test tokenfactory asset controlled by the Strangelove Team",
    denomUnits: [
      {
        denom: "transfer/channel-37/ulove"
      },
      {
        denom: "transfer/channel-37/love",
        exponent: 6
      }
    ],
    base: "transfer/channel-37/ulove",
    display: "transfer/channel-37/love",
    name: "Love",
    symbol: "LOVE",
    penumbraAssetId: {
      inner: "Pu2BHCnQ1Ic8JJwpsro6CSkTdUexz4rFcEL2E3lCNQk="
    }
  },
  "QgWMtbtgehzQ+hJJHmr1TOpLlqAE1xqrU4gqSKrIlwo=": {
    denomUnits: [
      {
        denom: "transfer/channel-34/uion"
      },
      {
        denom: "transfer/channel-34/ion",
        exponent: 6
      }
    ],
    base: "transfer/channel-34/uion",
    display: "transfer/channel-34/ion",
    name: "Ion",
    symbol: "ION",
    penumbraAssetId: {
      inner: "QgWMtbtgehzQ+hJJHmr1TOpLlqAE1xqrU4gqSKrIlwo="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/ion.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/ion.svg",
        theme: {
          primaryColorHex: "#90cfde"
        }
      }
    ],
    coingeckoId: "ion"
  },
  "WtziAvD/jyAd+Jfjm0DBx5aXNkXfK3mebyf8m4yy4gY=": {
    description: "The controlled staking asset for Noble Chain",
    denomUnits: [
      {
        denom: "transfer/channel-37/ustake"
      },
      {
        denom: "transfer/channel-37/stake",
        exponent: 6
      }
    ],
    base: "transfer/channel-37/ustake",
    display: "transfer/channel-37/stake",
    name: "Stake",
    symbol: "STAKE",
    penumbraAssetId: {
      inner: "WtziAvD/jyAd+Jfjm0DBx5aXNkXfK3mebyf8m4yy4gY="
    }
  },
  "dwcobY1Emez10NWXoQsgNDfMO8esIkw4sDob0xVe1A8=": {
    description: "USD Coin",
    denomUnits: [
      {
        denom: "transfer/channel-26/uusdc"
      },
      {
        denom: "transfer/channel-26/usdc",
        exponent: 6
      }
    ],
    base: "transfer/channel-26/uusdc",
    display: "transfer/channel-26/usdc",
    name: "USD Coin",
    symbol: "USDC.duke",
    penumbraAssetId: {
      inner: "dwcobY1Emez10NWXoQsgNDfMO8esIkw4sDob0xVe1A8="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/ethereum/images/usdc.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/ethereum/images/usdc.svg",
        theme: {
          primaryColorHex: "#2474cb"
        }
      }
    ],
    coingeckoId: "usd-coin"
  },
  "hy0xtct5UJEJ0oiF53bUK9e8nQkE5Lssd0OIAGt3GQM=": {
    description: "Love is a test tokenfactory asset controlled by the Strangelove Team",
    denomUnits: [
      {
        denom: "transfer/channel-26/ulove"
      },
      {
        denom: "transfer/channel-26/love",
        exponent: 6
      }
    ],
    base: "transfer/channel-26/ulove",
    display: "transfer/channel-26/love",
    name: "Love",
    symbol: "LOVE.duke",
    penumbraAssetId: {
      inner: "hy0xtct5UJEJ0oiF53bUK9e8nQkE5Lssd0OIAGt3GQM="
    }
  },
  "nDjzm+ldIrNMJha1anGMDVxpA5cLCPnUYQ1clmHF1gw=": {
    denomUnits: [
      {
        denom: "pizza"
      }
    ],
    base: "pizza",
    display: "pizza",
    symbol: "PIZZA",
    penumbraAssetId: {
      inner: "nDjzm+ldIrNMJha1anGMDVxpA5cLCPnUYQ1clmHF1gw="
    },
    images: [
      {
        svg: "https://raw.githubusercontent.com/penumbrafi/registry/main/images/pizza.svg",
        theme: {
          primaryColorHex: "#ab1221"
        }
      }
    ]
  },
  "nwIPLIGdQD7oVPflRpHnlcYItdeXjFhKYylobEK0dAU=": {
    denomUnits: [
      {
        denom: "udelegation_penumbravalid1lqaxk2e7tsctcu0l9sjgu85arzgu0m5yllyc549tmdptlyldzvxqxeh9cq"
      },
      {
        denom: "mdelegation_penumbravalid1lqaxk2e7tsctcu0l9sjgu85arzgu0m5yllyc549tmdptlyldzvxqxeh9cq",
        exponent: 3
      },
      {
        denom: "delegation_penumbravalid1lqaxk2e7tsctcu0l9sjgu85arzgu0m5yllyc549tmdptlyldzvxqxeh9cq",
        exponent: 6
      }
    ],
    base: "udelegation_penumbravalid1lqaxk2e7tsctcu0l9sjgu85arzgu0m5yllyc549tmdptlyldzvxqxeh9cq",
    display: "delegation_penumbravalid1lqaxk2e7tsctcu0l9sjgu85arzgu0m5yllyc549tmdptlyldzvxqxeh9cq",
    symbol: "delUM(Penumbra Labs CI 2)",
    penumbraAssetId: {
      inner: "nwIPLIGdQD7oVPflRpHnlcYItdeXjFhKYylobEK0dAU="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/penumbrafi/registry/main/images/penumbra-favicon.png",
        theme: {
          primaryColorHex: "#1d1e1d"
        }
      }
    ]
  },
  "nwPDkQq3OvLnBwGTD+nmv1Ifb2GEmFCgNHrU++9BsRE=": {
    denomUnits: [
      {
        denom: "gn",
        exponent: 6
      },
      {
        denom: "mgn",
        exponent: 3
      },
      {
        denom: "ugn"
      }
    ],
    base: "ugn",
    display: "gn",
    symbol: "GN",
    penumbraAssetId: {
      inner: "nwPDkQq3OvLnBwGTD+nmv1Ifb2GEmFCgNHrU++9BsRE="
    },
    images: [
      {
        svg: "https://raw.githubusercontent.com/penumbrafi/registry/main/images/new-moon-face.svg",
        theme: {
          primaryColorHex: "#546068"
        }
      }
    ],
    priorityScore: "900"
  },
  "o2gZdbhCH70Ry+7iBhkSeHC/PB1LZhgkn7LHC2kEhQc=": {
    denomUnits: [
      {
        denom: "test_btc",
        exponent: 8
      },
      {
        denom: "test_sat"
      }
    ],
    base: "test_sat",
    display: "test_btc",
    symbol: "TestBTC",
    penumbraAssetId: {
      inner: "o2gZdbhCH70Ry+7iBhkSeHC/PB1LZhgkn7LHC2kEhQc="
    }
  },
  "pmpygqUf4DL+z849rGPpudpdK/+FAv8qQ01U2C73kAw=": {
    denomUnits: [
      {
        denom: "test_osmo",
        exponent: 6
      },
      {
        denom: "mtest_osmo",
        exponent: 3
      },
      {
        denom: "utest_osmo"
      }
    ],
    base: "utest_osmo",
    display: "test_osmo",
    symbol: "TestOSMO",
    penumbraAssetId: {
      inner: "pmpygqUf4DL+z849rGPpudpdK/+FAv8qQ01U2C73kAw="
    }
  },
  "reum7wQmk/owgvGMWMZn/6RFPV24zIKq3W6In/WwZgg=": {
    denomUnits: [
      {
        denom: "test_usd",
        exponent: 18
      },
      {
        denom: "wtest_usd"
      }
    ],
    base: "wtest_usd",
    display: "test_usd",
    symbol: "TestUSD",
    penumbraAssetId: {
      inner: "reum7wQmk/owgvGMWMZn/6RFPV24zIKq3W6In/WwZgg="
    },
    images: [
      {
        svg: "https://raw.githubusercontent.com/penumbrafi/registry/main/images/test-usd.svg",
        theme: {
          primaryColorHex: "#14833b"
        }
      }
    ],
    priorityScore: "1000"
  },
  "tBf2PvH+M6xwlUrCB/lFpcaJpms5UNkKaDZ7wEHHoQ8=": {
    description: "The controlled staking asset for Noble Chain",
    denomUnits: [
      {
        denom: "transfer/channel-26/ustake"
      },
      {
        denom: "transfer/channel-26/stake",
        exponent: 6
      }
    ],
    base: "transfer/channel-26/ustake",
    display: "transfer/channel-26/stake",
    name: "Stake",
    symbol: "STAKE.duke",
    penumbraAssetId: {
      inner: "tBf2PvH+M6xwlUrCB/lFpcaJpms5UNkKaDZ7wEHHoQ8="
    }
  },
  "ypUT1AOtjfwMOKMATACoD9RSvi8jY/YnYGi46CZ/6Q8=": {
    denomUnits: [
      {
        denom: "test_atom",
        exponent: 6
      },
      {
        denom: "mtest_atom",
        exponent: 3
      },
      {
        denom: "utest_atom"
      }
    ],
    base: "utest_atom",
    display: "test_atom",
    symbol: "TestATOM",
    penumbraAssetId: {
      inner: "ypUT1AOtjfwMOKMATACoD9RSvi8jY/YnYGi46CZ/6Q8="
    }
  }
}, In = [
  "reum7wQmk/owgvGMWMZn/6RFPV24zIKq3W6In/WwZgg=",
  "dwcobY1Emez10NWXoQsgNDfMO8esIkw4sDob0xVe1A8="
], Ls = {
  chainId: kn,
  ibcConnections: qn,
  assetById: An,
  numeraires: In
}, Rs = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  assetById: An,
  chainId: kn,
  default: Ls,
  ibcConnections: qn,
  numeraires: In
}, Symbol.toStringTag, { value: "Module" })), zn = "penumbra-testnet-phobos-3", jn = [
  {
    addressPrefix: "osmo",
    chainId: "osmo-test-5",
    channelId: "channel-2",
    counterpartyChannelId: "channel-10407",
    displayName: "Osmosis",
    images: [
      {
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/f1348793beb994c6cc0256ed7ebdb48c7aa70003/osmosis/images/osmo.svg"
      }
    ]
  },
  {
    addressPrefix: "noble",
    chainId: "grand-1",
    channelId: "channel-3",
    counterpartyChannelId: "channel-348",
    displayName: "Noble",
    images: [
      {
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/2ca39d0e4eaf3431cca13991948e099801f02e46/noble/images/stake.svg"
      }
    ]
  }
], Un = {
  "6KBVsPINa8gWSHhfH+kAFJC4afEJA3EtuB2HyCqJUws=": {
    denomUnits: [
      {
        denom: "cube"
      }
    ],
    base: "cube",
    display: "cube",
    symbol: "CUBE",
    penumbraAssetId: {
      inner: "6KBVsPINa8gWSHhfH+kAFJC4afEJA3EtuB2HyCqJUws="
    }
  },
  "CKBQapu+DkQpsKyTfKESLTV19/NPWR5sNZtvQsd3Hw8=": {
    description: "USD Coin",
    denomUnits: [
      {
        denom: "transfer/channel-3/uusdc"
      },
      {
        denom: "transfer/channel-3/usdc",
        exponent: 6
      }
    ],
    base: "transfer/channel-3/uusdc",
    display: "transfer/channel-3/usdc",
    name: "USD Coin",
    symbol: "USDC.n",
    penumbraAssetId: {
      inner: "CKBQapu+DkQpsKyTfKESLTV19/NPWR5sNZtvQsd3Hw8="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/ethereum/images/usdc.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/ethereum/images/usdc.svg",
        theme: {
          primaryColorHex: "#2474cb"
        }
      }
    ],
    priorityScore: "800",
    coingeckoId: "usd-coin"
  },
  "HLkKbVfA72oQaMdYFroWQ1qoSyl/KLHZiOMJhL2y9w0=": {
    denomUnits: [
      {
        denom: "test_eth",
        exponent: 18
      },
      {
        denom: "wtest_eth"
      }
    ],
    base: "wtest_eth",
    display: "test_eth",
    symbol: "TestETH",
    penumbraAssetId: {
      inner: "HLkKbVfA72oQaMdYFroWQ1qoSyl/KLHZiOMJhL2y9w0="
    }
  },
  "HW2Eq3UZVSBttoUwUi/MUtE7rr2UU7/UH500byp7OAc=": {
    denomUnits: [
      {
        denom: "gm",
        exponent: 6
      },
      {
        denom: "mgm",
        exponent: 3
      },
      {
        denom: "ugm"
      }
    ],
    base: "ugm",
    display: "gm",
    symbol: "GM",
    penumbraAssetId: {
      inner: "HW2Eq3UZVSBttoUwUi/MUtE7rr2UU7/UH500byp7OAc="
    },
    images: [
      {
        svg: "https://raw.githubusercontent.com/penumbrafi/registry/main/images/full-moon-face.svg",
        theme: {
          primaryColorHex: "#ac9454"
        }
      }
    ],
    priorityScore: "900"
  },
  "Hqn6gTCqE7mCBsVa4agsTFmrO0Rip5xmLcipnGKH9AI=": {
    description: "Love is a test tokenfactory asset controlled by the Strangelove Team",
    denomUnits: [
      {
        denom: "transfer/channel-3/ulove"
      },
      {
        denom: "transfer/channel-3/love",
        exponent: 6
      }
    ],
    base: "transfer/channel-3/ulove",
    display: "transfer/channel-3/love",
    name: "Love",
    symbol: "LOVE",
    penumbraAssetId: {
      inner: "Hqn6gTCqE7mCBsVa4agsTFmrO0Rip5xmLcipnGKH9AI="
    }
  },
  "KeqcLzNx9qSH5+lcJHBB9KNW+YPrBk5dKzvPMiypahA=": {
    description: "The native token of Penumbra",
    denomUnits: [
      {
        denom: "penumbra",
        exponent: 6
      },
      {
        denom: "mpenumbra",
        exponent: 3
      },
      {
        denom: "upenumbra"
      }
    ],
    base: "upenumbra",
    display: "penumbra",
    name: "Penumbra",
    symbol: "UM",
    penumbraAssetId: {
      inner: "KeqcLzNx9qSH5+lcJHBB9KNW+YPrBk5dKzvPMiypahA="
    },
    images: [
      {
        svg: "https://raw.githubusercontent.com/penumbrafi/registry/main/images/um.svg",
        theme: {
          primaryColorHex: "#c9a975"
        }
      }
    ],
    priorityScore: "999999999999"
  },
  "PTkvjX+oV1r5k1nU5BJw46gfpk7KD+VhuNefdsGD3Qk=": {
    denomUnits: [
      {
        denom: "transfer/channel-2/uion"
      },
      {
        denom: "transfer/channel-2/ion",
        exponent: 6
      }
    ],
    base: "transfer/channel-2/uion",
    display: "transfer/channel-2/ion",
    name: "Ion",
    symbol: "ION",
    penumbraAssetId: {
      inner: "PTkvjX+oV1r5k1nU5BJw46gfpk7KD+VhuNefdsGD3Qk="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/ion.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/ion.svg",
        theme: {
          primaryColorHex: "#90cfde"
        }
      }
    ],
    coingeckoId: "ion"
  },
  "RinC31a7S4x9YkTwAf2sDQ3dN18FV6WLmxAetVprUgQ=": {
    description: "The native token of Osmosis",
    denomUnits: [
      {
        denom: "transfer/channel-2/uosmo"
      },
      {
        denom: "transfer/channel-2/osmo",
        exponent: 6
      }
    ],
    base: "transfer/channel-2/uosmo",
    display: "transfer/channel-2/osmo",
    name: "Osmosis Testnet",
    symbol: "OSMO",
    penumbraAssetId: {
      inner: "RinC31a7S4x9YkTwAf2sDQ3dN18FV6WLmxAetVprUgQ="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/osmo.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/osmo.svg",
        theme: {
          primaryColorHex: "#6b0db7"
        }
      }
    ],
    priorityScore: "800",
    coingeckoId: "osmosis"
  },
  "VDuTDzoFOg4mMrNeyqCEC1L4lSjtJUJ5jJ2D6SQsRgM=": {
    description: "Ondo US Dollar Yield",
    denomUnits: [
      {
        denom: "transfer/channel-3/ausdy"
      },
      {
        denom: "transfer/channel-3/usdy",
        exponent: 18
      }
    ],
    base: "transfer/channel-3/ausdy",
    display: "transfer/channel-3/usdy",
    name: "Ondo US Dollar Yield",
    symbol: "USDY",
    penumbraAssetId: {
      inner: "VDuTDzoFOg4mMrNeyqCEC1L4lSjtJUJ5jJ2D6SQsRgM="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/testnets/nobletestnet/images/usdy.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/testnets/nobletestnet/images/usdy.svg",
        theme: {
          primaryColorHex: "#142b5b"
        }
      }
    ]
  },
  "dAOVvMzKcKYgs/fnUvdzumwn+U15bYprlHbNPAaL/Qo=": {
    denomUnits: [
      {
        denom: "udelegation_penumbravalid1se8jfzt5waklmknkkl2aqv8wk95yekd22rm2lg8xxay2fgddagxsjg44g4"
      },
      {
        denom: "mdelegation_penumbravalid1se8jfzt5waklmknkkl2aqv8wk95yekd22rm2lg8xxay2fgddagxsjg44g4",
        exponent: 3
      },
      {
        denom: "delegation_penumbravalid1se8jfzt5waklmknkkl2aqv8wk95yekd22rm2lg8xxay2fgddagxsjg44g4",
        exponent: 6
      }
    ],
    base: "udelegation_penumbravalid1se8jfzt5waklmknkkl2aqv8wk95yekd22rm2lg8xxay2fgddagxsjg44g4",
    display: "delegation_penumbravalid1se8jfzt5waklmknkkl2aqv8wk95yekd22rm2lg8xxay2fgddagxsjg44g4",
    symbol: "delUM(Penumbra Labs CI 1)",
    penumbraAssetId: {
      inner: "dAOVvMzKcKYgs/fnUvdzumwn+U15bYprlHbNPAaL/Qo="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/penumbrafi/registry/main/images/penumbra-favicon.png",
        theme: {
          primaryColorHex: "#1d1e1d"
        }
      }
    ]
  },
  "hGwO3SuE1/D05ooLMUVVe7XvYbAFnxAUbIRIZdG3TwI=": {
    description: "The controlled staking asset for Noble Chain",
    denomUnits: [
      {
        denom: "transfer/channel-3/ustake"
      },
      {
        denom: "transfer/channel-3/stake",
        exponent: 6
      }
    ],
    base: "transfer/channel-3/ustake",
    display: "transfer/channel-3/stake",
    name: "Stake",
    symbol: "STAKE",
    penumbraAssetId: {
      inner: "hGwO3SuE1/D05ooLMUVVe7XvYbAFnxAUbIRIZdG3TwI="
    }
  },
  "mnGyyC1IOFxD5qnm9jAWNRDtqA5MdxXuBLqtk26nggQ=": {
    denomUnits: [
      {
        denom: "transfer/channel-2/factory/osmo1zlkzu72774ynac53necz46u4ycqtp36wedrar0/willyz"
      },
      {
        denom: "transfer/channel-2/willyz",
        exponent: 6
      }
    ],
    base: "transfer/channel-2/factory/osmo1zlkzu72774ynac53necz46u4ycqtp36wedrar0/willyz",
    display: "transfer/channel-2/willyz",
    name: "Willyz",
    symbol: "WILLYZ",
    penumbraAssetId: {
      inner: "mnGyyC1IOFxD5qnm9jAWNRDtqA5MdxXuBLqtk26nggQ="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/testnets/osmosistestnet/images/willyz.png",
        theme: {
          primaryColorHex: "#e4bc82"
        }
      }
    ]
  },
  "nDjzm+ldIrNMJha1anGMDVxpA5cLCPnUYQ1clmHF1gw=": {
    denomUnits: [
      {
        denom: "pizza"
      }
    ],
    base: "pizza",
    display: "pizza",
    symbol: "PIZZA",
    penumbraAssetId: {
      inner: "nDjzm+ldIrNMJha1anGMDVxpA5cLCPnUYQ1clmHF1gw="
    },
    images: [
      {
        svg: "https://raw.githubusercontent.com/penumbrafi/registry/main/images/pizza.svg",
        theme: {
          primaryColorHex: "#ab1221"
        }
      }
    ]
  },
  "nwPDkQq3OvLnBwGTD+nmv1Ifb2GEmFCgNHrU++9BsRE=": {
    denomUnits: [
      {
        denom: "gn",
        exponent: 6
      },
      {
        denom: "mgn",
        exponent: 3
      },
      {
        denom: "ugn"
      }
    ],
    base: "ugn",
    display: "gn",
    symbol: "GN",
    penumbraAssetId: {
      inner: "nwPDkQq3OvLnBwGTD+nmv1Ifb2GEmFCgNHrU++9BsRE="
    },
    images: [
      {
        svg: "https://raw.githubusercontent.com/penumbrafi/registry/main/images/new-moon-face.svg",
        theme: {
          primaryColorHex: "#546068"
        }
      }
    ],
    priorityScore: "900"
  },
  "o2gZdbhCH70Ry+7iBhkSeHC/PB1LZhgkn7LHC2kEhQc=": {
    denomUnits: [
      {
        denom: "test_btc",
        exponent: 8
      },
      {
        denom: "test_sat"
      }
    ],
    base: "test_sat",
    display: "test_btc",
    symbol: "TestBTC",
    penumbraAssetId: {
      inner: "o2gZdbhCH70Ry+7iBhkSeHC/PB1LZhgkn7LHC2kEhQc="
    }
  },
  "pmpygqUf4DL+z849rGPpudpdK/+FAv8qQ01U2C73kAw=": {
    denomUnits: [
      {
        denom: "test_osmo",
        exponent: 6
      },
      {
        denom: "mtest_osmo",
        exponent: 3
      },
      {
        denom: "utest_osmo"
      }
    ],
    base: "utest_osmo",
    display: "test_osmo",
    symbol: "TestOSMO",
    penumbraAssetId: {
      inner: "pmpygqUf4DL+z849rGPpudpdK/+FAv8qQ01U2C73kAw="
    }
  },
  "reum7wQmk/owgvGMWMZn/6RFPV24zIKq3W6In/WwZgg=": {
    denomUnits: [
      {
        denom: "test_usd",
        exponent: 18
      },
      {
        denom: "wtest_usd"
      }
    ],
    base: "wtest_usd",
    display: "test_usd",
    symbol: "TestUSD",
    penumbraAssetId: {
      inner: "reum7wQmk/owgvGMWMZn/6RFPV24zIKq3W6In/WwZgg="
    },
    images: [
      {
        svg: "https://raw.githubusercontent.com/penumbrafi/registry/main/images/test-usd.svg",
        theme: {
          primaryColorHex: "#14833b"
        }
      }
    ],
    priorityScore: "1000"
  },
  "xyBcJsUGrU7ws/obF8Kp01Iv86UtQ10Nb+WWbyltoAQ=": {
    denomUnits: [
      {
        denom: "udelegation_penumbravalid1ygs8uns7dw0wxej5ujt87qv3dua7ksnc56l2uvxt8a4lvqcm75gsstqp2e"
      },
      {
        denom: "mdelegation_penumbravalid1ygs8uns7dw0wxej5ujt87qv3dua7ksnc56l2uvxt8a4lvqcm75gsstqp2e",
        exponent: 3
      },
      {
        denom: "delegation_penumbravalid1ygs8uns7dw0wxej5ujt87qv3dua7ksnc56l2uvxt8a4lvqcm75gsstqp2e",
        exponent: 6
      }
    ],
    base: "udelegation_penumbravalid1ygs8uns7dw0wxej5ujt87qv3dua7ksnc56l2uvxt8a4lvqcm75gsstqp2e",
    display: "delegation_penumbravalid1ygs8uns7dw0wxej5ujt87qv3dua7ksnc56l2uvxt8a4lvqcm75gsstqp2e",
    symbol: "delUM(Penumbra Labs CI 2)",
    penumbraAssetId: {
      inner: "xyBcJsUGrU7ws/obF8Kp01Iv86UtQ10Nb+WWbyltoAQ="
    },
    images: [
      {
        png: "https://raw.githubusercontent.com/penumbrafi/registry/main/images/penumbra-favicon.png",
        theme: {
          primaryColorHex: "#1d1e1d"
        }
      }
    ]
  },
  "ypUT1AOtjfwMOKMATACoD9RSvi8jY/YnYGi46CZ/6Q8=": {
    denomUnits: [
      {
        denom: "test_atom",
        exponent: 6
      },
      {
        denom: "mtest_atom",
        exponent: 3
      },
      {
        denom: "utest_atom"
      }
    ],
    base: "utest_atom",
    display: "test_atom",
    symbol: "TestATOM",
    penumbraAssetId: {
      inner: "ypUT1AOtjfwMOKMATACoD9RSvi8jY/YnYGi46CZ/6Q8="
    }
  }
}, Cn = [
  "reum7wQmk/owgvGMWMZn/6RFPV24zIKq3W6In/WwZgg=",
  "CKBQapu+DkQpsKyTfKESLTV19/NPWR5sNZtvQsd3Hw8="
], Ps = {
  chainId: zn,
  ibcConnections: jn,
  assetById: Un,
  numeraires: Cn
}, Fs = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  assetById: Un,
  chainId: zn,
  default: Ps,
  ibcConnections: jn,
  numeraires: Cn
}, Symbol.toStringTag, { value: "Module" })), V = (s) => s, Fe = {
  "penumbra-testnet-deimos-8-x6de97e39": V(Ns),
  "penumbra-1": V(Es),
  "penumbra-testnet-phobos-1": V(Ms),
  "penumbra-testnet-phobos-2": V(Rs),
  "penumbra-testnet-phobos-3": V(Fs)
}, Tn = [
  {
    name: "ghostinnet",
    url: "https://penumbra.grpc.ghostinnet.com",
    images: [
      {
        png: "https://raw.githubusercontent.com/penumbrafi/registry/main/images/ghostinnet.png"
      }
    ]
  },
  {
    name: "Rotko Networks",
    url: "https://rpc.penumbra.fi",
    images: []
  },
  {
    name: "Validatus",
    url: "https://grpc.penumbra.validatus.com",
    images: []
  },
  {
    name: "Bryanlabs",
    url: "https://penumbra.bryanlabs.net",
    images: []
  }
], Sn = [
  "https://penumbra.zechub.org",
  "https://penumbra.fi",
  "https://penumbra.grpc.ghostinnet.com",
  "https://grpc.penumbra.validatus.com",
  "https://penumbra.bryanlabs.net"
], On = [
  {
    name: "ZecHub",
    url: "https://penumbra.zechub.org",
    images: [
      {
        png: "https://raw.githubusercontent.com/penumbrafi/registry/main/images/zec-hub.png"
      }
    ]
  },
  {
    name: "Penumbra.fi",
    url: "https://penumbra.fi",
    images: []
  },
  {
    name: "ghostinnet",
    url: "https://penumbra.grpc.ghostinnet.com",
    images: [
      {
        png: "https://raw.githubusercontent.com/penumbrafi/registry/main/images/ghostinnet.png"
      }
    ]
  },
  {
    name: "Validatus",
    url: "https://grpc.penumbra.validatus.com",
    images: []
  },
  {
    name: "Bryanlabs",
    url: "https://penumbra.bryanlabs.net",
    images: []
  }
], Hn = [
  {
    name: "Prax",
    url: "https://praxwallet.com/",
    images: [
      {
        png: "https://raw.githubusercontent.com/penumbrafi/registry/main/images/penumbra-favicon.png"
      }
    ]
  },
  {
    name: "Zafu",
    url: "https://zafu.pro/",
    images: []
  }
], Nn = {
  inner: "KeqcLzNx9qSH5+lcJHBB9KNW+YPrBk5dKzvPMiypahA="
}, Ys = {
  rpcs: Tn,
  frontends: Sn,
  frontendsV2: On,
  wallets: Hn,
  stakingAssetId: Nn
}, Qs = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ys,
  frontends: Sn,
  frontendsV2: On,
  rpcs: Tn,
  stakingAssetId: Nn,
  wallets: Hn
}, Symbol.toStringTag, { value: "Module" }));
class Bn {
  constructor(e) {
    c(this, "stakingAssetId");
    c(this, "rpcs");
    c(this, "frontends");
    c(this, "wallets");
    this.rpcs = e.rpcs, this.frontends = e.frontendsV2, this.wallets = e.wallets ?? [], this.stakingAssetId = L.fromJson(e.stakingAssetId, { ignoreUnknownFields: !0 });
  }
  async version() {
    return cn(JSON.stringify(this));
  }
}
const En = /-x?[0-9a-f]{8}$/, Dn = (s) => En.test(s), Mn = (s) => s.substring(0, s.search(En));
class Gs {
  get(e) {
    const n = Fe[e];
    if (n)
      return new ke(n);
    if (Dn(e)) {
      const t = Mn(e);
      console.warn(`Attempting to get fallback chain registry: ${t}`);
      const r = Fe[t];
      if (r)
        return new ke(r);
    }
    throw new Error(`Registry not found for ${e}`);
  }
  globals() {
    return new Bn(Qs);
  }
}
const Ye = "https://raw.githubusercontent.com/penumbrafi/registry/main/registry";
class Js {
  constructor(e) {
    this.options = e;
  }
  async fetchRegistry(e) {
    const n = await this.typedFetcher(
      `${Ye}/chains/${e}.json`
    );
    return new ke(n);
  }
  async fetchGlobals() {
    const e = await this.typedFetcher(`${Ye}/globals.json`);
    return new Bn(e);
  }
  async typedFetcher(e) {
    var r;
    const n = (r = this.options) != null && r.nextjsServerSide && typeof window > "u" ? "force-cache" : "default", t = await fetch(e, { cache: n });
    if (!t.ok)
      throw new Error(`Failed to fetch from: ${e}`);
    return await t.json();
  }
}
class Ks {
  constructor(e, n) {
    c(this, "github");
    this.bundled = e, this.github = new Js(n);
  }
  async get(e) {
    try {
      return await this.github.fetchRegistry(e);
    } catch (n) {
      if (Dn(e)) {
        const t = Mn(e);
        return console.warn(`Attempting to fetch fallback chain registry: ${t}`), await this.github.fetchRegistry(t);
      }
      throw n;
    }
  }
  // If remote fails, fall back to bundled registry for chain
  async getWithBundledBackup(e) {
    try {
      return await this.get(e);
    } catch (n) {
      return console.warn(
        `Unable to fetch remote registry for ${e}, attempting to return bundled. Fetch err: ${String(n)}`
      ), this.bundled.get(e);
    }
  }
  async globals() {
    return this.github.fetchGlobals();
  }
}
class Vs {
  constructor(e) {
    c(this, "bundled");
    c(this, "remote");
    this.bundled = new Gs(), this.remote = new Ks(this.bundled, e);
  }
}
export {
  Vs as ChainRegistryClient,
  ke as Registry,
  de as isDenom
};
