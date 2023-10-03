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
    - SignIn / SignUp Form
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