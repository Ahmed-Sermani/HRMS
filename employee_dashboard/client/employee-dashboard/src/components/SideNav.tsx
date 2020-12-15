import React, { useState } from 'react';
import { Layout, Menu } from "antd";
import { SiderProps } from "antd/lib/layout/Sider";
import { Link } from "react-router-dom";

import {
    PieChartOutlined,
    DesktopOutlined,
    UserOutlined,
    TeamOutlined,
    FileOutlined
} from '@ant-design/icons';
const { SubMenu } = Menu;
const { Sider } = Layout

interface Props extends SiderProps{
    
}

const SideNav: React.FC<Props> = (props : Props) =>  {
    const  [collapsed , setCollapsed] = useState<boolean>(false)
    return (
    <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed.bind(null, !collapsed)}>
        <div className='logo'/>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
        <Menu.Item key="1" icon={<UserOutlined />}>
            <Link to='/employee/profile'>
                Profile
                </Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<DesktopOutlined />}>
                Option 2
        </Menu.Item>
        <SubMenu key="sub1" icon={<UserOutlined />} title="User">
            <Menu.Item key="3">Tom</Menu.Item>
            <Menu.Item key="4">Bill</Menu.Item>
            <Menu.Item key="5">Alex</Menu.Item>
        </SubMenu>
        <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
            <Menu.Item key="6">Team 1</Menu.Item>
            <Menu.Item key="8">Team 2</Menu.Item>
        </SubMenu>
        <Menu.Item key="9" icon={<FileOutlined />}>
            Files
        </Menu.Item>
        </Menu>
    </Sider>
    )
}
export default SideNav