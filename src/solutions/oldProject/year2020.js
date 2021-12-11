var year2020Day1Question1 = (arr) => {
    const nums = {}

    for (let i = 0; i < arr.length; i++) {
        const currNum = arr[i]
        const missingNum = 2020 - currNum
        nums[currNum] = true


        if (nums[missingNum] === true) {
            return missingNum * currNum
        }
    }
}

var year2020Day1Question2 = (arr) => {
    const singleNums = {}
    const pairs = {}

    for (let i = 0; i < arr.length; i++) {
        const currNum = arr[i]
        if (pairs[currNum]) {
            const [num1, num2] = pairs[currNum]
            return num1 * num2 * currNum
        }

        if (currNum < 2020) {
            Object.keys(singleNums).forEach(v => {
                const missingNumForPair = 2020 - v - currNum

                pairs[missingNumForPair] = [currNum, v]
            })


            singleNums[currNum] = true
        }
    }

    return -1
}

module.exports = {
    year2020: {
        year2020Day1Question1,
        year2020Day1Question2,
    }
}
