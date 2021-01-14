const { convertDateToNumber } = require('./../../utils/date.util');

test('Input: Valid Date', () => {
    const date = new Date();

    date.setHours(23);
    date.setMinutes(59);

    expect(convertDateToNumber(date)).toBe(2359);
});