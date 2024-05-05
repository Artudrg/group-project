import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './Components/LoginForm/LoginForm.component';
import RegisterPage from './Components/RegisterForm/RegisterForm.component';

const PageRouter = (props) => {
    return (
        <BrowserRouter>
            <Routes>
                <Route index={true} path='/' element={<LoginPage />} />
                <Route index={true} path='/Register' element={<RegisterPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default PageRouter;
