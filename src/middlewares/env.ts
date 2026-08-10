// URL configuration — REACT_APP_BACKEND_URL is set in production (Netlify env vars)
const strapiUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:1337';
export const apiUrl = `${strapiUrl}/api`;
export const backendUrl = strapiUrl;
