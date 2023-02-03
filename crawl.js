function normalizeURL(urlString) {
    const urlObj = new URL(urlString)
    return `${urlObj.hostname}${urlObj.pathname}`
}

export { normalizeURL }