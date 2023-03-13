import { Button, Space, Spin, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import Editmodal from './EditModal'
import { useSelector, useDispatch } from 'react-redux';
import { deleteUser, getAllUser } from '../store/userData/userDataAction';
import { Modal } from 'antd';
import openNotification from '../hooks/openNotification';
import { CheckCircleTwoTone, CloseCircleTwoTone } from '@ant-design/icons';
import { CSVLink, CSVDownload } from "react-csv";


const csvData = [
    ["firstname", "lastname", "email"],
    ["Ahmed", "Tomi", "ah@smthing.co.com"],
    ["Raed", "Labes", "rl@smthing.co.com"],
    ["Yezzi", "Min l3b", "ymin@cocococo.com"]
];


export default function Listuser(props) {
    const [loading, setloading] = useState(true)
    const [editData, seteditData] = useState()
    const [confirmDelete, setconfirmDelete] = useState(false)
    const [deleteUserId, setdeleteUserId] = useState()
    const dispatch = useDispatch()
    const [isvisible_editModal, setisvisible_editModal] = useState(false)
    const [listUserCurrent, setlistUserCurrent] = useState([])
    const showModal = (value) => {
        setisvisible_editModal(true)
        seteditData(value)
    };
    const token = useSelector(state => state.auth.token)
    useEffect(() => {
        dispatch(getAllUser({ token: token, role: '' }))
            .then(res => {
                setloading(false)
            })
            .catch(err => {
                setloading(false)
                // console.log(err)    
            })
    }, [dispatch, token])
    const listUser = useSelector(state => state.userData.listUser)
    const handleChooseDeleteUser = (_id) => {
        setconfirmDelete(true)
        setdeleteUserId(_id)
    }
    useEffect(() => {
        setlistUserCurrent(listUser)
    }, [])
    const handleDeleteUser = () => {
        setconfirmDelete(false)
        dispatch(deleteUser({ token: token, userID: deleteUserId }))
            .then(
                (res) => {
                    // console.log(res)
                    if (res.success) {
                        openNotification(<CheckCircleTwoTone twoToneColor={'green'} />, 'Notifications!', res.payload.res.message)
                    } else {
                        // console.log(res)
                        openNotification(<CloseCircleTwoTone twoToneColor={'red'} />, 'Notifications!', res.payload.res.message)
                    }
                }
            ).catch(err => {
                openNotification(<CloseCircleTwoTone twoToneColor={'red'} />, 'Notifications!', 'Loi he thong')
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
                        onClick={() => handleChooseDeleteUser(record._id)}>
                        Xoá
                    </Button>
                </Space>
            ),
        }
    ]
    const headers = [
        { label: "Tên", key: "name" },
        { label: "Email", key: "email" },
        { label: "Loại user", key: "role" },
        {label : "Lượt tải", key: "download"},
        {label : "Ngày tạo", key: "createdAt"},
        {label : "Ngày sửa", key: "updatedAt"},
      ];
    const handleCloseModal = (value) => {
        setisvisible_editModal(false)
        seteditData()
    }
    const handleSearchInput = (event) => {
        const searchQuery = event.target.value.toLowerCase();
        const filteredData = listUser.filter((user) =>
            user.name.toLowerCase().includes(searchQuery)
        );
        setlistUserCurrent(filteredData);
    };

    const createSheet = (listUserCurrent) => {

    }
    return (
        <div style={{
            justifyContent: 'center',
            alignItem: 'center'
        }}>
            {
                loading && <Spin tip="Loading ..." style={{ display: 'block' }} />
            }
            <h3>Nhập tên user :</h3>
            <input style={{
                padding: '12px 20px',
                margin: '8px 0',
                boxSizing: 'border-box',
                border: '2px solid #ccc',
                borderRadius: '4px'
            }} type={'text'}
                onChange={handleSearchInput}
            />
            <span style={{backgroundColor : '#fbc531', marginLeft : 50, padding : 10, borderRadius : 10, }}>
                <CSVLink data={listUserCurrent} headers={headers} filename={"listUser.csv"}>Xuất dữ liệu ra excel</CSVLink>
            </span>
            <Table dataSource={listUserCurrent} columns={columns} rowKey={(record) => record._id} />
            <Editmodal isvisible={isvisible_editModal} closeModal={handleCloseModal} data={editData} />
            <Modal open={confirmDelete}
                onCancel={() => setconfirmDelete(false)}
                onOk={handleDeleteUser}
            >
                Do you want delete this user?
            </Modal>

        </div>
    )
}


