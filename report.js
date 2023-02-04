function sortPages(pages) {
    const pagesArr = Object.entries(pages)

    pagesArr.sort((a, b) => {
        // From greatest to least value
        return b[1] - a[1]
    })
    return pagesArr
}


export { sortPages }