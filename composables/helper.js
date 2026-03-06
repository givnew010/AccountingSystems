export function getDefaultValues(Structure) {
  const defaults = {}
  Object.keys(Structure).forEach((key) => {
    const val = Structure[key]
    if (val && typeof val === 'object' && 'default' in val) {
      defaults[key] = val.default
    } else {
      defaults[key] = val
    }
  })
  return defaults
}
