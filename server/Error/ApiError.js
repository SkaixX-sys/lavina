const HTTP_STATUS_CODES = {
    BAD_REQUEST: 400,
    FORBIDDEN: 403,
    INTERNAL_SERVER_ERROR: 500,
    NOT_FOUND: 404,
    
  };
  
  class ApiError extends Error {
    constructor(status, message) {
      super(message);
      this.status = status;
    }
  
    static badRequest(message) {
      return new ApiError(HTTP_STATUS_CODES.BAD_REQUEST, message);
    }
  
    static internal(message) {
      return new ApiError(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, message);
    }
  
    static forbidden(message) {
      return new ApiError(HTTP_STATUS_CODES.FORBIDDEN, message);
    }
  
    static notFound(message) {
      return new ApiError(HTTP_STATUS_CODES.NOT_FOUND, message);
    }
  }
  
  module.exports = ApiError;