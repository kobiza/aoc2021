import _ from 'lodash'
import input from './input'
import example from './example'
import {part1Tests, part2Tests} from './testsData'
import testRunner from "../../utils/testRunner";

const inputParser = (input) => input.split('\n').map(v => v.split('').map(s => parseInt(s)))

const getAdjacent = (matrixSize, coordinates) => {
    const outOfRange = ([row, col]) => {
        return row < 0 || row > matrixSize.height - 1 || col < 0 || col > matrixSize.width - 1
    }

    const [cellRow, cellCol] = coordinates


    return [[0, -1], [0, 1], [-1, 0], [1, 0]].map(([rowAdd, colAdd]) => {

        return [cellRow + rowAdd, cellCol + colAdd]
    }).filter(c => !outOfRange(c))
}

const part1 = (input) => {
    const matrixSize = {
        width: input[0].length,
        height: input.length,
    }

    const lowPoints = []
    for (let i = 0; i < input.length; i++) {
        for (let j = 0; j < input.length; j++) {
            const cellHeight = input[i][j]
            const adjacent = getAdjacent(matrixSize, [i,j])

            const isLow = _.every(adjacent, adjacentCoordinates => {
                const [aRow, aCol] = adjacentCoordinates

                return input[aRow][aCol] > cellHeight
            })

            if (isLow) {
                lowPoints.push(cellHeight + 1)
            }
        }
    }

    return _.sum(lowPoints)
}

const part2 = (input) => {
    const matrixSize = {
        width: input[0].length,
        height: input.length,
    }
    const visited = {}
    const basins = []

    const toStrCoords = ([y,x]) => `${y},${x}`
    const isVisited = (coords) => !!visited[toStrCoords(coords)]
    const visit = (coords) => visited[toStrCoords(coords)] = true

    const findRec = (cell) => {
        const [row, col] = cell
        const cellHeight = input[row][col]

        if (isVisited(cell)) {
            return 0
        }

        visit(cell)

        if (cellHeight === 9) {
            return 0
        }

        const adjacent = getAdjacent(matrixSize, cell)
        return 1 + _(adjacent).map(a => findRec(a, false)).sum()
    }

    for (let i = 0; i < input.length; i++) {
        for (let j = 0; j < input.length; j++) {
            const basinSize = findRec([i, j], true)
            basins.push(basinSize)
        }
    }

    const sorted = _.sortBy(basins)

    const topThree = sorted.slice(sorted.length - 3)

    return topThree[0] * topThree[1] * topThree[2]
}

const runPart1Tests = () => testRunner.runTests(part1, part1Tests)
const runPart2Tests = () => testRunner.runTests(part2, part2Tests)

export default {
    part1,
    part2,
    inputParser,
    parsedInput: inputParser(input),
    parsedExample: inputParser(example),
    runPart1Tests,
    runPart2Tests
}
