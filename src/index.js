import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./authContext/AuthProvider";
import HomeRapports from './homeRapport/HomeRapports';
import MonRapport from './monRapport/MonRapport';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
 <AuthProvider>
 <Routes>
 <Route path="/" element={<App/>} />
 <Route path="mes-rapports" element={<HomeRapports/>}/>
 <Route path='mes-rapports/mon-rapport' element={<MonRapport/>}/>
 </Routes>
 </AuthProvider>
 </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
