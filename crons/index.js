const removeExpiredValuesCron = require('./removeExpiredValuesCron');

module.exports = () => {
    removeExpiredValuesCron.task.start()
}
