'use strict'

const { valueTimeout } = require('./../app.config');
const { convertDateToNumber } = require('../utils/date.util');

class MapStore {
    constructor() {
        this.instance = new Map();
    }

    postValue(key, value) {
        !this.instance.has(key) && this.instance.set(key, []);

        this.instance.get(key).push({ value, 'date': convertDateToNumber(new Date()) });
    }

    getSumByKey(key) {
        const arr = this.instance.get(key);

        if (!arr)
            return { value: 0 }

        const now = convertDateToNumber(new Date());

        this.instance.set(key, arr.filter(item => now - item.date <= valueTimeout))

        return arr.reduce((acc, item) => acc + item.value, 0)
    }

    removeExpiredValues() {
        const now = convertDateToNumber(new Date());

        this.instance.forEach(arr => arr = arr.filter(item => now - item.date <= valueTimeout))
    }
}

module.exports = new MapStore();