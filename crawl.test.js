import { normalizeURL } from './crawl.js';
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

