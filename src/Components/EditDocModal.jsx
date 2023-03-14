import { Button, Form, Input, Modal, Select, Typography } from 'antd'
import userServices from '../services/userServices';
import { useSelector, useDispatch } from 'react-redux';
import openNotification from '../hooks/openNotification';
import { getAllUser } from '../store/userData/userDataAction';
import docServices from '../services/docServices';
import { getAllDoc } from '../store/document/docAction';
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


export default function EditDocmodal({ isvisible, closeModal, data, ...props }) {
    const token = useSelector(state => state.auth.token)
    const dispatch = useDispatch()
    const onFinish = async (values) => {
        const {name, downloadMode} = values.document 
        const {_id} = data
        docServices.editDoc(token,data._id,name,downloadMode)
        .then(res => {
            if (res.success) {
                dispatch(getAllDoc({token : token}))
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
        <Modal title="Chỉnh sửa thông tin" open={isvisible}
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
                name={['document', 'name']}
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
                label="Loại hiện tại"
            >
                <Typography.Text code >{data?.downloadMode}</Typography.Text>
            </Form.Item>
            <Form.Item
                name={['document', 'downloadMode']}
                label = 'Loại thay đổi'
                rules={[
                    {
                        require : true
                    }
                ]}>
                <Select>
                <Option value='free'>Free</Option>
                    <Option value='vip'>Vip</Option>
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
