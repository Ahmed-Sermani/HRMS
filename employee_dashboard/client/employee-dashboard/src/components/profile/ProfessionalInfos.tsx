import React from 'react'
import { Card, Row, Col, Typography } from "antd";
const { Text } = Typography
const ProfessionalInfos: React.FC = () => {
    return(
        <Card title='Professional Info' type={'inner'}>
            <Row justify={'space-around'}>
                <Col>
                <Row gutter={5} >
                    <Col>
                        <Text type={'secondary'}>
                        Job Title :
                </Text>
                    </Col>
                    <Col>
                        <Text strong>
                        Software Engineer
                </Text>
                    </Col>
                </Row>
                <Row gutter={5}>
                    <Col>
                        <Text type={'secondary'}>
                        Work Type :
                </Text>
                    </Col>
                    <Col>
                        <Text strong>
                            Full Time
                </Text>
                    </Col>
                </Row>

                <Row gutter={5}>
                    <Col>
                        <Text type={'secondary'}>
                            Direct Manager :
                </Text>
                    </Col>
                    <Col>
                        <Text strong>
                            Mohammad Sermani
                </Text>
                    </Col>
                </Row>
                </Col>


                <Col>
                <Row gutter={5}>
                    <Col>
                        <Text type={'secondary'}>
                            Branch :
                        </Text>
                    </Col>
                    <Col>
                        <Text strong>
                            KSA Branch
                        </Text>
                    </Col>
                </Row>
                <Row gutter={5}>
                    <Col>
                        <Text type={'secondary'}>
                            Work location :
                </Text>
                    </Col>
                    <Col>
                        <Text strong>
                            KSA Office
                </Text>
                    </Col>
                </Row>

                <Row gutter={5}>
                    <Col>
                        <Text type={'secondary'}>
                            Department :
                </Text>
                    </Col>
                    <Col>
                        <Text strong>
                            Technology
                </Text>
                    </Col>
                </Row>

                <Row gutter={5}>
                    <Col>
                        <Text type={'secondary'}>
                            Section :
                </Text>
                    </Col>
                    <Col>
                        <Text strong>
                            Engineering
                </Text>
                    </Col>
                </Row>
                </Col>


                <Col>
                <Row gutter={5}>
                    <Col>
                        <Text type={'secondary'}>
                        Hiring Date :
                </Text>
                    </Col>
                    <Col>
                        <Text strong>
                            Aug 04, 2020
                </Text>
                    </Col>
                </Row>
                <Row gutter={5}>
                    <Col>
                        <Text type={'secondary'}>
                            End of Probation :
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
                             Period of Employment :
                </Text>
                    </Col>
                    <Col>
                        <Text strong>
                            4 months
                </Text>
                    </Col>
                </Row>
                </Col>
                
                
            </Row>
        </Card>
    )
}

export default ProfessionalInfos