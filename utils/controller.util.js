'use strict'

module.exports = {
    wrap
};

function wrap(method) {
    return async function (req, res, next) {
        try { res.send(await method(req)) }
        catch (e) { next(e) }
    }
}