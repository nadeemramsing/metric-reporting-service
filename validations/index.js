const yup = require('yup');

const schemaPostValueParams = yup
    .object()
    .shape({
        key: yup.string().required()
    });

const schemaPostValueBody = yup
    .object()
    .shape({
        value: yup.string().required()
    });

const schemaGetSumBody = yup
    .object()
    .shape({
        key: yup.string()
            .required()
            .matches(/[a-z_]/i, 'Must contain alphabets and _ only')
    });

module.exports = {
    schemaPostValueParams,
    schemaPostValueBody,
    schemaGetSumBody
};
