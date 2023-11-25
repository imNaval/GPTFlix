import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { signOut, onAuthStateChanged } from 'firebase/auth'
import { auth } from '../utils/firebase'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { GPTFLIX_LOGO, SUPPORTED_LANGUAGE, USER_LOGO } from '../utils/constant'
import { toggleGptSearchView } from '../utils/gptSlice'
import { changeLanguage } from '../utils/configSlice'

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
      console.log(error)
    });
  }

  const handleGptToggle = () => {
    dispatch(toggleGptSearchView())
  }

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value))
  }

  return (
    <div className='absolute px-8 py-3 bg-gradient-to-b from-black z-50 w-full flex justify-between flex-col md:flex-row'>
      <img
        className='w-48 mx-auto md:mx-0'
        src={GPTFLIX_LOGO}
        alt='netflixLogo'
      />

      {user &&
        <div className='flex p-2 justify-between items-center'>
          {showGptSearch &&
          //value={SUPPORTED_LANGUAGE.filter(lang => lang.identifier === langKey)[0].name} 
          // defaultValue={SUPPORTED_LANGUAGE.filter(lang => lang.identifier === langKey)[0].name}
            <select className='p-2 m-2 bg-gray-900 text-white' onChange={(e) => handleLanguageChange(e)}>{
              SUPPORTED_LANGUAGE.map(lang => (
                <option key={lang.identifier} value={lang.identifier} selected={lang.identifier === langKey}>
                  {lang.name}
                </option>
              ))
            }
            </select>
          }

          <button className='border border-white rounded-lg bg-purple-400 text-white front-2xl px-4 py-2 mx-2' onClick={handleGptToggle}>{showGptSearch ? "Home Page" : "GPT Search"}</button>
          <img
            className='w-8 h-8'
            src={USER_LOGO}
            alt='userLogo'
            onClick={handleSignOut}
          />
        </div>
      }
    </div>
  )
}

export default Header