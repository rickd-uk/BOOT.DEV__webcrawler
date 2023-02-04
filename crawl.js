import { JSDOM } from 'jsdom'

async function crawlPage(baseURL, currentURL, pages) {


    const baseURLObj = new URL(baseURL)
    const currentURLObj = new URL(currentURL)

    // don't proceed if the page is not equal to the base hostname
    // i.e. don't crawl outside the website
    if (baseURLObj.hostname !== currentURLObj.hostname) {
        console.log(pages)
        return pages
    }

    const normalizedCurrentURL = normalizeURL(currentURL)
    if (pages[normalizedCurrentURL] > 0) {
        pages[normalizedCurrentURL]++
        return pages
    }

    pages[normalizedCurrentURL] = 1
    console.log(`Actively crawling: ${currentURL}`)


    try {
        const res = await fetch(currentURL)

        if (res.status > 399) {
            console.log(`error in fetch with status code ${res.status} on page ${currentURL}`)
            return pages
        }

        const contentType = res.headers.get("content-type")

        if (!contentType.includes('text/html')) {
            console.log(`not a html response ${contentType} on page ${currentURL}`)
            return pages
        }

        const htmlBody = await res.text()

        const nextURLs = getURLsFromHTML(htmlBody, baseURL)

        for (const nextURL of nextURLs) {
            pages = await crawlPage(baseURL, nextURL, pages)
        }



    } catch (err) {
        console.log(`error fetching webpage: ${err.message} on ${currentURL}`)
    }
    return pages
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