import _ from 'lodash'
import input from './input'
import example from './example'
import {part1Tests, part2Tests} from './testsData'
import testRunner from "../../utils/testRunner";

const inputParser = (input) => input.split('\n')

const part1 = (input) => {
    const closeToOpenMap = {
        ')': '(',
        ']': '[',
        '>': '<',
        '}': '{',
    }
    const closeToErrorNumMap = {
        ')': 3,
        ']': 57,
        '>': 25137,
        '}': 1197,
    }
    const isOpen = (c) => _.includes(['(', '[', '<', '{'], c)
    // const isClose = (c) => _.includes([')', ']', '>', '}'], c)
    const isCloseFit = (close, open) => closeToOpenMap[close] === open
    const getErrorNum = (c) => closeToErrorNumMap[c]

    const linesErrors = input.map(str => {
        let stack = []

        for (let i = 0; i < str.length; i++) {
            const c = str[i]
            if (isOpen(c)) {
                stack.push(c)
            } else {
                const openToCheck = stack.pop()

                if (!isCloseFit(c, openToCheck)) {
                    return getErrorNum(c)
                }
            }
        }

        return 0
    })

    return _.sum(linesErrors)
}

const part2 = (input) => {
    const closeToOpenMap = {
        ')': '(',
        ']': '[',
        '>': '<',
        '}': '{',
    }
    const openToCloseMap = {
        '(': ')',
        '[': ']',
        '<': '>',
        '{': '}',
    }
    const closeToErrorNumMap = {
        ')': 1,
        ']': 2,
        '>': 4,
        '}': 3,
    }
    const isOpen = (c) => _.includes(['(', '[', '<', '{'], c)
    // const isClose = (c) => _.includes([')', ']', '>', '}'], c)
    const isCloseFit = (close, open) => closeToOpenMap[close] === open
    const toCloses = (stack) => {
        return stack.reverse().map(c => openToCloseMap[c])
    }

    const getErrorNum = (stack) => {
        const closes = toCloses(stack)

        let counter = 0

        for (let i = 0; i < closes.length; i++) {
            counter = counter * 5
            counter += closeToErrorNumMap[closes[i]]
        }

        return counter
    }

    const linesErrors = input.map(str => {
        let stack = []

        for (let i = 0; i < str.length; i++) {
            const c = str[i]
            if (isOpen(c)) {
                stack.push(c)
            } else {
                const openToCheck = stack.pop()

                if (!isCloseFit(c, openToCheck)) {
                    return -1
                }
            }
        }

        if (_.isEmpty(stack)) {
            return -1
        }

        return getErrorNum(stack)
    }).filter(v => v !== -1)

    return _.sortBy(linesErrors)[Math.floor((linesErrors.length / 2))]
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
