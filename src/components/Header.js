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
          <button className='border border-white rounded-lg bg-purple-400 text-white text-lg px-2 sm:px-4 py-2 sm:mx-2' onClick={handleGptToggle}>{showGptSearch ? "Home Page" : "GPT Search"}</button>
          {showGptSearch &&
            <select className='p-2 m-2 bg-gray-900 text-white cursor-pointer' onChange={(e) => handleLanguageChange(e)}>{
              SUPPORTED_LANGUAGE.map(lang => (
                <option key={lang.identifier} value={lang.identifier} selected={lang.identifier === langKey}>
                  {lang.name}
                </option>
              ))
            }
            </select>
          }
          {/* <img
            className='w-8 h-8'
            src={USER_LOGO}
            alt='userLogo'
            onClick={handleSignOut}
          /> */}
          <div className='flex ml-4 gap-2'>
            <p className='py-2 px-2 sm:px-4 sm:text-lg text-white bg-blue-500 rounded-lg border border-white cursor-none'>{user?.displayName?.length > 10 ? user?.displayName.substring(0,10) : user?.displayName }</p>
            <button className='py-2 px-2 sm:px-4 sm:font-bold sm:text-lg text-red-600 bg-blue-500 rounded-lg border border-red-400' onClick={handleSignOut}>Logout</button>
          </div>
        </div>
      }
    </div>
  )
}

export default Header