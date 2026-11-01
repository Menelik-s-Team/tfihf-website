// Registration shim for the suppress-css-loader.mjs ESM hook.
// Used via NODE_OPTIONS='--import ./scripts/suppress-css-register.mjs'
import { register } from 'node:module'
import { pathToFileURL } from 'node:url'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

register(pathToFileURL(path.join(__dirname, 'suppress-css-loader.mjs')).href, import.meta.url)
