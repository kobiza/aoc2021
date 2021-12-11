var a = $0.innerHTML.trim().split('\n').map(v => v.split(' '))

var y2021d2q1 = (input) => {
    let depth = 0;
    let position = 0;

    for (let i = 0; i < input.length; i++) {
        const [key, numberStr] = input[i]
        const num = parseInt(numberStr)
        if (key === 'forward') {
            position += num
        } else if (key === 'down') {
            depth += num
        } else {
            depth -= num
        }
    }

    return {depth, position, result: depth * position}
}

var y2021d2q2 = (input) => {
    let depth = 0;
    let position = 0;
    let aim = 0;

    for (let i = 0; i < input.length; i++) {
        const [key, numberStr] = input[i]
        const num = parseInt(numberStr)
        if (key === 'forward') {
            position += num
            depth += (aim * num)
        } else if (key === 'down') {
            aim += num
        } else {
            aim -= num
        }
    }

    return {depth, position, result: depth * position}
}
