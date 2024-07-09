/**
 * @desc    Send any success response
 *
 * @param   {string} message
 * @param   {object | array | null} data
 * @param   {number} statusCode
 */
const success = (message: string, data: unknown, statusCode: number) => {
  return {
    message,
    error: false,
    code: statusCode,
    data: data
  };
};

/**
 * @desc    Send any error response
 *
 * @param   {string} message
 * @param   {number} statusCode
 */
const error = (message: string, statusCode: number) => {
  const codes = [200, 201, 400, 401, 404, 403, 422, 500];
  const findCode = codes.find((code) => code == statusCode);

  if (!findCode) statusCode = 500;
  else statusCode = findCode;

  return {
    message,
    code: statusCode,
    error: true
  };
};

/**
 * @desc    Send any validation response
 *
 * @param   {object | array} errors
 */
const validation = (errors: unknown) => {
  return {
    message: 'Validation errors',
    error: true,
    code: 422,
    errors
  };
};

export { success, error, validation };
