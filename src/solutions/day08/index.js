import _ from 'lodash'
import input from './input'
import example from './example'
import {part1Tests, part2Tests} from './testsData'
import testRunner from "../../utils/testRunner";

const sort = str => _.sortBy(str).join('')


const inputParser = (input) => {
    if (!input) {
        return input
    }

    return input.split('\n').map((v, i) => {
        const [patternsStr, outputStr] = v.split(' | ')

        return {
            patterns: patternsStr.split(' '),
            output: outputStr.split(' ')
        }
    })

}

const part1 = (input) => {
    const digitsLength = {
        '1': 2,
        '4': 4,
        '7': 3,
        '8': 7,
    }

    const lengthTrueObj = _(digitsLength).mapKeys(v => v).mapValues(() => true).value()

    const wordsCounter = _.map(input, ({output}) => {
        return _.filter(output, (v => lengthTrueObj[v.length])).length
    })

    return _.sum(wordsCounter)
}


const part2 = (input) => {
    const minus = (a, b) => {
        return _.filter(a, c => !b.includes(c)).join('')
    }

    const minusArr = (arr) => {
        let result = arr[0]

        for (let i = 1; i < arr.length; i++) {
            result = minus(result, arr[i])
        }

        return result
    }

    const is1 = (length) => length === 2
    const is4 = (length) => length === 4
    const is7 = (length) => length === 3
    const is8 = (length) => length === 7

    // const {patterns, output} = input

    const numToPatternResult = _.map(input, ({patterns, output}) => {
        const numToPattern = {}

        numToPattern[1] = _.find(patterns, v => is1(v.length))
        numToPattern[4] = _.find(patterns, v => is4(v.length))
        numToPattern[7] = _.find(patterns, v => is7(v.length))
        numToPattern[8] = _.find(patterns, v => is8(v.length))

        // 1 -> c/f
        const cf = numToPattern[1]
        // 7 - (c/f) -> a
        const a = minus(numToPattern[7], numToPattern[1])

        // 4 - (c/f) -> b/d
        const bd = minus(numToPattern[4], numToPattern[1])

        // 8 - (a, c/f, b/d) -> e/g
        // const eg = minusArr([numToPattern[8], a, cf, bd])

        const is0 = (length, str) => {
            return length === 6 && _.some(bd, char => !str.includes(char))
        }
        numToPattern[0] = _.find(patterns, v => is0(v.length, v))

        const d = minus(numToPattern[8], numToPattern[0])
        const b = minus(bd, d)

        const is5 = (length, str) => {
            return length === 5 && _.every(bd + a, char => str.includes(char))
        }

        numToPattern[5] = _.find(patterns, v => is5(v.length, v))

        const is6 = (length, str) => {
            return length === 6 && minus(str, numToPattern[1]).length === 5
        }

        numToPattern[6] = _.find(patterns, v => is6(v.length, v))

        const e = minus(numToPattern[6], numToPattern[5])
        const c = minus(numToPattern[8], numToPattern[6])
        const f = minus(cf, c)
        const g = minusArr([numToPattern[8], a, b, c, d, e, f])

        const is2 = (str) => {
            return sort(str) === sort(a + c + d + e + g)
        }

        numToPattern[2] = _.find(patterns, v => is2(v))

        const is3 = (str) => {
            return sort(str) === sort(a + c + d + f + g)
        }

        numToPattern[3] = _.find(patterns, v => is3(v))

        const is9 = (str) => {
            return sort(str) === sort(a + b + c + d + f + g)
        }
        numToPattern[9] = _.find(patterns, v => is9(v))

        return _.mapValues(numToPattern, sort)
    })

    const numbers = _.map(input, ({output}, index) => {
        const patterns = numToPatternResult[index]
        return parseInt(output.map(word => _.findKey(patterns, (p) => {
            return p === sort(word)
        })).join(''))
    })

    return _.sum(numbers)
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
