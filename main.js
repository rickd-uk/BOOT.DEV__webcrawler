import { crawlPage } from './crawl.js'

function main() {
    if (process.argv.length < 3) {
        console.log('no website')
        process.exit(1)
    }
    if (process.argv.length > 3) {
        console.log('too many args')
        process.exit(1)
    }
    const baseURL = process.argv[2]

    console.log(`starting crawl for ${baseURL}`)
    crawlPage(baseURL)
}

main()