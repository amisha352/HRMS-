const { FeedBackService } = require("../services");
const feedbackService = new FeedBackService();

const createFb = async (req, res, next) => {
  await feedbackService
    .createFb(req.body, res.locals.userData.id)
    .then((response) => {
      res.status(201).json({
        status: true,
        data: response,
      });
    })
    .catch((err) => {
      next(err);
    });
};

const cretaedByMrg = async (req, res, next) => {
  await feedbackService
    .cretaedByMrg(req.params.id)
    .then((response) => {
      res.status(200).json({
        status: true,
        data: response,
      });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = {
  createFb,
  cretaedByMrg,
};
