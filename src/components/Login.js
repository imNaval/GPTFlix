import React, { useRef, useState } from 'react'
import Header from './Header'
import { validateData } from '../utils/validate'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth'
import {auth} from '../utils/firebase'
import { useDispatch } from 'react-redux'
import { addUser } from '../utils/userSlice'

const Login = () => {
    const [isSignInForm, setIsSignInForm] = useState(true)
    const [errorMessage, setErrorMessage] = useState(null)

    const email = useRef(null)
    const password = useRef(null)
    const name = useRef(null)

    const dispatch = useDispatch();

    const handleSubmitForm = () =>{
        // console.log(email)
        setErrorMessage(validateData(email.current.value, password.current.value, !isSignInForm&& name.current.value))
        if(errorMessage) return;

        if(!isSignInForm){
            // Signed up 
            createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
            .then((userCredential) => {
                const user = userCredential.user;
                // console.log(user)

                updateProfile(auth.currentUser, {
                    displayName: name.current.value,
                    // photoURL: "https://example.com/jane-q-user/profile.jpg"
                  }).then(() => {
                    const { uid, email, displayName } = auth.currentUser
                    dispatch(addUser({
                        uid,
                        email,
                        displayName
                    }))
                  }).catch((error) => {
                    setErrorMessage(error)
                  });
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setErrorMessage(errorCode + " - " + errorMessage)
            });
        }
        else{
            // Signed in 
            signInWithEmailAndPassword(auth, email.current.value, password.current.value)
            .then((userCredential) => {
                const user = userCredential.user;
                // console.log(user)
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setErrorMessage(errorCode + " - " + errorMessage)
            });
        }
    }


    return (
        <div>
            <Header />
            <div className='absolute'>
                <img
                    src='https://assets.nflxext.com/ffe/siteui/vlv3/9db4a880-3034-4e98-bdea-5d983e86bf52/b5953637-091d-4e02-9754-2bfadc8a8f7c/IN-en-20230925-popsignuptwoweeks-perspective_alpha_website_large.jpg'
                    alt='backgroundImage'
                />
            </div>
            <form className='absolute p-12 my-40 mx-auto right-0 left-0 w-1/3 bg-black text-white rounded-lg bg-opacity-70'
                onSubmit={(e)=>{
                    e.preventDefault()
                    handleSubmitForm();
                }}
            >
                <h1 className='font-bold text-3xl py-4'>{isSignInForm ? "Sign In" : "Sign Up" }</h1>

                {!isSignInForm &&
                    <input
                        className='p-4 my-4 w-full bg-gray-700 rounded-lg'
                        type='text'
                        placeholder='Full Name'
                        ref={name}
                    />
                }

                <input
                    className='p-4 my-4 w-full bg-gray-700 rounded-lg'
                    type='email'
                    placeholder='Email Address'
                    ref={email}
                />

                <input
                    className='p-4 my-4 w-full bg-gray-700 rounded-lg'
                    type='password'
                    placeholder='Password'
                    ref={password}
                />

                <p className='font-bold text-red-800'>{errorMessage}</p>

                <button className='p-4 my-6 bg-red-700 w-full rounded-lg'>{isSignInForm ? "Sign In" : "Sign Up" }</button>

                <p className='cursor-pointer'
                    onClick={()=> setIsSignInForm(!isSignInForm)}
                >{isSignInForm  ? "New to GptFlix? Sign Ip Now" : "Already registered? Sign In Now " }</p>
            </form>
        </div>
    )
}

export default Login