import React from 'react'
import { useSelector } from 'react-redux'
import { signOut } from 'firebase/auth'
import { auth } from '../utils/firebase'
import { useNavigate } from 'react-router-dom'

const Header = () => {

  const user = useSelector(store=> store.user);
  const navigate = useNavigate()

  const handleSignOut = () =>{
    signOut(auth).then(() => {
      navigate("/")
    }).catch((error) => {
      // An error happened.
      console.log(error)
    });
  }
  
  return (
    <div className='absolute px-8 py-3 bg-gradient-to-b from-black z-50 w-full flex justify-between'>
        <img
            className='w-48'
            src='https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png'
            alt='netflixLogo'
        />

        {user &&
        <div className='items-center'>
          <img
            className='w-8 h-8'
            src='https://wallpapers.com/images/hd/netflix-profile-pictures-1000-x-1000-qo9h82134t9nv0j0.jpg'
            alt='netflixLogo'
            onClick={handleSignOut}
          />
          </div>
        }
    </div>
  )
}

export default Header