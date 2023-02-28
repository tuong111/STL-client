import { CheckCircleTwoTone, CloseCircleTwoTone } from '@ant-design/icons';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import openNotification from '../../hooks/openNotification';
import { userLogin } from '../../store/auth/authAction';

export default function ClientLogin() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleLogin = () => {
        dispatch(userLogin({email, password}))
        .then(
            res => {
                if (res.payload.success) {
                    openNotification(<CheckCircleTwoTone twoToneColor={'green'} />, 'Notification!', res.payload.message)
                    navigate('/')
                } else {
                    openNotification(<CloseCircleTwoTone twoToneColor={'red'} />, 'Notification!', res.payload.message)
                }
            }
        )
        .catch(err => console.log(err))
    }
    return (
        <div className="relative flex flex-col justify-center min-h-screen overflow-hidden bg-slate-100">
            <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
                <h1 className="text-3xl font-semibold text-center text-blue-500 underline">
                    Đăng nhập
                </h1>
                <div className="mt-6">
                    <div className="mb-2">
                        <label
                            for="email"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Email
                        </label>
                        <input
                            onChange={(e) =>setEmail(e.target.value)}
                            type="email"
                            name="email"
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>
                    <div className="mb-2">
                        <label
                            for="password"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Mật khẩu
                        </label>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            name="password"
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>
                    {/* <a
                        href="/client/login"
                        className="text-xs hover:underline"
                    >
                        Forget Password?
                    </a> */}
                    <div className="mt-6">
                        <button
                            onClick={() => handleLogin()}
                            className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700">
                            Đăng nhập
                        </button>
                    </div>
                </div>

                <p className="mt-8 text-xs font-light text-center text-gray-700">
                    {" "}
                    Chưa có tài khoản?{" "}
                    <a
                        href="/register"
                        className="font-medium hover:underline"
                    >
                        Đăng ký
                    </a>
                </p>
            </div>
        </div>
    );
}