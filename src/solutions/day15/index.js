import _ from 'lodash'
import input from './input'
import example from './example'
import {part1Tests, part2Tests} from './testsData'
import testRunner from "../../utils/testRunner";

const inputParser = (input) => input.split('\n').map(v => v.split(''))

const getAdjacent = (matrixSize, coordinates) => {
    const outOfRange = ([row, col]) => {
        return row < 0 || row > matrixSize.height - 1 || col < 0 || col > matrixSize.width - 1
    }

    const [cellRow, cellCol] = coordinates


    return [[0, -1], [0, 1], [-1, 0], [1, 0]].map(([rowAdd, colAdd]) => {

        return [cellRow + rowAdd, cellCol + colAdd]
    }).filter(c => !outOfRange(c))
}

const part1v1 = (input) => {
    const matrixSize = {
        width: input[0].length,
        height: input.length,
    }

    const isEnd = (coordinates) => coordinates[0] === matrixSize.height - 1 && coordinates[1] === matrixSize.width - 1

    const rec = (cellCoords = [0, 0], visited = {}) => {
        const isVisited = (coords) => !!visited[`${coords[0]},${coords[1]}`]
        const adjacent = getAdjacent(matrixSize, cellCoords).filter(childCoords => !isVisited(childCoords))

        const risk = input[cellCoords[0]][cellCoords[1]]
        if (isEnd(cellCoords)) {
            return [[risk]]
        }

        const newVisited = {
            [`${cellCoords[0]},${cellCoords[1]}`]: true,
            ...visited
        }
        return _.flatMap(adjacent, childCoords => {
            return rec(childCoords, newVisited).map(childPaths => [risk, ...childPaths])
        })
    }

    const allPaths = rec([0, 0])

    return allPaths
    // return _(allPaths)
    //     .map(p => _.sum(p))
    //     .max()
}

const part1v2 = (input) => {
    const matrixSize = {
        width: input[0].length,
        height: input.length,
    }

    const isVisited = (coords, visited) => !!visited[`${coords[0]},${coords[1]}`]
    const isEnd = (coordinates) => coordinates[0] === matrixSize.height - 1 && coordinates[1] === matrixSize.width - 1
    const getRisk = (coordsStr) => {
        const [i, j] = coordsStr.split(',')
        return input[i][j]
    }

    const validPaths = []
    const nextCellsToCheck = []
    let currCellData = {
        coords: [0, 0],
        path: ['0,0'],
        visited: {
            '0,0': true
        }
    }
    while (currCellData) {
        if (isEnd(currCellData.coords)) {
            // const endCoordsStr = `${currCellData.coords[0]},${currCellData.coords[1]}`
            validPaths.push(currCellData.path)
        }
        const adjacent = getAdjacent(matrixSize, currCellData.coords).filter(adjacentCoords => !isVisited(adjacentCoords, currCellData.visited))

        adjacent.map(coords => {
            const coordsStr = `${coords[0]},${coords[1]}`
            return {
                coords,
                path: [...currCellData.path, coordsStr],
                visited: {...currCellData.visited, [coordsStr]: true}
            }
        }).forEach(adjacentCellData => nextCellsToCheck.push(adjacentCellData))

        currCellData = nextCellsToCheck.shift()
    }

    // return _(validPaths)
    //     .map(p => p.map(coordsStr => getRisk(coordsStr))).value()
    return _(validPaths)
        .map(p => p.map(coordsStr => getRisk(coordsStr)))
        .map(p => _.sum(p))
        .max()

    // return _(allPaths)

}

const part1 = (input) => {
    const matrixSize = {
        width: input[0].length,
        height: input.length,
    }

    const isVisited = (coords, visited) => !!visited[`${coords[0]},${coords[1]}`]
    const isEnd = (coordinates) => coordinates[0] === matrixSize.height - 1 && coordinates[1] === matrixSize.width - 1
    const getRisk = ([i,j]) => {
        return input[i][j]
    }

    let index = 0
    const validPaths = []
    const allCellsData = {
        0: {
            coords: [0, 0],
            fromIndex: -1
        }
    }

    const getPath = (index) => {
        const path = []

        let currIndex = index
        while(currIndex !== -1) {
            path.unshift(allCellsData[currIndex].coords)
            currIndex = allCellsData[currIndex].fromIndex
        }

        return path
    }

    const getVisitedMap = (path) => {
        return _.reduce(path, (acc, coords) => {
            acc[`${coords[0]},${coords[1]}`] = true

            return acc
        }, {})
    }

    const howPointToMe = {}

    const cleanMaps = (index) => {
        console.log(`start: cleanMaps ${index}`, JSON.stringify({howPointToMe, allCellsData}))
        let currIndexToCheck = index
        let shouldCheck = true
        let counter = 0
        while (currIndexToCheck !== -1 && shouldCheck) {
            const dependencies = howPointToMe[currIndexToCheck]

            const indexToDelete = currIndexToCheck
            currIndexToCheck = allCellsData[currIndexToCheck].fromIndex
            if (_.isEmpty(dependencies)) {
                counter++
                if (howPointToMe[currIndexToCheck]) {
                    delete howPointToMe[currIndexToCheck][indexToDelete]
                }

                delete howPointToMe[indexToDelete]
                delete allCellsData[indexToDelete]
            } else {
                // shouldCheck = false
            }
        }

        console.log(`done: cleanMaps ${index}`, counter, JSON.stringify({howPointToMe, allCellsData}))
    }
    let counter = 0
    const checkedIndexes = {}
    const checkedStack = []

    while (!_.isUndefined(index)) {
        checkedIndexes[index] = true
        const currCellData = allCellsData[index]
        const pathToMe = getPath(index)

        if (isEnd(currCellData.coords)) {
            // todo
            cleanMaps(index)
            validPaths.push(pathToMe)
        } else {
            const visitedMap = getVisitedMap(pathToMe)
            const adjacent = getAdjacent(matrixSize, currCellData.coords).filter(adjacentCoords => !isVisited(adjacentCoords, visitedMap))

            const hasDirections = _.isEmpty(adjacent)
            adjacent.map(coords => {
                // const coordsStr = `${coords[0]},${coords[1]}`
                return {
                    coords,
                    fromIndex: index
                }
            }).forEach((adjacentCellData, nextIndex) => {
                counter++

                howPointToMe[index] = howPointToMe[index] || {}
                howPointToMe[index][counter] = true

                allCellsData[counter] = adjacentCellData

                checkedStack.push(counter)
            })
        }

        index = checkedStack.pop()
    }

    // return _(validPaths)
    //     .map(p => p.map(coordsStr => getRisk(coordsStr))).value()

    // return _(validPaths).value()

    return _(validPaths)
        .map(p => p.map(coords => getRisk(coords)))
        .map(p => _.sum(p))
        .max()

    // return _(allPaths)

}

const part2 = (input) => {
    return _.identity(input)
}

const runPart1Tests = () => testRunner.runTests(part1, part1Tests)
const runPart2Tests = () => testRunner.runTests(part2, part2Tests)

export default {
    part1v1,
    part1v2,
    part1,
    part2,
    inputParser,
    parsedInput: inputParser(input),
    parsedExample: inputParser(example),
    runPart1Tests,
    runPart2Tests
}
