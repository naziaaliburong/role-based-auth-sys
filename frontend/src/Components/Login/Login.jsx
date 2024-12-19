import React, { useState } from "react";
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import './Login.css';

function Login(){
    
    const [loginClick, setLoginClick] = useState(true);
    const [name, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
   
    function handleSignupClick(){
        setLoginClick(false);
    }
    function handleLoginClick(){
        setLoginClick(true);
    }
    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        try{
            const {data} = await axios.post('http://localhost:5000/login', {email, password});
            console.log(data);
            localStorage.setItem('token', data.token);
            localStorage.setItem('role', data.role);
            navigate('/home');
            
        } catch (err){
            alert(err.response.data.message);
        }
    };
    const handleSignUpSubmit = async (e) => {
        e.preventDefault();
        try{
            await axios.post('http://localhost:5000/signup', {name, email, password});
            alert('Signup successful! Please log in');
            navigate('/');
        } catch (err){
            alert(err.response.data.message);
        }
    }

    return(
    <div className="login-container">
            <div className='login-modal'>
                <div className='login-signup'>
                    <div className='log-sign-btn'>
                        <button className={loginClick && 'selected-btn-color'} onClick={handleLoginClick}>Login</button>
                        <button className={!loginClick && 'selected-btn-color'} onClick={handleSignupClick}>Signup</button>
                    </div>
                    
                </div>

                
                {loginClick ? (
                <form onSubmit={handleLoginSubmit}>
                    <div className='email-password'>
                        <input placeholder='Email ID' value={email} onChange={(e) => setEmail(e.target.value)}/>
                        <input placeholder='Password' type='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <div className='login-btn'>
                        <button type="submit">Login</button>
                    </div>
                </form>
                ):(
                    <form onSubmit={handleSignUpSubmit}>
                    <div className='email-password'>
                        <input placeholder='Username' value={name} onChange={(e) => setUserName(e.target.value)}/>
                        <input placeholder='Email ID' value={email} onChange={(e) => setEmail(e.target.value)}/>
                        <input placeholder='Password' type='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <div className='signup-btn'>
                        <button type="submit">Sign Up</button>
                    </div>
                </form>
                )}
            </div>
    
    </div>
    );
};

export default Login;