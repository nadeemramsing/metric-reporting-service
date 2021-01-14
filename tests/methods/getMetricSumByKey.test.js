const range = require('lodash.range');

const { postMetricByKey, getMetricSumByKey } = require('../../methods');
const { convertDateToNumber } = require('../../utils/date.util');

test('Valid input', () => {
    const key = 'test_key';
    const date = convertDateToNumber(new Date());

    const req = {};
    req.params = { key };

    for (const value of range(1, 6)) {
        req.body = { value, date }

        postMetricByKey(req);
    }

    expect(getMetricSumByKey({ params: { key } })).toEqual({ value: 15 });
});