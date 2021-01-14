const { postMetricByKey } = require('../../methods');
const { convertDateToNumber } = require('../../utils/date.util');

const config = require('../../app.config');
const store = require(`../../store/${config.defaultStore}.store`);

test('Valid input', () => {
    const key = 'test_key';
    const value = 10;
    const date = convertDateToNumber(new Date());

    const req = {};

    req.params = { key };
    req.body = { value, date }

    postMetricByKey(req);

    expect(store.contains(key, value, date)).toBe(true);
});