const range = require('lodash.range');
const sumBy = require('lodash.sumby');
const store = require('../../store/map.store');
const config = require('../../app.config');

const { convertDateToNumber } = require('../../utils/date.util');

beforeEach(() => store.initArrayByKey('test_key'));

test('Store should be a Map (instance)', () => {
    expect(store.instance instanceof Map).toBe(true)
});

test('Store should allow Object to be stored in it (postValue)', () => {
    const key = 'test_key';
    const value = 20;
    const date = convertDateToNumber(new Date());

    store.postValue(key, value, date);

    expect(store.contains(key, value, date)).toBe(true);
});

test('Store should return sum of metrics by key (getSumByKey)', () => {
    const key = 'test_key';
    const date = convertDateToNumber(new Date());

    for (const value of range(1, 11))
        store.postValue(key, value, date);

    expect(store.getSumByKey('test_key')).toBe(55);
});

test('Store should return sum of non-expired metrics by key (getSumByKey)', () => {
    const key = 'test_key';
    const now = convertDateToNumber(new Date());

    for (const value of [10, 20, 30])
        store.postValue(key, value, now);

    const expiredDate = now - (config.valueTimeout + 1);

    for (const value of [100, 200])
        store.postValue(key, value, expiredDate);

    expect(store.getSumByKey('test_key')).toBe(60);
});

test('Store should remove all expired values (removeExpiredValues) ', () => {
    const key = 'test_key';
    const now = convertDateToNumber(new Date());

    for (const value of range(1, 6))
        store.postValue(key, value, now);

    let arr = store.instance.get(key);
    expect(sumBy(arr, 'value')).toBe(15);

    const expiredDate = now - (config.valueTimeout + 1);

    for (const value of range(1, 11))
        store.postValue(key, value, expiredDate);

    arr = store.instance.get(key)
    expect(sumBy(arr, 'value')).toBe(70);

    store.removeExpiredValues();

    arr = store.instance.get(key)
    expect(sumBy(arr, 'value')).toBe(15);
});

test('Store should tell if it contains an Object (contains)', () => {
    const key = 'test_key';
    const value = 50;
    const date = convertDateToNumber(new Date());

    store.instance.set(key, [{ value, date }]);

    expect(store.contains(key, value, date)).toBe(true);
});

test('Store should tell if it does not contain an Object (contains)', () => {
    const key = 'test_key';
    const value = 50;
    const date = convertDateToNumber(new Date());

    store.instance.set(key, [{ value, date }]);

    expect(store.contains(key, value + 1, date)).toBe(false);
});