const bank = require('../api/bankRoutes');
const user = require('../api/user');

const middlewares = [user,bank]; 
module.exports = middlewares;
