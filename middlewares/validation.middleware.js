module.exports = (schema, path) => async (req, res, next) => {
    try {
        await schema.validate(req[path]); 
        next();
    }
    catch (e) { return res.status(500).send(e) }
}