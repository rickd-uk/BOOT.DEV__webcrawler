import { normalizeURL } from './crawl.js';
import { test, expect } from '@jest/globals'

test('normalizeURL strip protocol', () => {
    const input = 'https://bbc.com/path'
    const actual = normalizeURL(input)
    const expected = 'bbc.com/path'
    expect(actual).toEqual(expected)
})

