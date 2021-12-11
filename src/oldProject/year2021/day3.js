var a = $0.innerHTML.trim().split('\n')

var y2021d3q1 = (arr) => {
    const counters = [...Array(arr[0].length)].map(x => ({one: 0, zero: 0}));

    for (let i = 0; i < arr.length; i++) {
        const currStr = arr[i]
        for (let j = 0; j < currStr.length; j++) {
            if (currStr[j] === '1') {
                counters[j].one++
            } else {
                counters[j].zero++
            }
        }
    }

    let gamma = ''
    let epsilon = ''

    for (let x = 0; x < counters.length; x++) {
        if (counters[x].one > counters[x].zero) {
            gamma += '1'
            epsilon += '0'
        } else {
            gamma += '0'
            epsilon += '1'
        }
    }

    return parseInt(gamma, 2) * parseInt(epsilon, 2)
}

var getCountersInIndex = (arr, index) => {
    const counters = {one: 0, zero: 0};

    for (let i = 0; i < arr.length; i++) {
        const currStr = arr[i]
        if (currStr[index] === '1') {
            counters.one++
        } else {
            counters.zero++
        }
    }

    return counters
}

var y2021d3q2 = (arr, i = 0) => {
    if (arr.length === 1) {
        return arr[0]
    }

    const counters = getCountersInIndex(arr, i)

    const indeication = counters.one >= counters.zero ? '1' : '0'

    return y2021d3q2(arr.filter(v => v[i] === indeication), i + 1)
}

var y2021d3q2X = (arr, i = 0) => {
    if (arr.length === 1) {
        return arr[0]
    }

    const counters = getCountersInIndex(arr, i)

    let indeication;

    if (counters.one < counters.zero) {
        indeication = '1'
    } else {
        indeication = '0'
    }

    return y2021d3q2X(arr.filter(v => v[i] === indeication), i + 1)
}
