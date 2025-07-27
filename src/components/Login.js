import React, { useRef, useState, useEffect } from 'react'
import { validateData } from '../utils/validate'
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import {auth} from '../utils/firebase'
import { useDispatch } from 'react-redux'
import { addUser, removeUser } from '../utils/userSlice'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

const Login = ({ onSwitchToSignup, onSwitchToResetPassword, errorMessage, setErrorMessage, loading, setLoading }) => {
    const [showPassword, setShowPassword] = useState(false)

    const email = useRef(null)
    const password = useRef(null)

    const dispatch = useDispatch();

    // Clear user data on component mount if user is not verified
    useEffect(() => {
        if (auth.currentUser && !auth.currentUser.emailVerified) {
            dispatch(removeUser());
        }
    }, [dispatch]);

    const handleGoogleSignIn = async () => {
        setLoading(true)
        setErrorMessage(null)
        
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            
            // Google users are automatically verified, so we can redirect immediately
            dispatch(addUser({
                uid: user.uid,
                email: user.email,
                displayName: user.displayName
            }));
            
            // Redirect to browse page for Google sign-in
            window.location.href = '/browse';
        } catch (error) {
            setErrorMessage(error.message);
        } finally {
            setLoading(false)
        }
    }

    const handleSubmitForm = () =>{
        const Validation = validateData(email.current.value, password.current.value);
        setErrorMessage(Validation)

        if(Validation || loading) return;

        setLoading(true)
        
        // Sign in 
        signInWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
            const user = userCredential.user;
            
            // Check if email is verified
            if (!user.emailVerified) {
                setErrorMessage("Please verify your email before signing in. Check your inbox for the verification link.")
                return;
            }
            
            // Dispatch user to Redux store
            dispatch(addUser({
                uid: user.uid,
                email: user.email,
                displayName: user.displayName
            }));
            
            // Redirect to browse page for verified email sign-in
            window.location.href = '/browse';
        })
        .catch((error) => {
            const errorMessage = error.message;
            setErrorMessage(errorMessage)
        })
        .finally(()=>{
            setLoading(false)
        });
    }

    return (
        <form className='absolute p-8 my-28 mx-auto right-0 left-0 w-[90%] sm:w-2/3 lg:w-1/3 bg-primary-bg text-white rounded-lg bg-opacity-70'
            onSubmit={(e)=>{
                e.preventDefault()
                handleSubmitForm();
            }}
        >
            <h1 className='font-bold text-3xl py-4'>Sign In</h1>

            <input
                className='p-4 my-4 w-full bg-gray-700 rounded-lg'
                type='email'
                placeholder='Email Address'
                ref={email}
            />

            {/* Password field with visibility toggle */}
            <div className='relative'>
                <input
                    className='p-4 my-4 w-full bg-gray-700 rounded-lg pr-12'
                    type={showPassword ? 'text' : 'password'}
                    placeholder='Password'
                    ref={password}
                />
                <button
                    type="button"
                    className='absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors'
                    onClick={() => setShowPassword(!showPassword)}
                >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
            </div>

            {/* Forgot Password Link */}
            <div className='text-right mb-4'>
                <button
                    type="button"
                    className='text-blue-400 hover:text-blue-300 text-sm underline'
                    onClick={onSwitchToResetPassword}
                >
                    Forgot Password?
                </button>
            </div>

            <p className='sm:font-bold text-red-800 absolute sm:pl-4 pr-2 sm:pr-8 max-h-12 overflow-hidden'>{errorMessage}</p>

            <button className={`p-4 mt-16 mb-4 bg-red-700 w-full rounded-lg ${loading ? 'cursor-wait' : 'cursor-pointer' }`}>Sign In</button>

            {/* Google Sign In Button */}
            <button 
                type="button"
                className={`p-4 mb-4 bg-white text-black w-full rounded-lg ${loading ? 'cursor-wait' : 'cursor-pointer' } flex items-center justify-center gap-2`}
                onClick={handleGoogleSignIn}
                disabled={loading}
            >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
            </button>

            <p className='cursor-pointer'
                onClick={onSwitchToSignup}
            >New to GptFlix? Sign Up Now</p>
        </form>
    )
}

export default Login