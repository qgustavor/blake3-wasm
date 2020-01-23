# BLAKE3

BLAKE3 implementation adapted from [connor4312/blake3](https://github.com/connor4312/blake3) to make it work directly from a ES Module compatible browser.

## Changes

- [blake3_js.js](https://unpkg.com/browse/blake3@2.0.0/dist/wasm/browser/blake3_js.js) was renamed to `blake3.js`.
- [blake3_js_bg.wasm](https://unpkg.com/browse/blake3@2.0.0/dist/wasm/browser/blake3_js_bg.wasm) was renamed to `blake3_js_bg.wasm`.
- `blake3.js` was modified to use `WebAssembly.instantiateStreaming` instead of non-standard `import * as wasm from './blake3_js_bg.wasm'` (not supported by browsers because [it's just a feature proposal](https://github.com/WebAssembly/proposals/issues/12)).
- As it's based on `blake3_js.js` the high level functions were removed.

## Usage

Examples based on <a href="https://github.com/dirkschumacher/blake3/blob/cb96f29156f0d7cf263f46291c3b417acfae02af/tests/testthat/test-hash.R">those tests</a>.

```javascript
// Import the module and wait for WASM module initialization
const blake3 = await import('./blake3.js')
await blake3.ready

// Hash 'wat'
let hasher = blake3.create_hasher()
hasher.update(new TextEncoder().encode('wat'))

// .digest() requires an array as an argument where the digest will be stored
let result = new Uint8Array(32)
hasher.digest(result)

// Output the digest in hexadecimal (so we compare the result with the linked test)
console.log(Array.from(result).map(e => e.toString(16).padStart(2, 0)).join(''))

// For the keyed hash first create a key
// The linked test creates a key by hashing the string 'test'
hasher = blake3.create_hasher()
hasher.update(new TextEncoder().encode('test'))
result = new Uint8Array(32)
hasher.digest(result)

// Create a key using the above key
const keyedHasher = blake3.create_keyed(result)

// The keyed hasher usage is the same as a normal hasher
keyedHasher.update(new TextEncoder().encode('wat'))
result = new Uint8Array(32)
keyedHasher.digest(result)
console.log(Array.from(result).map(e => e.toString(16).padStart(2, 0)).join(''))
```

You can test it here: https://qgustavor.github.io/blake3-wasm/test.html

A NPM module will not be published because I expect [connor4312/blake3](https://github.com/connor4312/blake3) to be fixed to work without requiring a bundler later or sooner.
