
import { Avatar } from 'antd'
import jwtDecode from 'jwt-decode'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserById } from '../store/auth/authAction'
import { logOut } from '../store/auth/authSlice'
import { Link, useNavigate } from "react-router-dom";

export default function ClientHeader(props) {
    const token = localStorage.getItem('token')
    const userInfo = useSelector(state => state.auth.userInfo)
    const dispatch = useDispatch()
    useEffect(() => {
        if (token && token.length > 0) {
            const decode = jwtDecode(token)
            dispatch(getUserById({ id: decode?.userID, token: token }))
        }
    }, []);

    return (
        <>
            <nav
                className="
                flex flex-wrap
                items-center
                justify-between
                w-full
                py-4
                md:py-0
                px-4
                text-lg text-gray-700
                bg-slate-100
                "
            >
                <div>
                    <a href="/">
                        <img className='rounded-lg' src="/images/blue-y-logo.jpeg" width={150} height={100} alt="Logo" />
                    </a>
                </div>

                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    id="menu-button"
                    className="h-6 w-6 cursor-pointer md:hidden block"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16M4 18h16"
                    />
                </svg>
                {
                    !userInfo.name ? <MenuNoLogin /> : <MenuLogin userId={userInfo._id} userName={userInfo?.name} avatar={userInfo.avatar} role={userInfo?.role} />
                }
            </nav>
        </>
    )
}


const MenuNoLogin = () => {
    return (
        <div className="hidden w-full md:flex md:items-center md:w-auto" id="menu">
            <ul
                className="
            pt-4
            text-base text-gray-700
            md:flex
            md:justify-between 
            md:pt-0"
            >
                <li className="md:p-4 py-2 block hover:text-[#007bff]">
                    <a href='/'>Trang chủ</a>
                </li>
                <li>
                    <a className="md:p-4 py-2 block hover:text-[#007bff]" href="/login">Đăng nhập</a>
                </li>
                <li>
                    <a className="md:p-4 py-2 block hover:text-[#007bff] text-[#007bff]" href="/register">Đăng kí</a>
                </li>
            </ul>
        </div>
    )
}

const MenuLogin = ({ userId, userName, avatar, role }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    return (
        <div className="hidden w-full md:flex md:items-center md:w-auto" id="menu">
            <ul
                className="
            pt-4
            text-base text-gray-700
            md:flex
            md:justify-between 
            md:pt-0"
            >
                {/* <li className="md:p-4 py-2 block hover:text-[#007bff]">
                <a href='/'>Trang chủ</a>
            </li> */}
                <li className='flex flex-row justify-center items-center '>
                    <Avatar src={"http://localhost:3001/" + avatar} />
                    {/* <a className="md:p-4 py-2 block hover:text-[#007bff]" href='/user/details'>{userName} ({role})</a> */}
                    <Link to="/user/infomation" state={{ userId: userId }}
                        className="md:p-4 py-2 block hover:text-[#007bff]"
                    >
                        {userName} ({role})
                    </Link>
                </li>
                <li>
                    <a className="md:p-4 py-2 block hover:text-[#007bff] text-[#007bff]" onClick={() => navigate('/upgrade')}>Nâng cấp</a>
                </li>
                <li>
                    <a className="md:p-4 py-2 block hover:text-[#007bff] text-[#007bff]" onClick={() => alert('liên hệ')}>Liên hệ</a>
                </li>
                <li>
                    <a className="md:p-4 py-2 block hover:text-[#007bff] text-[#007bff]" onClick={() => dispatch(logOut())}>Thoát</a>
                </li>
            </ul>
        </div>
    )
}