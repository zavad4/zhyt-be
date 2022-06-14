const Create = require('../services/users/Create');

module.exports = {
  create: (req, res, next) => Create(req, res),

};
