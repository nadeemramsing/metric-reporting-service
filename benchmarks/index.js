const range = require('lodash.range');

const objectStore = require('./../store/object.store');

console.time("ObjectStore")

for (const n of range(10000)) {
    objectStore.postValue('test_key_object', n);
}

for (const n of range(10000)) {
    objectStore.getSumByKey('test_key_object');
}

console.timeEnd("ObjectStore");