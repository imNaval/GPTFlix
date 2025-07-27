import React, { useState } from 'react'
import { sendPasswordResetEmail } from 'firebase/auth'
import {auth} from '../utils/firebase'
import { FaCheck, FaSpinner, FaExternalLinkAlt, FaTimes, FaLock } from 'react-icons/fa'

const ResetPassword = ({ onSwitchToLogin, errorMessage, setErrorMessage, loading, setLoading }) => {
    const [resetEmail, setResetEmail] = useState('')
    const [resetEmailSent, setResetEmailSent] = useState(false)

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

    // Function to open default mail app
    const openDefaultMail = (emailAddress) => {
        window.open(`mailto:${emailAddress}`, '_blank');
    };

    const handlePasswordReset = async () => {
        if (!resetEmail.trim()) {
            setErrorMessage("Please enter your email address");
            return;
        }

        setLoading(true);
        try {
            await sendPasswordResetEmail(auth, resetEmail, {
                url: window.location.origin + '/',
                handleCodeInApp: false
            });
            setResetEmailSent(true);
            setErrorMessage("Password reset email sent! Check your inbox.");
        } catch (error) {
            setErrorMessage("Error sending reset email: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <form className='absolute p-8 my-28 mx-auto right-0 left-0 w-[90%] sm:w-2/3 lg:w-1/3 bg-primary-bg text-white rounded-lg bg-opacity-70'
                onSubmit={(e)=>{
                    e.preventDefault()
                    handlePasswordReset();
                }}
            >
                <h1 className='font-bold text-3xl py-4'>Reset Password</h1>

                <input
                    className='p-4 my-4 w-full bg-gray-700 rounded-lg'
                    type='email'
                    placeholder='Enter your email address'
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                />

                <p className='sm:font-bold text-red-800 absolute sm:pl-4 pr-2 sm:pr-8 max-h-12 overflow-hidden'>{errorMessage}</p>

                <button className={`p-4 mt-16 mb-4 bg-red-700 w-full rounded-lg ${loading ? 'cursor-wait' : 'cursor-pointer' }`}>
                    {loading ? 'Sending...' : 'Send Reset Email'}
                </button>

                <p className='cursor-pointer'
                    onClick={onSwitchToLogin}
                >Back to Sign In</p>
            </form>

            {/* Password Reset Modal Overlay */}
            {resetEmailSent && (
                <div className="fixed inset-0 bg-primary-bg bg-opacity-75 flex items-center justify-center z-50 p-4">
                    <div className="bg-gray-900 rounded-lg p-6 max-w-md w-full border border-gray-700 shadow-2xl">
                        {/* Modal Header */}
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="bg-blue-600 p-2 rounded-full">
                                    <FaLock className="text-white text-lg" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-white">Reset Password</h2>
                                    <p className="text-gray-400 text-sm">Enter your email to reset password</p>
                                </div>
                            </div>
                            <button 
                                onClick={() => {
                                    setResetEmailSent(false);
                                    setResetEmail('');
                                }}
                                className="text-gray-400 hover:text-white transition-colors"
                            >
                                <FaTimes className="text-xl" />
                            </button>
                        </div>

                        {/* Success Message */}
                        <div className="bg-green-900 bg-opacity-30 border border-green-700 rounded-lg p-4 mb-4">
                            <div className="flex items-center gap-2 mb-2">
                                <FaCheck className="text-green-400" />
                                <p className="text-green-200 font-medium">Reset Email Sent!</p>
                            </div>
                            <p className="text-green-200 text-sm">
                                We've sent a password reset link to <strong>{resetEmail}</strong>
                            </p>
                        </div>

                        {/* Quick Email Access Buttons */}
                        <div className="grid grid-cols-2 gap-3 mb-4">
                            <button 
                                type="button"
                                className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                                onClick={() => openEmailClient(resetEmail)}
                            >
                                <FaExternalLinkAlt className="text-xs" />
                                Open Gmail
                            </button>
                            <button 
                                type="button"
                                className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                                onClick={() => openDefaultMail(resetEmail)}
                            >
                                <FaExternalLinkAlt className="text-xs" />
                                Open App
                            </button>
                            <button 
                                type="button"
                                className="flex items-center justify-center gap-1 px-2 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-xs"
                                onClick={() => openSpamFolder(resetEmail)}
                            >
                                <FaExternalLinkAlt className="text-xs" />
                                Check Spam
                            </button>
                        </div>

                        {/* Close Button */}
                        <button
                            type="button"
                            onClick={() => {
                                setResetEmailSent(false);
                                setResetEmail('');
                            }}
                            className="w-full px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                        >
                            Close
                        </button>

                        {/* Help Text */}
                        <div className="mt-4 text-center">
                            <p className="text-gray-400 text-xs">
                                Check your email and click the reset link to create a new password.
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default ResetPassword
