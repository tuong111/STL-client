
import { Avatar } from 'antd'
import jwtDecode from 'jwt-decode'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserById } from '../store/auth/authAction'
import { logOut } from '../store/auth/authSlice'
import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react'
import './ClientHeader.scss'
import { CheckSquareFilled, CloseCircleFilled, ProfileTwoTone } from '@ant-design/icons'
import Swal from 'sweetalert2'

export default function ClientHeader(props) {
    const token = localStorage.getItem('token')
    const userInfo = useSelector(state => state.auth.userInfo)
    const dispatch = useDispatch()
    const [showMobileNav, setShowMobileNav] = useState(false);
    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = () => {
      setShowMenu(!showMenu);
    };
    // const handleMenuClick = () => {
    //     setIsOpen(!isOpen);
    // };
    useEffect(() => {
        if (token && token.length > 0) {
            const decode = jwtDecode(token)
            dispatch(getUserById({ id: decode?.userID, token: token }))
        }
    }, []);

    return (
        <>
            <nav className="nav-container">
                <div className="logo-container">
                    <a href="/">
                        <img className='rounded-lg' src="/images/blue-y-logo.jpeg" width={150} height={100} alt="Logo" />
                    </a>
                </div>

                <div className="menu-icon" onClick={toggleMenu}>
                    <ProfileTwoTone style={{ fontSize: '30px', color: '#08c' }}/>
                </div>

                <div className={showMenu ? 'menu-items open' : 'menu-items'}>
                    <CloseCircleFilled  onClick={toggleMenu} style={{ fontSize: '30px', color: '#08c' }} className="icon-close"/>
                    {!userInfo.name && <MenuNoLogin setClose={()=> setShowMenu(false)}/>}
                    {userInfo.name && <MenuLogin userId={userInfo._id} userName={userInfo?.name} avatar={userInfo.avatar} role={userInfo?.role} setClose={()=> setShowMenu(false)}/>}
                </div>
            </nav>


        </>
    )
}


const MenuNoLogin = (setClose) => {
    return (
        <div className="w-full md:flex md:items-center md:w-auto" id="menu" >
            <ul
                className="
            pt-4
            text-base text-gray-700
            md:flex
            md:justify-between 
            md:pt-0"
            >
                <li className="md:p-4 py-2 block hover:text-[#007bff]" onClick={setClose} >
                    <a href='/'>Trang chủ</a>
                </li>
                <li onClick={setClose}>
                    <a className="md:p-4 py-2 block hover:text-[#007bff]" href="/login">Đăng nhập</a>
                </li>
                <li onClick={setClose}>
                    <a className="md:p-4 py-2 block hover:text-[#007bff] text-[#007bff]" href="/register">Đăng kí</a>
                </li>
            </ul>
        </div>
    )
}

const MenuLogin = ({ userId, userName, avatar, role, setClose }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    return (
        <div className="w-full md:flex md:items-center md:w-auto" id="menu">
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
                        onClick={setClose}
                    >
                        {userName} ({role})
                    </Link>
                </li>
                <li onClick={setClose}>
                    <a className="md:p-4 py-2 block hover:text-[#007bff] text-[#007bff]" onClick={() => navigate('/upgrade')}>Nâng cấp</a>
                </li>
                <li onClick={setClose}>
                    <a className="md:p-4 py-2 block hover:text-[#007bff] text-[#007bff]" onClick={() => Swal.fire(
                'Cảm ơn bạn!',
                `Zalo : 0123123456 | Facebooke : abc@fb.com.vn`,
                'success'
            )}>Liên hệ</a>
                </li>
                <li onClick={setClose}>
                    <a className="md:p-4 py-2 block hover:text-[#007bff] text-[#007bff]" onClick={() => dispatch(logOut())}>Thoát</a>
                </li>
            </ul>
        </div>
    )
}