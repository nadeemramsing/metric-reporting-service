'use strict'

module.exports = {
    wrap
};

function wrap(method) {
    return async function (req, res, next) {
        try {
            const resolved = await method(req)
            res.send(typeof resolved === 'number' ? '' + resolved : resolved)
        }
        catch (e) { res.status(500).send(e) }
    }
}