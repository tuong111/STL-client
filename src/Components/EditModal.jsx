import { Button, Form, Input, Modal, Select, Typography } from 'antd'
import userServices from '../services/userServices';
import { useSelector, useDispatch } from 'react-redux';
import openNotification from '../hooks/openNotification';
import { getAllUser } from '../store/userData/userDataAction';
const { Option } = Select

/* eslint-disable no-template-curly-in-string */
const layout = {
    labelCol: {
        span:5,
    },
    wrapperCol: {
        span: 13,
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


export default function Editmodal({ isvisible, closeModal, data, ...props }) {
    const token = useSelector(state => state.auth.token)
    const onFinish = async (values) => {
        const {name, role} = values.user 
        const {_id} = data
        userServices.updateNameRole(token,_id,name,role)
        .then(res => {
            if (res.success) {
                openNotification('success','Notifications !',res.message)
                
            }else {
                openNotification('danger','Notifications!',res.message)
            }
            closeModal()
        })
        .catch(err => {
            closeModal()
            return openNotification('error','Notifications',err.response,data.message)
        })
    }
    return (
        <Modal title="Chỉnh sửa thông tin" visible={isvisible}
            onCancel={closeModal}
            footer={[
            ]}>
            <Form {...layout} name="nest-messages" onFinish={(val)=> onFinish(val)} validateMessages={validateMessages} >
            <Form.Item
                label="Tên hiện tại"
            >
                <Typography.Text code >{data?.name}</Typography.Text>
            </Form.Item>
            <Form.Item
                name={['user', 'name']}
                label="Tên mới"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Email"
            >
                <Typography.Text code >{data?.email}</Typography.Text>
            </Form.Item>
            <Form.Item
                label="Loại hiện tại"
            >
                <Typography.Text code >{data?.role}</Typography.Text>
            </Form.Item>
            <Form.Item
                name={['user', 'role']}
                label = 'Loại thay đổi'
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
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset:10 }}>
                <Button type="primary" htmlType="submit">
                    Cập nhật
                </Button>
            </Form.Item>
        </Form>
        </Modal>
    )
}
