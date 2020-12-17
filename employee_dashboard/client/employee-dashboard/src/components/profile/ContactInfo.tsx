import React from 'react'
import { Row, Col, Typography } from "antd";
import { MailOutlined, PhoneOutlined, MobileOutlined} from '@ant-design/icons'
const { Title, Paragraph } = Typography



const ContactInfo: React.FC = () => {


    return (
        <>

            {/* Contact Info */}
            <Title level={5}> Contact Info </Title>
            <Row gutter={5}>
                <Col>
                    <MailOutlined />
                </Col>
                <Col>
                    <Paragraph copyable strong> ahmadsermani58@gmail.com </Paragraph>
                </Col>

            </Row>

            <Row gutter={5}>
                <Col>
                    <MobileOutlined />
                </Col>
                <Col>
                    <Paragraph copyable strong> 0533981305 </Paragraph>
                </Col>

            </Row>

            <Row gutter={5}>
                <Col>
                    <PhoneOutlined />
                </Col>
                <Col>
                    <Paragraph copyable strong> 88834885738894 </Paragraph>
                </Col>

            </Row>


        </>


    )
}

export default ContactInfo