import React, { useEffect, useState } from 'react'
import { Alert, Button, Form, Input, Select} from 'antd';
import userServices from '../services/userServices';
import openNotification from '../hooks/openNotification';
import TextArea from 'antd/lib/input/TextArea';
import { useSelector } from 'react-redux';
import classServices from '../services/classServices';
import { CloseCircleTwoTone, CheckCircleTwoTone } from '@ant-design/icons';

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

export default function Addclass(props) {
    const token = useSelector(state => state.auth.token)
    const [listGV, setlistGV] = useState([])
    const onFinish = (values) => {
        classServices.addClass(token,values.class)
        .then(
            (res) => {
                // console.log(res)
                if (res.success) {
                    openNotification(<CheckCircleTwoTone twoToneColor={'green'}/>,'Notifications!',res.message)
                }else{
                    // console.log(res)
                    openNotification(<CloseCircleTwoTone twoToneColor={'red'}/>,'Notifications!',res.message)
                }
            }
        )
        .catch(err =>{
            openNotification(<CloseCircleTwoTone twoToneColor={'red'}/>,'Notifications!',err.response.data.message)
        }
        )
    }
        
    useEffect(() => {
        userServices.getListUsers(token,'GV')
        .then(
            res => setlistGV(res)
        )
    }, [token]);

    return (
        <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages} >
            <Form.Item
                name={['class', 'code']}
                label="Class Code"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name={['class', 'name']}
                label="Class Name"
                rules={[
                    {
                        required : true
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name={['class', 'mentor']}
                label = 'Mentor'
                rules={[
                    {
                        require : true
                    }
                ]}>
                <Select>
                    {
                        listGV.map(
                            item => <Option key={item._id} 
                                            value={item._id}
                            >{item.name} - {item.email}</Option>
                        )
                    }
                </Select>
            </Form.Item>
            <Form.Item
                name={['class','note']}
                label='Note'
                >
                    <TextArea/>
            </Form.Item>
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 2 }}>
                <Button type="primary" htmlType="submit">
                    Add
                </Button>
            </Form.Item>
        </Form>
    )
}
