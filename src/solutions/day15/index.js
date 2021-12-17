import _ from 'lodash'
import input from './input'
import example from './example'
import {part1Tests, part2Tests} from './testsData'
import testRunner from "../../utils/testRunner";

const inputParser = (input) => input.split('\n').map(v => v.split('').map(n => parseInt(n)))

const getAdjacent = (matrixSize, coordinates) => {
    const outOfRange = ([row, col]) => {
        return row < 0 || row > matrixSize.height - 1 || col < 0 || col > matrixSize.width - 1
    }

    const [cellRow, cellCol] = coordinates


    return [[0, -1], [0, 1], [-1, 0], [1, 0]].map(([rowAdd, colAdd]) => {

        return [cellRow + rowAdd, cellCol + colAdd]
    }).filter(c => !outOfRange(c))
}

const toStrCoords = (coords) => `${coords[0]},${coords[1]}`

const getRightBottomAdjacent = (matrixSize, coordinates) => {
    const outOfRange = ([row, col]) => {
        return row < 0 || row > matrixSize.height - 1 || col < 0 || col > matrixSize.width - 1
    }

    const [cellRow, cellCol] = coordinates


    return [[0, 1], [1, 0]].map(([rowAdd, colAdd]) => {

        return [cellRow + rowAdd, cellCol + colAdd]
    }).filter(c => !outOfRange(c))
}

const part1 = (input) => {
    const isEnd = (coordinates) => coordinates[0] === matrixSize.height - 1 && coordinates[1] === matrixSize.width - 1
    const isStart = (coordinates) => coordinates[0] === 0 && coordinates[1] === 0
    const matrixSize = {
        width: input[0].length,
        height: input.length,
    }

    let currentCell = {
        coords: [0,0],
        risk: 0
    }
    const stack = []
    const visited = {}
    // const coordsCounter = {}

    const risks = []
    while (currentCell) {
        const {coords: cellCoords, risk: cellRisk} = currentCell
        // coordsCounter[toStrCoords(cellCoords)] = coordsCounter[toStrCoords(cellCoords)] || 0
        // coordsCounter[toStrCoords(cellCoords)]++
        // console.log(`${toStrCoords(cellCoords)} counter: (${coordsCounter[toStrCoords(cellCoords)]}) risk: (${visited[toStrCoords(cellCoords)]}) -> (${cellRisk})`)
        visited[toStrCoords(cellCoords)] = cellRisk

        if (isEnd(cellCoords)) {
            risks.push(cellRisk)
        } else {
            const myAdjacent = _(getAdjacent(matrixSize, cellCoords))
                .map(nextCellCoords => {
                    const nextCellRisk = cellRisk + input[nextCellCoords[0]][nextCellCoords[1]]
                    return {
                        coords: nextCellCoords,
                        risk: nextCellRisk
                    }
                })
                .filter(a => _.isUndefined(visited[toStrCoords(a.coords)]) || a.risk < visited[toStrCoords(a.coords)])
                .sortBy(v => v.risk)
                .value()

            _.forEach(myAdjacent, ({coords: cellToAdd, risk: nextCellRisk}) => {
                const existCell = stack.find(({coords}) => {
                    return coords[0] === cellToAdd[0] && coords[1] === cellToAdd[1]
                })

                if (existCell) {
                    existCell.risk = _.min([existCell.risk, nextCellRisk])
                } else {
                    stack.push({
                        coords: cellToAdd,
                        risk: nextCellRisk
                    })
                }
            })

        }

        currentCell = stack.shift()
    }

    return _.min(risks)
}

const mapMatrix = (mat, p) => {
    return mat.map((row, rowIndex) => row.map((cell, colIndex) => {
        return p(cell, rowIndex, colIndex)
    }))
}

const p5 = input => {
    const matrixSize = {
        width: input[0].length,
        height: input.length,
    }
    const toHuge = (mat) => {
        const rows = _.map(mat, row => [...row, ...row, ...row, ...row, ...row])

        return [
            ...rows.map(row => [...row]),
            ...rows.map(row => [...row]),
            ...rows.map(row => [...row]),
            ...rows.map(row => [...row]),
            ...rows.map(row => [...row]),
        ]
    }

    const newMatrix = toHuge(input)

    let currCell = {
        coords: [0,0],
        depth: 0
    }
    const stack = []
    const visited = {
        '0,0': true
    }
    const depthMap = {}
    while(currCell) {

        depthMap[currCell.depth] = depthMap[currCell.depth] || []
        depthMap[currCell.depth].push(currCell.coords)

        const adjacent = getAdjacent({width: 5, height: 5}, currCell.coords).filter(v => !visited[toStrCoords(v)])
        _.forEach(adjacent, a => {
            visited[toStrCoords(a)] = true
            stack.push({
                coords: a,
                depth: currCell.depth + 1
            })
        })
        currCell = stack.shift()
    }

    const depthToFix = _.keys(depthMap).map(v => parseInt(v)).filter(d => d !== 0)

    _.forEach(depthToFix, (d) => {
        const matForDepth = mapMatrix(input, v => {
            const newVal = v + d

            return newVal > 9 ? newVal - 9 : newVal
        })

        const coordsToFix = depthMap[d].map(([row, col]) => [row * matrixSize.height, col * matrixSize.width])

        _.forEach(coordsToFix, ([rowToAdd, colToAdd]) => {
            for (let i = 0; i < matForDepth.length; i++) {
                for (let j = 0; j < matForDepth[0].length; j++) {
                    const row = i + rowToAdd
                    const col = j + colToAdd
                    newMatrix[row][col] = matForDepth[i][j]
                }
            }
        })
    })

    return newMatrix
}

const part2 = (input) => {
    const newMatrix = p5(input)

    // return newMatrix
    return part1(newMatrix)
}

const logMatrix = (mat) => {
    let text = ''
    for (let i = 0; i < mat.length; i++) {
        for (let j =0; j < mat[0].length; j++) {
            text += mat[i][j]
        }
        text += '\n'
    }

    console.log(text)
}
const logsUtils = {
    logMatrix: (mat) => {
        const newMat = mapMatrix(mat, (v, i, j) => {
            return `(${v})`
        })

        logMatrix(newMat)
    },
    logP5: (mat) => {
        const newMat = p5(mat)

        logMatrix(newMat)
    },
    logMatrixCoords: (mat) => {
        const newMat = mapMatrix(mat, (v, i, j) => {
            return `[${i},${j}]`
        })

        logMatrix(newMat)
    }
}

const runPart1Tests = () => testRunner.runTests(part1, part1Tests)
const runPart2Tests = () => testRunner.runTests(part2, part2Tests)

export default {
    part1,
    part2,
    inputParser,
    logsUtils,
    parsedInput: inputParser(input),
    parsedExample: inputParser(example),
    runPart1Tests,
    runPart2Tests
}
