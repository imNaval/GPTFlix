import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { signOut, onAuthStateChanged } from 'firebase/auth'
import { auth } from '../utils/firebase'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { GPTFLIX_LOGO, USER_LOGO } from '../utils/constant'

const Header = () => {

  const user = useSelector(store=> store.user);
  const navigate = useNavigate()



  const dispatch = useDispatch();

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

      return ()=> unsubscribe()
  }, []);

  const handleSignOut = () =>{
    signOut(auth).then(() => {
      //success
    }).catch((error) => {
      // An error happened.
      console.log(error)
    });
  }

  return (
    <div className='absolute px-8 py-3 bg-gradient-to-b from-black z-50 w-full flex justify-between'>
        <img
            className='w-48'
            src={GPTFLIX_LOGO}
            alt='netflixLogo'
        />

        {user &&
        <div className='items-center'>
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