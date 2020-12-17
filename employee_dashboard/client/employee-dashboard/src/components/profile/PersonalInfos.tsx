import React from 'react'
import { Row, Col, Typography, } from "antd";
const { Title, Text } = Typography

const PersonalInfos: React.FC = () => {

    return (
        <>
        <Title level={5}> Personal Info </Title>
        <Row gutter={40}>
            <Col>
                <Row gutter={5}>
                    <Col>
                        <Text type={'secondary'}>
                            Gender :
                </Text>
                    </Col>
                    <Col>
                        <Text strong>
                            Male
                </Text>
                    </Col>
                </Row>
                <Row gutter={5}>
                    <Col>
                        <Text type={'secondary'}>
                            Birth Date :
                </Text>
                    </Col>
                    <Col>
                        <Text strong>
                            Oct 18, 1998
                </Text>
                    </Col>
                </Row>

                <Row gutter={5}>
                    <Col>
                        <Text type={'secondary'}>
                            Marital Status :
                </Text>
                    </Col>
                    <Col>
                        <Text strong>
                            Single
                </Text>
                    </Col>
                </Row>

            </Col>
            <Col>

                <Row gutter={5}>
                    <Col>
                        <Text type={'secondary'}>
                            Nationality :
                </Text>
                    </Col>
                    <Col>
                        <Text strong>
                            Syrian
                </Text>
                    </Col>
                </Row>

                <Row gutter={5}>
                    <Col>
                        <Text type={'secondary'}>
                            Age :
                </Text>
                    </Col>
                    <Col>
                        <Text strong>
                            22 Years Old
                </Text>
                    </Col>
                </Row>

                <Row gutter={5}>
                    <Col>
                        <Text type={'secondary'}>
                            National ID :
                </Text>
                    </Col>
                    <Col>
                        <Text strong>
                            2013149792
                </Text>
                    </Col>
                </Row>
            </Col>

        </Row>
        </>
        )


}


export default PersonalInfos