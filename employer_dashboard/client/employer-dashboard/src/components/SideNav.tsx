import React, { useState } from 'react';
import { Layout, Menu } from "antd";
import { SiderProps } from "antd/lib/layout/Sider";
import { Link } from "react-router-dom";

import {
    UnorderedListOutlined,
    EnvironmentOutlined,
    TeamOutlined,
    FileOutlined,
    InfoCircleOutlined
} from '@ant-design/icons';
const { SubMenu } = Menu;
const { Sider } = Layout

interface Props extends SiderProps{
    
}

const SideNav: React.FC<Props> = (props : Props) =>  {
    const  [collapsed , setCollapsed] = useState<boolean>(true)
    return (
    <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed.bind(null, !collapsed)}>
        <div className='logo'/>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
        <Menu.Item key="1" icon={<InfoCircleOutlined />}>
            
            <Link to='/information_management'>
                Information Management
            </Link>
            
        </Menu.Item>
        <Menu.Item key="2" icon={<UnorderedListOutlined />}>
            <Link to='/employee_list_and_actions'>
                Employees
            </Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<EnvironmentOutlined />} title="Shifts Management">
            <Link to='/shifts'>
                Shifts
            </Link>
        </Menu.Item>
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