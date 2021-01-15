'use strict'

const { valueTimeout } = require('./../app.config');
const { convertDateToNumber } = require('../utils/date.util');

class ObjectStore {
    constructor() {
        this.instance = {}

        Object.defineProperties(this.instance, {
            get: {
                value: (key) => this.instance[key],
                enumerable: false
            },
            set: {
                value: (key, value) => this.instance[key] = value,
                enumerable: false
            }
        });
    }

    postValue(key, value, date = convertDateToNumber(new Date())) {
        const arr = this.instance[key] ? this.instance[key] : (this.instance[key] = []);

        arr.push({ value, date });
    }

    getSumByKey(key) {
        const arr = this.instance[key];

        if (!arr)
            return 0

        const now = convertDateToNumber(new Date());

        const arrFiltered = arr.filter(item => now - item.date <= valueTimeout);
        this.instance[key] = arrFiltered;

        return arrFiltered.reduce((acc, item) => acc + item.value, 0)
    }

    removeExpiredValues() {
        const now = convertDateToNumber(new Date());

        for (const key in this.instance)
            this.instance[key] = this.instance[key].filter(item => now - item.date <= valueTimeout)
    }

    contains(key, value, date) {
        try { return !!this.instance[key].find(item => item.value === value && item.date === date) }
        catch (e) { return false }
    }

    initArrayByKey(key) {
        if (!this.instance[key])
            return;

        this.instance[key] = [];
    }
}

module.exports = new ObjectStore();