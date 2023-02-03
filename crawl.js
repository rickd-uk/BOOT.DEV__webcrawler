import { JSDOM } from 'jsdom'


function getURLsFromHTML(htmlBody, baseURL) {
    const urls = []
    const dom = new JSDOM(htmlBody)
    const linkElements = dom.window.document.querySelectorAll('a')
    for (const element of linkElements) {
        if (element.href.slice(0, 1) === '/') {
            // Relative Url
            try {
                const urlObj = new URL(`${baseURL}${element.href}`)
                urls.push(urlObj.href)
            } catch (err) {
                console.log(`Error with relative url: ${err.message}`)
            }

        } else {
            // Absolute Url
            try {
                const urlObj = new URL(element.href)
                urls.push(urlObj.href)
            } catch (err) {
                console.log(`Error with absolute url: ${err.message}`)
            }
        }

    }
    return urls
}

function normalizeURL(urlString) {
    const urlObj = new URL(urlString)
    const hostPath = `${urlObj.hostname}${urlObj.pathname}`
    if (hostPath.length > 0 && hostPath.slice(-1) === '/') {
        return hostPath.slice(0, -1)
    }
    return hostPath
}

export { getURLsFromHTML, normalizeURL }