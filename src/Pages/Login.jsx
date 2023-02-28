import React, { useEffect } from 'react'
import { Button, Checkbox, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

import { userLogin } from '../store/auth/authAction';
import { useDispatch } from 'react-redux';
import openNotification from '../hooks/openNotification';
import userServices from '../services/userServices';
import { userRemember } from '../store/auth/authSlice';
import { CheckCircleTwoTone, CloseCircleTwoTone } from '@ant-design/icons';

export default function Login(props) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    // useEffect(() => {
    //     if (localStorage.getItem("token").length !==0) {
    //     const token = localStorage.getItem('token')
    //     const decode = jwtDecode(token)
    //     userServices.getUserInfoById(decode.userID)
    //     .then(res => {
    //         if (res.success) {
    //             dispatch(userRemember({token : token}))
    //             navigate('/')
    //         }
    //     })
    //     .catch(err => console.log(err))
    //     }
    // }, [dispatch,navigate])


    const onFinish = (values) => {
        const { email, password } = values
        dispatch(userLogin({ email: email, password: password }))
            .then(res => {
                if (res.payload.success) {
                    if (res.payload.role === 'admin') {
                        openNotification(<CheckCircleTwoTone twoToneColor={'green'} />, 'Notification!', res.payload.message)
                        navigate('/admin')
                    }else {
                        openNotification(<CloseCircleTwoTone twoToneColor={'red'} />, 'Notification!', 'Không thể đăng nhập vào admin')
                    }

                } else {
                    openNotification(<CloseCircleTwoTone twoToneColor={'red'} />, 'Notification!', res.payload.message)
                }
            })

    };

    const onFinishFailed = (errorInfo) => {
        // console.log('Failed:', errorInfo);
    };
    return (
        <div className='login'>
            <div className="login-container">
                <div className="login-label">
                    <h3>
                        Share Document Admin Page
                    </h3>
                </div>
                <div className="login-form">

                    <Form
                        name="basic"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[{ required: true, message: 'Vui lòng nhập email!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Mật khẩu"
                            name="password"
                            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                            <Checkbox>Ghi nhớ đăng nhập</Checkbox>
                        </Form.Item>

                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button type="primary" htmlType="submit">
                                Đăng nhập
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    )
}
