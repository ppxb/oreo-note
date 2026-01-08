import antfu from '@antfu/eslint-config'

export default antfu({
  formatters: true,
  pnpm: true,
  rules: {
    'node/prefer-global/process': 'off',
  },
})
