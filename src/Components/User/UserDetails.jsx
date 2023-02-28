import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import ClientHeader from '../ClientHeader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faCameraRetro, faCheck } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom';
import { baseUrl } from '../../services';
import axios from 'axios';

export default function UserDetails(props) {
    const userInfo = useSelector(state => state.auth.userInfo)
    const [user, setUser] = useState({ name: null });
    const location = useLocation();
    const data = location.state?.userId;
    const token = localStorage.getItem('token');

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
        <div className='flex flex-col text-center items-center justify-center'>
            <ClientHeader></ClientHeader>
            <div className='mt-5 p-5 my-16'>
                <h1 className='text-2xl'>User Infomation</h1>
                <h3 className='mt-2 opacity-50'>Edit your infomation and updated with us</h3>
                <div className='mt-10 w-[800px] h-auto border border-solid border-gray-400 flex flex-col'>
                    <div className='flex flex-row justify-start p-5'>
                        <h2>User Details</h2>
                    </div>
                    <div className='flex flex-row justify-start p-5 border-t-2 border-solid'>
                        <div className='grid grid-cols-3 gap-10 text-left w-full items-center'>
                            <h2>Avatar</h2>
                            <h2>Upload a picture to personalized your profile</h2>
                            <div className='flex flex-row justify-center'>
                                <div className='w-[50px] h-[50px] rounded-lg bg-cyan-300 flex flex-col justify-around'>
                                    <button className='w-full h-full' onClick={(e) => handleUpload()}>
                                        <div className='flex flex-row justify-around'><FontAwesomeIcon icon={faCameraRetro} /></div>
                                    </button>
                                    <input className='hidden' type="file" id='inputUpload' onChange={e => uploadImg(e)} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-row justify-start p-5 border-t-2 border-solid'>
                        <div className='grid grid-cols-3 gap-10 text-left w-full items-center'>
                            <h2>User Name</h2>
                            <input type="text" value={user.name === null ? userInfo.name : user.name} onChange={e => handleChange(e)} />
                            <div className='flex flex-row justify-center'>
                                <FontAwesomeIcon icon={faArrowRight} />
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-row justify-start p-5 border-t-2 border-solid'>
                        <div className='grid grid-cols-3 gap-10 text-left w-full items-center'>
                            <h2>User Type</h2>
                            <h2>{userInfo.role}</h2>
                            <div className='flex flex-row justify-center'>
                                <FontAwesomeIcon icon={faArrowRight} />
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-row justify-end p-5 border-t-2 border-solid'>
                        <div className='grid grid-cols-3 gap-10 text-left w-full items-center'>
                            <div></div>
                            <div></div>
                            <div className='flex flex-row justify-center'>
                                <button>
                                    <a href='/' className='hover:text-cyan-300'>Back</a>
                                </button>
                                <button
                                    className='w-[90px] h-[50px] bg-slate-200 hover:bg-cyan-300 rounded-lg ml-2'
                                    onClick={e => updateUserInfo(e)}
                                >
                                    <span className='mr-2'>Change</span>
                                    <FontAwesomeIcon icon={faCheck} />
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}
