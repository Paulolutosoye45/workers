import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import  { format } from 'date-fns'

function SiginUp() {
  
  const forms = {
     first_name: "",
     username: "",
     last_name: "",
     email: "",
     password: "",
     isUserActive: true,
  } 
  const [formdata, setformdata]=useState(forms)
  const [gender, setgender]=useState()
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { first_name, username, last_name, email, password, isUserActive}= formdata

  const radioChangeHandler = (e) => {
    setgender(e.target.value);
  };


  const handleChange = (e) => {
    const {name, value} = e.target
     setformdata({...formdata, [name]: value})
  }
  let employement_date = format(new Date(), "yyyy-MM-dd")
  let sex = gender
  const formfield = { first_name, username, last_name, email, sex, employement_date, password, isUserActive}
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(!first_name || !username || !last_name || !email || !sex || !employement_date || !password || !isUserActive){
      return;
    } else {
    try {
      setLoading(true);
      setError(false);
      const response = await fetch('api/users/signup', {
        method: 'POST',
        body: JSON.stringify(formfield),
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok) {
        setLoading(false)
        setError(false)
        const data = await response.json();
        console.log(data)
        toast(data)
        navigate('/Home');
      } else {
        // Handle error
        setLoading(false)
        setError(true)
      }
    } catch (error) {
      console.log(error.message)
    }
  }
  };
     
  return (
    <div className="formWrapper">
      <h1>create an account</h1>
      <form action="" onSubmit={handleSubmit} className="signup">
      <p  className="formText">it's quick and easy</p>
      <div className="Name">
        <input
          type='text'
          placeholder='firstname'
          name='first_name'
          value={first_name}
          // required
          onChange={handleChange}/>
        <input
          type='text'
          placeholder='lastname'
          name='username'
          value={username}
          // required
          onChange={handleChange}/>
          </div>
          <div className="Name">
        <input
          type='text'
          placeholder='username'
          name='last_name'
          value={last_name}
          // required
          onChange={handleChange}/>
        <input
          type='email'
          placeholder='email'
          name='email'
          value={email}
          // required
          onChange={handleChange}/>
          </div>
          <div className="Gender">
          <div className="Fm">
            <label htmlFor="Gender">male</label>
        <input
              type="radio"
              name="male"
              value="male"
              id="male"
              checked={gender === "male"}
            onChange={radioChangeHandler}
            />   
            </div>
            <div className="Ml">
              <label htmlFor="Gender">female</label>
        <input
            type="radio"
            name="female"
            value="female"
            id="female"
            checked={gender === "female"}
            onChange={radioChangeHandler}
            />   
             </div>
             </div>
        <input
        className='pwd'
            type='password'
            placeholder='password'
            value={password}
            name='password'
            // required
            onChange={handleChange}
          />
          <button className="btn-signup">Create Account</button>
          <p className="Account"><Link to='/signin'>Already have an Account</Link></p>
      </form>
      {error && error.message}
    </div>
  )
}

export default SiginUp