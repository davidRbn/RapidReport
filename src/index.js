import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./authContext/AuthProvider";
import HomeRapports from './homeRapport/HomeRapports';
import MonRapport from './monRapport/MonRapport';



ReactDOM.render(
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
</React.StrictMode>,
  document.getElementById('root')
);
