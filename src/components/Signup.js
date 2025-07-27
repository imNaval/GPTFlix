import React, { useRef, useState, useEffect } from 'react'
import { validateData } from '../utils/validate'
import { createUserWithEmailAndPassword, updateProfile, sendEmailVerification, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import {auth} from '../utils/firebase'
import { useDispatch } from 'react-redux'
import { addUser, removeUser } from '../utils/userSlice'
import { FaEnvelope, FaCheck, FaSpinner, FaExternalLinkAlt, FaTimes, FaEye, FaEyeSlash } from 'react-icons/fa'

const Signup = ({ onSwitchToLogin, errorMessage, setErrorMessage, loading, setLoading }) => {
    const [showPassword, setShowPassword] = useState(false)
    const [showVerificationModal, setShowVerificationModal] = useState(false)
    const [checkingVerification, setCheckingVerification] = useState(false)
    const [resendLoading, setResendLoading] = useState(false)
    const [resendSuccess, setResendSuccess] = useState(false)

    const email = useRef(null)
    const password = useRef(null)
    const name = useRef(null)

    const dispatch = useDispatch();

    // Clear user data on component mount if user is not verified
    useEffect(() => {
        if (auth.currentUser && !auth.currentUser.emailVerified) {
            dispatch(removeUser());
        }
    }, [dispatch]);

    // Function to open email client
    const openEmailClient = (emailAddress) => {
        const emailProviders = {
            'gmail.com': 'https://mail.google.com',
            'yahoo.com': 'https://mail.yahoo.com',
            'outlook.com': 'https://outlook.live.com',
            'hotmail.com': 'https://outlook.live.com',
            'icloud.com': 'https://www.icloud.com/mail',
            'aol.com': 'https://mail.aol.com'
        };

        const domain = emailAddress.split('@')[1];
        const emailUrl = emailProviders[domain] || `mailto:${emailAddress}`;
        
        window.open(emailUrl, '_blank');
    };

    // Function to open default mail app
    const openDefaultMail = (emailAddress) => {
        window.open(`mailto:${emailAddress}`, '_blank');
    };

    // Function to open spam folder
    const openSpamFolder = (emailAddress) => {
        const emailProviders = {
            'gmail.com': 'https://mail.google.com/mail/u/0/#spam',
            'yahoo.com': 'https://mail.yahoo.com/d/folders/1?.intl=us&.lang=en-US&.partner=none&.src=fp',
            'outlook.com': 'https://outlook.live.com/mail/0/junkemail',
            'hotmail.com': 'https://outlook.live.com/mail/0/junkemail',
            'icloud.com': 'https://www.icloud.com/mail',
            'aol.com': 'https://mail.aol.com/webmail-std/en-us/suite'
        };

        const domain = emailAddress.split('@')[1];
        const spamUrl = emailProviders[domain] || `mailto:${emailAddress}`;
        
        window.open(spamUrl, '_blank');
    };

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
        const Validation = validateData(email.current.value, password.current.value, name.current.value);
        setErrorMessage(Validation)

        if(Validation || loading) return;

        setLoading(true)
        
        // Sign up 
        createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
            const user = userCredential.user;

            // Store email and display name for verification completion
            window.localStorage.setItem('emailForSignIn', email.current.value);
            if (name.current.value) {
                window.localStorage.setItem('displayNameForSignIn', name.current.value);
            }

            // Send email verification
            // console.log('Attempting to send verification email to:', user.email);
            sendEmailVerification(user, {
                url: window.location.origin + '/', // Redirect back to login page
                handleCodeInApp: false
            })
            .then(() => {
                // Clear any existing user data from Redux since email is not verified yet
                dispatch(removeUser());
                setShowVerificationModal(true) // Show modal instead of inline message
                // console.log('Verification email sent successfully to:', user.email);
                // console.log('Verification URL:', window.location.origin + '/');
            })
            .catch((error) => {
                console.error('Error sending verification email:', error);
                console.error('Error code:', error.code);
                console.error('Error message:', error.message);
                setErrorMessage("Failed to send verification email: " + error.message)
            });

            updateProfile(auth.currentUser, {
                displayName: name.current.value,
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

    const handleResendVerification = () => {
        if (auth.currentUser) {
            setResendLoading(true)
            setResendSuccess(false)
            setErrorMessage(null)
            
            sendEmailVerification(auth.currentUser, {
                url: window.location.origin + '/',
                handleCodeInApp: false
            })
            .then(() => {
                setResendSuccess(true)
                //  console.log('Verification email resent successfully');
                // Clear success message after 3 seconds
                setTimeout(() => {
                    setResendSuccess(false)
                }, 3000)
            })
            .catch((error) => {
                console.error('Error resending verification email:', error);
                setErrorMessage("Failed to send verification email: " + error.message)
            })
            .finally(() => {
                setResendLoading(false)
            });
        } else {
            setErrorMessage("No user found. Please sign up first.");
        }
    }

    const handleCheckVerification = () => {
        if (auth.currentUser) {
            setCheckingVerification(true);
            auth.currentUser.reload().then(() => {
                if (auth.currentUser.emailVerified) {
                    setShowVerificationModal(false);
                    setErrorMessage("Email verified successfully! Redirecting...");
                    
                    // Dispatch user to Redux store
                    dispatch(addUser({
                        uid: auth.currentUser.uid,
                        email: auth.currentUser.email,
                        displayName: auth.currentUser.displayName
                    }));
                    
                    // Redirect to browse page after successful verification
                    setTimeout(() => {
                        window.location.href = '/browse';
                    }, 2000);
                } else {
                    setErrorMessage("Email not verified yet. Please check your inbox and click the verification link.");
                }
            }).catch((error) => {
                setErrorMessage("Error checking verification status: " + error.message);
            }).finally(() => {
                setCheckingVerification(false);
            });
        }
    }

    return (
        <>
            <form className='absolute p-8 my-28 mx-auto right-0 left-0 w-[90%] sm:w-2/3 lg:w-1/3 bg-primary-bg text-white rounded-lg bg-opacity-70'
                onSubmit={(e)=>{
                    e.preventDefault()
                    handleSubmitForm();
                }}
            >
                <h1 className='font-bold text-3xl py-4'>Sign Up</h1>

                <input
                    className='p-4 my-4 w-full bg-gray-700 rounded-lg'
                    type='text'
                    placeholder='Full Name'
                    ref={name}
                />

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

                <p className='sm:font-bold text-red-800 absolute sm:pl-4 pr-2 sm:pr-8 max-h-12 overflow-hidden'>{errorMessage}</p>

                <button className={`p-4 mt-16 mb-4 bg-red-700 w-full rounded-lg ${loading ? 'cursor-wait' : 'cursor-pointer' }`}>Sign Up</button>

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
                    onClick={onSwitchToLogin}
                >Already registered? Sign In Now</p>
            </form>

            {/* Email Verification Modal Overlay */}
            {showVerificationModal && (
                <div className="fixed inset-0 bg-primary-bg bg-opacity-75 flex items-center justify-center z-50 p-4">
                    <div className="bg-gray-900 rounded-lg p-6 max-w-md w-full border border-gray-700 shadow-2xl">
                        {/* Modal Header */}
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="bg-green-600 p-2 rounded-full">
                                    <FaEnvelope className="text-white text-lg" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-white">Check Your Email</h2>
                                    <p className="text-gray-400 text-sm">We've sent a verification link</p>
                                </div>
                            </div>
                            <button 
                                onClick={() => {
                                    setShowVerificationModal(false);
                                    // Clear user data if they close the modal without verifying
                                    dispatch(removeUser());
                                }}
                                className="text-gray-400 hover:text-white transition-colors"
                            >
                                <FaTimes className="text-xl" />
                            </button>
                        </div>

                        {/* Email Address Display */}
                        <div className="bg-gray-800 rounded-lg p-3 mb-4">
                            <p className="text-gray-400 text-sm">Verification email sent to:</p>
                            <p className="text-white font-medium">{email.current?.value || 'your email'}</p>
                        </div>

                        {/* Quick Email Access Buttons */}
                        <div className="grid grid-cols-3 gap-2 mb-4">
                            <button 
                                type="button"
                                className="flex items-center justify-center gap-1 px-2 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-xs"
                                onClick={() => openEmailClient(email.current?.value || '')}
                            >
                                <FaExternalLinkAlt className="text-xs" />
                                Open Gmail
                            </button>
                            <button 
                                type="button"
                                className="flex items-center justify-center gap-1 px-2 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-xs"
                                onClick={() => openSpamFolder(email.current?.value || '')}
                            >
                                <FaExternalLinkAlt className="text-xs" />
                                Check Spam
                            </button>
                            <button 
                                type="button"
                                className="flex items-center justify-center gap-1 px-2 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-xs"
                                onClick={() => openDefaultMail(email.current?.value || '')}
                            >
                                <FaExternalLinkAlt className="text-xs" />
                                Mail App
                            </button>
                        </div>

                        {/* Action Buttons */}
                        <div className="space-y-3">
                            <button 
                                type="button"
                                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                                onClick={handleCheckVerification}
                                disabled={checkingVerification}
                            >
                                {checkingVerification ? (
                                    <FaSpinner className="animate-spin" />
                                ) : (
                                    <FaCheck />
                                )}
                                {checkingVerification ? 'Checking...' : 'Check Verification Status'}
                            </button>
                            
                            <button 
                                type="button"
                                className={`w-full flex items-center justify-center gap-2 px-4 py-2 text-white rounded-lg transition-colors ${resendLoading ? 'bg-gray-600 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
                                onClick={handleResendVerification}
                                disabled={resendLoading}
                            >
                                {resendLoading ? (
                                    <FaSpinner className="animate-spin" />
                                ) : (
                                    <FaEnvelope />
                                )}
                                {resendLoading ? 'Sending...' : 'Resend Email'}
                            </button>
                        </div>

                        {/* Success Message */}
                        {resendSuccess && (
                            <div className="mt-4 p-3 bg-green-900 bg-opacity-30 border border-green-700 rounded-lg">
                                <div className="flex items-center gap-2">
                                    <FaCheck className="text-green-400" />
                                    <p className="text-green-200 text-sm font-medium">Verification email sent successfully!</p>
                                </div>
                            </div>
                        )}

                        {/* Help Text */}
                        <div className="mt-4 text-center">
                            <p className="text-gray-400 text-xs">
                                Didn't receive the email? Check your <span className='text-orange-800 italic'>spam folder</span> or try resending.
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Signup
