
import { useState } from 'react';
import { dataIntervention } from '../monRapport/dataIntervention';
import DataInterContext from './dataInterContext'



export const AuthProvider = ({ children }) => {

const {dataInter} = useState(dataIntervention)


 


 return (
 <DataInterContext.Provider value={{ dataInter }}>{children}</DataInterContext.Provider>
 );
 };