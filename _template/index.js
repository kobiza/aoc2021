import _ from 'lodash'
import input from './input'
import example from './example'
import {part1Tests, part2Tests} from './testsData'
import testRunner from "../../utils/testRunner";

const inputParser = (input) => input.split('\n').map(v => parseInt(v))

const parsedInput = inputParser(input)
const parsedExample = inputParser(example)

const part1 = (input) => {
    return _.identity(input)
}

const part2 = (input) => {
    return _.identity(input)
}

const runPart1Tests = () => testRunner.runTests(part1, part1Tests)
const runPart2Tests = () => testRunner.runTests(part2, part2Tests)

export default {
    part1,
    part2,
    inputParser,
    parsedInput,
    parsedExample,
    runPart1Tests,
    runPart2Tests
}
