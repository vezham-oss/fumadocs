## @fumadocs/local-content@0.2.1

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

### Simplify cache

## @fumadocs/local-content@0.2.0

### Redesign source API

Content sources can hook into the static loader they are attached to, and dynamic sources can opt out of the loader's in-memory file cache.

`configureStatic` runs when a source is attached to `loader()`, and again whenever `dynamicLoader()` builds a new static loader:

```ts
export function createMySource(): DynamicSource {
  return {
    cache: "custom",
    async files() {
      return loadFiles();
    },
    configureStatic({ loader, source }) {
      // `loader` is the created static loader
      // `source` is the record key when using named sources
    },
    configure(loader, { source }) {
      loader.invalidate();
    },
  };
}
```

- `cache: 'memory'` (default): `files()` is called once until `invalidate()`.
- `cache: 'custom'`: the source caches itself. `dynamicLoader()` re-runs `files()` on `get()` and rebuilds only when the file list is shallowly different (by identity).

### Integrations

GraphQL cross-links are generated from the attached loader instead of a `baseUrl` option on `staticSource()`. Local, OpenAPI, and AsyncAPI `dynamicSource()` use `cache: 'custom'` and reuse generated files by identity until `invalidate()`.

Sanity now uses `cache: 'custom'` when given a `sanityFetch` from `next-sanity/live`, calling `invalidate()` in draft mode is no longer needed.

### Read files in bounded chunks during a cold scan

`getFiles()` awaits each chunk before starting the next, instead of starting the entire tree concurrently.

## @fumadocs/local-content@0.1.2

### Obsidian content source v1

Render Obsidian vaults directly through static or dynamic Fumadocs sources, with lazy in-memory compilation and local content hot reload. Remove the old generated-file and remark-plugin integrations.

Resolve URL-encoded relative file links against their decoded source paths.

## @fumadocs/local-content@0.1.1

### Extract shared local content source logic to `@fumadocs/local-content`
