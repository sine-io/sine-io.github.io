export default {
  multipass: true,
  plugins: [
    'preset-default',
    {
      name: 'removeDimensions',
      active: true
    },
    {
      name: 'cleanupIds',
      active: true
    }
  ]
}
