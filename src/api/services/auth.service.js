const Errors = require("../../errors");
const models = require("../models");
const { hashPassword, validatePassword } = require("../../helpers/password");
const { signJwt } = require("../../helpers/jwt");
const { generateOTP } = require("../../helpers/otp");
const sendMail = require("../../helpers/mail");

class authService {
  async signUp(payload) {
    return new Promise(async (resolve, reject) => {
      await models.User.findOne({
        where: { email: payload.email },
      })
        .then(async (user) => {
          if (user) {
            reject(Errors.BadRequestError("Email already exists"));
          } else {
            await models.User.create({
              fullName: payload.fullName,
              email: payload.email,
              password: hashPassword(payload.password),
              phone: payload.phone,
              profilePic: payload.profilePic,
              roleId: 2,
              dptId: payload.dptId,
              dsgId: payload.dsgId,
              mrgId: payload.mrgId,
            })
              .then(async (user) => {
                await models.Worklog.create({
                  empId: user.id,
                  in: 0,
                  out: 0,
                });
                resolve({
                  id: user.id,
                  fullName: user.name,
                  email: user.email,
                  phone: user.phone,
                });
              })
              .catch((err) => reject(Errors.InternalServerError(err)));
          }
        })
        .catch((err) => Errors.InternalServerError(err));
    });
  }
  async logIn(payload) {
    return new Promise(async (resolve, reject) => {
      await models.User.findOne({
        where: { email: payload.email },
      })
        .then(async (user) => {
          if (!user) {
            reject(Errors.BadRequestError("email not found!"));
          } else {
            if (!validatePassword(payload.password, user.password)) {
              reject(Errors.BadRequestError("invalid password"));
            } else {
              const token = signJwt(
                {
                  id: user.id,
                  email: user.email,
                  roleId: user.roleId,
                },
                "7d"
              );
              this.updateToken(token, user.id);
              resolve({
                id: user.id,
                emial: user.email,
                token,
              });
            }
          }
        })
        .catch((err) => {
          reject(Errors.InternalServerError(err));
        });
    });
  }
  
  //>>>>>....password .........<<<<<<//

  async changePassword(userId, oldPassword, newPassword) {
    return new Promise(async (resolve, reject) => {
      await models.User.findOne({
        where: {
          id: userId,
        },
        attributes: ["id", "password"],
      })
        .then(async (user) => {
          if (!user) {
            reject(Errors.BadRequestError("Invalid User"));
          } else if (!validatePassword(oldPassword, user.password)) {
            reject(Errors.BadRequestError("Invalid Password"));
          } else {
            const hashedPassword = hashPassword(newPassword);
            await models.User.update(
              { password: hashedPassword },
              {
                where: {
                  id: userId,
                },
              }
            )
              .then((user) => {
                resolve(true);
              })
              .catch((error) => {
                reject(Errors.InternalServerError(error.message));
              });
          }
        })
        .catch((error) => {
          reject(Errors.InternalServerError(error.message));
        });
    });
  }
  async forgotPassword(email) {
    return new Promise(async (resolve, reject) => {
      await models.User.findOne({
        where: {
          email,
        },
        attributes: ["id", "email"],
      })
        .then(async (user) => {
          if (!user) {
            reject(Errors.BadRequestError("Invalid Email"));
          } else {
            const otp = generateOTP();
            await models.User.update(
              { otp },
              {
                where: {
                  email,
                },
              }
            )
              .then(async (response) => {
                const token = signJwt(
                  {
                    id: user.id,
                    email: user.email,
                    role: user.roleId,
                  },
                  "1d"
                );
                await this.updateToken(token, user.id);
                const subject = `Your OTP for the reset password: ${otp}`;
                const emailBody = `Your OTP for the reset password: ${otp}`;
                await sendMail(user.email, subject, emailBody);
                resolve({ token, otp });
              })
              .catch((error) => {
                reject(Errors.InternalServerError(error.message));
              });
          }
        })
        .catch((error) => {
          reject(Errors.InternalServerError(error.message));
        });
    });
  }
  async resetPass(payload) {
    console.log(payload);
    return new Promise(async (resolve, reject) => {
      await models.User.findOne({
        where: { id: payload.id },
        attributes: ["id", "otp"],
      })
        .then(async (user) => {
          if (!user) {
            reject(Errors.NotFoundError("user not found"));
          } else if (!this.verifyOtp(user.id, payload.otp)) {
            reject(Errors.BadRequestError("invalid otp"));
          } else {
            await models.User.update(
              {
                password: hashPassword(payload.password),
              },
              {
                where: { id: payload.id },
              }
            )
              .then((response) => {
                resolve(true);
              })
              .catch((err) => reject(Errors.InternalServerError(err)));
          }
        })
        .catch((err) => reject(Errors.InternalServerError(err)));
    });
  }
  //>>>>>>>  Common >>>>>//

  async updateToken(token, id) {
    return new Promise(async (resolve, reject) => {
      await models.User.update({ jwtToken: token }, { where: { id: id } })
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          reject(Errors.InternalServerError(err));
        });
    });
  }
  async verifyOtp(id, otp) {
    return new Promise(async (resolve, reject) => {
      await models.User.findOne({
        where: { id },
      })
        .then(async (user) => {
          if (user.otp === otp) {
            resolve(true);
          } else {
            resolve(false);
          }
        })
        .catch((err) => reject(Errors.InternalServerError(err)));
    });
  }
}
module.exports = authService;
