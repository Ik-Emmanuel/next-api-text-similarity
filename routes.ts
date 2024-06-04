/**
 * An array of routes that are accessible to the public
 * These routes do not require authentication
 * @type {string[]}
 */


// accessible by all users not signed it 
export const publicRoutes = [
    "/",
    "/auth/new-verification"
  ];

  // accessible by all users not signed it 
export const adminRoutes = [
 "/admin",
//  "/dashboard"
];
  
  /**
   * An array of routes that are used for authentication
   * These routes will redirect logged in users to /settings
   * @type {string[]}
   */
  
  // viewed and used for authentication
  export const authRoutes = [
    "/auth/login",
    "/auth/register",
    "/auth/error",
  ];
  
  /**
   * The prefix for API authentication routes
   * Routes that start with this prefix are used for API authentication purposes
   * @type {string}
   */
  
  // all next auth routes
  export const apiAuthPrefix = "/api/auth";
  
  /**
   * The default redirect path after logging in
   * @type {string}
   */
  
  // where users are redirected to immediately they are logged in except specified differently 
  export const DEFAULT_LOGIN_REDIRECT = "/";