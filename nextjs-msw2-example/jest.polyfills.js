// https://mswjs.io/docs/migrations/1.x-to-2.x#remap-fetch-api-globals

/**
 * @note The block below contains polyfills for Node.js globals
 * required for Jest to function when running JSDOM tests.
 * These HAVE to be require's and HAVE to be in this exact
 * order, since "undici" depends on the "TextEncoder" global API.
 *
 * Consider migrating to a more modern test runner if
 * you don't want to deal with this.
 */

const { TextDecoder, TextEncoder } = require("node:util");

// https://github.com/mswjs/msw/issues/2082#issuecomment-1989697293
const { ReadableStream } = require("node:stream/web");

Object.defineProperties(globalThis, {
  TextDecoder: { value: TextDecoder },
  TextEncoder: { value: TextEncoder },
  // ReadableStream reference: https://github.com/mswjs/msw/discussions/1934
  ReadableStream: { value: ReadableStream },
});

const { Blob, File } = require("node:buffer");
const { fetch, Headers, FormData, Request, Response } = require("undici");

Object.defineProperties(globalThis, {
  fetch: { value: fetch, writable: true },
  Blob: { value: Blob },
  File: { value: File },
  Headers: { value: Headers },
  FormData: { value: FormData },
  Request: { value: Request },
  Response: { value: Response },
});
