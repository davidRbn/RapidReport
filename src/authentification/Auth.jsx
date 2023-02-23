import React from 'react'
import './auth.css'
import {signInWithEmailAndPassword,getAuth }from 'firebase/auth';
import { useState } from "react";
import { useContext } from "react";
import AuthContext from "../authContext/AuthContext";
import { Navigate } from "react-router-dom";



const Auth  = () => {
const { user } = useContext(AuthContext);
    
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [error, seterror] = useState("");    
const auth = getAuth();

    const signIn = async (email, password) => {
        try {
        const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
        );
        const user = userCredential.user;
        // console.log(user.uid)
        return true
        } catch (error) {
        return {error: error.message}
        }
       };

       const handleSubmit = async (e) => {
        e.preventDefault();
        setEmail("");
        setPassword("");
        const res = await signIn(email, password);
        console.log(res)
        if (res.error) seterror(res.error);
       
    };
       
    // console.log(user)

    return(
        <>
    <div className='sectionAuth'>
        <div className='auth'>
            <h2>Connexion</h2>
            {error ? <div>{error}</div> : null}
            {user && (
          <Navigate to="/mes-rapports" replace={true} />
        )}
 <form className='form-auth' onSubmit={handleSubmit}>
 <div><input
 type="text"
 name="email"
 value={email}
 placeholder="Your Email"
 onChange={(e) => setEmail(e.target.value)}
 /></div>
 <div>
 <input
 type="password"
 name="password"
 value={password}
 placeholder="Your Password"
 onChange={(e) => setPassword(e.target.value)}
 /></div>
 <div>
 <input className='submit-auth' type="submit" value="Se connecter" />
 </div>
 </form>
        </div>


    </div>

</>

    )



}

export default Auth 