import _ from 'lodash'
import input from './input'
import example from './example'
import {part1Tests, part2Tests} from './testsData'
import testRunner from "../../utils/testRunner";

const inputParser = (input) => input.split('\n').map(r => r.split('').map(n => parseInt(n)))

const mapMatrix = (mat, p) => {
    return mat.map((row, rowIndex) => row.map((cell, colIndex) => {
        return p(cell, rowIndex, colIndex)
    }))
}

const anyInMatrix = (mat, p) => {
    for (let i = 0; i < mat.length; i++) {
        for (let j = 0; j < mat[0].length; j++) {
            const cell = mat[i][j]

            if (p(cell,i, j)) {
                return true
            }
        }
    }

    return false
}

const everyInMatrix = (mat, p) => {
    for (let i = 0; i < mat.length; i++) {
        for (let j = 0; j < mat[0].length; j++) {
            const cell = mat[i][j]

            if (!p(cell,i, j)) {
                return false
            }
        }
    }

    return true
}

const getAdjacent = (mat, coordinates) => {
    const height = mat.length
    const width = mat[0].length

    const outOfRange = ([row, col]) => {
        return row < 0 || row > height - 1 || col < 0 || col > width - 1
    }

    const [cellRow, cellCol] = coordinates


    return [[0, -1], [0, 1], [-1, 0], [1, 0], [-1, -1], [1, 1], [-1, 1], [1, -1]].map(([rowAdd, colAdd]) => {

        return [cellRow + rowAdd, cellCol + colAdd]
    }).filter(c => !outOfRange(c))
}

const part1 = (input, steps = 1) => {
    const applyFlashes = (matrix) => {
        const newMat = mapMatrix(matrix, v => v)
        for (let i = 0; i < newMat.length; i++) {
            for (let j = 0; j < newMat[0].length; j++) {
                const cell = newMat[i][j]

                if (cell > 9) {
                    newMat[i][j] = 0
                    const adjacent = getAdjacent(newMat, [i, j]).filter(([row, col]) => newMat[row][col] !== 0)

                    _.forEach(adjacent, ([row, col]) => {
                        newMat[row][col] += 1
                    })
                }
            }
        }

        return newMat
    }

    const increaseEnergy = (matrix) => {
        let result = mapMatrix(matrix, v => v + 1)
        while (anyInMatrix(result ,v => v > 9)) {
            result = applyFlashes(result)
        }

        return result
    }

    const getEnergy = (mat) => {
        let counter = 0;
        for (let i = 0; i < mat.length; i++) {
            for (let j = 0; j < mat[0].length; j++) {
                if (mat[i][j] === 0) {
                    counter++
                }
            }
        }

        return counter
    }

    let r = mapMatrix(input, v => v)
    let totalEnergy = 0
    for (let i = 0; i < steps; i++) {
        r = increaseEnergy(r)

        totalEnergy += getEnergy(r)
    }

    return totalEnergy
}

const part2 = (input) => {
    const applyFlashes = (matrix) => {
        const newMat = mapMatrix(matrix, v => v)
        for (let i = 0; i < newMat.length; i++) {
            for (let j = 0; j < newMat[0].length; j++) {
                const cell = newMat[i][j]

                if (cell > 9) {
                    newMat[i][j] = 0
                    const adjacent = getAdjacent(newMat, [i, j]).filter(([row, col]) => newMat[row][col] !== 0)

                    _.forEach(adjacent, ([row, col]) => {
                        newMat[row][col] += 1
                    })
                }
            }
        }

        return newMat
    }

    const increaseEnergy = (matrix) => {
        let result = mapMatrix(matrix, v => v + 1)
        while (anyInMatrix(result ,v => v > 9)) {
            result = applyFlashes(result)
        }

        return result
    }

    const getEnergy = (mat) => {
        let counter = 0;
        for (let i = 0; i < mat.length; i++) {
            for (let j = 0; j < mat[0].length; j++) {
                if (mat[i][j] === 0) {
                    counter++
                }
            }
        }

        return counter
    }

    let r = mapMatrix(input, v => v)
    let totalEnergy = 0
    let i = 1
    while(true) {
        r = increaseEnergy(r)

        if (everyInMatrix(r, v => v === 0)) {
            return i
        }

        i++
    }
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
