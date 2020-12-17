import React, { useState } from 'react'
import { Card, Row, Col, Typography } from 'antd'
const { Text } = Typography
const SalaryPackage: React.FC = () => {
    const [isBlurred, setBlurred] = useState<boolean>(true)

    const style = isBlurred ?
        {
            color: 'transparent',
            textShadow: '0 0 10px rgba(0,0,0,1)'
        } :
        {
            color: 'black',
            textShadow: '0 0 0px rgba(0,0,0,0)'
        }

    return (
        <Card
            title='Salary Package'
            type={'inner'}
            style={{
                marginTop: '20px',

            }}
            onMouseEnter={setBlurred.bind(null, false)}
            onMouseLeave={setBlurred.bind(null, true)}

        >
            <Row justify={'space-around'}>
                <Col>
                    <Row gutter={5} >
                        <Col>
                            <Text type={'secondary'} style={{ ...style }}>
                                Basic Salary :
                </Text>
                        </Col>
                        <Col>
                            <Text strong style={{ ...style }}>
                                7000 SAR
                </Text>
                        </Col>
                    </Row>

                </Col>

                <Col>
                    <Row gutter={5} >
                        <Col>
                            <Text type={'secondary'} style={{ ...style }}>
                                GOSI Salary :
                </Text>
                        </Col>
                        <Col>
                            <Text strong style={{ ...style }}>
                                0.00 SAR
                </Text>
                        </Col>
                    </Row>

                </Col>


                <Col>
                    <Row gutter={5} >
                        <Col>
                            <Text type={'secondary'} style={{ ...style }}>
                                Total Salary :
                </Text>
                        </Col>
                        <Col>
                            <Text strong style={{ ...style }}>
                                7000 SAR
                </Text>
                        </Col>
                    </Row>

                </Col>
            </Row>
        </Card>
    )
}

export default SalaryPackage