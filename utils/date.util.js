module.exports = {
    convertDateToNumber
};

function convertDateToNumber(date) {
    return +`${date.getHours()}${date.getMinutes()}`;
}