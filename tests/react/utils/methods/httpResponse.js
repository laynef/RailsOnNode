module.exports = {

    //  1.x.x INFORMATIONAL HTTP Response Codes
    CONTINUE: {status_code: 100, status_meaning: `The server has received the request headers and the client should proceed to send the request body.`},
    SWITCHING_PROTOCOLS: {status_code: 101, status_meaning: `The requester has asked the server to switch protocols and the server has agreed to do so.`},
    PROCESSING: {status_code: 102, status_meaning: `A WebDAV request may contain many sub-requests involving file operations, requiring a long time to complete the request. This code indicates that the server has received and is processing the request, but no response is available yet.`},
    EARLY_HINTS: {status_code: 103, status_meaning: `Used to return some response headers before file HTTP message.`},

    //  2.x.x SUCCESS HTTP Response Codes
    OK: {status_code: 200, status_meaning: `Standard response for successful HTTP requests. The actual response will depend on the request method used. In a GET request, the response will contain an entity corresponding to the requested resource. In a POST request, the response will contain an entity describing or containing the result of the action.`},
    CREATED: {status_code: 201, status_meaning: `The request has been fulfilled, resulting in the creation of a new resource.`},
    ACCEPTED: {status_code: 202, status_meaning: `The request has been accepted for processing, but the processing has not been completed. The request might or might not be eventually acted upon, and may be disallowed when processing occur.`},
    NON_AUTHORITATIVE_INFO: {status_code: 203, status_meaning: `The server is a transforming proxy that received a 200 OK from its origin, but is returning a modified version of the origin's response..`},
    NO_CONTENT: {status_code: 204, status_meaning: `The server successfully processed the request and is not returning any content.`},
    RESET_CONTENT: {status_code: 205, status_meaning: `The server successfully processed the request, but is not returning any content. Unlike a 204 response, this response requires that the requester reset the document view.`},
    PARTIAL_CONTENT: {status_code: 206, status_meaning: `The server is delivering only part of the resource due to a range header sent by the client. The range header is used by HTTP clients to enable resuming of interrupted downloads, or split a download into multiple simultaneous streams.`},
    MULTI_STATUS: {status_code: 207, status_meaning: `The message body that follows is by default an XML message and can contain a number of separate response codes, depending on how many sub-requests were made.`},
    ALREADY_REPORTED: {status_code: 208, status_meaning: `The members of a DAV binding have already been enumerated in a preceding part of the (multistatus) response, and are not being included again..`},
    IM_USED: {status_code: 226, status_meaning: `The server has fulfilled a request for the resource, and the response is a representation of the result of one or more instance-manipulations applied to the current instance..`},

    //  3.x.x REDIRECTION HTTP Response Codes
    MULTIPLE_CHOICES: {status_code: 300, status_meaning: `Indicates multiple options for the resource from which the client may choose.`},
    MOVED_PERMANENTLY: {status_code: 301, status_meaning: `This and all future requests should be directed to the given URI.`},
    FOUND: {status_code: 302, status_meaning: `This is an example of industry practice contradicting the standard. The HTTP/1.0 specification  required the client to perform a temporary redirect.`},
    SEE_OTHER: {status_code: 303, status_meaning: `The response to the request can be found under another URI using the GET method. When received in response to a POST (or PUT/DELETE), the client should presume that the server has received the data and should issue a new GET request to the given URI..`},
    NOT_MODIFIED: {status_code: 304, status_meaning: `Indicates that the resource has not been modified since the version specified by the request headers If-Modified-Since or If-None-Match. In such case, there is no need to retransmit the resource since the client still has a previously-downloaded copy.`},
    USE_PROXY: {status_code: 305, status_meaning: `The requested resource is available only through a proxy, the address for which is provided in the response. Many HTTP clients (such as Mozilla[27] and Internet Explorer) do not correctly handle responses with this status code, primarily for security reasons.`},
    SWITCH_PROXY: {status_code: 306, status_meaning: `No longer used. Originally meant "Subsequent requests should use the specified proxy.`},
    TEMPORARY_REDIRET: {status_code: 307, status_meaning: `In this case, the request should be repeated with another URI; however, future requests should still use the original URI. In contrast to how 302 was historically implemented, the request method is not allowed to be changed when reissuing the original request. For example, a POST request should be repeated using another POST request.`},
    PERMANENT_REDIRECT: {status_code: 308, status_meaning: `The request and all future requests should be repeated using another URI. 307 and 308 parallel the behaviors of 302 and 301, but do not allow the HTTP method to change. So, for example, submitting a form to a permanently redirected resource may continue smoothly.`},

    //  4.x.x CLIENT ERRORS HTTP Response Codes
    BAD_REQUEST: {status_code: 400, status_meaning: `The server cannot or will not process the request due to an apparent client error.`},
    UNAUTHORIZATED: {status_code: 401, status_meaning: `Specifically for use when authentication is required and has failed or has not yet been provided.`},
    PAYMENT_REQUIRED: {status_code: 402, status_meaning: `Requires payment.`},
    FORBIDDEN: {status_code: 403, status_meaning: `The request was valid, but the server is refusing action. The user might not have the necessary permissions for a resource, or may need an account of some sort.`},
    NOT_FOUND: {status_code: 404, status_meaning: `The requested resource could not be found but may be available in the future. Subsequent requests by the client are permissible.`},
    METHOD_NOT_ALLOWED: {status_code: 405, status_meaning: `A request method is not supported for the requested resource; for example, a GET request on a form that requires data to be presented via POST, or a PUT request on a read-only resource.`},
    NOT_ACCEPTABLE: {status_code: 406, status_meaning: `The requested resource is capable of generating only content not acceptable according to the Accept headers sent in the request.`},
    PROXY_AUTH_REQUIRED: {status_code: 407, status_meaning: `The client must first authenticate itself with the proxy.`},
    REQUEST_TIMEOUT: {status_code: 408, status_meaning: `The server timed out waiting for the request. According to HTTP specifications: "The client did not produce a request within the time that the server was prepared to wait. The client MAY repeat the request without modifications at any later time.`},
    CONFLICT: {status_code: 409, status_meaning: `Indicates that the request could not be processed because of conflict in the request, such as an edit conflict between multiple simultaneous updates.`},
    GONE: {status_code: 410, status_meaning: `Indicates that the resource requested is no longer available and will not be available again. This should be used when a resource has been intentionally removed and the resource should be purged. Upon receiving a 410 status code, the client should not request the resource in the future.`},
    LENGTH_REQUIRED: {status_code: 411, status_meaning: `The request did not specify the length of its content, which is required by the requested resource.`},
    PRECONDITION_FAILED: {status_code: 412, status_meaning: `The server does not meet one of the preconditions that the requester put on the request.`},
    PAYLOAD_TOO_LARGE: {status_code: 413, status_meaning: `The request is larger than the server is willing or able to process. Previously called "Request Entity Too Large".`},
    URI_TOO_LONG: {status_code: 414, status_meaning: `The URI provided was too long for the server to process. Often the result of too much data being encoded as a query-string of a GET request, in which case it should be converted to a POST request.`},
    UNSUPPORTED_MEDIA_TYPE: {status_code: 415, status_meaning: `The request entity has a media type which the server or resource does not support. For example, the client uploads an image as image/svg+xml, but the server requires that images use a different format.`},
    RANGE_NOT_SATSIABLE: {status_code: 416, status_meaning: `The client has asked for a portion of the file (byte serving), but the server cannot supply that portion. For example, if the client asked for a part of the file that lies beyond the end of the file.`},
    EXPECTATUIB_FAILED: {status_code: 417, status_meaning: `The server cannot meet the requirements of the Expect request-header field.`},
    MISDIRECTED_REQUEST: {status_code: 421, status_meaning: `The request was directed at a server that is not able to produce a response.`},
    UNPROCESSABLE_ENTITY: {status_code: 422, status_meaning: `The request was well-formed but was unable to be followed due to semantic errors.`},
    LOCKED: {status_code: 423, status_meaning: `The resource that is being accessed is locked.`},
    FAILED_DEPENDENCY: {status_code: 424, status_meaning: `The request failed because it depended on another request and that request failed.`},
    UPGRADE_REQUIRED: {status_code: 426, status_meaning: `The client should switch to a different protocol such as TLS/1.0, given in the Upgrade header field.`},
    PRECONDITION_REQUIRED: {status_code: 428, status_meaning: `The origin server requires the request to be conditional. Intended to prevent the 'lost update' problem, where a client GETs a resource's state, modifies it, and PUTs it back to the server, when meanwhile a third party has modified the state on the server, leading to a conflict.`},
    TOO_MANY_REQUESTS: {status_code: 429, status_meaning: `The user has sent too many requests in a given amount of time. Intended for use with rate-limiting schemes.`},
    REQUEST_HEADER_FIELDS_TOO_LARGE: {status_code: 431, status_meaning: `The server is unwilling to process the request because either an individual header field, or all the header fields collectively, are too large.`},
    UNAVAILABLE_FOR_LEGAL_REASONS: {status_code: 451, status_meaning: `A server operator has received a legal demand to deny access to a resource or to a set of resources that includes the requested resource.`},

    //  5.x.x SERVER ERRORS HTTP Response Codes
    INTERNAL_SERVER_ERROR: {status_code: 500, status_meaning: `A generic error message, given when an unexpected condition was encountered and no more specific message is suitable.`},
    NOT_IMPLETEMENTED: {status_code: 501, status_meaning: `The server either does not recognize the request method, or it lacks the ability to fulfil the request. Usually this implies future availability.`},
    BAD_GATEWAY: {status_code: 502, status_meaning: `The server was acting as a gateway or proxy and received an invalid response from the upstream server.`},
    SERVICE_UNAVAILABLE: {status_code: 503, status_meaning: `The server is currently unavailable (because it is overloaded or down for maintenance). Generally, this is a temporary state.`},
    GETAWAY_TIMEOUT: {status_code: 504, status_meaning: `The server was acting as a gateway or proxy and did not receive a timely response from the upstream server.`},
    HTTP_VERSION_NOT_SUPPORTED: {status_code: 505, status_meaning: `The server does not support the HTTP protocol version used in the request.`},
    VARIANT_ALSO_NEGOTIATES: {status_code: 506, status_meaning: `Transparent content negotiation for the request results in a circular reference.`},
    INSUFFICIENT_STORAGE: {status_code: 507, status_meaning: `The server is unable to store the representation needed to complete the request.`},
    LOOP_DETECTED: {status_code: 508, status_meaning: `The server detected an infinite loop while processing the request.`},
    NOT_EXTENDED: {status_code: 510, status_meaning: `Further extensions to the request are required for the server to fulfil it.`},
    NETWORK_AUTH_REQUIRED: {status_code: 511, status_meaning: `The client needs to authenticate to gain network access. Intended for use by intercepting proxies used to control access to the network.`},

};