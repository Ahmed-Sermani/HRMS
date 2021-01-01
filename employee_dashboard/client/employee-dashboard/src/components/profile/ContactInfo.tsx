import React from 'react'
import { Row, Col, Typography } from "antd";
import { MailOutlined, PhoneOutlined, MobileOutlined} from '@ant-design/icons'
const { Title, Paragraph } = Typography

interface Props {
    email: string,
    mobile: string,
    phone: string
}

const ContactInfo: React.FC<Props> = ({email, mobile, phone}: Props) => {

    return (
        <>

            {/* Contact Info */}
            <Title level={5}> Contact Info </Title>
            <Row gutter={5}>
                <Col>
                    <MailOutlined />
                </Col>
                <Col>
                    <Paragraph copyable strong> {email} </Paragraph>
                </Col>

            </Row>

            <Row gutter={5}>
                <Col>
                    <MobileOutlined />
                </Col>
                <Col>
                    <Paragraph copyable strong> {mobile} </Paragraph>
                </Col>

            </Row>

            <Row gutter={5}>
                <Col>
                    <PhoneOutlined />
                </Col>
                <Col>
                    <Paragraph copyable strong> {phone} </Paragraph>
                </Col>

            </Row>


        </>


    )
}

export default ContactInfo