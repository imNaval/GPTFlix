import React, { useState, useEffect } from 'react'
import Header from './Header'
import { onAuthStateChanged, isSignInWithEmailLink, signInWithEmailLink, updateProfile } from 'firebase/auth'
import {auth} from '../utils/firebase'
import { useDispatch } from 'react-redux'
import { addUser } from '../utils/userSlice'
import BackGround from "../utils/images/BackGround.jpg"
import Login from './Login'
import Signup from './Signup'
import ResetPassword from './ResetPassword'

const AuthForm = () => {
    const [currentView, setCurrentView] = useState('login') // 'login', 'signup', 'reset'
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState(null)

    const dispatch = useDispatch();

    // Check if user is returning from email verification
    useEffect(() => {
        const checkEmailVerification = async () => {
            // Check if this is a sign-in with email link (verification link)
            if (isSignInWithEmailLink(auth, window.location.href)) {
                setLoading(true);
                setErrorMessage("Completing email verification...");
                
                try {
                    // Get the email from localStorage (we'll store it during signup)
                    let email = window.localStorage.getItem('emailForSignIn');
                    
                    if (!email) {
                        // If email is not in localStorage, prompt user
                        email = window.prompt('Please provide your email for confirmation');
                    }
                    
                    if (email) {
                        // Sign in with email link
                        const result = await signInWithEmailLink(auth, email, window.location.href);
                        
                        // Clear the email from localStorage
                        window.localStorage.removeItem('emailForSignIn');
                        
                        // Update user profile if needed
                        if (result.user && !result.user.displayName) {
                            const displayName = window.localStorage.getItem('displayNameForSignIn');
                            if (displayName) {
                                await updateProfile(result.user, {
                                    displayName: displayName
                                });
                                window.localStorage.removeItem('displayNameForSignIn');
                            }
                        }
                        
                        // Dispatch user to Redux store
                        dispatch(addUser({
                            uid: result.user.uid,
                            email: result.user.email,
                            displayName: result.user.displayName
                        }));
                        
                        setErrorMessage("Email verified successfully! Redirecting...");
                        
                        // Redirect to browse page
                        setTimeout(() => {
                            window.location.href = '/browse';
                        }, 2000);
                    }
                } catch (error) {
                    console.error('Error completing email verification:', error);
                    setErrorMessage("Error completing verification: " + error.message);
                } finally {
                    setLoading(false);
                }
            }
        };

        checkEmailVerification();
    }, [dispatch]);

    // Listen for auth state changes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user && user.emailVerified) {
                // User is signed in and email is verified, redirect to browse
                window.location.href = '/browse';
            }
        });

        return () => unsubscribe();
    }, []);

    const switchToLogin = () => {
        setCurrentView('login');
        setErrorMessage(null);
    };

    const switchToSignup = () => {
        setCurrentView('signup');
        setErrorMessage(null);
    };

    const switchToResetPassword = () => {
        setCurrentView('reset');
        setErrorMessage(null);
    };

    return (
        <div>
            <Header />
            <div className='fixed'>
                <img
                className='h-screen object-cover md:w-screen'
                    src={BackGround}
                    alt='backgroundImage'
                />
            </div>
            
            {currentView === 'login' && (
                <Login 
                    onSwitchToSignup={switchToSignup}
                    onSwitchToResetPassword={switchToResetPassword}
                    errorMessage={errorMessage}
                    setErrorMessage={setErrorMessage}
                    loading={loading}
                    setLoading={setLoading}
                />
            )}
            
            {currentView === 'signup' && (
                <Signup 
                    onSwitchToLogin={switchToLogin}
                    errorMessage={errorMessage}
                    setErrorMessage={setErrorMessage}
                    loading={loading}
                    setLoading={setLoading}
                />
            )}
            
            {currentView === 'reset' && (
                <ResetPassword 
                    onSwitchToLogin={switchToLogin}
                    errorMessage={errorMessage}
                    setErrorMessage={setErrorMessage}
                    loading={loading}
                    setLoading={setLoading}
                />
            )}
        </div>
    )
}

export default AuthForm