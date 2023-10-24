const Errors = require("../errors")
const jwt = require('jsonwebtoken')
const models = require("../api/models")

exports.authToken = (req, res, next) => {
    const token = req.get('authorization');
    if (!token) {
      next(Errors.UnauthorizedError('Access Denied!'));
    } else {
      const tk = token.split(' ');
      jwt.verify(tk[1], process.env.JWT_SECRET, async (err, decode) => {
        if (err) {
          if (err.name === 'TokenExpiredError') {
            next(Errors.UnauthorizedError('Token has expired'));
          } else {
            next(Errors.UnauthorizedError('Invalid Token'));
          }
        } else {
          
          await models.User.findOne({
            attributes: ['jwtToken'],
            where: {
              id: decode.id,
            },
          })
            .then((user) => {
             
              if (!user) {
                next(Errors.UnauthorizedError('Sign in again!'));
              } else if (user.jwtToken && user.jwtToken != tk[1]) {
                next(Errors.UnauthorizedError('Invalid Token, Sign in again'));
              } else {
                res.locals.userData = decode;
                
         

                next();
              }
            })
            .catch((err) => {
              next(Errors.InternalServerError(err.message));
            });
        }
      });
    }
  };
  