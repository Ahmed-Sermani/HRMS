import React from 'react'
import { Layout, Menu, Avatar, Row, Col, Dropdown, Badge } from 'antd';
import { HeaderColor, HeaderFontColor } from '../Constants'
import { UserOutlined, DownOutlined, CheckOutlined, LogoutOutlined,AlertOutlined } from '@ant-design/icons';
const { Header } = Layout
const AppHeader: React.FC = () => {
    return (
        <Header hasSider={true} style={{
            background: HeaderColor,
            lineHeight: '63px'
        }}>

            <Menu mode="horizontal" style={{
                background: HeaderColor,
                float: 'right',
                color: HeaderFontColor
            }}>
                <Menu.Item key="1">
                    <Badge dot>
                    <AlertOutlined  style={{fontSize: '16px'}} />
                    </Badge>
                </Menu.Item>
                <Menu.Item key="2">
                    <Row justify='space-between' gutter={10} align={'middle'}>
                        <Col>
                            <Avatar icon={<UserOutlined />} />
                        </Col>
                        <Col>
                            Ahmed Sermani
                        </Col>
                        <Col>
                            <Dropdown overlay={menu} trigger={['click']}>
                                <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                                    <DownOutlined />
                                </a>
                            </Dropdown>
                        </Col>
                    </Row>
                </Menu.Item>
            </Menu>

        </Header>
    )
}



const menu = (
    <Menu>
        <Menu.Item key="0">
            <Row gutter={7} align={'middle'}>
                <Col ><UserOutlined /></Col>
                <Col><a href="http://www.alipay.com/">Profile</a></Col>
            </Row>
        </Menu.Item>
        <Menu.Item key="1">
            <Row gutter={7} align={'middle'}>
                <Col ><CheckOutlined /></Col>
                <Col><a href="http://www.alipay.com/">My Approvals</a></Col>
            </Row>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="3">
        <Row gutter={7} align={'middle'}>
            <Col ><LogoutOutlined /> </Col>
            <Col><a href="http://www.alipay.com/">Logout</a></Col>
        </Row>
        </Menu.Item>
    </Menu>
);

export default AppHeader