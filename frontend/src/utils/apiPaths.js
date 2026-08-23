
export const BASE_URI = 'https://advanced-short-link-manager-1.onrender.com/'

export const API_PATHS = {
  AUTH: {
    SIGN_UP: "/api/auth/register",
    SIGN_IN: "/api/auth/signin",
    SIGN_OUT: "/api/auth/logout",
    REFRESH:  "/api/auth/refresh",
    VERIFY_OTP: "/api/auth/verifyotp",
    RESET_OTP: "/api/auth/reset-password-token",
    RESET_PASSWORD: "/api/auth/reset-password",
    MY_PROFILE: "/api/auth/myprofile",
    SEND_VERIFY_OTP: "/api/auth/sendotp",
  },
  LINK: {
    GENERATE: "/api/link/generate-link",
    GET_LINKS:'/api/links',
    GET_DATA: "/api/link/get-data",
    ADMIN_DASHBOARD: "/admin/dashboard",
    REDIRECT_OR_ANALYTICS: (shortId) => `/${shortId}`,
    DELETE: (shortId) => `/${shortId}`,
  },
};