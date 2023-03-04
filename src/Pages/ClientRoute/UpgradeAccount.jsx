import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faCameraRetro, faCheck } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation } from 'react-router-dom';
import { baseUrl } from '../../services';
import axios from 'axios';
import ClientHeader from '../../Components/ClientHeader';
import { Button, Table, Typography } from 'antd';
import ClientFooter from '../../Components/ClientFooter';

export default function UpgradeAccount(props) {
    const token = useSelector(state => state.auth.token)
    const dispatch = useDispatch()
    const listClass = [
        {
            code : 'vip1',
            downcount : 50,
            date : ''
        },
        {
            code : 'vip2',
            downcount : 100,
            date : ''
        },
        {
            code : 'vip3',
            downcount : 150,
            date : ''
        },
        {
            code : 'vip4',
            downcount : 'Không giới hạn',
            date : ''
        },
]
    useEffect(() => {
    }, [token,dispatch])

    const columns = [
        {
            title: 'Gói',
            dataIndex: 'code',
            key: 'code'
        },
        {
            title: 'Lượt tải',
            dataIndex: 'downcount',
            key: 'downcount'
        },
        {
            title: 'Hạn sử dụng',
            dataIndex: 'date',
            key: 'date',
            render : (item) => <Typography>{item.name} - {item.email}</Typography>
        },
        {
            title : 'Nâng cấp',
            render: (item) => <Button onClick={() => alert(`Chon nang cap loai ${item.code}`)}>Choose</Button>
        }
    ]

    return (
        <>
        <div className='min-h-screen'>
        <ClientHeader />
        <div className="flex flex-row min-h-[650px] justify-center">  
        <Table dataSource={listClass} columns={columns} rowKey={(record) => record._id} style={{width : '80%'}}/>
        </div>
        <ClientFooter/>
        </div>
        </>
    )
}
