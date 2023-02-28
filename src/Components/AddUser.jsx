import React, { useState } from 'react'
import { Alert, Button, Form, Input, Select} from 'antd';
import userServices from '../services/userServices';
import openNotification from '../hooks/openNotification';
import {  CheckCircleTwoTone, CloseCircleTwoTone } from '@ant-design/icons';

const {Option} = Select

const layout = {
    labelCol: {
        span:2,
    },
    wrapperCol: {
        span: 10,
    },
};
/* eslint-disable no-template-curly-in-string */

const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
    },
};


export default function Adduser(props) {
    const onFinish = async (values) => {
        const {name, email,password, role} = values.user
        userServices.register(name,email,password, role).then(
            (res) => {
                // console.log(res)
                if (res.success) {
                    openNotification(<CheckCircleTwoTone twoToneColor={'green'}/>,'Notifications!',res.message)
                }else{
                    // console.log(res)
                    openNotification(<CloseCircleTwoTone twoToneColor={'red'}/>,'Notifications!',res.message)
                }
            }
        ).catch(err =>{
            openNotification(<CloseCircleTwoTone twoToneColor={'red'}/>,'Notifications!',err.response.data.message)
        }
        )

    };

    return (
        <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages} >
            <Form.Item
                name={['user', 'name']}
                label="Họ tên"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name={['user', 'email']}
                label="Email"
                rules={[
                    {
                        type: 'email',
                        required : true
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name={['user', 'password']}
                label="Mật khẩu"
                rules={[
                    {
                        required : true,
                        type : 'password'
                    },
                ]}
            >
                <Input.Password />
            </Form.Item>
            <Form.Item
                name={['user', 'role']}
                label = 'Loại user'
                rules={[
                    {
                        require : true
                    }
                ]}>
                <Select>
                    <Option value='normal'>User thường</Option>
                    <Option value='vip1'>VIP 1</Option>
                    <Option value = 'vip2'>VIP 2</Option>
                    <Option value = 'vip3'>VIP 3</Option>
                </Select>
            </Form.Item>
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 2 }}>
                <Button type="ghost" htmlType="submit">
                    Đăng ký người dùng
                </Button>
            </Form.Item>
        </Form>
    );
}
