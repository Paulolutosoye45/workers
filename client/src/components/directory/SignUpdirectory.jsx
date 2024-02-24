import React from 'react'
import signup from '../../assets/Sign-up-pana.png'
import SiginUp from '../page/SignUp'


function SignUpdirectory() {
  return (
    <div className="container">
    <div className='directory-block'>
        <img src={signup} alt="" />
        <SiginUp/>
    </div>
    </div>
  )
}

export default SignUpdirectory