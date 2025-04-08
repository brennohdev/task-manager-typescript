const httpConfig = () => ({
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    ACCEPTED: 202,

    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    METHOD_NOT_ALLOWED: 405,
    UNPROCESSABLE_ENTITY: 422,
    TOO_MANY_REQUESTS: 429,
    
    INTERNAL_SERVER_ERROR: 500,
    NOT_IMPLEMENTED: 501,
    BAD_GATEWAY: 502,
    SERVICE_UNAVAILABLE: 503,
    GATEWAY_TIMEOUT: 504,
});

/* Separate the config from the app.ts file to make it easier to test and maintain 
    and to avoid circular dependencies. */

/* Extructure: 

    Successful responses
    200 OK: The request has succeeded.
    201 Created: The request has been fulfilled and resulted in a new resource being created.
    202 Accepted: The request has been accepted for processing, but the processing has not been completed.
    204 No Content: The server successfully processed the request, but is not returning any content.

    Client error responses
    400 Bad Request: The server could not understand the request due to invalid syntax.
    401 Unauthorized: The request requires user authentication.
    403 Forbidden: The server understood the request, but refuses to authorize it.
    404 Not Found: The server can't find the requested resource.
    409 Conflict: The request could not be completed due to a conflict with the current state of the resource.
    405 Method Not Allowed: The request method is not supported for the requested resource.
    422 Unprocessable Entity: The server understands the content type of the request entity, but was unable to process the contained instructions.
    429 Too Many Requests: The user has sent too many requests in a given amount of time.

    Server error responses
    500 Internal Server Error: The server encountered an unexpected condition that prevented it from fulfilling the request.
    501 Not Implemented: The server does not support the functionality required to fulfill the request.
    502 Bad Gateway: The server received an invalid response from the upstream server.
    503 Service Unavailable: The server is currently unable to handle the request due to temporary overload or maintenance of the server.
    504 Gateway Timeout: The server did not receive a timely response from the upstream server or some other auxiliary server.
*/

export const HTTPSTATUS = httpConfig(); //So we can acess it in the app.ts file

export type HttpStatusCode = (typeof HTTPSTATUS)[keyof typeof HTTPSTATUS];