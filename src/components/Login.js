import React, { useState } from 'react'
import Header from './Header'

const Login = () => {
    const [isSignInForm, setIsSignInForm] = useState(true)

    return (
        <div>
            <Header />
            <div className='absolute'>
                <img
                    src='https://assets.nflxext.com/ffe/siteui/vlv3/9db4a880-3034-4e98-bdea-5d983e86bf52/b5953637-091d-4e02-9754-2bfadc8a8f7c/IN-en-20230925-popsignuptwoweeks-perspective_alpha_website_large.jpg'
                    alt='backgroundImage'
                />
            </div>
            <form className='absolute p-12 my-40 mx-auto right-0 left-0 w-1/3 bg-black text-white rounded-lg bg-opacity-70'>
                <h1 className='font-bold text-3xl py-4'>{isSignInForm ? "Sign In" : "Sign Up" }</h1>

                {!isSignInForm &&
                    <input
                        className='p-4 my-4 w-full bg-gray-700 rounded-lg'
                        type='text'
                        placeholder='Full Name'
                    />
                }

                <input
                    className='p-4 my-4 w-full bg-gray-700 rounded-lg'
                    type='email'
                    placeholder='Email Address'
                />

                <input
                    className='p-4 my-4 w-full bg-gray-700 rounded-lg'
                    type='password'
                    placeholder='Password'
                />

                <button className='p-4 my-6 bg-red-700 w-full rounded-lg'>{isSignInForm ? "Sign In" : "Sign Up" }</button>

                <p className='cursor-pointer'
                    onClick={()=> setIsSignInForm(!isSignInForm)}
                >{isSignInForm  ? "New to GptFlix? Sign Ip Now" : "Already registered? Sign In Now " }</p>
            </form>
        </div>
    )
}

export default Login