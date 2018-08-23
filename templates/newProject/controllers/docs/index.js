const { globalRenders } = require('../../utils');


module.exports = ({ apiVersion, allRoutes }) => (req, res) => {
    res.status(200).render('utils/docs', globalRenders('utils/docs', req, res, { allRoutes, apiVersion }));
};
