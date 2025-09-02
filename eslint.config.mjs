import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

const eslintConfig = [
  { ignores: ['.next/*', 'node_modules/*', 'next-env.d.ts', 'svgr.d.ts'] },

  ...compat.config({
    extends: ['next/core-web-vitals', 'next/typescript', 'prettier'],
  }),

  // import 정렬 규칙
  {
    settings: {
      // TS alias 해석 (내부/외부 구분 정확히)
      'import/resolver': {
        typescript: true,
        node: true,
      },
    },
    rules: {
      // 중복 충돌 방지: import/order만 사용
      'sort-imports': 'off',

      'import/order': [
        'error',
        {
          groups: [
            ['builtin', 'external'], // 1) 외부
            'internal', // 2) 내부 (alias)
            ['parent', 'sibling'],
            'index',
            'object',
          ],

          // ── 서브그룹: internal 안에서의 순서 ──────────────────────────
          pathGroups: [
            { pattern: '@/**', group: 'internal', position: 'before' },
            { pattern: '@*', group: 'internal', position: 'after' },
          ],

          pathGroupsExcludedImportTypes: ['builtin', 'external', 'react'],

          'newlines-between': 'always-and-inside-groups',

          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
    },
  },
];

export default eslintConfig;
