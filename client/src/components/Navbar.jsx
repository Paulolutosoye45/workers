import { useState } from 'react'
import { NavLink } from 'react-router-dom'


function Navbar () {
  return (
     <nav>
      <div className='nav-bar'>
        <h1>madam  sarah</h1>
        <ul>
          <li><NavLink to='/home'>Home</NavLink></li>
          <li><NavLink to='/'>About</NavLink></li>
          <li><NavLink to='/signin'>sign in</NavLink></li>
        </ul>
      </div>
     </nav>
  )
}

export default Navbar