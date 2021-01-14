'use strict'

const { valueTimeout } = require('./../app.config');
const { convertDateToNumber } = require('../utils/date.util');

class ObjectStore {
    constructor() {
        this.instance = {}
    }

    postValue(key, value) {
        const arr = this.instance[key] ? this.instance[key] : (this.instance[key] = []);

        console.log('arr', arr);

        arr.push({ value, 'date': convertDateToNumber(new Date()) });
    }

    getSumByKey(key) {
        const arr = this.instance[key];

        if (!arr)
            return 0

        const now = convertDateToNumber(new Date());

        this.instance[key] = arr.filter(item => now - item.date <= valueTimeout)

        return arr.reduce((acc, item) => acc + item.value, 0)
    }

    removeExpiredValues() {
        const now = convertDateToNumber(new Date());

        for (const key in this.instance)
            this.instance[key] = this.instance[key].filter(item => now - item.date <= valueTimeout)
    }

    contains(key, value, date) {
        console.log(this.instance, key, value, date);
        try { return !!this.instance[key].find(item => item.value === value && item.date === date) }
        catch (e) { return false }
    }
}

module.exports = new ObjectStore();