interface IResponse {
  success: boolean;
  message?: string;
  data: object | null | any;
}

export type ErrorResponse = IResponse & {
  error_code: number;
};

/**
 * Creates a success response object.
 *
 * @param {IResponse["data"]} data - The data of the response.
 * @param {string} [message] - The message of the response. Defaults to undefined.
 * @returns {IResponse} - The response object.
 */
export const createResponse = (
  data: IResponse["data"],
  message?: string,
): IResponse => {
  return { data, message, success: true };
};

// export const createResponse = (
//   data: IResponse["data"],
//   message?: string
// ): IResponse => {
//   return { data, message, success: true }; // success is always true
// };

// Specific response for errors
export const createErrorResponse = (
  message: string,
  data: IResponse["data"] = null,
): IResponse => {
  return { data, message, success: false };
};
