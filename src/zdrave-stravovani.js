var result = Array.from({length: 5})

function printResult() {
    const resultEl = document.querySelector('.vnor')
    resultEl.removeChild(resultEl.lastElementChild)
    const resultDiv = document.createElement('div')

    result.forEach(({day, items}) => {
        const itemsArray = Object.values(items)
        if (!itemsArray.some(item => item.count)) {
            return
        }

        const divDay = document.createElement('div')
        divDay.textContent = day
        resultDiv.appendChild(divDay)
        itemsArray.sort((a, b) => a.chod.localeCompare(b.chod)).forEach(item => {
            if (item.count) {
                const divChod = document.createElement('div')
                divChod.textContent = `${item.count}x ${item.chod} (${item.menu})`
                resultDiv.appendChild(divChod)
            }
        })
        resultDiv.appendChild(document.createElement('br'))
    })

    resultEl.appendChild(resultDiv)
}

function parseTable() {
    const dates = document.querySelectorAll('.jidelnicek_nadpis')
    const tables = document.querySelectorAll('table.jidelnicky_tab')

    dates.forEach((date, index) => {
        result[index] = {day: date.textContent, items: {}}
    })

    tables.forEach((table, index) => {
        for (let i = 1; i < table.children[0].children.length; i++) {
            const tr = table.children[0].children[i]
            const chod = tr.children[0].textContent.trim()
            const menu = tr.children[2].textContent.trim()
            const buttonAdd = document.createElement('button')
            buttonAdd.textContent = '+'
            buttonAdd.addEventListener("click", function (e) {
                const items = result[index].items
                const count = items[chod] ? (items[chod].count + 1) : 1
                items[chod] = {chod, menu, count}
                printResult()
            })
            const buttonRemove = document.createElement('button')
            buttonRemove.textContent = '-'
            buttonRemove.addEventListener("click", function (e) {
                const items = result[index].items
                if (items[chod] && items[chod].count > 0) {
                    items[chod] = {chod, menu, count: items[chod].count - 1}
                    printResult()
                }
            })
            const tdAdd = document.createElement('td')
            tdAdd.appendChild(buttonAdd)
            const tdRemove = document.createElement('td')
            tdRemove.appendChild(buttonRemove)
            tr.appendChild(tdAdd)
            tr.appendChild(tdRemove)
        }
    })
}

parseTable()
