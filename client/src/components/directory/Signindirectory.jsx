import React from 'react'
import signin from '../../assets/Sign-in-amico.png'
import SignIn from '../page/SignIn'

function Signindirectory() {
  return (
    <div className="container-2">
    <div className='directory-block-2'>
    <img src={signin} alt="" />
        <SignIn/>
      </div>
    </div>
  )
}

export default Signindirectory