import { Avatar } from 'antd'
import jwtDecode from 'jwt-decode'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserById } from '../store/auth/authAction'
import { logOut } from '../store/auth/authSlice'
import { Link } from "react-router-dom";
import {
    BsChevronDown,
} from 'react-icons/bs';
export default function SideBar({ menus, onSetdoc }) {
    useEffect(() => {
        if (token && token.length > 0) {
            const decode = jwtDecode(token)
            dispatch(getUserById({ id: decode?.userID, token: token }))
        }
    }, []);
    const [subMenuOpen, setSubMenuOpen] = useState(false);
    const [idMenu, setidMenu] = useState("test");
    const token = localStorage.getItem('token')
    const dispatch = useDispatch()
    const [open, setOpen] = useState(true);
    return (
        <div className="flex">
            <div
                className={` ${open ? "w-72" : "w-20"
                    } bg-blue-500 h-full p-5  pt-8 relative duration-300`}
            >
                <img
                    src="../assets/control.png"
                    className={`absolute cursor-pointer -right-3 w-7 border-dark-purple
           border-2 rounded-full  ${!open && "rotate-180"}`}
                    onClick={() => setOpen(!open)}
                />
                <div className="flex gap-x-4 items-center">
                    <img
                        src="../assets/blue-y-logo.jpeg"
                        className={`cursor-pointer duration-500 w-[60px] rounded-lg ${open && "rotate-[360deg]"
                            }`}
                    />
                    <h1
                        className={`text-white origin-left font-medium text-xl duration-200 ${!open && "scale-0"
                            }`}
                    >
                        B SHARE
                    </h1>
                </div>

                <ul className="pt-6">
                    {menus.map((Menu, index) => (
                        <li
                            key={index}
                        >
                            <div
                                className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
                                ${Menu.gap ? "mt-9" : "mt-2"} ${index === 0 && "bg-light-white"
                                    } `}
                                onClick={() => {
                                    if (Menu._id == 'all') {
                                        onSetdoc('all')
                                    } else {
                                        setSubMenuOpen(!subMenuOpen)
                                        setidMenu(Menu.name)
                                    }
                                }}
                            >
                                <img src={`../assets/Folder.png`} />
                                <span className={`${!open && "hidden"} origin-left duration-200`}>
                                    {Menu.name}
                                </span>
                                {Menu.listDoctypes && (
                                    <BsChevronDown
                                        className={`${subMenuOpen && Menu.name === idMenu && 'rotate-180'}`}
                                    />
                                )}
                            </div>
                            {Menu.listDoctypes && subMenuOpen && open && Menu.name === idMenu && (
                                <ul>
                                    {Menu.listDoctypes.map((item, idx) => (
                                        <div key={idx}>
                                            <li
                                                className="
                                                    flex px-5 cursor-pointer text-center text-sm text-gray-200 py-1"
                                                onClick={() => onSetdoc(item._id)}
                                            >
                                                {item.name}
                                            </li>
                                        </div>

                                    )
                                    )}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};