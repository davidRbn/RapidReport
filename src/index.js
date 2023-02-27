import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Routes, Route, HashRouter } from "react-router-dom";
import { AuthProvider } from "./authContext/AuthProvider";
import HomeRapports from './homeRapport/HomeRapports';
import MonRapport from './monRapport/MonRapport';



ReactDOM.render(
  <React.StrictMode>
  <HashRouter>
<AuthProvider>
<Routes>
<Route path="/" element={<App/>} />
<Route path="mes-rapports" element={<HomeRapports/>}/>
<Route path='mes-rapports/mon-rapport' element={<MonRapport/>}/>
</Routes>
</AuthProvider>
</HashRouter>
</React.StrictMode>,
  document.getElementById('root')
);
