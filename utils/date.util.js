module.exports = {
    convertDateToNumber
};

function convertDateToNumber(date) {
    return +`${date.getFullYear()}${date.getMonth() + 1}${date.getDate()}${date.getHours()}`;
}