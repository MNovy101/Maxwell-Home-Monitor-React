// maxwell-dashboard/vitest.config.js
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'node',
    globals: true,
    resolve: {
      alias: [{ find: '@', replacement: `${__dirname}/src` }]
    }
  }
})
