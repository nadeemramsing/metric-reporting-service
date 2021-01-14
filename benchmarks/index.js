const range = require('lodash.range');

const objectStore = require('./../store/object.store');
const mapStore = require('./../store/map.store');

console.time("ObjectStore")

for (const n of range(10000)) {
    objectStore.postValue('test_key_object', n);
}

for (const n of range(10000)) {
    objectStore.getSumByKey('test_key_object');
}

console.timeEnd("ObjectStore");

console.time("MapStore")

for (const n of range(10000)) {
    mapStore.postValue('test_key_map', n);
}

for (const n of range(10000)) {
    mapStore.getSumByKey('test_key_map');
}

console.timeEnd("MapStore");