import { CheckCircleTwoTone, CloseCircleTwoTone } from '@ant-design/icons';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import openNotification from '../../hooks/openNotification';
import userServices from '../../services/userServices';

export default function ClientRegister() {
    const [email, setemail] = useState('')
    const [userName, setUserName] = useState('')
    const [password, setpassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const navigate = useNavigate()
    const handleRegister = () => {
        if (validate()) {
            userServices.register(userName,email,password)
            .then(
                    (res) => {
                        if (res.success) {
                            openNotification(<CheckCircleTwoTone twoToneColor={'green'}/>,'Notifications!',res.message)
                            navigate('/login')
                        }else{
                            openNotification(<CloseCircleTwoTone twoToneColor={'red'}/>,'Notifications!',res.message)
                        }
                    }
            )
            .catch(
                err =>{
                    openNotification(<CloseCircleTwoTone twoToneColor={'red'}/>,'Notifications!',err.response.data.message)
                }
            )
        }
    }

    const validate = () => {
        if (!email) {
            alert('Bắt buộc nhập Email')
            return false
        }
        if (!userName) {
            alert('Bat buoc nhap Username')
            return false
        }
        if (!password) {
            alert('Bat buoc nhap mat khau')
            return false
        }
        if (confirmPassword !== password) {
            alert('Mat khau khong khop voi nhau')
            return false
        }
        return true
    }

    return (
        <div className="relative flex flex-col justify-center min-h-screen overflow-hidden bg-slate-100">
            <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
                <h1 className="text-3xl font-semibold text-center text-blue-500 underline">
                    Đăng ký
                </h1>
                <div className="mt-6">
                    <div className="mb-2">
                        <label
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            onChange={(e) => setemail(e.target.value)}
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>
                    <div className="mb-2">
                        <label
                            className="block text-sm font-semibold text-gray-800"
                        >
                            User Name
                        </label>
                        <input
                            type="text"
                            onChange={(e) => setUserName(e.target.value)}
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>
                    <div className="mb-2">
                        <label
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            onChange={(e) => setpassword(e.target.value)}
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>
                    <div className="mb-2">
                        <label
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>
                    <div className="mt-6">
                        <button
                            onClick={() => handleRegister()}
                            className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700">
                            Register
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}