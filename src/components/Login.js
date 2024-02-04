import React, { useRef, useState } from 'react'
import Header from './Header'
import { validateData } from '../utils/validate'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth'
import {auth} from '../utils/firebase'
import { useDispatch } from 'react-redux'
import { addUser } from '../utils/userSlice'
// import { BG_IMG } from '../utils/constant'
import BackGround from "../utils/images/BackGround.jpg"

const Login = () => {
    const [isSignInForm, setIsSignInForm] = useState(true)
    const [errorMessage, setErrorMessage] = useState(null)
    const [loading, setLoading] = useState(false)

    const email = useRef(null)
    const password = useRef(null)
    const name = useRef(null)

    const dispatch = useDispatch();

    const handleSubmitForm = () =>{
        const Validation = validateData(email.current.value, password.current.value, !isSignInForm&& name.current.value);
        setErrorMessage(Validation)

        // if(errorMessage) return;
        if(Validation || loading) return;

        setLoading(true)
        // console.log(loading)
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
            })
            .finally(()=>{
                setLoading(false)
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
                // setErrorMessage(errorCode + " - " + errorMessage)
                setErrorMessage(errorMessage)
            })
            .finally(()=>{
                setLoading(false)
            });
        }

        // setLoading(false)
    }


    return (
        <div>
            <Header />
            {/* <div className='absolute'> */}
            <div className='fixed'>
                <img
                className='h-screen object-cover md:w-screen'
                    src={BackGround}
                    alt='backgroundImage'
                />
            </div>
            <form className='absolute p-8 my-28 mx-auto right-0 left-0 w-[90%] sm:w-2/3 lg:w-1/3 bg-black text-white rounded-lg bg-opacity-70'
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

                <p className='sm:font-bold text-red-800 absolute sm:pl-4 pr-2 sm:pr-8 max-h-12 overflow-hidden'>{errorMessage}</p>

                <button className={`p-4 mt-16 mb-4 bg-red-700 w-full rounded-lg ${loading ? 'cursor-wait' : 'cursor-pointer' }`}>{isSignInForm ? "Sign In" : "Sign Up" }</button>

                <p className='cursor-pointer'
                    onClick={()=> {
                        setIsSignInForm(!isSignInForm)
                        setErrorMessage(null)
                    }}
                >{isSignInForm  ? "New to GptFlix? Sign Up Now" : "Already registered? Sign In Now " }</p>
            </form>
        </div>
    )
}

export default Login