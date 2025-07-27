import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { signOut, onAuthStateChanged } from 'firebase/auth'
import { auth } from '../utils/firebase'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { SUPPORTED_LANGUAGE, USER_LOGO } from '../utils/constant'
import { toggleGptSearchView } from '../utils/gptSlice'
import { changeLanguage } from '../utils/configSlice'
import GPTFLIX from "../utils/images/GPTFLIX.png"
import { FaHome, FaRobot, FaGlobe, FaUser, FaSignOutAlt } from 'react-icons/fa'

const Header = () => {

  const user = useSelector(store => store.user);
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const showGptSearch = useSelector(store => store.gpt.showGptSearch)
  const langKey = useSelector(store => store.config.lang)
  //console.log(SUPPORTED_LANGUAGE.filter(lang => lang.identifier === langKey)[0].name)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Check if email is verified (only for email/password users, not Google users)
        if (user.providerData[0]?.providerId === 'password' && !user.emailVerified) {
          // User is signed in but email is not verified
          dispatch(removeUser())
          navigate("/")
          return;
        }
        
        const { uid, email, displayName } = user
        dispatch(addUser({
          uid: uid,
          email: email,
          displayName: displayName
        }))
        navigate("/browse")
      } else {
        // User is signed out
        dispatch(removeUser())
        navigate("/")
      }
    });

    return () => unsubscribe()
  }, []);

  const handleSignOut = () => {
    signOut(auth).then(() => {
      //success
    }).catch((error) => {
      // An error happened.
      console.error(error)
    });
  }

  const handleGptToggle = () => {
    dispatch(toggleGptSearchView())
  }

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value))
  }

  return (
    <div className='absolute px-2 sm:px-8 py-3 bg-gradient-to-b from-black z-50 w-full flex justify-between flex-col md:flex-row -top-16 md:-top-10'>
      <img
        className='w-48 mx-auto md:mx-0 cursor-pointer'
        src={GPTFLIX}
        alt='netflixLogo'
        onClick={() => navigate("/")}
      />

      {user &&
        <div className='flex justify-between items-center sm:p-2 -mt-12 md:mt-0'>
          <button className='flex items-center gap-2 border border-white rounded-lg bg-purple-400 text-white text-base px-2 sm:px-3 py-1.5 sm:py-2 sm:mx-2 hover:bg-purple-500 transition-colors duration-200' onClick={handleGptToggle}>
            {showGptSearch ? <><FaHome className="text-sm" /> Home</> : <><FaRobot className="text-sm" /> GPT Search</>}
          </button>
          {/* {showGptSearch &&
            <div className='relative'>
              <FaGlobe className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm' />
              <select className='pl-4 pr-2 py-2 m-2 bg-gray-900 text-white cursor-pointer rounded-lg border border-gray-700 focus:outline-none focus:border-purple-400 transition-colors duration-200' onChange={(e) => handleLanguageChange(e)}>{
                SUPPORTED_LANGUAGE.map(lang => (
                  <option key={lang.identifier} value={lang.identifier} selected={lang.identifier === langKey}>
                    {lang.name}
                  </option>
                ))
              }
              </select>
            </div>
          } */}
          <div className='flex ml-4 gap-3'>
            <div className='flex items-center gap-2 py-2 px-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg border border-blue-400 shadow-lg'>
              <FaUser className="text-sm" />
              <span className='text-sm font-medium'>{user?.displayName?.length > 10 ? user?.displayName.substring(0,10) : user?.displayName }</span>
            </div>
            <button className='flex items-center gap-2 py-2 px-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg border border-red-400 shadow-lg hover:from-red-700 hover:to-red-800 transition-all duration-200 font-medium text-sm' onClick={handleSignOut}>
              <FaSignOutAlt className="text-sm" />
              Logout
            </button>
          </div>
        </div>
      }
    </div>
  )
}

export default Header