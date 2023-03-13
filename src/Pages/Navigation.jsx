import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Class from './Class'
import Home from './Home'
import Login from './Login'
import Files from './Files'
import FileDetails from '../Components/ShowFile/FileDetails'
import ClientHome from './ClientRoute/ClientHome'
import ClientLogin from './ClientRoute/ClientLogin'
import ClientRegister from './ClientRoute/ClientRegister'
import UserDetails from '../Components/User/UserDetails'
import UpgradeAccount from './ClientRoute/UpgradeAccount'
import NewClientHome from './NewClientHome/NewClientHome'

export default function Navigation(props) {


    return (
        <Routes >
            <Route path='/' element={<ClientHome />} />
            <Route path='/login' element={<ClientLogin />} />
            <Route path='/register' element={<ClientRegister />} />
            <Route path="admin/" element={<Home />} />
            <Route exact path="admin/login" element={<Login />} />
            <Route path="class/:id" element={<Class />} />
            <Route path="/files" element={<Files />} />
            <Route path="/files/details" element={<FileDetails />} />
            <Route path="/user/infomation" element={<UserDetails />} />
            <Route path='/upgrade' element={<UpgradeAccount/>}/>
        </Routes>

    )
}
