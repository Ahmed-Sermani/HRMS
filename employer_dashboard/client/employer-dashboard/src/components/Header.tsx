import React, { useContext, useEffect, useState } from 'react'
import { Layout, Menu, Avatar, Row, Col, Dropdown, Badge } from 'antd';
import { HeaderColor, HeaderFontColor } from '../Constants'
import { UserOutlined, DownOutlined, CheckOutlined, LogoutOutlined,AlertOutlined } from '@ant-design/icons';
import { tokenContext } from "../context";
import { StateType } from '../App';
import { Link } from "react-router-dom";
const { Header } = Layout
const AppHeader: React.FC =  () => {
    const [name, setName] = useState()
    const [img, setImg] = useState()

    const tokens = useContext(tokenContext)

    useEffect(() => {
       (async () => {
           const result = await getBasicInfo(tokens)
           setName(result.name)
           setImg(process.env.REACT_APP_SERVER_URL +  result.img)
    })()
       
    },[tokens   ])
    
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
                            <Avatar src={img} />
                        </Col>
                        <Col>
                           {name}
                        </Col>
                        <Col>
                            <Dropdown overlay={menu} trigger={['click']}>
                                <a className="ant-dropdown-link" href='ssd' onClick={e => e.preventDefault()}>
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
                <Col><Link to='/employee/profile'>
                Profile
                </Link></Col>
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
            <Col><a href={process.env.REACT_APP_SERVER_URL + '/logout/'}>Logout</a></Col>
        </Row>
        </Menu.Item>
    </Menu>
);


async function getBasicInfo(tokens: StateType | undefined){
    
    const res = await fetch(process.env.REACT_APP_SERVER_URL + 'core/api/get_user_info/',
    {
      method: 'GET',
      headers:{
        Authorization: 'Bearer '+tokens?.access,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }
  )
  const result = await res.json()  
  return result


    
}

export default AppHeader