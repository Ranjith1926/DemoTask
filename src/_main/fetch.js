import 'whatwg-fetch'
import { parseJSON, checkStatus } from './utils'

export default function callFetch(url, options = {}) {
  return fetch(url, options).then(checkStatus).then(parseJSON)
}
