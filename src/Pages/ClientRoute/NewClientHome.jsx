import {
    LogoutOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Button, Layout, Menu } from 'antd';
import React, { useEffect, useState } from 'react';
import AddDocument from '../../Components/AddDocument';
import AddUser from '../../Components/AddUser';
import Listuser from '../../Components/ListUser';
import ListDoc from '../../Components/ListDoc';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logOut } from '../../store/auth/authSlice';

import AddDocType from '../../Components/AddDocType';
import AddMenu from '../../Components/AddMenu';
import ClientHeader from '../../Components/ClientHeader';

const { Header, Content, Footer, Sider } = Layout;


function getItem(label, key, icon, children, navigate) {
    return {
        key,
        icon,
        children,
        label,
        navigate
    };
}

const items = [
    getItem('User', 'sub1', <UserOutlined />, [
        getItem('Thêm', '2', '', null),
        getItem('Danh sách', '3', '', null),
    ]),
    getItem('Tài liệu', 'sub2', <TeamOutlined />,
        [getItem('Thêm menu', '5'),
        getItem('Thêm loại tài liệu', '6'),
        getItem('Thêm tài liệu', '7'),
        getItem('Danh sách tài liệu', '8')]),
];

const listComponentRender = [
    getItem('Thêm', '2', '', null, <AddUser />),
    getItem('Danh sách', '3', '', null, <Listuser />),
    getItem('Thêm menu', '5', '', null, <AddMenu />),
    getItem('Thêm loại tài liệu', '6', '', null, <AddDocType />),
    getItem('Thêm tài liệu', '7', '', null, <AddDocument />),
    getItem('Danh sách tài liệu', '8', '', null, <ListDoc />)
]




const NewClientHome = () => {
    const dispatch = useDispatch()
    const [collapsed, setCollapsed] = useState(false);
    const [componentLayout, setComponentLayout] = useState(<AddUser />)
    const [element, setElement] = useState('Người dùng')
    const [breakcum, setBreakcum] = useState('Thêm')
    const handleMenuClick = (e) => {
        for (let item of listComponentRender) {
            if (item.key === e.key) {
                setComponentLayout(item.navigate)
                setElement(e.keyPath[1])
                setBreakcum(item.label)
            }
        }
    }
    return (
        <>
        <ClientHeader/>
        <Layout
            style={{
                minHeight: '100vh',
            }}
        >

            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div className="logo" />
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} onClick={handleMenuClick} />
                <div className='logout-btn'>
                    <Button block style={{
                        backgroundColor: 'red',
                        marginTop: 20
                    }} onClick={() => dispatch(logOut())}> <LogoutOutlined />Thoát</Button>
                </div>
            </Sider>
            <Layout className="site-layout">
                <Header
                    className="site-layout-background"
                    style={{
                        padding: 0,
                    }}
                ><h1 style={{ color: 'red', fontSize: 30, textAlign: 'center' }}>DOCUMENT SHARE ADMIN PAGE</h1>
                </Header>
                <Content
                    style={{
                        margin: '0 16px',
                    }}
                >
                    <Breadcrumb
                        style={{
                            margin: '16px 0',
                        }}
                    >
                        <Breadcrumb.Item>{element === 'sub1' ? 'User' : 'Tài liệu'}</Breadcrumb.Item>
                        <Breadcrumb.Item>{breakcum}</Breadcrumb.Item>
                    </Breadcrumb>
                    <div
                        className="site-layout-background"
                        style={{
                            padding: 0,
                            textAlign: 'left'
                        }}
                    >
                        {componentLayout}
                    </div>
                </Content>
                <Footer
                    style={{
                        textAlign: 'center',
                        backgroundColor: '#fff'
                    }}
                >
                    Thiết kế bởi : builinhduong43@gmail.com
                </Footer>
            </Layout>
        </Layout></>
        
    );
};

export default NewClientHome;