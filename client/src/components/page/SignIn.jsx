import {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function SignIn() {
  const forms = {
    username: "",
    password: "",
 }
 const [formdata, setformdata]=useState(forms)
 const [error, setError] = useState(false);
 const [loading, setLoading] = useState(false);
 const navigate = useNavigate();
 const {username, password}= formdata



 const handleChange = (e) => {
   const {name, value} = e.target
    setformdata({...formdata, [name]: value})
 }
 const formfield = { username, password}

 const handleSubmit = async (event) => {
   event.preventDefault();
   try {
     setLoading(true);
     setError(false);
     const response = await fetch('api/users/signin', {
       method: 'POST',
       body: JSON.stringify(formfield),
       headers: { 'Content-Type': 'application/json' },
     });
 
     if (response.ok) {
       setLoading(false)
       setError(false)
       const data = await response.json();
       console.log(data)
       toast.success(data)
       navigate('/Home');
     } else {
       // Handle error
       setLoading(false)
       setError(true)
     }
   } catch (error) {
     console.log(error.message)
   }
 };
    
 return (
   <div className='formWrapper'>
     <h1>sign in</h1>
     <form action="" onSubmit={handleSubmit} className="login">
     <div className="Authname">
     <p  className="formText">welcome back</p>
       <input
         type='text'
         placeholder='username'
         name='username'
         value={username}
         onChange={handleChange}/> 
       <input
           type='password'
           placeholder='password'
           value={password}
           name='password'
           onChange={handleChange}
         />
         </div>
         <button className="btn-login">Login</button>
          <p className="Account"><Link to='/signup'>don't have an Account</Link></p>
     </form>
     {error && error.message}
   </div>
 )
}

export default SignIn