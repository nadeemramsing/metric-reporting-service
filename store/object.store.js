'use strict'

const { valueTimeout } = require('./../app.config');
const { convertDateToNumber } = require('../utils/date.util');

class ObjectStore {
    constructor() {
        this.instance = {}
    }

    postValue(key, value) {
        const arr = this.instance[key] ? this.instance[key] : (this.instance[key] = []);

        arr.push({ value, 'date': convertDateToNumber(new Date()) });
    }

    getSumByKey(key) {
        const arr = this.instance[key];

        if (!arr)
            return { value: 0 }

        const now = convertDateToNumber(new Date());

        return arr
            .filter(item => now - item.date <= valueTimeout)
            .reduce((acc, item) => acc + item.value, 0);
    }
}

module.exports = new ObjectStore();