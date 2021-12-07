import _ from 'lodash'

const runTest = (func, describe, args, expectedValue) => {
    const result = func(...args)

    if (result === expectedValue) {
        console.log(`%c✔ ${describe}\n  expected: ${expectedValue}\n  received: ${result}`, 'color: #44bd32')
    } else {
        console.log(`%c✘ ${describe}\n  expected: ${expectedValue}\n  received: ${result}`, 'color: #c23616')
    }

    return result === expectedValue
}

const runTests = (func, testsData) => {
    const results = _.map(testsData, ({describe, args, expectedValue}) =>
        runTest(func, describe, args, expectedValue)
    )

    return _.every(results) ?
        console.log(`%c PASSED`, 'color: #44bd32') :
        console.log(`%c FAILED`, 'color: #c23616')
}

export default {
    runTests
}
