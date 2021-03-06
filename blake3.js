let cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });

cachedTextDecoder.decode();

let cachegetUint8Memory0 = null;
function getUint8Memory0() {
    if (cachegetUint8Memory0 === null || cachegetUint8Memory0.buffer !== wasm.memory.buffer) {
        cachegetUint8Memory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachegetUint8Memory0;
}

function getStringFromWasm0(ptr, len) {
    return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}

let WASM_VECTOR_LEN = 0;

function passArray8ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 1);
    getUint8Memory0().set(arg, ptr / 1);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}
/**
* @param {Uint8Array} data
* @param {Uint8Array} out
*/
export function hash(data, out) {
    try {
        var ptr0 = passArray8ToWasm0(data, wasm.__wbindgen_malloc);
        var len0 = WASM_VECTOR_LEN;
        var ptr1 = passArray8ToWasm0(out, wasm.__wbindgen_malloc);
        var len1 = WASM_VECTOR_LEN;
        wasm.hash(ptr0, len0, ptr1, len1);
    } finally {
        out.set(getUint8Memory0().subarray(ptr1 / 1, ptr1 / 1 + len1));
        wasm.__wbindgen_free(ptr1, len1 * 1);
    }
}

let cachedTextEncoder = new TextEncoder('utf-8');

const encodeString = (typeof cachedTextEncoder.encodeInto === 'function'
    ? function (arg, view) {
    return cachedTextEncoder.encodeInto(arg, view);
}
    : function (arg, view) {
    const buf = cachedTextEncoder.encode(arg);
    view.set(buf);
    return {
        read: arg.length,
        written: buf.length
    };
});

function passStringToWasm0(arg, malloc, realloc) {

    if (realloc === undefined) {
        const buf = cachedTextEncoder.encode(arg);
        const ptr = malloc(buf.length);
        getUint8Memory0().subarray(ptr, ptr + buf.length).set(buf);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    }

    let len = arg.length;
    let ptr = malloc(len);

    const mem = getUint8Memory0();

    let offset = 0;

    for (; offset < len; offset++) {
        const code = arg.charCodeAt(offset);
        if (code > 0x7F) break;
        mem[ptr + offset] = code;
    }

    if (offset !== len) {
        if (offset !== 0) {
            arg = arg.slice(offset);
        }
        ptr = realloc(ptr, len, len = offset + arg.length * 3);
        const view = getUint8Memory0().subarray(ptr + offset, ptr + len);
        const ret = encodeString(arg, view);

        offset += ret.written;
    }

    WASM_VECTOR_LEN = offset;
    return ptr;
}
/**
* @param {string} context
* @param {Uint8Array} key_material
* @param {Uint8Array} out
*/
export function derive_key(context, key_material, out) {
    try {
        var ptr0 = passStringToWasm0(context, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        var ptr1 = passArray8ToWasm0(key_material, wasm.__wbindgen_malloc);
        var len1 = WASM_VECTOR_LEN;
        var ptr2 = passArray8ToWasm0(out, wasm.__wbindgen_malloc);
        var len2 = WASM_VECTOR_LEN;
        wasm.derive_key(ptr0, len0, ptr1, len1, ptr2, len2);
    } finally {
        out.set(getUint8Memory0().subarray(ptr2 / 1, ptr2 / 1 + len2));
        wasm.__wbindgen_free(ptr2, len2 * 1);
    }
}

/**
* @returns {Blake3Hash}
*/
export function create_hasher() {
    var ret = wasm.create_hasher();
    return Blake3Hash.__wrap(ret);
}

/**
* @param {Uint8Array} key_slice
* @returns {Blake3Hash}
*/
export function create_keyed(key_slice) {
    var ptr0 = passArray8ToWasm0(key_slice, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    var ret = wasm.create_keyed(ptr0, len0);
    return Blake3Hash.__wrap(ret);
}

/**
* @param {string} key
* @returns {Blake3Hash}
*/
export function create_derived(key) {
    var ptr0 = passStringToWasm0(key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len0 = WASM_VECTOR_LEN;
    var ret = wasm.create_derived(ptr0, len0);
    return Blake3Hash.__wrap(ret);
}

const u32CvtShim = new Uint32Array(2);

const uint64CvtShim = new BigUint64Array(u32CvtShim.buffer);
/**
*/
export class Blake3Hash {

    static __wrap(ptr) {
        const obj = Object.create(Blake3Hash.prototype);
        obj.ptr = ptr;

        return obj;
    }

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_blake3hash_free(ptr);
    }
    /**
    * @returns {HashReader}
    */
    reader() {
        var ret = wasm.blake3hash_reader(this.ptr);
        return HashReader.__wrap(ret);
    }
    /**
    * @param {Uint8Array} input_bytes
    */
    update(input_bytes) {
        var ptr0 = passArray8ToWasm0(input_bytes, wasm.__wbindgen_malloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.blake3hash_update(this.ptr, ptr0, len0);
    }
    /**
    * @param {Uint8Array} out
    */
    digest(out) {
        try {
            var ptr0 = passArray8ToWasm0(out, wasm.__wbindgen_malloc);
            var len0 = WASM_VECTOR_LEN;
            wasm.blake3hash_digest(this.ptr, ptr0, len0);
        } finally {
            out.set(getUint8Memory0().subarray(ptr0 / 1, ptr0 / 1 + len0));
            wasm.__wbindgen_free(ptr0, len0 * 1);
        }
    }
}
/**
*/
export class HashReader {

    static __wrap(ptr) {
        const obj = Object.create(HashReader.prototype);
        obj.ptr = ptr;

        return obj;
    }

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_hashreader_free(ptr);
    }
    /**
    * @param {Uint8Array} bytes
    */
    fill(bytes) {
        try {
            var ptr0 = passArray8ToWasm0(bytes, wasm.__wbindgen_malloc);
            var len0 = WASM_VECTOR_LEN;
            wasm.hashreader_fill(this.ptr, ptr0, len0);
        } finally {
            bytes.set(getUint8Memory0().subarray(ptr0 / 1, ptr0 / 1 + len0));
            wasm.__wbindgen_free(ptr0, len0 * 1);
        }
    }
    /**
    * @param {BigInt} position
    */
    set_position(position) {
        uint64CvtShim[0] = position;
        const low0 = u32CvtShim[0];
        const high0 = u32CvtShim[1];
        wasm.hashreader_set_position(this.ptr, low0, high0);
    }
}

const __wbindgen_throw = function(arg0, arg1) {
    throw new Error(getStringFromWasm0(arg0, arg1));
};

let wasm;
const instantiateModule = function () {
  const imports = {
    imports: { __wbindgen_throw }
  };
  return WebAssembly.instantiateStreaming(fetch('blake3.wasm'), imports)
    .then(module => {
      wasm = module.instance.exports;
  })
};

const wasmModule = instantiateModule()
export {wasmModule as ready};
