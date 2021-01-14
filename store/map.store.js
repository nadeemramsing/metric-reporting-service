'use strict'

const { valueTimeout } = require('./../app.config');
const { convertDateToNumber } = require('../utils/date.util');

class MapStore {
    constructor() {
        this.instance = new Map();
    }

    postValue(key, value, date = convertDateToNumber(new Date())) {
        !this.instance.has(key) && this.instance.set(key, []);

        this.instance.get(key).push({ value, date });
    }

    getSumByKey(key) {
        const arr = this.instance.get(key);

        if (!arr)
            return 0

        const now = convertDateToNumber(new Date());
        const arrFiltered = arr.filter(item => now - item.date <= valueTimeout);

        this.instance.set(key, arrFiltered)

        return arrFiltered.reduce((acc, item) => acc + item.value, 0)
    }

    removeExpiredValues() {
        const now = convertDateToNumber(new Date());

        this.instance.forEach((arr, key) => {
            const arrFiltered = arr.filter(item => now - item.date <= valueTimeout);

            this.instance.set(key, arrFiltered);
        });
    }

    contains(key, value, date) {
        return !!(this.instance.has(key)
            && this.instance.get(key).find(item => item.value === value && item.date === date));
    }

    initArrayByKey(key) {
        if (!this.instance.has(key))
            return;

        this.instance.set(key, []);
    }
}

module.exports = new MapStore();