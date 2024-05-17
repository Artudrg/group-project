import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './Components/LoginForm/LoginForm.component';
import RegisterPage from './Components/RegisterForm/RegisterForm.component';
import Rooms from './Components/Admin/Habitaciones'
import Dashboard from './Components/Admin/RoomsAdmin';
import EditRoom from './Components/Admin/EditRoom';
import NewRoom from './Components/Admin/NewRoom';
const PageRouter = (props) => {
    return (
        <BrowserRouter>
            <Routes>
                <Route index={true} path='/' element={<LoginPage />} />
                <Route index={true} path='/Register' element={<RegisterPage />} />
                <Route index={true} path='/rooms' element={<Rooms/>}/>
                <Route index={true} path='/dashboard' element={<Dashboard/>}/>
                <Route index={true} path="/edit/:id" exact element={<EditRoom/>}/>
                <Route index={true} path="/new" exact element={<NewRoom/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default PageRouter;
