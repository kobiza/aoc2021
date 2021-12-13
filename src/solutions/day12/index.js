import _ from 'lodash'
import input from './input'
import example from './example'
import {part1Tests, part2Tests} from './testsData'
import testRunner from "../../utils/testRunner";

const toTree = (arr) => {
    let result = {}
    _.forEach(arr, ([src, dest]) => {
        result[src] = result[src] || []
        result[dest] = result[dest] || []

        result[src].push(dest)
        result[dest].push(src)
    })

    return result
}

const inputParser = (input) => toTree(input.split('\n').map(v => v.split('-')))

const part1 = (tree) => {
    const isSmallCave = str => _.upperCase(str) !== str

    const recPathFinder = (cell, visited = {}) => {
        if (cell === 'end') {
            return [[cell]]
        }

        const newVisited = {
            ...visited,
        }

        const directions = tree[cell].filter(v => !visited[v] && v !== 'start')

        if (isSmallCave(cell)) {
            newVisited[cell] = true
        }

        const toAdd = [].concat(_.flatten(directions.map((v) => recPathFinder(v, newVisited))))

        return toAdd.map(arr => [cell, ...arr])
    }

    return recPathFinder('start')
}

const part2 = (tree) => {
    const isSmallCave = str => _.upperCase(str) !== str

    const recPathFinder = (cell, visited = {}, alreadySkippedVisit = false) => {
        if (cell === 'end') {
            return [[cell]]
        }

        // const newVisited = {
        //     ...visited,
        // }

        const possibleDirections = tree[cell].filter(v => !visited[v] && v !== 'start')
        let directions

        if (cell === 'start') {
            directions = possibleDirections.map(v => ({cellKey: v, visited: {...visited, [cell]: true}, alreadySkippedVisit}))
        } else if (isSmallCave(cell)) {
            // newVisited[cell] = true
            const morePathsToCheck = alreadySkippedVisit ? [] : possibleDirections.map(v => ({cellKey: v, visited: {...visited}, alreadySkippedVisit: true}))

            // todo -fix the code here
            // here we getting duplicate paths from the two directions, currently i used unique on the result
            directions = [
                ...possibleDirections.map(v => ({cellKey: v, visited: {...visited, [cell]: true}, alreadySkippedVisit})),
                ...morePathsToCheck
            ]
        } else {
            directions = possibleDirections.map(v => ({cellKey: v, visited: {...visited}, alreadySkippedVisit}))
        }

        const toAdd = [].concat(_.flatten(directions.map((params) => {
            return recPathFinder(params.cellKey, params.visited, params.alreadySkippedVisit)
        }).filter(v => v)))

        return toAdd.map(arr => [cell, ...arr])
    }

    return recPathFinder('start')
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
