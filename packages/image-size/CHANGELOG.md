## @fumari/image-size@0.1.0

## 1.0.17

### Patch Changes

- [`a6b1e4b`](https://github.com/vezham-oss/fumadocs/commit/a6b1e4b1c2091943b9a471a9415c75ca40e3253d) Thanks [@vx-vigneshwaran](https://github.com/vx-vigneshwaran)! - Preserve Markdown serializer handler metadata to prevent stack overflows when generating processed Markdown containing bold or italic text with mdast-util-to-markdown 2.1.3.

## 1.0.16

### Patch Changes

- [`c14077c`](https://github.com/vezham-oss/fumadocs/commit/c14077c408a45630404b88ce38b8a30d5a4de8ce) Thanks [@vx-vigneshwaran](https://github.com/vx-vigneshwaran)! - Preserve Markdown serializer handler metadata to prevent stack overflows when generating processed Markdown containing bold or italic text with mdast-util-to-markdown 2.1.3.

## 1.0.15

### Patch Changes

- [`ff5c29f`](https://github.com/vezham/fumadocs/commit/ff5c29f7e34418dc634ade152dee4cf45a08bd59) Thanks [@suresh-vtpl](https://github.com/suresh-vtpl)! - Version Bump

## 1.0.14

### Patch Changes

- [`9ecdbd7`](https://github.com/vezham/fumadocs/commit/9ecdbd7719a76395c9bf0771149037a6f2365c51) Thanks [@vx-vigneshwaran](https://github.com/vx-vigneshwaran)! - ver bump

## 1.0.9

### Patch Changes

- [`f2b8198`](https://github.com/vezham/fumadocs/commit/f2b8198368cd18e6495f4637a5a6a97bcafe7061) Thanks [@vx-vigneshwaran](https://github.com/vx-vigneshwaran)! - ver bump

## 1.0.8

### Patch Changes

- [#11](https://github.com/vezham/fumadocs/pull/11) [`64c5a62`](https://github.com/vezham/fumadocs/commit/64c5a625f937169fac2c8a0f56a938de40e6f40a) Thanks [@github-actions](https://github.com/apps/github-actions)! - ver bump

### Introduce `@fumari/image-size`, replacing `image-size` in `remarkImage`

A fork of [probe-image-size](https://github.com/nodeca/probe-image-size) with no dependencies of its own.

```ts
import { probe, imageSize } from "@fumari/image-size";

await probe("./public/banner.png"); // { width: 1200, height: 630, type: 'png', mime: 'image/png' }
await probe("https://example.com/banner.png", { timeout: 5000 });

imageSize(bytes); // the same result, or `null`
```

`remarkImage` now uses it in both `fumadocs-core` and `@fumadocs/satteri`. Remote images are no longer downloaded in full just to be measured, and redirects are followed. Sizes are always in pixels, so an SVG sized in `em` or `pt` is converted instead of being skipped. Remote requests also time out after 30 seconds by default.

One behaviour difference worth knowing: the supported formats are avif/heic/heif, bmp, gif, ico, jpeg, png, psd, svg, tiff and webp. Sizes for jxl, tga, pnm, dds, icns, cur, ktx and jp2 can no longer be resolved and go through `onError` instead.

Sequential scanning stops after 512 KB, but that never loses an image: the one format that stores its dimensions past that point — TIFF with a trailing IFD — is resolved by following the header's pointer with a targeted read, using an HTTP `Range` request for remote files (and skipping through the body when the server ignores ranges).
