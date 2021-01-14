const range = require('lodash.range');
const store = require('../../store/map.store');
const config = require('../../app.config');

const { convertDateToNumber } = require('../../utils/date.util');

beforeEach(() => store.initArrayByKey('test_key'));

test('Store should be a Map', () => {
    expect(store.instance instanceof Map).toBe(true)
});

test('Store should allow Object to be stored in it', () => {
    const key = 'test_key';
    const value = 20;
    const date = convertDateToNumber(new Date());

    store.postValue(key, value, date);

    expect(store.contains(key, value, date)).toBe(true);
});

test('Store should return sum of metrics by key', () => {
    const key = 'test_key';
    const date = convertDateToNumber(new Date());

    for (const value of range(1, 11))
        store.postValue(key, value, date);

    expect(store.getSumByKey('test_key')).toBe(55);
});

test('Store should remove all expired values', () => {
    const key = 'test_key';
    const now = convertDateToNumber(new Date());

    for (const value of range(1, 6))
        store.postValue(key, value, now);

    const expiredDate = now - (config.valueTimeout + 1);

    for (const value of range(1, 11))
        store.postValue(key, value, expiredDate);

    expect(store.getSumByKey('test_key')).toBe(70);

    store.removeExpiredValues();

    expect(store.getSumByKey('test_key')).toBe(15);
})