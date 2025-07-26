# GPTFlix

- Create react app
- tailwind configured
- Routing
- Header
. Sign In & Sign Up Form
- Form Validation
- useRef Hook

# Features
- Login/SignUp
    - SignIn / SignUp Form with Email Verification
    - Google Authentication
    - Enhanced Email Validation (prevents fake/disposable emails)
    - Email Verification System
    - redirect to Browse PAge
- Browse (after authentication)
    - Header
    - Main Movies
        - Trailer in Background
        - Title & Description
        - MovieSuggestions
            - MoviesLists
- NetflixGPT
    - Search Bar
    - Movie Suggestions

# Authentication Features
- **Email/Password Authentication**
  - Enhanced email validation to prevent fake emails
  - Disposable email domain blocking
  - Email verification required before sign-in
  - Resend verification email functionality
  - Verification status checking

- **Google Authentication**
  - One-click Google sign-in
  - No email verification required for Google users
  - Automatic user profile creation

- **Security Features**
  - Frontend validation for common fake email patterns
  - Backend verification through Firebase
  - Email verification enforcement for email/password users

# deploy to firebase 
- npm install -g firebase-tools >>done
- firebase login
- firebase init
- firebase.json
    - {
        "hosting": {
            "site": "gptflix",

            "public": "public",
            ...
        }
    }
-firebase deploy --only hosting:gptflix

# react-youtube

# react-player
