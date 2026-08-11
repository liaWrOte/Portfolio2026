// URL configuration — REACT_APP_BACKEND_URL is set in production (Netlify env vars)
const strapiUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:1337';
export const apiUrl = `${strapiUrl}/api`;
export const backendUrl = strapiUrl;

// Handles both relative (/uploads/...) and absolute (https://res.cloudinary.com/...) URLs
export const mediaUrl = (url: string | null | undefined): string | null => {
  if (!url) return null;
  if (url.startsWith('http')) return url;
  return `${strapiUrl}${url}`;
};
