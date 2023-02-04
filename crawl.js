import { JSDOM } from 'jsdom'

async function crawlPage(currentURL) {
    console.log(`Actively crawling: ${currentURL}`)

    try {
        const res = await fetch(currentURL)

        if (res.status > 399) {
            console.log(`error in fetch with status code ${res.status} on page ${currentURL}`)
            return
        }

        const contentType = res.headers.get("content-type")

        if (!contentType.includes('text/html')) {
            console.log(`not a html response ${contentType} on page ${currentURL}`)
            return
        }


        console.log(await res.text())
    } catch (err) {
        console.log(`error fetching webpage: ${err.message} on ${currentURL}`)
    }
}

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

export { crawlPage, getURLsFromHTML, normalizeURL }