import React from 'react'
import { Row, Col } from "antd";
import UserInfo from './UserInfo'
import  MainInfo  from "./MainInfo";

const ProfileTab: React.FC = () => {
    return(
        <Row gutter={22}>
            <Col span={7}>
                <UserInfo />
            </Col>
            <Col span={17}>
                <MainInfo />
            </Col>

            </Row>
    )
}


export default ProfileTab