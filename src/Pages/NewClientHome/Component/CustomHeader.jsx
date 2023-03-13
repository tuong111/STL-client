import { Layout, Menu, Avatar, Dropdown } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import './customHeader.scss'
const { Header } = Layout;

const menu = (
  <Menu>
    <Menu.Item key="upgrade">Nâng cấp</Menu.Item>
    <Menu.Item key="contact">Liên hệ</Menu.Item>
    <Menu.Divider />
    <Menu.Item key="logout" icon={<LogoutOutlined />}>
      Đăng xuất
    </Menu.Item>
  </Menu>
);

const CustomHeader = () => {
  return (
    <Header className="header">
      <div className="logo">
        <img src="https://via.placeholder.com/100x50" alt="logo" />
      </div>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
        <Menu.Item key="1">Menu 1</Menu.Item>
        <Menu.Item key="2">Menu 2</Menu.Item>
        <Menu.Item key="3">Menu 3</Menu.Item>
      </Menu>
      <div className="header-right">
        <Avatar size="small" icon={<UserOutlined />} />
        <Dropdown menu={menu} placement="bottomRight" arrow>
          <a href="/" className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
            User Name
          </a>
        </Dropdown>
      </div>
    </Header>
  );
};

export default CustomHeader;
