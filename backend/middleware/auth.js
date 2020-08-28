const jwt = require("jsonwebtoken");

module.exports = function(req, res, next) {
    try {
      const token = req.header('token');
      if (!token) {
        return res.status(401).send('Unauthorized access');
      }
      const verifiedUser = jwt.verify(token, 'secret');
      req.verifiedUser = verifiedUser;
      next();
    } catch (error) {
      res.status(403).send(error);
    }
  };

