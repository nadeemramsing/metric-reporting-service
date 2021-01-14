const cron = require('node-cron');

const config = require('./../app.config');
const defaultStore = require(`./../store/${config.defaultStore}.store`);

class RemoveExpiredValuesCron {
    constructor() {
        this.task = cron.schedule('*/1 * * * *', this.run, { scheduled: false })
    }

    run() {
        defaultStore.removeExpiredValues()
    }
}

module.exports = new RemoveExpiredValuesCron();