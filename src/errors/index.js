class CustomErrors extends Error {
  constructor(statusCode, message, stack) {
    super(message);
    this.statusCode = statusCode;
    this.stack = stack;
  }

  /* --------------------- Validation ------------------------- */
  static BadRequestError(message = 'Bad Request', stack = null) {
    return new CustomErrors(400, message, stack);
  }
  static NotFoundError(message = 'Not found', stack = null) {
    return new CustomErrors(404, message, stack);
  }
  static ConflictError(message = 'conflict occurs', stack = null) {
    return new CustomErrors(209, message, stack);
  }
  static NoContentError(message = 'No Content', stack = null) {
    return new CustomErrors(204, message, stack);
  }

  /* --------------------- Authentication --------------------- */
  static UnauthorizedError(message = 'Invalid Credentials', stack = null) {
    return new CustomErrors(401, message, stack);
  }
  static ForbiddenError(message = 'Access denied', stack = null) {
    return new CustomErrors(403, message, stack);
  }

  /* --------------------- Server Error ----------------------- */
  static InternalServerError(err) {
    console.log(' 🐭🐭 ', err);
    const error = new CustomErrors(500, err.message, err.stack);
   
    return error;
  }

  log() {
    logger.error(`Message: ${this.message} || Status: ${this.statusCode}`);
  }
}

module.exports = CustomErrors;
