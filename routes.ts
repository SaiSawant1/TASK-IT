/**
 * An Array of routes that are accessible to the
 * These routes do not require authentication
 * @type {string[]}
 */
export const publicRoutes = ["/"];

/**
 * An Array of routes that are used for authentication
 * These routes will redirect loggen in user to dashboard
 * @type {string[]}
 */
export const authRoutes = ["/login", "/sign-up", "/new-verification"];

/**
 * The prefix for api routes
 * Routes starting with this are used for API authentication purposes
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * The default redirect path
 * user will be redirected here when logged in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/organization-select";
