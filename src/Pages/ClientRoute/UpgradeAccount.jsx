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
import Swal from 'sweetalert2';

export default function UpgradeAccount(props) {
    const token = useSelector(state => state.auth.token)
    const userInfo = useSelector(state => state.auth.userInfo)
    const dispatch = useDispatch()
    const listClass = [
        {
            code: 'vip1',
            downcount: 50,
            date: ''
        },
        {
            code: 'vip2',
            downcount: 100,
            date: ''
        },
        {
            code: 'vip3',
            downcount: 150,
            date: ''
        },
        {
            code: 'vip4',
            downcount: 'Không giới hạn',
            date: ''
        },
        {
            code: 'vip5',
            downcount: 1,
            date: ''
        }
    ]

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
            render: (item) => <Typography>{item.name} - {item.email}</Typography>
        },
        {
            title: 'Nâng cấp',
            render: (item) => <Button onClick={() => Swal.fire(
                'Cảm ơn bạn!',
                `Bạn đã chọn nâng cấp gói ${item.code} .Phần thanh toán hệ thống đang phát triển.Vui lòng liên hệ : 0123123123 để hoàn thành giao dịch. Xin cảm ơn`,
                'success'
            )}>Choose</Button>
        }
    ]


    return (
        <>
            <div className='min-h-screen'>
                <ClientHeader />
                <div className=' flex justify-center mx-3'>
                    <h3 className=' font-bold text-xl'>
                    Chào {userInfo?.name}, để nâng cấp tài khoản vip bạn vui lòng chọn gói tương ứng : 
                    </h3>
                </div>
                <div className="flex flex-row min-h-[650px] justify-center">
                    <Table dataSource={listClass} columns={columns} rowKey={(record) => record._id} style={{ width: '80%' }} />
                </div>
                <ClientFooter />
            </div>
        </>
    )
}
