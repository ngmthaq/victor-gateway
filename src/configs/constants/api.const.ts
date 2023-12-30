/**
 * HTTP response status codes
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
 */
export const API_HTTP_STATUS = {
  OK: 200,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  UNPROCESSABLE_CONTENT: 422,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
};

/**
 * API Todo Endpoints
 */
export const API_TODO_ENDPOINTS = {
  todos: "/todos",
  todo: "/todos/:id",
};
