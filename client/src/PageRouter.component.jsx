import React, { useState } from 'react';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import LoginPage from './Components/LoginForm/LoginForm.component';
import RegisterPage from './Components/RegisterForm/RegisterForm.component';
import Rooms from './Components/Admin/Habitaciones';
import Dashboard from './Components/Admin/RoomsAdmin';
import EditRoom from './Components/Admin/EditRoom';
import NewRoom from './Components/Admin/NewRoom';
import ViewRoom from './Components/Admin/ViewRoom';

const PageRouter = () => {
    const [user, setUser] = useState(null);

    const login = (userData) => {
        setUser(userData);
    };

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginPage login={login} />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/rooms" element={<Rooms />} />
                <Route path="/room/:id" element={<ViewRoom />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/edit/:id" element={<EditRoom />} />
                <Route path="/new" element={<NewRoom />} />
            </Routes>
        </BrowserRouter>
    );
};

export default PageRouter;
