const moment = require("moment")



const subtractDayFromDate = (num) => {
    const now = new Date()
    return moment(now).subtract(num, 'day').format('YYYY-MM-DD')
}


const clean = (str) => {
    const number = /^[0-9]{1,}$/
    str = str.replace(/[\n\s,]/gmi, '').toLowerCase()
    if (number.test(str)) return Number(str)
    return str
}

module.exports = {
    subtractDayFromDate,
    clean
}