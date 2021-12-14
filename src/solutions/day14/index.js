import _ from 'lodash'
import input from './input'
import example from './example'
import {part1Tests, part2Tests} from './testsData'
import testRunner from "../../utils/testRunner";

const inputParser = (input) => {
    const [part1, part2] = input.split('\n\n')

    return {
        template: part1,
        pairsInfo: part2.split('\n').map(v => v.split(' -> ')),
    }
}

const toMap = (pairsInfo) => {
    const objs = pairsInfo.map(v => ({[v[0]]: v[1]}))

    return _.reduce(objs, _.assign, {})
}


const part1 = ({template, pairsInfo}, steps = 10) => {
    const calc = (str) => {
        const counters = {}

        _.forEach(str, c => {
            counters[c] = counters[c] || 0

            counters[c] ++
        })

        const d = _(counters)
            .mapValues((counter, c) => ({c, counter}))
            .values()
            .sortBy(v => v.counter)
            .value()

        return d[d.length - 1].counter - d[0].counter
    }

    const pairsInfoMap = toMap(pairsInfo)

    let result = template
    for (let i = 0; i < steps; i++) {
        let nextResult = ''
        for (let j = 0; j < result.length - 1; j++) {
            const pair = `${result[j]}${result[j + 1]}`

            nextResult += `${result[j]}${pairsInfoMap[pair]}`
        }

        nextResult += result[result.length - 1]
        result = nextResult
    }

    return calc(result)
}

const part2 = ({template, pairsInfo}, steps = 10) => {
    const calc = (pairsCounters, lastC) => {
        const counters = {}

        _.forEach(pairsCounters, (counter, pair) => {
            const [c1] = pair[0]
            counters[c1] = counters[c1] || 0
            counters[c1] += counter
        })

        counters[lastC] += 1

        const d = _(counters)
            .mapValues((counter, c) => ({c, counter}))
            .values()
            .sortBy(v => v.counter)
            .value()

        return d[d.length - 1].counter - d[0].counter
    }

    const toPairsCounters = (str, n = 1) => {
        const pairsCounters = {}

        for (let j = 0; j < str.length - 1; j++) {
            const pair = `${str[j]}${str[j + 1]}`

            pairsCounters[pair] = pairsCounters[pair] || 0
            pairsCounters[pair]++
        }

        return _.mapValues(pairsCounters, counter => counter * n)
    }
    const pairsInfoMap = toMap(pairsInfo)

    let result = toPairsCounters(template)
    for (let i = 0; i < steps; i++) {
        result = _.reduce(result, (acc, counter, pair) => {
            const str = `${pair[0]}${pairsInfoMap[pair]}${pair[1]}`
            const pairsToAdd = toPairsCounters(str, counter)

            _.forEach(pairsToAdd, (counter, pair) => {
                acc[pair] = acc[pair] || 0
                acc[pair] += counter
            })

            return acc
        }, {})
    }

    return calc(result, template[template.length - 1])
}

const runPart1Tests = () => testRunner.runTests(part1, part1Tests)
const runPart2Tests = () => testRunner.runTests(part2, part2Tests)

export default {
    part1,
    part2,
    inputParser,
    parsedInput: inputParser(input),
    // parsedExample: inputParser(example),
    runPart1Tests,
    runPart2Tests
}
