var nums = $0.innerHTML.trim().split(',')
var numsGroups = _(nums).groupBy((v, i) => v).mapValues(v => v.length).value()


var increaseDay = (nums) => {
    return _.flatMap(nums, n => n === 0 ? [6,8] : [n - 1])
}

var y2021d6q1 = (nums, days = 80) => {
    if (days === 0) {
        //return nums.length
        return nums
    }

    return y2021d6q1(increaseDay(nums), days - 1)
}

var increaseDay2 = (numsGroups) => {
    return _.reduce(numsGroups, (res, counter, value) => {
        const currNumber = parseInt(value)
        const objToAdd = currNumber === 0 ? {
            6: counter,
            8: counter
        } : {
            [currNumber - 1]: counter
        }
        _.forEach(objToAdd, (counter, value) => {
            res[value] = res[value] || 0
            res[value] += counter
        })
        return res
    }, {})
}

var y2021d6q2 = (numsGroups, days = 80) => {
    if (days === 0) {
        //return nums.length
        return numsGroups
    }

    return y2021d6q2(increaseDay2(numsGroups), days - 1)
}
