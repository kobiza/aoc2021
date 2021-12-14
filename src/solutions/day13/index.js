import _ from 'lodash'
import input from './input'
import example from './example'
import {part1Tests, part2Tests} from './testsData'
import testRunner from "../../utils/testRunner";

const inputParser = (input) => {
    const [part1, part2] = input.split('\n\n')

    return {
        dots: part1.split('\n').map(v => v.split(',').map(n => parseInt(n))),
        folds: part2.split('\n').map(v => {
            const [direction, value] = v.replace('fold along ', '').split('=')

            return {
                direction,
                line: parseInt(value)
            }
        }),
    }
}

const part1 = ({dots, folds}) => {
    let result

    _.forEach(folds.slice(0,1), ({direction, line}) => {
        if (direction === 'y') {
            result = dots.map(([x, y]) => {
                if (y > line) {
                    const distance = y - line
                    return [x, line - distance]
                } else {
                    return [x, y]
                }
            })
        } else {
            result = dots.map(([x, y]) => {
                if (x > line) {
                    const distance = x - line

                    return [line - distance, y]
                } else {
                    return [x, y]
                }
            })
        }

        result = _.uniqBy(result.filter(([x, y]) => x >= 0 && y >= 0), ([x, y]) => `${x},${y}`)
    })

    return result
}

const paint = (dots) => {
    const maxX = _.max(dots.map(([x, y]) => x))
    const maxY = _.max(dots.map(([x, y]) => y))

    let text = ''
    for (let i = 0; i <= maxY; i++) {
        for (let j =0; j <=maxX; j++) {
            text += _.find(dots, ([x, y]) => x === j && y === i) ? '#' : '.'
        }
        text += '\n'
    }

    console.log(text)
}

const part2 = ({dots, folds}) => {
    let result = [...dots]

    _.forEach(folds, ({direction, line}) => {
        if (direction === 'y') {
            result = result.map(([x, y]) => {
                if (y > line) {
                    const distance = y - line
                    return [x, line - distance]
                } else {
                    return [x, y]
                }
            })
        } else {
            result = result.map(([x, y]) => {
                if (x > line) {
                    const distance = x - line

                    // console.log([x, y], [line - distance, y])
                    return [line - distance, y]
                } else {
                    return [x, y]
                }
            })
        }

        result = _.uniqBy(result.filter(([x, y]) => x >= 0 && y >= 0), ([x, y]) => `${x},${y}`)
    })

    paint(result)
    return result
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
