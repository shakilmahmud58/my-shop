
import { useState } from "react";
import { useLocation, useHistory } from "react-router";
import useAuth from "../hooks/useAuth";




const SignUp = ()=>{
    const { emailSignUp, user, emailSignIn, googleSignIn, errorMessage}= useAuth();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState({});
    const [register, setRegister] = useState(true);
    const [error, setError] = useState('');
    const location = useLocation();
    const history = useHistory();
    const redirect_url = location.state?.from || '/home';

    const changeName=(e)=>{
        setName(e.target.value);
    }
    const changeEmail=(e)=>{
        setEmail(e.target.value);
    }
    const changePassword=(e)=>{
        setPassword(e.target.value);
    }
    const registerUser=(e,handleRoute)=>{
        e.preventDefault();
        if(password.length<6)
        {
            setError('Password should be greater thab 6 character');
        }
        else{
            emailSignUp(name,email, password, handleRoute);
        }
        
       

    }
    const handleRoute=()=>{
        history.push(redirect_url);
    }
    const alreadyRegister=(e)=>{
        setRegister(!register);
    }
    const signInUser=(e,handleRoute)=>{
        e.preventDefault();
        emailSignIn(email,password,handleRoute);
        
    }
    return(
      <div className="m-4">
          <h2>Please {register?<span>Register</span> : <span>Login</span>} first</h2>
          {register?
              <div className="mb-3 row">
             <label htmlFor="name" className="col-sm-2 col-form-label">Name</label>
             <div className="col-sm-10">
                 <input type="text" className="form-control" onBlur={changeName} id="name"/>
             </div>
          </div>:
          ''
          }
          
          <div className="mb-3 row">
             <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Email</label>
             <div className="col-sm-10">
                 <input type="email" className="form-control" onBlur={changeEmail} id="staticEmail"/>
             </div>
          </div>
          <div className="mb-3 row">
              <label htmlFor="password" className="col-sm-2 col-form-label">Password</label>
              <div className="col-sm-10">
                  <input type="password" className="form-control" onBlur={changePassword} id="password" />
               </div>
          </div>
          <div className="mb-3 row text-danger ms-4">{errorMessage}{error}</div>
          <div> 
              <input className="form-check-input mb-2" type="checkbox" onClick={alreadyRegister} name="flexRadioDefault" id="flexRadioDefault1" />
              <label className="form-check-label" htmlFor="flexRadioDefault1">
                 Already Registered
              </label>
          </div>
          <div>
              {
              register?
               <button className="btn btn-primary" onClick={ (e)=>{registerUser(e,handleRoute)} }>Register</button>:
               <button className="btn btn-primary" onClick={ (e)=>{signInUser(e,handleRoute)} }>Login</button>
               }
          </div> 
          <div> <hr/> </div>
          <button onClick={ ()=>{googleSignIn(handleRoute)}} className="btn btn-danger px-4 py-2">Continue With Google</button>
      </div>
    )
}

export default SignUp;