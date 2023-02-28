import { Button, Input, Layout, Table, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import classServices from '../services/classServices';
import openNotification from '../hooks/openNotification';
import { CheckCircleTwoTone, CloseCircleTwoTone, FilterTwoTone, PlusSquareTwoTone } from '@ant-design/icons';
import userServices from '../services/userServices';
const { Header, Content, Footer } = Layout;
const Class = (props) => {
    const token = localStorage.getItem('token')
    const { id } = useParams()
    const [classInfo, setclassInfo] = useState()
    const [listStudent, setlistStudent] = useState([])
    const [listAll, setlistAll] = useState([])
    const [listAllStudent, setlistAllStudent] = useState([])
    const [listAllStudent_filter, setlistAllStudent_filter] = useState([])

    // --------------------------- CONFIG TABLE-------------//
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email'
        },
        {
            title: 'Action',
            render: () => <Button type='link'>Delete</Button>
        }
    ]
    const columnsStudent = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email'
        },
    ]
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const onSelectChange = (newSelectedRowKeys) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange
    };
    //------------------------------------------//

    // Fetch data lop hoc theo ID
    useEffect(() => {
        classServices.getClass(token, id)
            .then(
                (res) => {
                    if (res.success) {
                        setclassInfo(res.findClass)
                        setlistStudent(res.findClass.student)
                        setlistAll(res.findClass.student)
                        openNotification(<CheckCircleTwoTone twoToneColor={'green'} />, 'Notifications!', res.message)

                    } else {
                        openNotification(<CloseCircleTwoTone twoToneColor={'red'} />, 'Notifications!', res.message)
                    }
                }
            ).catch(err => {
                openNotification(<CloseCircleTwoTone twoToneColor={'red'} />, 'Notifications!', 'Loi he thong')
            }
            )
    }, [token, id])

    // ----------------------
    // Filter lai de khong lay danh sach nhung hoc sinh da duoc add trong lop
    const onGetListStudent = () => {
        userServices.getListUsers(token,'HV')
        .then(res => {
            let listID = listStudent.map(item => item._id)
            const listFiler = res?.filter(
                item => !listID.includes(item._id)
            )
            setlistAllStudent(listFiler)
            setlistAllStudent_filter(listFiler)
            openNotification(<CheckCircleTwoTone twoToneColor={'green'} />, 'Notifications!', 'Get danh sach thanh cong')
        })
        .catch(err => {
            openNotification(<CloseCircleTwoTone twoToneColor={'red'} />, 'Notifications!', 'Loi he thong')
        })
    }

// -----------------FIlter----------//
    const handleFilter = (value) => {
        if (value.length === 0) {
            setlistStudent(listAll)
        } else {
            const list = listAll.filter(
                item => item.name.toLowerCase().includes(value)
            )
            setlistStudent(list)
        }

    }
    const handleFilterAllStudent = (value) => {
        if (value.length === 0) {
            setlistAllStudent_filter(listAllStudent)
        } else {
            const list = listAllStudent.filter(
                item => item.name.toLowerCase().includes(value)
            )
            setlistAllStudent_filter(list)
        }
    }
//---------------------------


    // ham de thuc hien add hoc sinh vao lop
    const handleAddStudent = () => {
        classServices.addStudent(token,id,selectedRowKeys)
        .then(res => {
            openNotification(<CheckCircleTwoTone twoToneColor={'green'} />, 'Notifications!', res.message)
            setTimeout(() => {
                window.location.reload(false)
            }, 1000);
        })
        .catch(err => {openNotification(<CloseCircleTwoTone twoToneColor={'red'} />, 'Notifications!', 'Loi he thong')})
    }

    // --------------RETURN UI
    return (
        <Layout>
            <Header
                style={{
                    position: 'fixed',
                    zIndex: 1,
                    width: '100%',
                }}
            >
                <div className="class-logo" >{classInfo?.name} - {classInfo?.code}</div>
            </Header>
            <div className='class-custom-layout1'>
                <Content
                    className="site-layout"
                    style={{
                        padding: '0 50px',
                        marginTop: 64,
                    }}
                >
                    <div
                        className="site-layout-background"
                        style={{
                            padding: 24,
                            minHeight: 600,
                        }}
                    >

                        <Typography.Text strong italic>Hoc sinh trong lop</Typography.Text>
                        <Input placeholder='Nhap ten hoc sinh de tim kiem' onChange={(e) => handleFilter(e.target.value)} style={{marginTop : 30}}/>
                        <Table dataSource={listStudent} columns={columns} rowKey={(record) => record._id} style={{marginTop : 20}}/>
                    </div>
                </Content>
                <Content
                    className="site-layout"
                    style={{
                        padding: '0 50px',
                        marginTop: 64,
                    }}
                >
                    <div
                        className="site-layout-background"
                        style={{
                            padding: 24,
                            minHeight: 600,
                        }}
                    >   
                        <Typography.Text strong italic style={{marginRight : 50}}>Add hoc sinh vao lop</Typography.Text>
                        <Button type='primary' onClick={onGetListStudent}><FilterTwoTone />Get DS hoc sinh</Button>
                        <Input placeholder='Nhap ten hoc sinh de tim kiem' onChange={(e) => handleFilterAllStudent(e.target.value)} style={{marginTop : 20}}/>
                        <Table rowSelection={rowSelection} dataSource={listAllStudent_filter} columns={columnsStudent} rowKey={(record) => record._id} pagination={{ pageSize: 5 }} style={{marginTop : 20}}/>
                        <Button type='primary' onClick={handleAddStudent} style={{marginTop :20}}><PlusSquareTwoTone />Add hoc sinh vao lop</Button>
                    </div>
                </Content>
            </div>

            <Footer
                style={{
                    textAlign: 'center',
                }}
            >
                KMIN Academy
            </Footer>
        </Layout>
    );
}
export default Class;
