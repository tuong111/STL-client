import { Button, Space, Spin, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import Editmodal from './EditModal'
import { useSelector, useDispatch } from 'react-redux';
import { deleteUser, getAllUser } from '../store/userData/userDataAction';
import {Modal} from 'antd';
import openNotification from '../hooks/openNotification';
import { CheckCircleTwoTone, CloseCircleTwoTone } from '@ant-design/icons';


export default function Listuser(props) {
    const [loading, setloading] = useState(true)
    const [editData, seteditData] = useState()
    const [confirmDelete, setconfirmDelete] = useState(false)
    const [deleteUserId, setdeleteUserId] = useState()
    const dispatch = useDispatch()
    const [isvisible_editModal, setisvisible_editModal] = useState(false)
    const showModal = (value) => {
        setisvisible_editModal(true)
        seteditData(value)
    };
    const token = useSelector(state=>state.auth.token)
    useEffect(() => {
        dispatch(getAllUser({token: token, role : ''}))
        .then(res => {
            setloading(false)
        } )
        .catch(err => {
            setloading(false)
            // console.log(err)    
        })
    }, [dispatch,token])
    const listUser = useSelector(state => state.userData.listUser)
    const handleChooseDeleteUser = (_id) => {
        setconfirmDelete(true)
        setdeleteUserId(_id)
    }
    const handleDeleteUser =  () => {
        dispatch(deleteUser({token : token, userID : deleteUserId}))
        .then(
            (res) => {
                // console.log(res)
                if (res.success) {
                    openNotification(<CheckCircleTwoTone twoToneColor={'green'}/>,'Notifications!',res.payload.res.message)
                }else{
                    // console.log(res)
                    openNotification(<CloseCircleTwoTone twoToneColor={'red'}/>,'Notifications!',res.payload.res.message)
                }
            }
        ).catch(err =>{
            openNotification(<CloseCircleTwoTone twoToneColor={'red'}/>,'Notifications!','Loi he thong')
        }
        )
        
    }
    const columns = [
        {
            title: 'Tên',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email'
        },
        {
            title: 'Loại user',
            dataIndex: 'role',
            key: 'role'
        },
        {
            title: 'Lượt tải',
            dataIndex: 'download',
            key: 'download'
        },
        {
            title: 'CreatedAt',
            dataIndex: 'createdAt',
            key: 'createdAt'
        },
        {
            title: 'Thao tác',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button type="primary" ghost onClick={() => showModal(record)}>
                        Sửa
                    </Button>
                    <Button type="danger" ghost
                            onClick={()=> handleChooseDeleteUser(record._id)}>
                        Xoá
                    </Button>
                </Space>
            ),
        }
    ]
    const handleCloseModal = (value) => {
        setisvisible_editModal(false)
        seteditData()
    }
    return (
        <div style={{
            justifyContent : 'center',
            alignItem : 'center'
        }}>
            {
                loading && <Spin tip="Loading ..." style={{display : 'block'}}/>
            }
            <Table dataSource={listUser} columns={columns} rowKey={(record) => record._id}/>
            <Editmodal isvisible={isvisible_editModal} closeModal={handleCloseModal} data={editData}/>
            <Modal  visible={confirmDelete} 
                    onCancel={()=> setconfirmDelete(false)}
                    onOk = {handleDeleteUser}
                    >
                Do you want delete this user?
            </Modal>
            
        </div>
    )
}
