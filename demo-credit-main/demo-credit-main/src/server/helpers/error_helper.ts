"use strict";

// Simple helper method to create new errors with a specific status value
// attached to them, to match up with the codes and methods below.

export class CustomError extends Error {
  status = 400;

  constructor(status: number, message: string) {
    super(message);

    this.status = status;

    Object.setPrototypeOf(this, CustomError.prototype);
  }

  getErrorMessage() {
    return "Something went wrong: " + this.message;
  }
}

export const createError = ({
  status = 500,
  message = "Something went wrong"
}) => {
  const error = new CustomError(status, message);
  return error;
};

export const BAD_REQUEST = 400;
export const UNAUTHORIZED = 401;
export const FORBIDDEN = 403;
export const CONFLICT = 409;
export const NOT_FOUND = 404;
export const UNPROCESSABLE = 422;
export const GENERIC_ERROR = 500;
