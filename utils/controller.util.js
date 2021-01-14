'use strict'

module.exports = {
    wrap
};

function wrap(method) {
    return function (req, res, next) {
        try { method(req, res, next) }
        catch (e) { next(e) }
    }
}