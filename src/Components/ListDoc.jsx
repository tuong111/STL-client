import React, { useEffect, useState } from 'react'
import docServices from '../services/docServices';
import { useSelector, useDispatch } from 'react-redux';
import { getListClass } from '../store/class/classAction';
import { getAllDoc } from '../store/document/docAction';
import { Button, Space, Table, Typography } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { CheckCircleTwoTone, CloseCircleTwoTone } from '@ant-design/icons';
import openNotification from '../hooks/openNotification';
import EditDocmodal from './EditDocModal';

export default function ListDoc(props) {
    const token = useSelector(state => state.auth.token)
    const dispatch = useDispatch()
    const listDocument = useSelector(state => state.document.listDocument)
    const navigate = useNavigate()
    const [isvisible_editModal, setisvisible_editModal] = useState(false)
    const [editData, seteditData] = useState()
    const showModal = (value) => {
        setisvisible_editModal(true)
        seteditData(value)
    };
    const handleCloseModal = (value) => {
        setisvisible_editModal(false)
        seteditData()
    }
    useEffect(() => {
        dispatch(getAllDoc({token : token}))
        // docServices.getAllDoc().then(res => console.log(res))
    }, [token,dispatch])

    const handleDelete = (docId) => {
        Swal.fire({
            title: 'Bạn muốn xoá tài liệu này ?',
            showCancelButton: true,
            confirmButtonText: 'OKE',
        }).then((result) => {
            if (result.isConfirmed) {
                docServices.deleteDoc(token,docId)
                .then(
                    (res) => {
                        if (res.success) {
                            dispatch(getAllDoc({token : token}))
                            openNotification(<CheckCircleTwoTone twoToneColor={'green'} />, 'Notifications!', res.message)
                        } else {
                            openNotification(<CloseCircleTwoTone twoToneColor={'red'} />, 'Notifications!', res.message)
                        }
                    }
                ).catch(err => {
                    openNotification(<CloseCircleTwoTone twoToneColor={'red'} />, 'Notifications!', 'Loi he thong')
                }
                )
            }
        })
    }
    const columns = [
        {
            title: 'Mã tài liệu',
            dataIndex: 'code',
            key: 'code'
        },
        {
            title: 'Tên tài liệu',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Lượt xem',
            dataIndex: 'dowloadCount',
            key: 'dowloadCount',
        },
        {
            title: 'Chế độ tải',
            dataIndex: 'downloadMode',
            key: 'downloadMode',
        },
        {
            title : "Ghi chú",
            dataIndex : "note",
            key : "note"
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
                            onClick={()=> handleDelete(record._id)}>
                        Xoá
                    </Button>
                </Space>
            ),
        }
    ]

    return (
        <>
        <Table dataSource={listDocument} columns={columns} rowKey={(record) => record._id}/>
        <EditDocmodal isvisible={isvisible_editModal} closeModal={handleCloseModal} data={editData} />
        </>
    )
}
