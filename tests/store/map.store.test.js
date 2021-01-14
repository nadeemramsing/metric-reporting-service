const range = require('lodash.range');
const sumBy = require('lodash.sumby');
const store = require('../../store/map.store');
const config = require('../../app.config');

const { convertDateToNumber } = require('../../utils/date.util');

const key = 'test_key';
const value = 50;
const date = convertDateToNumber(new Date());

beforeEach(() => store.initArrayByKey('test_key'));

test('Store should be a Map (instance)', () => {
    expect(store.instance instanceof Map).toBe(true)
});

test('Store should allow Object to be stored in it (postValue)', () => {
    store.postValue(key, value, date);

    expect(store.contains(key, value, date)).toBe(true);
});

test('Store should return sum of metrics by key (getSumByKey)', () => {
    for (const value of range(1, 11))
        store.postValue(key, value, date);

    expect(store.getSumByKey('test_key')).toBe(55);
});

test('Store should return sum of non-expired metrics by key (getSumByKey)', () => {
    for (const value of [10, 20, 30])
        store.postValue(key, value, date);

    const expiredDate = date - (config.valueTimeout + 1);

    for (const value of [100, 200])
        store.postValue(key, value, expiredDate);

    expect(store.getSumByKey('test_key')).toBe(60);
});

test('Store should remove all expired values (removeExpiredValues) ', () => {
    for (const value of range(1, 6))
        store.postValue(key, value, date);

    let arr = store.instance.get(key);
    expect(sumBy(arr, 'value')).toBe(15);

    const expiredDate = date - (config.valueTimeout + 1);

    for (const value of range(1, 11))
        store.postValue(key, value, expiredDate);

    arr = store.instance.get(key)
    expect(sumBy(arr, 'value')).toBe(70);

    store.removeExpiredValues();

    arr = store.instance.get(key)
    expect(sumBy(arr, 'value')).toBe(15);
});

test('Store should tell if it contains an Object (contains) or not', () => {
    store.instance.set(key, [{ value, date }]);

    expect(store.contains(key, value, date)).toBe(true);
    expect(store.contains(key, value + 1, date)).toBe(false);

});

test('Store should allow its arrays to be initialized (initArrayByKey)', () => {
    store.instance.set(key, [{ value, date }]);

    store.initArrayByKey(key);

    expect(store.instance.get(key).length).toBe(0);
});