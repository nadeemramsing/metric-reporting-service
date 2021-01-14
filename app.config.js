'use strict'

module.exports = {
    debug: process.env.DEBUG === 'true' || true,

    defaultStore: process.env.DEFAULT_STORE || 'object',

    port: process.env.PORT || '4444',

    prod: process.env.PROD === 'true' || false,
}