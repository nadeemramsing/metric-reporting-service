const cron = require('node-cron');

const config = require('./../app.config');
const store = require(`./../store/${config.defaultStore}.store`);

class RemoveExpiredValuesCron {
    constructor() {
        this.task = cron.schedule('*/1 * * * *', this.run, { scheduled: false })
    }

    run() {
        store.removeExpiredValues()
    }
}

module.exports = new RemoveExpiredValuesCron();