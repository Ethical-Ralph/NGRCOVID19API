const moment = require('moment');

const subtractDayFromDate = (num) => {
    const now = new Date();
    return moment(now).subtract(num, 'day').format('YYYY-MM-DD');
};

const clean = (str) => {
    const number = /^[0-9]{1,}$/;
    str = str.replace(/[\n\s,]/gim, '').toLowerCase();
    if (number.test(str)) return Number(str);
    return str;
};

const removeId = (data) => {
    return data.map((val) => {
        return {
            date: val.date,
            confirmed: val.confirmed,
            totalConfirmed: val.totalConfirmed,
        };
    });
};

// i ran out of variable names lol
const filterByDate = (data, date) => {
    date = new Date(date).toLocaleDateString();

    const vss = data.map((vals) => {
        const filter = vals.confirmed.filter((dat) => {
            let newdate = new Date(dat.date).toLocaleDateString();
            return newdate === date;
        });
        return { state: vals.state, confirmed: [...filter] };
    });

    const vv = vss.filter((val) => val.confirmed.length !== 0);
    return vv.map((val) => {
        return {
            state: val.state,
            confirmed: removeId(val.confirmed),
        };
    });
};

// Removes mongodb default id from data
const filterData = (data) => {
    return data.map((val) => {
        return {
            state: val.state,
            confirmed: removeId(val.confirmed),
        };
    });
};

module.exports = {
    subtractDayFromDate,
    clean,
    filterByDate,
    removeId,
    filterData,
};
