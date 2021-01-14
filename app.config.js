'use strict'

module.exports = {
    debug: process.env.DEBUG === 'true' || true,

    port: process.env.PORT || '4444',

    prod: process.env.PROD === 'true' || false,
}