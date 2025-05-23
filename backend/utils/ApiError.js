class ApiError extends Error {
    constructor(statusCode, message = "Some thing went wrong", errors = [], stack = "") {
       super(message);
       this.data = null;
       this.statusCode = statusCode;
       this.message = message;
       this.errors = errors;
       this.success = false;
       if (stack) {
          this.stack = stack;
       }
       else {
          Error.captureStackTrace(this, this.constructor);
       }
    }  
}

export {ApiError}