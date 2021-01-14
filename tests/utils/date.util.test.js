const { convertDateToNumber } = require('./../../utils/date.util');

test('Input: Valid Date of instance Date', () => {
    const date = new Date();

    date.setHours(23);
    date.setMinutes(59);

    expect(convertDateToNumber(date)).toBe(2359);
});

test('Input: Invalid Date = falsy values', () => {
    expect(convertDateToNumber(null)).toBe(null);
    expect(convertDateToNumber(undefined)).toBe(undefined);
    expect(convertDateToNumber(0)).toBe(0);
    expect(convertDateToNumber(false)).toBe(false);
    expect(convertDateToNumber('')).toBe('');
});