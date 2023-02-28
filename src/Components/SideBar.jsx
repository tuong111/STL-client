import { Avatar } from 'antd'
import jwtDecode from 'jwt-decode'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserById } from '../store/auth/authAction'
import { logOut } from '../store/auth/authSlice'
import { Link } from "react-router-dom";
export default function SideBar(props) {
    const token = localStorage.getItem('token')
    const userInfo = useSelector(state => state.auth.userInfo)
    const dispatch = useDispatch()
    useEffect(() => {
        if (token && token.length > 0) {
            const decode = jwtDecode(token)
            dispatch(getUserById({ id: decode?.userID, token: token }))
        }
    }, []);
    const [open, setOpen] = useState(true);
    const Menus = [
        { title: "Dashboard", src: "Chart_fill" },
        { title: "Inbox", src: "Chat" },
        { title: "Accounts", src: "User", gap: true },
        { title: "Schedule ", src: "Calendar" },
        { title: "Search", src: "Search" },
        { title: "Analytics", src: "Chart" },
        { title: "Files ", src: "Folder", gap: true },
        { title: "Setting", src: "Setting" },
    ];

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
        return (
            <div
                className={` ${open ? "mt-1" : "mt-3"
                    } hidden w-full md:flex md:items-center md:w-auto`}

            >
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
                    <li className='flex flex-row justify-center items-center'>
                        <Avatar src={"http://localhost:3001/" + avatar} />
                        {/* <a className="md:p-4 py-2 block hover:text-[#007bff]" href='/user/details'>{userName} ({role})</a> */}
                        <Link to="/user/infomation" state={{ userId: userId }}
                            className={` ${open ? "block" : "hidden"
                                } md:p-4 py-2 block hover:text-[#007bff]`}
                        >
                            {userName} ({role})
                        </Link>
                    </li>
                </ul>
            </div>
        )
    }

    return (
        <div className="flex">
            <div
                className={` ${open ? "w-72" : "w-20"
                    } bg-blue-500 h-full p-5  pt-8 relative duration-300`}
            >
                <img
                    src="../assets/control.png"
                    className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
           border-2 rounded-full  ${!open && "rotate-180"}`}
                    onClick={() => setOpen(!open)}
                />
                <div className="flex gap-x-4 items-center">
                    <img
                        src="../assets/blue-y-logo.jpeg"
                        className={`cursor-pointer duration-500 w-[60px] ${open && "rotate-[360deg]"
                            }`}
                    />
                    <h1
                        className={`text-white origin-left font-medium text-xl duration-200 ${!open && "scale-0"
                            }`}
                    >
                        Designer
                    </h1>
                </div>
                {
                    !userInfo.name ? <MenuNoLogin /> : <MenuLogin userId={userInfo._id} userName={userInfo?.name} avatar={userInfo.avatar} role={userInfo?.role} />
                }
                <ul className="pt-6">
                    {Menus.map((Menu, index) => (
                        <li
                            key={index}
                            className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
              ${Menu.gap ? "mt-9" : "mt-2"} ${index === 0 && "bg-light-white"
                                } `}
                        >
                            <img src={`../assets/${Menu.src}.png`} />
                            <span className={`${!open && "hidden"} origin-left duration-200`}>
                                {Menu.title}
                            </span>
                        </li>
                    ))}
                    <li
                        className={` ${open ? "mt-1" : "mt-2"
                            } flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-2`}
                    >
                        <p className="py-2 block hover:text-gray-300 text-white" onClick={() => dispatch(logOut())}>Thoát</p>
                    </li>
                </ul>
            </div>
            <div className="h-screen flex-1 p-7">
                <h1 className="text-2xl font-semibold ">Home Page</h1>
            </div>
        </div>
    );
};