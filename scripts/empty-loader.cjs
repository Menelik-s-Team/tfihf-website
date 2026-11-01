// Webpack loader that returns an empty module.
// Used to swallow CSS imports in the server bundle — Node.js ESM cannot
// evaluate .css files, and Payload's UI package imports react-image-crop's
// CSS transitively, crashing the Next.js page-data collection worker.
module.exports = function emptyLoader() {
  return 'module.exports = {};'
}
