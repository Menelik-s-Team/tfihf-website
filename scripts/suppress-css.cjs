// Node.js CJS require hook that silences .css file imports.
// Used via NODE_OPTIONS='--require ./scripts/suppress-css.cjs'
// during Next.js build to prevent ERR_UNKNOWN_FILE_EXTENSION when
// Payload's UI package (via @payloadcms/ui) imports react-image-crop CSS.
const Module = require('module');
const originalLoad = Module._load;
Module._load = function (request, parent, isMain) {
  if (request.endsWith('.css') || request.endsWith('.scss') || request.endsWith('.sass')) {
    return {};
  }
  return originalLoad.apply(this, arguments);
};
