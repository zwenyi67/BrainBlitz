import React from 'react'
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import GuestLayout from './layouts/GuestLayout';
import AdminLayout from './layouts/AdminLayout';
import UserLayout from './layouts/UserLayout';
import AdminLogin from './views/admin/AdminLogin';
import UserLogin from './views/user/UserLogin';
import Admin from './views/admin/Admin';
import Start from './views/guest/Start';
import NotFound from './views/error/NotFound';
import User from './views/user/User';
import Users from './views/admin/Users/Users';
import Quizzes from './views/admin/quizzes/Quizzes';
import QuizCreate from './views/admin/quizzes/QuizCreate';
import Play from './views/guest/Play';

export default function Router() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    {/* For Guest User */}

                    <Route element={<GuestLayout />}>
                        <Route path='/' element={<Start />} />
                        <Route path='/play' element={<Play />} /> 
                        <Route path='/admin/login' element={<AdminLogin />} />
                        <Route path='/login' element={<UserLogin />} />
                    </Route>


                    {/* For Admin */}

                    <Route element={<AdminLayout />}>
                        <Route path='/admin' element={<Admin />} />
                        <Route path='/admin/users' element={<Users />} />


                        <Route path='/admin/quizzes' element={<Quizzes />} />
                        <Route path='/admin/quizzes/create' element={<QuizCreate />} />

                    </Route>

                    {/* For User */}

                    <Route element={<UserLayout />}>
                    <Route path='/user' element={<User />} />

                    </Route>
                    <Route path='*' element={<NotFound />}></Route>

                </Routes>
            </BrowserRouter>
        </>
    )
}
