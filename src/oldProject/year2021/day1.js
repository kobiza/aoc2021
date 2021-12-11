var a = $0.innerHTML.trim().split('\n')

var y2021d1q1 = (arr) => {
    let counter = 0;
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > arr[i-1]) {
            counter++
        }
    }

    return counter
}

var y2021d1q2 = (arr) => {
    const r = arr.slice(2)

    return r.map((v,i) => {
        const orignalIndex = i + 2
        return arr[orignalIndex] + arr[orignalIndex - 1] + arr[orignalIndex - 2]
    })
}

