import React from 'react'
import { Card, Row, Col, Avatar, Typography, Divider } from "antd";
import Airplane from '../SVGs/Airplane'
import Bandage from "../SVGs/Bandage";
const { Title, Text } = Typography

const TimeoffBalances: React.FC = () => {
    return (
        <Card
            title='Timeoff Balances'
            type={'inner'}
            style={{
                marginTop: '20px'
            }}
        >
            <Row justify={'space-around'}>
                <Col>

                    <Avatar
                        size={150}
                        icon={<Airplane />}
                        style={{
                            backgroundColor: 'white',
                            border: "border: 1px solid #cea9a9"
                        }}

                    />
                    <Divider />
                    <Row justify={'center'}>
                        <Title
                            type={'secondary'}
                            style={{
                                textShadow: '2px 10px 30px rgba(179,33,33,0.9)'
                            }}
                            level={5}
                        >
                            Annual Vacations
                    </Title>
                    </Row>
                    <Row justify={'center'}>
                        <Text>
                            Available Balance
                        </Text>
                    </Row>
                    <Row justify={'center'}>
                        <Text strong>
                            11.393
                        </Text>
                    </Row>

                    <Row justify={'center'}>
                        <Text>
                            Up to end of year
                        </Text>
                    </Row>
                    <Row justify={'center'}>
                        <Text strong>
                            12.255
                        </Text>
                    </Row>

                </Col>


                <Col>
                    <Divider type="vertical" style={{ height: "100%" }} />

                </Col>

                <Col>
                    <Avatar
                        size={150}
                        icon={<Bandage />}
                        style={{
                            backgroundColor: 'white',
                            border: "border: 1px solid #cea9a9"
                        }}

                    />
                    <Divider />
                    <Row justify={'center'}>
                    <Title
                            type={'secondary'}
                            style={{
                                textShadow: '2px 10px 30px rgba(179,33,33,0.9)'
                            }}
                            level={5}
                        >
                            Sick Day off
                    </Title>
                    </Row>
                    <Row justify={'center'}>
                        <Text>
                            Available Balance
                        </Text>
                    </Row>
                    <Row justify={'center'}>
                        <Text strong>
                            30.000
                        </Text>
                    </Row>

                    <Row justify={'center'}>
                        <Text>
                            Up to end of year
                        </Text>
                    </Row>
                    <Row justify={'center'}>
                        <Text strong>
                            30.000
                        </Text>
                    </Row>
                </Col>
            </Row>
        </Card>
    )
}

export default TimeoffBalances