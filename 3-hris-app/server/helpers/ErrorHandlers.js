function errorHandlers(error, req, res, next) {
  console.log(error, "<<< di error handlers");

  let errorCode = error.code ?? 500;
  let errorMessage = error.message ?? "Internal server error";

  switch (error.name) {
    case "SequelizeValidationError":
      errorCode = 400;
      errorMessage = error.errors.map((el) => el.message);
      break;
    case "SequelizeUniqueConstraintError":
      errorCode = 400;
      errorMessage = error.errors.map((el) => el.message);
      break;
      S;
  }

  switch (errorCode) {
    case 400:
      break;
    case 401:
      break;
    case 404:
      break;
  }

  res.status(errorCode).json({
    success: false,
    status: errorCode,
    message: errorMessage,
  });
}

module.exports = errorHandlers;
