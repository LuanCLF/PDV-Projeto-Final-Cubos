const { StatusCodes } = require('http-status-codes');

const createApiError = (message, statusCode) => ({
  message,
  statusCode,
  name: 'ApiError',
});

const BadRequestError = (message) => createApiError(message, StatusCodes.BAD_REQUEST);

const UnauthorizedRequestError = (message) => createApiError(message, StatusCodes.UNAUTHORIZED);

const NotFoundError = (message) => createApiError(message, StatusCodes.NOT_FOUND);

const NotAllowedError = (message) => createApiError(message, StatusCodes.FORBIDDEN);

const ConflictRequestError = (message) => createApiError(message,StatusCodes.CONFLICT);
  
module.exports = {
    createApiError,
    BadRequestError,
    UnauthorizedRequestError,
    NotFoundError,
    NotAllowedError,
    ConflictRequestError
}