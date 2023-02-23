import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from 'react';
import AuthContext from './AuthContext'

const auth = getAuth()

export const AuthProvider = ({ children }) => {

const [user, setUser] = useState();
const [loadingData,setLoadingData] = useState(true)

 useEffect(() => {
 onAuthStateChanged(auth,(user) => {
 setUser(user)
 setLoadingData(false)
 })

 }, []);
 
 
 return (
 <AuthContext.Provider value={{ user }}>{!loadingData && children}</AuthContext.Provider>
 );
 };