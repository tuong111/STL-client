import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import NewSidebar from './Component/NewSideBar';
import Icon from '@ant-design/icons/lib/components/Icon';
import Files from '../Files';
import NewContent from './Component/Content';
import CustomHeader from './Component/CustomHeader';
import ClientHeader from '../../Components/ClientHeader';
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;




const NewClientHome = () => {
    const [collapsed, setCollapsed] = useState(false);

    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };
    return (
        <>
        <ClientHeader/>
        <Layout style={{ minHeight: '100vh' }}>

      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={toggleCollapsed}
        breakpoint="md"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          if (broken) {
            setCollapsed(true);
          }
        }}
      >
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <SubMenu
            key="sub1"
            title={
              <span>
                <Icon type="mail" />
                <span>Menu 1</span>
              </span>
            }
          >
            <Menu.Item key="1">Submenu 1-1</Menu.Item>
            <Menu.Item key="2">Submenu 1-2</Menu.Item>
            <Menu.Item key="3">Submenu 1-3</Menu.Item>
            <Menu.Item key="4">Submenu 1-4</Menu.Item>
            <Menu.Item key="5">Submenu 1-5</Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub2"
            title={
              <span>
                <Icon type="appstore" />
                <span>Menu 2</span>
              </span>
            }
          >
            <Menu.Item key="6">Submenu 2-1</Menu.Item>
            <Menu.Item key="7">Submenu 2-2</Menu.Item>
            <Menu.Item key="8">Submenu 2-3</Menu.Item>
            <Menu.Item key="9">Submenu 2-4</Menu.Item>
            <Menu.Item key="10">Submenu 2-5</Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub3"
            title={
              <span>
                <Icon type="setting" />
                <span>Menu 3</span>
              </span>
            }
          >
            <Menu.Item key="11">Submenu 3-1</Menu.Item>
            <Menu.Item key="12">Submenu 3-2</Menu.Item>
            <Menu.Item key="13">Submenu 3-3</Menu.Item>
            <Menu.Item key="14">Submenu 3-4</Menu.Item>
            <Menu.Item key="15">Submenu 3-5</Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: 0 }}>
          <Icon
            className="trigger"
            type={collapsed ? 'menu-unfold' : 'menu-fold'}
            onClick={toggleCollapsed}
          />
        </Header>
        <Content style={{ margin: '0 16px' }}>
          <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
            <NewContent/>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
    </>
    )
};

export default NewClientHome;
