// ESM custom loader hook to suppress .css/.scss/.sass imports.
// Registered via --import ./scripts/suppress-css-register.mjs
// Prevents ERR_UNKNOWN_FILE_EXTENSION when @payloadcms/ui imports
// react-image-crop/dist/ReactCrop.css during Next.js page-data collection.
export async function resolve(specifier, context, nextResolve) {
  if (
    specifier.endsWith('.css') ||
    specifier.endsWith('.scss') ||
    specifier.endsWith('.sass')
  ) {
    return { shortCircuit: true, url: 'data:text/javascript,export default {}' }
  }
  return nextResolve(specifier, context)
}

export async function load(url, context, nextLoad) {
  if (url.startsWith('data:text/javascript,')) {
    return { format: 'module', shortCircuit: true, source: url.replace('data:text/javascript,', '') }
  }
  return nextLoad(url, context)
}
