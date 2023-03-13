import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import ClientHeader from '../ClientHeader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faCameraRetro, faCheck } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom';
import { baseUrl } from '../../services';
import axios from 'axios';
import userServices from '../../services/userServices';

export default function UserDetails(props) {

    const userInfo = useSelector(state => state.auth.userInfo)
    const [user, setUser] = useState({ name: null });
    const location = useLocation();
    const data = location.state?.userId;
    const token = localStorage.getItem('token');
    useEffect(() => {
        userServices.getUserInfoById(data, token)
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }, [])
    async function updateUserInfo(e) {
        let userId = location.state?.userId;
        // console.log(userId);
        // console.log(user.name);
        // console.log(token);
        const formData = new FormData();
        formData.append('userId', userId);
        formData.append('name', user.name);
        axios.post(`${baseUrl}/auth/update`, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': token
            },
            body: formData,
            formData: {
                'userId': userId,
                'name': user.name,
            }
        })
            .then(
                (res) => {
                    console.log("success")
                    console.log(res.data);
                    window.location.reload();
                })
            .catch((err) => {
                console.error(err)
            });
    };

    //upload user avatar
    async function uploadImg(e) {
        console.log(token);
        const file = e.target.files[0];
        let userId = location.state?.userId;
        const formData = new FormData();
        formData.append(
            "avatar",
            file,
            file.filename
        );
        formData.append(
            "userId",
            userId,
        );
        axios.post(`${baseUrl}/file/upload/avatar`, formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': token
                }
            })
            .then(
                (res) => {
                    console.log(res.data);
                    window.location.reload();
                })
            .catch((err) => {
                console.error(err)
            });
    }
    async function handleUpload(e) {
        document.getElementById("inputUpload").click();
    }
    function handleChange(e) {
        setUser({ name: e.target.value });
    }
    return (
        <>
            <ClientHeader></ClientHeader>
            <div className='flex flex-col text-center items-center justify-center'>
                <div className='p-5 lg:my-16 max-w-screen-lg mx-auto'>
                    <h1 className='text-2xl font-bold'>Thông tin người dùng</h1>
                    <h3 className='mt-2 text-gray-500'>Thay đổi thông tin người dùng của bạn với chúng tôi :</h3>
                    <div className='mt-10 p-4 border border-solid border-gray-400 rounded-md flex flex-col'>
                        <div className='flex items-center justify-between p-4'>
                            <h2 className='font-medium'>Thông tin người dùng</h2>
                        </div>
                        <div className='flex items-center justify-between p-4 border-t-2 border-solid'>
                            <div className='grid grid-cols-3 gap-4 text-left w-full items-center'>
                                <h2 className='font-medium'>Ảnh đại diện</h2>
                                <h2 className='text-gray-500'>Chọn một hình ảnh để làm ảnh đại diện</h2>
                                <div className='flex flex-row justify-center'>
                                    <div className='w-[50px] h-[50px] rounded-lg bg-cyan-300 flex flex-col justify-around'>
                                        <button className='w-full h-full' onClick={(e) => handleUpload()}>
                                            <div className='text-white flex flex-row justify-around'><FontAwesomeIcon icon={faCameraRetro} /></div>
                                        </button>
                                        <input className='hidden' type="file" id='inputUpload' onChange={e => uploadImg(e)} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='flex items-center justify-between p-4 border-t-2 border-solid'>
                            <div className='grid grid-cols-3 gap-4 text-left w-full items-center'>
                                <h2 className='font-medium'>Tên người dùng</h2>
                                <input
                                    type="text"
                                    value={user.name === null ? userInfo.name : user.name}
                                    onChange={e => handleChange(e)}
                                    className='border border-gray-300 rounded-lg p-2 w-full'
                                />
                                <div className='flex flex-row justify-center'>
                                    <FontAwesomeIcon icon={faArrowRight} />
                                </div>
                            </div>
                        </div>
                        <div className='flex items-center justify-between p-4 border-t-2 border-solid'>
                            <div className='grid grid-cols-3 gap-4 text-left w-full items-center'>
                                <h2 className='font-medium'>Loại tài khoản</h2>
                                <h2>{userInfo.role}</h2>
                                <div className='flex flex-row justify-center'>
                                    <FontAwesomeIcon icon={faArrowRight} />
                                </div>
                            </div>
                        </div>
                        <div className='flex items-center justify-between p-4 border-t-2 border-solid'>
                            <div className='grid grid-cols-3 gap-4 text-left w-full items-center'>
                                <h2 className='font-medium'>Lượt tải còn lại</h2>
                                <h2>{userInfo.download}</h2>
                                <div className='flex flex-row justify-center'>
                                    <FontAwesomeIcon icon={faArrowRight} />
                                </div>
                            </div>
                        </div>
                        <div className='flex justify-end p-4 border-t-2 border-solid'>
                            <div className='grid grid-cols-3 gap-4 text-left w-full items-center'>
                                <div></div>
                                <div></div>
                                <div className='flex flex-row justify-center space-x-2'>
                                    <button className='hover:text-cyan-300'>
                                        <a href='/'>Trở về</a>
                                    </button>
                                    <button
                                        className='px-4 py-2 bg-slate-200 hover:bg-cyan-300 rounded-md'
                                        onClick={e => updateUserInfo(e)}
                                    >
                                        <span>Thay đổi</span>
                                        <FontAwesomeIcon icon={faCheck} />
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
