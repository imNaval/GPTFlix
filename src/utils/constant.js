
export const BG_IMG = 'https://assets.nflxext.com/ffe/siteui/vlv3/9db4a880-3034-4e98-bdea-5d983e86bf52/b5953637-091d-4e02-9754-2bfadc8a8f7c/IN-en-20230925-popsignuptwoweeks-perspective_alpha_website_large.jpg'
export const GPTFLIX_LOGO = 'https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png'
export const USER_LOGO = 'https://wallpapers.com/images/hd/netflix-profile-pictures-1000-x-1000-qo9h82134t9nv0j0.jpg'

export const TMDB_API_KEYS = process.env.REACT_APP_TMDB_API_KEYS
export const TMDB_ACCESS_TOKEN = process.env.REACT_APP_TMDB_ACCESS_TOKEN
export const TMDB_API_OPTIONS = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer ' + TMDB_ACCESS_TOKEN
       }
  };

  export const IMG_CDN_URL = "https://image.tmdb.org/t/p/w500"
  export const IMG_CDN_URL_ORIGINAL = "https://image.tmdb.org/t/p/original/"

  export const  SUPPORTED_LANGUAGE = [
    {identifier: 'en', name: "English"},
    {identifier: 'hi', name: "Hindi"},
    {identifier: 'es', name: "Spanish"}
  ]

  export const OPENAI_KEY = process.env.REACT_APP_OPENAI_KEY

  export const YT_API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY

// FIREBASE CONFIG
export const FIREBASE_API_KEY = process.env.REACT_APP_FIREBASE_API_KEY
export const FIREBASE_AUTH_DOMAIN = process.env.REACT_APP_FIREBASE_AUTH_DOMAIN
export const FIREBASE_PROJECT_ID = process.env.REACT_APP_FIREBASE_PROJECT_ID
export const FIREBASE_STORAGE_BUCKET = process.env.REACT_APP_FIREBASE_STORAGE_BUCKET
export const FIREBASE_MESSAGING_SENDER_ID = process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID
export const FIREBASE_APP_ID = process.env.REACT_APP_FIREBASE_APP_ID
export const FIREBASE_MEASUREMENT_ID = process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
