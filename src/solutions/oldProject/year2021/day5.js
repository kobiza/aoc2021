var a = $0.innerHTML.trim().split('\n')
var delimeter = a[0].slice(6, 13)
var input = a.map(v => v.split(delimeter)).map(([srcStr, destStr]) => {
    const [srcX, srcY] = srcStr.split(',')
    const [destX, destY] = destStr.split(',')

    return {src: {x: parseInt(srcX), y: parseInt(srcY)}, dest: {x: parseInt(destX), y: parseInt(destY)}}
})

var y2021d5q1 = (lines) => {
    const pointToSign = {}

    const verticalLines = lines.filter(({src, dest}) => {
        return src.x === dest.x
    })
    const horizontalLines = lines.filter(({src, dest}) => {
        return src.y === dest.y
    })

    verticalLines.forEach(({src, dest}) => {
        const {from, to} = src.y <= dest.y ? {from: src.y, to: dest.y} : {from: dest.y, to: src.y}
        for(let i = from; i <= to; i++) {
            const pointKey = `${i},${src.x}`
            pointToSign[pointKey] = pointToSign[pointKey] || 0
            pointToSign[pointKey]++
        }
    })

    horizontalLines.forEach(({src, dest}) => {
        const {from, to} = src.x <= dest.x ? {from: src.x, to: dest.x} : {from: dest.x, to: src.x}
        for(let i = from; i <= to; i++) {
            const pointKey = `${src.y},${i}`
            pointToSign[pointKey] = pointToSign[pointKey] || 0
            pointToSign[pointKey]++
        }
    })

    return Object.keys(pointToSign).filter(key => pointToSign[key] >= 2).length
}

var y2021d5q2 = (lines) => {
    const pointToSign = {}

    const verticalLines = lines.filter(({src, dest}) => {
        return src.x === dest.x
    })
    const horizontalLines = lines.filter(({src, dest}) => {
        return src.y === dest.y
    })
    const crossLines = lines.filter(({src, dest}) => {
        return Math.abs(src.x - dest.x) && Math.abs(src.y - dest.y)
    })

    verticalLines.forEach(({src, dest}) => {
        const {from, to} = src.y <= dest.y ? {from: src.y, to: dest.y} : {from: dest.y, to: src.y}
        for(let i = from; i <= to; i++) {
            const pointKey = `${i},${src.x}`
            pointToSign[pointKey] = pointToSign[pointKey] || 0
            pointToSign[pointKey]++
        }
    })

    horizontalLines.forEach(({src, dest}) => {
        const {from, to} = src.x <= dest.x ? {from: src.x, to: dest.x} : {from: dest.x, to: src.x}
        for(let i = from; i <= to; i++) {
            const pointKey = `${src.y},${i}`
            pointToSign[pointKey] = pointToSign[pointKey] || 0
            pointToSign[pointKey]++
        }
    })

    crossLines.forEach(({src, dest}) => {
        const isXPlus = dest.x >= src.x
        const isYPlus = dest.y >= src.y
        const num = Math.abs(src.x - dest.x)
        for(let i = 0; i <= num; i++) {
            const x = isXPlus ? src.x + i : src.x - i
            const y = isYPlus ? src.y + i : src.y - i
            const pointKey = `${y},${x}`
            pointToSign[pointKey] = pointToSign[pointKey] || 0
            pointToSign[pointKey]++
        }
    })
//debugger
    return Object.keys(pointToSign).filter(key => pointToSign[key] >= 2).length
}
