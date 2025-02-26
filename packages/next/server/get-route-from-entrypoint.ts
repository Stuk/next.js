import getRouteFromAssetPath from '../shared/lib/router/utils/get-route-from-asset-path'

// matches pages/:page*.js
const SERVER_ROUTE_NAME_REGEX = /^pages[/\\](.*)$/
// matches root/:path*.js
const ROOT_ROUTE_NAME_REGEX = /^root[/\\](.*)$/
// matches static/pages/:page*.js
const BROWSER_ROUTE_NAME_REGEX = /^static[/\\]pages[/\\](.*)$/

function matchBundle(regex: RegExp, input: string): string | null {
  const result = regex.exec(input)

  if (!result) {
    return null
  }

  return getRouteFromAssetPath(`/${result[1]}`)
}

export default function getRouteFromEntrypoint(
  entryFile: string,
  root?: boolean
): string | null {
  let pagePath = matchBundle(SERVER_ROUTE_NAME_REGEX, entryFile)

  if (pagePath) {
    return pagePath
  }

  if (root) {
    pagePath = matchBundle(ROOT_ROUTE_NAME_REGEX, entryFile)
    if (pagePath) return pagePath
  }

  // Potentially the passed item is a browser bundle so we try to match that also
  return matchBundle(BROWSER_ROUTE_NAME_REGEX, entryFile)
}
