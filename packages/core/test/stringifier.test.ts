import { expect, test } from 'vitest';
import { remark } from 'remark';
import { unified } from 'unified';
import remarkGfm from 'remark-gfm';
import { defaultHandlers } from 'mdast-util-to-markdown';
import { defaultStringifier } from '@/mdx-plugins/stringifier';

test.each([
  ['**bold**', '**bold**'],
  ['*italic*', '*italic*'],
  ['**bold with *italic* text**', '**bold with *italic* text**'],
  ['*italic with **bold** text*', '*italic with **bold** text*'],
  ['***both***', '***both***'],
  ['~~removed~~', '~~removed~~'],
  ['[**bold link**](https://example.com)', '[**bold link**](https://example.com)'],
])('stringifies attention without recursion: %s', (input, expected) => {
  const processor = remark().use(remarkGfm);
  const tree = processor.parse(input);
  const context = unified().data(processor.data());

  expect(defaultStringifier().call(context, tree, undefined)).toBe(`${expected}\n`);
});

test('preserves handler metadata when wrapping handlers', () => {
  const processor = remark();
  const tree = processor.parse('text');
  const context = unified().data(processor.data());
  const stringify = defaultStringifier({
    handlers: {
      paragraph(node, parent, state, info) {
        for (const type of ['emphasis', 'strong'] as const) {
          expect({ ...state.handlers[type] }).toEqual({ ...defaultHandlers[type] });
        }

        return defaultHandlers.paragraph(node, parent, state, info);
      },
    },
  });

  expect(stringify.call(context, tree, undefined)).toBe('text\n');
});
