var a = $0.innerHTML.trim().split('\n')
var numbers = a[0].split(',')
var boardsStrArr = a.slice(1).filter(v => v !== '')
var getBoard = (boardRows) => {
    return boardRows.map((numsStr) => {
        return numsStr.trim().replaceAll('  ', ' ').replaceAll(' ', ',').split(',')
    })

}

var getBoardsInput = (arr, size = 5) => {
    const numberOfBoards = arr.length / size
    const boards = []

    for (let startLine = 0; startLine < arr.length; startLine+=size) {
        const boardRows = []
        for (let i = startLine; i < startLine + size; i++) {
            boardRows.push(arr[i])
        }

        boards.push(getBoard(boardRows))
    }

    return boards
}
var boardsInput = getBoardsInput(boardsStrArr)


var y2021d4q1 = (boards, nums) => {
    const marks = boards.map(() => ({}))
    const markIfNeeded = (boardIndex, num) => {
        for (let x = 0; x < 5; x++) {
            for (let y = 0; y < 5; y++) {
                if (boards[boardIndex][x][y] === num) {
                    marks[boardIndex][`${x},${y}`] = true
                    return true
                }
            }
        }

        return false
    }

    const isBoardWin = (boardIndex) => {
        const boardMarks = marks[boardIndex]

        const indexes = Object.keys(boardMarks).map(v => v.split(','))

        const rowsCounters = [0,0,0,0,0]
        const closCounters = [0,0,0,0,0]

        for (let i = 0; i < indexes.length; i++) {
            const [row, col] = indexes[i]

            rowsCounters[row]++
            closCounters[col]++

            if (rowsCounters[row] === 5 || closCounters[col] === 5) {
                return true
            }
        }

        return false
    }

    const getResultForBoard = (boardIndex, lastNumber) => {
        let sum = 0
        const boardMarks = marks[boardIndex]

        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
                const key = `${i},${j}`

                if (!boardMarks[key]) {
                    sum += parseInt(boards[boardIndex][i][j])
                }
            }
        }

        return sum * parseInt(lastNumber)
    }

    for (let i = 0; i < nums.length; i++) {
        for (let j = 0; j < boards.length; j++) {
            const isMarked = markIfNeeded(j, nums[i])

            if (isMarked && isBoardWin(j)) {
                return getResultForBoard(j, nums[i]);
            }
        }
    }

    return -1
}

var y2021d4q2 = (boards, nums) => {
    const marks = boards.map(() => ({}))
    const markIfNeeded = (boardIndex, num) => {
        for (let x = 0; x < 5; x++) {
            for (let y = 0; y < 5; y++) {
                if (boards[boardIndex][x][y] === num) {
                    marks[boardIndex][`${x},${y}`] = true
                    return true
                }
            }
        }

        return false
    }

    const isBoardWin = (boardIndex) => {
        const boardMarks = marks[boardIndex]

        const indexes = Object.keys(boardMarks).map(v => v.split(','))

        const rowsCounters = [0,0,0,0,0]
        const closCounters = [0,0,0,0,0]

        for (let i = 0; i < indexes.length; i++) {
            const [row, col] = indexes[i]

            rowsCounters[row]++
            closCounters[col]++

            if (rowsCounters[row] === 5 || closCounters[col] === 5) {
                return true
            }
        }

        return false
    }

    const getResultForBoard = (boardIndex, lastNumber) => {
        let sum = 0
        const boardMarks = marks[boardIndex]

        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
                const key = `${i},${j}`

                if (!boardMarks[key]) {
                    sum += parseInt(boards[boardIndex][i][j])
                }
            }
        }

        return sum * parseInt(lastNumber)
    }

    const markedBoards = {}
    let lastWinIndex;
    for (let i = 0; i < nums.length; i++) {
        for (let j = 0; j < boards.length; j++) {
            if (!markedBoards[j]) {
                const isMarked = markIfNeeded(j, nums[i])

                if (isMarked && isBoardWin(j)) {
                    markedBoards[j] = true

                    if (Object.keys(markedBoards).length === boards.length) {
//                         const lastIndex = boards.findIndex((_v, _i) => !markedBoards[_i])

                        return getResultForBoard(j, nums[i])
                    }
                    // return getResultForBoard(j, nums[i]);
                }

                if (Object.keys(markedBoards).length === boards.length - 1) {
                    lastWinIndex = boards.findIndex((_v, _i) => !markedBoards[_i]);
                }
            }

        }
    }

    return -1
}
