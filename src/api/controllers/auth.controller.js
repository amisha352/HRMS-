const { AuthService } = require("../services");
const authService = new AuthService();

const signUp = async (req, res, next) => {
  if (
    !req.body.fullName ||
    !req.body.email ||
    !req.body.phone ||
    !req.body.password
  ) {
    res.status(400).json({
      status: false,
      message: "missing required fields",
    });
  }

  await authService
    .signUp(req.body)
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
const logIn = async (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    res.status(400).json({
      status: false,
      message: "missing required fields",
    });
  }

  await authService
    .logIn(req.body)
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

const changePassword = async (req, res, next) => {
  if (!req.body.oldPassword || !req.body.newPassword) {
    res.status(400).json({
      status: false,
      message: "missing required fields",
    });
  }
  await authService
    .changePassword(
      res.locals.userData.id,
      req.body.oldPassword,
      req.body.newPassword
    )
    .then((response) => {
      res.status(200).json({
        status: true,
        message: "password has been changed",
      });
    })
    .catch((err) => {
      next(err);
    });
};

const forgotPassword = async (req, res, next) => {
  if (!req.body.email) {
    res.status(400).json({
      status: false,
      message: "missing  required fields",
    });
  }

  await authService
    .forgotPassword(req.body.email)
    .then((response) => {
      res.status(200).json({
        status: true,
        message: "email has been sent",
        data: response,
      });
    })
    .catch((err) => {
      next(err);
    });
};
const resetPass = async (req, res, next) => {
  if (!req.body.otp || !req.body.newPassword) {
    res.status(400).json({
      status: false,
      message: "missing required fields",
    });
  }
  const payload = {
    id: res.locals.userData.id,
    password: req.body.newPassword,
    otp: req.body.otp,
  };
  await authService
    .resetPass(payload)
    .then((response) => {
      res.status(200).json({
        status: true,
        message: "password has been reset successfully",
      });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = {
  signUp,
  logIn,
  changePassword,
  forgotPassword,
  resetPass,
};
