function parseStatus(statusImage) {
    if (statusImage.includes('win')) {
        return 'win'
    }
    return statusImage.includes('loss') ? 'loss' : 'storno'
}

function parseTable() {
    const result = {items: {}, keys: []}

    const tbody = document.querySelector('#showMoreTable tbody')
    for (let i = 0; i < tbody.children.length; i++) {
        const tr = tbody.children[i]
        if (tr.className === 'row-loss' || tr.className === 'row-win') {
            const key = tr.children[0].textContent
            result.items[key] = []
            result.keys.push(key)
        } else {
            const date = tr.children[0].textContent.split('\n')[1].trim()
            const statusImage = tr.children[1].children[0].alt
            const status = parseStatus(statusImage)
            const kurz = Number(tr.children[2].textContent)
            const money = Number(tr.children[3].textContent.split('/')[0])
            const key = result.keys[result.keys.length - 1]
            result.items[key].push({status, date, kurz, money})
        }
    }

    return result
}

const result = parseTable()

// profits total
(() => {
    return result.keys.map((key) => {
        const results = result.items[key].filter(result => result.status !== 'storno')

        return results.reduce((acc, result) => {
            const profit = result.status === 'win' ? (result.money * (result.kurz - 1)) : (result.money * -1)
            return acc + profit
        }, 0)
    })
})()

// if tickets per day were AKU tickets
(() => {
    return result.keys.map((key) => {
        const results = result.items[key].filter(result => result.status !== 'storno')
        const map = {}

        results.forEach((result) => {
            map[result.date] = [...(map[result.date] ?? []), result]
        })
        return Object.keys(map).reduce((acc, key) => {
            const dayResults = map[key]
            const kurz = dayResults.reduce((acc, dayResult) => acc * dayResult.kurz, 1)
            const money = dayResults.reduce((acc, dayResult) => acc + dayResult.money, 0)
            const status = dayResults.every(dayResult => dayResult.status === 'win') ? 'win' : 'loss'
            const profit = status === 'win' ? (money * (kurz - 1)) : (money * -1)
            return acc + profit
        }, 0)
    })
})()

// if tickets were AKU every 2 after each other ([1,2], [3,4], [5,6])
(() => {
    return result.keys.map((key) => {
        const results = result.items[key].filter(result => result.status !== 'storno').reverse()
        const map = {}

        results.forEach((result, index) => {
            const newIndex = Math.floor(index / 2)
            // second combination of AKU tickes => [1], [2,3], [4,5], [6]...
            // const newIndex = Math.floor((index + 1) / 2)
            map[newIndex] = [...(map[newIndex] ?? []), result]
        })
        return Object.keys(map).reduce((acc, key) => {
            const dayResults = map[key]
            const kurz = dayResults.reduce((acc, dayResult) => acc * dayResult.kurz, 1)
            const money = dayResults.reduce((acc, dayResult) => acc + dayResult.money, 0)
            const status = dayResults.every(dayResult => dayResult.status === 'win') ? 'win' : 'loss'
            const profit = status === 'win' ? (money * (kurz - 1)) : (money * -1)
            return acc + profit
        }, 0)
    })
})()
