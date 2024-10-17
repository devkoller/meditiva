export const PORT = window.location.protocol === 'http:' ? ':3030' : ':3013'

export const API_URL = import.meta.env.DEV
  ? import.meta.env.VITE_URL_API_LOCAL
  : 'https://api.meditiva.com.mx'
