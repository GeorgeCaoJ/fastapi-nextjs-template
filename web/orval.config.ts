import { defineConfig } from 'orval';

export default defineConfig({
  api: {
    output: {
      mode: 'tags-split',
      target: 'lib/api',
      schemas: 'lib/api/models',
      client: 'fetch',
      baseUrl: '',
      mock: true,
      prettier: true,
      override: {
        mutator: {
          path: 'lib/api/custom-fetch.ts',
          name: 'customFetch',
        },
      },
    },
    input: {
      target: './openapi.json',
    },
  },
}); 