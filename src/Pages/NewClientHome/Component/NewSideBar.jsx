import Icon from '@ant-design/icons/lib/components/Icon';
import { Menu} from 'antd';
import React, { useState } from 'react';



const NewSidebar = () => {
    const [collapsed, setCollapsed] = useState(false);

    const onCollapse = () => {
        setCollapsed(!collapsed);
    };

    return (
        <div style={{ width: 256 }}>
            <Menu
                defaultSelectedKeys={['1']}
                mode="inline"
                theme="dark"
                inlineCollapsed={collapsed}
            >
                <Menu.Item key="1">
                    <Icon type="pie-chart" />
                    <span>Option 1</span>
                </Menu.Item>
                <Menu.Item key="2">
                    <Icon type="desktop" />
                    <span>Option 2</span>
                </Menu.Item>
                <Menu.Item key="3">
                    <Icon type="inbox" />
                    <span>Option 3</span>
                </Menu.Item>
            </Menu>
            <div className="sidebar-collapse-button" onClick={onCollapse}>
                <Icon type={collapsed ? 'menu-unfold' : 'menu-fold'} />
            </div>
        </div>
    );
};

export default NewSidebar;
