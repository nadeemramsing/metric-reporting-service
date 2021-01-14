'use strict'

const { convertDateToNumber } = require('../utils/date.util');

class ObjectStore {
    constructor() {
        this.instance = {}
    }

    postValue(key, value) {
        const arr = this.instance[key] ? this.instance[key] : (this.instance[key] = []);

        arr.push({ value, 'date': convertDateToNumber(new Date()) });
    }
}

module.exports = new ObjectStore();