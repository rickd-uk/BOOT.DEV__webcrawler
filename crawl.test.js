import { getURLsFromHTML, normalizeURL } from './crawl.js';
import { test, expect } from '@jest/globals'

test('normalizeURL strip protocol', () => {
    const input = 'https://bbc.com/path'
    const actual = normalizeURL(input)
    const expected = 'bbc.com/path'
    expect(actual).toEqual(expected)
})

test('normalizeURL strip trailing slash', () => {
    const input = 'https://bbc.com/path/'
    const actual = normalizeURL(input)
    const expected = 'bbc.com/path'
    expect(actual).toEqual(expected)
})

test('normalizeURL capitals', () => {
    const input = 'https://BBC.com/path'
    const actual = normalizeURL(input)
    const expected = 'bbc.com/path'
    expect(actual).toEqual(expected)
})

test('normalizeURL strip http', () => {
    const input = 'http://bbc.com/path'
    const actual = normalizeURL(input)
    const expected = 'bbc.com/path'
    expect(actual).toEqual(expected)
})


test('getURLsFromHTML absolute', () => {
    const innerHTMLBody = `
      <html>
        <body>
          <a href="https://www.bbc.com">
            BBC Website
          </a>
        </body>
      </html>
    `
    const inputBaseURL = 'https://www.bbc.com'
    const actual = getURLsFromHTML(innerHTMLBody, inputBaseURL)
    const expected = ['https://www.bbc.com/']
    expect(actual).toEqual(expected)
})


test('getURLsFromHTML relative', () => {
    const innerHTMLBody = `
      <html>
        <body>
          <a href="/path/">
            BBC Website
          </a>
        </body>
      </html>
    `
    const inputBaseURL = 'https://www.bbc.com'
    const actual = getURLsFromHTML(innerHTMLBody, inputBaseURL)
    const expected = ['https://www.bbc.com/path/']
    expect(actual).toEqual(expected)
})



test('getURLsFromHTML both', () => {
    const innerHTMLBody = `
      <html>
        <body>
          <a href="https://www.bbc.com/path1/">
            BBC Website - Path One
          </a>
          <a href="/path2/">
            BBC Website - Path Two
          </a>
        </body>
      </html>
    `
    const inputBaseURL = 'https://www.bbc.com'
    const actual = getURLsFromHTML(innerHTMLBody, inputBaseURL)
    const expected = ['https://www.bbc.com/path1/', 'https://www.bbc.com/path2/']
    expect(actual).toEqual(expected)
})




test('getURLsFromHTML invalid url', () => {
    const innerHTMLBody = `
      <html>
        <body>
          <a href="invalid">
            BBC Website
          </a>
        </body>
      </html>
    `
    const inputBaseURL = 'https://www.bbc.com'
    const actual = getURLsFromHTML(innerHTMLBody, inputBaseURL)
    const expected = []
    expect(actual).toEqual(expected)
})
