module.exports = {
    convertDateToNumber
};

function convertDateToNumber(date) {
    try { return +`${date.getHours()}${date.getMinutes()}` }
    catch (e) { return date }
}