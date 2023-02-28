import React, { useEffect } from 'react'
import classServices from '../services/classServices';
import { useSelector, useDispatch } from 'react-redux';
import { getListClass } from '../store/class/classAction';
import { Button, Space, Table, Typography } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

export default function Listclass(props) {
    const token = useSelector(state => state.auth.token)
    const dispatch = useDispatch()
    const listClass = useSelector(state => state.class.listClass)
    const navigate = useNavigate()
    useEffect(() => {
        dispatch(getListClass({token : token}))
    }, [token,dispatch])

    const columns = [
        {
            title: 'Class Code',
            dataIndex: 'code',
            key: 'code'
        },
        {
            title: 'Class Name',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Mentor',
            dataIndex: 'mentor',
            key: 'mentor',
            render : (item) => <Typography>{item.name} - {item.email}</Typography>
        },
        {
            title : "Note",
            dataIndex : "note",
            key : "note"
        },
        {
            title: 'CreatedAt',
            dataIndex: 'createdAt',
            key: 'createdAt'
        },
        {
            title: 'Student',
            dataIndex : '_id',
            key: 'student',
            render :(item) => <Link to={`class/${item}`} target="_blank">DS hoc sinh</Link>
            
        }
    ]

    return (
        <Table dataSource={listClass} columns={columns} rowKey={(record) => record._id}/>
    )
}
