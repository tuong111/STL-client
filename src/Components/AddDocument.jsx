import React, { useEffect, useState } from 'react'
import { Alert, Button, Form, Input, Select } from 'antd';
import userServices from '../services/userServices';
import openNotification from '../hooks/openNotification';
import TextArea from 'antd/lib/input/TextArea';
import { useSelector } from 'react-redux';
import classServices from '../services/classServices';
import { CloseCircleTwoTone, CheckCircleTwoTone } from '@ant-design/icons';
import FileUpload from './UploadFile/FileUpload';
import FileList from './UploadFile/FileList';
import docServices from '../services/docServices';

const { Option } = Select

const layout = {
    labelCol: {
        span: 2,
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

export default function AddDocument(props) {
    const token = useSelector(state => state.auth.token)
    const [listDoc, setListDoc] = useState([])
    const [files, setFiles] = useState([]);
    const [isClicked, setIsClicked] = useState(false);
    const [fileName, setFileName] = useState('')
    const listModeDownload = ['free', 'vip']


    const removeFile = (filename) => {
        setFiles(files.filter(file => file.name !== filename))
    };
    const onFinish = (values) => {
        docServices.addDocument(token, values.document)
            .then(
                (res) => {
                    if (res.success) {
                        setFileName(values.document.code)
                        setIsClicked(true)
                        openNotification(<CheckCircleTwoTone twoToneColor={'green'} />, 'Notifications!', res.message)
                        
                    } else {
                        openNotification(<CloseCircleTwoTone twoToneColor={'red'} />, 'Notifications!', res.response.data.message)
                    }
                }
            )
            .catch(err => {
                openNotification(<CloseCircleTwoTone twoToneColor={'red'} />, 'Notifications!', err.response.data.message)
            }
            )
    }

    useEffect(() => {
        docServices.getAllDocType()
            .then(
                res => {
                    setListDoc(res.data)
                }
            )
    }, []);

    return (
        <div>
            <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages} >
                <Form.Item
                    name={['document', 'code']}
                    label="Mã tài liệu"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name={['document', 'name']}
                    label="Tên tài liệu"
                    rules={[
                        {
                            required: true
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name={['document', 'type']}
                    label='Loại tài liệu'
                    rules={[
                        {
                            require: true
                        }
                    ]}>
                    <Select>
                        {
                            listDoc.map(
                                item => <Option key={item._id}
                                    value={item._id}
                                >{item.code} - {item.name}</Option>
                            )
                        }
                    </Select>
                </Form.Item>
                <Form.Item
                    name={['document', 'downloadMode']}
                    label='Chế độ'
                    rules={[
                        {
                            require: true
                        }
                    ]}>
                    <Select>
                        {
                            listModeDownload.map(
                                (item,index) => <Option 
                                    key={index}
                                    value={item}
                                >{item}</Option>
                            )
                        }
                    </Select>
                </Form.Item>
                <Form.Item
                    name={['document', 'note']}
                    label='Ghi chú'
                >
                    <TextArea />
                </Form.Item>
                <div className="files-upload" style={{ width: "50%", marginBottom: '20px', marginLeft: '20px' }}>
                    <div className="title">Chọn file PDF</div>
                    <FileUpload
                        files={files} setFiles={setFiles} removeFile={removeFile}
                        isClicked={isClicked} setIsClicked={setIsClicked} fileName={fileName}
                    />
                    {/* <FileList files={files} removeFile={removeFile} /> */}
                </div>
                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 5 }}>
                    <Button type='ghost' htmlType="submit">
                        Thêm tài liệu
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}
