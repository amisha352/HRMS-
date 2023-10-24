const { LeaveService } = require("../services");
const leaveService = new LeaveService();

const requestLeave = async (req, res, next) => {
  const payload = {
    content: req.body.content,
    empId: res.locals.userData.id,
    leaveDays: req.body.leaveDays,
  };
  await leaveService
    .requestLeave(payload)
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

const approveLeave = async (req, res, next) => {
  await leaveService
    .approveLeave(req.params.id)
    .then((response) => {
      res.status(200).json({
        status: true,
        message: "leave has boon approved",
        data: response,
      });
    })
    .catch((err) => {
      next(err);
    });
};

const rejectLeave = async (req, res, next) => {

  console.log(res.locals.userData)
  await leaveService
    .rejectLeave(req.params.id)
    .then((response) => {
      res.status(200).json({
        status: true,
        message: response,
      });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = {
  requestLeave,
  approveLeave,
  rejectLeave,
};
